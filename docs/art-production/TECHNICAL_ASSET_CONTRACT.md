# Technical Asset Contract

Owner: **Claude (gameplay/integration engineering)** — per `docs/project/AI_COLLABORATION.md`.
Authority: creative intent is the Art Bible's; **what the runtime can consume is this
document's**. When they conflict, the conflict is surfaced explicitly (see §9) — neither
side silently overrides the other.

Every number in this contract is read from the shipped engine (`game.js`, main @
`40f307d`, corridor build), not from aspiration. If the engine changes, this document
changes in the same commit.

Session 56 freezes the tall edge-prop geometry model below from the independently
verified runtime audit in
`docs/art-production/reports/session56_edge_prop_geometry_audit.html`.

---

## 1. Runtime reality (what the engine IS)

- **Vanilla JavaScript + Canvas 2D.** Single `game.js`, zero dependencies, PWA.
  There is **no ECS, no shader pipeline, no engine**. Anything the art system needs
  must be expressible as: draw an image, scale it uniformly, mirror it, alpha it,
  or tint it via a cached composite (see §6).
- **Design space:** fixed logical width **480 px** (portrait). Height is dynamic per
  device: `H = clamp(760 … 1180)`. All sizes in this contract are **design px** at
  that 480-wide space. Render resolution caps at **2× devicePixelRatio**.
- **The camera (post-pivot):** the world is a **vertical corridor**, one screen
  wide, scrolled by a single translate. It is NOT a free 2D plane. "The world
  continues beyond the screen" is achieved only at the top/bottom scroll and by
  edge props bleeding off the left/right screen edges — never by horizontal camera
  movement.
- **A zone is a delivery route** ≈ 6 screen-heights long, built from vertically
  stacked **segment tiles** (§4). Boss duels lock the camera to one screen.

## 2. THE RULING — playable width vs. Art Bible §Camera

**Conflict, surfaced:** the Art Bible freezes "playable arena ≈ 76–80% of screen
width; environment 20–24%". The shipped, playtest-tuned collision reality is:

```
edge wall = 8% per side (38 px)  →  playable lane = 84% (403 px)
```

**Resolution (binding for asset production):** the collision lane stays **84%** —
it is gameplay-tuned across five playtest rounds and is not available to art. The
Art Bible's 20–24% *environmental presence* is achieved **visually**, not
collisionally: edge props are authored wider than the 38 px band and are placed
**centered on the screen edge so ~half bleeds off-screen**. The visible overhang
plus the 38 px band produces roughly a 10–12% visual edge per side without
narrowing play. Edge art must therefore tolerate being cropped by the screen edge
on its outer half — nothing essential (silhouette anchor, readable face) may live
in the outer 50% of a cluster.

The Art Bible chapter should be amended to note this (Codex task; see §9).

For tall asset-fed edge props placed by `edgePlacement()`, the measured contract
in §4.1 supersedes this earlier cluster-level "roughly half" approximation.

## 3. Asset categories the engine can consume

| Category | Consumable today | Path / hook |
|---|---|---|
| Character sprites (courier, bland, swarmer, bosses) | **Yes** | `assets/sprites/<key>.png` — PNG-first, auto-fallback to procedural |
| Edge prop micro-clusters | **Engine work needed** (renderer slot exists: segment tiles §4) | to be placed by segment composer |
| Road segment textures / overlays | **Engine work needed** — currently procedural tiles | `drawCorridorSegment` |
| Hazard skins (puddle / quicksand) | **Engine work needed** — currently procedural, pre-rendered to sprites at zone build | `drawHazard` |
| Food / pickup sprites | **Yes, small** — currently 40×40 procedural canvases | `FOOD_SPRITES` |
| Full-bleed backgrounds | **NO — permanently retired.** Device-aspect cover-crop destroyed 30–40% of width on tall phones (documented failure, commit `1009183`→revert `44d8518`) | — |
| Complete painted day/night scene pairs | **NO** — day/night is a palette system (§5) | — |

## 4. Sizes (design px) — authoritative table

