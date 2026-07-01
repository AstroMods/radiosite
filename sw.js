const CACHE_NAME = "vantix-radio-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/css/page.css",
  "/css/player.css",
  "/css/request.css",
  "/css/live.css",
  "/css/head.css",
  "/css/foot.css"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
