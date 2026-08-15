# Production Asset Brief Framework

Version: 1.2
Status: Frozen
Freeze Date: 2026-08-04
Last Revised Date: 2026-08-12
Validation Status: Validated
Validation Date: 2026-08-12
Next Production Task: PM runtime/visual sign-off on the Session 61 Phase 2
storage/utility attachment family (`PAB-MUMBAI-ENVPROP-STORAGE-ATTACHMENT-V1`,
Section 16) — generated, measured, and integrated; sign-off is the one
remaining gate before its metadata advances `review → approved`

## 1. Purpose

A Production Asset Brief is the authoritative asset-level specification between
the frozen creative/technical documents and actual AI generation. It converts:

```text
Art Bible + Prompt Bible + City Kit + Technical Asset Contract
→ one controlled production brief for one asset or one tightly related asset family
```

A brief is not merely an image prompt, mood board, complete category chapter,
city catalogue, or scene description. It defines one individual asset or one
tightly related family with controlled variants.

The final model-facing generation prompt is derived from an approved brief. If
generated output contradicts the brief, the brief remains authoritative and the
candidate fails review.

Production remains gameplay-first, modular, reusable, procedurally compatible,
and accessible. **AI designs assets, not complete scenes.**

## 2. Authority & Inheritance

```text
Art Bible
→ Prompt Bible
→ City Kit
→ Technical Asset Contract
→ Production Asset Brief
→ Generation Prompt
→ Candidate Asset
→ Review
```

The governing production loop remains:

```text
Rule → Prompt → Asset → Review
```

A lower layer may operationalize a higher layer but cannot weaken, reinterpret,
or contradict it. Global inherited rules need not be duplicated in full, but
high-risk and asset-critical requirements must be restated explicitly. Source
references identify the relevant document and section where practical.

Generated assets and review images are evidence, never creative authority.
Generated output cannot redefine an approved rule. Any required deviation must
be resolved through a formally versioned brief revision and, when necessary,
escalated to the higher authority.

Every brief explicitly protects, where applicable:

* gameplay meaning and category recognition
* silhouette logic and functional footprint
* perceived hitbox and scale hierarchy
* ownership, danger, and rarity meaning
* direction, timing, and gameplay state
* accessibility-essential communication

## 3. Unit of Production

The preferred production unit is:

**one tightly related asset family with controlled variants**

Valid examples include one chai-counter family, one sandstone storage-vessel
family, one standard melee-enemy family, or one projectile family. A brief may
cover one individual asset when a family would add no meaningful reuse.

A single brief must not combine unrelated props, an entire city catalogue,
multiple unrelated gameplay categories, complete scenes, complete edge strips,
full painted backgrounds, complete UI layouts, or unrelated candidate goals.

The family boundary must be explainable through shared structure, role,
silhouette grammar, technical output, and permitted variation axes.

## 4. Mandatory Brief Identification

Every brief contains:

* stable brief ID
* asset or family name
* asset category and subcategory/archetype
* gameplay tier
* city scope and city-skin treatment strength
* semantic version and production status
* owner or responsible workflow stage where relevant
* creation date and last revised date
* source-authority references

Use deterministic IDs compatible with future tooling:

```text
PAB-{CITY_OR_GLOBAL}-{CATEGORY}-{FAMILY}-{VERSION}
```

ID tokens use controlled stable slugs, not display names alone. The brief ID is
never silently reused for a different family or category. A version change does
not erase earlier traceable versions.

## 5. Production Statuses

| Status | Entry expectation | Exit expectation |
|---|---|---|
| `Draft` | Brief ID assigned; initial scope exists. | All mandatory sections are populated for review. |
| `Ready for Review` | Mandatory content is complete enough for creative and technical review. | Review findings are resolved or the brief returns to `Draft`. |
| `Ready for Generation` | Mandatory fields are complete; brief is approved; prompt can be derived without invention. | Controlled candidate generation begins and outputs are recorded. |
| `Generated` | Declared candidate batch exists and is traceably linked to the approved brief/prompt. | Candidates enter creative and technical review. Generated does not mean approved. |
| `Review Failed` | One or more candidates failed with classified evidence. | Prompt-only correction is approved, or a versioned brief revision returns to review. |
| `Approved` | One candidate passed creative and technical review, including in-game validation where required. | Approved export enters the controlled asset library/runtime integration stage. |
| `Integrated` | Approved asset is accepted into the runtime or production asset library and validation is recorded. | Asset remains active until superseded or formally deprecated. |
| `Deprecated` | Brief or asset is intentionally retired with replacement/reason recorded. | It remains traceable and must not be silently deleted or reused. |

`Ready for Generation` always requires approval and every mandatory field.
`Review Failed` always records one or more standard failure codes and evidence.
Silent replacement, silent approval, and silent overwriting are prohibited.

## 6. Mandatory Production Asset Brief Template

Copy this A–R structure into every Production Asset Brief. Square-bracketed
fields are intentional variables and must be resolved before a brief becomes
`Ready for Generation`. Use `Global / Not Applicable` only where the framework
explicitly permits it and record the reason.

### A. Brief Identity

* Brief ID: `[PAB_CITY_OR_GLOBAL_CATEGORY_FAMILY_VERSION]`
* Title: `[ASSET_OR_FAMILY_TITLE]`
* Version: `[SEMANTIC_VERSION]`
* Status: `[PRODUCTION_STATUS]`
* Category: `[ASSET_CATEGORY]`
* Subcategory/Archetype: `[SUBCATEGORY_OR_ARCHETYPE]`
* City Scope: `[GLOBAL_OR_APPROVED_CITY]`
* City-skin Treatment Strength: `[STRONG_MODERATE_RESTRAINED_MINIMAL_NONE]`
* Gameplay Tier: `[TIER_AND_PRIORITY]`
* Owner/Workflow Stage: `[OWNER_OR_STAGE]`
* Creation Date: `[YYYY_MM_DD]`
* Last Revised Date: `[YYYY_MM_DD]`
* Source Authority References: `[DOCUMENT_SECTION_REFERENCES]`

### B. Authority References

* Art Bible: `[VERSION_STATUS_AND_RELEVANT_SECTIONS]`
* Prompt Bible Category Module: `[MODULE_AND_RELEVANT_SECTIONS]`
* City Kit: `[CITY_KIT_VERSION_PILLARS_OR_GLOBAL_NOT_APPLICABLE]`
* Technical Asset Contract: `[VERSION_AND_APPLICABLE_SECTIONS]`
* Supporting Specification: `[APPROVED_SPECIFICATION_OR_NONE]`
* High-risk Rules Restated: `[ASSET_CRITICAL_INHERITED_REQUIREMENTS]`
* Conflict/Escalation Notes: `[NONE_OR_DOCUMENTED_CONFLICT]`

Higher authorities remain controlling. References support traceability and do
not permit selective omission of inherited requirements.

### C. Asset Purpose

* Asset Definition: `[WHAT_THE_ASSET_OR_FAMILY_IS]`
* Production Reason: `[WHY_IT_EXISTS]`
* Environmental or Gameplay Function: `[FUNCTION]`
* Reuse Classification: `[SHARED_CITY_SKINNED_OR_CITY_EXCLUSIVE]`
* Intended Production Outcome: `[ISOLATED_ASSET_OR_CONTROLLED_FAMILY]`
* Explicit Non-goals: `[WHAT_THIS_BRIEF_DOES_NOT_CREATE]`

### D. Gameplay Role & Safety

* Gameplay Relevance: `[DECORATIVE_SUPPORTIVE_OR_FUNCTIONAL_ROLE]`
* Gameplay Tier: `[TIER_AND_RELATIVE_PRIORITY]`
* Placement Zone: `[APPROVED_ZONE]`
* Interaction State: `[NON_INTERACTIVE_OR_APPROVED_INTERACTION]`
* Category Recognition Requirements: `[POSITIVE_RECOGNITION_CUES]`
* Prohibited Category Resemblance: `[ADJACENT_CATEGORIES]`
* Readability Priority: `[WHAT_MUST_REMAIN_VISIBLE]`
* Protected Gameplay Characteristics: `[MEANING_SILHOUETTE_FOOTPRINT_HITBOX_SCALE_OWNERSHIP_DANGER_RARITY_DIRECTION_TIMING_STATE_ACCESSIBILITY]`

Decorative environment assets are non-interactive unless separately defined,
remain outside the protected playable road where required, and must not resemble
pickups, enemies, attacks, hazards, projectiles, interactable objects, or UI.

### E. Asset-family Scope

* Base Asset: `[SHARED_BASE_STRUCTURE]`
* Included Variants: `[CONTROLLED_INCLUDED_VARIANTS]`
* Excluded Variants: `[EXPLICIT_EXCLUSIONS]`
* Shared Structure: `[INVARIANT_GEOMETRY_AND_GRAMMAR]`
* City Material/Detail Layer: `[CITY_LAYER_OR_NOT_APPLICABLE]`
* Time-of-day Treatment: `[DAY_NIGHT_UNIVERSAL]`
* Runtime Instance Logic: `[PLACEMENT_AND_SELECTION_LOGIC]`
* Family Boundary Rationale: `[WHY_THESE_ASSETS_BELONG_TOGETHER]`

Use where applicable:

```text
Base Asset → Shared Variant → City Material/Detail Layer → Time-of-Day Treatment → Runtime Instance
```

### F. City Identity

* Applicable City: `[APPROVED_CITY_OR_GLOBAL_NOT_APPLICABLE]`
* Supported Identity Pillar: `[APPROVED_PILLAR_OR_NOT_APPLICABLE]`
* Approved City Cues: `[PERMITTED_RESEARCHED_CUES]`
* Treatment Strength: `[APPROVED_STRENGTH]`
* Material Cues: `[MATERIALS]`
* Architecture/Object-language Cues: `[FORM_AND_CONSTRUCTION_CUES]`
* Prohibited Stereotypes/Misuse: `[CITY_SPECIFIC_NEGATIVES]`
* Mixed-city Contamination Exclusions: `[FOREIGN_CITY_CUES]`

Use `Global / Not Applicable` for globally fixed assets or categories with
minimal/no city treatment. City identity never changes gameplay meaning.

### G. Visual Specification

* Silhouette Intent: `[OUTER_SHAPE_AND_RECOGNITION_GOAL]`
* Primary Shape Grammar: `[GLOBAL_PRIMARY_FORMS]`
* Secondary Shape Rhythm: `[CATEGORY_OR_CITY_SECONDARY_FORMS]`
* Proportions: `[RELATIVE_PROPORTIONS]`
* Intended Runtime Height: `[TARGET_RUNTIME_HEIGHT_OR_NOT_APPLICABLE]`
* Declared Maximum Runtime Height: `[MAXIMUM_RUNTIME_HEIGHT_OR_NOT_APPLICABLE]`
* Intended Visible Width/Depth: `[VISIBLE_EXTENT_AT_TARGET_HEIGHT_OR_NOT_APPLICABLE]`
* Visible Width:Height Proportion: `[RATIO_AND_EDGE_ENVELOPE_JUSTIFICATION_OR_NOT_APPLICABLE]`
* Edge-envelope Fit: `[SHALLOW_SILHOUETTE_AND_OUTWARD_BLEED_CHECK_OR_NOT_APPLICABLE]`
* Orientation: `[VIEW_AND_FACING]`
* Visual Weight: `[TIER_APPROPRIATE_WEIGHT]`
* Detail Budget: `[MEANINGFUL_CUE_LIMIT]`
* Outline Treatment: `[STRENGTH_AND_EDGE_BEHAVIOUR]`
* Flat-fill/Shading Rules: `[FILLS_AND_MAXIMUM_SHADE_LAYERS]`
* Material Hierarchy: `[PRIMARY_SECONDARY_ACCENT_MATERIALS]`
* Palette Role: `[ENVIRONMENT_GAMEPLAY_OR_INFORMATION_ROLE]`
* Accent-colour Limits: `[COUNT_AREA_AND_PRIORITY_LIMITS]`
* Lighting Behaviour: `[SEPARATE_OR_ALLOWED_RESPONSE]`
* Day/Night Behaviour: `[SAME_STRUCTURE_CONTROLLED_ADAPTATION]`
* Mobile Gameplay-scale Readability: `[TARGET_SCALE_RECOGNITION_CHECK]`
* High Bird’s-eye Camera Compatibility: `[ANGLE_DEPTH_AND_PERSPECTIVE_RULES]`

Instructions must be structurally precise without becoming pixel-by-pixel
illustration or overriding the artist/model's bounded execution choices.
For applicable tall edge props, visible width:height around `0.5–0.6` is only a
secondary, non-binding composition heuristic. It cannot validate road intrusion;
the authoritative road-safety quantity is `ρ` as defined in Section 6.1 and the
Technical Asset Contract.

### H. Camera, Runtime Placement Geometry & Modularity

* Camera Orientation: `[ILLUSTRATED_VIEW_ANGLE_AND_PERSPECTIVE]`
* Runtime Orientation: `[PLACEMENT_FACING_AND_WORLD_DIRECTION]`
* Edge Orientation Class: `[CLASS_A_CLASS_B_CLASS_C_OR_NOT_APPLICABLE]`
* Road-facing Edge: `[ASSET_EDGE_FACING_PLAYABLE_ROAD]`
* City-facing Edge: `[ASSET_EDGE_FACING_AWAY_FROM_PLAYABLE_ROAD]`
* Runtime Depth Direction: `[DIRECTION_FROM_ROAD_INTO_NON_PLAYABLE_EDGE]`
* Maximum Playable Intrusion: `[ZERO_OR_EXPLICIT_APPROVED_LIMIT]`
* Outward Screen-space Budget: `[AVAILABLE_EXTENT_BEYOND_THE_ROAD_FACING_PIVOT]`
* Stored Visible Bounds: `[RUNTIME_BOUND_CONVENTION_AND_COORDINATES]`
* Placement Footprint: `[RUNTIME_WIDTH_DEPTH_AND_OCCUPIED_ZONES]`
* Recommended Pivot Edge: `[ROAD_FACING_CITY_FACING_OR_JUSTIFIED_ALTERNATIVE]`
* Left/Right Applicability: `[SIDE_RULE]`
* Pivot Expectations: `[PIVOT_REFERENCE]`
* Road-facing Visible Depth: `[SOURCE_SPACE_DEPTH_FROM_PIVOT_TO_ROAD_FACING_VISUAL_BOUND]`
* Road-facing Depth Ratio (ρ): `[ROAD_FACING_VISIBLE_DEPTH_DIVIDED_BY_STORED_VISIBLE_HEIGHT]`
* Projected Road Intrusion at Target Height: `[ρ_TIMES_TARGET_RUNTIME_HEIGHT]`
* Projected Road Intrusion at Maximum Height: `[ρ_TIMES_DECLARED_MAXIMUM_RUNTIME_HEIGHT]`
* Hard Intrusion Result: `[PASS_FAIL_AGAINST_8_PX]`
* Preferred Intrusion Result: `[PASS_FAIL_AGAINST_5_6_PX]`
* City-facing Visible Depth: `[SOURCE_SPACE_DEPTH_FROM_PIVOT_TO_CITY_FACING_VISUAL_BOUND]`
* City-facing Depth Ratio (cityFrac): `[CITY_FACING_VISIBLE_DEPTH_DIVIDED_BY_STORED_VISIBLE_HEIGHT]`
* Available City-side Screen Space: `[RUNTIME_SCREEN_SPACE_BEFORE_OUTER_BLEED]`
* Projected Outer Bleed: `[MAX_0_CITYFRAC_TIMES_HEIGHT_MINUS_AVAILABLE_SPACE]`
* Acceptable On-screen Visibility: `[FAMILY_SPECIFIC_VISUAL_REVIEW_REQUIREMENT]`
* Human-review Notes: `[FOOTPRINT_HANDEDNESS_SERVING_DIRECTION_READABILITY_CLIPPING_CITY_IDENTITY_AND_PIVOT_HONESTY]`
* Cropping Tolerance: `[CROP_AND_EDGE_BLEED_RULE]`
* Placement Zone: `[ROAD_EDGE_WORLD_SCREEN_OR_OTHER_ZONE]`
* Edge Depth: `[DEPTH_WITHIN_APPROVED_EDGE_ZONES]`
* Crop-safe Region: `[ESSENTIAL_AND_CROPPABLE_REGIONS]`
* Overlap Allowance: `[ALLOWED_AND_PROHIBITED_OVERLAP]`
* Procedural Spacing: `[MINIMUM_SPACING_DENSITY_AND_REPETITION]`
* Attachment Points: `[DECLARED_ATTACHMENTS_OR_NONE]`
* Rotation Permission: `[ALLOWED_LIMITED_PROHIBITED]`
* Mirroring Permission: `[ALLOWED_LIMITED_PROHIBITED]`
* Baked-composition Restrictions: `[NO_SCENE_GROUND_NEIGHBOURS_OR_OTHER_LIMITS]`

Camera orientation defines how the asset is illustrated. Runtime orientation
defines how it faces and occupies the game world. Both are mandatory and must
not be inferred from one another. Every environmental asset brief also includes
the functional top-down placement diagram required by Section 6.1.

For applicable tall edge props, place the road-facing pivot near the road margin
and assess the limited outward screen space at target and maximum height. The
pivot must be the honest road-facing ground-contact footprint edge, never an
artificially moved percentage target. Wide or deep art that bleeds excessively
must be corrected through authored geometry rather than shrinking below intended
player-relative scale. Left/right numeric limits are symmetric, but Class-C
masters remain separately authored and runtime mirroring remains prohibited.

### I. Permitted Variants

Document every permitted axis and its bounds:

* Structural Variation: `[ALLOWED_RANGE_OR_NONE]`
* Material Variation: `[ALLOWED_RANGE_OR_NONE]`
* Controlled Wear: `[ALLOWED_RANGE_OR_NONE]`
* City Skin: `[APPROVED_CITY_OR_NONE]`
* Day/Night Treatment: `[ALLOWED_TREATMENTS]`
* Orientation: `[ALLOWED_ORIENTATIONS]`
* Approved State Change: `[STATES_OR_NONE]`
* Accessibility Treatment: `[REQUIRED_VARIANTS_OR_NONE]`
* Gameplay State: `[GAMEPLAY_STATES_OR_NONE]`
* Invariants Across Variants: `[PROTECTED_CHARACTERISTICS]`

Undocumented generator-created variants are prohibited. Adding a new axis or
expanding bounds requires a versioned brief revision.

### J. Technical Output

* Technical Asset Contract Reference: `[VERSION_AND_SECTIONS]`
* File Type/Colour Space: `[CONTRACT_VALUE]`
* Transparency/Alpha: `[CONTRACT_VALUE]`
* Dimensions/Resolution: `[CONTRACT_VALUE]`
* Padding/Bounds: `[CONTRACT_VALUE]`
* Pivot: `[CONTRACT_VALUE]`
* Orientation/Side Variants: `[CONTRACT_VALUE]`
* Naming: `[NAMING_CONVENTION_AND_KEYS]`
* Metadata: `[SCHEMA_AND_REQUIRED_FIELDS]`
* Export Destination/Manifest: `[APPROVED_PATH_AND_RECORD]`
* Collision/Footprint Data: `[APPLICABLE_VALUE_OR_NONE]`
* Animation/Frame Requirements: `[SUPPORTED_REQUIREMENT_OR_NONE]`
* Edge-envelope Compatibility Review: `[DOES_THE_ASSET_PASS_HARD_AND_PREFERRED_INTRUSION_CHECKS_AND_REMAIN_VISUALLY_ACCEPTABLE_AT_TARGET_AND_MAXIMUM_HEIGHT]`
* Asset-specific Override: `[NONE_OR_JUSTIFIED_COMPATIBLE_OVERRIDE]`

