// yeah,idk how this works
const CACHE_NAME = 'Image and Css Cache';
const urlsToCache = [
  'task/css/main.css',
  'task/css/products.css',
  'task/css/style.css',
  'task/css/toast.css',
  'task/assets/logo.webp',
  'task/assets/products/item1.webp',
  'task/assets/products/item2.webp',
  'task/assets/products/item3.webp',
  'task/assets/products/item4.webp',
  'task/assets/products/item5.webp',
  'task/assets/products/item6.webp',
  'task/assets/products/item7.webp',
  'task/assets/products/item8.webp',
  'task/assets/products/item9.webp',
];

// install the service worker then cache the files?
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});
// retrieve cashed files?
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
