# Masala Run — LangGraph Content Pipeline (Architecture)

> **Purpose:** The plan for a LangGraph app that turns a 3-line zone brief into approved assets + validated `CITIES[]` data + playtest evidence, with 3 human gates.
> **Status:** Proposed  ·  **Owner:** Claude (engine)
> **Created:** 2026-07-11

Status: **proposed — documentation only, nothing built**. Supersedes
`docs/agentic-pipeline.md` as the orchestration plan; that doc's two core
artifacts (zone-spec + zero-LLM gates) survive here as graph nodes.

Owner: Claude (per `docs/project/AI_COLLABORATION.md`). Authority order unchanged:
Human > Art Bible > Prompt Bible > Technical Asset Contract > this pipeline.

---

## 1. What this is

A **Python LangGraph app** in `pipeline/` (own venv, own deps) that turns a
3-line zone brief into: approved PNG assets + metadata, a validated `CITIES[]`
entry, passing playtest evidence, updated docs — PM approves at exactly
**three** points.

Hard boundaries:
- **Never touches `game.js`.** Outputs are files in `assets/`, a JSON blob for
  `CITIES[]`, doc updates. Engine work (segment composer, sprite sheets) stays
  manual, Claude-owned, outside the graph.
- **LLMs never accept/reject anything.** Every gate is deterministic code
  (validators, Playwright, image checks) or the human. LLM nodes only
  *produce* candidates — this is what makes cheap models safe to use here.
- **Encodes the existing role contract**, doesn't replace it: ChatGPT's
  creative-director role → design LLM node; Codex's repo-engineer role →
  mostly plain scripts; Claude stays engine owner outside the graph.

**Why LangGraph, not a bash script:** `interrupt()` (human-in-the-loop pauses)
+ checkpointing (SQLite). A zone run spans days of PM availability — the graph
sleeps at a gate Tuesday, resumes Thursday with full state.

**Workflow, not agents (decided 2026-07-11):** adding a zone is a known
recipe (spec → art → wire → test → stitch), identical every run — routing is
encoded once as static graph edges, not an LLM picking the next step at
runtime. Same "it just knows" UX, zero per-run routing cost/nondeterminism.

**No difficulty node.** `lvl()` is a global curve, deliberately not per-zone —
`CITIES[]` stays balance-free. N zone-level LLMs each making locally-sane
difficulty calls would wreck global pacing; one curve, tuned once, from
playtests.

**Vocabulary vs sentences.** New enemy archetypes/hazards = vocabulary —
rare, human+Claude engine work, outside the graph. Zones = sentences written
with existing vocabulary — cheap, parallel, pipeline work. If per-city
enemy-mix flavor is ever wanted: engine adds a bounded `CITIES[]` field
first, validator enforces it, *then* the design node may set it. Knob first,
agent second.

---

## 2. Graph topology

```
brief (PM, human input)
  │
  ▼
┌─ DESIGN subgraph ─────────────────────────────────────────┐
│ creative_director (LLM) ──► zone_spec_validator (code) ──►│──► ⏸ GATE 1
│        ▲                            │ fail (≤2 retries)   │    PM approves
│        └────────── critique ◄───────┘                     │    the zone spec
└───────────────────────────────────────────────────────────┘
  │
  ▼  fan-out: one branch per asset in the spec's manifest
┌─ ART subgraph (parallel per asset) ───────────────────────┐
│ prompt_composer (LLM, Prompt Bible blocks + TAC limits)   │
│   ──► image_gen (API) ──► post_process (code: alpha trim, │
│       resize to TAC §4, palette check) ──► metadata (code)│
│   ──► in_game_screenshot (Playwright: asset at target     │
│       scale, next to courier, corridor build — TAC §8)    │
└───────────────────────────────────────────────────────────┘
  │ join
  ▼
⏸ GATE 2 — PM reviews a screenshot board; per-asset approve /
  reject-with-note (rejects loop back to prompt_composer with the note)
  │
  ▼
┌─ WIRE & VERIFY subgraph ──────────────────────────────────┐
│ zone_data_writer (template code, LLM only for copy/names) │
│   ──► validate_city (code, zero-dep node script)          │
│   ──► playtest_runner (Playwright headless: force city    │
│       via __mr, no console errors, boss spawns, win       │
│       reachable, hazard correct, day+night screenshots)   │
└───────────────────────────────────────────────────────────┘
  │
  ▼
⏸ GATE 3 — PM eyeballs playtest screenshots + report
  │
  ▼
scribe (code+small LLM): CHANGELOG, art_manifest.json, Prompt
Bible feedback (approved prompts appended) ──► done: a branch
with assets + data + report, ready to commit
```

Failure edges loop back **with the failure report appended to state**,
bounded (2 retries), then escalate to PM instead of burning tokens.

---

## 3. Nodes — role, model/API pick, cost

| Node | Type | Role absorbed | Pick | Cost |
|---|---|---|---|---|
| `creative_director` | LLM | ChatGPT (creative director) | Claude Sonnet 5 | $3/$15 per MTok |
| `zone_spec_validator` | code | Codex | jsonschema, pure Python | free |
| `prompt_composer` | LLM | ChatGPT (prompt authoring) | Claude Sonnet 5 | $3/$15 per MTok |
| `image_gen` | API | PM's manual ChatGPT image loop | **gpt-image-1** (native alpha, satisfies TAC §7) | ~$0.01–0.17/image |
| `post_process` | code | Codex | Pillow + rembg | free |
| `metadata` | code | Codex | existing `tools/*.py` | free |
| `in_game_screenshot` | code (new) | TAC §8 as a node | Playwright | free |
| `zone_data_writer` | code + tiny LLM | Codex | template + Gemini Flash free tier | free (Haiku 4.5 fallback) |
| `validate_city` | code | Codex | `tools/validate-city.mjs` (to build) | free |
| `playtest_runner` | code | QA | Playwright | free |
| `scribe` | code + tiny LLM | Codex (docs) | Gemini Flash free tier | free (Haiku 4.5 fallback) |
| Gates 1–3 | human | PM | LangGraph `interrupt()` | — |