The brief references rather than redefines the Technical Asset Contract.
Asset-specific overrides require explicit justification, compatibility with the
higher authority, review, and versioning.

### K. Negative Constraints

1. Global Negatives: `[GLOBAL_PROMPT_BIBLE_NEGATIVES]`
2. Category Negatives: `[CATEGORY_MODULE_NEGATIVES]`
3. City-specific Negatives: `[CITY_KIT_NEGATIVES_OR_NOT_APPLICABLE]`
4. Asset-specific Negatives: `[FAMILY_SPECIFIC_FAILURE_PREVENTION]`

Restate applicable high-risk protections:

* no realism, photorealism, painterly rendering, or unsupported 3D appearance
* no complete scene, full background, complete edge strip, or baked neighbours
* no decorative clutter or detail that overrides readability
* no readable text, logos, trademarks, or unapproved branding
* no stereotype, caricature, literal landmark, or tourist-poster treatment
* no gameplay-category confusion or dishonest footprint/hitbox
* no colour-only critical communication
* no mixed-city contamination

### L. Reference-image Usage

For each reference, record:

| Reference ID | Reason for inclusion | May borrow | Must not copy | Reference type |
|---|---|---|---|---|
| `[REFERENCE_ID]` | `[WHY_INCLUDED]` | `[STRUCTURE_MATERIAL_PALETTE_OR_MOOD_ELEMENTS]` | `[PROHIBITED_CARRYOVER]` | `[STRUCTURAL_MATERIAL_PALETTE_MOOD]` |

References are supporting evidence only. They do not override the brief or any
higher authority. Unlabelled references are prohibited.

### M. Derived Generation Prompt

* Prompt Version/ID: `[DERIVED_PROMPT_ID_AND_VERSION]`
* Source Brief ID/Version: `[BRIEF_ID_AND_VERSION]`
* Model/Pipeline Target: `[MODEL_OR_PIPELINE_WHEN_KNOWN]`
* Final Model-facing Prompt: `[DERIVED_PROMPT_TEXT]`

The prompt follows:

```text
Asset Purpose → Gameplay Role → Tier → Visual Rules → City Skin → Day/Night → Isolation → Technical Output → Negative Constraints → Acceptance Criteria
```

The prompt is derived from the frozen brief and never substitutes for it.

### N. Candidate-generation Plan

* Candidate Count: `4` by default
* Count Override and Justification: `[NONE_OR_JUSTIFIED_COUNT]`
* Generation Model/Pipeline: `[MODEL_OR_PIPELINE_WHEN_KNOWN]`
* Seed Strategy: `[FIXED_RECORDED_OR_NOT_SUPPORTED]`
* Controlled Prompt Fields: `[FIELDS_HELD_CONSTANT]`
* Variable Prompt Fields: `[APPROVED_VARIANT_FIELDS_ONLY]`
* Output Destination: `[CONTROLLED_OUTPUT_PATH]`
* Candidate Naming: `[BRIEF_ID_VERSION_CANDIDATE_INDEX]`

The manual pilot generates **four candidate outputs per approved brief** unless
the approved brief records a different count and reason.

### O. Acceptance Criteria

Review in this order:

1. **Gameplay and category safety:** `[OBSERVABLE_MEANING_PLACEMENT_AND_CONFUSION_CHECKS]`
2. **Silhouette and recognition:** `[TARGET_SCALE_SHAPE_AND_STATE_CHECKS]`
3. **Technical compliance:** `[FORMAT_ALPHA_DIMENSIONS_PADDING_PIVOT_NAMING_METADATA_CHECKS]`
4. **Modularity and procedural usability:** `[PLACEMENT_VARIATION_OVERLAP_AND_REUSE_CHECKS]`
5. **City identity:** `[PILLAR_CUES_STRENGTH_AND_CONTAMINATION_CHECKS]`
6. **Global style consistency:** `[SHAPE_FILL_OUTLINE_CAMERA_AND_DETAIL_CHECKS]`
7. **Charm and polish:** `[CONTROLLED_FINISH_CHECKS_AFTER_ALL_HIGHER_PRIORITIES_PASS]`

Criteria must be observable and testable where possible. Beauty alone is never
sufficient for approval.

For an applicable tall edge-anchored landmark prop, acceptance additionally
requires the asset to remain substantially visible at intended runtime height,
avoid excessive silhouette loss, preserve readable road-facing orientation and
intended player-relative scale, pass `ρ × declaredMaximumRuntimeHeight <= 8 px`,
record whether the preferred `5.6 px` intrusion target passes, and fit without a
compensating runtime scale hack. A hard pass may advance despite a preferred
guidance miss when the review record explicitly accepts it.

### P. Rejection Triggers

Reject a candidate for any applicable trigger:

* category confusion or poor gameplay readability
* wrong silhouette, footprint, hitbox perception, scale, ownership, or state
* Technical Asset Contract failure, broken transparency, or invalid export
* unusable pivot, bounds, orientation, crop, or padding
* baked complete scene, background, ground, neighbours, or complete composition
* poor modularity or procedural-placement failure
* excessive or unreadable detail
* city stereotype, literal landmark, or mixed-city contamination
* wrong day/night or lighting treatment
* gameplay-scale readability failure
* reliance on colour alone where multi-cue communication is required
* uncontrolled or undocumented variant
* reference overfit or copied prohibited content
* tall edge-prop geometry that fails the parameterized `8 px` hard-intrusion
  check, is usable only below declared scale, causes visually unacceptable
  off-canvas loss, uses a dishonest pivot/footprint, or requires disproportionate
  engine-side compensation

Every rejection is recorded with one or more standard failure codes and evidence.
When the approved placement envelope is operating correctly, classify this tall
edge-prop failure as production/technical geometry (for example,
`PIVOT_OR_BOUNDS_FAILURE` or `TECHNICAL_CONTRACT_FAILURE`), not as a runtime
placement-system failure.

### Q. Review Record

* Reviewer: `[REVIEWER]`
* Review Date: `[YYYY_MM_DD]`
* Candidate Identifiers: `[CANDIDATE_IDS]`
* Result: `[PASS_FAIL_PARTIAL]`
* Failure Classification: `[STANDARD_FAILURE_CODES_OR_NONE]`
* Evidence: `[SCREENSHOTS_VALIDATION_OUTPUT_AND_NOTES]`
* Required Corrections: `[CORRECTIONS_OR_NONE]`
* Brief Revision Needed: `[YES_NO]`
* Prompt-only Revision Allowed: `[YES_NO_AND_REASON]`
* Selected Candidate: `[CANDIDATE_ID_OR_NONE]`
* Final Approval Note: `[APPROVAL_OR_REJECTION_SUMMARY]`

### R. Revision History

| Version | Date | Changed section | Reason | Evidence/failure addressed | Approver |
|---|---|---|---|---|---|
| `[VERSION]` | `[YYYY_MM_DD]` | `[SECTION]` | `[CHANGE_REASON]` | `[EVIDENCE_OR_FAILURE_CODE]` | `[APPROVER]` |

Silent edits are prohibited. Preserve superseded versions and their review
records for traceability.

## 6.1 Runtime Edge Placement Standard

Camera angle alone is insufficient to authorize an edge asset for generation.
Every edge-asset family must define its runtime placement geometry: road-facing
edge, city-facing edge, runtime depth direction, maximum playable intrusion,
placement footprint, and recommended pivot edge.

### Edge Orientation Classes

| Class | Rule | Typical examples |
|---|---|---|
| `Class A — Fully Mirrorable` | A horizontal mirror preserves function, structure, lighting, wear, and placement meaning without adjustment. | Crates, barrels, planters |
| `Class B — Mirrorable After Controlled Attachment Adjustment` | The structural master may be mirrored only after approved asymmetric attachments are repositioned or corrected. | Edge assets with bounded, separable asymmetry |
| `Class C — Dedicated Left and Right Masters Required` | Author dedicated left-edge and right-edge masters. Mirroring is insufficient when it would break serving direction, attachment logic, structural believability, lighting, wear patterns, or gameplay placement. | Directional service structures and other side-dependent edge assets |

Every edge-asset brief declares exactly one class. A brief may permit a mirrored
fallback for a Class C master only when review confirms that attachment logic,
structural believability, lighting, weathering, and gameplay placement remain
correct; this does not remove the dedicated-master requirement and never permits
runtime mirroring.

### Placement Envelope

Every environmental asset family must define a placement envelope containing:

* maximum road intrusion
* edge depth
* crop-safe region
* overlap allowance
* procedural spacing

Overall image dimensions do not substitute for the placement envelope. Bounds,
transparent padding, collision data, and placement geometry must remain
distinguishable in both the brief and validation evidence.

### Tall Edge-Prop Authoring Envelope

Tall, edge-anchored landmark-scale carts, counters, stalls, and similar anchors
use two independently measured source-space quantities:

```text
storedVisibleHeight = visualBounds.y1 - visualBounds.y0
ρ                    = roadFacingVisibleDepth / storedVisibleHeight
cityFrac             = cityFacingVisibleDepth / storedVisibleHeight
roadIntrusion        = ρ * runtimeHeight
outerBleed           = max(0,
                           cityFrac * runtimeHeight - availableCitySideScreenSpace)
```

#### A. Hard Runtime Constraints

Every applicable brief declares target and maximum runtime heights. The hard
road-safety requirement is:

```text
ρ * declaredMaximumRuntimeHeight <= 8 px
```

There is no universal hard `ρ` percentage. At `90 px`, hard `ρ <= 8.89%`; at
`120 px`, hard `ρ <= 6.67%`. The physical footprint must remain clear of the
protected road.

#### B. Preferred Production Guidance

New authoring targets `30%` headroom below the hard cap: preferred projected
road intrusion is at most `5.6 px`, so:

```text
preferred ρ <= 5.6 / declaredMaximumRuntimeHeight
```

At `90 px`, preferred `ρ <= 6.22%`. This guidance is not a hard engine rule and
does not retroactively reject an asset that passes the hard constraint.

#### C. Secondary Visual Heuristics

Visible width:height around `0.5–0.6` is a secondary, non-binding composition
heuristic only; W:H cannot validate road intrusion. No universal `cityFrac` band
is frozen. City-facing depth and projected bleed are asset-family-specific and
must be visually reviewed against available city-side screen space.

Normalized pivot percentage may be recorded diagnostically but is not a target.
The authoritative pivot is the honest road-facing ground-contact footprint edge;
moving it artificially to make the geometry pass is prohibited.

#### D. Human Review, Bounds, and Existing Assets

Stored runtime bounds are the values consumed by `EDGE_PROP_DEFS`. Literal
alpha-pixel bounds may differ by approximately one pixel under inclusive versus
half-open conventions; briefs, measurements, and future validators must state
which convention they use without silently normalizing existing runtime values.
Human review confirms semantic footprint honesty, handedness, serving direction,
readability, acceptable clipping/visibility, and city identity.

The numeric formula is symmetric for dedicated left/right Class-C masters, but
the art is not mirrored: both masters are authored and measured independently,
and runtime mirroring remains prohibited. Right fixed-canopy V002 is approved,
valid at its current geometry, outside preferred future road-depth guidance, and
grandfathered. Left fixed-canopy V003 is geometry-validated and valid at its
tested geometry, while its metadata status remains `review`. Right chai-counter
V001 is approved and is a strong road-depth example. Session 53/55 experimental
assets remain geometry evidence only, not production-approved full references.

This contract applies by intended runtime scale and placement. Small ambient
props and asset categories outside the tall edge-placement system are not
automatically subject to it.

### Runtime Road Cross-section

The reusable cross-section is:

```text
Building Zone
↓
Edge Decoration Zone
↓
Interactive Edge Prop Zone
↓
Safety Buffer
↓
Playable Road
↓
Safety Buffer
↓
Interactive Edge Prop Zone
↓
Edge Decoration Zone
↓
Building Zone
```

Future edge-asset briefs must state which zones the family may occupy and which
zone boundaries it may not cross.

### Functional Placement Diagram

Every environmental asset brief must include a simple top-down runtime placement
diagram. It must label the playable road, safety buffer, edge prop zone, edge
decoration zone, building zone, service side, rear/storage side, and runtime
depth direction. This is a functional production diagram, not concept art.

## 7. Failure Classification

Every failed review identifies one or more codes and includes observable
evidence, affected candidate IDs, and required correction ownership.

| Failure code | Classification |
|---|---|
| `CREATIVE_AUTHORITY_CONFLICT` | Candidate, prompt, or brief contradicts a higher creative authority. |
| `GAMEPLAY_READABILITY_FAILURE` | Gameplay meaning or priority is unclear at the required context/scale. |
| `CATEGORY_RECOGNITION_FAILURE` | Asset resembles or is mistaken for another category. |
| `SILHOUETTE_FAILURE` | Outer shape, direction, state, or archetype recognition fails. |
| `CITY_IDENTITY_FAILURE` | Approved city identity is missing, excessive, or unsupported. |
| `STEREOTYPE_OR_MISUSE` | Output uses prohibited stereotype, literal landmark, tokenism, or misuse. |
| `MIXED_CITY_CONTAMINATION` | Output contains unapproved cues from another city or culture. |
| `STYLE_LANGUAGE_FAILURE` | Output violates the shared shape, fill, outline, detail, or camera grammar. |
| `MODULARITY_FAILURE` | Asset cannot be separated, varied, reused, or assembled as briefed. |
| `PROCEDURAL_PLACEMENT_FAILURE` | Bounds, composition, density, overlap, or dependencies prevent procedural use. |
| `TECHNICAL_CONTRACT_FAILURE` | Output contradicts an applicable Technical Asset Contract requirement. |
| `TRANSPARENCY_OR_EXPORT_FAILURE` | Alpha, file, colour-space, export, or manifest delivery is invalid. |
| `PIVOT_OR_BOUNDS_FAILURE` | Pivot, padding, crop, or asset bounds are unusable or dishonest. |
| `CAMERA_OR_PERSPECTIVE_FAILURE` | View, orientation, perspective, or depth conflicts with the approved camera. |
| `DAY_NIGHT_TREATMENT_FAILURE` | Time-of-day treatment changes structure, meaning, fairness, or readability. |
| `ACCESSIBILITY_FAILURE` | Critical communication relies on an excluded cue or fails an accessibility mode. |
| `PROMPT_AMBIGUITY` | Derived prompt omits or conflicts on a required production instruction. |
| `UNCONTROLLED_VARIANT` | Candidate introduces an undocumented variant axis or exceeds approved bounds. |
| `REFERENCE_OVERFIT` | Candidate copies prohibited reference content or lets a reference override rules. |
| `OTHER_DOCUMENTED_FAILURE` | Evidence-backed failure not represented above; explanation is mandatory. |

A failed candidate cannot advance until its failure is resolved through an
approved prompt-only correction or a versioned brief revision.

## 8. Shared vs. City-exclusive Governance

Shared asset families are preferred. A city-exclusive asset is allowed only
when it:

* supports a documented city identity pillar
* cannot be represented credibly through a shared family
* remains modular and procedurally reusable
* follows the global visual language
* remains readable at mobile gameplay scale
* does not create a complete scene or baked background
* includes explicit production justification in the brief

Novelty, ornament, charm, or beauty alone is not sufficient justification.
City-exclusive status does not permit a new gameplay category or technical
contract exception.

## 9. Brief Approval Rules

A brief may become `Ready for Generation` only when:

* every mandatory A–R section is complete
* authority references are present and current
* the asset-family scope and non-goals are unambiguous
* gameplay, placement, and category safety are defined
* city treatment or `Global / Not Applicable` is correctly declared
* permitted variants and invariants are explicit
* Technical Asset Contract requirements are complete by reference and selected values
* four-layer negatives are complete
* acceptance criteria and rejection triggers are observable
* candidate plan and traceable naming are defined
* no unresolved editorial marker, contradictory variable, or authority conflict remains
* the brief has passed creative and technical review

Approval changes the brief status; it does not pre-approve generated output.

## 10. Manual Pilot Workflow

1. Select one low-risk asset family.
2. Create the Production Asset Brief.
3. Review and approve the brief.
4. Derive the generation prompt.
5. Generate four controlled candidates.
6. Run creative review.
7. Run technical review.
8. Classify failures with evidence.
9. Revise the prompt or versioned brief.
10. Approve one candidate.
11. Export and validate metadata.
12. Integrate into a controlled game test.
13. Record findings.
14. Improve the framework before automation.

LangGraph automation begins only after the manual pilot proves this workflow and
exposes real failure modes. Automation must encode validated stages rather than
inventing production rules in advance.

## 11. First Pilot Recommendation

The recommended next task is:

**Mumbai Environmental Props — Chai-Counter / Stall-Component Pilot Asset Brief**

This family strongly supports Mumbai's Dense Layered Street Commerce pillar,
is visually recognisable, non-gameplay and relatively low risk, and supports
modular reuse. It can validate transparent output, pivots, bounds, metadata,
procedural placement, city skin, material treatment, and day/night rules.

It is safer than beginning with enemies, attacks, hazards, projectiles, or
critical gameplay UI. This section records the recommendation only; it does not
create or approve the pilot brief, generation prompt, candidate batch, or asset.

## 12. Production Roadmap

```text
Completed
→ Art Bible — Frozen
→ Prompt Bible — Frozen
→ Mumbai City Kit — Frozen
→ Jaisalmer City Kit — Frozen
→ Production Asset Brief Framework — Complete and Frozen
→ Initial chai-counter pilot evaluation — Runtime placement gap identified
→ Official Mumbai chai-counter Candidate 1–4 generation — Complete
→ Runtime placement and left/right master workflow — Validated
→ Mumbai Chai-Counter Pilot — Validated
→ Mumbai Vada-Pav Cart structural generation — Complete
→ Vada-Pav Cart production regeneration and orientation validation — Passed

Shortlisted for Future Refinement
→ Candidate 2 — Plain Counter / Restrained Red
→ Candidate 4 — Shallow Awning / Restrained Monsoon Response

Approved Production Directions
→ Vada-Pav Cart Candidate 1 — Compact Fixed-Canopy Cart
→ Vada-Pav Cart Candidate 4 — Umbrella-Style Open Cart

Prepared
→ Four deterministic Vada-Pav Cart production filenames — Syntax validated
→ Four disabled draft metadata templates — Schema structure validated
→ Pivot, bounds, placement-envelope, and Test A/B/C definitions — Prepared

Pending / Not Started
→ Four final binary exports and authoritative modular runtime path — Pending
→ Production metadata, pivot, bounds, alpha, and placement validation — Pending
→ Controlled runtime and gameplay integration — Not Started

Next
→ Prepare accepted Mumbai vada-pav cart assets for repository export, naming,
  metadata validation, pivot/bounds validation, and controlled runtime integration
```

