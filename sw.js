const CACHE_NAME = 'autonews-v1';
const ASSETS = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'images/icon-192.svg',
  'images/icon-512.svg'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request).then(resp => {
    return caches.open(CACHE_NAME).then(cache => {
      cache.put(e.request, resp.clone());
      return resp;
    });
  })).catch(() => caches.match('index.html')));
  // Note: fallback to index.html for SPA navigation
});
