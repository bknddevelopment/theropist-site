/**
 * Therapeutic Micro-Interactions System
 * Calming, organic animations that respond to user behavior
 */

import { Variants, TargetAndTransition } from 'framer-motion'

// Color transitions based on scroll depth
export const getScrollColorTransition = (scrollProgress: number) => {
  const colors = {
    0: { primary: '#8B7355', secondary: '#D4A574', accent: '#E8DCC4' },
    25: { primary: '#7A6B55', secondary: '#C4A574', accent: '#E8DCC4' },
    50: { primary: '#6B5D4F', secondary: '#B89968', accent: '#F4E4D1' },
    75: { primary: '#5C4E42', secondary: '#A8896C', accent: '#F0DFC8' },
    100: { primary: '#4D3F36', secondary: '#997A60', accent: '#EBD6BD' }
  }

  const threshold = Math.floor(scrollProgress / 25) * 25
  const nextThreshold = Math.min(threshold + 25, 100)
  const progress = (scrollProgress - threshold) / 25

  const currentColors = colors[threshold as keyof typeof colors]
  const nextColors = colors[nextThreshold as keyof typeof colors]

  return {
    primary: interpolateColor(currentColors.primary, nextColors.primary, progress),
    secondary: interpolateColor(currentColors.secondary, nextColors.secondary, progress),
    accent: interpolateColor(currentColors.accent, nextColors.accent, progress)
  }
}

// Hex color interpolation
function interpolateColor(color1: string, color2: string, progress: number): string {
  const hex1 = color1.substring(1)
  const hex2 = color2.substring(1)

  const r1 = parseInt(hex1.substring(0, 2), 16)
  const g1 = parseInt(hex1.substring(2, 4), 16)
  const b1 = parseInt(hex1.substring(4, 6), 16)

  const r2 = parseInt(hex2.substring(0, 2), 16)
  const g2 = parseInt(hex2.substring(2, 4), 16)
  const b2 = parseInt(hex2.substring(4, 6), 16)

  const r = Math.round(r1 + (r2 - r1) * progress)
  const g = Math.round(g1 + (g2 - g1) * progress)
  const b = Math.round(b1 + (b2 - b1) * progress)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Organic morphing hover states
export const organicHover: Variants = {
  initial: {
    borderRadius: '1rem',
    scale: 1,
    filter: 'brightness(1)',
  },
  hover: {
    borderRadius: ['1rem', '1.5rem', '1.2rem', '1.4rem', '1rem'],
    scale: [1, 1.02, 1.01, 1.015, 1.02],
    filter: 'brightness(1.05)',
    transition: {
      duration: 0.8,
      ease: [0.4, 0.0, 0.2, 1],
      borderRadius: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut'
      }
    }
  }
}

// Breathing animation for stress relief elements
export const breathingAnimation: Variants = {
  initial: {
    scale: 1,
    opacity: 0.8,
  },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Progress celebration animations
export const celebrationVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
    y: 20
  },
  celebrate: {
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    y: [20, -10, 0],
    transition: {
      duration: 0.6,
      ease: [0.68, -0.55, 0.265, 1.55]
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

// Gentle form validation feedback
export const validationFeedback = {
  success: {
    initial: { x: -10, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  },
  error: {
    initial: { x: 0 },
    animate: {
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  },
  encouragement: {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: 'backOut' }
    }
  }
}

// Page transition with emotional continuity
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    filter: 'blur(10px)',
    scale: 0.98
  },
  enter: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  exit: {
    opacity: 0,
    filter: 'blur(5px)',
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  }
}

// Ripple effect for touch interactions
export const rippleEffect = (x: number, y: number): TargetAndTransition => ({
  background: `radial-gradient(circle at ${x}px ${y}px, rgba(139, 115, 85, 0.1) 0%, transparent 70%)`,
  transition: { duration: 0.6, ease: 'easeOut' }
})

// Floating elements animation
export const floatingAnimation: Variants = {
  initial: {
    y: 0,
  },
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(5px)'
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

// Therapeutic color pulse for focus elements
export const therapeuticPulse: Variants = {
  initial: {
    boxShadow: '0 0 0 0 rgba(139, 115, 85, 0.4)'
  },
  pulse: {
    boxShadow: [
      '0 0 0 0 rgba(139, 115, 85, 0.4)',
      '0 0 0 10px rgba(139, 115, 85, 0)',
      '0 0 0 0 rgba(139, 115, 85, 0)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Morphing shapes for loading states
export const morphingLoader: Variants = {
  initial: {
    borderRadius: '50%',
    rotate: 0
  },
  loading: {
    borderRadius: ['50%', '20%', '50%', '30%', '50%'],
    rotate: 360,
    transition: {
      borderRadius: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      },
      rotate: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  }
}

// Gentle shake for attention
export const gentleShake: Variants = {
  initial: { rotate: 0 },
  shake: {
    rotate: [-1, 1, -1, 1, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
}

// Smooth reveal animation
export const smoothReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

// Haptic-style feedback patterns
export const hapticFeedback = {
  light: {
    scale: [1, 0.98, 1],
    transition: { duration: 0.1 }
  },
  medium: {
    scale: [1, 0.95, 1.02, 1],
    transition: { duration: 0.15 }
  },
  strong: {
    scale: [1, 0.93, 1.05, 0.98, 1],
    transition: { duration: 0.2 }
  }
}

// Calming wave animation
export const calmingWave: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop' as const
      },
      opacity: {
        duration: 0.5
      }
    }
  }
}

// Organic border animation
export const organicBorder: Variants = {
  initial: {
    borderRadius: '1rem 2rem 1.5rem 2.5rem'
  },
  animate: {
    borderRadius: [
      '1rem 2rem 1.5rem 2.5rem',
      '2rem 1rem 2.5rem 1.5rem',
      '1.5rem 2.5rem 1rem 2rem',
      '2.5rem 1.5rem 2rem 1rem',
      '1rem 2rem 1.5rem 2.5rem'
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Encouraging message animations
export const encouragingMessage: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -10,
    transition: {
      duration: 0.2
    }
  }
}

// Export animation presets for different moods
export const moodAnimations = {
  calm: {
    duration: 2,
    ease: 'easeInOut',
    scale: [1, 1.02, 1],
    opacity: [0.9, 1, 0.9]
  },
  energizing: {
    duration: 1,
    ease: 'backOut',
    scale: [0.95, 1.05, 1],
    rotate: [0, 5, 0]
  },
  grounding: {
    duration: 3,
    ease: 'linear',
    y: [0, 5, 0],
    opacity: [0.8, 1, 0.8]
  },
  focusing: {
    duration: 1.5,
    ease: 'easeOut',
    scale: [1.1, 1],
    filter: ['blur(5px)', 'blur(0px)']
  }
}

// Therapeutic sound effect triggers (to be used with audio API)
export const soundTriggers = {
  hover: 'soft-chime',
  click: 'gentle-tap',
  success: 'peaceful-bell',
  transition: 'flowing-water',
  error: 'soft-notice',
  focus: 'breathing-guide'
}