Remaining roadmap:

1. Complete valid binary export collection for the four vada-pav cart masters.
2. Validate transparency, dimensions, padding, and complete silhouettes.
3. Validate deterministic binary filenames and production metadata.
4. Validate pivots, visual bounds, and placement footprints.
5. Run controlled single-asset placement tests.
6. Run chai-counter plus vada-pav mixed-edge tests.
7. Run opposing-edge road-protection tests.
8. Record failures and corrections.
9. Complete controlled runtime integration.
10. Record pipeline findings.
11. Refine the manual production workflow.
12. Create the next Mumbai environmental-prop brief.
13. Begin LangGraph workflow design only after manual production and integration
    stages are proven.

The four official Mumbai chai-counter candidates were generated and reviewed.
Candidates 2 and 4 are shortlisted for future refinement; Candidates 1 and 3
are rejected. No visual asset is approved, and production and gameplay
integration have not started. Vada-pav export/test preparation is recorded
above, but no broader Mumbai catalogue production is complete.

## 13. Freeze Declaration & Change Control

The Production Asset Brief Framework completed initial review on 2026-08-04 and
is frozen for the manual pilot phase. Version 1.1 incorporated the documented
runtime-placement geometry refinement on 2026-08-05 after the initial pilot
evaluation exposed a specification gap. All production briefs must use this
structure unless a formally reviewed, documented, and versioned framework
change is approved.

Version 1.2 freezes the Session 56 tall edge-prop geometry contract on
2026-08-12. Its formulas and numeric checks were independently verified against
the current runtime and are traceable to
`docs/art-production/reports/session56_edge_prop_geometry_audit.html`. This is a
production/technical refinement; it does not revise creative authority.

Framework changes must identify the affected section, reason, evidence or
failure mode, authority impact, dependent briefs, version change, and approver.
Technical findings may clarify fields but cannot silently change frozen creative
principles. Generated outputs cannot redefine this framework.

## 14. Mumbai Environmental Props — Chai-Counter / Stall-Component Pilot Asset Family

This is the first Production Asset Brief created under the frozen framework. It
defines and freezes one controlled asset family only. It creates no image,
candidate, final export, metadata record, runtime integration, or automation.

### A. Brief Identity

* Brief ID: `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1`
* Title: Mumbai Environmental Props — Chai-Counter / Stall-Component Pilot Asset Family
* Version: `1.2`
* Status: `Generated`
* Category: `Environmental Prop`
* Subcategory/Archetype: `Street-Commerce / Chai-Counter`
* City Scope: Mumbai treatment on a shared structural family
* City-skin Treatment Strength: Strong
* Gameplay Tier: `Tier 4 — Passive Environmental Asset`
* Owner/Workflow Stage: Manual pilot — validated; candidate refinement pending
* Creation Date: `2026-08-04`
* Last Revised Date: `2026-08-12`
* Pilot Validation: Validated on `2026-08-05`
* Final Asset Approval: Pending
* Production Integration: Not Started
* Gameplay Integration: Not Started
* Source Authority References: Art Bible 1.0 Frozen; Prompt Bible 1.0 Frozen;
  Mumbai City Kit 1.0 Frozen; Technical Asset Contract; Production Asset Brief
  Framework 1.2 Frozen; naming convention and metadata schema listed below

### B. Authority References

* Art Bible: Version 1.0, Frozen — Chapters 3–8; especially Camera &
  Composition, Edge Architecture, Gameplay Objects Readability, Style & Shape
  Language, and Colour & Contrast Language
* Prompt Bible Category Module: Version 1.0, Frozen — Section 7.1,
  Environmental Props Prompt Module; Section 7.2, Modular Micro-Clusters Prompt
  Module; City-skin Framework; Day/Night Modules; Reference-image Protocol; and
  Prompt Metadata & Versioning
* City Kit: `CITY_KITS.md` Version 1.1, Mumbai Kit Version 1.0 Frozen — Dense
  Layered Street Commerce primary pillar, with supporting material-response cues
  from Monsoon-Worn Urban Surfaces and Mixed-Age Practical Architecture
* Technical Asset Contract: current repository contract, Sections 1–8;
  especially runtime capability, visual edge bleed, scale, day/night, supported
  transformations, delivery format, validators, and in-game approval gate
* Supporting Specification: `NAMING_CONVENTIONS.md`, `ASSET_METADATA.md`,
  `assets/metadata/asset.schema.json`, and `assets/art_manifest.json`
* High-risk Rules Restated: passive Tier 4 role; protected road; isolated real
  alpha; mobile-readable silhouette; correct high bird's-eye camera; no baked
  road, pavement, frontage, people, readable text, brand, complete scene,
  gameplay-category resemblance, baked shadow, or glow halo
* Conflict/Escalation Notes: exact prop canvas dimensions, safe padding, pivot
  coordinates, placement weight, minimum spacing, final export path, and import
  target require technical review because the Technical Asset Contract does not
  freeze asset-specific values for this family. The metadata schema gap recorded
  in Section J also requires review before generation or export.

The hierarchy is binding:

```text
Art Bible → Prompt Bible → City Kit → Technical Asset Contract
→ Production Asset Brief Framework → This Pilot Brief
→ Derived Generation Prompt → Generated Candidate → Review Result
```

The brief may operationalize but never weaken a higher authority. A generated
image is evidence only and never becomes creative authority.

### C. Asset Purpose

* Asset Definition: one tightly related modular compact chai-counter and
  stall-component family built on a shared base, with exactly two structural
  variants and a bounded attachment pool
* Production Reason: prove the manual brief-to-candidate workflow on a low-risk,
  recognizable Mumbai environmental family that exercises city skin,
  modularity, transparent export, bounds, pivots, metadata, day/night reuse, and
  procedural edge placement
* Environmental or Gameplay Function: quiet, passive evidence of ordinary
  neighbourhood street commerce in shallow non-playable Mumbai edge zones
* Reuse Classification: shared structural family with a strong Mumbai
  material/detail layer; not fully Mumbai-exclusive
* Intended Production Outcome: an isolated controlled asset family containing
  two assembled presentation variants and selected separable components
* Explicit Non-goals: all Mumbai food stalls, a street-commerce catalogue, full
  market, complete tea shop, kiosk, architecture, shopfront, complete edge strip,
  baked micro-scene, unrelated prop catalogue, gameplay object, image generation,
  final asset export, runtime integration, or LangGraph automation

### D. Gameplay Role & Safety

* Gameplay Relevance: decorative environmental support only
* Gameplay Tier: `Tier 4 — Passive Environmental Asset`, visually quieter than
  the player, enemies, attacks, projectiles, hazards, pickups, rewards, and
  critical World-space UI
* Placement Zone: shallow non-playable Mumbai left or right edge zones, outside
  the protected playable road; usable alone or as a micro-cluster anchor
* Interaction State: non-interactive, non-collectible, non-destructible unless
  separately defined by future gameplay documentation, and never a hazard,
  enemy, attack, pickup, interactable station, or objective
* Category Recognition Requirements: a compact rectangular serving counter is
  the primary anchor; kettle, controlled cups, jars, cloth, or containers may
  imply practical chai service without a person or scene
* Prohibited Category Resemblance: pickup, reward, hazard, enemy, attack,
  projectile, spawn marker, movement path, interactable machine or station,
  objective marker, UI icon, UI button, or gameplay instruction
* Readability Priority: first the passive counter silhouette and broad top/front
  relationship; second the difference between plain and shallow-awning variants;
  third two to four subordinate attachment forms
* Protected Gameplay Characteristics: passive meaning, Tier 4 priority,
  non-road placement, compact footprint, quiet scale and contrast, no collision
  promise, no ownership/danger/rarity/timing/state cues, and no colour-only
  critical communication

### E. Asset-family Scope

* Base Asset: one shared compact rectangular chai-counter base with a clear top
  surface, front-facing supporting structure, softened edges, and no enclosure,
  architecture, shopfront, road, pavement, or neighbouring prop
* Included Variants: exactly `Variant A — Plain Compact Counter` and `Variant B
  — Compact Counter with Shallow Awning Frame`; Mumbai material/detail layer;
  controlled day/night treatment; one optional restrained monsoon-response
  treatment; approved attachments; runtime placement/orientation instances
* Excluded Variants: additional counter structures, full enclosed kiosk,
  complete stall or shop, rear frontage, food display, cooking scene, market,
  people, seating scene, unrelated counter, unrelated food-stall catalogue, or
  complete edge composition
* Shared Structure: layered rectangular construction, broad readable masses,
  clear counter anchor, recognizable top/front relationship, stable footprint,
  attachment logic, and the global rounded-form grammar
* City Material/Detail Layer: lightly weathered practical Mumbai painted metal,
  restrained wood and metal fixtures, limited tarp/fabric, maintained containers,
  restrained commercial arrangement, and one approved urban accent
* Time-of-day Treatment: one structural asset reused for day and night; night is
  a controlled palette/material response with an optional separable practical
  light, never a structural redesign or separately painted scene pair
* Runtime Instance Logic: select one approved structure, its Mumbai layer, two
  to four visible attachments, an approved time treatment, optional restrained
  monsoon response, and a permitted orientation; place asymmetrically with
  procedural spacing, breathing gaps, predictable bounds, and crop-safe edge use
* Family Boundary Rationale: both structures share the same counter base,
  passive role, recognition grammar, scale logic, attachment system, technical
  output, and Mumbai treatment; the shallow awning is a bounded structural
  extension rather than a separate stall family

The frozen production hierarchy is:

```text
Shared Chai-Counter Base
→ Controlled Structural Variant
→ Mumbai Material/Detail Layer
→ Time-of-Day Treatment
→ Runtime Instance
```

#### Authorized structural variants

1. **Variant A — Plain Compact Counter:** compact rectangular counter, no full
   enclosure, architecture, or rear shopfront; clear top surface; restrained
   commercial silhouette; valid alone or as a micro-cluster anchor.
2. **Variant B — Compact Counter with Shallow Awning Frame:** the same core base
   with a shallow canopy, awning, or tarp-support frame. The frame stays
   lightweight, crop-safe, modular, and subordinate; the counter structure must
   remain visible. It must not become a kiosk or complete stall.

No third structural variant is authorized in Version 1.

This two-variant authorization applies only to Version 1 of the chai-counter
pilot and is intended to validate the production pipeline. It does not define or
limit the full Mumbai structure or asset catalogue. Broader Mumbai asset-family
generation begins only after this pilot has been generated, reviewed,
technically validated, and integrated.

#### Attachment and export model

Approved attachment pool:

* kettle
* controlled cup stack
* simplified jars
* crate
* hanging cloth
* small storage vessel
* optional restrained practical bulb or light fixture
* optional compact container

Every assembled variant uses **two to four visible attachments**. One counter
remains the anchor; attachments are subordinate broad forms, physically
supported, plausibly arranged, and never sufficient to create a complete scene.

Export roles are distinct:

* **Baked visual detail:** non-functional paint wear, simple seams, a minimal
  cloth fold, a few cup shapes, or an abstract sign panel that is not intended
  for independent reuse
* **Reusable attachment:** a meaningful separable kettle, crate, storage vessel,
  optional practical light fixture, or another structurally meaningful approved
  component confirmed during review
* **Runtime attachment:** a reusable attachment selected for supported runtime
  composition only after the segment-composer and attachment relationship pass
  technical review; runtime attachment is not promised by this brief
* **Assembled presentation variant:** a complete Plain Counter or
  Shallow-Awning Counter export with two to four approved visible attachments

Individual export is not required for every tiny cup or minor visual detail.

### F. City Identity

* Applicable City: Mumbai
* Supported Identity Pillar: Dense Layered Street Commerce, primary; secondary
  support from Monsoon-Worn Urban Surfaces and Mixed-Age Practical Architecture
  only where material and practical-construction cues apply
* Approved City Cues: compact commercial counter, shallow awning/tarp support,
  practical serving vessels, controlled container arrangement, faded paint,
  quiet wear, maintained construction, and an abstract signboard block
* Treatment Strength: Strong environmental treatment on a shared structure
* Material Cues: lightly weathered painted metal, restrained wood, simple metal
  fixtures, limited tarpaulin/fabric, weathered practical containers; optional
  simplified stainless-steel-like kettle, simplified glass jars, stylized plastic
  or metal storage, and approved crate treatment
* Architecture/Object-language Cues: layered rectangles, softened corners,
  rounded vessels, shallow support frame, practical repair/construction logic,
  compact horizontal counter mass, and deliberate attachment spacing
* Prohibited Stereotypes/Misuse: no Bollywood or celebrity imagery, slum
  caricature, poverty as identity, uncontrolled crowding, excessive grime,
  permanent rain/flooding, tourist-poster Mumbai, literal local-train reference,
  excessive black-and-yellow striping, or readable Hindi, Marathi, or English
* Mixed-city Contamination Exclusions: no Jaisalmer/Rajasthan sandstone, palace,
  desert, dune, royal, or ornate craft cues and no unrelated foreign-city
  materials, architecture, palettes, writing, religious/cultural symbols, or
  commercial forms

City recognition must use multiple cues—material, restrained colour, weathering,
attachments, awning/tarp treatment, arrangement, and practical construction—not
colour alone.

### G. Visual Specification

* Silhouette Intent: immediately readable compact passive counter; broad low
  rectangular anchor, recognizable top plane, and at most a lightweight shallow
  upper frame for Variant B
* Primary Shape Grammar: layered rectangular construction with softened edges
  and broad stable masses
* Secondary Shape Rhythm: rounded kettle, jars, vessels, or containers with
  restrained selective sharp accents for frame, handle, fixture, or tarp support
* Proportions: compact, chunky, mobile-readable, and world-native; Variant B's
  upper frame must not overpower or conceal the shared counter base
* Orientation: high bird's-eye, slight recognition-oriented perspective tilt;
  top surface and front-facing structure both readable
* Visual Weight: quiet Tier 4 environmental weight; clearly below gameplay and
  information assets
* Detail Budget: two to four meaningful visible attachments plus only the
  minimum internal cues needed for object/material recognition; no fragile tiny
  utensils or ornament
* Outline Treatment: controlled soft/light outlines, weaker than gameplay
  objects and strong enough only to preserve the broad silhouette
* Flat-fill/Shading Rules: clean flat-cartoon fills; at most one darker shade per
  material region where recognition requires it; no gradient, painterly,
  volumetric, glossy, photoreal, or unsupported 3D-rendered treatment
* Material Hierarchy: lightly weathered painted metal first; restrained wood,
  fixtures, tarp/fabric, and practical containers second; kettle/jars/light as
  controlled accents
* Palette Role: environmental world colour only, never gameplay or information
  ownership
* Accent-colour Limits: one dominant restrained accent per assembled variant,
  selected from faded teal, muted green, or restrained red; saturated colour is
  scarce. Supporting warm concrete grey, dusty beige, metal grey, muted brown,
  and limited controlled yellow stay subordinate.
* Lighting Behaviour: no baked drop shadow or glow halo. The engine supplies
  contact shadows and additive lamp pools. An approved practical-light overlay
  remains separable.
* Day/Night Behaviour: same geometry and structural asset; night permits one
  restrained warm practical bulb, a small local material response, and controlled
  visibility support without neon, bloom, large spill, or atmosphere
* Mobile Gameplay-scale Readability: counter category, base silhouette, and
  structural variant must remain recognizable at target running-game scale next
  to the courier before attachment detail is considered
* High Bird's-eye Camera Compatibility: high bird's-eye view with a slight tilt
  only for recognition; no eye-level, side elevation, dramatic isometric,
  cinematic, low-angle, or destructively strict flat top-down view

Material condition is **lightly weathered, hygienic, and fully functional**:
used, practical, maintained, and lived-in—not pristine luxury-modern, heavily
rusted, broken, filthy, unsafe, abandoned, or poverty-coded.

Signage is limited to one small abstract signboard shape with no readable or
pseudo-readable content, identifiable language, letters, numbers, pricing,
shop name, logo, brand, trademark, real tea brand, political message, or
religious message. No character or human body part is permitted. Activity is
implied only through approved objects and their practical arrangement.

### H. Camera, Runtime Placement Geometry & Modularity

* Camera Orientation: Masala Run high bird's-eye world camera with slight
  perspective tilt for top/front recognition. This controls illustration only
  and does not determine world-facing placement.
* Runtime Orientation: the serving edge faces the playable road. The primary
  structural mass, storage volume, awning depth, supports, and attachments
  extend away from the playable corridor into the non-playable edge.
* Edge Orientation Class: `Class C — Dedicated Left and Right Masters Required`
* Road-facing Edge: the accessible serving edge and readable counter face
* City-facing Edge: the rear/storage edge, awning depth, structural supports,
  and outward attachment volume
* Runtime Depth Direction: from the road-facing serving edge outward through
  the non-playable edge prop zone toward the edge decoration/building zones
* Maximum Playable Intrusion: the physical footprint remains clear of the road;
  visual road-facing depth must pass `ρ × declaredMaximumRuntimeHeight <= 8 px`
  and records the preferred `5.6 px` result separately
* Placement Footprint: one compact rectangular counter envelope contained in
  the Interactive Edge Prop Zone; rear crop-safe decoration may approach the
  Edge Decoration Zone, but the family may not occupy the Safety Buffer,
  Playable Road, or Building Zone
* Recommended Pivot Edge: the honest road-facing ground-contact footprint edge;
  normalized pivot percentage is diagnostic only and the pivot must not be moved
  artificially to make the geometry pass
* Left/Right Applicability: dedicated Left-Edge and Right-Edge masters shall be
  authored for every official candidate. They preserve the same structure,
  scale, attachment count, and city treatment while reversing world-facing
  placement correctly.
* Pivot Expectations: stable edge-facing ground-contact anchor; exact `x`/`y`
  coordinates require technical review against each final transparent canvas
  and the edge-placement composer
* Cropping Tolerance: tolerate crop only on the outer city-facing rear region;
  the serving edge, counter anchor, primary supports, and required attachment
  logic remain fully visible. Each asset exports complete without clipping.
* Placement Zone: the left or right Interactive Edge Prop Zone only, outside the
  safety buffer, 84% collision lane, and protected playable road
* Edge Depth: one compact counter-depth envelope measured away from the road;
  awning, storage, supports, and attachments remain within that same declared
  envelope and do not project toward the road
* Crop-safe Region: the outer city-facing rear margin and non-essential rear
  decoration only; the service side and structural recognition region are not
  crop-safe
* Overlap Allowance: approved attachments may overlap within their own master;
  neighbouring decoration may overlap only the city-facing crop-safe margin.
  No overlap may enter the safety buffer, playable road, gameplay objects,
  essential UI, serving edge, or primary silhouette.
* Procedural Spacing: preserve at least one clear breathing gap between complete
  counter silhouettes and do not place two chai counters in immediately adjacent
  slots. Repetition control, stable bounds, and independence from permanent
  neighbours are mandatory.
* Attachment Points: top-surface service zone; side storage zone; optional
  shallow-frame hanging point; optional light-fixture point. Exact coordinates
  and runtime support require technical review.
* Rotation Permission: prohibited; the current entity pipeline cannot rotate
  sprites
