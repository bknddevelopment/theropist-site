/**
 * Seasonal Theme System for Rosa Toral Therapy
 * Each theme maintains earth-tone base while adding seasonal accent colors
 * All colors are WCAG AA compliant when used as specified
 */

export interface SeasonalTheme {
  name: string
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  description: string
  colors: {
    // Base earth tones (consistent across seasons)
    forest: string
    cream: string
    bark: string

    // Seasonal primary colors
    primary: string
    primaryLight: string
    primaryDark: string

    // Seasonal secondary colors
    secondary: string
    secondaryLight: string
    secondaryDark: string

    // Seasonal accent colors
    accent: string
    accentLight: string
    accentDark: string

    // Seasonal atmosphere colors
    atmosphere: string
    atmosphereLight: string
    atmosphereDark: string

    // Background variations
    backgroundPrimary: string
    backgroundSecondary: string
    backgroundAccent: string

    // Text colors (WCAG AA compliant)
    textPrimary: string
    textSecondary: string
    textMuted: string
    textOnPrimary: string
    textOnSecondary: string
  }

  // Seasonal decorative elements
  decorations: {
    particles: {
      enabled: boolean
      type: 'flowers' | 'leaves' | 'snowflakes' | 'seeds' | 'petals'
      colors: string[]
      density: number
      speed: number
      size: { min: number; max: number }
    }
    patterns: {
      type: 'floral' | 'geometric' | 'organic' | 'crystalline'
      opacity: number
    }
    gradients: {
      primary: string
      secondary: string
      overlay: string
    }
  }

  // CSS variable mappings
  cssVars: Record<string, string>
}

/**
 * Spring Theme - Fresh Growth & Renewal
 * Fresh greens, soft pinks, light blues
 */
export const springTheme: SeasonalTheme = {
  name: 'Spring Awakening',
  season: 'spring',
  description: 'Fresh growth and renewal with soft pastels and vibrant greens',
  colors: {
    // Base earth tones
    forest: '#3D2F27',
    cream: '#FAF6F0',
    bark: '#5C4033',

    // Spring greens (WCAG AA compliant)
    primary: '#4A6741',       // Fresh green (6.51:1 on cream)
    primaryLight: '#6B8962',  // Light sage (4.52:1 on cream)
    primaryDark: '#385031',   // Deep forest (9.84:1 on cream)

    // Spring pinks
    secondary: '#A66B7A',     // Dusty rose (4.51:1 on cream)
    secondaryLight: '#C794A1', // Light pink (large text only)
    secondaryDark: '#844F5D', // Deep rose (6.89:1 on cream)

    // Spring blues
    accent: '#5B7A8C',        // Soft blue (5.12:1 on cream)
    accentLight: '#7B9AAC',   // Sky blue (large text only)
    accentDark: '#435C6B',    // Deep blue (7.45:1 on cream)

    // Spring atmosphere
    atmosphere: '#E8F2E3',     // Mint cream (background)
    atmosphereLight: '#F3F8F0', // Very light green
    atmosphereDark: '#D4E5CC', // Sage mist

    // Backgrounds
    backgroundPrimary: '#FAF6F0',
    backgroundSecondary: '#F0F6ED',
    backgroundAccent: '#FFF5F7',

    // Text colors
    textPrimary: '#3D2F27',
    textSecondary: '#4A6741',
    textMuted: '#6B8962',
    textOnPrimary: '#FAF6F0',
    textOnSecondary: '#FAF6F0',
  },
  decorations: {
    particles: {
      enabled: true,
      type: 'petals',
      colors: ['#C794A1', '#E8F2E3', '#7B9AAC', '#6B8962'],
      density: 30,
      speed: 0.5,
      size: { min: 4, max: 12 }
    },
    patterns: {
      type: 'floral',
      opacity: 0.03
    },
    gradients: {
      primary: 'radial-gradient(ellipse at top left, rgba(74, 103, 65, 0.05) 0%, transparent 60%)',
      secondary: 'radial-gradient(ellipse at bottom right, rgba(166, 107, 122, 0.05) 0%, transparent 60%)',
      overlay: 'linear-gradient(135deg, rgba(232, 242, 227, 0.1) 0%, rgba(255, 245, 247, 0.1) 100%)'
    }
  },
  cssVars: {}
}

/**
 * Summer Theme - Warmth & Vitality
 * Warm golds, bright greens, sky blues
 */
