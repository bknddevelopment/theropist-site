/**
 * WCAG Contrast Checker for Rosa Toral Therapy Site
 * Validates all color combinations against WCAG 2.2 standards
 */

// New Earthy Color Palette
export const earthyPalette = {
  // Primary Earth Tones
  deepEarth: '#3D2F27',    // Deep earth text
  parchment: '#FAF6F0',    // Light parchment background
  moss: '#6B7C59',         // Moss green
  clay: '#B87A5C',         // Clay/terracotta
  bark: '#5C4033',         // Dark bark
  sand: '#E8D5C4',         // Sand background

  // Supporting Colors
  sage: '#7B8D7C',         // Original sage (kept for compatibility)
  cream: '#FAF8F3',        // Original cream
  forest: '#2C3E2D',       // Original forest green
  terracotta: '#C07255',   // Original terracotta

  // Additional Earth Tones
  stone: '#8B7F77',        // Stone gray
  wheat: '#E5D4B1',        // Wheat field
  olive: '#7A7449',        // Olive branch
  rust: '#A0522D',         // Rust orange

  // Neutral Tones
  charcoal: '#2B2520',     // Dark charcoal
  ash: '#9B9589',          // Ash gray
  bone: '#F7F3ED',         // Bone white

  // State Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
}

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

// Calculate relative luminance (WCAG formula)
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const rsRGB = rgb.r / 255
  const gsRGB = rgb.g / 255
  const bsRGB = rgb.b / 255

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Calculate contrast ratio
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  const lum1 = getRelativeLuminance(rgb1)
  const lum2 = getRelativeLuminance(rgb2)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

// WCAG compliance levels
export interface WCAGLevel {
  AA: {
    normalText: number      // 4.5:1
    largeText: number       // 3:1 (≥24px regular or ≥19px bold)
    uiComponents: number    // 3:1
  }
  AAA: {
    normalText: number      // 7:1
    largeText: number       // 4.5:1
    uiComponents: number    // 3:1 (same as AA)
  }
}

export const WCAGStandards: WCAGLevel = {
  AA: {
    normalText: 4.5,
    largeText: 3,
    uiComponents: 3,
  },
  AAA: {
    normalText: 7,
    largeText: 4.5,
    uiComponents: 3,
  },
}

// Check if contrast meets WCAG standards
export function checkWCAGCompliance(
  foreground: string,
  background: string,
  textSize: 'normal' | 'large' | 'ui' = 'normal',
  level: 'AA' | 'AAA' = 'AA'
): {
  ratio: number
  passes: boolean
  required: number
  recommendation?: string
} {
  const ratio = getContrastRatio(foreground, background)
  const standards = WCAGStandards[level]

  let required: number
  switch (textSize) {
    case 'large':
      required = standards.largeText
      break
    case 'ui':
      required = standards.uiComponents
      break
    default:
      required = standards.normalText
  }

  const passes = ratio >= required

  let recommendation
  if (!passes) {
    const deficit = required - ratio
    recommendation = `Contrast ratio ${ratio.toFixed(2)}:1 fails ${level} standard (needs ${required}:1). Increase contrast by ${deficit.toFixed(2)}`
  }

  return { ratio, passes, required, recommendation }
}

// Test all critical color combinations
export interface ColorCombination {
  name: string
  foreground: string
  background: string
  usage: string
  textSize: 'normal' | 'large' | 'ui'
  state?: string
  theme?: 'light' | 'dark'
}

