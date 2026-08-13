# CLAUDE.md — Masala Run (game project)

Standalone game repo. Layers on top of `~/CLAUDE.md` and `~/Documents/hq/CLAUDE.md`;
this file owns game-specific context, constraints, and workflow. Treat it as primary.

## What this is
- **Masala Run** — mobile-first survival/action game. A courier in an Indian
  street-food city fights "The Bland" (grey creatures eating the city's flavor)
  by eating food: you attack with whatever you last ate, flavor fades, keep eating.
- **Post-pivot (2026-07-11):** a zone is a vertical scrolling **delivery route**
  (distance-gated waves, camera-locked boss duels), gated on `CONFIG.corridor.on`.
  The classic fixed arena lives on branch `arena-classic` / `__mr.setCorridor(false)`.
- Vanilla JS + Canvas 2D, **zero dependencies**, single `game.js` + `index.html`.
  Web Audio, installable PWA.
- **Art is asset-fed with a procedural fallback (since 2026-08-07).** Character
  sprites load from `assets/sprites/`, environmental edge props from
  `assets/props/` via `EDGE_PROP_DEFS`; the procedural kit (`DAY_ELEMENTS`,
  `drawDayStreet`) still draws the road and fills whatever no asset claims. A
  missing/404 asset never breaks the game — it just never draws. Placement is
  owned by the segment composer, not by either system alone.
- Its **OWN git repo**, gitignored from hq-secondbrain. Public via GitHub Pages.
  NOT an Obsidian vault → skip the wiki-link / `#tag` / INDEX conventions here.

## New model / cold session? Read the handoff
`docs/project/SUCCESSOR_HANDOFF.md` — tacit knowledge from the previous model:
how to work with the PM, design lenses that held up, game.js navigation, and
the traps (Codex concurrency, SW cache, verification setup). Read it before
your first non-trivial change.

## My role on this project
- The PM is building this with zero game-dev experience. I wear the engineer
  **and game-designer** hats: make/recommend design calls (pacing, balance, UX)
  with the reasoning — don't hand them back as "want me to…?" questions.
  Escalate only on genuine forks (art direction, scope, money, irreversible).
  See memory `own-game-design-calls`.
- **On EVERY feedback round, wear the hats — don't just execute.** When the PM
  gives notes/bugs/ideas, react as the expert first: reason about each item,
  argue or push back where a call is weak/risky/over-scoped, name better
  alternatives, and flag where a "fix" fights the design. THEN implement. Silent
  order-taking is a failure mode here — the PM is relying on the expert lens, not
  a pair of hands. Pushback is expected on every round, not optional.

## Design constraints — do not break
- **No body-weight / fat / health shame, ever.** Food is never a nutrition lesson.
- Food is a **strategic power system** organized by flavor (spicy / sweet /
  savory / …). Stats attach to *flavor*, never to "healthiness".
- **Keep it simple:** the player tracks two things — current flavor + one meter.
- **Fun-first, not educational.** One new idea on a familiar base.
- **Vocabulary — three words, one meaning each (don't mix them in UI copy):**
  **ZONE** = the map you're in (compact `Z`) · **WAVE** = one enemy spawn batch
  (compact `W`) · **POWER UP** = the 1-of-3 build upgrade (compact `PWR`). Never
  reuse "level" for any of these in player-facing text.

## Tech & workflow
- All difficulty/pacing knobs live in the `CONFIG` block; live-tunable on a
  device via `__mr.config`. Per-level tuning in `CONFIG.levels`.
- **Verify changes in the browser preview before claiming done** — never ask the
  PM to check manually; share proof (screenshot / state read).
- **Browser verification runs over raw CDP, not the Claude-in-Chrome bridge.**
  The extension returns `Cannot access a chrome-extension:// URL of different
  extension` on every call in this profile — hit in Sessions 46/47 and again in
  59. Don't burn a cycle retrying it. The harness is `tools/verify/` (driver +
  regression suite); traps are listed in `docs/verification.md`, and they are
  listed because each one has already cost a debug cycle.
- **Anything drawn INTO a segment tile must be folded into
  `segCompositionSig()`.** The tile cache is keyed on it, so a layer that paints
  into the tile without contributing to the signature serves art composed under
  stale config after any live change. Session 54 hit this with claim ids;
  Session 60 added the frontage band and road overlays and had to fold in both.
  New tile-painting layer ⇒ new signature term, same commit.
- Keep `README.md`, `CHANGELOG.md`, `ROADMAP.md` current as work lands — these
  are the durable session record (resume context from them, not from chat).
- Commit + push only on meaningful, verified work; show the git **sync box**
  after every push (parent rule).
- **Player-visible ship → bump two things together:** `BUILD_TAG` (`game.js`,
  shown small in the settings panel — lets anyone confirm which deploy is
  live) and `sw.js`'s `CACHE` version (forces a clean refresh past the
  service worker). Same convention, same commit.
