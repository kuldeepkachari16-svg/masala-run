// Masala Run service worker — offline play.
// Strategy: network-first with cache fallback. Fresh code wins when online
// (no stale-version traps during fast iteration); the last good copy serves
// when offline.
const CACHE = "masala-run-v3";
const ASSETS = [
  "./",
  "index.html",
  "game.js",
  "manifest.json",
  "fonts/bangers.woff2",
  "assets/bg-street.jpg",
  "assets/bg-street-2.jpg",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
