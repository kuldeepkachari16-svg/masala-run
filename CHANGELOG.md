# Masala Run — Changelog

## 2026-08-13 — Session 58 Phase 3: early-game balance pass + recipe-toast fix

Targeted follow-up to Session 58's diagnostic playtest (bot + PM manual
play both flagged a wave 3-4 death wall). PM's manual test of VADA PAV
RAIN confirmed powers help but only partially resolve it — sufficient to
proceed with a small tuning pass, not a redesign.

**Change.** `CONFIG.swarmerShare[2]` (wave 3) `0.18 → 0.10` — `game.js`
only value touched. It was the single biggest jump in the array (0 in
waves 1-2 to 0.18 in one step), landing right as `spawnBase`'s ramp is
also increasing base spawn frequency — the mechanism-level explanation
for the diagnosed wall. Wave 4 (`0.25`) deliberately untouched so the
escalation beat still lands; no changes to enemy hp/speed/damage, power
strength, or player HP.

**Validation.** Scripted playwright-core (`channel: "chrome"`, headless)
before/after playtest, 10 runs total (5 at `swarmerShare[2]=0.18`, 5 at
the shipped `0.10`), driven via `__mr.tick()` with a real movement/dodge
heuristic (food-seeking + enemy-repulsion) and `__mr.triggerRush()` /
`__mr.triggerSlam()` power usage — not a stationary walk. Result: wave-3
swarmer presence went from 2-3 concurrent in every BEFORE run to 0 in
every AFTER run; wave-4 max concurrent enemies stayed in the same 8-18
range across both conditions. Waves 1-2 unchanged in either condition
(max 2-4 enemies), not flattened. Neither condition produced a death in
this specific 10-run sample (bot dodge quality got "stuck" at the wave
5/8 boss encounter in all runs, a scripted-bot limitation, not the
question under test) — this data confirms the wave-3 spike mechanism was
removed as designed, but doesn't independently prove reachability gains;
that's still the pending real human Gate-1 playtest's job.

**Recipe-toast fix.** A "NEW RECIPE" toast could freeze in place (behind
a translucent overlay, still near-full alpha) right where the POWER
UP/BOSS DOWN choice modal renders its cards, if a fusion landed right
before a level-up/boss-kill opened the pick screen — `update()` returns
early while `boonChoices` is set, so any in-flight floater stops
decaying/moving but keeps rendering. Fix: `floaters.length = 0` at both
sites that open a choice modal (`tryOpenPick()` for level-ups, the
mini-boss-kill branch for boss picks) — the modal always opens onto a
clean floater layer. Confirmed via screenshot: no toast bleed-through.

**Docs.** `ROADMAP.md` and `docs/build-system.md` both said "5 boons,
bosses only" / "upgrades ... only at bosses" — stale since `ca9fb82`/
`8f611e3` (2026-06-20) shipped XP-driven 1-of-3 level-up picks the same
day the docs were written. Corrected both to reflect frequent level-ups
already shipped, pool still ~5 cards (unchanged scope — broader pool /
fusion evolutions / meta-progression remain future work).

**Not in scope this pass (by design):** onboarding for Rush/Slam manual
powers (Session 58 P2 finding, parked); the real human Gate-1 playtest
(still the standing P0, unaffected by this session).

## 2026-08-12 — Session 57: multi-segment production distribution

Replaced the single-fixed-instance production harness with a deterministic
policy that decides, per corridor segment, whether it carries a production
prop, which edge, and which validated asset. No new art, no asset changes, no
Session 56 geometry touched — `game.js` only.

**Problem.** `edgePropInstances()` (Sessions 46-52) always placed its
instance(s) at one fixed `baseY` near the route start, so only ~1 of a
level's 6 segments ever carried a production prop (Session 52 finding).
Nothing decided placement above that single-instance harness.

