# Masala Run — Changelog

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
