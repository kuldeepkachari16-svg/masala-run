# Technical Asset Contract

Owner: **Claude (gameplay/integration engineering)** — per `docs/project/AI_COLLABORATION.md`.
Authority: creative intent is the Art Bible's; **what the runtime can consume is this
document's**. When they conflict, the conflict is surfaced explicitly (see §9) — neither
side silently overrides the other.

Every number in this contract is read from the shipped engine (`game.js`, main @
`40f307d`, corridor build), not from aspiration. If the engine changes, this document
changes in the same commit.

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

CAN: uniform scale · horizontal mirror · global alpha · white hit-flash
(composite-cached) · flat colour tint (composite-cached, used for flavor) ·
pre-render to offscreen canvas once and stamp cheaply.

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
