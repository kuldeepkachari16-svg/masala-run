// Masala Run service worker — offline play.
// Strategy: network-first with cache fallback. Fresh code wins when online
// (no stale-version traps during fast iteration); the last good copy serves
// when offline.
const CACHE = "masala-run-v29";
const ASSETS = [
  "./",
  "index.html",
  "game.js",
  "manifest.json",
  "fonts/bangers.woff2",
  // Character sprites (see docs/sprites.md).
  "assets/sprites/courier.svg",
  "assets/sprites/bland.svg",
  // Active theme (city-art): procedural road + these transparent edge-prop strips
  // (tools/import_art.py). Network-first means a theme swap just needs this list
  // updated; un-listed images still cache on first fetch.
  "assets/props/mumbai-day.png",
  "assets/props/mumbai-night.png",
  "assets/props/jaisalmer-day.png",
  "assets/props/jaisalmer-night.png",
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
    // cache:"no-cache" forces the browser to REVALIDATE with the server (cheap
    // 304 when unchanged) instead of silently serving a stale disk-cached copy.
    // This is what kept old game.js alive after a deploy. Offline still falls
    // back to the cache below.
    fetch(e.request, { cache: "no-cache" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
