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
    buildBackdrop();
    if ((W !== pw || H !== ph) && player) clampToArena(); // keep entities in bounds
    if (W !== pw || H !== ph) buildBarriers(); // barrier rects are W/H-relative
  }
  scale = Math.min(canvas.width / W, canvas.height / H);
  offX = (canvas.width - W * scale) / 2;
  offY = (canvas.height - H * scale) / 2;
}
window.addEventListener("resize", resize);
window.addEventListener("orientationchange", resize);
if (window.visualViewport) window.visualViewport.addEventListener("resize", resize);

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

// Night street, drawn in portrait space (w = short side, h = long side).
function drawStreet(g, w, h) {
  const base = g.createLinearGradient(0, 0, 0, h);
  base.addColorStop(0, "#191923");
  base.addColorStop(1, "#14141d");
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);
  // Footpaths + curbs.
  g.fillStyle = "#1f1f2b";
  g.fillRect(0, 0, 42, h);
  g.fillRect(w - 42, 0, 42, h);
  g.fillStyle = "#262634";
  g.fillRect(40, 0, 3, h);
  g.fillRect(w - 43, 0, 3, h);
  // Centre lane dashes.
  g.fillStyle = "#23232f";
  for (let y = 20; y < h; y += 64) g.fillRect(w / 2 - 3, y, 6, 34);
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
  stall(w - 36, 330);
  stall(w - 36, 720);
  g.fillStyle = "#242433";
  g.fillRect(4, 420, 18, 18);
  g.fillRect(w - 24, 80, 18, 18);
  g.fillStyle = "rgba(255, 255, 255, 0.05)";
  for (let i = 0; i < 6; i++) g.fillRect(58 + i * 64, h - 90, 36, 44);
}

// Backdrop + vignette at the current arena size. In landscape the portrait
// street is rotated 90° — footpaths land on the top/bottom edges.
function buildBackdrop() {
  bgCanvas = makeSprite(W, H, (g) => {
    if (W > H) {
      g.translate(W, 0);
      g.rotate(Math.PI / 2);
    }
    drawStreet(g, Math.min(W, H), Math.max(W, H));
  });
  vignette = makeSprite(W, H, (g) => {
    const grad = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.45, W / 2, H / 2, Math.max(W, H) * 0.72);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.4)");
    g.fillStyle = grad;
    g.fillRect(0, 0, W, H);
  });
}