- **New art master → two checks (Session 59).** (1) Any experimental /
  geometry-prototype master MUST carry `test: true` in its `EDGE_PROP_DEFS`
  entry — `loadEdgeProps()` only preloads production defs, and a missing flag
  means every player downloads a master that can never draw. Flag-gated defs
  load on demand via `ensureEdgeProp(k)`. (2) Every master ships
  payload-checked: run `tools/optimize_prop_master.py`. The acceptance test for
  any recompression is a **bit-identical alpha ≥ 32 mask**, never visual
  similarity — all `EDGE_PROP_DEFS` bounds (`visualBounds`, `footprint`,
  `cropSafe`, `pivot`) are measured off that mask, so one flipped bit can
  silently move a pivot. Also keep `sw.js`'s precache list pointed at the
  masters `ACTIVE_THEME` actually draws.

## Context hygiene (token burn)
Sessions here have hit 385K ctx; every tool call replays the whole context.
- One feature per session — `/clear` between slices; don't start new work past ~150K ctx.
- `game.js` is one big file: grep for the region, Read by line range — never
  re-Read the whole file.
- Delegate browser-verify loops (screenshot / state-read cycles) and mechanical
  edit rounds to the `implementer` agent (global via `~/.claude/agents/` symlink),
  `verifier` for done-checks. Main session keeps the design-call + review hats.

## Doc provenance (every new .md)
Every new `.md` in this repo opens with a provenance block right under the H1 —
so future-us can tell why a doc exists and whether it still holds, without
git archaeology:
```
> **Purpose:** <one line — the question this doc answers / why it exists>
> **Status:** Living  ·  **Owner:** Claude (engine)
> **Created:** YYYY-MM-DD
```
- **Status** ∈ `Living` · `Proposed` (planned, not built) · `Superseded by <path>`
  (dead → points to replacement) · `Archived` (history only, don't act on).
- **Owner** ∈ `Claude (engine)` · `ChatGPT (creative)` · `Codex (repo)` · `PM`.
- **Created** is a hint; git (`git log --diff-filter=A --follow`) is the real
  source of truth. Its live job is "last meaningfully reviewed."
- When a doc dies, don't delete silently — flip Status to `Superseded by …`.
- Full cross-AI rule in `docs/project/AI_COLLABORATION.md`.

**CHANGELOG entries are point-in-time, and stale status wording spreads.** An
entry records what was true when it was written. If a session's outcome changes
after the entry lands — a gate closes, a decision reverses — **append a marked
clarification block; never edit the original sentences.** Session 58's entry
said the human Gate-1 playtest was "still the standing P0"; the PM then played
and accepted the tuned build, but the entry was never annotated, so that line
was read as current status for two sessions and drove a wrong-premise objection
in the Session 59 audit. Current status belongs in `ROADMAP.md`; `CHANGELOG.md`
is history plus, where needed, a dated pointer to the final state.

## Tone
- In-GAME copy is playful and comic — that's the product. My **responses to the
  PM stay crisp-and-bulleted with no dramatization**, same as the parent baseline.
