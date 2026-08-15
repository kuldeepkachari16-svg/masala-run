# Mumbai Representative Full-Level Completion Scope

> **Purpose:** freeze the minimum asset + engine scope required before Mumbai can be tested as a representative full game environment
> **Status:** Living  ·  **Owner:** Claude (engine)
> **Created:** 2026-08-13

## Session 61 Phase 3 update (2026-08-15) — P2-5 moved from deferred to briefed

§16/§18 recorded "continuous tiling frontage masters" as P2-5, deferred
"only if the §18 fork chooses the asset route." That fork was resolved in
favour of Option A (procedural band) and stays resolved — this update does
not reopen it. What actually happened this session is narrower than either
fork option: the first authored art for the *existing* procedural band, not
a competing asset-only frontage system. `PAB-MUMBAI-FRONTAGE-SHOPFRONT-V1`
(`PRODUCTION_ASSET_BRIEFS.md` §17) specs three masters — shutter,
grille+utility, balcony/overhang — intended to plug into `frontageBay()` as
a new selectable bay kind, still laid out by `frontagePlan()`, still
respecting the existing gap-bay rate. Pillar 3 coverage (§4, §13 S1) remains
**zero shipped** as of this update — a brief and three prompts exist,
no image has been generated (no image-generation tool available this
session), and no runtime selection code has been written. T2's "frontage
layer exists" condition (§17 table) is unaffected: it was already met by the
procedural band alone and does not require this family. Re-audit this
section once candidates return and a `frontageBay()` authored-kind branch
actually ships.

## Session 60 update (2026-08-13) — verdict converted B → A

The three items blocking the freeze are resolved. Full mechanism and
measurements in `CHANGELOG.md`; summary of what changed against this document:

| Item | Was | Now |
|---|---|---|
| Frontage delivery model (§27 fork) | undecided, blocked ~40% of P0 | **PM chose the procedural band.** Built and shipped this session — option A as recommended |
| S2 / §23-A night treatment | structural gap | **closed** — composite-cached tint; prop:road ratio 1.268 → 0.610 |
| S5 / §23-B non-anchor roles | blocked the whole small-prop category | **closed** — roles read off the def, attachments admitted through `edgeAdmits()` |
| S4 / §23-C micro-clusters | unexpressible | **closed** — `anchor + attachments`, verified both edges |
| S1 frontage layer | zero architecture | **closed structurally** — 692 bays across Mumbai, 6 kinds, Jaisalmer untouched |
| S3 road treatment | no asset/overlay path | **foundation laid** — safe overlays with an enforced hazard-separation rule |
| S6 Pillar 4 | absent | **still absent** — unchanged, remains P1-6 |
| §27-1 live verification | could not run | **closed** — raw CDP path works; the Chrome-extension bridge does not |
| P1-9 selection policy | proposed | **shipped early** — it had to precede commissioning the catalogue |

**Threshold movement (§17):** T2 met (frontage covers 100% of edge length),
T6/T7 mechanically met (roles + clusters exist and are admitted; real art still
owed), T9 partially met (props respond to night; a practical-light family is
still owed). T1 substantially improved — a segment with no authored anchor now
carries shutters, grilles, awnings, balconies and pipes. **T3, T4, T5 unchanged
and still the gating items: the catalogue is still 3 masters, left edge still
1.** D1 remains the sharpest number in this document.

The engine no longer blocks Mumbai art production. What remains is catalogue.

---

Audit session. No art generated, no placement architecture changed, no game
code modified. Everything below is measured off the repository, not off design
docs. Where a doc and the repo disagree, the repo wins and the disagreement is
recorded in §24.

---

## 0. Session numbering correction

This brief is labelled "Session 59". **Session 59 already shipped** on the same
date — the asset payload pass (`CHANGELOG.md:3`, commits `4545d57`, `ca3b336`).
This work is **Session 60**. Same collision hit the Session 54 and Session 55
briefs, both of which renumbered themselves on arrival; this is the third
occurrence and it now costs a paragraph of reconciliation every time. The brief
generator should read `CHANGELOG.md`'s top entry before assigning a number.

---

## 1. Repository state inspected

| Area | Path | State at audit |
|---|---|---|
| Runtime | `game.js` (5931 lines) | edge-prop system `game.js:870-1646` |
| Prop binaries | `assets/props/` | 18 files, 25.5 MB |
| Metadata | `assets/metadata/` | 11 JSON + schema |
| Sprites | `assets/sprites/` | 2 (`courier.svg`, `bland.svg`) |
| Backgrounds | `assets/backgrounds/` | empty (README only) |
| Themes | `assets/themes/` | `night-v1` (4 jpg), `retro-day` (1 png) — legacy, unused by `ACTIVE_THEME` |
| Precache | `sw.js` | `CACHE = "masala-run-v31"`, 3 prop masters listed |
| Docs | `docs/art-production/` | 13 docs + 1 report |