// After an orientation swap the arena bounds change — pull anything live
// back inside so nothing is stranded in the letterbox.
function clampToArena() {
  if (!player) return;
  const cl = (o) => {
    const r = o.r || 14;
    o.x = Math.max(r, Math.min(W - r, o.x));
    o.y = Math.max(r, Math.min(H - r, o.y));
  };
  cl(player);
  for (const e of enemies) cl(e);
  for (const f of foods) cl(f);
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

// ---------- Tuning config (internal) ----------
// Every difficulty/pacing knob lives here — tweak without touching logic.
// Live-tunable on a device via __mr.config (e.g. __mr.config.waveLength = 15).
const CONFIG = {
  waveLength: 20,      // seconds per wave
  breather: 3,         // pause between waves
  scalingCapWave: 5,   // enemy stats & spawn rate stop growing here —
                       // later waves get harder via enemy MIX, not stat sponges
  spawnBase: 0.9,      // spawn interval curve: base - wave*perWave, floored
  spawnPerWave: 0.12,
  spawnFloor: 0.2,
  foodLife: 8,
  // Re-entry ease: the wave(s) after a boss come in softer, not at full
  // capped intensity right after the calm duel. easeWaves:2 keeps BOTH waves
  // 6 & 7 (after the wave-5 mini-boss) gentle — this is the first level.
  postBoss: { easeWaves: 2, spawnMul: 1.8, breather: 4.5 },
  // A level = 8 waves. Wave 5 = mini-boss, wave 8 = main boss → next level.
  wavesPerLevel: 8,
  // Per-level difficulty (marginal step-up). TWO levers, both config-driven:
  //  1) enemies — hpMul / spdMul / spawnMul (spawnMul < 1 = faster spawns)
  //  2) barriers — static blocks in the arena (fractions of W×H, top-left x/y)
  // FOCUS: Level 1 is the clean, fully-testable level (no barriers). Later
  // levels exist as provision — same 8-wave content, nudged harder.
  levels: [
    { hpMul: 1.00, spdMul: 1.00, spawnMul: 1.00, barriers: [] },
    { hpMul: 1.08, spdMul: 1.05, spawnMul: 0.94, barriers: [] },
    { hpMul: 1.16, spdMul: 1.10, spawnMul: 0.90, barriers: [ { x: 0.30, y: 0.42, w: 0.12, h: 0.12 }, { x: 0.58, y: 0.42, w: 0.12, h: 0.12 } ] },
    { hpMul: 1.24, spdMul: 1.14, spawnMul: 0.86, barriers: [ { x: 0.18, y: 0.30, w: 0.14, h: 0.10 }, { x: 0.68, y: 0.58, w: 0.14, h: 0.10 } ] },
    { hpMul: 1.32, spdMul: 1.18, spawnMul: 0.83, barriers: [ { x: 0.42, y: 0.28, w: 0.16, h: 0.10 }, { x: 0.42, y: 0.62, w: 0.16, h: 0.10 } ] },
    { hpMul: 1.40, spdMul: 1.22, spawnMul: 0.80, barriers: [ { x: 0.20, y: 0.45, w: 0.12, h: 0.12 }, { x: 0.44, y: 0.45, w: 0.12, h: 0.12 }, { x: 0.68, y: 0.45, w: 0.12, h: 0.12 } ] },
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
    rush: { eats: 10, dur: 6, speedMul: 1.25 },        // MASALA RUSH: freeze Blands + flavor-lock + speed
    slam: { kills: 28, burst: 24, dmg: 3, slowmo: 0.4, slowmoDur: 1.1 }, // THALI SLAM: slow-mo tri-flavor screen-clear
  },
  // Boss-kill boons: pick 1 of 3 (drawn from this pool). Small on purpose.
  boons: [
    { id: "shots", name: "DOUBLE TADKA", desc: "+1 shot every volley" },
    { id: "heart", name: "GHEE ARMOR", desc: "+1 heart (now and max)" },
    { id: "drain", name: "CHAAT TIMING", desc: "flavor fades 20% slower" },
    { id: "speed", name: "MASALA LEGS", desc: "+10% move speed" },
    { id: "fire", name: "QUICK FRY", desc: "attack 12% faster" },
  ],
};

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
let bossFight, bossFoodT, bossFoodEvery; // boss wave: spawns + wave timer pause
let level;       // level currently being played (1-based)
let barriers = []; // active barrier rects (pixels) for the current level
let lastBossWave; // wave a boss was fought on → next wave(s) ease in
let boonChoices = null;   // [3 boon defs] while the pick screen is open
let boons, mods;          // picked boon ids + derived multipliers
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

function reset() {
  // Base speed = the old Sweet speed (205 × 1.35): the "jalebi feel" is now
  // the default; flavors no longer buff movement, savory still trades a bit.
  // imx/imy = smoothed INPUT direction (filtered stick), not velocity.
  player = { x: W / 2, y: H / 2, r: 14, hp: 3, maxHp: 3, iframes: 0, speed: 277, shield: 0, face: 1, vx: 0, vy: 0, imx: 0, imy: 0 };
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
  resumeT = 0;
  bossFight = false;
  bossFoodT = 0;
  level = nomMode ? 1 : startLevelNum; // play the chosen / resumed level
  buildBarriers();
  lastBossWave = 0;
  boonChoices = null;
  boons = [];
  mods = { shots: 0, drain: 1, speed: 1, fire: 1 };
  rushCharge = 0;
  slamCharge = 0;
  rushActive = 0;
  slowmoT = 0;
  nomWon = false;
  if (nomMode) nomReset();
  else announce("WAVE 1", "#ffffff");
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
const DEFAULT_SETTINGS = { difficulty: "normal", stick: "anywhere", side: "left", size: "medium", sens: "high", smooth: "low", power: "manual", music: "on", fps: "off", nom: "off" };

// Difficulty scales the core knobs. spawn>1 = slower spawns (easier).
const DIFFICULTY = {
  easy:   { spawn: 1.4, spd: 0.85, hp: 0.8, boss: 0.78 },
  normal: { spawn: 1.0, spd: 1.0, hp: 1.0, boss: 1.0 },
  hard:   { spawn: 0.82, spd: 1.12, hp: 1.2, boss: 1.25 },
};
function diff() { return DIFFICULTY[settings.difficulty] || DIFFICULTY.normal; }

// ---------- Levels & progress ----------
const PROGRESS_KEY = "mr_progress";
const MAX_LEVEL = CONFIG.levels.length;
let unlockedLevel = 1; // highest playable level; clearing one unlocks the next
try { unlockedLevel = Math.min(MAX_LEVEL, Math.max(1, JSON.parse(localStorage.getItem(PROGRESS_KEY) || "1") | 0)); } catch {}
let startLevelNum = unlockedLevel; // reset() plays this; defaults to the frontier (auto-resume)
function saveProgress() { try { localStorage.setItem(PROGRESS_KEY, String(unlockedLevel)); } catch {} }
function lvl() { return CONFIG.levels[Math.min(level - 1, MAX_LEVEL - 1)]; }
// Barriers are stored as fractions of W×H; bake to pixel rects per level.
function buildBarriers() {
  if (!level || nomMode) { barriers = []; return; }
  const defs = lvl().barriers || [];
  barriers = defs.map((b) => ({ x: b.x * W, y: b.y * H, w: b.w * W, h: b.h * H }));
}
// Push the player circle out of any barrier it overlaps. Barriers block the
// player and bullets; the Bland are ethereal and drift through them.
function resolveBarriers() {
  for (const b of barriers) {
    const cx = Math.max(b.x, Math.min(player.x, b.x + b.w));
    const cy = Math.max(b.y, Math.min(player.y, b.y + b.h));
    const dx = player.x - cx, dy = player.y - cy;
    const d2 = dx * dx + dy * dy;
    if (d2 >= player.r * player.r) continue;
    const d = Math.sqrt(d2);
    if (d < 0.0001) { // center inside the rect → eject along the nearest edge
      const left = player.x - b.x, right = b.x + b.w - player.x;
      const top = player.y - b.y, bot = b.y + b.h - player.y;
      const m = Math.min(left, right, top, bot);
      if (m === left) player.x = b.x - player.r;
      else if (m === right) player.x = b.x + b.w + player.r;
      else if (m === top) player.y = b.y - player.r;
      else player.y = b.y + b.h + player.r;
    } else {
      const push = player.r - d;
      player.x += (dx / d) * push;
      player.y += (dy / d) * push;
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
  joy = null;
  saveSettings();
}
const STICK_SIZES = { small: 44, medium: 56, large: 68 }; // CSS px base radius
const SENS_THROW = { low: 34, medium: 25, high: 18 };     // CSS px drag for full speed
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
    { key: "rush", frac: Math.min(1, rushCharge / CONFIG.powers.rush.eats), ready: rushReady(), color: "#ffd24a", glyph: "❄",
      active: rushActive > 0, activeFrac: rushActive > 0 ? rushActive / CONFIG.powers.rush.dur : 0 },
    { key: "slam", frac: Math.min(1, slamCharge / CONFIG.powers.slam.kills), ready: slamReady(), color: "#ff5a3c", glyph: "✦",
      active: false, activeFrac: 0 },
  ];
  const btns = powerButtons();
  for (const b of btns) {
    const d = defs.find((x) => x.key === b.key);
    ctx.textAlign = "center";
    ctx.font = Math.round(b.r * 0.9) + "px sans-serif";

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
  if (e.key === "Escape" && (state === "gameover" || state === "levelclear")) { state = "levels"; return; }
  if (boonChoices && (e.key === "1" || e.key === "2" || e.key === "3")) { pickBoon(+e.key - 1); return; }
  if (e.key === "m" || e.key === "M") { setMuted(!muted); sfx.ui(); return; }
  if (state === "playing") {
    if (e.key === "q" || e.key === "Q") { triggerRush(); return; }
    if (e.key === "e" || e.key === "E") { triggerSlam(); return; }
  }
  if (state !== "playing" && (e.key === " " || e.key === "Enter")) {
    if (state === "menu") { if (settings.nom === "on") start(); else state = "levels"; }
    else if (state === "levels") startLevel(unlockedLevel);
    else if (state === "levelclear") state = "levels";
    else start(); // gameover → replay current level
  }
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

// Closing settings mid-run gives a 3s countdown before action resumes.
function closeSettings() {
  settingsOpen = false;
  if (state === "playing") resumeT = 3;
}

function pickBoon(i) {
  applyBoon(boonChoices[i]);
  boonChoices = null;
  gapT = CONFIG.postBoss.breather; // a longer breather after the boss before wave resumes
  sfx.ui();
  if (navigator.vibrate) navigator.vibrate(10);
}

// Main boss down → level complete. Unlock the next level, show the clear
// screen (no boon — next level starts fresh). New-level content is TBD.
function clearLevel() {
  if (level >= unlockedLevel && unlockedLevel < MAX_LEVEL) {
    unlockedLevel = level + 1;
    startLevelNum = unlockedLevel; // auto-resume points at the new frontier
    saveProgress();
  }
  bestTime = Math.max(bestTime, elapsed);
  state = "levelclear";
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
          joy = null;
        } else cycleSetting(r.key);
        return true;
      }
    }
    return true; // modal: swallow taps outside rows
  }
  if (Math.hypot(a.x - (W - 26), a.y - 30) < 26) {
    settingsOpen = true;
    joy = null;
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
  ensureAudio(); // first touch unlocks audio on mobile
  const t = e.changedTouches[0];
  const p = toLocal(t);
  if (uiPress(p)) return;
  if (state === "gameover") { gameOverPress(p); return; }
  if (state === "levelclear") { sfx.ui(); state = "levels"; return; }
  if (state === "menu") { sfx.ui(); if (settings.nom === "on") start(); else state = "levels"; return; }
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
  ensureAudio();
  const dpr = DPR();
  const p = { x: e.clientX * dpr, y: e.clientY * dpr };
  if (uiPress(p)) return;
  if (state === "gameover") { gameOverPress(p); return; }
  if (state === "levelclear") { sfx.ui(); state = "levels"; return; }
  if (state === "menu") { sfx.ui(); if (settings.nom === "on") start(); else state = "levels"; return; }
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
      else state = "levels";
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
// Stats freeze at scalingCapWave — late waves escalate via mix, not sponges.
function effWave() { return Math.min(wave, CONFIG.scalingCapWave); }

function spawnPoint(r) {
  // ON the arena edge (never in the letterbox).
  const side = Math.floor(Math.random() * 4);
  if (side === 0) return { x: r + Math.random() * (W - 2 * r), y: r };
  if (side === 1) return { x: r + Math.random() * (W - 2 * r), y: H - r };
  if (side === 2) return { x: r, y: r + Math.random() * (H - 2 * r) };
  return { x: W - r, y: r + Math.random() * (H - 2 * r) };
}

function makeEnemy(type, x, y) {
  const c = CONFIG.enemies[type];
  const d = diff();
  const w = effWave();
  const L = lvl();
  const r = c.rMin + Math.random() * (c.rMax - c.rMin);
  const hp = Math.max(1, Math.round((c.hpBase + Math.floor(w * c.hpPerWave)) * d.hp * L.hpMul));
  return {
    type, x, y, r, hp, maxHp: hp,
    speed: (c.spdBase + w * c.spdPerWave + Math.random() * c.spdRand) * d.spd * L.spdMul,
    wobble: Math.random() * Math.PI * 2,
    spawning: c.telegraph, spawnDur: c.telegraph,
  };
}

// One spawn EVENT: a lone bland, or a swarmer pack (same edge point, jittered).
function spawnEnemy() {
  const share = CONFIG.swarmerShare[Math.min(wave - 1, CONFIG.swarmerShare.length - 1)];
  if (Math.random() < share) {
    const c = CONFIG.enemies.swarmer;
    const n = c.packMin + Math.floor(Math.random() * (c.packMax - c.packMin + 1));
    const p = spawnPoint(c.rMax);
    for (let i = 0; i < n; i++) {
      const e = makeEnemy("swarmer",
        Math.max(c.rMax, Math.min(W - c.rMax, p.x + (Math.random() - 0.5) * 52)),
        Math.max(c.rMax, Math.min(H - c.rMax, p.y + (Math.random() - 0.5) * 52)));
      enemies.push(e);
    }
  } else {
    const p = spawnPoint(CONFIG.enemies.bland.rMax);
    enemies.push(makeEnemy("bland", p.x, p.y));
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
  const c = main ? CONFIG.mainBoss : CONFIG.boss;
  bossFoodEvery = c.foodEvery;
  bossFoodT = c.foodEvery;
  const bhp = Math.round(c.hp * diff().boss * lvl().hpMul);
  enemies.push({
    type: "boss", boss: true, main: !!main,
    x: W / 2, y: c.r, r: c.r,
    hp: bhp, maxHp: bhp, speed: c.speed,
    wobble: Math.random() * Math.PI * 2,
    spawning: c.telegraph, spawnDur: c.telegraph,
    bossState: "stalk", stateT: 0, chargeT: c.chargeEvery,
    cvx: 0, cvy: 0,
    // per-boss tuning carried on the entity (updateBoss/killEnemy read these)
    chargeEvery: c.chargeEvery, chargeWindup: c.chargeWindup,
    chargeSpeed: c.chargeSpeed, chargeDur: c.chargeDur, recover: c.recover,
    deathDrops: c.deathDrops,
    name: main ? "THE BLAND MAHARAJA" : "THE BLANDFATHER",
    addEvery: main ? c.addEvery : 0, addT: main ? c.addEvery : 0,
  });
  announce(main ? "THE BLAND MAHARAJA" : "THE BLANDFATHER", main ? "#ff8c3c" : "#e8e8f0");
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
    if (e.x <= e.r || e.x >= W - e.r || e.y <= e.r || e.y >= H - e.r || e.stateT <= 0) {
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
  e.x = Math.max(e.r, Math.min(W - e.r, e.x));
  e.y = Math.max(e.r, Math.min(H - e.r, e.y));
}

function applyBoon(b) {
  boons.push(b.id);
  if (b.id === "shots") mods.shots += 1;
  else if (b.id === "heart") { player.maxHp += 1; player.hp += 1; }
  else if (b.id === "drain") mods.drain *= 0.8;
  else if (b.id === "speed") mods.speed *= 1.1;
  else if (b.id === "fire") mods.fire *= 0.88;
  announce(b.name + "!", "#ffb347", 26);
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
          e.y = Math.max(e.r, Math.min(H - e.r, e.y + (dy / d) * 150));
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
  fireTimer = f.fireInterval * mods.fire;
  sfx.shoot(); // once per volley, not per pellet

  const base = Math.atan2(target.y - player.y, target.x - player.x);
  const spread = 0.22;
  const shots = f.shots + mods.shots;
  for (let i = 0; i < shots; i++) {
    const a = base + (i - (shots - 1) / 2) * spread;
    bullets.push({ x: player.x, y: player.y, vx: Math.cos(a) * 420, vy: Math.sin(a) * 420, r: 4, damage: f.damage, color: f.color, life: 1.5 });
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
    enemies.splice(j, 1);
    burst(e.x, e.y, e.main ? "#ff8c3c" : "#8d93a5", e.main ? 40 : 26, e.main ? 200 : 170);
    dying.push({ x: e.x, y: e.y, r: e.r, life: 0.4 });
    const drops = e.deathDrops || 2;
    for (let i = 0; i < drops; i++) {
      const t = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
      foods.push({ x: e.x + (i - (drops - 1) / 2) * 34, y: e.y, r: 11, type: t, life: CONFIG.foodLife });
    }
    shake = e.main ? 0.55 : 0.45;
    hitStop = 0.12;
    fusionFlash = e.main ? 0.3 : 0.2;
    sfx.bossDown();
    if (e.main) {
      clearLevel(); // finale: no boon — every level starts with a fresh setup
    } else {
      // Mini-boss reward: pick 1 of 3 boons (lasts the rest of THIS level only).
      const pool = [...CONFIG.boons].sort(() => Math.random() - 0.5);
      boonChoices = pool.slice(0, 3);
    }
    return;
  }
  sfx.kill();
  burst(e.x, e.y, "#8d93a5", 8, 90);
  dying.push({ x: e.x, y: e.y, r: e.r, life: 0.22 });
  dropFood(e.x, e.y, e.type);
  enemies.splice(j, 1);
  chargeSlam();
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
  const cols = ["#ff5a3c", "#ffb347", "#3ecf8e"];
  const n = CONFIG.powers.slam.burst;
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2;
    bullets.push({ x: player.x, y: player.y, vx: Math.cos(ang) * 460, vy: Math.sin(ang) * 460, r: 7, damage: CONFIG.powers.slam.dmg, color: cols[i % 3], life: 1.4 });
  }
  rings.push({ x: player.x, y: player.y, r: 20, maxR: 320, life: 0.45, color: "#ffffff" });
  announce("THALI SLAM!", "#ffffff", 30);
  fusionFlash = 0.3;
  shake = 0.4;
  sfx.bossDown();
  if (navigator.vibrate) navigator.vibrate(20);
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
  if (boonChoices) return;  // boon pick screen pauses the game
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

  if (nomMode) {
    updateNom(dt);
  } else {
  // Waves, with a breather between them.
  if (gapT > 0) {
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
  if (gapT <= 0 && !bossFight) {
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      // Ease the first wave(s) after a boss: slower spawns than the cap.
      const postEase = (lastBossWave > 0 && wave > lastBossWave && wave <= lastBossWave + CONFIG.postBoss.easeWaves) ? CONFIG.postBoss.spawnMul : 1;
      spawnTimer = Math.max(CONFIG.spawnFloor, CONFIG.spawnBase - effWave() * CONFIG.spawnPerWave) * diff().spawn * postEase * lvl().spawnMul;
      spawnEnemy();
    }
  }

  // Boss fight: guaranteed food cadence — the eat-loop must never starve.
  if (bossFight) {
    bossFoodT -= dt;
    if (bossFoodT <= 0) {
      bossFoodT = bossFoodEvery;
      const t = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)];
      foods.push({
        x: 60 + Math.random() * (W - 120),
        y: H * 0.3 + Math.random() * H * 0.4,
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
    const max = throwPx();
    const len = Math.hypot(joy.dx, joy.dy);
    if (len > 3 * DPR()) {
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
  const spd = player.speed * FLAVORS[flavor].speedMult * mods.speed * (rushActive > 0 ? CONFIG.powers.rush.speedMul : 1);
  // Smooth the INPUT direction (0..1 vector), not the velocity. Filtering
  // the small normalized stick vector kills touch jitter with far less
  // perceived lag than ramping the full velocity each flick. "off" = raw.
  const k = settings.smooth === "off" ? 1 : 1 - Math.exp(-dt * SMOOTH_K[settings.smooth]);
  player.imx += (mx - player.imx) * k;
  player.imy += (my - player.imy) * k;
  player.vx = player.imx * spd;
  player.vy = player.imy * spd;
  player.x = Math.max(player.r, Math.min(W - player.r, player.x + player.vx * dt));
  player.y = Math.max(player.r, Math.min(H - player.r, player.y + player.vy * dt));
  if (barriers.length) resolveBarriers();
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
          if (!e.boss) {
            e.x = Math.max(e.r, Math.min(W - e.r, e.x + (dx / d) * 80));
            e.y = Math.max(e.r, Math.min(H - e.r, e.y + (dy / d) * 80));
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
    if (b.life <= 0 || b.x < -20 || b.x > W + 20 || b.y < -20 || b.y > H + 20) {
      bullets.splice(i, 1);
      continue;
    }
    if (barriers.length && bulletHitsBarrier(b.x, b.y)) { bullets.splice(i, 1); continue; }
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
      e.x += Math.cos(a) * e.speed * dt;
      e.y += Math.sin(a) * e.speed * dt;
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
    if (!e.harmless && player.iframes <= 0 && dist2(e, player) < rr * rr) {
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
        hitFlash = 0.25;
        shake = 0.25;
        hitStop = 0.05;
        burst(player.x, player.y, "#ff5a3c", 12, 140);
        if (player.hp <= 0) {
          state = "gameover";
          bestTime = Math.max(bestTime, elapsed);
          sfx.death();
        } else {
          sfx.hit();
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

  const now = performance.now() / 1000;

  // Drained patches where the Bland have walked.
  for (const d of drains) {
    ctx.globalAlpha = Math.min(1, d.life / 3) * 0.14;
    ctx.drawImage(drainSprite, d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
  }
  ctx.globalAlpha = 1;

  // Barriers: solid crates the player & bullets can't pass (later levels).
  for (const b of barriers) {
    ctx.fillStyle = "#23232e";
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(b.x, b.y, b.w, 4); // top highlight
    ctx.strokeStyle = "rgba(141,147,165,0.55)";
    ctx.lineWidth = 2;
    ctx.strokeRect(b.x + 1, b.y + 1, b.w - 2, b.h - 2);
  }

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
      const p = 1 - e.spawning / e.spawnDur;
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
    if (e.boss) {
      drawBoss(e);
      continue;
    }
    if (e.type === "nom") { drawNom(e); continue; }
    if (e.type === "coin") { drawCoin(e); continue; }
    if (e.type === "swarmer" || e.type === "nibbler") {
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
  if (state === "levelclear") drawLevelClear();

  // Joystick.
  if (state === "playing" && !settingsOpen) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const flavorColor = FLAVORS[flavor].color;
    if (settings.stick === "fixed") {
      // Anchored stick: always visible, brightens when held.
      const an = stickAnchor();
      const base = joyBaseSprite(an.r);
      ctx.globalAlpha = joy ? 0.55 : 0.32; // transparent so it occludes less
      ctx.drawImage(base, an.x - base.width / 2, an.y - base.height / 2);
      const max = throwPx();
      let kx = an.x, ky = an.y;
      if (joy) {
        const len = Math.hypot(joy.dx, joy.dy) || 1;
        const cap = Math.min(len, max);
        kx += (joy.dx / len) * (cap / max) * an.r * 0.55;
        ky += (joy.dy / len) * (cap / max) * an.r * 0.55;
      }
      const knob = joyKnobSprite(an.r * 0.42);
      ctx.drawImage(knob, kx - knob.width / 2, ky - knob.height / 2);
      if (joy) {
        // Flavor-colored ring while steering.
        ctx.strokeStyle = flavorColor;
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(kx, ky, an.r * 0.42 + 2, 0, Math.PI * 2);
        ctx.stroke();
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
  ctx.fillText(nomMode ? "kills " + kills + "  ·  " + NOM_PHASE_NAME[nomPhase] : "kills " + kills + "  ·  L" + level + "-" + wave, W - 92, 28);
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
  ctx.fillText(settings.nom === "on" ? "🍴 tap to feed NOM" : "tap to choose level", W / 2, H * 0.68);
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
  const windup = e.bossState === "windup";
  const jx = windup ? (Math.random() - 0.5) * 5 : 0;
  const jy = windup ? (Math.random() - 0.5) * 5 : 0;
  const x = e.x + jx, y = e.y + jy;
  // Main boss (Maharaja) wears a regal purple-grey; mini-boss stays grey.
  if (e.flash > 0) ctx.fillStyle = "#ffffff";
  else if (e.main) ctx.fillStyle = windup ? "#8c7280" : "#5e4a54";
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
  // Crown — gold for the Maharaja, dull grey for the Blandfather.
  ctx.fillStyle = e.main ? "#ffd24a" : "#8d93a5";
  ctx.beginPath();
  ctx.moveTo(x - 16, y - e.r + 4);
  ctx.lineTo(x - 12, y - e.r - 12);
  ctx.lineTo(x - 6, y - e.r + 1);
  ctx.lineTo(x, y - e.r - 15);
  ctx.lineTo(x + 6, y - e.r + 1);
  ctx.lineTo(x + 12, y - e.r - 12);
  ctx.lineTo(x + 16, y - e.r + 4);
  ctx.closePath();
  ctx.fill();
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
  ctx.font = "34px " + COMIC_FONT;
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 6;
  ctx.strokeText("BOSS DOWN!", W / 2, H * 0.3 - 64);
  ctx.fillStyle = "#7ddf8a";
  ctx.fillText("BOSS DOWN!", W / 2, H * 0.3 - 64);
  ctx.font = "16px " + COMIC_FONT;
  ctx.fillStyle = "#e8e8f0";
  ctx.fillText("pick a boon — it lasts this level", W / 2, H * 0.3 - 30);

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
// A level is playable only once unlocked (clear the previous one). The
// frontier (last unfinished level) is highlighted as the resume point.
function levelsLayout() {
  const n = MAX_LEVEL, cols = 3, rows = Math.ceil(n / cols);
  const gx = 16, gy = 16;
  const tw = Math.min(96, (Math.min(W - 40, 420) - (cols - 1) * gx) / cols), th = tw;
  const gridW = cols * tw + (cols - 1) * gx;
  const x0 = (W - gridW) / 2, y0 = H * 0.32;
  const rects = [];
  for (let i = 0; i < n; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    rects.push({ x: x0 + c * (tw + gx), y: y0 + r * (th + gy), w: tw, h: th, n: i + 1, key: "tile" });
  }
  const bw = 230, bh = 52, by = y0 + rows * (th + gy) + 22;
  rects.push({ x: (W - bw) / 2, y: by, w: bw, h: bh, key: "play" });
  return rects;
}

function levelsPress(p) {
  const a = toArena(p);
  for (const r of levelsLayout()) {
    if (a.x < r.x || a.x > r.x + r.w || a.y < r.y || a.y > r.y + r.h) continue;
    if (r.key === "play") { sfx.ui(); if (navigator.vibrate) navigator.vibrate(8); startLevel(unlockedLevel); return; }
    if (r.n <= unlockedLevel) { sfx.ui(); if (navigator.vibrate) navigator.vibrate(8); startLevel(r.n); }
    else sfx.ui(); // locked — no-op blip
    return;
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
  ctx.font = "40px " + COMIC_FONT;
  ctx.strokeStyle = "#14141c";
  ctx.lineWidth = 7;
  ctx.strokeText("SELECT LEVEL", W / 2, H * 0.18);
  ctx.fillStyle = "#ffb347";
  ctx.fillText("SELECT LEVEL", W / 2, H * 0.18);
  ctx.font = "13px sans-serif";
  ctx.fillStyle = "#8d93a5";
  ctx.fillText("clear a level to unlock the next", W / 2, H * 0.18 + 26);

  for (const r of levelsLayout()) {
    if (r.key === "play") {
      ctx.globalAlpha = 0.9 + 0.1 * Math.sin(tnow * 3);
      ctx.fillStyle = "#ffb347";
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#14141c";
      ctx.font = "24px " + COMIC_FONT;
      ctx.textAlign = "center";
      ctx.fillText((unlockedLevel > 1 ? "RESUME — L" : "PLAY — L") + unlockedLevel, r.x + r.w / 2, r.y + r.h / 2 + 9);
      continue;
    }
    const unlocked = r.n <= unlockedLevel;
    const cleared = r.n < unlockedLevel;
    const frontier = r.n === unlockedLevel;
    ctx.fillStyle = unlocked ? "rgba(255,179,71,0.14)" : "rgba(255,255,255,0.04)";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.lineWidth = frontier ? 3 : 2;
    ctx.strokeStyle = frontier ? "rgba(255,179,71," + (0.6 + 0.4 * Math.sin(tnow * 4)) + ")" : unlocked ? "rgba(255,179,71,0.5)" : "rgba(120,126,150,0.3)";
    ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    ctx.textAlign = "center";
    ctx.font = "30px " + COMIC_FONT;
    ctx.fillStyle = unlocked ? "#ffd24a" : "#5a5f70";
    ctx.fillText(r.n, r.x + r.w / 2, r.y + r.h / 2 + 4);
    ctx.font = "16px sans-serif";
    if (cleared) { ctx.fillStyle = "#7ddf8a"; ctx.fillText("✓", r.x + r.w / 2, r.y + r.h - 12); }
    else if (!unlocked) { ctx.fillStyle = "#5a5f70"; ctx.fillText("🔒", r.x + r.w / 2, r.y + r.h - 11); }
    else if (frontier) { ctx.fillStyle = "#ffb347"; ctx.font = "10px sans-serif"; ctx.fillText("NEXT", r.x + r.w / 2, r.y + r.h - 12); }
  }
  drawGear();
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
  ctx.strokeText("LEVEL " + level + " CLEAR!", 0, 0);
  ctx.fillStyle = grad;
  ctx.fillText("LEVEL " + level + " CLEAR!", 0, 0);
  ctx.restore();

  ctx.textAlign = "center";
  ctx.font = "16px " + COMIC_FONT;
  ctx.fillStyle = "#e8e8f0";
  ctx.fillText(level < MAX_LEVEL ? "LEVEL " + (level + 1) + " UNLOCKED!" : "you cleared the final level!", W / 2, H * 0.46);
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
    ctx.fillText("survived " + elapsed.toFixed(1) + "s  ·  " + kills + " kills  ·  L" + level + " wave " + wave, W / 2, H * 0.45);
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
  get boons() { return boons; },
  get mods() { return mods; },
  // Deterministic step for testing (rAF pauses in background tabs).
  tick(dt) { if (state === "playing") update(dt); },
};

// ---------- Main loop ----------
// First sizing happens here, after all state exists (clampToArena touches
// player/enemies/foods, which would be TDZ errors at the top of the file).
resize();
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
  smoothDt += (raw - smoothDt) * 0.2;
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

// Backgrounding the app (tab switch, app switch) → on return, suspend/resume
// audio and give a fresh 3-2-1 countdown so the player isn't ambushed.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (audioCtx) audioCtx.suspend();
  } else {
    if (audioCtx) audioCtx.resume();
    last = performance.now(); // avoid one giant dt on return
    music.next = 0;           // resync the music scheduler
    if (state === "playing" && !settingsOpen && !boonChoices && resumeT <= 0) resumeT = 3;
  }
});

})();