* Mirroring Permission: runtime mirroring prohibited. Dedicated Left-Edge and
  Right-Edge masters are authored and measured independently even though the
  numeric geometry limits are symmetric.
* Baked-composition Restrictions: no road, footpath, pavement, wall, frontage,
  customers, vendor, architecture, neighbouring props, background, edge strip,
  market, shop, environmental lighting pool, or complete tea-stall scene

Beauty-shot compositions that project the primary depth of the counter or stall
into the playable road are prohibited.

Functional top-down placement diagram:

```text
LEFT EDGE
Building | Edge Decoration | Interactive Edge Prop          | Safety | Playable Road
                             rear/storage ← depth ← SERVICE

RIGHT EDGE
Playable Road | Safety |          Interactive Edge Prop | Edge Decoration | Building
                         SERVICE → depth → rear/storage
```

#### Session 56 geometry-contract application

Every future tall chai-counter master declares the framework geometry fields and
is checked at both target and maximum runtime height. Right chai-counter V001 is
approved and is a strong road-facing-depth example under the current runtime. It
is not judged against a universal `cityFrac` band because none is frozen. No
existing approval or metadata status changes through this documentation update.

The service side faces the playable road on both edges. The rear/storage side
and runtime depth direction point away from the road toward their respective
city-facing outer edge. The safety buffers and playable road remain empty.

### I. Permitted Variants

* Structural Variation: exactly Variant A Plain Compact Counter and Variant B
  Compact Counter with Shallow Awning Frame
* Material Variation: bounded mix of the approved primary and optional
  supporting materials while the shared construction remains recognizable
* Controlled Wear: subtle light handling/weather wear only; maintained,
  hygienic, functional, and readable at gameplay scale
* City Skin: strong Mumbai material/detail layer on the shared family
* Day/Night Treatment: day base compatible with warm natural daylight; same
  structure at night with a restrained warm practical response and optional
  separable light fixture/overlay
* Orientation: dedicated Left-Edge and Right-Edge masters under the Class C
  rules in Section H; mirroring is a reviewed exception, never the production
  strategy
* Approved State Change: optional restrained monsoon-response treatment using
  subtle damp/dark material response, minor humidity response, or rain-protection
  tarp detail; it is never the default
* Accessibility Treatment: no separate visual variant required; low salience,
  category safety, and non-colour-dependent recognition remain invariant
* Gameplay State: none; the family is passive and non-interactive
* Invariants Across Variants: shared counter anchor and construction grammar,
  passive Tier 4 role, compact scale, camera, readable silhouette, Mumbai layer,
  transparent isolation, outside-road placement, two-to-four attachment rule,
  controlled palette, stable pivot/bounds, and no scene or category confusion

The monsoon-response treatment prohibits baked rainfall, flooding, standing
puddle, road water, permanently wet default materials, heavy grime, storm
atmosphere, reflection pool, or hazard ambiguity.

### J. Technical Output

* Technical Asset Contract Reference: current repository contract, Sections 1–8
* File Type/Colour Space: PNG with real thresholded alpha and no matte fringe;
  sRGB
* Transparency/Alpha: isolated transparent background with breathing space; no
  baked ground, contact shadow, drop shadow, or glow halo
* Dimensions/Resolution: target drawn height should remain in the calibrated
  environmental-prop range of 24–60 design px and may not exceed the courier's
  70 px drawn height because this family is not flagged `tall`; exact production
  canvas dimensions and delivery scale require technical review. Every single
  image remains at or below the contract's 1024×1024 maximum.
* Padding/Bounds: safe transparent padding, trim-safe real alpha, complete
  silhouette, predictable bounds, and outer-edge crop tolerance are required;
  exact padding values require technical review
* Pivot: stable bottom-center ground-contact origin is expected; exact metadata
  coordinates require technical review
* Orientation/Side Variants: dedicated Left-Edge and Right-Edge masters under
  Section H; no runtime rotation. A mirrored derivative is allowed only after
  attachment logic, structural believability, lighting, weathering, pivots, and
  placement geometry pass review.
* Naming: lowercase ASCII under `NAMING_CONVENTIONS.md` using
  `<city>_<category>_<subject>_<variant>_<lighting>_<size>_v###.<ext>`;
  `mumbai`, `prop`, `chai_counter`, controlled structure/component variant,
  `neutral`/`day`/`night` as approved, approved size token, and `v001`. Shared
  structural components use `global` only when exported without Mumbai skin.
* Metadata: validate against `assets/metadata/asset.schema.json`; required current
  fields are `id`, `city`, `category`, `dimensions`, `collision`,
  `placementWeight`, `placementRules`, `anchor`, `lightingCompatibility`,
  `biomeCompatibility`, and `tags`. Use category `prop`, city `mumbai` for
  skinned exports, `collision.type: none`, and `collision.solid: false`.
* Export Destination/Manifest: import through an approved `tools/import_art.py`
  target and record in `assets/art_manifest.json`; the final prop path/import
  target requires technical review because full modular edge-prop micro-cluster
  runtime support is not yet implemented
* Collision/Footprint Data: no collision; passive edge-only placement. Exact
  dimensions, placement weight, allowed/blocked zone tokens, minimum spacing,
  alignment, and anchor coordinates require technical review.
* Animation/Frame Requirements: none; static PNG. No baked animation or sprite
  sheet. A practical light is a separate runtime/overlay concern.
* Asset-specific Override: none

#### Export relationship and schema review

Every planned export must be traceable in the production record by: deterministic
asset name; shared family; base, assembled, or component role; attachment
identity where applicable; Mumbai city skin; day/night compatibility; optional
monsoon response; orientation; version; production status; and source brief ID
`PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1`.

The current metadata schema has no first-class fields for source brief ID,
family relationship, base/assembled/component role, attachment relationship,
monsoon-response state, orientation, or asset version. Its status enum also
does not directly mirror the Production Asset Brief statuses. `tags` and
`notes` may preserve some context, but cannot represent all relationships as
validated structured data. This is a **metadata capability gap requiring
technical review before final export and integration**. It does not prevent
generation or validation against the current naming and metadata requirements.
This brief does not change the schema or validators.

The Technical Asset Contract also records that edge prop micro-clusters need
engine work. This is an integration dependency, not a blocker for brief
approval, image generation, transparency testing, pivot and bounds validation,
naming and metadata validation, or preparation for controlled integration. No
runtime-attachment or integration promise is made until the segment composer
and placement fields are approved. Total decoded city imagery must remain
within the contract's approximately 32 MB budget. Final approval requires a
screenshot in the running corridor at target scale beside the courier; an
image-viewer or document review is insufficient.

### K. Negative Constraints

1. **Global Negatives:** no realism, photorealism, painterly rendering,
   unsupported 3D appearance, complete scene, full background, decorative
   clutter, readable or pseudo-readable text, logos, trademarks, literal
   landmark, stereotype, mixed-city contamination, gameplay-category confusion,
   colour-only critical communication, or generated-output authority.
2. **Category Negatives:** no pickup appearance, reward glow, hazard boundary,
   enemy silhouette, attack telegraph, projectile, interactable-machine or
   station treatment, objective marker, spawn marker, movement path, UI form,
   excessive contrast, gameplay-owned colour treatment, animation baked into a
   static prop, road occupancy, moving vehicle, duplicate/fused object group,
   accidental clipping, unwanted shadow/glow pool, or procedural-unsafe
   composition.
3. **Mumbai-specific Negatives:** no Bollywood or celebrity imagery, slum
   caricature, poverty as identity, uncontrolled crowding, excessive grime,
   permanent rain, flooding, default wet road, excessive black-and-yellow
   striping, literal local-train reference, tourist-poster or neon-cinematic
   Mumbai, Jaisalmer/Rajasthan cue, or foreign-city cue.
4. **Asset-specific Negatives:** no full enclosed kiosk, complete tea shop,
   vendor, customer, person, body part, benches with people, large food display,
   cooking scene, multiple unrelated counters, overfilled utensils, fragile tiny
   detail, giant signboard, branded kettle/packaging, large night glow, baked
   road/pavement/footpath/frontage/wall/neighbour, unrelated food-stall catalogue,
   permanent neighbouring prop, or full market composition.

### L. Reference-image Usage

Reference inventory for Version 1: **none attached**. Do not source random
internet imagery or copied brand material. Every future reference must be
reviewed and entered before use with all fields below:

| Reference ID | Reason for inclusion | May borrow | Must not copy | Reference type |
|---|---|---|---|---|
| Required stable identifier | Asset-specific production reason | Explicit bounded structure, material, palette, or mood qualities | Branding, text, people, complete composition, distinctive protected design, stereotypes, or any unapproved carryover | Exactly one of structure, material, palette, or mood |

References provide supporting evidence only. They cannot override this brief or
any higher authority, and the derived prompt must name each used reference and
its permitted purpose.

### M. Derived Generation Prompt

* Prompt Version/ID: `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-PROMPT-V3`, draft for
  future shortlisted-candidate refinement; not used or validated in Session 41
* Source Brief ID/Version: `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1` / `1.1`
* Model/Pipeline Target: model-neutral manual production; the Session 41
  generation model was not recorded in the supplied production evidence
* Final Model-facing Prompt:

```text
ASSET PURPOSE
Create one isolated asset-family candidate from the shared compact chai-counter
family for Masala Run. Produce only the requested assembled counter candidate,
not a scene, catalogue, shop, market, edge strip, or unrelated prop group.

CONTROLLED CANDIDATE FIELDS
Candidate ID: [CANDIDATE_ID]
Structural variant: [PLAIN_COMPACT_COUNTER or SHALLOW_AWNING_COUNTER]
Edge master: [LEFT_EDGE_MASTER or RIGHT_EDGE_MASTER]
Dominant restrained accent: [FADED_TEAL, RESTRAINED_RED, or MUTED_GREEN]
Visible attachments: [TWO_TO_FOUR_ITEMS_FROM_APPROVED_POOL]
Wear level: [LIGHT_MAINTAINED]
Monsoon response: [NONE or RESTRAINED_OPTIONAL_RESPONSE]
Presentation treatment: [DAY_PALETTE_COMPATIBLE_BASE]

GAMEPLAY ROLE
This is a decorative, non-interactive environmental prop for procedural placement
inside a shallow non-playable Mumbai left or right edge zone, outside the
protected playable road. It is not collectible, destructible, hazardous,
hostile, actionable, or objective-bearing.

TIER
Tier 4 passive environmental priority. Keep it visibly quieter than the player,
enemies, attacks, projectiles, hazards, pickups, rewards, and critical World-space
UI. It must not resemble any gameplay-active category.

VISUAL RULES
Use the shared compact rectangular counter base with layered rectangular
construction, softened edges, broad readable masses, rounded vessels, and only
restrained selective sharp accents for frames, handles, fixtures, or tarp support.
Use clean flat-cartoon rendering, flat fills, controlled light outlines, at most
one darker shade per material region where recognition requires it, moderate
mobile-readable detail, and a simple silhouette. The top surface and front-facing
counter structure must both read from Masala Run's high bird's-eye camera with a
slight recognition-oriented perspective tilt. For SHALLOW_AWNING_COUNTER, add
only a shallow lightweight canopy/tarp-support frame; preserve visible counter
structure and do not create a kiosk or complete stall.

Use exactly two to four visible attachments from: kettle, controlled cup stack,
simplified jars, crate, hanging cloth, small storage vessel, optional restrained
practical bulb/light fixture, optional compact container. Keep one counter as the
clear anchor. Keep every attachment subordinate, broad, physically supported,
plausibly placed, uncluttered, and separable where structurally meaningful.

RUNTIME PLACEMENT GEOMETRY
Treat camera orientation and runtime orientation as separate requirements. Draw
the declared dedicated LEFT_EDGE_MASTER or RIGHT_EDGE_MASTER from the approved
high bird's-eye camera. The serving edge and readable counter face shall face the
playable road. Extend the primary structural mass, storage volume, awning depth,
supports, and attachments away from the playable corridor into the non-playable
edge. Keep the entire opaque silhouette and implied footprint outside the safety
buffer and playable road. Place the ground-contact pivot at the centre of the
road-facing service edge. Permit crop only in the non-essential city-facing rear
margin. Do not create a beauty-shot composition whose primary stall depth
projects into the playable road.

CITY SKIN
Apply a strong but restrained Mumbai environmental material/detail layer to the
shared family. Use lightly weathered painted metal, restrained wood, simple metal
fixtures, limited tarpaulin/fabric, and weathered practical containers. The
condition is used, hygienic, fully functional, maintained, and lived-in. Use warm
weathered neutrals with the declared single restrained urban accent. Supporting
tones may be warm concrete grey, dusty beige, restrained metal grey, muted brown,
and limited controlled yellow. Establish everyday Dense Layered Street Commerce
through multiple cues—material, wear, attachment arrangement, awning/tarp logic,
and practical construction—not colour alone. Permit at most one small abstract
signboard shape containing no text or pseudo-text.

DAY/NIGHT
Author one palette-compatible structural asset for warm natural Mumbai daylight
and reuse that exact structure at night. Do not bake environment-wide day or night
lighting, shadow pools, or atmosphere. If the selected attachment set includes a
practical bulb, keep it restrained and structurally suitable for a separable
runtime light treatment; do not render a glow halo. If RESTRAINED_OPTIONAL_RESPONSE
is selected, use only subtle dampened/darkened material response, minor humidity
response, or a controlled rain-protection tarp detail. Do not make monsoon the
default or add rain, standing water, puddles, flooding, buckets, wet road, storm
atmosphere, heavy grime, environmental scene dressing, or reflections.

ISOLATION
Return one complete isolated assembled counter candidate on a transparent
background with real clean alpha and safe breathing space. Keep the silhouette
complete, bounds predictable, and ground-contact anchor clear. Include no person,
body part, vendor, customer, crowd, road, pavement, footpath, floor, frontage,
wall, architecture, neighbour, background, ground patch, baked contact shadow,
drop shadow, glow pool, full scene, decorative environment, surrounding building,
presentation sheet, showcase composition, or beauty-shot layout. Return the
asset only; preserve transparent background through final production export.

TECHNICAL OUTPUT
Follow the current Masala Run Technical Asset Contract and its naming, metadata,
scale, alpha, bounds, orientation, and validator requirements. Output PNG in sRGB
with real alpha and no matte fringe. Keep the prop within the environmental scale
law: target 24–60 design-pixel drawn height and never above 70 design pixels.
Do not rotate. Preserve the Class C dedicated Left-Edge and Right-Edge master
requirement. Mirroring may be accepted only when attachment logic, structural
believability, lighting, and weathering remain correct, and never as a substitute
for authoring both masters. Preserve the service edge, structural recognition
region, and road-facing pivot; exact canvas, padding, pivot coordinates, output
size, and export path remain held for technical review rather than invented here.

NEGATIVE CONSTRAINTS
No realism, photorealism, painterly rendering, glossy product rendering, complex
machinery, fragile thin structure, ornate decoration, excessive tiny utensils,
decorative clutter, complete scene, full background, full kiosk, tea shop,
shopfront, market, multiple counter family, readable Hindi/Marathi/English,
letters, numbers, pricing, shop name, logo, trademark, brand, branded packaging,
political/religious message, person or body part, landmark, stereotype, Bollywood
or celebrity image, slum caricature, poverty coding, excessive grime, permanent
rain, flood, wet default, black-and-yellow excess, literal local train,
Jaisalmer/Rajasthan cue, foreign-city cue, pickup appearance, reward glow, hazard
boundary, enemy silhouette, attack/projectile/telegraph, interactable-machine
treatment, objective marker, UI, gameplay-owned colour, excessive contrast or
saturation, neon, bloom, large night glow, baked animation, road occupancy,
accidental clipping, floating attachment, implausible attachment, or unapproved
variant.

ACCEPTANCE CRITERIA
The candidate must immediately read at mobile gameplay scale as one passive compact
chai counter; match the declared structural variant while belonging to the same
shared family; preserve one clear counter anchor and two to four subordinate
attachments; remain unmistakably non-gameplay; carry restrained multi-cue Mumbai
identity without stereotype; match the high bird's-eye camera and flat-cartoon
style; export as a complete clean-alpha modular prop with usable bounds/pivot
expectation; remain suitable for outside-road procedural edge placement and
the Class C dedicated-master geometry; keep the service side road-facing and all
primary depth outside the safety buffer and playable road; and comply with the
Art Bible, Prompt Bible, Mumbai City Kit, this brief, and the Technical Asset
Contract.
```

Controlled fields may select only the values declared above. They are not
permission for generator improvisation. This prompt remains subordinate to the
brief. Version 3 records the required future prompt reinforcement for
shortlisted-candidate work and subsequent environmental-prop generation. It was
not used to produce or validate the Session 41 outputs and is not an approved
asset result.

### N. Candidate-generation Plan

#### Pilot Evaluation Outputs

* Classification: Pilot Evaluation Outputs
* Official Candidate Identifiers: None assigned
* Outcome: Runtime Placement Specification Gap Identified
* Reason: The pilot successfully exposed an under-specified production rule
  before production-scale asset generation.
* Disposition: visually promising pre-production evaluation evidence only; not
  official production candidates, approved assets, or integration inputs
* Follow-up: the first official Candidate 1–4 batch was generated after this
  runtime-placement refinement and is recorded separately below

#### Official candidate plan

* Candidate Count: `4` official candidates, generated
* Count Override and Justification: none
* Generation Model/Pipeline: not recorded in the supplied Session 41 production
  evidence
* Seed Strategy: seed values and deterministic support were not recorded in the
  supplied Session 41 production evidence
* Controlled Prompt Fields: camera orientation, Class C runtime orientation,
  road-facing service edge, city-facing depth, placement envelope, style, asset
  category, passive Tier 4 role, shared base grammar, Mumbai treatment, scale
  law, transparent isolation, technical output rules, negative constraints,
  category-safety rules, and two-to-four attachment limit
* Variable Prompt Fields: structural variant, approved accent, approved
  two-to-four attachment combination, subtle wear within the fixed maintained
  condition, and optional restrained monsoon-response detail
* Output Destination: candidate output locations were not recorded in the
  supplied Session 41 production evidence; no candidate asset was added to the
  repository by this documentation update
* Candidate Naming: `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C01` through `C04`, with
  final asset filenames derived only after selection and technical review

Exactly four controlled official candidates were generated:

| Candidate ID | Structural variant | Accent | Monsoon response | Attachment selection |
|---|---|---|---|---|
| `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C01` | Plain Compact Counter | Faded teal | None | Two to four approved attachments, recorded before generation |
| `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C02` | Plain Compact Counter | Restrained red | None | Two to four approved attachments, recorded before generation |
| `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C03` | Shallow-Awning Counter | Muted green | None | Two to four approved attachments, recorded before generation |
| `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C04` | Shallow-Awning Counter | One approved restrained accent consistent with the fixed palette | Restrained optional detail | Two to four approved attachments, recorded before generation |

All official candidates are palette-compatible day-base presentations of one
approved family. Session 41 validated the Class C left/right-master workflow for
the viable production directions, but the supplied record does not establish
that every candidate was delivered as a paired master set. Night reuses the
selected structure and is validated as a treatment, not generated as an
additional structural candidate. Official Candidate 1–4 generation is complete.