**Policy (`productionDistributionPlan()`, new).** For every segment `idx` in
the level, a fresh `mulberry32` generator seeded `level*746827 + idx*15485867
+ 91` (own salt, independent of `drawCorridorSegment`'s tile seed) draws:
eligibility roll, edge roll, asset roll, y-jitter roll.
- **Eligibility**: `roll < density (0.6)`, gated by a cooldown
  (`minGapSegments: 1`) that forces at least one breathing segment after any
  hit — structurally rules out back-to-back production segments. Average
  cadence ≈2-3 eligible segments per 6-segment level (simulated across 200
  levels), non-alternating (independent per-segment roll, not a fixed period).
- **Catalogue**: `PRODUCTION_CATALOGUE_KEYS` — the three Session 46-51
  VALIDATED masters only (`..._cart_fixed_canopy_right`, `..._chai_counter_...
  _right`, `..._cart_fixed_canopy_left`). Session 54/55 experimental
  vertical-geometry pilots are excluded, staying opt-in via `test54` only.
- **Edge/asset**: coin-flip edge, filtered to whichever edge actually has a
  validated master for the current city (`productionCatalogue(city, edge)`);
  falls back to the other edge if empty, or marks the segment `noCatalogue`
  if neither has one (exercised live: Mumbai's second city, level 6, has no
  catalogue yet and correctly breathes every segment).
- **Repetition control**: prefers any asset other than the immediately
  preceding eligible segment's pick; only repeats when the catalogue leaves
  no choice (e.g. the left edge's sole master) — a catalogue limit, not a bug.
- **y placement**: mid-segment, jittered 0.3-0.7 of `tileH` so instances don't
  read as pinned to a fixed grid row.

**Wiring.** `productionDistributionInstances()` returns plain `{key, y}`
pairs — the exact shape `edgePropInstances()` already produced — so it drops
into the existing precedence chain (`test54 > testC > distribute > testB >
testKey`) with zero changes to `productionClaims()`, `edgeAdmits()`,
`edgePlacement()`, or `segCompositionSig()`. Every instance still runs through
the same production-claim → `edgeAdmits()` → procedural-de-confliction
pipeline Session 46-50 built. `CONFIG.edgeProps.distribute: true` is now the
live default; `testB` flipped to `false` (superseded, still available for
isolated Session 50 regression testing). Cache identity needed no changes —
`segCompositionSig()` already hashes `productionClaims(idx)`'s resolved
claim ids/edges/y-ranges, which are downstream of the new policy, so a
distribution-config change already invalidates exactly the segments it
affects, no more and no less (verified: toggling `distribute` off/on for a
live segment removes/restores its claim with byte-identical composition, and
a procedural filler correctly re-admits into the freed budget slot).

**Verified (headless CDP + system Chrome, `docs/verification.md` fallback
recipe — playwright-core unavailable on this machine).** `node --check`,
both asset validators (pre-existing WARN-only names output unchanged),
`git diff --check` all clean. Runtime, levels 1-6, full 6-segment walks:
- Every eligible segment's claim reached `edgeAdmits()` and was **ADMITTED**
  (zero unexpected rejects) across 5 Mumbai levels sampled.
- Breathing segments confirmed genuine (`density`/`cooldown` reasons), not
  failed-claim accidents.
- No identical asset on consecutive eligible segments in any sampled level;
  edge selection not mechanically alternated (level 5 picked `right` twice
  with different assets).
- Left AND right placements both occurred across the sample; `mirrored:
  false` on every registered def (unconditional, unchanged).
- **Session 50 regression** (`testB`, `distribute:false`): cart + chai both
  admitted on the shared right edge; a procedural `plant` correctly rejected
  for overlap — unchanged from Session 50.
- **Session 51 regression** (`testC`): left cart + right cart admitted
  independently; a procedural reject fired on each edge from its own claim
  (independent budgets confirmed) — unchanged from Session 51.
- **Determinism**: two full fresh page loads produced byte-identical
  6-level distribution plans; revisiting a level after navigating away and
  back reproduced the same plan; matched a third, independently-run walk.
- **Cache**: config toggle off/on round-tripped a segment's claims exactly;
  plain revisit (no config change) reproduced the exact same composition.
- **Day/night**: screenshots at both a left-edge and a right-edge claim, in
  a day zone (level 1) and Mumbai's one night zone (level 4) — courier
  dominant, road centre clear, delivery/hazard UI legible, no baked-lighting
  clash, props visually subordinate at the edge. Zero console errors across
  every run.

Road-intrusion values unchanged (5.60 / 4.02 / 4.90 px on the three
production masters, all ≤ the Session 56 8px hard cap) — no geometry, pivot,
scale, or budget constant touched.

**Unresolved / next.** The fresh-player Gate-1 fun/retention playtest is
still the standing P0 (per `ROADMAP.md`). Session 57 only replaces the
placement-policy layer; it doesn't change what Gate-1 needs to test.

## 2026-08-12 — Session 56 correction pass: edge-prop geometry contract corrected
Codex independently reproduced Session 56's runtime decomposition and numeric
findings from the repository and returned "ready to freeze with minor
corrections." This pass applied those corrections directly to
`docs/art-production/reports/session56_edge_prop_geometry_audit.html` — no
runtime code changed, no new art generated, no new prototype run; every
correction was resolvable from evidence already in the repo (game.js,
CHANGELOG.md, asset metadata JSON).

- **Parameterized the hard ρ rule**: `ρ × declaredMaximumRuntimeHeight ≤
  8px`, not a fixed universal 8.9% (that number only holds at a 90px
  declared maximum).
- **Resolved the preferred-headroom policy** to one explicit choice — 30%
  headroom off the hard cap — and derived every other preferred number from
  it (preferred ρ ≤ 6.22% at h=90).
- **Retracted cityFrac 55–75%** as a target band: it was derived from a
  different metric (bleed-as-%-of-width) mislabeled as cityFrac-as-%-of-
  height; the shipped production masters actually run cityFrac 93–109%. No
  numeric band is asserted now — measure, project bleed, PM visual review.
- **Retracted W:H 0.6–0.8**; reverted to the old ~0.5–0.6 as a non-binding
  secondary heuristic. W:H cannot validate road intrusion — ρ is the only
  safety variable.
- **Demoted the pivot-position figure** (5–7% of visible width) from a rule
  to a diagnostic. The authoritative pivot requirement is the honest
  road-facing ground-contact footprint edge.
- **Documented a real ~1px bounds-convention gap** on right cart v002 only:
  metadata JSON reports an inclusive alpha-pixel bbox, game.js
  `EDGE_PROP_DEFS` stores an exclusive-upper-bound convention. Runtime
  values are correct as stored; no code change.
- **Corrected asset classifications**: left cart v003's metadata `status`
  is `"review"`, not approved/shipped (was mislabeled `(prod)` in two
  tables) — confirmed by reading
  `assets/metadata/mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v003.json`
  directly. Right cart v002 and chai counter v001 confirmed `approved`.
  Session 54/55 prototypes reclassified as experimental evidence only, not
  production references.
- **Downgraded Session 55's pivot-selection confidence to Medium** — its
  footprint was manually inferred using a 150px ground-line threshold to
  separate two ground contacts at different isometric depths, not a pure
  alpha measurement. The ρ formula remains exact once that pivot is
  accepted.
- **Restructured the proposed contract** into four explicit tiers: hard
  runtime constraints / preferred production guidance / secondary visual
  heuristics (non-binding) / human-review requirements (no numeric ceiling
  asserted).
- **Softened the "one more prototype" recommendation** from a freeze
  prerequisite to optional, non-blocking production-quality work — the hard
  formula is exact algebra and needs no additional art to validate.

Contract status unchanged: **NOT FROZEN — pending PM/ChatGPT review.**

## 2026-08-12 — Session 55: second right-edge geometry prototype — CONDITIONAL PASS
Renumbered from the brief's "Session 54" — that number was already committed
(2026-08-09, the vertical/road-parallel geometry pilot) before this session
started, same reason that pilot itself renumbered from "Session 53."

Follow-up to Session 54's right-edge result: the first vertical right
prototype only reached 0.844 visible width:height (a modest win, not a
vindication of the road-parallel/shallow hypothesis the left prototype
showed at 0.516). This session tests a second, independently-authored right
source aimed deliberately at the 0.5–0.6 target band.

- **Source inspection** (`~/Documents/Working images/cart right.png`, PM-
  supplied): 1024×1536 RGBA. Genuinely isolated on arrival, unlike both
  Session 54 sources — verified, not assumed: alpha histogram is 99.2%
  concentrated at the extremes (>=229 or <25), only ~0.8% partial/AA-edge
  pixels; corner and border alpha = 0; a full-canvas connected-component scan
  found exactly 1 stray pixel outside the main silhouette. No baked
  background, no baked shadow/dust, no cleanup performed. Complete structure:
  canopy, both wheels, handle, propane tank, storage baskets, hanging bulb.
  No text/logo/second cart/people. Copied unmodified into the repo as
  `assets/props/session55_vadapav_cart_vertical_right_test_v2.png`; the PM's
  original under `~/Documents/Working images/` was never touched.
- **Handedness** determined from structure, not filename: service/counter
  shelf (spice jars, trays, condiment bins) sits on the canvas's LOW-x, near-
  bottom side; propane tank, storage baskets and push handle sit HIGH-x —
  same low-x-is-road-facing pattern as every registered right master.
  Classified RIGHT; no mirroring performed.
- **New EDGE_PROP_DEFS entry** `mumbai_vadapav_cart_vertical_right_test_v2`,
  bounds measured at alpha>=32 (repo convention). Footprint required a
  different method than any prior def: this source is a steep isometric
  composition with TWO ground contacts at very different canvas depths (a
  small near-side caster that bottoms out at the true ground line, and the
  main wheel ~120px higher, set back in the isometric depth) — a per-column
  bottom-opaque-pixel scan, bounding box of all columns within 150px of the
  true ground line, captures both wheels as the genuine physical footprint
  without clipping either. Documented inline in game.js.
- **No new CONFIG, no new `edgePropInstances()` branch.** Ran the comparison
  through the already-existing single-asset `cfg.testKey` harness
  (`__mr.config.edgeProps.testKey = "..."`, with testB/testC/test54 off) —
  simpler than Session 54's approach, which needed a new `test54` harness
  because it compared two prototypes simultaneously. This session only ever
  swaps one asset at a time against the current production master, so the
  pre-existing single-asset harness was sufficient. Zero lines of runtime
  logic changed; the only diff in game.js is the one new data-only
  `EDGE_PROP_DEFS` entry.
- **Geometry results** (heightPx 70, same apples-to-apples basis as Session 54):

  | | v2 (this session) | Session 54 right prototype | current right master (V002) |
  |---|---|---|---|
  | visible w:h ratio | 0.620 | 0.844 | 1.158 |
  | on-screen width | 43.40px | 59.09px | 81.09px |
  | road intrusion | 7.81px | 3.02px | 5.60px |
  | outer-edge bleed | 0.19px | 20.67px | 40.09px |
  | road-intrusion headroom | 0.19px (2.4%) | 4.98px (62%) | 2.40px (30%) |

  (`intrusionAllow` stays 8px, unchanged.) Read live via `__mr.edgeProps` at
  runtime, not derived from source pixels alone — confirms the same 0.620
  ratio survives uniform scaling (43.40/70 = 0.620).
- **Real finding, reported rather than tuned away:** road intrusion passes
  (7.81 ≤ 8) but with only a 2.4% margin — the thinnest of any registered
  edge prop, current or prototype. The cause is structural, not a
  measurement artifact: the counter/service shelf overhangs the wheelbase by
  11.1% of the asset's own height (165 of 1480 source px), a LARGER
  proportional overhang than the current production master's 8.0% (50 of 625
  px) or the first Session 54 prototype's 4.3% (26 of 603 px). The shallow/
  narrow silhouette that eliminated outer-edge bleed did not come with a
  shallow counter overhang — those are independent properties of the source
  art, and this source improved one while regressing the other. Did not
  relax `intrusionAllow` or retune the footprint to manufacture more
  headroom; the number is reported as measured.
- **Style/camera finding, reported per the brief's Part 3 requirement:** the
  source is a steep, raking isometric composition with directional beauty-
  shot lighting — a lit hanging bulb, a soft backlit rim-glow around the
  canopy edge (confirmed to composite away cleanly to full transparency, not
  a defect — checked by compositing the delivered alpha onto solid gray and
  white; no halo residue), a dark vignette, and notably higher saturation
  (bright blue/white checkerboard canopy, vivid red gas cylinder, orange
  sunburst signage) than the muted, restrained-contrast production masters.
  This is a beauty-shot render, not the flatter bird's-eye, restrained-
  palette style Part 3 calls for — a real, visible mismatch, though at
  gameplay scale (43px wide) it still reads recognizably as a Mumbai cart
  (verified in the day/night screenshots below).
- **Gameplay check** (day zone 1, night zone 4, `mumbai_vadapav_cart_
  vertical_right_test_v2` live via `testKey`): player stays clearly more
  salient than the prototype at typical play distance in both lighting
  conditions; road centre reads calm, no tunnel/gateway effect; zero
  feature-related console errors or exceptions. Six pre-existing 404s for
  missing sprite PNGs (`bland.png`, `courier.png`, etc. — the SVG-fallback
  gap noted in the art-pipeline docs) reproduce identically with this
  session's changes reverted; unrelated, not introduced here.
- **Procedural de-confliction:** with the new asset claimed via `testKey`,
  the same four procedural claims (`stall@4070`, `crate@4262`, `cart@4569`,
  `plant@4752`) were accepted on the right edge regardless of which right-
  edge asset (`v2` vs. V002) was active — confirms the new claim is
  correctly routed through the unmodified `productionClaims()` →
  `edgeAdmits()` → `addClaim()` composer path, same budget gate as any
  other registered prop, not a bypass.
- **Determinism / cache:** live-toggled `testKey` between the new asset and
  V002 with no page reload, three times — `__mr.edgeComposer`'s claim ids
  updated correctly on every switch and restoring the original config
  reproduced byte-identical claim ids (Session 54's `segCompositionSig()`
  fix — folding `c.id` into the cache signature — still holds; not touched
  this session).
- **Regression** (fresh `goLevel(1)`, then toggled live): Session 50 Test B
  (`testB`: right fixed-canopy cart + right chai counter) and Session 51
  Test C (`testC`: left + right fixed-canopy) both reproduce their exact
  prior numbers — cart `roadIntrusion` 5.60, left cart 4.90, both `ok: true`,
  `mirrored: false`. Adding the new def had zero effect on either regression
  path.
- **GEOMETRY verdict: CONDITIONAL PASS.** A real improvement over the first
  right prototype on both axes that matter most (ratio 0.620 vs 0.844,
  bleed 0.19px vs 20.67px) and lands just above the 0.5–0.6 target band —
  but it does so partly by trading away road-intrusion headroom (2.4%
  margin vs. the current master's 30%), which the brief's own success
  criteria call out as the thing that should NOT get worse. Not a clean
  pass on the full criteria set.
- **ART QUALITY verdict: not production-ready**, separate from geometry —
  steep beauty-shot isometric camera and saturated palette, both explicitly
  against Part 3's required style, though not disqualifying at gameplay
  scale.
- **Rule NOT frozen.** The 0.5–0.6 road-parallel target is now supported by
  one strong data point (Session 54's left prototype, 0.516, comfortable
  intrusion headroom) and two weaker right-edge data points (0.844 and now
  0.620, both authored independently and both landing outside or at the
  edge of the target with real tradeoffs). Two-for-two right-edge sources
  missing the target — one high, one at the boundary with a cost elsewhere —
  is a pattern, not noise; recommend the next right-edge test deliberately
  target the LOW end of the band (~0.5) with an explicit ask to keep the
  service-counter overhang shallow relative to the wheelbase, not just the
  overall silhouette narrow, before freezing anything asymmetric between
  left and right.
- **Files:** `game.js` (1 new `EDGE_PROP_DEFS` entry only — no `CONFIG`
  changes, no new `edgePropInstances()` branch, nothing else touched),
  `assets/props/session55_vadapav_cart_vertical_right_test_v2.png` (new,
  test-only), `CHANGELOG.md`.
- **Validation:** `node --check game.js` — pass. `validate_asset_metadata.py`
  — pass (10 records OK, unrelated `session45_export_manifest.json` skip
  pre-existing). `validate_asset_names.py` — WARN only (test filenames don't
  match the strict production pattern, by design; exits 0). `git diff
  --check` — clean.
- **Untouched, confirmed by inspection:** road-intrusion limit, safety
  buffer, segment-composer budgets, `edgeAdmits()`, production priority,
  deterministic seed logic, Class-C no-mirroring rule (`mirrored: false`),
  current production `EDGE_PROP_DEFS` geometry, the Session 54 test defs and
  harness, frozen Art/Prompt Bibles, City Kits. Did not touch the concurrent
  uncommitted working-tree changes to `ART_BIBLE.md`, `CITY_KITS.md`,
  `PROCEDURAL_PLACEMENT.md`, `PROMPT_BIBLE.md`,
  `tools/validate_asset_names.py`, or the untracked
  `PRODUCTION_ASSET_BRIEFS.md` / `session45_export_manifest.json` — left
  exactly as found.
- **Open items:** road-intrusion headroom on this prototype is thin enough
  that any future re-measurement (different threshold, different scale)
  could tip it over 8px — worth a second look before this asset is used for
  anything beyond A/B comparison. Neither right-edge prototype is ready to
  replace V002. The style/camera mismatch means even a geometrically ideal
  version of this specific source would still need a style-correction pass
  (the Sessions 48/49 pipeline) before production consideration.

## 2026-08-09 — Session 54: roadside edge-asset geometry runtime pilot — CONDITIONAL PASS
Renumbered from the brief's "Session 53" — that number was already committed
(2026-08-08, edge-prop bleed cut) before this session started; using 54 here
to avoid two different sessions sharing one changelog number.

Controlled geometry experiment only, per the brief: tests whether vertically-
authored, road-parallel, shallow-depth cart geometry reads better than the
current broad fixed-canopy carts — **not** production-art approval, **not**
a broader rollout. Two PM-supplied PNGs
(`~/Documents/Working images/1_hawker_vadapav_cart_clean_transparent.png`,
`1_vadapav_open_cart_right_clean_transparent.png`) were copied into the repo
as `assets/props/session54_vadapav_cart_vertical_{left,right}_test.png` — the
PM's source files were never touched.
- **Both sources needed cleanup despite the "clean_transparent" filename:**
  each was a fully opaque illustration (baked vignette / flat-green
  background) inside only a ~31-35px transparent export-padding ring, not an
  actual cutout — confirmed by sampling alpha just inside that ring (0) vs.
  the interior (255, uniformly). Removed on the repo test copy only: GrabCut
  for the hawker cart (floating-range flood fill leaked through look-alike
  hues in a couple of interior props); a border-connected chroma-key for the
  open cart (its background is flat green, but the same floating-range leak
  problem ruled out plain flood fill there too). A faint baked ambient-shadow
  halo remains on both after cleanup — left deliberately rather than risk
  eating real edges; flagged under Art Quality below, not hidden.
- **Handedness determined from structure, not filename** (brief explicitly
  required this): hawker cart's service/counter side sits toward the high-x
  side of its own canvas with wheels/storage low-x, matching the validated
  left master's pattern → classified LEFT. Open cart's support-pole + hanging
  bucket asymmetry sits high-x (depth/storage side), matching the right-
  master convention, and agrees with its filename → classified RIGHT.
- **New EDGE_PROP_DEFS entries** `mumbai_vadapav_cart_vertical_{left,right}_test`,
  bounds measured the same way as the production defs (alpha≥32 bbox;
  footprint = the near-side ground-contact band from a per-column bottom-
  opaque-pixel scan — a fixed bottom-N% slice clips the nearest wheel on
  these diagonal-perspective sources, unlike the flatter production masters).
  `heightPx: 70`, matching production exactly, for an apples-to-apples A/B.
- **New harness**, additive only: `CONFIG.edgeProps.test54` (`on: false` by
  default, `mode: "A"|"B"|"C"`) plus one new branch at the top of
  `edgePropInstances()`, checked before `testC`. No existing branch touched.
  Instances still flow through the unmodified `productionClaims()` →
  `edgeAdmits()` → `addClaim()` path — verified live: a procedural stall and
  a procedural plant were both correctly rejected (`overlap:` reason) against
  the new claims, same as any registered production prop. No bypass.
- **Bug found and fixed (in scope per the brief's "unless a real bug is
  discovered" carve-out):** `segCompositionSig()` hashed each claim as
  `edge + y0 + y1` only, never the claim's own id. Every registered edge prop
  now shares `heightPx: 70` (Session 52), so two *different* asset keys
  placed at the same world y hash identically — reproduced live: toggling
  `cfg.testC → cfg.test54` with no page reload left `__mr.edgeComposer`
  reporting the OLD production cart ids under the new config, a stale cached
  tile silently surviving a real composition change. This is the exact
  live-toggle workflow Session 53 used for screenshot verification, so it
  was a real risk to future sessions' cache trust, not just this one. Fix:
  fold `c.id` into the signature string. One line; re-verified the toggle
  now rebuilds correctly and re-ran the full validation set clean.
- **Geometry results** (heightPx 70, matching current production masters):
  | | left prototype | right prototype | current left cart | current right cart |
  |---|---|---|---|---|
  | visible w:h ratio | 0.516 | 0.844 | 1.164 | 1.158 |
  | on-screen width | 36.1px | 59.1px | 81.5px | 81.1px |
  | road intrusion | 1.43px | 3.02px | 4.90px | 5.60px |
  | city-side bleed | 0px | 20.7px | 41.2px | 40.1px |
  (`intrusionAllow` stays 8px, unchanged — both prototypes pass comfortably.)
  The left/hawker prototype lands almost exactly on the ~0.5 ratio target and
  reads as genuinely parked along the road with zero bleed. The right/open
  prototype is a smaller, boxier cart, not strongly vertical — a real but
  modest improvement, not a vindication of the vertical-authoring hypothesis
  on its own.
- **Tests 54A/54B/54C** (each vs. its current-production equivalent, same
  camera position, screenshots read at each step): 54A (left alone) — clear
  win, cart sits tight to the edge vs. the current left master's visible
  canopy/wheel reach into the lane. 54B (right alone) — modest win, still
  visibly bulkier than 54A, meaningfully narrower than the current right
  master but not dramatically so. 54C (opposing) — playable-road centre
  reads calmer with both prototypes than with both current masters at the
  same spot; no tunnel/gateway effect either way.
- **Gameplay check** (day zone 1, night zone 4): player and the courier's
  own sprite stay clearly readable against both prototypes at typical
  play distance; zero console errors/exceptions across every run. Not a
  full Gate-1 campaign — a readability check, per the brief's scope.
- **Regression** (fresh page load, `test54` untouched): Session 50 Test B
  (right fixed-canopy + right chai counter) and Session 51 Test C (left +
  right fixed-canopy) reproduce their exact prior numbers
  (`roadIntrusion` 5.60/4.90, both `ok: true`, `mirrored: false`) — Session
  54 has zero effect on production behaviour when its flag is off, which is
  always the default.
- **GEOMETRY verdict: CONDITIONAL PASS.** The road-parallel vertical
  direction is a real improvement, dramatically so for one of the two test
  assets — but only one of the two assets actually embodies it (0.52 vs.
  0.84 ratio); the rule is not yet validated evenly enough to freeze.
- **ART QUALITY verdict: not production-ready, separate from geometry.**
  Neither source arrived actually pre-cut; a residual shadow halo remains
  post-cleanup on both; the hawker cart's raking top-down single-cart camera
  angle doesn't match this game's flatter production look or its own
  opposing prototype; neither has been through the Sessions 48/49 style-
  correction pipeline the production masters have.
- **Rule NOT frozen.** Recommend the vertical/shallow-depth direction as the
  preferred brief for future roadside prop authoring, informed by the left
  prototype's result, but freezing needs one more data point: a properly
  cleaned, style-pipeline-corrected asset in this geometry, in a camera angle
  compatible with the existing carts.
- **Files:** `game.js` (2 new `EDGE_PROP_DEFS` entries, `CONFIG.edgeProps.test54`,
  1 new `edgePropInstances()` branch, `segCompositionSig()` bug fix — all else
  untouched), `assets/props/session54_vadapav_cart_vertical_{left,right}_test.png`
  (new, test-only), `CHANGELOG.md`. Left the harness and test assets in the
  repo, default off, matching how `testB`/`testC`/`testKey` already persist as
  reusable harnesses rather than throwaway code.
- **Validation:** `node --check game.js` — pass. `validate_asset_metadata.py`
  — pass (10 records OK, unrelated `session45_export_manifest.json` skip
  pre-existing). `validate_asset_names.py` — WARN only (test filenames don't
  match the strict production pattern, by design; exits 0). `git diff --check`
  — clean. Zero console errors/exceptions across every run above.
- **Untouched, confirmed by inspection:** road-intrusion limit, safety
  buffer, segment-composer budgets, `edgeAdmits()`, production priority,
  deterministic seed logic, Class-C no-mirroring rule (both prototypes
  `mirrored: false`), current production `EDGE_PROP_DEFS` geometry, frozen
  Art/Prompt Bibles, City Kits. Did not touch the concurrent uncommitted
  working-tree changes to `ART_BIBLE.md`, `CITY_KITS.md`,
  `PROCEDURAL_PLACEMENT.md`, `PROMPT_BIBLE.md`, `tools/validate_asset_names.py`,
  or the untracked `PRODUCTION_ASSET_BRIEFS.md` / `session45_export_manifest.json`
  — left exactly as found for whoever is mid-edit on them.
- **Open items:** neither prototype is ready to replace a production master
  as-is; a same-style-pipeline pass on a vertically-authored asset is the
  natural next test before freezing the rule.

## 2026-08-08 — Session 53: PM feedback on Session 52 screenshots — edge-prop bleed cut from ~58% to ~49%
Direct PM reaction to the Gate-1 screenshots: the cart art reads as cut in
half at the canvas edge, not an intentional treatment. Confirmed the math —
at `heightPx: 88` the right cart's visual silhouette bled ~58% of its own
width past the canvas edge (part of the physical footprint, not just
decorative canopy overhang). Not a new defect: flagged as an open item after
Session 51 ("author edge masters narrower or accept it as a known
constant") and never resolved.
- **Why pure scaling can't hit an arbitrary bleed target:** the pivot anchors
  at a fixed x (the road margin + safety buffer), and the whole sprite scales
  uniformly around it — so shrinking bleed % necessarily shrinks on-screen
  height too, they're the same lever. Ran the frontier for the PM: hitting his
  initial 25–30% ask meant `heightPx` dropping to ~48, which puts the cart
  *below* the courier's own 70px height — breaking the Technical Asset
  Contract §4 hero-scale "landmark" rule (tall props should read as
  bigger-than-player, not smaller). PM chose the courier-height floor instead
  once shown the numbers.
- **Change:** `heightPx` dropped from 88→70 (both vada-pav cart masters,
  left `_v003` and right `_v002`) and 80→70 (chai counter) — the largest
  reduction that keeps every registered edge prop at-or-above player height.
  Cuts bleed from ~58%→~49% (right cart), ~59%→~51% (left cart),
  ~49%→~43% (chai counter). Verified via `__mr.edgeProps.placements`:
  `footprintClear`/`intrusionOk`/`ok` still `true` for all three post-change;
  `mirrored: false` unchanged (no mirroring introduced).
- **One consequential fix, not scope creep:** the `testB` harness had a
  hardcoded `gap = 161` (`= max(cart, chai) recSpacing` at the OLD
  heightPx values) spacing the chai counter above the cart. Left as a magic
  number it would have gone stale at the new scale and silently produced the
  wrong gap. Replaced with `Math.max(edgePlacement(...).recSpacing, ...)`
  computed live from both defs' current placement — correct at any future
  `heightPx`, not just today's. Re-verified via `__mr.edgeComposer`: chai
  claim `y1=3739.3`, cart claim `y0=3867`, gap 127.7 = the new (larger, since
  both props are now smaller) computed `recSpacing` max — no overlap.
- **No other tuning touched:** edge budgets, spacing multipliers/thresholds
  themselves (only their scale-dependent output), road-intrusion allowance,
  pivots, orientation/mirroring rules, cache semantics all unchanged.
- **Re-verified day + night, `testB` (default) and `testC` (temporarily
  flipped live for screenshot verification, reverted after — no code change
  from the flag itself):** visually smaller, noticeably more of each prop
  on-screen, player now reads taller than every registered edge prop, zero
  console errors, geometry checks unchanged (`ok: true` across the board).
- **Files:** `game.js` (3 `heightPx` values + their comments, 1 hardcoded
  spacing constant replaced with a live computation), `sw.js` (cache
  `v28`→`v29`, player-visible change), `CHANGELOG.md`, `ROADMAP.md`.

## 2026-08-07 — Session 52: Production-Integration Gate 1 — gameplay playtest, PASS
Objective was a gameplay-readability gate for the Sessions 46–51 environmental-
prop pipeline, not another placement-engine test: does the validated Mumbai
vada-pav cart (right v002 + left v003) and chai counter (right v001) stay
visually subordinate during actual simulated play, not just in static
screenshots? No redesign was in scope unless play exposed a real failure —
none did, so **zero `game.js` changes this session** (confirmed: `git diff --
game.js` empty throughout).
- **Method:** browser extension bridge was unavailable this session, so drove
  a real (non-virtual-time) headless Chrome over raw CDP — `__mr.tick(1/60)`
  in batches + `requestAnimationFrame` awaits per the verification doc's
  fallback recipe, with `player.x`/`player.y` set directly (a live object
  reference via `__mr.player`) for deterministic positioning next to each
  prop, plus held-key runs for organic movement/combat. `__mr.player.maxHp =
  __mr.player.hp = 99` for survivability. Traversed Mumbai zone 1 (day) and
  zone 4 (night, `nightZones`) at the shipped default (`testB`: right cart +
  chai) and, temporarily via `__mr.config.edgeProps.testC = true` (reverted
  after — a live-only flag flip, no code change), the opposing-edge left+right
  cart configuration Session 51 validated technically but never exercised in
  live movement/combat.
- **Player/enemy/attack readability:** PASS in every scenario. The courier's
  bright orange sprite and the grey/blue "Bland" enemies stay high-contrast
  against the tan (day) / dark-purple (night) road and against the muted
  green/teal production props; attack VFX (projectile + hit-glow) and food/XP
  pickups read as the brightest, most saturated elements on screen in every
  captured frame, ahead of any environmental prop. Screenshots taken with the
  player standing directly beside the right cart, the chai counter, and (in
  `testC`) the left cart, including mid-combat with a 13–31-enemy cluster
  adjacent to the right cart — no silhouette confusion, no prop reading as
  interactive/reward-like, in any frame.
- **Road-centre clarity:** PASS. With both the left and right cart live
  (`testC`) the centre lane stayed visually calm in a live-movement frame —
  no tunnel/gateway effect, despite the two masters' honest size/proportion
  mismatch (independently-authored sources, not forced symmetry, per Session
  51).
- **Density / repetition — a pilot-configuration finding, not a composer or
  art defect:** `edgePropInstances()` places its production claims at a
  single fixed world-y per level (`baseY`, derived from `startY`), so on a
  4560px / ~800px-per-tile route only **one segment out of ~6** (segment
  idx 4, confirmed via `__mr.edgeComposer`) carries any production prop —
  every other segment on the route is procedural-only. This means the
  props read as a once-per-zone landmark, not continuous scenery (mitigates
  the "does it get exhausting at gameplay speed" concern), but it also means
  this session could not exercise "repeated production placement across many
  segments" as the brief asked — there is currently only one placed instance
  per level to observe. Classification: **(4) current limited pilot
  configuration** (the harness places one test instance, by design — "there
  is no segment composer picking these" per the harness's own header
  comment) — not a composer bug, not evidence the deterministic composition
  is broken, not an asset-variety problem.
- **Session 50 regression (re-verified via `__mr.edgeComposer` mid-play):**
  both right-edge production claims (`mumbai_vadapav_cart_fixed_canopy_right`,
  `mumbai_chai_counter_shallow_awning_right`) present and admitted; procedural
  candidates correctly rejected around them (`overlap:mumbai_chai_counter_
  shallow_awning_right` on a procedural cart, `overlap:mumbai_vadapav_cart_
  fixed_canopy_right` on a procedural crate) — production-to-production and
  production-to-procedural de-confliction both intact.
- **Session 51 regression (re-verified via `__mr.edgeProps.placements` mid-
  play, `testC` on):** left and right cart both `footprintClear: true`,
  `intrusionOk: true`, `ok: true`, `mirrored: false` — genuine independent
  left/right masters, no runtime mirroring, independent budgets, correct
  bounds — simultaneously, under live movement, not just the static test
  harness.
- **Validation:** `node --check game.js` OK · `python3 tools/
  validate_asset_metadata.py` OK (all registered records) · `python3 tools/
  validate_asset_names.py` — pre-existing WARNs only, on legacy assets
  outside this session's scope (`*-day.png`/`*-night.png` backdrops,
  `bland.svg`/`courier.svg`), zero new warnings · `git diff --check` clean ·
  zero console errors across the full day/night/testB/testC session (error
  hook installed mid-session, none observed after).
- **Not changed:** edge budgets, spacing multipliers, pivots, road-intrusion
  limits, orientation/mirroring rules, cache semantics, RNG — gameplay
  evidence never surfaced a problem, so per the session's own critical rule,
  nothing was retuned. `CONFIG.edgeProps.testC` was flipped live only for the
  duration of the in-session test and reverted to its shipped default
  (`false`) before this entry was written.
- **Docs-only:** `docs/art-production/ART_BIBLE.md`, `CITY_KITS.md`,
  `PROCEDURAL_PLACEMENT.md`, `PROMPT_BIBLE.md`, `tools/validate_asset_names.py`,
  and `assets/metadata/session45_export_manifest.json` /
  `docs/art-production/PRODUCTION_ASSET_BRIEFS.md` were already modified/
  untracked in the working tree at session start (Codex's concurrent art-
  production lane) — left untouched, not swept into this session's commit.
- **Decision — GATE 1: PASS.** The Mumbai environmental-prop production and
  integration pilot is validated for controlled broader rollout. This is not
  authorization for mass Mumbai generation or the Jaisalmer rollout — see
  ROADMAP for the actual next gate (PM visual sign-off on the `testC` left
  master, then the fresh-player fun/retention Gate-1, which this session does
  not address).
- **Files:** `CHANGELOG.md`, `ROADMAP.md` only.

## 2026-08-07 — Session 51 continued: new left source unblocks Test C, two latent engine bugs fixed
The Session 51 blocker below (wrong-handedness left master) is resolved. PM
supplied a freshly generated render with the correct opposite handedness
(`ChatGPT Image Aug 7, 2026, 08_56_59 PM.png`) — confirmed by visual
inspection: display case on the high-x side of its own canvas, gas cylinder +
handle on the low-x side, the mirror of the right master, matching the
correctly-authored umbrella-cart left/right pair. Processed and registered as
`mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v003.png` (v001/v002
kept, unmodified, as the rejected-orientation record).
- **Processing (measured, not copied from the other masters' params — this
  source responds differently):** cropped to alpha-bbox + 48px padding
  (729×640 canvas); alpha-cleaned (dust 2,005→1,108, no baked shadow found);
  found and fixed a hygiene defect unique to this source — fully-transparent
  pixels carried a baked olive-tinted RGB instead of neutral `(0,0,0,0)` like
  every other production PNG in the family, a real risk of a colour-fringe
  when the browser downsamples the sprite (~7x scale-down at `heightPx: 88`);
  style-corrected lightly (saturation ×0.73, contrast ×0.92 — this source was
  already close to the family's flattened target, so the aggressive
  mean-shift pass the other two masters needed was deliberately skipped to
  avoid over-flattening below the family norm). Geometry measured directly
  (not proportionally copied): footprint `(146,498)-(642,591)` converged from
  two independent methods (alpha-column scan at y=480/500, and the right
  master's 82.9%-down-visual-height convention) landing on the same numbers.
- **Two engine bugs found and fixed** — both invisible until this session
  because every previously-registered production prop was `edge:"right"`:
  1. `edgePlacement()`'s `roadIntrusion`/`intr` calculation used
     `visualBounds.x0` unconditionally; correct only for a right-edge prop.
     Fixed to use the edge-conditional road-facing side (`x0` for right,
     `x1` for left), matching the already-edge-aware `roadFacingX` a few
     lines below it.
  2. Deeper bug: `sx()` (the source-px → design-px mapping every bound is
     built from) multiplied by a `dir` term that reverses x-order for
     `edge:"left"`, but `drawEdgeProps()`'s actual `ctx.drawImage()` call
     never mirrors the sprite (positive width, plain translate, by explicit
     design — runtime mirroring is prohibited). Every left-edge bound was
     being computed as though the sprite were drawn mirrored when it never
     is. First symptom: `footprintClear` failed by ~77px even though the
     drawn sprite was correctly oriented on screen. Fixed by removing the
     `dir` multiplier from `sx()` so the math matches the always-order-
     preserving draw. Verified byte-identical right-master output
     before/after (dir=+1 made the multiplier a no-op there — zero
     regression risk for the shipped right-edge props).
- **Test A (standalone left, new `testKey` value):** `footprintClear: true`,
  `intrusionOk: true` (roadIntrusion 6.16/8px), correct visual orientation
  confirmed by screenshot (service/display renders toward the road edge,
  handle/cylinder correctly bleed off-canvas toward the city), composer claim
  de-conflicts left-edge procedural candidates (`overlap:mumbai_vadapav_cart_
  fixed_canopy_left` reject observed), day and night both clean, zero console
  errors, two fresh loads byte-identical.
- **Test C (opposing edges, new `CONFIG.edgeProps.testC` flag, default
  `false`):** left (6.16px) and right (7.04px) both `ok: true` simultaneously;
  independent edge budgets confirmed (left `a2/3 e4/6 w9/13 o30%`, right
  `a2/3 e4/6 w9/13 o30.1%`, separate claim/reject lists, zero cross-edge
  leakage); road-centre stays clear with no tunnel/gateway effect (the two
  carts sit at slightly different heights with different proportions — an
  honest artifact of two independently-authored source images, not forced
  symmetry); day and night both clean, zero console errors; two fresh loads
  plus a simulated camera walk byte-identical; `segCompositionSig()` correctly
  differentiates single-key / Test B / Test C configurations and reproduces
  the original composition on revert.
- **Session 50 regression:** re-verified — right-edge Test B (chai counter +
  vada-pav cart) unaffected, both claims still admitted through `edgeAdmits()`.
- **Not flipped live by default:** `CONFIG.edgeProps.testC` stays `false` and
  the new metadata record stays `status: "review"` (not `"approved"`) —
  the art itself hasn't had a PM sign-off pass yet, same gate Session 48/50
  used for the right master before Session 50 flipped it live.
- **Files:** `game.js` (2 bug fixes + new `EDGE_PROP_DEFS` entry + `testC`
  harness), `assets/props/mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_
  1x_v003.png` (new), its metadata (new), `mumbai_prop_vadapav_cart_fixed_
  canopy_left_neutral_1x_v002.json` (traceability tag only).

## 2026-08-07 — Session 51: fixed-canopy left master fails orientation validation — Test C blocked
Objective was opposing-edge Test C (corrected fixed-canopy cart on both the left
and right edges of the same segment). Part 1 (inspect the left master before
touching anything) found the asset is not usable as-is, so the session stopped
there — no game.js changes, no EDGE_PROP_DEFS entry, no Test C.
- **Finding:** `mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v002.png`
  (Session 48's style-corrected v002, style-only — geometry inherited from
  v001) has the WRONG handedness for a left-edge master. Its service/display
  counter sits on the low-x side of its own canvas and its storage/handle/gas
  cylinder sits on the high-x side — the SAME layout as the right master,
  not the mirror-opposite the engine expects (`edgePlacement()` in game.js
  defines `roadFacingX` as `visualBounds.x0` for a right master and
  `visualBounds.x1` for a left one). Drawn unmirrored (mirroring is
  prohibited by design), it would present its handle/storage side toward the
  playable road and its display/service side toward the city — backwards.
- **Not a runtime-mirror artifact:** alpha-bbox measurement shows this
  binary's silhouette (675×611) is a different size/proportion than the right
  master's (723×625), so it's an independently rendered image, not a flipped
  copy of the right PNG — ruling out the "casual mirror" failure mode the
  brief asked to check for. The defect is that whoever sourced it drew the
  same camera-left viewpoint twice instead of a true opposite angle.
- **Confirms a pre-existing flag:** `session45_export_manifest.json` already
  carried `temporary_orientation_note: "orientation refinement may be
  required during runtime testing"` for this file only (not the right
  master) — Session 51 resolved that open flag, and the answer is negative.
- **What a correct pair looks like:** the umbrella-cart family in the same
  brief (`mumbai_prop_vadapav_cart_umbrella_open_cart_{left,right}`) *does*
  have opposite handedness between its left and right masters (display case,
  gas cylinder and handle all flip sides) — proof this is achievable and that
  the fixed-canopy left binary is the outlier, not an engine limitation.
- **Metadata:** `mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v002.json`
  notes extended with the full finding and evidence; tags gained
  `orientation_invalid_wrong_handedness` / `blocked_not_wired_to_edge_prop_defs`.
  `status` stays `draft` — this is an open blocker, not archived history.
  v001 left unmodified (traceability; carries the same defect, inherited by
  v002 since Session 48 only touched alpha/style, never crop or composition).
- **Next step (not this session):** a genuinely opposite-handedness left
  fixed-canopy source needs to be sourced/generated — style correction and
  measurement can't fix a mirrored-composition problem. Right-edge Test B
  (chai counter + vada-pav cart) is untouched and still the validated
  same-edge reference; Test C stays blocked until a real left master exists.
- **Scope held:** no game.js changes, no new PNG, no EDGE_PROP_DEFS entry, no
  budget/spacing changes, no Test A/Test C run (nothing to test).

## 2026-08-07 — Session 50 follow-up: production-to-production claims now actually de-conflicted
The prior Session 50 entry below shipped Test B with production claims added
to the edge state unconditionally — spacing was hand-computed (161px) and
trusted, "by design," never verified by the composer itself. This closes that
gap: `drawCorridorSegment()` now runs every production claim through the same
`edgeAdmits()` overlap+budget gate procedural candidates use, in claim order
(cart, then chai), before `addClaim()` accepts it. A production claim that
overlapped another prop or blew the budget would now be rejected and recorded
in `rejects`, same as any procedural reject — this was previously impossible
to detect except by eyeballing a screenshot.
- **`__mr.edgeComposer`** claim diagnostics gained `weight`/`anchor` fields.
- **Runtime-validated:** both claims admitted, zero overlap, 161px measured
  gap vs 160.5px required (cart's own `recSpacing`, the binding constraint),
  budget at 12/13 weight and 40%/45% occupancy on the pair's segment. Two
  fresh page loads and a camera move produced byte-identical
  `__mr.edgeComposer` output. Live-flipping `testB` off/on produced a
  genuinely different (1-claim vs 2-claim) cached composition and then
  reproduced the original exactly — confirms `segCompositionSig()` keys the
  tile cache on the real claim set, not just the config flag. Day (Z1) and
  night (Z4) both pass, zero console errors, procedural rejects correctly
  attributed to each production claim by id (`overlap:mumbai_vadapav_cart_…`,
  `overlap:mumbai_chai_counter_…`).
- **Scope:** `game.js` only — no new assets, no budget/spacing constant
  changes, no left-edge/Test C work.

## 2026-08-07 — Session 50: PM sign-off on style correction + Test B (mixed placement) live by default
The Session 48/49 open question — "is the deterministic style-correction pass
good enough to proceed?" — is resolved. PM reviewed a before/after (raw AI
render vs. corrected) and an honest-gap comparison (corrected chai counter
next to the game's actual native art) and approved: revamp is coming for the
whole game's art direction eventually anyway, so further polishing these two
edge props now isn't the priority — move to testing the mixed placement.
- **Metadata:** `mumbai_prop_vadapav_cart_fixed_canopy_right_neutral_1x_v002.json`
  and `mumbai_prop_chai_counter_shallow_awning_right_neutral_1x_v001.json`
  both flipped `status: review` → `approved`. Night-palette call (open since
  Session 48) resolved: no glow/wash clash.
- **Test B implemented** (`edgePropInstances()` in `game.js`): the single-asset
  test harness gained `CONFIG.edgeProps.testB` (new default: `true`) that draws
  BOTH registered right-edge props at once instead of one behind `testKey`.
  Positions are hand-spaced (the composer does not cross-check production
  claims against each other, by design — `productionClaims()`/`addClaim()`
  add them directly) using a 161 design-px gap, the larger of the two defs'
  own `recSpacing` values. `testKey` stays available as a fallback for a
  narrower single-asset check.
- **Runtime-validated (raw CDP):** day (Z1) and Mumbai night (Z4), zero
  console errors/exceptions in both. Composer confirms both production claims
  register on segment 4's right edge with **zero overlap** — cart
  `y0:3849,y1:3937`, chai `y0:3608,y1:3688`, a clean 161px gap between them,
  matching the hand-computed spacing exactly. Deterministic across two fresh
  runs. A combined proof screenshot (courier nudged further up the route so
  both fall in the same camera window) confirms visually: no clipping into
  each other, correct road-safe footprint for both, road stays fully open
  between them, same result at night with no lighting clash.
- **Why this default flipped (not just a config toggle for me to test):** the
  PM asked to see it live without a console command — `testB: true` is now
  the shipped default, so it's visible on a plain page load / GitHub Pages,
  same as any other player-facing change.
- **Scope:** no left chai-counter master (still doesn't exist), no opposing-
  edge Test C, no changes to player/enemy/camera/road, no edge-budget changes.

## 2026-08-07 — Session 49: Mumbai chai-counter right master, extracted + corrected + runtime-validated standalone
New environmental prop family (separate from vada-pav): a teal shallow-awning
chai counter, right-edge master only. Full pipeline in one session — extraction,
Session-48-style correction, metadata, `EDGE_PROP_DEFS` registration, standalone
day+night runtime Test A, composer de-confliction check. **No Test B** (mixed
placement with the vada-pav cart) — explicitly out of scope, left for a PM call.
- **Source:** a two-counter composite delivered by the PM (`chai_counter_composite.png`,
  1536x1024 RGBA), kept outside the repo (`~/Documents/Working images/`) — not
  committed as a runtime asset. Only the **right** (teal) counter was used; the
  left reddish counter was not extracted and has no asset in this repo.
- **Extraction:** the two counters were cleanly separable by connected-component
  analysis on the composite's alpha channel — left component bbox x[70,750],
  right (used) component bbox x[812,1445], a 62px fully-transparent gap between
  them, **zero pixel overlap/contamination**. Isolated the right component,
  discarding 3,836 stray dust px that belonged to neither counter.
- **Same deterministic pipeline as Session 48** (scipy/opencv/PIL): Gaussian-
  smoothed alpha (σ=1.5) → alpha≥200 core → 4px Euclidean dilation → zero
  everything else. Removed a baked ground-contact shadow (soft low-alpha band,
  mean alpha 22–125 tapering to 0 over ~16 rows, near-black RGB — same defect
  family as all four vada-pav masters) and cut sub-alpha-8 dust from 942→347,
  with the survivors confirmed contiguous AA fringe on a single connected
  component (0 disconnected/stray, both before and after). Style: `cv2.pyrMeanShiftFiltering`
  (sp=18, sr=45) + light bilateral + PIL contrast ×0.78 / saturation ×0.75 /
  brightness ×1.06 — identical parameters to the vada-pav family, no retuning
  needed. Measured (within the silhouette mask): texture (Laplacian std)
  83.2→48.4 (−42%), contrast (greyscale std) 54.4→40.8 (−25%), saturation (mean
  HSV S) 69.2→41.4 (−40%). Geometry bit-identical before/after the style pass.
- **New production asset:** `mumbai_prop_chai_counter_shallow_awning_right_neutral_1x_v001.png`
  (699×709, genuine RGBA, verified transparent corners) + metadata JSON,
  `status: review`. Filename and metadata both pass `tools/validate_asset_names.py`
  / `validate_asset_metadata.py`.
- **Orientation verified, not assumed:** kettle spout points left toward the
  jars/tins (service side), the counter box recedes/narrows to the right
  (structural depth), side cloth and storage box sit left-of-centre — matches
  the required right-edge convention with **no mirroring**. No ambiguity found;
  nothing was silently flipped.
- **Own measured geometry**, not copied from the vada-pav def: `visualBounds
  {48,48}-{650,658}`, `footprint {83,580}-{606,658}`, `pivot {83,658}`,
  `heightPx: 80` (below the vada-pav cart's 88, per the brief's "visually
  quieter than, or at most comparable to" requirement). **Honest flag:** footprint.x0
  (83) is a deliberately conservative measurement — the front-left foot and the
  side cloth's lower drape sit within ~15px of each other and could not be
  cleanly separated by alpha alone; the more-left (more-clearance-required)
  value was kept rather than guessed tighter.
- **Runtime registration reuses the existing single mechanism**, no parallel
  system: added the new entry to `EDGE_PROP_DEFS`, and generalized
  `edgePropInstances()` behind a new `CONFIG.edgeProps.testKey` (default
  unchanged — still the vada-pav cart) so a second registered prop can be
  exercised standalone via `__mr.config.edgeProps.testKey` without ever drawing
  two production assets at once. Confirmed by regression check: an untouched
  page load still places exactly the vada-pav cart, byte-identical envelope to
  the already-shipped result (`roadIntrusion 7.04/8`, `ok:true`).
- **Runtime validation (raw CDP, playwright-core unavailable here):** day (Z1)
  and Mumbai night (Z4) both load with **zero console errors/exceptions**.
  Placement envelope: `mirrored:false`, `footprintClear:true`, `intrusionOk:true`,
  road intrusion **4.59/8px**, `scale:0.13115`, `loaded:true`. Composer
  (`__mr.edgeComposer`) confirms the production claim registers on segment 4's
  right edge (`y0:3857, y1:3937`) and correctly **rejects an overlapping
  procedural "plant" candidate** (`why:"overlap:mumbai_chai_counter_shallow_awning_right"`)
  while leaving non-conflicting procedural elements (crate/cart/pot/stall) on
  the same edge untouched — the Session 47 de-confliction mechanism working
  against a second registered asset. Determinism re-verified: two independent
  fresh page loads produced byte-identical claim ordering. `debug` stays
  `false` by default; no `Math.random()` was added anywhere in this change.
  Night: bulb reads as a small warm dot, no baked glow/halo, teal body stays
  visible against the dark palette, road centre stays dominant.
- **vs. the corrected vada-pav cart (reference only, not a mixed test):**
  smaller (heightPx 80 vs 88), similarly flattened texture/contrast/saturation
  from the shared pipeline, reads as comparably "quiet" — screenshots taken
  standalone at the same route position for visual comparison, never placed in
  the same composer segment.
- **Scope held:** no left chai-counter master, no Test B (mixed same-edge), no
  Test C (opposing edge), vada-pav cart v002 and its metadata untouched, no
  player/enemy/camera/road changes, no edge-budget changes, Art/Prompt Bibles
  and City Kits untouched, no broader Mumbai asset generation. Pre-existing
  uncommitted Codex-lane changes (`ART_BIBLE.md`, `CITY_KITS.md`,
  `PROCEDURAL_PLACEMENT.md`, `PROMPT_BIBLE.md`, `tools/validate_asset_names.py`,
  `session45_export_manifest.json`, `PRODUCTION_ASSET_BRIEFS.md`) were left
  exactly as found — none of it staged or committed here.
- **Not done (deliberately, per brief):** no Test B, no left master, no PM
  approval yet — `status: review`, same as the vada-pav family.

## 2026-08-07 — Session 48 follow-up 2: same style-correction pipeline applied to both umbrella carts
Third and fourth of the four vada-pav masters corrected — all four now share
the same treatment. Correction-only, no runtime integration (same reasoning
as the fixed-canopy left master).
- **New assets:** `mumbai_prop_vadapav_cart_umbrella_open_cart_{left,right}_neutral_1x_v002.png`
  (+ metadata). v001s kept, `status: deprecated`, `superseded_by_v002`.
- **Same defect family confirmed:** baked ground-contact shadow on both
  (alpha-channel inspection) + dust (left 3,910 sub-8 px, right 3,384).
  Painterly rendering was, if anything, more extreme here — the striped
  umbrella canopy was the single most saturated element in the whole
  vada-pav family.
- **Same pipeline, same parameters** as the fixed-canopy corrections
  (Gaussian-smoothed alpha≥200 core + 4px Euclidean dilation for cleanup;
  `cv2.pyrMeanShiftFiltering` sp=18/sr=45 + light bilateral + contrast ×0.78
  / saturation ×0.75 / brightness ×1.06 for style). No per-asset retuning
  needed — both responded well at the same settings.
- **Measured:** left — texture 72.4→55.7, contrast 64.8→49.4, saturation
  152→97. Right — texture 72.1→55.7, contrast 64.1→48.6, saturation 153→99.
  Largest saturation drop of the four assets, as expected from the umbrella.
- **Bbox:** both tightened ~3px at the bottom only (shadow blend zone) —
  wheels/spokes/umbrella ribs/gas cylinder all confirmed intact visually.
  Smaller shift than the fixed-canopy left master (13px) — these two had a
  cleaner shadow/object boundary.
- **Not done (same as the fixed-canopy left master):** no placement/pivot
  measurement, no `EDGE_PROP_DEFS` entry, no runtime test, `game.js`
  untouched. All four vada-pav masters are now style-corrected; none except
  the fixed-canopy right master has been placement-tested.

## 2026-08-07 — Session 48 follow-up: same style-correction pipeline applied to fixed-canopy LEFT master
Same treatment as the right master, on request, kept narrow: pixel correction
only, no runtime integration.
- **New asset:** `mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v002.png`
  (+ metadata). v001 kept, `status: deprecated`, `superseded_by_v002`.
- **Same defects confirmed:** 10,482 sub-alpha-8 dust pixels + a baked
  ground-contact shadow (alpha-channel inspection), same painterly/high-contrast
  rendering as the right master.
- **One pipeline refinement, applied here and regression-checked against the
  right master:** this binary's raw alpha channel is noticeably grainier
  (±10-20 between neighbouring pixels mid-gradient), so a hard `alpha>=200`
  threshold produced a jagged silhouette edge. Fix: Gaussian-smooth alpha
  (σ=1.5) before the threshold decision, then an isotropic (Euclidean, not
  diamond) 4px dilation — kept alpha *values* for surviving pixels unchanged,
  only cleaned up which pixels survive. Re-ran the right master through the
  same smoothed path first: bbox and dust count reproduced its already-shipped
  result, so this is a strict improvement, not a behaviour change for v001→v002
  (right).
- **Bbox note:** left master's alpha>=32 bbox shrank ~13px at the bottom
  (`(219,460)-(894,1071)` → `(219,460)-(894,1058)`) because its baked shadow
  blends continuously into the wheel's own contact shadow with no clean
  boundary — confirmed visually that the removed region is shadow gradient,
  not cart structure (wheel/tire/rim/casters all intact). Harmless here: this
  master was never measured or wired into `EDGE_PROP_DEFS` (dimensions/anchor
  are still the disabled-draft 0/0 sentinel, per its own
  `temporary_orientation_note` — orientation itself is still unverified). Left
  `game.js` untouched.
- **Measured:** Laplacian-std texture 65.2→46.0, contrast std 55.0→40.5, mean
  HSV saturation 125→69 — in line with the right master's correction.
- **Not done (out of scope for "apply the pipeline"):** no placement/pivot
  measurement, no `EDGE_PROP_DEFS` entry, no runtime test — this asset still
  needs its own Session-46-equivalent controlled test before it can be placed.

## 2026-08-07 — Session 48: runtime-style correction pilot, Mumbai vada-pav cart (fixed-canopy right)
The Session 46/47 binary was technically integrated (Test A passed, composer
de-conflicts a procedural plant) but too painterly/high-contrast for the flat
retro game. Corrected it deterministically rather than re-generating.
- **New production asset:** `mumbai_prop_vadapav_cart_fixed_canopy_right_neutral_1x_v002.png`
  (+ metadata JSON). v001 kept on disk and in metadata, `status: deprecated`,
  tagged `superseded_by_v002`, for traceability — nothing was overwritten.
  `game.js` `EDGE_PROP_DEFS` now points `src` at v002.
- **Pipeline (scipy + opencv + PIL, all local/deterministic, no re-gen):**
  alpha cleanup keeps only the alpha≥200 core plus a 4px dilation (real AA
  fringe) and zeroes everything else — removes the baked ground-contact shadow
  and all 9,534 sub-alpha-8 dust pixels in one pass, confirmed by re-measuring
  (0 stray dust outside the true silhouette afterward). Style: `cv2.pyrMeanShiftFiltering`
  (sp=18, sr=45) flattens painterly gradients into broader colour regions, then
  a light bilateral pass + PIL contrast ×0.78 / saturation ×0.75 / brightness
  ×1.06. Measured: Laplacian-std texture 61.6→46.0, greyscale-contrast std
  57.8→43.7, mean HSV saturation 136→85 (all inside the silhouette mask).
- **Geometry untouched on purpose:** canvas stays 1120×1582, alpha≥32 bbox is
  bit-identical (226,431)-(949,1056) before/after — only alpha and RGB moved,
  never a crop/resize — so none of `EDGE_PROP_DEFS`' measured visualBounds /
  footprint / cropSafe / pivot needed retuning.
- **Runtime re-validation (headless Chrome via raw CDP, `docs/verification.md`
  fallback recipe — playwright-core isn't installed here):** day (Z1) and the
  Mumbai night zone (Z4, `nightZones:[4]`) both load with **zero console
  errors/exceptions**. `__mr.edgeProps` reproduces the pre-recorded envelope
  exactly — `ok:true`, `footprintClear:true`, `intrusionOk:true`, road
  intrusion **7.04/8px**, `scale:0.1408`, `mirrored:false`, `edge:"right"`.
  `__mr.edgeComposer` still rejects the overlapping procedural plant
  (`why:"overlap:mumbai_vadapav_cart_fixed_canopy_right"`) — Session 47's
  de-confliction is unaffected. Night: silhouette stays readable, no glow, no
  baked-lighting clash, doesn't wash into the dark palette.
- **Honest limit:** this is a raster filter pass, not a re-illustration. It
  measurably reduces painterly noise/contrast/saturation but cannot add the
  bold flat cel-shade outline the hand-drawn/procedural props use (see
  `assets/props/mumbai-day.png`) — closing that last gap needs re-authoring,
  not more filtering. Recorded as `status: review` (not `approved`) pending a
  PM call on whether this is enough to proceed.
- **Scope held:** no chai-counter integration, no Test B/C, no other vada-pav
  masters touched, no procedural/road/camera/combat changes.
- **Doc note:** `docs/art-production/PROCEDURAL_PLACEMENT.md` already carries
  an uncommitted, non-contiguous Session 45 scaffold diff (two mid-file hunks,
  no clean append point) — left untouched rather than risk mixing commits;
  this write-up lives here instead.

## 2026-07-11 — THE PIVOT: fixed arena → scrolling corridor street (delivery routes)
The game is now what the name promises: the courier **runs a route**. A zone is a
vertical street ~6 screens long — pickup at the bottom, DELIVERY gate at the top —
with a camera that follows the courier. Backed up first: the complete pre-pivot game
lives on branch **`arena-classic`** (also: `__mr.setCorridor(false)` restores it live).
- **World model:** world-space Y / screen-space X. The corridor is one screen wide, so
  all lane/wall/joystick logic survives untouched; the camera scroll is a single
  `translate(0, -cam.y)` in `draw()`. Everything gates on `CONFIG.corridor.on`.
- **Player-paced waves:** wave gates sit at even DISTANCES up the route (no wave
  timer) — you trigger the next wave by advancing. Mini-boss at gate 5, city/main
  boss guarding the delivery gate. Spawns come from off-screen, 70% from ahead;
  enemies left >1.6 screens behind are re-fielded at a fresh spawn point.
- **Boss duels lock the camera** into a one-screen window — every arena boss behavior
  and its tuning (charge ranges, recovery, food cadence) holds verbatim.
- **Street rendering:** seeded per-segment tiles (W×800) with the existing prop kit,
  deck-shuffled per segment + occasional crosswalks — variety per segment, so no
  visible tiling (the failure that killed the first city-art attempt). Cached, ~2-3
  tiles drawn/frame. Hazards pre-render to sprites and draw as world objects.
- **HUD:** slim green DELIVERY progress bar (with gate tick) under the XP bar.
- **Verified headless in Chrome** (Playwright, portrait 390×844): full route run —
  gates 2→8, mini-boss camera lock/unlock + boon pick, main-boss duel at 99.5%
  progress, kill → auto-advance to zone 2 with a fresh route; death path; live
  arena flip; tile-seam fix confirmed by screenshot. Zero page errors.
- **Known prototype gaps** (accepted, listed for tuning): camping farms XP with no
  time pressure; a pacifist sprint can skip trash waves (bosses still gate); balance
  is untouched arena numbers — the corridor retuning pass is still owed.

## 2026-06-27 — city art SHIPPED: device-agnostic edge-prop strips (`city-art` is now the default)
Replaced the full-bleed background approach with **procedural road + transparent
edge-prop strips**, and flipped `ACTIVE_THEME` to `city-art`. The full-bleed masters
cover-cropped 30–40% of width on tall phones — exactly where all the city detail sat —
so the generated flavor was invisible in play. The new model is resolution-independent.
- **Why the change:** a single fixed-aspect master can't keep props on-screen across
  all device aspects AND keep a top-down game's centre open. Decoupled them: the road
  is procedural (already per-city palettized, day/night via the existing palette), and
  the props are transparent vertical strips the engine pins to the **live** arena edges.
- **Engine** (`game.js`): `city-art` theme gains `edgeProps`; `loadThemeImages` loads
  `assets/props/<city>-<day|night>.png`; new `cityProps()` + `drawCityEdges()` scale a
  strip to a capped edge width (no squish) and **tile it down both edges**, right side
  mirrored + phase-shifted. No crop math, works on any aspect incl. landscape fallback.
- **Crash fix:** `__mr.setTheme("city-art")` / booting on city-art threw at the menu —
  `curCity()` read `.key` of an undefined city when no zone was active. Now defaults to
  `level || 1` (mirrors the procedural branch's `bgImgs[level || 1]`).
- **Pipeline:** new manifest `kind: "prop"` (transparent, trimmed, height-capped) →
  `assets/props/`; the 4 manifest entries retargeted; `import_art.py` gains
  `process_prop` (thresholded-alpha trim so AI halo doesn't widen the bbox; keeps
  transparency); prompts rewritten to transparent single-column strips. Imported all 4.
- **Verified live** across Mumbai/Jaisalmer × day/night and three device aspects
  (0.41 / 0.46 / 0.58): props track the true edges every time, no crop, seamless over
  the procedural road. `sw.js` → `v25`, precaches the 4 strips; raw archives gitignored.
- **Revert** with one line: `ACTIVE_THEME = "retro-day"` (or `"night-v1"`).

## 2026-06-27 — art pipeline: ChatGPT-generated city backgrounds + character sprites
Stood up a manual-generation / automated-ingestion art pipeline so the game can move
off pure procedural art toward Survivors.io-grade flat illustration, **city-flavored**
(Mumbai vs Jaisalmer read distinctly). Manual ChatGPT web generation by hand — no
OpenAI API, no browser automation; scripts only touch local assets.
- **Manifest** `assets/art_manifest.json` — source of truth for 4 backgrounds
  (`<city>-day/night`) + 6 sprites (courier, bland, swarmer, blandfather,
  vada-maharaja, dune-raja): scene / mood / readability / style / negative prompt /
  acceptance / target path, derived from the real `CITIES` + `SPRITE_SRC`.
- **Prompts** `prompts/chatgpt_image_batches.md` — copy-paste batches (style bible +
  numbered prompts + `SAVE AS` labels). Backgrounds forbid baked-in hazards (the game
  draws puddles/sand on top, per-zone); sprites force single centered character +
  transparent bg + small props (kills the old AI "props too big" failure).
- **Import** `tools/import_art.py` (Python + Pillow, matches `tools/process-bg.py`
  convention) — scans `assets/incoming/`, matches to the manifest, validates
  dims/aspect/transparency, optimizes (bg → 720 flat master; sprite → trim alpha +
  downscale), renames + places to target, archives raws, reports missing/unexpected,
  won't overwrite approved assets without `--force`. Dry-run by default. Verified
  end-to-end on synthetic fixtures (valid/invalid/missing/unexpected all handled).
- **Game seams (additive, non-breaking — procedural stays the live default until art
  lands):** new `city-art` theme resolves backgrounds by **city + day/night** with a
  procedural fallback; sprite loader now **prefers `assets/sprites/<key>.png`** and
  falls back to the SVG/blob, so dropping a PNG overrides art with zero code change;
  swarmer + both bosses got the same image-or-procedural draw seam (telegraph cues
  preserved); `CONFIG.sprites` gained per-entity scale/yOff knobs. Verified live: game
  boots clean, `__mr.setTheme("city-art")` switches + falls back with no error.
- **Docs** new `ART_PIPELINE.md`; `docs/sprites.md` records the AI-gen reversal of the
  2026-06-21 SVG-only decision.
- Roadmap note acknowledged: art was flagged "not until P0 (fun) passes" — the
  *pipeline* is cheap reusable infra, so v1 is kept lean (4 bg + 6 sprites), not a
  full art push.

## 2026-06-27 — review fixes: sandstorm boss-kill, hazard resize, resume label
Three issues from an external static code review of `42bf340` — all confirmed and fixed.
- **Sandstorm could leave a boss at ≤0 HP still alive.** `updateStorms` chipped boss HP but never checked for death, so if a pit landed the final tick the boss kept fighting (a zone-clear could stall). Now marks `hazardKilled` at ≤0 HP → routed through the same `killEnemy` sweep as bullet kills. Verified: boss 4 HP → -3.9 → `defeated:true`.
- **Hazards weren't re-fit on viewport resize.** `buildHazards` only ran at stage setup; a mobile URL-bar collapse changes `H`, leaving puddles/quicksand stale (could sit off the new arena). `resize()` now rebuilds hazards (same `level` seed → identical layout, re-fit) before re-baking the backdrop. Verified: H 1039→760 moved a patch from y811 (off-arena) to y593 (in bounds).
- **Resume button showed the global zone number.** `drawCityList` printed `Z{unlockedLevel}` → Jaisalmer zone 1 read "Z6" while the picker said 1–5. Now shows `RESUME · <CITY> Z<localzone>` (e.g., "RESUME · JAISALMER Z1"), matching the locked ZONE vocabulary. Verified live.
- `sw.js` → `masala-run-v23`.

## 2026-06-26 — playtest round 4: flicker fix, equal power buttons, per-zone variety, city food + boss sprites
- **Hero no longer flickers.** The i-frame feedback was a hard on/off strobe that hid the whole hero (and shield) every 0.1s — worst with the shield up and moving. Replaced with a smooth alpha **shimmer that never reaches 0** (`ifa = 0.5 + 0.45·|sin|`); the shield bubble stays full-alpha.
- **Power buttons are equal size.** Discs were always the same radius — the mismatch was the glyphs: measured ✦ rendered **41px** vs ❄ **29px**. Added per-glyph `gscale` (✦ 0.85, ❄ 1.0) → both now **35px**, plus a constant full-circle rim so a charging button never looks smaller than a ready one. Verified by pixel measurement.
- **Every zone looks its own.** (1) Hazards were placed on a rigid band/alternating-side pattern → re-seeded as free, non-overlapping, count-varied placement per zone (verified: lv3 has 2 puddles, lv4 has 4, all at different spots). (2) Street props: left & right edges now use independent vertical phases (no row-for-row mirroring) and the dog/cat — the only fixed props — shuffle side + height per zone.
- **City food sprites match their names.** Jaisalmer was drawing Mumbai's food art (Kachori looked like a vada pav, Ghevar like a jalebi). Added distinct procedural sprites — **Mirchi** (battered chilli), **Ghevar** (honeycomb disc), **Kachori** (puffy ball) — swapped per city via `foodSpriteFor()`. Verified Mumbai vs Jaisalmer side-by-side.
- **Distinct boss regalia per city.** Mini-boss gets a dented goon cap; the city boss gets rank + locale headgear — **Vada Maharaja** a tall gold crown (purple-grey body) + royal mustache, **Dune Raja** a layered desert turban (sand body). Verified both in preview.
- **Speed/control confirm (no change):** hero speed = `277 (constant) × flavor.speedMult × (MASALA RUSH ? 1.25 : 1) × hazardSlow`. NOT scaled by zone, wave, or power picks. Only modifiers: the temporary RUSH, a 5% slower SAVORY flavor (the tank), and hurdles. Handling is constant (settings.smooth).
  - **RUSH speed burst toned down** 1.25 → **1.15** — the freeze + flavor-lock is RUSH's real payload; +25% over that fed the "too fast/uncontrollable" feel. (`CONFIG.powers.rush.speedMul`, live-tunable.)
- Verified live (preview, no console errors). `sw.js` → `masala-run-v22`.

## 2026-06-26 — playtest round 3: hero friction, uniform power buttons, hazards soften (don't kill)
- **Hazards now have *felt* friction on the hero.** The slow existed but was too mild to read. Deepened: puddle 0.6→**0.5**, quicksand 0.55→**0.45** (quicksand is now clearly stickier). Added a **friction cue** — splashes/sand kick up opposite your motion + a ripple pulses at your feet while you're in a patch (`heroHazard` + the movement loop). Verified: in-patch step ~2.1px vs ~4.4px open ground (~45%).
- **Power buttons read as the same size.** They were always the same radius in code, but a *charging* button showed only a faint partial arc (no full outline) while a *ready* one had a bright full ring → looked smaller; and ❄ renders larger than ✦ at the same px. Fixes: a **constant full-circle rim in every state** anchors the size, and per-glyph `gscale` (❄ 0.82) matches their optical size.
- **Hazards soften Blands, they don't kill them.** A big quicksand patch used to drain a Bland to death (it did your job for you — same anti-pattern as the old screen-clear slams). Replaced continuous drain with a **one-time 50% chip on entry** (`e.hp *= 0.5` — halving can't reach 0, so it never kills); the per-patch `hit` set clears when the Bland leaves, so a fresh pass softens again. Verified: a 3-HP Bland sitting in quicksand drops to 1.5 once and holds. Puddles stay slow-only (no chip).
- Verified live (preview, no console errors). `sw.js` → `masala-run-v20`.

## 2026-06-26 — playtest round 2: slams thin (don't wipe), quicksand look, city→zone select
Design pivot from the round-1 feedback: a city-signature slam was built as a *screen-clear*; that breaks the eat→attack→eat loop (one button erases the reason to keep eating). Both signatures are now **strong area bursts that thin a wave and always leave survivors.**
- **SANDSTORM → localized vortices.** Replaced the single arena-wide expanding sweep with **5 swirling sand pits** that each gobble Blands inside (or who wander in) for ~2.5s, then fade. Pits seed **on random Blands** (jittered) — keeps the "random spots" feel while guaranteeing the power lands (fully-random placement gave 0-kill duds in testing). Per-pit kill cap (4) means Blands away from a pit always survive. Verified: 2–6 of a spread 20-Bland grid consumed per fire (more on real clusters), never a wipe. (`CONFIG.powers.slam.storm*`.)
- **VADA PAV RAIN → soft drizzle.** Was ~50 big piercing pavs = a wall that wiped the wave. Now **12 pavs**, low pierce (1), gentle fall, drawn as **actual vada-pav buns** (golden bun + chutney seam + shine via `drawPav`) instead of glow circles. Verified: 8 of 20 killed, 12 survivors.
- **Wave-wipe guard (item 4).** Localizing both powers is the structural fix — verified neither clears a full wave (rain ~40%, sandstorm ~15–30%, scattered).
- **Quicksand looks like quicksand, not a puddle.** `drawHazard` now branches by type: quicksand = a **sunken pit** (radial depression + concentric sink-rings + sand grain, no glossy film); puddle keeps the flat wet film. Darkened the Jaisalmer rim so the pit reads against sand (a hazard you can't see is unfair). **Night-zone tint warmed** from blue (`rgba(150,160,210)` — literally read as water) to warm moonlit sand. Verified day + night zone 4.
- **Level select is two-tier: CITY → ZONE.** Was a flat 1–10 grid. Now you pick a **named city card** first; a brand-new city (only its first zone unlocked) **starts immediately**, a city you've played opens its **zone picker** (unlocked zones + ‹ CITIES back). RESUME jumps to the frontier. Verified all three paths live.
- Verified live (preview, no console errors). `sw.js` → `masala-run-v19`.

## 2026-06-26 — maxed-build guard + slower maxing curve
- **No more dead picks when fully maxed.** Once every boon is at its cap, a level-up or mini-boss pick would show already-maxed boons that do nothing. Now `buildMaxed()` suppresses both sources: banked level-ups drain silently and a one-time **"FULLY STOCKED!"** cue shows. (`tryOpenPick` + the mini-boss branch; `maxedAnnounced` resets per run.)
- **Maxing takes a full run now, not ~10 min.** Steepened the XP curve so late level-up picks become a trickle: `levelXp.base` 40→**55**, `step` 22→**42**, `minGap` 26→**30**. Note: mini-boss boons (1/zone, ~10/run) are the real floor on max-speed — XP tuning pushes the *remaining* picks late, so full-max is now a late-run achievement. (Deeper lever if still too fast: make mini-boss boons non-guaranteed — deferred, dilutes the milestone.)
- Verified live: fully-maxed build levels 1→3 with the pick never opening and `pendingLevels` draining to 0; non-maxed level-up still opens a valid 3-boon pick; first pick now lands ~28 kills (was ~20). `sw.js` → `masala-run-v18`.

## 2026-06-26 — playtest feedback: powers, hazards, build caps
- **VADA PAV RAIN is a real power now.** It was a 1–2 projectile dud because the rain spawns *above* the screen and the off-screen cull (`b.y < -20`) deleted nearly every pav on frame 1. Tagged rain bullets (`rain:true`) exempt from the top cull; the downpour is now ~50 big piercing pavs cascading over ~2s. Cleared 19 Blands in test (was 2). (Note: the *savory auto-attack* — eat Vada Pav → 1 shot, +DOUBLE TADKA → 2 — is a separate thing from this slam power.)
- **SANDSTORM looks/acts like a sandstorm.** Replaced the radial bullet burst with an expanding wall of sand (`storms` system) that sweeps the arena and **consumes** Blands as the edge passes (bosses take chip damage), with a trailing sand-particle wall. Consumed all 12 test Blands.
- **Hazards now affect the hero + spread evenly.** Were enemy-only and clustered. `buildHazards` places one patch per vertical band on alternating sides (verified spread). Hero is **slowed** wading through a puddle/quicksand (`playerHazardSlow`) — a real navigation risk, no damage. Quicksand still sinks Blands. Slow tuned for both: puddle 0.6, quicksand 0.55.
- **Build caps — fixes "kills everything standing still."** Boons stacked unbounded (shots/pierce/fire/drain) and hearts had no ceiling. Added `CONFIG.boonCaps`: shots +3, pierce +3, fire floor 0.6 (~1.6× max rate), drain floor 0.55 (flavor can't become permanent), **maxHp 5**. A maxed boon drops out of the pick pool (`availableBoons`) so picks stay meaningful. The build now **plateaus**.
- **Movement speed crosscheck (no change needed).** Confirmed there is NO power/kill-based speed scaling: player speed = `277 (constant) × flavor.speedMult (0.95–1.0) × (MASALA RUSH ? 1.25 : 1)`. The old compounding MASALA LEGS boon is gone; `mods` has no speed. Only dynamic factor is the temporary 6s RUSH. The "uncontrollable" feel isn't speed creep.
- Verified live (preview, no console errors): rain downpour clears the field; sandstorm sweep consumes Blands; hazards spread across bands; caps + maxHp ceiling in `CONFIG`. `sw.js` → `masala-run-v17`.

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
