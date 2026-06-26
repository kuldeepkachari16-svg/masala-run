# Masala Run — Character sprites (design spec v1)

**Purpose:** give the two leads real character so the game reads as likeable at a
glance (try-rate driver, per `ROADMAP.md` commercial north-star). Scope is
deliberately **two characters** for the test phase — not the whole cast.

## Method reversal (2026-06-27) — now AI-generated for the commercial pivot
The 2026-06-21 decision below locked sprites as **SVG→PNG, NOT AI-generated**,
because AI image-gen kept making props too big / pulling focus. That is **reversed**
for the commercial direction (Survivors.io-grade art): hero, Bland, swarmer, and
all three bosses are now **AI-generated via ChatGPT web** through the art pipeline
(`ART_PIPELINE.md`, `assets/art_manifest.json`). The old proportion-control risk is
mitigated in the prompts, not the tool: every sprite prompt forces a single centered
character, fixed chibi proportions, deliberately **small** props, a transparent
background, and no scene. The authored SVGs (`courier.svg`, `bland.svg`) remain as
the **fallback** — the loader prefers `assets/sprites/<key>.png` and falls back to
the SVG/procedural blob, so nothing breaks before the art lands. Backgrounds also
move to AI art (the `city-art` theme); other props stay procedural.

## Decisions (locked 2026-06-21 — method since superseded; see reversal above)
- **Method:** *hybrid* — authored sprites for the hero/villain, everything else
  (props, backdrops) stays procedural. Sprites are **authored in SVG and
  rasterized to PNG**, not AI-generated. Why SVG: exact proportion control (the
  recurring pain with AI image-gen — props too big, focus pulled), inherently
  clean-flat (no "looks too realistic" problem), asset-light, on-brand with the
  procedural backdrops. AI gen may be used only as a look-reference.
- **Style:** clean-flat mascot (POWER-UP-adjacent), bold simple shapes, thin dark
  outline for readability over busy backdrops, minimal detail, chibi proportions.
- **The contrast is the pitch:** vibrant warm Courier vs grey, color-draining
  Bland. Tells "flavor vs blandness" in one frame → store icon / screenshot.

## The two leads
### Courier — "The Tiffin Runner" (locked: concept v2)
- Young Indian street-food courier. Chibi (big head, small body) so it reads at
  arena scale and stays charming.
- **Signature:** a small steel **tiffin/dabba** (2-tier, held at side — kept small
  so it doesn't dominate).
- Dark hair framing the face + peeking under a clear **red delivery cap** (side
  brim, saffron band). **Tied apron** — neck straps + waist band with a bow +
  pocket (must read as an apron, not a plain panel).
- Warm vibrant palette: saffron/orange cap, mustard shirt, cream apron, warm
  brown skin, navy legs. Pops against the day-street ground.

### The Bland (locked: concept v1 — the smug standing blob)
- Grey lumpy blob, **smug** read: angled brows, low beady pupils, a smug closed
  mouth + tiny tongue, a couple of drips. Slightly cute, love-to-hate.
- Fully desaturated grey — the anti-flavor. Bosses = dressed-up Bland variants
  (Blandfather = mob hat/mustache; Maharaja = crown). Swarmer = small Bland.
- Rejected alt: a "greedy gulper" vacuuming color (v2) — more active but the
  smug standing version read better.

## Color-drain — parked as optional juice (NOT core)
Tie arena saturation to how the player is doing: world desaturates toward grey
when the flavor meter / HP is low, color floods back as you eat and fight. Ambient
feedback that reinforces the theme **without** adding anything to track (stays
inside the "flavor + one meter" rule). Ship *after* sprites, only if it lands;
otherwise the drain stays a screenshot/icon device. Does not drive the art.

## Build order
1. Finalize the two SVGs (minor proportion nits) → rasterize to PNG sprite(s).
2. Sprite-load + draw pipeline: load PNG(s), draw at the entity's position/scale,
   replace the procedural blob for the player first, then the Bland. Cache in
   `sw.js`. Keep a procedural fallback if an image fails.
3. Bosses/swarmer as Bland variants (recolor/scale/props) — later.
4. (Optional) the color-drain juice layer.

## Non-goals (v1)
Full cast, walk/idle animation sheets, per-frame animation — premature before the
loop is validated (Gate 1). Two strong static sprites carry the read.
