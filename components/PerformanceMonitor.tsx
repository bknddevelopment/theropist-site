'use client'

import { useEffect } from 'react'

/**
 * Performance monitoring component
 * Tracks Core Web Vitals and reports to console in development
 */
export function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Monitor Core Web Vitals - web-vitals v5 API
      import('web-vitals').then(({ onCLS, onINP, onLCP, onTTFB, onFCP }) => {
        onCLS((result) => {
          console.log('CLS:', result.value.toFixed(3))
          if (result.value > 0.1) {
            console.warn('⚠️ CLS exceeds target (0.1):', result.value)
          }
        })

        onINP((result) => {
          console.log('INP:', result.value.toFixed(0), 'ms')
          if (result.value > 200) {
            console.warn('⚠️ INP exceeds target (200ms):', result.value)
          }
        })

        onLCP((result) => {
          console.log('LCP:', result.value.toFixed(0), 'ms')
          if (result.value > 2500) {
            console.warn('⚠️ LCP exceeds target (2500ms):', result.value)
          }
        })

        onTTFB((result) => {
          console.log('TTFB:', result.value.toFixed(0), 'ms')
        })

        onFCP((result) => {
          console.log('FCP:', result.value.toFixed(0), 'ms')
        })
      })

      // Monitor animation performance
      let animationCount = 0
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure' && entry.name.includes('animation')) {
            animationCount++
            if (entry.duration > 16.67) { // More than one frame at 60fps
              console.warn(`⚠️ Slow animation detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`)
            }
          }
        }
      })

      observer.observe({ entryTypes: ['measure'] })

      // Log performance summary every 10 seconds in development
      const interval = setInterval(() => {
        const paintEntries = performance.getEntriesByType('paint')
        const resourceEntries = performance.getEntriesByType('resource')

        const jsSize = resourceEntries
          .filter(entry => entry.name.includes('.js'))
          .reduce((total, entry) => total + (entry as any).transferSize, 0)

        const cssSize = resourceEntries
          .filter(entry => entry.name.includes('.css'))
          .reduce((total, entry) => total + (entry as any).transferSize, 0)

        console.group('📊 Performance Summary')
        console.log('Paint Timing:', paintEntries.map(e => `${e.name}: ${Math.round(e.startTime)}ms`).join(', '))
        console.log('JS Bundle Size:', (jsSize / 1024).toFixed(2), 'KB')
        console.log('CSS Size:', (cssSize / 1024).toFixed(2), 'KB')
        console.log('Total Animations:', animationCount)
        console.groupEnd()
      }, 10000)

      return () => {
        observer.disconnect()
        clearInterval(interval)
      }
    }
  }, [])

  return null
}