const VERSION = 'v0.8.1';
const CACHE_NAME = 'solodev-' + VERSION;
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg'
];

// Установка: кэшируем ресурсы, но не падаем, если что-то недоступно
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => 
      Promise.all(
        ASSETS.map(url => cache.add(url).catch(err => {
          console.warn('Не удалось кэшировать:', url, err);
        }))
      )
    )
  );
  self.skipWaiting();
});

// Активация: удаляем старые кэши
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Перехват запросов
self.addEventListener('fetch', e => {
  // Обрабатываем только GET-запросы
  if (e.request.method !== 'GET') return;

  // Для HTML и навигации всегда берём свежую версию
  if (e.request.mode === 'navigate' || e.request.url.endsWith('.html')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .then(r => {
          const copy = r.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
          return r;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Для остальных ресурсов: кэш → сеть
  e.respondWith(
    caches.match(e.request).then(r => {
      if (r) return r;
      return fetch(e.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
        return response;
      });
    }).catch(() => new Response('Офлайн', { status: 503, statusText: 'Offline' }))
  );
});
