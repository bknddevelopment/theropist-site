const puppeteer = require('puppeteer');
const axe = require('axe-core');

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/booking', name: 'Booking' },
  { path: '/portal', name: 'Client Portal' },
  { path: '/login', name: 'Login' },
  { path: '/signup', name: 'Signup' },
  { path: '/assessment', name: 'Assessment Tools' },
  { path: '/mood-tracker', name: 'Mood Tracker' },
  { path: '/wellness-tools', name: 'Wellness Tools' },
  { path: '/virtual-sessions', name: 'Virtual Sessions' },
  { path: '/session/waiting', name: 'Session Waiting Room' },
  { path: '/ai-demo', name: 'AI Demo' },
  { path: '/admin/dashboard', name: 'Admin Dashboard' },
  { path: '/admin/appointments', name: 'Admin Appointments' },
  { path: '/admin/clients', name: 'Admin Clients' },
  { path: '/admin/revenue', name: 'Admin Revenue' },
  { path: '/admin/surveys', name: 'Admin Surveys' },
  { path: '/admin/ab-testing', name: 'Admin A/B Testing' }
];

const viewports = [
  { width: 1920, height: 1080, name: 'Desktop 1920px' },
  { width: 1440, height: 900, name: 'Desktop 1440px' },
  { width: 1024, height: 768, name: 'Desktop 1024px' },
  { width: 768, height: 1024, name: 'Tablet' },
  { width: 390, height: 844, name: 'Mobile 390px' },
  { width: 375, height: 667, name: 'Mobile 375px' }
];

async function auditPage(browser, page, pageInfo, viewport) {
  const issues = [];

  await page.setViewport(viewport);
  await page.goto(`http://localhost:3010${pageInfo.path}`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Wait for content to render
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Run axe accessibility checks
    await page.addScriptTag({ path: require.resolve('axe-core') });
    const results = await page.evaluate(async () => {
      const results = await axe.run();
      return results;
    });

    if (results.violations.length > 0) {
      results.violations.forEach(violation => {
        if (violation.impact === 'serious' || violation.impact === 'critical') {
          issues.push({
            type: 'WCAG Violation',
            impact: violation.impact,
            description: violation.description,
            nodes: violation.nodes.length,
            help: violation.helpUrl
          });
        }
      });
    }

    // Check for visibility issues
    const visibilityIssues = await page.evaluate(() => {
      const issues = [];

      // Check all text elements
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, a, label, input, textarea');

      textElements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();

        // Check if element is visible
        if (rect.width > 0 && rect.height > 0) {
          // Check for overflow
          if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
            issues.push({
              type: 'overflow',
              element: el.tagName,
              text: el.textContent.substring(0, 50)
            });
          }

          // Check for very low opacity
          const opacity = parseFloat(styles.opacity);
          if (opacity < 0.6 && el.textContent.trim()) {
            issues.push({
              type: 'low-opacity',
              element: el.tagName,
              opacity: opacity,
              text: el.textContent.substring(0, 50)
            });
          }

          // Check z-index issues (elements behind others)
          const zIndex = styles.zIndex;
          if (zIndex && parseInt(zIndex) < 0) {
            issues.push({
              type: 'negative-z-index',
              element: el.tagName,
              zIndex: zIndex,
              text: el.textContent.substring(0, 50)
            });
          }
        }
      });

      // Check for images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.complete || img.naturalWidth === 0) {
          issues.push({
            type: 'broken-image',
            src: img.src,
            alt: img.alt
          });
        }
      });

      // Check form elements
      const formElements = document.querySelectorAll('input, textarea, select');
      formElements.forEach(el => {
        const label = document.querySelector(`label[for="${el.id}"]`);
        if (!label && !el.getAttribute('aria-label')) {
          issues.push({
            type: 'missing-label',
            element: el.tagName,
            id: el.id || 'no-id'
          });
        }
      });

      // Check interactive elements
      const interactive = document.querySelectorAll('button, a, [role="button"]');
      interactive.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          issues.push({
            type: 'touch-target-size',
            element: el.tagName,
            width: rect.width,
            height: rect.height,
            text: el.textContent.substring(0, 30)
          });
        }
      });

      return issues;
    });

    if (visibilityIssues.length > 0) {
      issues.push(...visibilityIssues.map(issue => ({
        ...issue,
        category: 'Visibility Issue'
      })));
    }

    // Check for JavaScript errors
    const jsErrors = [];
    page.on('pageerror', error => {
      jsErrors.push(error.message);
    });

    if (jsErrors.length > 0) {
      issues.push({
        type: 'JavaScript Errors',
        errors: jsErrors
      });
    }

  } catch (error) {
    issues.push({
      type: 'Page Error',
      message: error.message
    });
  }

  return issues;
}

