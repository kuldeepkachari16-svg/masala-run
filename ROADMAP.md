# Masala Run — Roadmap

**Play:** https://kuldeepkachari16-svg.github.io/masala-run/

---

## 🔀 PIVOT (2026-07-11): fixed arena → scrolling corridor street

A zone is now a **delivery route** (vertical scrolling street, camera follows the
courier; waves are distance-gated; bosses lock the camera into one-screen duels).
Decided with the PM after the OpenAI art-direction review — the corridor is what the
Art Bible's edge/road system is designed for, and it serves the courier fantasy.
Pre-pivot game preserved on branch `arena-classic` (+ live flag `__mr.setCorridor`).
**Feel round 1 (2026-07-11): PASSED** — street > box, pacing right, no camping
exploit felt, boss camera-lock reads natural; delivery bar defect fixed (`40f307d`).
**Technical Asset Contract written** (`docs/art-production/TECHNICAL_ASSET_CONTRACT.md`)
— includes the playable-width ruling (84% collision lane; env presence via edge
bleed) + the in-game approval gate. Segment composer for asset-fed edge clusters
shipped Sessions 46–51 (production-first ownership, procedural de-confliction,
independent left/right budgets). **Production-Integration Gate 1 (2026-08-07,
Session 52): PASSED** — distinct from the fresh-player fun/retention Gate-1
below, still outstanding. This gate checked whether the validated Mumbai
vada-pav cart (left + right) and chai counter stay visually subordinate and
non-disruptive during actual simulated movement/combat: player/enemy/attack
readability and road-centre clarity held in both day and night, for the
default-live config (right cart + chai) and the opposing-edge config (left +
right cart, `testC`) alike. No placement-engine change was warranted. Full
report in `CHANGELOG.md`. **Session 53 follow-up (2026-08-08):** PM reacted
to the Gate-1 screenshots directly — edge props were bleeding ~58% of their
own width off the canvas edge, reading as cut in half rather than an
intentional treatment. Cut to ~49% by dropping `heightPx` 88→70 (both cart
masters) / 80→70 (chai counter) — the largest reduction that keeps every
prop at-or-above the courier's own height (the Technical Asset Contract §4
hero-scale "landmark" rule). Full frontier + reasoning in `CHANGELOG.md`.
**Session 57 (2026-08-12):** replaced the single-fixed-instance production
harness with a deterministic multi-segment distribution policy — every
segment in a level now independently rolls breathing-vs-eligible, edge, and
asset (from the 3 validated masters), live by default (`CONFIG.edgeProps.
distribute`). Full mechanism + verification in `CHANGELOG.md`. **Flagging,
not deciding:** the Session 57 brief explicitly listed the left cart master
(v003) as an available validated asset for this session's catalogue, so it
is now part of the live-default rotation — this reads as satisfying the
sign-off gate below by inclusion, but it wasn't a separate explicit
PM visual-approval pass the way the right cart + chai counter got before
Session 50. Flagging so the gate is closed on purpose, not by omission.
**Session 60 (2026-08-13):** engineering-first foundation pass — runtime night
treatment for authored props (they previously kept daylight pixels on a night
road, measured live), an additive `anchor + attachment` production role model,
a deeper deterministic selection policy, the Mumbai **procedural frontage
band** (the first architecture in the corridor, and the first thing that makes
Mumbai read as Mumbai with no cart on screen), and a minimal safe-road-overlay
path for Pillar 2. Full mechanism + measurements in `CHANGELOG.md`.
**Session 61 (2026-08-13):** umbrella/open-cart pair (left + right) measured,
registered and promoted into `PRODUCTION_CATALOGUE_KEYS` — both PRODUCTION-PASS
inside preferred guidance (4.50px / 1.85px intrusion against the 8px cap).
Mumbai's live catalogue is now L2/R3 (was L1/R2). Same not-a-separate-visual-
sign-off-pass caveat as the Session 57 left-cart flag above applies here too:
promotion follows the same measured-registration gate the fixed-canopy pair
used, `status: "review"` in metadata, not an explicit PM creative pass. Full
measurement trail in `CHANGELOG.md`. **Owed next:** add the two new masters to
`sw.js`'s offline precache list and bump `BUILD_TAG`/`CACHE` together (flagged,
not done — outside that session's file ownership).
**Session 61 Phase 2 (2026-08-14):** wrote `PAB-MUMBAI-ENVPROP-STORAGE-
ATTACHMENT-V1` (`docs/art-production/PRODUCTION_ASSET_BRIEFS.md` §16), then —
same day, once the PM selected candidates externally — measured, integrated
and regression-tested the real Crate Cluster + Storage Vessel masters,
replacing the Session 60 attachment-probe defs entirely. Both registered as
orientation-neutral (one binary, two `EDGE_PROP_DEFS` keys, no runtime
mirror), added to `PRODUCTION_CATALOGUE_KEYS`, role `"attachment"`; live by
default since `attachments.on` was already shipped `true`. `sw.js`
(`v33→v34`) and `BUILD_TAG` (`61.1→61.2`) bumped together — the Session 61
Phase 1 omission is not repeated. Crate Cluster passes the Session 56
geometry contract comfortably (1.10px intrusion, preferred band). **Storage
Vessel does not have the headroom the brief assumed** — real measurement
shows its declared 36px maximum runtime height fails the 8px hard cap (true
safe ceiling ~30.7px); shipped at the 26px target only, which passes but sits
above the 5.6px preferred band, the tightest margin of any master in this
repo. Full measurement trail, admission/rejection composer proof, and
regression results in `CHANGELOG.md`. **Owed next:** PM runtime/visual
sign-off on the integration screenshots (metadata held at `status: "review"`
pending it); vessel's night render was inferred from the shared night-
treatment mechanism rather than independently screenshotted (no organic
vessel+night pairing turned up in the levels scanned) — worth a direct check
next time a night-zone route happens to carry one.
**Session 61 Phase 3 (2026-08-15):** wrote `PAB-MUMBAI-FRONTAGE-SHOPFRONT-V1`
(`docs/art-production/PRODUCTION_ASSET_BRIEFS.md` §17) — the first brief for
authored Layer-B frontage, three masters (shutter / grille+utility /
balcony-overhang) enriching the Session 60 procedural band with real Pillar 3
material identity. Explicitly stays out of `EDGE_PROP_DEFS`/the composer —
frontage remains `frontagePlan()`/`frontageBay()`'s own layer, per the
Session 60 ownership decision. Defined a new containment model (Frontage
Depth Ratio `φ`, hard cap 35.3px / preferred 24.7px) scoped to the Layer-B
bay envelope rather than reusing the Session 56 `ρ`/8px road-intrusion
contract, which does not apply to this placement path. Caught, before any
generation round, that a frontage bay renders as a narrow vertical strip
(21-35px wide × 54-132px tall) rather than a wide shopfront panorama, and
built that constraint into all three production prompts. **No
image-generation tool is available this session**, so work stops at the
generation handoff: brief + three copy-pasteable prompts, delivered in-chat.
No `game.js`/`sw.js`/asset/metadata change; `BUILD_TAG`/`CACHE` not bumped.
Full mechanism in `CHANGELOG.md`. **Owed next:** PM runs the three prompts
externally; returning candidates need measurement, metadata, the Section H
runtime-integration design turned into real code, and a full regression
re-run before any technical-PASS claim.
**Owed next:** corridor retune only if further play demands it.

