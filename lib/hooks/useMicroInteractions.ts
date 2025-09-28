'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useScroll, useMotionValue, useTransform } from 'framer-motion'

// Sound effects configuration
interface SoundConfig {
  enabled: boolean
  volume: number
  sounds: {
    hover?: string
    click?: string
    success?: string
    error?: string
    transition?: string
  }
}

// Haptic feedback for mobile devices
interface HapticFeedback {
  light: () => void
  medium: () => void
  heavy: () => void
}

// Therapeutic color transitions
interface ColorTransition {
  primary: string
  secondary: string
  accent: string
  progress: number
}

export interface MicroInteractionConfig {
  magnetic?: boolean
  magneticStrength?: number
  ripple?: boolean
  glow?: boolean
  scale?: boolean
  rotate?: boolean
  particles?: boolean
  particleCount?: number
  soundFeedback?: boolean
}

/**
 * Enhanced micro-interactions hook with therapeutic features
 */
export const useMicroInteractions = (config: MicroInteractionConfig = {}) => {
  const elementRef = useRef<HTMLElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  // Magnetic effect
  const handleMagneticEffect = useCallback((e: MouseEvent) => {
    if (!elementRef.current || !config.magnetic) return

    const element = elementRef.current
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) +
      Math.pow(e.clientY - centerY, 2)
    )

    const maxDistance = 100
    const strength = config.magneticStrength || 0.3

    if (distance < maxDistance) {
      const pullX = ((e.clientX - centerX) / maxDistance) * 10 * strength
      const pullY = ((e.clientY - centerY) / maxDistance) * 10 * strength

      element.style.transform = `translate(${pullX}px, ${pullY}px)`
    }
  }, [config.magnetic, config.magneticStrength])

  // Ripple effect
  const createRipple = useCallback((e: MouseEvent) => {
    if (!elementRef.current || !config.ripple) return

    const element = elementRef.current
    const rect = element.getBoundingClientRect()
    const ripple = document.createElement('span')

    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.className = 'micro-ripple'

    element.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }, [config.ripple])

  // Particle effect
  const createParticles = useCallback((e: MouseEvent) => {
    if (!config.particles) return

    const count = config.particleCount || 5
    const container = document.createElement('div')
    container.className = 'particle-container'
    container.style.position = 'fixed'
    container.style.left = `${e.clientX}px`
    container.style.top = `${e.clientY}px`
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9999'

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span')
      particle.className = 'earth-particle'

      const angle = (Math.PI * 2 * i) / count
      const velocity = 30 + Math.random() * 20

      particle.style.setProperty('--x', `${Math.cos(angle) * velocity}px`)
      particle.style.setProperty('--y', `${Math.sin(angle) * velocity}px`)

      container.appendChild(particle)
    }

    document.body.appendChild(container)

    setTimeout(() => {
      container.remove()
    }, 1000)
  }, [config.particles, config.particleCount])

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      handleMagneticEffect(e)
    })
  }, [handleMagneticEffect])

  // Mouse enter handler
  const handleMouseEnter = useCallback((e: MouseEvent) => {
    setIsHovering(true)

    if (elementRef.current) {
      if (config.scale) {
        elementRef.current.style.transform = 'scale(1.05)'
      }

      if (config.glow) {
        elementRef.current.classList.add('micro-glow')
      }

      if (config.rotate) {
        elementRef.current.style.transform += ' rotate(2deg)'
      }
    }
  }, [config.scale, config.glow, config.rotate])

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)

    if (elementRef.current) {
      elementRef.current.style.transform = ''
      elementRef.current.classList.remove('micro-glow')
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Click handler
  const handleClick = useCallback((e: MouseEvent) => {
    createRipple(e)
    createParticles(e)

    if (config.soundFeedback) {
      // Visual feedback mimicking sound
      if (elementRef.current) {
        elementRef.current.classList.add('pulse-feedback')
        setTimeout(() => {
          elementRef.current?.classList.remove('pulse-feedback')
        }, 300)
      }
    }
  }, [createRipple, createParticles, config.soundFeedback])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Add transition styles
    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    element.style.position = 'relative'
    element.style.overflow = 'hidden'

    // Add event listeners
    element.addEventListener('mouseenter', handleMouseEnter as any)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousemove', handleMouseMove as any)
    element.addEventListener('click', handleClick as any)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter as any)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove as any)
      element.removeEventListener('click', handleClick as any)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, handleClick])

  return {
    ref: elementRef,
    isHovering,
    cursorPosition
  }
}

