# Procedural Placement

## Purpose

Define rules for placing reusable assets procedurally without harming gameplay
readability. This document is a framework only.

## Table Of Contents

- Scope
- Placement Inputs
- Placement Rules
- Anchors
- Collision
- Spawn Weights
- Exclusion Zones
- Validation
- TODO

## Scope

TODO: Define which systems use procedural placement.

## Placement Inputs

TODO: Define required metadata and game-state inputs.

## Placement Rules

TODO: Define placement rule categories and constraints.

## Anchors

TODO: Define supported anchor types and coordinate meanings.

## Collision

TODO: Define how collision metadata affects placement.

## Spawn Weights

TODO: Define placement weighting and randomization rules.

## Exclusion Zones

TODO: Define gameplay-safe areas and forbidden placement zones.

## Validation

TODO: Define automated and visual validation steps.

## Edge-Prop Authoring Envelope

Tall, edge-anchored landmark-scale carts, counters, stalls, and similar anchors
must be measured against the Session 56 contract frozen in the Technical Asset
Contract and Production Asset Brief Framework. The supporting audit is
`docs/art-production/reports/session56_edge_prop_geometry_audit.html`.

Let `ρ` be road-facing visible depth divided by stored visible height and
`cityFrac` be city-facing visible depth divided by stored visible height:

```text
scale         = runtimeHeight / storedVisibleHeight
roadIntrusion = ρ * runtimeHeight
outerBleed    = max(0,
                    cityFrac * runtimeHeight - availableCitySideScreenSpace)
```

### A. Hard Runtime Constraints

Every applicable asset declares target and maximum runtime height and passes:

```text
ρ * declaredMaximumRuntimeHeight <= 8 px
```

There is no universal hard `ρ` percentage. The physical footprint must remain
clear of the protected road. The formula and limits are symmetric for dedicated
left/right Class-C masters; runtime mirroring remains prohibited.

### B. Preferred Production Guidance

New authoring targets `30%` headroom below the hard cap: preferred projected
road intrusion is at most `5.6 px`, or
`ρ <= 5.6 / declaredMaximumRuntimeHeight`. A preferred-guidance miss does not
retroactively invalidate an asset that passes the hard runtime constraint.

### C. Secondary Visual Heuristics

Visible W:H around `0.5–0.6` is a secondary, non-binding composition heuristic.
It cannot validate road intrusion; `ρ` is authoritative. No universal
`cityFrac` band is frozen. City-facing depth and outer bleed are measured and
visually reviewed per asset/family against the available city-side screen space.
Uniform scaling must not be used to hide unsuitable geometry by reducing a prop
below its intended player-relative scale.

Normalized pivot percentage is diagnostic only. The authoritative pivot is the
honest road-facing ground-contact footprint edge and must not be manipulated to
make the asset pass. Stored runtime bounds and literal alpha-pixel bounds may
differ by approximately one pixel under inclusive versus half-open conventions;
all measurements and future tools must state which convention they use.

### D. Human Review and Existing Assets

Automatic checks may later cover declared heights, stored bounds, road/city
depths, `ρ`, projected intrusion/bleed, hard/preferred results, pivot containment,
and footprint clearance. Human review remains required for semantic footprint
honesty, handedness, serving direction, readability, acceptable clipping and
on-screen visibility, city identity, and dishonest-pivot detection.

Right fixed-canopy V002 remains approved, valid at its current geometry,
grandfathered, and outside preferred future road-depth guidance. Left
fixed-canopy V003 remains geometry-validated with metadata status `review`.
Right chai-counter V001 remains approved and a strong road-depth example.
Session 53/55 assets remain experimental evidence rather than production-approved
references. No existing asset is reopened or automatically rejected by this
forward-looking contract.

## Mumbai Edge-Prop Controlled Test Preparation

Session 44 prepares a documentation/data scaffold for a future controlled test
of the Mumbai chai-counter and vada-pav cart families. Test execution is pending
because repository-ready production PNGs are absent and the Technical Asset
Contract records the modular edge-prop segment composer as engine work not
started. The legacy tiled files in `assets/props/` are not substitutes.

The prepared vada-pav metadata records are disabled fixtures:

* `mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v001`
* `mumbai_prop_vadapav_cart_fixed_canopy_right_neutral_1x_v001`
* `mumbai_prop_vadapav_cart_umbrella_open_cart_left_neutral_1x_v001`
* `mumbai_prop_vadapav_cart_umbrella_open_cart_right_neutral_1x_v001`

They use `placementWeight: 0`, zero measurement sentinels, `status: draft`, and
blocked safety-buffer/playable-road zones. They must not enter a runtime pool
until binary dimensions, pivots, bounds, spacing, metadata, and repository paths
are validated.

### Required debug overlays