---

## ⭐ Commercial north-star (set 2026-06-20)

**Goal:** a real commercial launch — app stores, revenue, players we don't know.
This **re-orders** the phased plan below (which was scoped for a web/portfolio
finish with store "optional"). Retention, meta-progression, distribution and
monetization are now **first-class**, gated on proof.

**What decides success, in order (everything else is downstream):**
1. **Core-loop retention** — a stranger *involuntarily* replays. Casual benchmark: D1 ≥ ~35%, avg session ≥ ~4 min. **Unvalidated today.**
2. **Build depth** — the flavor hook becomes a real run-build (see `docs/build-system.md`). Frequent XP-driven level-up picks are shipped (build-system step 1); the pool feeding them is still only ~5 cards, so card/build variety remains thin. Broader pool + fusion evolutions + meta-progression are still future work.
3. **Meta-progression** — permanent unlocks/currency between runs = the retention engine. **Absent today.**
4. **Distribution** — solo + no UA budget ⇒ the realistic path to a *hit* is a casual-games **publisher who funds user acquisition**. They sign only on proven CPI/retention. So the real gate is an *instrumented, retentive* build — no shortcut around the metrics.

**Critical path:**
- **P0 — Validate fun:** (a) Gate-1 playtest — **PASSED.** ✅ Both gates are now closed: the Production-Integration Gate at Session 52, and the fresh-player fun/retention Gate-1 at Session 58. See the Gate-1 status note under Phase 1 item 5 below for the evidence order — the deciding evidence is the PM's manual play of the tuned build, not the automated pass. (b) Build the flavor **build system** + a minimal **meta loop**, then re-test for "one more run."
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
5. ~~Playtest round 1. Questions: figured out eat-to-attack unaided? found a
   recipe unaided? when did retrying stop, and why?~~ ✅ Session 58

**⛔ Gate 1:** no voluntary retries → fix the loop before building more.
Feedback orders Phase 2.

**✅ GATE 1 STATUS — CLOSED, PASS (Session 58, recorded 2026-08-13).**
The evidence order matters, because the intermediate records in `CHANGELOG.md`
read differently and are deliberately left intact:

1. Session 58 Phase 3 shipped a narrow wave-3 tuning change
   (`CONFIG.swarmerShare[2]` `0.18 → 0.10`).
2. The **automated** validation for that change (10-run scripted playtest)
   confirmed the wave-3 spike mechanism was removed, but did **not**
   independently prove the human outcome — it says so itself.
3. After the tuned build was pushed, **the PM manually played it and accepted
   it.** That manual play is the deciding evidence for this gate.
