# Masala Run — Visual Themes

The entire look (backdrop images + procedural-street palette + vignette) is bundled
into a **named theme**, so we can A/B, migrate, or fully revert the art direction by
editing **one line** of code. This is intentionally **not** a player-facing setting —
it lives in `game.js`, not the in-game settings panel.

## The switch

```js
const ACTIVE_THEME = "night-v1"; // game.js, in the "Visual themes" block
```

Change that constant and reload. That's the only thing that ships.

## Themes that exist

| Theme        | Look                          | Backdrops                         | Status        |
|--------------|-------------------------------|-----------------------------------|---------------|
| `night-v1`   | Shipped night street (AI art) | `assets/themes/night-v1/*.jpg`    | **Active**    |
| `retro-day`  | Daytime pixel-retro direction | `assets/themes/retro-day/*.png`   | Art pending   |

`night-v1` is the archived, known-good look — keep it untouched. If we ever re-master
those scenes, add `night-v2` rather than overwriting, so revert stays one constant away.

## Live preview while developing (dev console only)

```js
__mr.themes              // ["night-v1", "retro-day"]
__mr.activeTheme         // current name
__mr.setTheme("retro-day")  // loads that theme's art + palette live, rebuilds the backdrop
__mr.setTheme("night-v1")   // back
```

This does **not** persist — it's for eyeballing on a device. Shipping a theme = editing
`ACTIVE_THEME`.

## Anatomy of a theme (in `game.js` → `THEMES`)

```js
"retro-day": {
  vignette: 0.14,                 // edge-darken strength (night ~0.4, day ~0.14)
  bg: { 1: "...bg-1.png", ... },  // level → portrait backdrop master (9:16)
  pal: { baseTop, baseBot, path, curb, dash, lamp,
         stall, awningA, awningB, crate, crosswalk }, // procedural-street fallback colors
}
```

- **`bg`** — the real look. Per-level portrait images, cover-fit to the arena.
- **`pal`** — only used by the procedural `drawStreet` fallback (landscape, the gap
  before an image loads, or un-arted levels). Keeps a missing image from showing the
  *wrong time of day*.
- **`vignette`** — radial edge darken. Lower it for daytime.

## Adding the `retro-day` art

1. Generate portrait (9:16) pixel-retro day backdrops — see the prompt block below /
   in the session notes.
2. Save them as `assets/themes/retro-day/bg-1.png … bg-4.png`.
3. Add those paths to `sw.js` `ASSETS` (and bump `CACHE` to `masala-run-v7`) so they
   cache for offline play.
4. Flip `ACTIVE_THEME = "retro-day"`.

## Files

- `game.js` — `THEMES`, `ACTIVE_THEME`, `drawStreet(pal)`, `buildBackdrop()`.
- `assets/themes/<name>/` — that theme's backdrop masters.
- `sw.js` — caches the **active** theme's images (others still cache on first fetch).