#### Session 41 candidate review

Evidence basis: the supplied Session 41 production review. Candidate image files,
generation logs, validator output, model details, seeds, and output locations are
not present in the repository record, so the classifications below record the
supplied findings rather than an independent file-level or visual revalidation.

| Candidate ID | Result | Evidence and disposition | Failure classification |
|---|---|---|---|
| `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C01` | Rejected | Generated a complete scene and background instead of an isolated asset; runtime orientation was incorrect; unsuitable for production. | `MODULARITY_FAILURE`, `TRANSPARENCY_OR_EXPORT_FAILURE`, `PROCEDURAL_PLACEMENT_FAILURE`, `CAMERA_OR_PERSPECTIVE_FAILURE` |
| `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C02` | Shortlisted | Strongest plain-counter silhouette, good gameplay readability, appropriate attachment hierarchy, suitable production base, and runtime-placement compatibility. Preserve transparent-background isolation in final refinement/export. | None at shortlist stage |
| `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C03` | Rejected | Weaker overall composition than Candidate 4 and less convincing family direction; not selected for refinement. | `OTHER_DOCUMENTED_FAILURE` — comparative shortlist rejection; no specific compliance failure was supplied |
| `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C04` | Shortlisted | Strongest awning proportions, convincing structural family, appealing canopy treatment, and suitable production direction. Refine with restrained dampness/material response only; prohibit standing water, puddles, flooding, buckets, excessive grime, heavy storm treatment, and environmental scene dressing. | None at shortlist stage; prompt-only refinement required |

Candidates 2 and 4 are preferred directions, not approved production assets.
No selected final candidate exists.

#### Runtime and workflow validation outcome

Session 41 validated the isolated-asset workflow, runtime edge placement,
road-facing serving direction, city-edge depth direction, dedicated left/right
masters, production placement geometry, attachment hierarchy, and silhouette
readability. The runtime-placement refinements introduced in Session 40 worked
as intended across the viable production directions.

The production pipeline is validated with no production blocker remaining.
Future environmental-prop prompts must always request an isolated transparent
asset with no baked environment, road, pavement, frontage, surrounding
buildings, presentation sheet, or showcase composition. They must reinforce the
road-facing service side, city-facing structural depth, and dedicated left/right
masters where the declared orientation class requires them.

### O. Acceptance Criteria

Review in this fixed order:

1. **Gameplay and category safety:** immediately reads as a passive compact chai
   counter; cannot be mistaken for pickup, reward, hazard, enemy, attack,
   projectile, interactable station, objective, or UI; remains quiet Tier 4 and
   outside the protected playable road.
2. **Silhouette and recognition:** counter anchor, top/front relationship, and
   declared plain or shallow-awning structure read at mobile gameplay scale;
   both variants visibly belong to one family; two to four attachments remain
   subordinate and do not obscure the anchor.
3. **Technical compliance:** isolated sRGB PNG uses clean real alpha, complete
   trim-safe silhouette, usable padding/bounds and pivot, approved scale,
   separate approved camera and runtime orientations, valid deterministic naming
   and metadata, traceable component/assembled relationships, and all applicable
   Technical Asset Contract requirements and validators.
4. **Modularity and procedural usability:** assembled variants and meaningful
   reusable components remain traceable; standalone and micro-cluster-anchor use
   are feasible; both Class C masters keep the serving edge road-facing and all
   primary depth city-facing; zero playable intrusion, crop, overlap, spacing,
   breathing gaps, pivots, stable bounds, and outside-road placement work without
   baked road, pavement, frontage, neighbour, or full scene.
5. **Mumbai identity:** multiple restrained approved cues support Dense Layered
   Street Commerce; material condition is maintained and lightly weathered;
   one accent stays controlled; no readable text, brand, stereotype, mixed-city
   cue, excessive grime, or default monsoon state appears.
6. **Global style consistency:** broad softened masses, rounded vessels,
   selective structural accents, clean flat fills, at most one darker shade per
   material region, controlled outline, moderate detail, correct high bird's-eye
   camera, and the same day/night structure match Masala Run.
7. **Charm and polish:** practical object arrangement and restrained asymmetry
   feel lived-in, maintained, and appealing only after every higher-priority
   requirement passes; beauty alone is insufficient.

Approval additionally requires the selected asset to pass running-game review at
target scale beside the courier. Brief review alone cannot approve a candidate.

### P. Rejection Triggers

| Observable rejection trigger | Frozen failure code(s) |
|---|---|
| Gameplay-category confusion | `CATEGORY_RECOGNITION_FAILURE`, `GAMEPLAY_READABILITY_FAILURE` |
| Excessive visual salience, contrast, saturation, or gameplay-owned colour | `GAMEPLAY_READABILITY_FAILURE`, `STYLE_LANGUAGE_FAILURE` |
| Wrong camera, perspective, or orientation | `CAMERA_OR_PERSPECTIVE_FAILURE` |
| Serving edge faces away from the road, primary depth projects toward the playable corridor, or a required side master is missing | `PROCEDURAL_PLACEMENT_FAILURE`, `CAMERA_OR_PERSPECTIVE_FAILURE`, `PIVOT_OR_BOUNDS_FAILURE` |
| Wrong, family-breaking, or unreadable silhouette | `SILHOUETTE_FAILURE`, `GAMEPLAY_READABILITY_FAILURE` |
| Complete-scene, full kiosk/shopfront, road, pavement, frontage, background, or baked-neighbour generation | `MODULARITY_FAILURE`, `PROCEDURAL_PLACEMENT_FAILURE`, `CREATIVE_AUTHORITY_CONFLICT` |
| Attachment clutter, excessive detail, fragile detail, or hidden counter anchor | `STYLE_LANGUAGE_FAILURE`, `GAMEPLAY_READABILITY_FAILURE`, `MODULARITY_FAILURE` |
| Broken transparency, matte fringe, invalid file, or invalid export | `TRANSPARENCY_OR_EXPORT_FAILURE`, `TECHNICAL_CONTRACT_FAILURE` |
| Unusable bounds, crop, padding, or pivot | `PIVOT_OR_BOUNDS_FAILURE` |
| Mumbai stereotype, poverty coding, tourist treatment, or other misuse | `STEREOTYPE_OR_MISUSE` |
| Mixed-city, Jaisalmer/Rajasthan, or foreign-city contamination | `MIXED_CITY_CONTAMINATION` |
| Excessive grime, saturation, permanent wet treatment, flood/puddle, neon, large night glow, or structural night redesign | `CITY_IDENTITY_FAILURE`, `DAY_NIGHT_TREATMENT_FAILURE`, `STYLE_LANGUAGE_FAILURE` |
| Uncontrolled structure, attachment, colour, wear, monsoon, orientation, or other variant | `UNCONTROLLED_VARIANT` |
| Naming failure, metadata validation failure, or required traceability failure | `TRANSPARENCY_OR_EXPORT_FAILURE`, `TECHNICAL_CONTRACT_FAILURE` |
| Any Technical Asset Contract contradiction | `TECHNICAL_CONTRACT_FAILURE` |
| Modularity, standalone reuse, component separation, or assembly failure | `MODULARITY_FAILURE` |
| Procedural spacing, overlap, edge crop, dependency, or outside-road placement failure | `PROCEDURAL_PLACEMENT_FAILURE` |
| Reference copies prohibited content or overrides authority | `REFERENCE_OVERFIT`, `CREATIVE_AUTHORITY_CONFLICT` |
| Derived prompt omits, conflicts on, or ambiguously exposes a required field | `PROMPT_AMBIGUITY` |
| Readable text, logo, brand, person, category-active cue, or any other higher-authority contradiction | `CREATIVE_AUTHORITY_CONFLICT` plus the most specific applicable code |

Every rejection records affected candidate IDs, observable evidence, required
correction, and one or more codes from the frozen taxonomy. An unrepresented
evidence-backed issue uses `OTHER_DOCUMENTED_FAILURE` with an explanation.

### Q. Review Record

* Reviewer: Masala Run Production Review
* Review Date: `2026-08-05`
* Review Stage: Official candidate generation validation
* Candidate Identifiers: `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-C01` through `C04`
* Result: Partial — Candidates 2 and 4 shortlisted; Candidates 1 and 3 rejected
* Failure Codes: Candidate 1 — `MODULARITY_FAILURE`,
  `TRANSPARENCY_OR_EXPORT_FAILURE`, `PROCEDURAL_PLACEMENT_FAILURE`,
  `CAMERA_OR_PERSPECTIVE_FAILURE`; Candidate 3 —
  `OTHER_DOCUMENTED_FAILURE` for comparative shortlist rejection with no
  supplied specific compliance failure; shortlisted candidates — none at
  shortlist stage
* Evidence: Candidate 1 produced a complete background scene with incorrect
  runtime orientation. Candidate 2 provided the strongest readable plain-counter
  direction. Candidate 3 was compositionally weaker and less convincing as the
  awning-family direction. Candidate 4 provided the strongest awning proportions
  and canopy treatment. Viable outputs confirmed the runtime geometry and
  dedicated-master workflow.
* Required Corrections: preserve fully isolated transparent export for Candidate
  2 refinement; restrict Candidate 4 refinement to subtle dampness and material
  response with no standing water, puddles, flooding, buckets, excessive grime,
  heavy storm treatment, or environmental scene dressing
* Brief Revision Required: No
* Prompt-only Revision Allowed After Candidate Generation: Yes — future
  reinforcement is recorded in draft
  `PAB-MUMBAI-ENVPROP-CHAI-COUNTER-V1-PROMPT-V3`; no use or validation is claimed
* Selected Candidate: None — Candidates 2 and 4 are shortlisted pending refinement
* Final Approval Note: The pilot validated the production pipeline and runtime
  placement rules. No visual asset is approved for production or integration.

### R. Revision History

| Version | Date | Changed section | Reason | Evidence/failure addressed | Approver |
|---|---|---|---|---|---|
| `1.0` | `2026-08-04` | Initial A–R pilot brief | Freeze the initial Mumbai chai-counter / stall-component pilot specification for review | Session 38 frozen pilot decisions; no candidate evidence exists | Not recorded — pending review |
| `1.0` | `2026-08-04` | Status, roadmap, technical dependency, Q, and R | Approve the unchanged Version 1 pilot scope for controlled generation | Session 39 creative and technical brief review passed; generation has not started | Masala Run Production Review |
| `1.1` | `2026-08-05` | Framework 6/6.1/12/13; pilot A/H/I/J/M/N/O/P/Q/R | Define runtime placement geometry without changing the two-structure pilot scope | Pilot Evaluation Outputs identified a runtime placement specification gap before official candidate generation | Masala Run Production Review |
| `1.1` | `2026-08-05` | Framework validation status and roadmap; pilot A/M/N/Q/R | Record the first official four-candidate generation review and prompt-only production learnings | Session 41 shortlisted Candidates 2 and 4, rejected Candidates 1 and 3, validated runtime placement, and approved no final asset | Masala Run Production Review |
| `1.2` | `2026-08-12` | H/R and framework geometry fields | Apply the Session 56 parameterized hard-intrusion contract without changing asset approval status | Independently verified runtime formulas; right chai-counter V001 remains approved and no universal city-facing band is adopted | Masala Run Production Review |

## 15. Mumbai Environmental Props — Vada-Pav Cart Asset Family

This brief records Session 42 structural generation and Session 43 production
regeneration and orientation validation for one Mumbai environmental-prop
family. Session 43 approves the Candidate 1 and Candidate 4 production visual
directions and their dedicated left/right orientation logic. It does not certify
repository export, complete metadata, or authorize game integration.

### A. Brief Identity

* Brief ID: `PAB-MUMBAI-ENVPROP-VADA-PAV-CART-V1`
* Title: Mumbai Environmental Props — Vada-Pav Cart Asset Family
* Version: `1.1 / V1`
* Status: `Approved`
* Category: `Environmental Prop`
* Subcategory/Archetype: `Street-Commerce / Food Cart`
* City Scope: Mumbai
* City-skin Treatment Strength: Strong Mumbai Environmental Treatment
* Gameplay Tier: `Tier 4 — Passive Environmental Asset`
* Owner/Workflow Stage: approved production direction; repository export and
  controlled integration preparation
* Creation Date: `2026-08-05`
* Last Revised Date: `2026-08-12`
* Creative Production Direction: Approved for Candidate 1 and Candidate 4
* Runtime Orientation Validation: Passed for dedicated left/right directions
* Repository Export Validation: Pending — binary exports and final runtime path absent
* Naming Validation: Passed for the four planned filenames; binary-file check pending
* Metadata Validation: Schema structure passed for four disabled draft templates;
  binary-dependent production values pending
* Pivot and Bounds Validation: Pending
* Runtime Integration: Not Started
* Gameplay Integration: Not Started
* Source Authority References: frozen Art Bible; frozen Prompt Bible; frozen
  Mumbai City Kit; current Technical Asset Contract; frozen Production Asset
  Brief Framework; applicable naming and metadata specifications

`Approved` is scoped to the two production visual directions and their Class C
left/right orientation logic under the current creative and production review.
It does not mean repository export validation, metadata completion, controlled
runtime integration, or gameplay integration has passed.

### B. Authority References

* Art Bible: Version 1.0, Frozen; applicable environment, gameplay hierarchy,
  modularity, camera, shape, colour, and readability rules
* Prompt Bible: Version 1.0, Frozen; Environmental Props, Modular
  Micro-Clusters, Mumbai city-skin, day/night, isolation, and negative modules
* City Kit: Mumbai Kit Version 1.0 Frozen; Dense Layered Street Commerce with
  restrained supporting practical-material and weather-response cues
* Technical Asset Contract: current repository contract; runtime capability,
  alpha, scale, bounds, pivots, transformations, delivery, and validation gates
* Production Asset Brief Framework: Version 1.2, Frozen and Validated; runtime
  placement geometry and Class C orientation rules
* Conflict/Escalation Notes: repository export, exact canvas and padding, pivot,
  bounds, naming, metadata, placement envelope, and running-game fit remain
  pending. Candidate 4's isolated transparency and split left/right files passed
  the supplied production review, but no repository filename or validator result
  is invented here.

The higher authorities remain unchanged. This brief operationalizes them for
the vada-pav cart family and does not reinterpret or weaken them.

### C. Asset Purpose

* Asset Definition: a modular family of compact, practical neighbourhood
  vada-pav food-cart structures for shallow Mumbai edge placement
* Production Reason: support Mumbai's **Dense Layered Street Commerce** pillar
  while testing meaningful structural diversity across a second environmental
  prop family
* Environmental Function: passive evidence of practical neighbourhood
  street-food commerce outside the playable road
* Reuse Classification: Mumbai-skinned modular environmental-prop family
* Intended Outcome: the accepted Candidate 1 and Candidate 4 directions as
  isolated single-cart assets with dedicated left/right masters
* Explicit Non-goals: complete food-stall scene, restaurant, full kiosk,
  marketplace, continuous edge strip, theme-park food prop, readable branded
  cart, technical-export completion, runtime integration, or broader Mumbai
  catalogue

### D. Gameplay Role & Safety

* Gameplay Relevance: decorative environmental support only
* Gameplay Tier: `Tier 4 — Passive Environmental Asset`
* Interaction State: non-interactive, non-collectible, and non-destructible
  unless separately defined by future gameplay documentation
* Prohibited Category Resemblance: hazard, enemy, attack, projectile, pickup,
  objective, interactable station, or critical world-space UI
* Visual Priority: quieter than the player, enemies, attacks, projectiles,
  hazards, pickups, and critical world-space UI
* Placement Zone: shallow non-playable Mumbai edge zones, modular
  micro-clusters, and procedurally controlled edge compositions outside the
  protected playable road
* Protected Characteristics: passive meaning, compact footprint, readable cart
  silhouette, road-facing service direction, city-facing structural depth, and
  no visual implication of gameplay interaction

### E. Asset-family Scope and Corrected Structural Plan

Palette variation alone is not valid candidate diversity. Every candidate must
be distinguishable through meaningful structure rather than only colour or
attachment swaps. Candidate batches vary silhouette, roof or shade structure,
body construction, cart depth, storage layout, attachment hierarchy,
service-counter structure, handle position, wheel arrangement, and footprint
logic.

#### Candidate 1 — Compact Fixed-Canopy Cart

* compact cart body with a faded teal direction
* shallow fixed canopy and broad mobile-readable service counter
* controlled utensils and food-preparation attachments
* suitable as a modular micro-cluster anchor
* stronger structural mass than the umbrella cart

#### Candidate 2 — Low Fixed-Roof Cart

* compact rectangular body with a restrained low roof
* contained storage volume
* structurally related to but distinct from Candidate 1
* no complete shop or enclosed kiosk

#### Candidate 3 — Offset Mono-Slope Canopy Cart

* asymmetric or offset canopy with visible side-mounted storage
* different depth rhythm and compact road-facing service edge
* structural mass extending toward the city edge

#### Candidate 4 — Umbrella-Style Open Cart

* lightweight open cart body with central or offset umbrella support
* large restrained multicolour umbrella
* substantially lighter silhouette and more open worktop than Candidate 1
* different roof and footprint logic
* visually distinct modular edge-prop variant

These four structures define the controlled V1 pilot family only. They do not
limit the eventual Mumbai environmental asset catalogue.

### F. City Identity

* Applicable City: Mumbai
* Supported Pillar: Dense Layered Street Commerce
* Treatment Strength: Strong Mumbai Environmental Treatment
* Approved Cues: compact practical street-food cart, maintained working
  construction, controlled utensils and containers, restrained painted metal,
  bounded canopy/umbrella treatment, and practical storage hierarchy
* Identity Method: combine material, construction, service layout, storage,
  attachments, restrained colour, and light maintained wear; colour alone is
  insufficient
* Prohibited Misuse: stereotype, poverty coding, excessive grime, tourist-poster
  treatment, theme-park styling, readable branding, complete street scene, or
  mixed-city contamination

### G. Visual Specification

* Silhouette Intent: compact mobile-readable food cart with one clear body,
  service counter, wheel/support system, and declared shade structure
* Primary Grammar: broad softened cart masses, stable footprint, readable work
  surface, and controlled canopy or umbrella geometry
* Detail Budget: only attachments necessary for food-cart recognition and
  practical storage; no decorative clutter or fragile utensil field
* Camera Orientation: Masala Run high bird's-eye camera with a slight
  recognition-oriented tilt
* Runtime Orientation: documented separately in Section H; camera angle never
  substitutes for world-facing placement
* Condition: practical, maintained, hygienic, functional, and lightly weathered
* Text/Branding: no readable or pseudo-readable text, logo, trademark, brand, or
  branded packaging

### H. Runtime Placement Geometry and Orientation

* Edge Orientation Class: `Class C — Dedicated Left and Right Masters Required`
* Road-facing Edge: serving counter and customer-facing working edge
* City-facing Edge: rear, storage, structural mass, and shade depth
* Runtime Depth Direction: away from the playable road toward the city edge
* Maximum Playable Intrusion: the physical footprint remains clear of the road;
  visual road-facing depth must pass `ρ × declaredMaximumRuntimeHeight <= 8 px`
  and records the preferred `5.6 px` result separately
