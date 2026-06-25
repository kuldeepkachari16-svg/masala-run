# Masala Run — Changelog

## 2026-06-26 — wider lane (global) + spawn-safe hazards + night zones
- **Wider play lane, globally.** `CONFIG.edgeWalls.w` 0.15 → **0.08** (lane 70% → 84% of width). Props stay **full-size** — their scale is decoupled from the collision margin (`CONFIG.propMarginFrac`, held at the old 0.15) — and are now **centered on the screen edge so ~half bleeds off**, so there's more play space while the visible half still reads as a street edge. Dog/cat stay tucked whole inside the thin margin. (Implements the parked "widen play area" item.)
- **Hazards never spawn on the start point.** `buildHazards()` keeps a clear bubble (radius `min(W,H)·0.24`) around the center spawn; patches landing inside retry, then skip. Verified: Mumbai z3 puddles sit 149–151px from start vs a 115px bubble. No more starting a zone already standing on a puddle/quicksand.
- **Night zones (deterministic, not random).** Each city marks specific zones as night via `nightZones` (default `[4]` — a darker beat before the city-boss finale). Night merges a per-city `night` palette over the day one, drops a stronger vignette (0.5), and lights **warm lamp pools** down both edges. Mumbai night = warm indigo; Jaisalmer night = cool desert blue. Blands/food/courier stay readable. Bump `nightZones` to add more. *(Chose deterministic over random — see ROADMAP for the reasoning.)*
- Verified live: wider lane + edge-bleeding props render in both cities; quicksand drains a pinned Bland; night zones read clearly in both cities with lamps; no console errors. `sw.js` → `masala-run-v16`.

## 2026-06-26 — cities: themed worlds + endless difficulty track (Mumbai + Jaisalmer)
New scaling layer above ZONE: **CITY → ZONE → WAVE**. A CITY = 5 ZONES (8 WAVES each, unchanged). Two cities ship. See `ROADMAP.md` "Cities & endless difficulty" for the full model. *(Built ahead of the Gate-1 playtest by explicit PM call — recorded in the roadmap.)*
- **Two independent tracks.** Theme (`CONFIG → CITIES[]`: palette + food skins + slam reskin + hazard) is cosmetic and grows infinitely; **difficulty** is one global curve in `lvl()` keyed off ZONE index, not city — so 2 cities and 100 cities share the same balancing logic.
- **Soft-reset difficulty per city.** `lvl()` now computes `hpMul/spdMul/spawnMul` from `CONFIG.diffCurve` + zone-in-city, with a **rising per-city floor** (`cityFloor`). City-1/zone-1 ≈ old level 1 (1.00), city-1/zone-5 ≈ old level 6 (1.40), city-2/zone-1 resets to a higher floor (1.18). Replaces the hand-tuned `CONFIG.levels` table as the difficulty source.
- **Per-city palette + food skins** via `applyCityTheme()` — mutates the live `DAY` palette + `FOOD_TYPES` (flavor constant; name/color localize). Mumbai = warm urban (Misal/Jalebi/Vada Pav); Jaisalmer = golden desert (Mirchi/Ghevar/Kachori).
- **Per-zone hazards, gated by `fromZone`.** `buildHazards()` lays deterministic patches in the open lane (seeded by zone). **Mumbai puddles** (from zone 3) slow Blands; **Jaisalmer quicksand** (from zone 2) slows *and* drains them — a Bland left in the sand is consumed (drops/XP awarded like any kill). Drawn into the cached backdrop; effect in `applyHazards()`.
- **City-signature power = THALI SLAM reskin** (not a 3rd meter). Same screen-clear envelope; name/colors/pattern per city. Mumbai = **VADA PAV RAIN** (projectiles fall from the top); Jaisalmer = **SANDSTORM** (radial sand burst).
- **City boss.** The zone-5 main boss becomes a bigger, themed CITY BOSS (`THE VADA MAHARAJA`, `THE DUNE RAJA`) — 1.5× HP, 1.18× size. New-city entry announces "WELCOME TO <CITY>".
- `MAX_LEVEL` is now `ZONES_PER_CITY × CITIES.length` (10). `__mr.hazards` added for greybox testing.
- Verified live: both city palettes + food skins render; puddles appear from Mumbai z3, quicksand from Jaisalmer z2; quicksand drains a pinned Bland 5→0 HP in ~2s and consumes it; both slam reskins fire with correct names; city boss spawns with boosted stats (`cityBoss:true`, HP 189); no console errors. `sw.js` → `masala-run-v15`.

