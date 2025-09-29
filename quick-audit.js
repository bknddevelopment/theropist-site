const fetch = require('node-fetch');

const pages = [
  '/',
  '/booking',
  '/portal',
  '/login',
  '/signup',
  '/assessment',
  '/mood-tracker',
  '/wellness-tools',
  '/virtual-sessions',
  '/session/waiting',
  '/ai-demo',
  '/admin/dashboard',
  '/admin/appointments',
  '/admin/clients',
  '/admin/revenue',
  '/admin/surveys',
  '/admin/ab-testing'
];

async function checkPages() {
  console.log('Quick Visibility Check - Rosa Toral Therapy Website');
  console.log('='.repeat(60));
  console.log();

  const issues = [];
  let successCount = 0;
  let errorCount = 0;

  for (const path of pages) {
    const url = `http://localhost:3010${path}`;

    try {
      const response = await fetch(url);
      const html = await response.text();

      if (response.status === 200) {
        // Quick checks on the HTML
        const pageIssues = [];

        // Check for basic structure
        if (!html.includes('<!DOCTYPE html>')) {
          pageIssues.push('Missing DOCTYPE');
        }

        // Check for body tag
        if (!html.includes('<body')) {
          pageIssues.push('Missing body tag');
        }

        // Check for error messages
        if (html.includes('Error:') || html.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING')) {
          pageIssues.push('Client-side rendering fallback detected');
        }

        // Check for earth tone classes
        const hasEarthTones =
          html.includes('bg-cream') ||
          html.includes('text-forest') ||
          html.includes('bg-sand') ||
          html.includes('text-terracotta');

        if (!hasEarthTones) {
          pageIssues.push('Missing earth-tone color classes');
        }

        if (pageIssues.length > 0) {
          issues.push({
            page: path,
            issues: pageIssues
          });
          console.log(`❌ ${path}: ${pageIssues.join(', ')}`);
        } else {
          successCount++;
          console.log(`✅ ${path}: Page loads correctly`);
        }
      } else {
        errorCount++;
        issues.push({
          page: path,
          issues: [`HTTP ${response.status}`]
        });
        console.log(`❌ ${path}: HTTP ${response.status}`);
      }
    } catch (error) {
      errorCount++;
      issues.push({
        page: path,
        issues: [error.message]
      });
      console.log(`❌ ${path}: ${error.message}`);
    }
  }

  console.log();
  console.log('='.repeat(60));
  console.log('SUMMARY:');
  console.log(`✅ Success: ${successCount}/${pages.length} pages`);
  console.log(`❌ Issues: ${issues.length} pages with problems`);
  console.log(`🚫 Errors: ${errorCount} pages failed to load`);

  if (issues.length > 0) {
    console.log('\nDetailed Issues:');
    issues.forEach(issue => {
      console.log(`\n${issue.page}:`);
      issue.issues.forEach(i => console.log(`  - ${i}`));
    });
  }
}

checkPages().catch(console.error);