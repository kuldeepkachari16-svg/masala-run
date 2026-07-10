// Masala Run — v0 greybox prototype
// One rule to know: you attack with whatever you last ate, and flavor fades.
// Vanilla Canvas, no dependencies. Mobile-first, portrait or landscape, keyboard too.

(() => {
"use strict";

// ---------- Canvas & scaling ----------
const canvas = document.getElementById("game");
// alpha:false + desynchronized: opaque canvas, lower input-to-photon latency
// (notably on Android Chrome). Safe: every frame starts with a full clear.
const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });

// Logical playfield: 480×800 portrait or 800×480 landscape, picked from the
// viewport orientation. Rendered letterboxed/scaled to the window.
// Landscape is parked for now (didn't feel right) — flip to re-enable.
const LANDSCAPE_ENABLED = false;
let W = 480;
let H = 800;
let scale = 1, offX = 0, offY = 0;
let bgCanvas = null, vignette = null; // rebuilt on orientation change

// Cap render resolution at 2x — 3x phone DPR costs frames, not visible clarity.
const DPR = () => Math.min(window.devicePixelRatio || 1, 2);


function resize() {
  const dpr = DPR();
  // visualViewport is the truth on mobile — innerHeight lies when the
  // browser URL bar expands/collapses, which pushed the arena off screen.
  const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  canvas.width = vw * dpr;
  canvas.height = vh * dpr;
  canvas.style.width = vw + "px";
  canvas.style.height = vh + "px";
  const pw = W, ph = H;
  const landscape = LANDSCAPE_ENABLED && vw > vh;
  // Design width is fixed; height matches the device aspect so the arena
  // fills the screen edge-to-edge (no letterbox bars). Clamped to a sane
  // range so very tall/short windows don't make the playfield absurd.
  W = landscape ? 800 : 480;
  H = landscape ? 480 : Math.round(Math.max(760, Math.min(1180, W * vh / vw)));
  if (!bgCanvas || W !== pw || H !== ph) {
    // Hazards hold absolute coords + are baked into the backdrop, so reposition
    // them for the new arena BEFORE rebuilding it (mobile URL-bar resize changes
    // H). Seeded by `level`, so the layout is identical — just re-fit.
    if ((W !== pw || H !== ph) && player && level >= 1) buildHazards();
    buildBackdrop();
    if ((W !== pw || H !== ph) && player) clampToArena(); // keep entities in bounds
    if (W !== pw || H !== ph) buildBarriers(); // barrier rects are W/H-relative
  }
  scale = Math.min(canvas.width / W, canvas.height / H);
  offX = (canvas.width - W * scale) / 2;
  offY = (canvas.height - H * scale) / 2;
}
// resize listeners are registered at the BOTTOM, after first init — a resize event
// must never run resize() before CITIES/player exist (curCity/clampToArena → TDZ).

// ---------- Pre-rendered art (procedural, zero asset files) ----------
function makeSprite(w, h, drawFn) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  drawFn(c.getContext("2d"), w, h);
  return c;
}

// Draw an image to fill w×h, preserving aspect (center-crop the overflow).
function coverDraw(g, img, w, h) {
  const s = Math.max(w / img.width, h / img.height);
  const dw = img.width * s, dh = img.height * s;
  g.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

// ---------- Visual themes ----------
// The whole look (backdrop images + procedural-street palette + vignette) is
// bundled into a named theme so we can A/B or fully revert without touching
// render code. SWITCH THEMES BY EDITING ACTIVE_THEME BELOW (code-only — this is
// deliberately NOT a player-facing setting). Live preview while developing:
//   __mr.setTheme("retro-day")  /  __mr.themes  (lists names)
// Each theme's backdrop masters live under assets/themes/<name>/. See THEMES.md.
const THEMES = {
  // The shipped night look (AI-generated portrait street scenes). v1 = archive
  // tag; bump to night-v2 etc. if we ever re-master these rather than editing.
  "night-v1": {
    vignette: 0.4, // radial darken strength at the edges
    bg: {
      1: "assets/themes/night-v1/bg-street.jpg",
      2: "assets/themes/night-v1/bg-street-2.jpg",
      3: "assets/themes/night-v1/bg-street-3.jpg",
      4: "assets/themes/night-v1/bg-street-4.jpg",
    },
    // Palette for the procedural drawStreet fallback (landscape / pre-load gap /
    // un-arted levels). Keyed names below are theme-agnostic.
    pal: {
      baseTop: "#191923", baseBot: "#14141d",
      path: "#1f1f2b", curb: "#262634", dash: "#23232f",
      lamp: "rgba(255, 178, 92, 0.07)",
      stall: "#20202e", awningA: "#3a2e36", awningB: "#2e2e42",
      crate: "#242433", crosswalk: "rgba(255, 255, 255, 0.05)",
    },
  },
  // Daytime flat retro direction — drawn procedurally in code (see drawDayStreet),
  // NOT from images: exact proportions (small props in the side-margins, big open
  // lane), simple recognisable shapes, consistent across unlimited levels.
  "retro-day": {
    vignette: 0.14, // daylight: only a gentle edge falloff
    draw: drawDayStreet, // procedural — takes precedence over bg images
    bg: {},
    pal: {
      baseTop: "#cdbb95", baseBot: "#c1ad84",
      path: "#b8a37c", curb: "#dccdb0", dash: "#e9ddc2",
      lamp: "rgba(255, 236, 170, 0.10)",
      stall: "#9c7a52", awningA: "#c2543f", awningB: "#d98a3a",
      crate: "#a8895f", crosswalk: "rgba(255, 255, 255, 0.18)",
    },
  },
  // City-flavored AI art (flat clean illustration — see ART_PIPELINE.md). Unlike
  // the level-keyed themes above, backgrounds resolve by CURRENT CITY + day/night
  // (assets/backgrounds/<city>-<day|night>.png), so one small image set scales to
  // every zone. Falls back to the procedural day street whenever a city's image is
  // missing, so the game never breaks on an absent file. Preview live in the dev
  // console: __mr.setTheme("city-art"). Ship it by setting ACTIVE_THEME below.
  "city-art": {
    vignette: 0.14,
    cityArt: true,               // resolve art by city + day/night, not level number
    edgeProps: true,             // device-agnostic: a procedural road BASE + AI prop
                                 // strips pinned to the REAL arena edges at runtime
                                 // (drawCityEdges). No full-bleed master, so nothing
                                 // ever crops — works identically on any screen size.
    fallbackDraw: drawDayStreet, // the road base (per-city palette via applyCityTheme)
    bg: {},
    pal: {
      baseTop: "#cdbb95", baseBot: "#c1ad84",
      path: "#b8a37c", curb: "#dccdb0", dash: "#e9ddc2",
      lamp: "rgba(255, 236, 170, 0.10)",
      stall: "#9c7a52", awningA: "#c2543f", awningB: "#d98a3a",
      crate: "#a8895f", crosswalk: "rgba(255, 255, 255, 0.18)",
    },
  },
};
const ACTIVE_THEME = "retro-day"; // <-- the only switch. Edit to revert/migrate.
// city-art is PARKED pending a rework: the edge-prop strips render far too large and
// busy (props dwarf the hero, sticker-halo shadows, obvious tiling, player overlaps
// them) — it violates the manifest's own readability_law. Re-enable only after the
// drawCityEdges scale/kerb/halo fixes land. Preview meanwhile: __mr.setTheme("city-art").

let curThemeName = ACTIVE_THEME; // mutable so __mr.setTheme() can preview live
function theme() { return THEMES[curThemeName] || THEMES["night-v1"]; }

// Per-level backdrops (portrait masters) for the active theme. Levels not listed
// fall back to the procedural drawStreet — as does landscape (no landscape art
// yet) and the gap before an image loads. Before any level is played the menu
// shows level 1's art; afterwards it keeps the last-played level's until the
// next loads.
let LEVEL_BG_SRC = theme().bg;
let bgImgs = {};
let CITY_BG = {}; // city-art full-bleed master: "<city>-<day|night>" -> Image
let CITY_PROPS = {}; // edge-props mode: "<city>-<day|night>" -> transparent side strip
function loadThemeImages() {
  bgImgs = {};
  LEVEL_BG_SRC = theme().bg;
  if (theme().cityArt) {
    // Preload every city's day + night art. A missing file just never loads, so
    // the procedural road shows alone — nothing breaks on absence. edgeProps mode
    // loads transparent prop strips (assets/props/); legacy mode loads full-bleed
    // masters (assets/backgrounds/).
    CITY_BG = {}; CITY_PROPS = {};
    const edge = theme().edgeProps;
    for (const c of CITIES) {
      for (const phase of ["day", "night"]) {
        const key = c.key + "-" + phase;
        const im = new Image();
        im.onload = () => { if (bgCanvas) buildBackdrop(); };
        im.src = (edge ? "assets/props/" : "assets/backgrounds/") + key + ".png";
        (edge ? CITY_PROPS : CITY_BG)[key] = im;
      }
    }
    return;
  }
  if (theme().draw) return; // procedural theme — no images to preload
  for (const n in LEVEL_BG_SRC) {
    const im = new Image();
    im.onload = () => { if (bgCanvas) buildBackdrop(); };
    im.src = LEVEL_BG_SRC[n];
    bgImgs[n] = im;
  }
}
// loadThemeImages() is called at the BOTTOM, after CITIES is defined — the city-art
// branch iterates CITIES (a const declared later → TDZ crash if called here).

// ---------- Character sprites (SVG → canvas) ----------
// Authored flat-vector sprites (see docs/sprites.md). Drawn straight from SVG so
// they stay crisp at any scale — no rasterization. Until a sprite loads (or if it
// fails), the procedural blob keeps drawing, so the game never breaks on assets.
// Each key resolves to assets/sprites/<key>.png FIRST (the AI-import target — see
// ART_PIPELINE.md); the value here is the authored fallback used until that PNG
// lands. courier/bland keep their SVG fallback so the game looks finished today;
// the rest are PNG-only and stay procedural until imported.
const SPRITE_SRC = {
  courier: "assets/sprites/courier.svg",
  bland: "assets/sprites/bland.svg",
  swarmer: "assets/sprites/swarmer.png",
  blandfather: "assets/sprites/blandfather.png",
  "vada-maharaja": "assets/sprites/vada-maharaja.png",
  "dune-raja": "assets/sprites/dune-raja.png",
};
const SPRITES = {}; // name -> { base, white, w, h } once loaded
// Raster supersample: rasterize the vector ABOVE display size so it stays crisp
// on hi-DPI and if we scale the sprite up later. Drawn down from this each frame.
const SPRITE_RASTER = 2;
function rasterizeSprite(img, scale) {
  const w = (img.naturalWidth || img.width), h = (img.naturalHeight || img.height);
  const c = document.createElement("canvas");
  c.width = Math.round(w * scale); c.height = Math.round(h * scale);
  c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
  return c;
}
function loadSprites() {
  for (const name in SPRITE_SRC) {
    // Prefer an imported PNG (assets/sprites/<name>.png); fall back to the authored
    // source (SVG) if that PNG is absent. So dropping a new PNG via the import
    // script overrides the procedural/SVG art with zero code changes, and a missing
    // PNG never regresses the current look.
    const png = "assets/sprites/" + name + ".png";
    const fallback = SPRITE_SRC[name];
    const load = (src, onFail) => {
      const im = new Image();
      im.onload = () => {
        const w = im.naturalWidth || im.width, h = im.naturalHeight || im.height;
        // Rasterize ONCE to a canvas. Drawing the raw SVG every frame re-decodes
        // the vector → flicker + dropped frames; a cached bitmap draws cheaply.
        SPRITES[name] = { base: rasterizeSprite(im, SPRITE_RASTER), white: null, w, h };
      };
      im.onerror = onFail || null;
      im.src = src;
    };
    load(png, fallback && fallback !== png ? () => load(fallback) : null);
  }
}
loadSprites();
// White silhouette of a sprite (cached) — the hit-flash frame.
function spriteWhite(s) {
  if (s.white) return s.white;
  const c = document.createElement("canvas");
  c.width = s.base.width; c.height = s.base.height;
  const g = c.getContext("2d");
  g.drawImage(s.base, 0, 0);
  g.globalCompositeOperation = "source-in";
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, c.width, c.height);
  s.white = c;
  return s.white;
}
// Flavor-colored silhouette of a sprite (cached per color) — overlaid at low
// alpha so the CHARACTER carries the flavor tint. No glow disc on the ground.
function spriteTint(s, color) {
  s.tints = s.tints || {};
  if (s.tints[color]) return s.tints[color];
  const c = document.createElement("canvas");
  c.width = s.base.width; c.height = s.base.height;
  const g = c.getContext("2d");
  g.drawImage(s.base, 0, 0);
  g.globalCompositeOperation = "source-in";
  g.fillStyle = color;
  g.fillRect(0, 0, c.width, c.height);
  s.tints[color] = c;
  return s.tints[color];
}
// Draw a sprite centered on (x,y), scaled to height h, optionally flipped/flashed.
function drawSprite(s, x, y, h, faceDir, white, yOff) {
  const w = h * (s.w / s.h);
  ctx.save();
  ctx.translate(x, y + (yOff || 0));
  if (faceDir < 0) ctx.scale(-1, 1);
  ctx.drawImage(white ? spriteWhite(s) : s.base, -w / 2, -h / 2, w, h);
  ctx.restore();
}
function levelBg() {
  if (theme().cityArt) {
    const key = curCity().key + "-" + (zoneNight ? "night" : "day");
    const im = CITY_BG[key];
    return im && im.complete && im.naturalWidth ? im : null;
  }
  const im = bgImgs[level || 1];
  return im && im.complete && im.naturalWidth ? im : null;
}
// Edge-props (city-art): the transparent street-furniture strip for the current
// city + day/night, or null until it loads / if absent.
function cityProps() {
  const im = CITY_PROPS[curCity().key + "-" + (zoneNight ? "night" : "day")];
  return im && im.complete && im.naturalWidth ? im : null;
}
// Draw a prop strip pinned to each TRUE arena edge. The strip is scaled to a fixed
// edge width (uniform — no squish) and TILED down the height, so it shows identically
// on any device aspect — never crops, never stretches. Width is capped so it never
// eats the central play lane. Right side is mirrored + phase-shifted half a tile so
// it doesn't read as a 1:1 mirror.
function drawCityEdges(g, img, w, h) {
  const sw = Math.min(w * 0.26, img.width);   // edge-band width
  const scale = sw / img.width;
  const th = img.height * scale;              // one tile's drawn height
  const step = th * 1.04;                     // tiny gap between repeats
  const col = (mirror, phase) => {
    g.save();
    if (mirror) { g.translate(w, 0); g.scale(-1, 1); }
    for (let y = phase; y < h; y += step) g.drawImage(img, 0, y, sw, th);
    g.restore();
  };
  col(false, 0);
  col(true, -th * 0.5);
}

// Soft glow blobs, cached per color — used for bullets and food halos.
const glowCache = {};
function glowSprite(color) {
  if (!glowCache[color]) {
    glowCache[color] = makeSprite(48, 48, (g, w, h) => {
      const grad = g.createRadialGradient(w / 2, h / 2, 1, w / 2, h / 2, w / 2);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, w, h);
    });
  }
  return glowCache[color];
}

// Soft grey patch left where the Bland walk (cheaper than per-frame arcs).
const drainSprite = makeSprite(64, 64, (g, w, h) => {
  const grad = g.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
  grad.addColorStop(0, "rgba(138, 142, 156, 1)");
  grad.addColorStop(0.7, "rgba(138, 142, 156, 0.8)");
  grad.addColorStop(1, "rgba(138, 142, 156, 0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
});

// Grey aura under each Bland — they dim the world around them.
const auraSprite = makeSprite(128, 128, (g, w, h) => {
  const grad = g.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
  grad.addColorStop(0, "rgba(110, 114, 128, 0.20)");
  grad.addColorStop(1, "rgba(110, 114, 128, 0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
});

// Procedural street fallback, drawn in portrait space (w = short side, h = long
// side). Colors come from the active theme's palette (pal) so the same geometry
// reads as a night or a daytime street. The lamp pools double as warm sun pools.
function drawStreet(g, w, h, pal) {
  pal = pal || theme().pal;
  const base = g.createLinearGradient(0, 0, 0, h);
  base.addColorStop(0, pal.baseTop);
  base.addColorStop(1, pal.baseBot);
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);
  // Footpaths + curbs.
  g.fillStyle = pal.path;
  g.fillRect(0, 0, 42, h);
  g.fillRect(w - 42, 0, 42, h);
  g.fillStyle = pal.curb;
  g.fillRect(40, 0, 3, h);
  g.fillRect(w - 43, 0, 3, h);
  // Centre lane dashes.
  g.fillStyle = pal.dash;
  for (let y = 20; y < h; y += 64) g.fillRect(w / 2 - 3, y, 6, 34);
  // Warm light pools (streetlights at night / sun glints by day).
  const lampSolid = pal.lamp.replace(/[\d.]+\)$/, "0)");
  const lamps = [[90, 130], [400, 300], [120, 520], [380, 680], [240, 60]];
  for (const [lx, ly] of lamps) {
    const lg = g.createRadialGradient(lx, ly, 5, lx, ly, 150);
    lg.addColorStop(0, pal.lamp);
    lg.addColorStop(1, lampSolid);
    g.fillStyle = lg;
    g.fillRect(lx - 150, ly - 150, 300, 300);
  }
  // Street props: stall silhouettes with awnings, crates, a crosswalk.
  const stall = (sx, sy) => {
    g.fillStyle = pal.stall;
    g.fillRect(sx, sy + 10, 34, 44);
    for (let i = 0; i < 5; i++) {
      g.fillStyle = i % 2 ? pal.awningA : pal.awningB;
      g.fillRect(sx - 2 + i * 7.6, sy, 7.6, 12);
    }
  };
  stall(2, 170);
  stall(2, 600);
  stall(w - 36, 330);
  stall(w - 36, 720);
  g.fillStyle = pal.crate;
  g.fillRect(4, 420, 18, 18);
  g.fillRect(w - 24, 80, 18, 18);
  g.fillStyle = pal.crosswalk;
  for (let i = 0; i < 6; i++) g.fillRect(58 + i * 64, h - 90, 36, 44);
}

// ---------- Procedural DAY backdrop (retro-day theme) ----------
// Flat, POWER-UP-style street built entirely in code: solid fills, warm dark
// outlines, a few RECOGNISABLE (not detailed) stalls/props confined to the
// outer side-margins so the center lane stays fully open for play. One element
// kit + a per-level seed = unlimited varied, consistent backdrops, zero assets.
// Base day palette. Cities override a subset of these via applyCityTheme()
// (see CITIES). DAY is a live object the draw fns read at call-time, so a
// palette swap is a single Object.assign — no redraw plumbing.
const DAY_BASE = {
  ground: "#c9b78f", dot: "rgba(120,98,66,0.10)",
  path: "#c1ad83", curb: "#b3996f", shadow: "rgba(74,59,46,0.13)",
  ink: "#4a3b2e",
  wood: "#9c7144", woodDk: "#7a5634",
  cream: "#e7dcc0", red: "#b15441", teal: "#43807c", mustard: "#d3a04c",
  leaf: "#6d8c4d", leafDk: "#4f6c39", orange: "#d68a3c", terra: "#b5673f",
  dog: "#d9c39c", dogPatch: "#a87b50", cat: "#574434", steel: "#9aa0a6",
  // Hazard fills (overridden per city).
  hazard: "rgba(70,120,150,0.30)", hazardEdge: "rgba(40,80,110,0.45)",
  // Warm lamp pool — only drawn on night zones.
  lamp: "rgba(255, 214, 140, 0.12)",
};
const DAY = { ...DAY_BASE };
let zoneNight = false; // is the current zone a night zone? (drives palette + vignette)
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// Flat fill + warm outline in one call (the POWER-UP look).
function box(g, x, y, w, h, fill) {
  g.fillStyle = fill; g.fillRect(x, y, w, h);
  g.strokeStyle = DAY.ink; g.lineWidth = 2; g.strokeRect(x, y, w, h);
}
function dot(g, cx, cy, r, fill) {
  g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fillStyle = fill; g.fill(); g.strokeStyle = DAY.ink; g.lineWidth = 2; g.stroke();
}
function softShadow(g, cx, by, rw, rh) {
  g.save(); g.fillStyle = DAY.shadow;
  g.beginPath(); g.ellipse(cx, by, rw, rh, 0, 0, Math.PI * 2); g.fill(); g.restore();
}

// Each element draws around a horizontal center cx with its base (ground
// contact) at baseY, growing upward. s = scale. flip mirrors the facing.
const DAY_ELEMENTS = {
  stall(g, cx, baseY, s, rng) {
    const cw = 46 * s, ch = 30 * s, ax = cw + 10 * s, ah = 15 * s;
    softShadow(g, cx, baseY + 3, cw * 0.62, 6 * s);
    box(g, cx - cw / 2, baseY - ch, cw, ch, DAY.wood);           // counter
    box(g, cx - cw / 2, baseY - ch, cw, 5 * s, DAY.woodDk);      // shelf lip
    // steaming cup glyph
    dot(g, cx, baseY - ch * 0.5, 5 * s, DAY.cream);
    // awning: striped band with a scalloped lower edge
    const ay = baseY - ch - ah, n = 5;
    const cols = rng() < 0.5 ? [DAY.red, DAY.cream] : [DAY.teal, DAY.cream];
    for (let i = 0; i < n; i++) {
      g.fillStyle = i % 2 ? cols[1] : cols[0];
      g.fillRect(cx - ax / 2 + (i * ax) / n, ay, ax / n + 0.5, ah);
    }
    g.strokeStyle = DAY.ink; g.lineWidth = 2; g.strokeRect(cx - ax / 2, ay, ax, ah);
    g.beginPath(); // scallops
    for (let i = 0; i <= n; i++) {
      const x = cx - ax / 2 + (i * ax) / n;
      if (i === 0) g.moveTo(x, ay + ah);
      g.lineTo(x - ax / n / 2, ay + ah + 4 * s);
      g.lineTo(x + (i < n ? 0 : 0), ay + ah);
    }
  },
  cart(g, cx, baseY, s, rng) {
    const cw = 44 * s, ch = 24 * s;
    softShadow(g, cx, baseY + 3, cw * 0.66, 6 * s);
    box(g, cx - cw / 2, baseY - ch, cw, ch, DAY.wood);
    box(g, cx - cw / 2 + 4 * s, baseY - ch + 5 * s, cw - 8 * s, ch - 10 * s, DAY.woodDk);
    dot(g, cx + cw / 2 - 6 * s, baseY, 8 * s, DAY.woodDk);        // wheel
    dot(g, cx + cw / 2 - 6 * s, baseY, 2.4 * s, DAY.cream);
    // produce pyramid
    for (let row = 0; row < 3; row++)
      for (let i = 0; i <= row; i++)
        dot(g, cx - row * 5 * s + i * 10 * s, baseY - ch - 4 * s - (2 - row) * 8 * s, 4.5 * s, DAY.orange);
    // parasol
    g.strokeStyle = DAY.ink; g.lineWidth = 2;
    g.beginPath(); g.moveTo(cx, baseY - ch - 6 * s); g.lineTo(cx, baseY - ch - 34 * s); g.stroke();
    g.beginPath(); g.moveTo(cx - 18 * s, baseY - ch - 34 * s);
    g.quadraticCurveTo(cx, baseY - ch - 48 * s, cx + 18 * s, baseY - ch - 34 * s);
    g.closePath(); g.fillStyle = [DAY.mustard, DAY.red, DAY.teal][(rng() * 3) | 0]; g.fill(); g.stroke();
  },
  crate(g, cx, baseY, s, rng) {
    const cw = 40 * s, ch = 24 * s;
    softShadow(g, cx, baseY + 3, cw * 0.6, 5 * s);
    box(g, cx - cw / 2, baseY - ch, cw, ch, DAY.wood);
    g.strokeStyle = DAY.woodDk; g.lineWidth = 2;
    g.beginPath(); g.moveTo(cx, baseY - ch); g.lineTo(cx, baseY); g.stroke();
    g.beginPath(); g.moveTo(cx - cw / 2, baseY - ch / 2); g.lineTo(cx + cw / 2, baseY - ch / 2); g.stroke();
    const veg = rng() < 0.5 ? DAY.orange : DAY.leaf;
    dot(g, cx - 7 * s, baseY - ch - 3 * s, 4 * s, veg);
    dot(g, cx + 4 * s, baseY - ch - 4 * s, 4 * s, veg);
  },
  pot(g, cx, baseY, s) {
    const tw = 26 * s, bw = 18 * s, h = 26 * s;
    softShadow(g, cx, baseY + 2, tw * 0.6, 4 * s);
    g.beginPath();
    g.moveTo(cx - tw / 2, baseY - h); g.lineTo(cx + tw / 2, baseY - h);
    g.lineTo(cx + bw / 2, baseY); g.lineTo(cx - bw / 2, baseY); g.closePath();
    g.fillStyle = DAY.terra; g.fill(); g.strokeStyle = DAY.ink; g.lineWidth = 2; g.stroke();
    box(g, cx - tw / 2 - 1, baseY - h - 4 * s, tw + 2, 5 * s, DAY.terra); // rim
    for (let i = -1; i <= 1; i++) dot(g, cx + i * 7 * s, baseY - h * 0.5, 1.6 * s, DAY.cream);
  },
  plant(g, cx, baseY, s) {
    const pw = 18 * s, ph = 14 * s;
    softShadow(g, cx, baseY + 2, pw * 0.7, 4 * s);
    box(g, cx - pw / 2, baseY - ph, pw, ph, DAY.terra);
    for (let i = -1; i <= 1; i++) {
      g.save(); g.translate(cx + i * 5 * s, baseY - ph); g.rotate(i * 0.5);
      g.beginPath(); g.ellipse(0, -9 * s, 4 * s, 10 * s, 0, 0, Math.PI * 2);
      g.fillStyle = i ? DAY.leafDk : DAY.leaf; g.fill();
      g.strokeStyle = DAY.ink; g.lineWidth = 1.5; g.stroke(); g.restore();
    }
    dot(g, cx, baseY - ph - 12 * s, 3 * s, DAY.orange); // a marigold bloom
  },
  dog(g, cx, baseY, s) {
    softShadow(g, cx, baseY + 1, 16 * s, 4 * s);
    g.save(); g.translate(cx, baseY); g.fillStyle = DAY.dog;
    g.strokeStyle = DAY.ink; g.lineWidth = 2;
    g.fillRect(-9 * s, -7 * s, 3 * s, 7 * s); g.strokeRect(-9 * s, -7 * s, 3 * s, 7 * s); // back leg
    g.fillRect(6 * s, -7 * s, 3 * s, 7 * s); g.strokeRect(6 * s, -7 * s, 3 * s, 7 * s);   // front leg
    g.beginPath(); g.ellipse(0, -9 * s, 13 * s, 6 * s, 0, 0, Math.PI * 2); g.fill(); g.stroke(); // body
    g.beginPath(); g.moveTo(-12 * s, -11 * s); g.quadraticCurveTo(-20 * s, -16 * s, -15 * s, -21 * s); g.lineWidth = 3; g.stroke(); // tail
    g.lineWidth = 2;
    g.beginPath(); g.ellipse(13 * s, -13 * s, 6 * s, 5 * s, 0, 0, Math.PI * 2); g.fill(); g.stroke(); // head
    g.fillRect(16 * s, -13 * s, 5 * s, 4 * s); g.strokeRect(16 * s, -13 * s, 5 * s, 4 * s);          // snout
    g.beginPath(); g.moveTo(9 * s, -17 * s); g.lineTo(11 * s, -23 * s); g.lineTo(15 * s, -17 * s); g.closePath(); g.fill(); g.stroke(); // ear
    g.beginPath(); g.ellipse(-2 * s, -10 * s, 5 * s, 4 * s, 0, 0, Math.PI * 2); g.fillStyle = DAY.dogPatch; g.fill(); // patch
    g.restore();
  },
  cat(g, cx, baseY, s) {
    softShadow(g, cx, baseY + 1, 12 * s, 3.5 * s);
    g.save(); g.translate(cx, baseY); g.fillStyle = DAY.cat;
    g.strokeStyle = DAY.ink; g.lineWidth = 2;
    g.beginPath(); // body sitting
    g.moveTo(-9 * s, 0); g.quadraticCurveTo(-8 * s, -20 * s, 0, -20 * s);
    g.quadraticCurveTo(8 * s, -20 * s, 9 * s, 0); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.ellipse(0, -22 * s, 7 * s, 6 * s, 0, 0, Math.PI * 2); g.fill(); g.stroke(); // head
    g.beginPath(); // ears
    g.moveTo(-6 * s, -26 * s); g.lineTo(-3 * s, -32 * s); g.lineTo(-1 * s, -26 * s);
    g.moveTo(6 * s, -26 * s); g.lineTo(3 * s, -32 * s); g.lineTo(1 * s, -26 * s); g.fill();
    g.beginPath(); g.moveTo(9 * s, -2 * s); g.quadraticCurveTo(18 * s, -2 * s, 15 * s, -12 * s); g.lineWidth = 3; g.stroke(); // tail
    g.restore();
  },
};

