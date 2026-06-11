// Masala Run — v0 greybox prototype
// One rule to know: you attack with whatever you last ate, and flavor fades.
// Vanilla Canvas, no dependencies. Portrait mobile-first, works with keyboard too.

(() => {
"use strict";

// ---------- Canvas & scaling ----------
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Logical playfield (portrait). Rendered letterboxed/scaled to the window.
const W = 480;
const H = 800;
let scale = 1, offX = 0, offY = 0;

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  scale = Math.min(canvas.width / W, canvas.height / H);
  offX = (canvas.width - W * scale) / 2;
  offY = (canvas.height - H * scale) / 2;
}
window.addEventListener("resize", resize);
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
});

const vignette = makeSprite(W, H, (g) => {
  const grad = g.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.4)");
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
});

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
const FOOD_EMOJI = { spicy: "🌶", sweet: "🍯", savory: "🍔" };
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
let player, enemies, bullets, foods, particles, floaters, rings, drains;
let flavor, flavorTimer, savoryPulse;
let elapsed, kills, wave, waveTimer, spawnTimer, fireTimer;
let hitFlash, shake, fusionFlash;
let bestTime = 0;

function reset() {
  player = { x: W / 2, y: H / 2, r: 14, hp: 3, iframes: 0, speed: 170, shield: 0 };
  enemies = [];
  bullets = [];
  foods = [];
  particles = [];
  floaters = [];
  rings = [];
  drains = [];
  flavor = "none";
  flavorTimer = 0;
  savoryPulse = 0;
  elapsed = 0;
  kills = 0;
  wave = 1;
  waveTimer = 0;
  spawnTimer = 0;
  fireTimer = 0;
  hitFlash = 0;
  shake = 0;
  fusionFlash = 0;
  announce("WAVE 1", "#ffffff");
}

// ---------- Input ----------
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
  if (state !== "playing" && (e.key === " " || e.key === "Enter")) start();
});
window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

