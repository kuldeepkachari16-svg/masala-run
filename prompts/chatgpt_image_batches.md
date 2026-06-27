# Masala Run — ChatGPT image batches (copy-paste ready)

Generated from `assets/art_manifest.json`. **Workflow:** open ChatGPT web (image
generation), paste **one batch block at a time** (the whole block, style bible +
all numbered prompts), generate, then **download each image and rename it to the
`SAVE AS` label** before dropping it into `assets/incoming/`. Then run
`python3 tools/import_art.py`. See `ART_PIPELINE.md`.

> **Why batches:** keeping a city's images (or a sprite set) in one conversation
> keeps the style consistent. Generate a whole batch before moving on. If one
> image is off, regenerate just that numbered prompt in the same chat so it stays
> on-style.

---

## BATCH 1 — Mumbai prop strips (2 images, TRANSPARENT)

> These are NOT full backgrounds. The game draws the road procedurally and tiles
> these transparent prop columns down BOTH arena edges (so they work on every
> device size with no crop). You're drawing ONE curb's worth of props on a clear
> background — nothing else.

```
You are generating game art for a mobile top-down survivors-like set in Indian
street-food cities. I need transparent PROP STRIPS. Apply this STYLE BIBLE to every
image in this batch:

STYLE BIBLE
- Flat clean illustration, Survivors.io-grade polish. Bold simple shapes, limited
  flat color fills, soft cel shading. NOT painterly, NOT photoreal, NOT pixel-art,
  NOT a 3D render.
- Top-down / steep three-quarter view of the props.
- FULLY TRANSPARENT background (PNG alpha). NO road, NO ground, NO pavement, NO
  kerb — only the objects and a soft contact shadow directly under each.
- CRITICAL LAYOUT: arrange the props in ONE tall, narrow VERTICAL COLUMN, evenly
  spaced top-to-bottom with small gaps. Do NOT spread them horizontally.
- Warm Indian street-food palette, but MUTED so the props recede behind gameplay.
- Portrait 2:3 canvas (1024x1536); the column sits down the middle, rest transparent.
- ABSOLUTELY NO: text, letters, numbers, signage with words, logos, watermarks,
  signatures, UI, frames or borders. No people/characters. No hazards.
- The day and night image must be the SAME props in the SAME order, only the
  lighting changes.

Generate image 1 of 2:
1. [SAVE AS: mumbai-day] A vertical column of Mumbai street-food curb props, warm
   overcast MONSOON DAYLIGHT, on a fully transparent background: a blue-tarp
   chaiwala stall, a wooden vada-pav cart, a crate of oranges and greens, a
   green/yellow auto-rickshaw, a red-striped-awning snack stall, a clay matka pot,
   a black-and-yellow Padmini taxi. Soft diffuse contact shadow under each. Muted.
   No road, no background, no text, no people.
```

Then, in the SAME chat, send:

```
Generate image 2 of 2 — keep the EXACT same props in the same order, change only
the lighting to night:
2. [SAVE AS: mumbai-night] The SAME Mumbai prop column at NIGHT, transparent
   background. Each stall lit by warm sodium bulbs with a soft warm glow pool baked
   UNDER it; cooler blue-grey ambient on the bodies. Same props, same order. No
   road, no background, no glowing sign lettering, no text, no people.
```

---

## BATCH 2 — Jaisalmer prop strips (2 images, TRANSPARENT)

```
Same game, same STYLE BIBLE as before (flat clean Survivors.io illustration,
top-down props in ONE vertical column, FULLY TRANSPARENT background, NO road/ground,
muted, portrait 2:3 canvas, NO text/logos/people, NO hazards). New city: Jaisalmer,
the golden sandstone desert city. Day and night must be the SAME props, only the
lighting changes.

Generate image 1 of 2:
1. [SAVE AS: jaisalmer-day] A vertical column of Jaisalmer desert-town curb props,
   bright golden DESERT DAYLIGHT, on a fully transparent background: carved
   golden-sandstone stall fronts, a wooden ghevar/kachori cart, a brass-pot vendor,
   woven baskets, a low sandstone bench, a potted desert shrub, a resting camel.
   Warm long soft contact shadow under each. Muted. No ground, no background, no
   text, no people.
```

Then, in the SAME chat, send:

```
Generate image 2 of 2 — keep the EXACT same props in the same order, change only
the lighting to a clear desert night:
2. [SAVE AS: jaisalmer-night] The SAME Jaisalmer prop column at NIGHT, transparent
   background. Each stall lit by warm amber lantern glow pooling UNDER it; cool
   deep-blue ambient on the bodies. Same props, same order. No ground, no
   background, no lantern lettering, no text, no people.
```

---

## BATCH 3 — Hero + grey enemies (3 images, TRANSPARENT)