// Draw the whole day street for the current level (seeded, stable per level).
function drawDayStreet(g, w, h) {
  g.fillStyle = DAY.ground; g.fillRect(0, 0, w, h);
  const mw = (CONFIG.edgeWalls.w || 0.15) * w; // side-margin width = the walled zone
  // Faint ground stipple (drawn once into the cached backdrop).
  const sr = mulberry32(12345);
  g.fillStyle = DAY.dot;
  for (let y = 0; y < h; y += 22) for (let x = 0; x < w; x += 22) {
    g.fillRect(x + sr() * 18, y + sr() * 18, 2, 2);
  }
  // Subtle side bands so the open lane reads (kept close to ground tone).
  g.fillStyle = DAY.path; g.fillRect(0, 0, mw, h); g.fillRect(w - mw, 0, mw, h);
  g.fillStyle = DAY.curb; g.fillRect(mw - 2, 0, 2, h); g.fillRect(w - mw, 0, 2, h);

  const rng = mulberry32((level || 1) * 9301 + 49297);
  const pool = ["stall", "cart", "crate", "pot", "plant"];
  // Prop SIZE is decoupled from the (now narrow) collision margin — scale off the
  // old propMarginFrac so props stay full-size as the lane widens.
  const s = ((CONFIG.propMarginFrac || 0.15) * w) / 72;
  // Center props ON the screen edge so ~half bleeds off — keeps the play lane
  // open while the visible half reads as a street edge.
  const colL = 0, colR = w;
  // Deal from a shuffled deck: every type is used before any repeats — variety,
  // never a cluster of identical props.
  const deck = () => { const d = pool.slice(); for (let i = d.length - 1; i > 0; i--) { const j = (rng() * (i + 1)) | 0; [d[i], d[j]] = [d[j], d[i]]; } return d; };
  const place = (cx, startPhase) => {
    let y = (0.07 + startPhase) * h, d = deck();
    while (y < 0.9 * h) {
      if (!d.length) d = deck();
      DAY_ELEMENTS[d.pop()](g, cx, y, s, rng);
      y += (0.15 + rng() * 0.15) * h;          // sparse, per-zone-varied gaps
    }
  };
  // Independent vertical phase per side so left & right never line up row-for-row
  // (the two edges read as different streets, and it re-shuffles every zone).
  place(colL, rng() * 0.12); place(colR, rng() * 0.12);
  // One dog + one cat, tucked inside the (thin) margin. Side + height shuffle per
  // zone — they were the only fixed props, which made every zone feel identical.
  const dogLeft = rng() < 0.5;
  DAY_ELEMENTS.dog(g, dogLeft ? mw * 0.5 : w - mw * 0.5, (0.55 + rng() * 0.33) * h, s);
  DAY_ELEMENTS.cat(g, dogLeft ? w - mw * 0.5 : mw * 0.5, (0.5 + rng() * 0.33) * h, s);
  // Night zones: warm lamp pools down each edge so the dark reads as "night",
  // not just "dim day". Soft radial gradients, additive-ish over the dark palette.
  if (zoneNight) {
    const lr = mw * 1.9;
    for (let y = 0.18 * h; y < 0.95 * h; y += 0.26 * h) {
      for (const lx of [mw * 0.6, w - mw * 0.6]) {
        const grad = g.createRadialGradient(lx, y, 0, lx, y, lr);
        grad.addColorStop(0, DAY.lamp);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = grad;
        g.beginPath(); g.arc(lx, y, lr, 0, Math.PI * 2); g.fill();
      }
    }
  }
  // City hazards (puddles / quicksand) — drawn into the cached backdrop. The
  // runtime effect lives in applyHazards(); `hazards` is built in buildHazards().
  // Corridor mode draws them per-frame in world space instead (route ≫ screen).
  if (!corridorOn()) for (const z of hazards) drawHazard(g, z);
}

