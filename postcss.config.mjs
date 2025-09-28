/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // CSS optimization for production builds
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
            minifyFontValues: true,
            minifySelectors: true,
            normalizeWhitespace: true,
            // Optimize gradients
            colormin: true,
            // Merge media queries
            mergeLonghand: true,
            mergeRules: true,
            // Optimize calc() expressions
            calc: true,
            // Remove unused keyframes
            discardUnused: {
              keyframes: false, // Keep all keyframes as they're used dynamically
            },
            // Optimize z-index values
            zindex: true,
            // Reduce transform precision
            reduceTransforms: true,
          },
        ],
      },
    } : {}),
  },
}

export default config