Authorities read: `ART_BIBLE.md`, `PROMPT_BIBLE.md`, `CITY_KITS.md` (Mumbai kit,
lines 57–524), `PRODUCTION_ASSET_BRIEFS.md`, `PROCEDURAL_PLACEMENT.md`,
`TECHNICAL_ASSET_CONTRACT.md`, `ROADMAP.md`, `CHANGELOG.md`.

**Route geometry (verified, `game.js:18-43`, `2083-2091`, `2495`):** design space
is 480 wide; `H = clamp(760…1180)`. A route is `6 × H` world px, tiled at
`tileH = 800`. So a Mumbai zone is **6 segments on a short phone, 9 on a tall
one**. Mumbai is **5 zones** (`ZONES_PER_CITY = 5`), zone 4 being the night zone
(`CITIES[0].nightZones = [4]`). Every number in §17 derives from this.

---

## 2. Current Mumbai production inventory

Three masters are registered as production and reachable by the live
distribution policy (`PRODUCTION_CATALOGUE_KEYS`, `game.js:1275-1279`).

| Master | Category | Sub | Status | Pillar | Edge | Dedicated hand | Day/night | Registered | Metadata | In distribution | Genuinely catalogue |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `mumbai_prop_vadapav_cart_fixed_canopy_right_…v002.png` | Env prop | Tier-4 anchor, food cart | Approved / Integrated | 1 | right | yes | day art only | yes | yes | yes | yes |
| `mumbai_prop_vadapav_cart_fixed_canopy_left_…v003.png` | Env prop | Tier-4 anchor, food cart | Approved / Integrated | 1 | left | yes | day art only | yes | yes | yes | yes |
| `mumbai_prop_chai_counter_shallow_awning_right_…v001.png` | Env prop | Tier-4 anchor, tea counter | Approved / Integrated | 1 | right | yes | day art only | yes | yes | yes | yes |

**That is the entire Mumbai production catalogue: 3 masters, 2 archetypes, both
inside Pillar 1.**

### Geometry re-verified against the Session 56 freeze

Recomputed independently from the stored bounds (not read back from the
`EDGE_PROP_DEFS` comments), at `W = 480`, `laneMargin = 38.4`:

| Master | scale | ρ | roadIntrusion | hard ≤8 | preferred ≤5.6 | footprint clear | bleed | visible W:H |
|---|---|---|---|---|---|---|---|---|
| vadapav right | 0.11200 | 8.00% | **5.60 px** | PASS | **at the limit, zero headroom** | PASS | 49.4% | 1.158 |
| chai right | 0.11475 | 5.74% | 4.02 px | PASS | PASS | PASS | 42.9% | 0.987 |
| vadapav left | 0.12891 | 7.00% | 4.90 px | PASS | PASS | PASS | 50.5% | 1.164 |

No violation. Note the right cart sits **exactly** on the preferred 5.6 px line —
it has no headroom at all, so its `heightPx` cannot rise above 70 without
dropping into hard-cap-only territory (at `heightPx` 100 it would hit 8.00 px,
the hard cap itself). Treat 70 as frozen for that master.

**Authoring target this implies for every new tall master at `heightPx = 70`:**
preferred `ρ ≤ 8.0%`, hard `ρ ≤ 11.4%`.

### Registered but never instantiated

`mumbai_vadapav_cart_vertical_right_test_v2` (Session 55) has a full
`EDGE_PROP_DEFS` entry but **no code path constructs it** — `test54` modes
`"B"`/`"C"` still point at the Session 54 right master (`game.js:1360`,
`1367`, `1372`). Already noted in `CHANGELOG.md:58`. Dead def, carried forward.

### Present in the repo, outside the catalogue

| File | Why it is not catalogue |
|---|---|
| `…umbrella_open_cart_{left,right}_…v002.png` (2) | metadata `status: draft`; never registered in `EDGE_PROP_DEFS`; an *approved production direction* per `PRODUCTION_ASSET_BRIEFS.md:§12` that was never carried to integration. ~0.38 MB of shippable art sitting idle. |
| `…umbrella_open_cart_{left,right}_…v001.png` (2) | metadata `status: deprecated` |
| `…fixed_canopy_{left,right}_…v001.png`, `left_…v002.png` (3) | superseded by v002/v003 |
| `mumbai-day.png`, `mumbai-night.png`, `jaisalmer-{day,night}.png` | pre-pivot `city-art` strips. `TECHNICAL_ASSET_CONTRACT.md:§5` marks these legacy and unapproved. 4.5 MB. |
| `assets/themes/night-v1/*`, `retro-day/*` | legacy theme images, not loaded by `ACTIVE_THEME` |

**The umbrella cart pair is the single cheapest catalogue win available** — see
P0-2.

---

## 3. Experimental assets explicitly excluded

Session 56 reclassified these as geometry evidence only, never production
(`CHANGELOG.md:244`). They stay excluded here.

| Def | File | Guard |
|---|---|---|
| `mumbai_vadapav_cart_vertical_left_test` | `session54_…left_test.png` (2.0 MB) | `test: true` |
| `mumbai_vadapav_cart_vertical_right_test` | `session54_…right_test.png` (0.9 MB) | `test: true` |
| `mumbai_vadapav_cart_vertical_right_test_v2` | `session55_…right_test_v2.png` (2.2 MB) | `test: true`, plus unreachable |