// One hazard patch. Visual only — gameplay lives in applyHazards(). The look
// branches on type so each city's hurdle reads distinctly:
//   puddle    — a flat glossy water film (Mumbai monsoon).
//   quicksand — a SUNKEN sand pit: concentric sink-rings + grain, no gloss, so
//               it never reads as water (even in a night zone).
function drawHazard(g, z) {
  g.save();
  // Seed off the WORLD position (sx/sy when pre-rendered to a local sprite).
  const r = mulberry32(((z.sx ?? z.x) * 131 + (z.sy ?? z.y) * 977) | 0);
  if (z.type === "quicksand") {
    // sunken depression: darker toward the centre (it pulls down)
    const grad = g.createRadialGradient(z.x, z.y, 1, z.x, z.y, Math.max(z.rx, z.ry));
    grad.addColorStop(0, DAY.hazardEdge);
    grad.addColorStop(0.6, DAY.hazard);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.beginPath(); g.ellipse(z.x, z.y, z.rx, z.ry, 0, 0, Math.PI * 2); g.fill();
    // concentric sink-rings — the giveaway that it's a pit, not a spill
    g.strokeStyle = DAY.hazardEdge; g.lineWidth = 1.5;
    for (let i = 1; i <= 3; i++) {
      g.globalAlpha = 0.5 - i * 0.1;
      g.beginPath(); g.ellipse(z.x, z.y, z.rx * (i / 3.2), z.ry * (i / 3.2), 0, 0, Math.PI * 2); g.stroke();
    }
    g.globalAlpha = 1;
    // grain stipple
    g.fillStyle = DAY.hazardEdge;
    for (let i = 0; i < 10; i++) {
      g.beginPath();
      g.arc(z.x + (r() - 0.5) * 1.7 * z.rx, z.y + (r() - 0.5) * 1.7 * z.ry, 0.8 + r() * 1.1, 0, Math.PI * 2);
      g.fill();
    }
  } else {
    // puddle: flat glossy film with a darker rim + a couple of specks
    g.fillStyle = DAY.hazard;
    g.beginPath(); g.ellipse(z.x, z.y, z.rx, z.ry, 0, 0, Math.PI * 2); g.fill();
    g.strokeStyle = DAY.hazardEdge; g.lineWidth = 2;
    g.beginPath(); g.ellipse(z.x, z.y, z.rx, z.ry, 0, 0, Math.PI * 2); g.stroke();
    // a faint highlight streak to sell "wet"
    g.globalAlpha = 0.5; g.strokeStyle = "rgba(255,255,255,0.5)"; g.lineWidth = 1.5;
    g.beginPath(); g.ellipse(z.x - z.rx * 0.25, z.y - z.ry * 0.3, z.rx * 0.4, z.ry * 0.25, -0.5, 0, Math.PI); g.stroke();
    g.globalAlpha = 1;
    g.fillStyle = DAY.hazardEdge;
    for (let i = 0; i < 4; i++) {
      g.beginPath();
      g.ellipse(z.x + (r() - 0.5) * z.rx, z.y + (r() - 0.5) * z.ry, 2 + r() * 2, 1.5 + r() * 1.5, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  g.restore();
}

// ---------- Corridor world rendering (the pivot) ----------
// The route is drawn as W×tileH SEGMENT TILES, each seeded by (zone, segment
// index) and cached — per-segment variety so the street never reads as an
// obvious repeat (the exact failure that got the city-art strips reverted).
// Only the two/three tiles intersecting the camera band draw each frame.
function drawCorridorSegment(g, w, h, idx) {
  const rng = mulberry32((level * 7349 + idx * 101159) >>> 0);
  g.fillStyle = DAY.ground; g.fillRect(0, 0, w, h);
  const mw = (CONFIG.edgeWalls.w || 0.15) * w;
  g.fillStyle = DAY.dot;
  for (let y = 0; y < h; y += 22) for (let x = 0; x < w; x += 22)
    g.fillRect(x + rng() * 18, y + rng() * 18, 2, 2);
  // Side bands + curbs — same geometry every tile, so seams are invisible.
  g.fillStyle = DAY.path; g.fillRect(0, 0, mw, h); g.fillRect(w - mw, 0, mw, h);
  g.fillStyle = DAY.curb; g.fillRect(mw - 2, 0, 2, h); g.fillRect(w - mw, 0, 2, h);
  // Centre dashes: step divides tileH, so the rhythm carries across seams.
  g.fillStyle = DAY.dash;
  for (let y = 20; y < h; y += 80) g.fillRect(w / 2 - 3, y, 6, 34);
  // Occasional crosswalk — passive, low-contrast street furniture.
  if (idx % 3 === 1) {
    g.fillStyle = "rgba(255,255,255,0.14)";
    const cwY = h * (0.3 + rng() * 0.4), lane = w - 2 * mw - 28, seg = lane / 6;
    for (let i = 0; i < 6; i++) g.fillRect(mw + 14 + i * seg, cwY, seg - 10, 40);
  }
  // Edge props: same deck-shuffle kit as the arena street, seeded per segment.
  const s = ((CONFIG.propMarginFrac || 0.15) * w) / 72;
  const pool = ["stall", "cart", "crate", "pot", "plant"];
  const deck = () => { const d = pool.slice(); for (let i = d.length - 1; i > 0; i--) { const j = (rng() * (i + 1)) | 0; [d[i], d[j]] = [d[j], d[i]]; } return d; };
  const place = (cx, startPhase) => {
    let y = (0.05 + startPhase) * h, d = deck();
    while (y < 0.95 * h) {
      if (!d.length) d = deck();
      DAY_ELEMENTS[d.pop()](g, cx, y, s, rng);
      y += (0.16 + rng() * 0.16) * h;
    }
  };
  place(0, rng() * 0.12);
  place(w, rng() * 0.12);
  if (rng() < 0.45) DAY_ELEMENTS.dog(g, rng() < 0.5 ? mw * 0.5 : w - mw * 0.5, (0.2 + rng() * 0.7) * h, s);
  if (rng() < 0.45) DAY_ELEMENTS.cat(g, rng() < 0.5 ? mw * 0.5 : w - mw * 0.5, (0.2 + rng() * 0.7) * h, s);
  if (zoneNight) {
    const lr = mw * 1.9;
    for (let y = 0.14 * h; y < h; y += 0.3 * h) {
      for (const lx of [mw * 0.6, w - mw * 0.6]) {
        const grad = g.createRadialGradient(lx, y, 0, lx, y, lr);
        grad.addColorStop(0, DAY.lamp);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = grad;
        g.beginPath(); g.arc(lx, y, lr, 0, Math.PI * 2); g.fill();
      }
    }
  }
}
function corridorSegSprite(idx) {
  const key = level + ":" + idx + ":" + W + ":" + (zoneNight ? "n" : "d");
  let c = segCache.get(key);
  if (!c) {
    c = makeSprite(W, CONFIG.corridor.tileH, (g) => drawCorridorSegment(g, W, CONFIG.corridor.tileH, idx));
    if (segCache.size > 8) segCache.delete(segCache.keys().next().value);
    segCache.set(key, c);
  }
  return c;
}

// Route base + furniture + hazard patches for the camera band. Runs inside the
// world transform (draw() has already translated by -cam.y).
function drawCorridorWorld() {
  const th = CONFIG.corridor.tileH;
  const first = Math.max(0, Math.floor(cam.y / th));
  const last = Math.floor((cam.y + H) / th);
  // Ground under-fill: any sub-pixel gap at a tile joint shows ground, not the
  // dark page background — belt-and-braces against seam lines on scaled canvases.
  ctx.fillStyle = DAY.ground;
  ctx.fillRect(0, cam.y - 2, W, H + 4);
  for (let i = first; i <= last; i++) ctx.drawImage(corridorSegSprite(i), 0, i * th);
  const m = laneMargin() || CONFIG.edgeWalls.w * W;
  // Delivery gate: pennant string + chalk finish line at the route's top.
  if (goalY > cam.y - 80 && goalY < cam.y + H + 80) {
    ctx.strokeStyle = "#4a3b2e"; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(m - 6, goalY - 46); ctx.lineTo(m - 6, goalY + 4);
    ctx.moveTo(W - m + 6, goalY - 46); ctx.lineTo(W - m + 6, goalY + 4);
    ctx.moveTo(m - 6, goalY - 44); ctx.lineTo(W - m + 6, goalY - 44);
    ctx.stroke();
    const nfl = 8, span = (W - 2 * m + 12) / nfl;
    for (let i = 0; i < nfl; i++) {
      ctx.fillStyle = i % 2 ? DAY.red : DAY.mustard;
      const fx = m - 6 + i * span;
      ctx.beginPath();
      ctx.moveTo(fx, goalY - 44); ctx.lineTo(fx + span, goalY - 44); ctx.lineTo(fx + span / 2, goalY - 30);
      ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    for (let x = m; x < W - m; x += 26) ctx.fillRect(x, goalY, 16, 5);
    ctx.font = "18px " + COMIC_FONT;
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(74,59,46,0.85)";
    ctx.fillText("DELIVERY", W / 2, goalY - 54);
  }
  // Pickup chalk mark just below the run start.
  if (startY + 64 > cam.y && startY + 40 < cam.y + H + 80) {
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    for (let x = m; x < W - m; x += 26) ctx.fillRect(x, startY + 60, 16, 4);
  }
  // Hazard patches in view (pre-rendered sprites — see buildHazards).
  for (const z of hazards) {
    if (!z.sprite || z.y + z.ry < cam.y - 40 || z.y - z.ry > cam.y + H + 40) continue;
    ctx.drawImage(z.sprite, z.x - z.sprite.width / 2, z.y - z.sprite.height / 2);
  }
}

// A falling vada pav: golden bun (bottom), green-chutney bun-top, a little
// shine — sized to the bullet radius. Used for the VADA PAV RAIN drizzle.
function drawPav(x, y, r) {
  ctx.save();
  ctx.translate(x, y);
  // soft shadow under the bun
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = "#000";
  ctx.beginPath(); ctx.ellipse(0, r * 0.55, r * 0.95, r * 0.4, 0, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
  // bun body
  ctx.fillStyle = "#d9a85a";
  ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
  // top crust (slightly darker dome)
  ctx.fillStyle = "#c79049";
  ctx.beginPath(); ctx.ellipse(0, -r * 0.2, r * 0.92, r * 0.7, 0, Math.PI, 0); ctx.fill();
  // green chutney peeking from the middle seam
  ctx.fillStyle = "#5fae54";
  ctx.beginPath(); ctx.ellipse(0, 0, r * 0.85, r * 0.16, 0, 0, Math.PI * 2); ctx.fill();
  // sesame/shine speck
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.beginPath(); ctx.arc(-r * 0.3, -r * 0.4, r * 0.14, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

// Backdrop + vignette at the current arena size. In landscape the portrait
// street is rotated 90° — footpaths land on the top/bottom edges.
function buildBackdrop() {
  bgCanvas = makeSprite(W, H, (g) => {
    const drawFn = theme().draw;
    const bg = W > H ? null : levelBg();
    if (W > H) {
      // Landscape: rotated procedural street (no landscape art yet).
      g.translate(W, 0);
      g.rotate(Math.PI / 2);
      (drawFn || drawStreet)(g, H, W);
    } else if (theme().edgeProps) {
      // Procedural road base + AI prop strips pinned to the live edges. Resolution-
      // independent: the props sit at the real edge on every device aspect.
      (theme().fallbackDraw || drawStreet)(g, W, H);
      const strip = cityProps();
      if (strip) drawCityEdges(g, strip, W, H);
    } else if (drawFn) {
      // Portrait procedural theme (retro-day): drawn to exact proportions.
      drawFn(g, W, H);
    } else if (bg) {
      // Portrait: per-level / per-city backdrop master, cover-fit.
      coverDraw(g, bg, W, H);
    } else {
      // No image (missing/loading): use the theme's procedural fallback if it has
      // one (city-art → drawDayStreet), else the palette street.
      (theme().fallbackDraw || drawStreet)(g, W, H);
    }
  });
  vignette = makeSprite(W, H, (g) => {
    // Night zones darken the edges harder so the lamp pools read.
    const vig = zoneNight ? 0.5 : theme().vignette;
    const grad = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.45, W / 2, H / 2, Math.max(W, H) * 0.72);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0," + vig + ")");
    g.fillStyle = grad;
    g.fillRect(0, 0, W, H);
  });
}

// After an orientation swap the arena bounds change — pull anything live
// back inside so nothing is stranded in the letterbox.
function clampToArena() {
  if (!player) return;
  const wh = worldH();
  const cl = (o) => {
    const r = o.r || 14;
    o.x = Math.max(r, Math.min(W - r, o.x));
    o.y = Math.max(r, Math.min(wh - r, o.y));
  };
  cl(player);
  for (const e of enemies) cl(e);
  for (const f of foods) cl(f);
  if (corridorOn() && routeLen) cam.y = Math.max(0, Math.min(routeLen - H, cam.y));
}

// Drawn food sprites — emoji fonts differ per OS; these are consistent.
const FOOD_SPRITES = {
  spicy: makeSprite(40, 40, (g) => {
    g.translate(20, 22);
    g.rotate(-0.5);
    g.fillStyle = "#ff5a3c";
    g.beginPath();
    g.ellipse(0, 0, 12, 6.5, 0, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = "rgba(20,20,28,0.5)";
    g.lineWidth = 1.5;
    g.stroke();
    g.fillStyle = "rgba(255,255,255,0.3)";
    g.beginPath();
    g.ellipse(-3, -2.5, 5, 1.8, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#3ecf8e";
    g.beginPath();
    g.arc(12, -3, 3.5, 0, Math.PI * 2);
    g.fill();
  }),
  sweet: makeSprite(40, 40, (g) => {
    g.translate(20, 20);
    g.strokeStyle = "#ffb347";
    g.lineWidth = 4.5;
    g.lineCap = "round";
    g.beginPath();
    for (let t = 0; t < Math.PI * 5.5; t += 0.2) {
      const r = 1.5 + t * 0.8;
      const x = Math.cos(t) * r, y = Math.sin(t) * r * 0.95;
      t === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    g.stroke();
    g.strokeStyle = "rgba(200, 120, 30, 0.7)";
    g.lineWidth = 1.6;
    g.stroke();
  }),
  savory: makeSprite(40, 40, (g) => {
    g.fillStyle = "#e8b86d";
    g.beginPath();
    g.arc(20, 18, 12, Math.PI, 0);
    g.fill();
    g.fillStyle = "rgba(255,255,255,0.25)";
    g.beginPath();
    g.ellipse(16, 11, 4, 2, -0.4, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#8a5a2e";
    g.beginPath();
    g.ellipse(20, 20.5, 11, 4, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#3ecf8e";
    g.beginPath();
    g.ellipse(20, 18.5, 10, 2, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#e8b86d";
    g.beginPath();
    g.moveTo(8, 23);
    g.lineTo(32, 23);
    g.quadraticCurveTo(32, 29, 26, 29);
    g.lineTo(14, 29);
    g.quadraticCurveTo(8, 29, 8, 23);
    g.fill();
    g.strokeStyle = "rgba(20,20,28,0.4)";
    g.lineWidth = 1.5;
    g.beginPath();
    g.arc(20, 18, 12, Math.PI, 0);
    g.stroke();
  }),
};

// Jaisalmer food skins — DISTINCT procedural sprites so the name matches the art
// (Kachori isn't a vada pav, Ghevar isn't a jalebi). Same flavor system; the
// drop just LOOKS like the desert dish. Picked per city in foodSpriteFor().
const JAISALMER_FOOD_SPRITES = {
  // Mirchi — a battered fried green-chilli (mirchi bada): golden fritter, pointy
  // tip, little green stem.
  spicy: makeSprite(40, 40, (g) => {
    g.translate(20, 20); g.rotate(0.3);
    g.fillStyle = "#d6a052";
    g.beginPath();
    g.moveTo(0, -10);
    g.quadraticCurveTo(8, -7, 6, 3);
    g.quadraticCurveTo(4, 12, 0, 15);
    g.quadraticCurveTo(-4, 12, -6, 3);
    g.quadraticCurveTo(-8, -7, 0, -10);
    g.closePath(); g.fill();
    g.strokeStyle = "rgba(20,20,28,0.45)"; g.lineWidth = 1.4; g.stroke();
    g.strokeStyle = "rgba(255,255,255,0.22)"; g.lineWidth = 1.1;
    g.beginPath(); g.moveTo(-2, -5); g.lineTo(-3, 7); g.stroke();
    g.fillStyle = "#5fae54"; // green stem
    g.beginPath(); g.ellipse(0, -11, 2, 4, 0, 0, Math.PI * 2); g.fill();
  }),
  // Ghevar — a golden honeycomb-disc cake with a cream dollop + pistachio.
  sweet: makeSprite(40, 40, (g) => {
    g.translate(20, 21);
    g.fillStyle = "#caa050"; // side/height
    g.beginPath(); g.ellipse(0, 5, 13, 5, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#e2b65f"; // golden top
    g.beginPath(); g.ellipse(0, 1, 13, 9, 0, 0, Math.PI * 2); g.fill();
    const hr = mulberry32(91);
    g.fillStyle = "rgba(120,78,28,0.5)"; // honeycomb holes
    for (let i = 0; i < 16; i++) {
      const a = hr() * Math.PI * 2, rad = hr() * 11;
      g.beginPath(); g.arc(Math.cos(a) * rad, 1 + Math.sin(a) * rad * 0.65, 1 + hr() * 1.1, 0, Math.PI * 2); g.fill();
    }
    g.fillStyle = "#fff3df"; // cream
    g.beginPath(); g.arc(-1, -2, 4, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#7bbf5a"; // pistachio specks
    g.beginPath(); g.arc(-3, -3, 1, 0, Math.PI * 2); g.arc(1, -1, 1, 0, Math.PI * 2); g.fill();
  }),
  // Kachori — a round, puffy, flaky fried ball.
  savory: makeSprite(40, 40, (g) => {
    g.translate(20, 20);
    g.fillStyle = "#b9823f"; // fried underside
    g.beginPath(); g.ellipse(0, 5, 12, 5, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#d9a35a"; // puffy dome
    g.beginPath(); g.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2); g.fill();
    g.strokeStyle = "rgba(20,20,28,0.4)"; g.lineWidth = 1.4; g.stroke();
    g.strokeStyle = "rgba(140,90,40,0.5)"; g.lineWidth = 1; // flaky crinkles
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(Math.cos(a) * 6, Math.sin(a) * 5, Math.cos(a) * 11, Math.sin(a) * 8); g.stroke();
    }
    g.fillStyle = "rgba(255,255,255,0.28)"; // highlight
    g.beginPath(); g.ellipse(-4, -4, 4, 2.4, -0.4, 0, Math.PI * 2); g.fill();
  }),
};
// Per-city sprite lookup: Mumbai (and any unlisted city) uses the default set.
const CITY_FOOD_SPRITES = { jaisalmer: JAISALMER_FOOD_SPRITES };
function foodSpriteFor(flavor) {
  const set = CITY_FOOD_SPRITES[curCity().key] || FOOD_SPRITES;
  return set[flavor] || FOOD_SPRITES[flavor];
}

// ---------- Flavor definitions ----------
const FLAVORS = {
  none: {
    label: "PLAIN",
    color: "#9aa0b0",
    fireInterval: 0.95,
    damage: 1,
    speedMult: 1,
    shots: 1,
  },
  spicy: {
    label: "SPICY",
    color: "#ff5a3c",
    fireInterval: 0.5,
    damage: 2,
    speedMult: 1,
    shots: 3, // spread
  },
  sweet: {
    label: "SWEET",
    color: "#ffb347",
    fireInterval: 0.2,
    damage: 1,
    speedMult: 1, // speed perk folded into the base speed (277)
    shots: 1,
    pierce: 2,     // identity: rapid crowd-shredder — punches through a line
    bulletR: 3,    // small, fast
  },
  savory: {
    label: "SAVORY",
    color: "#3ecf8e",
    fireInterval: 0.75,
    damage: 2,        // identity: heavy control/tank — slow but each shot hits hard
    speedMult: 0.95,
    shots: 1,
    bulletSpeed: 320, // slow, weighty round (plus its knockback aura + shield on eat)
    bulletR: 6,
  },
};
const FLAVOR_DURATION = 15;   // seconds
const FUSION_THRESHOLD = 0.5; // eat while meter above this fraction -> fusion burst

const FOOD_TYPES = [
  { flavor: "spicy", name: "Chilli", color: "#ff5a3c" },
  { flavor: "sweet", name: "Jalebi", color: "#ffb347" },
  { flavor: "savory", name: "Vada Pav", color: "#3ecf8e" },
];
const SAVORY_PULSE_INTERVAL = 2.2;
const SAVORY_PULSE_RADIUS = 130;

// ---------- Tuning config (internal) ----------
// Every difficulty/pacing knob lives here — tweak without touching logic.
// Live-tunable on a device via __mr.config (e.g. __mr.config.waveLength = 15).
const CONFIG = {
  waveLength: 20,      // seconds per wave — longer so level-up picks (not wave
                       // breaks) are the rhythm; fewer choppy transitions
  breather: 2,         // pause between waves
  // XP / level-up cadence. xpNext(level) = base + (level-1)*step XP, so each pick
  // costs more (the curve decelerates over a long run). minGap is a HARD floor in
  // seconds between picks — a burst of kills banks levels, it can't fire a stack
  // of modals. Together: picks land ~every 25-30s early, rarer late, never spam.
  // Live-tune: __mr.config.levelXp
  // base/step raised 2026-06-26 so the build MAXES late (not in ~10 min): steeper
  // step = late level-up picks become a trickle. Mini-boss boons (1/zone) still
  // give a guaranteed ~10/run, so full-max is a late-run achievement, not early.
  levelXp: { base: 55, step: 42, minGap: 30, killXp: { bland: 2, swarmer: 1 } },
  // Character sprite sizing (see docs/sprites.md). drawn height = 2*r*scale;
  // yOff nudges the sprite up/down off the entity center. Live-tune in preview
  // via __mr.config.sprites — falls back to the procedural blob if a sprite is
  // missing, so these never break the game.
  // Per-sprite draw scale (× entity diameter) + vertical nudge. player/bland are
  // tuned to the shipped art; swarmer/miniboss/boss are starting points to fine-
  // tune once the AI sprites land (live-tunable via __mr.config.sprites).
  sprites: {
    player: { scale: 2.5, yOff: -6 }, bland: { scale: 1.8, yOff: -4 },
    swarmer: { scale: 2.2, yOff: -2 }, miniboss: { scale: 1.7, yOff: -6 }, boss: { scale: 1.7, yOff: -8 },
  },
  bossDefeat: 1.9,     // main boss lingers (defeated) this long before LEVEL CLEAR
  // Solid stall walls down each side (fraction of W per side). The painted
  // shops become impassable; player + Bland stay in the open center lane.
  // Narrow margin = a WIDER play lane. Props keep their full size (scale is
  // decoupled from this in drawDayStreet) and are centered on the screen edge so
  // ~half bleeds off — more play space, still reads as a street edge.
  edgeWalls: { on: true, w: 0.08 },
  propMarginFrac: 0.15, // prop SIZE reference (kept at the old margin so props
                        // don't shrink when the collision margin narrows)
  scalingCapWave: 5,   // enemy stats & spawn rate stop growing here —
                       // later waves get harder via enemy MIX, not stat sponges
  spawnBase: 0.9,      // spawn interval curve: base - wave*perWave, floored
  spawnPerWave: 0.12,
  spawnFloor: 0.2,
  foodLife: 8,
  // Joystick response curve exponent. 1 = linear; >1 eases the low end so a
  // small drag = a gentle walk and speed ramps to full near the edge. Makes
  // the stick feel "analog/connected" instead of on-off. Live-tune: __mr.config.stickCurve
  stickCurve: 1.6,
  // Deadzone before the stick produces ANY movement (CSS px). The thumb can
  // rest / wobble inside this radius without the character drifting; movement
  // ramps from zero only past it. ~8-14 px is the mobile sweet spot.
  stickDeadzone: 10,
  // How fast the integrated frame-delta (dt) tracks the real frame interval.
  // Position moves by vx·dt; if dt lags reality (low value) under variable
  // framerate, the character rubber-bands ahead of your finger = "floaty".
  // 1 = raw clamped dt (tightest, may micro-stutter on dropped frames);
  // lower = smoother dt but floatier. Live-tune: __mr.config.dtTrack
  dtTrack: 0.5,
  // Re-entry ease: the wave(s) after a boss come in softer, not at full
  // capped intensity right after the calm duel. easeWaves:2 keeps BOTH waves
  // 6 & 7 (after the wave-5 mini-boss) gentle — this is the first level.
  // EARLY-LEVEL extra ease: on levels ≤ easeLevels the post-mini-boss waves
  // come in softer still — fewer Blands (earlySpawnMul widens the spacing on
  // top of spawnMul) and a little slower (earlySpdMul). New players are still
  // learning; the wave after the mini-boss was spiking too hard.
  postBoss: { easeWaves: 2, spawnMul: 1.8, breather: 4.5, easeLevels: 3, earlySpawnMul: 1.35, earlySpdMul: 0.88 },
  // A ZONE = 8 waves. Wave 5 = mini-boss, wave 8 = main boss → next zone.
  wavesPerLevel: 8,
  // Difficulty TRACK (global, drives lvl()). Soft-reset per city: within a city
  // the curve ramps by zone (1..5); each new city sits on a higher floor. This
  // single curve scales to unlimited cities — no per-city balancing. Tuned so
  // city-1/zone-1 ≈ old level 1 (1.00) and city-1/zone-5 ≈ old level 6 (1.40).
  diffCurve: {
    hpPerZone: 0.10, spdPerZone: 0.045, spawnPerZone: 0.04,
    cityFloor: 0.18,   // each city adds this to hp/spd floor (rising soft-reset)
    spawnMin: 0.74,    // fastest spawn multiplier (floor)
    cityBossMul: 1.5,  // zone-5 main boss HP boost → CITY BOSS
  },
  // Per-level difficulty (marginal step-up). TWO levers, both config-driven:
  //  1) enemies — hpMul / spdMul / spawnMul (spawnMul < 1 = faster spawns)
  //  2) barriers — EXTRA static blocks beyond the side stall-walls (which all
  //     levels get automatically via CONFIG.edgeWalls). Fractions of W×H,
  //     top-left x/y. Left empty: "solid edges only" — open center lane.
  // FOCUS: Level 1 is the clean, fully-testable level. Later levels exist as
  // provision — same 8-wave content, nudged harder.
  levels: [
    { hpMul: 1.00, spdMul: 1.00, spawnMul: 1.00, barriers: [] },
    { hpMul: 1.08, spdMul: 1.05, spawnMul: 0.94, barriers: [] },
    { hpMul: 1.16, spdMul: 1.10, spawnMul: 0.90, barriers: [] },
    { hpMul: 1.24, spdMul: 1.14, spawnMul: 0.86, barriers: [] },
    { hpMul: 1.32, spdMul: 1.18, spawnMul: 0.83, barriers: [] },
    { hpMul: 1.40, spdMul: 1.22, spawnMul: 0.80, barriers: [] },
  ],
  enemies: {
    bland: {
      rMin: 13, rMax: 17,
      hpBase: 1, hpPerWave: 0.6,
      spdBase: 60, spdPerWave: 7, spdRand: 22,
      telegraph: 0.7,
      drop: 0.3,
    },
    swarmer: {
      rMin: 8, rMax: 10,
      hpBase: 1, hpPerWave: 0,          // always 1 hp — threat is speed + numbers
      spdBase: 150, spdPerWave: 6, spdRand: 30,
      telegraph: 0.45,
      drop: 0.12,                        // they come in packs; keep food economy stable
      packMin: 2, packMax: 3,
      weave: 0.45,                       // darting zig-zag amplitude (radians)
    },
  },
  // Chance a spawn event is a swarmer pack, indexed by wave (last repeats).
  // Waves 6 & 7 (indexes 5,6) softened — first level shouldn't spike here.
  swarmerShare: [0, 0, 0.18, 0.25, 0.3, 0.22, 0.28, 0],
  // Mini-boss (wave 5): arrives alone; regular spawns + wave timer pause.
  boss: {
    wave: 5,
    mainWave: 8,         // the level finale (see mainBoss config below)
    hp: 55, r: 32, speed: 44,
    telegraph: 1.4,      // emerge time (big, dramatic)
    chargeEvery: 4.2,    // s between charge attacks
    chargeWindup: 0.85,  // frozen, shaking telegraph before the dash
    chargeSpeed: 430, chargeDur: 0.5,
    recover: 1.1,        // slow, vulnerable window after a charge
    foodEvery: 5,        // guaranteed food drop cadence during the fight
    deathDrops: 2,       // guaranteed food on kill
  },
  // Main boss (wave 8): the level finale — bigger, tougher, charges harder,
  // and summons a swarmer now and then. Kept moderate (first level).
  mainBoss: {
    hp: 90, r: 42, speed: 50,
    telegraph: 1.6,
    chargeEvery: 3.6,
    chargeWindup: 0.8,
    chargeSpeed: 470, chargeDur: 0.55,
    recover: 1.05,
    foodEvery: 4,        // more food — it's a longer fight
    deathDrops: 3,
    addEvery: 7,         // summon a lone swarmer this often (light pressure)
  },
  // Manual powers, charged by play. Two rhythms: eats vs kills.
  powers: {
    rush: { eats: 10, dur: 6, speedMul: 1.15 },        // MASALA RUSH: freeze Blands + flavor-lock + a light speed burst (freeze is the real payload)
    // THALI SLAM (city-skinned): a strong AREA burst that THINS a wave, never a
    // full clear. rain* = VADA PAV drizzle; storm* = SANDSTORM pits.
    slam: { kills: 28, dmg: 3, slowmo: 0.4, slowmoDur: 1.1,
      rainDrops: 12, rainPierce: 1,                 // drizzle: count + pierce-through
      stormPits: 5, stormRadFrac: 0.16, stormDur: 2.5, stormCapKills: 4 }, // pits: count, size, life, per-pit kill cap
  },
  // Boss-kill boons: pick 1 of 3 (drawn from this pool). Small on purpose.
  boons: [
    { id: "shots", name: "DOUBLE TADKA", desc: "+1 shot every volley" },
    { id: "heart", name: "GHEE ARMOR", desc: "+1 heart (now and max)" },
    { id: "drain", name: "CHAAT TIMING", desc: "flavor fades 20% slower" },
    { id: "pierce", name: "SKEWER", desc: "shots punch through +1 Bland" },
    { id: "fire", name: "QUICK FRY", desc: "attack 12% faster" },
  ],
  // Caps so the build PLATEAUS instead of trivialising the game (the "kills
  // everything standing still" problem). A boon at its cap drops out of the pick
  // pool, so picks stay meaningful. shots/pierce = max bonus; fire/drain = floor
  // multipliers (smaller = stronger); maxHp = hard heart ceiling.
  boonCaps: { shots: 3, pierce: 3, fireFloor: 0.6, drainFloor: 0.55, maxHp: 5 },
  // CORRIDOR mode (the pivot): a zone is a vertical DELIVERY ROUTE you run up,
  // not a fixed arena. The camera follows the courier; waves trigger by DISTANCE
  // gates (you set the pace by pushing forward); bosses lock the camera into a
  // one-screen duel so all arena boss tuning survives verbatim. on:false restores
  // the classic arena game wholesale (also live: __mr.setCorridor(false)).
  corridor: {
    on: true,
    screens: 6,     // route length in screen-heights (H at stage build)
    tileH: 800,     // road segment tile height (world px; H-independent)
    camFrac: 0.58,  // courier sits this far down the screen → more view ahead
    camLerp: 5,     // camera follow rate (higher = tighter)
    aheadBias: 0.7, // fraction of spawns that come from ahead (run direction)
    cullDist: 1.6,  // enemies further than this many screens get re-fielded ahead
  },
};

// ---------- Cities (the THEME track) ----------
// CITY → ZONE → WAVE. A city = ZONES_PER_CITY zones; each is cosmetic + ONE
// hazard. Difficulty is NOT here — it's the global curve in lvl(). Adding a city
// is pure content: palette + food skins + slam reskin + hazard. Infinite-safe.
const ZONES_PER_CITY = 5;
const CITIES = [
  {
    key: "mumbai", name: "MUMBAI",
    // palette: keep the warm urban day look (base), nudge a touch greyer/wetter.
    pal: {
      ground: "#c4b48d", path: "#bcab82", curb: "#ad9468",
      red: "#b15441", teal: "#3f7c84", mustard: "#d3a04c",
      hazard: "rgba(86,132,150,0.30)", hazardEdge: "rgba(46,86,108,0.50)",
    },
    // food skins: flavor stays constant; name/color localize. (savory = vada pav)
    foods: {
      spicy:  { name: "Misal", color: "#ff5a3c" },
      sweet:  { name: "Jalebi", color: "#ffb347" },
      savory: { name: "Vada Pav", color: "#3ecf8e" },
    },
    // signature = THALI SLAM reskin. pattern "rain" = vada pavs fall from the top.
    slam: { name: "VADA PAV RAIN!", colors: ["#caa15a", "#e3c07a", "#9c7144"], pattern: "rain" },
    // hazard: shallow monsoon puddles — slow whatever wades in (hero AND Blands),
    // no HP chip. Appear from zone 3.
    hazard: { type: "puddle", fromZone: 3, count: 3, slow: 0.5, chip: 0 },
    boss: { name: "THE VADA MAHARAJA" },
    bossSprite: "vada-maharaja", // AI sprite key (assets/sprites/vada-maharaja.png)
    // Night zones (deterministic, not random — see ROADMAP). Zone 4 = a darker
    // beat before the city-boss finale. Bump this list to add more night zones.
    nightZones: [4],
    night: {
      ground: "#2b2733", path: "#262231", curb: "#3a3446", dot: "rgba(255,220,150,0.05)",
      wood: "#6a4e34", woodDk: "#4d3826", cream: "#d8c79c",
      red: "#c25a44", teal: "#3f7c84", mustard: "#d6a24e",
      leaf: "#5f7a45", leafDk: "#46603a", orange: "#d68a3c", terra: "#9a5836",
      hazard: "rgba(90,140,170,0.32)", hazardEdge: "rgba(40,80,120,0.55)",
      lamp: "rgba(255, 200, 120, 0.16)",
    },
  },
  {
    key: "jaisalmer", name: "JAISALMER",
    // palette: golden desert sand, paler and warmer; sandy hazard tint.
    pal: {
      ground: "#d8c594", dot: "rgba(150,120,70,0.10)",
      path: "#d0bb87", curb: "#bfa66f", shadow: "rgba(120,95,55,0.13)",
      wood: "#a87b46", woodDk: "#855f34",
      red: "#bf6a3e", teal: "#b07b3f", mustard: "#dba94e",
      leaf: "#8a8b4d", leafDk: "#6c6c39", terra: "#c07a44",
      // darker rim than the sand so the sink-pit reads at a glance (a hazard you
      // can't see is unfair); center pulls toward deep brown.
      hazard: "rgba(150,112,58,0.5)", hazardEdge: "rgba(96,66,30,0.7)",
    },
    foods: {
      spicy:  { name: "Mirchi", color: "#ff5a3c" },
      sweet:  { name: "Ghevar", color: "#ffb347" },
      savory: { name: "Kachori", color: "#3ecf8e" },
    },
    slam: { name: "SANDSTORM!", colors: ["#d8b46a", "#c79a4e", "#a87b46"], pattern: "radial" },
    // hazard: quicksand — slows hero AND Blands; a Bland that wades through is
    // softened ONCE (loses `chip` of its current HP) but never killed. From zone 2.
    hazard: { type: "quicksand", fromZone: 2, count: 4, slow: 0.45, chip: 0.5 },
    boss: { name: "THE DUNE RAJA" },
    bossSprite: "dune-raja", // AI sprite key (assets/sprites/dune-raja.png)
    // Cool desert night (clear-sky blue) — zone 4.
    nightZones: [4],
    night: {
      ground: "#2f2c3a", path: "#2a2736", curb: "#3c3850", dot: "rgba(200,210,255,0.05)",
      wood: "#6a533a", woodDk: "#4e3c2a",
      red: "#a85f44", teal: "#5a6a8a", mustard: "#c2a05a",
      leaf: "#5e6a55", leafDk: "#47503f", terra: "#8a5e3e",
      // warm moonlit sand — never the blue that reads as water at night
      hazard: "rgba(150,128,86,0.42)", hazardEdge: "rgba(96,76,48,0.6)",
      lamp: "rgba(180, 200, 255, 0.12)",
    },
  },
];
// Hierarchy helpers. `level` is the global 1-based ZONE counter.
function cityOf(lv) { return Math.min(CITIES.length - 1, Math.floor((lv - 1) / ZONES_PER_CITY)); }
function zoneInCity(lv) { return ((lv - 1) % ZONES_PER_CITY) + 1; } // 1..ZONES_PER_CITY
function curCity() { return CITIES[cityOf(level || 1)]; } // level||1: menu/boot has no level yet (mirrors levelBg's bgImgs[level||1])
function isCityFinale(lv) { return zoneInCity(lv) === ZONES_PER_CITY; }

// Swap the live palette + food skins to the current city. Cheap: mutates the
// objects the draw fns + food logic already reference, so nothing else changes.
function applyCityTheme() {
  const c = curCity();
  zoneNight = (c.nightZones || []).includes(zoneInCity(level));
  // Day = base + city palette. Night = also merge the city's night overrides.
  Object.assign(DAY, DAY_BASE, c.pal || {}, zoneNight ? (c.night || {}) : {});
  const skins = curCity().foods || {};
  for (const f of FOOD_TYPES) {
    const s = skins[f.flavor];
    if (s) { f.name = s.name; f.color = s.color; }
  }
}

// Build the zone's hazard patches: deterministic per zone, gated by fromZone.
// Patches sit in the open lane (never under the side stall-walls).
function buildHazards() {
  hazards = [];
  const hz = curCity().hazard;
  if (!hz || zoneInCity(level) < hz.fromZone) return;
  const m = laneMargin();
  const r = mulberry32(level * 2654435761 >>> 0);
  const corr = corridorOn();
  // Spawn bubble — never start on a hazard. In corridor it wraps the route start.
  const cx = W / 2, cy = corr ? startY : H / 2;
  const clearR = Math.min(W, H) * 0.22;
  // Per-zone SHUFFLE: free placement (random x in lane + random y), varied count
  // (±1), rejection-sampled so patches don't overlap, the spawn bubble, or repeat
  // a rigid pattern. Seeded by `level`, so every zone's layout is visibly its own.
  // Corridor routes are several screens long, so the count scales with length.
  const base = corr ? Math.round(hz.count * CONFIG.corridor.screens / 2) : hz.count;
  const n = Math.max(2, base + ((r() * 3) | 0) - 1); // base-1 .. base+1
  const y0 = corr ? goalY + 80 : H * 0.1;
  const y1 = corr ? startY - 120 : H * 0.9;
  let tries = 0;
  while (hazards.length < n && tries < 400) {
    tries++;
    const rx = (24 + r() * 26) * (Math.min(W, H) / 600 + 0.6);
    const ry = rx * (0.55 + r() * 0.25);
    const laneL = m + rx, laneR = W - m - rx;
    const x = laneL + r() * (laneR - laneL);
    const y = y0 + r() * (y1 - y0);
    if (Math.hypot(x - cx, y - cy) < clearR + Math.max(rx, ry)) continue; // spawn-safe
    let ok = true;
    for (const z of hazards)
      if (Math.hypot(x - z.x, y - z.y) < (Math.max(rx, ry) + Math.max(z.rx, z.ry)) * 0.95) { ok = false; break; }
    if (!ok) continue;
    hazards.push({ x, y, rx, ry, type: hz.type, slow: hz.slow, chip: hz.chip || 0, hit: new Set() });
  }
  if (corr) {
    // Corridor draws hazards per-frame as world objects (the backdrop is tiled,
    // nothing to bake into) — pre-render each patch once so the frame cost is a
    // single drawImage, not gradients + stipple.
    for (const z of hazards) {
      const pw = Math.ceil(z.rx * 2) + 12, ph = Math.ceil(z.ry * 2) + 12;
      z.sprite = makeSprite(pw, ph, (g) =>
        drawHazard(g, { ...z, x: pw / 2, y: ph / 2, sx: z.x, sy: z.y }));
    }
  }
}

// Slow factor for the HERO standing in a hazard (min across overlaps), and the
// hazard they're in (strongest), stashed in `heroHazard` so the movement loop
// can throw up a friction cue. No HP loss on the hero — hazards slow you (a real
// risk to navigate), they don't hurt you.
let heroHazard = null;
function playerHazardSlow() {
  let mul = 1; heroHazard = null;
  for (const z of hazards) {
    const dx = (player.x - z.x) / z.rx, dy = (player.y - z.y) / z.ry;
    if (dx * dx + dy * dy <= 1 && z.slow < mul) { mul = z.slow; heroHazard = z; }
  }
  return mul;
}

// Per-enemy hazard effect: returns a speed multiplier, and softens a Bland ONCE
// per pass — it loses `chip` of its CURRENT hp on entry (halving never kills, so
// the hazard weakens Blands for your shots instead of doing the killing). The
// per-hazard `hit` set is cleared when the Bland leaves, so a fresh pass re-chips.
function applyHazards(e, dt) {
  let mul = 1;
  for (const z of hazards) {
    const dx = (e.x - z.x) / z.rx, dy = (e.y - z.y) / z.ry;
    const inside = dx * dx + dy * dy <= 1;
    if (inside) {
      mul = Math.min(mul, z.slow);
      if (z.chip > 0 && !e.boss && !z.hit.has(e)) {
        z.hit.add(e);
        e.hp *= (1 - z.chip); // 50% chip → halve; can't reach 0, never kills
        e.flash = 0.1;
      }
    } else if (z.hit.has(e)) {
      z.hit.delete(e); // left the patch — next pass softens again
    }
  }
  return mul;
}

// Fusion recipes: eat a DIFFERENT flavor while the meter is above the tick.
const RECIPES = {
  "spicy+sweet": { name: "Chilli Glaze" },
  "savory+spicy": { name: "Tadka Blast" },
  "savory+sweet": { name: "Maska Mend" },
};
function recipeKey(a, b) { return [a, b].sort().join("+"); }
let discovered;
try { discovered = new Set(JSON.parse(localStorage.getItem("mr_recipes") || "[]")); }
catch { discovered = new Set(); }

// ---------- Game state ----------
let state = "menu"; // menu | playing | gameover
let player, enemies, bullets, foods, particles, floaters, rings, drains, dying;
let storms; // expanding sand-sweep AoEs (Jaisalmer SANDSTORM) — grow + consume Blands
let hitStop;
let flavor, flavorTimer, savoryPulse;
let elapsed, kills, wave, waveTimer, spawnTimer, fireTimer, mixHintShown;
let hitFlash, shake, fusionFlash;
let gapT; // breather countdown between waves
let endingLevel; // true while the main boss plays its defeat beat (pauses spawns)
let bossFight, bossFoodT, bossFoodEvery; // boss wave: spawns + wave timer pause
let level;       // level currently being played (1-based)
// Corridor-mode state. cam.y = world y of the visible window's top edge;
// cam.lock >= 0 pins the window (boss duels). The route runs from startY
// (bottom, pickup) up to goalY (top, delivery) — progress = climbing.
let cam = { y: 0, lock: -1 };
let routeLen = 0, startY = 0, goalY = 0;
let waveGates = []; // waveGates[w] = world y that triggers wave w (corridor)
let segCache = new Map(); // road segment tiles, keyed level:idx:W (capped LRU-ish)
let barriers = []; // active barrier rects (pixels) for the current level
let hazards = [];  // active hazard patches (pixels) for the current zone (see buildHazards)
let showBarriers = false; // debug: draw collision rects to author them over the BG art
let lastBossWave; // wave a boss was fought on → next wave(s) ease in
let boonChoices = null;   // [3 boon defs] while the pick screen is open
let boons, mods;          // picked boon ids + derived multipliers
let maxedAnnounced;       // FULLY STOCKED cue shown once per run when fully maxed
// Build-system spike: XP from kills → level-ups → a 1-of-3 upgrade pick (reuses
// the boon modal). pickKind drives the modal copy + post-pick resume.
let xp, playerLevel, xpNext, pendingLevels;
let pickKind = null;      // "levelup" | "boss"
let pickGap = 0;          // hard floor (s) between picks; see CONFIG.levelXp.minGap
let rushCharge, slamCharge; // power meters: eats / kills since last use
let rushActive, slowmoT;    // MASALA RUSH duration / THALI SLAM slow-mo timer
let bestTime = 0;
// NOM MODE (temporary easter egg): a self-contained 3-phase universe that
// reuses the core eat-to-attack engine. Gated behind the `nom` setting.
let nomMode = false;
let nomPhase, nomT, nomSpawnT, nomFoodT, nomWon;
let settingsOpen = false;
let settingsFx = null; // { key, at } — press feedback in the settings panel
let resumeT = 0; // 3-2-1 countdown after closing settings mid-game

// Corridor helpers. NOM mode always plays in the classic arena.
function corridorOn() { return CONFIG.corridor.on && !nomMode; }
// World height entities clamp against: the whole route in corridor, else the screen.
function worldH() { return corridorOn() && routeLen ? routeLen : H; }
// Top of the active view band: the locked duel window if pinned, else the camera.
function camTop() { return corridorOn() ? (cam.lock >= 0 ? cam.lock : cam.y) : 0; }
// Screen-fraction → world y for UI-ish placements (announces, spawn bands).
function viewY(f) { return camTop() + H * f; }
// Route progress 0..1 (how far up the delivery route the courier is).
function routeProgress() {
  if (!corridorOn() || !routeLen) return 0;
  return Math.max(0, Math.min(1, (startY - player.y) / (startY - goalY)));
}

// Per-RUN state — the build + courier that PERSIST across stages. Reset only at
// run start (and on death → a fresh run), NEVER between zones. This is what lets
// the survivor-like build compound (ROADMAP "B": a run = one continuous build,
// not a chain of resets). Anything a player should KEEP as they clear zones lives
// here; anything that belongs to a single arena lives in setupStage().
function resetRun() {
  // Base speed = the old Sweet speed (205 × 1.35): the "jalebi feel" is now
  // the default; flavors no longer buff movement, savory still trades a bit.
  // imx/imy = smoothed INPUT direction (filtered stick), not velocity.
  player = { x: W / 2, y: H / 2, r: 14, hp: 3, maxHp: 3, iframes: 0, speed: 277, shield: 0, face: 1, vx: 0, vy: 0, imx: 0, imy: 0 };
  elapsed = 0;
  kills = 0;
  mixHintShown = false;
  xp = 0; playerLevel = 1; xpNext = CONFIG.levelXp.base; pendingLevels = 0;
  pickKind = null; pickGap = 0;
  boons = [];
  mods = { shots: 0, drain: 1, fire: 1, pierce: 0 };
  maxedAnnounced = false;
  rushCharge = 0;
  slamCharge = 0;
  rushActive = 0;
  slowmoT = 0;
  nomWon = false;
}

// Per-STAGE setup — the transient arena. Runs at EVERY zone start, including a
// continuous advance (advanceStage), so it must not touch the build above.
// `fresh` is true only on the run's very first zone: it drops the teaching chilli
// + WAVE 1 beat. Chained zones keep the player's current flavor, HP and build.
function setupStage(n, fresh) {
  enemies = [];
  bullets = [];
  foods = [];
  particles = [];
  floaters = [];
  rings = [];
  drains = [];
  dying = [];
  storms = [];
  hitStop = 0;
  flavor = "none";
  flavorTimer = 0;
  savoryPulse = 0;
  wave = 1;
  waveTimer = 0;
  spawnTimer = 0;
  fireTimer = 0;
  hitFlash = 0;
  shake = 0;
  fusionFlash = 0;
  gapT = 0;
  resumeT = 0;
  bossFight = false;
  bossFoodT = 0;
  endingLevel = false;
  level = n; // global ZONE counter → drives city, difficulty, backdrop, barriers
  cam.lock = -1;
  segCache.clear();
  if (corridorOn()) {
    // Build the delivery route: bottom = pickup, top = delivery. Wave gates sit
    // at even distances between the start and the main-boss trigger, so the
    // PLAYER paces the waves by climbing (no wave timer in corridor).
    const cc = CONFIG.corridor;
    routeLen = Math.round(cc.screens * H);
    goalY = 140;
    startY = routeLen - Math.round(H * 0.5);
    const bossY = goalY + Math.round(H * 0.55); // crossing this = main-boss duel
    waveGates = [];
    for (let w = 2; w <= CONFIG.boss.mainWave; w++) {
      waveGates[w] = startY - (startY - bossY) * ((w - 1) / (CONFIG.boss.mainWave - 1));
    }
    player.x = W / 2; player.y = startY;
    cam.y = Math.max(0, Math.min(routeLen - H, player.y - H * cc.camFrac));
  } else {
    routeLen = 0; startY = 0; goalY = 0; waveGates = [];
  }
  applyCityTheme();  // swap palette + food skins to this zone's city
  buildHazards();    // zone hazards (gated by fromZone) — drawn into the backdrop
  buildBackdrop();   // per-zone backdrop varies (seeded by zone) + city palette
  buildBarriers();
  lastBossWave = 0;
  boonChoices = null;
  if (fresh) {
    announce("WAVE 1", "#ffffff");
    // Corridor: teach the goal + direction once — the route strip alone didn't
    // land in playtest without it.
    if (corridorOn()) announce("head UP to deliver! ↑", "#7ddf8a", 18);
    // Teach-by-doing: one unmissable food right next to the player so the
    // eat → attack link is discovered in the first seconds (chilli reads
    // clearly different from PLAIN — spread shots + 2× damage).
    foods.push({ x: player.x, y: player.y - 46, r: 11, type: FOOD_TYPES[0], life: CONFIG.foodLife });
  }
}

// Run start: fresh build, then the first zone. NOM mode keeps its own content.
function reset() {
  resetRun();
  if (nomMode) {
    setupStage(1, false);
    nomReset();
  } else {
    setupStage(startLevelNum, true); // start at the chosen / resumed zone
  }
}

// Continuous zone advance (the heart of "B"): load the next arena with the SAME
// build/courier — no hub bounce, no reset. The boss-defeat beat already gave a
// ~2s lull, so play flows straight on with a callout + small reward heal.
function advanceStage() {
  const prevCity = cityOf(level);
  const n = level + 1;
  setupStage(n, false);
  player.hp = Math.min(player.maxHp, player.hp + 1); // zone-clear reward heal
  if (!corridorOn()) { player.x = W / 2; player.y = H / 2; } // corridor: setupStage placed the courier at the route start
  if (cityOf(n) !== prevCity) {
    // Crossing into a new city — the world changes. Announce the city, then zone.
    announce("WELCOME TO " + curCity().name, "#ffd24a", 28);
    smallText("zone 1 of " + ZONES_PER_CITY, "#9aa0b0", W / 2, viewY(0.44));
  } else {
    announce("ZONE " + zoneInCity(n) + "/" + ZONES_PER_CITY, "#ffd24a", 30);
  }
  sfx.wave();
}

// Level-select view: -1 = city list; >=0 = showing that city's zone picker.
let pickedCity = -1;
function gotoLevels() { state = "levels"; pickedCity = -1; }
// Global level of a city's first zone, and how many of its zones are unlocked.
function cityFirstLevel(c) { return c * ZONES_PER_CITY + 1; }
function cityUnlockedZones(c) {
  return Math.max(0, Math.min(ZONES_PER_CITY, unlockedLevel - cityFirstLevel(c) + 1));
}

// ---------- Settings ----------
const SETTINGS_KEY = "mr_settings";
const OPTIONS = {
  difficulty: ["easy", "normal", "hard"],
  stick: ["fixed", "anywhere"],
  side: ["left", "right"],
  size: ["small", "medium", "large"],
  sens: ["low", "medium", "high"],
  smooth: ["off", "low", "normal"],
  power: ["manual", "auto"],
  music: ["on", "off"],
  fps: ["off", "on"],
  nom: ["off", "on"], // TEMP easter-egg toggle — start() routes into NOM MODE
};
const SETTING_LABELS = { difficulty: "difficulty", stick: "joystick", side: "stick side", size: "stick size", sens: "sensitivity", smooth: "smoothing", power: "power trigger", music: "music", fps: "show fps", nom: "NOM mode 🍴" };
// Joystick defaults reflect playtested best-feel: fixed stick (visible neutral,
// no drifting-origin float), smoothing off (direct, no slide), medium sens
// (analog ramp window). See the joystick-feel work in CHANGELOG.
const DEFAULT_SETTINGS = { difficulty: "normal", stick: "anywhere", side: "left", size: "medium", sens: "medium", smooth: "off", power: "manual", music: "on", fps: "off", nom: "off" };

// Difficulty scales the core knobs. spawn>1 = slower spawns (easier).
const DIFFICULTY = {
  easy:   { spawn: 1.4, spd: 0.85, hp: 0.8, boss: 0.78 },
  normal: { spawn: 1.0, spd: 1.0, hp: 1.0, boss: 1.0 },
  hard:   { spawn: 0.82, spd: 1.12, hp: 1.2, boss: 1.25 },
};
function diff() { return DIFFICULTY[settings.difficulty] || DIFFICULTY.normal; }

// ---------- Levels & progress ----------
const PROGRESS_KEY = "mr_progress";
const MAX_LEVEL = ZONES_PER_CITY * CITIES.length; // total zones across all cities
let unlockedLevel = 1; // highest playable level; clearing one unlocks the next
try { unlockedLevel = Math.min(MAX_LEVEL, Math.max(1, JSON.parse(localStorage.getItem(PROGRESS_KEY) || "1") | 0)); } catch {}
let startLevelNum = unlockedLevel; // reset() plays this; defaults to the frontier (auto-resume)
function saveProgress() { try { localStorage.setItem(PROGRESS_KEY, String(unlockedLevel)); } catch {} }
// Difficulty for the current ZONE, computed from the global curve (soft-reset
// per city on a rising floor). Returns the same shape the old CONFIG.levels did.
function lvl() {
  const D = CONFIG.diffCurve;
  const z = zoneInCity(level) - 1;     // 0..4 within the city
  const floor = cityOf(level) * D.cityFloor;
  return {
    hpMul:   1 + z * D.hpPerZone + floor,
    spdMul:  1 + z * D.spdPerZone + floor * 0.5,
    spawnMul: Math.max(D.spawnMin, 1 - z * D.spawnPerZone - floor * 0.3),
    barriers: [],
  };
}
// Barriers are stored as fractions of W×H; bake to pixel rects per level.
function buildBarriers() {
  if (!level || nomMode) { barriers = []; return; }
  const defs = lvl().barriers || [];
  barriers = defs.map((b) => ({ x: b.x * W, y: b.y * H, w: b.w * W, h: b.h * H }));
  // Solid stall walls down each side — keeps player + Bland in the open lane,
  // so the painted shops read as impassable.
  const ew = CONFIG.edgeWalls;
  if (ew && ew.on) {
    const ww = ew.w * W;
    const wh = worldH(); // corridor: the stall walls run the whole route
    barriers.unshift({ x: 0, y: 0, w: ww, h: wh }, { x: W - ww, y: 0, w: ww, h: wh });
  }
}
// Left/right inset of the open lane (0 when edge walls are off).
function laneMargin() {
  const ew = CONFIG.edgeWalls;
  return (ew && ew.on && level && !nomMode) ? ew.w * W : 0;
}
// Push a circle entity (player OR an enemy) out of any barrier it overlaps —
// circle-vs-AABB with sliding, so they round small obstacles instead of
// sticking. Barriers are solid for everyone now; bullets are blocked too.
function resolveBarriers(o) {
  for (const b of barriers) {
    const cx = Math.max(b.x, Math.min(o.x, b.x + b.w));
    const cy = Math.max(b.y, Math.min(o.y, b.y + b.h));
    const dx = o.x - cx, dy = o.y - cy;
    const d2 = dx * dx + dy * dy;
    if (d2 >= o.r * o.r) continue;
    const d = Math.sqrt(d2);
    if (d < 0.0001) { // center inside the rect → eject along the nearest edge
      const left = o.x - b.x, right = b.x + b.w - o.x;
      const top = o.y - b.y, bot = b.y + b.h - o.y;
      const m = Math.min(left, right, top, bot);
      if (m === left) o.x = b.x - o.r;
      else if (m === right) o.x = b.x + b.w + o.r;
      else if (m === top) o.y = b.y - o.r;
      else o.y = b.y + b.h + o.r;
    } else {
      const push = o.r - d;
      o.x += (dx / d) * push;
      o.y += (dy / d) * push;
    }
  }
}
function bulletHitsBarrier(bx, by) {
  for (const b of barriers) {
    if (bx >= b.x && bx <= b.x + b.w && by >= b.y && by <= b.y + b.h) return true;
  }
  return false;
}

let settings = { ...DEFAULT_SETTINGS };
try { settings = { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") }; } catch {}
function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch {}
}
function cycleSetting(key) {
  const opts = OPTIONS[key];
  settings[key] = opts[(opts.indexOf(settings[key]) + 1) % opts.length];
  clearJoy();
  saveSettings();
}
const STICK_SIZES = { small: 44, medium: 56, large: 68 }; // CSS px base radius
const SENS_THROW = { low: 48, medium: 38, high: 28 };     // CSS px drag for full speed (analog ramp window)
const SMOOTH_K = { low: 52, normal: 30 };                  // velocity smoothing rate
function throwPx() { return SENS_THROW[settings.sens] * DPR(); }
function stickAnchor() {
  const dpr = DPR();
  const r = STICK_SIZES[settings.size] * dpr;
  const m = 26 * dpr;
  return {
    x: settings.side === "left" ? m + r : canvas.width - m - r,
    y: canvas.height - m - r - 14 * dpr,
    r,
  };
}

// Power buttons live on the OPPOSITE side from the stick — two stacked
// circles (rush below, slam above). Device px. {x,y,r,key} each.
function powerButtons() {
  const dpr = DPR();
  const r = 32 * dpr, gap = 18 * dpr, m = 26 * dpr;
  const x = settings.side === "left" ? canvas.width - m - r : m + r;
  const yLow = canvas.height - m - r - 14 * dpr;
  return [
    { x, y: yLow, r, key: "rush" },
    { x, y: yLow - (r * 2 + gap), r, key: "slam" },
  ];
}
function triggerPower(key) {
  if (key === "rush") triggerRush();
  else triggerSlam();
}

// Draw the two power buttons (device px). Ring fills as it charges; the
// glyph glows + pulses when ready.
function drawPowerButtons() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const tnow = performance.now() / 1000;
  const defs = [
    // gscale normalizes the OPTICAL size of each glyph so both buttons read the
    // same. Measured rendered widths: ✦ ~41px @1.0, ❄ ~29px @1.0 — so ✦ is shrunk
    // and ❄ left full to land both near ~35px.
    { key: "rush", frac: Math.min(1, rushCharge / CONFIG.powers.rush.eats), ready: rushReady(), color: "#ffd24a", glyph: "❄", gscale: 1.0,
      active: rushActive > 0, activeFrac: rushActive > 0 ? rushActive / CONFIG.powers.rush.dur : 0 },
    { key: "slam", frac: Math.min(1, slamCharge / CONFIG.powers.slam.kills), ready: slamReady(), color: "#ff5a3c", glyph: "✦", gscale: 0.85,
      active: false, activeFrac: 0 },
  ];
  const btns = powerButtons();
  for (const b of btns) {
    const d = defs.find((x) => x.key === b.key);
    ctx.textAlign = "center";
    ctx.font = Math.round(b.r * 0.9 * (d.gscale || 1)) + "px sans-serif";

    if (d.active) {
      // ACTIVE/running: filled tint + DEPLETING timer arc. Reads as "ON",
      // never as "ready" — this is the state that used to confuse.
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = "rgba(20,20,28,0.8)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r - 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * d.activeFrac);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#14141c";
      ctx.fillText(d.glyph, b.x, b.y + b.r * 0.32);
      ctx.globalAlpha = 1;
      continue;
    }

    const pulse = d.ready ? 0.75 + 0.25 * Math.sin(tnow * 5) : 1;
    // Base disc.
    ctx.globalAlpha = d.ready ? 0.92 : 0.4;
    ctx.fillStyle = "rgba(20, 20, 28, 0.6)";
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    // Constant full-circle rim, same in EVERY state — anchors the button size so
    // a charging button never looks smaller than a ready one (the charge arc
    // below only fills part-way while charging).
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = "rgba(232, 232, 240, 0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.stroke();
    // Charge arc (fills as it charges).
    ctx.strokeStyle = d.ready ? d.color : "rgba(232, 232, 240, 0.4)";
    ctx.lineWidth = 4;
    ctx.globalAlpha = d.ready ? pulse : 0.7;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r - 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * d.frac);
    ctx.stroke();
    // Glyph.
    ctx.globalAlpha = d.ready ? pulse : 0.55;
    ctx.fillStyle = d.ready ? d.color : "rgba(232, 232, 240, 0.7)";
    ctx.fillText(d.glyph, b.x, b.y + b.r * 0.32);
    ctx.globalAlpha = 1;
  }
}

// Joystick art, pre-rendered per radius: dished base with direction
// chevrons, and a domed knob.
const joyArt = {};
function joyBaseSprite(rDev) {
  const key = "b" + Math.round(rDev);
  if (!joyArt[key]) {
    const r = Math.round(rDev), s = r * 2 + 8, c = s / 2;
    joyArt[key] = makeSprite(s, s, (g) => {
      const dish = g.createRadialGradient(c, c, r * 0.15, c, c, r);
      dish.addColorStop(0, "rgba(255,255,255,0.03)");
      dish.addColorStop(0.72, "rgba(255,255,255,0.06)");
      dish.addColorStop(0.92, "rgba(255,255,255,0.14)");
      dish.addColorStop(1, "rgba(255,255,255,0.03)");
      g.fillStyle = dish;
      g.beginPath();
      g.arc(c, c, r, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = "rgba(255,255,255,0.30)";
      g.lineWidth = 2;
      g.beginPath();
      g.arc(c, c, r - 1, 0, Math.PI * 2);
      g.stroke();
      g.strokeStyle = "rgba(255,255,255,0.09)";
      g.beginPath();
      g.arc(c, c, r * 0.55, 0, Math.PI * 2);
      g.stroke();
      // Direction chevrons.
      g.fillStyle = "rgba(255,255,255,0.32)";
      for (let i = 0; i < 4; i++) {
        const ang = (i / 4) * Math.PI * 2;
        g.save();
        g.translate(c + Math.cos(ang) * r * 0.8, c + Math.sin(ang) * r * 0.8);
        g.rotate(ang);
        g.beginPath();
        g.moveTo(r * 0.1, 0);
        g.lineTo(-r * 0.05, -r * 0.09);
        g.lineTo(-r * 0.05, r * 0.09);
        g.closePath();
        g.fill();
        g.restore();
      }
    });
  }
  return joyArt[key];
}
function joyKnobSprite(rDev) {
  const key = "k" + Math.round(rDev);
  if (!joyArt[key]) {
    const r = Math.round(rDev), s = r * 2 + 6, c = s / 2;
    joyArt[key] = makeSprite(s, s, (g) => {
      const dome = g.createRadialGradient(c - r * 0.3, c - r * 0.35, r * 0.1, c, c, r);
      dome.addColorStop(0, "rgba(255,255,255,0.55)");
      dome.addColorStop(0.45, "rgba(255,255,255,0.28)");
      dome.addColorStop(1, "rgba(255,255,255,0.10)");
      g.fillStyle = dome;
      g.beginPath();
      g.arc(c, c, r, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = "rgba(255,255,255,0.4)";
      g.lineWidth = 1.5;
      g.stroke();
    });
  }
  return joyArt[key];
}

// ---------- Sound (procedural Web Audio, zero asset files) ----------
// Context is created lazily on the first user gesture — mobile browsers
// refuse to start audio before one anyway.
let audioCtx = null, masterGain = null, noiseBuf = null;
let muted = false;
try { muted = localStorage.getItem("mr_muted") === "1"; } catch {}

function ensureAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = muted ? 0 : 0.5;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function setMuted(m) {
  muted = m;
  try { localStorage.setItem("mr_muted", m ? "1" : "0"); } catch {}
  if (masterGain) masterGain.gain.value = m ? 0 : 0.5;
}

// One enveloped oscillator. freq2 = pitch slide target over the duration.
function tone({ freq = 440, freq2, type = "sine", dur = 0.1, vol = 0.3, when = 0 }) {
  if (muted || !ensureAudio()) return;
  const t0 = audioCtx.currentTime + when;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (freq2) o.frequency.exponentialRampToValueAtTime(freq2, t0 + dur);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g);
  g.connect(masterGain);
  o.start(t0);
  o.stop(t0 + dur + 0.03);
}

// Filtered noise burst — thuds and pops.
function noiseHit({ dur = 0.1, vol = 0.3, cutoff = 800, when = 0 }) {
  if (muted || !ensureAudio()) return;
  if (!noiseBuf) {
    noiseBuf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.25, audioCtx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const t0 = audioCtx.currentTime + when;
  const src = audioCtx.createBufferSource();
  src.buffer = noiseBuf;
  const f = audioCtx.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = cutoff;
  const g = audioCtx.createGain();
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f);
  f.connect(g);
  g.connect(masterGain);
  src.start(t0);
  src.stop(t0 + dur + 0.03);
}

const FLAVOR_PITCH = { spicy: 660, sweet: 880, savory: 440, none: 520 };
const sfx = {
  eat(fl) { const p = FLAVOR_PITCH[fl] || 520; tone({ freq: p, freq2: p * 1.5, type: "square", dur: 0.12, vol: 0.22 }); },
  fusion() {
    tone({ freq: 392, freq2: 784, type: "sawtooth", dur: 0.18, vol: 0.28 });
    tone({ freq: 587, freq2: 1175, type: "square", dur: 0.22, vol: 0.2, when: 0.09 });
  },
  shoot() { tone({ freq: 1100, freq2: 650, type: "triangle", dur: 0.04, vol: 0.05 }); },
  hit() { noiseHit({ dur: 0.18, vol: 0.45, cutoff: 300 }); tone({ freq: 110, freq2: 55, dur: 0.2, vol: 0.45 }); },
  shield() { tone({ freq: 1318, freq2: 880, type: "triangle", dur: 0.12, vol: 0.2 }); },
  kill() { noiseHit({ dur: 0.06, vol: 0.16, cutoff: 1400 }); tone({ freq: 330, freq2: 660, type: "triangle", dur: 0.07, vol: 0.1 }); },
  wave() { tone({ freq: 523, dur: 0.1, vol: 0.18 }); tone({ freq: 784, dur: 0.15, vol: 0.18, when: 0.1 }); },
  go() { tone({ freq: 659, freq2: 988, type: "square", dur: 0.12, vol: 0.18 }); },
  death() { tone({ freq: 220, freq2: 55, type: "sawtooth", dur: 0.7, vol: 0.32 }); noiseHit({ dur: 0.5, vol: 0.22, cutoff: 200 }); },
  bossWindup() { tone({ freq: 160, freq2: 420, type: "sawtooth", dur: 0.7, vol: 0.22 }); },
  bossDown() {
    noiseHit({ dur: 0.4, vol: 0.5, cutoff: 500 });
    tone({ freq: 392, dur: 0.12, vol: 0.24, when: 0.05 });
    tone({ freq: 587, dur: 0.12, vol: 0.24, when: 0.18 });
    tone({ freq: 784, dur: 0.22, vol: 0.24, when: 0.31 });
  },
  ui() { tone({ freq: 880, dur: 0.045, vol: 0.09, type: "triangle" }); },
};

// ---------- Background music (procedural, looping) ----------
// Slow ambient loop in an A minor-pentatonic feel: soft bass pulse + sparse
// plucks. Scheduled ahead of audio time; pauses naturally when rAF stops
// (tab/app backgrounded). Gated by the "music" setting and the master mute.
const A = 110; // A2
const semi = (n) => A * Math.pow(2, n / 12);
// 16-step patterns (null = rest), notes as semitones above A2 from the
// minor pentatonic. Bass low, melody two octaves up.
const BASS_PAT = [0, null, null, null, 7, null, null, null, 5, null, null, null, 3, null, 7, null];
const MEL_PAT = [12, null, 15, null, null, 17, null, 12, 15, null, null, 10, null, 14, null, null];
const music = { next: 0, step: 0, stepDur: 0.3 };
function musicNote(freq, dur, vol, at, type) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type || "triangle";
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, at);
  g.gain.linearRampToValueAtTime(vol, at + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g);
  g.connect(masterGain);
  o.start(at);
  o.stop(at + dur + 0.05);
}
function tickMusic() {
  if (settings.music !== "on" || muted || !audioCtx) return;
  const now = audioCtx.currentTime;
  if (music.next < now) music.next = now + 0.05; // (re)sync after a pause
  while (music.next < now + 0.15) {
    const s = music.step;
    const b = BASS_PAT[s];
    if (b !== null) musicNote(semi(b), 0.5, 0.17, music.next, "triangle");
    const m = MEL_PAT[s];
    if (m !== null) musicNote(semi(m), 0.35, 0.11, music.next, "sine");
    music.next += music.stepDur;
    music.step = (music.step + 1) % 16;
  }
}

// ---------- Input ----------
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  ensureAudio(); // any key is a gesture — unlock audio
  if (e.key === "Escape" && settingsOpen) { closeSettings(); return; }
  if (e.key === "Escape" && (state === "gameover" || state === "levelclear")) { gotoLevels(); return; }
  if (boonChoices && (e.key === "1" || e.key === "2" || e.key === "3")) { pickBoon(+e.key - 1); return; }
  if (e.key === "m" || e.key === "M") { setMuted(!muted); sfx.ui(); return; }
  if (state === "playing") {
    if (e.key === "q" || e.key === "Q") { triggerRush(); return; }
    if (e.key === "e" || e.key === "E") { triggerSlam(); return; }
  }
  if (state !== "playing" && (e.key === " " || e.key === "Enter")) {
    if (state === "menu") { if (settings.nom === "on") start(); else gotoLevels(); }
    else if (state === "levels") startLevel(unlockedLevel);
    else if (state === "levelclear") gotoLevels();
    else start(); // gameover → replay current level
  }
});
window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

// Virtual joystick, two modes:
// - "fixed" (default): a visible stick anchored bottom-left/right; only
//   touches near it move the player, so the screen stays readable.
// - "anywhere": touch any point; origin follows the thumb at full throw.
let joy = null; // {id, fixed?, ox, oy, dx, dy} in canvas px — ox/oy = touch origin
// Drop the stick AND zero all carried movement state. Smoothed input (imx/imy)
// and velocity would otherwise keep gliding the character after the thumb lifts
// or the app loses focus. Use this everywhere a touch session ends.
function clearJoy() {
  joy = null;
  if (player) { player.imx = 0; player.imy = 0; player.vx = 0; player.vy = 0; }
}
function toLocal(t) {
  const dpr = DPR();
  return { x: t.clientX * dpr, y: t.clientY * dpr };
}
function toArena(p) {
  return { x: (p.x - offX) / scale, y: (p.y - offY) / scale };
}

// Closing settings mid-run gives a 3s countdown before action resumes.
function closeSettings() {
  settingsOpen = false;
  if (state === "playing") resumeT = 3;
}

function pickBoon(i) {
  applyBoon(boonChoices[i]);
  boonChoices = null;
  // After a boss pick, give the longer breather before the wave resumes. A
  // mid-wave level-up pick resumes INSTANTLY — the modal pause was the break;
  // a countdown here reads like the wave restarted (playtest note).
  if (pickKind === "boss") gapT = CONFIG.postBoss.breather;
  pickKind = null;
  pickGap = CONFIG.levelXp.minGap; // start the floor before the next pick can open
  sfx.ui();
  if (navigator.vibrate) navigator.vibrate(10);
}

// Main boss down → zone complete. Unlock the next zone for the hub, then under
// "B" flow STRAIGHT into it with the build intact (advanceStage). The run only
// ends on death; the "levelclear" screen now means RUN COMPLETE — every zone
// cleared in one continuous build.
function clearLevel() {
  if (level >= unlockedLevel && unlockedLevel < MAX_LEVEL) {
    unlockedLevel = level + 1;
    startLevelNum = unlockedLevel; // auto-resume points at the new frontier
    saveProgress();
  }
  bestTime = Math.max(bestTime, elapsed);
  if (level < MAX_LEVEL) advanceStage(); // keep playing — same build, next zone
  else state = "levelclear";             // final zone down → run complete
}

// Start a specific level from the select screen (always the main game).
function startLevel(n) {
  nomMode = false;
  startLevelNum = Math.min(Math.max(1, n), unlockedLevel);
  reset();
  state = "playing";
  sfx.wave();
}

// Taps on UI (gear icon, settings panel). Returns true if consumed.
function uiPress(p) {
  const a = toArena(p);
  if (boonChoices) {
    // Boon pick is modal: only the three cards respond.
    for (const r of boonLayout()) {
      if (a.x >= r.x && a.x <= r.x + r.w && a.y >= r.y && a.y <= r.y + r.h) {
        pickBoon(r.i);
        break;
      }
    }
    return true;
  }
  if (settingsOpen) {
    for (const r of settingsLayout()) {
      if (r.header) continue; // section labels aren't tappable
      if (a.x >= r.x && a.x <= r.x + r.w && a.y >= r.y && a.y <= r.y + r.h) {
        settingsFx = { key: r.key, at: performance.now() };
        if (navigator.vibrate) navigator.vibrate(r.key === "reset" ? 20 : 8);
        sfx.ui();
        if (r.key === "close") closeSettings();
        else if (r.key === "reset") {
          settings = { ...DEFAULT_SETTINGS };
          saveSettings();
          clearJoy();
        } else cycleSetting(r.key);
        return true;
      }
    }
    return true; // modal: swallow taps outside rows
  }
  if (Math.hypot(a.x - (W - 26), a.y - 30) < 26) {
    settingsOpen = true;
    clearJoy();
    sfx.ui();
    return true;
  }
  // Mute toggle (speaker icon left of the gear).
  if (Math.hypot(a.x - (W - 66), a.y - 30) < 18) {
    setMuted(!muted);
    sfx.ui(); // silent when muting (gain already 0), blips when unmuting
    if (navigator.vibrate) navigator.vibrate(8);
    return true;
  }
  return false;
}

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  ensureAudio(); // first touch unlocks audio on mobile
  const t = e.changedTouches[0];
  const p = toLocal(t);
  if (uiPress(p)) return;
  if (state === "gameover") { gameOverPress(p); return; }
  if (state === "levelclear") { sfx.ui(); gotoLevels(); return; }
  if (state === "menu") { sfx.ui(); if (settings.nom === "on") start(); else gotoLevels(); return; }
  if (state === "levels") { levelsPress(p); return; }
  if (state !== "playing") return;
  // Power buttons (manual mode): a tap on a glowing button fires it.
  if (settings.power === "manual" && !settingsOpen && !boonChoices) {
    for (const b of powerButtons()) {
      if (Math.hypot(p.x - b.x, p.y - b.y) <= b.r) {
        triggerPower(b.key);
        return;
      }
    }
  }
  if (joy) return; // first finger owns the stick
  if (settings.stick === "fixed") {
    // Touch must land in the corner movement zone, but the origin is the touch
    // point itself — NOT the anchor center. An off-center landing starts at
    // zero deflection, so the character only moves once the thumb deliberately
    // drags past the deadzone (no lurch from imperfect thumb placement).
    const an = stickAnchor();
    if (Math.hypot(p.x - an.x, p.y - an.y) <= an.r * 1.7) {
      joy = { id: t.identifier, fixed: true, ox: p.x, oy: p.y, dx: 0, dy: 0 };
    }
  } else {
    joy = { id: t.identifier, ox: p.x, oy: p.y, dx: 0, dy: 0 };
  }
}, { passive: false });
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!joy) return;
  // Phantom-stick guard: if our finger vanished from the active set without a
  // clean touchend (slid off-screen / system gesture ate it), drop the stick
  // so the character can't keep gliding on a stale deflection.
  let alive = false;
  for (const t of e.touches) if (t.identifier === joy.id) { alive = true; break; }
  if (!alive) { clearJoy(); return; }
  for (const t of e.changedTouches) {
    if (t.identifier !== joy.id) continue;
    const p = toLocal(t);
    joy.dx = p.x - joy.ox;
    joy.dy = p.y - joy.oy;
    const max = throwPx();
    const len = Math.hypot(joy.dx, joy.dy);
    if (len > max) {
      if (joy.fixed) {
        // Pinned origin: just clamp deflection so the stick stays put.
        joy.dx *= max / len;
        joy.dy *= max / len;
      } else {
        // Touch-anywhere: drag the origin along behind the thumb.
        const k = (len - max) / len;
        joy.ox += joy.dx * k;
        joy.oy += joy.dy * k;
        joy.dx *= max / len;
        joy.dy *= max / len;
      }
    }
  }
}, { passive: false });
const endTouch = (e) => {
  if (!joy) return;
  e.preventDefault();
  for (const t of e.changedTouches) {
    if (t.identifier === joy.id) { clearJoy(); return; }
  }
  // Safety net: our finger never reported a clean touchend (slid off the
  // screen edge, esp. a corner fixed stick, or a system gesture). If nothing
  // is touching the surface anymore, there is no stick — clear it so the
  // character stops instead of floating off on a stale deflection.
  if (e.touches.length === 0) clearJoy();
};
canvas.addEventListener("touchend", endTouch, { passive: false });
canvas.addEventListener("touchcancel", endTouch, { passive: false });
// Also listen on window: a touch that began on the canvas but ends off it
// (finger dragged past the edge) reports its touchend to window, not canvas.
window.addEventListener("touchend", endTouch, { passive: false });
window.addEventListener("touchcancel", endTouch, { passive: false });
canvas.addEventListener("mousedown", (e) => {
  ensureAudio();
  const dpr = DPR();
  const p = { x: e.clientX * dpr, y: e.clientY * dpr };
  if (uiPress(p)) return;
  if (state === "gameover") { gameOverPress(p); return; }
  if (state === "levelclear") { sfx.ui(); gotoLevels(); return; }
  if (state === "menu") { sfx.ui(); if (settings.nom === "on") start(); else gotoLevels(); return; }
  if (state === "levels") { levelsPress(p); return; }
});

// End-screen buttons. Specific hit-zones only — taps elsewhere do nothing,
// so the player can system-swipe to close the app without an accidental retry.
function gameOverLayout() {
  const bw = 150, bh = 56, gap = 16, y = H * 0.585;
  const x0 = (W - (bw * 2 + gap)) / 2;
  return [
    { x: x0, y, w: bw, h: bh, key: "replay" },
    { x: x0 + bw + gap, y, w: bw, h: bh, key: "menu" },
  ];
}
function gameOverPress(p) {
  const a = toArena(p);
  for (const r of gameOverLayout()) {
    if (a.x >= r.x && a.x <= r.x + r.w && a.y >= r.y && a.y <= r.y + r.h) {
      sfx.ui();
      if (navigator.vibrate) navigator.vibrate(8);
      if (r.key === "replay") start();
      else gotoLevels();
      return;
    }
  }
}

function start() {
  nomMode = settings.nom === "on"; // route into the easter egg if enabled
  reset();
  state = "playing";
  sfx.wave(); // run-start chime (matches the WAVE 1 announce in reset)
}

// ---------- Helpers ----------
function dist2(a, b) {
  const dx = a.x - b.x, dy = a.y - b.y;
  return dx * dx + dy * dy;
}
// Comic popup font (Bangers via Google Fonts, comic-style fallbacks offline).
const COMIC_FONT = '"Bangers", "Comic Sans MS", "Chalkboard SE", "Marker Felt", sans-serif';
if (document.fonts && document.fonts.load) document.fonts.load('20px "Bangers"');

// New popups stay in the orbit of an earlier one but tuck in below it —
// never overlapping.
function placeFloater(x, y, size) {
  let yy = y;
  for (let guard = 0; guard < 10; guard++) {
    let moved = false;
    for (const f of floaters) {
      if (Math.abs(f.x - x) < 80 && Math.abs(f.y - yy) < (f.size + size) * 0.62) {
        yy = f.y + (f.size + size) * 0.66;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return yy;
}
function announce(text, color, size = 34) {
  floaters.push({ text, color, x: W / 2, y: placeFloater(W / 2, viewY(0.35), size), life: 1.6, size, vy: -20 });
}
function smallText(text, color, x, y) {
  floaters.push({ text, color, x, y: placeFloater(x, y, 16), life: 0.9, size: 16, vy: -40 });
}
function burst(x, y, color, n, speed) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = speed * (0.4 + Math.random() * 0.6);
    particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.4 + Math.random() * 0.3, color, r: 2 + Math.random() * 2 });
  }
}

// ---------- Spawning ----------
// Stats freeze at scalingCapWave — late waves escalate via mix, not sponges.
function effWave() { return Math.min(wave, CONFIG.scalingCapWave); }

function spawnPoint(r) {
  // In the open lane (never inside the side stall-walls or the letterbox).
  const m = laneMargin();
  const x0 = m + r, x1 = W - m - r;
  if (corridorOn() && cam.lock < 0) {
    // Corridor: enemies come from OFF-SCREEN, biased toward the run direction
    // (ahead = up = lower y). Flip to the other side if the route ends there.
    const ahead = Math.random() < CONFIG.corridor.aheadBias;
    let y = ahead ? cam.y - r - 30 - Math.random() * 120
                  : cam.y + H + r + 30 + Math.random() * 120;
    if (y < r || y > routeLen - r) {
      y = ahead ? cam.y + H + r + 40 : cam.y - r - 40;
      y = Math.max(r, Math.min(routeLen - r, y));
    }
    return { x: x0 + Math.random() * (x1 - x0), y };
  }
  // Arena / locked boss window: the four edges of the view band.
  const b0 = camTop();
  const side = Math.floor(Math.random() * 4);
  if (side === 0) return { x: x0 + Math.random() * (x1 - x0), y: b0 + r };
  if (side === 1) return { x: x0 + Math.random() * (x1 - x0), y: b0 + H - r };
  if (side === 2) return { x: x0, y: b0 + r + Math.random() * (H - 2 * r) };
  return { x: x1, y: b0 + r + Math.random() * (H - 2 * r) };
}

function makeEnemy(type, x, y, spdMul = 1) {
  const c = CONFIG.enemies[type];
  const d = diff();
  const w = effWave();
  const L = lvl();
  const r = c.rMin + Math.random() * (c.rMax - c.rMin);
  const hp = Math.max(1, Math.round((c.hpBase + Math.floor(w * c.hpPerWave)) * d.hp * L.hpMul));
  return {
    type, x, y, r, hp, maxHp: hp,
    speed: (c.spdBase + w * c.spdPerWave + Math.random() * c.spdRand) * d.spd * L.spdMul * spdMul,
    wobble: Math.random() * Math.PI * 2,
    spawning: c.telegraph, spawnDur: c.telegraph,
  };
}

// One spawn EVENT: a lone bland, or a swarmer pack (same edge point, jittered).
// spdMul lets the caller dial spawned-enemy speed down (post-boss early-level ease).
function spawnEnemy(spdMul = 1) {
  const share = CONFIG.swarmerShare[Math.min(wave - 1, CONFIG.swarmerShare.length - 1)];
  if (Math.random() < share) {
    const c = CONFIG.enemies.swarmer;
    const n = c.packMin + Math.floor(Math.random() * (c.packMax - c.packMin + 1));
    const p = spawnPoint(c.rMax);
    const m = laneMargin();
    for (let i = 0; i < n; i++) {
      const e = makeEnemy("swarmer",
        Math.max(m + c.rMax, Math.min(W - m - c.rMax, p.x + (Math.random() - 0.5) * 52)),
        Math.max(c.rMax, Math.min(worldH() - c.rMax, p.y + (Math.random() - 0.5) * 52)), spdMul);
      enemies.push(e);
    }
  } else {
    const p = spawnPoint(CONFIG.enemies.bland.rMax);
    enemies.push(makeEnemy("bland", p.x, p.y, spdMul));
  }
}

// Main boss summon: a single swarmer at the arena edge.
function spawnBossAdd() {
  const c = CONFIG.enemies.swarmer;
  const p = spawnPoint(c.rMax);
  enemies.push(makeEnemy("swarmer", p.x, p.y));
}

// Bosses arrive alone (regular spawns + wave timer pause), stalk, then
// telegraph a charge; the recovery after each charge is the weak window.
// main=false → wave-5 mini-boss (Blandfather); main=true → wave-8 finale.
function startBossFight(main) {
  bossFight = true;
  lastBossWave = wave;
  // Corridor: pin the camera — the duel plays in a one-screen arena window, so
  // every arena-tuned boss behavior (charge ranges, recovery windows) holds.
  if (corridorOn()) cam.lock = Math.max(0, Math.min(routeLen - H, cam.y));
  const c = main ? CONFIG.mainBoss : CONFIG.boss;
  bossFoodEvery = c.foodEvery;
  bossFoodT = c.foodEvery;
  // The zone-5 main boss is the CITY BOSS: bigger + themed (the city finale).
  const cityBoss = main && isCityFinale(level);
  const hpMul2 = cityBoss ? CONFIG.diffCurve.cityBossMul : 1;
  const bhp = Math.round(c.hp * diff().boss * lvl().hpMul * hpMul2);
  const bname = cityBoss ? curCity().boss.name : (main ? "THE BLAND MAHARAJA" : "THE BLANDFATHER");
  enemies.push({
    type: "boss", boss: true, main: !!main, cityBoss,
    x: W / 2, y: camTop() + c.r, r: c.r * (cityBoss ? 1.18 : 1),
    hp: bhp, maxHp: bhp, speed: c.speed,
    wobble: Math.random() * Math.PI * 2,
    spawning: c.telegraph, spawnDur: c.telegraph,
    bossState: "stalk", stateT: 0, chargeT: c.chargeEvery,
    cvx: 0, cvy: 0,
    // per-boss tuning carried on the entity (updateBoss/killEnemy read these)
    chargeEvery: c.chargeEvery, chargeWindup: c.chargeWindup,
    chargeSpeed: c.chargeSpeed, chargeDur: c.chargeDur, recover: c.recover,
    deathDrops: c.deathDrops,
    name: bname,
    addEvery: main ? c.addEvery : 0, addT: main ? c.addEvery : 0,
  });
  announce(bname, main ? "#ff8c3c" : "#e8e8f0");
  sfx.fusion();
  shake = main ? 0.4 : 0.25;
}

// Boss brain: stalk → windup (frozen telegraph) → charge → recover (weak
// window, barely moves) → stalk. Walls end a charge early.
function updateBoss(e, dt) {
  // Main boss summons a lone swarmer now and then (light extra pressure).
  if (e.addEvery > 0) {
    e.addT -= dt;
    if (e.addT <= 0) { e.addT = e.addEvery; spawnBossAdd(); }
  }
  if (e.bossState === "stalk") {
    const a = Math.atan2(player.y - e.y, player.x - e.x);
    e.x += Math.cos(a) * e.speed * dt;
    e.y += Math.sin(a) * e.speed * dt;
    e.chargeT -= dt;
    if (e.chargeT <= 0) {
      e.bossState = "windup";
      e.stateT = e.chargeWindup;
      sfx.bossWindup();
    }
  } else if (e.bossState === "windup") {
    e.stateT -= dt;
    if (e.stateT <= 0) {
      const a = Math.atan2(player.y - e.y, player.x - e.x);
      e.cvx = Math.cos(a) * e.chargeSpeed;
      e.cvy = Math.sin(a) * e.chargeSpeed;
      e.bossState = "charge";
      e.stateT = e.chargeDur;
    }
  } else if (e.bossState === "charge") {
    e.stateT -= dt;
    e.x += e.cvx * dt;
    e.y += e.cvy * dt;
    const b0 = camTop();
    if (e.x <= e.r || e.x >= W - e.r || e.y <= b0 + e.r || e.y >= b0 + H - e.r || e.stateT <= 0) {
      e.bossState = "recover";
      e.stateT = e.recover;
      shake = Math.max(shake, 0.18);
    }
  } else { // recover
    e.stateT -= dt;
    const a = Math.atan2(player.y - e.y, player.x - e.x);
    e.x += Math.cos(a) * e.speed * 0.3 * dt;
    e.y += Math.sin(a) * e.speed * 0.3 * dt;
    if (e.stateT <= 0) { e.bossState = "stalk"; e.chargeT = e.chargeEvery; }
  }
  const b0 = camTop();
  e.x = Math.max(e.r, Math.min(W - e.r, e.x));
  e.y = Math.max(b0 + e.r, Math.min(b0 + H - e.r, e.y));
}

function applyBoon(b) {
  boons.push(b.id);
  const cap = CONFIG.boonCaps;
  if (b.id === "shots") mods.shots = Math.min(cap.shots, mods.shots + 1);
  else if (b.id === "heart") { player.maxHp = Math.min(cap.maxHp, player.maxHp + 1); player.hp = Math.min(player.maxHp, player.hp + 1); }
  else if (b.id === "drain") mods.drain = Math.max(cap.drainFloor, mods.drain * 0.8);
  else if (b.id === "pierce") mods.pierce = Math.min(cap.pierce, mods.pierce + 1);
  else if (b.id === "fire") mods.fire = Math.max(cap.fireFloor, mods.fire * 0.88);
  announce(b.name + "!", "#ffb347", 26);
}
// A boon is "maxed" once its effect hits the cap — drop it from the pick pool.
function boonAtCap(id) {
  const c = CONFIG.boonCaps;
  if (id === "shots") return mods.shots >= c.shots;
  if (id === "pierce") return mods.pierce >= c.pierce;
  if (id === "fire") return mods.fire <= c.fireFloor + 1e-6;
  if (id === "drain") return mods.drain <= c.drainFloor + 1e-6;
  if (id === "heart") return player.maxHp >= c.maxHp;
  return false;
}
// Shuffled pool of boons that still have headroom.
function availableBoons() {
  const pool = CONFIG.boons.filter((b) => !boonAtCap(b.id));
  return [...(pool.length ? pool : CONFIG.boons)].sort(() => Math.random() - 0.5);
}
// True once every boon is at its cap — the build can't improve, so no pick (from
// XP or a mini-boss) should open a dead modal. Shows a one-time "FULLY STOCKED".
function buildMaxed() { return !CONFIG.boons.some((b) => !boonAtCap(b.id)); }
function noteFullyStocked() {
  if (maxedAnnounced) return;
  maxedAnnounced = true;
  announce("FULLY STOCKED!", "#ffd24a", 24);
}

// ---------- XP & level-ups (build-system spike) ----------
function xpToNext(lvl) { const c = CONFIG.levelXp; return c.base + (lvl - 1) * c.step; }
function addXp(type) {
  xp += CONFIG.levelXp.killXp[type] || 1;
  while (xp >= xpNext) {
    xp -= xpNext;
    playerLevel++;
    xpNext = xpToNext(playerLevel);
    pendingLevels++;
  }
}
// Open a 1-of-3 upgrade pick if one is queued and the field is clear (defers
// during a boss fight / the level-clear beat). Reuses the boon modal + pool.
function tryOpenPick() {
  // pickGap is the anti-spam floor: even with levels banked, the next pick waits
  // out the cooldown so modals never stack back-to-back (set in pickBoon).
  if (boonChoices || pendingLevels <= 0 || bossFight || endingLevel || pickGap > 0) return;
  // Fully-maxed build: every boon is capped, so a pick would be a dead modal.
  // Drain the banked level-ups (they can never do anything) and skip silently.
  if (buildMaxed()) { pendingLevels = 0; noteFullyStocked(); return; }
  pendingLevels--;
  pickKind = "levelup";
  boonChoices = availableBoons().slice(0, 3);
  sfx.bossDown();
  if (navigator.vibrate) navigator.vibrate(8);
}

function dropFood(x, y, type) {
  const rate = (CONFIG.enemies[type] || CONFIG.enemies.bland).drop;
  if (Math.random() > rate) return;
  const t = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
  foods.push({ x, y, r: 11, type: t, life: CONFIG.foodLife });
}

// ---------- Eating ----------
function eat(food) {
  const prevFlavor = flavor;
  const prevFraction = flavorTimer / FLAVOR_DURATION;
  // Same flavor just refreshes the meter — mixing is what cooks.
  const fusion = prevFlavor !== "none" && prevFlavor !== food.type.flavor && prevFraction > FUSION_THRESHOLD;

  flavor = food.type.flavor;
  flavorTimer = FLAVOR_DURATION;
  if (flavor === "savory") {
    player.shield = 1;
    savoryPulse = 0.3; // first pulse almost immediately
  }
  smallText(food.type.name + "!", food.type.color, player.x, player.y - 26);
  burst(player.x, player.y, food.type.color, 10, 120);
  sfx.eat(flavor);
  chargeRush();

  if (fusion) {
    fuse(prevFlavor, flavor);
  } else if (prevFlavor === flavor && prevFraction > FUSION_THRESHOLD) {
    // Same flavor at a fusion-ready meter: teach the mixing rule.
    smallText("refreshed", "#9aa0b0", player.x, player.y - 44);
    if (!mixHintShown) {
      mixHintShown = true;
      announce("mix a DIFFERENT flavor to cook a recipe!", "#ffb347", 17);
    }
  }
}

function fuse(a, b) {
  const key = recipeKey(a, b);
  const recipe = RECIPES[key];
  if (!recipe) return;
  fusionFlash = 0.25;
  shake = 0.3;
  hitStop = 0.09;
  sfx.fusion();

  if (!discovered.has(key)) {
    discovered.add(key);
    try { localStorage.setItem("mr_recipes", JSON.stringify([...discovered])); } catch {}
    announce("NEW RECIPE: " + recipe.name + "!", "#ffffff");
  } else {
    announce(recipe.name + "!", "#ffffff");
  }

  if (key === "spicy+sweet") {
    // Chilli Glaze: radial flame burst — raw offense.
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2;
      bullets.push({ x: player.x, y: player.y, vx: Math.cos(ang) * 380, vy: Math.sin(ang) * 380, r: 6, damage: 3, color: "#ff5a3c", life: 1.2 });
    }
  } else if (key === "savory+spicy") {
    // Tadka Blast: huge shockwave — clears a surrounded player.
    rings.push({ x: player.x, y: player.y, r: 20, maxR: 220, life: 0.35, color: "#ffd24a" });
    for (let j = enemies.length - 1; j >= 0; j--) {
      const e = enemies[j];
      if (e.spawning > 0) continue;
      const dx = e.x - player.x, dy = e.y - player.y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < 220) {
        if (!e.boss) { // bosses take the damage but hold their ground
          e.x = Math.max(e.r, Math.min(W - e.r, e.x + (dx / d) * 150));
          e.y = Math.max(e.r, Math.min(worldH() - e.r, e.y + (dy / d) * 150));
        }
        e.hp -= 2;
        e.flash = 0.08;
        if (e.hp <= 0) killEnemy(j);
      }
    }
  } else if (key === "savory+sweet") {
    // Maska Mend: the only healing in the game.
    if (player.hp < player.maxHp) {
      player.hp++;
      smallText("+1 ♥", "#ff5a6e", player.x, player.y - 44);
    }
    player.shield = 1;
    rings.push({ x: player.x, y: player.y, r: 18, maxR: 90, life: 0.35, color: "#3ecf8e" });
  }
}

