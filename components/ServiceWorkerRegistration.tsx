'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && (window as any).workbox !== undefined) {
      // Skip default registration since Workbox will handle it
      return
    }

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration)

            // Check for updates periodically (every hour)
            setInterval(() => {
              registration.update()
            }, 60 * 60 * 1000)

            // Handle updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New service worker available
                    if (confirm('New version available! Reload to update?')) {
                      newWorker.postMessage({ type: 'SKIP_WAITING' })
                      window.location.reload()
                    }
                  }
                })
              }
            })
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error)
          })
      })

      // Handle controller changes
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })

      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        // Delay notification request to avoid being intrusive
        setTimeout(() => {
          Notification.requestPermission()
        }, 30000) // 30 seconds after page load
      }

      // Register periodic background sync
      if ('periodicSync' in navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(async (registration) => {
          try {
            await (registration as any).periodicSync.register('check-updates', {
              minInterval: 24 * 60 * 60 * 1000 // 24 hours
            })
          } catch (error) {
            console.log('Periodic sync registration failed:', error)
          }
        })
      }
    }
  }, [])

  return null
}