All three carry `test: true`, so `loadEdgeProps()` skips them at preload
(`game.js:1160`) and `productionCatalogue()` can never select them
(`game.js:1275`). **Correctly fenced. No leakage into production.** 5.1 MB of
repo weight that never reaches a player.

---

## 4. Pillar coverage

| # | Pillar | Strength | Coverage today | Verdict |
|---|---|---|---|---|
| 1 | Dense Layered Street Commerce | Primary | 3 masters, 2 archetypes, both food/beverage | **Partial** — present but narrow; the whole city currently rests on it |
| 2 | Monsoon-Worn Urban Surfaces | Primary | material weathering baked into the 3 masters only. No drainage, no repair, no patched surface anywhere in the road or edge systems | **Near-absent** |
| 3 | Mixed-Age Practical Architecture | Primary | **zero.** No frontage, shutter, grille, balcony, pipe or bay exists in any asset or any code path | **Absent** |
| 4 | Transit / Street-Mobility Echoes | Supporting | **zero.** No vehicle echo, barrier, or stop-form | **Absent** |

**Two of three primary pillars have no representation at all.** This is the
headline finding, and it reframes the brief's premise: Mumbai's problem is not
that the catalogue is thin, it is that three of four identity layers were never
built. More carts would deepen the one pillar that is already the strongest.

---

## 5. Frontage / architecture assessment

**There is no frontage system.** Verified by grep across `game.js` for
frontage/facade/shutter/building/balcony/grille — the only hits are the
pre-pivot arena `drawStreet()` (`game.js:379-395`, four hardcoded 34×44 stall
rectangles) which the corridor never calls, and comment text.

What the corridor edge actually is, per `drawCorridorSegment()`
(`game.js:692-707`):

- flat `DAY.ground` fill
- 22 px-grid stipple dots
- a flat `DAY.path` band, `mw = 0.08 × W = 38.4 px` per side
- a **2 px** `DAY.curb` line
- centre dashes, and a crosswalk on every third tile

That is the complete environmental edge. Everything else is freestanding props
standing in front of nothing.

> **Can Mumbai read as Mumbai when no large cart is visible?**
> **No.** With the verified distribution, 3–4 of every 6–9 segments carry no
> authored prop at all. In those segments the player sees a flat beige band, a
> 2 px curb, and the generic `DAY_ELEMENTS` deck (`stall / cart / crate / pot /
> plant / dog / cat`) — a kit that is city-agnostic by construction: it is
> reskinned for Jaisalmer purely by swapping palette hexes (`applyCityTheme`,
> `game.js:2269-2279`). **Strip the three carts and Mumbai is Jaisalmer in
> different colours.** This is the single largest structural gap.

---

## 6. Major-anchor assessment

2 archetypes / 3 masters, split `left: 1`, `right: 2`.

Simulated the shipped policy directly (`productionDistributionPlan`,
`game.js:1289-1324`, re-implemented exactly and run over Mumbai zones 1–5):

| | H=800 (6 seg) | H=1180 (9 seg) |
|---|---|---|
| Eligible segments per route | 2–3 | 3–4 |
| Authored props across all of Mumbai | **11** | **17** |
| Routes containing a repeated master | 1 / 5 | **4 / 5** |
| Most-repeated master, across Mumbai | left cart, **5×** | left cart, **8×** |

**The left edge has exactly one master, so roughly half of every authored prop
a player ever sees in Mumbai is the same vada-pav cart.** The code already
concedes this — the repetition-control comment names "the left edge's sole
master" as the case where it must repeat (`game.js:1312-1313`). On a tall
phone, 4 of 5 routes show a duplicate within a single run.

Anchor families needed are **not** more food carts. Per the kit's own pillar
tables the gaps are utility, neighbourhood retail, mobility, and infrastructure
— see the P0/P1 backlog.

---

## 7. Small-prop assessment

**No asset-fed small props exist.** Every small object in the game is
procedural: `crate`, `pot`, `plant` from `DAY_ELEMENTS` (`game.js:488-520`),
weights 2/1/1.

More importantly, the runtime **cannot currently accept one**.
`productionClaims()` hardcodes every production prop as
`priority: 2, anchor: true, weight: 3` (`game.js:1526-1528`). A registered
crate would consume an anchor slot and 3 of the 13 weight budget — mis-budgeting
it as a major silhouette and thinning the procedural deck around it as if a cart
had landed. See §23-B.

---

## 8. Micro-cluster assessment

**The preferred production grammar — anchor + optional attachments + breathing
gaps — is not expressible on the shipped architecture.**

`productionDistributionPlan()` emits at most **one** `{key, y}` per segment, on
one edge (`game.js:1320`). There is no adjacency concept, no attachment slot,
no notion of two production props intentionally sharing an interval. The
composer's `edgeAdmits()` treats any second claim inside the gap as an overlap
rejection (`game.js:1546`) — which is correct behaviour for de-confliction and
exactly wrong for a deliberate cluster.

