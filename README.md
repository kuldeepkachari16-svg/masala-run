# Masala Run (working title)

#project/masala-run

**Play it:** https://kuldeepkachari16-svg.github.io/masala-run/

A mobile-first survival action game. The Bland are eating the city's flavor — fight back with street food.

**The one rule:** you attack with whatever you last ate, and flavor fades — so keep eating.

## v0 greybox — what's in

- Fixed on-screen joystick bottom-left (default) or touch-anywhere mode + WASD/arrows; auto-attack at nearest enemy
- Portrait 480×800 (landscape support built but parked behind `LANDSCAPE_ENABLED` in game.js — off for now)
- Settings (gear icon, persisted): difficulty (easy/normal/hard), joystick mode/side/size, sensitivity, smoothing, music, show fps; opening pauses the game; every tap gives press/value feedback + live stick preview; closing mid-run shows a 3-2-1 countdown before action resumes
- **NOM mode** (temporary easter egg, Settings → Secret 🍴, off by default): a self-contained 3-phase mini-game — nibblers → INSERT COIN toll → NOM, a giant hungry mouth you overfeed chilli till it pops. Routes in via `start()` so it never touches main-game balance; launch mechanism TBD (see ROADMAP)
- Background music: procedural ambient loop (A-minor-pentatonic), toggle in settings, respects the master mute
- Backgrounding the app (tab/app switch) auto-pauses; returning gives a fresh 3-2-1 countdown (audio suspends/resumes too)
- Difficulty setting scales spawn rate, enemy speed/hp, and boss hp (`DIFFICULTY` map)
- **Two manual powers** (right-side buttons, opposite the stick; auto-trigger optional via "power trigger" setting):
  - **MASALA RUSH** (❄) — charges on ~10 *eats* (easier): freezes all Blands in place 6s + flavor won't fade + speed up
  - **THALI SLAM** (✦) — charges on ~28 *kills* (harder): slow-mo + fires all 3 flavors in a screen-clearing burst
  - Thresholds/effects in `CONFIG.powers`; desktop keys Q (rush) / E (slam)
  - **vs bosses:** bosses resist the freeze — Rush *slows* them to 40% (self-buffs still apply); Slam's burst damages them normally
  - **auto mode** fires powers staggered: if two are ready, one fires and the other waits, auto-casting once the first's effect ends
- 3s breather between waves (no spawns, "wave cleared!" banner)
- The Bland: grey blobs, scaling waves every 20s; spawn ON the arena edge with a 0.7s emerge telegraph (no off-screen entries, no insta-hits)
- **Swarmers** (wave 3+): small spiky wisps — 1 hp, ~2.5× faster, zig-zag approach, spawn in packs of 2-3. Share of spawns grows per wave (`CONFIG.swarmerShare`)
- **Scaling cap:** enemy stats and spawn rate stop growing at wave 5 (`CONFIG.scalingCapWave`) — later waves get harder via enemy mix, not bullet sponges
- **Wave-5 mini-boss — THE BLANDFATHER:** arrives alone (spawns + wave timer pause), stalk → telegraphed charge → recovery weak window (orange outline). Immune to knockback, guaranteed food during the fight, boss HP bar. Kill → **pick 1 of 3 boons** (run-long buffs: +1 shot, +1 heart, slower flavor drain, +10% speed, faster attack)
- **All difficulty/pacing knobs live in `CONFIG`** (top of game.js); live-tunable on a device via `__mr.config`
- 3 flavors: **Spicy** (chilli — 3-shot spread, 2× damage) · **Sweet** (jalebi — rapid fire) · **Savory** (vada pav — one-hit shield + knockback pulse every 2.2s, slower attack, slightly slower move)
- Move speed: base 277 px/s for all flavors (the old Sweet speed is now the default; savory 0.95×)
- Flavor meter: 15s decay, revert to weak PLAIN attack at zero
- **Fusion recipes:** eat a *different* flavor while the meter is above the white tick (same flavor = refresh only). Discoveries persist in localStorage, shown as "recipes x/3":
  - **Chilli Glaze** (spicy+sweet) — radial flame burst
  - **Tadka Blast** (spicy+savory) — huge knockback shockwave
  - **Maska Mend** (sweet+savory) — +1 heart & fresh shield (only healing in the game)
- 3 hearts, i-frames on hit, food despawns after 8s
- Procedural Web Audio SFX (zero asset files): eat (pitched per flavor), fusion sting, shoot tick, hit thud, shield clink, kill pop, wave chime, death womp, UI blips. Mute: speaker icon next to the gear (persisted) or `M` key

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

Stand-still PLAIN dies in wave 2 (~30-45s, drop-luck variance); fed players survive the same pressure. Food is the lifeline, not a bonus. All knobs in `CONFIG`: wave/breather length, spawn curve + floor, per-type enemy stats (hp/speed/telegraph/drop), swarmer pack size + share table, scaling cap. Bland hp caps at 4 (wave 5).

## Art

Procedural, zero asset files: pre-rendered offscreen canvases (night-street backdrop, glow sprites, auras, vignette) + emoji as food art. The Bland desaturate the street where they walk (drain patches). All glows are cached sprites — no per-frame shadowBlur, mobile-safe.

## Next — v0.5 "feels like a game"

1. ~~Sound (procedural Web Audio)~~ ✅ done
2. ~~Wave-5 mini-boss + boon pick~~ ✅ done — swarmer ✅ done
3. ~~PWA manifest + icon (installable, offline)~~ ✅ done — Add to Home Screen on a phone; offline after first load; Bangers self-hosted