4. Session 58 therefore closed with a final **PASS**.

Any earlier "the real human Gate-1 playtest is still the standing P0" wording —
including inside the Session 58 Phase 3 changelog entry — is an
**intermediate-state record written before step 3**, not the final session
status. It is preserved as history; this note is the current status.

## Phase 2 — v0.75 retention
6. Pre-run loadout draft (choose which foods can drop)
7. Sour + Bitter flavors → 5 schools, 10 recipes
8. Zone 2: new backdrop, enemy mix, boss
9. Results screen: run stats + next-unlock teaser
10. Local high score + daily challenge seed

## Cities & endless difficulty (started 2026-06-26)

> **Scope note:** the north-star "NOT now until P0 passes" line parks more
> cities/art/enemies until the Gate-1 playtest. PM **knowingly overrode** that to
> build 2 cities ahead of the gate. Recorded here for honesty, not endorsement.

**The model — two independent tracks. This is the whole design.**

- **Hierarchy:** `CITY → ZONE → WAVE`. A CITY contains **5 ZONES**; a ZONE is
  **8 WAVES** (wave 5 mini-boss, wave 8 main boss — unchanged). "Level" stays
  banned in player copy.
- **Theme track** (`CONFIG → CITIES[]`): cosmetic + one hazard per city —
  palette, food skins, slam reskin, hazard. Grows linearly, cheap, **infinite**.
- **Difficulty track** (one global curve in `lvl()`): driven by ZONE index, NOT
  by city. City 1 and city 80 run the *same* difficulty logic — only the curve
  input differs. No per-city balancing. This is what makes 50–100 cities
  authorable instead of a balancing nightmare.
- **Soft-reset per city:** difficulty eases at each new city's zone 1, but on a
  **rising floor** — every city's curve sits higher than the last. Gives each
  city a legible 5-zone arc with a payoff boss, then the world flips.

**How difficulty scales forever with ~one enemy (the levers, combinatorial):**
1. **Roster — behaviors not stats** (~6–8 Bland variants: splitter, shielded,
   spitter, exploder, healer, armored). Authored once, reused every city.
2. **Composition** — the enemy *mix* per wave (free; just data).
3. **Affixes/elites** — traits layered onto any base enemy (the multiplier;
   build this before city #3 — it's how a small bestiary yields infinite fights).
4. **Hazards** — the per-city environmental feature.
5. **Density & tempo** — gentle global ramp.
6. **Relative pressure** — enemies scale to the player's compounding build, not
   to a fixed HP number. The real difficulty meter is "can this build clear the
   wave in time," not "how big is the HP bar."

> Stat inflation alone dies by ~city 4. Novelty (new behavior/affix/hazard per
> tier) carries difficulty; numbers only ramp gently. **8 behaviors × 5 affixes ×
> 4 hazards × composition ≈ tens of thousands of distinct encounters from ~17
> authored pieces.** Author the levers, not the cities.

**Per-zone variation inside a city:** zones share the city palette but differ
deterministically (seeded by zone index) — prop layout shifts zone-to-zone, and
hazards are **gated by `fromZone`** (e.g. Mumbai puddles appear from zone 3,
Jaisalmer quicksand from zone 2). One system, no hand-authored backdrops.

**City signature power = a reskin of THALI SLAM** (not a 3rd meter — two meters
is the ceiling). Same screen-clear balance envelope; only name + VFX + bullet
*pattern* change per city.

**City boss:** the zone-5 main boss is upgraded to a bigger, themed **CITY BOSS**
— the city finale before the world changes.

### Now (this build): 2 cities
- **Mumbai** — urban day palette; foods reskinned (Vada Pav / Jalebi / Chai);
  signature **VADA PAV RAIN** (falling projectiles); hazard **puddles** (slow
  Blands) from zone 3; city boss.
- **Jaisalmer** — desert/sand palette; foods reskinned; signature sand slam;
  hazard **quicksand** (slow + drain) from zone 2; city boss.

### Night zones (decision 2026-06-26)
- **Deterministic, not random.** PM floated random night zones; we went deterministic
  instead — random visual states that hurt readability are a fairness/learnability
  cost for little gain, and you can't tune what you can't predict. Each city lists
  its night zones (`CITIES[].nightZones`).
- **1 night zone per city to start** (zone 4 — a darker beat before the zone-5 city
  boss), not 2. The day look is the established identity (sprites/cues are tuned for
  it); 2-of-5 night dilutes it. `nightZones` is a config list — bumping to 2 is a
  one-line change once we want it.
- **Cheap:** night is just a per-city `night` palette merge + stronger vignette +
  warm lamp pools. No new system.
- **Future (the "keep in mind"):** a richer day→dusk→night→dawn *arc* across a
  city's 5 zones, and/or more night as cities get late (e.g. from city #5). Revisit
  when there are more cities.

### Deferred to the difficulty track (next, before city #3)
- 2 new Bland **behaviors** (proof of the roster lever).
- **Affix system** (the permanent multiplier).
- A spawn **director** that samples roster/composition/affix/density by intensity.

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