Breathing gaps are solid. Clusters are unbuilt. This is engine work, not art —
see §22.

---

## 9. Road / safe-overlay assessment

| Layer | Present | Notes |
|---|---|---|
| Road base | procedural flat fill + stipple | `game.js:692-696` |
| Centre marking | dashes, step 80 (divides `tileH`) | seam-safe |
| Crosswalk | every 3rd tile | `idx % 3 === 1` — a fixed 33% rhythm, not seeded |
| Curb / boundary | **2 px line** | the entire kerb treatment |
| Road wear | none | — |
| Repair traces / patches | none | — |
| Drainage cues | none | — |
| Safe overlays | **no asset path exists** | `TECHNICAL_ASSET_CONTRACT.md:§3` — "Road segment textures / overlays — Engine work needed" |

Puddles exist but are **gameplay hazards** (`CITIES[0].hazard`, slow 0.5, from
zone 3) drawn on the gameplay layer, not decoration — correctly separated, and
the kit forbids passive puddle decoration that resembles them
(`CITY_KITS.md:§Pillar 2` prohibitions). Keep that separation.

The road centre is properly protected: edge props draw before every gameplay
layer (`game.js:858-861`) and `footprintClear` holds for all three masters.

---

## 10. Day / night assessment

**Night is a runtime blocker, not an art gap.** This is the finding most likely
to waste a production session if missed.

`drawEdgeProps()` applies `translate + uniform positive scale + globalAlpha`
and nothing else (`game.js:1428-1437`). There is **no palette path, no tint, no
overlay, no night variant selection** for authored props.

Consequence, deterministic: in Mumbai zone 4 the road palette swaps to
`ground: #2b2733` and lamp pools composite into the tile (`game.js:766-777`),
while every authored cart continues to draw at **full daylight brightness**.
The authored props are the only elements in the scene that do not respond to
night at all.

What exists vs. what the kit requires:

| Kit requirement (`CITY_KITS.md:§Day, Night & Optional Monsoon`) | Today |
|---|---|
| Warm practical shop lights | generic warm radial pools, no source object |
| Restrained bulbs / fixtures | none (the chai counter has a *painted* bulb that cannot light) |
| Controlled local edge illumination | pools are procedural and unrelated to prop positions |
| Cool ambient separation | palette-level only |
| No excessive glow / neon | ✅ held |
| Unchanged gameplay readability | ✅ held (Gate-1, Session 52) |

`TECHNICAL_ASSET_CONTRACT.md:§5` already fixes the production model —
"one asset + palette-compatible colouring (+ optional glow overlay)", and "no
baked drop shadows or glow halos in any asset". So the answer is **not** night
art masters. It is a runtime night treatment plus a small optional glow-overlay
family. That decision is already made by the contract; nothing to reopen.

---

## 11. Monsoon-material assessment

Pillar 2 is communicated **only** by whatever weathering is painted into the
three existing masters. Nothing systemic:

- faded paint / weathered plaster — no surface to carry it (no frontage)
- repaired concrete / patched asphalt — no road overlay path
- drainage — no downpipe, gutter, or drain-cover asset
- practical rain protection — the two canopies and one awning, all attached to
  food carts

The kit's guard ("default Mumbai is not permanently wet") is trivially
satisfied today because there is no monsoon language at all. The risk here is
under-representation, not over-representation.

---

## 12. Transit / mobility assessment

Zero coverage. No vehicle echo, no barrier, no stop-form, no black-and-yellow
accent anywhere in `assets/props/` or `DAY_ELEMENTS`.

Given the pillar is supporting-strength and the kit warns hard against letting
transport dominate, the correct scope is small and specific: **one** parked
mobility echo plus **one** infrastructure form. Not a vehicle family.

---

## 13. Structural gaps

Missing layers, not missing variety. Mumbai cannot read correctly without these.

| # | Gap | Evidence |
|---|---|---|
| S1 | **No frontage / architectural layer.** Pillar 3 (primary) has zero representation. Non-anchor segments are city-agnostic. | §5 |
| S2 | **No night treatment for authored props.** Runtime has no tint/overlay path. | §10, `game.js:1428-1437` |
| S3 | **No authored road treatment or safe-overlay path.** Kerb is a 2 px line; no wear, repair, or drainage. | §9 |
| S4 | **Micro-clusters not expressible.** One prop per segment, no adjacency or attachment model. | §8, `game.js:1320` |
| S5 | **Production claims cannot express a non-anchor role.** All hardcoded `anchor: true, weight: 3`. Blocks the entire small-prop category. | §7, `game.js:1526-1528` |
| S6 | **Pillar 4 absent.** No mobility echo of any kind. | §12 |

## 14. Catalogue-depth gaps

Category exists; variety does not.

| # | Gap | Evidence |
|---|---|---|
| D1 | **Left edge has one master.** ~50% of all authored props in Mumbai are the same cart; 4/5 routes repeat within a run on a tall phone. | §6 |
| D2 | **Anchor archetypes are 2, both food/beverage.** Pillar 1 is over-indexed on food, which the kit explicitly warns against ("must not become a separate food-festival pillar"). | §6, `CITY_KITS.md:97` |
| D3 | **Approved umbrella-cart direction never integrated.** 2 style-corrected masters sitting at `status: draft`. | §2 |