```
Now I need game CHARACTER SPRITES for the same game. Apply this STYLE BIBLE to
every sprite in this batch:

SPRITE STYLE BIBLE
- Flat clean mascot illustration, Survivors.io-grade. Bold simple shapes, flat
  color fills + ONE soft cel shade, thin restrained dark outline. Chibi
  proportions (big head, small body) so it reads at small size.
- ONE single character, CENTERED, with even margin around it. Whole body in frame
  (not cropped).
- TRANSPARENT background. No scene, no ground, no baked drop-shadow.
- Square 1:1 (1024x1024).
- ABSOLUTELY NO: text, letters, logos, watermarks, multiple characters, weapons,
  oversized props, or any background. Keep props small so they never dominate.

Generate sprite 1 of 3:
1. [SAVE AS: courier] The hero — a chibi Indian street-food courier, 'The Tiffin
   Runner'. Steep three-quarter top-down view, facing the viewer / slightly down.
   Red delivery cap with a saffron band, dark hair peeking out, warm brown skin,
   mustard shirt, tied cream apron (neck straps + waist bow + pocket), navy
   trousers. Holds a SMALL 2-tier steel tiffin/dabba at the side (small, must not
   dominate). Vibrant and warm, plucky and friendly. Transparent background.
```

Then, in the SAME chat:

```
Generate sprite 2 of 3 — same style bible, but this is the ENEMY, fully GREY and
desaturated (it is the anti-flavor; everything about it stays grey/matte):
2. [SAVE AS: bland] 'The Bland' — a smug grey lumpy blob creature, fully
   desaturated grey. Smug face: angled brows, low beady pupils, a smug closed mouth
   with a tiny tongue, a couple of small drips. Slightly cute, love-to-hate.
   Standing, facing viewer. Chibi, simple, bold silhouette. Transparent background.
```

Then, in the SAME chat:

```
Generate sprite 3 of 3 — same grey family as the Bland, but small, spiky and fast.
Its silhouette must be clearly DIFFERENT from the round grunt:
3. [SAVE AS: swarmer] A small spiky grey wisp — a fast little cousin of the Bland.
   Smaller and sharper, a few spiky points around a grey body, two tiny angry eyes,
   reads as quick and aggressive. Same grey desaturated family. Centered, facing
   viewer. Spiky (NOT round like the grunt). Transparent background.
```

---

## BATCH 4 — Bland bosses (3 images, TRANSPARENT)

```
Same SPRITE STYLE BIBLE as the previous batch (flat clean chibi mascot, ONE
centered character, transparent background, thin dark outline, no text/logos, no
scene). These are three BOSS versions of the grey Bland — each is a bigger,
dressed-up Bland. Keep the grey blob family consistent; the regalia is the tell.

Generate boss 1 of 3:
1. [SAVE AS: blandfather] 'The Blandfather' — a bigger, meaner grey Bland mob-boss.
   Same grey blob family, larger and tougher, wearing a dented grey mobster
   fedora/goon cap and a grey mustache. Smug, menacing, slight scowl. Standing,
   facing viewer. Chibi-but-imposing. Grey only (hat can be a slightly darker
   grey). Transparent background.
```

Then, in the SAME chat:

```
Generate boss 2 of 3 — the grandest Mumbai city boss. Bigger than the Blandfather:
2. [SAVE AS: vada-maharaja] 'The Vada Maharaja' — a grand Bland king. Big
   purple-grey blob body, a TALL ornate GOLD crown, a curled royal mustache,
   imperious smug expression. Largest and most decorated of the bosses. The body
   stays grey/purple-grey; only the crown is gold (the one warm accent). Standing,
   facing viewer. Imposing but comic. Transparent background.
```

Then, in the SAME chat:

```
Generate boss 3 of 3 — the grandest Jaisalmer desert city boss. Its headpiece must
read clearly DIFFERENT from the Vada Maharaja's gold crown:
3. [SAVE AS: dune-raja] 'The Dune Raja' — a grand desert Bland king. Big sand-grey
   blob body, a tall LAYERED DESERT TURBAN (pagari) as the crown, imperious smug
   expression. Largest desert boss. Body stays sand-grey/desaturated; the turban
   carries warm desert ochre. Standing, facing viewer. Imposing but comic.
   Transparent background.
```

---

## Quick checklist before you import

- [ ] Each file renamed to its `SAVE AS` label (e.g. `mumbai-day.png`,
      `courier.png`) — extension `.png`.
- [ ] Prop strips: TRANSPARENT background, one vertical column of props, no road/ground, no text.
- [ ] Sprites: transparent background, one centered character, no text.
- [ ] All files dropped into `assets/incoming/`.
- [ ] Run `python3 tools/import_art.py` (add `--apply` to actually move them).