**Characters** (drawn height = 2 × collision radius × per-sprite scale; deliver
at **2× these sizes** — the engine supersamples at `SPRITE_RASTER = 2`):

| Entity | Collision r | Scale | Drawn height | Deliver at (2×) |
|---|---|---|---|---|
| Courier (player) | 14 | 2.5 | **70 px** | 140 px |
| Bland | 13–17 | 1.8 | 47–61 px | ~120 px |
| Swarmer | 8–10 | 2.2 | 35–44 px | ~90 px |
| Mini-boss (Blandfather) | 32 | 1.7 | ~109 px | ~220 px |
| Main/city boss | 42 (×1.18 city) | 1.7 | 143–168 px | ~340 px |
| Food drop | 11 | — | 40×40 canvas | 80×80 |

**The hero-scale law (from the revert):** no edge/environment prop may exceed the
courier's 70 px drawn height unless its archetype is explicitly flagged `tall`
(frontage silhouettes, lamp posts) — and `tall` props still never exceed ~120 px.
The current procedural kit runs 24–60 px prop heights; that is the calibration.

### 4.1 Tall edge-prop geometry contract — Session 56 freeze

This section governs tall, edge-anchored props placed by `edgePlacement()`. Let:

```text
storedVisibleHeight = visualBounds.y1 - visualBounds.y0
scale               = runtimeHeight / storedVisibleHeight
rho (ρ)             = roadFacingVisibleDepth / storedVisibleHeight
cityFrac            = cityFacingVisibleDepth / storedVisibleHeight

roadIntrusion = ρ * runtimeHeight
outerBleed    = max(0,
                    cityFrac * runtimeHeight - availableCitySideScreenSpace)
```

`roadFacingVisibleDepth` is the source-space distance from the honest
road-facing ground-contact footprint edge/pivot to the road-facing visual bound.
`cityFacingVisibleDepth` is the distance from that pivot to the city-facing
visual bound.

#### A. Hard runtime constraints

The engine's visual road-intrusion cap remains exactly `8 px`. Every applicable
asset must declare a maximum runtime height and pass:

```text
ρ * declaredMaximumRuntimeHeight <= 8 px
```

There is no universal hard `ρ` percentage. At `90 px`, the hard maximum is
`8 / 90 = 8.89%`; at `120 px`, it is `8 / 120 = 6.67%`. The physical footprint
must also remain clear of the protected road. The same numeric formulas apply to
left and right Class-C masters; each master is measured independently.

#### B. Preferred production guidance

New authoring should preserve `30%` headroom below the hard cap. The preferred
maximum projected intrusion is therefore `5.6 px`:

```text
preferred ρ <= 5.6 / declaredMaximumRuntimeHeight
```

At `90 px`, preferred `ρ <= 6.22%`. Failure of this preferred target does not
override a hard pass and does not retroactively invalidate an approved asset.

#### C. Secondary visual heuristics

Visible width:height around `0.5–0.6` may be used as a non-binding composition
check for applicable tall edge props. It cannot validate road intrusion; `ρ` is
the authoritative road-safety quantity. No universal `cityFrac` range is frozen.
City-facing depth is measured per asset, projected against the available
city-side screen space, and visually reviewed at intended runtime height.

A normalized pivot percentage may be recorded diagnostically but is not an
authoring target. The authoritative pivot is the honest road-facing
ground-contact footprint edge. It must never be moved artificially to make an
asset pass.

#### D. Bounds and review requirements

Stored runtime bounds are the numeric values consumed by `EDGE_PROP_DEFS` and
`edgePlacement()`. Literal alpha-pixel bounds may differ by approximately one
pixel because inclusive and half-open coordinate conventions differ. Every
measurement or future validator must name its convention; existing runtime
values must not be normalized silently.

Suitable future automatic checks include stored-bounds presence, declared target
and maximum height, road/city-facing depths, `ρ`, projected intrusion and bleed,
hard/preferred results, pivot containment, and footprint clearance where the
required geometry exists. Human review remains mandatory for honest semantic
footprint selection, handedness and serving direction, readability, acceptable
off-screen composition/clipping, city identity, and detection of a manipulated
pivot.

