// Service Worker for Rosa Toral Therapy PWA
// Version: 1.0.0

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAMES = {
  static: `static-cache-${CACHE_VERSION}`,
  dynamic: `dynamic-cache-${CACHE_VERSION}`,
  images: `images-cache-${CACHE_VERSION}`,
  fonts: `fonts-cache-${CACHE_VERSION}`,
  api: `api-cache-${CACHE_VERSION}`
};

// Assets to cache on install (critical resources)
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Network First: Try network, fallback to cache
  networkFirst: async (request, cacheName) => {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  },

  // Cache First: Try cache, fallback to network
  cacheFirst: async (request, cacheName) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      throw error;
    }
  },

  // Stale While Revalidate: Return cache immediately, update in background
  staleWhileRevalidate: async (request, cacheName) => {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request).then(async (networkResponse) => {
      if (networkResponse.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    });

    return cachedResponse || fetchPromise;
  },

  // Network Only: Always fetch from network
  networkOnly: async (request) => {
    return fetch(request);
  }
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');

  event.waitUntil(
    caches.open(CACHE_NAMES.static)
      .then((cache) => {
        console.log('[ServiceWorker] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => !Object.values(CACHE_NAMES).includes(cacheName))
            .map((cacheName) => {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle different resource types with appropriate strategies
  if (request.destination === 'image') {
    // Images: Cache first with 30-day expiry
    event.respondWith(
      CACHE_STRATEGIES.cacheFirst(request, CACHE_NAMES.images)
        .catch(() => caches.match('/images/placeholder.svg'))
    );
  } else if (request.destination === 'font' || url.pathname.includes('/fonts/')) {
    // Fonts: Cache first with long expiry
    event.respondWith(
      CACHE_STRATEGIES.cacheFirst(request, CACHE_NAMES.fonts)
    );
  } else if (url.pathname.startsWith('/api/')) {
    // API calls: Network first with 5-minute cache
    event.respondWith(
      CACHE_STRATEGIES.networkFirst(request, CACHE_NAMES.api)
        .catch(() => {
          // Return cached API response or error message
          return caches.match(request) ||
            new Response(JSON.stringify({ error: 'Offline' }), {
              headers: { 'Content-Type': 'application/json' }
            });
        })
    );
  } else if (request.destination === 'document' || request.mode === 'navigate') {
    // HTML pages: Network first for freshness
    event.respondWith(
      CACHE_STRATEGIES.networkFirst(request, CACHE_NAMES.dynamic)
        .catch(() => caches.match('/offline.html'))
    );
  } else if (
    url.pathname.includes('/_next/static/') ||
    url.pathname.includes('.css') ||
    url.pathname.includes('.js')
  ) {
    // Static assets: Cache first (they're versioned)
    event.respondWith(
      CACHE_STRATEGIES.cacheFirst(request, CACHE_NAMES.static)
    );
  } else {
    // Default: Stale while revalidate
    event.respondWith(
      CACHE_STRATEGIES.staleWhileRevalidate(request, CACHE_NAMES.dynamic)
    );
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncOfflineForms());
  }
});

async function syncOfflineForms() {
  try {
    const cache = await caches.open('offline-forms');
    const requests = await cache.keys();

    await Promise.all(
      requests.map(async (request) => {
        try {
          const response = await fetch(request.clone());
          if (response.ok) {
            await cache.delete(request);
          }
        } catch (error) {
          console.error('Failed to sync form:', error);
        }
      })
    );
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New appointment reminder',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Rosa Toral Therapy', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/appointments')
    );
  }
});

// Message handling for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.payload;
    caches.open(CACHE_NAMES.dynamic)
      .then((cache) => cache.addAll(urlsToCache));
  }
});

// Periodic background sync for checking updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-updates') {
    event.waitUntil(checkForUpdates());
  }
});

async function checkForUpdates() {
  try {
    const response = await fetch('/api/check-updates');
    const data = await response.json();

    if (data.hasUpdates) {
      self.registration.showNotification('Updates Available', {
        body: 'New content is available. Refresh to see the latest.',
        icon: '/icons/icon-192x192.png'
      });
    }
  } catch (error) {
    console.error('Failed to check for updates:', error);
  }
}