// Virtual joystick: touch anywhere, drag to move.
let joy = null; // {ox, oy, dx, dy} in screen px
function toLocal(t) {
  const dpr = window.devicePixelRatio || 1;
  return { x: t.clientX * dpr, y: t.clientY * dpr };
}
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (state !== "playing") { start(); return; }
  const p = toLocal(e.changedTouches[0]);
  joy = { ox: p.x, oy: p.y, dx: 0, dy: 0 };
}, { passive: false });
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!joy) return;
  const p = toLocal(e.changedTouches[0]);
  joy.dx = p.x - joy.ox;
  joy.dy = p.y - joy.oy;
}, { passive: false });
canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  joy = null;
}, { passive: false });
canvas.addEventListener("mousedown", () => {
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
function announce(text, color) {
  floaters.push({ text, color, x: W / 2, y: H * 0.35, life: 1.6, size: 34, vy: -20 });
}
function smallText(text, color, x, y) {
  floaters.push({ text, color, x, y, life: 0.9, size: 16, vy: -40 });
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
  const speed = 52 + wave * 6 + Math.random() * 20;
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

  if (fusion) fuse(prevFlavor, flavor);
}

function fuse(a, b) {
  const key = recipeKey(a, b);
  const recipe = RECIPES[key];
  if (!recipe) return;
  fusionFlash = 0.25;
  shake = 0.3;

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
        if (e.hp <= 0) {
          kills++;
          burst(e.x, e.y, "#8d93a5", 8, 90);
          dropFood(e.x, e.y);
          enemies.splice(j, 1);
        }
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

// ---------- Update ----------
function update(dt) {
  elapsed += dt;
  waveTimer += dt;
  if (waveTimer > 20) {
    waveTimer = 0;
    wave++;
    announce("WAVE " + wave, "#ffffff");
  }

  // Spawning accelerates with waves.
  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnTimer = Math.max(0.2, 0.9 - wave * 0.12);
    spawnEnemy();
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
    const len = Math.hypot(joy.dx, joy.dy);
    if (len > 8) {
      const c = Math.min(len, 60) / 60;
      mx = (joy.dx / len) * c;
      my = (joy.dy / len) * c;
    }
  }
  const ml = Math.hypot(mx, my);
  if (ml > 1) { mx /= ml; my /= ml; }
  player.moving = ml > 0.01;
  const spd = player.speed * FLAVORS[flavor].speedMult;
  player.x = Math.max(player.r, Math.min(W - player.r, player.x + mx * spd * dt));
  player.y = Math.max(player.r, Math.min(H - player.r, player.y + my * spd * dt));
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
          if (e.hp <= 0) {
            kills++;
            burst(e.x, e.y, "#8d93a5", 8, 90);
            dropFood(e.x, e.y);
            enemies.splice(j, 1);
          }
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
        if (e.hp <= 0) {
          kills++;
          burst(e.x, e.y, "#8d93a5", 8, 90);
          dropFood(e.x, e.y);
          enemies.splice(j, 1);
        }
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
    ctx.fillStyle = "#8a8e9c";
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
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
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(FOOD_EMOJI[fd.type.flavor] || "?", fd.x, fd.y + bob + 6);
  }

  // Bullets: glow sprites.
  for (const b of bullets) {
    ctx.drawImage(glowSprite(b.color), b.x - b.r * 2.5, b.y - b.r * 2.5, b.r * 5, b.r * 5);
  }

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
    const squish = 1 + Math.sin(e.wobble) * 0.08;
    ctx.drawImage(auraSprite, e.x - e.r * 3, e.y - e.r * 3, e.r * 6, e.r * 6);
    ctx.fillStyle = e.flash > 0 ? "#ffffff" : "#6e7280";
    ctx.beginPath();
    ctx.ellipse(e.x, e.y, e.r * squish, e.r / squish, 0, 0, Math.PI * 2);
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
    // Eyes.
    ctx.fillStyle = "#14141c";
    ctx.beginPath();
    ctx.arc(player.x - 4, py + 3, 2.4, 0, Math.PI * 2);
    ctx.arc(player.x + 4, py + 3, 2.4, 0, Math.PI * 2);
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

  // Floating text.
  for (const fl of floaters) {
    ctx.globalAlpha = Math.min(1, fl.life * 2);
    ctx.fillStyle = fl.color;
    ctx.font = "bold " + fl.size + "px sans-serif";
    ctx.textAlign = "center";
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

  // Joystick indicator.
  if (joy && state === "playing") {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(joy.ox, joy.oy, 60 * (window.devicePixelRatio || 1), 0, Math.PI * 2);
    ctx.stroke();
    const len = Math.hypot(joy.dx, joy.dy) || 1;
    const cap = Math.min(len, 60 * (window.devicePixelRatio || 1));
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.beginPath();
    ctx.arc(joy.ox + (joy.dx / len) * cap, joy.oy + (joy.dy / len) * cap, 18, 0, Math.PI * 2);
    ctx.fill();
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
  ctx.fillText("kills " + kills + "  ·  wave " + wave, W - 16, 28);

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

function drawMenu() {
  ctx.fillStyle = "#e8e8f0";
  ctx.textAlign = "center";
  ctx.font = "bold 40px sans-serif";
  ctx.fillText("MASALA RUN", W / 2, H * 0.32);
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#9aa0b0";
  ctx.fillText("The Bland are eating the city's flavor.", W / 2, H * 0.40);
  ctx.fillText("Eat faster.", W / 2, H * 0.435);
  ctx.font = "26px sans-serif";
  ctx.fillText("🌶  🍯  🍔", W / 2, H * 0.485);
  ctx.fillStyle = "#ffb347";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText("You attack with whatever you last ate.", W / 2, H * 0.55);
  ctx.fillText("Flavor fades — keep eating.", W / 2, H * 0.585);
  ctx.fillStyle = "#e8e8f0";
  ctx.font = "bold 18px sans-serif";
  ctx.fillText("tap / space to start", W / 2, H * 0.68);
  ctx.fillStyle = "#5a5f70";
  ctx.font = "12px sans-serif";
  ctx.fillText("move: drag or WASD · attacks are automatic", W / 2, H * 0.73);
  ctx.fillStyle = "#8d93a5";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("recipes " + discovered.size + "/" + Object.keys(RECIPES).length, W / 2, H * 0.80);
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
