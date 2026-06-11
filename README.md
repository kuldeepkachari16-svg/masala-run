# Masala Run (working title)

#project/masala-run

A mobile-first survival action game. The Bland are eating the city's flavor — fight back with street food.

**The one rule:** you attack with whatever you last ate, and flavor fades — so keep eating.

## v0 greybox — what's in

- Virtual joystick (touch) + WASD/arrows, auto-attack at nearest enemy
- The Bland: grey blobs, scaling waves every 20s; spawn ON the arena edge with a 0.7s emerge telegraph (no off-screen entries, no insta-hits)
- 3 flavors: **Spicy** (chilli — 3-shot spread, 2× damage) · **Sweet** (jalebi — rapid fire + move speed) · **Savory** (vada pav — one-hit shield + knockback pulse every 2.2s, slower attack)
- Flavor meter: 15s decay, revert to weak PLAIN attack at zero
- **Fusion recipes:** eat a *different* flavor while the meter is above the white tick (same flavor = refresh only). Discoveries persist in localStorage, shown as "recipes x/3":
  - **Chilli Glaze** (spicy+sweet) — radial flame burst
  - **Tadka Blast** (spicy+savory) — huge knockback shockwave
  - **Maska Mend** (sweet+savory) — +1 heart & fresh shield (only healing in the game)
- 3 hearts, i-frames on hit, food despawns after 8s

## Run it

```
npx http-server -p 8736
```

Open `http://localhost:8736`. On a phone: same Wi-Fi, `http://<laptop-ip>:8736`.

No build step, no dependencies — `index.html` + `game.js` only.

## Design rules (do not break)

- Food is a **power system**, never a nutrition lesson. No health messaging, ever.
- Stats attach to *flavor* (spicy/sweet/savory/sour/bitter), never to healthiness.
- One new idea on a familiar base. Player tracks exactly two things: current flavor + one meter.

## Balance (tuned + verified 2026-06-11)

Stand-still PLAIN dies ~28s in wave 2; same scenario with spicy uptime survives wave 2 at full hearts. Food is the lifeline, not a bonus. Knobs: PLAIN fire 0.95s · spawn `max(0.2, 0.9 − wave·0.12)` · enemy hp `1 + floor(wave·0.6)` · speed `52 + wave·6` · drop rate 30%.

## Art

Procedural, zero asset files: pre-rendered offscreen canvases (night-street backdrop, glow sprites, auras, vignette) + emoji as food art. The Bland desaturate the street where they walk (drain patches). All glows are cached sprites — no per-frame shadowBlur, mobile-safe.

## Next (in order)

1. Deploy free (GitHub Pages / Cloudflare Pages)
