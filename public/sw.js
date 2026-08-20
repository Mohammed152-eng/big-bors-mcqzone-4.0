/**
 * MCQZONE   Service Worker
 * 
 * Caching strategy:
 * - Navigation: Network-first, fallback to cached shell, then offline page
 * - Static assets: Stale-while-revalidate (serve cached, update in background)
 * - Paper assets: Cache-first for downloaded papers (offline practice packs)
 * - API calls: Network-only by default (no caching)
 */

const SHELL_CACHE = 'qm-shell-v5';
const OFFLINE_CACHE = 'qm-offline-v5';
const OFFLINE_PRACTICE_CACHE = 'qm-offline-practice-v1';
const OFFLINE_URL = '/offline';

// Routes that should work offline when cached
const SHELL_ROUTES = ['/', '/app', '/offline'];

// Static assets to precache
const STATIC_ASSETS = [
  '/favicon.png',
  '/favicon.png',
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache shell routes
      caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ROUTES)),
      // Cache static assets
      caches.open(SHELL_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
      // Ensure offline page is always cached
      caches.open(OFFLINE_CACHE).then((cache) => cache.add(OFFLINE_URL)),
    ]).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => ![SHELL_CACHE, OFFLINE_CACHE, OFFLINE_PRACTICE_CACHE].includes(key))
          .map((key) => caches.delete(key)),
      ),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * Fetch handler with proper offline support
 * 
 * Key fix: When offline, we try to serve cached content first before
 * falling back to the offline page. This allows the app to actually
 * work offline if the shell was cached.
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request, url));
    return;
  }

  // Handle static assets with stale-while-revalidate
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Handle paper PDFs with cache-first (for offline practice packs)
  if (isPaperAsset(url.pathname)) {
    event.respondWith(handlePaperAsset(request));
    return;
  }

  // All other requests: network-only (no service worker intervention)
});

/**
 * Handle navigation with proper fallback chain:
 * 1. Try network
 * 2. If network fails, serve cached version of requested route
 * 3. If not cached, serve cached /app (the main app shell)
 * 4. As last resort, serve the offline page
 */
async function handleNavigationRequest(request, url) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses for shell routes
    if (networkResponse.ok && SHELL_ROUTES.includes(url.pathname)) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch {
    // Network failed - try fallbacks
    
    // 1. Try exact match in cache
    const exactMatch = await caches.match(request);
    if (exactMatch) {
      return exactMatch;
    }
    
    // 2. For app routes, try serving the cached /app shell
    //    This allows client-side routing to work offline
    if (url.pathname.startsWith('/app')) {
      const appShell = await caches.match('/app');
      if (appShell) {
        return appShell;
      }
    }
    
    // 3. Try the homepage for marketing routes
    if (url.pathname === '/' || url.pathname.startsWith('/blog') || url.pathname.startsWith('/help')) {
      const homeCache = await caches.match('/');
      if (homeCache) {
        return homeCache;
      }
    }
    
    // 4. Final fallback: offline page
    const offlineCache = await caches.open(OFFLINE_CACHE);
    const offlineResponse = await offlineCache.match(OFFLINE_URL);
    return offlineResponse || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

/**
 * Stale-while-revalidate for static assets
 */
async function handleStaticAsset(request) {
  const cached = await caches.match(request);
  
  // Fetch from network in background
  const networkPromise = fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Return cached immediately if available, otherwise wait for network
  if (cached) {
    // Fire-and-forget network update
    networkPromise;
    return cached;
  }
  
  const networkResponse = await networkPromise;
  return networkResponse || new Response('Asset not available offline', { status: 503 });
}

/**
 * Cache-first for paper assets (PDFs from offline practice packs)
 */
async function handlePaperAsset(request) {
  // Check all caches for the paper asset
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  // Not cached, try network
  try {
    return await fetch(request);
  } catch {
    return new Response('Paper not available offline', { status: 503 });
  }
}

/**
 * Check if pathname is a static asset
 */
function isStaticAsset(pathname) {
  return (
    pathname.startsWith('/_next/static/') ||
    pathname === '/favicon.png' ||
    pathname === '/favicon.png' ||
    pathname === '/manifest.webmanifest' ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.woff2') ||
    pathname.endsWith('.woff')
  );
}

/**
 * Check if pathname is a paper asset (question paper or mark scheme)
 */
function isPaperAsset(pathname) {
  return (
    pathname.startsWith('/api/papers/') &&
    (pathname.endsWith('/question-paper') || pathname.endsWith('/mark-scheme'))
  );
}
