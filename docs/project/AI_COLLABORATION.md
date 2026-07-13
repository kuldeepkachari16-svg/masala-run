# AI Collaboration

> **Purpose:** Governs process, roles, and decision flow between the PM and the AI systems (ChatGPT, Codex, Claude) building Masala Run.
> **Status:** Living  ·  **Owner:** Codex (repo)
> **Created:** 2026-07-10

This document governs collaboration between the project owner and AI systems used
throughout Masala Run. It defines process, roles, and decision flow.

It is not part of the Art Bible and contains no creative direction.

---

# Roles & Responsibilities

## Human

- Final decision maker.
- Product owner.
- Approves all frozen decisions.

## ChatGPT

- Creative Director.
- Project planner.
- Creative reviewer.
- Responsible for downstream thinking before implementation.

## Codex

- Repository engineer.
- Documentation engineer.
- Refactoring.
- Repository implementation.
- Never invent creative direction.

## Claude

- Technical implementation.
- Gameplay.
- Architecture.
- Runtime implications.

## Future AI Models

New AI tools may be introduced provided they respect the responsibilities defined
in this document.

---

# Collaboration Principles

- Freeze principles before implementation.
- Creative decisions precede repository implementation.
- Repository changes should preserve existing architecture.
- Creative authority always remains with the Art Bible.
- Implementation must follow frozen decisions.
- AI tools should stay within their assigned responsibilities.

---

# Prompt Finalization Rule

Before generating any prompt intended for another AI model or implementation
agent:

1. Review the request.
2. Think through downstream implications.
3. Surface every recommendation first.
4. Incorporate accepted recommendations.
5. Generate one final prompt.
6. Treat the prompt as complete.

Do not append additional recommendations after the prompt unless the user
explicitly requests revisions.

---

# Repository Update Rule

Once creative decisions are frozen, implementation and documentation tasks should
update the repository directly.

Do not return paste-ready content unless the task is explicitly a review,
brainstorming, or inspection exercise.

The repository should remain the primary source of truth.

---

# Review vs Implementation

## Review Task

- Generate output for inspection.
- No repository changes.

## Implementation Task

- Update repository directly.
- Return only a concise summary of repository changes.

---

# Decision Hierarchy

1. Human-approved frozen decisions.
2. Art Bible.
3. Prompt Bible.
4. Technical Asset Contract.
5. Repository implementation.

Implementation must never override creative decisions.

For current runtime capability, `docs/art-production/TECHNICAL_ASSET_CONTRACT.md`
is authoritative. The Art Bible remains authoritative for creative intent.

Current runtime reality:

- vanilla JavaScript
- Canvas 2D
- single `game.js`
- zero runtime dependencies
- PWA

Current supported asset operations:

- image drawing
- uniform scaling
- horizontal mirroring
- global alpha
- cached flat-colour tinting
- cached hit-flash compositing
- offscreen pre-rendering

Unsupported unless new engine work is explicitly approved:

- arbitrary entity sprite rotation
- runtime per-pixel recolouring or hue shifting
- shaders
- skeletal animation
- sprite-sheet/frame animation

---

# Doc Provenance Convention

Every new `.md` file created by any AI in this project opens with a provenance
block immediately under the H1 title. It exists so that months later anyone can
tell why a doc was written and whether it is still authoritative — without
reconstructing history from git.

```
> **Purpose:** <one line — the question this doc answers / why it exists>
> **Status:** Living  ·  **Owner:** ChatGPT (creative)
> **Created:** YYYY-MM-DD
```

- **Status** is a fixed vocabulary: `Living` (current, maintained) · `Proposed`
  (a plan not yet built) · `Superseded by <path>` (dead — points to its
  replacement) · `Archived` (kept for history, do not act on).
- **Owner** names the responsible lane: `ChatGPT (creative)` · `Claude
  (engine)` · `Codex (repo)` · `PM`.
- **Created** is a human-readable hint only. Git is the authoritative record of
  when a file was added; the field's real value is signalling the last time the
  doc was meaningfully reviewed.
- A doc is never silently abandoned. When it stops being true, its owner flips
  Status to `Superseded by <path>` or `Archived` rather than deleting it, so the
  supersession chain stays legible.

This rule is documentation hygiene; it does not alter the Decision Hierarchy or
any creative authority defined above.

# Continuous Improvement

New collaboration lessons may be added to this document whenever they improve the
long-term development process.

This document governs how the project is built.

The Art Bible governs what the project becomes.
