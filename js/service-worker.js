const CACHE = "vantix-radio-v2";

const STATIC_FILES = [
    "/",
    "/index.html",
    "/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(STATIC_FILES))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE)
                    .map(key => caches.delete(key))
            )
        )
    );

    self.clients.claim();
});

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    // Never cache the live radio stream
    if (
        url.hostname.includes("fastcast4u.com") ||
        event.request.destination === "audio"
    ) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {

            if (cached) {
                return cached;
            }

            return fetch(event.request).then(response => {

                if (!response.ok) return response;

                const clone = response.clone();

                const shouldCache =
                    event.request.destination === "script" ||
                    event.request.destination === "style" ||
                    event.request.destination === "image" ||
                    event.request.destination === "font" ||
                    url.pathname.endsWith(".js") ||
                    url.pathname.endsWith(".css") ||
                    url.pathname.endsWith(".png") ||
                    url.pathname.endsWith(".jpg") ||
                    url.pathname.endsWith(".jpeg") ||
                    url.pathname.endsWith(".svg") ||
                    url.pathname.endsWith(".webp") ||
                    url.pathname.endsWith(".ico") ||
                    url.pathname.endsWith(".woff") ||
                    url.pathname.endsWith(".woff2");

                if (shouldCache) {
                    caches.open(CACHE).then(cache => {
                        cache.put(event.request, clone);
                    });
                }

                return response;
            }).catch(() => caches.match("/index.html"));
        })
    );

});