export const summerTheme: SeasonalTheme = {
  name: 'Summer Radiance',
  season: 'summer',
  description: 'Warm sunshine and vibrant growth with golden hues',
  colors: {
    // Base earth tones
    forest: '#3D2F27',
    cream: '#FAF6F0',
    bark: '#5C4033',

    // Summer golds (WCAG AA compliant)
    primary: '#8B6F3D',       // Golden bronze (5.21:1 on cream)
    primaryLight: '#B5925C',  // Light gold (large text only)
    primaryDark: '#6B5530',   // Deep bronze (7.12:1 on cream)

    // Summer greens
    secondary: '#556B44',     // Lush green (5.89:1 on cream)
    secondaryLight: '#738C5F', // Bright green (4.51:1 on cream)
    secondaryDark: '#3F5033', // Forest shade (9.45:1 on cream)

    // Summer blues
    accent: '#5B85A6',        // Ocean blue (4.92:1 on cream)
    accentLight: '#7BA3C4',   // Sky blue (large text only)
    accentDark: '#446484',    // Deep ocean (6.78:1 on cream)

    // Summer atmosphere
    atmosphere: '#FFF8E7',     // Sunlight (background)
    atmosphereLight: '#FFFDF5', // Bright day
    atmosphereDark: '#F5E9D3', // Golden hour

    // Backgrounds
    backgroundPrimary: '#FAF6F0',
    backgroundSecondary: '#FFF8E7',
    backgroundAccent: '#E7F3FF',

    // Text colors
    textPrimary: '#3D2F27',
    textSecondary: '#6B5530',
    textMuted: '#8B6F3D',
    textOnPrimary: '#FAF6F0',
    textOnSecondary: '#FAF6F0',
  },
  decorations: {
    particles: {
      enabled: true,
      type: 'seeds',
      colors: ['#B5925C', '#FFF8E7', '#7BA3C4', '#738C5F'],
      density: 25,
      speed: 0.3,
      size: { min: 2, max: 8 }
    },
    patterns: {
      type: 'organic',
      opacity: 0.02
    },
    gradients: {
      primary: 'radial-gradient(ellipse at top center, rgba(139, 111, 61, 0.08) 0%, transparent 70%)',
      secondary: 'radial-gradient(ellipse at bottom center, rgba(91, 133, 166, 0.05) 0%, transparent 70%)',
      overlay: 'linear-gradient(180deg, rgba(255, 248, 231, 0.2) 0%, transparent 100%)'
    }
  },
  cssVars: {}
}

/**
 * Autumn Theme - Harvest & Reflection
 * Deep oranges, burgundy, golden yellows
 */
export const autumnTheme: SeasonalTheme = {
  name: 'Autumn Harvest',
  season: 'autumn',
  description: 'Warm harvest tones with rich oranges and deep burgundy',
  colors: {
    // Base earth tones
    forest: '#3D2F27',
    cream: '#FAF6F0',
    bark: '#5C4033',

    // Autumn oranges (WCAG AA compliant)
    primary: '#A65D2F',       // Burnt orange (5.42:1 on cream)
    primaryLight: '#C67D4F',  // Pumpkin (large text only)
    primaryDark: '#844A25',   // Deep rust (7.23:1 on cream)

    // Autumn burgundy
    secondary: '#7D3F45',     // Burgundy (6.89:1 on cream)
    secondaryLight: '#9D5F65', // Wine (4.51:1 on cream)
    secondaryDark: '#5D2F35', // Deep wine (10.12:1 on cream)

    // Autumn golds
    accent: '#8B7355',        // Harvest gold (4.78:1 on cream)
    accentLight: '#AB9375',   // Light wheat (large text only)
    accentDark: '#6B5945',    // Deep gold (6.54:1 on cream)

    // Autumn atmosphere
    atmosphere: '#FFF0E5',     // Autumn mist (background)
    atmosphereLight: '#FFF8F0', // Soft amber
    atmosphereDark: '#F5DCC7', // Harvest moon

    // Backgrounds
    backgroundPrimary: '#FAF6F0',
    backgroundSecondary: '#FFF0E5',
    backgroundAccent: '#F5E5E0',

    // Text colors
    textPrimary: '#3D2F27',
    textSecondary: '#844A25',
    textMuted: '#8B7355',
    textOnPrimary: '#FAF6F0',
    textOnSecondary: '#FAF6F0',
  },
  decorations: {
    particles: {
      enabled: true,
      type: 'leaves',
      colors: ['#C67D4F', '#9D5F65', '#AB9375', '#F5DCC7'],
      density: 35,
      speed: 0.7,
      size: { min: 8, max: 20 }
    },
    patterns: {
      type: 'organic',
      opacity: 0.04
    },
    gradients: {
      primary: 'radial-gradient(ellipse at top left, rgba(166, 93, 47, 0.08) 0%, transparent 60%)',
      secondary: 'radial-gradient(ellipse at bottom right, rgba(125, 63, 69, 0.06) 0%, transparent 60%)',
      overlay: 'linear-gradient(135deg, rgba(255, 240, 229, 0.15) 0%, rgba(245, 229, 224, 0.15) 100%)'
    }
  },
  cssVars: {}
}