// ---------- Shooting ----------
function nearestEnemy() {
  let best = null, bd = Infinity;
  for (const e of enemies) {
    if (e.spawning > 0 || e.defeated) continue;
    const d = dist2(player, e);
    if (d < bd) { bd = d; best = e; }
  }
  return best;
}

function shoot(dt) {
  const f = FLAVORS[flavor];
  fireTimer -= dt;
  if (fireTimer > 0) return;
  const target = nearestEnemy();
  if (!target) return;
  fireTimer = f.fireInterval * mods.fire;
  sfx.shoot(); // once per volley, not per pellet

  const base = Math.atan2(target.y - player.y, target.x - player.x);
  const spread = 0.22;
  const shots = f.shots + mods.shots;
  const spd = f.bulletSpeed || 420;
  for (let i = 0; i < shots; i++) {
    const a = base + (i - (shots - 1) / 2) * spread;
    bullets.push({ x: player.x, y: player.y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, r: f.bulletR || 4, damage: f.damage, color: f.color, life: 1.5, pierce: (f.pierce || 0) + mods.pierce });
  }
}

// Shared kill path: score, burst, corpse dissolve, drop, remove.
function killEnemy(j) {
  const e = enemies[j];
  kills++;
  if (e.type === "nom") {
    // NOM is full. You win the easter egg.
    enemies.splice(j, 1);
    burst(e.x, e.y, "#ffd24a", 40, 200);
    dying.push({ x: e.x, y: e.y, r: e.r, life: 0.5 });
    shake = 0.5; hitStop = 0.14; fusionFlash = 0.3;
    sfx.bossDown();
    nomWon = true;
    state = "gameover";
    bestTime = Math.max(bestTime, elapsed);
    return;
  }
  if (e.boss) {
    bossFight = false;
    if (e.main) {
      // Finale: don't vanish on the killing blow. Hold the moment — the boss
      // slumps in a "defeated" state with a callout, then the update loop runs
      // out e.defeatT and triggers LEVEL CLEAR (no boon — fresh setup next).
      e.defeated = true;
      e.defeatT = CONFIG.bossDefeat;
      e.flash = 0;
      e.cvx = e.cvy = 0;
      endingLevel = true; // stop regular spawns during the victory beat
      burst(e.x, e.y, "#ff8c3c", 50, 230);
      shake = 0.65; hitStop = 0.16; fusionFlash = 0.4;
      announce("MAHARAJA DEFEATED!", "#ff8c3c", 28);
      sfx.bossDown();
      return;
    }
    // Mini-boss: instant down → pick 1 of 3 boons (lasts the rest of THIS level).
    cam.lock = -1; // corridor: release the duel window, the route continues
    enemies.splice(j, 1);
    burst(e.x, e.y, "#8d93a5", 26, 170);
    dying.push({ x: e.x, y: e.y, r: e.r, life: 0.4 });
    const drops = e.deathDrops || 2;
    for (let i = 0; i < drops; i++) {
      const t = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
      foods.push({ x: e.x + (i - (drops - 1) / 2) * 34, y: e.y, r: 11, type: t, life: CONFIG.foodLife });
    }
    shake = 0.45; hitStop = 0.12; fusionFlash = 0.2;
    sfx.bossDown();
    if (buildMaxed()) { noteFullyStocked(); }
    else { pickKind = "boss"; boonChoices = availableBoons().slice(0, 3); }
    return;
  }
  sfx.kill();
  burst(e.x, e.y, "#8d93a5", 8, 90);
  dying.push({ x: e.x, y: e.y, r: e.r, life: 0.22 });
  dropFood(e.x, e.y, e.type);
  addXp(e.type);
  enemies.splice(j, 1);
  chargeSlam();
}