## 15. Polish gaps

| # | Gap |
|---|---|
| P1 | Both cart masters bleed ~50% of visible width off-canvas and sit at visible W:H ≈ 1.16, far outside the 0.5–0.6 composition heuristic. Sessions 53–55 chased this; the Session 55 v2 prototype reached 0.620 but was never promoted. |
| P2 | Right cart has zero headroom on the preferred intrusion limit (exactly 5.60 px). |
| P3 | Crosswalk cadence is a fixed `idx % 3` rather than seeded — a visible 3-segment rhythm on a 6–9 segment route. |
| P4 | Dead `EDGE_PROP_DEFS` entry for the Session 55 v2 prototype. |
| P5 | ~9.6 MB of superseded / legacy / experimental binaries in `assets/props/` (none shipped to players after Session 59, but they are in the repo and in clone weight). |

## 16. Explicitly deferred — NOT required for Mumbai completion

Recording these so they stop being re-proposed:

- More food-cart variants beyond the umbrella pair (D2 argues against, kit forbids)
- Monsoon weather variant as a distinct state (kit: optional, not default)
- Crowds, pedestrians, NPCs, animated vehicles
- Continuous tiling frontage band, if the anchor-frontage route is chosen (§18 fork)
- Landmark echoes of any kind
- Sprite-sheet animation for props
- Interior / doorway depth
- Jaisalmer anything
- Full asset-fed replacement of `DAY_ELEMENTS` (the kit is the fallback and should stay)

---

## 17. Proposed threshold — "Mumbai representative full-level complete"

Derived from the verified route math: **11–17 authored placements across the
whole 5-zone city, 2–4 per route, one per eligible segment, split across two
edges.** That number is the budget the catalogue has to fill; it is small, and
it is what keeps this scope honest.

Mumbai is representative-complete when **all** of the following inspectable
conditions hold:

| # | Condition | Measurable test |
|---|---|---|
| T1 | Every non-anchor segment reads as Mumbai unaided | Screenshot any segment with no production prop; a reviewer who has not seen the palette must not be able to mistake it for Jaisalmer |
| T2 | Frontage layer exists | ≥1 frontage treatment covering **100%** of edge length (procedural band and/or ≥2 frontage masters per edge) |
| T3 | Anchor catalogue depth | **≥3 anchor masters per edge (6 total)**, spanning **≥3 distinct archetypes**, of which **≤2 are food/beverage** |
| T4 | In-route repetition | **≤1 of 5** Mumbai routes contains a repeated master at H=1180 (today: 4/5) |
| T5 | Across-city repetition | no master appears **>5×** across all of Mumbai at H=1180 (today: 8×) |
| T6 | Small-prop layer | ≥1 registered non-anchor production family, correctly budgeted as filler (weight ≤2, `anchor: false`) |
| T7 | Micro-cluster grammar | ≥2 distinct cluster compositions (anchor + ≥1 attachment) placeable and de-conflicted, with breathing gaps intact |
| T8 | Road treatment | kerb/boundary treatment + ≥1 wear or repair overlay family, road centre unchanged, `footprintClear` still PASS for every master |
| T9 | Night authored, not colour-shifted | authored props respond to `zoneNight`; ≥1 practical light family; zone 4 screenshot shows no full-daylight prop on a night road |
| T10 | Pillar coverage | all 4 pillars represented by ≥1 shipped asset or system; each of the 3 primaries by ≥2 |
| T11 | Contract compliance | every new master passes hard `ρ × 70 ≤ 8 px`, preferred ≤ 5.6 px, dedicated handedness, no runtime mirroring |
| T12 | Payload | Mumbai first-load stays within the Session 59 budget; every new master passes `tools/optimize_prop_master.py` with a bit-identical alpha ≥ 32 mask |

### Why 6 anchor masters and not more

Simulated the shipped selection policy at increasing catalogue sizes:

| Catalogue | In-route repeats (H=1180) | Most-repeated across Mumbai |
|---|---|---|
| **3 (today: L1/R2)** | 4 / 5 | 8× |
| 4 (L2/R2) | 1 / 5 | 6× |
| **6 (L3/R3)** | 1 / 5 | 5× |
| 8 (L4/R4) | 0 / 5 | 4× |

**Catalogue size stops paying after 6.** Going 6 → 8 masters buys one fewer
repeat across an entire city — because the bottleneck is the 1-deep `lastKey`
dedupe (`game.js:1314`), not the pool. Past 6, the fix is the selection policy,
not more art. 6 is the minimum convincing set; anything beyond it should be
justified by identity coverage, never by repetition.

---

## 18. P0 backlog — blockers