## 2026-06-25 — drop move-speed boon, shrink Blands, seal the side margins
- **Removed the move-speed boon** (`MASALA LEGS`, +10% speed). In the persistent B-build it compounded every pick; past ~1.5× the courier outran the analog stick in the small arena and steering went erratic. Replaced with **SKEWER** — shots punch through +1 Bland (`mods.pierce`, reuses the bullet `pierce` system). Satisfying in swarms, zero effect on movement. `mods.speed` fully removed.
- **Regular Blands shrunk.** They drew at `r·2·2.3` ≈ hero-sized. Dropped `CONFIG.sprites.bland.scale` 2.3 → 1.8 so they read as minions, not peers. Collision radius unchanged.
- **Side margins are now off-limits for everyone.** Player + enemies were clamped to the full canvas width, so the per-frame de-stack push could shove a Bland past the side wall into the painted margin, where it wedged ("stuck Blands"). Now both are hard-clamped to the open **lane** (`laneMargin`). Also fixed: the lane/barrier clamp lived *after* `separateEnemies`'s `n < 2` early-return, so it was skipped for a lone enemy — the clamp now always runs; only the O(n²) pairwise loop is gated. Swarmer spawn-jitter clamps to the lane too.
- Verified live: forced enemies/player into both margins → all snap back to the lane edge; Blands render smaller than the courier; SKEWER appears in the pick and sets `mods.pierce`; no console errors. `sw.js` → `masala-run-v14`.