// Light separation so a flock doesn't collapse into one overlapping pile
// (which read as a single Bland that "vanishes & reappears" when you peel the
// top one off). Eases pairs apart over a few frames; bosses hold their ground.
function separateEnemies() {
  const n = enemies.length;
  // Pairwise de-stacking (O(n²)) — skip when there's nothing to separate. The
  // barrier + lane clamp below must still run for a lone enemy, so it lives
  // outside this guard.
  if (n >= 2) for (let i = 0; i < n; i++) {
    const a = enemies[i];
    if (a.spawning > 0 || a.boss || a.defeated || a.type === "coin" || a.type === "nom") continue;
    for (let j = i + 1; j < n; j++) {
      const b = enemies[j];
      if (b.spawning > 0 || b.boss || b.defeated || b.type === "coin" || b.type === "nom") continue;
      const dx = b.x - a.x, dy = b.y - a.y;
      const min = (a.r + b.r) * 0.85; // allow a little overlap, never a full stack
      const d2v = dx * dx + dy * dy;
      if (d2v < min * min) {
        let d = Math.sqrt(d2v), ux, uy;
        if (d < 0.01) { const ra = Math.random() * Math.PI * 2; ux = Math.cos(ra); uy = Math.sin(ra); d = 0; }
        else { ux = dx / d; uy = dy / d; }
        const push = (min - d) * 0.25; // gentle — settles over a few frames
        a.x -= ux * push; a.y -= uy * push;
        b.x += ux * push; b.y += uy * push;
      }
    }
  }
  for (const e of enemies) {
    // Skip bosses + NOM entities; coins must stay free to drift off-screen
    // (their despawn depends on it), so never clamp them.
    if (e.boss || e.spawning > 0 || e.type === "coin" || e.type === "nom") continue;
    if (barriers.length) resolveBarriers(e); // obstacles are solid for the Bland too
    // Hard-clamp to the open LANE (not full width). The side margins are off-
    // limits: the separation push could otherwise shove a Bland past the wall
    // into the margin, where it wedges between the wall and the crowd.
    const m = laneMargin();
    e.x = Math.max(m + e.r, Math.min(W - m - e.r, e.x));
    e.y = Math.max(e.r, Math.min(worldH() - e.r, e.y));
  }
}

// ---------- Powers ----------
function rushReady() { return rushCharge >= CONFIG.powers.rush.eats; }
function slamReady() { return slamCharge >= CONFIG.powers.slam.kills; }
function chargeRush() {
  if (rushReady()) return; // already full, awaiting trigger (extra eats wasted)
  rushCharge++;
}
function chargeSlam() {
  if (slamReady()) return;
  slamCharge++;
}
// Auto mode: fire a ready power, but only when nothing is mid-effect — so a
// second full power WAITS and auto-casts once the first finishes (staggered).
function autoPowers() {
  if (settings.power !== "auto") return;
  if (rushActive > 0 || slowmoT > 0) return; // busy — let it wait
  if (rushReady()) triggerRush();
  else if (slamReady()) triggerSlam();
}
function triggerRush() {
  if (!rushReady() || rushActive > 0) return;
  rushCharge = 0;
  rushActive = CONFIG.powers.rush.dur;
  rings.push({ x: player.x, y: player.y, r: 20, maxR: 260, life: 0.4, color: "#ffd24a" });
  announce("MASALA RUSH!", "#ffd24a", 26);
  sfx.fusion();
  if (navigator.vibrate) navigator.vibrate(12);
}
function triggerSlam() {
  if (!slamReady()) return;
  slamCharge = 0;
  slowmoT = CONFIG.powers.slam.slowmo > 0 ? CONFIG.powers.slam.slowmoDur : 0;
  // City SIGNATURE: a strong AREA burst that THINS the wave — never a full
  // screen-clear. Both patterns leave survivors by design (the eat→attack loop
  // dies if one button erases the wave). City-skinned name/colors/pattern.
  const sk = curCity().slam;
  const cols = sk.colors;
  const dmg = CONFIG.powers.slam.dmg;
  const cfg = CONFIG.powers.slam;
  const m = laneMargin();
  if (sk.pattern === "rain") {
    // VADA PAV RAIN — a soft drizzle of actual vada pavs falling from the sky,
    // not a wall. ~12 pavs, low pierce, gentle fall: each pav takes a Bland or
    // two, scattered. Strong burst, plenty of survivors.
    const count = cfg.rainDrops; // ~12
    for (let i = 0; i < count; i++) {
      const x = m + Math.random() * (W - 2 * m);
      bullets.push({ x, y: camTop() - 14 - Math.random() * H * 1.1, // staggered → drizzles over time
        vx: (Math.random() - 0.5) * 24, vy: 300 + Math.random() * 90,
        r: 11 + Math.random() * 3, damage: dmg, color: cols[0],
        life: 5, pierce: cfg.rainPierce, rain: true, pav: true }); // pav: drawn as a bun
    }
  } else {
    // SANDSTORM — several swirling sand pits drop ON random Bland clusters and
    // GOBBLE them (+ any that wander in) for ~2.5s. Seeding on actual Blands
    // (jittered) keeps it "random spots" while guaranteeing the power lands;
    // the per-pit cap means Blands away from a pit always survive. updateStorms().
    const n = cfg.stormPits;
    const rad = Math.min(W, H) * cfg.stormRadFrac;
    const live = enemies.filter((e) => e.spawning <= 0 && !e.boss);
    for (let i = 0; i < n; i++) {
      let x, y;
      if (live.length) {
        const t = live[(Math.random() * live.length) | 0];
        x = t.x + (Math.random() - 0.5) * 70; y = t.y + (Math.random() - 0.5) * 70;
      } else { // no Blands: scatter around the player so it still reads
        const a = Math.random() * Math.PI * 2, d = Math.random() * 130;
        x = player.x + Math.cos(a) * d; y = player.y + Math.sin(a) * d;
      }
      x = Math.max(m + rad, Math.min(W - m - rad, x));
      y = Math.max(camTop() + rad, Math.min(camTop() + H - rad, y));
      storms.push({ x, y, r: rad, life: cfg.stormDur, maxLife: cfg.stormDur,
        spin: Math.random() * Math.PI * 2, colors: cols, hit: new Set(),
        kills: 0, capKills: cfg.stormCapKills });
      // a puff of sand kicking up where the pit lands
      for (let k = 0; k < 14; k++) {
        const a = Math.random() * Math.PI * 2, sp = 50 + Math.random() * 180;
        particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: 0.4 + Math.random() * 0.5, color: cols[k % cols.length], r: 2 + Math.random() * 3 });
      }
    }
  }
  rings.push({ x: player.x, y: player.y, r: 20, maxR: 320, life: 0.45, color: cols[0] });
  announce(sk.name, "#ffffff", 30);
  fusionFlash = 0.3;
  shake = 0.4;
  sfx.bossDown();
  if (navigator.vibrate) navigator.vibrate(20);
}

// SANDSTORM pits: each is a fixed-radius swirl that lingers ~2.5s and consumes
// any Bland inside (or who wanders in) up to a per-pit cap, so a wave is thinned
// in spots, never wiped. Bosses take chip damage while standing in a pit.
function updateStorms(dt) {
  if (!storms || !storms.length) return;
  for (let s = storms.length - 1; s >= 0; s--) {
    const st = storms[s];
    st.life -= dt;
    st.spin += dt * 3;
    for (let j = enemies.length - 1; j >= 0; j--) {
      const e = enemies[j];
      if (e.spawning > 0) continue;
      const d = Math.hypot(e.x - st.x, e.y - st.y);
      if (d > st.r) continue;
      if (e.boss) { e.hp -= CONFIG.powers.slam.dmg * dt; e.flash = 0.1; if (e.hp <= 0) e.hazardKilled = true; continue; } // route boss storm-death through the kill sweep
      if (st.hit.has(e) || st.kills >= st.capKills) continue; // already eaten / pit is full
      st.hit.add(e); st.kills++;
      e.hp = 0; e.hazardKilled = true; // consumed by the pit
    }
    // swirling sand inside the pit so it reads as a living vortex
    for (let k = 0; k < 4; k++) {
      const a = st.spin + Math.random() * Math.PI * 2, rr = st.r * Math.sqrt(Math.random());
      particles.push({ x: st.x + Math.cos(a) * rr, y: st.y + Math.sin(a) * rr,
        vx: Math.cos(a + 1.4) * 60, vy: Math.sin(a + 1.4) * 60, life: 0.3 + Math.random() * 0.3,
        color: st.colors[k % st.colors.length], r: 2 + Math.random() * 2.5 });
    }
    if (st.life <= 0) storms.splice(s, 1);
  }
}

// ---------- NOM MODE (temporary easter egg) ----------
// "FEED THE MACHINE": a giant always-hungry mouth that eats everything and
// makes YOU pay coins. 3 short phases, then the NOM boss. Reuses the core
// engine; kept self-contained so it never touches the main-game balance.
const NOM_HP = 50;
const NOM_BARKS = ["MORE.", "STILL HUNGRY.", "INSERT COIN.", "is that all???", "feed me.", "MINE.", "om nom nom"];

function nomReset() {
  nomPhase = 1;
  nomT = 0;
  nomSpawnT = 0;
  nomFoodT = 0;
  announce("NOM MODE", "#ffd24a", 32);
  smallText("he's hungry. always.", "#9aa0b0", W / 2, H * 0.44);
  // Seed a little food so the eat-loop starts immediately.
  for (let i = 0; i < 3; i++) {
    foods.push({ x: 80 + i * (W - 160) / 2, y: H * 0.55, r: 11, type: FOOD_TYPES[i % FOOD_TYPES.length], life: CONFIG.foodLife });
  }
}

function nomFood() {
  const t = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
  foods.push({ x: 50 + Math.random() * (W - 100), y: H * 0.25 + Math.random() * H * 0.5, r: 11, type: t, life: CONFIG.foodLife });
}

function spawnNibblers(n) {
  const p = spawnPoint(12);
  for (let i = 0; i < n; i++) {
    enemies.push({
      type: "nibbler",
      x: Math.max(12, Math.min(W - 12, p.x + (Math.random() - 0.5) * 50)),
      y: Math.max(12, Math.min(H - 12, p.y + (Math.random() - 0.5) * 50)),
      r: 10, hp: 1, maxHp: 1, speed: 150 + Math.random() * 40,
      wobble: Math.random() * 7, spawning: 0.5, spawnDur: 0.5,
    });
  }
}

function spawnCoin() {
  const fromLeft = Math.random() < 0.5;
  enemies.push({
    type: "coin", harmless: true,
    x: fromLeft ? -34 : W + 34, y: H * 0.22 + Math.random() * H * 0.55,
    r: 22, hp: 2, maxHp: 2, vx: (fromLeft ? 1 : -1) * (58 + Math.random() * 34),
    wobble: Math.random() * 7, spawning: 0, spawnDur: 0,
  });
}

function spawnNom() {
  enemies.push({
    type: "nom", x: W / 2, y: 76, r: 40, hp: NOM_HP, maxHp: NOM_HP,
    speed: 64, wobble: 0, spawning: 0.8, spawnDur: 0.8,
    lungeT: 3, barkT: 1.5,
  });
  shake = 0.3;
  sfx.fusion();
}

