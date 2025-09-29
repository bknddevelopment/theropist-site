#!/usr/bin/env node

/**
 * Quick accessibility tests for Rosa Toral Therapy website
 * Verifies all the fixes implemented
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Running Accessibility Verification Tests...\n');

let testsPassed = 0;
let testsFailed = 0;

function runTest(description, testFn) {
  try {
    const result = testFn();
    if (result) {
      console.log(`✅ ${description}`);
      testsPassed++;
    } else {
      console.log(`❌ ${description}`);
      testsFailed++;
    }
  } catch (error) {
    console.log(`❌ ${description}: ${error.message}`);
    testsFailed++;
  }
}

// Test 1: Check for opacity animations with fallback
runTest('Motion components have opacity fallbacks', () => {
  const heroPath = path.join(__dirname, 'components/home/HeroSection.tsx');
  const content = fs.readFileSync(heroPath, 'utf8');
  return content.includes('style={{ opacity: 1 }}');
});

// Test 2: Check for proper touch targets in Footer
runTest('Footer links have proper touch targets', () => {
  const footerPath = path.join(__dirname, 'components/Footer.tsx');
  const content = fs.readFileSync(footerPath, 'utf8');
  return content.includes('p-3') && content.includes('w-12 h-12');
});

// Test 3: Check for form labels
runTest('Footer form has proper labels', () => {
  const footerPath = path.join(__dirname, 'components/Footer.tsx');
  const content = fs.readFileSync(footerPath, 'utf8');
  return content.includes('htmlFor="newsletter-email"') &&
         content.includes('sr-only');
});

// Test 4: Check for ParticleSystem wrapper
runTest('ParticleSystem is wrapped for SSR', () => {
  const wrapperPath = path.join(__dirname, 'components/ParticleSystemWrapper.tsx');
  const layoutPath = path.join(__dirname, 'app/layout.tsx');
  const wrapperExists = fs.existsSync(wrapperPath);
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  return wrapperExists && layoutContent.includes('ParticleSystemWrapper');
});

// Test 5: Check for placeholder images instead of Unsplash
runTest('Unsplash URLs replaced with placeholders', () => {
  const componentsToCheck = [
    'components/home/HeroSection.tsx',
    'components/home/ServiceCards.tsx',
    'components/home/TestimonialsSection.tsx',
    'components/home/AboutPreview.tsx'
  ];

  for (const component of componentsToCheck) {
    const content = fs.readFileSync(path.join(__dirname, component), 'utf8');
    if (content.includes('images.unsplash.com')) {
      return false;
    }
  }
  return true;
});

// Test 6: Check for minimum button sizes
runTest('Navigation has accessible touch targets', () => {
  const navPath = path.join(__dirname, 'components/Navigation.tsx');
  const content = fs.readFileSync(navPath, 'utf8');
  return content.includes('p-3') && content.includes('min-h-[44px]');
});

// Test 7: Check for text truncation classes
runTest('ServiceCards use text truncation', () => {
  const servicePath = path.join(__dirname, 'components/home/ServiceCards.tsx');
  const content = fs.readFileSync(servicePath, 'utf8');
  return content.includes('line-clamp-2');
});

// Test 8: Check for input heights
runTest('Form inputs meet minimum height requirements', () => {
  const footerPath = path.join(__dirname, 'components/Footer.tsx');
  const content = fs.readFileSync(footerPath, 'utf8');
  return content.includes('min-h-[44px]');
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log('='.repeat(50));

if (testsFailed === 0) {
  console.log('\n🎉 All accessibility tests passed!');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${testsFailed} test(s) failed. Please review.`);
  process.exit(1);
}