/**
 * Hook for therapeutic sound effects
 */
export function useTherapeuticSounds() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioContext = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContext.current = new AudioContext()
    }

    return () => {
      if (audioContext.current) {
        audioContext.current.close()
      }
    }
  }, [])

  const playSound = useCallback((type: 'hover' | 'click' | 'success' | 'error') => {
    if (!soundEnabled || !audioContext.current) return

    const frequencies = {
      hover: 440,    // A4 - calming
      click: 523,    // C5 - gentle confirmation
      success: 659,  // E5 - uplifting
      error: 349     // F4 - soft notice
    }

    const duration = {
      hover: 0.1,
      click: 0.15,
      success: 0.3,
      error: 0.2
    }

    try {
      const osc = audioContext.current.createOscillator()
      const gainNode = audioContext.current.createGain()

      osc.type = 'sine'
      osc.frequency.value = frequencies[type]

      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.current.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + duration[type])

      osc.connect(gainNode)
      gainNode.connect(audioContext.current.destination)

      osc.start(audioContext.current.currentTime)
      osc.stop(audioContext.current.currentTime + duration[type])
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }, [soundEnabled])

  return {
    soundEnabled,
    setSoundEnabled,
    playSound
  }
}

/**
 * Hook for scroll-based color transitions
 */
export function useScrollColorTransition() {
  const { scrollYProgress } = useScroll()
  const [colors, setColors] = useState({
    primary: '#8B7355',
    secondary: '#D4A574',
    accent: '#E8DCC4'
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const scrollPercent = progress * 100

      const colorSteps = {
        0: { primary: '#8B7355', secondary: '#D4A574', accent: '#E8DCC4' },
        25: { primary: '#7A6B55', secondary: '#C4A574', accent: '#E8DCC4' },
        50: { primary: '#6B5D4F', secondary: '#B89968', accent: '#F4E4D1' },
        75: { primary: '#5C4E42', secondary: '#A8896C', accent: '#F0DFC8' },
        100: { primary: '#4D3F36', secondary: '#997A60', accent: '#EBD6BD' }
      }

      const threshold = Math.floor(scrollPercent / 25) * 25
      const nextThreshold = Math.min(threshold + 25, 100)
      const localProgress = (scrollPercent - threshold) / 25

      const currentColors = colorSteps[threshold as keyof typeof colorSteps]
      const nextColors = colorSteps[nextThreshold as keyof typeof colorSteps]

      // Interpolate colors
      const interpolateHex = (color1: string, color2: string, progress: number) => {
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

      setColors({
        primary: interpolateHex(currentColors.primary, nextColors.primary, localProgress),
        secondary: interpolateHex(currentColors.secondary, nextColors.secondary, localProgress),
        accent: interpolateHex(currentColors.accent, nextColors.accent, localProgress)
      })
    })

    return unsubscribe
  }, [scrollYProgress])

  return colors
}

/**
 * Hook for haptic feedback on mobile devices
 */
export function useHapticFeedback() {
  const triggerHaptic = useCallback((intensity: 'light' | 'medium' | 'heavy') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20, 10, 20],
        heavy: [30, 20, 30, 20, 30]
      }
      navigator.vibrate(patterns[intensity])
    }
  }, [])

  return { triggerHaptic }
}