// Masala Run service worker — offline play.
// Strategy: network-first with cache fallback. Fresh code wins when online
// (no stale-version traps during fast iteration); the last good copy serves
// when offline.
const CACHE = "masala-run-v31";
const ASSETS = [
  "./",
  "index.html",
  "game.js",
  "manifest.json",
  "fonts/bangers.woff2",
  // Character sprites (see docs/sprites.md).
  "assets/sprites/courier.svg",
  "assets/sprites/bland.svg",
  // Active theme is "retro-day" (procedural road, game.js ACTIVE_THEME) plus the
  // production edge-prop masters the composer actually draws — these three and
  // only these (EDGE_PROP_DEFS entries without `test: true`).
  //
  // This list used to name the four city-<day|night> strips. Those belong to the
  // "city-art" theme, which retro-day never loads (loadThemeImages returns early
  // on theme().draw), so the install step was fetching 4.2 MB that no shipped
  // code path requests — while the props that DO draw went unprecached, leaving
  // offline play on the bare procedural road. If ACTIVE_THEME ever moves to
  // city-art, swap this block back. Network-first means un-listed images still
  // cache on first fetch; this list only decides what survives going offline.
  "assets/props/mumbai_prop_vadapav_cart_fixed_canopy_right_neutral_1x_v002.png",
  "assets/props/mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v003.png",
  "assets/props/mumbai_prop_chai_counter_shallow_awning_right_neutral_1x_v001.png",
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
