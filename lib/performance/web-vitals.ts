import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

// Performance thresholds based on Google's recommendations
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },  // Largest Contentful Paint
  CLS: { good: 0.1, needsImprovement: 0.25 },    // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 },   // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 },   // Time to First Byte
  INP: { good: 200, needsImprovement: 500 }      // Interaction to Next Paint
}

type MetricName = 'LCP' | 'CLS' | 'FCP' | 'TTFB' | 'INP'

interface PerformanceData {
  metric: MetricName
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
  id: string
  navigationType: string
}

// Analytics reporter
class PerformanceReporter {
  private buffer: PerformanceData[] = []
  private flushTimer: NodeJS.Timeout | null = null

  constructor() {
    // Send data every 10 seconds or when buffer reaches 10 items
    this.scheduleFlush()
  }

  report(data: PerformanceData) {
    this.buffer.push(data)

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${data.metric}: ${data.value.toFixed(2)}ms (${data.rating})`)
    }

    // Send immediately if buffer is full
    if (this.buffer.length >= 10) {
      this.flush()
    }
  }

  private scheduleFlush() {
    this.flushTimer = setInterval(() => {
      if (this.buffer.length > 0) {
        this.flush()
      }
    }, 10000)
  }

  private async flush() {
    if (this.buffer.length === 0) return

    const dataToSend = [...this.buffer]
    this.buffer = []

    try {
      // Send to analytics endpoint
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics: dataToSend,
          url: window.location.href,
          userAgent: navigator.userAgent,
          connection: (navigator as any).connection?.effectiveType || 'unknown'
        })
      })
    } catch (error) {
      console.error('Failed to send performance metrics:', error)
      // Re-add to buffer for retry
      this.buffer.unshift(...dataToSend)
    }
  }

  destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }
    this.flush()
  }
}

const reporter = new PerformanceReporter()

// Helper to determine rating based on thresholds
function getRating(metricName: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metricName]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

// Create performance data object
function createPerformanceData(metric: Metric, metricName: MetricName): PerformanceData {
  return {
    metric: metricName,
    value: metric.value,
    rating: getRating(metricName, metric.value),
    timestamp: Date.now(),
    id: metric.id,
    navigationType: metric.navigationType || 'unknown'
  }
}

// Initialize Web Vitals monitoring
export function initWebVitals() {
  // Core Web Vitals
  onLCP((metric) => {
    reporter.report(createPerformanceData(metric, 'LCP'))
  })

  onCLS((metric) => {
    reporter.report(createPerformanceData(metric, 'CLS'))
  })

  // Additional metrics
  onFCP((metric) => {
    reporter.report(createPerformanceData(metric, 'FCP'))
  })

  onTTFB((metric) => {
    reporter.report(createPerformanceData(metric, 'TTFB'))
  })

  onINP((metric) => {
    reporter.report(createPerformanceData(metric, 'INP'))
  })

  // Custom performance marks
  if (typeof window !== 'undefined') {
    // Mark when main content is interactive
    if (document.readyState === 'complete') {
      performance.mark('page-interactive')
    } else {
      window.addEventListener('load', () => {
        performance.mark('page-interactive')
      })
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`)
            }
          }
        })
        observer.observe({ entryTypes: ['longtask'] })
      } catch (e) {
        // Long task observer not supported
      }
    }
  }

  // Clean up on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      reporter.destroy()
    })
  }
}

// Performance optimization helpers
export const performanceOptimizations = {
  // Preload critical resources
  preloadResource(url: string, as: 'script' | 'style' | 'image' | 'font' | 'fetch') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = as

    if (as === 'font') {
      link.crossOrigin = 'anonymous'
    }

    document.head.appendChild(link)
  },

  // Prefetch resources for future navigation
  prefetchResource(url: string) {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  },

  // Preconnect to external domains
  preconnect(url: string) {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  },

  // DNS prefetch for external domains
  dnsPrefetch(url: string) {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = url
    document.head.appendChild(link)
  },

  // Lazy load images in viewport
  lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]')
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src!
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => imageObserver.observe(img))
    }
  },

  // Defer non-critical CSS
  deferCSS(href: string) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = href
    link.onload = function() {
      link.onload = null;
      (link as HTMLLinkElement).rel = 'stylesheet'
    }
    document.head.appendChild(link)
  },

  // Request idle callback polyfill
  requestIdleCallback(callback: () => void, options?: { timeout?: number }) {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(callback, options)
    } else {
      setTimeout(callback, options?.timeout || 1)
    }
  }
}

// Export metrics for real-time monitoring
export function getWebVitalsSnapshot(): Promise<{
  LCP?: number
  CLS?: number
  FCP?: number
  TTFB?: number
  INP?: number
}> {
  return new Promise((resolve) => {
    const snapshot: any = {}

    // Get current values (these will be the latest recorded)
    onLCP((metric) => { snapshot.LCP = metric.value }, { reportAllChanges: false })
    onCLS((metric) => { snapshot.CLS = metric.value }, { reportAllChanges: false })
    onFCP((metric) => { snapshot.FCP = metric.value }, { reportAllChanges: false })
    onTTFB((metric) => { snapshot.TTFB = metric.value }, { reportAllChanges: false })
    onINP((metric) => { snapshot.INP = metric.value }, { reportAllChanges: false })

    // Wait a tick for values to be collected
    setTimeout(() => resolve(snapshot), 100)
  })
}