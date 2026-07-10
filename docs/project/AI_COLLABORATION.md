# AI Collaboration

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

---

# Continuous Improvement

New collaboration lessons may be added to this document whenever they improve the
long-term development process.

This document governs how the project is built.

The Art Bible governs what the project becomes.