| ID | Family | Category | Pillar | Runtime role | Variants | L/R | Tall geom | Day/night | Shared? | Why |
|---|---|---|---|---|---|---|---|---|---|---|
| **P0-1** | **Mumbai frontage band** | Road/edge system | 3, 2 | continuous edge treatment behind all props | 3–4 bay rhythms | both | n/a (procedural) | runtime palette | Mumbai-exclusive detail on a shared system | Closes S1 — the only fix for "Mumbai reads as Mumbai with no cart on screen". Recommended as **procedural code** first: zero asset cost, 100% edge coverage, ships in one session. |
| **P0-2** | **Umbrella open cart** (integrate existing) | Env prop | 1 | Tier-4 anchor | 2 (L+R, already exist) | both, dedicated | yes | runtime | Mumbai | Closes D1 immediately. Art is **already in the repo, style-corrected**. Needs bounds measurement, metadata promotion, `EDGE_PROP_DEFS` registration. Cheapest catalogue win available — no generation at all. |
| **P0-3** | **Shuttered shopfront** | Frontage/architecture | 3 | Tier-4 anchor (tall) | 3 (L, R, +1 rhythm) | both, dedicated | **yes** | runtime | Mumbai | Only Pillar-3 asset in P0. Gives the frontage band a punctuating mass. |
| **P0-4** | **Night treatment for authored props** | Engine | 2, 1 | runtime tint/overlay in `drawEdgeProps` | — | — | — | **the deliverable** | shared, all cities | Closes S2. Without it every P0/P1 master looks broken in zone 4. Must land **before** the art batches. |
| **P0-5** | **Non-anchor production role** | Engine | — | `role`/`weight` fields on `EDGE_PROP_DEFS` + `productionClaims()` | — | — | — | — | shared | Closes S5. Without it the entire small-prop category is unregisterable. |
| **P0-6** | **Kerb + road wear overlay** | Road | 2 | safe overlay, road centre untouched | 3–4 | both | n/a | runtime | shared system, Mumbai values | Closes S3 minimally. Kerb is currently 2 px. |

## 19. P1 backlog — strongly recommended

| ID | Family | Category | Pillar | Role | Variants | L/R | Tall | Day/night | Shared? | Why |
|---|---|---|---|---|---|---|---|---|---|---|
| P1-1 | Utility / hardware counter | Env prop | 1, 3 | anchor | 2 | both | yes | runtime | Mumbai | Breaks the food monopoly (D2). Third archetype for T3. |
| P1-2 | Stacked crate / container cluster | Small prop | 1 | filler, non-anchor | 3–4 | both | no | runtime | shared | First user of P0-5; primary micro-cluster attachment. |
| P1-3 | Water vessel / bucket / drum set | Small prop | 1, 2 | filler | 3 | both | no | runtime | shared | Cheap density; carries monsoon material language. |
| P1-4 | Downpipe + drain cover | Env fixture | 2 | filler / frontage attachment | 2–3 | both | no | runtime | Mumbai | Only systemic Pillar-2 asset. Attaches to P0-1/P0-3. |
| P1-5 | Practical shop light | Lighting | 1, 3 | glow overlay, pairs with P0-4 | 2 | both | no | **is the night deliverable** | shared | Makes night authored rather than palette-shifted (T9). |
| P1-6 | Parked mobility echo | Env prop | 4 | anchor | 2 | both, dedicated | yes | runtime | Mumbai | Only Pillar-4 asset. **One family, not a vehicle set.** |
| P1-7 | Roadside barrier | Infrastructure | 4, 2 | filler | 2 | both | no | runtime | shared | Second Pillar-4 touch at filler weight. |
| P1-8 | Micro-cluster composition support | Engine | — | adjacency/attachment in the distribution policy | — | — | — | — | shared | Closes S4 / T7. |
| P1-9 | Selection-policy depth fix | Engine | — | replace 1-deep `lastKey` with usage balancing | — | — | — | — | shared | Buys the repetition win that a bigger catalogue cannot (§17). |

## 20. P2 backlog — deferred enrichment

| ID | Family | Why deferred |
|---|---|---|
| P2-1 | Tarpaulin extension / rain guard | Pillar 2 polish once P1-4 lands |
| P2-2 | Balcony / grille frontage variants | Depth on a layer that must first exist |
| P2-3 | Bus-stop-like structural form | Pillar 4 is supporting; P1-6/7 are sufficient |
| P2-4 | Signboard blocks (abstract, no text) | Reads as polish; high stereotype risk |
| P2-5 | Continuous tiling frontage masters | Only if the §18 fork chooses the asset route |
| P2-6 | Monsoon variant overlays | Kit says optional; not a completion condition |
| P2-7 | Repo binary cleanup (~9.6 MB) | Hygiene, zero player impact post-Session 59 |

---

## 21. Recommended Session 60+ batches

Deliberately **not** the frontages → props → anchors → road → lighting sequence
the brief suggested. Two reorderings, both evidence-driven:

**Engine before art.** P0-4 (night) and P0-5 (roles) are prerequisites for
judging any new master. Producing art first means reviewing it in a lighting
state that will change and a budget slot that will change — the approval gate
(`TECHNICAL_ASSET_CONTRACT.md:§8`) requires in-game review at target scale, so
reviewing against a known-wrong runtime wastes the gate.

