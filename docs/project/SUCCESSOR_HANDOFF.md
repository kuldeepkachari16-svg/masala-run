# Successor Handoff — for the next AI engineer on Masala Run

> **Purpose:** Tacit knowledge for the next AI engineer — judgment, traps, and working habits not captured in the other docs.
> **Status:** Living  ·  **Owner:** Claude (engine)
> **Created:** 2026-07-12

Written 2026-07-12 by the outgoing Claude model. This is the tacit knowledge that
is NOT in the other docs — the judgment, traps, and working habits that made this
collaboration work. Everything factual about the game lives in README / ROADMAP /
CHANGELOG / `docs/`; read those for state, read this for *how to operate*.

## Cold-start reading order (~5 min, don't read more than this)
1. `CLAUDE.md` (repo root) — role, constraints, vocabulary, context hygiene.
2. `README.md` — what the game is today.
3. `ROADMAP.md` top two sections — the pivot + the commercial north-star. The
   north-star ordering (retention → build depth → meta → distribution) is the
   lens for every design call.
4. `CHANGELOG.md` top entry — most recent verified state.
5. Claude memory dir (if your harness loads it) — session-level pickup state.
   Durable facts belong in the repo, not memory; memory is harness-specific.

## How to work with the PM (the part that matters most)
- He is a senior PM with zero game-dev experience building the entire game
  through you. You are the engineer AND the game designer. **Recommend, don't
  ask.** "Want me to…?" on a pacing/balance/UX call is a failure — make the
  call, give the reasoning, ship it (tuning is reversible).
- **Every feedback round: expert reaction first, implementation second.** He
  sends batches of notes/bugs/ideas. Push back on weak items, name better
  alternatives, flag fixes that fight the design — THEN build. He has said
  explicitly that silent order-taking is the failure mode.
- Escalate only genuine forks: art direction, scope, money, irreversible moves.
- He will sometimes knowingly override scope discipline (e.g. built 2 cities
  before the Gate-1 playtest). Don't fight a made decision — record the
  override honestly in ROADMAP (see the "Scope note" there for the pattern)
  and move on.
- He tests on a real phone. Portrait, thumb-driven. Any change that looks fine
  on desktop but hurts one-thumb play is a regression.
- Never claim done without proof. Verify in the browser yourself (recipe in
  `docs/verification.md`) and show screenshots/state reads. Asking him to
  check manually is explicitly banned.

## Design judgment that held up (reuse these lenses)
- **Two things, one meter.** The player tracks current flavor + one meter.
  Every "add a third resource/meter" idea has been rejected on this ceiling
  (e.g. city signature powers are THALI SLAM reskins, not a new meter).
- **Determinism over randomness** where readability or tunability is at stake
  (night zones are fixed per city, prop layouts are seeded). You can't tune
  what you can't predict.
- **Author levers, not content.** Difficulty scales via behaviors × affixes ×
  composition × hazards, one global curve in `lvl()` — never per-city
  balancing, never stat inflation (it dies by ~city 4).
- **Vocabulary is a hard rule:** ZONE / WAVE / POWER UP. "Level" appears in
  code identifiers (historical) but never in player-facing copy.
- **No nutrition/health framing, ever.** Stats attach to flavor. This is a
  values constraint, not a style preference.
- The prototype stack (vanilla JS, one file, zero deps) is deliberate and
  correct for P0 — resist "let's add a bundler/framework" until the loop is
  proven (ROADMAP north-star explains when to port).

## game.js survival guide (4,900 lines, one file — by design)
- Never read the whole file. Sections are marked
  `// ---------- Name ----------`; grep the marker, Read by line range.
- `CONFIG` (~line 1040) holds every tuning knob; `CITIES[]` (~1216) is the
  theme track; corridor world code starts at the
  `// ---------- Corridor world rendering ----------` marker.
- **Corridor pattern:** world-space Y, screen-space X; everything gates on
  `corridorOn()`; camera is a single `translate(0, -cam.y)` in `draw()`. The
  pre-pivot arena survives via `__mr.setCorridor(false)` and branch
  `arena-classic` — don't break either.
- `W`/`H` are the fixed design size (480×800), NOT `canvas.width`. World size
  is its own variable — never hardcode `arena === screen` in new code.
- Perf rule that shaped the art: no per-frame `shadowBlur`; all glows and
  backdrops are cached offscreen sprites. Keep that discipline for anything new.
- Hard-won rendering lesson: visible tiling killed the first city-art attempt;
  the fix was per-segment seeded variety (deck-shuffled props, occasional
  crosswalks). Any repeating backdrop work must break the tile rhythm.

## Traps and gotchas
- **Codex edits this repo concurrently** (art/docs lane). Run `git status`
  before every commit; never sweep `docs/art-production/` or `docs/project/`
  modifications into an engineering commit — they're usually Codex's
  work-in-progress.
- Commits go straight to `main` (PM-authorized for now) — but he asked to be
  reminded to adopt PRs once contributors/release-gates/risky-live-changes
  appear. Watch for that moment and raise it.
- `main` is live via GitHub Pages; the service worker caches aggressively —
  bump the SW version (`sw.js`) when shipping player-visible changes.
- Headless verification needs **playwright-core + system Chrome**
  (`channel: "chrome"`); Playwright's bundled browsers aren't installed.
- Sessions burn context fast here (past sessions hit 385K). One feature per
  session; delegate mechanical verify/edit loops to subagents; don't start new
  work past ~150K.
- README still says "procedural art, zero asset files" — goes stale the moment
  the asset-fed build lands. Fix it then (already queued in memory/ROADMAP).

## Decision-record habit (keep it alive)
README / CHANGELOG / ROADMAP are the durable session record — update them as
work lands, not at the end. Resume from them, never from chat history. When a
decision is made *against* a recorded principle, write the override down where
the principle lives. The repo stays honest that way, and it's why a successor
(you) can pick this up at all.
