'use client'

import { useEffect, useRef, useState } from 'react'

interface ParallaxConfig {
  speed?: number // 0.5 = half speed, 1 = normal, 2 = double speed
  offset?: number // Initial offset in pixels
  easing?: string // CSS easing function
  disabled?: boolean // Disable parallax (for reduced motion)
}

interface ParallaxState {
  transform: string
  opacity?: number
}

export function useParallax({
  speed = 0.5,
  offset = 0,
  easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  disabled = false
}: ParallaxConfig = {}): [React.RefObject<HTMLDivElement | null>, ParallaxState] {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [state, setState] = useState<ParallaxState>({
    transform: `translateY(${offset}px)`,
    opacity: 1
  })
  const rafRef = useRef<number | undefined>(undefined)
  const lastScrollY = useRef(0)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (disabled || prefersReducedMotion) {
      setState({ transform: 'none', opacity: 1 })
      return
    }

    const handleScroll = () => {
      if (!elementRef.current) return

      // Cancel any existing animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        const element = elementRef.current
        if (!element) return

        const rect = element.getBoundingClientRect()
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const elementTop = rect.top + scrollY
        const elementHeight = rect.height

        // Calculate if element is in viewport
        const isInViewport = (
          elementTop < scrollY + windowHeight &&
          elementTop + elementHeight > scrollY
        )

        if (isInViewport) {
          // Calculate parallax offset
          const scrollDelta = scrollY - lastScrollY.current
          const parallaxOffset = scrollDelta * (1 - speed)
          const currentTransform = element.style.transform

          // Parse current Y translation
          const match = currentTransform.match(/translateY\(([-\d.]+)px\)/)
          const currentY = match ? parseFloat(match[1]) : offset

          // Apply new transform with smooth interpolation
          const newY = currentY + parallaxOffset
          const clampedY = Math.max(-500, Math.min(500, newY)) // Prevent excessive translation

          // Calculate opacity based on viewport position (fade in/out at edges)
          const viewportPosition = (elementTop - scrollY) / windowHeight
          let opacity = 1

          if (viewportPosition < 0.1) {
            opacity = Math.max(0.3, viewportPosition * 10)
          } else if (viewportPosition > 0.7) {
            opacity = Math.max(0.3, (1 - viewportPosition) * 3.33)
          }

          setState({
            transform: `translateY(${clampedY}px)`,
            opacity
          })
        }

        lastScrollY.current = scrollY
      })
    }

    // Use Intersection Observer for performance
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '100px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleScroll()
        }
      })
    }, observerOptions)

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    // Passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (elementRef.current && observer) {
        observer.unobserve(elementRef.current)
      }
      observer.disconnect()
    }
  }, [speed, offset, disabled])

  return [elementRef, state]
}

// Hook for multiple parallax layers
export function useParallaxLayers(layers: ParallaxConfig[]) {
  return layers.map(config => useParallax(config))
}

// Utility to detect touch devices
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }

    checkTouch()
    window.addEventListener('resize', checkTouch)

    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  return isTouch
}