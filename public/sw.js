
// Service Worker for MedFlow Nexus PWA
const CACHE_NAME = 'medflow-nexus-cache-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/mask-icon.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tells the active service worker to take control of the page immediately
  self.clients.claim();
});

// Fetch event - network-first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If we got a valid response, clone it and cache it
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(async (error) => {
        console.log('[ServiceWorker] Fetch failed; returning offline page instead.', error);
        
        // Check if this is a navigation request
        if (event.request.mode === 'navigate') {
          // Return the cached offline page
          return caches.match(OFFLINE_URL);
        }
        
        // For non-navigation requests, try to return cached version
        const cachedResponse = await caches.match(event.request);
        return cachedResponse || new Response('Network error', { 
          status: 408, 
          headers: { 'Content-Type': 'text/plain' } 
        });
      })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
