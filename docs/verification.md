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

## Fallback: raw CDP driver (2026-08-07)

Use when playwright is unavailable or the Claude-in-Chrome extension bridge
fails. Both happened in the Session 46/47 runs — the extension returned
`Cannot access a chrome-extension:// URL of different extension` on every call.

**Do not use `--headless --virtual-time-budget` for anything that needs frames.**
Virtual time will not service `requestAnimationFrame`-awaiting promises, so the
game loop never advances: cached segment tiles are never built, `__mr` state
reads come back empty, and screenshots show a pre-first-frame page. It only
works for a page that finishes its work in timers.

What works — talk to Chrome directly over the DevTools protocol:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox --force-device-scale-factor=1 \
  --hide-scrollbars --remote-debugging-port=9333 \
  --window-size=640,1080 --user-data-dir=<scratch>/chrome-prof about:blank &
```

Then drive it from Node (26+ has a built-in `WebSocket`, so there is no
dependency to install): `GET http://127.0.0.1:9333/json/list` for the page
target, connect to its `webSocketDebuggerUrl`, and use `Page.enable` /
`Runtime.enable` / `Page.navigate` / `Runtime.evaluate` (with
`awaitPromise: true, returnByValue: true`) / `Page.captureScreenshot`. Subscribe
to `Runtime.exceptionThrown` and `Runtime.consoleAPICalled` to assert zero
console errors. This gives real rAF frames, so `await raf()` loops behave.

**Cropping screenshots to the design rect:** the viewport is not the play area.
Read `__mr.layout` (`offX`, `offY`, `scale`) and `__mr.dims` (`W`, `H`), then
crop `(offX, offY) → (offX + W*scale, offY + H*scale)`. Skipping this silently
clips the right edge — exactly where environmental props live.

**Wait for the camera, don't count frames.** Headless `dt` is small, so a fixed
frame count will not converge a `camLerp` follow. Either poll until
`|cam.y - target| < 1` with an iteration cap, or hold `player.y` every frame
while settling.

`--user-data-dir` grows to ~150 MB; put it in scratch and delete it after.

**Dispatched keys must set `bubbles: true`.** The game's `keydown` listener is
registered on `window`, not `document`. `document.dispatchEvent(new
KeyboardEvent("keydown", {key:"1"}))` silently does nothing — `KeyboardEvent`
defaults to `bubbles:false`, so it never reaches the `window` listener.
Dispatch on `window` directly, or pass `bubbles:true` if dispatching on
`document`. (Cost a full debug cycle in Session 57 chasing a "frozen camera"
that was actually a stuck POWER UP modal the auto-dismiss never reached.)

**A stationary teleport-heavy diagnostic walk gets the player killed.**
Repeatedly setting `player.y` without moving lets aggro'd enemies swarm a
target that never dodges — `hp` hits 0, `state` leaves `"playing"`, and
`__mr.tick()` becomes a no-op forever after (it only calls `update()` when
`state === "playing"`), which looks exactly like a frozen camera/composer.
Set god mode (`player.maxHp = player.hp = 99`) every tick batch, not just
once, for any walk longer than a few seconds.

**Bypassing the boss lock inflates wave-gate density — don't over-tick after.**
`CONFIG.corridor.waveGates` are spaced evenly from `startY` to the main-boss
trigger; inflating `CONFIG.boss.mainWave` (e.g. to `999`) to dodge a real
`startBossFight()` camera-lock during a full-route walk makes gates ~1px
apart, so a single big teleport crosses dozens of them. The wave-advance
check fires at most once per `update()` call, so it's tick-count-bounded —
but "gates crossed" is jump-distance-bounded, and *both* stacked "WAVE N"
announcement banners and elevated spawn rate follow. For a diagnostic that
needs many small ticks anyway (a composer walk), this is cosmetic noise you
can ignore. For a screenshot, crank `CONFIG.corridor.camLerp` (e.g. to `400`)
instead so the camera converges in ~10 ticks rather than ~90 — far fewer
gates get crossed in the same real time, and the shot stays clean.

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
`barriers`, `hazards`, `mods`, `powers`, `cam`, `layout` (offX/offY/scale/dpr),
`dims` (W/H), `route` (routeLen / startY / goalY / progress / waveGates),
`edgeProps` (asset-fed prop placement envelopes + test instances),
`edgeComposer` (per-segment edge claims, rejects with reasons, budget usage).

Edge-prop / composer debug overlay: `__mr.config.edgeProps.debug = true`
(off by default; draws per frame in world space, never into a cached tile).

Gotcha: `W` is the fixed design width (480), **not** `canvas.width`.
