# Masala Run — LangGraph Content Pipeline (Architecture)

Status: **proposed — documentation only, nothing built**. Supersedes
`docs/agentic-pipeline.md` (the Claude-Code-subagents proposal) as the orchestration
plan; that doc's two core artifacts (zone-spec + zero-LLM gates) survive here as
graph nodes.

Owner: Claude (per `docs/project/AI_COLLABORATION.md`). Authority order is unchanged:
Human > Art Bible > Prompt Bible > Technical Asset Contract > this pipeline.

---

## 1. What this is (and is not)

A **Python LangGraph app** living in `pipeline/` (own venv, own deps) that turns a
3-line zone brief into: approved PNG assets + metadata, a validated `CITIES[]`
entry, passing playtest evidence, and updated docs — with the PM approving at
exactly **three** points.

Hard boundaries:

- **It never touches `game.js`.** The game stays vanilla JS, zero dependencies.
  Pipeline outputs are only: files in `assets/`, a JSON blob the PM (or a script)
  pastes/appends into `CITIES[]`, and doc updates. Engine work (segment composer,
  sprite sheets) stays manual, Claude-owned, outside the graph.
- **LLMs never accept/reject anything.** Every gate is deterministic code
  (validators, Playwright, image checks) or the human. LLM nodes only *produce*
  candidates. This is what makes cheap/free models safe to use.
- **The graph encodes the existing role contract**, it doesn't replace it:
  ChatGPT's creative-director role → the design LLM node; Codex's repo-engineer
  role → mostly plain scripts (the cheapest engineer is a script); Claude stays
  the engine owner outside the graph.

Why LangGraph specifically (and not a bash script): two features earn it —
**`interrupt()`** (first-class human-in-the-loop pauses) and **checkpointing**
(SQLite persistence). A zone run spans days of PM availability; the graph must
sleep at an approval gate on Tuesday and resume Thursday with full state. That is
exactly LangGraph's core competence. Everything else about it is incidental.

### Workflow, not "team of agents" (decided 2026-07-11)

The desired experience — *"I type Kolkata and Delhi, the orchestrator knows what
to do and distributes the work"* — is the product goal. The implementation is
**not** a supervisor LLM routing tasks to autonomous agents at runtime. LangGraph
distinguishes *workflows* (known steps, static edges) from *agents* (LLM picks the
next step). Adding a zone is a known recipe — spec → art → wire → test → stitch,
identical every run — so the routing is encoded once, at design time, as graph
edges. Same "it just knows" experience; no per-run routing cost, no
nondeterminism in who does what. "Agents" here are nodes, and most of them are
plain code (see the node table's 3-LLM / 7-code ratio).

Corollary: there is **no difficulty node**. Difficulty is a global curve
(`lvl()`), deliberately not per-zone — `CITIES[]` is pure content and stays
balance-free. If a zone ever needs a nudge, `CONFIG.levels` is a code-node
default-copy, not an LLM's judgment call.

**"But later cities should start harder"** — they already do: the curve is
indexed on run progression, so a player entering city 3 arrives at city-3
difficulty (more enemies, tougher stats) with zero per-city authoring. Keeping
the curve out of the zone pipeline is deliberate: N zone-level LLMs each making
locally-reasonable difficulty calls destroys global pacing. One curve, tuned in
one place from playtests.

**Vocabulary vs sentences.** New enemy archetypes / hazards / mechanics =
**vocabulary** — engine work (behavior code in `game.js`), rare and human+Claude
led, outside the graph (its sprite can use the art subgraph). Zones =
**sentences** written with existing vocabulary — cheap, parallel, pipeline work.
The design node's input is the *current vocabulary list* (already the zone-spec
schema), never difficulty numbers. When new vocabulary ships, the schema and the
design node's context update in the same commit; zones generated after can use it.
If per-city enemy-mix flavor is ever wanted (e.g. a swarmer-heavy city), the
order is fixed: engine adds a bounded `CITIES[]` field first, validator enforces
the bounds, and only then may the design node set it. Knob first, agent second.

---

## 2. Graph topology

One master graph, `new_zone`, with three subgraphs and two utility nodes:

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

Failure edges everywhere loop back **with the failure report appended to state**,
bounded (2 retries), then escalate to the PM instead of burning tokens.

---

## 3. Node inventory