// NOM brain: lumber toward the player, eat any food it touches (bloats +
// slows — the gag), with a brief lunge every few seconds. No healing, so the
// fight can't stalemate — chilli (2× dmg) is the natural "overfeed" answer.
function updateNomBoss(e, dt) {
  e.wobble += dt * 4;
  const a = Math.atan2(player.y - e.y, player.x - e.x);
  e.lungeT -= dt;
  let sp = e.speed;
  if (e.lungeT <= 0.6 && e.lungeT > 0) sp = e.speed * 3.4; // brief lunge
  if (e.lungeT <= 0) e.lungeT = 3 + Math.random() * 1.5;
  e.x += Math.cos(a) * sp * dt;
  e.y += Math.sin(a) * sp * dt;
  e.x = Math.max(e.r, Math.min(W - e.r, e.x));
  e.y = Math.max(e.r, Math.min(H - e.r, e.y));
  for (let i = foods.length - 1; i >= 0; i--) {
    const fd = foods[i];
    const rr = e.r + fd.r;
    if (dist2(e, fd) < rr * rr) {
      foods.splice(i, 1);
      e.r = Math.min(58, e.r + 1.5);
      e.speed = Math.max(26, e.speed - 4); // too full to move
      smallText("nom!", "#ffd24a", e.x, e.y - e.r - 6);
    }
  }
}

function updateNom(dt) {
  nomT += dt;
  // Keep food flowing the whole mode — the eat-loop must never starve.
  nomFoodT -= dt;
  if (nomFoodT <= 0) { nomFoodT = 1.5; nomFood(); }
  // Despawn coins that have drifted clean off the arena.
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (e.type === "coin" && (e.x < -70 || e.x > W + 70)) enemies.splice(i, 1);
  }
  nomSpawnT -= dt;

  if (nomPhase === 1) {
    // Phase 1 — Snack time: little hungry mouths race you to the food.
    if (nomSpawnT <= 0 && nomT < 13) {
      nomSpawnT = 1.8;
      spawnNibblers(2 + Math.floor(Math.random() * 2));
    }
    if (nomT >= 13 && !enemies.some((e) => e.type === "nibbler")) {
      nomPhase = 2; nomT = 0; nomSpawnT = 0;
      announce("INSERT COIN", "#ffd24a", 28);
    }
  } else if (nomPhase === 2) {
    // Phase 2 — The coin toll: signs block your view, shoot to clear.
    if (nomSpawnT <= 0 && nomT < 14) {
      nomSpawnT = 1.4;
      spawnCoin();
      if (Math.random() < 0.4) spawnNibblers(2);
    }
    if (nomT >= 14) {
      nomPhase = 3; nomT = 0; nomSpawnT = 0;
      announce("HERE COMES NOM", "#ff5a3c", 30);
      spawnNom();
    }
  } else if (nomPhase === 3) {
    // Phase 3 — NOM himself. Barks on a timer; win when he's gone (killEnemy).
    const nom = enemies.find((e) => e.type === "nom");
    if (nom && nom.spawning <= 0) {
      nom.barkT -= dt;
      if (nom.barkT <= 0) {
        nom.barkT = 2.2 + Math.random() * 1.5;
        smallText(NOM_BARKS[Math.floor(Math.random() * NOM_BARKS.length)], "#ffd24a", nom.x, nom.y - nom.r - 10);
      }
    }
  }
}

// ---------- Update ----------
function update(dt) {
  if (settingsOpen) return; // settings panel pauses the game
  if (!boonChoices) tryOpenPick(); // queued level-up → open the upgrade pick
  if (boonChoices) return;  // boon/upgrade pick screen pauses the game
  if (resumeT > 0) {
    // Post-pause countdown: world frozen, leftover effects still settle.
    resumeT -= dt;
    if (shake > 0) shake -= dt;
    if (hitFlash > 0) hitFlash -= dt;
    if (resumeT <= 0) { announce("go!", "#7ddf8a", 26); sfx.go(); }
    return;
  }
  // Hit-stop: a few frozen frames on big moments.
  if (hitStop > 0) { hitStop -= dt; return; }
  // Thali Slam slow-mo: scale the whole sim, decay on real time.
  if (slowmoT > 0) { slowmoT -= dt; dt *= CONFIG.powers.slam.slowmo; }
  if (rushActive > 0) rushActive -= dt;
  autoPowers();
  elapsed += dt;
  if (pickGap > 0) pickGap -= dt; // tick the anti-spam floor only during live play

  if (nomMode) {
    updateNom(dt);
  } else {
  if (corridorOn()) {
    // Corridor: the PLAYER paces the waves — crossing a distance gate advances
    // the wave (mini-boss at gate 5, main boss guarding the delivery gate).
    // gapT only delays spawns here (post-pick lull); it never advances waves.
    if (gapT > 0) gapT -= dt;
    if (!bossFight && !endingLevel && wave < CONFIG.boss.mainWave && player.y <= waveGates[wave + 1]) {
      wave++;
      waveTimer = 0;
      if (wave === CONFIG.boss.wave) startBossFight(false);
      else if (wave === CONFIG.boss.mainWave) startBossFight(true);
      else { announce("WAVE " + wave, "#ffffff"); sfx.wave(); }
    }
  // Arena: waves on a timer, with a breather between them.
  } else if (gapT > 0) {
    gapT -= dt;
    if (gapT <= 0) {
      wave++;
      waveTimer = 0;
      if (wave === CONFIG.boss.wave) startBossFight(false);
      else if (wave === CONFIG.boss.mainWave) startBossFight(true);
      else { announce("WAVE " + wave, "#ffffff"); sfx.wave(); }
    }
  } else if (!bossFight) {
    waveTimer += dt;
    if (waveTimer > CONFIG.waveLength) {
      gapT = CONFIG.breather;
      announce("wave cleared!", "#9aa0b0", 22);
    }
  }

  // Spawning accelerates with waves until the cap.
  // Paused during the breather AND the boss fight (the boss comes alone).
  if (gapT <= 0 && !bossFight && !endingLevel) {
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      // Ease the first wave(s) after a boss: slower spawns than the cap. On the
      // early levels, ease it MORE — extra spacing (fewer Blands) + a small
      // speed cut — so the post-mini-boss spike doesn't wall new players.
      const inEase = lastBossWave > 0 && wave > lastBossWave && wave <= lastBossWave + CONFIG.postBoss.easeWaves;
      const early = inEase && level <= CONFIG.postBoss.easeLevels;
      const postEase = inEase ? CONFIG.postBoss.spawnMul * (early ? CONFIG.postBoss.earlySpawnMul : 1) : 1;
      spawnTimer = Math.max(CONFIG.spawnFloor, CONFIG.spawnBase - effWave() * CONFIG.spawnPerWave) * diff().spawn * postEase * lvl().spawnMul;
      spawnEnemy(early ? CONFIG.postBoss.earlySpdMul : 1);
    }
  }

  // Boss fight: guaranteed food cadence — the eat-loop must never starve.
  if (bossFight) {
    bossFoodT -= dt;
    if (bossFoodT <= 0) {
      bossFoodT = bossFoodEvery;
      const t = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
      const fm = laneMargin();
      const fx0 = Math.max(60, fm + 20), fx1 = Math.min(W - 60, W - fm - 20);
      foods.push({
        x: fx0 + Math.random() * (fx1 - fx0),
        y: camTop() + H * 0.3 + Math.random() * H * 0.4,
        r: 11, type: t, life: CONFIG.foodLife,
      });
    }
  }
  } // end main-mode wave/spawn (NOM mode runs its own script above)

  // Flavor decay (chaat-timing boon slows it; Masala Rush freezes it).
  if (flavor !== "none" && rushActive <= 0) {
    flavorTimer -= dt * mods.drain;
    if (flavorTimer <= 0) {
      flavor = "none";
      flavorTimer = 0;
      smallText("flavor faded…", "#9aa0b0", player.x, player.y - 26);
    }
  }

  // Player movement: keyboard…
  let mx = 0, my = 0;
  if (keys["arrowleft"] || keys["a"]) mx -= 1;
  if (keys["arrowright"] || keys["d"]) mx += 1;
  if (keys["arrowup"] || keys["w"]) my -= 1;
  if (keys["arrowdown"] || keys["s"]) my += 1;
  // …or joystick.
  if (joy) {
    const dead = CONFIG.stickDeadzone * DPR();
    const max = throwPx();
    const len = Math.hypot(joy.dx, joy.dy);
    if (len > dead) {
      // Remap past the deadzone so movement ramps from zero at the edge of the
      // deadzone (not a jump), then a response curve so the low end is gentle
      // and speed ramps to full near the throw edge — analog "connected" feel.
      const mag = Math.min(1, (len - dead) / (max - dead));
      const c = Math.pow(mag, CONFIG.stickCurve);
      mx = (joy.dx / len) * c;
      my = (joy.dy / len) * c;
    }
  }
  const ml = Math.hypot(mx, my);
  if (ml > 1) { mx /= ml; my /= ml; }
  player.moving = ml > 0.01;
  if (mx > 0.1) player.face = 1;
  else if (mx < -0.1) player.face = -1;
  const spd = player.speed * FLAVORS[flavor].speedMult * (rushActive > 0 ? CONFIG.powers.rush.speedMul : 1) * (hazards.length ? playerHazardSlow() : 1);
  // Smooth the INPUT direction (0..1 vector), not the velocity. Filtering
  // the small normalized stick vector kills touch jitter with far less
  // perceived lag than ramping the full velocity each flick. "off" = raw.
  const k = settings.smooth === "off" ? 1 : 1 - Math.exp(-dt * SMOOTH_K[settings.smooth]);
  player.imx += (mx - player.imx) * k;
  player.imy += (my - player.imy) * k;
  player.vx = player.imx * spd;
  player.vy = player.imy * spd;
  const pm = laneMargin();
  player.x = Math.max(pm + player.r, Math.min(W - pm - player.r, player.x + player.vx * dt));
  player.y = Math.max(player.r, Math.min(worldH() - player.r, player.y + player.vy * dt));
  if (barriers.length) resolveBarriers(player);
  if (player.iframes > 0) player.iframes -= dt;

  // Corridor camera: follow the courier (they sit camFrac down the screen so
  // most of the view is AHEAD); during a boss duel the window is pinned and
  // the courier is kept inside it — the duel is a one-screen arena.
  if (corridorOn()) {
    if (cam.lock >= 0) {
      player.y = Math.max(cam.lock + player.r, Math.min(cam.lock + H - player.r, player.y));
      cam.y += (cam.lock - cam.y) * Math.min(1, dt * CONFIG.corridor.camLerp);
    } else {
      const target = Math.max(0, Math.min(routeLen - H, player.y - H * CONFIG.corridor.camFrac));
      cam.y += (target - cam.y) * Math.min(1, dt * CONFIG.corridor.camLerp);
    }
  }

  // Hazard FRICTION cue: wading through a puddle/quicksand already slows you
  // (playerHazardSlow), but make it FELT — kick up splashes/sand opposite your
  // motion and pulse a ripple at your feet, so the drag reads, not just registers.
  if (heroHazard) {
    player.hazFx = (player.hazFx || 0) - dt;
    if (player.hazFx <= 0) {
      player.hazFx = 0.06;
      const edge = heroHazard.type === "quicksand" ? "rgba(120,86,40,0.9)" : "rgba(150,170,190,0.85)";
      const sp = 30 + Math.random() * 50;
      const aw = Math.atan2(-player.vy, -player.vx) + (Math.random() - 0.5) * 1.2;
      particles.push({ x: player.x + (Math.random() - 0.5) * player.r, y: player.y + player.r * 0.6,
        vx: Math.cos(aw) * sp, vy: Math.sin(aw) * sp - 20, life: 0.3 + Math.random() * 0.25,
        color: edge, r: 1.6 + Math.random() * 2 });
      if (player.moving && Math.random() < 0.4)
        rings.push({ x: player.x, y: player.y + player.r * 0.5, r: player.r * 0.5, maxR: player.r * 1.4, life: 0.35, color: edge });
    }
  }

  // Motion trail: small flavor-tinted dust puffs lag behind while moving, so
  // movement reads as kinetic instead of a sprite sliding on glass.
  if (player.moving) {
    player.trailT = (player.trailT || 0) - dt;
    if (player.trailT <= 0) {
      player.trailT = 0.03;
      particles.push({
        x: player.x, y: player.y + player.r * 0.5,
        vx: -player.vx * 0.05, vy: -player.vy * 0.05,
        life: 0.32, color: FLAVORS[flavor].color, r: 2 + Math.random() * 1.8,
      });
    }
  }

  shoot(dt);

  // Savory aura: periodic knockback pulse around the player.
  if (flavor === "savory") {
    savoryPulse -= dt;
    if (savoryPulse <= 0) {
      savoryPulse = SAVORY_PULSE_INTERVAL;
      rings.push({ x: player.x, y: player.y, r: 20, maxR: SAVORY_PULSE_RADIUS, life: 0.35, color: FLAVORS.savory.color });
      for (let j = enemies.length - 1; j >= 0; j--) {
        const e = enemies[j];
        if (e.spawning > 0) continue;
        const dx = e.x - player.x, dy = e.y - player.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < SAVORY_PULSE_RADIUS) {
          if (!e.boss) {
            e.x = Math.max(e.r, Math.min(W - e.r, e.x + (dx / d) * 80));
            e.y = Math.max(e.r, Math.min(worldH() - e.r, e.y + (dy / d) * 80));
          }
          e.hp -= 1;
          e.flash = 0.08;
          if (e.hp <= 0) killEnemy(j);
        }
      }
    }
  }

  // Bullets.
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.life -= dt;
    const cy0 = camTop(); // cull against the view band, not the screen origin
    if (b.life <= 0 || b.x < -20 || b.x > W + 20 || (b.y < cy0 - 20 && !b.rain) || b.y > cy0 + H + 20) {
      bullets.splice(i, 1);
      continue;
    }
    if (barriers.length && bulletHitsBarrier(b.x, b.y)) { bullets.splice(i, 1); continue; }
    for (let j = enemies.length - 1; j >= 0; j--) {
      const e = enemies[j];
      if (e.spawning > 0 || e.defeated) continue;
      const rr = b.r + e.r;
      if (dist2(b, e) < rr * rr) {
        if (b.hit && b.hit.has(e)) continue; // pierced this one already
        e.hp -= b.damage;
        e.flash = 0.08;
        if (e.hp <= 0) killEnemy(j);
        if (b.pierce > 0) {
          b.pierce--;
          (b.hit || (b.hit = new Set())).add(e); // don't re-hit it as it passes
        } else {
          bullets.splice(i, 1);
        }
        break; // one hit per bullet per frame (killEnemy may have spliced enemies)
      }
    }
  }

  // Enemies chase player (once fully emerged).
  let levelDone = false;
  for (const e of enemies) {
    if (e.spawning > 0) { e.spawning -= dt; continue; }
    // Corridor: an enemy left far behind (or far ahead) is dead weight — re-field
    // it at a fresh off-screen spawn point so the pressure stays near the courier.
    if (corridorOn() && !e.boss && !e.defeated && Math.abs(e.y - player.y) > H * CONFIG.corridor.cullDist) {
      const p = spawnPoint(e.r);
      e.x = p.x; e.y = p.y;
    }
    if (e.defeated) {
      // Defeated main boss: slump + smoke, harmless, until the beat runs out.
      e.defeatT -= dt;
      e.wobble += dt * 2;
      e.r = Math.max(e.r * 0.6, e.r - dt * 10);
      if (Math.random() < 0.45) burst(e.x + (Math.random() - 0.5) * e.r * 1.6, e.y + (Math.random() - 0.5) * e.r * 1.6, "#8d93a5", 1, 80);
      if (e.defeatT <= 0) levelDone = true;
      continue;
    }
    e.wobble += dt * 6;
    if (e.flash > 0) e.flash -= dt;
    // MASALA RUSH freezes regular Bland in place (they still take damage).
    // Bosses resist crowd-control: they're SLOWED, not frozen.
    if (rushActive > 0) {
      if (e.boss) updateBoss(e, dt * 0.4); // slowed, keeps fighting
      // regular enemies: stuck, jitter only
    } else if (e.boss) {
      updateBoss(e, dt);
    } else if (e.type === "nom") {
      updateNomBoss(e, dt);
    } else if (e.type === "coin") {
      // Coin sign: drifts straight across the screen, bobbing. Pure obstacle.
      e.x += e.vx * dt;
      e.y += Math.sin(e.wobble * 2) * 0.5;
    } else if (e.type === "nibbler") {
      // Little hungry mouth: races to the nearest food, else chases the player.
      let tx = player.x, ty = player.y, target = null, best = Infinity;
      for (const fd of foods) { const d = dist2(e, fd); if (d < best) { best = d; target = fd; } }
      if (target) { tx = target.x; ty = target.y; }
      const a = Math.atan2(ty - e.y, tx - e.x) + Math.sin(e.wobble * 2) * 0.4;
      e.x += Math.cos(a) * e.speed * dt;
      e.y += Math.sin(a) * e.speed * dt;
      if (target) {
        const rr = e.r + target.r;
        if (best < rr * rr) { // beat you to the snack
          foods.splice(foods.indexOf(target), 1);
          smallText("MINE", "#9aa0b0", e.x, e.y - 12);
          e.r = Math.min(15, e.r + 1.2);
        }
      }
    } else {
      let a = Math.atan2(player.y - e.y, player.x - e.x);
      // Swarmers dart in a zig-zag instead of beelining.
      if (e.type === "swarmer") a += Math.sin(e.wobble * 2.2) * CONFIG.enemies.swarmer.weave;
      // City hazard: slows the Bland (and quicksand drains it).
      const hz = hazards.length ? applyHazards(e, dt) : 1;
      e.x += Math.cos(a) * e.speed * hz * dt;
      e.y += Math.sin(a) * e.speed * hz * dt;
    }

    // They drain the street's color where they walk (coins don't — they float).
    if (!e.harmless) {
      e.drainT = (e.drainT || 0) - dt;
      if (e.drainT <= 0) {
        e.drainT = 0.5 + Math.random() * 0.4;
        drains.push({ x: e.x, y: e.y, r: e.r * 1.7, life: 3 });
        if (drains.length > 90) drains.shift();
      }
    }

    const rr = e.r + player.r;
    if (!e.harmless && !endingLevel && player.iframes <= 0 && dist2(e, player) < rr * rr) {
      if (player.shield > 0) {
        // Savory shield absorbs the hit.
        player.shield = 0;
        player.iframes = 1.2;
        rings.push({ x: player.x, y: player.y, r: 18, maxR: 60, life: 0.3, color: FLAVORS.savory.color });
        burst(player.x, player.y, FLAVORS.savory.color, 10, 120);
        smallText("shield!", FLAVORS.savory.color, player.x, player.y - 26);
        sfx.shield();
      } else {
        player.hp--;
        player.iframes = 1.2;
        hitFlash = 0.35;
        shake = 0.4;
        hitStop = 0.06;
        burst(player.x, player.y, "#ff5a3c", 14, 150);
        // Recoil: shove the player away from the Bland so the hit reads as impact.
        const ka = Math.atan2(player.y - e.y, player.x - e.x);
        player.x = Math.max(player.r, Math.min(W - player.r, player.x + Math.cos(ka) * 20));
        player.y = Math.max(player.r, Math.min(worldH() - player.r, player.y + Math.sin(ka) * 20));
        rings.push({ x: player.x, y: player.y, r: 10, maxR: 54, life: 0.3, color: "#ff5a3c" });
        smallText("-1 ♥", "#ff5a6e", player.x, player.y - 26);
        if (player.hp <= 0) {
          state = "gameover";
          bestTime = Math.max(bestTime, elapsed);
          sfx.death();
          if (navigator.vibrate) navigator.vibrate([30, 40, 60]);
        } else {
          sfx.hit();
          if (navigator.vibrate) navigator.vibrate(35); // haptic on every Bland touch
        }
      }
    }
  }
  updateStorms(dt); // SANDSTORM sweep — marks consumed Blands hazardKilled
  // Quicksand/sandstorm consumption: enemies drained to 0 hp by a hazard die now
  // (reverse sweep so killEnemy's splice stays index-safe; awards drops/XP).
  for (let j = enemies.length - 1; j >= 0; j--) {
    if (enemies[j].hazardKilled) killEnemy(j);
  }
  separateEnemies(); // spread the flock so kills don't reveal a stacked Bland
  if (levelDone) { enemies.length = 0; clearLevel(); } // boss defeat beat over

  // Foods: despawn timer + pickup.
  for (let i = foods.length - 1; i >= 0; i--) {
    const fd = foods[i];
    fd.life -= dt;
    if (fd.life <= 0) { foods.splice(i, 1); continue; }
    const rr = fd.r + player.r;
    if (dist2(fd, player) < rr * rr) {
      eat(fd);
      foods.splice(i, 1);
    }
  }

  // Particles & floaters.
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.92;
    p.vy *= 0.92;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i];
    f.y += f.vy * dt;
    f.life -= dt;
    if (f.life <= 0) floaters.splice(i, 1);
  }
  for (let i = rings.length - 1; i >= 0; i--) {
    const rg = rings[i];
    rg.life -= dt;
    rg.r += (rg.maxR - 20) * (dt / 0.35);
    if (rg.life <= 0) rings.splice(i, 1);
  }
  for (let i = drains.length - 1; i >= 0; i--) {
    drains[i].life -= dt;
    if (drains[i].life <= 0) drains.splice(i, 1);
  }
  for (let i = dying.length - 1; i >= 0; i--) {
    dying[i].life -= dt;
    if (dying[i].life <= 0) dying.splice(i, 1);
  }

  if (hitFlash > 0) hitFlash -= dt;
  if (fusionFlash > 0) fusionFlash -= dt;
  if (shake > 0) shake -= dt;
}