async function runAudit() {
  console.log('🔍 Starting Comprehensive Visibility and Design Audit\n');
  console.log('=' .repeat(80));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const allIssues = {};
  const summary = {
    totalPages: pages.length,
    pagesWithIssues: 0,
    totalIssues: 0,
    criticalIssues: 0,
    wcagViolations: 0,
    visibilityIssues: 0
  };

  for (const pageInfo of pages) {
    console.log(`\n📄 Auditing: ${pageInfo.name} (${pageInfo.path})`);
    console.log('-'.repeat(60));

    const pageIssues = {};

    for (const viewport of viewports) {
      const page = await browser.newPage();
      const issues = await auditPage(browser, page, pageInfo, viewport);

      if (issues.length > 0) {
        pageIssues[viewport.name] = issues;
        summary.totalIssues += issues.length;

        issues.forEach(issue => {
          if (issue.type === 'WCAG Violation') {
            summary.wcagViolations++;
            if (issue.impact === 'critical') summary.criticalIssues++;
          } else if (issue.category === 'Visibility Issue') {
            summary.visibilityIssues++;
          }
        });
      }

      await page.close();
    }

    if (Object.keys(pageIssues).length > 0) {
      allIssues[pageInfo.name] = pageIssues;
      summary.pagesWithIssues++;

      // Print issues for this page
      Object.keys(pageIssues).forEach(viewport => {
        console.log(`  ${viewport}:`);
        pageIssues[viewport].forEach(issue => {
          if (issue.type === 'WCAG Violation') {
            console.log(`    ❌ WCAG ${issue.impact.toUpperCase()}: ${issue.description}`);
          } else if (issue.category === 'Visibility Issue') {
            console.log(`    ⚠️  ${issue.type}: ${JSON.stringify(issue)}`);
          } else {
            console.log(`    ⚠️  ${issue.type}: ${issue.message || JSON.stringify(issue)}`);
          }
        });
      });
    } else {
      console.log('  ✅ No issues found');
    }
  }

  await browser.close();

  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 AUDIT SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Pages Audited: ${summary.totalPages}`);
  console.log(`Pages with Issues: ${summary.pagesWithIssues}`);
  console.log(`Total Issues Found: ${summary.totalIssues}`);
  console.log(`  - Critical WCAG Violations: ${summary.criticalIssues}`);
  console.log(`  - Total WCAG Violations: ${summary.wcagViolations}`);
  console.log(`  - Visibility Issues: ${summary.visibilityIssues}`);

  if (summary.pagesWithIssues === 0) {
    console.log('\n✅ EXCELLENT! No visibility or design issues found across all pages and viewports.');
  } else {
    console.log('\n⚠️  Issues detected. Please review the details above for fixes.');
  }

  // Save detailed report
  const fs = require('fs');
  const report = {
    timestamp: new Date().toISOString(),
    summary,
    details: allIssues
  };

  fs.writeFileSync('visibility-audit-report.json', JSON.stringify(report, null, 2));
  console.log('\n📁 Detailed report saved to visibility-audit-report.json');
}

// Run the audit
runAudit().catch(console.error);