export const criticalCombinations: ColorCombination[] = [
  // Primary Text Combinations
  {
    name: 'Body Text on Parchment',
    foreground: earthyPalette.deepEarth,
    background: earthyPalette.parchment,
    usage: 'Main body text',
    textSize: 'normal',
  },
  {
    name: 'Body Text on Cream',
    foreground: earthyPalette.deepEarth,
    background: earthyPalette.cream,
    usage: 'Alternative body text',
    textSize: 'normal',
  },
  {
    name: 'Moss Text on Parchment',
    foreground: earthyPalette.moss,
    background: earthyPalette.parchment,
    usage: 'Accent text, links',
    textSize: 'normal',
  },
  {
    name: 'Moss Text on Cream',
    foreground: earthyPalette.moss,
    background: earthyPalette.cream,
    usage: 'Accent text on cream',
    textSize: 'normal',
  },

  // Button Combinations
  {
    name: 'Clay Button Text',
    foreground: earthyPalette.white,
    background: earthyPalette.clay,
    usage: 'Primary button text',
    textSize: 'normal',
  },
  {
    name: 'Clay Button Text Alt',
    foreground: earthyPalette.parchment,
    background: earthyPalette.clay,
    usage: 'Primary button text alternative',
    textSize: 'normal',
  },
  {
    name: 'Bark Button Text',
    foreground: earthyPalette.parchment,
    background: earthyPalette.bark,
    usage: 'Secondary button text',
    textSize: 'normal',
  },
  {
    name: 'Moss Button Text',
    foreground: earthyPalette.white,
    background: earthyPalette.moss,
    usage: 'Tertiary button text',
    textSize: 'normal',
  },

  // Headings
  {
    name: 'Heading on Parchment',
    foreground: earthyPalette.bark,
    background: earthyPalette.parchment,
    usage: 'H1-H3 headings',
    textSize: 'large',
  },
  {
    name: 'Heading on Sand',
    foreground: earthyPalette.bark,
    background: earthyPalette.sand,
    usage: 'Headings on sand background',
    textSize: 'large',
  },

  // Navigation
  {
    name: 'Nav Text Default',
    foreground: earthyPalette.forest,
    background: earthyPalette.cream,
    usage: 'Navigation menu items',
    textSize: 'normal',
  },
  {
    name: 'Nav Text Hover',
    foreground: earthyPalette.terracotta,
    background: earthyPalette.cream,
    usage: 'Navigation hover state',
    textSize: 'normal',
    state: 'hover',
  },

  // Form Elements
  {
    name: 'Form Label',
    foreground: earthyPalette.deepEarth,
    background: earthyPalette.parchment,
    usage: 'Form field labels',
    textSize: 'normal',
  },
  {
    name: 'Form Placeholder',
    foreground: earthyPalette.ash,
    background: earthyPalette.white,
    usage: 'Input placeholder text',
    textSize: 'normal',
  },
  {
    name: 'Form Error',
    foreground: earthyPalette.rust,
    background: earthyPalette.parchment,
    usage: 'Error messages',
    textSize: 'normal',
  },

  // Links
  {
    name: 'Link Default',
    foreground: earthyPalette.olive,
    background: earthyPalette.parchment,
    usage: 'Default link color',
    textSize: 'normal',
  },
  {
    name: 'Link Hover',
    foreground: earthyPalette.rust,
    background: earthyPalette.parchment,
    usage: 'Link hover state',
    textSize: 'normal',
    state: 'hover',
  },

  // UI Components
  {
    name: 'Icon on Background',
    foreground: earthyPalette.moss,
    background: earthyPalette.cream,
    usage: 'Icon colors',
    textSize: 'ui',
  },
  {
    name: 'Border on Background',
    foreground: earthyPalette.stone,
    background: earthyPalette.parchment,
    usage: 'Card borders',
    textSize: 'ui',
  },
  {
    name: 'Focus Indicator',
    foreground: earthyPalette.clay,
    background: earthyPalette.parchment,
    usage: 'Focus outline',
    textSize: 'ui',
  },

  // Dark Mode Combinations (if needed)
  {
    name: 'Dark Mode Text',
    foreground: earthyPalette.bone,
    background: earthyPalette.charcoal,
    usage: 'Text in dark mode',
    textSize: 'normal',
    theme: 'dark',
  },
  {
    name: 'Dark Mode Heading',
    foreground: earthyPalette.wheat,
    background: earthyPalette.charcoal,
    usage: 'Headings in dark mode',
    textSize: 'large',
    theme: 'dark',
  },
]

