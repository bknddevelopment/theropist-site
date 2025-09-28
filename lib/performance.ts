/**
 * Performance optimization utilities for the Rosa Toral Therapy website
 * Ensures organic enhancements maintain excellent Core Web Vitals
 */

// Animation performance helpers
export const perfConfig = {
  // GPU-accelerated properties only
  gpuProps: ['transform', 'opacity', 'filter'] as const,

  // Animation durations
  durations: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 600,
    verySlow: 1000,
  } as const,

  // Easing functions optimized for performance
  easings: {
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  } as const,
}

/**
 * Add will-change property during animations for better performance
 * Automatically removes it after animation completes
 */
export function optimizeAnimation(
  element: HTMLElement,
  property: string,
  duration: number = perfConfig.durations.normal
): void {
  if (!element) return

  // Add will-change before animation
  element.style.willChange = property

  // Remove will-change after animation completes
  setTimeout(() => {
    element.style.willChange = 'auto'
  }, duration + 100) // Add small buffer
}

/**
 * Intersection Observer for lazy loading animations
 * Reduces initial paint time by deferring animations
 */
export function createLazyAnimationObserver(
  className: string = 'lazy-animate'
): IntersectionObserver {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          // Unobserve after animation triggers
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: '50px', // Start slightly before element is visible
    }
  )
  return observer
}

/**
 * Debounce function for expensive operations
 * Prevents performance issues from rapid event firing
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 100
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * Throttle function for scroll/resize handlers
 * Limits execution to improve performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 100
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Request Animation Frame wrapper for smooth animations
 * Ensures animations run at optimal 60fps
 */
export function rafSchedule(callback: FrameRequestCallback): number {
  return window.requestAnimationFrame(callback)
}

/**
 * Batch DOM reads/writes for better performance
 * Prevents layout thrashing
 */
export class DOMBatcher {
  private reads: Array<() => void> = []
  private writes: Array<() => void> = []
  private scheduled = false

  read(fn: () => void): void {
    this.reads.push(fn)
    this.scheduleFlush()
  }

  write(fn: () => void): void {
    this.writes.push(fn)
    this.scheduleFlush()
  }

  private scheduleFlush(): void {
    if (!this.scheduled) {
      this.scheduled = true
      requestAnimationFrame(() => this.flush())
    }
  }

  private flush(): void {
    // Execute all reads first
    const reads = this.reads.splice(0)
    const writes = this.writes.splice(0)

    reads.forEach((read) => read())
    writes.forEach((write) => write())

    this.scheduled = false
  }
}

/**
 * Preload critical images for better LCP
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * Check if user prefers reduced motion
 * Respects accessibility preferences
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Apply performance class based on device capabilities
 */
export function getPerformanceClass(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium'

  // Check connection speed
  const connection = (navigator as any).connection
  const slowConnection = connection?.effectiveType === '2g' || connection?.saveData

  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory
  const lowMemory = deviceMemory && deviceMemory < 4

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4
  const lowCores = cores < 4

  if (slowConnection || lowMemory || lowCores) {
    return 'low'
  }

  if (deviceMemory >= 8 && cores >= 8) {
    return 'high'
  }

  return 'medium'
}

/**
 * CSS containment helper for isolated components
 */
export function applyContainment(
  element: HTMLElement,
  type: 'layout' | 'paint' | 'style' | 'size' | 'all' = 'all'
): void {
  if (!element) return
  element.style.contain = type
}

/**
 * Monitor animation frame rate for performance debugging
 */
export class FPSMonitor {
  private lastTime = performance.now()
  private frames = 0
  private fps = 0

  start(): void {
    this.measure()
  }

  private measure = (): void => {
    const now = performance.now()
    this.frames++

    if (now >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (now - this.lastTime))
      this.frames = 0
      this.lastTime = now

      // Log if FPS drops below 30
      if (this.fps < 30 && process.env.NODE_ENV === 'development') {
        console.warn(`Low FPS detected: ${this.fps}fps`)
      }
    }

    requestAnimationFrame(this.measure)
  }

  getFPS(): number {
    return this.fps
  }
}

/**
 * Memory-efficient image lazy loading with blur-up effect
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  placeholder?: string
): void {
  if (!img) return

  // Set placeholder if provided
  if (placeholder) {
    img.src = placeholder
    img.classList.add('image-blur-load')
  }

  // Create observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement
          const src = target.dataset.src

          if (src) {
            // Preload image
            preloadImage(src).then(() => {
              target.src = src
              target.classList.add('loaded')
              observer.unobserve(target)
            })
          }
        }
      })
    },
    {
      rootMargin: '50px',
    }
  )

  observer.observe(img)
}

/**
 * Web Vitals tracking utilities
 */
export const vitals = {
  // Log Core Web Vitals
  logVitals: () => {
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onINP, onLCP, onTTFB, onFCP }) => {
        onCLS(console.log)
        onINP(console.log)
        onLCP(console.log)
        onTTFB(console.log)
        onFCP(console.log)
      })
    }
  },

  // Check if metrics meet targets
  meetsTargets: (metrics: {
    lcp?: number
    fid?: number
    cls?: number
  }): boolean => {
    const targets = {
      lcp: 2500, // < 2.5s
      fid: 100,  // < 100ms
      cls: 0.1,  // < 0.1
    }

    return Object.entries(metrics).every(([key, value]) => {
      const target = targets[key as keyof typeof targets]
      return target ? value <= target : true
    })
  },
}

// Export singleton batcher
export const domBatcher = new DOMBatcher()

// Export FPS monitor for development
export const fpsMonitor = process.env.NODE_ENV === 'development' ? new FPSMonitor() : null