A future test-only renderer must show clearly labelled, non-production overlays
for:

* the protected playable road and both safety-buffer boundaries
* the asset pivot
* visual bounds
* physical placement footprint
* road-intrusion bounds
* crop-safe bounds

Temporary debug geometry may be used only for these overlays. It must never be
stored or presented as production art.

### Test A — Single Asset

Status: **EXECUTED and PASSED — Session 46, 2026-08-07.**
Asset: `mumbai_prop_vadapav_cart_fixed_canopy_right_neutral_1x_v001.png`.

Runtime home: `EDGE_PROP_DEFS` / `edgePlacement()` / `drawEdgeProps()` in
`game.js`, tuned via `CONFIG.edgeProps`, overlay via
`CONFIG.edgeProps.debug = true`, envelope read-out via `__mr.edgeProps`.
This is a **single-asset test harness, not procedural placement** — the segment
composer (Technical Asset Contract §10) is still not started.

#### Measured source bounds (alpha ≥ 32, canvas 1120 × 1582)

| Bound | Source px |
|---|---|
| `visual_bounds` | 226, 432 → 950, 1057 (724 × 625) |
| `placement_footprint` | 276, 950 → 876, 1057 (600 × 107) |
| `crop_safe_bounds` | 178, 384 → 998, 1105 (silhouette + 48 px padding) |
| `road_intrusion_bounds` | 226, 432 → 276, 1057 (canopy overhang only) |
| pivot (`road_facing_ground_contact_centre`) | 276, 1057 |

**The session-45 export manifest's `visible_bounds_px` is wrong.** It records
`[48, 48, 1072, 1534]`, which is the canvas inset, not the silhouette. The real
silhouette is 724 × 625 and sits high-left in the canvas; effective transparent
padding is 226 left / 431 top / 169 right / 524 bottom, not a uniform 48. Any
tool that sizes this asset from the manifest will render it ~2.4× too small.

#### Resolved runtime envelope (design px, W = 480)

```
road boundary 441.6 · safety buffer 3 → pivot 444.6 · footprint 444.6 → 529.1
visual 437.6 → 539.5 (101.9 × 88) · road intrusion 7.0 of 8 allowed
city-edge bleed 59.5 px = 58% of asset width · scale 0.1408 · mirrored: false
```

Drawn height 88 px = the `tall` archetype (courier 70, tall cap ~120).
`footprintClear: true`, `intrusionOk: true` — the physical cart never enters the
protected road; only the canopy tip overhangs it, by 7 px.

#### Findings that block promotion beyond Test A

1. **58% city-edge bleed is structural, not a tuning error.** The corridor's
   8% edge band is 38.4 design px. A cart at proportionate scale is ~102 px
   wide, so anchoring its road-facing edge to the safety buffer necessarily
   pushes ~60 px off-screen. This is consistent with Technical Asset Contract
   §2 (city-facing outer half bleeds off) and the visible slice does read as a
   vada-pav cart — but it means **~58% of every dedicated edge master is paid
   for and never seen.** Decide before commissioning more: author edge masters
   narrower, or accept the waste.
2. **Style mismatch.** The delivered asset is painterly/rendered at high
   saturation and detail; the shipped game is flat retro-day. In situ the cart
   is the loudest object on screen — louder than the courier — which inverts
   the Tier-4 "quieter than gameplay" rule. Placement is correct; the rendering
   style is not. Not fixable by scale or alpha.
3. **Baked contact shadow present.** Semi-transparent dark pixels (RGB ≈
   25/28/23, alpha 20–130) under the cart, source y ≈ 950–1060. Technical Asset
   Contract §5 prohibits baked shadows. It is a tight contact shadow, not a
   sticker halo, and reads acceptably on the day palette — but it will read
   wrong on the night palette and will double up once the engine draws its own.
4. **Alpha dust.** 9,534 pixels (0.54% of canvas) carry `0 < alpha < 8` outside
   the silhouette. Invisible at runtime; breaks naive auto-trim tooling. This is
   why every bound above is measured at alpha ≥ 32, not alpha > 0.
5. **No de-confliction with the procedural kit.** `drawCorridorSegment` still
   deals its own `DAY_ELEMENTS` deck onto both edges, seeded per segment and
   baked into a cached tile. In the Session 46 screenshot a procedural plant
   overlaps the cart's canopy. Asset-fed props and the procedural kit cannot
   currently see each other — **this is the segment composer's job and is the
   single largest gap** before Test B.
6. **Night zones untested.** The asset is neutral-lit; the night palette is a
   palette swap the engine applies to procedural drawing only, so an imported
   PNG will not shift with it.

## Segment composer — shared edge-placement ownership

Status: **IMPLEMENTED — Session 47, 2026-08-07.** Closes finding 5 above.

