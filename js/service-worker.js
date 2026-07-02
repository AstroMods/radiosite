const CACHE_NAME = "vantix-radio-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./css/page.css",
  "./css/player.css",
  "./css/request.css",
  "./css/live.css",
  "./css/head.css",
  "./css/foot.css"
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );

  self.skipWaiting();
});

// ACTIVATE (cleanup old caches)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});

// FETCH (better fallback handling)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        // optional: cache new requests dynamically
        return response;
      });
    })
  );
});
