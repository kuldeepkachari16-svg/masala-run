# Masala Run — Roadmap

**Play:** https://kuldeepkachari16-svg.github.io/masala-run/

---

## ⭐ Commercial north-star (set 2026-06-20)

**Goal:** a real commercial launch — app stores, revenue, players we don't know.
This **re-orders** the phased plan below (which was scoped for a web/portfolio
finish with store "optional"). Retention, meta-progression, distribution and
monetization are now **first-class**, gated on proof.

**What decides success, in order (everything else is downstream):**
1. **Core-loop retention** — a stranger *involuntarily* replays. Casual benchmark: D1 ≥ ~35%, avg session ≥ ~4 min. **Unvalidated today.**
2. **Build depth** — the flavor hook becomes a real run-build (see `docs/build-system.md`). Our differentiator; currently thin (5 boons, bosses only).
3. **Meta-progression** — permanent unlocks/currency between runs = the retention engine. **Absent today.**
4. **Distribution** — solo + no UA budget ⇒ the realistic path to a *hit* is a casual-games **publisher who funds user acquisition**. They sign only on proven CPI/retention. So the real gate is an *instrumented, retentive* build — no shortcut around the metrics.

**Critical path:**
- **P0 — Validate fun (now, in this JS prototype; cheap):** (a) Gate-1 playtest — *still the immediate gate, still undone* (Phase 1 item 5). (b) Build the flavor **build system** + a minimal **meta loop**, then re-test for "one more run."
- **P1 — Productionize (only if P0 passes):** analytics first (measure retention for real) → port/wrap for stores (Unity/Godot, or Capacitor as a cheap first test) → ads + IAP → ASO.
- **P2 — Soft-launch + publisher:** small-geo test, measure CPI/D1/D7, pitch a publisher or self-fund UA.

**Tech trajectory:** vanilla JS/Canvas2D/PWA was the *right* prototyping choice and is **not** the launch stack (monetization SDKs, store presence, and survivor-scale juice assume native/engine). **Do not port until P0 proves the loop.** "Zero-deps single game.js" is a prototype constraint, not a launch one.

**Scope discipline — NOT now (until P0 passes):** more levels, more backdrops/art, more enemy types, NOM mode. That's premature scaling. *One loop, proven addictive, beats eight shallow levels.*

**Top risks:** (1) the loop isn't retentive (unvalidated); (2) Canvas2D perf ceiling at survivor-scale entity counts; (3) no distribution = invisible, regardless of quality.

---

## Phase 0 — v0 prototype ✅
Concept + critique, eat-to-attack core loop, 3 flavors, fusion recipes +
recipe book, balance tuning (food = lifeline), procedural art pass,
GitHub + Pages deploy, mobile viewport/joystick/speed fixes.

## Phase 1 — v0.5 "feels like a game"
1. ~~Procedural sound (eat/fusion/hit/kill/death) + mute button~~ ✅ 2026-06-12
2. ~~Wave-5 mini-boss — runs get a milestone, not just death~~ ✅ 2026-06-12 (THE BLANDFATHER + 1-of-3 boon pick)
   - ~~Level structure (8 waves) + wave-8 main boss + level loop~~ ✅ 2026-06-13 (THE BLAND MAHARAJA; clear → next level, same content for now — **new-level design is TBD, see Phase 2 item 8**)
   - ~~Level-select hub + unlock progression + persistence + fresh-setup-per-level + per-level difficulty (enemies/barriers, config-driven)~~ ✅ 2026-06-13. **FOCUS: Level 1 is the complete, testable level for playtest round 1.** Levels 2-6 exist as provision (same content, marginally harder). New distinct-level *content* design is still TBD (Phase 2 item 8)
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

## NOM MODE — easter egg (temporary, shipped behind a toggle)

A self-contained "viral loop" prototype, **off by default**, reachable via
Settings → Secret 🍴 → "NOM mode". When on, `start()` routes into NOM mode
instead of the main game — so it never pollutes the Gate 1 feedback loop.

- **The joke:** NOM is a giant always-hungry mouth that eats everything and
  makes *you* pay coins. No AI-insider knowledge needed.
- **3 phases:** (1) nibblers race you to the food · (2) INSERT COIN signs
  drift across blocking your view, shoot to clear · (3) NOM — eats food off
  the floor to bloat + slow; overfeed him chilli till he pops.
- **Reuses the core engine** (movement, eat-to-attack, bullets, food, powers);
  separate spawn script + 3 new entity types (`nibbler`/`coin`/`nom`).

**Still TBD (decide later):** real launch mechanism (shared `?nom` deep-link
vs. in-game unlock vs. always-on), the shareable win-card / status-page gag,
and whether it graduates from "temp toggle" to a first-class mode. Greenlight
only if Gate 1 shows the core loop is fun.

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
