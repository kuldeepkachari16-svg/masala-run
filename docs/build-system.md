# Masala Run — Flavor Build System (design spec v1)

**Purpose:** turn the flavor hook into a real survivor-like **build system** — the
differentiator and the deepest gap on the path to a commercial launch (see
`ROADMAP.md` → Commercial north-star, item 2).

**Builds on today's mechanics:** auto-fire at the nearest Bland (you only move);
your weapon = the **last-eaten flavor**; flavor fades in 15s; upgrades = frequent
XP-driven level-up picks (1-of-3, plus a stronger pick at bosses) drawn from a
pool of ~5 cards; fusions = *one-shot bursts*; no meta between runs.

## The core insight to protect
Your weapon is **food, and it's transient.** Keep that. A "build" = the flavor
identity you assembled this run and how you evolved it. Don't bury the eat-loop.

## 1. Flavors = weapon archetypes with real identity (and fix savory)
Today flavors are stat blocks; make them *playstyles*:
| Flavor | Identity | Today | Change |
|--------|----------|-------|--------|
| Spicy | Burst / aggression | 3-shot spread, dmg 2, fast | ~right; add short range + ignite on crit |
| Sweet | Rapid / DoT | very fast, dmg 1, 1 shot | add **pierce** or a "sugar-rush" ramp stack |
| Savory | Control / area | slow, dmg 1, weakest | **give identity:** knockback + a lingering **ghee puddle** (slow/AoE) |
| Sour *(meta-unlock)* | Chain / ricochet | — | later |
| Bitter *(meta-unlock)* | Debuff / curse | — | later |

## 2. Frequent upgrades = the dopamine engine *(the big change)*
Replace "boons only at bosses" with **level-ups**:
- Gain **XP** from kills (+ a little from eating). Level up → **pick 1 of 3** cards.
- Cadence: a pick every ~20–40s early. *This* is the survivor-like fun.
- Pool ~24 cards:
  - **Flavor-specific:** "Spicy +1 projectile", "Sweet bullets pierce", "Savory puddle lingers +2s", "Spicy crits ignite".
  - **Generic:** +move speed, +max HP, +pickup range, +fire rate, +crit, +XP gain.
  - **Keystones (rare, build-defining):** "Overcook — flavor never fades, +1 dmg taken", "Thali — hold TWO flavors, alternate volleys", "Slow Cook — +50% dmg while standing still".
- Keep the 5 boons as a subset; bosses give a *stronger* pick.

## 3. Fusions = evolutions, not one-shot bursts
Today a fusion is a burst. Make fusions **persistent evolved weapons** (à la
Vampire Survivors evolutions): meet a condition (e.g. Spicy at lvl ≥3 *and* eat
Sweet) → permanently evolve into **Chilli Glaze** for the rest of the run = the
build payoff. 3 base recipes → 3 evolutions; scales as flavors are added.

## 4. Meta-progression = the retention engine *(absent today)*
Between runs:
- Earn **Masala** currency every run — **win OR loss** (losing must still progress).
- Spend on permanent unlocks: new flavors, new cards entering the pool, **characters
  (couriers)** with distinct base stats / starting flavor, small stat boosts.
- Results screen shows run stats + Masala earned + a **next-unlock teaser**
  (Roadmap Phase 2 item 9).

## 5. Run shape
- 8–15 min, clear win/lose (≈ there already).
- Both outcomes reward → "one more run."

## Build order (prototype in JS, validate, then port — never before)
1. ~~**XP + level-up 1-of-3 pick.**~~ ✅ shipped 2026-06-20 (`ca9fb82`/`8f611e3`)
   — XP from kills, level-ups pick 1-of-3, boss picks are the stronger variant.
   Pool is still the original ~5 boons (`CONFIG.boons`), not yet the ~24-card
   target below — that's still open.
2. Give **savory** its identity; differentiate the three flavors mechanically.
3. **Persistent fusion evolutions.**
4. **Minimal meta:** Masala currency + 3–4 permanent unlocks + results screen.
5. **Playtest for "one more run."** Expand the pool to ~24 only if the loop lands.

## Explicit non-goals (v1)
No content sprawl (levels/enemies/art). No monetization hooks yet — that's P1,
*after* the loop is proven. Don't gold-plate; validate.
