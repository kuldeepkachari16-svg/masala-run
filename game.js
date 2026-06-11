// Masala Run — v0 greybox prototype
// One rule to know: you attack with whatever you last ate, and flavor fades.
// Vanilla Canvas, no dependencies. Portrait mobile-first, works with keyboard too.

(() => {
"use strict";

// ---------- Canvas & scaling ----------
const canvas = document.getElementById("game");
// alpha:false + desynchronized: opaque canvas, lower input-to-photon latency
// (notably on Android Chrome). Safe: every frame starts with a full clear.
const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });

// Logical playfield (portrait). Rendered letterboxed/scaled to the window.
const W = 480;
const H = 800;
let scale = 1, offX = 0, offY = 0;

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
  scale = Math.min(canvas.width / W, canvas.height / H);
  offX = (canvas.width - W * scale) / 2;
  offY = (canvas.height - H * scale) / 2;
}
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", resize);
if (window.visualViewport) window.visualViewport.addEventListener("resize", resize);
resize();

// ---------- Pre-rendered art (procedural, zero asset files) ----------
function makeSprite(w, h, drawFn) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  drawFn(c.getContext("2d"), w, h);
  return c;
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

// Night street backdrop, drawn once.
const bgCanvas = makeSprite(W, H, (g) => {
  const base = g.createLinearGradient(0, 0, 0, H);
  base.addColorStop(0, "#191923");
  base.addColorStop(1, "#14141d");
  g.fillStyle = base;
  g.fillRect(0, 0, W, H);
  // Footpaths + curbs.
  g.fillStyle = "#1f1f2b";
  g.fillRect(0, 0, 42, H);
  g.fillRect(W - 42, 0, 42, H);
  g.fillStyle = "#262634";
  g.fillRect(40, 0, 3, H);
  g.fillRect(W - 43, 0, 3, H);
  // Centre lane dashes.
  g.fillStyle = "#23232f";
  for (let y = 20; y < H; y += 64) g.fillRect(W / 2 - 3, y, 6, 34);
  // Warm streetlight pools.
  const lamps = [[90, 130], [400, 300], [120, 520], [380, 680], [240, 60]];
  for (const [lx, ly] of lamps) {
    const lg = g.createRadialGradient(lx, ly, 5, lx, ly, 150);
    lg.addColorStop(0, "rgba(255, 178, 92, 0.07)");
    lg.addColorStop(1, "rgba(255, 178, 92, 0)");
    g.fillStyle = lg;
    g.fillRect(lx - 150, ly - 150, 300, 300);
  }
  // Street props: stall silhouettes with awnings, crates, a crosswalk.
  const stall = (sx, sy) => {
    g.fillStyle = "#20202e";
    g.fillRect(sx, sy + 10, 34, 44);
    for (let i = 0; i < 5; i++) {
      g.fillStyle = i % 2 ? "#3a2e36" : "#2e2e42";
      g.fillRect(sx - 2 + i * 7.6, sy, 7.6, 12);
    }
  };
  stall(2, 170);
  stall(2, 600);
  stall(W - 36, 330);
  stall(W - 36, 720);
  g.fillStyle = "#242433";
  g.fillRect(4, 420, 18, 18);
  g.fillRect(W - 24, 80, 18, 18);
  g.fillStyle = "rgba(255, 255, 255, 0.05)";
  for (let i = 0; i < 6; i++) g.fillRect(58 + i * 64, H - 90, 36, 44);
});

