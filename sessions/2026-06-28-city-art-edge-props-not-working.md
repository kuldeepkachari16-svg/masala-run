# Session 2026-06-28 — city-art edge-props: regenerated, verified, still NOT working

**Status: PARKED. PM wants to pick this up fresh with a new direction.**
Nothing committed this session. Working tree is dirty (see below). Do NOT commit/push
the `city-art` flip — the approach is being rethought.

## What this session did
1. Regenerated the **Mumbai** prop strips (`mumbai-day.png`, `mumbai-night.png`) with the
   rewritten prompt (BATCH 1 in `prompts/chatgpt_image_batches.md`): isolated props, big
   empty transparent gaps, NO baked ground/shadow/glow. This fixed the earlier fusion.
2. Importer now validates slicing — `tools/import_art.py` `count_prop_bands()` prints
   "N separate props detected" and warns if `< 4`. Both new strips → **7 props, clean.**
3. Placed them in `assets/props/`, flipped local `ACTIVE_THEME` → `city-art`, served at
   `http://localhost:8099/index.html`, PM playtested Mumbai (Z1–5) on device.

## The verdict (PM, with screenshot): NOT optimal — props clip off-canvas
The sliced AI props sit at the **very left/right screen edges and get cut off** by the
canvas boundary (matka, crates, cat, stall, taxi all visibly sheared). Reads as "broken
image cut off," not as set-dressing. PM: *"This is not working."*

## Root cause (the real finding — carry this into the redesign)
There is a **geometric conflict** between the lane layout and representational AI props:
- The open lane is 84% wide: `edgeWalls.w = 0.08`/side ≈ a **~38px gutter** each edge
  (design width `W`≈480).
- Edge props render at `cellScale = 0.155 * w` ≈ **~75px wide** (`drawDayStreet` →
  `drawPropCell`), anchored hard to the edge (`x ≈ w*0.006` left / `x = w - m - dw` right).
- A ~75px prop cannot fit in a ~38px gutter. So it **either overlaps the open lane**
  (bad) **or bleeds off the canvas edge** (current — looks cut/clipped).
- The old "props bleed half off-screen, full-size" convention (from the edgeWalls-0.08
  work, see pickup memory) was tuned for **abstract procedural `DAY_ELEMENTS`** — for
  those, half-off-screen reads fine. For **detailed representational AI sprites** (a whole
  stall, a taxi), half-off reads as a broken/cropped image. That convention does not
  transfer to AI props. **This is the core lesson.**

Secondary (already known): AI props no longer cast a ground shadow (removed to stop the
fusion), so they float slightly. Lower priority than the clipping.

## So the redesign must resolve, up front
Pick AI city flavor that simultaneously: (a) never clips at any aspect, (b) reads as
grounded set-dressing, (c) keeps the center lane fully open, (d) scales across phone↔tablet.
The edge-scatter-at-full-bleed model fails (a). Candidate directions (seeds, not decisions):
- **Inset gutter band:** widen the prop-free→prop gutter and inset props fully on-screen.
  Costs lane width or prop size (38px gutter is too small to read a 75px prop). Likely too
  cramped on narrow phones — probably not enough on its own.
- **Procedural kerb + small procedural props** (drop AI for edges): full positioning
  control, no slicing/clipping risk; loses the AI art richness.
- **Single framing element** (top skyline band / bottom kerb strip) instead of scattered
  edge props — anchor to one safe edge, can't clip sideways.
- **Center-safe full-bleed background:** go back to a full master but compose detail in a
  vertical center-safe column so cover-crop on tall phones keeps the flavor. (Original
  full-bleed failed because detail sat at the *edges* that got cropped — invert that.)

## Working-tree state (uncommitted — `git status` to confirm)
| File | Change | Notes |
|---|---|---|
| `game.js` | `ACTIVE_THEME` → `city-art` (HEAD = `retro-day`) + slice/scatter rework + TDZ fixes | local only |
| `assets/props/mumbai-day.png`, `mumbai-night.png` | regenerated, slice to 7 | good art, bad framing |
| `tools/import_art.py` | `count_prop_bands()` validation | keep — it works |
| `prompts/chatgpt_image_batches.md` | BATCH 1 & 2 rewritten (isolated, no baked ground) | keep — it works |

- **Jaisalmer props** (`assets/props/jaisalmer-*.png`) are still the **OLD fused art** —
  never regenerated. So even if edge-props are revived, Jaisalmer art is wrong (Z6–10).
- HEAD = `44d8518` (revert: city-art → retro-day). Public site is on `retro-day`, untouched.
- The slicing + importer validation + the new prompt are the **salvageable** pieces if the
  next direction still slices a strip. The edge *placement* is what's wrong.

## Resume the local preview / harness (cold-start)
- Static server: `python3 -m http.server 8099` from repo root (this session's PID 26179
  will be dead). Open `http://localhost:8099/index.html`. Hard-reload (⌘⇧R) to dodge SW.
- Verify default theme: `git diff game.js | grep ACTIVE_THEME`.
- Headless screenshot harness (scratchpad scripts are ephemeral, rebuild if needed):
  fresh-profile Chrome on `--remote-debugging-port=9222` + Node CDP
  (`Page.captureScreenshot`); `__mr.setTheme("city-art")` + `__mr.goLevel(n)`. Mumbai =
  Z1–5, night = Z4. **Fresh Chrome profile per edit** or the service worker serves stale
  `game.js`.

## To fully revert to a clean retro-day tree (if next direction starts elsewhere)
`git checkout game.js assets/props/mumbai-day.png assets/props/mumbai-night.png`
(keep `tools/import_art.py` + `prompts/…` — those are good regardless).
