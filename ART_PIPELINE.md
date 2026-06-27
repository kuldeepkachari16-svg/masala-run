# Masala Run — Art Pipeline

How city-flavored backgrounds and character sprites get made (ChatGPT web, by
hand) and wired into the game (local scripts). Manual generation, automated
ingestion — no OpenAI API, no browser automation.

```
art_manifest.json  ──►  batch prompts  ──►  ChatGPT web (you)  ──►  download + rename
       ▲                                                                   │
       │                                                                   ▼
   (Claude edits)                                              assets/incoming/
       │                                                                   │
       └──────────  import_art.py (validate/optimize/place)  ◄─────────────┘
                                     │
                                     ▼
                   assets/props/ + assets/sprites/  ──►  game reads it
```

## Files at a glance

| File | What it is |
|------|------------|
| `assets/art_manifest.json` | Source of truth: every asset, its scene/style/negative prompt, dimensions, acceptance criteria, and target path. |
| `prompts/chatgpt_image_batches.md` | Copy-paste-ready ChatGPT batches (style bible + numbered prompts + `SAVE AS` labels). |
| `tools/import_art.py` | Local validate / rename / optimize / place script (Python + Pillow). |
| `assets/incoming/` | Drop your downloaded images here. |
| `assets/props/` | Final transparent edge-prop strips (`<city>-<day|night>.png`) — tiled down both arena edges by the game. |
| `assets/backgrounds/` | Legacy full-bleed masters (unused by city-art; kept for cover-fit themes). |
| `assets/sprites/` | Final character sprites (`<key>.png`). |
| `assets/reference/` | Optional: style refs you want to keep around. |

## The v1 asset set (2 cities)

- **Prop strips (4):** `mumbai-day`, `mumbai-night`, `jaisalmer-day`, `jaisalmer-night`.
  TRANSPARENT vertical columns of a city's curb props (no road baked in). The game
  draws the road procedurally and tiles each strip down **both** arena edges
  (`drawCityEdges`), so they show on every device aspect with **no crop**. Day strip
  for zones 1–3 & 5, night strip for the night zone (zone 4). Hazards (puddles /
  sand) are **not** in the art — the game draws them on top, per zone.
- **Sprites (6):** `courier` (hero), `bland` (grunt), `swarmer`, `blandfather`
  (mini-boss), `vada-maharaja` (Mumbai boss), `dune-raja` (Jaisalmer boss).
  Transparent PNGs. Food stays procedural by design (it's a power token, not a
  character — reads better crisp).

---

## 1. Ask Claude to generate / update the manifest

Say e.g. *"update the art manifest — add a new city Kolkata"* or *"regenerate the
Jaisalmer background prompts, make them dustier."* Claude inspects `game.js`
(`CITIES`, `THEMES`, `SPRITE_SRC`) and updates `assets/art_manifest.json` +
`prompts/chatgpt_image_batches.md` so they match the actual game. **You don't
hand-edit the manifest** — it's kept in sync with the code.

## 2. Generate in ChatGPT web

1. Open `prompts/chatgpt_image_batches.md`.
2. Copy **one whole batch block** (style bible + its numbered prompts) into ChatGPT
   web image generation. Do a batch at a time — same chat keeps the style consistent.
3. Generate each numbered image. If one is off, regenerate **just that prompt in the
   same chat** so it stays on-style.

## 3. Download + rename

For each image, download it and **rename it to its `SAVE AS` label** with a `.png`
extension — e.g. `mumbai-day.png`, `courier.png`. The label is exactly what the
import script matches on.

## 4. Drop + import

1. Put every renamed file into `assets/incoming/`.
2. Dry-run (validates, shows the plan, writes nothing):
   ```
   python3 tools/import_art.py
   ```
   It reports OK / FAIL per file, plus **missing** (manifest assets you haven't
   dropped) and **unexpected** (files in incoming/ that match no label).
3. When it looks right, apply:
   ```
   python3 tools/import_art.py --apply
   ```
   This optimizes each file (prop strips → trimmed to the prop column on a thresholded
   alpha, transparency preserved; sprites → trimmed + downscaled, transparency kept),
   writes it to its `target_path`, and archives
   the raw source to `assets/incoming/_processed/`.

Flags: `--force` overwrites an already-approved asset (otherwise it's kept and
warned about); `--only <id-or-label>` does a single asset.

## 5. See it in the game

Backgrounds and sprites are wired behind safe fallbacks, so they light up as soon
as the files exist.

- **Sprites** load automatically: `assets/sprites/<key>.png` overrides the
  procedural/SVG art with **no code change**. Reload the game — the new hero / Bland
  / boss appears. Until a PNG exists, the old look stays (nothing breaks).
- **Backgrounds** live under the `city-art` theme. Preview live in the dev console:
  ```js
  __mr.setTheme("city-art")   // loads city backgrounds, falls back to procedural
  __mr.setTheme("retro-day")  // back to the shipped procedural look
  ```
  To **ship** the city backgrounds, set `ACTIVE_THEME = "city-art"` in `game.js`
  (one line, top of the file — see `THEMES.md`).

**Verify it loaded** (dev console):
```js
__mr.sprites      // { courier:true, bland:true, swarmer:false, ... } — true = PNG/art loaded
__mr.themes       // includes "city-art"
```

### Tuning new sprites

The AI sprite's in-game size/anchor is tuned via `CONFIG.sprites` (live-editable):
```js
__mr.config.sprites.boss.scale = 1.6   // shrink the city boss
__mr.config.sprites.swarmer.yOff = -4  // nudge the swarmer up
```
Find good values live, then bake them into `CONFIG.sprites` in `game.js`.

### Cache for offline / PWA

After `--apply`, add the new file paths to the `ASSETS` array in `sw.js` and bump
`CACHE` (e.g. `masala-run-v24`) so they cache for offline play. **Only add files
that exist** — `sw.js` install fails if a listed path 404s. (The import script
prints this reminder.)

## 6. When an image needs regenerating

- It **failed validation** (wrong aspect, no transparency, too small): the script
  tells you why. Re-open the matching prompt in `prompts/chatgpt_image_batches.md`,
  regenerate, re-drop, re-run.
- It **passed but looks wrong** in game (hazard baked in, busy centre lane, props too
  big, off-style): tighten the prompt's `negative` / `readability` line in the
  manifest (ask Claude), regenerate, and re-import with `--force` to overwrite.
- Raw originals you imported sit in `assets/incoming/_processed/` if you need them.

## Acceptance bar (what "good" means)

- **Prop strips:** TRANSPARENT background, ONE vertical column of curb props, **no
  road/ground baked in**, **no hazards / no text / no people**, day & night are the
  same props in the same order.
- **Sprites:** one centered character, **transparent background**, no text, correct
  proportions (small props), reads clearly at small size.

Full per-asset criteria live in `assets/art_manifest.json` → each asset's
`acceptance` array.