* Placement Footprint: compact cart envelope wholly contained in the approved
  non-playable edge-prop zone; exact repository bounds and controlled placement
  envelope remain pending validation
* Recommended Pivot Edge: the honest road-facing ground-contact footprint edge;
  exact coordinates are measured per master, normalized pivot percentage is
  diagnostic only, and the pivot must not be moved artificially to pass
* Left/Right Applicability: dedicated left and right masters are mandatory and
  must preserve believable attachment layout, valid lighting, valid weathering,
  service direction, and city-facing depth
* Accepted Directions: Candidate 1 left-edge fixed-canopy, Candidate 1
  right-edge fixed-canopy, Candidate 4 left-edge umbrella-cart, and Candidate 4
  right-edge umbrella-cart
* Mirroring Permission: runtime mirroring is prohibited. A mirrored source is
  insufficient unless it becomes a deliberately corrected, independently
  validated dedicated master satisfying all Class C requirements.
* Immediate Rejection: wrong runtime orientation fails regardless of visual
  quality

Functional placement relationship:

```text
LEFT EDGE
City / Building ← rear + storage ← cart depth ← SERVICE | Safety | Playable Road

RIGHT EDGE
Playable Road | Safety | SERVICE → cart depth → rear + storage → City / Building
```

Serving edges face the road. Structural mass, storage, and shade depth extend
city-ward. Session 43 passed these orientation directions for both accepted
structures. Controlled repository/runtime placement remains a later integration
check. Placement mock-ups remain separate review artifacts and are never baked
into production assets.

#### Session 56 geometry-contract application

Future tall cart masters declare every framework geometry field and are checked
at both target and maximum runtime height. Right fixed-canopy V002 is approved,
valid at its current runtime geometry, outside preferred future road-depth
guidance, and grandfathered rather than retroactively rejected. Left
fixed-canopy V003 is geometry-validated and valid at its tested geometry; its
metadata status remains `review` and is not upgraded here. Session 53/55 assets
remain experimental geometry evidence, not production-approved full references.
Visible W:H remains a secondary diagnostic and cannot replace `ρ`.

### I. Permitted Variants

* Structural Variation: the four controlled structures in Section E
* Colour Variation: restrained palette support only; never a substitute for
  structural diversity
* Attachment Variation: bounded practical utensil, container, storage, handle,
  counter, and food-preparation hierarchy consistent with the declared structure
* Orientation: dedicated left and right masters
* Shade Variation: shallow fixed canopy, low fixed roof, offset mono-slope
  canopy, or umbrella-style open cart as assigned by candidate
* Invariants: one cart, passive Tier 4 role, Mumbai treatment, road-facing
  service edge, city-facing depth, transparent isolation, complete wheels and
  supports, compact footprint, and no complete scene

### J. Isolation and Technical Output

Production delivery requirements:

* one cart per exported asset
* transparent PNG with a genuine alpha channel
* no checkerboard baked into the image
* no background colour or gradient
* complete wheels, supports, canopy or umbrella, and handles
* clean lower edge
* sufficient transparent padding
* stable pivot and predictable bounds
* mobile-readable detail compatible with the project camera
* one cart per production file with separate left and right production assets

Prohibited output content:

* road, pavement, footpath, wall, frontage, street scene, full background, or
  background gradient
* label, multi-cart sheet, second panel, or two-panel production asset
* placement mock-up baked into the asset
* neighbouring permanent props
* people, hands, or body parts
* readable text, logos, trademarks, or branded packaging

Placement mock-ups remain separate validation artifacts, not production assets.
Converting transparent assets to JPG is prohibited because JPG removes the alpha
channel required for production.

Current technical status: Candidate 4's isolated transparent output passed the
supplied production review, and its combined validation image was split into
separate left-edge and right-edge transparent files. Candidate 1 retains the
isolated-asset requirement. Repository export, bottom-edge, padding, pivot,
bounds, binary filename presence, production metadata values,
placement-envelope, and controlled runtime checks remain pending. No repository
PNG filename or binary-dependent technical validator result is recorded or
implied.

#### Session 44 deterministic export plan

Final resolved asset directory: **Pending**. The Technical Asset Contract does
not yet define a modular micro-cluster runtime path because the segment composer
is not implemented. The existing `assets/props/` path contains legacy tiled city
strips and is not a compatible destination for these four dedicated masters.
No new asset directory or placeholder PNG was created.

The authoritative naming pattern resolves the requested tokens as `prop` rather
than `envprop`, `neutral` lighting, `1x` size, and three-digit `v001` versioning:

| Production master | Metadata ID and planned PNG filename | Runtime mapping |
|---|---|---|
| Candidate 1 fixed canopy — left edge | `mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v001` / `mumbai_prop_vadapav_cart_fixed_canopy_left_neutral_1x_v001.png` | service right; city depth left; road-facing edge right |
| Candidate 1 fixed canopy — right edge | `mumbai_prop_vadapav_cart_fixed_canopy_right_neutral_1x_v001` / `mumbai_prop_vadapav_cart_fixed_canopy_right_neutral_1x_v001.png` | service left; city depth right; road-facing edge left |
| Candidate 4 umbrella open cart — left edge | `mumbai_prop_vadapav_cart_umbrella_open_cart_left_neutral_1x_v001` / `mumbai_prop_vadapav_cart_umbrella_open_cart_left_neutral_1x_v001.png` | service right; city depth left; road-facing edge right |
| Candidate 4 umbrella open cart — right edge | `mumbai_prop_vadapav_cart_umbrella_open_cart_right_neutral_1x_v001` / `mumbai_prop_vadapav_cart_umbrella_open_cart_right_neutral_1x_v001.png` | service left; city depth right; road-facing edge left |

`tools/validate_asset_names.py --strict --name ...` passed all four planned
filenames. This validates deterministic syntax only; it does not claim that the
PNG files exist.

Four schema-valid metadata templates are prepared in `assets/metadata/`, one per
master. The existing schema has no first-class source-brief, family, structural
variant, orientation class, service/city direction, runtime-mirroring,
micro-cluster role, or production-substatus fields. Session 44 therefore maps
these values to existing `tags`, `placementRules`, and `notes` fields rather than
changing `asset.schema.json`:

| Required concept | Existing schema mapping |
|---|---|
| source brief and family relationship | deterministic `tags` plus record `notes` |
| category and city | `category: prop`; `city: mumbai` |
| structural variant and orientation | deterministic `tags`; side-specific `allowedZones` and `alignTo` |
| service, city, road-facing, and city-facing directions | deterministic `tags` plus `placementRules.notes` |
| Class C and mirroring prohibition | deterministic `tags` |
| micro-cluster role and gameplay tier | deterministic `tags` |
| visual approval and integration state | `status: draft` plus deterministic tags and notes |
| pivot convention | `anchor.origin: custom` plus pivot tag; coordinates remain sentinels |

`tools/validate_asset_metadata.py` passed the schema structure of all four draft
records. Production metadata validation remains pending: dimensions are `0`,
custom-anchor coordinates are `0`, minimum spacing is `0`, and
`placementWeight` is `0`. Each record identifies these as disabled draft
sentinels awaiting binary measurement and controlled placement evidence.

#### Pivot, bounds, and placement-envelope preparation

Pivot convention: `road_facing_ground_contact_centre`. Each dedicated master
requires an independently measured pivot on or immediately adjacent to its
ground-contact line, near the centre of the road-facing service frontage and
inside the transparent canvas. The left-edge pivot is near the right-facing
service edge; the right-edge pivot is near the left-facing service edge. Canvas
centre, visual centre of mass, umbrella/canopy centre, wheel centre, and arbitrary
bottom-centre placement are invalid. No numeric coordinate is approved without
the corresponding binary.

Each binary must later produce four distinct measurements:

* **Visual bounds:** complete wheels, supports, handles, canopy/umbrella, pole,
  storage modules, structural containers, and lower silhouette
* **Placement footprint:** physical ground area of the cart, independent of
  umbrella/canopy visual overhang
* **Road-intrusion bounds:** maximum road-facing extension, never crossing the
  safety-buffer boundary
* **Crop-safe bounds:** complete silhouette and required padding, with no
  neighbouring pixels

The placement envelope must also measure asset width/depth, safety-buffer
clearance, crop-safe region, overlap allowance, minimum spacing, and recommended
spacing. No visual or physical footprint may cross the safety buffer into the
protected road. Structural depth always extends city-ward; beauty-shot depth
toward the road is prohibited. All numeric bounds and spacing values remain
pending because no production PNG exists in the repository.

### K. Negative Constraints

1. **Global:** no realism, photorealism, complete scene, background, readable
   text, logo, brand, stereotype, mixed-city cue, or gameplay-category confusion.
2. **Category:** no complete food stall, restaurant, full kiosk, marketplace,
   theme-park prop, interactable station, pickup, hazard, enemy, objective, or
   continuous edge strip.
3. **Mumbai:** no caricature, poverty coding, excessive grime, tourist-poster
   treatment, unrelated city cue, or colour-only identity.
4. **Asset-specific:** no two-panel output, placement mock-up, second cart,
   incomplete wheel/support, dirty lower edge, fused background, casual mirrored
   pair, repeated prior composite, fixed-roof substitution for the umbrella
   candidate, or palette-only candidate differentiation.

### L. Reference-image Usage

No external reference inventory is recorded for Session 42. Generated concept
sheets and provisional orientation presentations are review evidence, not
creative authority or approved production assets.

### M. Generation and Prompt-expression Record

* Generation Model/Pipeline: not recorded in the supplied Session 42 evidence
* Prompt Version/ID: not recorded in the supplied Session 42 evidence
* Seeds: not recorded in the supplied Session 42 evidence
* Output Paths: not recorded in the supplied Session 42 evidence
* Candidate Identifiers: Candidate 1 through Candidate 4; deterministic output
  identifiers were not recorded in the supplied Session 42 evidence
* Prompt-only Revision Used: Yes
* Evidence Basis: supplied Session 42 concept and provisional-master review;
  image files and generation logs are not present in the repository record

Initial attempts exposed:

* two-panel compositions combining an isolated cart with a full street scene
* visible backgrounds and repeated reuse of the previous composite image
* failure to reset generation context
* candidates differentiated mainly through colour
* structurally near-identical cart outputs
* Candidate 4 repeatedly collapsing into Candidate 1's fixed-roof structure
* provisional pairs that appeared mirrored without initially providing genuinely
  distinct runtime masters

These are generation and prompt-expression failures, not approved asset results.
The mapped framework classifications are `PROMPT_AMBIGUITY`,
`UNCONTROLLED_VARIANT`, `TRANSPARENCY_OR_EXPORT_FAILURE`,
`CAMERA_OR_PERSPECTIVE_FAILURE`, and `PROCEDURAL_PLACEMENT_FAILURE`. These codes
classify the supplied observations; they are not fabricated validator output.

Core production lesson: **palette variation alone is not valid candidate
diversity**. Future batches must express the structural axes in Section E and
must reset generation context rather than reuse an unintended composite.

#### Session 43 production learnings

1. Generate one production asset at a time whenever the model repeatedly
   produces multi-cart sheets.
2. Multi-cart validation sheets support comparison but are not production
   exports.
3. Transparent PNG files must preserve the genuine alpha channel.
4. Converting a transparent asset to JPG removes transparency and is prohibited
   for production.
5. Cropping must preserve the complete canopy, umbrella, wheels, handles, and
   lower structure.
6. Dedicated left and right masters must be reviewed individually.
7. Visual approval and runtime integration remain separate stages.
8. Structural diversity must remain stronger than palette variation.
9. Placement mock-ups remain separate from clean production files.
10. Generated images remain outputs, not creative authority.
11. Naming, metadata, pivot, and bounds validation must occur before integration.
12. Technical failure must not be hidden by creative approval.

### N. Candidate Review and Production Preparation

| Candidate | Concept-sheet position | Result | Review summary |
|---|---|---|---|
| Candidate 1 — Compact Fixed-Canopy Cart | Top-left | Production visual direction accepted | Teal compact cart with a shallow fixed canopy; compact readable silhouette, strong Mumbai street-commerce character, practical structure, standalone edge-prop use, useful micro-cluster anchor, and strong family potential. |
| Candidate 2 — Low Fixed-Roof Cart | Top-right | Rejected from current shortlist | Weaker than Candidate 1 for the selected fixed-canopy direction and provided insufficient additional production value. |
| Candidate 3 — Offset Mono-Slope Canopy Cart | Bottom-left | Rejected from current shortlist | Weaker than Candidate 4 for the contrasting structural direction and provided insufficient advantage over the selected concepts. |
| Candidate 4 — Umbrella-Style Open Cart | Bottom-right | Production visual direction accepted | Lightweight open cart with a controlled multicolour umbrella; clearly different silhouette, roof system, storage logic, footprint, and visual weight from Candidate 1; strong structural contrast and useful modular edge-prop direction. |

#### Candidate 1 production preparation

Candidate 1 was regenerated into dedicated left-edge and right-edge production
directions. The compact teal fixed shallow-canopy structure, strong Mumbai
street-commerce character, isolated-asset requirement, standalone edge-prop
use, micro-cluster-anchor use, and consistent family identity were retained.
Both directions keep the service side toward the playable road and rear
structure, storage, supports, and handle toward the city edge.

Status: **Production visual direction accepted**.

Accepted structures: dedicated left-edge fixed-canopy master direction and
dedicated right-edge fixed-canopy master direction. Remaining work is repository
export preparation plus naming, metadata, alpha, bottom-edge, padding, pivot,
bounds, placement-envelope, and controlled runtime-integration validation.

#### Candidate 4 production preparation

The first Candidate 4 regeneration incorrectly repeated Candidate 1's fixed-roof
structure and was rejected. A corrected generation retained the lightweight
open-cart body and controlled red-and-yellow umbrella structure. Its first paired
umbrella output effectively repeated one orientation. A subsequent correction
created dedicated left-edge and right-edge production directions by changing
wheel position, open-shelf position, attachment grouping, service-counter
asymmetry, and side-container placement. The combined validation image was split
into separate left-edge and right-edge transparent files; no filenames are
recorded because none exist in the repository.

Status: **Production visual direction accepted**.

Accepted structures: dedicated left-edge umbrella-cart master direction and
dedicated right-edge umbrella-cart master direction. The service side faces the
playable road; rear structure, handle, and storage extend city-ward. Remaining
work is repository export, naming, metadata, bottom-edge, padding, pivot, bounds,
umbrella-footprint, safety-buffer, placement-envelope, and controlled
runtime-integration validation.

Both structures passed production visual-direction and runtime-orientation
review. Repository technical validation and controlled runtime integration have
not started.

### O. Acceptance Criteria

1. Passive Tier 4 meaning and category safety pass at gameplay scale.
2. The declared structure is distinguishable by silhouette, body, shade,
   storage, counter, wheel, handle, and footprint logic rather than palette.
3. Serving edge faces the playable road and all primary depth extends city-ward.
4. Left and right masters are genuinely valid Class C production masters, not
   uncorrected mirrors.
5. One complete isolated cart exports with transparent clean alpha, complete
   wheels/supports, clean lower edge, padding, stable pivot, and predictable
   bounds.
6. The placement envelope stays outside the safety buffer and playable road.
7. Naming and metadata pass applicable repository validation.
8. A separate running-context street mock-up confirms scale and placement before
   controlled runtime integration and final repository technical completion.

### P. Rejection Triggers

| Observable trigger | Applicable framework classification |
|---|---|
| Complete scene, two panels, visible background, baked street, or placement mock-up | `MODULARITY_FAILURE`, `TRANSPARENCY_OR_EXPORT_FAILURE`, `PROMPT_AMBIGUITY` |
| Reused composite or failure to reset generation context | `PROMPT_AMBIGUITY`, `UNCONTROLLED_VARIANT` |
| Palette-only or structurally near-identical candidates | `UNCONTROLLED_VARIANT`, `SILHOUETTE_FAILURE` |
| Candidate 4 collapses into Candidate 1's fixed-roof structure | `UNCONTROLLED_VARIANT`, `PROMPT_AMBIGUITY` |
| Wrong serving/depth direction or ineffective repeated orientation | `CAMERA_OR_PERSPECTIVE_FAILURE`, `PROCEDURAL_PLACEMENT_FAILURE` |
| Wheel, support, container, canopy, umbrella, or footprint enters the safety buffer | `PROCEDURAL_PLACEMENT_FAILURE`, `PIVOT_OR_BOUNDS_FAILURE` |
| Invalid alpha, dirty lower edge, incomplete structure, padding, pivot, or bounds | `TRANSPARENCY_OR_EXPORT_FAILURE`, `PIVOT_OR_BOUNDS_FAILURE` |
| A visually approved direction is treated as integrated or technically complete without repository/runtime validation | `CREATIVE_AUTHORITY_CONFLICT`, `TECHNICAL_CONTRACT_FAILURE` |

### Q. Review Records

#### Session 42 historical review

* Reviewer: Masala Run Production Review
* Review Date: `2026-08-05`
* Review Stage: Concept and provisional production-master review
* Result: Partial pass
* Shortlisted Concepts: Candidate 1 and Candidate 4
* Rejected Concepts: Candidate 2 and Candidate 3
* Final Selected Candidate: None
* Final Asset Approval: No
* Brief Revision Required: No
* Prompt-only Revision Used: Yes
* Runtime Validation Completed: No
* Technical Validation Completed: No
* Integration Completed: No
* Failure Codes: `PROMPT_AMBIGUITY`, `UNCONTROLLED_VARIANT`,
  `TRANSPARENCY_OR_EXPORT_FAILURE`, `CAMERA_OR_PERSPECTIVE_FAILURE`, and
  `PROCEDURAL_PLACEMENT_FAILURE`; `PIVOT_OR_BOUNDS_FAILURE` remains a pending
  validation risk, not a claimed validator result
* Final Approval Note: Candidates 1 and 4 remain shortlisted with provisional
  orientation presentations. Neither is approved or integrated.

Frozen Session 42 outcomes:

1. The Mumbai vada-pav cart is a Tier 4 passive environmental-prop family.
2. It supports Dense Layered Street Commerce.
3. The family uses Class C dedicated left and right masters.
4. The serving edge must face the playable road.
5. Structural mass and storage must extend toward the city edge.
6. Production outputs must be isolated and transparent.
7. Placement mock-ups must remain separate.
8. Two-panel production assets are prohibited.
9. Palette swaps alone are not valid candidate diversity.
10. Candidate batches must test meaningful structural diversity.
11. Candidate 1 is shortlisted.
12. Candidate 4 is shortlisted.
13. Candidates 2 and 3 are rejected from the current shortlist.
14. Candidate 1 provisional paired orientation output was generated.
15. Candidate 4 provisional paired orientation output was generated.
16. The first attempted Candidate 4 regeneration was rejected because it
    repeated Candidate 1.
17. Neither shortlisted candidate has passed runtime placement validation.
18. Neither shortlisted candidate is finally approved.
19. Separate clean production exports remain pending.
20. Runtime street-placement mock-ups remain pending.
21. Technical alpha, pivot, bounds, padding, and metadata validation remain
    pending.
22. Game integration has not started.

#### Session 43 production regeneration and orientation review