const vignette = makeSprite(W, H, (g) => {
  const grad = g.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.4)");
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
});

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
    speedMult: 1.35,
    shots: 1,
  },
  savory: {
    label: "SAVORY",
    color: "#3ecf8e",
    fireInterval: 0.75,
    damage: 1,
    speedMult: 0.95,
    shots: 1,
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
let hitStop;
let flavor, flavorTimer, savoryPulse;
let elapsed, kills, wave, waveTimer, spawnTimer, fireTimer, mixHintShown;
let hitFlash, shake, fusionFlash;
let gapT; // breather countdown between waves
let bestTime = 0;
let settingsOpen = false;
let settingRects = [];

function reset() {
  player = { x: W / 2, y: H / 2, r: 14, hp: 3, iframes: 0, speed: 205, shield: 0, face: 1, vx: 0, vy: 0 };
  enemies = [];
  bullets = [];
  foods = [];
  particles = [];
  floaters = [];
  rings = [];
  drains = [];
  dying = [];
  hitStop = 0;
  flavor = "none";
  flavorTimer = 0;
  savoryPulse = 0;
  elapsed = 0;
  kills = 0;
  wave = 1;
  waveTimer = 0;
  spawnTimer = 0;
  fireTimer = 0;
  mixHintShown = false;
  hitFlash = 0;
  shake = 0;
  fusionFlash = 0;
  gapT = 0;
  announce("WAVE 1", "#ffffff");
}

// ---------- Settings ----------
const SETTINGS_KEY = "mr_settings";
const OPTIONS = {
  stick: ["fixed", "anywhere"],
  side: ["left", "right"],
  size: ["small", "medium", "large"],
  sens: ["low", "medium", "high"],
  smooth: ["off", "low", "normal"],
};
const SETTING_LABELS = { stick: "joystick", side: "stick side", size: "stick size", sens: "sensitivity", smooth: "smoothing" };
const DEFAULT_SETTINGS = { stick: "fixed", side: "left", size: "medium", sens: "high", smooth: "low" };
let settings = { ...DEFAULT_SETTINGS };
try { settings = { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") }; } catch {}
function saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch {}
}
function cycleSetting(key) {
  const opts = OPTIONS[key];
  settings[key] = opts[(opts.indexOf(settings[key]) + 1) % opts.length];
  joy = null;
  saveSettings();
}
const STICK_SIZES = { small: 44, medium: 56, large: 68 }; // CSS px base radius
const SENS_THROW = { low: 40, medium: 30, high: 22 };     // CSS px drag for full speed
const SMOOTH_K = { low: 36, normal: 24 };                  // velocity smoothing rate
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

// ---------- Input ----------
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  if (e.key === "Escape" && settingsOpen) { settingsOpen = false; return; }
  if (state !== "playing" && (e.key === " " || e.key === "Enter")) start();
});
window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

// Virtual joystick, two modes:
// - "fixed" (default): a visible stick anchored bottom-left/right; only
//   touches near it move the player, so the screen stays readable.
// - "anywhere": touch any point; origin follows the thumb at full throw.
let joy = null; // {id, fixed?, ox?, oy?, dx, dy} in canvas px
function toLocal(t) {
  const dpr = DPR();
  return { x: t.clientX * dpr, y: t.clientY * dpr };
}
function toArena(p) {
  return { x: (p.x - offX) / scale, y: (p.y - offY) / scale };
}

// Taps on UI (gear icon, settings panel). Returns true if consumed.
function uiPress(p) {
  const a = toArena(p);
  if (settingsOpen) {
    for (const r of settingRects) {
      if (a.x >= r.x && a.x <= r.x + r.w && a.y >= r.y && a.y <= r.y + r.h) {
        if (r.key === "close") settingsOpen = false;
        else cycleSetting(r.key);
        return true;
      }
    }
    return true; // modal: swallow taps outside rows
  }
  if (Math.hypot(a.x - (W - 26), a.y - 30) < 26) {
    settingsOpen = true;
    joy = null;
    return true;
  }
  return false;
}