Ratio: **3 LLM nodes, 7 code nodes**. The graph's value is orchestration and
resumability, not "more AI."

**Why these picks over alternatives:**
- Text LLM: rejected Groq/Ollama (quality floor too low for creative-director)
  and always-paid GPT (PM already pays ChatGPT, API billing is separate) —
  Sonnet for quality-sensitive nodes, Gemini free tier for schema-gated bulk
  nodes since the validator catches garbage either way.
- Image gen: rejected FLUX/Recraft/Gemini — none produce native alpha, so
  every free option pays it back in post-processing/fringe artifacts (the
  "sticker halo" failure TAC already memorializes). Local FLUX-schnell stays
  useful for free bulk mood exploration *before* spending API calls.

**Cost per new zone:** ~15–25 images incl. retries ≈ $0.50–1.50; text LLM ≈
$0–0.30. Under $2 (~₹150) per zone, dominated by image gen. Keys needed:
OpenAI (images) + Anthropic or Google (text), both PM-owned.

**Infra (all free):** LangGraph SQLite checkpointer · Playwright (screenshots
+ playtest gates) · jsonschema + existing `tools/*.py` (validation) ·
**LangSmith free tier** (5k traces/mo — take it from day one; debugging a
multi-node LLM graph blind is how these projects die).

---

## 4. State (checkpointed to SQLite)

```python
class ZoneRun(TypedDict):
    brief: str
    zone_spec: dict | None          # validated CITIES[]-shaped entry + rationale
    assets: list[AssetJob]          # per-asset: key, prompt, image_path,
                                    #   screenshots, status, attempts, pm_note
    gate_results: dict              # validator / playtest reports
    decisions: list[HumanDecision]  # audit trail of every gate answer
```

`AssetJob.prompt` persists next to the image — approved prompts are the raw
material that fills the Prompt Bible's TODO sections.

## 5. Prompt work distribution

Prompt Bible becomes machine-readable blocks in `pipeline/prompts/`:
- `shared/` — style anchor, negative-prompt rules, hero-scale law, palette
  neutrality (TAC §5) — injected into every composed prompt.
- `per-asset-type/` — character/edge-prop/road-tile/hazard/food blocks
  (sizes/framing from TAC §4).
- `prompt_composer` assembles: shared + asset-type + zone flavor from spec +
  PM rejection note (on retries).
- Every Gate-2-approved prompt is appended by `scribe` to the Prompt Bible as
  a worked example — Variation/Regeneration TODOs get filled by real
  production data, not speculation.

---

## 6. A new zone, from the PM's chair

1. **Touchpoint 1 — brief.** `python -m pipeline new-zone "Kolkata:
   sweets-heavy, tram-line route, monsoon puddles"` — a bare city name also
   works (`new-zone Kolkata`). Walk away.
2. Graph drafts + validates the spec, interrupts. **Touchpoint 2 — approve
   the spec** (name, palette, foods, boss, hazard); state is checkpointed, so
   this can happen same-day or three days later.
3. Art fan-out runs unattended. Failures self-retry twice, then park.
4. **Touchpoint 3 — screenshot board.** Every candidate shown *inside the
   running game next to the courier* (TAC §8). Approve / reject-with-note;
   rejects regenerate with the note.
5. Wire + validate + playtest run automatically; PM glances at the final
   report + playtest screenshots (usually folded into the same sitting as 4).
6. Output: a git branch with assets, metadata, manifest, `CITIES[]` entry,
   doc updates, evidence report. Commit/push stays human+Claude — the
   pipeline never pushes.

**Batch mode:** `new-zone Kolkata Delhi` spawns one independent, separately
checkpointed graph run per city, in parallel. Gates 1–3 collect pending
interrupts across all live runs into one review board — approving two zones
is one sitting, not two. A failed/rejected Kolkata never blocks Delhi.

## 7. Build order

- **M0 — skeleton (½ day):** `pipeline/` package, echo-node graph, SQLite
  checkpointer, CLI, LangSmith wired. Proves interrupt/resume works.
- **M1 — gates first:** `validate-city.mjs`, `zone-spec.md` schema,
  `playtest_runner`, `in_game_screenshot` (~20 lines of `__mr` test hooks:
  force-city, force-zone, spawn-asset-preview). Gates before generators —
  they're what makes cheap LLM nodes safe, and are useful standalone (CI
  smoke test) even if the graph stalls.
- **M2 — art subgraph, one asset type:** food sprites (smallest, "consumable
  today" per TAC §3, no engine work needed).
- **M3 — design subgraph + wire/verify.**
- **M4 — one full zone end-to-end** (e.g. Kolkata) to debug the machine.
  **Then stop** — mass production waits for the P0 playtest gate. Build the
  factory; don't run the presses.

## 8. Open questions (PM calls)

- Gate 2's screenshot board: plain HTML file the pipeline writes
  (recommended — zero infra) vs LangGraph Studio UI.
- `zone_data_writer`: append to `game.js` via script, or hand PM a
  paste-ready blob (recommended start: paste-ready blob; automate after M4).
