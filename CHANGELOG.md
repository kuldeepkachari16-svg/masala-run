# Masala Run — Changelog

## 2026-06-14 — solid stall walls (light "realism")
- **Side stalls are now impassable.** Each level gets invisible **edge walls** (`CONFIG.edgeWalls`, 15% of width per side) so the player AND the Bland can't walk into the painted shops — the open center lane is the playfield. Realistic, aligns across phone sizes, no pathfinding needed.
- Generalized barrier collision to **all enemies** (`resolveBarriers(entity)`, circle-vs-AABB with sliding) — obstacles are solid for the Bland now, not just the player. Bosses excluded (hold their ground).
- Barriers are **invisible in play** (the painted item is the obstacle). Debug authoring overlay: `__mr.showBarriers = true` draws the collision rects in red to align them to art.
- Spawns + boss-food now respect the lane (enemies no longer spawn inside the walls). Cleared the old floating center barriers from L3–L6 (chose "solid edges only", open center).
- ⚠️ Note: L1's playable width is now ~70% (bounded to the lane) — slightly tighter dodging room for the playtest. Tune via `__mr.config.edgeWalls.w` if it feels cramped.
- Engine note: per-level field obstacles + enemy pathfinding deferred (gated on playtest) — `barriers: []` per level is ready to hold extra rects when/if we go there.

## 2026-06-14 — playtest feedback pass
- **Main boss death now has weight.** Killing THE BLAND MAHARAJA no longer cuts straight to LEVEL CLEAR — it slumps in a greyed-out "defeated" pose (X eyes, toppling crown, smoke) for ~1.9s (`CONFIG.bossDefeat`) with a **"MAHARAJA DEFEATED!"** callout, then clears. Spawns pause during the beat. Mini-boss unchanged.
- **Movement feel:** added a flavor-tinted **motion trail** (dust puffs lagging behind the player while moving) so movement reads as kinetic, not a sprite sliding on glass. Addresses the "something feels off" note.
- **"Vanishing Blands" fixed — root cause was enemy stacking.** Blands had no separation, so a flock collapsed onto one point; killing the top one revealed the one beneath, reading as "vanish → reappear, flock shifts a tad." Added a light separation pass (`separateEnemies`) — enemies gently push apart and read as distinct creatures. Bosses hold their ground.
- **Spawn telegraph visibility** (secondary polish): Blands materialize more visibly (higher min opacity, start half-size, brighter closing ring) so spawns read clearly on the dark backdrops, not as a flicker.

## 2026-06-14
- Real graphics: **per-level backdrops** (portrait masters, AI-generated 9:16, cover-fit, vignette on top). `LEVEL_BG_SRC` maps level→image; backdrop rebuilds on level start. First binary art assets — added to the PWA cache (`sw.js` → `masala-run-v5`).
  - **L1** = painterly Indian night-bazaar (`assets/bg-street.jpg`, ~277 KB) — vivid, sells the color-drain premise
  - **L2** = flat minimal vector lane (`assets/bg-street-2.jpg`, ~120 KB) — sparse, "game-as-hero" look
  - **L3** = 16-bit pixel-art lane (`assets/bg-street-3.jpg`, ~308 KB) — retro, pairs with the chiptune score
  - **L4** = comic / cel-shaded lane (`assets/bg-street-4.jpg`, ~409 KB) — bold ink outlines, matches the game's playful-comic voice
  - L5–6 fall back to the procedural street for now; menu uses L1's art. Four distinct styles (painterly / flat / pixel / comic) — playtest decides whether "every level looks different" lands as a feature
  - Landscape still uses the procedural street (no landscape art yet); `drawStreet` is also the load-time fallback. Centers kept dark/calm so grey Bland + food stay readable
- Watch-item for playtest: L1's right-edge string-light dots are the one near-play element roughly food-colored — desaturate in a v2 if testers misread them

## 2026-06-13
- Pacing: shorter waves (`waveLength` 20→14, `breather` 3→2.5) so a full level ≈ 2.5–3 min — tuned for "one more go" in playtests. Live-tunable via `__mr.config`
- Teach-by-doing: every level opens with one chilli right next to the player, so the eat → attack link lands in the first seconds
- Level select screen + progression: levels unlock one at a time (clear to unlock next), progress persists (`mr_progress`), auto-resumes at the last unfinished level. Menu → SELECT LEVEL hub
- Every level starts with a **fresh setup** — main-boss defeat no longer gives a boon; it shows LEVEL CLEAR → unlock next. (Mini-boss boon still applies, for that level only)
- Per-level difficulty (config-driven, marginal step-up) via two levers in `CONFIG.levels`: **enemies** (hp/speed/spawn mults) and **barriers** (static crates blocking player + bullets). Level 1 = clean (no barriers) — the focus level for playtesting; later levels are provision
- Level structure: 1 level = 8 waves (wave 5 = mini-boss, wave 8 = main boss). Killing the main boss → pick a boon → loops into the next level (same content for now; new-level design TBD)
- Main boss THE BLAND MAHARAJA (wave 8): bigger/tougher than the Blandfather, charges harder, summons the odd swarmer, gold crown + HP bar. `__mr.bossNow(true)` jumps straight to it for testing
- Difficulty: waves 6 & 7 eased (post-boss spawn ease now covers both; lower swarmer share) — first level shouldn't spike late
- Background music volume raised (~1.9×)
- NOM MODE (temporary easter egg): Settings → Secret → "NOM mode" (off by default) routes `start()` into a self-contained 3-phase universe — nibblers (race you to food) → INSERT COIN toll signs → NOM, a giant hungry mouth that bloats on food; overfeed it chilli till it pops → "NOM IS FULL!" win. Reuses the core engine, zero impact on main-game balance
- Joystick: floating + transparent by default (`anywhere` mode) to reduce thumb occlusion; follow-camera logged as feedback-gated future scope in ROADMAP
- Settings menu redesigned into labeled sections: Gameplay / Controls / Audio / Display
- Power button active state now reads as "running" (filled disc + depleting timer arc), not "ready"
- Post-boss re-entry ease: longer breather + softer spawns on the wave right after a boss (`CONFIG.postBoss`)

## 2026-06-12
- Two manual powers: MASALA RUSH (freeze Bland 6s + flavor-lock + speed, ~10 eats) and THALI SLAM (slow-mo tri-flavor screen-clear, ~28 kills); right-side buttons, auto/manual setting, Q/E keys
- Powers vs bosses: Rush slows boss 40% (not freeze), Slam damages normally; auto-mode fires staggered
- Wave-5 mini-boss THE BLANDFATHER (stalk → charge → recover) + pick-1-of-3 boon
- Swarmer enemy (1 hp, fast, zig-zag, packs) from wave 3
- CONFIG tuning block + scaling cap at wave 5; difficulty setting (easy/normal/hard)
- Background music (procedural, toggle) + resume countdown on app return
- Full-screen fill (arena matches device aspect); end screen REPLAY + MENU buttons
- "show fps" setting; base move speed = old Sweet speed
- Docs: TUNING.md, PLAYTEST.md, CHANGELOG.md

## 2026-06-11
- PWA: installable, offline, self-hosted font, app icon
- Procedural SFX + mute; settings panel with reset, press feedback, live stick preview
- Input feel: dt low-pass (kills stutter), input-space smoothing
- Mobile: viewport/joystick fixes, fusion recipes + recipe book, balance pass

## v0 prototype
- Eat-to-attack core loop, 3 flavors, fusion, procedural art, GitHub Pages deploy