| Node | Type | Role it absorbs | Model / tool (see §6) |
|---|---|---|---|
| `creative_director` | LLM | ChatGPT (creative director) | Sonnet-class |
| `zone_spec_validator` | code | Codex | jsonschema, pure Python |
| `prompt_composer` | LLM | ChatGPT (prompt authoring) | Sonnet-class |
| `image_gen` | API | PM's manual ChatGPT image loop | gpt-image-1 primary |
| `post_process` | code | Codex | Pillow + rembg (free) |
| `metadata` | code | Codex | existing `tools/*.py` reused |
| `in_game_screenshot` | code | **new** — TAC §8 as a node | Playwright (free) |
| `zone_data_writer` | code (+tiny LLM for copy) | Codex | template + Haiku/free tier |
| `validate_city` | code | Codex | `tools/validate-city.mjs` (to build) |
| `playtest_runner` | code | QA | Playwright (free) |
| `scribe` | code + tiny LLM | Codex (docs) | Haiku/free tier |
| Gates 1–3 | human | PM | LangGraph `interrupt()` |

Note the ratio: **3 LLM nodes, 7 code nodes**. That's deliberate. The graph's value
is orchestration and resumability, not "more AI".

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

`AssetJob.prompt` is always persisted next to the image — approved prompts are the
raw material that finally fills the Prompt Bible's TODO sections (§5).

## 5. Prompt work distribution

The Prompt Bible stops being a doc humans paste from and becomes **machine-readable
blocks** in `pipeline/prompts/`:

- `shared/` — style anchor, negative-prompt rules, the hero-scale law, palette
  neutrality (TAC §5), "no baked shadows/glows" (TAC §5) — injected into *every*
  composed prompt so no single prompt can violate the contract.
- `per-asset-type/` — character / edge-prop / road-tile / hazard / food blocks
  (sizes and framing straight from TAC §4).
- `prompt_composer` assembles: shared blocks + asset-type block + zone flavor from
  the spec + PM rejection note (on retries).
- **Feedback loop:** every Gate-2-approved prompt is appended by `scribe` to the
  Prompt Bible as a worked example. The Bible's Variation/Regeneration TODO
  sections get filled by real production data, not speculation.

## 6. Integrations — free vs paid candidates

### Text LLM nodes

| Candidate | Cost | Fit |
|---|---|---|
| **Gemini Flash (AI Studio free tier)** | free | Generous free quota; fine for schema-gated nodes since the validator catches garbage |
| **Groq free tier** (Llama 3.3 70B etc.) | free | Fast, fine for copy/names |
| **Ollama local** (Qwen2.5-Coder) | free | Private, offline; weakest quality |
| **Claude Haiku 4.5** (`claude-haiku-4-5`) | $1 / $5 per MTok | Cheap, reliable structured JSON |
| **Claude Sonnet 5** (`claude-sonnet-5`) | $3 / $15 (intro $2 / $10 through 2026-08-31) | Quality tier for creative-director + prompt-composer |
| GPT (mini tiers) | ~$ | Viable; PM already pays for ChatGPT but API billing is separate |

**Recommendation:** two-tier. Quality-sensitive nodes (`creative_director`,
`prompt_composer`) → **Sonnet 5**; schema-gated bulk nodes (`zone_data_writer`
copy, `scribe`) → **Gemini Flash free tier**, with **Haiku 4.5** as the paid
fallback when free-tier quota or quality bites. Per-zone text spend rounds to
pennies either way — don't over-optimize this axis.

### Image generation (the axis that actually matters)

| Candidate | Cost | Fit |
|---|---|---|
| **gpt-image-1 (OpenAI API)** | ~$0.01–0.17/image by quality | **Native transparent-background output** — directly satisfies TAC §7 (real alpha, no matte fringe). Strong prompt adherence. |
| **FLUX.1 [dev] via fal.ai / Replicate** | ~$0.025/image | Great quality/price; no native alpha (needs rembg pass) |
| **Recraft V3 API** | ~$0.04/image | Style-consistency controls; good for asset *sets* |
| **FLUX.1-schnell local** (Draw Things / ComfyUI on the Mac) | free | Unlimited exploration; slower, alpha + style consistency are manual work |
| Gemini image gen (AI Studio free quota) | free-ish | Fine for mood exploration, weak alpha story |

