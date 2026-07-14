// Group Reunion Card - service worker for offline support.
// Bump CACHE_VERSION whenever any app-shell file below changes.
const CACHE_VERSION = 'v6';
const CACHE_NAME = `reunion-card-${CACHE_VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/app.js',
  './js/data.js',
  './js/nav.js',
  './js/render.js',
  './fonts/figtree-latin.woff2',
  './fonts/newsreader-latin.woff2',
  './fonts/newsreader-italic-latin.woff2',
  './icons/CursilloCross.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable.png',
  './icons/favicon-32.png',
  './icons/favicon-48.png'
].map((path) => new URL(path, self.location).href);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

async function handleRequest(event) {
  const { request } = event;
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Stale-while-revalidate: serve the cached copy immediately, refresh in the background.
    event.waitUntil(networkFetch);
    return cached;
  }

  const networkResponse = await networkFetch;
  if (networkResponse) return networkResponse;

  if (request.mode === 'navigate') {
    const fallback = await cache.match(new URL('./index.html', self.location).href);
    if (fallback) return fallback;
  }

  return Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(handleRequest(event));
});
