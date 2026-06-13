# Masala Run — Roadmap

**Play:** https://kuldeepkachari16-svg.github.io/masala-run/

## Phase 0 — v0 prototype ✅
Concept + critique, eat-to-attack core loop, 3 flavors, fusion recipes +
recipe book, balance tuning (food = lifeline), procedural art pass,
GitHub + Pages deploy, mobile viewport/joystick/speed fixes.

## Phase 1 — v0.5 "feels like a game"
1. ~~Procedural sound (eat/fusion/hit/kill/death) + mute button~~ ✅ 2026-06-12
2. ~~Wave-5 mini-boss — runs get a milestone, not just death~~ ✅ 2026-06-12 (THE BLANDFATHER + 1-of-3 boon pick)
3. ~~Second enemy type (fast swarmer) — forces flavor switching~~ ✅ 2026-06-12 (+ CONFIG block: all tuning centralized, scaling capped at wave 5)
4. ~~PWA manifest + icon — home-screen install, offline play~~ ✅ 2026-06-12
5. Playtest round 1: 3–5 friends. Questions: figured out eat-to-attack
   unaided? found a recipe unaided? when did retrying stop, and why?

**⛔ Gate 1:** no voluntary retries → fix the loop before building more.
Feedback orders Phase 2.

## Phase 2 — v0.75 retention
6. Pre-run loadout draft (choose which foods can drop)
7. Sour + Bitter flavors → 5 schools, 10 recipes
8. Zone 2: new backdrop, enemy mix, boss
9. Results screen: run stats + next-unlock teaser
10. Local high score + daily challenge seed

## Phase 3 — v1.0 ship quality
11. Difficulty curve pass (runs 1–10 each feel fair)
12. First-run onboarding moments (teach by doing)
13. Performance pass on low-end Android
14. Juice pass: hit-stop, death animations, transitions
15. Playtest round 2: 10+ strangers
16. Final name + branding + itch.io page

**⛔ Gate 2:** strangers retry unprompted → Phase 4. Otherwise v1.0 web
is the finish line.

## Phase 4 — optional store release
17. Capacitor wrap → Android build
18. Play Store listing ($25 one-time — only required spend)
19. Post-launch content cadence: new food/recipe drops

## Possible future scope — feedback-gated (decide, don't default)

### Follow-camera + larger-than-screen world (the "v2 engine")
**Trigger to build:** Gate 1 passes AND we decide the game's identity is an
*evolving world* (varied arena shapes/terrain/set-pieces per level), not just
*escalating arenas* (same box, new backdrop + enemy mix). The latter needs
none of this and is far cheaper.

**Why it's the proper fix for:** thumb occlusion (player stays centered), real
spatial variety across many levels, matches Archero/Survivor.io-class feel.

**Cost it pulls in (not just the camera):**
- off-screen enemy indicators (or you get hit from nowhere)
- viewport culling + perf pass (more entities)
- larger / tiling procedural backdrops per level
- re-touching spawn-on-edge, letterbox/fill, HUD, joystick anchoring

**Cheap hedge to keep the door open now (do while building levels):**
- Treat **world size as its own variable** — never hardcode `arena === screen`
  in new code. Keep `W/H` as the *world*, add a camera offset later as an
  additive render layer, not a rewrite.
- Keep enemy spawn/positions in world coords (already true).
- New `CONFIG` knobs when we get there: `world.w`, `world.h`, `camera.lerp`,
  off-screen-indicator toggle.

**Interim (shipped):** floating + transparent joystick (default `anywhere`)
mitigates the thumb issue without the camera.

## Parked until after Gate 2
Monetization · iOS · accounts/cloud saves · HD-2D art rework
