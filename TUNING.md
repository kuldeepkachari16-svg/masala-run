# Masala Run — Tuning Protocol

#project/masala-run

How we (PM + Claude) tweak the game from feedback. **You speak in outcomes; I speak in knobs.** You never touch code.

## Where the knobs live
All in `CONFIG` (top of `game.js`) + the `DIFFICULTY` map. Live-tunable on a device via the browser console: `__mr.config.boss.hp = 40` takes effect instantly, no redeploy. Once a value feels right, I bake it into `CONFIG` permanently.

## Two ways to apply a change
- **Between sessions:** you give feedback → I edit `CONFIG` → push → live in ~10 min.
- **Live during a playtest:** open console on the phone, type `__mr.config.X = Y`, A/B the value mid-run, then I bake the winner in.

## Symptom → knob cheat sheet

| You say | I turn | Direction |
|---|---|---|
| "too many enemies early" | `spawnBase` ↑ / `swarmerShare` ↓ | fewer |
| "wave 3 is a wall" | `swarmerShare[2]` ↓ | gentler |
| "enemies are bullet sponges" | `scalingCapWave` ↓ / `enemies.bland.hpPerWave` ↓ | softer |
| "enemies too fast / slow" | `enemies.bland.spdBase`, `spdPerWave` | speed |
| "swarmers too brutal" | `enemies.swarmer.spdBase` ↓ / `packMax` ↓ | gentler |
| "flavor runs out too fast" | `FLAVOR_DURATION` ↑ | longer |
| "not enough food" | `enemies.bland.drop` ↑ / `foodLife` ↑ | more |
| "boss takes forever" | `boss.hp` ↓ | shorter |
| "boss charges too often" | `boss.chargeEvery` ↑ | rarer |
| "boss too easy to dodge" | `boss.chargeSpeed` ↑ / `boss.recover` ↓ | tighter |
| "powers come too fast/slow" | `powers.rush.eats`, `powers.slam.kills` | threshold |
| "Masala Rush too short" | `powers.rush.dur` ↑ | longer |
| "boons too weak/strong" | edit values in `applyBoon()` | per-boon |
| "whole game too hard/easy" | the `DIFFICULTY` multipliers | global |

## Current baseline (2026-06-12)
- Waves: 20s + 3s breather; stats cap at wave 5
- Boss at wave 5 (THE BLANDFATHER), 55 hp on normal
- Difficulty default: normal (easy ≈ 0.8× enemy hp/speed, slower spawns)
- Powers: Rush @ 10 eats, Slam @ 28 kills