Runtime mirroring remains prohibited for these Class-C assets. Dedicated left
and right art masters remain required even though their numeric limits are
mirror-symmetric.

**Road segment tile:** exactly **480 × 800**. Rules for seamlessness: side
band/curb geometry identical on every tile; any repeating road marking must use a
vertical rhythm that divides 800 (the engine's centre dash uses step 80). Content
variety comes from the per-segment seed, never from breaking the frame geometry.

**Hazard patches:** ellipses, rx ≈ 24–50, ry ≈ 0.55–0.8 × rx. Must read as
gameplay at a glance: rim contrast ≥ the Art Bible's hazard colour rules; never
decorative.

## 5. Day / night

The engine does day/night as **same geometry + palette swap + additive lamp
pools** (`applyCityTheme`, per-city `night` palette, deterministic night zones).
Production model per Art Bible lighting chapter — confirmed technically correct:

```
one asset + palette-compatible colouring  (+ optional glow overlay)
```

- Assets must be authored **palette-neutral enough to survive the night palette**
  (avoid baked-in strong lighting, baked shadows, baked time-of-day sky colour).
- The existing `assets/props/<city>-<day|night>.png` strip pairs are **legacy** —
  pre-pivot, unapproved under this contract. Do not pattern-match on them.
- **No baked drop shadows or glow halos in any asset.** The engine draws contact
  shadows and glows itself; baked ones caused the "sticker halo" failure.

## 6. What the renderer can and cannot do to an asset

CAN generally: uniform scale · horizontal mirror · global alpha · white hit-flash
(composite-cached) · flat colour tint (composite-cached, used for flavor) ·
pre-render to offscreen canvas once and stamp cheaply.

The environmental edge-prop path is stricter: Class-C edge masters use uniform
positive scale and are never mirrored at runtime, as frozen in §4.1.

CANNOT: rotate sprites in the entity pipeline (only mirror) · hue-shift /
recolour per-pixel at runtime · shaders, blend-mode lighting beyond
source-over/source-in · skeletal or frame animation (animation today = code
wobble/bob; sprite sheets would be **new engine work — negotiable, ask first**).

## 7. Delivery format & pipeline

- **PNG with real alpha** (thresholded trim — no matte fringe), sRGB.
- Sized per §4 (2× for characters), named per `NAMING_CONVENTIONS.md`, with a
  metadata JSON validating against `assets/metadata/asset.schema.json`
  (`tools/validate_asset_metadata.py`, `tools/validate_asset_names.py`).
- Import via `tools/import_art.py` targets; `assets/art_manifest.json` is the
  manifest of record.
- Memory budget: total decoded images per city ≤ **~32 MB**; single image ≤
  1024×1024. Mid-tier Android is the floor device.

## 8. The approval gate (non-negotiable, from the revert)

> An asset is not "approved" until it has been **screenshotted inside the running
> game at target scale, on the corridor build, next to the courier** — and passes
> the Art Bible's own review criteria there.

Approval in an image viewer or chat thread does not count. This gate goes into
`QA_CHECKLIST.md` (Codex task) and later becomes a node in the LangGraph pipeline.

## 9. Surfaced conflicts / amendments requested of the Art Bible (Codex queue)

1. §Camera "76–80% playable" → amend per the §2 ruling (84% collision lane;
   environmental presence via edge bleed).
2. Note the corridor camera truth: vertical scroll only; "world continuation" is
   top/bottom scroll + edge bleed, not horizontal reveal.
3. Lighting chapter: mark separately-painted day/night strip pairs as retired.
4. Implementation-notes mentions of ECS/shaders (in the collaboration brief, not
   the Bible) → replace with §1's actual capability list.

## 10. Open items (owned here)

- Segment composer for asset-fed edge clusters (replaces procedural
  `DAY_ELEMENTS` when approved cluster art exists) — engine work, not started.
- Sprite-sheet animation support — only if the Art Bible's animation chapter
  requires it; costed then.
