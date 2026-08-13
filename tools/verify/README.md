# Verification harness

> **Purpose:** the reusable headless driver + regression suite, so a session verifies the real build instead of rebuilding a CDP driver first
> **Status:** Living  ·  **Owner:** Claude (engine)
> **Created:** 2026-08-13

Promoted out of scratch in Session 60. Sessions 46–60 each rebuilt a driver from
scratch; this is that work kept. Background, gotchas and the `__mr` API are in
[`docs/verification.md`](../../docs/verification.md) — read it before writing a
new probe, it lists the traps that have each cost a debug cycle.

## Run it

```bash
python3 -m http.server 8899 &                    # serve the repo root

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-sandbox --force-device-scale-factor=1 \
  --hide-scrollbars --remote-debugging-port=9333 \
  --window-size=400,1000 --user-data-dir=/tmp/mr-chrome-prof about:blank &

node tools/verify/regression.js
```

Both are overridable: `MR_URL` (default `http://localhost:8899/index.html`) and
`MR_CDP_PORT` (default `9333`).

`--window-size` decides the design height — `H = clamp(760…1180)` from the
viewport aspect, and `H` decides segment count (`ceil(6*H / 800)`). `400x1000`
gives a tall-phone route; a short window hides repetition problems that only
appear on longer routes. Delete the `--user-data-dir` afterwards, it reaches
~150 MB.

## Files

| File | What it is |
|---|---|
| `cdp.js` | Driver — `connect`, `boot`, `ticks`, `designCrop`, screenshot, console/exception capture. Node 26's built-in `WebSocket`, no dependency to install |
| `regression.js` | The suite: Session 56 geometry contract · Session 50 Test B · Session 51 Test C · Session 57 distribution determinism · cache identity · night treatment. Exits non-zero on any failure |

## Writing a new probe

Require `./cdp.js`, then drive through `s.eval(...)`. Two rules that are not
optional:

- **`await` a real frame between any two pixel grabs.** `__mr.tick(0)` advances
  state but paints on rAF, so back-to-back grabs read the same frame — this
  produced a vacuous "0 pixels changed → PASS" in Session 60.
- **Don't frame-diff to measure a layer.** The rAF loop keeps simulating, so the
  diff catches moving entities. Expose the layer's layout as data and assert on
  geometry instead (`__mr.frontagePlan` is the worked example).