// Generate full contrast report
export function generateContrastReport(level: 'AA' | 'AAA' = 'AA') {
  const results = criticalCombinations.map((combo) => {
    const compliance = checkWCAGCompliance(
      combo.foreground,
      combo.background,
      combo.textSize,
      level
    )

    return {
      ...combo,
      ...compliance,
      foregroundHex: combo.foreground,
      backgroundHex: combo.background,
    }
  })

  const passing = results.filter(r => r.passes)
  const failing = results.filter(r => !r.passes)

  return {
    summary: {
      total: results.length,
      passing: passing.length,
      failing: failing.length,
      passRate: `${((passing.length / results.length) * 100).toFixed(1)}%`,
      level,
    },
    passing,
    failing,
    all: results,
  }
}

// Find best alternative color for failed combinations
export function findBestAlternative(
  originalColor: string,
  backgroundColor: string,
  textSize: 'normal' | 'large' | 'ui' = 'normal',
  level: 'AA' | 'AAA' = 'AA'
): { color: string; name: string; ratio: number } | null {
  const required = WCAGStandards[level][
    textSize === 'large' ? 'largeText' :
    textSize === 'ui' ? 'uiComponents' :
    'normalText'
  ]

  const alternatives = Object.entries(earthyPalette)
    .map(([name, color]) => {
      if (color === 'transparent') return null
      const ratio = getContrastRatio(color, backgroundColor)
      return { name, color, ratio }
    })
    .filter((alt): alt is { name: string; color: string; ratio: number } =>
      alt !== null && alt.ratio >= required
    )
    .sort((a, b) => {
      // Prefer colors closer to the original's luminance
      const originalLum = getRelativeLuminance(hexToRgb(originalColor))
      const aLum = getRelativeLuminance(hexToRgb(a.color))
      const bLum = getRelativeLuminance(hexToRgb(b.color))
      return Math.abs(aLum - originalLum) - Math.abs(bLum - originalLum)
    })

  return alternatives[0] || null
}

// Export formatted report
export function formatContrastReport() {
  const aaReport = generateContrastReport('AA')
  const aaaReport = generateContrastReport('AAA')

  console.log('=== WCAG CONTRAST VALIDATION REPORT ===')
  console.log('Site: Rosa Toral Therapy')
  console.log('Palette: New Earthy Tones')
  console.log('')

  console.log('--- WCAG AA Compliance ---')
  console.log(`Pass Rate: ${aaReport.summary.passRate}`)
  console.log(`Passing: ${aaReport.summary.passing}/${aaReport.summary.total}`)

  if (aaReport.failing.length > 0) {
    console.log('\n⚠️  Failing AA Combinations:')
    aaReport.failing.forEach(fail => {
      console.log(`\n• ${fail.name}`)
      console.log(`  Usage: ${fail.usage}`)
      console.log(`  Foreground: ${fail.foregroundHex} | Background: ${fail.backgroundHex}`)
      console.log(`  Ratio: ${fail.ratio.toFixed(2)}:1 (needs ${fail.required}:1)`)

      const alt = findBestAlternative(fail.foreground, fail.background, fail.textSize, 'AA')
      if (alt) {
        console.log(`  ✓ Suggested fix: Use ${alt.name} (${alt.color}) - Ratio: ${alt.ratio.toFixed(2)}:1`)
      }
    })
  } else {
    console.log('✓ All combinations pass AA standards!')
  }

  console.log('\n--- WCAG AAA Compliance ---')
  console.log(`Pass Rate: ${aaaReport.summary.passRate}`)
  console.log(`Passing: ${aaaReport.summary.passing}/${aaaReport.summary.total}`)

  return {
    aa: aaReport,
    aaa: aaaReport,
  }
}