// ---------- Draw ----------
function draw() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "#14141c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let sx = 0, sy = 0;
  if (shake > 0) {
    sx = (Math.random() - 0.5) * 10 * scale * shake * 4;
    sy = (Math.random() - 0.5) * 10 * scale * shake * 4;
  }
  ctx.setTransform(scale, 0, 0, scale, offX + sx, offY + sy);

  // Corridor draws a camera-scrolled tiled world inside the clip below; the
  // arena (and the menu screens) draw the pre-rendered full-screen backdrop.
  const worldMode = corridorOn() && state !== "menu" && state !== "levels" && level >= 1 && player;
  if (!worldMode) ctx.drawImage(bgCanvas, 0, 0);

  if (state === "menu") {
    drawMenu();
    if (settingsOpen) drawSettings();
    return;
  }
  if (state === "levels") {
    drawLevels();
    if (settingsOpen) drawSettings();
    return;
  }

  // Everything in the arena clips to it — nothing renders in the letterbox.
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, W, H);
  ctx.clip();
  if (worldMode) {
    // World transform: everything from here to restore() draws in world
    // coordinates; the camera scroll is this single translate. Rounded so
    // segment-tile joints land on whole pixels (fractional joints let the
    // dark page background bleed through as a seam line).
    ctx.translate(0, -Math.round(cam.y));
    drawCorridorWorld();
  }

  const now = performance.now() / 1000;

  // Drained patches where the Bland have walked.
  for (const d of drains) {
    ctx.globalAlpha = Math.min(1, d.life / 3) * 0.14;
    ctx.drawImage(drainSprite, d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
  }
  ctx.globalAlpha = 1;

  // Barriers: solid crates the player & bullets can't pass (later levels).
  // Barriers are invisible in play — the painted BG item IS the obstacle.
  // __mr.showBarriers = true overlays the collision rects for authoring them
  // against each background's art.
  if (showBarriers) {
    for (const b of barriers) {
      ctx.fillStyle = "rgba(255,80,80,0.22)";
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeStyle = "rgba(255,80,80,0.9)";
      ctx.lineWidth = 2;
      ctx.strokeRect(b.x + 1, b.y + 1, b.w - 2, b.h - 2);
    }
  }

  // Foods: bobbing emoji on a pulsing glow.
  for (const fd of foods) {
    const blink = fd.life < 2 && Math.floor(fd.life * 6) % 2 === 0;
    if (blink) continue;
    const bob = Math.sin(now * 4 + fd.x) * 3;
    ctx.globalAlpha = 0.8 + Math.sin(now * 6 + fd.y) * 0.2;
    ctx.drawImage(glowSprite(fd.type.color), fd.x - 24, fd.y + bob - 24, 48, 48);
    ctx.globalAlpha = 1;
    ctx.drawImage(foodSpriteFor(fd.type.flavor), fd.x - 20, fd.y + bob - 20);
  }

  // Bullets: glow sprites — except VADA PAV rain, drawn as little buns.
  for (const b of bullets) {
    if (b.pav) { drawPav(b.x, b.y, b.r); continue; }
    ctx.drawImage(glowSprite(b.color), b.x - b.r * 2.5, b.y - b.r * 2.5, b.r * 5, b.r * 5);
  }

  // Dissolving corpses: flatten and fade.
  for (const d of dying) {
    const p2 = Math.max(0, d.life / 0.22);
    ctx.globalAlpha = p2 * 0.8;
    ctx.fillStyle = "#6e7280";
    ctx.beginPath();
    ctx.ellipse(d.x, d.y + (1 - p2) * 4, d.r * (1 + (1 - p2) * 0.7), Math.max(0.5, d.r * p2), 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Enemies — the Bland: grey, desaturated blobs.
  for (const e of enemies) {
    if (e.spawning > 0) {
      // Emerging telegraph: a closing ring + materializing blob. Kept clearly
      // visible (even on dark backdrops) so a spawn never reads as a flicker.
      const p = 1 - e.spawning / e.spawnDur;
      ctx.strokeStyle = "rgba(150, 156, 175, " + (0.5 + p * 0.45) + ")";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r + 5, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
      ctx.stroke();
      ctx.globalAlpha = 0.45 + 0.45 * p; // 0.45 → 0.9, always legible
      ctx.fillStyle = "#6e7280";
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r * (0.55 + 0.45 * p), 0, Math.PI * 2); // starts half-size
      ctx.fill();
      ctx.globalAlpha = 1;
      continue;
    }
    ctx.drawImage(auraSprite, e.x - e.r * 3, e.y - e.r * 3, e.r * 6, e.r * 6);
    if (e.boss) {
      drawBoss(e);
      continue;
    }
    if (e.type === "nom") { drawNom(e); continue; }
    if (e.type === "coin") { drawCoin(e); continue; }
    if (e.type === "swarmer" || e.type === "nibbler") {
      const ss = SPRITES.swarmer;
      if (ss) {
        const sp = CONFIG.sprites.swarmer;
        drawSprite(ss, e.x, e.y, e.r * 2 * sp.scale, 1, e.flash > 0, sp.yOff);
        continue; // 1 hp — no health bar
      }
      // Swarmer / nibbler: small spiky wisp — angular 7-point shape, beady eyes.
      ctx.fillStyle = e.flash > 0 ? "#ffffff" : "#7e8294";
      ctx.beginPath();
      for (let i = 0; i < 7; i++) {
        const ang = (i / 7) * Math.PI * 2 + e.wobble * 0.5;
        const spike = 1 + Math.sin(e.wobble * 3 + i * 2.7) * 0.28;
        const px = e.x + Math.cos(ang) * e.r * spike;
        const py = e.y + Math.sin(ang) * e.r * spike;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "rgba(20, 20, 28, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#14141c";
      ctx.beginPath();
      ctx.arc(e.x - 2.5, e.y - 1, 1.4, 0, Math.PI * 2);
      ctx.arc(e.x + 2.5, e.y - 1, 1.4, 0, Math.PI * 2);
      ctx.fill();
      continue; // 1 hp — no health bar
    }
    // The Bland — authored sprite if loaded, else the procedural wobble blob.
    const bs = SPRITES.bland;
    if (bs) {
      const sp = CONFIG.sprites.bland;
      drawSprite(bs, e.x, e.y, e.r * 2 * sp.scale, 1, e.flash > 0, sp.yOff);
    } else {
    // Organic blob: 12-point outline with 3 travelling wobble lobes.
    ctx.fillStyle = e.flash > 0 ? "#ffffff" : "#6e7280";
    ctx.beginPath();
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2;
      const wob = 1 + Math.sin(e.wobble * 1.6 + i * (Math.PI / 2)) * 0.1;
      const px = e.x + Math.cos(ang) * e.r * wob;
      const py = e.y + Math.sin(ang) * e.r * wob * 0.94;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(20, 20, 28, 0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();
    // Eyes + frown.
    ctx.fillStyle = "#14141c";
    ctx.beginPath();
    ctx.arc(e.x - 4, e.y - 2, 2, 0, Math.PI * 2);
    ctx.arc(e.x + 4, e.y - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#14141c";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(e.x, e.y + 7, 3.5, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
    }
    if (e.hp < e.maxHp) {
      ctx.fillStyle = "#3a3a48";
      ctx.fillRect(e.x - 12, e.y - e.r - 8, 24, 3);
      ctx.fillStyle = "#d65a4a";
      ctx.fillRect(e.x - 12, e.y - e.r - 8, 24 * (e.hp / e.maxHp), 3);
    }
  }

  // Player — colored by current flavor.
  const f = FLAVORS[flavor];
  // During i-frames the hero SHIMMERS (smooth alpha pulse, never fully hidden)
  // instead of the old hard on/off blink, which read as flicker — worst with the
  // shield up and moving. The shield bubble itself always stays at full alpha.
  const ifa = player.iframes > 0 ? 0.5 + 0.45 * Math.abs(Math.sin(now * 18)) : 1;
  {
    const bob = player.moving ? Math.sin(now * 14) * 2 : Math.sin(now * 3) * 1;
    const py = player.y + bob;
    // The Tiffin Runner — authored sprite if loaded, else the procedural blob.
    const cs = SPRITES.courier;
    if (cs) {
      const sp = CONFIG.sprites.player;
      const h = player.r * 2 * sp.scale, w = h * (cs.w / cs.h);
      const dy = py + (sp.yOff || 0);
      ctx.save();
      ctx.translate(player.x, dy);
      if (player.face < 0) ctx.scale(-1, 1);
      ctx.globalAlpha = ifa;
      ctx.drawImage(cs.base, -w / 2, -h / 2, w, h);
      // Flavor cue: tint the CHARACTER itself (no ground glow), only while a
      // flavor is active, fading with the meter. Reads alongside the HUD + eat
      // pulse without a disc on the floor.
      if (flavor !== "none") {
        const fr = Math.max(0, Math.min(1, flavorTimer / FLAVOR_DURATION));
        ctx.globalAlpha = ifa * (0.18 + 0.16 * fr);
        ctx.drawImage(spriteTint(cs, f.color), -w / 2, -h / 2, w, h);
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    } else {
    ctx.save();
    ctx.globalAlpha = ifa;
    // Body.
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.arc(player.x, py, player.r, 0, Math.PI * 2);
    ctx.fill();
    // Lighter belly.
    ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
    ctx.beginPath();
    ctx.arc(player.x, py + 5, player.r * 0.6, 0, Math.PI * 2);
    ctx.fill();
    // Courier cap.
    ctx.fillStyle = "rgba(20, 20, 28, 0.55)";
    ctx.beginPath();
    ctx.arc(player.x, py - 2, player.r, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(player.x - player.r, py - 4, player.r * 2, 3);
    // Eyes lean into the movement direction.
    const fx = player.face * 1.6;
    ctx.fillStyle = "#14141c";
    ctx.beginPath();
    ctx.arc(player.x - 4 + fx, py + 3, 2.4, 0, Math.PI * 2);
    ctx.arc(player.x + 4 + fx, py + 3, 2.4, 0, Math.PI * 2);
    ctx.fill();
    // Outline.
    ctx.strokeStyle = "rgba(20, 20, 28, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x, py, player.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    }
    if (player.shield > 0) {
      // Shield bubble — sized to the SPRITE (not the small collision radius), so
      // it encloses the courier instead of slicing through the body. Soft fill +
      // ring reads as "protected," not a stray circle.
      const sh = SPRITES.courier ? player.r * 2 * CONFIG.sprites.player.scale : player.r * 2;
      const sr = sh * 0.5 + 4;
      const pulse = 0.6 + 0.2 * Math.sin(now * 6);
      ctx.globalAlpha = 0.10;
      ctx.fillStyle = FLAVORS.savory.color;
      ctx.beginPath();
      ctx.arc(player.x, py, sr, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = pulse;
      ctx.strokeStyle = FLAVORS.savory.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(player.x, py, sr, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  // Pulse / shield rings.
  for (const rg of rings) {
    ctx.globalAlpha = Math.max(0, rg.life / 0.35);
    ctx.strokeStyle = rg.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // SANDSTORM pits — swirling translucent sand discs, denser at the rim, that
  // fade out over their short life.
  if (storms && storms.length) {
    for (const st of storms) {
      const fade = Math.max(0, Math.min(1, st.life / st.maxLife));
      const grad = ctx.createRadialGradient(st.x, st.y, st.r * 0.15, st.x, st.y, st.r);
      grad.addColorStop(0, st.colors[1] + "");
      grad.addColorStop(0.65, st.colors[0] + "");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = (0.35 + 0.3 * Math.sin(st.spin * 2)) * (0.4 + 0.6 * fade);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Particles.
  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, p.life * 2);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Floating text: comic font with a dark outline for readability.
  for (const fl of floaters) {
    ctx.globalAlpha = Math.min(1, fl.life * 2);
    ctx.font = fl.size + "px " + COMIC_FONT;
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(16, 16, 24, 0.85)";
    ctx.lineWidth = Math.max(3, fl.size * 0.16);
    ctx.strokeText(fl.text, fl.x, fl.y);
    ctx.fillStyle = fl.color;
    ctx.fillText(fl.text, fl.x, fl.y);
  }
  ctx.globalAlpha = 1;
  ctx.drawImage(vignette, 0, worldMode ? Math.round(cam.y) : 0); // vignette is camera-fixed
  ctx.restore(); // end arena clip

  drawHUD();

  // Hit / fusion overlays.
  if (hitFlash > 0) {
    ctx.fillStyle = "rgba(255, 60, 40, " + hitFlash * 0.8 + ")";
    ctx.fillRect(0, 0, W, H);
  }
  if (fusionFlash > 0) {
    ctx.fillStyle = "rgba(255, 255, 255, " + fusionFlash * 1.6 + ")";
    ctx.fillRect(0, 0, W, H);
  }

  if (state === "gameover") drawGameOver();
  if (state === "levelclear") drawLevelClear();

  // Joystick.
  if (state === "playing" && !settingsOpen) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const flavorColor = FLAVORS[flavor].color;
    if (settings.stick === "fixed") {
      const an = stickAnchor();
      const base = joyBaseSprite(an.r);
      const knob = joyKnobSprite(an.r * 0.42);
      if (joy) {
        // Held: the stick floats to where the thumb landed (origin), so the
        // visible knob deflection matches the input the player is feeling.
        const max = throwPx();
        const len = Math.hypot(joy.dx, joy.dy) || 1;
        const cap = Math.min(len, max);
        const kx = joy.ox + (joy.dx / len) * (cap / max) * an.r * 0.55;
        const ky = joy.oy + (joy.dy / len) * (cap / max) * an.r * 0.55;
        ctx.globalAlpha = 0.55;
        ctx.drawImage(base, joy.ox - base.width / 2, joy.oy - base.height / 2);
        ctx.drawImage(knob, kx - knob.width / 2, ky - knob.height / 2);
        // Flavor-colored ring while steering.
        ctx.strokeStyle = flavorColor;
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(kx, ky, an.r * 0.42 + 2, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Idle: a faint home indicator parked in the corner zone so the player
        // knows where to rest the thumb.
        ctx.globalAlpha = 0.32;
        ctx.drawImage(base, an.x - base.width / 2, an.y - base.height / 2);
        ctx.drawImage(knob, an.x - knob.width / 2, an.y - knob.height / 2);
      }
      ctx.globalAlpha = 1;
    } else if (joy) {
      // Touch-anywhere indicator, same art family. Floating + transparent:
      // appears under the thumb, kept faint so it doesn't block the view.
      const vr = Math.max(throwPx(), 40 * DPR());
      const base = joyBaseSprite(vr);
      ctx.globalAlpha = 0.5;
      ctx.drawImage(base, joy.ox - base.width / 2, joy.oy - base.height / 2);
      const len = Math.hypot(joy.dx, joy.dy) || 1;
      const cap = Math.min(len, throwPx());
      const kx = joy.ox + (joy.dx / len) * (cap / throwPx()) * vr * 0.55;
      const ky = joy.oy + (joy.dy / len) * (cap / throwPx()) * vr * 0.55;
      const knob = joyKnobSprite(vr * 0.4);
      ctx.drawImage(knob, kx - knob.width / 2, ky - knob.height / 2);
      ctx.strokeStyle = flavorColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(kx, ky, vr * 0.4 + 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    drawPowerButtons();
  }

  // Resume countdown: 3-2-1 pop, then "go!".
  if (state === "playing" && !settingsOpen && resumeT > 0) {
    ctx.setTransform(scale, 0, 0, scale, offX, offY);
    ctx.fillStyle = "rgba(10, 10, 16, 0.45)";
    ctx.fillRect(0, 0, W, H);
    const n = Math.ceil(resumeT);
    const frac = resumeT - Math.floor(resumeT); // pops at each new digit
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = Math.round(64 + 26 * frac) + "px " + COMIC_FONT;
    ctx.strokeStyle = "#14141c";
    ctx.lineWidth = 8;
    ctx.strokeText(n, W / 2, H * 0.42);
    ctx.fillStyle = "#ffb347";
    ctx.fillText(n, W / 2, H * 0.42);
    ctx.font = "20px " + COMIC_FONT;
    ctx.fillStyle = "#e8e8f0";
    ctx.fillText("get ready!", W / 2, H * 0.42 + 44);
  }

  if (boonChoices) {
    ctx.setTransform(scale, 0, 0, scale, offX, offY);
    drawBoonPick();
  }

  if (settingsOpen) {
    ctx.setTransform(scale, 0, 0, scale, offX, offY);
    drawSettings();
  }
}

function drawHUD() {
  // Hearts (ghee-armor boon can raise the max).
  for (let i = 0; i < player.maxHp; i++) {
    ctx.fillStyle = i < player.hp ? "#ff5a6e" : "#3a3a48";
    const hx = 18 + i * 26, hy = 22;
    ctx.beginPath();
    ctx.arc(hx - 4, hy, 5, 0, Math.PI * 2);
    ctx.arc(hx + 4, hy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(hx - 9, hy + 2);
    ctx.lineTo(hx, hy + 12);
    ctx.lineTo(hx + 9, hy + 2);
    ctx.closePath();
    ctx.fill();
  }

  // Timer + kills + wave.
  ctx.fillStyle = "#e8e8f0";
  ctx.font = "bold 16px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(elapsed.toFixed(0) + "s", W / 2, 28);
  ctx.textAlign = "right";
  ctx.font = "13px sans-serif";
  const NOM_PHASE_NAME = ["", "snack time", "coin toll", "NOM!"];
  ctx.fillText(nomMode ? "kills " + kills + "  ·  " + NOM_PHASE_NAME[nomPhase] : "kills " + kills + "  ·  Z" + level + " · W" + wave, W - 92, 28);

  // XP bar (build system): thin gold bar across the very top + power level.
  if (!nomMode) {
    const bh = 5;
    ctx.fillStyle = "rgba(20,20,30,0.55)";
    ctx.fillRect(0, 0, W, bh);
    ctx.fillStyle = "#ffd24a";
    ctx.fillRect(0, 0, W * Math.max(0, Math.min(1, xp / xpNext)), bh);
    ctx.textAlign = "center";
    ctx.font = "bold 11px sans-serif";
    ctx.fillStyle = "#ffd24a";
    ctx.fillText("PWR " + playerLevel, W / 2, 15);
  }
  // Delivery route strip (corridor): courier dot moving toward a finish flag,
  // a notch at the mini-boss gate, labeled — it must read as a ROUTE at a
  // glance (playtest: the unlabeled bar read as "no clue"). Hidden during boss
  // duels: progress is frozen and the boss HP bar owns that band.
  if (!nomMode && corridorOn() && !bossFight) {
    const pw = 150, px = (W - pw) / 2, py = 36, ph = 6;
    const p = routeProgress();
    ctx.fillStyle = "rgba(20,20,30,0.55)";
    ctx.fillRect(px, py, pw, ph);
    ctx.fillStyle = "#7ddf8a";
    ctx.fillRect(px, py, pw * p, ph);
    // Mini-boss gate notch (route fraction of wave gate 5).
    if (waveGates[CONFIG.boss.wave]) {
      const gf = (startY - waveGates[CONFIG.boss.wave]) / (startY - goalY);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillRect(px + pw * gf - 1, py - 1, 2, ph + 2);
    }
    // Finish flag at the end of the route.
    ctx.strokeStyle = "#e8e8f0";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(px + pw + 4, py + ph + 1); ctx.lineTo(px + pw + 4, py - 6); ctx.stroke();
    ctx.fillStyle = "#ffd24a";
    ctx.beginPath(); ctx.moveTo(px + pw + 4, py - 6); ctx.lineTo(px + pw + 12, py - 3.5); ctx.lineTo(px + pw + 4, py - 1); ctx.closePath(); ctx.fill();
    // The courier: a dot riding the fill head.
    ctx.fillStyle = "#ffb347";
    ctx.beginPath(); ctx.arc(px + pw * p, py + ph / 2, 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(20,20,28,0.8)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#7ddf8a";
    ctx.fillText("DELIVERY", W / 2, py + ph + 12);
  }
  drawGear();

  // NOM HP bar (easter-egg finale).
  if (nomMode) {
    const nom = enemies.find((e) => e.type === "nom");
    if (nom && nom.spawning <= 0) {
      const bw2 = 210, bx2 = (W - bw2) / 2, by2 = 44;
      ctx.fillStyle = "#2c2c3c";
      ctx.fillRect(bx2, by2, bw2, 8);
      ctx.fillStyle = "#ffd24a";
      ctx.fillRect(bx2, by2, bw2 * (nom.hp / nom.maxHp), 8);
      ctx.font = "11px " + COMIC_FONT;
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffd24a";
      ctx.fillText("NOM — feed him chilli till he pops", W / 2, by2 + 20);
    }
  }

  // Boss HP bar (during the fight, once he has emerged).
  if (bossFight) {
    const boss = enemies.find((e) => e.boss);
    if (boss && boss.spawning <= 0) {
      const bw2 = 210, bx2 = (W - bw2) / 2, by2 = 44;
      ctx.fillStyle = "#2c2c3c";
      ctx.fillRect(bx2, by2, bw2, 8);
      ctx.fillStyle = boss.main ? "#ff8c3c" : "#8d93a5";
      ctx.fillRect(bx2, by2, bw2 * (boss.hp / boss.maxHp), 8);
      ctx.font = "11px " + COMIC_FONT;
      ctx.textAlign = "center";
      ctx.fillStyle = boss.main ? "#ffb347" : "#9aa0b0";
      ctx.fillText(boss.name || "THE BLANDFATHER", W / 2, by2 + 20);
    }
  }
  // Temporary feel-debug readout (remove once movement is dialed in).
  if (settings.fps === "on") {
    ctx.textAlign = "left";
    ctx.font = "11px monospace";
    ctx.fillStyle = "rgba(141, 147, 165, 0.7)";
    ctx.fillText(Math.round(fpsEMA) + " fps", 18, 48);
  }

  // Flavor meter.
  const f = FLAVORS[flavor];
  const bw = 200, bh = 14;
  const bx = (W - bw) / 2, by = H - 36;
  ctx.fillStyle = "#2c2c3c";
  ctx.fillRect(bx, by, bw, bh);
  if (flavor !== "none") {
    const frac = flavorTimer / FLAVOR_DURATION;
    ctx.fillStyle = f.color;
    ctx.fillRect(bx, by, bw * frac, bh);
    // Fusion threshold tick.
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillRect(bx + bw * FUSION_THRESHOLD - 1, by - 2, 2, bh + 4);
  }
  ctx.strokeStyle = "#4a4a5c";
  ctx.strokeRect(bx, by, bw, bh);
  ctx.fillStyle = f.color;
  ctx.font = "bold 12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(f.label, W / 2, by - 6);
}

// Ambient menu sparks: fixed seeds, animated purely from the clock.
const MENU_SPARKS = Array.from({ length: 14 }, (_, i) => ({
  x: 30 + ((i * 137) % (W - 60)),
  y0: (i * 211) % H,
  spd: 14 + (i % 5) * 7,
  color: ["#ff5a3c", "#ffb347", "#3ecf8e"][i % 3],
  size: 10 + (i % 4) * 5,
}));

function drawMenu() {
  const tnow = performance.now() / 1000;

  // Rising spice sparks.
  for (const s of MENU_SPARKS) {
    const sy = (((s.y0 - tnow * s.spd) % H) + H) % H;
    ctx.globalAlpha = 0.22 + 0.16 * Math.sin(tnow * 2 + s.x);
    ctx.drawImage(glowSprite(s.color), s.x - s.size, sy - s.size, s.size * 2, s.size * 2);
  }
  ctx.globalAlpha = 1;

  // Title: comic letters on a warm glow, bobbing in a wave.
  ctx.globalAlpha = 0.45;
  ctx.drawImage(glowSprite("#ff8c3c"), W / 2 - 150, H * 0.32 - 160, 300, 300);
  ctx.globalAlpha = 1;
  ctx.save();
  ctx.translate(W / 2, H * 0.32);
  ctx.rotate(-0.045);
  const title = "MASALA RUN";
  ctx.font = "64px " + COMIC_FONT;
  ctx.textAlign = "left";
  ctx.lineJoin = "round";
  const widths = [];
  let total = 0;
  for (const ch of title) {
    const w2 = ctx.measureText(ch).width;
    widths.push(w2);
    total += w2;
  }
  const grad = ctx.createLinearGradient(0, -46, 0, 12);
  grad.addColorStop(0, "#ffd24a");
  grad.addColorStop(0.55, "#ff8c3c");
  grad.addColorStop(1, "#ff5a3c");
  let cx = -total / 2;
  for (let i = 0; i < title.length; i++) {
    const yo = Math.sin(tnow * 2.2 + i * 0.7) * 4;
    ctx.strokeStyle = "#14141c";
    ctx.lineWidth = 8;
    ctx.strokeText(title[i], cx, yo);
    ctx.fillStyle = i < 6 ? grad : "#e8e8f0"; // MASALA warm, RUN cream
    ctx.fillText(title[i], cx, yo);
    cx += widths[i];
  }
  ctx.restore();

  ctx.textAlign = "center";
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#9aa0b0";
  ctx.fillText("The Bland are eating the city's flavor.", W / 2, H * 0.40);
  ctx.fillText("Eat faster.", W / 2, H * 0.435);
  ctx.drawImage(FOOD_SPRITES.spicy, W / 2 - 64, H * 0.455);
  ctx.drawImage(FOOD_SPRITES.sweet, W / 2 - 20, H * 0.455);
  ctx.drawImage(FOOD_SPRITES.savory, W / 2 + 24, H * 0.455);
  ctx.fillStyle = "#ffb347";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText("You attack with whatever you last ate.", W / 2, H * 0.55);
  ctx.fillText("Flavor fades — keep eating.", W / 2, H * 0.585);
  ctx.fillStyle = "#9aa0b0";
  ctx.font = "13px sans-serif";
  ctx.fillText("Mix two different flavors while the bar is high → recipe.", W / 2, H * 0.625);
  ctx.globalAlpha = 0.7 + 0.3 * Math.sin(performance.now() / 1000 * 3);
  ctx.fillStyle = settings.nom === "on" ? "#ffd24a" : "#e8e8f0";
  ctx.font = "22px " + COMIC_FONT;
  ctx.fillText(settings.nom === "on" ? "🍴 tap to feed NOM" : "tap to choose zone", W / 2, H * 0.68);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#5a5f70";
  ctx.font = "12px sans-serif";
  ctx.fillText("move: drag or WASD · attacks are automatic", W / 2, H * 0.73);
  ctx.fillStyle = "#8d93a5";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("recipes " + discovered.size + "/" + Object.keys(RECIPES).length, W / 2, H * 0.80);
  drawGear();
}

function drawGear() {
  const gx = W - 26, gy = 30;
  ctx.save();
  ctx.translate(gx, gy);
  ctx.fillStyle = "rgba(20, 20, 28, 0.45)";
  ctx.strokeStyle = "rgba(232, 232, 240, 0.65)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * 10, Math.sin(a) * 10);
    ctx.lineTo(Math.cos(a) * 15, Math.sin(a) * 15);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  drawMute();
}

function drawMute() {
  ctx.save();
  ctx.translate(W - 66, 30);
  ctx.fillStyle = "rgba(20, 20, 28, 0.45)";
  ctx.beginPath();
  ctx.arc(0, 0, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(232, 232, 240, 0.65)";
  ctx.fillStyle = "rgba(232, 232, 240, 0.65)";
  ctx.lineWidth = 2;
  // Speaker body + cone.
  ctx.beginPath();
  ctx.moveTo(-7, -2.5);
  ctx.lineTo(-3, -2.5);
  ctx.lineTo(1.5, -6.5);
  ctx.lineTo(1.5, 6.5);
  ctx.lineTo(-3, 2.5);
  ctx.lineTo(-7, 2.5);
  ctx.closePath();
  ctx.fill();
  if (muted) {
    ctx.strokeStyle = "rgba(255, 90, 110, 0.9)";
    ctx.beginPath();
    ctx.moveTo(-8, 8);
    ctx.lineTo(8, -8);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(2.5, 0, 5, -0.9, 0.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(2.5, 0, 8.5, -0.8, 0.8);
    ctx.stroke();
  }
  ctx.restore();
}

// Single source of truth for panel geometry — used by both drawing and
// tap hit-testing, so taps work even before the first panel frame renders.
// Settings grouped into labeled sections (industry-standard layout).
const SETTING_GROUPS = [
  { title: "Gameplay", keys: ["difficulty", "power"] },
  { title: "Controls", keys: ["stick", "side", "size", "sens", "smooth"] },
  { title: "Audio", keys: ["music"] },
  { title: "Display", keys: ["fps"] },
  { title: "Secret 🍴", keys: ["nom"] }, // TEMP — easter-egg entry
];

function settingsLayout() {
  const cardW = Math.min(W - 90, 420), cardX = (W - cardW) / 2;
  const rowH = 30, step = 33, headH = 21;
  const rects = [];
  let y = 184;
  for (const g of SETTING_GROUPS) {
    rects.push({ x: cardX, y, w: cardW, h: headH, header: true, title: g.title });
    y += headH + 3;
    for (const key of g.keys) {
      rects.push({ x: cardX, y, w: cardW, h: rowH, key });
      y += step;
    }
    y += 3; // gap between groups
  }
  rects.push({ x: cardX, y, w: cardW, h: 30, key: "reset" });
  y += 34;
  const bw = 170, bh = 44;
  rects.push({ x: (W - bw) / 2, y, w: bw, h: bh, key: "close" });
  return rects;
}

function drawSettings() {
  ctx.fillStyle = "rgba(10, 10, 16, 0.92)";
  ctx.fillRect(0, 0, W, H);

  const titleY = 150;
  ctx.textAlign = "center";
  ctx.font = "36px " + COMIC_FONT;
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 6;
  ctx.strokeText("SETTINGS", W / 2, titleY);
  ctx.fillStyle = "#ffb347";
  ctx.fillText("SETTINGS", W / 2, titleY);
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#8d93a5";
  ctx.fillText("tap a row to change · applies instantly", W / 2, titleY + 28);

  // Press feedback: flash strength 1→0 over 0.3s after the last tap.
  const fxAge = settingsFx ? (performance.now() - settingsFx.at) / 1000 : 99;
  const fx = (key) => (settingsFx && settingsFx.key === key && fxAge < 0.3 ? 1 - fxAge / 0.3 : 0);

  let doneBottom = 0;
  for (const r of settingsLayout()) {
    if (r.header) {
      // Section label + a thin divider trailing it.
      ctx.textAlign = "left";
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#6b7080";
      const label = r.title.toUpperCase();
      ctx.fillText(label, r.x + 2, r.y + r.h - 4);
      const tw = ctx.measureText(label).width;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(r.x + tw + 12, r.y + r.h - 8);
      ctx.lineTo(r.x + r.w, r.y + r.h - 8);
      ctx.stroke();
      continue;
    }
    const f = fx(r.key);
    if (r.key === "reset") {
      const justReset = settingsFx && settingsFx.key === "reset" && fxAge < 1.2;
      ctx.fillStyle = "rgba(255, 255, 255, " + (0.03 + 0.12 * f) + ")";
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.textAlign = "center";
      ctx.font = "13px sans-serif";
      ctx.fillStyle = justReset ? "#7ddf8a" : "#8d93a5";
      ctx.fillText(justReset ? "✓  defaults restored" : "↺  reset to defaults", W / 2, r.y + r.h / 2 + 5);
    } else if (r.key === "close") {
      ctx.fillStyle = "#ffb347";
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.textAlign = "center";
      ctx.font = "24px " + COMIC_FONT;
      ctx.fillStyle = "#14141c";
      ctx.fillText("DONE", W / 2, r.y + r.h / 2 + 9);
      doneBottom = r.y + r.h;
    } else {
      ctx.fillStyle = "rgba(255, 255, 255, " + (0.06 + 0.12 * f) + ")";
      ctx.fillRect(r.x, r.y, r.w, r.h);
      if (f > 0) {
        ctx.strokeStyle = "rgba(255, 179, 71, " + f + ")";
        ctx.lineWidth = 2;
        ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
      }
      ctx.textAlign = "left";
      ctx.font = "15px sans-serif";
      ctx.fillStyle = "#e8e8f0";
      const ty = r.y + r.h / 2 + 5.5;
      ctx.fillText(SETTING_LABELS[r.key], r.x + 16, ty);
      // Value pops slightly on change, then settles.
      ctx.textAlign = "right";
      ctx.font = "bold " + Math.round(15 + 5 * f) + "px sans-serif";
      ctx.fillStyle = "#ffb347";
      ctx.fillText(settings[r.key], r.x + r.w - 16, ty);
      if (f > 0) {
        ctx.fillStyle = "rgba(255, 255, 255, " + f * 0.7 + ")";
        ctx.fillText(settings[r.key], r.x + r.w - 16, ty);
      }
    }
  }

  if (state === "playing") {
    ctx.textAlign = "center";
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#8d93a5";
    ctx.fillText("game paused", W / 2, Math.min(doneBottom + 24, H - 8));
  }

  drawSettingsStickPreview(fx);
}

// Live joystick preview inside the panel: side/size/mode changes are
// visible immediately, no need to close settings to check.
function drawSettingsStickPreview(fx) {
  const stickFx = Math.max(fx("stick"), fx("side"), fx("size"), fx("reset"));
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // stick lives in device px, like in-game
  if (settings.stick === "fixed") {
    const an = stickAnchor();
    const base = joyBaseSprite(an.r);
    ctx.globalAlpha = 0.55 + 0.4 * stickFx;
    ctx.drawImage(base, an.x - base.width / 2, an.y - base.height / 2);
    const knob = joyKnobSprite(an.r * 0.42);
    ctx.drawImage(knob, an.x - knob.width / 2, an.y - knob.height / 2);
    if (stickFx > 0) {
      ctx.strokeStyle = "rgba(255, 179, 71, " + stickFx + ")";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(an.x, an.y, an.r + 4, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "#8d93a5";
    ctx.font = Math.round(11 * DPR()) + "px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("preview", an.x, an.y + an.r + 18 * DPR());
  } else {
    ctx.globalAlpha = 0.6 + 0.4 * stickFx;
    ctx.fillStyle = stickFx > 0 ? "#ffb347" : "#8d93a5";
    ctx.font = Math.round(12 * DPR()) + "px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("no fixed stick — drag anywhere to steer", canvas.width / 2, canvas.height - 40 * DPR());
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

// The Blandfather: a big bland with a crown. Vibrates during the charge
// windup (the tell); orange outline during recovery (the weak window).
function drawBoss(e) {
  if (e.defeated) { drawBossDefeated(e); return; }
  const windup = e.bossState === "windup";
  const jx = windup ? (Math.random() - 0.5) * 5 : 0;
  const jy = windup ? (Math.random() - 0.5) * 5 : 0;
  const x = e.x + jx, y = e.y + jy;
  // City boss body tints per city (Mumbai regal purple-grey, Jaisalmer desert
  // sand-grey); mini-boss stays plain grey.
  const cityKey = curCity().key, deser = cityKey === "jaisalmer";
  // Authored boss sprite if loaded (mini-boss = Blandfather; city boss = the
  // current city's). Telegraph cues (windup jitter via x/y, recover weak-window
  // ring) stay drawn on top so gameplay readability survives the art swap.
  const bossSprite = e.main ? SPRITES[curCity().bossSprite] : SPRITES.blandfather;
  if (bossSprite) {
    const sp = e.main ? CONFIG.sprites.boss : CONFIG.sprites.miniboss;
    drawSprite(bossSprite, x, y, e.r * 2 * sp.scale, 1, e.flash > 0, sp.yOff);
    if (e.bossState === "recover" || e.main) {
      ctx.strokeStyle = e.bossState === "recover" ? "rgba(255,179,71,0.9)" : "rgba(255,140,60,0.45)";
      ctx.lineWidth = e.bossState === "recover" ? 4 : 3;
      ctx.beginPath(); ctx.arc(x, y, e.r * 1.05, 0, Math.PI * 2); ctx.stroke();
    }
    return;
  }
  if (e.flash > 0) ctx.fillStyle = "#ffffff";
  else if (e.main) ctx.fillStyle = deser ? (windup ? "#9c8160" : "#6e5740") : (windup ? "#8c7280" : "#5e4a54");
  else ctx.fillStyle = windup ? "#8a8ea0" : "#5a5e6c";
  ctx.beginPath();
  for (let i = 0; i < 14; i++) {
    const ang = (i / 14) * Math.PI * 2;
    const wob = 1 + Math.sin(e.wobble * 1.2 + i * 1.8) * 0.07;
    const px = x + Math.cos(ang) * e.r * wob;
    const py = y + Math.sin(ang) * e.r * wob * 0.95;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = e.bossState === "recover" ? "rgba(255, 179, 71, 0.9)" : e.main ? "rgba(255, 140, 60, 0.55)" : "rgba(20, 20, 28, 0.7)";
  ctx.lineWidth = e.bossState === "recover" ? 4 : 3;
  ctx.stroke();
  // Headgear by RANK + CITY: mini-boss gets a dented goon cap; the city boss
  // gets regalia — Mumbai a tall gold crown (Vada Maharaja), Jaisalmer a layered
  // desert turban (Dune Raja). Reads rank + locale at a glance.
  const top = y - e.r;
  if (!e.main) {
    ctx.fillStyle = "#6c7180"; // squat dented cap
    ctx.beginPath(); ctx.ellipse(x, top + 3, 15, 6, 0, Math.PI, 0); ctx.fill();
    ctx.fillRect(x - 15, top + 2, 30, 3);
    ctx.fillStyle = "#565b68";
    ctx.beginPath(); ctx.ellipse(x + 5, top + 1, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
  } else if (deser) {
    // Dune Raja — layered turban + cloth tail + jewel.
    ctx.fillStyle = "#e8b86d";
    ctx.beginPath(); ctx.ellipse(x, top + 6, 18, 11, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#d89a4a";
    for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.ellipse(x + i * 6, top + 4, 7, 5, 0, Math.PI, 0); ctx.fill(); }
    ctx.fillStyle = "#c9783a";
    ctx.beginPath(); ctx.moveTo(x + 15, top + 4); ctx.quadraticCurveTo(x + 27, top + 6, x + 22, top + 17); ctx.quadraticCurveTo(x + 18, top + 10, x + 13, top + 8); ctx.fill();
    ctx.fillStyle = "#ff5a3c";
    ctx.beginPath(); ctx.arc(x, top + 1, 3, 0, Math.PI * 2); ctx.fill();
  } else {
    // Vada Maharaja — tall gold crown with jewels.
    ctx.fillStyle = "#ffd24a";
    ctx.beginPath();
    ctx.moveTo(x - 16, top + 4);
    ctx.lineTo(x - 12, top - 12);
    ctx.lineTo(x - 6, top + 1);
    ctx.lineTo(x, top - 15);
    ctx.lineTo(x + 6, top + 1);
    ctx.lineTo(x + 12, top - 12);
    ctx.lineTo(x + 16, top + 4);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#ff5a3c";
    ctx.beginPath(); ctx.arc(x, top - 4, 2.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#3ecf8e";
    ctx.beginPath(); ctx.arc(x - 12, top - 6, 1.8, 0, Math.PI * 2); ctx.arc(x + 12, top - 6, 1.8, 0, Math.PI * 2); ctx.fill();
  }
  // Angry face: brows, eyes, wide frown.
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x - 13, y - 10);
  ctx.lineTo(x - 4, y - 5);
  ctx.moveTo(x + 13, y - 10);
  ctx.lineTo(x + 4, y - 5);
  ctx.stroke();
  ctx.fillStyle = "#14141c";
  ctx.beginPath();
  ctx.arc(x - 8, y - 1, 3, 0, Math.PI * 2);
  ctx.arc(x + 8, y - 1, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x, y + 15, 7, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();
  // A city boss is a KING — a big curled mustache over the frown sells the rank.
  if (e.main) {
    ctx.strokeStyle = "#14141c"; ctx.lineWidth = 3; ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y + 7);
    ctx.quadraticCurveTo(x - 9, y + 9, x - 15, y + 1);
    ctx.moveTo(x, y + 7);
    ctx.quadraticCurveTo(x + 9, y + 9, x + 15, y + 1);
    ctx.stroke(); ctx.lineCap = "butt";
  }
}

// Defeated main boss: greyed-out, tilted slump with X eyes and a toppling
// crown. Fades over the final stretch of the defeat beat.
function drawBossDefeated(e) {
  const x = e.x, y = e.y;
  ctx.save();
  ctx.globalAlpha = Math.min(1, e.defeatT / 0.6); // fade out near the end
  ctx.translate(x, y);
  ctx.rotate(0.35); // slumped to one side
  // Body — drained grey.
  ctx.fillStyle = "#4a4650";
  ctx.beginPath();
  for (let i = 0; i < 14; i++) {
    const ang = (i / 14) * Math.PI * 2;
    const wob = 1 + Math.sin(e.wobble + i * 1.8) * 0.05;
    const px = Math.cos(ang) * e.r * wob;
    const py = Math.sin(ang) * e.r * wob * 0.95;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(20, 20, 28, 0.6)";
  ctx.lineWidth = 3;
  ctx.stroke();
  // Toppling gold crown, sliding off.
  ctx.fillStyle = "#ffd24a";
  ctx.beginPath();
  ctx.moveTo(-16, -e.r - 2);
  ctx.lineTo(-12, -e.r - 18);
  ctx.lineTo(-6, -e.r - 5);
  ctx.lineTo(0, -e.r - 21);
  ctx.lineTo(6, -e.r - 5);
  ctx.lineTo(12, -e.r - 18);
  ctx.lineTo(16, -e.r - 2);
  ctx.closePath();
  ctx.fill();
  // X-X eyes.
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 2.5;
  for (const ex of [-8, 8]) {
    ctx.beginPath();
    ctx.moveTo(ex - 3, -4); ctx.lineTo(ex + 3, 2);
    ctx.moveTo(ex + 3, -4); ctx.lineTo(ex - 3, 2);
    ctx.stroke();
  }
  // Wavy dazed mouth.
  ctx.beginPath();
  ctx.moveTo(-7, 11);
  ctx.lineTo(-3, 8); ctx.lineTo(1, 11); ctx.lineTo(5, 8); ctx.lineTo(8, 11);
  ctx.stroke();
  ctx.restore();
}

// NOM (easter egg boss): a big dark blob that is mostly a giant gaping mouth.
function drawNom(e) {
  const x = e.x, y = e.y, r = e.r;
  // Body.
  ctx.fillStyle = e.flash > 0 ? "#ffffff" : "#3a3a48";
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const ang = (i / 16) * Math.PI * 2;
    const wob = 1 + Math.sin(e.wobble * 1.4 + i * 1.6) * 0.06;
    const px = x + Math.cos(ang) * r * wob;
    const py = y + Math.sin(ang) * r * wob * 0.95;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 210, 74, 0.85)";
  ctx.lineWidth = 3;
  ctx.stroke();
  // Hungry eyes.
  ctx.fillStyle = "#ffd24a";
  ctx.beginPath();
  ctx.arc(x - r * 0.32, y - r * 0.34, 4.5, 0, Math.PI * 2);
  ctx.arc(x + r * 0.32, y - r * 0.34, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#14141c";
  ctx.beginPath();
  ctx.arc(x - r * 0.32, y - r * 0.34, 2, 0, Math.PI * 2);
  ctx.arc(x + r * 0.32, y - r * 0.34, 2, 0, Math.PI * 2);
  ctx.fill();
  // Giant gaping mouth — chomps open/closed.
  const gape = 0.5 + 0.5 * Math.abs(Math.sin(e.wobble * 1.6));
  ctx.fillStyle = "#14141c";
  ctx.beginPath();
  ctx.ellipse(x, y + r * 0.28, r * 0.62, r * 0.42 * gape + 4, 0, 0, Math.PI * 2);
  ctx.fill();
  // Teeth.
  ctx.fillStyle = "#e8e8f0";
  for (let i = -2; i <= 2; i++) {
    const tx = x + i * r * 0.24;
    ctx.beginPath();
    ctx.moveTo(tx - 3, y + r * 0.28 - (r * 0.42 * gape));
    ctx.lineTo(tx + 3, y + r * 0.28 - (r * 0.42 * gape));
    ctx.lineTo(tx, y + r * 0.28 - (r * 0.42 * gape) + 6);
    ctx.closePath();
    ctx.fill();
  }
}

// Coin sign: a gold "INSERT COIN" token that drifts across, blocking the view.
function drawCoin(e) {
  const x = e.x, y = e.y, r = e.r;
  ctx.fillStyle = e.flash > 0 ? "#ffffff" : "#ffd24a";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#b8860b";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#8a6d0b";
  ctx.textAlign = "center";
  ctx.font = "bold 9px sans-serif";
  ctx.fillText("INSERT", x, y - 1);
  ctx.fillText("COIN", x, y + 9);
}

// Boon pick screen — shared geometry for draw + tap hit-testing.
function boonLayout() {
  const cw = Math.min(W - 90, 360), x = (W - cw) / 2;
  const h = 84, gap = 14;
  const y0 = H * 0.3;
  return boonChoices.map((b, i) => ({ x, y: y0 + i * (h + gap), w: cw, h, i }));
}

function drawBoonPick() {
  ctx.fillStyle = "rgba(10, 10, 16, 0.85)";
  ctx.fillRect(0, 0, W, H);
  const tnow = performance.now() / 1000;

  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  const isLevel = pickKind === "levelup";
  const title = isLevel ? "POWER UP!" : "BOSS DOWN!";
  ctx.font = "34px " + COMIC_FONT;
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 6;
  ctx.strokeText(title, W / 2, H * 0.3 - 64);
  ctx.fillStyle = isLevel ? "#ffd24a" : "#7ddf8a";
  ctx.fillText(title, W / 2, H * 0.3 - 64);
  ctx.font = "16px " + COMIC_FONT;
  ctx.fillStyle = "#e8e8f0";
  ctx.fillText(isLevel ? "pick an upgrade" : "pick a boon — it lasts this zone", W / 2, H * 0.3 - 30);

  for (const r of boonLayout()) {
    const b = boonChoices[r.i];
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.strokeStyle = "rgba(255, 179, 71, " + (0.55 + 0.3 * Math.sin(tnow * 3 + r.i)) + ")";
    ctx.lineWidth = 2;
    ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    ctx.textAlign = "center";
    ctx.font = "22px " + COMIC_FONT;
    ctx.fillStyle = "#ffb347";
    ctx.fillText(b.name, W / 2, r.y + 36);
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "#cfd3de";
    ctx.fillText(b.desc, W / 2, r.y + 60);
  }
}

// ---------- Level select ----------
// Two-tier select. pickedCity < 0 → CITY list: tap a city to enter it. A city
// you've never played past zone 1 starts immediately; one you've played opens
// its ZONE picker. pickedCity >= 0 → that city's zones (+ BACK).
function levelsLayout() {
  const rects = [];
  if (pickedCity < 0) {
    // City cards: a centered vertical stack.
    const cw = Math.min(W - 40, 360), ch = 92, gy = 18;
    const x0 = (W - cw) / 2, y0 = H * 0.30;
    for (let c = 0; c < CITIES.length; c++) {
      rects.push({ x: x0, y: y0 + c * (ch + gy), w: cw, h: ch, c, key: "city" });
    }
    const bw = 230, bh = 52, by = y0 + CITIES.length * (ch + gy) + 16;
    rects.push({ x: (W - bw) / 2, y: by, w: bw, h: bh, key: "resume" });
    return rects;
  }
  // Zone tiles for the picked city.
  const cols = ZONES_PER_CITY <= 3 ? ZONES_PER_CITY : 3;
  const rows = Math.ceil(ZONES_PER_CITY / cols);
  const gx = 16, gy = 16;
  const tw = Math.min(96, (Math.min(W - 40, 420) - (cols - 1) * gx) / cols), th = tw;
  const gridW = cols * tw + (cols - 1) * gx;
  const x0 = (W - gridW) / 2, y0 = H * 0.32;
  for (let i = 0; i < ZONES_PER_CITY; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    rects.push({ x: x0 + c * (tw + gx), y: y0 + r * (th + gy), w: tw, h: th, z: i + 1, key: "zone" });
  }
  const bw = 200, bh = 48, by = y0 + rows * (th + gy) + 22;
  rects.push({ x: (W - bw) / 2, y: by, w: bw, h: bh, key: "back" });
  return rects;
}

function levelsPress(p) {
  const a = toArena(p);
  for (const r of levelsLayout()) {
    if (a.x < r.x || a.x > r.x + r.w || a.y < r.y || a.y > r.y + r.h) continue;
    sfx.ui(); if (navigator.vibrate) navigator.vibrate(8);
    if (r.key === "resume") { startLevel(unlockedLevel); return; }
    if (r.key === "back") { pickedCity = -1; return; }
    if (r.key === "city") {
      const uz = cityUnlockedZones(r.c);
      if (uz <= 0) return;            // locked city — blip only
      if (uz === 1) startLevel(cityFirstLevel(r.c)); // brand-new city: just start
      else pickedCity = r.c;          // already played: open zone picker
      return;
    }
    if (r.key === "zone") {
      if (r.z <= cityUnlockedZones(pickedCity)) startLevel(cityFirstLevel(pickedCity) + r.z - 1);
      return;
    }
  }
}

function drawLevels() {
  const tnow = performance.now() / 1000;
  for (const s of MENU_SPARKS) {
    const sy = (((s.y0 - tnow * s.spd) % H) + H) % H;
    ctx.globalAlpha = 0.18 + 0.14 * Math.sin(tnow * 2 + s.x);
    ctx.drawImage(glowSprite(s.color), s.x - s.size, sy - s.size, s.size * 2, s.size * 2);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  if (pickedCity < 0) drawCityList(tnow); else drawZonePicker(tnow);
  drawGear();
}

function drawHeading(title, sub) {
  ctx.font = "40px " + COMIC_FONT;
  ctx.strokeStyle = "#14141c"; ctx.lineWidth = 7;
  ctx.strokeText(title, W / 2, H * 0.18);
  ctx.fillStyle = "#ffb347";
  ctx.fillText(title, W / 2, H * 0.18);
  ctx.font = "13px sans-serif";
  ctx.fillStyle = "#8d93a5";
  ctx.fillText(sub, W / 2, H * 0.18 + 26);
}

function drawCityList(tnow) {
  drawHeading("SELECT CITY", "each city is " + ZONES_PER_CITY + " zones · clear them to travel on");
  for (const r of levelsLayout()) {
    if (r.key === "resume") {
      ctx.globalAlpha = 0.9 + 0.1 * Math.sin(tnow * 3);
      ctx.fillStyle = "#ffb347"; ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#14141c"; ctx.font = "18px " + COMIC_FONT;
      // Show CITY + LOCAL zone (Z1..Z5), not the global level — Jaisalmer z1 is
      // "JAISALMER Z1", not "Z6", so it matches the picker + locked vocabulary.
      const verb = unlockedLevel > 1 ? "RESUME" : "PLAY";
      ctx.fillText(verb + " · " + CITIES[cityOf(unlockedLevel)].name + " Z" + zoneInCity(unlockedLevel), r.x + r.w / 2, r.y + r.h / 2 + 7);
      continue;
    }
    const city = CITIES[r.c];
    const uz = cityUnlockedZones(r.c);
    const locked = uz <= 0;
    const done = uz >= ZONES_PER_CITY && unlockedLevel > cityFirstLevel(r.c) + ZONES_PER_CITY - 1;
    const accent = city.pal.mustard || "#ffb347";
    ctx.fillStyle = locked ? "rgba(255,255,255,0.04)" : "rgba(255,179,71,0.12)";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = locked ? "rgba(120,126,150,0.3)" : accent;
    ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    ctx.textAlign = "left";
    ctx.font = "26px " + COMIC_FONT;
    ctx.fillStyle = locked ? "#5a5f70" : "#ffe2a6";
    ctx.fillText(city.name, r.x + 20, r.y + 40);
    ctx.font = "12px sans-serif";
    ctx.fillStyle = locked ? "#5a5f70" : "#9aa0b0";
    const prog = locked ? "locked" : (done ? "cleared · " + ZONES_PER_CITY + "/" + ZONES_PER_CITY : "zones " + uz + "/" + ZONES_PER_CITY + " unlocked");
    ctx.fillText(prog, r.x + 20, r.y + 64);
    ctx.textAlign = "right";
    ctx.font = "26px sans-serif";
    ctx.fillText(locked ? "🔒" : (done ? "✓" : "›"), r.x + r.w - 18, r.y + r.h / 2 + 6);
    ctx.textAlign = "center";
  }
}

function drawZonePicker(tnow) {
  const city = CITIES[pickedCity];
  const uz = cityUnlockedZones(pickedCity);
  drawHeading(city.name, "select a zone");
  for (const r of levelsLayout()) {
    if (r.key === "back") {
      ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.lineWidth = 2; ctx.strokeStyle = "rgba(255,179,71,0.5)";
      ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
      ctx.fillStyle = "#ffd24a"; ctx.font = "20px " + COMIC_FONT;
      ctx.fillText("‹ CITIES", r.x + r.w / 2, r.y + r.h / 2 + 7);
      continue;
    }
    const unlocked = r.z <= uz;
    const frontierGlobal = cityFirstLevel(pickedCity) + r.z - 1 === unlockedLevel;
    ctx.fillStyle = unlocked ? "rgba(255,179,71,0.14)" : "rgba(255,255,255,0.04)";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.lineWidth = frontierGlobal ? 3 : 2;
    ctx.strokeStyle = frontierGlobal ? "rgba(255,179,71," + (0.6 + 0.4 * Math.sin(tnow * 4)) + ")" : unlocked ? "rgba(255,179,71,0.5)" : "rgba(120,126,150,0.3)";
    ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    ctx.font = "30px " + COMIC_FONT;
    ctx.fillStyle = unlocked ? "#ffd24a" : "#5a5f70";
    ctx.fillText(r.z, r.x + r.w / 2, r.y + r.h / 2 + 4);
    ctx.font = "16px sans-serif";
    if (unlocked && !frontierGlobal) { ctx.fillStyle = "#7ddf8a"; ctx.fillText("✓", r.x + r.w / 2, r.y + r.h - 12); }
    else if (!unlocked) { ctx.fillStyle = "#5a5f70"; ctx.fillText("🔒", r.x + r.w / 2, r.y + r.h - 11); }
    else if (frontierGlobal) { ctx.fillStyle = "#ffb347"; ctx.font = "10px sans-serif"; ctx.fillText("NEXT", r.x + r.w / 2, r.y + r.h - 12); }
  }
}

// ---------- Level clear ----------
function drawLevelClear() {
  ctx.fillStyle = "rgba(10, 10, 16, 0.85)";
  ctx.fillRect(0, 0, W, H);
  const tnow = performance.now() / 1000;
  ctx.save();
  ctx.translate(W / 2, H * 0.37);
  ctx.rotate(-0.03);
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = "46px " + COMIC_FONT;
  const grad = ctx.createLinearGradient(0, -40, 0, 12);
  grad.addColorStop(0, "#ffe9a0");
  grad.addColorStop(0.6, "#ffd24a");
  grad.addColorStop(1, "#ff9c2c");
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 8;
  ctx.strokeText("RUN COMPLETE!", 0, 0);
  ctx.fillStyle = grad;
  ctx.fillText("RUN COMPLETE!", 0, 0);
  ctx.restore();

  ctx.textAlign = "center";
  ctx.font = "16px " + COMIC_FONT;
  ctx.fillStyle = "#e8e8f0";
  ctx.fillText("you cleared every zone — flavor restored!", W / 2, H * 0.46);
  ctx.globalAlpha = 0.7 + 0.3 * Math.sin(tnow * 3);
  ctx.fillStyle = "#ffb347";
  ctx.font = "22px " + COMIC_FONT;
  ctx.fillText("tap to continue", W / 2, H * 0.56);
  ctx.globalAlpha = 1;
}

function drawGameOver() {
  ctx.fillStyle = "rgba(20, 20, 28, 0.82)";
  ctx.fillRect(0, 0, W, H);
  const tnow = performance.now() / 1000;

  // Win-card for NOM mode, FLAVORLESS otherwise.
  ctx.save();
  ctx.translate(W / 2, H * 0.37);
  ctx.rotate(-0.035);
  ctx.textAlign = "center";
  ctx.font = (nomWon ? "44px " : "52px ") + COMIC_FONT;
  ctx.lineJoin = "round";
  const grad = ctx.createLinearGradient(0, -40, 0, 10);
  if (nomWon) {
    grad.addColorStop(0, "#ffe9a0");
    grad.addColorStop(0.6, "#ffd24a");
    grad.addColorStop(1, "#ff9c2c");
  } else {
    grad.addColorStop(0, "#e8e8f0");
    grad.addColorStop(0.6, "#9aa0b0");
    grad.addColorStop(1, "#62687a");
  }
  const headline = nomWon ? "NOM IS FULL!" : "FLAVORLESS";
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 8;
  ctx.strokeText(headline, 0, 0);
  ctx.fillStyle = grad;
  ctx.fillText(headline, 0, 0);
  ctx.restore();

  ctx.textAlign = "center";
  ctx.font = "15px sans-serif";
  ctx.fillStyle = "#9aa0b0";
  if (nomWon) {
    ctx.fillText("(first time in history)", W / 2, H * 0.45);
    ctx.fillStyle = "#ffd24a";
    ctx.font = "16px " + COMIC_FONT;
    ctx.fillText("“…ok now I'm hungry again.” 🪙", W / 2, H * 0.50);
  } else {
    ctx.fillText("survived " + elapsed.toFixed(1) + "s  ·  " + kills + " kills  ·  zone " + level + " wave " + wave, W / 2, H * 0.45);
    if (bestTime > 0) ctx.fillText("best " + bestTime.toFixed(1) + "s", W / 2, H * 0.49);
    ctx.fillText("recipes " + discovered.size + "/" + Object.keys(RECIPES).length, W / 2, H * 0.525);
  }

  // REPLAY (primary) + MENU (secondary) — specific tap targets.
  ctx.lineJoin = "round";
  for (const r of gameOverLayout()) {
    const primary = r.key === "replay";
    const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
    if (primary) {
      // Gentle pulse to pull the eye to the default action.
      ctx.globalAlpha = 0.88 + 0.12 * Math.sin(tnow * 3);
      ctx.fillStyle = "#ffb347";
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#14141c";
    } else {
      ctx.strokeStyle = "rgba(154, 160, 176, 0.7)";
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x, r.y, r.w, r.h);
      ctx.fillStyle = "#cfd3de";
    }
    ctx.font = "26px " + COMIC_FONT;
    ctx.textAlign = "center";
    ctx.fillText(primary ? "REPLAY" : "MENU", cx, cy + 9);
  }
}

// ---------- Debug handle (greybox testing only) ----------
window.__mr = {
  get state() { return state; },
  get flavor() { return flavor; },
  get flavorTimer() { return flavorTimer; },
  get player() { return player; },
  get foods() { return foods; },
  get enemies() { return enemies; },
  get kills() { return kills; },
  get wave() { return wave; },
  get recipes() { return [...discovered]; },
  get settings() { return settings; },
  get settingsOpen() { return settingsOpen; },
  get gapT() { return gapT; },
  get shake() { return shake; },
  get layout() { return { offX, offY, scale, dpr: DPR() }; },
  get dims() { return { W, H }; },
  get resumeT() { return resumeT; },
  get config() { return CONFIG; }, // live-tunable: __mr.config.waveLength = 15
  get bossFight() { return bossFight; },
  get level() { return level; },
  get unlocked() { return unlockedLevel; },
  get barriers() { return barriers; },
  get hazards() { return hazards; },
  // Corridor mode: camera + route state, and a live A/B switch. setCorridor(false)
  // restores the classic arena game (restarts the current zone either way).
  get cam() { return { ...cam }; },
  get route() { return { routeLen, startY, goalY, progress: player ? routeProgress() : 0, waveGates: [...waveGates] }; },
  setCorridor(v) {
    CONFIG.corridor.on = !!v;
    if (state === "playing" && level) startLevel(level);
    return "corridor → " + CONFIG.corridor.on;
  },
  // Authoring: overlay collision rects on the BG to align them to the art.
  get showBarriers() { return showBarriers; },
  set showBarriers(v) { showBarriers = !!v; },
  // Testing: jump to a level (ignores the unlock gate). __mr.goLevel(3)
  goLevel(n) { unlockedLevel = Math.max(unlockedLevel, Math.min(MAX_LEVEL, n)); saveProgress(); startLevel(n); },
  // Testing: wipe progress back to level 1 only.
  resetProgress() { unlockedLevel = 1; startLevelNum = 1; saveProgress(); state = "menu"; },
  // Testing: jump straight into a boss fight (skips the wave grind).
  // __mr.bossNow() = mini-boss · __mr.bossNow(true) = wave-8 main boss.
  bossNow(main) { if (state === "playing" && !nomMode) { wave = main ? CONFIG.boss.mainWave : CONFIG.boss.wave; enemies.length = 0; bossFight = false; startBossFight(!!main); } },
  get nom() { return { nomMode, nomPhase, nomT, nomWon }; },
  get powers() { return { rushCharge, slamCharge, rushReady: rushReady(), slamReady: slamReady(), rushActive, slowmoT }; },
  triggerRush() { triggerRush(); },
  triggerSlam() { triggerSlam(); },
  get boonChoices() { return boonChoices; },
  get build() { return { xp, playerLevel, xpNext, pendingLevels, pickKind }; },
  get sprites() { const o = {}; for (const n in SPRITE_SRC) o[n] = !!SPRITES[n]; return o; },
  get boons() { return boons; },
  get mods() { return mods; },
  // Deterministic step for testing (rAF pauses in background tabs).
  tick(dt) { if (state === "playing") update(dt); },
  // Visual theme (dev-only — not a player setting). __mr.themes lists names;
  // __mr.setTheme("retro-day") loads that theme's art + palette live. The
  // shipped default is the ACTIVE_THEME constant near the top of this file.
  get themes() { return Object.keys(THEMES); },
  get activeTheme() { return curThemeName; },
  setTheme(name) {
    if (!THEMES[name]) return "unknown theme: " + name + " — try " + Object.keys(THEMES).join(", ");
    curThemeName = name;
    loadThemeImages();
    buildBackdrop();
    return "theme → " + name;
  },
};

// ---------- Main loop ----------
// First theme load + sizing happen here, after all state exists. loadThemeImages
// (city-art branch) reads CITIES, and resize()/clampToArena touch player/foods —
// all const/let declared above, which would be TDZ errors at the top of the file.
loadThemeImages();
resize();
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", resize);
if (window.visualViewport) window.visualViewport.addEventListener("resize", resize);
let last = performance.now();
let smoothDt = 1 / 60; // low-passed dt — rAF intervals jitter frame-to-frame
let fpsEMA = 60;
function frame(now) {
  let raw = (now - last) / 1000;
  last = now;
  if (raw > 0.0001) fpsEMA += (1 / raw - fpsEMA) * 0.08;
  if (raw > 0.05) raw = 0.05; // hitch guard (GC pause, tab restore)
  // Low-pass the frame delta so rAF jitter doesn't ride straight into
  // position (x += v·dt). Robust across 60/90/120Hz, no beat-frequency.
  // Converge fast: a slow factor smears a single hitch's inflated dt across
  // many frames and decouples motion from real time under variable framerate,
  // which reads as the character "floating" ahead of your finger. The old
  // hardcoded 0.2 lingered ~15 frames after any stall. Live-tunable.
  smoothDt += (raw - smoothDt) * CONFIG.dtTrack;
  const dt = smoothDt;
  if (state === "playing") {
    update(dt);
  } else {
    // Effects must settle on menu/gameover screens too (no endless shake).
    if (shake > 0) shake -= dt;
    if (hitFlash > 0) hitFlash -= dt;
    if (fusionFlash > 0) fusionFlash -= dt;
  }
  tickMusic();
  draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// Returning from a backgrounded tab/app pauses rAF, so `last` goes stale.
// Without this, the first frame back integrates a huge (clamped) delta and
// the character lurches/floats. Resync the clock + dt so resume is seamless.
function resyncClock() { last = performance.now(); smoothDt = 1 / 60; }
document.addEventListener("visibilitychange", () => { if (!document.hidden) resyncClock(); });
window.addEventListener("focus", resyncClock);

// Backgrounding the app (tab switch, app switch) → on return, suspend/resume
// audio and give a fresh 3-2-1 countdown so the player isn't ambushed.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (audioCtx) audioCtx.suspend();
    clearJoy(); // backgrounding mid-drag must not leave a stale deflection
  } else {
    if (audioCtx) audioCtx.resume();
    last = performance.now(); // avoid one giant dt on return
    music.next = 0;           // resync the music scheduler
    if (state === "playing" && !settingsOpen && !boonChoices && resumeT <= 0) resumeT = 3;
  }
});

})();