* Reviewer: Masala Run Production Review
* Review Date: `2026-08-05`
* Review Stage: production regeneration and runtime-orientation validation
* Result: Passed
* Selected Structures: Candidate 1 and Candidate 4
* Candidate 1 Left/Right Direction: Accepted
* Candidate 4 Left/Right Direction: Accepted
* Candidate 2: remains rejected
* Candidate 3: remains rejected
* Failure Codes: None for the accepted final directions
* Brief Revision Required: No
* Prompt-only Correction Required During Production: Yes
* Runtime Orientation Validation: Passed
* Repository Export Validation: Pending
* Naming and Metadata Validation: Pending
* Pivot and Bounds Validation: Pending
* Integration Status: Not Started
* Final Approval Note: Both shortlisted cart structures passed visual and
  orientation validation as dedicated left/right environmental edge assets.

Approval applies to the Candidate 1 and Candidate 4 production visual directions
and Class C orientation logic. It does not mark either structure integrated,
runtime-complete, gameplay-integrated, or repository-export complete.

#### Session 44 export and integration preparation review

* Reviewer: Masala Run Production Review
* Review Date: `2026-08-05`
* Review Stage: export and integration preparation
* Selected Structures: Candidate 1 and Candidate 4
* Creative Direction: Passed previously
* Dedicated Left/Right Orientation: Passed previously
* Naming Validation: Passed for four planned filenames against the repository
  regex; binary filename presence pending
* Metadata Validation: Passed for existing-schema structure of four disabled
  draft records; production completeness pending binary measurements
* Pivot Validation: Pending — convention prepared, coordinates unavailable
* Bounds Validation: Pending — definitions prepared, binaries unavailable
* Transparent Export Validation: Pending — no repository PNGs exist
* Controlled Placement Test: Prepared as documentation and disabled metadata;
  execution pending binaries and renderer hook
* Integration Status: Not Started
* Brief Revision Required: No
* Prompt-only Correction Required: No — no image generation is part of Session 44
* Failure Codes: None recorded; unavailable binaries and renderer support are
  dependencies, not fabricated validation failures
* Unresolved Dependencies: four final transparent PNGs; authoritative modular
  asset path and segment-composer hook; measured dimensions, padding, pivots,
  visual/footprint/road-intrusion/crop-safe bounds, and spacing; repository-ready
  chai-counter exports and metadata for mixed-edge testing

Session 44 prepares deterministic export and validation inputs only. It does not
mark the family integrated, runtime-complete, or gameplay-integrated.

### R. Revision History

| Version | Date | Changed section | Reason | Evidence/failure addressed | Approver |
|---|---|---|---|---|---|
| `1.0 / V1` | `2026-08-05` | Initial A–R brief and Session 42 record | Record structural generation, concept review, provisional master preparation, and pending validation | Supplied Session 42 outcomes and mapped framework failure classifications; no technical validator result | Masala Run Production Review |
| `1.0 / V1` | `2026-08-05` | A/B/C/H/J/M/N/O/P/Q/R and roadmap | Record clean regeneration, production visual approval, and dedicated left/right orientation validation without claiming integration | Session 43 accepted Candidate 1 and Candidate 4 directions; repository export and integration checks remain pending | Masala Run Production Review |
| `1.0 / V1` | `2026-08-05` | A/J/M/Q/R, metadata templates, validation tooling, placement scaffold, and roadmap | Prepare deterministic export, schema-valid draft metadata, pivot/bounds rules, and controlled-test inputs without fake binaries or integration | Session 44 naming and metadata-structure checks passed; binary and runtime checks remain pending | Masala Run Production Review |
| `1.1 / V1` | `2026-08-12` | H/R and framework geometry fields | Apply the Session 56 parameterized hard-intrusion contract without changing the approved family scope or asset metadata statuses | Right V002 grandfathered; left V003 remains geometry-validated with metadata status `review`; experimental assets remain evidence only | Masala Run Production Review |

Next task: **Prepare the accepted Mumbai vada-pav cart assets for repository
export, naming, metadata validation, pivot/bounds validation and controlled
runtime integration.**

The 13-step immediate roadmap in Section 12 governs progression. Prepared work
must not be reported as completed, and runtime integration remains pending until
valid binaries and controlled placement evidence exist.

## 16. Mumbai Environmental Props — Storage/Utility Attachment Family (Session 61 Phase 2)

This brief defines the first Production Asset Brief for the `attachment` runtime
role introduced by Session 60 (`game.js`'s `anchor + optional attachment`
composition grammar) and exercised only by disposable probe defs
(`mumbai_attachment_probe_left_test` / `_right_test`, both re-pointing at
already-shipped anchor masters at attachment scale) pending real art. No
appropriate existing brief covers a standalone small-prop attachment family —
Section 14's chai-counter "attachment pool" (kettle, crate, jars, cloth, vessel)
is baked onto the counter master image itself, not separately composed at
runtime. This is a new, narrowly-scoped brief, not a competing one.

This brief creates no image, candidate, final export, metadata record, or
runtime integration. It is `Ready for Generation` for two masters only.

### A. Brief Identity

* Brief ID: `PAB-MUMBAI-ENVPROP-STORAGE-ATTACHMENT-V1`
* Title: Mumbai Environmental Props — Storage/Utility Attachment Family
* Version: `1.2 / V1` (see Revision History §R — `1.1` flagged the Storage
  Vessel's declared-maximum-height problem via an appended clarification note
  without editing the spec fields; `1.2` is the follow-up correction that
  edits Sections G/H/I/K/O/P directly, through this framework's normal
  versioned-revision path, so the authoritative numeric fields now match
  measured reality per master rather than sharing one family-wide range)
* Status: `Integrated` — both masters selected, measured, registered in
  `EDGE_PROP_DEFS`/`PRODUCTION_CATALOGUE_KEYS`, shipped (`sw.js`/`BUILD_TAG`
  bumped), regression-clean. PM runtime/visual sign-off on the integration
  screenshots is the one open item (see Section Q).
* Category: `Environmental Prop`
* Subcategory/Archetype: `Street-Commerce / Attachment-Secondary`
* City Scope: Mumbai
* City-skin Treatment Strength: Restrained
* Gameplay Tier: `Tier 4 — Passive Environmental Asset, Attachment/Secondary sub-role`
* Owner/Workflow Stage: brief approved; external candidate generation pending
* Creation Date: `2026-08-14`
* Last Revised Date: `2026-08-14`
* Source Authority References: Art Bible 1.0 Frozen; Prompt Bible 1.0 Frozen;
  Mumbai City Kit 1.0 Frozen (Pillar 1 primary, Pillar 2 restrained-optional);
  Technical Asset Contract §4/§4.1/§5/§7; Production Asset Brief Framework 1.2
  Frozen; `NAMING_CONVENTIONS.md`; `ASSET_METADATA.md` /
  `assets/metadata/asset.schema.json`

### B. Authority References

* Art Bible: Version 1.0, Frozen — Environmental Props, Gameplay Hierarchy,
  Modularity, Camera & Composition, Style & Shape Language, Colour & Contrast
* Prompt Bible: Version 1.0, Frozen — Environmental Props module, Modular
  Micro-Clusters module, Mumbai city-skin, day/night, isolation, negatives
* City Kit: Mumbai Kit 1.0 Frozen — Pillar 1 Dense Layered Street Commerce
  (primary), with an optional restrained material-response cue from Pillar 2
  Monsoon-Worn Urban Surfaces; no permanent wet/rain treatment
* Technical Asset Contract: current repository contract — §4 hero-scale law (no
  edge/environment prop exceeds the courier's 70 px drawn height unless flagged
  `tall`; this family is never `tall`), §4.1 tall edge-prop geometry contract
  (the 8 px hard / 5.6 px preferred road-intrusion discipline applies to any
  edge-placed prop that can approach the road, including attachments — Section
  H below states this explicitly), §5 day/night (palette-neutral authoring, no
  baked shadow/glow), §7 delivery format