function setFixedDeflection(p) {
  const an = stickAnchor();
  joy.dx = p.x - an.x;
  joy.dy = p.y - an.y;
  const max = throwPx();
  const len = Math.hypot(joy.dx, joy.dy);
  if (len > max) {
    joy.dx *= max / len;
    joy.dy *= max / len;
  }
}

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const t = e.changedTouches[0];
  const p = toLocal(t);
  if (uiPress(p)) return;
  if (state !== "playing") { start(); return; }
  if (joy) return; // first finger owns the stick
  if (settings.stick === "fixed") {
    const an = stickAnchor();
    if (Math.hypot(p.x - an.x, p.y - an.y) <= an.r * 1.7) {
      joy = { id: t.identifier, fixed: true, dx: 0, dy: 0 };
      setFixedDeflection(p);
    }
  } else {
    joy = { id: t.identifier, ox: p.x, oy: p.y, dx: 0, dy: 0 };
  }
}, { passive: false });
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!joy) return;
  for (const t of e.changedTouches) {
    if (t.identifier !== joy.id) continue;
    const p = toLocal(t);
    if (joy.fixed) {
      setFixedDeflection(p);
    } else {
      joy.dx = p.x - joy.ox;
      joy.dy = p.y - joy.oy;
      const max = throwPx();
      const len = Math.hypot(joy.dx, joy.dy);
      if (len > max) {
        // Drag origin along behind the thumb.
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
  e.preventDefault();
  if (!joy) return;
  for (const t of e.changedTouches) {
    if (t.identifier === joy.id) joy = null;
  }
};
canvas.addEventListener("touchend", endTouch, { passive: false });
canvas.addEventListener("touchcancel", endTouch, { passive: false });
canvas.addEventListener("mousedown", (e) => {
  const dpr = DPR();
  if (uiPress({ x: e.clientX * dpr, y: e.clientY * dpr })) return;
  if (state !== "playing") start();
});

function start() {
  reset();
  state = "playing";
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
  floaters.push({ text, color, x: W / 2, y: placeFloater(W / 2, H * 0.35, size), life: 1.6, size, vy: -20 });
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
function spawnEnemy() {
  // Spawn ON the arena edge (never in the letterbox) with a short telegraph
  // before activating, so an emerging enemy can't insta-hit the player.
  const side = Math.floor(Math.random() * 4);
  const r = 13 + Math.random() * 4;
  let x, y;
  if (side === 0) { x = r + Math.random() * (W - 2 * r); y = r; }
  else if (side === 1) { x = r + Math.random() * (W - 2 * r); y = H - r; }
  else if (side === 2) { x = r; y = r + Math.random() * (H - 2 * r); }
  else { x = W - r; y = r + Math.random() * (H - 2 * r); }

  const hp = 1 + Math.floor(wave * 0.6);
  const speed = 60 + wave * 7 + Math.random() * 22;
  enemies.push({ x, y, r, hp, maxHp: hp, speed, wobble: Math.random() * Math.PI * 2, spawning: 0.7 });
}

function dropFood(x, y) {
  if (Math.random() > 0.3) return;
  const t = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
  foods.push({ x, y, r: 11, type: t, life: 8 });
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
        e.x = Math.max(e.r, Math.min(W - e.r, e.x + (dx / d) * 150));
        e.y = Math.max(e.r, Math.min(H - e.r, e.y + (dy / d) * 150));
        e.hp -= 2;
        e.flash = 0.08;
        if (e.hp <= 0) killEnemy(j);
      }
    }
  } else if (key === "savory+sweet") {
    // Maska Mend: the only healing in the game.
    if (player.hp < 3) {
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
    if (e.spawning > 0) continue;
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
  fireTimer = f.fireInterval;

  const base = Math.atan2(target.y - player.y, target.x - player.x);
  const spread = 0.22;
  for (let i = 0; i < f.shots; i++) {
    const a = base + (i - (f.shots - 1) / 2) * spread;
    bullets.push({ x: player.x, y: player.y, vx: Math.cos(a) * 420, vy: Math.sin(a) * 420, r: 4, damage: f.damage, color: f.color, life: 1.5 });
  }
}

// Shared kill path: score, burst, corpse dissolve, drop, remove.
function killEnemy(j) {
  const e = enemies[j];
  kills++;
  burst(e.x, e.y, "#8d93a5", 8, 90);
  dying.push({ x: e.x, y: e.y, r: e.r, life: 0.22 });
  dropFood(e.x, e.y);
  enemies.splice(j, 1);
}

// ---------- Update ----------
function update(dt) {
  if (settingsOpen) return; // settings panel pauses the game
  // Hit-stop: a few frozen frames on big moments.
  if (hitStop > 0) { hitStop -= dt; return; }
  elapsed += dt;

  // Waves, with a 3s breather between them.
  if (gapT > 0) {
    gapT -= dt;
    if (gapT <= 0) {
      wave++;
      waveTimer = 0;
      announce("WAVE " + wave, "#ffffff");
    }
  } else {
    waveTimer += dt;
    if (waveTimer > 20) {
      gapT = 3;
      announce("wave cleared!", "#9aa0b0", 22);
    }
  }

  // Spawning accelerates with waves (paused during the breather).
  if (gapT <= 0) {
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnTimer = Math.max(0.2, 0.9 - wave * 0.12);
      spawnEnemy();
    }
  }

  // Flavor decay.
  if (flavor !== "none") {
    flavorTimer -= dt;
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
    const max = throwPx();
    const len = Math.hypot(joy.dx, joy.dy);
    if (len > 4 * DPR()) {
      const c = Math.min(len, max) / max;
      mx = (joy.dx / len) * c;
      my = (joy.dy / len) * c;
    }
  }
  const ml = Math.hypot(mx, my);
  if (ml > 1) { mx /= ml; my /= ml; }
  player.moving = ml > 0.01;
  if (mx > 0.1) player.face = 1;
  else if (mx < -0.1) player.face = -1;
  const spd = player.speed * FLAVORS[flavor].speedMult;
  // Exponential velocity smoothing: irons out touch-sampling jitter and
  // gives starts/stops a frame or two of ease. User-tunable; "off" = raw.
  const smooth = settings.smooth === "off" ? 1 : 1 - Math.exp(-dt * SMOOTH_K[settings.smooth]);
  player.vx += (mx * spd - player.vx) * smooth;
  player.vy += (my * spd - player.vy) * smooth;
  player.x = Math.max(player.r, Math.min(W - player.r, player.x + player.vx * dt));
  player.y = Math.max(player.r, Math.min(H - player.r, player.y + player.vy * dt));
  if (player.iframes > 0) player.iframes -= dt;

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
          e.x = Math.max(e.r, Math.min(W - e.r, e.x + (dx / d) * 80));
          e.y = Math.max(e.r, Math.min(H - e.r, e.y + (dy / d) * 80));
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
    if (b.life <= 0 || b.x < -20 || b.x > W + 20 || b.y < -20 || b.y > H + 20) {
      bullets.splice(i, 1);
      continue;
    }
    for (let j = enemies.length - 1; j >= 0; j--) {
      const e = enemies[j];
      if (e.spawning > 0) continue;
      const rr = b.r + e.r;
      if (dist2(b, e) < rr * rr) {
        e.hp -= b.damage;
        e.flash = 0.08;
        bullets.splice(i, 1);
        if (e.hp <= 0) killEnemy(j);
        break;
      }
    }
  }

  // Enemies chase player (once fully emerged).
  for (const e of enemies) {
    if (e.spawning > 0) { e.spawning -= dt; continue; }
    const a = Math.atan2(player.y - e.y, player.x - e.x);
    e.wobble += dt * 6;
    e.x += Math.cos(a) * e.speed * dt;
    e.y += Math.sin(a) * e.speed * dt;
    if (e.flash > 0) e.flash -= dt;

    // They drain the street's color where they walk.
    e.drainT = (e.drainT || 0) - dt;
    if (e.drainT <= 0) {
      e.drainT = 0.5 + Math.random() * 0.4;
      drains.push({ x: e.x, y: e.y, r: e.r * 1.7, life: 3 });
      if (drains.length > 90) drains.shift();
    }

    const rr = e.r + player.r;
    if (player.iframes <= 0 && dist2(e, player) < rr * rr) {
      if (player.shield > 0) {
        // Savory shield absorbs the hit.
        player.shield = 0;
        player.iframes = 1.2;
        rings.push({ x: player.x, y: player.y, r: 18, maxR: 60, life: 0.3, color: FLAVORS.savory.color });
        burst(player.x, player.y, FLAVORS.savory.color, 10, 120);
        smallText("shield!", FLAVORS.savory.color, player.x, player.y - 26);
      } else {
        player.hp--;
        player.iframes = 1.2;
        hitFlash = 0.25;
        shake = 0.25;
        hitStop = 0.05;
        burst(player.x, player.y, "#ff5a3c", 12, 140);
        if (player.hp <= 0) {
          state = "gameover";
          bestTime = Math.max(bestTime, elapsed);
        }
      }
    }
  }

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

  // Arena: pre-rendered night street.
  ctx.drawImage(bgCanvas, 0, 0);

  if (state === "menu") {
    drawMenu();
    if (settingsOpen) drawSettings();
    return;
  }

  // Everything in the arena clips to it — nothing renders in the letterbox.
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, W, H);
  ctx.clip();

  const now = performance.now() / 1000;

  // Drained patches where the Bland have walked.
  for (const d of drains) {
    ctx.globalAlpha = Math.min(1, d.life / 3) * 0.14;
    ctx.drawImage(drainSprite, d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
  }
  ctx.globalAlpha = 1;

  // Foods: bobbing emoji on a pulsing glow.
  for (const fd of foods) {
    const blink = fd.life < 2 && Math.floor(fd.life * 6) % 2 === 0;
    if (blink) continue;
    const bob = Math.sin(now * 4 + fd.x) * 3;
    ctx.globalAlpha = 0.8 + Math.sin(now * 6 + fd.y) * 0.2;
    ctx.drawImage(glowSprite(fd.type.color), fd.x - 24, fd.y + bob - 24, 48, 48);
    ctx.globalAlpha = 1;
    ctx.drawImage(FOOD_SPRITES[fd.type.flavor], fd.x - 20, fd.y + bob - 20);
  }

  // Bullets: glow sprites.
  for (const b of bullets) {
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
      // Emerging telegraph: a closing ring + materializing blob.
      const p = 1 - e.spawning / 0.7;
      ctx.strokeStyle = "rgba(140, 146, 165, " + (0.3 + p * 0.5) + ")";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r + 5, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p);
      ctx.stroke();
      ctx.globalAlpha = 0.4 * p;
      ctx.fillStyle = "#6e7280";
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r * p, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      continue;
    }
    ctx.drawImage(auraSprite, e.x - e.r * 3, e.y - e.r * 3, e.r * 6, e.r * 6);
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
    if (e.hp < e.maxHp) {
      ctx.fillStyle = "#3a3a48";
      ctx.fillRect(e.x - 12, e.y - e.r - 8, 24, 3);
      ctx.fillStyle = "#d65a4a";
      ctx.fillRect(e.x - 12, e.y - e.r - 8, 24 * (e.hp / e.maxHp), 3);
    }
  }

  // Player — colored by current flavor.
  const f = FLAVORS[flavor];
  const blinking = player.iframes > 0 && Math.floor(player.iframes * 10) % 2 === 0;
  if (!blinking) {
    const bob = player.moving ? Math.sin(now * 14) * 2 : Math.sin(now * 3) * 1;
    const py = player.y + bob;
    // Flavor glow underfoot.
    ctx.globalAlpha = 0.5;
    ctx.drawImage(glowSprite(f.color), player.x - 30, py - 30, 60, 60);
    ctx.globalAlpha = 1;
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
    if (player.shield > 0) {
      ctx.strokeStyle = FLAVORS.savory.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(player.x, py, player.r + 6, 0, Math.PI * 2);
      ctx.stroke();
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
  ctx.drawImage(vignette, 0, 0);
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

  // Joystick.
  if (state === "playing" && !settingsOpen) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (settings.stick === "fixed") {
      // Anchored stick: always visible, dims when idle.
      const an = stickAnchor();
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.beginPath();
      ctx.arc(an.x, an.y, an.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = joy ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();
      const max = throwPx();
      let kx = an.x, ky = an.y;
      if (joy) {
        const len = Math.hypot(joy.dx, joy.dy) || 1;
        const cap = Math.min(len, max);
        kx += (joy.dx / len) * (cap / max) * an.r * 0.55;
        ky += (joy.dy / len) * (cap / max) * an.r * 0.55;
      }
      ctx.fillStyle = joy ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.16)";
      ctx.beginPath();
      ctx.arc(kx, ky, an.r * 0.42, 0, Math.PI * 2);
      ctx.fill();
    } else if (joy) {
      // Touch-anywhere indicator.
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(joy.ox, joy.oy, throwPx(), 0, Math.PI * 2);
      ctx.stroke();
      const len = Math.hypot(joy.dx, joy.dy) || 1;
      const cap = Math.min(len, throwPx());
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.beginPath();
      ctx.arc(joy.ox + (joy.dx / len) * cap, joy.oy + (joy.dy / len) * cap, 18, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (settingsOpen) {
    ctx.setTransform(scale, 0, 0, scale, offX, offY);
    drawSettings();
  }
}

function drawHUD() {
  // Hearts.
  for (let i = 0; i < 3; i++) {
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
  ctx.fillText("kills " + kills + "  ·  wave " + wave, W - 52, 28);
  drawGear();

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
  ctx.fillStyle = "#e8e8f0";
  ctx.font = "22px " + COMIC_FONT;
  ctx.fillText("tap / space to start", W / 2, H * 0.68);
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
}

function drawSettings() {
  ctx.fillStyle = "rgba(10, 10, 16, 0.8)";
  ctx.fillRect(0, 0, W, H);
  settingRects = [];

  ctx.textAlign = "center";
  ctx.font = "36px " + COMIC_FONT;
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 6;
  ctx.strokeText("SETTINGS", W / 2, 170);
  ctx.fillStyle = "#ffb347";
  ctx.fillText("SETTINGS", W / 2, 170);
  ctx.font = "12px sans-serif";
  ctx.fillStyle = "#8d93a5";
  ctx.fillText("tap a row to change · applies instantly", W / 2, 198);

  const cardX = 52, cardW = W - 104;
  let y = 236;
  for (const key of Object.keys(OPTIONS)) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fillRect(cardX, y, cardW, 46);
    ctx.textAlign = "left";
    ctx.font = "15px sans-serif";
    ctx.fillStyle = "#e8e8f0";
    ctx.fillText(SETTING_LABELS[key], cardX + 16, y + 29);
    ctx.textAlign = "right";
    ctx.font = "bold 15px sans-serif";
    ctx.fillStyle = "#ffb347";
    ctx.fillText(settings[key], cardX + cardW - 16, y + 29);
    settingRects.push({ x: cardX, y, w: cardW, h: 46, key });
    y += 56;
  }

  const bw = 170, bh = 50, bx = (W - bw) / 2, by = y + 18;
  ctx.fillStyle = "#ffb347";
  ctx.fillRect(bx, by, bw, bh);
  ctx.textAlign = "center";
  ctx.font = "24px " + COMIC_FONT;
  ctx.fillStyle = "#14141c";
  ctx.fillText("DONE", W / 2, by + 34);
  settingRects.push({ x: bx, y: by, w: bw, h: bh, key: "close" });

  if (state === "playing") {
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#8d93a5";
    ctx.fillText("game paused", W / 2, by + bh + 30);
  }
}

function drawGameOver() {
  ctx.fillStyle = "rgba(20, 20, 28, 0.8)";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#e8e8f0";
  ctx.textAlign = "center";
  ctx.font = "bold 34px sans-serif";
  ctx.fillText("FLAVORLESS", W / 2, H * 0.38);
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#9aa0b0";
  ctx.fillText("survived " + elapsed.toFixed(1) + "s  ·  " + kills + " kills  ·  wave " + wave, W / 2, H * 0.45);
  if (bestTime > 0) ctx.fillText("best " + bestTime.toFixed(1) + "s", W / 2, H * 0.49);
  ctx.fillText("recipes " + discovered.size + "/" + Object.keys(RECIPES).length, W / 2, H * 0.525);
  ctx.fillStyle = "#ffb347";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText("tap / space to retry", W / 2, H * 0.58);
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
  get layout() { return { offX, offY, scale, dpr: DPR() }; },
  // Deterministic step for testing (rAF pauses in background tabs).
  tick(dt) { if (state === "playing") update(dt); },
};

// ---------- Main loop ----------
let last = performance.now();
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (state === "playing") update(dt);
  draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

})();
