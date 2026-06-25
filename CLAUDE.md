# CLAUDE.md — Masala Run (game project)

Standalone game repo. Layers on top of `~/CLAUDE.md` and `~/Documents/hq/CLAUDE.md`;
this file owns game-specific context, constraints, and workflow. Treat it as primary.

## What this is
- **Masala Run** — mobile-first survival/action game. A courier in an Indian
  street-food city fights "The Bland" (grey creatures eating the city's flavor)
  by eating food: you attack with whatever you last ate, flavor fades, keep eating.
- Vanilla JS + Canvas 2D, **zero dependencies**, single `game.js` + `index.html`.
  Procedural art + Web Audio (no asset files). Installable PWA.
- Its **OWN git repo**, gitignored from hq-secondbrain. Public via GitHub Pages.
  NOT an Obsidian vault → skip the wiki-link / `#tag` / INDEX conventions here.

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
- Keep `README.md`, `CHANGELOG.md`, `ROADMAP.md` current as work lands — these
  are the durable session record (resume context from them, not from chat).
- Commit + push only on meaningful, verified work; show the git **sync box**
  after every push (parent rule).

## Tone
- In-GAME copy is playful and comic — that's the product. My **responses to the
  PM stay crisp-and-bulleted with no dramatization**, same as the parent baseline.