**Recommendation:** **gpt-image-1 as the production generator** — native alpha is
the single contract-critical feature, and every free option pays it back in
post-processing pain and fringe artifacts (the exact "sticker halo" failure the
contract memorializes). Use **local FLUX-schnell free** for cheap bulk mood/variant
exploration *before* spending API calls. Revisit Recraft if cross-asset style
drift becomes the top problem.

### Everything else

| Need | Pick | Cost |
|---|---|---|
| Alpha cleanup / resize | rembg + Pillow | free |
| Checkpointing | LangGraph SQLite checkpointer | free |
| Screenshot + playtest gates | Playwright | free |
| Trace debugging | **LangSmith free tier** (5k traces/mo) | free |
| Validation | jsonschema + existing `tools/*.py` | free |

Take LangSmith from day one — debugging a multi-node LLM graph blind is the
classic way these projects die; the free tier covers this project's volume easily.

### Cost per new zone (rough, marked as estimate)

~15–25 images incl. retries on gpt-image-1 ≈ **$0.50–1.50**; text LLM ≈ **$0–0.30**.
Call it **under $2 (~₹150) per zone**, dominated entirely by image generation.
API keys needed: OpenAI (images) + Anthropic or Google (text). Both PM-owned.

---

## 7. A new zone, from the PM's chair

1. **Touchpoint 1 — brief.** `python -m pipeline new-zone "Kolkata: sweets-heavy,
   tram-line route, monsoon puddles"` (or via LangGraph Studio). A bare city name
   is a valid brief — `new-zone Kolkata` — the design subgraph expands a name into
   a full spec for Gate-1 approval. Walk away.
2. Graph drafts + validates the spec, then **interrupts**. **Touchpoint 2 —
   approve the spec** (name, palette, foods, boss concept, hazard) — one
   yes/no/edit, doable same-day or three days later; state is checkpointed.
3. Art fan-out runs unattended (overnight is fine). Failures self-retry twice,
   then park.
4. **Touchpoint 3 — screenshot board.** Every candidate asset shown *inside the
   running game next to the courier* (TAC §8 — approval in an image viewer never
   counts). Approve / reject-with-note per asset; rejects regenerate with the note.
5. Wire + validate + playtest run automatically; PM glances at the final report +
   playtest screenshots (folded into the same review sitting as 4 in practice).
6. Output: a git branch containing assets, metadata, manifest, `CITIES[]` entry,
   doc updates, and the evidence report. Commit/push stays a human+Claude act —
   the pipeline never pushes.

### Batch mode — multiple zones at once

`python -m pipeline new-zone Kolkata Delhi` spawns **one independent graph run
per city** (a LangGraph thread each, separately checkpointed). Runs proceed in
parallel; nothing about the graph changes. The only batch-aware piece is the
review surface: Gates 1–3 collect pending interrupts across all live runs into
one board, so approving two zones is one sitting, not two ceremonies. A failed or
rejected Kolkata never blocks Delhi.

## 8. Build order

- **M0 — skeleton (½ day):** `pipeline/` package, graph with echo nodes, SQLite
  checkpointer, CLI entry, LangSmith wired. Proves interrupt/resume works.
- **M1 — gates first:** `validate-city.mjs`, `zone-spec.md` schema,
  `playtest_runner`, `in_game_screenshot` (needs ~20 lines of `__mr` test hooks:
  force-city, force-zone, spawn-asset-preview). **Gates before generators** — the
  deterministic gates are what make cheap LLM nodes safe, and they're useful
  standalone (CI smoke test) even if the graph stalls.
- **M2 — art subgraph, one asset type:** food sprites (smallest, and "consumable
  today" per TAC §3 — no engine work needed).
- **M3 — design subgraph + wire/verify.**
- **M4 — one full zone end-to-end** (e.g. Kolkata) to debug the machine. **Then
  stop.** The sequencing rule from the previous proposal still binds: mass
  production waits for the P0 playtest gate. Build the factory; don't run the
  presses.

## 9. Open questions (PM calls, when we get there)

- Where Gate 2's screenshot board lives: plain HTML file the pipeline writes
  (recommended — zero infra) vs LangGraph Studio UI.
- Whether `zone_data_writer` appends to `game.js` via script or hands the PM a
  paste-ready blob (recommended start: paste-ready blob; automate after M4).