**Free art before generated art.** P0-2 is already in the repo. It halves the
worst repetition number for the cost of bounds measurement.

| Session | Batch | Contents | Exit condition |
|---|---|---|---|
| **60** | Engine enablement | P0-4, P0-5, P1-9 | Zone-4 screenshot shows night-responsive props; a `role: "filler"` def budgets as weight ≤2 |
| **61** | Free catalogue + frontage band | P0-2, P0-1 | T2 met; left-edge count 1 → 2; in-route repeats ≤1/5 |
| **62** | Frontage + road | P0-3, P0-6 | T8 met; Pillar 3 non-zero |
| **63** | Small props + clusters | P1-2, P1-3, P1-8 | T6, T7 met |
| **64** | Anchor depth + lighting | P1-1, P1-5 | T3 met (6 masters, 3 archetypes); T9 met |
| **65** | Pillar 4 + assembly | P1-6, P1-7, full-route review | T1–T12 audited end to end |
| **66** | Mumbai completion gate | full 5-zone playthrough, day + night, both H extremes | Mumbai declared representative-complete |

---

## 22. Is the existing architecture sufficient for the proposed catalogue?

**Mostly yes — with two additive extensions, neither of which reopens a frozen
guarantee.**

Holds unchanged and should not be touched: deterministic distribution,
production-first claims through `edgeAdmits()`, independent left/right budgets,
deliberate breathing gaps, dedicated Class-C masters, no runtime mirroring,
`segCompositionSig` cache safety, the Session 56 geometry contract, the
Session 50/51 test harnesses.

Needs **extension**, not redesign:

- **A. Role on production claims** (P0-5). `productionClaims()` hardcodes
  `anchor: true, weight: 3`. Add `role`/`weight` to `EDGE_PROP_DEFS` and read
  them. Purely additive — existing defs default to today's values, so every
  Session 50/51/57 result reproduces byte-identically.
- **B. Multi-instance segments** (P1-8). `productionDistributionPlan()` returns
  one instance per segment. A cluster needs N. The claim/admission model already
  handles N correctly (`edgeAdmits` is interval-based); only the *plan* is
  single-valued.

Both are strictly inside the "audit whether the fuller catalogue can fit these
systems" remit. **Note a genuine conflict in the brief**: §4-D asks for
micro-cluster support while §9 forbids reopening the distribution design. These
extensions are how both hold — the frozen guarantees are preserved, the
single-instance limitation was never one of them.

---

## 23. Evidence-backed runtime blockers

**A. Authored props ignore night entirely.** `drawEdgeProps()` applies only
`globalAlpha` (`game.js:1428-1437`). In Mumbai zone 4 (`nightZones: [4]`) the
road palette darkens to `#2b2733` while every cart draws at full daylight.
Blocks T9 and would make every P0/P1 master fail review in one of Mumbai's five
zones. **Static-verified; not confirmed by live screenshot — see §26.**

**B. Small props are unregisterable.** `productionClaims()` hardcodes
`priority: 2, anchor: true, weight: 3` (`game.js:1526-1528`). Any registered
filler consumes 1 of 3 anchor slots and 3 of 13 weight on its edge. Blocks T6.

**C. Micro-clusters are unexpressible.** One `{key, y}` per segment
(`game.js:1320`); no adjacency model. Blocks T7.

**D. Dead def.** `mumbai_vadapav_cart_vertical_right_test_v2` is registered but
unreachable (`game.js:1120`; no constructor — `test54` modes point at the
Session 54 master). Cosmetic, but it makes the def list lie about what can draw.

---

## 24. Documentation inconsistencies found

1. **Session number collision.** Brief says 59; Session 59 shipped 2026-08-13.
   This is Session 60. Third occurrence (54, 55, 60).
2. **`PRODUCTION_ASSET_BRIEFS.md:§12` roadmap is stale.** Lists final binary
   exports, metadata validation, pivot/bounds validation and "controlled runtime
   integration" as *Pending / Not Started*. All three production masters have
   been integrated and shipped since Session 51, and Gate 1 passed in Session 52.
   It also states "no visual asset is approved" — contradicted by the repo and
   by `ROADMAP.md`.
3. **`TECHNICAL_ASSET_CONTRACT.md:§10`** lists the segment composer as "engine
   work, not started". It shipped across Sessions 46–51.
4. **`TECHNICAL_ASSET_CONTRACT.md:§3`** says edge prop micro-clusters are "to be
   placed by segment composer" — accurate for clusters, but the row implies
   nothing is consumable, whereas single edge props are live.
5. **`TECHNICAL_ASSET_CONTRACT.md:§6`** says the renderer "CAN … horizontal
   mirror", then §4.1/§6 correctly forbid it for Class-C. Reads as a
   contradiction on a first pass; worth a clause.
6. **Only two production asset briefs exist** (chai-counter §14, vada-pav cart
   §15). Every family in §18–§20 needs a brief before generation, per §9 approval
   rules. That is a real throughput constraint on the batch plan above.
7. **`ART_PIPELINE.md`** (repo root) predates the two-lane pipeline and the
   Technical Asset Contract; not reconciled here.