* Production Asset Brief Framework: Version 1.2, Frozen — this family follows
  the small-prop carve-out in the Runtime Edge Placement Standard ("small
  ambient props and asset categories outside the tall edge-placement system are
  not automatically subject to" the tall-landmark authoring envelope), but the
  8 px hard road-intrusion cap itself is not a landmark-only rule and still
  applies wherever the placement system can put a footprint near the road
* High-risk Rules Restated: Tier 4 passive role; non-interactive; protected
  road; isolated real alpha; no baked shadow/glow halo; no text/logo/brand; no
  people; no baked micro-scene; subordinate to the anchor it attaches to
* Conflict/Escalation Notes: none. This brief does not touch the Session 56/57
  geometry contract, the composer, or budget/spacing rules — attachments are
  ordinary claims through the existing `edgeAdmits()`/overlap/spacing path, per
  `game.js` Session 60 comments at the `attachments:` config block.

### C. Asset Purpose

* Asset Definition: two independently selectable, orientation-neutral small
  environmental props — a compact stacked-crate cluster and a single large
  storage vessel — usable as optional runtime `attachment`-role claims beside
  an approved anchor (chai counter, fixed-canopy cart, or umbrella cart)
* Production Reason: replace the Session 60 attachment-role probes (which
  reuse anchor art at reduced scale purely to prove plumbing) with genuine
  small-prop art, and prove the `Anchor + Optional Attachment` grammar with
  real authored content rather than borrowed pixels
* Environmental or Gameplay Function: quiet secondary evidence of stored goods
  beside street commerce — supports Pillar 1 without adding a second anchor-
  scale silhouette to the edge
* Reuse Classification: shared, city-skinned family; not city-exclusive in
  structure (crates and storage vessels are not Mumbai-specific forms), Mumbai
  in material/palette treatment only
* Intended Production Outcome: two isolated, orientation-neutral attachment
  masters, each usable on either edge without a runtime mirror transform
* Explicit Non-goals: a small-prop catalogue, additional attachment types
  beyond the two masters below, frontage art, road-surface art, a baked
  anchor+attachment scene, permanent wet/monsoon treatment, or any anchor-scale
  asset

### D. Gameplay Role & Safety

* Gameplay Relevance: decorative, secondary-to-anchor environmental support
* Gameplay Tier: `Tier 4 — Passive Environmental Asset`, and within Tier 4,
  visually subordinate to every registered anchor master (chai counter,
  fixed-canopy cart, umbrella cart) — smaller silhouette, smaller runtime
  height, lighter visual weight
* Placement Zone: same shallow non-playable Mumbai edge zones as anchors,
  reached only through the existing `attachment` role and `attachmentY()`
  placement (immediately above or below an anchor along the route axis); never
  placed independently of an anchor claim
* Interaction State: non-interactive, non-collectible, non-destructible, never
  a hazard, enemy, attack, pickup, interactable station, or objective
* Category Recognition Requirements: a compact crate stack must read as
  practical stored goods, not merchandise-for-sale or a pickup; a storage
  vessel must read as a single practical container, not a hazard urn or a
  gameplay collectible jar
* Prohibited Category Resemblance: pickup, reward, hazard, enemy, attack,
  projectile, spawn marker, interactable machine/station, objective marker, UI
  icon, or gameplay instruction
* Readability Priority: first, that the object reads as passive background
  clutter at a glance; second, plain vs. vessel silhouette distinction; the
  anchor it sits beside must always remain the dominant object in the cluster
* Protected Gameplay Characteristics: passive meaning, Tier 4 priority,
  subordinate visual weight relative to its anchor, non-road placement, small
  compact footprint, optional (never guaranteed) presence, and no colour-only
  critical communication

### E. Asset-family Scope

* Base Asset: none shared — this is two independent single-object masters, not
  a base-plus-variant structure. Each is its own complete, self-contained prop.
* Included Variants:
  1. **Crate Cluster** — a compact stack of 2–3 practical plastic or wooden
     crates, broad simple rectangular forms, low height, no directional
     handle, spout, or service opening
  2. **Storage Vessel** — one large practical clay or metal storage vessel
     (matka-style), rounded form, centred/symmetric silhouette, no handle or
     spout breaking symmetry
* Excluded Variants: any third master, colour-only palette swaps sold as
  variants, a combined crate+vessel composition, a person, a cart, or any
  anchor-scale structure
* Shared Structure: none required between the two — the family boundary is
  role (attachment), tier, scale ceiling, and orientation-neutrality, not a
  shared silhouette grammar
* City Material/Detail Layer: restrained Mumbai practical materials —
  faded teal/muted green/dusty red plastics for the crate cluster; clay or
  worn painted metal for the storage vessel; mild wear, no heavy grime
* Time-of-day Treatment: one structural asset reused for day and night,
  consumed through the existing Session 60 `EDGE_PROP_NIGHT` bake — no
  separate night art, no baked light source (these are unlit ambient objects,
  unlike the chai-counter family's optional practical bulb)
* Runtime Instance Logic: each master is genuinely orientation-neutral by
  authored symmetry (see Section H), so it is registered under two
  `EDGE_PROP_DEFS` keys (one `edge: "left"`, one `edge: "right"`) pointing at
  the **same PNG file** with the **same measured bounds/pivot numbers** — no
  runtime mirror transform, no second export. This is not a Class A "mirror at
  runtime" exception; it is honest reuse of symmetric geometry, consistent
  with this family's explicit no-fake-mirroring policy in Section H.
* Family Boundary Rationale: both masters share role (`attachment`), gameplay
  tier, scale ceiling, orientation-neutral authoring requirement, and
  production/technical output contract; they do not need to share silhouette
  grammar because attachments are independently selected, not a structural kit

### F. City Identity

* Applicable City: Mumbai
* Supported Identity Pillar: Pillar 1, Dense Layered Street Commerce (primary);
  optional restrained material cue toward Pillar 2, Monsoon-Worn Urban
  Surfaces (mild wear only — no wet/rain treatment)
* Approved City Cues: practical stacking, restrained plastic/wood/clay/metal
  materials, mild handling wear, quiet container variation
* Treatment Strength: Restrained — city identity carried through material and
  wear cues only, never through ornament or a printed/painted motif
* Material Cues: faded teal, muted green, dusty red plastics (crates); clay,
  restrained painted metal (vessel)
* Architecture/Object-language Cues: none — these are freestanding objects,
  not architectural attachments
* Prohibited Stereotypes/Misuse: no poverty coding, no market-clutter pile, no
  literal readable branding on crates, no stereotype vessel iconography
* Mixed-city Contamination Exclusions: no Jaisalmer sandstone/desert cues, no
  foreign material language

### G. Visual Specification

* Silhouette Intent: Crate Cluster — a stable stacked rectangular mass, broad
  and low; Storage Vessel — one clear rounded mass, centred and symmetric
* Primary Shape Grammar: global rounded-corner rectangular/rounded-vessel forms
  consistent with the frozen style language; no sharp unrounded edges
* Secondary Shape Rhythm: crate slat/rim rhythm on the cluster; a simple neck/
  rim band on the vessel — restrained, not decorative
* Proportions: compact and low — both read clearly smaller than any anchor
* Intended Runtime Height: `26 px`, both masters
* Declared Maximum Runtime Height (per master, `1.2` — corrected from a single
  shared `36 px` figure once real geometry was measured; see Section H):
  * **Crate Cluster**: `36 px` (measured 1.10-1.53px projected intrusion
    across the full 26-36px range, comfortably inside the 8px hard cap —
    genuine headroom, safe to ~188px)
  * **Storage Vessel**: `26 px` — target and declared maximum are now the
    same value. The originally specified `36 px` failed the frozen Session 56
    hard geometry contract at measured ~9.4px projected intrusion (over the
    8px cap); the vessel's belly-to-base taper (a real shape fact from the
    steep bird's-eye camera, not a measurement artifact) leaves a true safe
    ceiling of ~30.7px, barely above its own 26px target, so no usable
    headroom exists above the target itself
* Intended Visible Width/Depth: not governed by the tall-edge-prop 0.5–0.6
  heuristic (Section 4.1's carve-out for small ambient props applies); expect
  a compact, roughly-square-to-slightly-wide silhouette (~0.8–1.3 W:H) typical
  of stacked/rounded small forms — non-binding, visually reviewed
* Edge-envelope Fit: must sit comfortably inside the shallow edge-prop zone at
  up to each master's own declared maximum height (26px Storage Vessel /
  36px Crate Cluster) without visually competing with its anchor for space
* Orientation: front-facing, high bird's-eye camera, slight recognition tilt —
  same camera grammar as every other production master
* Visual Weight: lighter than every registered anchor; must not read as a
  second anchor
* Detail Budget: minimal — silhouette plus one or two material/wear cues; no
  individual small objects legible inside crates, no readable vessel pattern
* Outline Treatment: same restrained outline strength as the anchor family
* Flat-fill/Shading Rules: flat fills, maximum shade layers matching the
  approved anchor masters — no gradients beyond the frozen style budget
* Material Hierarchy: primary structural material (plastic/wood or clay/metal)
  dominant; wear/accent secondary; no tertiary decoration
* Palette Role: environment role — quiet, desaturated relative to gameplay
  colours (pickups, enemies, attacks)
* Accent-colour Limits: at most one restrained accent colour per master (e.g.
  one crate-lid colour, or one vessel rim tone)
* Lighting Behaviour: no baked directional light or shadow; flat, palette-
  driven, matching §5 of the Technical Asset Contract
* Day/Night Behaviour: same structure; consumed through the Session 60
  `EDGE_PROP_NIGHT` bake, no separate art
* Mobile Gameplay-scale Readability: silhouette must remain legible as
  "stored goods, not gameplay object" from 26px up to each master's own
  declared maximum height (26px Storage Vessel / 36px Crate Cluster) on a
  mid-tier Android screen
* High Bird's-eye Camera Compatibility: consistent with every approved master

### H. Camera, Runtime Placement Geometry & Modularity

* Camera Orientation: Masala Run high bird's-eye camera, slight tilt — matches
  every existing production master
* Runtime Orientation: freestanding, no inherent facing — see orientation
  classification below
* Edge Orientation Class: **provisionally Class A — Fully Mirrorable**, but
  under this brief's stricter policy no runtime mirror transform is ever
  applied (see Section E's Runtime Instance Logic). Classification is
  confirmed, not assumed, at review: if a candidate shows any semantic
  handedness (directional handle, spout, wear pattern, or lighting asymmetry),
  it is reclassified Class C and this brief is revised to require dedicated
  left/right masters before integration — forcing symmetry onto an asymmetric
  candidate is prohibited.
* Road-facing Edge / City-facing Edge: not applicable in the anchor sense —
  attachments do not carry an independent service direction; they inherit
  their position from `attachmentY()`, which places them along the route axis
  immediately outside their anchor, at the anchor's own edge distance from the
  road. Each master must therefore still present a coherent silhouette from
  the same camera angle regardless of which edge (`left`/`right`) it is
  registered under.
* Runtime Depth Direction: not applicable — attachments do not extend an
  independent depth envelope into the city; their footprint is bounded and
  shallow, at most 36px (Crate Cluster) / 26px (Storage Vessel) — see below
* Maximum Playable Intrusion: the Session 56/4.1 hard road-intrusion discipline
  still applies wherever a footprint can approach the road, evaluated against
  each master's OWN declared maximum height, not a shared family figure:
  * **Crate Cluster** — declared maximum `36 px` must pass `ρ × 36 px ≤ 8 px`
    (ρ ≤ 22.2%) hard, with preferred guidance `ρ × 36 px ≤ 5.6 px` (ρ ≤ 15.6%).
    Measured (Session 61 Phase 2 integration): 1.10-1.53px across 26-36px —
    PASS, comfortably inside preferred guidance.
  * **Storage Vessel** — declared maximum is `26 px` (corrected `1.2`, was
    `36 px`): `ρ × 26 px ≤ 8 px` (ρ ≤ 30.8%) hard, preferred guidance
    `ρ × 26 px ≤ 5.6 px` (ρ ≤ 21.5%). Measured: 6.77-6.79px at the shipped
    26px — PASSES the hard cap but sits above the 5.6px preferred band, the
    tightest margin of any registered master in this repo. At the original
    `36 px` figure this master measured 9.37-9.41px, failing the 8px hard cap
    outright — that failure is exactly why the declared maximum was lowered
    to match the target height, not the other way around.
  Both measured post-generation, per master, following the same alpha-column
  footprint scan used on every prior master.
* Outward Screen-space Budget: small relative to any anchor; no meaningful
  outer-bleed risk expected at this scale, confirmed visually at review rather
  than assumed
* Stored Visible Bounds: `visualBounds` (alpha ≥ 32 convention, matching every
  existing def), `footprint`, `cropSafe`, `pivot` — measured per master,
  identical convention to the vada-pav/chai-counter/umbrella-cart families
* Placement Footprint: compact, wholly contained in the existing edge-prop
  zone; must not extend deeper toward the city than its anchor's own footprint
* Recommended Pivot Edge: honest ground-contact footprint edge/centre — for a
  symmetric object with no service side, this is the visual base-centre, not
  an artificially chosen left/right edge
* Left/Right Applicability: both edges, same binary, same measured numbers
  (see Section E) — contingent on the Class A confirmation above
* Pivot Expectations: same honesty rule as every other master — never moved to
  force a numeric pass

> **Integration clarification (Session 61 Phase 2, `2026-08-14`) — pivot
> convention only; the maximum-height correction this note originally also
> carried is now folded directly into the "Maximum Playable Intrusion" field
> above as of `1.2` (see Revision History §R), not left as an appended aside:**
> "visual base-centre" (the pivot language above) turns out to be incompatible
> with how `edgePlacement()` actually places props — pivot is the point pinned
> to the road-edge safety-buffer line (`pivotX = roadEdgeX + dir*safetyBuffer`),
> so a centre pivot would seat the object straddling that line, guaranteeing a
> `footprintClear` failure (half the footprint lands on the protected road).
> Both masters were registered using the SAME road-facing-footprint-edge
> convention as every anchor in this repo (`pivot.x = footprint.x0` for the
> right-edge def, `footprint.x1` for left) — the only convention that is
> physically valid here, not a deviation chosen for convenience.
* Road-facing Visible Depth / ρ / Projected Intrusion / Hard-Preferred Result:
  **measured** (Session 61 Phase 2 integration, `2026-08-14` — no longer
  pending): see the per-master results in "Maximum Playable Intrusion" above.
  Crate Cluster landed well inside preferred guidance as anticipated; Storage
  Vessel did not — its base-centred-adjacent pivot does not fully compensate
  for the belly-vs-base taper, landing above preferred guidance though still
  inside the hard cap at its (now-corrected) 26px declared maximum
* City-facing Visible Depth / cityFrac / Outer Bleed: pending measurement; not
  expected to be meaningful at this scale
* Acceptable On-screen Visibility: full silhouette visible at target height;
  no edge-of-canvas clipping of the object itself
* Human-review Notes: confirm footprint honesty, orientation-neutrality
  (no hidden handedness), readability as passive clutter, and that the object
  never reads as visually competing with its anchor
* Cropping Tolerance: same convention as prior masters — generous canvas
  margin around the visible silhouette, crop-safe region ≥ 48 px beyond
  `visualBounds` on all sides where canvas size allows
* Placement Zone: non-playable edge-prop zone, attachment sub-slot only
* Edge Depth: shallow — bounded by the anchor's own edge depth, never deeper
* Crop-safe Region: `visualBounds` ± 48 px, clamped to canvas
* Overlap Allowance: none required — attachments pass the same
  `edgeAdmits()`/overlap test as every other claim, no special exemption
* Procedural Spacing: inherits the existing attachment spacing model
  (`attachmentY()` pad-clearance logic in `game.js`); this brief does not
  change spacing, budget, or the `attachments.chance`/`max` config
* Attachment Points: not applicable — these masters are themselves
  attachments, not anchors with their own attachment points
* Rotation Permission: none
* Mirroring Permission: prohibited as a runtime transform for both masters
  regardless of final orientation class (matches the repo-wide "environmental
  edge-prop path... never mirrored at runtime" rule in the Technical Asset
  Contract §6) — orientation-neutral masters achieve both-edge use through
  identical authored symmetry, not a flip
* Baked-composition Restrictions: no baked anchor, no baked ground, no baked
  neighbouring prop, no scene

Functional placement diagram (both edges; attachments sit along the route axis
outside their anchor, at the same road-distance band):

```text
Building Zone
↓
Edge Decoration Zone
↓
Interactive Edge Prop Zone  ← ANCHOR (chai counter / cart)
                              ← ATTACHMENT (this brief), offset along route
↓
Safety Buffer
↓
Playable Road
```

### I. Permitted Variants

* Structural Variation: none within a master — each is a single fixed
  composition (no "2–4 attachments on the crate" sub-system; that pattern
  belongs to the chai-counter family, not this one)
* Material Variation: restrained plastic/wood colour choice on the Crate
  Cluster (approved: faded teal, muted green, dusty red — pick one per
  candidate, not a rainbow); vessel clay/metal choice on the Storage Vessel
* Controlled Wear: mild handling wear only, both masters
* City Skin: Mumbai, restrained strength, both masters
* Day/Night Treatment: single structural asset, consumed via the existing
  `EDGE_PROP_NIGHT` bake — no separate night art
* Orientation: orientation-neutral (pending Class A confirmation at review)
* Approved State Change: none
* Accessibility Treatment: none required beyond the existing multi-cue silhouette
  rule (shape + material, not colour alone)
* Gameplay State: none — always the same passive state
* Invariants Across Variants: Tier 4 passive role, subordinate visual weight,
  26px target height with a per-master scale ceiling (36px Crate Cluster /
  26px Storage Vessel — see Section H), no baked light/shadow, no text/brand,
  no person

### J. Technical Output

* Technical Asset Contract Reference: current repository contract, §4/§4.1/§5/§7
* File Type/Colour Space: PNG, real alpha (thresholded trim, no matte fringe), sRGB
* Transparency/Alpha: isolated subject, transparent background, no baked ground
* Dimensions/Resolution: generous canvas with wide margin around the visible
  silhouette (matching the existing family's generous-crop pattern); exact
  pixel canvas measured post-generation; single image ≤ 1024×1024 per the
  memory-budget ceiling
* Padding/Bounds: crop-safe region ≥ 48 px beyond `visualBounds`
* Pivot: base-centre ground-contact point, honest per Section H
* Orientation/Side Variants: none — one export per master, registered under
  both `edge: "left"` and `edge: "right"` `EDGE_PROP_DEFS` keys
* Naming: per `NAMING_CONVENTIONS.md`
  (`<city>_<category>_<subject>_<variant>_<lighting>_<size>_v###.<ext>`):
  * `mumbai_prop_storage_crate_cluster_compact_neutral_1x_v001.png`
  * `mumbai_prop_storage_matka_vessel_single_neutral_1x_v001.png`
* Metadata: `assets/metadata/asset.schema.json` — one record per filename,
  `category: "prop"`, `status: "draft"` until measured, then `"review"`
  pending PM visual sign-off (never `"approved"` before that pass); draft
  templates prepared this session:
  `assets/metadata/mumbai_prop_storage_crate_cluster_compact_neutral_1x_v001.json`,
  `assets/metadata/mumbai_prop_storage_matka_vessel_single_neutral_1x_v001.json`
* Export Destination/Manifest: `assets/props/`; `assets/art_manifest.json`
  updated at import time, not by this brief
* Collision/Footprint Data: `collision.type: "none"`, `solid: false` — matches
  every other Tier 4 environmental prop; runtime footprint lives in
  `EDGE_PROP_DEFS`, not in `collision`
* Animation/Frame Requirements: none — static image
* Edge-envelope Compatibility Review: pending post-generation measurement
* Asset-specific Override: none

### K. Negative Constraints

1. Global Negatives: no realism/photorealism/painterly rendering or
   unsupported 3D appearance; no readable text, logo, trademark, or brand; no
   baked shadow or glow halo
2. Category Negatives: no complete scene, baked ground, or baked neighbouring
   prop; no decorative clutter that overrides readability; no gameplay-category
   confusion (pickup, hazard, enemy, interactable)
3. City-specific Negatives: no stereotype, caricature, poverty coding, or
   tourist-poster treatment; no mixed-city contamination; no permanent wet/
   monsoon treatment
4. Asset-specific Negatives: no directional handle/spout/lighting that breaks
   orientation-neutrality; no person; no third master; no anchor-scale mass or
   visual weight; no individually-readable small objects inside the crate
   stack; no vessel surface pattern that reads as text or branding

### L. Reference-image Usage

| Reference ID | Reason for inclusion | May borrow | Must not copy | Reference type |
|---|---|---|---|---|
| `REF-STORAGE-1` | Approved chai-counter v001 master — style/material/palette continuity for the shared Mumbai environmental-prop family | flat-fill style, outline strength, restrained-accent palette logic | structure, counter silhouette, attachment layout | Structural/Material/Palette |
| `REF-STORAGE-2` | Approved umbrella-cart v002 masters — confirms the family's isolation/alpha/crop-margin convention | isolation and crop-margin convention, camera angle | cart structure, wheel/umbrella forms | Structural/Palette/Mood |

References are supporting evidence only; they do not override this brief.

### M. Derived Generation Prompt

* Prompt Version/ID: `PROMPT-STORAGE-ATTACHMENT-V1`
* Source Brief ID/Version: `PAB-MUMBAI-ENVPROP-STORAGE-ATTACHMENT-V1 / 1.0`
* Model/Pipeline Target: external image-generation tool (PM/ChatGPT), matching
  the pipeline used for the chai-counter, vada-pav-cart, and umbrella-cart
  families — this session has no image-generation tool available
* Final Model-facing Prompts: see the two copy-pasteable prompt blocks
  delivered alongside this brief (Crate Cluster, Storage Vessel)

### N. Candidate-generation Plan

* Candidate Count: `4` per master (framework default), `8` total
* Count Override and Justification: none
* Generation Model/Pipeline: external (PM-run, ChatGPT image generation or
  equivalent) — outside this session's tool access
* Seed Strategy: not supported by the target pipeline; record whatever seed/
  reference the tool reports per candidate for traceability
* Controlled Prompt Fields: gameplay role, tier, isolation, technical output,
  negatives, orientation-neutrality requirement — held constant across all 4
  candidates per master
* Variable Prompt Fields: none authorized beyond ordinary generation variance;
  do not vary structure, material family, or accent count across candidates
* Output Destination: PM delivers candidate images to
  `~/Documents/Working images/` (the accessible drop path this session already
  uses); Claude imports the accepted candidate into `assets/props/` at
  measurement time
* Candidate Naming: `PAB-MUMBAI-ENVPROP-STORAGE-ATTACHMENT-V1_<master>_c<1-4>`

### O. Acceptance Criteria

1. **Gameplay and category safety:** does not read as a pickup, hazard,
   enemy, or interactable station from 26px up to each master's own declared
   maximum height (26px Storage Vessel / 36px Crate Cluster)
2. **Silhouette and recognition:** Crate Cluster reads as stacked stored
   goods; Storage Vessel reads as one practical container; both read as
   subordinate to whatever anchor they sit beside
3. **Technical compliance:** real alpha, no matte fringe, generous crop
   margin, filename/metadata pass `tools/validate_asset_names.py` and
   `tools/validate_asset_metadata.py`
4. **Modularity and procedural usability:** clean isolation, no baked ground/
   neighbour, honest measurable footprint/pivot, passes `edgeAdmits()` in a
   controlled runtime test on both edges
5. **City identity:** restrained Pillar 1 material cue present without
   ornament or stereotype
6. **Global style consistency:** flat-fill/outline/camera grammar matches the
   existing production family
7. **Charm and polish:** only after all above pass

Additionally, per this brief's small-prop carve-out from the tall-landmark
envelope: each master must pass `ρ × <its own declared maximum height> ≤ 8 px`
hard (`36 px` for Crate Cluster, `26 px` for Storage Vessel per Section H's
`1.2` correction) and record the `ρ × <declared max> ≤ 5.6 px` preferred
result, measured the same way as every other edge-placed master. Crate
Cluster met both hard and preferred; Storage Vessel met hard only — see
Section Q for the review record.

### P. Rejection Triggers

* category confusion or poor gameplay readability at attachment scale
* visual weight competing with or exceeding the anchor it sits beside
* hidden semantic handedness in a candidate claimed orientation-neutral
* baked shadow, glow, ground, or neighbouring object
* Technical Asset Contract failure, broken transparency, or invalid export
* unusable or dishonest pivot/bounds/footprint
* city stereotype or mixed-city contamination
* `ρ × <declared maximum height> > 8 px` (hard road-intrusion failure,
  evaluated per master against its own ceiling — `36 px` Crate Cluster,
  `26 px` Storage Vessel per Section H's `1.2` correction)
* uncontrolled/undocumented variant (a third master, a combined composition,
  or a directional cue not in this brief)

### Q. Review Record

* Reviewer: Claude (engine), Masala Run Session 61 Phase 2 — technical
  integration review; PM performed source-candidate selection separately
  (see Selected Candidate below), runtime/visual sign-off still open
* Review Date: `2026-08-14`
* Candidate Identifiers: `masala_run_crate_cluster_candidate1.png`,
  `masala_run_storage_vessel_candidate2.png` (both in `~/Documents/Working
  images/`, PM-selected from 4-candidate batches per master, per this brief's
  Section N)
* Result: **PASS** (technical), and now contract-clean at the spec level too
  — both isolated correctly, both orientation-neutral verified from pixels,
  both pass the 8px hard road-intrusion cap at their shipped heightPx (26px)
  AND at their respective declared maximum heights (Section H, `1.2`).
  Storage Vessel passes with less margin than any other registered master in
  this repo (6.77-6.79px, above the 5.6px preferred band, though its declared
  maximum is now 26px rather than 36px so there is no longer a documented
  ceiling the shipped binary fails to meet).
* Failure Classification: none against the art or the shipped runtime state.
  One specification error was found and is now fully corrected: the brief's
  originally declared 36px maximum runtime height for the Storage Vessel was
  not achievable (measured ~9.4px projected intrusion against the frozen
  Session 56 8px hard cap) — Section H's declared maximum for that master is
  now `26 px`, matching its target height, as of `1.2`.
* Evidence: full pixel-level measurement trail (alpha/isolation verification,
  connected-component dust check, mirror-symmetry diff, footprint/visualBounds/
  pivot scans, live `__mr.edgeProps.placements` cross-check) recorded in
  `CHANGELOG.md`'s Session 61 Phase 2 integration entry and in both masters'
  `assets/metadata/*.json` `notes` fields
* Required Corrections: none to the art, geometry, runtime height, budgets, or
  the binary itself — brief-text correction only, now applied directly to the
  authoritative Section G/H/I/K/O/P fields (`1.2`), not left as a
  clarification aside
* Brief Revision Needed: yes — `1.0 → 1.1` (clarification note, appended-only)
  `→ 1.2` (the actual field correction, edited in place, per the framework's
  normal versioned-revision path) — see Section R
* Prompt-only Revision Allowed: n/a — no re-generation needed
* Selected Candidate: Crate Cluster candidate 1; Storage Vessel candidate 2
  (PM's own selection, made before this technical review)
* Final Approval Note: technical integration PASS. Registered in
  `EDGE_PROP_DEFS`/`PRODUCTION_CATALOGUE_KEYS`, shipped
  (`sw.js`/`BUILD_TAG` bumped), regression-clean. Metadata held at
  `status: "review"` — PM runtime/visual sign-off on the integration
  screenshots is the one remaining gate before `"approved"`.

### R. Revision History

| Version | Date | Changed section | Reason | Evidence/failure addressed | Approver |
|---|---|---|---|---|---|
| `1.0 / V1` | `2026-08-14` | Full A–R initial brief | Session 61 Phase 2: define the first standalone `attachment`-role small-prop family to replace the Session 60 attachment probes; no existing brief covered a runtime-composable secondary prop | No image generation is part of this session (no tool access); replaces borrowed-pixel probes with a real, narrowly-scoped brief per the framework's "if no appropriate brief exists, create the minimum required" rule | Masala Run Production Review |
| `1.1 / V1` | `2026-08-14` | Status; Section H (clarification note appended); Section Q; Section R | Session 61 Phase 2 integration pass: PM-selected candidates measured and registered. Real geometry corrected two assumptions in the original brief text (pivot convention, Storage Vessel's max-height ceiling) — corrected via an appended clarification note, not by editing the original passages, per this repo's doc-provenance convention | Real alpha-column measurement of both PM-selected candidates; live `__mr.edgeProps.placements` cross-check; `tools/verify/regression.js` full pass | Masala Run Production Review |
| `1.2 / V1` | `2026-08-15` | Section A (Version/Status); Section G (Intended/Declared height fields split per master); Section H (Maximum Playable Intrusion split per master, clarification note trimmed to pivot-only); Section I; Section O; Section P; Section Q; Section R | Follow-up correction, through the framework's normal versioned-revision path: `1.1`'s appended clarification note is superseded by editing the authoritative spec fields directly. Storage Vessel's declared maximum runtime height is changed from `36 px` to `26 px` (equal to its target — no headroom), explicitly recording that `36 px` failed the frozen Session 56 hard geometry contract at ~9.4px projected intrusion. Crate Cluster's `36 px` declared maximum is unchanged (it passes comfortably). No change to `game.js`, runtime height, budgets, geometry logic, or either asset binary — documentation and metadata only | Same measurement evidence as `1.1` (`ρ × 36px` = 9.37-9.41px for the Storage Vessel, over the 8px hard cap); this revision changes how the brief records that evidence, not the evidence itself | Masala Run Production Review |

Next task: **PM runtime/visual sign-off on the integration screenshots
(`CHANGELOG.md`'s Session 61 Phase 2 integration entry lists the four
day/night × edge × anchor-type combinations captured). On sign-off, advance
both metadata records from `"review"` to `"approved"`. No further brief work is
required — this family is otherwise closed.**

Superseded (`1.0`'s original next-task text, kept for the trail per this
repo's doc-provenance convention, not a currently-open task): "Run the two
Section M generation prompts externally (PM/ChatGPT), review the 8 candidates
against Section O/P, select one per master, then hand back for measurement
(visualBounds/footprint/pivot/ρ), metadata completion, `EDGE_PROP_DEFS`
registration on both edges, Session 60 probe removal, and the
Session 50/51/56/57/60/61-Phase-1 regression suite — no runtime change is made
until real binaries exist."
