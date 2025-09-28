/**
 * WCAG Contrast Checker for Rosa Toral Therapy Site
 * Validates earthy color palette contrast ratios
 */

// Updated earthy palette from tailwind.config.ts
const colors = {
  forest: '#3D2F27',       // Deep earth brown (main text)
  cream: '#FAF6F0',        // Warm parchment background
  sage: '#8B9574',         // Warm sage
  terracotta: '#B87A5C',   // Richer clay
  moss: '#6B7C59',         // Soft moss green
  bark: '#5C4033',         // Tree bark brown
  sand: '#E8D5C4',         // Warm sand
  goldenHour: '#D4A574',   // Golden hour glow
  white: '#FFFFFF',
  black: '#000000',
};

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance (WCAG formula)
function getLuminance(rgb) {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calculate contrast ratio
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

// WCAG requirements
const WCAG_AA = {
  normal: 4.5,
  large: 3.0,
  ui: 3.0
};

const WCAG_AAA = {
  normal: 7.0,
  large: 4.5,
  ui: 3.0
};

// Test combinations from actual implementation
const testCombinations = [
  // Navigation
  { name: 'Nav Logo Text', fg: colors.forest, bg: colors.cream, size: 'large', usage: 'Logo text' },
  { name: 'Nav Subtitle', fg: colors.sage, bg: colors.cream, size: 'normal', usage: 'Retreat & Therapy' },
  { name: 'Nav Links', fg: colors.forest, bg: colors.cream, size: 'normal', usage: 'Menu items' },
  { name: 'Nav Links Hover', fg: colors.terracotta, bg: colors.cream, size: 'normal', usage: 'Menu hover' },
  { name: 'Nav CTA Button', fg: colors.cream, bg: colors.terracotta, size: 'normal', usage: 'Book Session' },
  { name: 'Nav CTA Hover', fg: colors.cream, bg: colors.forest, size: 'normal', usage: 'Book hover' },

  // Hero Section (testing against dark overlay)
  { name: 'Hero Heading', fg: colors.cream, bg: colors.forest, size: 'large', usage: 'Main heading' },
  { name: 'Hero Accent', fg: colors.terracotta, bg: colors.forest, size: 'large', usage: 'Accent text' },
  { name: 'Hero Button', fg: colors.cream, bg: colors.terracotta, size: 'normal', usage: 'CTA button' },

  // Service Cards
  { name: 'Card Heading', fg: colors.forest, bg: colors.white, size: 'large', usage: 'Card titles' },
  { name: 'Card Text', fg: colors.forest, bg: colors.white, size: 'normal', usage: 'Card body' },
  { name: 'Card Price', fg: colors.terracotta, bg: colors.white, size: 'normal', usage: 'Pricing' },
  { name: 'View All Button', fg: colors.cream, bg: colors.forest, size: 'normal', usage: 'View all' },
  { name: 'View All Hover', fg: colors.cream, bg: colors.sage, size: 'normal', usage: 'View hover' },

  // Body Text
  { name: 'Body Text', fg: colors.forest, bg: colors.cream, size: 'normal', usage: 'Main content' },

  // Additional Earthy Combinations
  { name: 'Moss on Cream', fg: colors.moss, bg: colors.cream, size: 'normal', usage: 'Accent text' },
  { name: 'Bark on Sand', fg: colors.bark, bg: colors.sand, size: 'normal', usage: 'Section text' },
  { name: 'Golden on Cream', fg: colors.goldenHour, bg: colors.cream, size: 'normal', usage: 'Highlights' },
  { name: 'Clay on White', fg: colors.terracotta, bg: colors.white, size: 'normal', usage: 'Links/buttons' },

  // Form Elements
  { name: 'Form Labels', fg: colors.forest, bg: colors.cream, size: 'normal', usage: 'Input labels' },
  { name: 'Placeholder', fg: colors.sage, bg: colors.white, size: 'normal', usage: 'Placeholders' },
  { name: 'Error Text', fg: colors.terracotta, bg: colors.cream, size: 'normal', usage: 'Error msgs' },

  // UI Components
  { name: 'Scrollbar', fg: colors.moss, bg: colors.sand, size: 'ui', usage: 'Scrollbar thumb' },
  { name: 'Focus Ring', fg: colors.terracotta, bg: colors.cream, size: 'ui', usage: 'Focus indicator' },
];

console.log('======================================');
console.log('WCAG CONTRAST VALIDATION REPORT');
console.log('Rosa Toral Therapy - Earthy Palette');
console.log('======================================\n');

let totalTests = 0;
let passedAA = 0;
let passedAAA = 0;
const failures = [];

// Test each combination
testCombinations.forEach(combo => {
  totalTests++;
  const ratio = getContrastRatio(combo.fg, combo.bg);
  const requiredAA = WCAG_AA[combo.size];
  const requiredAAA = WCAG_AAA[combo.size];

  const passAA = ratio >= requiredAA;
  const passAAA = ratio >= requiredAAA;

  if (passAA) passedAA++;
  if (passAAA) passedAAA++;

  const status = passAA ? '✅' : '❌';
  const aaaStatus = passAAA ? '⭐' : '  ';

  console.log(status + ' ' + aaaStatus + ' ' + combo.name);
  console.log('     Usage: ' + combo.usage);
  console.log('     Colors: ' + combo.fg + ' on ' + combo.bg);
  console.log('     Ratio: ' + ratio.toFixed(2) + ':1');
  console.log('     AA (' + requiredAA + ':1): ' + (passAA ? 'PASS' : 'FAIL'));

  if (!passAA) {
    failures.push({
      name: combo.name,
      usage: combo.usage,
      fg: combo.fg,
      bg: combo.bg,
      ratio: ratio.toFixed(2),
      required: requiredAA,
      deficit: (requiredAA - ratio).toFixed(2)
    });

    // Suggest fix
    console.log('     ⚠️  FIX NEEDED: Increase contrast by ' + (requiredAA - ratio).toFixed(2));

    // Test alternative colors
    const alternatives = [];
    Object.entries(colors).forEach(([name, color]) => {
      const altRatio = getContrastRatio(color, combo.bg);
      if (altRatio >= requiredAA) {
        alternatives.push({ name, color, ratio: altRatio });
      }
    });

    if (alternatives.length > 0) {
      // Sort by closest luminance to original
      const origLum = getLuminance(hexToRgb(combo.fg));
      alternatives.sort((a, b) => {
        const aLum = getLuminance(hexToRgb(a.color));
        const bLum = getLuminance(hexToRgb(b.color));
        return Math.abs(aLum - origLum) - Math.abs(bLum - origLum);
      });

      console.log('     🔧 Suggested: Use ' + alternatives[0].name + ' (' + alternatives[0].color + ') - Ratio: ' + alternatives[0].ratio.toFixed(2) + ':1');
    }
  }

  console.log('');
});

// Summary
console.log('======================================');
console.log('SUMMARY');
console.log('======================================');
console.log('Total Tests: ' + totalTests);
console.log('WCAG AA: ' + passedAA + '/' + totalTests + ' (' + ((passedAA/totalTests)*100).toFixed(1) + '%)');
console.log('WCAG AAA: ' + passedAAA + '/' + totalTests + ' (' + ((passedAAA/totalTests)*100).toFixed(1) + '%)');

if (failures.length > 0) {
  console.log('\n❌ CRITICAL FAILURES:');
  console.log('--------------------------------------');
  failures.forEach((fail, idx) => {
    console.log('\n' + (idx + 1) + '. ' + fail.name);
    console.log('   Usage: ' + fail.usage);
    console.log('   Current: ' + fail.ratio + ':1 (needs ' + fail.required + ':1)');
    console.log('   Deficit: ' + fail.deficit);
  });

  console.log('\n======================================');
  console.log('VERDICT: ⛔ BLOCK - Fix contrast issues');
  console.log('======================================');
} else {
  console.log('\n======================================');
  console.log('VERDICT: ✅ PASS - All AA standards met');
  console.log('======================================');
}

// Specific Recommendations
console.log('\n======================================');
console.log('RECOMMENDATIONS');
console.log('======================================');

console.log('\n1. TEXTURE GUIDELINES:');
console.log('   • Keep texture opacity < 5% to maintain contrast');
console.log('   • Test with textures active on all backgrounds');
console.log('   • Avoid busy patterns over text areas');

console.log('\n2. INTERACTIVE STATES:');
console.log('   • Ensure all hover states maintain AA compliance');
console.log('   • Focus indicators need 3:1 minimum contrast');
console.log('   • Disabled states should use 3:1 for clarity');

console.log('\n3. EARTHY PALETTE ADJUSTMENTS:');
if (failures.length > 0) {
  // Check specific problem colors
  const problemColors = new Set();
  failures.forEach(f => problemColors.add(f.fg));

  if (problemColors.has(colors.sage)) {
    console.log('   • Sage (#8B9574) needs darkening for small text');
    console.log('     Suggested: #6B7559 or #5C6349');
  }
  if (problemColors.has(colors.moss)) {
    console.log('   • Moss (#6B7C59) may need adjustment');
    console.log('     Suggested: #556245 or #4A5739');
  }
  if (problemColors.has(colors.goldenHour)) {
    console.log('   • Golden Hour (#D4A574) needs darkening');
    console.log('     Suggested: #B88D5C or #9E7A4D');
  }
}

console.log('\n4. ACCESSIBILITY ENHANCEMENTS:');
console.log('   • Add high contrast mode CSS variables');
console.log('   • Implement prefers-contrast media query');
console.log('   • Test with Windows High Contrast Mode');
console.log('   • Verify with screen readers');

// Phase 1 Earth Tones Validation
console.log('\n======================================');
console.log('PHASE 1 EARTH TONES VALIDATION');
console.log('======================================');

const phase1Tests = [
  { name: 'Deep earth on parchment', fg: colors.forest, bg: colors.cream },
  { name: 'Moss on cream', fg: colors.moss, bg: colors.cream },
  { name: 'Clay on light', fg: colors.terracotta, bg: colors.white },
  { name: 'Bark on sand', fg: colors.bark, bg: colors.sand },
];

console.log('\nPhase 1 Color Combinations:');
phase1Tests.forEach(test => {
  const ratio = getContrastRatio(test.fg, test.bg);
  const pass = ratio >= 4.5;
  console.log((pass ? '✅' : '❌') + ' ' + test.name + ': ' + ratio.toFixed(2) + ':1');
});

// Export verdict
const verdict = failures.length === 0 ? 'PASS' : 'BLOCK';
console.log('\n======================================');
console.log('FINAL VERDICT: ' + verdict);
console.log('======================================');

if (verdict === 'BLOCK') {
  console.log('\n⚠️  ACTION REQUIRED:');
  console.log('1. Update failing color combinations');
  console.log('2. Re-run validation after changes');
  console.log('3. Test with actual site at localhost:3006');
  console.log('4. Verify with browser DevTools contrast checker');
}