---

## 25. Files changed

**One file added:** `docs/art-production/MUMBAI_COMPLETION_SCOPE.md` (this doc).

No `game.js`, `sw.js`, `CONFIG`, `EDGE_PROP_DEFS`, asset, or metadata change.
No art generated. `BUILD_TAG` / `CACHE` deliberately not bumped — nothing
player-visible changed. `git status` clean before and after apart from this file.

---

## 26. Validation performed

| Check | Method | Result |
|---|---|---|
| Route/segment math | read `game.js:18-43, 2083-2091, 2495` | 6 seg @ H=800, 9 @ H=1180 |
| Distribution outcome | re-implemented `productionDistributionPlan()` exactly (same `mulberry32`, same salt `level*746827 + idx*15485867 + 91`, same density/cooldown) and ran Mumbai zones 1–5 | 11 / 17 placements; left cart 5× / 8× |
| Repetition vs catalogue size | same simulation at L1R2 / L2R2 / L3R3 / L4R4 | returns diminish after 6 masters |
| Session 56 geometry | recomputed ρ, intrusion, bleed, footprint clearance from stored bounds, independent of the code comments | all 3 PASS hard; right cart exactly at preferred limit |
| Frontage absence | grep `game.js` for frontage/facade/shutter/building/balcony/grille | only pre-pivot `drawStreet`, uncalled by corridor |
| Night path absence | read `drawEdgeProps()` `game.js:1419-1440` | no tint/palette/overlay path |
| Experimental fencing | `loadEdgeProps()` `game.js:1160`, `PRODUCTION_CATALOGUE_KEYS` `game.js:1275` | all 3 test defs correctly excluded |
| Metadata statuses | parsed all `assets/metadata/*.json` | umbrella v002 = `draft`, v001 = `deprecated` |
| Precache correctness | read `sw.js` | 3 production masters listed, matches `ACTIVE_THEME` |
| **Live in-game verification** | **attempted, failed** | Chrome extension conflict — see §27 |

---

## 27. Unresolved issues

1. **Live browser verification did not run.** The local server served correctly
   (HTTP 200) but every `javascript_tool` / screenshot call returned "Cannot
   access a chrome-extension:// URL of different extension" across two fresh
   tabs. Stopped after three attempts per the browser-automation guidance. All
   findings above are static-code or simulation verified, which is sufficient for
   each specific claim, but **the night-zone visual has not been screenshotted**
   and should be before Session 60 acts on P0-4. Not asserting a pass I did not
   observe.
2. **Frontage delivery model is an open fork** — see below. It is the one
   genuine blocker to freezing this scope.
3. **Brief throughput** — 13 proposed families vs. 2 existing production briefs.
   *(Still open — the binding constraint on the Session 61+ batch plan.)*
4. **Gate-1 sequencing** — this audit questioned running Mumbai art work ahead
   of an apparently-outstanding Gate 1. **Resolved, and the premise was wrong:**
   both gates are closed — Production-Integration at Session 52, fresh-player
   fun/retention at Session 58, the latter decided by the PM's manual play of
   the tuned build. See `ROADMAP.md` Phase 1 item 5. There is no sequencing
   objection to Mumbai environment work.

### The fork blocking a scope freeze

P0-1 (frontage) is ~40% of the P0 value and can be delivered two ways, with
materially different cost and ceiling:

| | **A. Procedural band** (recommended) | **B. Frontage masters** |
|---|---|---|
| Cost | 1 session of code, no art | 4–6 generated masters + briefs |
| Coverage | 100% of edge length | punctuation only; gaps stay bare |
| Ceiling | flat-cartoon rhythm; cannot carry material richness | full Art Bible material language |
| Risk | may read as "pattern" not "architecture" | leaves T1 unmet between anchors |

**Recommendation: A first, B as P2-5 if A under-delivers.** A is the only option
that satisfies T1 (Mumbai reads as Mumbai *everywhere*), since B by construction
leaves non-anchor segments bare — the exact failure this audit found. But this
is an art-direction call with a visible-style consequence, so it is the PM's,
not mine.

---

## Verdict

**B. Mumbai catalogue scope cannot yet be frozen because:**

1. **The frontage delivery model is undecided** (procedural band vs. authored
   masters). It gates ~40% of P0 and changes the asset count of the largest
   single gap. One PM decision closes it.
2. **Three runtime blockers precede any art production** — night treatment
   (§23-A), non-anchor roles (§23-B), cluster expression (§23-C). Their scope is
   defined here, but none is built, and producing masters before they land means
   reviewing art against a runtime that is about to change.
3. **Live in-game verification could not run** this session (§27-1), so the
   night finding — the one that reorders the whole batch plan — rests on code
   reading alone rather than the screenshot the approval gate requires.

Everything else *is* frozen: the inventory is factual, the four-pillar coverage
is measured, the threshold (T1–T12) is inspectable, and the backlog is derived
from verified route math rather than from wanting more content. Resolve the
three items above and this converts to **A** without re-auditing.

Mumbai is **not** declared complete. This document freezes only the scope
required to complete it.