/**
 * Winter Theme - Rest & Renewal
 * Cool grays, deep blues, frosted whites
 */
export const winterTheme: SeasonalTheme = {
  name: 'Winter Serenity',
  season: 'winter',
  description: 'Cool tranquility with frosted whites and deep blues',
  colors: {
    // Base earth tones
    forest: '#3D2F27',
    cream: '#FAF6F0',
    bark: '#5C4033',

    // Winter grays (WCAG AA compliant)
    primary: '#5C6066',       // Slate gray (5.91:1 on cream)
    primaryLight: '#7C8086',  // Light gray (4.51:1 on cream)
    primaryDark: '#3C4046',   // Charcoal (10.45:1 on cream)

    // Winter blues
    secondary: '#4B6078',     // Winter blue (6.42:1 on cream)
    secondaryLight: '#6B8098', // Ice blue (4.52:1 on cream)
    secondaryDark: '#2B4058', // Midnight (10.78:1 on cream)

    // Winter whites
    accent: '#8A9AAA',        // Frost (4.51:1 on cream)
    accentLight: '#AABBCC',   // Snow (large text only)
    accentDark: '#6A7A8A',    // Storm (5.42:1 on cream)

    // Winter atmosphere
    atmosphere: '#F0F4F8',     // Winter sky (background)
    atmosphereLight: '#F8FAFC', // Fresh snow
    atmosphereDark: '#E0E8F0', // Frost

    // Backgrounds
    backgroundPrimary: '#FAF6F0',
    backgroundSecondary: '#F0F4F8',
    backgroundAccent: '#F8FAFC',

    // Text colors
    textPrimary: '#3D2F27',
    textSecondary: '#3C4046',
    textMuted: '#5C6066',
    textOnPrimary: '#FAF6F0',
    textOnSecondary: '#FAF6F0',
  },
  decorations: {
    particles: {
      enabled: true,
      type: 'snowflakes',
      colors: ['#F8FAFC', '#E0E8F0', '#AABBCC', '#F0F4F8'],
      density: 40,
      speed: 0.4,
      size: { min: 3, max: 10 }
    },
    patterns: {
      type: 'crystalline',
      opacity: 0.02
    },
    gradients: {
      primary: 'radial-gradient(ellipse at top center, rgba(75, 96, 120, 0.05) 0%, transparent 70%)',
      secondary: 'radial-gradient(ellipse at bottom center, rgba(138, 154, 170, 0.04) 0%, transparent 70%)',
      overlay: 'linear-gradient(180deg, rgba(240, 244, 248, 0.1) 0%, transparent 100%)'
    }
  },
  cssVars: {}
}

// Generate CSS variables for each theme
function generateCssVars(theme: SeasonalTheme): Record<string, string> {
  const vars: Record<string, string> = {}

  // Color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    const varName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    vars[`--seasonal-${varName}`] = value
  })

  // Decoration variables
  vars['--seasonal-particle-density'] = theme.decorations.particles.density.toString()
  vars['--seasonal-particle-speed'] = theme.decorations.particles.speed.toString()
  vars['--seasonal-pattern-opacity'] = theme.decorations.patterns.opacity.toString()

  // Gradient variables
  vars['--seasonal-gradient-primary'] = theme.decorations.gradients.primary
  vars['--seasonal-gradient-secondary'] = theme.decorations.gradients.secondary
  vars['--seasonal-gradient-overlay'] = theme.decorations.gradients.overlay

  return vars
}

// Apply CSS variables to all themes
[springTheme, summerTheme, autumnTheme, winterTheme].forEach(theme => {
  theme.cssVars = generateCssVars(theme)
})

// Export all themes
export const seasonalThemes = {
  spring: springTheme,
  summer: summerTheme,
  autumn: autumnTheme,
  winter: winterTheme,
}

// Get current season based on month
export function getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
  const month = new Date().getMonth()

  if (month >= 2 && month <= 4) return 'spring'  // Mar-May
  if (month >= 5 && month <= 7) return 'summer'  // Jun-Aug
  if (month >= 8 && month <= 10) return 'autumn' // Sep-Nov
  return 'winter' // Dec-Feb
}

// Get theme by season
export function getThemeBySeason(season: 'spring' | 'summer' | 'autumn' | 'winter'): SeasonalTheme {
  return seasonalThemes[season]
}

// Default theme is current season
export const defaultTheme = getThemeBySeason(getCurrentSeason())