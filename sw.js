// Service Worker временно отключён для очистки кэша
// Новая версия: v6.33.3
var CACHE_NAME = 'solodev-v6.33.3-CLEAR';

self.addEventListener('install', function(event) {
  // Пропускаем активацию сразу
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  // НЕ кэшируем — просто проксируем запросы
  event.respondWith(fetch(event.request));
});

self.addEventListener('activate', function(event) {
  // Удаляем ВСЕ старые кэши
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});