Runtime home in `game.js`: `newEdgeState()` · `productionClaims()` · `edgeAdmits()`
· `addClaim()` · `segCompositionSig()` · `DAY_ELEMENT_EXTENT`, composed inside
`drawCorridorSegment()`. Inspect with `__mr.edgeComposer`; overlay with
`CONFIG.edgeProps.debug = true`.

### The model

A claim is a **vertical interval on one environmental edge, in world y**. It is
one-dimensional on purpose: the procedural deck centres its elements *on* the
screen edge (`cx = 0` / `cx = W`) and production props anchor to the safety
buffer, so the two always overlap horizontally. Vertical is the only free axis,
which makes de-confliction an interval test rather than a rect packer.

Fixed priority: protected road + safety buffer (geometry, not a claim) →
production props → major procedural anchors → procedural fillers. Production
claims are registered before the deck is dealt and never yield.

### Determinism

Placement is seeded by `mulberry32(level * 7349 + idx * 101159)` — the tile's own
seed, unchanged. No `Math.random()` is reachable from the composer. Critically, a
**rejected candidate burns exactly the rng draws its draw call would have
consumed** (`DAY_ELEMENT_EXTENT[kind].rngDraws`), so the seeded stream is
identical with and without de-confliction. Verified: with the production prop
present, segment 4's composition differs from the no-prop baseline by exactly one
rejected element — every other claim matches to the decimal.

### Budget calibration

The ladder deals 3–6 elements per edge per segment from a 5-card deck (weights
3/3/2/1/1), giving natural maxima of 6 elements, 13 weight, 3 anchors, ~0.40
occupancy. Every ceiling in `CONFIG.edgeProps.budget` sits **at** that natural
maximum, so procedural-only segments compose exactly as they did before this
layer existed. A production claim (1 element, weight 3, 1 anchor, ~0.11
occupancy) is what pushes an edge over the line. An earlier calibration
(`maxWeight: 9`) silently thinned every segment in the game and was rejected —
the budget's job is to clip outliers, not to retune the playtested corridor.

### Cached tiles

The tile cache key gains a composition signature (production claim intervals +
budget values), so a moved claim or a live config change rebuilds the tile. The
debug flag is deliberately **absent** from the key: every composer diagnostic
draws per frame in world space, never into a tile, so debug cannot contaminate
the cache. A cache entry now carries `{ canvas, comp }`; `segComposition()` reads
it without ever forcing a build.

### Verified result

| Check | Result |
|---|---|
| Cart placement | unchanged — `ok: true`, road intrusion 7.04 / 8, `mirrored: false` |
| Overlapping plant | rejected, reason `overlap:mumbai_vadapav_cart_fixed_canopy_right` |
| Other procedural elements | unchanged, both edges populated |
| Determinism | identical composition across independent page loads |
| Scroll | segment 4 composition identical at cam 3739 → 2539 → 3739 |
| Edge props off → on | composition changes, then restores exactly |
| Budget change | invalidates the tile; restore is exact |
| Console errors | none |

### Composer limitations (carried into Session 48)

- **One instance, one edge.** Same-edge production-to-production spacing
  (`minMul` / `recMul` / `overlapAllowMul`) is carried but still unexercised —
  Test B is what will exercise it.
- **The left edge has no production master**, so the left path is written
  sign-generically but is untested with a real asset.
- **Vertical-only de-confliction** is correct while every placer pins to the edge
  column. A future prop placed at an arbitrary x would need a real rect test.
- **The composer is a pure subtraction.** A rejected candidate is dropped, never
  nudged or substituted. Repositioning would reshuffle the seeded stream, which
  is a deliberate trade for determinism and for leaving the shipped look intact.

### Test B — Mixed Same-Edge Pair

Status: **Prepared; blocked by both families' repository-ready exports and the
renderer hook.**

Place one chai-counter and one vada-pav cart on the same edge. Validate minimum
and recommended spacing, overlap allowance, silhouette separation, attachment
compatibility, visual hierarchy, micro-cluster compatibility, breathing gaps,
controlled density, and absence of complete-scene appearance.

### Test C — Opposing Edges

Status: **Prepared; execution pending binaries and renderer hook.**

Place different dedicated structures on opposite edges. Validate protected road
width, balance, asymmetry, road-centre clarity, absence of mechanical
duplication, canopy/umbrella clearance, gameplay-area dominance, and procedural
repeatability.

### Chai-counter dependency

The chai-counter brief is validated, but no repository-ready chai-counter PNGs,
production metadata records, or modular runtime hook exist. Test B therefore
remains blocked. The eventual scaffold must accept the chai-counter masters
without redesigning that family.

## TODO

- TODO: Align this document with the metadata schema.
- TODO: Add examples only after placement rules are approved.
- TODO: Add screenshot review requirements.