## 2026-06-24 — clearer flavor cue + one word per concept
- **No more "green circle on eating."** Two causes, both fixed: (1) the foot glow disc is gone — flavor now **tints the courier sprite itself** (a flavor-colored silhouette overlaid at low alpha, fading with the meter), so the cue lives on the character, not a disc on the floor; (2) the **savory shield** ring was sized to the old tiny collision radius, so it sliced through the new (5× bigger) sprite's torso and read as a stray circle — it's now a soft **bubble sized to the sprite** that encloses the courier and reads as "protected."
- **Vocabulary unified to three words.** The UI was mixing *level*, *wave*, and *zone* for different things. Settled on: **ZONE** (the map you're in) · **WAVE** (an enemy spawn batch) · **POWER UP** (the 1-of-3 build upgrade). Renames: pick modal "LEVEL N!" → **"POWER UP!"**; HUD `L1-3` → `Z1 · W1`, `LV n` → `PWR n`; "SELECT LEVEL"/"choose level"/"PLAY — L" → ZONE forms; boss subtitle "lasts this level" → "lasts this zone"; game-over "L1 wave 1" → "zone 1 wave 1". Internal variable names unchanged.
- Verified live: eating spicy shows only a warm tint (no circle); savory shows the enclosing shield bubble; POWER UP! modal + `PWR · Z · W` HUD render correctly; no console errors. `sw.js` → `masala-run-v13`.

## 2026-06-21 — flavor cue: subtle foot aura instead of a glow disc
The full-color glow disc drawn over the courier read as a garish circle (esp. savory green) now that there's a real sprite. Replaced with a small, flat colored aura at the **feet**, shown only while a flavor is active and fading as the meter drains. Flavor still reads loud via the HUD + the bright pulse on eat. `sw.js` → `masala-run-v12`.

## 2026-06-21 — fix sprite flicker + punchier Bland-touch feedback
- **Flicker fix.** Sprites were drawn from the raw SVG every frame, so the browser re-decoded the vector each frame → flicker + dropped frames. Now each sprite is **rasterized once** to an offscreen canvas (2× supersample for hi-DPI crispness) and that bitmap is drawn each frame — same pattern as `glowSprite`/`auraSprite`. Hit-flash white silhouette derives from the cached bitmap too.
- **Bland-touch feedback.** Taking a hit now also: a **haptic buzz** (`navigator.vibrate`, a longer pattern on death), a **20px recoil** shoving the courier away from the Bland, a red impact ring + a "-1 ♥" floater, and bigger shake/flash (0.4 / 0.35). Previously only a small flash+shake — easy to miss on mobile.
- Verified live: rasterized sprites render crisp, no console errors; forced collision drops HP, sets i-frames, applies the recoil. `sw.js` → `masala-run-v11`.

## 2026-06-21 — character sprites: the Tiffin Runner + the Bland
First authored characters land — the player and the basic Bland now render as flat-vector sprites instead of procedural blobs (direction + spec in `docs/sprites.md`).
- **SVG-on-canvas, no rasterization.** Sprites ship as tight SVG files (`assets/sprites/courier.svg`, `bland.svg`) drawn straight onto the canvas, so they stay crisp at any scale and keep us asset-light. Authored in SVG for exact proportion control (the recurring AI-gen pain).
- **Courier = the Tiffin Runner** (cap + hair, tied apron, small steel dabba, warm palette). Flavor still reads via the underfoot glow + HUD, so a fixed-color sprite is fine. **Basic Bland** = the smug grey blob; bosses/swarmer stay procedural for now (they become Bland variants later).
- **Safe by construction:** a `SPRITES` registry loads the images async; until a sprite loads (or if it 404s) the **procedural blob keeps drawing** — assets can never break the game. Hit-flash uses a cached white silhouette of the sprite.
- **Live-tunable:** `CONFIG.sprites.{player,bland}.{scale,yOff}` (drawn height = 2·r·scale). `__mr.sprites` reports load state.
- Verified live: both sprites load, render in-game at good scale over the day street, no console errors, white-flash path clean, level-up cadence still firing at ~20 kills. `sw.js` → `masala-run-v10`.

## 2026-06-21 — "B": a run is one continuous build across all zones
The structural fix behind "level-ups feel like irritating interruptions." Root cause wasn't pick *frequency* — it was that the build **reset at every level boundary**, so every pick bought an upgrade you'd lose in ~3 minutes. Now a run spans all zones with the build intact (the survivor-like model). Picks compound into a real power fantasy, so the interruption becomes a reward.
- **Split `reset()`** into `resetRun()` (build + courier — XP, level, picked boons, stat mods, HP/maxHp; runs once per run) and `setupStage(n, fresh)` (the transient arena — enemies, waves, backdrop, barriers; runs at every zone, never touches the build). `reset()` now orchestrates both.
- **`clearLevel()` → continuous advance.** Beating a zone's main boss no longer bounces to the hub; new `advanceStage()` loads the next zone with the same build (+ a small zone-clear reward heal, recentre). The run ends only on death. The old "level clear" screen now means **RUN COMPLETE** (every zone cleared in one build).
- **Non-intrusive pick pacing.** Curve already decelerates (`xpNext = base + (lvl-1)·step`: 40 → 62 → 84…). Added a hard floor `CONFIG.levelXp.minGap = 26s`: a burst of kills *banks* levels instead of firing a stack of modals. Picks can't spam regardless of kill rate or cache.
- Verified live (state-stepped): build survives a zone advance (maxHp/mods/boons all intact, level 1→2, arena reset, state stays "playing"); first pick lands at **18.8s / 20 kills** (not the old 2-3s); `xpNext` steps 40→62. `sw.js` → `masala-run-v9`.

## 2026-06-20 — retro-day backdrops go fully procedural (flat, in-code)
Closed the backdrop thread. AI image generation fought us on the one thing that matters for a top-down arena: **scale/proportion** — generated stalls were too big, ate the play area, and pulled focus to one side. Code fixes all of that deterministically, so `retro-day` is now drawn entirely in code.
- **`drawDayStreet`** — a flat POWER-UP-style street built from an element kit (`DAY_ELEMENTS`: stall, cart, crate, pot, plant, dog, cat), all confined to the side-margins (the existing 15% walled zone) so the **center lane stays fully open** by construction. Simple, recognisable shapes — not detailed.
- **Per-level variety** via a seeded shuffled deck: every prop type is used before any repeats (no clusters), and each level gets a distinct-but-stable layout. Unlimited levels, zero asset files.
- Themes can now carry a `draw` fn (procedural) that takes precedence over `bg` images; `loadThemeImages` skips image preload for procedural themes. `night-v1` stays the image-based revert. `bg-1.png` + `process-bg.py` retained as unused reference. Docs in `THEMES.md`.
- Verified live: L1 + L3 render distinct backdrops, big open lane, player/enemies/food read clearly, no errors.

## 2026-06-20 — early-level pacing: soften the wave after the mini-boss
Playtest note: the wave right after the mini-boss spiked too hard while new players are still learning. Pre-mini-boss pacing was fine. Eased only the post-mini-boss waves (6 & 7) on the **early levels** — pre-boss waves and later levels untouched.
- New `postBoss` knobs: `easeLevels: 3`, `earlySpawnMul: 1.35`, `earlySpdMul: 0.88`. On levels ≤ 3, the post-mini-boss waves get **+35% spawn spacing** (fewer Blands, on top of the existing generic ease) and **−12% enemy speed**.
- Threaded an optional `spdMul` through `spawnEnemy`/`makeEnemy` so the speed cut applies only to enemies spawned in that window — lingering enemies and bosses are unaffected. All knobs live-tunable via `__mr.config.postBoss`.
- Verified: post-boss early-level spawn interval 0.54s → 0.73s; pre-boss waves still spawn at full speed (no regression).

## 2026-06-20 — visual themes: archive current look, scaffold pixel-retro-day
Groundwork to migrate the art direction toward a daytime pixel-retro style **without losing the shipped night look**. The whole look is now a swappable, code-only theme.
- **Theme registry** (`THEMES` + `ACTIVE_THEME` in `game.js`). A theme bundles its backdrop images, a procedural-street palette, and vignette strength. Reverting/migrating = editing one constant; deliberately **not** a player-facing setting.
- **Archived the night look as `night-v1`.** `git mv`'d the 4 backdrops into `assets/themes/night-v1/` (history preserved, no duplication). It stays the active, known-good theme. Verified all 4 load from the new path (200) and the old paths are gone (404), backdrop renders identically.
- **Scaffolded `retro-day`** (daytime pixel-retro). Folder `assets/themes/retro-day/` reserved for `bg-1.png…bg-4.png`; lighter vignette + warm daylight fallback palette. Activate by dropping art + flipping `ACTIVE_THEME`.
- **Parametrized `drawStreet(pal)`** — the procedural fallback now reads its colors from the active theme, so a missing image never shows the wrong time of day.
- **Dev hooks:** `__mr.themes`, `__mr.activeTheme`, `__mr.setTheme(name)` for live preview (not persisted, not in-game UI). `sw.js` → `masala-run-v6`. Full docs in `THEMES.md`.
- **First retro-day backdrop landed (L1).** `tools/process-bg.py` turns a raw AI generation into a clean, muted, flat theme asset in one pass — resize → denoise → mute (brightness/saturation) → posterize flat. Keeps the clean-vector look (not a chunky pixel grid). Tuned to the approved "gentle mute" so the backdrop recedes and gameplay characters pop. `ACTIVE_THEME` is now `retro-day` (migrating); L2–4 fall back to the day procedural street until their masters land. Verified live: muted lane, characters read clearly, no errors.
- **UI chrome NOT yet themed** — title/HUD/settings/game-over + fonts are a separate planned pass (will extend the theme with UI palette + font tokens so the one-line revert restores the whole look).
- **Default joystick → `anywhere`** (was `fixed`). Only affects fresh installs / after a settings reset; existing saves keep their choice.

## 2026-06-20 — joystick: floating origin + real deadzone (kill the off-center lurch)
External-review handoff caught the deeper cause behind the joystick complaints: the fixed stick measured deflection from the **anchor center**, so a thumb landing off-center produced instant movement before any deliberate drag. Reworked the control model:
- **Floating origin.** A fixed-stick touch now becomes the origin itself (`ox/oy` = touch point, `dx=0`), not the anchor. Imperfect thumb placement starts at zero deflection — you only move once you actually drag. The visible stick floats to the thumb while held and parks a faint home indicator in the corner when idle.
- **Real deadzone + remap.** Bumped the input deadzone from `3px` to a config knob `CONFIG.stickDeadzone = 10` CSS px (finger wobble no longer registers), and remapped the remaining range so speed ramps from **zero at the deadzone edge** (`(len-dead)/(max-dead)`) instead of jumping. Response curve still applies on top.
- **Clean release everywhere.** New `clearJoy()` zeroes `joy` + `imx/imy/vx/vy` on every release, cancel, settings-open, setting-change, phantom-touch drop, and **app backgrounding** — no stale deflection or smoothed velocity survives a lift or focus loss, no inherited velocity on re-touch.
- Removed `setFixedDeflection` (anchor-relative deflection) — obsolete under the floating-origin model.
- Verified by state-stepping the engine (`__mr.tick`): off-center rest = 0px, in-deadzone wobble = 0px, gentle drag = slow creep, full drag = fast, post-release glide = 0px, re-touch = no inherited velocity. All six handoff acceptance criteria pass.

## 2026-06-17 — joystick feel: analog ramp + kill the "float"
Playtest surfaced the character "floating uncontrollably" after a while. Root-caused to **three** separate issues and fixed each:
- **Analog speed scaling was too compressed.** Speed already scaled with stick magnitude, but the throw-to-full-speed distance was tiny (18px), so it read as on/off. Widened the throw window (`SENS_THROW` → low 48 / med 38 / high 28) and added a config-driven **response curve** (`CONFIG.stickCurve` = 1.6, `pow(magnitude, curve)`) — gentle low end, ramps to full near the edge. Live-tune: `__mr.config.stickCurve`.
- **Frame-delta low-pass made motion float under variable framerate.** `dt` was smoothed at a slow 0.2 factor, smearing a single hitch across ~15 frames and decoupling motion from real time. Made it a live-tunable knob (`CONFIG.dtTrack` = 0.5; 1 = raw clamped dt) and added a clock resync on tab/app resume so returning from background doesn't lurch. *(Not the culprit on the test device — steady 90fps — but a real correctness fix.)*
- **Phantom/stuck touch = the real "uncontrollable zone."** The stick only released on a clean `touchend` for its exact finger id. Sliding the thumb off the screen edge (common with a corner-anchored fixed stick) or a system gesture meant the `touchend` never arrived → `joy` stayed deflected → character glided on a stale velocity until the next touch. Added safety nets: clear the stick if its finger leaves the active touch set (`touchmove` reconcile), if no touches remain on release, and listen for `touchend`/`touchcancel` on `window` (off-canvas releases).
- **Defaults now reflect playtested best-feel.** `stick: fixed` (visible neutral, no drifting origin), `smooth: off` (direct, no slide), `sens: medium` (analog window). In-game **"reset to defaults"** restores these.

## 2026-06-14 — code-review fixes
- **Bugfix (main path): a win could flip to a loss.** Enemies the Maharaja summons (and stragglers) stayed lethal during the 1.9s defeat beat — a contact hit after the boss died sent you to GAME OVER instead of LEVEL CLEAR. The player is now invulnerable for the duration of the beat (`endingLevel` guard on contact damage). Verified: straggler on top of the player deals 0 damage, run ends in LEVEL CLEAR.
- **Bugfix (NOM mode): toll-coins never despawned.** The enemy-separation clamp was pinning every non-boss entity inside the arena, so coins couldn't drift off-screen to despawn (and the giant NOM boss got jostled). Separation/clamp now skips `coin` and `nom`. Verified: coin drifts past the edge.
- Polish: `nearestEnemy()` skips the defeated boss (player no longer auto-fires at the corpse); `buildBackdrop` computes `levelBg()` once; corrected the menu-backdrop comment.

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
