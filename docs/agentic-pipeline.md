# Masala Run — Agentic Content Pipeline

> **Purpose:** Earlier plan for scaling content (zones, art) via Claude Code subagents + a deterministic gate.
> **Status:** Superseded by docs/pipeline/ARCHITECTURE.md  ·  **Owner:** Claude (engine)
> **Created:** 2026-06-27

> **Superseded (2026-07-11)** by `docs/pipeline/ARCHITECTURE.md` — the pipeline is
> now planned on LangGraph. This doc's two core artifacts (zone-spec schema,
> zero-LLM deterministic gates) carry forward as graph nodes; the Claude-Code
> subagent mechanism does not. Kept for the sequencing rationale.

How we scale content (zones, art) fast using Claude Code subagents + a deterministic
gate, while keeping Claude token burn low. Status: **superseded** (see above).

---

## Key insight

Adding a zone is **already pure data**. `CITIES[]` (game.js:~1051) is a clean
declarative content model:

```
{ key, name, pal, foods, slam, hazard, boss, bossSprite, nightZones, night }
```

Difficulty is **not** per-zone — it lives in a global curve (`lvl()`). The code comment
says it outright: *"adding a city is pure content… infinite-safe."*

So we do **not** need a bespoke multi-agent runtime. We need:
1. A **written contract** for that data shape.
2. A **deterministic gate** (validator + headless test) — no LLM in the accept/reject path.
3. A few **Claude Code subagents** wired to one slash command.

That is the entire "agentic framework."

---

## Sequencing (read before building zones)

The ROADMAP parks more content behind the P0 playtest gate:
*"NOT now (until P0 passes): more levels, backdrops/art, enemy types. Premature scaling.
One loop, proven addictive, beats eight shallow levels."*

- Today the two zones differ only cosmetically (palette + food names + one hazard).
  An agent army pointed at "3 more zones" multiplies **cosmetic variety, not depth** —
  and depth (build system + meta loop) is the real north-star gap.
- **Plan:** build the machine now (cheap, reusable, adds no unproven content) → prove it
  on **exactly ONE** zone to debug the agents → then **stop** and point the same test
  infra at the playtest + build system. The pipeline sits ready to mass-produce the
  moment P0 passes — that is when "3 zones via free LLM" is both safe and high-value.
- Build the factory; don't run the presses yet.

---

## Architecture

**3 subagents + 1 orchestrator.** The proposed 4th (issue/reporting) agent is **cut** —
redundant with the tester's output and premature for a solo project. Optionally a tiny
"scribe" to update CHANGELOG/ROADMAP.

| Agent (`.claude/agents/`) | Does | Auto / Manual | Free-LLM safe? |
|---|---|---|---|
| `zone-designer` | Brief → validated `CITIES[]` entry + procedural food-sprite stubs + rationale. Pure data append. | Auto, **gate after** (approve spec) | ✅ schema-constrained |
| `art-director` | Boss sprite + food sprites (+bg). Consistent image-gen prompts, generate, drop files in `assets/`, register sprite key, update `art_manifest.json` + `sw.js`. | Semi-auto, **manual eye on output** | ❌ needs image gen; stays Claude/ChatGPT |
| `playtest-runner` | Headless browser: force the new city via `__mr`, run its zones, assert no console errors + boss spawns + win reachable + hazard from right zone; capture day/night screenshots; emit pass/fail report. | **Auto gate** (deterministic) | n/a — code, no LLM |

**Orchestrator: `/add-zone "<brief>"`** chains with manual gates:

```
design → ⏸ approve spec → art → wire+validate → playtest-runner → ⏸ eyeball screenshots → docs
```

Each agent is **also invokable solo** (run just art, or just re-test) — that is the
manual calling.

### The real unlock — two artifacts, write once

- `docs/zone-spec.md` — explicit schema (required keys, the 3-flavor set,
  `hazard.fromZone` range, palette keys, sprite-file existence). Turns the implicit
  `CITIES` shape into something a **weak** model can fill reliably.
- `tools/validate-city.mjs` — zero-dep node validator. **This is what lets a free LLM
  contribute safely: it structurally cannot merge a broken zone.** Gate = code, not judgment.

---

## Free / local LLM strategy

Yes, mostly — with one catch and one trick.

- **Catch:** Claude Code's subagent system is a Claude Code feature; you cannot run a
  subagent *on* a local model. Two real paths:
  - **(a)** Keep Claude Code as orchestrator; have it shell out to local Ollama
    (`curl localhost:11434`) for the bulk content draft, then validate/test.
  - **(b)** Draft zones in a free chat (Gemini free tier / local Qwen2.5-Coder), paste
    JSON back.
- **The trick:** make the **gate zero-LLM** — `validate-city.mjs` + `playtest-runner`
  accept/reject with **no Claude tokens**. Routine zone adds cost ~nothing; Claude only
  wakes on a failure it cannot auto-explain.
- **Split:** free/local = content (zone JSON, food/boss names, slam reskins, copy).
  Claude = rails + mechanics + hard debugging. Art = Claude/ChatGPT (local models can't
  generate images).
- If on a Claude **Max** plan, the "burn" is usage limits not dollars — offload still
  helps stay under them.

---

## Build sequence (one-time)

1. **Contract:** `docs/zone-spec.md` + `tools/validate-city.mjs`.
2. **Gate:** `tools/playtest-runner` (Playwright, headless) driving `__mr` — smoke +
   screenshots + report. Needs ~20 lines of new `__mr` test hooks: force-city,
   force-zone, win-now.
3. **Agents:** `zone-designer`, `art-director`, `playtest-runner` in `.claude/agents/`
   + `/add-zone` orchestrator command.
4. **Prove on ONE zone** end-to-end (e.g. Kolkata) to debug the machine.
5. **Stop. Redirect** the test infra at the playtest gate + build-system work.
