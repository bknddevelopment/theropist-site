'use client'

import { useState, useEffect } from 'react'
import { X, Activity, Zap, Clock, AlertCircle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { getWebVitalsSnapshot } from '@/lib/performance/web-vitals'

interface MetricData {
  name: string
  value: number | string
  unit: string
  rating: 'good' | 'needs-improvement' | 'poor'
  target: string
  description: string
  icon: React.ComponentType<any>
}

export function PerformanceMonitorDashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [overallScore, setOverallScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isOpen) return

    const updateMetrics = async () => {
      setIsLoading(true)

      // Get Web Vitals
      const vitals = await getWebVitalsSnapshot()

      // Get additional performance metrics
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paintEntries = performance.getEntriesByType('paint')

      const metricsData: MetricData[] = [
        {
          name: 'LCP (Largest Contentful Paint)',
          value: vitals.LCP ? `${(vitals.LCP / 1000).toFixed(2)}` : 'Measuring...',
          unit: 's',
          rating: getRating('LCP', vitals.LCP || 0),
          target: '< 2.5s',
          description: 'Time to render the largest content element',
          icon: Activity
        },
        {
          name: 'INP (Interaction to Next Paint)',
          value: vitals.INP ? `${vitals.INP.toFixed(0)}` : 'Waiting for input...',
          unit: 'ms',
          rating: getRating('INP', vitals.INP || 0),
          target: '< 200ms',
          description: 'Time from interaction to visual response',
          icon: Zap
        },
        {
          name: 'CLS (Cumulative Layout Shift)',
          value: vitals.CLS ? vitals.CLS.toFixed(3) : 'Measuring...',
          unit: '',
          rating: getRating('CLS', vitals.CLS || 0),
          target: '< 0.1',
          description: 'Visual stability of the page',
          icon: AlertCircle
        },
        {
          name: 'FCP (First Contentful Paint)',
          value: vitals.FCP ? `${(vitals.FCP / 1000).toFixed(2)}` : 'Measuring...',
          unit: 's',
          rating: getRating('FCP', vitals.FCP || 0),
          target: '< 1.8s',
          description: 'Time to first content render',
          icon: Clock
        },
        {
          name: 'TTFB (Time to First Byte)',
          value: vitals.TTFB ? `${vitals.TTFB.toFixed(0)}` : 'Measuring...',
          unit: 'ms',
          rating: getRating('TTFB', vitals.TTFB || 0),
          target: '< 800ms',
          description: 'Server response time',
          icon: TrendingUp
        },
        {
          name: 'INP (Interaction to Next Paint)',
          value: vitals.INP ? `${vitals.INP.toFixed(0)}` : 'Waiting for interaction...',
          unit: 'ms',
          rating: getRating('INP', vitals.INP || 0),
          target: '< 200ms',
          description: 'Responsiveness to user interactions',
          icon: Zap
        }
      ]

      // Add navigation timing metrics
      if (perfData) {
        metricsData.push(
          {
            name: 'DOM Content Loaded',
            value: `${(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart).toFixed(0)}`,
            unit: 'ms',
            rating: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart < 1500 ? 'good' : 'needs-improvement',
            target: '< 1500ms',
            description: 'Time to parse and execute scripts',
            icon: Clock
          },
          {
            name: 'Page Load Time',
            value: `${((perfData.loadEventEnd - perfData.fetchStart) / 1000).toFixed(2)}`,
            unit: 's',
            rating: (perfData.loadEventEnd - perfData.fetchStart) < 3000 ? 'good' : 'needs-improvement',
            target: '< 3s',
            description: 'Total page load time',
            icon: Activity
          }
        )
      }

      // Calculate overall score
      const goodMetrics = metricsData.filter(m => m.rating === 'good').length
      const score = Math.round((goodMetrics / metricsData.length) * 100)

      setMetrics(metricsData)
      setOverallScore(score)
      setIsLoading(false)
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [isOpen])

  function getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      LCP: { good: 2500, needsImprovement: 4000 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      FCP: { good: 1800, needsImprovement: 3000 },
      TTFB: { good: 800, needsImprovement: 1800 },
      INP: { good: 200, needsImprovement: 500 }
    }

    const threshold = thresholds[metric]
    if (!threshold) return 'needs-improvement'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.needsImprovement) return 'needs-improvement'
    return 'poor'
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50'
      case 'poor': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-sage text-white p-3 rounded-full shadow-lg hover:bg-forest transition-colors z-50"
        aria-label="Open Performance Monitor"
      >
        <Activity className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-sage text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Performance Monitor</h2>
            <p className="text-sm opacity-90 mt-1">Real-time Core Web Vitals & Metrics</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-forest/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Score */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Overall Performance Score</h3>
              <p className="text-sm text-gray-600">Based on Core Web Vitals and key metrics</p>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {isLoading ? '...' : `${overallScore}%`}
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage"></div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {metrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 mr-2 text-gray-600" />
                        <h4 className="font-medium text-sm">{metric.name}</h4>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(metric.rating)}`}>
                        {metric.rating === 'good' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : null}
                        {metric.rating}
                      </span>
                    </div>
                    <div className="flex items-baseline mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {metric.value}
                      </span>
                      {metric.unit && (
                        <span className="text-sm text-gray-500 ml-1">{metric.unit}</span>
                      )}
                      <span className="text-sm text-gray-400 ml-2">(target: {metric.target})</span>
                    </div>
                    <p className="text-xs text-gray-600">{metric.description}</p>
                  </div>
                )
              })}
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Performance Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Optimize images with next-gen formats (WebP, AVIF)</li>
              <li>• Minimize JavaScript execution time</li>
              <li>• Use font-display: swap for web fonts</li>
              <li>• Implement resource hints (preload, prefetch)</li>
              <li>• Enable text compression (Gzip, Brotli)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}