# Verification & Debug Reference

How to drive and verify Masala Run headlessly, plus the `__mr` debug API.
(Moved out of session memory 2026-07-11 — this is the durable copy.)

## Headless verification recipe (works as of 2026-07-11)

- Serve the repo root: `python3 -m http.server`.
- Drive with **playwright-core + system Chrome** (`channel: "chrome"`, headless).
  Playwright's own browsers are NOT installed on this machine — always use the
  `chrome` channel.
- Simulate movement: dispatch `KeyboardEvent` keydown `"w"`, then loop
  `__mr.tick(1/60)` with periodic `requestAnimationFrame` awaits, then screenshot.
- Auto-pick POWER UP modals by dispatching key `"1"`.
- God mode: set `__mr.player.maxHp = __mr.player.hp = 99` (draws 99 hearts —
  cosmetic only, useful for surviving long drives).
- The old preview-tab rAF-pause gotchas do **not** apply to this path.

Proven flows: full delivery route, both bosses, zone-2 auto-advance, arena flip
(`setCorridor(false)`), death path — with screenshots read at each step.

## `__mr` debug API

Actions:
- `goLevel(n)` — jump to zone n
- `bossNow(main)` — force boss spawn (main or mini)
- `resetProgress()` — wipe saved progress
- `tick(dt)` — deterministic simulation step (e.g. `1/60`)
- `setTheme(...)` — apply a city theme
- `setCorridor(bool)` — live corridor/arena A/B flip (restarts zone)
- `showBarriers` — toggle barrier overlay
- `config` — live handle on `CONFIG` (device-side tuning)

Getters: `player`, `enemies`, `foods`, `build`, `boons`, `sprites`, `flavor`,
`barriers`, `hazards`, `mods`, `powers`, `cam`,
`route` (routeLen / startY / goalY / progress / waveGates).

Gotcha: `W` is the fixed design width (480), **not** `canvas.width`.
