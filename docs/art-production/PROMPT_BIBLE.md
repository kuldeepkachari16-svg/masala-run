# Prompt Bible

Version: 1.0
Status: Frozen
Freeze Date: 2026-07-31
Next Production Phase: City-kit and pilot asset production

## Purpose

The Prompt Bible translates the frozen Art Bible into repeatable AI-generation
instructions.

It operationalizes approved creative rules without reinterpreting, weakening,
replacing, or contradicting the Art Bible.

This document is a governed production framework, not a collection of final
asset prompts.

It does not define final Mumbai, Jaisalmer, enemy, pickup, hazard, prop, VFX, or
asset-production prompts.

## 1. Authority & Governance

Authority order:

```text
Art Bible
→ Prompt Bible
→ Technical Asset Contract
→ Category-specific Asset Brief
→ Generated Asset or Implementation Output
```

The Prompt Bible operationalizes creative rules from the Art Bible.

The Technical Asset Contract governs technical and runtime integration.

If creative and technical requirements conflict, document the conflict for
resolution. Do not silently choose one side or generate a contradictory prompt.

Production authority flow:

```text
Art Bible rule
→ Prompt Bible instruction
→ Asset prompt
→ Generated asset
→ Review
```

Never allow:

```text
Generated image
→ revision of approved Art Bible principles
```

Generated images validate prompts. They do not redefine creative rules.

Global production priority:

```text
Gameplay → Accessibility → Modularity → Category Recognition → Feedback → City Identity → Charm → Beauty
```

Local module hierarchies may refine this priority but cannot contradict it.

Across every module, critical gameplay information must remain understandable
without sole reliance on colour, glow, brightness, flashing, particles,
decorative animation, audio, haptics, or shadow presence. Use multi-cue
communication. Where relevant, inherit colour-safe recognition, reduced motion,
reduced VFX, reduced flashes, reduced particles, scalable UI, localisation, and
Full, Reduced, and Essential-Only behaviour.

## 2. Prompt Inheritance Model

Production prompts should inherit rules through this structure:

```text
Global Rules
→ Asset-Category Rules
→ city skin
→ day/night treatment
→ Specific Asset Brief
→ Technical Asset Contract
```

Each production prompt should inherit only the relevant modules.

Avoid rewriting every global rule independently inside every production prompt.

Avoid one universal prompt for all asset types.

## 3. Standard Prompt Anatomy

Standard production prompt order:

```text
Asset Purpose
→ Gameplay or Environmental Role
→ Visual Priority
→ Shape and Style
→ City Treatment
→ Day/Night or Lighting Treatment
→ Composition and Isolation Requirements
→ Technical Output Requirements
→ Negative Constraints
→ Review Target / Acceptance Criteria
```

Gameplay purpose and visual hierarchy must be established before decorative
treatment.

## 4. Global Positive Rules

Global positive rules are inherited by production prompts where applicable.

Use a concise global-positive block. Do not copy the entire Art Bible into every
prompt.

Inherited global-positive block:

```text
Clean flat-cartoon visual language.
Silhouette-first readability.
Slightly exaggerated but world-native proportions.
Mostly rounded forms with selective sharp accents.
Flat solid fills.
No more than one simple shade, highlight or accent layer where required.
Restrained and meaningful detail.
Simplified material cues.
Gameplay-first visual hierarchy.
Modular and reusable production intent.
Compatibility with procedural assembly.
Warm, playful and welcoming personality.
City flavour expressed through restrained visual cues.
Environment subordinate to gameplay.
```

## 5. Global Negative Rules

Global negative rules define universal exclusions for permanent project failure
risks.

Use explicit behavioural statements rather than relying only on isolated
negative keywords.

Universal exclusions:

* Do not use realism, photorealism, painterly rendering, or a 3D-rendered
  appearance.
* Do not use gradients, airbrushed shading, complex realistic lighting,
  uncontrolled glow, or bloom.
* Do not use excessive texture, decorative clutter, or generic mobile-template
  styling.
* Do not generate complete painted backgrounds, complete street scenes, or
  handcrafted scene compositions.
* Do not include readable text, typography, branding, or logos unless explicitly
  requested and approved for that asset.
* Do not add unnecessary cultural ornament.
* Do not use tourist-poster treatment, landmark dependence, or stereotype-heavy
  city treatment.
* Do not create an asset that visually impersonates another gameplay category.

Asset-category modules may add category-specific exclusions.

**AI creates modular assets, not complete scenes.**

## 6. Gameplay Priority Tiers

Every production prompt must explicitly declare its visual-priority tier.

Standard visual-priority tiers:

```text
Tier 1
→ Player
→ Critical danger
→ Critical gameplay warnings

Tier 2
→ Enemies
→ Major threats
→ High-risk hazards

Tier 3
→ Pickups
→ Important attacks and projectiles
→ Medium-risk hazards
→ Important feedback

Tier 4
→ Environmental props
→ Modular micro-clusters
→ Secondary world elements

Tier 5
→ Frontage
→ Road texture
→ Safe overlays
→ Ambient decoration
```

The tier should influence:

* silhouette clarity
* outline strength
* contrast
* saturation
* detail density
* motion
* glow
* effect intensity

Everything must not shout equally.

## 7. Asset-Category Modules

The Prompt Bible uses dedicated inherited modules for asset categories.

Required category-module architecture:

* player and playable characters
* enemies
* pickups and rewards
* hazards
* attacks and projectiles
* VFX and particles
* environmental props
* modular micro-clusters
* frontage and architectural elements
* road bases
* safe road overlays
* road markings
* lighting and shadow overlays
* World-space UI
* screen-space UI

Each category module defines, where applicable:

* gameplay or environmental role
* visual-priority tier
* silhouette behaviour
* outline strength
* contrast and saturation expectations
* detail limits
* animation or motion expectations where relevant
* category-specific negative rules
* technical-output expectations
* acceptance criteria

These modules define reusable production rules and templates without hardcoding
final asset concepts.

### 7.1 Environmental Props Prompt Module

#### Scope, Authority & Inheritance

This module applies only to standalone, reusable environmental props intended
for procedural placement inside Masala Run's non-playable left or right edge
zones. Examples include stools, crates, baskets, vessels, clay pots, lanterns,
plants, parked cycles, small carts, stall components, and similar isolated
physical edge objects.

This module does not define modular micro-cluster composition, frontage assets,
road bases, road overlays, hazards, pickups, enemies, player assets, attacks,
VFX, lighting overlays, World-space UI, screen-space UI, final Mumbai or
Jaisalmer asset catalogues, or exact production prompts for individual assets.

It inherits and must remain fully consistent with:

* the frozen Art Bible
* the global Prompt Bible authority, governance, and inheritance rules
* the Prompt Bible foundation and global positive and negative rules
* the Technical Asset Contract
* the gameplay-priority tier system
* the City Identity Framework
* the Modular Asset System
* the Style & Shape Language
* the Colour & Contrast Language
* the Lighting & Time of Day rules
* Accessibility & Comfort Language

Nothing in this module weakens, reinterprets, replaces, or contradicts an
approved principle. If this module and an inherited authority appear to
conflict, escalate the conflict under Section 15 rather than inventing a rule.

#### Definition, Role & Required Opening

An environmental prop is:

> A standalone, reusable, non-gameplay physical object designed for procedural
> placement inside a non-playable environmental edge zone.

Environmental props are Tier 4 assets. They support the world, controlled charm,
and city identity, but never compete with survival gameplay. They must be
recognizable at gameplay distance while remaining clearly quieter than the
player, enemies, hazards, important attacks, pickups, and critical gameplay
feedback.

Every environmental-prop production prompt must open by declaring:

* one isolated environmental prop as the output
* placement inside the non-playable left or right edge zone
* Tier 4 environmental priority
* a decorative, non-interactive role
* subordination to gameplay objects

Recommended opening logic:

```text
Create one isolated Tier 4 environmental prop intended for procedural placement
inside the non-playable left or right edge zone of Masala Run. It is decorative
and non-interactive and must remain subordinate to gameplay objects.
```

Equivalent wording is permitted when structurally clearer, provided every
required declaration remains explicit.

#### Silhouette, Recognition & Proportions

Environmental props must:

* be recognizable primarily through their outer silhouette
* remain readable at gameplay distance
* use a moderately simplified silhouette
* use only one or two characteristic projections or identifying forms where
  useful
* avoid realistic irregularity
* avoid icon-level oversimplification that makes the object generic

Useful identifying forms may include a kettle spout, basket handle, cycle wheel,
cart awning, vessel neck, stool legs, or lantern frame.

```text
Silhouette explains the object.
Details only confirm it.
```

Use slightly exaggerated, chunkier, world-native proportions. Each prop must be
believable enough to belong in the world, exaggerated enough to remain readable,
and simplified enough for mobile gameplay. It must be neither strongly toy-like
nor strictly realism-bound.

```text
Believable enough to belong.
Exaggerated enough to read.
```

#### Shape Language & Detail Density

Use mostly rounded forms, selective sharp or structural accents, clean
flat-cartoon construction, stable readable masses, and controlled asymmetry
where useful.

Sharp or structural accents are allowed only when they explain a frame, handle,
tool, wheel, awning, sign, material, or architectural relationship. Sharpness
must not make the world visually harsh.

Use moderate selective detail. A typical prop should contain approximately two
to four meaningful internal cues. Every cue must serve object recognition,
material recognition, restrained city flavour, controlled charm, or silhouette
support.

Do not add decorative detail for richness alone, tiny cracks, dense grime,
intricate patterns, excessive accessories, realistic wear, texture noise, or
small unreadable features.

#### Fill, Shading & Outline Strength

Use clean flat fills and at most one simple shade, highlight, or accent layer.
Simplified top/side plane separation is allowed where it improves recognition.
Do not use realistic rendering, gradients, painterly lighting, airbrushed
shadows, realistic reflections, complex texture, volumetric shading, a
3D-rendered appearance, or glossy product-illustration treatment.

Use soft or light outlines. Environmental-prop outlines must remain clearly
weaker than those of the player, enemies, high-risk hazards, important attacks,
and pickups. Props must remain readable without shouting.

```text
Player / enemies / hazards
> pickups and important attacks
> environmental props
> frontage and road texture
```

#### Colour Treatment

Use muted city-palette colours, low-to-moderate saturation, and no more than one
small controlled accent where useful. A city-specific colour skin remains
subordinate to global gameplay colour ownership and accessibility requirements.

Avoid strong saturation across the whole prop; colours associated with pickups,
hazards, enemy threat cues, or attack effects; and excessive neutral-grey
treatment that removes city identity.

```text
Muted city colour.
Controlled accent.
No gameplay-category confusion.
```

#### Material Abstraction

Every production prompt must identify the intended real-world material and state
how it is simplified in the flat-cartoon language. Never request realistic
material rendering.

```text
Painted metal
→ muted solid fill + one small flat highlight

Cloth
→ simple fold, flap or stripe cue

Wood
→ warm flat fill + one or two simple grain marks only if needed

Clay
→ warm solid fill + restrained rim or surface cue

Stone
→ broad warm mass + minimal edge mark

Glass
→ simplified transparent or reflective cue only where technically safe
```

#### City Skin, Day/Night, Patterns & Motifs

A single environmental prop may carry only one or two restrained city cues. It
contributes to a larger city-identity system and must not identify an entire city
by itself. Cues may come from material, silhouette, prop type, form, colour
accent, restrained pattern, or street-culture association.

City treatment inherits the City-skin Framework and approved `CITY_KITS.md`
parameters. Day and night use the same structural prop asset; time-of-day
lighting remains separate unless the Technical Asset Contract explicitly
approves a modular variant. Preserve silhouette, role, scale, material
recognition, accessibility, and procedural compatibility across both states.

Avoid stereotype-heavy design, landmark dependence, tourist-poster treatment,
exaggerated cultural symbolism, decorative authenticity theatre, and city
identity that overpowers gameplay hierarchy.

Patterns or motifs may appear only in one small, structurally natural,
controlled area such as cloth, an awning, a container panel, packaging, a small
decorative surface, or an abstract sign panel. They must be simple, low-density,
low-to-moderate contrast, subordinate to silhouette, and non-gameplay-like.

Do not use dense or intricate motifs, high-contrast patterns, full-surface
coverage, or patterns resembling pickups, hazards, attacks, spawn markers, or
UI.

#### Signage & Implied Human Presence

Sign-related props may use abstract marks, icon-like shapes, unreadable symbolic
forms, or non-linguistic sign geometry. Do not generate readable text, shop
names, branding, logos, labels, letters, numbers, or accidental pseudo-text.

Environmental props must not contain visible people. Human presence may be
implied through traces of activity, such as arranged stools, a cup on a counter,
folded cloth, stacked vessels, an open container, a lit lantern, a parked cycle,
or organized serving objects.

Do not include people, partial people, hands, faces, human silhouettes, crowd
elements, or NPC-like figures.

#### Isolation, Framing, Ground & Shadows

Generate one complete, isolated object with transparent breathing space on all
sides.

```text
Complete object
+ no accidental clipping
+ safe transparent padding
+ no environmental scene
+ no baked floor or ground
```

Centre or frame the prop predictably for cropping, scaling, metadata validation,
procedural placement, variant production, and automated QA. Purposefully cropped
edge assets are separate, explicitly defined variants.

Do not include pavement, road, sand patch, floor, background surface,
environmental base, or decorative ground scene. A simple, tightly contained
contact shadow is allowed only when it is technically compatible, useful for
grounding, separable or safely reusable, visually quiet, and not mistaken for a
baked ground patch.

The default remains:

```text
Isolated prop on transparent background.
```

#### Camera & Perspective

Match Masala Run's approved world camera:

* high bird’s-eye view
* slight perspective tilt used only to improve recognition
* no dramatic depth
* no generic product-shot perspective
* no eye-level view
* no isometric view unless separately approved
* no strict flat top-down treatment when it destroys object recognition

The prop must integrate visually with the same world camera used by gameplay.

#### Mandatory Category Negatives

Every environmental-prop production prompt must explicitly prohibit the asset
from resembling a pickup, reward, enemy, hazard, obstacle, attack, projectile,
spawn marker, movement path, interaction target, UI icon, UI button, or gameplay
instruction.

It must also explicitly prohibit:

* people
* animals unless explicitly approved as a separate asset
* moving vehicles
* readable text, logos, and branding
* complete background scenes
* road surfaces, ground patches, and baked environment
* realistic, painterly, or 3D-rendered treatment
* excessive detail or saturation
* dramatic lighting
* accidental clipping
* duplicate objects unless explicitly requested
* fused object groups
* unwanted shadows or glow pools
* composition unsafe for procedural placement

These exclusions supplement rather than replace the global negative rules.

#### Technical Asset Contract

Each production prompt must inherit all applicable Technical Asset Contract
fields, including output format, transparency, dimensions, canvas rules, naming,
orientation, pivot, safe padding, metadata, variant requirements, left/right
awareness, and file-path expectations.

Do not invent, copy, or redefine technical values governed by the Technical
Asset Contract. Insert the applicable authoritative values in the dedicated
Technical Output Requirements section when preparing a production prompt.

#### Acceptance Criteria

Review and accept an environmental prop in this order:

1. Clearly reads as a non-gameplay environmental prop.
2. Is recognizable at gameplay distance.
3. Does not resemble another gameplay category.
4. Matches Masala Run's approved camera.
5. Matches the clean flat-cartoon style.
6. Uses a silhouette-first design.
7. Uses restrained detail.
8. Uses soft outlines.
9. Uses muted city colours with controlled accents.
10. Uses simplified material cues.
11. Is isolated and procedurally reusable.
12. Contains no baked ground scene.
13. Carries restrained city identity without stereotypes.
14. Adds controlled charm without demanding attention.
15. Meets the Technical Asset Contract.

#### Rejection Rules

Reject or regenerate an environmental prop that:

* looks collectible, dangerous, interactive, enemy-like, hazard-like, or like an
  attack or projectile
* resembles UI
* is unreadable at gameplay distance
* relies on internal detail instead of silhouette
* is overly realistic, painterly, or 3D-rendered
* contains excessive detail, contrast, or saturation
* contains readable text or visible people
* contains baked pavement, sand, road, ground, or a complete environmental scene
* has accidental clipping or incorrect camera perspective
* misuses gameplay-owned colours
* depends on a stereotype or landmark
* cannot be placed procedurally or requires handcrafted scene composition
* violates the Technical Asset Contract

### 7.2 Modular Micro-Clusters Prompt Module

#### Scope, Authority & Inheritance

This module governs how modular environmental micro-clusters are specified,
generated, varied, reviewed, and rejected. It translates approved Art Bible
principles into prompt-authoring rules; it does not create city catalogues,
production prompts, image assets, or implementation logic.

The Art Bible remains the highest creative authority. This module inherits:

* all global Prompt Bible rules
* the Environmental Props Prompt Module
* the Technical Asset Contract for dimensions, pivots, alpha, padding, cropping,
  naming, export, metadata, and all other technical requirements

This module may specialize inherited rules for micro-clusters but must not
contradict them. Gameplay clarity, accessibility, modularity, procedural
compatibility, and category recognition remain mandatory.

```text
Gameplay clarity
> accessibility and comfort
> modular and procedural viability
> gameplay-category recognition
> city identity
> charm and personality
> beauty and spectacle
```

#### Definition & Environmental Role

A modular micro-cluster is:

```text
One small Tier 4 environmental composition
built around one clearly readable anchor object
and a controlled set of optional supporting attachments.
```

A cluster must communicate one clear environmental idea, remain decorative and
non-gameplay, stay subordinate to the player, enemies, hazards, pickups,
attacks, projectiles, and UI, and remain suitable for procedural edge placement.
It must not become a miniature scene, complete edge strip, baked background, or
diorama.

```text
One cluster = one readable environmental idea.
```

Directional examples include a tea-stall corner, fruit-cart setup, clay-pot
arrangement, parked-cycle corner, lantern corner, or small shopfront setup. These
examples explain the grammar only and must not become final city asset lists.

#### Internal Structure & Hierarchy

Prefer:

```text
One primary anchor
+ one to three meaningful attachments
+ zero to two very small supporting elements
```

A typical cluster should contain approximately three to six visible components.
This is guidance, not a compulsory quota. The anchor defines the identity, and
every supporting object must strengthen the same idea. Do not use multiple equal
anchors or unrelated objects merely to increase richness. A second large object
is allowed only when clearly subordinate.

```text
Anchor
> supporting attachments
> minor accessories
```

The complete cluster remains lower in visual priority than gameplay objects.

#### Cluster Readability

At gameplay distance, the reading order must be:

```text
Cluster idea first
→ anchor second
→ attachments third
→ small detail last
```

The overall idea must read before internal details. The anchor silhouette must
be immediately understandable, and individual major objects must remain
distinguishable. Internal detail confirms rather than rescues the silhouette.
Avoid fused object masses and disconnected catalogue-style arrangements.

#### Density & Breathing Space

Use sparse-to-medium density.

```text
Life, not noise.
Charm, not clutter.
```

Preserve readable separation between major objects, allow selective natural
overlap, and include internal breathing space. Do not reproduce realistic Indian
street clutter, fill every transparent area, create a dense mini-scene, or leave
large gaps that make the composition accidental or disconnected.

#### Anchor & Attachment System

Every cluster family must define:

* one approved anchor type
* a small controlled attachment pool
* allowed attachment combinations
* prohibited additions where necessary

Example structure only:

```text
Anchor:
tea stall

Optional attachments:
- stool
- kettle
- vessel stack
- abstract sign shape
- small crate
```

Attachments must remain subordinate to the anchor and semantically related to
it. Prompt authors must specify approved choices. Unlimited model-invented
additions are prohibited; the model must not add objects merely for atmosphere.

#### Baked Composition & Runtime Separation

A readable core cluster may be authored as one composed asset. Optional
attachments or composition variants may be generated separately. This module
does not require every tiny prop to become a separate runtime object and does
not define runtime composition logic.

The final asset must remain procedurally reusable without handcrafted scene
placement. Avoid permanently fixed large scenes, complete environmental strips,
compositions dependent on exact neighbouring assets, and designs that cannot
tolerate procedural spacing or repetition.

#### Left/Right Orientation & Road-Facing Behaviour

Support left/right-aware variants when composition, road-facing direction,
perspective, frontage, lighting, shadow, crop behaviour, or object orientation
matters.

Important directional clusters require intentional left-edge and right-edge
versions. Simple symmetrical clusters may remain universal. Never assume
automatic mirroring. Do not mirror readable or text-like forms, create
inconsistent lighting, or mirror a composition when doing so breaks perspective
or serving orientation.

Where natural, stalls, benches, counters, awnings, and similar clusters should
visually acknowledge the playable road. They must remain clearly outside it,
must not spill into it, imply that the player should enter the edge, appear
interactive without an explicitly approved gameplay system, or confuse the
movement boundary.

#### Isolation, Alpha & Transparent Padding

Default outputs must use transparent backgrounds, remain isolated, preserve the
complete composition, include safe transparent breathing space, avoid accidental
clipping, and avoid touching the canvas edge unless explicitly approved.

Exact dimensions, padding, pivots, bounds, export rules, alpha requirements, and
metadata defer to the Technical Asset Contract. Padding must support scale
variation, edge placement, crop validation, left/right variants, shadow
containment, procedural composition, and automated QA without excessive unused
canvas that harms packing efficiency.

#### Cropped Variants

Default clusters are complete isolated compositions. Purposefully cropped
variants are allowed only when explicitly declared for offscreen continuation,
frontage-adjacent use, screen-edge use, or boundary continuation.

A cropped variant must declare its crop direction, preserve the readable anchor,
retain procedural usefulness, use correct orientation and pivot metadata, and
never look accidentally clipped. Accidental cropping is a rejection condition.

#### Ground, Surface & Shadow Restrictions

Do not include baked environmental ground. Explicitly prohibit pavement patches,
road patches, sand floors, stone floors, footpath slabs, large shadow platforms,
decorative base plates, complete terrain slices, and miniature diorama bases.
Edge ground, footpath, road, sand, stone, and other environmental surfaces are
assembled separately.

```text
Cluster asset, not miniature scene.
Objects only, no baked environment floor.
```

Simple, tightly contained contact shadows are allowed only when technically safe
and consistent with inherited lighting rules. Shadows may ground objects but
must remain subtle and subordinate. Avoid one large unified dark shadow under
the cluster and any shadow resembling a hazard, obstacle, interaction zone,
spawn marker, or baked ground.

Shadow direction and intensity must remain compatible with day/night and
left/right variants. Where lighting is handled through overlays, follow the
approved overlay system.

#### City Identity & Modular Reuse

Each cluster should carry a restrained combination of one or two approved city
cues, such as anchor type, material, silhouette, awning or vessel form,
restrained pattern, approved palette skin, street-culture association, frontage
language, or practical-light type.

A cluster must not communicate an entire city by itself. City identity emerges
across complementary assets and layers. Avoid landmarks, stereotypes,
tourist-poster treatment, maximum cultural decoration, and unique details that
reduce procedural reuse.

```text
Base asset
→ variant
→ city skin
→ instance
```

Use:

```text
Shared cluster grammar
+ reusable props
+ restrained city skins
+ justified city-unique anchors
```

A city-unique anchor is justified only when shared assets, variants, skins, or
attachments cannot express an important approved identity pillar. Visual
attractiveness alone is not sufficient justification.

#### Day & Night Variants

Day and night variants must preserve the same anchor, cluster idea, basic
arrangement, silhouette, procedural footprint, city identity, and
gameplay-category safety.

Night may add a controlled lit-lantern or warm-bulb state, selected
practical-light overlay, restrained highlight, subtle palette adjustment, or
small localized glow attached to a believable light source.

Night must not redesign the cluster, add unrelated objects, create large glow
pools, flood the playable road, become a separate handcrafted scene, or reduce
gameplay readability.

```text
Same cluster.
Same structure.
Different controlled lighting state.
```

#### Repetition Disguise

Approved variation levers include:

* optional attachments and approved attachment combinations
* left/right-aware variants
* restrained colour accents
* day/night lighting states
* intentional crop variants
* small scale variation where technically valid
* controlled procedural spacing
* surrounding breathing-gap variation

Do not use unlimited model improvisation, arbitrary object replacement,
uncontrolled random rotation, large scale changes, inconsistent perspective,
decorative clutter, or complete recomposition on every generation. Variation
must preserve cluster-family identity.

#### Camera, Perspective, Style & Colour

Every cluster inherits the approved camera and perspective:

* high bird’s-eye view
* slight perspective tilt only for recognition
* correct road-facing orientation
* scale appropriate to gameplay distance
* shallow environmental depth
* no side-view or eye-level composition
* no dramatic cinematic angle or deep street scene
* no isometric drift unless separately approved
* no perspective contradicting adjacent edge assets

Every cluster also inherits the Style & Shape Language: clean flat-cartoon forms,
silhouette-first readability, mostly rounded shapes with selective sharp
accents, slight exaggeration, moderate selective detail, softer outlines than
gameplay objects, and flat fills.

Do not use gradients, painterly rendering, realistic textures, complex lighting,
excessive decorative detail, generic mobile-template styling, photorealism, or a
3D-rendered look.

Use muted city palettes, small controlled accents, and lower contrast than
gameplay objects. Avoid protected gameplay colours where confusion may occur,
bright reward-like or danger-like treatment, strong glowing borders, and UI-like
icon colours. The cluster must remain readable without becoming dominant.

#### Mandatory Category-Confusion Negatives

Every micro-cluster prompt must explicitly prohibit resemblance to a pickup,
reward, enemy, hazard, obstacle, attack, projectile, spawn marker, movement path,
interaction target, gameplay instruction, targeting marker, World-space UI,
screen-space UI, button, icon, or status marker.

It must also explicitly prohibit:

* visible people and NPC-like figures
* animals unless explicitly approved
* moving vehicles
* readable text and logos
* complete street scenes, edge strips, or painted backgrounds
* baked ground
* dramatic lighting and large glow pools
* dense clutter and unrealistic object density
* accidental cropping
* fused silhouettes

Decorative clusters must never appear actionable. These negatives supplement
rather than replace the inherited global and environmental-prop exclusions.

#### Acceptance Hierarchy

Review and accept a generated micro-cluster in this order:

1. Clearly reads as one non-gameplay environmental idea.
2. Anchor is immediately identifiable.
3. Cluster remains subordinate to gameplay.
4. Does not resemble any gameplay or interactive category.
5. Reads clearly at gameplay distance.
6. Uses controlled internal hierarchy.
7. Uses sparse-to-medium density.
8. Preserves breathing space and readable silhouettes.
9. Matches approved camera and perspective.
10. Uses the clean flat-cartoon style.
11. Contains no baked ground or complete scene.
12. Is isolated, crop-safe, and procedurally reusable.
13. Supports appropriate left/right awareness.
14. Supports controlled attachment variation.
15. Uses restrained city identity without stereotypes.
16. Preserves day/night structural consistency.
17. Supports repetition disguise without uncontrolled invention.
18. Meets the Technical Asset Contract.

#### Immediate Rejection Rules

Reject or regenerate a cluster that:

* contains multiple competing anchors or fails to communicate one clear idea
* becomes a dense miniature street scene
* resembles a gameplay object or appears interactive
* intrudes into the playable road or confuses its boundary
* contains baked pavement, road, sand, floor, terrain, or a platform-like shadow
* contains visible people, moving vehicles, readable text, or logos
* depends on a landmark, stereotype, or excessive cultural decoration
* uses unrealistic or dense street clutter
* uses an incorrect camera angle or perspective
* has fused or unreadable silhouettes, accidental clipping, or unsafe alpha
* cannot support procedural placement or requires exact handcrafted neighbours
* depends on uncontrolled random generation or cannot disguise repetition
* creates unrelated day/night designs
* uses large glow pools or dramatic lighting
* violates the clean flat-cartoon style
* conflicts with the Art Bible or Technical Asset Contract

#### Scope Boundary

This module may define prompt structure, anchor and attachment rules, cluster
readability, hierarchy, density, breathing space, left/right awareness, crop
intent, ground restrictions, grounding, city-skin logic, day/night variation,
repetition disguise, category-confusion negatives, and acceptance and rejection
rules.

It must not define final Mumbai or Jaisalmer cluster catalogues, exact city asset
lists, actual production image prompts, final asset counts, procedural placement
algorithms, runtime composition, gameplay or rendering code, metadata-schema or
naming-standard changes, Technical Asset Contract changes, or generated image
assets.

#### Governing Principle

```text
A modular micro-cluster is one small Tier 4 environmental composition
built around one clearly readable anchor object and a controlled set of
optional supporting attachments.

It communicates one environmental idea, uses sparse-to-medium density,
maintains readable internal hierarchy and breathing space, remains
clearly outside the playable road, contains no baked ground or complete
scene, supports procedural reuse and repetition disguise, and carries
only restrained city and time-of-day treatment.
```

### 7.3 Frontage & Architectural Elements Prompt Module

#### Scope, Authority & Inheritance

This module governs prompts for frontage and architectural elements. It
translates frozen Art Bible principles into production-ready instructions
without redefining them. The Art Bible remains the highest creative authority.

Every frontage prompt inherits:

* all global Prompt Bible positive and negative rules
* the visual-priority tier system
* the City-Skin and Day/Night modules
* applicable modularity, accessibility, comfort, colour, style, and camera rules
* the Technical Asset Contract for dimensions, pivots, alpha, padding, cropping,
  naming, export, metadata, and other technical requirements

This module may specialize inherited rules but must not contradict them.
Frontage is a quiet Tier 5 environmental layer, lower in visual priority than
environmental props and modular micro-clusters.

#### Governing Principle & Role

```text
Frontage suggests place and offscreen continuation.

Frontage does not become:
- scenery spectacle
- a complete building showcase
- a complete street scene
- a baked edge strip
- a handcrafted background
```

Frontage exists behind edge props and micro-clusters as a shallow, quiet
architectural layer. It communicates restrained city identity while remaining
subordinate to the playable road and active gameplay.

#### Asset Definition & Production Unit

A frontage asset is a:

```text
cropped modular architectural segment
```

It is not a complete building, complete façade illustration, connected street,
full-screen background, or long baked edge strip.

Use a small-to-medium reusable segment that communicates one clear architectural
idea. Directional examples include a shuttered urban shopfront, simple awning
frontage, low sandstone wall with arched opening, compact residential frontage,
muted utility frontage, low platform frontage, or cropped wall-and-window
rhythm. These examples are illustrative grammar, not final city asset lists.

```text
One frontage segment = one readable architectural idea.
```

Do not combine several equal architectural ideas into one dense asset.

#### Visual Priority & Style

Frontage is Tier 5 and must remain quieter than the player, enemies, hazards,
attacks, pickups, environmental props, and micro-clusters. Use:

* broad, simplified, clean flat-cartoon forms
* mostly rounded construction with selective architectural sharpness
* restrained proportions and sparse meaningful detail
* muted city palettes and low contrast
* flat solid fills
* at most one simple shade or accent layer
* simplified, visually quiet material cues
* minimal or soft outlines

Do not use gradients, painterly rendering, realistic textures, a 3D-rendered
appearance, cinematic composition, decorative noise, or generic mobile-template
styling.

#### Architectural Depth, Hierarchy & Readability

Use shallow layered depth only. Allowed elements include broad façade masses,
shutters, windows, doors, ledges, fixed awnings, low platforms, arches, roofline
hints, and cropped structural planes.

Do not generate deep alleys, visible street depth, detailed interiors, complex
perspective scenes, receding architectural environments, or cinematic building
compositions.

Prompt descriptions must prioritize:

```text
architectural mass and silhouette
→ opening rhythm
→ major structural features
→ simplified material cues
→ sparse secondary details
```

Internal decoration must not carry the frontage identity. If broad silhouette
and massing fail, detail must not be used to rescue the asset.

#### Segment Scale & Structural Rhythm

A frontage segment should contain approximately one to three broad
architectural bays or an equivalent simple structural rhythm. It must be large
enough to read at gameplay distance but short enough to repeat procedurally,
crop safely, combine with other segments, support breathing gaps, and avoid
becoming a full edge strip.

Doors, shutters, and windows must be large, simplified, sparse, recognizable at
gameplay distance, and consistent with the flat-cartoon style. Avoid tiny panes,
elaborate grillwork, realistic reflections, dense carvings, complex interiors,
excessive trim, and individually rendered ornament.

#### Selective Structural Features

Integrate a fixed awning, arch, ledge, low platform, plinth, built-in shelf,
drainage pipe, wall lamp, abstract fixed sign shape, cropped roofline, or shutter
frame only when it supports the architectural idea. Do not make every frontage
use the same checklist.

#### Crop & Offscreen Continuation

Controlled offscreen cropping is encouraged. Continuation may be implied through
wall planes, rooflines, ledges, platforms, awnings, structural masses, and
partially cropped openings.

Cropping must be intentional and production-safe. Do not paint neighbouring
buildings or surrounding streets to explain what lies outside the asset.

Every prompt must distinguish:

```text
intentional off-canvas continuation
from
accidental asset clipping
```

#### Architectural Base & Environmental Ground

Do not generate road, a pavement scene, sand field, terrain, environmental
floor, complete footpath, or full boundary strip.

A narrow structural base is allowed only when inseparable from the architecture,
such as a doorstep, plinth, low stone platform, wall base, or threshold.

```text
Architectural base allowed.
Environmental ground scene prohibited.
```

#### Relationship to Props & Micro-Clusters

Frontage remains primarily architectural. Only inseparable fixed fixtures may
be included, such as a wall-mounted lamp, fixed awning, drainage pipe, built-in
ledge, shutter, fixed abstract sign shape, or built-in counter edge.

Do not bake in separate environmental props such as stalls, carts, crates,
baskets, chairs, tables, vessels, parked vehicles, plants, freestanding lamps,
or complete micro-clusters. Environmental props and micro-clusters remain
independent production assets.

#### Camera, Composition & Road-Facing Orientation

Every frontage prompt inherits:

* the approved high bird’s-eye camera with slight perspective tilt
* medium survivors-style zoom context
* left or right edge placement
* shallow environmental depth
* road-facing awareness
* no runner-style forward scene
* no top/bottom edge assumptions
* no full environment composition or complete background

The asset must not include the playable road.

Frontage should generally acknowledge and face the playable road. Controlled
side-facing or angled sections are allowed only when compatible with the
approved camera, shallow edge architecture, movement-boundary clarity, and
procedural placement. Orientation must never create a deep side street or
alternate movement path.

#### Left/Right Awareness

Do not automatically mirror all frontage. Create intentional left/right-aware
variants where road-facing orientation, perspective, shutter arrangement,
awning direction, wall-light position, sign direction, structural asymmetry,
cropping, shadow, or lighting behaviour requires them. Simple symmetrical
frontage may remain universal.

#### Shared Structure, City Skins & Identity

Use:

```text
Base Frontage Family
→ Structural Variant
→ City Skin
→ Day/Night State
→ Runtime Instance
```

Cities should share reusable structural families where practical. Introduce
city identity through material skin, silhouette variation, opening rhythm,
restrained motif, colour accents, roofline or arch language, fixed-attachment
variants, and lighting treatment. Do not rebuild the frontage system
independently for every city.

Completely unique frontage is justified only when shared structures and city
skins cannot express an approved identity pillar.

Frontage may carry moderate-to-strong environmental city identity because edges
and frontage are primary environmental identity carriers. It must not define a
city alone. Recognition should emerge from coordinated architecture, materials,
road and boundary treatment, props, micro-clusters, palette, lighting, ambience,
and food and street-culture cues. The playable road remains quiet and
gameplay-first.

#### Landmark & Motif Restraint

Use landmark echoes rather than literal landmark recreation. Approved echoes may
include roofline rhythm, arch shape, material relationship, broad structural
motif, silhouette language, façade proportions, or cropped architectural
suggestion.

Do not routinely generate famous monuments, recognizable complete landmarks,
postcard compositions, landmark façades, or tourist-view architecture. Literal
landmarks require separate explicit approval and are outside this default
module. Avoid stereotypes, dense cultural decoration, and authenticity through
realistic clutter.

#### Signage

Signage must generally be abstract, unreadable, symbolic, icon-like,
shape-based, and restrained. Do not generate readable shop names or street text,
real brand names, logos, recognizable trademarks, detailed typography, or
text-heavy façades.

#### Implied Human Presence & Interiors

Human presence must be implied rather than shown. Allowed cues include a
half-open shutter, warm window, dark doorway, counter edge, small fixed lamp,
arranged architectural opening, or other restrained sign of recent activity.

Do not generate shopkeepers, pedestrians, seated people, visible human
silhouettes, crowds, detailed occupied interiors, or characters inside windows
or doorways. Frontage must not imply an NPC, enemy, interaction target, or
enterable location.

#### Day/Night System & Lighting Limits

Day and night reuse the same underlying architecture:

```text
Same architecture.
Same city identity.
Different controlled mood.
```

Night may adjust palette tint, value range, selected lit windows, wall-lamp
state, small sign glow, localized doorway warmth, or subtle fixed practical
lighting. It must not create an unrelated design or separate city kit.

Only localized practical lighting is allowed: a lit window, small wall lamp,
restrained fixed sign glow, compact doorway light, subtle awning light, or small
architectural highlight.

Do not use large glow pools, broad road illumination, dramatic beams, cinematic
lighting, strong cast shadows, large bloom, continuous glowing frontage, or
lighting that reaches significantly into the playable-road centre. Lighting
remains subordinate to gameplay.

#### Controlled Repetition Disguise

Frontage variation is divided into:

```text
Invariants
→ asset role, Tier 5 priority, frontage family, one architectural idea,
  broad massing, camera, shallow depth, procedural footprint, category safety

Controlled variables
→ opening arrangement, shutter state, awning presence, ledge or roofline
  variant, cropped width, wall material skin, restrained accent colour,
  small fixed fixture, left/right orientation, day/night lit state,
  light wear variant

Prohibited variables
→ uncontrolled additions, unrelated architectural ideas, deep perspective,
  separate props, complete recomposition, category change, complete scenes
```

Do not rely on uncontrolled generative invention. Every requested variation must
preserve the frontage-family identity and procedural compatibility.

#### Isolation & Transparency

Where the Technical Asset Contract requires transparent raster output, every
frontage prompt must require a transparent background, only the intended
segment, safe transparent padding, no accidental clipping, preserved deliberate
cropped continuation, and no generated surroundings or unwanted floor, sky,
street, or background fill.

Do not invent technical dimensions, pivots, file formats, or padding values.
Insert the applicable authoritative Technical Asset Contract requirements.

#### Mandatory Category-Confusion Negatives

Every frontage prompt must explicitly prohibit resemblance to a gameplay
obstacle, hazard, pickup, enemy, NPC, spawn point, objective marker, interaction
target, enterable gameplay location, movement path, alternate road, UI panel,
decorative reward, player structure, or destructible object unless separately
designed as gameplay.

Frontage must read as passive non-playable background architecture. These
exclusions supplement rather than replace inherited global negatives.

#### Acceptance Hierarchy

Review and accept frontage in this order:

1. Clearly reads as passive non-gameplay background architecture.
2. Remains subordinate to the playable road and active gameplay.
3. Fits inside the shallow left/right edge architecture.
4. Does not resemble an obstacle, interaction target, or gameplay location.
5. Uses broad, simplified, and quiet architectural forms.
6. Communicates one clear frontage idea.
7. Matches the approved camera and perspective.
8. Supports modular repetition and procedural placement.
9. Uses deliberate crop-safe continuation.
10. Does not become a complete building, street, or painted background.
11. Contains no baked road, pavement, or terrain scene.
12. Uses restrained detail, colour, outlines, and material cues.
13. Keeps fixed fixtures subordinate and excludes separate prop clutter.
14. Uses intentional left/right awareness where needed.
15. Carries city identity through multiple restrained cues.
16. Avoids literal landmarks, stereotypes, and tourist-poster styling.
17. Preserves structural consistency between day and night.
18. Uses only localized practical lighting.
19. Meets isolation, transparency, and padding requirements.
20. Meets the Technical Asset Contract.

#### Rejection Rules

Reject or regenerate frontage that:

* becomes a complete building, complete façade illustration, long baked edge
  strip, complete street scene, or handcrafted background
* creates deep architectural perspective or visually dominates the playable road
* looks enterable, interactive, gameplay-critical, or like an obstacle, spawn
  point, or objective
* includes baked road, pavement, sand, terrain, environmental floor, or unrelated
  stalls, carts, vehicles, furniture, or prop clusters
* contains visible people, detailed interiors, readable text, logos, or branding
* relies on a literal landmark, stereotype, dense cultural decoration, tourism
  styling, or realistic clutter as authenticity
* uses excessive architectural detail, painterly or realistic rendering, a
  3D-rendered style, or an incorrect camera or road-facing orientation
* assumes automatic mirroring where direction matters
* has accidental clipping or lacks required transparency or crop-safe padding
* cannot repeat procedurally, requires exact handcrafted neighbours, or
  introduces uncontrolled generated additions
* creates unrelated day and night structures
* uses large glow pools, beams, bloom, dramatic shadows, or road-centre lighting
* conflicts with the Art Bible, Prompt Bible foundation, or Technical Asset
  Contract

### 7.4 Road Bases & Safe Road Overlays Prompt Module

#### Scope, Authority & Inheritance

This module translates the frozen Art Bible rules for the playable road into
reusable production-prompt rules for foundational road bases and passive safe
road overlays. It does not define production images, final city catalogues,
hazards, implementation logic, or complete road scenes.

The authority order remains:

```text
Art Bible
→ Prompt Bible
→ Technical Asset Contract
```

Every road-base and safe-overlay prompt inherits all applicable global Prompt
Bible rules, metadata and versioning conventions, city and time-of-day modules,
camera rules, reference-image protocol, review and rejection conventions, and
Technical Asset Contract requirements. Category rules specialize but never
contradict those authorities.

The existing Prompt Bible tier scale assigns road texture and safe overlays to
Tier 5. Preserve that numbering: road bases and safe road overlays form the
lowest Tier 5 environmental sublayer, beneath frontage and every active or
decorative object category.

```text
Player and active gameplay
> threats and hazards
> attacks and projectiles
> pickups and rewards
> environmental props and micro-clusters
> frontage
> road base and safe road overlays
```

Road material must never compete with active gameplay.

#### Core Definitions & Category Separation

A road base is:

> A clean foundational playable-surface asset with restrained built-in material
> identity, designed to remain quiet beneath gameplay and accept modular
> overlays.

A safe road overlay is:

> An isolated, passive, low-contrast surface variation that adds controlled
> material life without carrying gameplay meaning.

Mandatory separation:

```text
Road base
→ foundational gameplay canvas

Safe road overlay
→ passive non-actionable variation

Hazard
→ separate actionable gameplay object
```

Safe road overlays must never impersonate hazards, pickups, movement paths,
spawn markers, objectives, interactions, or gameplay instructions.

#### Governing Priority & Gameplay Support

```text
Gameplay clarity
> accessibility and comfort
> modular and procedural viability
> gameplay-category recognition
> city identity
> charm and personality
> beauty and spectacle
```

The road is the primary gameplay canvas. It must support player, enemy, pickup,
attack, projectile, and hazard readability; movement-boundary clarity; and dense
survivors-style gameplay.

#### Production Architecture

Use:

```text
Clean base road
+ modular safe overlays
+ separate road-marking overlays
+ separate boundary treatments
+ separate hazard assets
+ separate lighting overlays
```

Do not bake these unrelated systems into one road image.

```text
Base Asset
→ Variant
→ City Skin
→ Instance
```

Road generation assumes modular procedural assembly and reuse. Reject a
handcrafted complete road scene or an asset dependent on exact neighbouring
environmental assets.

#### Road-Base Prompt Rules

Request one dominant readable road material, broad continuous surface character,
subtle built-in material identity, restrained city-specific tone, extremely low
visual noise, flat-cartoon material abstraction, broad clean forms, minimal or
no outlines, flat fills, and at most one subtle tonal or material-variation
layer.

Do not bake in gameplay objects, hazards, environmental props, frontage,
boundary systems, practical-light pools, road-marking systems, or a complete
painted environment.

The base must not be dead or blank. It must carry enough restrained material
identity to work before overlays are added, but overlays must not rescue an
unfinished base.

#### Road-Centre Protection

```text
Road centre
→ cleanest and quietest

Outer road bands
→ slightly more passive variation allowed

Boundary area
→ restrained transition treatment

Edges
→ carry most environmental identity
```

The road centre may contain only extremely subtle material variation. Exclude
strong cracks, prominent stains, bold repair patches, large colour changes,
strong markings, decorative objects, directional patterns, repeated bands,
lighting pools, and high-frequency detail.

Variation may increase gradually toward the outer road bands but must not form
artificial lanes.

#### Safe-Overlay Prompt Rules

Request passive surface variation only, with:

* low contrast and saturation relative to gameplay objects
* soft or blended irregular boundaries
* broad flat shapes
* one to three restrained material cues
* minimal or no outline
* non-directional composition
* no actionable silhouette, interaction cue, or obvious centre point
* no icon-like shape
* no glow, pulse, or gameplay animation
* procedural reuse and isolation from unrelated assets
* transparent background where applicable under the Technical Asset Contract

Directional categories may include faint wear, gentle discoloration, softened
repair traces, subtle dusty treatment, restrained material shift, softened edge
wear, approved faded passive paint residue, or quiet surface-aging accents.
These are categories of treatment, not a final asset catalogue.

#### Prohibited Decorative Road Clutter

Do not place decorative objects on the playable road. Explicitly prohibit paper
scraps, bottles, food pieces, leaves, stones, crates, baskets, utensils, street
furniture, loose merchandise, litter, vehicles, animals, people, and
environmental-prop fragments.

A visually noticeable object on the playable road requires explicit gameplay
meaning and belongs to another asset category.

#### Passive-Surface & Actionable-Hazard Separation

Safe treatment must remain distinguishable from hazards in a static frame, with
muted audio, reduced motion, reduced effects, colour-vision accessibility modes,
day, and night.

Safe overlays remain softer, quieter, less bounded, less contrasted, less
saturated, less object-like, non-animated, and non-actionable.

Hazards remain a separate asset category and may use clearer silhouettes,
stronger boundaries and contrast, motion or state cues, VFX, and explicit
gameplay-category readability. This module defines only the separation boundary;
it does not define the full Hazard Prompt Module.

#### Shape & Material Language

Road bases and safe overlays use clean flat-cartoon forms and a few broad,
simplified material cues. Do not use realistic or photographic texture,
painterly treatment, a 3D-rendered style, airbrushed depth, complex gradients,
dense surface noise, high-frequency grit, detailed realistic cracks, excessive
speckling, or dramatic shadows.

Non-final directional illustrations:

```text
Urban asphalt
→ muted base + faint low-contrast wear

Dust-influenced stone or road
→ warm base + soft passive material variation
```

#### City-Skin Logic

Use shared road grammar with restrained city material skins.

```text
Same production structure
→ different restrained city material flavour
```

City identity may affect dominant material, base hue and value, restrained wear
character, passive dust or repair treatment, boundary-adjacent variation, and
the approved palette skin.

It must not create stronger visual priority, tourist-poster treatment,
stereotype dependence, literal landmark imagery, dense cultural motifs,
decorative road storytelling, or gameplay-category confusion. The road must not
compensate for weak edge, frontage, or prop identity.

City-specific road materials, wear, palette contributions, and prohibited cues
must come from approved identity pillars and production parameters in
`CITY_KITS.md`. This category module does not assign them to named cities.

#### Day/Night Reuse

Day and night reuse the same structural road assets.

```text
Base road
+ controlled time-of-day treatment
+ separate localized lighting overlays where required
```

Night may adjust restrained value, subtle warmth or coolness, controlled palette
mood, and slight edge-light influence. It must not redesign the road, hide
gameplay, destabilize the road centre, increase texture noise, introduce strong
shadow bands, bake practical lights into the base, add large light pools, become
cinematic, or turn passive overlays into hazard-like shapes.

Night changes mood, not gameplay fairness.

#### Localized-Lighting Separation

Practical-light spill normally remains a separate lighting-overlay asset. Do not
bake stall glow, window light, lantern spill, sign glow, street-lamp pools,
beams, bloom, or dramatic shadows into the road base.

The only permitted base treatment is an extremely broad, non-localized
time-of-day tone allowed by inherited authorities. Localized lighting belongs
to the Lighting & Shadow Overlays Prompt Module.

#### Road-Marking Separation

Road markings remain a separate controlled overlay category unless the Art
Bible identifies a faint inseparable material trace. Permitted road markings
must be faint, broken, worn, passive, subordinate, and non-directional in
gameplay meaning.

Do not bake bold markings into the base or define the complete Road Markings
module here. Reject bright arrows, decorative zebra crossings, sharp lane
dividers, strong parking lines, high-contrast symbols, directional path cues,
and markings resembling gameplay telegraphs.

#### Isolation, Transparency & Technical Output

Where technically appropriate, a safe-overlay prompt must request an isolated
transparent asset containing only the approved passive variation, required
antialiased edges, required padding, and required alpha behaviour.

It must not include a sample road background, unrelated floor, boundary strip,
hazard, lighting, prop, frontage, another object's shadow, or complete
environment context.

Inherit technical dimensions, file type, alpha, padding, naming, metadata,
orientation, and export requirements from the Technical Asset Contract. Do not
invent or duplicate values. If road bases use a non-transparent format under
that contract, preserve it.

#### Procedural Repetition & Controlled Variation

Permitted overlay variation may include:

* rotation where perspective and material direction remain valid
* controlled cropping
* small opacity or scale changes
* restrained placement-zone changes
* left/right/centre eligibility rules
* spacing rhythm
* city-material variants
* restrained wear-level variants

Do not allow unrestricted random transformation. Restrict rotation for
directional repairs, seams, material grain, perspective-dependent wear,
road-facing cues, or lighting influence.

The road must not appear stamped, tiled, patterned, grid-based, striped,
segmented, or assembled from obvious repeated forward chunks.

#### Runner-Drift Prevention

Do not request forward road tiles, sequential road blocks, visible chunk
boundaries, vertical progression lanes, repeated obstacle corridors, road
segments implying one-way travel, top-to-bottom track composition, or
perspective vanishing-point roads.

```text
LEFT EDGE | PLAYABLE ROAD / ARENA | RIGHT EDGE
```

Masala Run is a top-down survivors-like game with free movement inside the
playable road.

#### Prompt Anatomy

Road-base and safe-overlay prompts inherit the standard Prompt Bible anatomy and
must include all applicable fields for:

1. metadata and versioning
2. asset purpose and environmental role
3. visual-priority tier and asset-category declaration
4. inherited global, city, time-of-day, and Technical Asset Contract modules
5. camera and orientation
6. positive visual instructions
7. road-centre and passive/actionable category protections
8. negative constraints
9. modularity and procedural use
10. allowed variation dimensions
11. isolation and technical output
12. objective acceptance and rejection criteria
13. labelled reference-image purposes when references are used

State inherited modules and add only category-specific operational rules. Do not
duplicate global rules unnecessarily.

#### Acceptance Hierarchy

Review and accept a road base or safe overlay in this order:

1. Preserves player and active-gameplay readability.
2. Remains visually quieter than every gameplay category.
3. Clearly reads as passive playable-surface material.
4. Cannot be confused with a hazard, pickup, path, spawn cue, objective, or
   interaction.
5. Protects the road centre.
6. Supports movement-boundary clarity.
7. Uses broad, simplified, flat-cartoon material language.
8. Avoids decorative road clutter.
9. Maintains restrained city identity.
10. Supports modular and procedural composition.
11. Avoids runner-style segmentation.
12. Avoids visible tiling or stamping.
13. Supports controlled repetition disguise.
14. Preserves day/night structural reuse.
15. Keeps localized lighting separate.
16. Keeps actionable hazards separate.
17. Meets isolation, transparency, and padding requirements where applicable.
18. Meets the Technical Asset Contract.
19. Remains scalable to future cities.
20. Does not behave like a complete painted road scene.

#### Rejection Rules

Reject or regenerate a road base or safe overlay that:

* competes with gameplay or makes the road centre visually busy
* resembles a hazard, pickup, path, arrow, instruction, spawn zone, interaction
  target, or objective marker
* uses strong boundaries, contrast, saturation, outlines, directionality, or
  artificial lanes for passive treatment
* uses decorative road clutter or unrelated objects
* uses prominent stains, heavy cracks, dense grime, realistic or photographic
  texture, painterly rendering, 3D styling, complex gradients, high-frequency
  grit, or repeated bands
* creates runner-style chunks or looks tiled, stamped, grid-based, or striped
* bakes in hazards, props, frontage, boundary systems, road-marking systems, or
  localized practical lighting
* contains large glow pools, beams, bloom, or dramatic shadows
* includes sample environment around an isolated overlay
* lacks required transparency or crop-safe padding
* cannot repeat procedurally or requires handcrafted neighbouring assets
* creates a complete road scene or painted background
* makes night less readable
* conflicts with the Art Bible, Prompt Bible foundation, or Technical Asset
  Contract

#### Scope Boundary

This module defines prompt rules for foundational road bases, passive safe road
variation overlays, centre protection, centre-to-edge variation, restrained
material identity, city road skins, day/night reuse, isolation, procedural
repetition, passive/actionable separation, and acceptance and rejection.

It does not define final city road catalogues or kits, final production prompts,
hazard catalogues or the complete Hazard Prompt Module, pickup or enemy rules,
road gameplay mechanics, procedural algorithms, rendering, technical dimensions,
metadata-schema or validation-tool changes, gameplay code, complete lighting or
road-marking systems, or image assets.

#### Final Principle

> Road bases in Masala Run are quiet foundational gameplay surfaces with
> restrained built-in material identity. Safe road overlays are isolated,
> passive, low-contrast variations that add controlled surface life without
> carrying gameplay meaning. The road centre remains the calmest visual zone,
> city flavour stays restrained, repetition is procedurally disguised, day and
> night reuse the same structure, localized lighting and actionable hazards
> remain separate, and no road asset may compete with survival gameplay or
> behave like a complete painted scene.

### 7.5 Gameplay Hazards Prompt Module

#### Purpose, Scope & Inheritance

This module defines how production prompts describe isolated, reusable gameplay
hazards for Masala Run. It governs hazard identity and purpose, family and
mechanical meaning, risk communication, footprint and silhouette, boundary
readability, separation from safe road treatments, city and material skins,
states, animation-ready components, optional VFX, day/night treatment,
isolation, transformations, controlled variation, accessibility,
category-confusion negatives, and acceptance and rejection.

The Art Bible remains the highest creative authority. Every hazard prompt
inherits the global Prompt Bible rules, visual hierarchy, city and time-of-day
modules, accessibility language, reference-image protocol, metadata and
versioning conventions, and applicable Technical Asset Contract requirements.
This module may operationalize those authorities but must not redefine them.

This module does not define final Mumbai or Jaisalmer hazard catalogues, exact
damage or slowdown values, collision implementation, runtime state machines,
procedural placement algorithms, final animation frame counts, final VFX packs,
gameplay or rendering code, or Technical Asset Contract changes. City-specific
hazard catalogues belong to later city-kit or production work.

#### Governing Principles

Gameplay hazards are actionable gameplay objects placed on the playable road.
They must be clearer and more urgent than safe road texture, passive surface
variation, decorative stains, road markings, environmental decoration, and
ambient effects.

```text
Safe road variation is passive.
Gameplay hazards are actionable.
```

Hazards must feel world-native while remaining game-readable first. They must
never look like accidental road decoration.

```text
Gameplay meaning
→ footprint honesty
→ accessibility
→ category separation
→ modular and procedural viability
→ city flavour
→ visual polish
```

A beautiful hazard is unacceptable when it is unclear, misleading,
inaccessible, or unsuitable for modular production.

#### Shared Gameplay Meaning & City Skins

Use shared gameplay logic with restrained city-specific material skins.

```text
Same gameplay meaning
→ same readability, timing and urgency logic

Different city
→ different restrained material flavour
```

City-specific hazard materials and surface treatments must come from approved
identity pillars and production parameters in `CITY_KITS.md`. They preserve the
base hazard's readable footprint, boundary, risk tier, timing, state, and
accessibility. City flavour must not redefine gameplay meaning; players must not
relearn a hazard's function when entering another city.

#### Preferred Production Architecture

```text
Base Hazard
→ Gameplay Variant
→ City / Material Skin
→ State or VFX Attachment
→ Runtime Instance
```

Normally produce:

```text
stable base hazard
+ optional warning or active-state treatment
+ optional animation-ready overlay
+ optional VFX attachment
```

Avoid a complete baked scene, permanently baked road, lighting pool, or
decorative particles; unrelated artwork for every small variation;
handcrafted city scenes; and complete backgrounds. Keep base art, state
treatments, and VFX separable where practical and technically supported.

#### Hazard Identity & Gameplay Purpose

Every prompt must explicitly state:

* that the asset is a gameplay hazard
* the approved hazard family and mechanical meaning
* its low, medium, or high risk tier
* whether it is persistent, timed, spawning, expanding, directional, or
  state-based
* whether warning and active states are required
* whether VFX or animation-ready attachments are required and technically
  supported

Gameplay role must be unambiguous before style or city flavour.

Recommended structural logic:

```text
Asset category
→ Gameplay Hazards

Hazard family
→ [APPROVED HAZARD FAMILY]

Gameplay meaning
→ [APPROVED MECHANICAL MEANING]

Risk tier
→ [LOW / MEDIUM / HIGH]

State requirement
→ [APPROVED STATE REQUIREMENT]
```

Do not invent mechanics not approved elsewhere.

#### Footprint, Silhouette & Footprint Honesty

Use a clean actionable silhouette with controlled natural irregularity. It must
remain readable at gameplay distance, communicate the approximate affected
area, feel native to its material, avoid excessive naturalistic complexity, and
remain distinct from passive road wear.

```text
Clean actionable outer shape
+ controlled material irregularity
+ quiet internal detail
```

Avoid noisy contours, tiny fragmented edges, excessive holes or disconnected
pieces, decorative outlines, arbitrary game-board circles or squares, warning
tiles, and silhouette details implying gameplay bounds different from the real
bounds.

The visible art must closely communicate the effective gameplay area. Collision
and gameplay bounds remain technically independent but must align with the
perceived danger area. Do not permit harm clearly outside the visible hazard,
invisible extensions, decorative particles beyond the apparent active
footprint, an unclear centre-versus-edge relationship, or art that suggests a
large danger area when only a small hidden area is active.

```text
Artwork communicates danger area honestly.
Technical bounds remain independent but visually aligned.
```

#### Boundary Readability

Every hazard requires a readable, world-native boundary clearer than safe road
variation without automatically becoming a bright UI ring. Choose a
material-appropriate cue such as a clear edge, restrained rim, small flat
highlight, light or dark contour band, compact edge motion, ripple boundary,
dust boundary, broken-surface lip, or mechanically justified state pulse.

Do not use one universal boundary treatment for every material. The boundary
must not depend on colour alone.

Directional examples:

```text
Puddle
→ readable water edge
→ small ripple or flat highlight cue

Loose sand
→ defined patch boundary
→ restrained dust movement

Pothole
→ clear broken edge
→ simplified depth cue
```

#### Internal Detail Density

Keep the interior quiet. Detail may only clarify material, reinforce state,
explain direction when relevant, distinguish the hazard from safe road texture,
or support risk communication.

Use minimal simplified cues: one or two ripple or highlight cues for water, a
few broad grain or wind cues for sand, one restrained surface accent for oil, or
a small number of broad fracture shapes for a broken surface.

Avoid realistic texture, dense grit, tiny cracks, high-frequency noise,
excessive debris, decorative objects, complex reflections, painterly detail, and
realistic material rendering. Silhouette and boundary carry most gameplay
meaning.

#### Risk-Tier Treatment

```text
Low-Risk Hazard
→ mostly static
→ clear silhouette and boundary
→ quiet material cue
→ minimal effect language

Medium-Risk Hazard
→ clearer contrast or separation
→ subtle motion, ripple, shimmer, dust or edge cue
→ controlled active-state treatment

High-Risk Hazard
→ strongest hazard separation
→ actionable warning where mechanically required
→ stronger but controlled animation or particles
→ clear timing and state communication
```

Higher risk may proportionally increase boundary clarity, contrast, animation
strength, state change, telegraph prominence, and particle emphasis. It must not
automatically add decorative detail, uncontrolled VFX, heavy glow, excessive
saturation, persistent flashing, or visual chaos.

#### Warning, Active & Ending States

State sets follow mechanics rather than a universal checklist.

```text
Inactive
Warning / Telegraph
Active
Ending / Dissipation
```

A persistent hazard may require only an active state. A timed or spawning hazard
may require warning, active, and ending states. An expanding hazard may require
an origin or warning state, expansion state, and active state. These are
structural examples, not new mechanics.

All states preserve hazard identity and clarify when danger starts, where it
applies, whether it remains active, and when it becomes safe. Do not add warning
states merely for decoration.

#### Animation-Ready Structure

Keep the base stable and reusable. Where motion improves readability and the
Technical Asset Contract supports the required output, request separable
animation-ready elements such as a ripple, dust wisp, pulse edge, warning
contour, directional flow cue, bubble or surface motion, small debris motion,
activation, or dissipation overlay.

Animation communicates gameplay state first. It must not create unnecessary
movement, obscure the footprint, expand beyond perceived bounds without
mechanical purpose, resemble pickup sparkle, attack impact, or ambient
decoration, or break reduced-motion accessibility.

Do not assume unsupported sprite-sheet, rotation, or runtime animation
capabilities. Surface required capability gaps under the Technical Asset
Contract rather than silently inventing support.

#### Optional VFX Attachments

VFX normally remain independent optional attachments:

```text
Base hazard
+ optional risk-tier VFX
+ optional warning VFX
+ optional active-state VFX
+ optional ending VFX
```

Permitted directions include compact dust, restrained ripple, small shimmer,
brief warning pulse, controlled particle edge, short activation burst, or
compact dissipation. VFX must improve readability, remain proportional and
localized, preserve the visible footprint, stay short or controlled, support
reduced-effects treatment, and avoid obscuring other gameplay objects.

Avoid persistent glow, bloom, screen-filling particles, dense smoke, realistic
simulation, decorative particle clouds, and VFX that visually enlarge the
hazard without matching gameplay bounds.

#### City & Material Skins

A city skin may alter material, restrained palette, simplified texture cues,
boundary treatment, animation material, particles, or a small motif influence.
Audio and haptic references remain governed elsewhere.

Every skin must preserve gameplay meaning, approximate footprint, risk
hierarchy, boundary readability, warning logic, state timing, accessibility,
and category recognition. A skin must never make the hazard resemble safe
decoration. Keep city identity restrained and avoid stereotypes.

#### Colour, Contrast, Outline & Edge Treatment

Use city-native material colours with controlled gameplay separation rather
than one universal bright danger colour for every hazard. A hazard must remain
more actionable than safe road texture, preserve global contrast hierarchy, fit
the city palette, remain readable by day and night, support colour-vision
safety, and avoid competing with the player or immediate enemies more than
necessary.

```text
shape
+ boundary
+ contrast
+ motion or state cue where appropriate
```

Meaning must not depend on colour alone.

Do not prescribe one heavy black outline. Select material- and category-
appropriate edge separation according to risk, road contrast, state, lighting,
and accessibility. High-risk hazards may use stronger separation than lower
risk hazards, while safe overlays remain quieter than every actionable hazard.

#### Grounding & Depth

Use material-appropriate contact cues. Flat ground hazards generally use a
readable edge, flat highlight, shallow depth cue, contact transition, material
lip, restrained inner cue, or other flat surface response instead of an
object-like drop shadow.

Raised, broken, or object-like hazards may use simple grounding where required
and technically allowed. Avoid realistic deep shadows, dramatic perspective,
heavy 3D depth, and baked shadows or glow prohibited by the Technical Asset
Contract.

#### Day/Night Treatment

Day and night reuse the same hazard structure.

```text
Same hazard.
Same gameplay meaning.
Different controlled mood treatment.
```

Night may apply a restrained value or palette adjustment, stronger boundary
separation, adjusted highlight or motion contrast, controlled VFX readability,
or localized environmental-light influence. It must not hide the hazard, weaken
its footprint, turn it into a passive stain, create unfair visibility loss,
change gameplay meaning, or require a separate hazard system.

#### Isolation, Transparency, Padding & Cropping

Production hazard assets must use the repository-approved transparent output
with sufficient clear padding. Include no baked road, edge environment,
building, prop, character, enemy, pickup, UI, complete gameplay scene,
decorative background, permanent lighting pool, full-screen effect, or text
inside the artwork.

```text
Production asset
→ isolated transparent hazard

Validation preview
→ optional separate gameplay-context composition
```

A contextual road preview may be created later for validation but is not the
production asset.

Padding must support declared animation or VFX attachments, state transitions,
controlled scaling, technical bounds, atlas packing, and clipping safety without
becoming excessive. Never crop the active footprint. Declare padding for
directional or extending effects. Exact format, dimensions, alpha, padding,
crop, naming, metadata, and export requirements come from the Technical Asset
Contract.

#### Transformation Permissions

Declare permissions per hazard family:

```text
Rotation
→ allowed / limited / prohibited

Mirroring
→ allowed / limited / prohibited

Scale variation
→ allowed within approved range / prohibited

Cropping
→ allowed / prohibited
```

Fill these declarations from approved mechanics and the current Technical Asset
Contract. Never assume free transformation. Irregular non-directional patches
may be candidates for controlled rotation only when technically supported;
directional flow, perspective, shadows, lighting, or expanding/state behaviour
may require fixed orientation or dedicated variants.

#### Controlled Variation

Allowed variation may include minor contour changes, restrained material marks,
limited colour or value variation, ripple or dust placement, small attachment
changes, technically and mechanically safe size variation, and approved city or
day/night skinning.

Variation must preserve perceived function, risk tier, approximate footprint,
warning logic, active-state recognition, accessibility, and category meaning.
Do not allow unlimited variation that makes one hazard family inconsistent.

#### Accessibility Requirements

Hazards communicate through complementary cues:

```text
shape
+ readable boundary
+ colour / contrast
+ motion or state cue where appropriate
```

Important meaning must survive loss of any one cue. Do not rely on colour,
sound, animation, haptics, or a tiny icon alone; add persistent warning icons
above every hazard by default; or use rapid repeated flashing or unsafe
high-contrast pulses.

Reduced-motion and reduced-effects treatments must preserve the active
footprint, timing, warning and active states, risk recognition, and category
separation. Night must not weaken accessibility.

#### Mandatory Category-Confusion Negatives

Every hazard prompt must explicitly prohibit resemblance to:

* safe road texture, passive road overlay, decorative stain, or ordinary wear
* road marking, lane instruction, or movement path
* enemy spawn marker
* pickup, reward, or collectible
* enemy
* environmental prop
* ordinary obstacle unless that is the approved mechanic
* attack impact, projectile, or player attack
* ambient VFX or decorative lighting pool
* interaction indicator
* World-space UI, screen-space UI, icon, or button
* complete background scene

Do not use a vague instruction such as "do not make it confusing." State nearby
category exclusions explicitly.

#### Style Requirements

Inherit Masala Run's clean flat-cartoon style: readable silhouettes, controlled
natural irregularity, slightly exaggerated gameplay readability, selective
sharp danger accents, flat fills, at most one simple shade or accent layer,
simplified material cues, controlled edge separation, and minimal internal
detail.

Do not use realistic texture, painterly rendering, complex gradients,
photorealism, a 3D-rendered appearance, excessive decoration, or generic
mobile-template hazard tiles. Hazards remain world-native but game-readable
first.

#### Standard Hazard Prompt Anatomy

Use this order:

```text
1. Asset identity and gameplay purpose
2. Hazard family and mechanical meaning
3. Risk tier
4. State requirements
5. Base hazard structure
6. Footprint and silhouette
7. Boundary and readability treatment
8. Material and city skin
9. Colour and contrast
10. Internal detail and shading
11. Animation-ready components
12. Optional VFX attachments
13. Day/night treatment
14. Isolation and transparency
15. Padding and cropping
16. Transformation permissions
17. Variation permissions
18. Accessibility and multi-cue requirements
19. Category-confusion negatives
20. Technical-contract inheritance
21. Acceptance criteria
```

Gameplay purpose must precede beauty and city flavour.

#### Reusable Prompt Template

```text
Generate one isolated modular gameplay-hazard asset for Masala Run.

PROMPT METADATA AND INHERITANCE
- [PROMPT ID / TITLE / VERSION / STATUS]
- Inherit Global Prompt Bible Rules.
- Inherit Gameplay Hazards Prompt Module.
- Inherit [CITY SKIN], [DAY/NIGHT], and Technical Asset Contract requirements
  where applicable.

ASSET ROLE
- Category: Gameplay Hazard
- Hazard family: [HAZARD FAMILY]
- Gameplay meaning: [APPROVED MECHANICAL MEANING]
- Risk tier: [LOW / MEDIUM / HIGH]
- State: [WARNING / ACTIVE / ENDING / PERSISTENT]
- City or material skin: [CITY / MATERIAL]
- Time of day: [DAY / NIGHT / UNIVERSAL]

FOOTPRINT AND SILHOUETTE
- Create a clean actionable silhouette with controlled natural irregularity.
- The visible shape must honestly communicate the approximate gameplay area.
- Keep the interior visually quiet.
- Make the hazard clearly more actionable than safe road variation.

BOUNDARY AND READABILITY
- Use a readable, world-native material boundary.
- Communicate danger through shape, boundary, contrast, and motion/state cue
  where appropriate.
- Do not depend on colour alone.
- Scale visual intensity according to the declared risk tier.

STYLE
- Use the clean flat-cartoon Masala Run style.
- Use flat solid fills and one simple shade or accent layer where needed.
- Use simplified material cues and minimal internal detail.
- Do not use realistic texture, painterly rendering, photorealism, or 3D
  appearance.

MODULAR STRUCTURE
- Keep the base hazard reusable.
- Keep optional warning, animation, and VFX elements separable where practical
  and technically supported.
- Follow Base Hazard → Gameplay Variant → City Skin → State/VFX Attachment →
  Runtime Instance.

OUTPUT
- Produce an isolated production asset on a transparent background.
- Include sufficient contract-governed transparent padding.
- Include no baked road, scenery, props, characters, enemies, pickups, UI, text,
  lighting pool, or complete scene.

TRANSFORMATION
- Rotation: [ALLOWED / LIMITED / PROHIBITED]
- Mirroring: [ALLOWED / LIMITED / PROHIBITED]
- Scale variation: [APPROVED RANGE OR PROHIBITED]
- Cropping: [ALLOWED / PROHIBITED]

ACCESSIBILITY
- Preserve recognition without relying on colour alone.
- Keep the footprint readable in reduced-motion and reduced-effects modes.
- Avoid rapid flashing or excessive pulse effects.
- Preserve equivalent readability during day and night.

MUST NOT RESEMBLE
- safe road texture or passive road overlay
- decorative stain, ordinary wear, road marking, lane instruction, or path
- pickup, reward, collectible, enemy, or spawn marker
- attack impact, projectile, or player attack
- environmental prop or unapproved ordinary obstacle
- movement path or interaction indicator
- World-space UI, screen-space UI, icon, or button
- ambient VFX, decorative light pool, or complete background scene

TECHNICAL OUTPUT
- [APPLICABLE TECHNICAL ASSET CONTRACT REQUIREMENTS]

ACCEPTANCE
- Accept only when gameplay meaning, footprint, risk tier, accessibility,
  category separation, and modular usability are immediately clear at gameplay
  distance.
```

This template is a structural reference. Do not populate it with unapproved
final hazard catalogues.

#### Acceptance Checklist

A hazard is acceptable only when every applicable answer is yes:

1. Is it immediately recognizable as an actionable gameplay hazard?
2. Is its gameplay family clear?
3. Does the artwork honestly communicate the affected area?
4. Is it clearer than safe road variation?
5. Is its boundary readable and world-native?
6. Does risk intensity match gameplay importance?
7. Is it understandable without colour alone?
8. Does it remain readable by day and night?
9. Does it remain readable with reduced motion and effects?
10. Does it avoid resembling a pickup, reward, enemy, spawn marker, attack, or
    UI?
11. Does it avoid resembling ordinary road wear or a decorative stain?
12. Is internal detail quiet enough for dense survivors-style gameplay?
13. Is it modular and procedurally usable?
14. Are state and VFX elements separable where practical?
15. Are transformation permissions declared?
16. Do controlled variants preserve meaning and footprint?
17. Is the output isolated and transparent?
18. Is sufficient padding provided?
19. Does it inherit the approved Masala Run style?
20. Does city flavour remain subordinate to gameplay meaning?

If any gameplay, accessibility, footprint, or category-recognition answer is no,
reject or redesign the asset.

#### Immediate Rejection Rules

Reject or redesign a hazard that:

* reads as passive decoration or ordinary road texture
* resembles a pickup, reward, enemy spawn marker, or attack impact
* uses misleading artwork bounds or creates invisible or dishonest danger
* depends on colour alone
* becomes unclear at night or loses meaning with reduced motion or effects
* uses excessive particles, heavy glow or bloom, or unsafe repeated flashing
* becomes realistic, noisy, or a generic game-board tile
* includes baked road, scenery, characters, enemies, pickups, or UI
* requires handcrafted scene placement or cannot be procedurally reused
* irreversibly embeds every state and effect into one asset
* changes gameplay meaning between city skins
* prioritizes city flavour or beauty over gameplay clarity

#### Final Principle

> Masala Run gameplay hazards are world-native but game-readable first. Every
> hazard must communicate its mechanical meaning and effective footprint through
> a clean actionable silhouette, readable boundary, controlled contrast, and
> state or motion cues where appropriate. Risk determines visual intensity.
> Shared hazard families preserve the same readability, timing, urgency, and
> accessibility logic across cities, while restrained material skins provide
> local flavour. Base hazards, states, and VFX remain modular wherever practical.
> Hazards must never resemble safe road variation, decoration, rewards, enemies,
> attacks, spawn markers, or UI, and must remain readable across day, night,
> reduced-motion, and reduced-effects conditions.

### 7.6 Pickups & Rewards Prompt Module

#### Purpose, Scope & Inheritance

This module governs production prompts for collectible world-space gameplay
assets: progression resources, recovery items, temporary boosts, currencies,
and major rewards.

It excludes shops, reward screens, HUD reward panels, complete reward scenes,
final city pickup catalogues, and unapproved mechanics.

Every prompt inherits the Art Bible, global Prompt Bible rules, gameplay
priority tiers, modular asset system, City-Skin and Day/Night modules,
accessibility rules, metadata and versioning conventions, reference-image
protocol, and applicable Technical Asset Contract requirements.

Use the shared prompt architecture:

```text
Asset Purpose
→ Gameplay Role
→ Tier
→ Visual Rules
→ Gameplay Variant
→ Value/Rarity Tier
→ City Skin
→ Day/Night
→ State
→ Isolation
→ Technical Contract
→ Category Negatives
→ Acceptance Criteria
```

#### Gameplay & Pickup Hierarchy

Pickups are Tier 3 gameplay assets. They remain below the player, threats,
hazards, and active attacks, but above environmental props and passive scenery.

Pickup-category hierarchy:

```text
Resource
→ Recovery
→ Temporary Boost
→ Currency
→ Major Reward
```

This order controls relative emphasis inside the pickup family. Higher emphasis
must never make a pickup more urgent than an immediate threat.

#### Recognition & Visual Language

Every pickup must combine:

```text
distinctive silhouette
+ stable icon or form language
+ colour
+ scale
+ motion
+ optional restrained VFX
```

Never rely on colour alone. Recognition must survive gameplay scale, dense
overlap, day/night changes, and supported accessibility treatments.

Food-inspired pickups must be stylized, simplified, and immediately
recognizable rather than realistic food renders. Use clean flat-cartoon forms,
world-native exaggeration, flat fills, restrained detail, and category-
appropriate outline and contrast.

Common pickups remain visually simple so groups stay readable. Rare and major
rewards may use moderately richer silhouettes or secondary detail. Do not make
every pickup elaborate or bake multiple separate pickups into one sprite unless
the approved gameplay system defines a bundled reward.

#### Shared Gameplay Identity & City Skins

The same gameplay effect must retain:

* the same core silhouette
* the same recognition logic
* the same value hierarchy
* the same motion language

City skins may alter restrained secondary material cues, surface patterns, minor
decorative accents, or culturally appropriate flavour. They must not change
gameplay meaning, pickup category, core recognition, value reading, or motion
identity.

```text
Same gameplay meaning
→ same core recognition

Different city
→ restrained secondary flavour
```

#### Value & Rarity

Use a globally consistent value/rarity system. Communicate value through a
controlled combination of scale, silhouette richness, motion intensity,
restrained optional VFX, and audio importance.

Colour may reinforce rarity but must never carry it alone. Higher-value rewards
may receive stronger treatment, controlled anticipation, richer silhouette, and
stronger audio or VFX, but must remain subordinate to immediate threats.

#### Modular Asset Hierarchy

```text
Base Pickup
→ Gameplay Variant
→ Value/Rarity Tier
→ City Skin
→ State
→ Optional VFX
```

* **Base Pickup** defines the stable collectible silhouette and recognition
  language.
* **Gameplay Variant** expresses an approved effect within that family without
  losing family identity.
* **Value/Rarity Tier** controls proportional emphasis using multiple cues.
* **City Skin** adds restrained secondary flavour without changing meaning.
* **State** communicates availability, movement toward collection, collection,
  or expiry.
* **Optional VFX** adds separable, proportional feedback rather than permanent
  decoration.

#### State Language

Support these states where mechanically applicable:

```text
Spawn / Available
→ Idle
→ Attraction
→ Collected
→ Expired / Despawned
```

Idle motion must be short and restrained, using a gentle hover, pulse, turn, or
similarly readable loop. Avoid large continuous bouncing.

Attraction uses a quick readable pull toward the player. Optional trails remain
brief and controlled. Collection uses a crisp snap, shrink, or directional
movement with brief VFX and audio support. Normal pickups must not use oversized
explosions.

State outputs, animation references, and optional VFX remain separable where
required and technically supported. Do not assume sprite-sheet animation or
other capabilities absent from the Technical Asset Contract.

#### Recovery Items

Recovery items require a consistent restorative shape language,
colour-independent symbols or structural cues, and clear collection feedback.
Healing must not depend on red or green alone.

#### Temporary Boosts

Temporary boosts require a stronger container, badge, or symbol structure than
instant pickups and must clearly differ from resources and recovery items.
Duration is communicated through subsequent gameplay UI or VFX governed by
their own systems, never through text baked into the pickup.

#### Currency & Progression Resources

Every resource or currency family requires a stable distinct silhouette,
consistent recognition across cities and levels, and distinct motion where
useful. Separate currencies must not be distinguished by colour alone.

#### Major Rewards

Major rewards may use a more distinctive silhouette, controlled anticipation,
stronger but restrained VFX and audio, and clearer value cues. They remain
inside the global gameplay hierarchy and cannot compete with immediate threats.

#### Day/Night Treatment

Day and night preserve pickup identity, gameplay meaning, silhouette, value
hierarchy, and motion language. Controlled palette or contrast adjustment may
protect recognition, but night must not hide pickups, make them threat-like, or
require an unrelated asset family.

#### Isolation & Technical Output

AI-generated pickup assets must be isolated, transparent-background outputs,
consistently oriented, tightly and cleanly bounded, readable at intended
gameplay scale, and free of baked backgrounds, ground planes, and complete
scenes.

Generate separate outputs where required for the base asset, state variation,
optional VFX, or optional animation-frame reference. Do not permanently bake
optional VFX into the base sprite.

All format, alpha, dimensions, padding, scale, naming, metadata, orientation,
export, and runtime-capability requirements come from the Technical Asset
Contract. Do not invent them. Any requested frame animation or unsupported
transformation remains subject to explicit technical approval.

#### Category Differentiation & Negatives

A pickup must positively read as a collectible through an inviting stable
silhouette, reward-readable contrast, collection-oriented motion, proportional
value cues, and clear separation from the road and environment.

Every pickup prompt must explicitly prohibit resemblance to:

* hazards or dangerous bounded zones
* attacks, projectiles, or directional telegraphs
* enemies, faces, limbs, or aggressive characters
* environmental props or interactive world objects
* HUD icons, buttons, panels, or flat interface presentation

Avoid dangerous boundary shapes, projectile-like directional silhouettes,
enemy-like aggression, environment-level muted contrast, text-led recognition,
and HUD-style framing.

#### Reusable Prompt Templates

Every template below inherits Global Rules, this module, the applicable
City-Skin and Day/Night modules, and the Technical Asset Contract.

##### Template: Common Progression Resource

```text
Asset Purpose: [PROGRESSION_RESOURCE_PURPOSE]
Gameplay Role: Collectible world-space progression resource; [EFFECT]
Gameplay Tier: Tier 3, below immediate threats and above environment
Pickup Category: Resource
Value/Rarity Tier: [COMMON / APPROVED TIER]
Visual Hierarchy: Simple enough to remain readable in groups
Silhouette Rules: [STABLE_RESOURCE_SILHOUETTE]; distinct without colour alone
Motion/State Requirement: [SPAWN / IDLE / ATTRACTION / COLLECTED / EXPIRED]
City-Skin Instructions: Preserve core form; [RESTRAINED_SECONDARY_CUES]
Technical Output: [APPLICABLE ASSET CONTRACT REQUIREMENTS]; isolated base and
separate optional state/VFX outputs
Negative Constraints: No hazard, projectile, enemy, prop, HUD, text-led, or
realistic-food treatment
Acceptance Criteria: Recognizable at gameplay scale and in groups; modular,
isolated, accessible, and category-safe
```

##### Template: Recovery Pickup

```text
Asset Purpose: [RECOVERY_PURPOSE]
Gameplay Role: Collectible world-space recovery item; [APPROVED EFFECT]
Gameplay Tier: Tier 3, subordinate to immediate threats
Pickup Category: Recovery
Value/Rarity Tier: [APPROVED VALUE TIER]
Visual Hierarchy: Clear restorative identity without threat urgency
Silhouette Rules: [RESTORATIVE_SHAPE_OR_SYMBOL]; never colour-only
Motion/State Requirement: [REQUIRED STATES AND COLLECTION FEEDBACK]
City-Skin Instructions: Preserve restorative structure; [SECONDARY CITY CUES]
Technical Output: [APPLICABLE ASSET CONTRACT REQUIREMENTS]; isolated transparent
outputs with optional VFX separate
Negative Constraints: No red/green-only meaning, hazard boundary, attack shape,
enemy form, prop treatment, HUD frame, or realistic food render
Acceptance Criteria: Recovery meaning, value, states, accessibility, isolation,
and cross-city recognition remain clear
```

##### Template: Temporary Boost Pickup

```text
Asset Purpose: [TEMPORARY_BOOST_PURPOSE]
Gameplay Role: Collectible world-space temporary boost; [APPROVED EFFECT]
Gameplay Tier: Tier 3, below immediate threats
Pickup Category: Temporary Boost
Value/Rarity Tier: [APPROVED VALUE TIER]
Visual Hierarchy: Stronger than instant resources, still non-threatening
Silhouette Rules: [CONTAINER / BADGE / SYMBOL STRUCTURE]
Motion/State Requirement: [REQUIRED STATES]; duration communicated after
collection by approved UI/VFX, never baked text
City-Skin Instructions: Preserve boost identity; [RESTRAINED SECONDARY CUES]
Technical Output: [APPLICABLE ASSET CONTRACT REQUIREMENTS]; base, state, and
optional VFX separated
Negative Constraints: No timer text, HUD panel, hazard, projectile, enemy, prop,
or permanent VFX
Acceptance Criteria: Distinct from resources/recovery, readable by multiple
cues, modular, isolated, and hierarchy-safe
```

##### Template: Currency Pickup

```text
Asset Purpose: [CURRENCY_PURPOSE]
Gameplay Role: Collectible world-space currency; [APPROVED ECONOMY ROLE]
Gameplay Tier: Tier 3, below immediate threats
Pickup Category: Currency
Value/Rarity Tier: [APPROVED DENOMINATION OR VALUE TIER]
Visual Hierarchy: Consistent family with proportional value emphasis
Silhouette Rules: [STABLE_CURRENCY_FORM]; denominations differ by more than colour
Motion/State Requirement: [REQUIRED STATES AND FAMILY MOTION]
City-Skin Instructions: Preserve currency recognition; [SECONDARY CITY CUES]
Technical Output: [APPLICABLE ASSET CONTRACT REQUIREMENTS]; isolated transparent
base and separate optional state/VFX
Negative Constraints: No colour-only denomination, readable text dependence,
hazard, projectile, enemy, prop, HUD framing, or excessive shine
Acceptance Criteria: Currency family and value read across cities, levels,
groups, day/night, and accessibility treatments
```

##### Template: Major Reward

```text
Asset Purpose: [MAJOR_REWARD_PURPOSE]
Gameplay Role: Collectible world-space major reward; [APPROVED EFFECT]
Gameplay Tier: Tier 3 with strongest pickup-family emphasis, below threats
Pickup Category: Major Reward
Value/Rarity Tier: [RARE / MAJOR / APPROVED TIER]
Visual Hierarchy: Distinctive and celebratory without threat competition
Silhouette Rules: [RICHER_STABLE_SILHOUETTE]; value readable beyond colour
Motion/State Requirement: [ANTICIPATION / IDLE / ATTRACTION / COLLECTED /
EXPIRED AS APPLICABLE]
City-Skin Instructions: Preserve reward identity and rarity; [SECONDARY CUES]
Technical Output: [APPLICABLE ASSET CONTRACT REQUIREMENTS]; base, states, and
stronger but optional restrained VFX separated
Negative Constraints: No oversized explosion, persistent bloom, hazard,
projectile, enemy, prop, HUD panel, scene, or text-led rarity
Acceptance Criteria: Major value is clear, accessible, modular, isolated, and
still subordinate to immediate danger
```

##### Template: City-Skinned Pickup Variant

```text
Asset Purpose: City-skinned variant of [BASE_PICKUP]
Gameplay Role: Preserve [APPROVED EFFECT] and pickup category
Gameplay Tier: Same Tier 3 priority as the base
Pickup Category: [RESOURCE / RECOVERY / BOOST / CURRENCY / MAJOR REWARD]
Value/Rarity Tier: Unchanged [BASE VALUE TIER]
Visual Hierarchy: Identical category and value reading
Silhouette Rules: Preserve [CORE SILHOUETTE AND RECOGNITION LOGIC]
Motion/State Requirement: Preserve [BASE MOTION AND STATES]
City-Skin Instructions: Modify only [MATERIAL / PATTERN / MINOR ACCENT /
CULTURALLY APPROPRIATE FLAVOUR]
Technical Output: [APPLICABLE ASSET CONTRACT REQUIREMENTS]; isolated variant
with optional VFX separate
Negative Constraints: No changed meaning, category, rarity, core silhouette,
motion language, stereotype, landmark, or city-specific scene
Acceptance Criteria: Effect and value remain immediately recognizable without
relearning and without colour-only dependence
```

##### Template: Pickup State Variation

```text
Asset Purpose: [STATE] variation for [BASE_PICKUP]
Gameplay Role: Communicate [SPAWN / AVAILABLE / IDLE / ATTRACTION / COLLECTED /
EXPIRED] without changing effect
Gameplay Tier: Tier 3 with state-appropriate temporary emphasis
Pickup Category: [PICKUP CATEGORY]
Value/Rarity Tier: Preserve [BASE VALUE TIER]
Visual Hierarchy: State clear without overpowering threats
Silhouette Rules: Preserve base identity throughout the state
Motion/State Requirement: [SHORT RESTRAINED MOTION OR TRANSITION]
City-Skin Instructions: Preserve the approved base city skin
Technical Output: [APPLICABLE ASSET CONTRACT REQUIREMENTS]; separate state output
or technically approved reference
Negative Constraints: No large bounce, long trail, oversized explosion,
permanent VFX, colour-only state, or category drift
Acceptance Criteria: State is distinct, brief, readable, accessible, isolated,
and technically supportable
```

##### Template: Optional Pickup VFX

```text
Asset Purpose: Optional VFX attachment for [BASE_PICKUP / STATE]
Gameplay Role: Reinforce collectibility, value, or collection feedback
Gameplay Tier: Tier 3 support effect; subordinate to pickup and threats
Pickup Category: VFX attachment for [PICKUP CATEGORY]
Value/Rarity Tier: Proportional to [BASE VALUE TIER]
Visual Hierarchy: Brief, restrained, localized, and non-obscuring
Silhouette Rules: No independent collectible, projectile, hazard, or UI shape
Motion/State Requirement: [BRIEF TRAIL / SNAP / SHRINK / BURST / OTHER APPROVED
FEEDBACK]
City-Skin Instructions: Optional restrained compatibility with [CITY SKIN]
Technical Output: [APPLICABLE ASSET CONTRACT REQUIREMENTS]; isolated separately
from the base pickup
Negative Constraints: No permanent bake-in, bloom, large explosion, persistent
particles, threat cue, attack impact, HUD effect, or complete scene
Acceptance Criteria: Improves feedback without changing meaning, bounds,
accessibility, category recognition, or gameplay hierarchy
```

#### Acceptance Criteria

Accept a pickup only when:

1. It is recognizable at gameplay scale.
2. Gameplay meaning remains stable across city skins.
3. Value is readable without depending only on colour.
4. It remains visible over approved roads and environments.
5. It does not compete with immediate threats.
6. Common pickups remain readable in groups.
7. Applicable states are visually distinguishable.
8. The asset is modular and isolated.
9. Optional VFX is separate from the base.
10. It cannot be mistaken for another gameplay category.
11. Accessibility and day/night rules remain intact.
12. It inherits and meets the Technical Asset Contract.

#### Rejection Criteria

Reject or redesign a pickup that:

* depends on colour alone
* becomes a realistic food render
* resembles a hazard, attack, projectile, enemy, prop, interactive object, or
  HUD element
* uses excessive glow, particles, animation, or threat-like emphasis
* changes gameplay meaning or value recognition between cities
* contains a baked environment, ground plane, or complete scene
* becomes unreadable in groups
* uses text as its primary recognition mechanism
* violates the gameplay hierarchy
* permanently includes VFX that should remain optional
* ignores transparent isolation or Technical Asset Contract rules

### 7.7 Enemies Prompt Module

#### Purpose, Scope & Inheritance

This module governs production prompts for standard melee, fast, tank, ranged,
support/control, elite, and boss enemies; city-skinned variants; enemy states;
attack-anticipation poses; defeat references; and optional enemy-supporting VFX.

It excludes detached attacks, projectiles, standalone attack VFX, health bars,
World-space UI, HUD elements, complete combat scenes, and baked environments or
backgrounds. Those belong to their owning category modules.

Every enemy prompt inherits the Art Bible, global Prompt Bible rules, gameplay
priority tiers, Style & Shape Language, Colour & Contrast Language, Animation
Language, accessibility rules, modular asset system, City-Skin and Day/Night
modules, reference-image protocol, metadata/versioning conventions, and the
Technical Asset Contract.

#### Frozen Visual Hierarchy

Enemies are Tier 2 gameplay assets. They remain below the player and below
critical attack telegraphs when overlapping; above pickups; above environmental
props, frontage, road, and passive scenery; and above hazards when immediate
enemy recognition is the more urgent read. Enemy art must never obscure a more
urgent danger cue.

```text
Player
> critical overlapping attack telegraph
> immediate enemy recognition
> pickups
> environment and passive scenery
```

Contextual hazard urgency remains protected by the global interaction-first
hierarchy.

#### Recognition & Global Enemy Grammar

Enemy recognition must combine silhouette, body proportions, posture,
footprint, movement rhythm, equipment or functional apparatus, restrained
colour support, and state animation. Colour must never be the sole cue.

Normal enemies use simplified readable silhouettes, moderate gameplay-relevant
detail, clean flat-cartoon rendering, flat fills with at most one darker shade
where appropriate, mobile-scale readability, and restrained internal detail.
Do not use realism or painterly rendering.

The same gameplay archetype retains its core silhouette logic, proportions,
posture, footprint, movement language, attack expectation, state readability,
and gameplay hierarchy across cities.

City skins may modify only restrained secondary materials, clothing, surface
patterns, equipment styling, culturally appropriate accents, and minor colours
inside the gameplay colour system. They must not change meaning or turn one
archetype into another.

#### Enemy & Production Hierarchies

Gameplay archetype hierarchy:

```text
Standard
→ Fast
→ Tank
→ Ranged
→ Support/Control
→ Elite
→ Boss
```

Modular production hierarchy:

```text
Base Enemy
→ Gameplay Archetype
→ Difficulty/Elite Variant
→ City Skin
→ State
→ Optional Equipment
→ Optional VFX
```

Each layer preserves the inherited gameplay identity unless an approved
gameplay definition explicitly changes it.

#### Archetype Rules

**Standard enemy:** use balanced proportions, a neutral baseline silhouette,
straightforward movement, and clear melee or direct-contact behaviour. It is the
visual comparison baseline.

**Fast enemy:** use a narrow, light, or forward-leaning silhouette, energetic
directional posture, lighter perceived mass where appropriate, and quick
movement rhythm. Speed must read before movement begins. It must not resemble a
projectile.

**Tank enemy:** use a broad footprint, heavy proportions, grounded posture,
slow weighty movement, and structural durability cues. Communicate mass without
excess detail.

**Ranged enemy:** separate a weapon, launcher, or firing apparatus clearly from
the main silhouette. Posture and equipment must reveal attack direction and
ranged function before firing. Never bake a detached projectile into the base.

**Support/control enemy:** use a distinct non-direct-combat apparatus, stance,
or technically supported controlled component. It must read as support, buff,
debuff, summoning, or area control while staying distinct from ranged enemies,
pickups, and UI. Separate controlled VFX may reinforce the function.

**Elite enemy:** preserve the base archetype while using moderately richer
silhouette, controlled scale or mass increase, stronger state cues, and stronger
but restrained optional VFX. A colour swap alone is insufficient. Elites must
remain readable in groups.

**Boss enemy:** use a unique memorable silhouette, stronger scale and presence,
clear attack and phase readability, controlled complexity, and stronger
telegraphs and transitions. Bosses retain global enemy grammar, must read at
gameplay scale, and cannot be merely enlarged normal enemies.

#### Shared Enemy States

Use applicable states from:

```text
Spawn
→ Move
→ Anticipate
→ Attack
→ Hit
→ Stunned / Disabled
→ Defeated
```

Not every enemy needs every state. Every generated output must name its state.

* **Spawn:** brief and readable, with no long cinematic entrance for normal
  enemies; supporting VFX remains separate where necessary.
* **Move:** posture, timing, and weight reinforce archetype. Fast enemies feel
  light and directional, tanks heavy and grounded, and support enemies
  deliberate. Crowds must preserve silhouette recognition.
* **Anticipate:** communicates timing, attack direction, and approximate danger
  footprint where relevant through multiple cues. The pose may be produced with
  the enemy; detached attacks and major VFX remain separate.
* **Hit:** brief and directional where relevant, preserving recognition without
  excessive crowd noise.
* **Stunned/Disabled:** clearly differs from idle or movement through posture
  and motion, never colour alone.
* **Defeated:** uses an appropriate brief collapse, shrink, knockback,
  break-apart, or dissolve reference. Keep optional VFX separate. Standard
  enemies receive no long cinematic defeat or unexplained disappearance unless
  gameplay explicitly requires it.

#### Animation & Movement

Gameplay communication precedes personality. Use short reusable loops,
immediately readable anticipation, controlled secondary motion,
archetype-specific rhythm, minimal crowd noise, and procedural compatibility.

Avoid exaggerated constant idles, silhouette-breaking squash and stretch, long
combat personality animations, obscured attack timing, and identical movement
across archetypes.

Animation-frame references or state outputs must respect current Technical Asset
Contract capabilities. Do not imply unsupported sprite-sheet, skeletal, or
frame-animation runtime support.

#### Modular Telegraphs

Telegraphs must be modular and independently tunable. Combine pose, direction,
timing, boundary, footprint, motion, restrained colour, separate optional VFX,
and externally governed audio/haptics as appropriate. Never rely on colour alone.

Do not permanently bake large telegraphs, projectiles, or attack effects into
the base. Enemy generation may include an anticipation pose, weapon orientation,
attachment points, projectile source position, and supporting state reference.
It must exclude detached projectiles, complete attack trails, large impacts,
complete danger-zone overlays, health bars, and HUD warnings.

#### Density & Group Readability

Common enemies use simple silhouettes that remain distinct under partial
overlap. Avoid fragile thin details, excessive accessory variation, large
permanent VFX, and identical high contrast across every enemy. Elites and bosses
may be richer without destroying group readability. Size reflects gameplay
meaning, not decoration.

#### Category Differentiation & Negatives

Enemies must positively read as active hostile characters through threat
silhouette, hostile posture, readable footprint, archetype-specific movement,
functional equipment, and state cues.

Every prompt must explicitly prohibit resemblance to:

* the player or friendly player silhouette language
* pickups, rewards, or floating collectible forms
* hazards or ground-only patches
* projectiles, isolated directional shapes, or detached attacks
* environmental props, scenery, or passive treatment
* interactive world objects
* World-space UI, HUD icons, interface framing, health bars, damage numbers,
  text, or labels

Do not allow tiny unclear enemies that read as scenery.

#### Isolation & Technical Output

AI-generated enemy assets must be isolated, transparent-background, tightly and
cleanly bounded, consistently oriented, readable at gameplay scale, compatible
with the approved camera, and free of backgrounds, ground planes, scenes,
unrelated props, UI, text, and logos.

Use separate outputs where required for base enemy, archetype or elite variant,
city skin, state, equipment, optional VFX, and animation-frame reference.
Equipment or VFX must not be permanently merged unless the gameplay definition
requires it.

Inherit dimensions, alpha, padding, naming, metadata, scale, orientation, export,
runtime transformation, and animation support from the Technical Asset Contract.
Do not invent conflicting values or unsupported capabilities.

#### Reusable Enemy Prompt Templates

Every template follows:

```text
Asset Purpose
→ Gameplay Role
→ Tier/Hierarchy
→ Visual Rules
→ Archetype Rules
→ City Skin
→ State
→ Lighting/Time of Day
→ Isolation
→ Technical Contract
→ Negative Constraints
→ Acceptance Criteria
```

##### Template: Standard Melee Enemy

```text
Asset Purpose: [STANDARD_MELEE_ENEMY_PURPOSE]
Gameplay Role: [DIRECT_CONTACT_OR_MELEE_BEHAVIOUR]
Enemy Archetype: Standard Melee
Tier/Hierarchy: Tier 2; Standard baseline; below player, above pickups
Visual Rules: [READABLE_SILHOUETTE, PROPORTIONS, POSTURE, FOOTPRINT, MOVEMENT]
Archetype Rules: Balanced baseline form and straightforward melee expectation
City Skin: [CITY_SKIN_OR_GLOBAL]; secondary details only
State: [SPAWN / MOVE / ANTICIPATE / ATTACK / HIT / STUNNED / DEFEATED]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; preserve threat recognition
Isolation: Isolated transparent enemy; no scene, ground, UI, or detached attack
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No player, pickup, hazard, projectile, prop, UI, text,
realism, or baked attack resemblance
Acceptance Criteria: Baseline melee behaviour, state, group readability,
modularity, and technical compliance are clear at gameplay scale
```

##### Template: Fast Enemy

```text
Asset Purpose: [FAST_ENEMY_PURPOSE]
Gameplay Role: [APPROVED_FAST_BEHAVIOUR]
Enemy Archetype: Fast
Tier/Hierarchy: Tier 2; Fast archetype
Visual Rules: [NARROW_LIGHT_FORWARD_POSTURE, FOOTPRINT, QUICK_MOVEMENT_RHYTHM]
Archetype Rules: Speed reads before movement; never projectile-like
City Skin: [CITY_SKIN_OR_GLOBAL]; preserve fast grammar
State: [REQUESTED_STATE]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; preserve speed/threat cues
Isolation: Isolated transparent enemy; separate trails, attacks, and VFX
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No projectile, pickup, player, hazard, prop, UI, text,
fragile detail, or colour-only speed
Acceptance Criteria: Fast archetype, direction, state, crowd readability, and
technical compatibility read immediately
```

##### Template: Tank Enemy

```text
Asset Purpose: [TANK_ENEMY_PURPOSE]
Gameplay Role: [APPROVED_HEAVY_DURABLE_BEHAVIOUR]
Enemy Archetype: Tank
Tier/Hierarchy: Tier 2; Tank archetype
Visual Rules: [BROAD_FOOTPRINT, HEAVY_PROPORTIONS, GROUNDED_POSTURE, WEIGHT]
Archetype Rules: Mass and durability through structure, not detail overload
City Skin: [CITY_SKIN_OR_GLOBAL]; preserve tank grammar
State: [REQUESTED_STATE]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; preserve footprint and mass
Isolation: Isolated transparent enemy; no ground plane or baked effects
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No scaled-detail spectacle, player, pickup, hazard,
projectile, prop, UI, text, realism, or colour-only durability
Acceptance Criteria: Tank mass, movement expectation, state, group role, and
technical output remain clear
```

##### Template: Ranged Enemy

```text
Asset Purpose: [RANGED_ENEMY_PURPOSE]
Gameplay Role: [APPROVED_RANGED_BEHAVIOUR]
Enemy Archetype: Ranged
Tier/Hierarchy: Tier 2; Ranged archetype
Visual Rules: [BODY_POSTURE, FOOTPRINT, MOVEMENT, DISTINCT_FIRING_APPARATUS]
Archetype Rules: Attack direction and source read before firing
City Skin: [CITY_SKIN_OR_GLOBAL]; preserve ranged apparatus grammar
State: [REQUESTED_STATE]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; preserve apparatus separation
Isolation: Isolated transparent enemy; detached projectile and attack VFX absent
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No baked projectile, trail, impact, player, pickup,
hazard, prop, UI, health bar, or text
Acceptance Criteria: Ranged role, direction, state, group readability,
attachment source, and technical compliance are clear
```

##### Template: Support/Control Enemy

```text
Asset Purpose: [SUPPORT_CONTROL_ENEMY_PURPOSE]
Gameplay Role: [APPROVED_SUPPORT_BUFF_DEBUFF_SUMMON_OR_CONTROL_BEHAVIOUR]
Enemy Archetype: Support/Control
Tier/Hierarchy: Tier 2; Support/Control archetype
Visual Rules: [DISTINCT_APPARATUS_OR_STANCE, FOOTPRINT, DELIBERATE_MOVEMENT]
Archetype Rules: Distinct from ranged, pickup, and UI; support VFX separable
City Skin: [CITY_SKIN_OR_GLOBAL]; preserve functional grammar
State: [REQUESTED_STATE]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; preserve support recognition
Isolation: Isolated transparent enemy; separate orbit/control VFX where required
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No HUD framing, pickup icon, ranged confusion, player,
hazard, prop, baked control zone, text, or unsupported component
Acceptance Criteria: Support/control function, state, hierarchy, crowd
readability, modular effects, and technical feasibility are clear
```

##### Template: Elite Enemy Variant

```text
Asset Purpose: Elite variant of [BASE_ARCHETYPE]
Gameplay Role: [APPROVED_ELITE_BEHAVIOUR]
Enemy Archetype: Elite [BASE_ARCHETYPE]
Tier/Hierarchy: Tier 2; Elite preserving [BASE_ARCHETYPE]
Visual Rules: [MODERATELY_RICHER_SILHOUETTE, CONTROLLED_SCALE_OR_MASS, MOVEMENT]
Archetype Rules: Preserve base grammar; never colour-swap-only
City Skin: [CITY_SKIN_OR_GLOBAL]; secondary details only
State: [REQUESTED_STATE]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; preserve elite distinction
Isolation: Isolated transparent variant; optional stronger VFX separate
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No archetype redesign, colour-only elite, excessive VFX,
player, pickup, hazard, projectile, prop, UI, or scene
Acceptance Criteria: Base archetype and elite status read together in groups
without violating hierarchy or technical rules
```

##### Template: Boss Enemy

```text
Asset Purpose: [BOSS_ENEMY_PURPOSE]
Gameplay Role: [APPROVED_BOSS_AND_PHASE_ROLE]
Enemy Archetype: Boss
Tier/Hierarchy: Tier 2 major threat, below player and critical telegraphs
Visual Rules: [UNIQUE_SILHOUETTE, SCALE, POSTURE, FOOTPRINT, MOVEMENT_LANGUAGE]
Archetype Rules: Memorable controlled complexity; not scaled-up normal enemy
City Skin: [CITY_SKIN_OR_GLOBAL]; preserve boss gameplay identity
State: [SPAWN / MOVE / ANTICIPATE / ATTACK / HIT / DISABLED / DEFEATED / PHASE]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; preserve phase/threat cues
Isolation: Isolated transparent boss; attacks, telegraphs, VFX, and UI separate
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No illustration-level detail, scene, baked attack, health
bar, HUD, text, player resemblance, pickup, prop, or colour-only phase
Acceptance Criteria: Boss identity, phase/state, telegraph sources, gameplay
scale, modularity, and technical output remain clear
```

##### Template: City-Skinned Enemy Variant

```text
Asset Purpose: City skin of [BASE_ENEMY_ARCHETYPE]
Gameplay Role: Preserve [APPROVED_GAMEPLAY_ROLE]
Enemy Archetype: Preserve [BASE_ENEMY_ARCHETYPE]
Tier/Hierarchy: Preserve Tier 2 and [BASE_HIERARCHY_LEVEL]
Visual Rules: Preserve silhouette, proportions, posture, footprint, and movement
Archetype Rules: Preserve attack expectation and state recognition
City Skin: [CITY]; modify only [MATERIAL_CLOTHING_PATTERN_EQUIPMENT_ACCENT]
State: [REQUESTED_STATE]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; same enemy grammar
Isolation: Isolated transparent skin; equipment/VFX separate unless required
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No changed gameplay meaning, archetype drift, stereotype,
landmark, player, pickup, hazard, projectile, prop, UI, text, or scene
Acceptance Criteria: Base enemy remains recognizable without relearning across
city, state, lighting, crowd, and technical contexts
```

##### Template: Enemy State Variation

```text
Asset Purpose: [STATE] variation of [BASE_ENEMY]
Gameplay Role: Communicate [APPROVED_STATE_MEANING]
Enemy Archetype: Preserve [BASE_ENEMY_ARCHETYPE]
Tier/Hierarchy: Preserve Tier 2 and [ARCHETYPE_HIERARCHY]
Visual Rules: Preserve silhouette identity while changing readable pose/motion
Archetype Rules: State reinforces [ARCHETYPE_MOVEMENT_AND_BEHAVIOUR]
City Skin: Preserve [APPROVED_CITY_SKIN]
State: [SPAWN / MOVE / ANTICIPATE / ATTACK / HIT / STUNNED / DEFEATED]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; state remains clear
Isolation: Isolated transparent state reference; detached effects separate
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No colour-only state, silhouette loss, long personality
motion, baked attack/VFX, UI, text, scene, or unsupported animation promise
Acceptance Criteria: State, archetype, timing intent, group readability,
modularity, and technical feasibility are immediate
```

##### Template: Attack-Anticipation Pose

```text
Asset Purpose: Attack-anticipation pose for [BASE_ENEMY]
Gameplay Role: Communicate [ATTACK_TIMING_DIRECTION_AND_APPROXIMATE_FOOTPRINT]
Enemy Archetype: Preserve [BASE_ENEMY_ARCHETYPE]
Tier/Hierarchy: Tier 2 enemy pose below overlapping critical telegraph
Visual Rules: [READABLE_POSE, DIRECTION, WEAPON_OR_APPARATUS_ORIENTATION]
Archetype Rules: Preserve [ENEMY_ARCHETYPE] and honest attack expectation
City Skin: Preserve [APPROVED_CITY_SKIN]
State: Anticipate
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; multi-cue readability
Isolation: Isolated transparent pose; projectile, trail, danger zone, and impact
remain separate
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No colour-only cue, baked projectile/attack/telegraph,
misleading direction, player, pickup, hazard, UI, health bar, or text
Acceptance Criteria: Timing, direction, source, enemy identity, overlap safety,
and technical output are honest and readable
```

##### Template: Defeat-State Reference

```text
Asset Purpose: Defeat-state reference for [BASE_ENEMY]
Gameplay Role: Briefly confirm removal without obscuring gameplay
Enemy Archetype: Preserve [BASE_ENEMY_ARCHETYPE]
Tier/Hierarchy: Tier 2 transition that clears quickly
Visual Rules: [COLLAPSE_SHRINK_KNOCKBACK_BREAK_APART_OR_DISSOLVE_LANGUAGE]
Archetype Rules: Preserve recognition through the decisive defeat beat
City Skin: Preserve [APPROVED_CITY_SKIN]
State: Defeated
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; removal remains readable
Isolation: Isolated transparent reference; optional defeat VFX separate
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No long cinematic sequence, unexplained disappearance,
large persistent noise, baked scene, UI, text, or unsupported animation promise
Acceptance Criteria: Defeat is brief, clear, density-safe, archetype-consistent,
modular, and technically supportable
```

##### Template: Optional Enemy-Supporting VFX

```text
Asset Purpose: Optional supporting VFX for [ENEMY / STATE / TELEGRAPH]
Gameplay Role: Reinforce [APPROVED_ENEMY_INFORMATION]
Enemy Archetype: Support [BASE_ENEMY_ARCHETYPE]
Tier/Hierarchy: Support Tier 2 enemy information without obscuring higher urgency
Visual Rules: [LOCALIZED_CONTROLLED_MULTI_CUE_EFFECT_AND_MOTION]
Archetype Rules: Reinforce [ENEMY_ARCHETYPE] without becoming an attack asset
City Skin: [CITY_COMPATIBILITY_OR_GLOBAL]
State: [SPAWN / ANTICIPATE / HIT / STUNNED / DEFEATED / OTHER APPROVED STATE]
Lighting/Time of Day: [DAY / NIGHT / UNIVERSAL]; preserve effect meaning
Isolation: Isolated transparent VFX, separate from enemy base and detached attack
Technical Contract: [APPLICABLE_DIMENSIONS_ALPHA_PADDING_NAMING_METADATA_EXPORT]
Negative Constraints: No projectile, standalone attack, large danger zone,
pickup sparkle, hazard patch, UI, permanent merge, scene, bloom, or visual noise
Acceptance Criteria: Effect improves enemy/state recognition, stays modular and
localized, preserves crowd readability, and meets technical capabilities
```

#### Acceptance Criteria

Accept an enemy only when:

1. Its archetype is recognizable at gameplay scale.
2. Its silhouette communicates behaviour.
3. It is distinct from player, pickups, hazards, projectiles, and scenery.
4. Its requested state is immediately readable.
5. City skin preserves gameplay identity.
6. It remains readable in groups.
7. Animation or state pose supports gameplay communication.
8. Telegraph information is honest and uses multiple cues.
9. Detached attacks, projectiles, major effects, and UI remain separate.
10. It follows the clean flat-cartoon style.
11. It is modular and procedurally reusable.
12. Technical output meets the repository contract.

#### Rejection Criteria

Reject or redesign an enemy that:

* depends on colour alone or loses archetype recognition
* changes gameplay meaning through a city skin
* resembles a pickup, hazard, projectile, prop, player, or UI
* is realistic, painterly, overly detailed, or unreadable at gameplay scale
* includes a combat scene, baked background, or ground plane
* includes detached attacks or projectiles in the base sprite
* includes HUD, health bars, text, logos, or interface framing
* uses excessive permanent VFX
* fails under crowd density
* prioritizes personality or beauty over gameplay communication
* contradicts the Art Bible or Technical Asset Contract

### 7.8 Player Prompt Module

#### Purpose, Scope & Inheritance

This module governs prompts for the core player reference, identity and
progression variants, directional references, gameplay states, equipment
attachments, city and day/night variants, optional supporting VFX, and
technically required animation-frame references.

It excludes detached attacks and projectiles, standalone attack VFX, complete
weapon effects, enemies, hazards, pickups, portraits, inventory screens, menus,
health bars, World-space UI, HUD, complete gameplay scenes, baked environments,
backgrounds, and final narrative or character lore.

Every player prompt inherits the Art Bible, global Prompt Bible rules, Tier
system, Style & Shape Language, Colour & Contrast Language, Animation Language,
accessibility rules, modular asset system, City-Skin and Day/Night modules,
reference-image protocol, metadata/versioning conventions, and the Technical
Asset Contract.

#### Frozen Visual Hierarchy

The player is the highest-priority persistent world-space asset. The player
remains above enemies, hazards, pickups, props, frontage, road, and passive
scenery. Critical danger telegraphs and urgent active attacks may temporarily
demand greater attention, but the player must remain immediately locatable.

Effects must never hide player location, facing, movement direction, or state.
Visibility remains protected in dense combat and under partial overlap.

#### Global Player Identity

Use one globally stable identity with a distinctive overall silhouette and two
or three permanent recognition anchors. Recognition must not depend on colour
alone.

Anchors may be selected through the approved asset brief from head shape, hair
or headwear, body proportions, signature garment structure, carried-equipment
shape, or another stable silhouette feature. This module does not invent the
final character concept.

Restrained identity variants preserve the global player grammar. A city skin
must not redesign the player as a different character unless gameplay defines a
separate playable character.

#### Proportions, Style & Camera Compatibility

Use stylized compact proportions, a slightly enlarged head where useful for
mobile readability, clear limb separation, readable body language, and
three-quarter top-down construction compatible with the high bird’s-eye camera.
Prioritize silhouette before internal detail.

Use clean flat-cartoon rendering, flat fills with at most one darker shade where
appropriate, and the strongest persistent category-appropriate outline or
separation.

Avoid readability-reducing realism, extreme chibi proportions, strict overhead
construction that hides body language, rotated side-view art, painterly
treatment, and illustration-level detail.

#### Facing & Directional Readability

Facing follows movement or action direction. References must support a
standardized eight-direction system. Initial production may use fewer
directions, but construction must permit future eight-direction expansion.

Direction must read through silhouette, posture, limb placement, and equipment
orientation. Avoid uncontrolled angles and ambiguous front/back construction.
Preserve scale, perspective, framing, pivots, anchor points, and attachment
points between directions.

#### Motion Language

Responsiveness precedes personality. Use immediate control response, compact
readable motion, short reusable loops, controlled secondary motion, stable
silhouette, clear directional lean where useful, and modular animation.

Avoid movement delay, excessive squash and stretch, combat-competing idle
motion, decorative motion that obscures direction, inconsistent variant motion,
and static sliding without readable body response.

Do not promise sprite-sheet or frame animation unsupported by the Technical
Asset Contract. Animation-frame references remain separate production guidance
until technically approved.

#### Required Player States

Use applicable states from:

```text
Idle
→ Move
→ Attack / Action
→ Hit
→ Protected / Invulnerable
→ Defeated
```

Every output must identify its requested state.

* **Idle:** restrained loop preserving identity and direction, with minimal
  secondary motion; never resembles defeat, stun, or inactivity.
* **Move:** immediate and responsive; facing follows movement, posture clearly
  communicates motion, and the silhouette stays compact and loopable.
* **Attack/Action:** communicates timing and direction while preserving identity
  and location. Use modular attachment points; keep detached weapons,
  projectiles, trails, and major effects separate unless gameplay requires
  otherwise.
* **Hit:** brief, multi-cue, and directional where relevant. It may combine pose
  interruption, contract-supported flash, and optional separate VFX. It must not
  depend on red alone or create an oversized routine response.
* **Protected/Invulnerable:** preserves the base sprite and keeps location,
  facing, and motion visible. Use a clearly timed restrained outline, pulse,
  overlay, or separate VFX. Never hide the player, replace them with an unrelated
  glow object, or depend on colour alone.
* **Defeated:** clear, brief, stylized, non-graphic, and compatible with the
  playful tone. A collapse, stumble, shrink, knockback, or controlled dissolve
  may be referenced. Avoid gore, realistic distress, unexplained disappearance,
  and permanently merged defeat VFX.

#### Equipment Modularity

Keep the base player and weapons, carried tools, wearables, and supporting
effects separate where technically practical. Use stable attachment points and
consistent equipment scale and orientation between directions and states.

Equipment cannot alter the core silhouette beyond recognition. Detached
projectiles, trails, impacts, and attack VFX remain separate. Prefer reusable
attachments over multiplying complete player sets, and retain compatibility
with future progression.

#### Progression Variants

Moment-to-moment upgrades primarily appear through equipment, attacks, VFX, or
UI governed by their own systems. Only major persistent progression may alter
restrained secondary player features.

Every progression variant preserves silhouette, proportions, identity anchors,
hitbox perception, directional clarity, and gameplay role. Do not create
uncontrolled per-run redesigns or colour-swap-only progression. Stronger
progression may add moderately richer secondary detail without reducing
readability.

#### City Skins

City skins may alter restrained secondary materials, surface patterns, garment
accents, equipment styling, culturally appropriate motifs, and minor palette
adjustments inside the global gameplay colour system.

They preserve silhouette, permanent anchors, proportions, facing, movement,
states, attachment points, hitbox perception, and gameplay meaning. Reject
stereotypes, landmark costumes, caricature, role changes, fragile detail,
reduced readability, and colour-only recognition.

#### Day/Night Readability

Day and night use the same base structure. Night is a controlled readability
adaptation, not a redesign. Preserve colour meaning, separation from road,
enemies, and effects, identity, perceived hitbox, scale, and fairness.

Avoid excessive glow, permanent light pools, and materially larger or more
saturated night variants.

#### Optional Player-Supporting VFX

Supporting VFX remains separate, restrained, state-specific, modular,
independently tunable, non-obscuring, and compatible with reduced-VFX settings.
It may reinforce hit response, protection, major progression, movement burst,
collection response, or defeat.

It must not hide the player, create permanent noise, resemble enemy attacks or
danger telegraphs, change perceived hitbox, depend on colour alone, bake into
every frame, or use oversized routine explosions.

#### Density, Accessibility & Category Differentiation

Require immediate recognition at mobile scale, stable crowd visibility,
silhouette survival under overlap, protected identity, clear facing and motion,
controlled detail, minimal fragile elements, highest persistent gameplay
contrast, and reduced-motion/reduced-VFX compatibility.

The player must positively read as the controllable hero through stable
silhouette, permanent anchors, protected colour identity, outline/separation,
responsive motion, and directional posture.

Explicitly prohibit resemblance to enemies, pickups/rewards, hazards,
projectiles, attacks, environmental props, interactive objects, World-space UI,
or HUD icons. Avoid hostile enemy grammar, floating collectible forms, isolated
projectile shapes, ground-only hazard forms, muted prop contrast, interface
framing, tiny scenery-like forms, health bars, damage numbers, labels, text,
logos, permanent danger-coloured effects, and ambiguous allegiance.

#### Isolation & Technical Output

Player outputs must be isolated, transparent-background, tightly bounded,
consistently scaled, oriented, and framed, camera-compatible, and readable at
gameplay scale. Include no background, ground plane, scene, unrelated prop,
enemy, UI, text, or logo.

Use separate outputs where required for base player, identity variant,
direction, state, equipment attachment, progression variant, city skin,
day/night treatment, optional VFX, and animation-frame reference. Equipment and
VFX remain separate unless gameplay explicitly requires merging.

Dimensions, alpha, padding, pivots, anchors, naming, metadata, export, runtime
transformations, and animation capabilities inherit from the Technical Asset
Contract. Do not invent values or unsupported capabilities.

#### Frozen Modular Hierarchy

```text
Base Player
→ Identity Variant
→ Equipment/Progression Variant
→ City Skin
→ State
→ Direction
→ Optional VFX
```

Every stage preserves global identity and gameplay recognition.

#### Reusable Player Prompt Templates

Each template inherits Global Rules, this module, applicable City-Skin and
Day/Night modules, and the Technical Asset Contract.

##### Template: Core Player Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [CORE_PLAYER_REFERENCE_PURPOSE]
Gameplay Role/Hierarchy: Tier 1; highest-priority persistent world-space player
Player Identity: [APPROVED_IDENTITY_BRIEF]
Identity Anchors: [TWO_OR_THREE_PERMANENT_ANCHORS]
State: Neutral reference
Direction: [REFERENCE_DIRECTION]
Equipment/Progression: [BASE_EQUIPMENT_OR_NONE]
City Skin: [GLOBAL_OR_APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Compact flat-cartoon, three-quarter top-down, bird's-eye compatible
Technical Output: [CONTRACT_DIMENSIONS_ALPHA_PADDING_PIVOTS_NAMING_METADATA]
Negative Constraints: No final lore invention, enemy/pickup/hazard/attack/prop/UI
confusion, scene, ground, text, logo, realism, or unsupported detail
Acceptance Criteria: Identity, anchors, silhouette, scale, camera, direction,
accessibility, isolation, and technical compliance are clear
```

##### Template: Directional Player Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Directional reference for [BASE_PLAYER]
Gameplay Role/Hierarchy: Tier 1 persistent player
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve [PERMANENT_ANCHORS]
State: [IDLE_OR_NEUTRAL_DIRECTION_REFERENCE]
Direction: [EIGHT_DIRECTION_COMPATIBLE_REQUESTED_DIRECTION]
Equipment/Progression: [ATTACHMENT_CONFIGURATION]
City Skin: [APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Consistent scale, perspective, framing, limbs, and equipment
Technical Output: [CONTRACT_REQUIREMENTS_AND_STABLE_PIVOTS_ATTACHMENT_POINTS]
Negative Constraints: No ambiguous facing, uncontrolled angle, rotated side
view, scale drift, anchor drift, UI, scene, text, or category confusion
Acceptance Criteria: Direction reads through multiple cues and aligns with the
full direction system and technical anchors
```

##### Template: Idle-State Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Idle-state reference for [BASE_PLAYER]
Gameplay Role/Hierarchy: Tier 1 persistent player
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve [PERMANENT_ANCHORS]
State: Idle
Direction: [REQUESTED_DIRECTION]
Equipment/Progression: [CONFIGURATION]
City Skin: [APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Restrained loop, stable silhouette, minimal secondary motion
Technical Output: [CONTRACT_REQUIREMENTS_OR_APPROVED_ANIMATION_REFERENCE]
Negative Constraints: No defeat/stun confusion, exaggerated idle, delayed
control, silhouette loss, scene, UI, text, realism, or unsupported animation
Acceptance Criteria: Identity, direction, readiness, restraint, accessibility,
loop intent, and technical feasibility remain clear
```

##### Template: Movement-State Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Movement-state reference for [BASE_PLAYER]
Gameplay Role/Hierarchy: Tier 1 responsive controllable player
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve [PERMANENT_ANCHORS]
State: Move
Direction: [REQUESTED_DIRECTION]
Equipment/Progression: [CONFIGURATION]
City Skin: [APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Immediate compact motion, readable lean, stable top-down silhouette
Technical Output: [CONTRACT_REQUIREMENTS_OR_APPROVED_ANIMATION_REFERENCE]
Negative Constraints: No static sliding, delayed response, excessive squash,
direction ambiguity, scene, UI, text, or unsupported animation promise
Acceptance Criteria: Motion, direction, identity, loopability, crowd visibility,
accessibility, anchors, and technical support are clear
```

##### Template: Attack/Action Pose Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [ATTACK_OR_ACTION] pose for [BASE_PLAYER]
Gameplay Role/Hierarchy: Tier 1 player action; urgent telegraphs remain visible
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve [PERMANENT_ANCHORS]
State: Attack/Action
Direction: [ACTION_DIRECTION]
Equipment/Progression: [ATTACHMENT_AND_ACTION_CONFIGURATION]
City Skin: [APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Honest timing/direction pose with stable location and silhouette
Technical Output: [CONTRACT_REQUIREMENTS_AND_ATTACHMENT_POINTS]
Negative Constraints: No detached projectile, complete trail/effect, baked
attack scene, hidden identity/location, UI, text, or category confusion
Acceptance Criteria: Action timing, direction, source, identity, modular
attachments, overlap safety, and technical compliance are readable
```

##### Template: Hit-Response Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Hit-response reference for [BASE_PLAYER]
Gameplay Role/Hierarchy: Tier 1 player feedback without losing location
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve [PERMANENT_ANCHORS]
State: Hit
Direction: [HIT_OR_FACING_DIRECTION]
Equipment/Progression: Preserve [CONFIGURATION]
City Skin: [APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Brief multi-cue directional response; separate optional VFX
Technical Output: [CONTRACT_REQUIREMENTS_AND_SUPPORTED_FLASH_REFERENCE]
Negative Constraints: No red-only meaning, oversized reaction, disappearance,
silhouette loss, baked impact, gore, UI, text, or scene
Acceptance Criteria: Hit state, direction, identity, location, accessibility,
density safety, and technical feasibility remain clear
```

##### Template: Protected/Invulnerable-State Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Protected/invulnerable reference for [BASE_PLAYER]
Gameplay Role/Hierarchy: Tier 1 player with clearly timed protected state
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve [PERMANENT_ANCHORS]
State: Protected/Invulnerable
Direction: [REQUESTED_DIRECTION]
Equipment/Progression: Preserve [CONFIGURATION]
City Skin: [APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Visible base sprite plus restrained separable state treatment
Technical Output: [CONTRACT_REQUIREMENTS_AND_OPTIONAL_OVERLAY_OR_VFX_OUTPUT]
Negative Constraints: No disappearance, unrelated glow object, colour-only cue,
hitbox change, enemy telegraph resemblance, permanent bake, UI, or scene
Acceptance Criteria: Protection, timing, identity, location, facing, movement,
reduced-VFX readability, modularity, and technical support are clear
```

##### Template: Defeat-State Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Defeat-state reference for [BASE_PLAYER]
Gameplay Role/Hierarchy: Clear brief player defeat confirmation
Player Identity: Preserve [APPROVED_IDENTITY] through the decisive beat
Identity Anchors: Preserve [PERMANENT_ANCHORS] where state permits
State: Defeated
Direction: [REQUESTED_DIRECTION_OR_DIRECTIONAL_RESPONSE]
Equipment/Progression: Preserve or separately handle [CONFIGURATION]
City Skin: [APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Stylized non-graphic collapse/stumble/shrink/knockback/dissolve
Technical Output: [CONTRACT_REQUIREMENTS_OR_APPROVED_ANIMATION_REFERENCE]
Negative Constraints: No gore, distress realism, long cinematic sequence,
unexplained disappearance, baked VFX, scene, UI, text, or category confusion
Acceptance Criteria: Defeat reads clearly and briefly while preserving tone,
identity, modularity, accessibility, and technical feasibility
```

##### Template: Equipment Attachment

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Modular [EQUIPMENT_TYPE] attachment for [BASE_PLAYER]
Gameplay Role/Hierarchy: Supports Tier 1 player without replacing identity
Player Identity: Compatible with [APPROVED_IDENTITY]
Identity Anchors: Must not obscure [PERMANENT_ANCHORS]
State: [COMPATIBLE_STATES]
Direction: [DIRECTION_OR_DIRECTION_SET]
Equipment/Progression: [EQUIPMENT_FUNCTION_AND_VARIANT]
City Skin: [GLOBAL_OR_APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Matching flat-cartoon scale, orientation, perspective, and anchors
Technical Output: [CONTRACT_REQUIREMENTS_AND_ATTACHMENT_POINT_METADATA]
Negative Constraints: No permanently merged base, recognition loss, detached
projectile/trail/impact, scale drift, scene, UI, text, or unsupported transform
Acceptance Criteria: Attachment is reusable across approved directions/states,
preserves identity, and aligns technically
```

##### Template: Major Progression Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Major persistent progression variant of [BASE_PLAYER]
Gameplay Role/Hierarchy: Preserve Tier 1 player role and hitbox perception
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve [PERMANENT_ANCHORS]
State: [REFERENCE_STATE]
Direction: [REFERENCE_DIRECTION_OR_SET]
Equipment/Progression: [APPROVED_MAJOR_PROGRESSION_CHANGE]
City Skin: [GLOBAL_OR_APPROVED_SKIN]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Moderately richer secondary detail without core redesign
Technical Output: [CONTRACT_REQUIREMENTS_AND_COMPATIBLE_ATTACHMENT_POINTS]
Negative Constraints: No colour-swap-only progression, uncontrolled redesign,
role/hitbox change, fragile detail, scene, UI, text, or identity loss
Acceptance Criteria: Progression reads while identity, direction, scale,
accessibility, modularity, and technical compatibility remain stable
```

##### Template: City-Skinned Player Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [CITY] skin for [BASE_PLAYER]
Gameplay Role/Hierarchy: Preserve Tier 1 player role
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve [PERMANENT_ANCHORS]
State: [REFERENCE_STATE]
Direction: [REFERENCE_DIRECTION_OR_SET]
Equipment/Progression: Preserve [CONFIGURATION]
City Skin: Modify only [MATERIAL_PATTERN_GARMENT_ACCENT_EQUIPMENT_MOTIF_PALETTE]
Time of Day: [UNIVERSAL / DAY / NIGHT]
Style/Camera: Same silhouette, proportions, movement grammar, and perspective
Technical Output: [CONTRACT_REQUIREMENTS_AND_STABLE_ATTACHMENTS_PIVOTS]
Negative Constraints: No stereotype, landmark costume, caricature, new role,
colour-only recognition, fragile detail, scene, UI, text, or identity redesign
Acceptance Criteria: Player remains immediately recognizable across city,
direction, state, density, accessibility, and technical contexts
```

##### Template: Day/Night Readability or Player-Supporting VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [DAY_NIGHT_READABILITY_TREATMENT / OPTIONAL_SUPPORTING_VFX]
Gameplay Role/Hierarchy: Protect or reinforce Tier 1 player readability
Player Identity: Preserve [APPROVED_IDENTITY]
Identity Anchors: Preserve visibility of [PERMANENT_ANCHORS]
State: [BASE_STATE_OR_SUPPORTED_STATE]
Direction: [REQUESTED_DIRECTION_OR_DIRECTION_INDEPENDENT]
Equipment/Progression: Preserve [CONFIGURATION]
City Skin: [APPROVED_SKIN]
Time of Day: [DAY / NIGHT / UNIVERSAL]
Style/Camera: [CONTROLLED_READABILITY_ADAPTATION / LOCALIZED_SEPARABLE_VFX]
Technical Output: [CONTRACT_REQUIREMENTS]; output treatment or VFX separately
Negative Constraints: No redesign, excessive glow, permanent light pool,
obscured player, hitbox change, danger-telegraph confusion, colour-only meaning,
permanent merge, scene, UI, text, or unsupported capability
Acceptance Criteria: Requested treatment preserves identity, location, facing,
state, accessibility, hierarchy, modularity, and technical compliance
```

#### Acceptance Checklist

Accept a player output only when:

1. It is immediately recognizable at gameplay scale.
2. It preserves the global player identity and permanent anchors.
3. It uses multiple recognition cues.
4. It differs from enemies, pickups, hazards, attacks, projectiles, and scenery.
5. Facing and direction are clear.
6. The requested state is immediately readable.
7. Animation language remains responsive.
8. Equipment, progression, city, and day/night variants preserve identity.
9. It remains readable in dense combat.
10. Detached attacks and major VFX remain separate.
11. Scale, perspective, pivots, and attachment points remain stable.
12. Accessibility and reduced-VFX requirements remain supported.
13. It follows the clean flat-cartoon style.
14. It is modular and procedurally reusable.
15. It complies with the Technical Asset Contract.

#### Rejection Criteria

Reject or redesign a player output that:

* depends on colour alone, loses the core silhouette, or changes permanent
  anchors without approval
* resembles an enemy, pickup, hazard, projectile, prop, attack, or UI
* obscures facing or movement
* uses realistic, painterly, or excessive detail
* fails at mobile scale or under crowd density
* bakes attacks, projectiles, or large VFX into the base
* makes equipment non-modular
* uses stereotypes or changes gameplay meaning through a city skin
* gives night excessive glow
* hides the player during protection
* uses graphic injury, gore, or realistic distress
* includes scenes, backgrounds, ground planes, HUD, health bars, text, or logos
* prioritizes personality or beauty over responsiveness and readability
* contradicts the Art Bible or Technical Asset Contract

### 7.9 Attacks & Projectiles Prompt Module

#### Purpose, Scope & Inheritance

This module governs prompts for player and enemy attacks; melee shapes;
standard, fast, and heavy projectiles; beams; continuous and area attacks;
orbiting, chained, and bouncing attacks; direction, power, city, state, and
day/night variants; functional telegraphs; optional attack-supporting VFX; and
technically required animation-frame references.

It excludes base character sprites, non-attack character animation sets,
general-purpose VFX systems, reusable global impacts, trails, particles and
status effects, environmental effects, hazards, pickups, props, World-space UI,
HUD, scenes, backgrounds, text, labels, damage numbers, logos, and health bars.
General VFX grammar remains assigned to the next VFX Prompt Module.

Every attack prompt inherits the Art Bible, global Prompt Bible rules, gameplay
hierarchy, Style & Shape, Colour & Contrast, Animation, accessibility, modular
asset, City-Skin and Day/Night rules, metadata/versioning, reference protocol,
and applicable Technical Asset Contract requirements.

#### Frozen Visual Hierarchy & Ownership

Critical enemy danger telegraphs receive the highest immediate urgency. The
player remains the highest-priority persistent object. Active enemy attacks must
remain distinguishable from player attacks. Player attacks may be satisfying
but cannot obscure the player, enemies, or urgent danger.

Major attacks rank above routine attacks. Attacks remain above pickups, hazards
when immediate attack recognition is more urgent, and passive environment.
Effects must never hide player location, immediate threats, or dangerous
footprints.

Player and enemy attacks share the flat-cartoon style but use distinct ownership
grammar.

* **Player attacks:** controlled, responsive, satisfying, readable, and visually
  distinct from enemy danger without overwhelming critical threats.
* **Enemy attacks:** urgent, threatening, clearly telegraphed, directionally
  readable, and honest about timing and footprint.

Ownership must survive overlap, city skins, power variants, and day/night
treatments.

#### Core Recognition & Footprint Honesty

Every attack communicates through multiple cues:

```text
silhouette
+ direction
+ footprint
+ boundary
+ motion
+ timing
+ origin
+ scale
+ restrained colour
+ state
```

Colour cannot be the sole ownership, danger, power, or timing cue. Attacks must
read at mobile scale and in crowded combat.

Visible behaviour and dangerous space must align reasonably with collision or
damage bounds. Controlled exaggeration may improve readability, but reject
deceptive hitboxes, invisible extensions, undersized visual footprints,
harmless-looking oversized effects, misleading trails, and boundaries that
contradict behaviour.

#### Frozen Modular Hierarchy

```text
Base Attack
→ Attack Type
→ Gameplay Variant
→ Power Tier
→ Ownership
→ City Skin
→ State
→ Direction
→ Optional VFX
```

Every stage preserves ownership, direction, footprint, timing, attack type,
gameplay meaning, collision perception, and readability.

#### Shared Attack States

```text
Anticipation / Telegraph
→ Launch / Start
→ Active / Travel
→ Impact
→ Recovery / Expiration
```

Not every attack requires every state. Every output must name its state.

* **Anticipation/Telegraph:** communicates approximate activation timing,
  direction, footprint, origin, and escalation through multiple cues.
* **Launch/Start:** makes initiation immediate without excessive noise.
* **Active/Travel:** preserves ownership, direction, speed or weight, footprint,
  and collision readability.
* **Impact:** clearly communicates contact or completion; impact VFX remains
  separate where practical.
* **Recovery/Expiration:** makes the end of danger unambiguous, including for
  persistent attacks.

#### Telegraph Separation

Telegraphs remain modular and independently tunable whenever gameplay controls
timing, footprint, direction, escalation, cancellation, difficulty scaling, or
phase behaviour. An attack pose may support anticipation, but danger-zone
overlays cannot be permanently baked into a character or attack body.

Use separate outputs wherever gameplay requires independent timing or tuning.

#### Attack-Type Rules

**Melee attacks:** communicate direction, reach, sweep/strike/thrust behaviour,
timing, and impact point. Use a character pose plus modular attack shape when
needed. Slash arcs, trails, weapon sweeps, and impacts remain separate from the
character base.

**Standard projectiles:** use a strong readable silhouette, clear travel
direction, honest footprint, stable ownership, recognizable speed/weight, and
clean mobile-scale construction. They must not resemble pickups, characters,
props, UI, or decoration.

**Fast projectiles:** may use simplified elongated silhouettes, strong
directionality, brief modular trails, and restrained motion accents. Avoid
fragile detail, permanent long trails, false footprint enlargement, and forms
that disappear at speed.

**Heavy projectiles:** communicate weight through broader silhouette, perceived
mass, slower rhythm, stronger anticipation, controlled impact expectation, and
grounded motion—not detail or permanent particle noise.

**Area attacks:** communicate boundary, footprint, activation timing, safe versus
dangerous state, persistence where relevant, and ownership. The damage area must
read before spectacle; decorative explosion alone is not a boundary.

**Beams/continuous attacks:** communicate source, direction, active width,
activation timing, sustained state, and ending/interruption. Do not hide player,
enemies, unrelated danger zones, or origins.

**Orbiting attacks:** communicate orbit radius, damaging elements, ownership,
active footprint, and movement direction where relevant. They cannot obscure
player identity anchors or alter perceived player hitbox.

**Chained/bouncing attacks:** separate source, travel object, connection/chain,
bounce, impact, and optional VFX references where required. Never bake a complete
combat event into one scene or asset.

#### Power & Progression Variants

Power may proportionally increase scale, silhouette richness, controlled
component count, motion intensity, impact strength, restrained VFX, and
externally governed audio/haptic importance.

Every power tier preserves base identity, ownership, direction, collision
perception, behaviour, timing, and role. Colour swaps alone are insufficient.
Avoid uncontrolled particles, trails, detail, and screen coverage.

#### City Skins & Day/Night

City skins may alter restrained materials, minor motifs, surface patterns,
secondary accents, culturally appropriate styling, and limited palette details.
They preserve ownership, direction, footprint, timing, type, power hierarchy,
danger meaning, and behaviour. Reject stereotypes, landmarks, decorative
cultural-object drift, changed meaning, reduced readability, category confusion,
and colour-only identity.

Day and night use the same base grammar. Night is a controlled readability
adaptation that may adjust edge support, local contrast, restrained brightness,
and visibility against the road. It preserves ownership, danger/power meaning,
direction, timing, footprint, collision readability, and fairness.

Avoid excessive glow, permanent light pools, oversized night variants, ownership
colour changes, and reduced night readability.

#### Crowded-Combat Readability

Routine attacks remain simple; persistent attacks avoid permanent noise; trails
stay brief; overlapping effects remain bounded; and major attacks receive
proportional emphasis. Enemy danger remains visible through player spectacle.
Player attacks cannot drown urgent enemy telegraphs.

Silhouettes and boundaries survive overlap. Permanent VFX remains limited.
Reduced-motion and reduced-VFX modes remain possible. Clarity must survive high
enemy and projectile density.

#### Attack/VFX Ownership Boundary

This module owns attack/projectile bodies, type, footprint, ownership, state,
direction, functional telegraph requirements, power variants, city skins,
day/night readability, and attack-specific optional VFX references.

The VFX module owns global impact grammar, reusable trails, bursts,
particles, status and hit effects, environmental effects, global effect
hierarchy/density, and reusable VFX state systems.

Optional VFX references here remain separate, restrained, modular,
independently tunable, and reduced-VFX compatible.

#### Category Differentiation & Negatives

Attacks must positively communicate ownership, origin, direction, dangerous
footprint, state, and timing.

Explicitly prohibit resemblance to pickups/rewards, characters, environmental
props, passive road overlays, harmless decoration, World-space UI, HUD icons,
health bars, or interface frames.

Avoid collectible forms, faces/limbs, prop-level contrast, scenery detail,
interface framing, misleading hazard boundaries, unclear collision objects,
text, labels, numbers, logos, ground-only forms belonging to hazards, and danger
zones merged into unrelated assets.

#### Isolation & Technical Output

Attack assets must be isolated, transparent-background, tightly bounded,
consistently scaled/oriented/framed, high bird’s-eye compatible, and readable at
gameplay scale. Include no background, unrelated ground plane, scene, character,
prop, UI, text, or logo. A modular ground footprint is permitted only when it is
the attack itself.

Use separate outputs where required for base attack, projectile, direction,
ownership, power, city, day/night, state, telegraph, impact, trail, optional
VFX, and animation-frame reference.

Detached projectiles, trails, telegraphs, impacts, and supporting VFX must not be
merged into player/enemy bases unless gameplay explicitly requires it.
Dimensions, alpha, padding, pivots, anchors, orientation, naming, metadata,
export, transformations, and animation support inherit from the Technical Asset
Contract.

#### Reusable Attack Prompt Templates

Each template inherits Global Rules, this module, applicable City-Skin and
Day/Night modules, and the Technical Asset Contract.

##### Template: Player Melee Attack

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [PLAYER_MELEE_ATTACK_PURPOSE]
Gameplay Role/Ownership/Tier: Player attack; [ROUTINE / MAJOR]
Attack Type/Behaviour: Melee [SWEEP / STRIKE / THRUST / APPROVED_BEHAVIOUR]
Direction/Footprint/Timing: [DIRECTION / REACH / TIMING / IMPACT_POINT]
Power Tier/State: [POWER_TIER]; [TELEGRAPH / START / ACTIVE / IMPACT / RECOVERY]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Controlled flat-cartoon shape; high bird’s-eye compatible
Isolation/Technical Output: Isolated modular attack shape; [CONTRACT_REQUIREMENTS]
Negative Constraints: No baked player, projectile, scene, pickup/hazard/UI
confusion, colour-only ownership, false footprint, or permanent major VFX
Acceptance Criteria: Player ownership, direction, reach, timing, state,
modularity, visibility, accessibility, and contract compliance are clear
```

##### Template: Enemy Melee Attack

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [ENEMY_MELEE_ATTACK_PURPOSE]
Gameplay Role/Ownership/Tier: Enemy danger; [ROUTINE / MAJOR / CRITICAL]
Attack Type/Behaviour: Melee [SWEEP / STRIKE / THRUST / APPROVED_BEHAVIOUR]
Direction/Footprint/Timing: [DIRECTION / REACH / TIMING / IMPACT_POINT]
Power Tier/State: [POWER_TIER]; [TELEGRAPH / START / ACTIVE / IMPACT / RECOVERY]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Urgent multi-cue flat-cartoon threat; bird's-eye compatible
Isolation/Technical Output: Isolated attack/telegraph outputs; [CONTRACT_REQUIREMENTS]
Negative Constraints: No baked enemy, player ownership confusion, pickup/prop/UI
form, colour-only warning, dishonest footprint, scene, text, or merged telegraph
Acceptance Criteria: Enemy ownership, urgency, direction, reach, timing,
telegraph tuning, accessibility, and technical output are clear
```

##### Template: Standard Player Projectile

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [STANDARD_PLAYER_PROJECTILE_PURPOSE]
Gameplay Role/Ownership/Tier: Player projectile; [ROUTINE / MAJOR]
Attack Type/Behaviour: Standard projectile; [TRAVEL_BEHAVIOUR]
Direction/Footprint/Timing: [DIRECTION / COLLISION_FOOTPRINT / SPEED / TIMING]
Power Tier/State: [POWER_TIER]; [START / TRAVEL / IMPACT / EXPIRATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Stable readable ownership silhouette at mobile scale
Isolation/Technical Output: Isolated projectile; trail/impact separate;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No enemy ownership, pickup/character/prop/UI form, baked
trail/impact, colour-only cue, false hitbox, scene, text, or logo
Acceptance Criteria: Ownership, travel, footprint, speed, state, crowd
readability, modularity, accessibility, and contract compliance are clear
```

##### Template: Standard Enemy Projectile

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [STANDARD_ENEMY_PROJECTILE_PURPOSE]
Gameplay Role/Ownership/Tier: Enemy projectile; [ROUTINE / MAJOR / CRITICAL]
Attack Type/Behaviour: Standard projectile; [TRAVEL_BEHAVIOUR]
Direction/Footprint/Timing: [DIRECTION / COLLISION_FOOTPRINT / SPEED / TIMING]
Power Tier/State: [POWER_TIER]; [TELEGRAPH / START / TRAVEL / IMPACT / EXPIRATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Threat-readable flat-cartoon silhouette; mobile scale
Isolation/Technical Output: Isolated projectile; telegraph/trail/impact separate;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No player ownership, pickup/prop/UI form, baked enemy,
colour-only danger, false footprint, scene, text, or permanent trail
Acceptance Criteria: Enemy ownership, direction, danger, timing, footprint,
telegraph separation, density safety, accessibility, and contract compliance
```

##### Template: Fast Projectile

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [FAST_PROJECTILE_PURPOSE]
Gameplay Role/Ownership/Tier: [PLAYER / ENEMY] fast projectile; [IMPORTANCE]
Attack Type/Behaviour: Fast projectile; [TRAVEL_BEHAVIOUR]
Direction/Footprint/Timing: [DIRECTION / FOOTPRINT / FAST_SPEED / TIMING]
Power Tier/State: [POWER_TIER]; [START / TRAVEL / IMPACT / EXPIRATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Simplified directional silhouette; readable at speed
Isolation/Technical Output: Isolated body; brief optional trail separate;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No fragile detail, long permanent trail, false enlarged
hitbox, pickup/UI form, colour-only ownership, scene, text, or unreadable speed
Acceptance Criteria: Ownership, speed, direction, footprint, state, density
readability, modular trail, and technical compliance are clear
```

##### Template: Heavy Projectile

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [HEAVY_PROJECTILE_PURPOSE]
Gameplay Role/Ownership/Tier: [PLAYER / ENEMY] heavy projectile; [IMPORTANCE]
Attack Type/Behaviour: Heavy projectile; [TRAVEL_BEHAVIOUR]
Direction/Footprint/Timing: [DIRECTION / BROAD_FOOTPRINT / SLOWER_RHYTHM / TIMING]
Power Tier/State: [POWER_TIER]; [TELEGRAPH / START / TRAVEL / IMPACT / RECOVERY]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Broad mass and grounded motion without detail noise
Isolation/Technical Output: Isolated body; impact/particles separate;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No detail-based weight, permanent particles, pickup/prop/
UI form, colour-only ownership, false footprint, scene, or baked impact
Acceptance Criteria: Ownership, mass, speed, anticipation, footprint, state,
modularity, crowd clarity, and contract compliance are clear
```

##### Template: Area Attack

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [AREA_ATTACK_PURPOSE]
Gameplay Role/Ownership/Tier: [PLAYER / ENEMY] area attack; [IMPORTANCE]
Attack Type/Behaviour: Area attack; [PERSISTENCE_OR_ACTIVATION_BEHAVIOUR]
Direction/Footprint/Timing: [ORIGIN / BOUNDARY / AREA / ACTIVATION / DURATION]
Power Tier/State: [POWER_TIER]; [TELEGRAPH / ACTIVE / IMPACT / EXPIRATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Honest bounded flat-cartoon area; state readable before spectacle
Isolation/Technical Output: Isolated footprint and independently tunable telegraph;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No explosion-only boundary, hazard confusion, decorative
ground patch, UI ring, colour-only state, false area, scene, text, or baked owner
Acceptance Criteria: Ownership, boundary, timing, safe/danger state, persistence,
telegraph control, accessibility, and technical compliance are clear
```

##### Template: Beam or Continuous Attack

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [BEAM_OR_CONTINUOUS_ATTACK_PURPOSE]
Gameplay Role/Ownership/Tier: [PLAYER / ENEMY] continuous attack; [IMPORTANCE]
Attack Type/Behaviour: [BEAM / CONTINUOUS]; [SUSTAINED_BEHAVIOUR]
Direction/Footprint/Timing: [SOURCE / DIRECTION / ACTIVE_WIDTH / START / DURATION]
Power Tier/State: [POWER_TIER]; [TELEGRAPH / START / ACTIVE / END]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Source and width remain readable without obscuring gameplay
Isolation/Technical Output: Separate source/telegraph/body/end references;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No hidden origin/player/enemy, oversized bloom, UI bar,
colour-only ownership, false width, scene, text, or permanently merged states
Acceptance Criteria: Ownership, source, direction, width, timing, interruption,
overlap safety, modularity, and contract compliance are clear
```

##### Template: Orbiting Attack

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [ORBITING_ATTACK_PURPOSE]
Gameplay Role/Ownership/Tier: [PLAYER / ENEMY] orbiting attack; [IMPORTANCE]
Attack Type/Behaviour: Orbiting; [ORBIT_BEHAVIOUR]
Direction/Footprint/Timing: [ORIGIN / RADIUS / ELEMENT_BOUNDS / ROTATION / TIMING]
Power Tier/State: [POWER_TIER]; [START / ACTIVE / EXPIRATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Bounded orbit grammar preserving owner identity and hitbox
Isolation/Technical Output: Separate orbit element and required references;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No obscured player anchors, false owner hitbox, pickup/UI
appearance, colour-only ownership, scene, text, or unsupported runtime transform
Acceptance Criteria: Ownership, radius, elements, footprint, motion, identity
visibility, accessibility, and technical feasibility are clear
```

##### Template: Chained or Bouncing Attack

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [CHAINED_OR_BOUNCING_ATTACK_PURPOSE]
Gameplay Role/Ownership/Tier: [PLAYER / ENEMY] chained/bouncing attack; [IMPORTANCE]
Attack Type/Behaviour: [CHAINED / BOUNCING]; [APPROVED_BEHAVIOUR]
Direction/Footprint/Timing: [SOURCE / TRAVEL / CONNECTION_OR_BOUNCE / TIMING]
Power Tier/State: [POWER_TIER]; [START / TRAVEL / BOUNCE / IMPACT / EXPIRATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Modular event components with honest collision perception
Isolation/Technical Output: Separate source, travel, chain/bounce, impact, VFX;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No complete baked combat event, false chain width, UI,
pickup/prop form, colour-only ownership, scene, text, or merged unrelated states
Acceptance Criteria: Ownership, sequence, direction, footprint, bounce/chain
logic, modularity, accessibility, and contract compliance are clear
```

##### Template: Attack Power-Tier Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [POWER_TIER] variant of [BASE_ATTACK]
Gameplay Role/Ownership/Tier: Preserve [OWNERSHIP_AND_GAMEPLAY_IMPORTANCE]
Attack Type/Behaviour: Preserve [BASE_TYPE_AND_BEHAVIOUR]
Direction/Footprint/Timing: Preserve [BASE_DIRECTION_FOOTPRINT_TIMING]
Power Tier/State: [REQUESTED_POWER_TIER]; [REFERENCE_STATE]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Controlled scale/richness/motion increase, flat-cartoon style
Isolation/Technical Output: Isolated variant with optional VFX separate;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No colour-swap-only power, changed behaviour/ownership/
hitbox, uncontrolled screen coverage, particles, scene, UI, text, or category drift
Acceptance Criteria: Power increase reads through multiple cues while base
identity, fairness, modularity, density safety, and contract rules remain stable
```

##### Template: City-Skinned Attack Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [CITY] skin of [BASE_ATTACK]
Gameplay Role/Ownership/Tier: Preserve [OWNERSHIP_AND_IMPORTANCE]
Attack Type/Behaviour: Preserve [BASE_TYPE_AND_BEHAVIOUR]
Direction/Footprint/Timing: Preserve [BASE_DIRECTION_FOOTPRINT_TIMING]
Power Tier/State: Preserve [POWER_TIER_AND_STATE]
City Skin/Day-Night: [SECONDARY_CITY_CUES]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Same attack grammar with restrained secondary flavour
Isolation/Technical Output: Isolated skin; optional VFX separate;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No changed meaning, ownership, power, stereotype,
landmark, decorative-object drift, colour-only recognition, scene, UI, or text
Acceptance Criteria: Attack remains recognizable without relearning across city,
lighting, density, accessibility, and technical contexts
```

##### Template: Attack-State or Direction Variation

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: [STATE_OR_DIRECTION] variation of [BASE_ATTACK]
Gameplay Role/Ownership/Tier: Preserve [OWNERSHIP_AND_IMPORTANCE]
Attack Type/Behaviour: Preserve [BASE_TYPE_AND_BEHAVIOUR]
Direction/Footprint/Timing: [REQUESTED_DIRECTION / HONEST_FOOTPRINT / STATE_TIMING]
Power Tier/State: Preserve [POWER_TIER]; [TELEGRAPH / START / ACTIVE / IMPACT / END]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: State/direction readable through multiple stable cues
Isolation/Technical Output: Isolated variation; independently tunable components;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No ambiguous direction/end state, changed ownership/
hitbox, colour-only cue, merged telegraph/impact, scene, UI, text, or scale drift
Acceptance Criteria: Requested state/direction, ownership, timing, footprint,
modularity, accessibility, and technical alignment are immediate
```

##### Template: Optional Attack-Supporting VFX Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS]
Asset Purpose: Optional supporting VFX for [BASE_ATTACK / STATE]
Gameplay Role/Ownership/Tier: Reinforce [OWNERSHIP_AND_ATTACK_INFORMATION]
Attack Type/Behaviour: Support [BASE_TYPE_AND_BEHAVIOUR], not general VFX grammar
Direction/Footprint/Timing: Preserve [DIRECTION_FOOTPRINT_TIMING_AND_BOUNDS]
Power Tier/State: Proportional to [POWER_TIER]; supports [STATE]
City Skin/Day-Night: [CITY_COMPATIBILITY]; [DAY / NIGHT / UNIVERSAL]
Visual/Camera Rules: Separate, restrained, localized, reduced-VFX compatible
Isolation/Technical Output: Isolated optional VFX reference; [CONTRACT_REQUIREMENTS]
Negative Constraints: No permanent merge, global impact/trail/particle-system
definition, obscured player/threat, false hitbox, UI, scene, text, or excessive bloom
Acceptance Criteria: Effect improves attack information without changing
ownership, footprint, hierarchy, modularity, accessibility, or technical support
```

#### Acceptance Criteria

Accept an attack output only when:

1. Ownership, direction, and behaviour are clear.
2. Dangerous footprint is honest.
3. It reads at mobile scale and in crowded combat.
4. Identity survives power, city, state, direction, and day/night variants.
5. It differs from pickups, hazards, props, characters, and UI.
6. Requested state is immediate.
7. Player visibility and urgent enemy telegraphs remain protected.
8. Functional components are modular.
9. Recognition uses multiple cues.
10. Telegraphs remain independently tunable where required.
11. It follows the clean flat-cartoon style.
12. Accessibility and reduced-VFX modes remain supported.
13. It is procedurally reusable.
14. It complies with the Technical Asset Contract.

#### Rejection Criteria

Reject or redesign an attack that:

* depends on colour alone or confuses ownership
* hides or misrepresents damage/collision footprint
* obscures player or urgent threats
* bakes a combat scene, background, or unrelated ground plane
* merges detached projectiles into character bases
* merges tunable telegraphs, trails, impacts, or major VFX
* uses excessive permanent trails, particles, or false hitbox effects
* resembles pickups, props, hazards, characters, or UI
* uses realistic, painterly, or illustration-level detail
* fails at mobile scale or combat density
* uses stereotypes or changes meaning through city skins
* makes night variants excessively luminous
* prioritizes spectacle over gameplay clarity
* includes HUD, health bars, numbers, text, or logos
* contradicts the Art Bible, Prompt Bible hierarchy, or Technical Asset Contract

### 7.10 VFX Prompt Module

#### Purpose, Scope & Inheritance

This module governs reusable production prompts for standalone and supporting
world-space VFX: attack telegraph and activation effects, trails, impacts,
persistent areas, player states, enemy spawn/defeat, pickup collection, hazard
support, city/day/night variants, Reduced and Essential-Only variants, and
restrained ambient world effects.

It excludes base character sprites, attack/projectile bodies, weapons, hazards,
pickups, props, roads, complete lighting systems, global shadow/lighting
overlays, UI/HUD, text, labels, numbers, bars, frames, logos, scenes,
backgrounds, unrelated ground planes, and cinematics.

The Attacks & Projectiles module continues to own attack/projectile bodies,
ownership, direction, footprints, and functional telegraph requirements. The
Lighting & Shadow Overlays module owns full lighting systems, global
shadow treatments, and large-scale environmental lighting overlays.

Every VFX prompt inherits the Art Bible, global Prompt Bible rules, gameplay
hierarchy, Style & Shape, Colour & Contrast, Animation, accessibility, modular
asset, City-Skin and Day/Night rules, metadata/versioning, reference protocol,
and the Technical Asset Contract.

#### Primary Principle

**VFX reinforces gameplay information; it must never create, replace or
contradict the underlying gameplay information.**

Critical meaning must remain understandable through underlying silhouette,
pose, movement, footprint, boundary, timing, direction, animation state, and
gameplay behaviour when optional or reduced VFX is disabled.

VFX may reinforce timing, direction, impact, area, state, ownership, threat,
importance, completion, persistence, and expiration. Spectacle remains
secondary.

#### Frozen Visual Hierarchy

```text
Critical Danger
→ Major Attacks
→ Routine Attacks and Impacts
→ Player State
→ Rewards and Collections
→ Ambient Effects
```

Critical telegraphs receive highest immediate urgency. Urgent enemy attacks
remain visible through player spectacle. Major attacks may exceed routine
effects; normal hit/collection effects remain compact; player effects preserve
player silhouette and position; rewards remain below active danger; ambient
effects use the lowest contrast and density.

Lower-priority VFX may be shortened, simplified, suppressed, or culled. The
player remains the highest-priority persistent asset, while critical danger may
temporarily demand stronger attention. Never hide player position/facing,
immediate enemies, danger footprints, attack origins, or safe/danger boundaries.

#### Frozen Modular Hierarchy

```text
Base VFX
→ Gameplay Function
→ Intensity Tier
→ City Skin
→ State/Timing
→ Optional Secondary Layer
```

Every stage preserves function, ownership, timing, footprint, danger/state
meaning, category recognition, and mobile readability. Optional particles,
sparks, fragments, edge accents, finishing bursts, restrained trails, and
secondary motion remain removable or adjustable where practical.

#### Standard Construction

```text
Core Functional Shape
→ Optional Secondary Particles
→ Optional Finishing Accent
```

The core communicates essential information. Secondary layers cannot be
required to understand footprint, direction, ownership, activation, danger,
expiration, or state.

Keep layers separate where this improves performance tuning, density,
accessibility, colour adjustment, city skinning, timing, or procedural reuse.

#### Ownership & Danger Grammar

Friendly, hostile, and neutral effects differ through multiple cues: shape,
direction, motion, timing, boundary, origin, density, scale, and restrained
colour. Colour is never the sole cue.

Enemy-danger VFX is urgent, bounded, directional, honestly timed, and
threatening without chaos. Player-supporting VFX is responsive, controlled,
satisfying, friendly, and subordinate to urgent danger. Neutral, reward, and
ambient effects cannot resemble threats.

#### Effect Lifecycle

```text
Anticipation
→ Activation
→ Peak
→ Decay
→ Optional Persistence
→ Expiration
```

Not every phase is required. Every output identifies its phase/treatment.
Anticipation communicates timing, direction, footprint, origin, and escalation
where relevant. Activation marks relevance. Peak provides controlled maximum
emphasis. Decay reduces energy without implying continued danger. Persistence
maintains boundaries and controlled interior motion. Expiration clearly ends
danger or relevance.

#### Telegraph VFX

Telegraphs are honest, stable, readable, independently tunable, modular,
multi-cue, and accessible. They accurately communicate footprint, direction,
timing, activation, persistence, cancellation, and escalation where relevant.

Reject damaging-looking decorative overshoot, undersized warning boundaries,
harmless-looking danger areas, invisible extensions, colour-only cues, and
unstable safe/danger boundaries. Telegraphs remain readable in Reduced and
Essential-Only modes.

#### Impact, Persistent & Area VFX

Routine impacts are brief, directional where relevant, proportional,
mobile-readable, crowd-safe, and quick to decay. Scale intensity through
controlled size, force, shape richness, particle count, duration, brightness,
and external audio/haptic importance. Normal hits cannot use oversized
explosions or red-only meaning.

Persistent areas use:

```text
Readable Boundary
+ Controlled Interior Motion
```

Boundaries remain readable under overlap, different roads, day/night,
Reduced-VFX, subtle interiors, and dense combat. Interior motion cannot obscure
the boundary, player, ownership, or other urgent danger. Visual and gameplay
footprints remain aligned.

#### Particle & Motion Rules

Use controlled particles only to improve direction, impact, state, material,
movement, completion, persistence, or importance. Keep counts limited, avoid
road-wide noise and silhouette coverage, decay quickly unless persistence is
functional, scale for density, support reduced-particle variants, and separate
particles from the core where practical.

VFX motion follows:

```text
Crisp Onset
→ Readable Peak
→ Controlled Decay
```

Use bounded directional flow, short reusable animation, controlled secondary
motion, and stable functional shapes. Avoid constant exaggeration, uncontrolled
loops, ornamental timing noise, excessive squash/stretch, footprint drift, and
persistent high-frequency noise.

#### Player, Reward, Enemy & Hazard Support

Player-supporting VFX may reinforce hit, protection, progression, movement,
collection, defeat, or temporary states while preserving sprite, facing,
hitbox, anchors, and reduced-VFX compatibility. Never hide/replace the player,
surround them permanently, enlarge hitbox perception, use colour alone, or add
routine explosions.

Reward/collection VFX remains brief, crisp, positive, non-hostile, subordinate
to danger, and non-obscuring. Major rewards may use controlled anticipation and
moderately richer accents, but cannot resemble impacts, telegraphs, projectiles,
or hazards.

Enemy spawn/defeat VFX remains brief, scalable, crowd-readable, non-cinematic,
modular, and restrained. Elite/boss variants may be stronger but cannot obscure
threats, positions, footprints, or become scenes.

Hazard-supporting VFX may reinforce activation, danger, persistence, escalation,
deactivation, or material behaviour. The hazard retains its own boundary,
footprint, recognition, and state. Effects remain separate and cannot be
required to understand the hazard.

#### City Skins & Day/Night

City skins may modify small particle motifs, minor material impressions, subtle
edge texture/pattern, abstract accents, and limited secondary colour. They
preserve function, ownership, danger, timing, footprint, intensity, state,
accessibility, and category.

Reject stereotypes, landmarks, decorative cultural-object drift, changed
meaning, colour-only recognition, excess detail, and reduced reuse.

Day and night use the same base grammar. Night may adjust local contrast,
restrained brightness, edge support, and internal visibility while preserving
ownership, danger, timing, footprint, intensity, and fairness. Avoid excessive
glow/bloom, light pools, larger night effects, ownership-colour changes,
white-outs, and road-dominating effects.

#### Accessibility Modes

Support:

```text
Full VFX
→ functional core + controlled secondary layers

Reduced VFX
→ reduced particles, flashes, secondary motion, trails, persistence detail,
  fragments, and finishing accents

Essential-Only VFX
→ critical telegraph boundaries, activation, dangerous persistence, essential
  player-state feedback, clear expiration, and necessary impact confirmation
```

Gameplay remains understandable without decoration. Also support reduced
flashes, repetitive/persistent motion, screen-shake dependency, colour-safe
recognition, and multi-cue communication.

#### Flash, Complexity & Density

Routine gameplay avoids rapid full-screen flashes, repeated strobing,
white-outs, prolonged pulses, uncontrolled alternating flashes, and repeated
viewport coverage. Control intensity, duration, area, repetition, and contrast.
Critical feedback cannot depend only on flashing.

Routine/common effects are simplest; important attacks/states moderately
richer; major attacks/elites/bosses stronger but controlled; rewards positive
but below danger; ambient effects lowest in contrast, density, and motion.
Colour swaps alone cannot define intensity.

Scale intensity through size, shape richness, duration, motion, removable layer
count, particle density, restrained brightness, and external audio/haptic
importance.

During crowded combat use priority rendering, suppression, density limits,
short lifetimes, bounded effects, particle caps, simplified routine impacts,
reduced persistent noise, and protected critical boundaries. Lower effects may
be shortened, reduced, hidden, or culled. Critical danger, player visibility,
and footprints survive overlap.

#### Category Differentiation & Negatives

VFX must not resemble pickups/rewards, characters, projectiles, attack bodies,
props, passive road overlays, interactive objects, HUD icons, World-space UI,
badges, health bars, labels, damage numbers, text, or logos.

Avoid collectible objects, faces/limbs, prop material detail, interface framing,
persistent projectile objects when only a trail is intended, hazard-like
decorative ground forms, harmless effects with danger boundaries, dangerous
effects without boundaries, and effects merged into unrelated assets.

#### Isolation & Technical Output

VFX references must be isolated, transparent-background, tightly bounded,
consistently scaled/oriented/framed, camera-compatible, and mobile-readable.
Include no background, scene, unrelated character, attack, projectile, prop,
UI, text, or logo.

Separate outputs where required for functional core, lifecycle phase, particle
layer, finishing accent, trail, impact, boundary, persistent interior, city,
day/night, intensity, Reduced, Essential-Only, and animation-frame reference.

Dimensions, alpha, padding, pivots, anchors, naming, metadata, export,
transformations, animation, and runtime effect support inherit from the
Technical Asset Contract. Do not hardcode conflicting assumptions.

#### Reusable VFX Prompt Templates

Each template inherits Global Rules, this module, applicable City-Skin and
Day/Night modules, and the Technical Asset Contract.

##### Template 1: Attack Anticipation or Telegraph VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: [TELEGRAPH_VFX_PURPOSE]
Gameplay Role/Ownership/Function: [FRIENDLY / HOSTILE / NEUTRAL]; telegraph
Intensity/Phase: [INTENSITY_TIER]; Anticipation
Direction/Footprint/Timing: [DIRECTION / HONEST_FOOTPRINT / ACTIVATION_TIMING]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Stable multi-cue flat-cartoon boundary and escalation
Technical Output: Isolated functional core and separable layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No colour-only warning, unstable/false boundary, hidden
origin, decorative overshoot, UI, text, scene, or permanently merged owner
Review Criteria: Footprint, direction, timing, ownership, Reduced/Essential
readability, modularity, and contract compliance are clear
```

##### Template 2: Attack Activation VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: [ACTIVATION_VFX_PURPOSE]
Gameplay Role/Ownership/Function: [OWNERSHIP]; attack activation
Intensity/Phase: [INTENSITY_TIER]; Activation
Direction/Footprint/Timing: [ORIGIN / DIRECTION / FOOTPRINT / START_TIMING]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Crisp onset, readable active moment, bounded emphasis
Technical Output: Isolated activation layer; [CONTRACT_REQUIREMENTS]
Negative Constraints: No replacement of attack body, false footprint, hidden
origin, uncontrolled flash, UI, text, scene, or permanent secondary noise
Review Criteria: Activation, ownership, origin, timing, footprint, density,
accessibility modes, and contract compliance are clear
```

##### Template 3: Reusable Projectile Trail

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: Reusable trail for [PROJECTILE_REFERENCE]
Gameplay Role/Ownership/Function: [OWNERSHIP]; reinforce travel direction/speed
Intensity/Phase: [INTENSITY_TIER]; [ACTIVE / TRAVEL / DECAY]
Direction/Footprint/Timing: [DIRECTION / PROJECTILE_BOUNDS / TRAIL_LENGTH / DURATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Brief restrained directional trail, separate from projectile body
Technical Output: Isolated modular trail; [CONTRACT_REQUIREMENTS]
Negative Constraints: No persistent projectile-like object, false hitbox width,
permanent long trail, pickup/UI form, text, scene, or merged projectile
Review Criteria: Ownership, direction, speed support, honest bounds, Reduced mode,
reuse, and technical compatibility are clear
```

##### Template 4: Impact or Hit VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: [IMPACT_OR_HIT_PURPOSE]
Gameplay Role/Ownership/Function: [OWNERSHIP]; confirm [GAMEPLAY_CONSEQUENCE]
Intensity/Phase: [ROUTINE / IMPORTANT / MAJOR]; [PEAK / DECAY]
Direction/Footprint/Timing: [FORCE_DIRECTION / CONTACT_AREA / DURATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Brief proportional mobile-readable impact with controlled particles
Technical Output: Isolated core, particles, and accent as separable outputs;
[CONTRACT_REQUIREMENTS]
Negative Constraints: No red-only meaning, routine explosion, hidden gameplay,
strobe/bloom, character/projectile/UI form, scene, text, or persistent debris
Review Criteria: Contact, force, consequence, ownership, crowd decay,
accessibility, modularity, and contract compliance are clear
```

##### Template 5: Persistent Area-Effect VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: [PERSISTENT_AREA_VFX_PURPOSE]
Gameplay Role/Ownership/Function: [OWNERSHIP]; reinforce [PERSISTENT_FUNCTION]
Intensity/Phase: [INTENSITY_TIER]; [ACTIVATION / PERSISTENCE / EXPIRATION]
Direction/Footprint/Timing: [ORIGIN / HONEST_BOUNDARY / DURATION / END]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Readable boundary plus controlled interior motion
Technical Output: Separate boundary/interior/lifecycle outputs; [CONTRACT_REQUIREMENTS]
Negative Constraints: No replaced underlying attack/hazard, unstable boundary,
false area, obscured player, decorative ground patch, UI, scene, or colour-only state
Review Criteria: Ownership, area, persistence, expiration, overlap, Reduced/
Essential readability, modularity, and contract compliance are clear
```

##### Template 6: Player-State Supporting VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: Support player state [PLAYER_STATE]
Gameplay Role/Ownership/Function: Friendly; reinforce [STATE_INFORMATION]
Intensity/Phase: [INTENSITY_TIER]; [LIFECYCLE_PHASE]
Direction/Footprint/Timing: Preserve player facing, anchors, hitbox, and [TIMING]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Restrained localized player-supporting flat-cartoon effect
Technical Output: Isolated separable layer; [CONTRACT_REQUIREMENTS]
Negative Constraints: No hidden/replaced player, enlarged hitbox, hostile cue,
colour-only meaning, permanent noise, routine explosion, UI, text, or scene
Review Criteria: State, player position/facing, identity, Reduced/Essential
readability, modularity, and technical compliance are clear
```

##### Template 7: Enemy Spawn VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: Spawn VFX for [ENEMY_TIER_OR_REFERENCE]
Gameplay Role/Ownership/Function: Hostile; communicate arrival position/timing
Intensity/Phase: [STANDARD / ELITE / BOSS]; [ANTICIPATION / ACTIVATION / DECAY]
Direction/Footprint/Timing: [SPAWN_LOCATION / HONEST_CUE_AREA / TIMING]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Brief scalable non-cinematic arrival cue
Technical Output: Isolated modular spawn layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No hidden enemy position, pickup/reward/player-attack cue,
danger-area confusion, prolonged noise, scene, UI, text, or cinematic background
Review Criteria: Threat tier, position, timing, ownership, crowd readability,
accessibility modes, modularity, and contract compliance are clear
```

##### Template 8: Enemy Defeat VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: Defeat VFX for [ENEMY_TIER_OR_REFERENCE]
Gameplay Role/Ownership/Function: Hostile removal confirmation
Intensity/Phase: [STANDARD / ELITE / BOSS]; [PEAK / DECAY / EXPIRATION]
Direction/Footprint/Timing: [DEFEAT_POSITION / BOUNDS / CLEANUP_DURATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Brief modular crowd-safe defeat accent
Technical Output: Isolated separable defeat layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No obscured threats, persistent remains/noise, unclear
danger footprint, cinematic scene, pickup cue, UI, text, or excessive particles
Review Criteria: Removal, tier, position, decay, density, Reduced mode,
modularity, and technical compatibility are clear
```

##### Template 9: Pickup or Reward Collection VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: Collection VFX for [PICKUP_OR_REWARD_REFERENCE]
Gameplay Role/Ownership/Function: Neutral/friendly; confirm collection/value
Intensity/Phase: [COMMON / RARE / MAJOR]; [ACTIVATION / PEAK / DECAY]
Direction/Footprint/Timing: [COLLECTION_ORIGIN / COMPACT_BOUNDS / DURATION]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Brief crisp positive non-hostile effect below active danger
Technical Output: Isolated core and optional accents; [CONTRACT_REQUIREMENTS]
Negative Constraints: No enemy impact, telegraph, projectile, hazard, obscured
gameplay, oversized celebration, UI frame, text, scene, or colour-only value
Review Criteria: Collection, value, friendly ownership, danger subordination,
Reduced mode, modularity, and contract compliance are clear
```

##### Template 10: Hazard-Supporting VFX

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: Support [HAZARD_REFERENCE] state [HAZARD_STATE]
Gameplay Role/Ownership/Function: Hostile/neutral; reinforce hazard information
Intensity/Phase: [INTENSITY_TIER]; [ACTIVATION / PERSISTENCE / ESCALATION / END]
Direction/Footprint/Timing: Preserve hazard boundary, footprint, and [TIMING]
City Skin/Day-Night: [CITY_SKIN]; [DAY / NIGHT / UNIVERSAL]
Style: Separate controlled material/state reinforcement
Technical Output: Isolated independently tunable layer; [CONTRACT_REQUIREMENTS]
Negative Constraints: No replacement of hazard, VFX-only recognition, false
boundary, hidden player, pickup/UI cue, scene, text, or permanent merge
Review Criteria: Hazard state, boundary, timing, ownership, Reduced/Essential
readability, separation, and contract compliance are clear
```

##### Template 11: City-Skinned or Day/Night VFX Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: [CITY_SKIN / DAY_NIGHT] variant of [BASE_VFX]
Gameplay Role/Ownership/Function: Preserve [BASE_OWNERSHIP_AND_FUNCTION]
Intensity/Phase: Preserve [INTENSITY_TIER_AND_PHASE]
Direction/Footprint/Timing: Preserve [BASE_DIRECTION_FOOTPRINT_TIMING]
City Skin/Day-Night: [RESTRAINED_CITY_CUES]; [DAY / NIGHT]
Style: Same core VFX grammar with controlled readability adaptation
Technical Output: Isolated variant/layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No changed meaning/ownership/intensity, stereotype,
landmark, colour-only cue, excessive night glow, scene, UI, text, or reduced reuse
Review Criteria: Function remains recognizable across city/night, density,
accessibility modes, modularity, and technical contexts
```

##### Template 12: Reduced-VFX or Essential-Only Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / TECHNICAL_CONTRACT_VERSION]
Asset Purpose: [REDUCED_VFX / ESSENTIAL_ONLY] variant of [BASE_VFX]
Gameplay Role/Ownership/Function: Preserve [OWNERSHIP_AND_ESSENTIAL_FUNCTION]
Intensity/Phase: Preserve required [INTENSITY_TIER_AND_PHASE]
Direction/Footprint/Timing: Preserve [ESSENTIAL_DIRECTION_FOOTPRINT_TIMING]
City Skin/Day-Night: Preserve approved [CITY_SKIN_AND_TIME]
Style: Retain functional core; reduce/remove [NONESSENTIAL_LAYERS]
Technical Output: Separate optimized accessibility variant; [CONTRACT_REQUIREMENTS]
Negative Constraints: No removed critical boundary/activation/expiration/state,
changed timing, colour-only replacement, decorative residue, scene, UI, or text
Review Criteria: Essential meaning, ownership, timing, footprint, player/danger
visibility, density, accessibility, and contract compliance remain clear
```

#### Acceptance Criteria

Accept VFX only when it:

1. Reinforces rather than replaces gameplay information.
2. Reads at mobile scale and preserves player/urgent danger.
3. Honestly communicates timing and footprint.
4. Distinguishes friendly, hostile, and neutral ownership through multiple cues.
5. Preserves meaning across city/day/night variants.
6. Is modular and independently tunable.
7. Supports crowded combat and Full, Reduced, and Essential-Only modes.
8. Keeps essential information without decorative layers.
9. Uses controlled particles and flashes.
10. Follows the clean flat-cartoon system.
11. Is procedurally reusable.
12. Complies with the Technical Asset Contract.

#### Rejection Criteria

Reject or redesign VFX that:

* creates/replaces critical meaning or depends on colour alone
* obscures player, urgent danger, origins, or footprints
* uses misleading telegraph boundaries
* uses excessive particles, loops, glow, bloom, strobes, or full-screen flashes
* fails Reduced/Essential modes or combat density
* resembles pickups, characters, projectiles, hazards, props, or UI
* bakes scenes, backgrounds, or unrelated ground planes
* permanently merges layers requiring independent tuning
* uses realistic, painterly, or illustration-level detail
* prioritizes spectacle over communication
* uses stereotypes, changes city meaning, or becomes excessively luminous at night
* includes HUD, bars, numbers, labels, text, or logos
* contradicts the Art Bible, Prompt Bible hierarchy, or Technical Asset Contract

### 7.11 Lighting & Shadow Overlays Prompt Module

#### Purpose, Scope & Inheritance

This module governs modular lighting and shadow prompts for contact and cast
shadows, player/enemy/environment/projectile shadows, directional and ambient
light, practical lights and restrained pools, day/night and city variants,
temporary gameplay-state lighting, atmospheric visibility treatments,
exceptional major-event references, and optional masks/falloff/animation
references.

It excludes base assets, attack/projectile bodies, hazards, pickups, props,
roads, complete VFX/particle/trail/impact systems, attack ownership and
telegraph footprints, UI/HUD, text, labels, numbers, logos, scenes, backgrounds,
final colour-grading pipelines, cinematics, and gameplay weather logic.

The VFX module continues to own particles, bursts, trails, impacts, status
effects, lifecycles, and effect-density systems. The Attacks & Projectiles module
continues to own bodies, ownership, direction, collision perception, and
functional telegraph footprints. Lighting may support but never redefine them.

Every prompt inherits the Art Bible, global Prompt Bible rules, gameplay
hierarchy, accessibility, modular production, camera, flat-cartoon style,
City-Skin/Day-Night rules, metadata/versioning, and Technical Asset Contract.

#### Frozen Primary Principle

**Lighting and shadows support readability, grounding and atmosphere; they must
never create, replace, obscure or contradict gameplay information.**

Gameplay meaning remains understandable without decorative lighting. Lighting
may reinforce grounding, height, direction, source, time, state, importance,
atmosphere, and city identity. It cannot alter ownership, danger, attack
footprint, safe/danger boundaries, rarity, perceived hitbox, player position or
facing, or category recognition.

#### Frozen Hierarchy & Road-Centre Protection

```text
Gameplay Readability
→ Danger and State Communication
→ Spatial Grounding
→ City Identity
→ Atmosphere
→ Beauty
```

Critical danger and urgent telegraphs remain dominant. The player remains the
highest-priority persistent object. Lighting cannot hide player, enemies,
projectiles, origins, or dangerous boundaries. Reward/ambient lighting remains
below danger, environmental lighting stays restrained, and the road centre
cannot become fragmented.

**The playable road centre stays calm, stable and readable; stronger
environmental lighting belongs primarily near the left and right edge zones.**

The centre remains evenly readable, low-noise, visually stable day/night, and
crowd-safe. Edge lighting may be moderately stronger but cannot form false
lanes, hazards, objectives, or interaction zones.

#### Frozen Modular Hierarchy

```text
Base Lighting Grammar
→ Overlay Type
→ Source/Direction
→ City Skin
→ Time of Day
→ Gameplay State
→ Intensity Variant
```

Every stage preserves readability, light direction, categories, perceived
hitboxes, ownership/danger meaning, road clarity, camera, and procedural reuse.

#### Modular Production

Lighting remains predominantly modular and independently tunable.

```text
Source Asset
→ Light Overlay
→ Optional Glow or VFX
→ Surface Response
```

Keep final lighting separate from base assets when this improves placement,
day/night reuse, accessibility, tuning, performance, city skinning, animation,
state changes, or overlap control. Never generate complete illuminated scenes as
production assets.

#### Lighting Style & Direction Families

Use soft stylized broad shapes, restrained brightness, controlled falloff,
minimal detail, flat-cartoon compatibility, consistent direction, and
mobile-scale readability.

Avoid photorealism, cinematic/painterly illumination, bloom, muddy gradients,
high-frequency light texture, and dramatic clarity loss.

Use standardized light/shadow-direction families. Assets assembled under one
setup cannot conflict. Every relevant prompt declares source direction, shadow
direction, softness, intensity, day/night context, and static/state-driven use.

Construct for the high bird’s-eye, slight three-quarter top-down camera with
consistent scale, anchors, and procedural placement. Avoid side-view shadows,
universal overhead circles, and uncontrolled angles.

#### Contact & Cast Shadows

Contact shadows are the primary grounding cue. They remain compact, close to the
footprint, low-opacity, surface-clarifying, camera-compatible, hitbox-neutral,
non-hazard-like, and separable where placement/animation requires.

Cast shadows broadly match object position, scale, height, source direction,
perspective, and the selected shadow family. Controlled stylization is allowed.
Reject impossible direction, misleading scale/footprint, detached shadows,
dramatic length, detailed realistic silhouettes, and gameplay obstruction.

#### Asset-Category Shadow Rules

**Player shadows** ground the player while preserving silhouette, facing,
movement, hitbox perception, identity anchors, animation stability, and
day/night reuse. They remain below the player and cannot resemble danger.

**Enemy shadows** use simplified archetype-consistent footprint families and may
reinforce mass, height, airborne state, and boss scale. Controlled standard,
fast, tank, ranged, support, elite, and boss differences are allowed. Avoid
unique illustrations, complexity, dark crowd masses, colour-only archetypes, and
merged false danger areas.

**Prop/frontage shadows** remain quiet, edge-zone biased, subordinate, modular,
directionally consistent, and restrained from the road centre. Architectural
shadows may be broader but stay simple and procedural.

**Projectile/airborne shadows** are optional and used only for height,
trajectory, landing clarity, road separation, or spatial relation. They cannot
change perceived collision, resemble pickups/hazards or a second projectile, or
mislead speed/direction.

#### Practical, Local & Environmental Lighting

Practical sources remain brief variables in the asset brief, visible/plausible,
modular, edge-biased, road-centre safe, below danger, and restrained across
time. Avoid light with no origin.

Local pools use restrained scale/falloff, read as illumination rather than
gameplay, avoid sharp dangerous boundaries, pickup/objective resemblance,
routine permanent halos, and hitbox changes. Permanent pools are not the
default night solution.

#### Day/Night & City Skins

Day/night uses the same structure. Night may adjust local contrast, shadow
opacity, edge support, practical visibility, restrained brightness, ambient
temperature, and limited response while preserving ownership, danger, rarity,
category, player visibility, hitbox, attack footprint, road centre, and fairness.

**Night changes atmosphere, not gameplay difficulty.**

Avoid glow/bloom, white-outs, saturated pools, larger night variants, meaning-
changing recolour, and reduced readability.

City skins may vary practical-source type, ambient temperature, subtle material
response, restrained atmosphere, edge patterns, limited texture, and abstract
accents. They preserve global grammar, direction, road readability, gameplay
colour/ownership/danger, categories, accessibility, and reuse. Reject
stereotypes, landmark-shaped light, cultural scenes, changed meaning,
colour-only cues, complexity, and per-city redesign.

#### Atmospheric & Dynamic Overlays

Restrained lighting-related haze, dust, mist, humidity, rain response, or
visibility variation remains sparse, modular, low-contrast, independently
tunable, preferably edge-biased, reduced-VFX compatible, accessible, and clear
of urgent information. This module does not own weather behaviour.

Atmosphere cannot obscure player, danger boundaries, projectiles, enemy
recognition, or create road-wide noise, and cannot be mandatory for city
identity.

Brief dynamic overlays may support approved boss phases, major rewards,
protection, major impacts, or critical escalation. They remain proportional,
modular, adjustable, reduced-flash compatible, non-obscuring, and cannot recolour
ownership/danger. Routine actions cannot trigger global lighting changes.

Full-screen references are exceptional, brief, low-noise, accessible,
non-obscuring, adjustable, and subordinate to gameplay. Avoid rapid flashes,
pulses, white-outs, prolonged darkness, strobe colours, and hidden danger/player.

#### Accessibility, Density & Baked Shading

Support reduced flashes/VFX/atmosphere/repetitive lighting, brightness
adjustment, contrast safety, colour safety, and multi-cue communication.
Gameplay cannot depend only on brightness, flashing, temperature, saturation,
animated light, or shadow presence. Nonessential lighting remains reducible.

During crowds/procedural assembly use controlled opacity, bounded overlays,
simplified shadows, overlap limits, intensity caps, low-priority suppression,
edge restraint, density-based complexity reduction, and protected danger/player
visibility. Lower lighting may be dimmed, simplified, shortened, suppressed, or
culled.

Avoid stacked false-hazard shadows, objective-like overlapping pools, dark
masses, road-wide noise, additive glow, and lighting that drowns attacks.

Use minimal stylized grounding only. Avoid realistic ambient occlusion, dirty
edges, heavy baked shading, multilayer realism, crevice shadows, detailed
surface light, and shading inconsistent with flat fills plus one shade. Baked
shading cannot block skins, day/night, direction changes, animation, or modular
attachments.

#### Category Differentiation & Negatives

Lighting/shadows must not resemble hazards, telegraphs, attack footprints,
projectiles, pickups/rewards, characters, props, interactive objects, UI/HUD,
frames, objectives, or health bars.

Reject dangerous-boundary pools, hazard-shaped shadows, collectible circles,
objective beacons, interface framing, false hitbox enlargement,
ownership-changing light, hidden safe/danger boundaries, routine glow circles,
separate-object shadows, text, labels, symbols, and logos.

#### Isolation & Technical Output

References must be isolated, transparent where applicable, tightly bounded,
consistently scaled/oriented/framed, camera/procedural compatible, and
mobile-readable. Include no scenes, backgrounds, unrelated assets, UI, text, or
logos.

Use separate outputs for contact/cast shadows, directional/ambient/practical
light, local pools, day/night, city/state/atmosphere, masks, falloff, intensity,
and animation references as required.

Dimensions, alpha, padding, pivots, anchors, blending guidance, naming, metadata,
export, and runtime capabilities inherit from the Technical Asset Contract.

#### Reusable Lighting & Shadow Prompt Templates

Each template inherits Global Rules, this module, applicable City-Skin and
Day/Night modules, and the Technical Asset Contract.

##### Template 1: Generic Contact Shadow

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Contact grounding for [SOURCE_ASSET]; subordinate
Overlay Type/Source: Contact shadow; [SOURCE_ASSET]
Direction/Softness/Opacity: [LIGHT_DIRECTION / SHADOW_DIRECTION / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [INTENSITY / FALLOFF / COMPACT_FOOTPRINT]
City/Time/State: [CITY_SKIN / DAY_NIGHT / STATIC_OR_STATE]
Camera/Style: High bird's-eye flat-cartoon grounding
Technical Output: Isolated shadow; [CONTRACT_REQUIREMENTS]
Negative Constraints: No hazard shape, false hitbox, detached source, realistic
AO, scene, UI, text, or baked base asset
Acceptance Criteria: Grounding, direction, footprint, restraint, modularity, and
technical compliance are clear
```

##### Template 2: Player Contact or Cast Shadow

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Ground Tier 1 player without reducing identity
Overlay Type/Source: [CONTACT / CAST] shadow; [PLAYER_REFERENCE]
Direction/Softness/Opacity: [LIGHT_DIRECTION / SHADOW_DIRECTION / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [INTENSITY / FALLOFF / HITBOX_NEUTRAL_FOOTPRINT]
City/Time/State: [CITY_SKIN / DAY_NIGHT / PLAYER_STATE]
Camera/Style: Preserve facing, movement, anchors, and bird's-eye perspective
Technical Output: Isolated separable shadow; [CONTRACT_REQUIREMENTS]
Negative Constraints: No obscured player, enlarged hitbox, hazard cue, dark
dominance, scene, UI, text, or permanent sprite bake
Acceptance Criteria: Player grounding, identity, movement, fairness,
accessibility, reuse, and contract compliance are clear
```

##### Template 3: Enemy Archetype Shadow

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Ground Tier 2 [ENEMY_ARCHETYPE]
Overlay Type/Source: [CONTACT / CAST / AIRBORNE] shadow; [ENEMY_REFERENCE]
Direction/Softness/Opacity: [LIGHT_DIRECTION / SHADOW_DIRECTION / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [INTENSITY / FALLOFF / ARCHETYPE_FOOTPRINT]
City/Time/State: [CITY_SKIN / DAY_NIGHT / ENEMY_STATE]
Camera/Style: Simplified archetype-consistent bird's-eye shadow family
Technical Output: Isolated reusable shadow; [CONTRACT_REQUIREMENTS]
Negative Constraints: No decorative illustration, crowd mass, false danger,
colour-only archetype, detached source, scene, UI, text, or hitbox change
Acceptance Criteria: Mass/state/archetype support, direction, crowd safety,
modularity, and contract compliance are clear
```

##### Template 4: Environmental Prop or Frontage Cast Shadow

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Quiet edge grounding for [PROP_OR_FRONTAGE]
Overlay Type/Source: Cast shadow; [SOURCE_REFERENCE]
Direction/Softness/Opacity: [LIGHT_DIRECTION / SHADOW_DIRECTION / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [INTENSITY / FALLOFF / EDGE_SAFE_FOOTPRINT]
City/Time/State: [CITY_SKIN / DAY_NIGHT / STATIC_OR_STATE]
Camera/Style: Simple modular edge-zone bird's-eye shadow
Technical Output: Isolated separable shadow; [CONTRACT_REQUIREMENTS]
Negative Constraints: No road-centre intrusion, hazard shape, realistic detail,
handcrafted neighbours, scene, UI, text, or baked source
Acceptance Criteria: Direction, restraint, edge placement, procedural safety,
city/time compatibility, and contract compliance are clear
```

##### Template 5: Projectile or Airborne-Object Shadow

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Clarify [HEIGHT / TRAJECTORY / LANDING / SEPARATION]
Overlay Type/Source: Airborne shadow; [PROJECTILE_OR_OBJECT_REFERENCE]
Direction/Softness/Opacity: [LIGHT_DIRECTION / SHADOW_DIRECTION / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [INTENSITY / FALLOFF / COLLISION_HONEST_FOOTPRINT]
City/Time/State: [CITY_SKIN / DAY_NIGHT / TRAVEL_STATE]
Camera/Style: Bird's-eye spatial cue, subordinate to object/attack
Technical Output: Isolated optional shadow; [CONTRACT_REQUIREMENTS]
Negative Constraints: No second projectile, pickup/hazard form, false speed/
direction/hitbox, scene, UI, text, or unnecessary shadow
Acceptance Criteria: Height/trajectory benefit, footprint honesty, ownership,
modularity, and technical feasibility are clear
```

##### Template 6: Directional Environmental-Light Overlay

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Restrained environmental illumination for [PLACEMENT]
Overlay Type/Source: Directional light; [SOURCE_REFERENCE]
Direction/Softness/Opacity: [LIGHT_DIRECTION / RESPONSE_DIRECTION / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [INTENSITY / FALLOFF / EDGE_BIASED_FOOTPRINT]
City/Time/State: [CITY_SKIN / DAY_NIGHT / STATIC_OR_STATE]
Camera/Style: Broad soft flat-cartoon overlay; road centre protected
Technical Output: Isolated overlay/mask/falloff; [CONTRACT_REQUIREMENTS]
Negative Constraints: No false lane/hazard/objective, road fragmentation,
cinematic realism, bloom, scene, UI, text, or conflicting direction
Acceptance Criteria: Source, direction, road safety, atmosphere, procedural use,
accessibility, and contract compliance are clear
```

##### Template 7: Local Practical-Light Overlay

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Local illumination from [PRACTICAL_SOURCE]
Overlay Type/Source: Practical light; [SOURCE_REFERENCE]
Direction/Softness/Opacity: [LIGHT_DIRECTION / RESPONSE_DIRECTION / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [RESTRAINED_INTENSITY / FALLOFF / LOCAL_FOOTPRINT]
City/Time/State: [CITY_SKIN / DAY_NIGHT / STATIC_OR_STATE]
Camera/Style: Plausible sourced edge-biased flat-cartoon light
Technical Output: Separate source-compatible overlay; [CONTRACT_REQUIREMENTS]
Negative Constraints: No source-less glow, road-wide pool, pickup/objective/
hazard boundary, hitbox change, permanent routine halo, scene, UI, or text
Acceptance Criteria: Source plausibility, locality, hierarchy, road safety,
modularity, day/night/accessibility, and contract compliance are clear
```

##### Template 8: Day-to-Night Lighting Treatment

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Controlled [DAY_TO_NIGHT_STATE] readability treatment
Overlay Type/Source: Time-of-day overlay; [BASE_LIGHTING_GRAMMAR]
Direction/Softness/Opacity: Preserve [LIGHT_AND_SHADOW_DIRECTION_FAMILY]
Intensity/Falloff/Footprint: [NIGHT_INTENSITY / FALLOFF / ROAD_SAFE_FOOTPRINT]
City/Time/State: [CITY_SKIN / DAY_OR_NIGHT / GAMEPLAY_STATE]
Camera/Style: Same structure; controlled mood adaptation
Technical Output: Isolated palette/overlay references; [CONTRACT_REQUIREMENTS]
Negative Constraints: No redesign, harder night, ownership recolour, excessive
glow/pool, road-centre instability, scene, UI, text, or changed hitbox
Acceptance Criteria: Fairness, player/danger visibility, direction, road centre,
reuse, accessibility, and contract compliance are clear
```

##### Template 9: City-Skinned Lighting Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: [CITY_SKIN] variant of [BASE_LIGHTING_REFERENCE]
Overlay Type/Source: Preserve [OVERLAY_TYPE_AND_SOURCE]
Direction/Softness/Opacity: Preserve [DIRECTION_FAMILY]; [SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: Preserve [INTENSITY / FALLOFF / FOOTPRINT]
City/Time/State: [RESTRAINED_CITY_CUES / DAY_NIGHT / GAMEPLAY_STATE]
Camera/Style: Shared grammar with secondary city flavour
Technical Output: Isolated reusable variant; [CONTRACT_REQUIREMENTS]
Negative Constraints: No stereotype, landmark light, cultural scene, changed
meaning/direction, colour-only identity, complexity, UI, text, or per-city redesign
Acceptance Criteria: City flavour preserves grammar, gameplay, accessibility,
procedural reuse, and contract compliance
```

##### Template 10: Temporary Gameplay-State Lighting Overlay

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Reinforce approved major state [GAMEPLAY_STATE]
Overlay Type/Source: Temporary state lighting; [SOURCE_OR_EVENT_REFERENCE]
Direction/Softness/Opacity: [DIRECTION / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [PROPORTIONAL_INTENSITY / FALLOFF / BOUNDED_AREA]
City/Time/State: [CITY_SKIN / DAY_NIGHT / GAMEPLAY_STATE]
Camera/Style: Brief controlled non-obscuring overlay
Technical Output: Isolated independently adjustable variant; [CONTRACT_REQUIREMENTS]
Negative Constraints: No routine global change, ownership/danger recolour,
full-screen obstruction, flash dependency, scene, UI, text, or permanent merge
Acceptance Criteria: State support, duration, proportionality, readability,
reduced-flash behaviour, modularity, and contract compliance are clear
```

##### Template 11: Atmospheric Lighting or Visibility Overlay

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Restrained atmosphere/visibility for [CONTEXT]
Overlay Type/Source: [ATMOSPHERIC_LIGHT / VISIBILITY_OVERLAY]; [SOURCE_CONTEXT]
Direction/Softness/Opacity: [DIRECTION_IF_ANY / SOFTNESS / LOW_OPACITY]
Intensity/Falloff/Footprint: [LOW_INTENSITY / FALLOFF / EDGE_BIASED_AREA]
City/Time/State: [CITY_SKIN / DAY_NIGHT / STATIC_OR_STATE]
Camera/Style: Sparse low-contrast modular atmospheric treatment
Technical Output: Isolated overlay/mask; [CONTRACT_REQUIREMENTS]
Negative Constraints: No hidden player/enemy/projectile/boundary, weather logic,
road-wide noise, mandatory city identity, scene, UI, text, or dense atmosphere
Acceptance Criteria: Atmosphere remains secondary, reducible, accessible,
procedural, gameplay-safe, and contract-compliant
```

##### Template 12: Full-Screen or Major-Event Lighting Reference

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Asset Purpose/Role/Tier: Exceptional lighting reference for [MAJOR_EVENT]
Overlay Type/Source: Major-event/full-screen reference; [EVENT_SOURCE]
Direction/Softness/Opacity: [DIRECTION_IF_RELEVANT / SOFTNESS / OPACITY]
Intensity/Falloff/Footprint: [PROPORTIONAL_INTENSITY / FALLOFF / SCREEN_AREA]
City/Time/State: [CITY_SKIN / DAY_NIGHT / EVENT_STATE]
Camera/Style: Brief low-noise accessibility-safe non-obscuring treatment
Technical Output: Separate adjustable reference/mask; [CONTRACT_REQUIREMENTS]
Negative Constraints: No routine use, strobe, white-out, prolonged darkness,
hidden player/danger, ownership recolour, cinematic scene, UI, text, or permanence
Acceptance Criteria: Exceptional importance, brevity, readability, reduced-flash
support, independent tuning, and contract compliance are clear
```

#### Acceptance Criteria

Accept lighting/shadow output only when it:

1. Improves grounding, readability, or atmosphere without creating meaning.
2. Preserves player, urgent danger, attack/hazard footprints, ownership, and
   categories.
3. Preserves perceived hitboxes.
4. Matches camera and mobile scale.
5. Uses consistent direction.
6. Is modular, independently tunable, procedural, and road-centre safe.
7. Preserves day/night fairness.
8. Supports reduced-flash and reduced-VFX settings.
9. Avoids colour-only communication.
10. Follows the flat-cartoon system.
11. Complies with the Technical Asset Contract.

#### Rejection Criteria

Reject or redesign output that:

* creates/replaces gameplay meaning or obscures player/danger/footprints
* changes ownership, rarity, category, or perceived hitbox
* resembles hazards, telegraphs, pickups, projectiles, objectives, or UI
* conflicts in direction or uses deceptive shadow scale
* uses realistic/painterly light, glow/bloom, detailed shadows, or road fragmentation
* creates false paths/objectives/danger, permanent pools, or crowd dark masses
* fails mobile/crowd/reduced-flash/reduced-VFX conditions
* uses stereotypes, changes city meaning, or makes night harder
* bakes scenes/backgrounds/ground or merges tunable overlays
* includes HUD, bars, numbers, labels, text, or logos
* prioritizes cinematic beauty over gameplay
* contradicts the Art Bible, Prompt Bible hierarchy, or Technical Asset Contract

### 7.12 World-space UI Prompt Module

Use this module for temporary, spatially associated information above, beside,
or at the screen edge in relation to a world target or action:

* standard enemy health bars
* elite and boss world-space health indicators
* status-effect indicators
* damage and healing/recovery numbers
* interaction prompts
* objective and tracked-target markers
* off-screen directional indicators
* contextual warnings
* world-space progress indicators
* controlled city, day/night, and accessibility variants

This module also governs anchor, stacking, overlap, density, and lifecycle
references for those elements.

It excludes permanent HUD and player-HUD health, XP, resources, menus,
inventory, pause, shops, reward screens, dialogue, subtitles/captions, and
screen layouts. It does not generate base gameplay sprites, attacks,
projectiles, hazards, pickups, props, VFX, lighting systems, scenes,
backgrounds, decorative text, or logos. The HUD module owns persistent/global
information. VFX may reinforce an event; World-space UI owns its structured
contextual information.

#### Primary Principle

**World-space UI communicates temporary local information; it must never replace, obscure or contradict the underlying gameplay information.**

#### Visual Hierarchy

When elements compete, preserve this order:

```text
Critical Warning → Required Interaction or Target Information → Health and State → Damage or Recovery Feedback → Secondary Contextual Information
```

Lower-priority information must aggregate, simplify, fade, suppress, or cull
before higher-priority information. UI must remain subordinate to the player,
active attacks, hazards, telegraphs, and required movement space.

No treatment may alter or obscure player position or facing, enemy silhouette,
attack ownership or footprint, hazard boundaries, safe versus dangerous space,
collision perception, or gameplay-category recognition.

#### Frozen Modular Hierarchy

Every reference must declare:

```text
Base World-space UI Element → Information Function → Priority Tier → State → Target/Anchor Type → City Treatment → Day/Night Treatment → Accessibility Variant
```

Do not merge these layers into a one-off illustration. Generate separable
references whenever a state, anchor, treatment, or accessibility variant must
change independently.

#### Context Lifecycle

Use the common contextual lifecycle:

```text
Hidden → Appearing → Active → Updating → Fading → Hidden
```

Appearing and updating may use restrained motion, scale, opacity, or value
change. Fading must be prompt and predictable. No element may remain visible
after its target, information, or action becomes invalid.

#### Health & State Indicators

Standard enemy health bars are contextual. They may appear after damage,
targeting, or proximity, then fade when no longer useful. At high density,
routine enemy bars must aggregate, shorten, simplify, or suppress.

Elite indicators may persist longer and use a stronger, still-subordinate
association cue. Boss world-space indicators remain stable while the boss is
active, but are distinct from any HUD boss bar and must not duplicate the same
information without an accessibility or urgent-context reason. Player health
belongs primarily to the HUD.

Health and state must use multiple cues such as fill, depletion direction,
shape, boundary, icon, label, or state change. Never rely on colour alone.
Indicators must preserve the target silhouette, facing, attack origin, and
danger readability.

Status indicators require a stable icon/shape, consistent target-relative
position, clear active/duration state, and restrained motion and colour.
Define stacking, prioritisation, aggregation, and expiration. Repeated or
low-priority states may combine or suppress. Status icons must not resemble
pickups, VFX bursts, telegraphs, projectiles, objectives, or HUD controls.

#### Damage & Recovery Feedback

Damage and healing/recovery numbers must be brief, mobile-readable, clearly
associated with their source target, and safe under density. Use short
lifetimes, predictable motion, numerical hierarchy, aggregation, density caps,
and low-priority suppression.

User settings must be able to reduce, aggregate, or hide routine numbers while
retaining critical feedback. Avoid number spam, exaggerated bounce, random
paths, permanent or long-lived values, paragraph text, and effects that cover
faces, hit areas, or attack origins.

#### Text & Localisation

Use text sparingly: short verbs, short labels, or essential clarification only.
All copy is replaceable placeholder content, never baked artwork or final
button/objective copy. References must support localisation, text expansion,
scalable type, and icon-plus-text or other multi-cue alternatives.

#### Anchoring, Tracking & Association

Every prompt must declare target type, anchor point, offset, orientation,
smoothing, maximum tracking lag, scale behaviour, visibility rule, edge
behaviour, and overlap rule. Anchors must remain stable under movement, camera
scroll, spawning, despawning, occlusion, and procedural assembly.

Reject drift, visible lag, ambiguous target association, inconsistent offsets,
anchor jumps, or placement over a face, key silhouette, attack origin, active
telegraph, or required route.

#### Stacking, Overlap & Density

Resolve competition through priority rendering, controlled stacking,
aggregation, limited displacement, suppression, shortened lifetimes, fading,
culling, and category-specific caps. Preserve target association after any
displacement. Do not create vertical towers, tangled leader lines, screen-edge
crowds, or UI blankets.

#### Off-screen Directional Indicators

Reserve screen-edge indicators for important objectives, tracked targets, major
threats, and required interactions. Communicate direction, category, urgency,
and approximate proximity through multiple cues. Indicators must be honestly
edge-attached, stable, non-jittering, compatible with safe areas, and limited in
count.

Do not mark routine enemies, pickups, or props off-screen. Never imply a false
direction, exact distance, reachable route, or urgency that the game cannot
guarantee.

#### Interaction Prompt Lifecycle

Interaction prompts use:

```text
Unavailable → Available → Focused → Activated → Complete/Expired
```

They may appear through proximity, targeting, focus, or another declared
eligibility rule. Communicate availability, target, action, progress, and
completion without colour-only meaning. Disappear when invalid, out of range,
complete, expired, or overridden by a higher-priority interaction.

#### Objectives, Warnings & Progress

Objective and tracked-target markers may communicate identity, direction,
state, urgency, and completion. Keep them restrained and distinct from pickups,
projectiles, telegraphs, hazards, lighting beacons, and physical props. Avoid
oversized beacons, glow pillars, scenery-like markers, and permanent labels.

Contextual warnings are brief, high priority, multi-cue, and associated with a
location, target, or event. They remain distinct from the underlying gameplay
telegraph and never replace it. Avoid full-screen flashes, strobes, panels, or
warnings whose decoration is louder than the danger.

World-space progress indicators show a truthful start, current state,
interruption, completion, and expiration. They remain attached to the relevant
target or action and must never advance, pause, or complete deceptively.

#### City & Day/Night Treatments

City treatment is a secondary skin expressed through restrained borders,
motifs, accent shapes, or palette application. Preserve information meaning,
geometry, priority, placement, icons, association, lifecycle, accessibility,
and the global UI grammar.

Do not use stereotypes, landmark illustrations, decorative city artwork,
changed meanings, colour-only identity, fragile details, localisation-hostile
frames, or a separate UI system per city.

Day/night variants retain the same structure and adapt contrast only as needed.
Preserve hierarchy, semantic colour, association, readability, accessibility,
and fairness. Do not add glow, bloom, light pools, larger night variants,
changed semantic colours, or treatments that compete with danger.

#### Accessibility Variants

References must support:

* **Full World-space UI** — all approved contextual information, with category
  caps and normal aggregation.
* **Reduced World-space UI** — fewer and less frequent elements; reduced motion,
  repeated status cues, secondary animation, minor labels, nonessential
  markers, and city decoration.
* **Essential-Only World-space UI** — critical warnings, required interactions,
  essential objectives, necessary health/state information, and required
  progress only.

All modes support scalable text and icons, colour-safe multi-cue meaning,
reduced motion and flashing, localisation, spam suppression, and stable
anchoring. Reduction must remove optional noise without concealing information
required for fair play. Critical information must remain understandable without
decorative motion, glow, or colour.

#### World-space UI / VFX Boundary

World-space UI owns structured health, status, numbers, prompts, markers,
directional indicators, progress, labels, and contextual warnings.

VFX owns impacts, trails, bursts, particles, state effects, collection effects,
attack effects, and environmental effects. The systems remain separate but
coordinated; neither may replace the other's gameplay role. A structured state
must remain understandable without decorative VFX where UI is required, and
the underlying world behaviour must remain understandable without UI where it
must carry the state.

#### World-space UI / HUD Boundary

World-space UI owns local, temporary, target-, position-, action-, and
context-associated information.

HUD owns persistent, global, player, run, system, and nonspatial information.
Avoid duplication unless an accessibility need or urgent spatial context
requires it.

#### Category Differentiation & Negatives

World-space UI must not resemble pickups, projectiles, attacks, hazards, VFX,
props, lighting overlays, gameplay sprites, HUD panels, menus, or screens.

Reject collectible-looking status icons, harmless boundaries that look
dangerous, projectile-like arrows, objective markers that resemble attacks,
status icons that resemble pickups, routine numbers that read as warnings,
scenery-like markers, interface framing, glow circles, permanent labels,
logos, long text, and panel-like compositions.

#### Isolation & Technical Output

References must be isolated, transparent where applicable, tightly bounded,
consistently scaled/oriented/framed, mobile-readable at the high bird’s-eye
camera, stable at declared anchors, and suitable for procedural assembly.
Include no scenes, backgrounds, unrelated assets, VFX, HUD layouts, decorative
text, or logos.

Provide separate outputs for base, state, priority, target, anchor, stacking,
city, day/night, Full, Reduced, Essential-Only, and lifecycle references when
required. Dimensions, alpha, padding, pivots, anchors, safe areas, naming,
metadata, export, and engine implementation inherit from the Technical Asset
Contract.

#### Reusable World-space UI Prompt Templates

Each template inherits Global Rules, this module, applicable City-Skin and
Day/Night modules, and the Technical Asset Contract. Template variables are
production fields, not permission to invent final concepts, values, icons,
copy, cities, colours, motifs, fonts, or cultural symbols.

##### Template 1: Standard Enemy Health Bar

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: Contextual health for [STANDARD_ENEMY]; [PRIORITY_TIER]
State/Lifecycle: [HEALTH_STATE]; Hidden → Appearing → Active → Updating → Fading → Hidden
Target/Anchor: [TARGET_TYPE / ANCHOR_POINT / OFFSET / ORIENTATION / SMOOTHING / MAX_LAG]
Visibility/Stacking: [TRIGGER / DURATION / OVERLAP_RULE / DENSITY_CAP / SUPPRESSION]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Compact flat-cartoon bar with multi-cue fill/depletion and clear association
Technical Output: Isolated base/state/anchor variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No colour-only state, face/attack obstruction, HUD panel,
pickup/hazard/VFX form, scene, decorative text, or logo
Acceptance Criteria: Health, target association, lifecycle, density behaviour,
camera-scale readability, accessibility, and contract compliance are clear
```

##### Template 2: Elite or Boss World-space Health Indicator

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: [ELITE_OR_BOSS] health/state; [PRIORITY_TIER]
State/Lifecycle: [HEALTH_OR_PHASE_STATE]; Hidden → Appearing → Active → Updating → Fading → Hidden
Target/Anchor: [TARGET_TYPE / ANCHOR_POINT / OFFSET / ORIENTATION / SMOOTHING / MAX_LAG]
Visibility/Stacking: [PERSISTENCE / HUD_DEDUPLICATION_RULE / OVERLAP_RULE]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Stronger stable association than standard enemies, still subordinate to danger
Technical Output: Isolated elite/boss base and state variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No duplicated HUD boss bar, player-health replacement,
oversized panel, colour-only phase, obscured silhouette, scene, VFX, or logo
Acceptance Criteria: Tier distinction, health/state clarity, stable association,
HUD boundary, accessibility, and contract compliance are clear
```

##### Template 3: Status-effect Indicator

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: [STATUS_FUNCTION] on [TARGET_TYPE]; [PRIORITY_TIER]
State/Lifecycle: [ACTIVE_DURATION_EXPIRING_STATE]; Hidden → Appearing → Active → Updating → Fading → Hidden
Target/Anchor: [ANCHOR_POINT / OFFSET / ORIENTATION / SMOOTHING / MAX_LAG]
Visibility/Stacking: [STACK_ORDER / AGGREGATION / DENSITY_CAP / EXPIRATION]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Stable shape/icon and position with restrained multi-cue duration treatment
Technical Output: Isolated base/state/stack variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No pickup, telegraph, projectile, objective, VFX burst,
HUD control, colour-only status, silhouette obstruction, final icon, or logo
Acceptance Criteria: Status identity, duration, stacking, target association,
category distinction, accessibility, and contract compliance are clear
```

##### Template 4: Damage-number Treatment

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: Damage feedback for [TARGET_TYPE]; [NUMERICAL_PRIORITY]
State/Lifecycle: [DAMAGE_STATE]; Hidden → Appearing → Active → Updating → Fading → Hidden
Target/Anchor: [IMPACT_ASSOCIATION / ANCHOR_POINT / OFFSET / PREDICTABLE_MOTION / MAX_LAG]
Visibility/Stacking: [AGGREGATION / DENSITY_CAP / SUPPRESSION / SHORT_LIFETIME]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Brief mobile-readable numerical hierarchy, subordinate to attacks and hazards
Technical Output: Replaceable type/value and motion references; [CONTRACT_REQUIREMENTS]
Negative Constraints: No spam, random path, exaggerated bounce, permanent value,
warning form, final number/font, paragraph, scene, VFX merge, or logo
Acceptance Criteria: Damage association, hierarchy, lifetime, aggregation,
density/accessibility behaviour, and contract compliance are clear
```

##### Template 5: Healing or Recovery-number Treatment

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: [HEALING_OR_RECOVERY] feedback for [TARGET_TYPE]; [PRIORITY_TIER]
State/Lifecycle: [RECOVERY_STATE]; Hidden → Appearing → Active → Updating → Fading → Hidden
Target/Anchor: [SOURCE_ASSOCIATION / ANCHOR_POINT / OFFSET / PREDICTABLE_MOTION / MAX_LAG]
Visibility/Stacking: [AGGREGATION / DENSITY_CAP / SUPPRESSION / SHORT_LIFETIME]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Brief multi-cue recovery treatment distinct from damage and pickups
Technical Output: Replaceable type/value and motion references; [CONTRACT_REQUIREMENTS]
Negative Constraints: No colour-only recovery, pickup/collection form, spam,
random path, permanent value, final number/font, scene, VFX merge, or logo
Acceptance Criteria: Recovery meaning and association, damage distinction,
lifetime, density/accessibility behaviour, and contract compliance are clear
```

##### Template 6: Interaction Prompt

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: Required/optional action for [INTERACTABLE_TARGET]; [PRIORITY_TIER]
State/Lifecycle: Unavailable → Available → Focused → Activated → Complete/Expired
Target/Anchor: [ELIGIBILITY_RULE / ANCHOR_POINT / OFFSET / ORIENTATION / SMOOTHING / MAX_LAG]
Visibility/Stacking: [RANGE_OR_FOCUS_RULE / OVERRIDE_RULE / OVERLAP_RULE]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style/Copy: Compact icon plus replaceable [SHORT_ACTION_PLACEHOLDER]; multi-cue state
Technical Output: Isolated state/anchor/copy variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No final button copy, permanent label, menu/HUD panel,
colour-only availability, invalid persistence, scene, decorative text, or logo
Acceptance Criteria: Eligibility, target, action, progress/completion, dismissal,
localisation, accessibility, and contract compliance are clear
```

##### Template 7: Objective or Tracked-target Marker

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: [OBJECTIVE_OR_TRACKED_TARGET_FUNCTION]; [PRIORITY_TIER]
State/Lifecycle: [TARGET_STATE]; Hidden → Appearing → Active → Updating → Fading → Hidden
Target/Anchor: [TARGET_TYPE / ANCHOR_POINT / OFFSET / ORIENTATION / SMOOTHING / MAX_LAG]
Visibility/Stacking: [TRACKING_RULE / DIRECTION_RULE / OVERLAP_RULE / COMPLETION_RULE]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Restrained multi-cue identity/direction/state/urgency/completion marker
Technical Output: Isolated base/state/anchor variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No pickup, projectile, telegraph, hazard, prop, glow pillar,
oversized beacon, permanent label, final objective icon/copy, scene, or logo
Acceptance Criteria: Target identity and association, truthful state/direction,
category distinction, accessibility, and contract compliance are clear
```

##### Template 8: Off-screen Directional Indicator

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: Off-screen [ESSENTIAL_TARGET_CATEGORY]; [PRIORITY_TIER]
State/Lifecycle: [OFFSCREEN_TO_ONSCREEN_STATE]; Hidden → Appearing → Active → Updating → Fading → Hidden
Target/Anchor: Screen edge; [DIRECTION / SAFE_AREA / EDGE_OFFSET / SMOOTHING / MAX_LAG]
Visibility/Stacking: [IMPORTANCE_RULE / COUNT_CAP / EDGE_OVERLAP / CULL_RULE]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Stable edge-attached multi-cue direction/category/urgency/proximity
Technical Output: Isolated edge/orientation/priority variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No routine enemy/pickup/prop, false route/distance/urgency,
jitter, projectile-arrow form, unsafe-area overlap, scene, HUD panel, or logo
Acceptance Criteria: Eligible importance, honest direction, stability, count cap,
safe-area use, accessibility, and contract compliance are clear
```

##### Template 9: Contextual Warning Indicator

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: Critical local warning for [TARGET_OR_EVENT]; critical
State/Lifecycle: [WARNING_STATE]; Hidden → Appearing → Active → Updating → Fading → Hidden
Target/Anchor: [LOCATION_OR_TARGET / ANCHOR_POINT / OFFSET / ORIENTATION / SMOOTHING]
Visibility/Stacking: [TRIGGER / BRIEF_DURATION / PRIORITY_OVERRIDE / OVERLAP_RULE]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Brief high-priority multi-cue warning distinct from its gameplay telegraph
Technical Output: Isolated base/state/reduced-flash variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No telegraph replacement, colour-only danger, full-screen
flash, strobe, panel, harmless-danger confusion, obscured route, scene, or logo
Acceptance Criteria: Warning urgency and association, telegraph separation,
brevity, reduced-flash accessibility, and contract compliance are clear
```

##### Template 10: World-space Progress Indicator

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: Progress for [TARGET_OR_ACTION]; [PRIORITY_TIER]
State/Lifecycle: [START_CURRENT_INTERRUPTED_COMPLETE_EXPIRED_STATE]
Target/Anchor: [TARGET_TYPE / ANCHOR_POINT / OFFSET / ORIENTATION / SMOOTHING / MAX_LAG]
Visibility/Stacking: [ELIGIBILITY / INTERRUPTION / COMPLETION / OVERLAP_RULE]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / FULL_REDUCED_ESSENTIAL]
Style: Compact honest multi-cue progress, clearly attached to target/action
Technical Output: Isolated base/fill/state/anchor variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No deceptive advancement, HUD resource meter, health-bar
confusion, colour-only progress, permanent panel, final copy, scene, or logo
Acceptance Criteria: Start/current/interruption/completion/expiration are truthful,
associated, readable, accessible, and contract-compliant
```

##### Template 11: City-skinned or Day/Night World-space UI Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: Variant of [BASE_UI_ELEMENT]; preserve [INFORMATION_FUNCTION / PRIORITY]
State/Lifecycle: Preserve [STATE_AND_CONTEXT_LIFECYCLE]
Target/Anchor: Preserve [TARGET_TYPE / ANCHOR / OFFSET / ORIENTATION / TRACKING]
Visibility/Stacking: Preserve [VISIBILITY / STACKING / OVERLAP / DENSITY_RULES]
City/Time/Accessibility: [RESTRAINED_CITY_TREATMENT / DAY_NIGHT_CONTRAST / ACCESSIBILITY_MODE]
Style: Shared geometry/icons/grammar with secondary border, motif, accent, or palette treatment
Technical Output: Isolated skin/time variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No changed meaning/placement/priority, colour-only identity,
stereotype, landmark art, glow/bloom, new UI system, final city/motif, scene, or logo
Acceptance Criteria: Meaning, hierarchy, association, lifecycle, accessibility,
fairness, localisation, global grammar, and contract compliance are preserved
```

##### Template 12: Reduced or Essential-Only Accessibility Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Purpose/Function/Priority: [REDUCED_OR_ESSENTIAL_ONLY] variant of [BASE_UI_FAMILY]
State/Lifecycle: Preserve required [STATE_AND_CONTEXT_LIFECYCLE]
Target/Anchor: Preserve [TARGET_TYPE / ANCHOR / OFFSET / ORIENTATION / TRACKING]
Visibility/Stacking: [RETAIN / AGGREGATE / SUPPRESS / DENSITY_CAP / PRIORITY_RULE]
City/Time/Accessibility: [CITY_TREATMENT / DAY_NIGHT / REDUCED_OR_ESSENTIAL_ONLY]
Style: Scalable colour-safe multi-cue treatment with reduced motion/flashing and noise
Technical Output: Separate reduction-mode references; [CONTRACT_REQUIREMENTS]
Negative Constraints: No hidden critical warning, required prompt/objective,
necessary health/state/progress, colour-only cue, jitter, spam, scene, HUD, or logo
Acceptance Criteria: Optional information is reduced while fair-play essentials,
association, localisation, readability, and contract compliance are preserved
```

#### Acceptance Criteria

Accept World-space UI output only when it:

1. Communicates temporary local information without replacing, obscuring, or
   contradicting gameplay.
2. Follows the frozen visual and modular hierarchies.
3. Uses the declared contextual or interaction lifecycle and dismisses invalid
   information.
4. Distinguishes standard, elite, and boss health treatment without replacing
   player HUD health or needlessly duplicating boss HUD information.
5. Uses stable target association, anchor, offset, orientation, smoothing, lag,
   scale, visibility, edge, and overlap rules.
6. Defines stacking, aggregation, density caps, suppression, fading, and culling.
7. Keeps status, damage, recovery, prompt, objective, warning, and progress
   categories distinct.
8. Restricts off-screen indicators to important eligible targets and preserves
   truthful direction, urgency, proximity, count, and safe-area behaviour.
9. Communicates interaction availability, focus, activation, completion, and
   expiration without colour-only meaning.
10. Uses brief, replaceable, localisable text only when necessary.
11. Preserves player, enemy, attack, hazard, telegraph, route, and target
    readability at the high bird’s-eye mobile scale.
12. Provides Full, Reduced, and Essential-Only variants with fair-play
    essentials retained.
13. Supports colour-safe multi-cue meaning, scalable text/icons, reduced motion,
    reduced flashing, localisation, and spam suppression.
14. Keeps World-space UI separate from VFX and persistent/global HUD.
15. Preserves global meaning, geometry, hierarchy, association, lifecycle,
    accessibility, and fairness across city and day/night treatments.
16. Is isolated, modular, transparent where applicable, procedural, and
    technically contract-compliant.
17. Contains no scenes, backgrounds, unrelated assets, final concepts/copy,
    decorative text, or logos.

#### Rejection Criteria

Reject or redesign output that:

* replaces gameplay telegraphs, VFX, attacks, hazards, pickups, sprites, or HUD
* obscures targets, faces, silhouettes, attack origins, danger, or required routes
* drifts, lags, jumps, ambiguously associates, or uses inconsistent anchors
* creates UI towers, uncontrolled overlap, screen-edge crowds, spam, or long-lived noise
* relies on colour alone or fails Reduced/Essential-Only/reduced-motion conditions
* shows invalid, complete, expired, out-of-range, or low-priority information
* uses off-screen markers for routine enemies, pickups, or props
* implies false direction, distance, route, urgency, progress, or completion
* duplicates persistent/global HUD without an accessibility or urgent-context reason
* resembles pickups, projectiles, attacks, hazards, VFX, props, lighting, menus, or panels
* uses glow pillars, oversized beacons, routine glow circles, strobe, bloom, or full-screen flashes
* uses stereotypes, landmarks, city artwork, per-city redesign, or harder night treatment
* bakes final numbers, icons, objectives, button copy, cities, colours, motifs,
  fonts, cultural symbols, decorative text, or logos
* produces scenes/backgrounds or merges independently tunable layers
* prioritizes decoration over mobile readability, fairness, or procedural use
* contradicts the Art Bible, Prompt Bible hierarchy, or Technical Asset Contract

### 7.13 HUD Prompt Module

Use this module for persistent and temporary screen-space gameplay information:

* player health, experience, progression, and player level where required
* currency and gameplay-resource counters
* ability and equipment slots, cooldowns, and charges
* temporary buffs, debuffs, and player-state indicators
* boss health and objective or encounter progress
* contextual screen-space notifications, critical warnings, and alert banners
* pause and gameplay-control affordances
* Standard, Compact, Essential-Only, accessibility, city, day/night, state, and
  animation references

This module excludes world-space health bars, target-attached UI, numbers above
characters, object-attached interaction prompts, world-space objective markers,
world-space progress, and off-screen indicators owned by the World-space UI
module. It also excludes menus, inventory, shops, reward screens,
character-selection and settings screens, narrative dialogue,
subtitles/captions, complete interface layouts or gameplay mock-ups, gameplay
sprites, attacks, projectiles, hazards, pickups, props, VFX, lighting, scenes,
backgrounds, final hardcoded localised copy, and logos.

World-space UI continues to own local, temporary, spatial, target-attached, and
position-attached information. HUD owns persistent, global, player-level,
run-level, system-level gameplay, and screen-space information.

#### Primary Principle

> **The HUD communicates essential gameplay information immediately, consistently and unobtrusively; it must never conceal, duplicate unnecessarily or compete with world-space gameplay.**

HUD may communicate player survival, current progression, ability availability,
cooldowns, temporary player states, run-level resources, objectives, boss state,
urgent warnings, and gameplay controls.

It must never obscure or contradict player position or facing, enemies, attack
origins or footprints, hazard boundaries, safe versus dangerous space,
world-space interaction information, gameplay ownership, collision perception,
or category recognition.

#### Information Hierarchy

```text
Critical Survival → Urgent Warnings → Abilities and Cooldowns → Temporary States → Objectives and Progression → Resources → Secondary Information
```

Critical survival remains immediately visible. Urgent warnings may temporarily
receive stronger priority. Ability and cooldown state remains readable without
dominating combat. Temporary states remain concise and grouped. Objectives and
progression remain available without distracting from immediate threats, while
resources remain secondary during combat. Decorative information suppresses
first. Protect the gameplay centre, player, and urgent world-space danger in all
HUD states.

#### Frozen Modular Hierarchy

```text
Base HUD Grammar → Information Family → Component → Gameplay State → Density/Size Variant → Accessibility Variant → Optional City/Time-of-Day Accent
```

Every stage preserves information meaning and hierarchy, screen-space location,
state and icon recognition, interaction meaning, accessibility, localisation
flexibility, mobile-scale readability, and gameplay visibility.

#### Screen-space Layout & Safe Areas

Anchor HUD components primarily to screen edges and corners. Protect the central
combat area, avoid unnecessary inward extension, and support portrait mobile
layouts, varied aspect ratios, notches, rounded corners, and operating-system
safe areas. Components must not overlap other HUD families or critical
World-space UI near screen edges.

Use stable locations and dimensions so value changes never create layout jitter.
Complete flattened HUD screens are not production assets; the game assembles
isolated modular components.

#### Persistent & Contextual Visibility

Reserve persistent visibility for high-frequency information such as player
health, core progression, primary abilities, essential resources, and pause or
gameplay-control affordances. Lower-frequency information appears contextually
or temporarily.

Where applicable, use:

```text
Hidden → Appearing → Active → Updating → Fading → Hidden
```

Warnings and notifications disappear when relevance ends. Do not keep
information visible merely because its source system exists.

#### Player Health

Player health uses multiple cues: fill length, container structure,
segmentation where relevant, icon or state treatment, controlled animation, and
restrained colour support. Colour is never the sole cue; low health must not
depend on red alone.

Support current and maximum health, low and critical health, damage and healing
response, maximum-health changes, protection or invulnerability where required,
and explicitly defined temporary health or shield layers. Avoid excessive
flashing, constant pulsing, default full-screen red overlays, large decorative
frames, realistic medical imagery, unstable dimensions, and layout movement.
Player health remains primarily a HUD responsibility.

#### Experience & Progression

Progression may communicate current and target progress, level completion or
increase, temporary boosts, and milestones. Use honest fill or segmentation.
Avoid decorative progress unrelated to values, ambiguous maxima, colour-only
states, or celebrations that obscure active danger. Level-up treatment may be
stronger than routine progression, but remains brief and subordinate to danger.

#### Resources & Currency

Resource counters use stable icon identity, readable values, compact and
consistent formatting, and jitter-free alignment. They remain subordinate to
health, danger, and abilities and preserve meaning across city and day/night
variants.

Support current value, gain, spend, insufficiency, and cap where relevant. Do
not hardcode resource names, values, currencies, or icons. Keep routine gain
animation restrained.

#### Ability & Equipment Slots

Each slot preserves stable position, icon silhouette, and container grammar
across ready, active, unavailable, cooldown, charge, disabled, locked, upgrade,
and replacement states where relevant.

Cooldown communicates through multiple cues such as a progress mask, fill,
radial or linear depletion, numeric support where required, icon treatment,
restrained motion, and structural state change. Never depend only on
desaturation, opacity, colour, or tiny numbers.

Ability slots remain distinct from pickups, World-space UI, enemy status icons,
warnings, and passive resource counters. Interactive slots look actionable;
informational components must not falsely appear interactive.

#### Temporary Buffs, Debuffs & Player States

Temporary states communicate identity, positive/negative/neutral classification,
duration and stack count where relevant, activation, refresh, and expiration.
Use stable icons or silhouettes, consistent grouping, priority ordering,
controlled duration treatment, restrained motion, and multi-cue recognition.

Colour alone is insufficient. Aggregate or prioritise multiple states. Avoid
long icon chains, uncontrolled stacking, permanent animation, excessive timers,
replacement of essential player-state animation or VFX, and similarity to enemy
warnings or pickups.

#### Boss HUD

Boss HUD may communicate identity, current and maximum health, segments, phases,
temporary state, and encounter progress. Use a dedicated high-priority component
that is distinct from player health, associated with the active encounter, and
removed when no longer relevant.

Avoid unnecessary duplication with world-space boss health, preserve boss
attacks and telegraphs, and communicate multiple phases without deceptive
progress. Do not create a large decorative cinematic banner. Normal enemy health
remains governed by World-space UI.

#### Objectives & Encounter Progress

Objective HUD may communicate active objective, current and target progress,
encounter phase, completion, failure, expiration, and optional priority. Keep it
concise, stably positioned, localisable, jitter-free during updates, subordinate
to critical danger, and hidden when irrelevant. Never bake final objective copy
into reusable templates.

#### Warnings & Alerts

Critical warnings may communicate immediate survival threat, critical state,
imminent encounter escalation, objective failure risk, system-level gameplay
alerts, or another approved urgent event.

Warnings are brief, high-priority, multi-cue, readable without colour or
flashing alone, distinct from world-space telegraphs, non-obscuring,
accessibility-safe, and automatically dismissed when relevance ends. They may
coordinate shape, position, iconography, restrained motion, concise localised
text, audio, and haptic references.

Avoid repeated full-screen flashing, high-frequency strobing, prolonged
overlays, spam, large opaque panels, telegraph replacement, and decorative alarm
effects.

#### Contextual Notifications

Notifications may communicate resource changes, objective updates, progression
milestones, ability unlocks, temporary run-state updates, or other approved
gameplay information. They are brief, prioritised, rate-limited, localisation
safe, and prevented from stacking uncontrollably or blocking gameplay. Routine
notifications may suppress during critical danger and disappear when no longer
useful.

#### Numbers, Text & Localisation

Numbers remain legible at mobile scale with stable alignment, jitter-free width
handling, localisation support, optional large-value abbreviation, clear current
versus maximum relationships, and consistent component formatting. Do not
hardcode final formats, decimal rules, separators, currency symbols,
abbreviations, values, or localised strings. Avoid excessive animated counters
during danger.

Use text only when icon, shape, and structure are insufficient. Permitted uses
include short objective labels, concise warnings, notifications, essential
control labels, quantities, and names where required. Reject paragraphs,
narrative copy, lore, decoration, long instructions, and baked final copy.

Text remains localised, replaceable, scalable, readable, truncation-safe, and
compatible with variable lengths. Declare text-safe zones and reusable
placeholder variables. Do not hardcode final fonts unless frozen elsewhere.

#### HUD Density Modes

* **Standard HUD** uses the approved complete gameplay HUD components.
* **Compact HUD** may reduce component size, spacing, secondary labels,
  persistent resource visibility, decorative framing, and nonessential state
  information while retaining all gameplay-critical information.
* **Essential-Only HUD** retains player health, critical warnings, core ability
  availability, essential temporary states, indispensable objectives or
  encounter information, and essential gameplay controls.

Gameplay remains fully understandable in Essential-Only mode.

#### Accessibility Requirements

Support UI scaling, safe-area adjustment, colour-safe icon-plus-shape
recognition, reduced HUD motion and flashing, high contrast, Standard/Compact/
Essential-Only modes, readable typography, configurable opacity where
appropriate, localisation, multi-cue communication, and alternatives to
colour-only status, flashing-only urgency, and hold-only controls where gameplay
permits.

Critical information remains understandable without decorative animation,
glow, flashing, colour, audio, or haptics. Accessibility settings must not reduce
gameplay clarity.

#### HUD Motion Language

```text
Crisp Appearance → Readable Update → Controlled Settle or Dismissal
```

Use brief state-driven transitions, controlled gain/loss confirmation,
restrained urgent pulses, clear cooldown progression, concise appearance and
dismissal, predictable movement, and reduced-motion alternatives.

Avoid constant bouncing, decorative loops, perpetual pulsing, excessive scale
pops, repeated screen-edge motion, delayed information, uncontrolled
notification motion, and large HUD movement during combat.

#### City & Day/Night Treatments

City variants may modify only restrained secondary border accents, abstract
motifs, textures, separators, limited palette accents, and culturally
appropriate non-literal detail. Preserve component location, information meaning
and hierarchy, icon language, geometry, interaction meaning, state recognition,
accessibility, localisation flexibility, and the global HUD grammar.

Do not use stereotypes, literal landmarks, decorative cultural artwork, changed
gameplay/warning/ownership/rarity meaning, fragile detail, reduced readability,
or a separate redesign of every component for every city.

Day/night variants use the same structure. Night is controlled contrast
adaptation through panel opacity, local contrast, edge support, restrained
brightness, or limited background separation. Preserve meaning, hierarchy, icon
and warning recognition, ownership, accessibility, readability, and fairness.
Avoid excessive glow, bloom, larger night components, changed gameplay colours,
luminous panels that compete with danger, or a harder-to-read night HUD.

#### HUD / World-space UI Boundary

HUD owns persistent, global, player-level, run-level, system-level gameplay, and
screen-space information: player health, core progression, abilities,
cooldowns, resources, boss and encounter summaries, screen-space warnings, and
screen-edge gameplay controls.

World-space UI owns temporary local, target-attached, position-attached, and
local action-specific information: enemy health, entity status, damage and
healing numbers, interaction prompts, objective and off-screen markers, and
local progress.

Do not duplicate persistent information unless deliberate redundancy is needed
for accessibility, critical danger, or a specifically approved requirement.

#### HUD / VFX Boundary

HUD owns explicit structured screen-space bars, counters, icons, timers,
cooldowns, warnings, textual gameplay notifications, and objective summaries.
VFX owns bursts, particles, trails, impacts, world-space state effects,
non-textual spectacle, and gameplay-effect reinforcement.

VFX may reinforce HUD updates but never replace structured HUD information. HUD
animation must not substitute for gameplay VFX.

#### Category Differentiation & Negatives

HUD must not resemble pickups, rewards, projectiles, attacks, hazards, enemy
telegraphs, props, characters, World-space UI, lighting overlays, complete menu
screens, or decorative scene elements.

Reject collectible-like screen icons that seem to exist in world space,
warning components resembling attack footprints, false-actionable information,
non-actionable-looking controls, floating target-attached HUD, excessive panel
depth, decorative screen frames, dashboard layouts, complete interface mock-ups,
baked gameplay screenshots, decorative text, and logos. Stable screen anchoring,
consistent framing, and modular construction establish HUD identity.

#### Isolation & Technical Output

References must be isolated, transparent where applicable, tightly bounded,
consistently scaled/oriented/framed, mobile-readable, portrait-compatible,
safe-area compatible, modular, scalable, and suitable for nine-slice or
equivalent implementation where appropriate.

Include no gameplay scenes, backgrounds, unrelated characters, attacks, props,
World-space UI, complete menus or HUD layouts, final hardcoded copy, decorative
text, or logos.

Provide separate outputs where required for container/frame, icon, fill or
progress layer, state overlay, cooldown layer, charge indicator, warning,
Compact, Essential-Only, accessibility, city, day/night, and animation or
lifecycle references. Dimensions, alpha, padding, pivots, anchors, safe-area
behaviour, scalable-slice guidance, naming, metadata, and export inherit from
the Technical Asset Contract.

#### Reusable HUD Prompt Templates

Each template inherits Global Rules, this module, applicable City-Skin and
Day/Night modules, and the Technical Asset Contract. Variables are intentional
production fields, not permission to invent final resources, currencies,
values, abilities, equipment, icons, bosses, objectives, warnings, button
labels, cities, colours, motifs, fonts, cultural symbols, or localised copy.

##### Template 1: Player Health Component

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: Player survival; [CRITICAL_SURVIVAL_PRIORITY]
State: [CURRENT_MAX / LOW / CRITICAL / DAMAGE / HEAL / PROTECTION / SHIELD]
Screen Anchor/Safe Area: [EDGE_OR_CORNER_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / COMPONENT_BOUNDS / STANDARD_COMPACT_ESSENTIAL]
Accessibility/City/Time: [MULTI_CUE / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style: Stable flat-cartoon container/fill with shape, structure, and restrained colour
Technical Output: Separate frame/fill/icon/state layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No red-only state, full-screen overlay, flashing, jitter,
medical realism, decorative frame, scene, final values/copy, or logo
Acceptance Criteria: Survival state, hierarchy, stable anchor, safe area,
mobile readability, accessibility, modularity, and contract compliance are clear
```

##### Template 2: Experience or Progression Component

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [EXPERIENCE_OR_PROGRESSION_FUNCTION]; [PRIORITY_TIER]
State: [CURRENT_TARGET / COMPLETE / LEVEL_UP / BOOST / MILESTONE]
Screen Anchor/Safe Area: [EDGE_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / COMPONENT_BOUNDS / STANDARD_COMPACT_ESSENTIAL]
Accessibility/City/Time: [MULTI_CUE / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style: Honest fill/segmentation with brief danger-subordinate update treatment
Technical Output: Separate frame/fill/state layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No false progress, ambiguous maximum, colour-only state,
combat-obscuring celebration, scene, final values/level/copy, or logo
Acceptance Criteria: Progress truth, hierarchy, anchor stability, safe area,
localisation, accessibility, modularity, and contract compliance are clear
```

##### Template 3: Currency or Gameplay-resource Counter

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [RESOURCE_FUNCTION]; [RESOURCE_PRIORITY]
State: [CURRENT / GAIN / SPEND / INSUFFICIENT / CAP]
Screen Anchor/Safe Area: [EDGE_OR_CORNER_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / VALUE_SAFE_ZONE / STANDARD_COMPACT_ESSENTIAL]
Accessibility/City/Time: [ICON_SHAPE_CUES / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style: Compact stable icon/value grammar with jitter-free alignment
Technical Output: Separate container/icon/value/state layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No final resource/currency/icon/value/format, pickup form,
routine animation excess, layout jitter, scene, decorative text, or logo
Acceptance Criteria: Resource identity/state, hierarchy, stable formatting,
safe area, localisation, accessibility, and contract compliance are clear
```

##### Template 4: Ability or Equipment Slot

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [ABILITY_OR_EQUIPMENT_FUNCTION]; [ABILITY_PRIORITY]
State: [READY / ACTIVE / UNAVAILABLE / DISABLED / LOCKED / UPGRADE / REPLACEMENT]
Screen Anchor/Safe Area: [CONTROL_OR_INFO_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / TOUCH_OR_INFO_BOUNDS / STANDARD_COMPACT_ESSENTIAL]
Accessibility/City/Time: [ACTIONABILITY_CUES / MULTI_CUE / CITY_ACCENT / DAY_NIGHT]
Style: Stable container and icon silhouette; actionable only when interactive
Technical Output: Separate frame/icon/state/interaction layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No pickup/status/warning form, false actionability,
unstable slot, final ability/equipment/icon/label, scene, VFX, or logo
Acceptance Criteria: Function, state, actionability, hierarchy, safe area,
accessibility, modular states, and contract compliance are clear
```

##### Template 5: Cooldown and Charge-state Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: Cooldown/charges for [BASE_SLOT]; [ABILITY_PRIORITY]
State: [READY / COOLDOWN_PROGRESS / CHARGE_COUNT / RECHARGING / UNAVAILABLE]
Screen Anchor/Safe Area: Preserve [SLOT_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: Preserve [SCALE_CLASS / SLOT_BOUNDS / DENSITY_MODE]
Accessibility/City/Time: [MASK_FILL_NUMBER_SHAPE_CUES / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style: Clear radial/linear depletion or fill with restrained readable state change
Technical Output: Separate cooldown mask/fill/charge/state layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No opacity/desaturation/colour-only state, tiny required
number, false readiness, final charge/value/icon, scene, VFX merge, or logo
Acceptance Criteria: Availability, progress, charges, multi-cue readability,
anchor stability, accessibility, modularity, and contract compliance are clear
```

##### Template 6: Temporary Buff or Debuff Indicator

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [BUFF_DEBUFF_OR_NEUTRAL_STATE]; [STATE_PRIORITY]
State: [ACTIVATING / ACTIVE / REFRESHED / EXPIRING / EXPIRED / STACK_COUNT]
Screen Anchor/Safe Area: [STATE_GROUP_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / GROUP_BOUNDS / STANDARD_COMPACT_ESSENTIAL]
Accessibility/City/Time: [ICON_SHAPE_DURATION_CUES / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style: Stable grouped icon/silhouette with controlled duration and priority order
Technical Output: Separate icon/state/duration/stack variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No colour-only class, long chain, uncontrolled stack,
perpetual animation, enemy warning/pickup form, final status/icon, or logo
Acceptance Criteria: Identity, class, duration, stacking, priority, safe area,
accessibility, aggregation, and contract compliance are clear
```

##### Template 7: Boss Health Component

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: Active boss encounter health/state; [HIGH_PRIORITY]
State: [CURRENT_MAX / SEGMENT / PHASE / TEMPORARY_STATE / ENCOUNTER_END]
Screen Anchor/Safe Area: [DEDICATED_EDGE_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / COMPONENT_BOUNDS / STANDARD_COMPACT_ESSENTIAL]
Accessibility/City/Time: [MULTI_CUE_PHASES / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style: Dedicated stable component, distinct from player health and telegraphs
Technical Output: Separate frame/fill/segment/phase/state layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No deceptive phase progress, unnecessary world-space
duplication, cinematic banner, attack obstruction, final boss/icon/name, or logo
Acceptance Criteria: Encounter association, health/phases, hierarchy, dismissal,
safe area, accessibility, HUD boundary, and contract compliance are clear
```

##### Template 8: Objective or Encounter-progress Component

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [OBJECTIVE_OR_ENCOUNTER_FUNCTION]; [PRIORITY_TIER]
State: [ACTIVE / CURRENT_TARGET / PHASE / COMPLETE / FAILED / EXPIRED]
Screen Anchor/Safe Area: [STABLE_EDGE_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / TEXT_SAFE_ZONE / STANDARD_COMPACT_ESSENTIAL]
Accessibility/City/Time: [MULTI_CUE / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style/Copy: Concise structure with replaceable [OBJECTIVE_COPY_PLACEHOLDER]
Technical Output: Separate container/icon/progress/text/state layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No paragraph, final objective/type/value/copy, layout
jitter, persistent irrelevance, danger obstruction, world marker, scene, or logo
Acceptance Criteria: Objective/progress truth, concise update, hierarchy, anchor,
localisation, accessibility, and contract compliance are clear
```

##### Template 9: Critical Warning or Alert Banner

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [CRITICAL_WARNING_FUNCTION]; urgent warning
State: Hidden → Appearing → Active → Updating → Fading → Hidden
Screen Anchor/Safe Area: [NON_OBSCURING_EDGE_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / MAX_BOUNDS / PRIORITY_AND_RATE_LIMIT]
Accessibility/City/Time: [SHAPE_ICON_TEXT_CUES / REDUCED_FLASH_MOTION / CITY_ACCENT / DAY_NIGHT]
Style/Copy: Brief alert with replaceable [WARNING_COPY_PLACEHOLDER]
Technical Output: Separate shape/icon/text/state/reduced-flash layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No telegraph replacement, colour/flash-only warning,
strobe, opaque panel, spam, final warning/icon/copy, scene, or logo
Acceptance Criteria: Urgency, brevity, hierarchy, dismissal, non-obstruction,
safe area, accessibility, localisation, and contract compliance are clear
```

##### Template 10: Contextual Gameplay Notification

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [NOTIFICATION_FUNCTION]; [NOTIFICATION_PRIORITY]
State: Hidden → Appearing → Active → Updating → Fading → Hidden
Screen Anchor/Safe Area: [NOTIFICATION_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [SCALE_CLASS / TEXT_SAFE_ZONE / RATE_AND_STACK_CAP]
Accessibility/City/Time: [MULTI_CUE / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style/Copy: Brief prioritised treatment with replaceable [NOTIFICATION_COPY_PLACEHOLDER]
Technical Output: Separate container/icon/text/state variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No uncontrolled stack, danger blocking, paragraph, final
event/icon/value/copy, permanent display, excessive motion, scene, or logo
Acceptance Criteria: Relevance, priority, rate limit, dismissal, safe area,
localisation, accessibility, and contract compliance are clear
```

##### Template 11: Pause or Gameplay-control Affordance

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [PAUSE_OR_GAMEPLAY_CONTROL]; [CONTROL_PRIORITY]
State: [AVAILABLE / FOCUSED / PRESSED / ACTIVE / DISABLED]
Screen Anchor/Safe Area: [EDGE_OR_CORNER_CONTROL_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [TOUCH_SCALE_CLASS / INTERACTION_BOUNDS / STANDARD_COMPACT_ESSENTIAL]
Accessibility/City/Time: [ACTIONABILITY_SHAPE_CUES / HOLD_ALTERNATIVE / CITY_ACCENT / DAY_NIGHT]
Style/Copy: Clearly actionable control with replaceable [CONTROL_LABEL_PLACEHOLDER]
Technical Output: Separate control/icon/state/focus layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No false affordance, menu screen, tiny touch target,
unsafe-area overlap, final button/icon/label, world-space form, scene, or logo
Acceptance Criteria: Control meaning/actionability, states, stable safe anchor,
accessibility alternative, modularity, and contract compliance are clear
```

##### Template 12: Compact HUD Component Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: Compact variant of [BASE_HUD_COMPONENT]; preserve [PRIORITY]
State: Preserve [GAMEPLAY_STATES_AND_CONTEXT_LIFECYCLE]
Screen Anchor/Safe Area: Preserve [SCREEN_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: [COMPACT_SCALE_CLASS / REDUCED_SPACING / COMPACT]
Accessibility/City/Time: [RETAINED_MULTI_CUES / REDUCED_MOTION / CITY_ACCENT / DAY_NIGHT]
Style: Reduced size/spacing/labels/framing without loss of critical information
Technical Output: Separate Compact component/state layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No hidden critical state, changed meaning/location,
unreadable type/icon, new layout, final content, scene, World-space UI, or logo
Acceptance Criteria: Critical information and state recognition survive compact
density with stable anchors, safe areas, accessibility, and contract compliance
```

##### Template 13: Essential-Only or Accessibility HUD Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: [ESSENTIAL_ONLY_OR_ACCESSIBILITY_FUNCTION]; [CRITICAL_PRIORITY]
State: Preserve required [GAMEPLAY_STATES_AND_CONTEXT_LIFECYCLE]
Screen Anchor/Safe Area: [STABLE_SCREEN_ANCHOR / ADJUSTABLE_SAFE_AREA / ASPECT_RULE]
Dimensions/Density: [SCALABLE_CLASS / ESSENTIAL_BOUNDS / ESSENTIAL_ONLY]
Accessibility/City/Time: [COLOUR_SAFE / HIGH_CONTRAST / REDUCED_MOTION_FLASH / OPACITY / DAY_NIGHT]
Style: Icon-plus-shape multi-cue grammar retaining all fair-play essentials
Technical Output: Separate scaling/contrast/reduction/control variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No removal of health/warnings/core abilities/essential
states/objectives/controls, colour/flash/audio-only cue, final content, or logo
Acceptance Criteria: Gameplay remains fully understandable without decoration,
motion, glow, flashing, colour, audio, or haptics and meets the contract
```

##### Template 14: City-skinned or Day/Night HUD Accent Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION]
Information Function/Priority: Accent variant of [BASE_HUD_COMPONENT]; preserve [FUNCTION_AND_PRIORITY]
State: Preserve [GAMEPLAY_STATES_AND_RECOGNITION]
Screen Anchor/Safe Area: Preserve [SCREEN_ANCHOR / SAFE_AREA_INSET / ASPECT_RULE]
Dimensions/Density: Preserve [SCALE_CLASS / COMPONENT_BOUNDS / DENSITY_MODE]
Accessibility/City/Time: [RESTRAINED_CITY_ACCENT / DAY_NIGHT_CONTRAST / ACCESSIBILITY_MODE]
Style: Shared HUD grammar with secondary border/motif/texture/palette accent only
Technical Output: Separate city/day/night accent layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No changed meaning/location/geometry/warning/ownership/
rarity, stereotype, landmark art, glow/bloom, final city/motif/colour, or logo
Acceptance Criteria: Meaning, hierarchy, recognition, interaction, accessibility,
localisation, global grammar, night fairness, and contract compliance are preserved
```

#### Acceptance Criteria

Accept HUD output only when it:

1. Communicates essential information immediately and preserves gameplay visibility.
2. Protects the central combat area and urgent player, enemy, attack, and hazard information.
3. Remains readable at mobile scale in portrait layouts and varied aspect ratios.
4. Respects notches, rounded corners, operating-system safe areas, and nearby World-space UI.
5. Uses stable screen anchors, dimensions, alignment, and jitter-free value updates.
6. Uses multiple cues rather than colour or flashing alone.
7. Clearly distinguishes interactive controls from informational components.
8. Preserves information meaning, hierarchy, location, and state recognition.
9. Uses persistent and contextual visibility appropriately and dismisses expired information.
10. Controls grouping, notification rates, stacking, aggregation, and suppression.
11. Preserves meaning and accessibility across city and day/night variants.
12. Remains modular, independently tuneable, scalable, and game-assembled.
13. Preserves the HUD/World-space UI ownership boundary.
14. Preserves the HUD/VFX ownership boundary.
15. Supports Standard, Compact, and Essential-Only modes without losing fair-play essentials.
16. Supports scaling, safe-area adjustment, reduced motion/flashing, high contrast, and multi-cue recognition.
17. Uses replaceable, scalable, truncation-safe localised text and stable number formatting.
18. Is procedurally and technically reusable without baked screens or unrelated assets.
19. Complies with the Technical Asset Contract and frozen Prompt Bible hierarchy.

#### Rejection Criteria

Reject or redesign output that:

* obscures the player, urgent enemies, attack origins/footprints, hazards, or safe space
* unnecessarily invades the protected gameplay centre
* ignores notches, rounded corners, operating-system safe areas, or World-space UI overlap
* depends on colour, flashing, audio, haptics, opacity, or tiny numbers alone
* uses unstable anchors, dimensions, alignment, or width-driven layout jitter
* remains visible after relevance ends or duplicates World-space UI without justification
* creates uncontrolled icon/notification stacks, warning spam, or excessive animation
* uses repeated flashing, strobing, glow, bloom, prolonged overlays, or opaque panels
* resembles pickups, attacks, hazards, projectiles, telegraphs, props, or world-space markers
* fails to distinguish actionable controls from informational components
* fails at mobile scale or in Compact, Essential-Only, reduced-motion, or reduced-flash modes
* uses paragraphs, long instructions, decorative text, or final hardcoded localised copy
* uses stereotypes, landmarks, cultural artwork, or changed meaning through city treatment
* changes warning, ownership, rarity, or gameplay meaning or makes night excessively luminous
* bakes complete gameplay screens, dashboards, menu/interface layouts, scenes, or backgrounds
* includes unrelated characters, attacks, props, VFX, World-space UI, logos, or final concepts
* prioritizes decoration over immediate communication, accessibility, or gameplay visibility
* contradicts the Art Bible, Prompt Bible hierarchy, or Technical Asset Contract

### 7.14 City-skin Framework

Use this framework to apply researched city identity consistently across asset
categories without changing gameplay meaning, category recognition,
accessibility, technical compatibility, procedural use, or the shared Masala
Run art style.

#### Primary Principle

> **City skins express place through researched, restrained and modular secondary qualities while preserving the global gameplay, visual, accessibility and technical grammar of Masala Run. A city skin may strengthen identity, but it may never redefine gameplay meaning, category recognition or the shared art style.**

#### Core Definition

**A controlled visual transformation layer applied over the shared global asset grammar.**

Apply that layer in this order:

```text
Shared Gameplay Asset → Category Variant → City Skin → Time of Day → State
```

A city skin is not a palette swap, complete redesign, separate art style,
gameplay-behaviour variant, or permission to create city-exclusive assets
without justification. Gameplay category and function are resolved before city
identity is applied.

#### Frozen Modular Hierarchy

```text
Global Asset Grammar → Asset Category → Gameplay Variant → City Identity Pillar → City Skin → Time of Day → State → Accessibility Variant → Runtime Instance
```

Every stage preserves gameplay meaning, category recognition, silhouette logic,
footprint, scale hierarchy, ownership, direction, timing, state recognition,
perceived hitbox, anchor points, animation logic, accessibility, technical
compatibility, and procedural reuse.

If a visual change alters behaviour or recognition, define it first as a
gameplay variant. Only then may it inherit a city skin.

#### Allowed City-skin Changes

City skins may modify restrained secondary qualities:

* material and surface pattern
* minor construction detail and secondary silhouette accents
* approved abstract motifs
* practical-light source style
* restrained atmospheric character
* controlled environmental palette contribution
* culturally appropriate non-literal accents
* limited secondary colour adjustment inside the global gameplay colour system

These changes remain removable without destroying asset function or category.

#### Protected Characteristics

City skins must not change primary gameplay silhouette, role, behaviour,
collision or damage footprint, scale meaning, rarity, ownership, danger meaning,
direction, state, timing, movement language, hitbox perception, attachment
points, interface meaning, icon language, or accessibility-essential cues.

#### City-skin Strength by Category

##### Strongest City Treatment

* environmental props
* modular micro-clusters
* frontages and architectural elements
* road materials and safe road overlays
* practical environmental lighting

##### Moderate City Treatment

* gameplay hazards
* selected enemies and pickups
* restrained ambient VFX
* approved environmental shadows or atmosphere

##### Restrained City Treatment

* player
* attacks and projectiles
* functional VFX
* World-space UI and HUD

##### Minimal or No City Treatment

* critical telegraphs
* ownership grammar and danger boundaries
* accessibility-essential UI
* globally fixed gameplay symbols
* information whose meaning could become ambiguous

City treatment is purposeful, not mandatory for every asset. Use the weakest
treatment that communicates the approved city identity without risking
gameplay, accessibility, style, or technical clarity.

#### City Identity Pillars & Research

Every city requires three to five researched identity pillars. Each pillar
declares:

* an identity statement
* supporting materials and silhouette characteristics
* relevant prop families and surface treatments
* lighting or atmospheric cues
* restrained palette contribution and approved abstract motifs
* prohibited stereotypes
* applicable asset categories

City identity comes from research, never AI intuition or stereotype. Prioritise
everyday streets, ordinary architecture, construction logic, local materials,
street objects, commerce, climate responses, recurring forms and proportions,
lighting practices, surface ageing, and visual rhythm.

Tourism imagery, monuments, movie representations, and travel-poster clichés
must not be the primary research source.

#### Landmark-echo Rule

Use landmark echoes rather than literal landmarks. An echo may borrow abstract
proportion, structural rhythm, material, silhouette tendency, construction
logic, or a restrained geometric cue.

It must not become a miniature monument, literal landmark artwork,
tourist-poster asset, objective-like beacon, or cultural symbol pasted onto an
unrelated asset.

#### Stereotype Prevention

Every city kit must eventually declare approved identity cues, overused cues,
prohibited stereotypes, literal-symbol restrictions, culturally sensitive
areas, foreign-city exclusions, and review notes where required.

Reject caricatures, costume stereotypes, symbolic tokenism, literal landmark
costumes, random cultural decoration, unrelated religious or political symbols,
and motifs that alter gameplay meaning.

#### Shared Shape & Style Grammar

All cities use the shared Masala Run language: clean flat-cartoon style, rounded
forms with selective sharp accents, flat fills with at most one darker shade,
moderate detail, readable silhouettes, gameplay-priority-controlled outlines,
high bird’s-eye camera compatibility, and mobile-scale readability.

Cities may favour restrained secondary form tendencies, material families, and
visual rhythms, but must never look like separate games.

#### Colour Rules

```text
Global Gameplay Colour Logic + Controlled City Environmental Palette
```

City palettes primarily affect environment, materials, secondary accents,
practical lights, and atmosphere. They must not alter player-versus-enemy
ownership, danger, rarity, health, warning, interaction, or
accessibility-essential meaning. Colour alone carries neither city identity nor
gameplay meaning.

#### Day & Night

```text
City Skin → Day Treatment → Night Treatment
```

Day and night preserve the same structural city skin. Night is controlled
lighting and readability adaptation, not a redesign, palette inversion,
difficulty increase, or larger or more luminous asset variant.

Night may adjust restrained local contrast, shadow treatment, practical-light
visibility, edge support, ambient temperature, and controlled surface response.
It preserves gameplay meaning, ownership, category recognition, hitbox
perception, road readability, accessibility, and gameplay fairness.

#### Shared & City-exclusive Assets

Prefer shared assets and inherit them through:

```text
Base Asset → Shared Variant → City Material/Detail Layer → Time-of-Day Treatment → Runtime Instance
```

A city-exclusive asset is permitted only when the city cannot be represented
credibly through a shared family, the asset supports a documented identity
pillar, remains modular and procedurally reusable, follows the global style,
does not create a complete scene, and has explicit written justification.
Beauty or novelty alone is insufficient.

#### Cross-category Rules

##### Environment

Environment receives the strongest treatment through materials, construction,
props, surfaces, practical lights, and restrained atmosphere.

##### Hazards

Preserve footprint, boundary, risk tier, and state logic. Modify only material
and restrained secondary detail.

##### Pickups

Preserve core silhouette, value hierarchy, attraction behaviour, and
recognition logic.

##### Enemies

Preserve archetype silhouette, proportions, posture, footprint, movement
rhythm, attack expectation, and state readability. Reject stereotype costumes
and colour-swap-only skins.

##### Player

Preserve globally stable identity, permanent recognition anchors, proportions,
facing logic, equipment attachment points, and hitbox perception. City accents
remain optional and restrained.

##### Attacks & Projectiles

Preserve ownership, direction, footprint, timing, attack type, collision
perception, and power hierarchy.

##### VFX

Preserve gameplay function, ownership, timing, footprint, intensity tier, and
accessibility. City motifs remain abstract, secondary, and removable.

##### Lighting

Preserve global directional grammar, road readability, gameplay colours,
ownership, and danger meaning.

##### World-space UI & HUD

Preserve information meaning, component geometry, hierarchy, placement, icon
language, target association, interaction meaning, localisation, and
accessibility. Use only restrained optional accents.

#### Repetition & Bounded Variation

Control repetition through bounded variation in attachments, material,
orientation, surface pattern, condition or wear, restrained palette adjustment,
minor silhouette accents, spacing, and procedural arrangement. Random
variation stays within the approved city kit and never introduces mixed-city
contamination.

#### Mixed-city Contamination Prevention

Every city-skin prompt declares the active city, approved identity pillars,
permitted cues, prohibited cues, foreign-city exclusions, protected global
gameplay characteristics, allowed treatment strength, time-of-day treatment,
and accessibility requirements.

Assets from one city must not inherit unrelated materials, motifs,
architecture, palette logic, or cultural cues from another city.

#### Prompt Inheritance Order

```text
Global Rules → Asset Category → Gameplay Variant → City Identity Pillars → City Skin → Time of Day → State → Technical Output → Acceptance Criteria
```

Gameplay category and function always precede city treatment. If city identity
conflicts with readability, accessibility, modularity, or gameplay meaning,
weaken or remove the city treatment.

#### Relationship with `CITY_KITS.md`

The Prompt Bible defines the reusable global city-skin grammar.
`CITY_KITS.md` owns approved city-specific identity pillars and production
parameters. This module does not hardcode final Mumbai or Jaisalmer identity
kits; those cities may appear only as non-binding examples if required. Actual
city-kit production begins after the Prompt Bible Freeze Audit.

#### Technical Output Rules

City-skinned assets inherit their relevant Prompt Bible category module, the
frozen Art Bible, the Technical Asset Contract, naming and metadata conventions,
and accessibility requirements.

The process must not change output dimensions, alpha behaviour, padding,
pivots, anchor points, slicing logic, scale, perspective, orientation, frame
consistency, or metadata schema unless an explicitly approved technical variant
requires it. City skins remain modular, isolated, and transparent-background
where the underlying category requires it.

#### Reusable City-skin Prompt Templates

Each template inherits Global Rules, the relevant category module, approved
identity pillars from `CITY_KITS.md`, the Technical Asset Contract, naming and
metadata conventions, and accessibility rules. Template variables are
production fields, not permission to invent final cities, colours, motifs,
landmarks, props, characters, attacks, UI designs, or production concepts.

##### Template 1: Generic City-skin Transformation

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_ASSET / ASSET_CATEGORY / GAMEPLAY_VARIANT]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [PERMITTED_CUES / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [MEANING / SILHOUETTE / FOOTPRINT / SCALE / OWNERSHIP / STATE]
Treatment Strength/Time: [ALLOWED_CITY_STRENGTH / DAY_NIGHT_STATE]
Style: Shared Masala Run grammar with researched restrained secondary city qualities
Technical Output: Preserve category output and separate skin layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No palette-swap-only result, redesign, behaviour change,
stereotype, literal landmark, mixed-city cue, scene, background, or final concept
Acceptance Criteria: City identity is researched and clear while gameplay,
category, style, accessibility, modularity, and contract compliance are preserved
```

##### Template 2: Environmental Prop City Skin

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_PROP / PROP_FAMILY / GAMEPLAY_OR_ENVIRONMENTAL_ROLE]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [MATERIAL_DETAIL_CUES / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [ROLE / PRIMARY_SILHOUETTE / FOOTPRINT / SCALE / ANCHORS]
Treatment Strength/Time: Strongest permitted; [DAY_NIGHT_STATE]
Style: Researched material, construction, surface, and minor accent transformation
Technical Output: Isolated base-compatible prop skin; [CONTRACT_REQUIREMENTS]
Negative Constraints: No new gameplay role, prop-family change, landmark object,
stereotype, unrelated culture, complete scene, background, or final prop concept
Acceptance Criteria: Pillar support, prop recognition, bounded variation,
mobile readability, procedural reuse, accessibility, and contract compliance are clear
```

##### Template 3: Modular Micro-cluster City Skin

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_CLUSTER / CLUSTER_ROLE / GAMEPLAY_VARIANT]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [MATERIAL_PROP_RHYTHM_CUES / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [FOOTPRINT / DENSITY / EDGE_PROFILE / ANCHORS / SAFE_SPACE]
Treatment Strength/Time: Strongest permitted; [DAY_NIGHT_STATE]
Style: Shared procedural cluster grammar with bounded researched city variation
Technical Output: Isolated separable members/attachments; [CONTRACT_REQUIREMENTS]
Negative Constraints: No handcrafted scene, unique narrative composition,
mixed-city prop, landmark cluster, stereotype, background, or final arrangement
Acceptance Criteria: City rhythm, modularity, footprint, repetition control,
procedural safety, accessibility, and contract compliance are clear
```

##### Template 4: Frontage or Architectural City Skin

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_FRONTAGE_OR_ELEMENT / ARCHITECTURAL_ROLE / VARIANT]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [CONSTRUCTION_MATERIAL_RHYTHM / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [PRIMARY_MASS / FOOTPRINT / SCALE / EDGE_ZONE / ATTACHMENTS]
Treatment Strength/Time: Strongest permitted; [DAY_NIGHT_STATE]
Style: Ordinary researched construction logic with restrained landmark echoes only
Technical Output: Isolated modular frontage/element skin; [CONTRACT_REQUIREMENTS]
Negative Constraints: No literal landmark, tourist-poster facade, complete street,
stereotype ornament, mixed architecture, background, or final building concept
Acceptance Criteria: Pillar credibility, shared style, silhouette/footprint,
modular assembly, mobile readability, and contract compliance are preserved
```

##### Template 5: Road Base or Safe-overlay City Skin

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_ROAD_OR_OVERLAY / ROAD_ROLE / GAMEPLAY_VARIANT]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [MATERIAL_SURFACE_CUES / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [DRIVABLE_AREA / SAFE_BOUNDARY / DIRECTION / SCALE / TILE_LOGIC]
Treatment Strength/Time: Strongest permitted; [DAY_NIGHT_STATE]
Style: Controlled local material/surface contribution inside shared road grammar
Technical Output: Seamless isolated base/overlay skin; [CONTRACT_REQUIREMENTS]
Negative Constraints: No false hazard/path/ownership, changed road width,
landmark art, palette-only identity, mixed-city surface, scene, or background
Acceptance Criteria: Road and safe-space meaning, tiling, direction, city cue,
night fairness, accessibility, and contract compliance are preserved
```

##### Template 6: Gameplay-object City Skin

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_HAZARD_PICKUP_OR_GAMEPLAY_OBJECT / GAMEPLAY_VARIANT]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [SECONDARY_MATERIAL_DETAIL / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [CATEGORY / VALUE_OR_RISK / SILHOUETTE / FOOTPRINT / STATE / BEHAVIOUR]
Treatment Strength/Time: Moderate or lower; [DAY_NIGHT_STATE]
Style: Secondary removable city detail beneath fixed gameplay recognition
Technical Output: Isolated base-compatible state variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No category/value/risk change, behaviour variant disguised
as skin, colour-only identity, stereotype, landmark, mixed-city cue, or final object
Acceptance Criteria: Gameplay recognition precedes city identity; footprint,
states, accessibility, procedural reuse, and contract compliance are preserved
```

##### Template 7: Character or Enemy City Skin

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_CHARACTER_OR_ENEMY / ARCHETYPE / GAMEPLAY_VARIANT]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [RESTRAINED_MATERIAL_ACCENTS / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [IDENTITY / ARCHETYPE / PROPORTIONS / POSTURE / FOOTPRINT / FACING / ATTACK_EXPECTATION]
Treatment Strength/Time: [RESTRAINED_OR_MODERATE_ALLOWED_STRENGTH / DAY_NIGHT_STATE]
Style: Stable global character grammar with optional researched secondary accents
Technical Output: Isolated animation/attachment-compatible skin; [CONTRACT_REQUIREMENTS]
Negative Constraints: No stereotype costume, caricature, colour-swap-only skin,
archetype or hitbox change, mixed-city cue, final character, scene, or background
Acceptance Criteria: Identity/archetype, motion and attack readability, anchors,
accessibility, modular animation, and contract compliance are preserved
```

##### Template 8: Attack, VFX or Lighting City Treatment

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_ATTACK_VFX_OR_LIGHT / FUNCTION / GAMEPLAY_VARIANT]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [ABSTRACT_SECONDARY_CUES / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [OWNERSHIP / DIRECTION / FOOTPRINT / TIMING / POWER_OR_INTENSITY / DANGER]
Treatment Strength/Time: Restrained, moderate only for approved ambient treatment; [DAY_NIGHT_STATE]
Style: Shared functional grammar with abstract removable city influence
Technical Output: Separate base/effect/light/skin layers; [CONTRACT_REQUIREMENTS]
Negative Constraints: No changed ownership/danger/timing/footprint, motif-led
telegraph, literal symbol, glow excess, mixed-city cue, scene, or final attack
Acceptance Criteria: Function and gameplay grammar dominate; city restraint,
accessibility, day/night fairness, modularity, and contract compliance are clear
```

##### Template 9: World-space UI or HUD City-accent Treatment

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_WORLD_SPACE_UI_OR_HUD_COMPONENT / INFORMATION_FUNCTION]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [OPTIONAL_ACCENT_CUES / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [MEANING / GEOMETRY / HIERARCHY / PLACEMENT / ICON / ASSOCIATION / INTERACTION]
Treatment Strength/Time: Restrained or minimal; [DAY_NIGHT_STATE]
Style: Optional secondary accent within fixed global information grammar
Technical Output: Separate removable accent layer; [CONTRACT_REQUIREMENTS]
Negative Constraints: No changed meaning/colour/placement/icon, stereotype,
literal landmark, fragile detail, mixed-city cue, complete UI layout, or final design
Acceptance Criteria: Meaning, localisation, target/action association,
accessibility, removal safety, global grammar, and contract compliance are preserved
```

##### Template 10: Day/Night or Cross-city Consistency Variant

```text
Prompt Metadata: [PROMPT_ID / TITLE / VERSION / STATUS / CONTRACT_VERSION / CITY_KIT_VERSION]
Base Asset/Category: [BASE_ASSET / ASSET_CATEGORY / GAMEPLAY_VARIANT]
Active City/Pillars: [ACTIVE_CITY / APPROVED_IDENTITY_PILLARS]
Permitted/Prohibited/Foreign Cues: [PERMITTED_CUES / PROHIBITED_CUES / FOREIGN_CITY_EXCLUSIONS]
Protected Gameplay Characteristics: [MEANING / CATEGORY / SILHOUETTE / FOOTPRINT / OWNERSHIP / STATE / ACCESSIBILITY]
Treatment Strength/Time: [ALLOWED_CITY_STRENGTH / DAY_OR_NIGHT / CROSS_CITY_COMPARISON]
Style: Same global/category structure with controlled city and time separation
Technical Output: Isolated matched comparison variants; [CONTRACT_REQUIREMENTS]
Negative Constraints: No structural night redesign, palette inversion, harder
night, cross-city contamination, enlarged/luminous variant, scene, or final concept
Acceptance Criteria: Each city remains distinct without contamination while
gameplay, shared style, day/night fairness, reuse, and contract compliance remain identical
```

#### Acceptance Criteria

Accept city-skin output only when it:

1. Communicates the intended city through researched secondary qualities.
2. Preserves gameplay meaning and category recognition.
3. Preserves the global Masala Run shape, style, and gameplay colour grammar.
4. Preserves silhouette, footprint, scale, ownership, direction, timing, and state where applicable.
5. Preserves perceived hitbox, anchors, movement, animation, and interaction meaning.
6. Preserves accessibility and multi-cue communication without colour dependence.
7. Preserves technical compatibility, category output rules, naming, and metadata.
8. Remains readable at the high bird’s-eye mobile gameplay scale.
9. Remains modular, isolated where required, and procedurally reusable.
10. Uses restrained treatment appropriate to the category and allows no mandatory decoration.
11. Uses three to five researched pillars and avoids stereotypes and literal landmarks.
12. Preserves day/night gameplay meaning, recognition, accessibility, and fairness.
13. Prevents mixed-city contamination and respects foreign-city exclusions.
14. Remains valid when decorative city layers are reduced or removed.
15. Complies with the relevant category module and Technical Asset Contract.

#### Rejection Criteria

Reject or redesign output that:

* changes gameplay meaning, category, role, behaviour, state, timing, or recognition
* alters ownership, danger, rarity, warning, interaction, footprint, or perceived hitbox
* replaces the shared art style or depends on colour alone
* uses literal landmarks, caricatures, stereotypes, tokenism, or random cultural decoration
* resembles tourist-poster art or hardcodes a complete city scene
* bakes backgrounds or unrelated assets or introduces excessive fragile detail
* reduces mobile readability, accessibility, modularity, or procedural reuse
* creates inconsistent day/night structures, luminous enlargement, or harder night readability
* introduces mixed-city materials, motifs, architecture, palettes, or cultural cues
* uses city-exclusive assets without documented pillar-based justification
* disguises a gameplay variant as a city skin
* excessively redesigns the player, attacks, UI, functional VFX, or critical telegraphs
* prioritizes authenticity, charm, novelty, or beauty over gameplay clarity
* changes technical dimensions, alpha, padding, pivots, anchors, slicing, scale,
  perspective, orientation, framing, or metadata without an approved variant
* contradicts the Art Bible, Prompt Bible hierarchy, category module, or Technical Asset Contract

#### Module Status & Roadmap

```text
Completed
→ Environmental Props
→ Modular Micro-Clusters
→ Frontage & Architectural Elements
→ Road Bases & Safe Road Overlays
→ Gameplay Hazards
→ Pickups & Rewards
→ Enemies
→ Player
→ Attacks & Projectiles
→ VFX
→ Lighting & Shadow Overlays
→ World-space UI
→ HUD
→ City-skin Framework
→ Prompt Bible Freeze Audit

Prompt Bible Status
→ Frozen
```

#### Post-freeze Production Roadmap

1. Complete freeze verification and version tagging.
2. Define and review Mumbai identity pillars in `CITY_KITS.md`.
3. Define and review Jaisalmer identity pillars.
4. Create category-specific production asset briefs.
5. Generate a limited pilot asset set.
6. Validate pilot assets against the Art Bible, Prompt Bible, and Technical
   Asset Contract.
7. Integrate pilot assets into the game.
8. Refine the production pipeline before scaling.

## 8. City-Skin Modules

City modules are production-ready translations of the approved City Identity
Framework.

Each city module should contain:

* 3-5 approved identity pillars
* materials
* silhouette and frontage language
* road and boundary treatment
* everyday street-culture cues
* restrained prop language
* palette skin
* lighting flavour
* audio or ambience notes where relevant
* controlled motif or pattern accents
* stereotype risks
* landmark-dependence risks
* approved shared assets, skins and justified unique anchors

Global templates must remain city-neutral.

Do not use Mumbai as the default template for every future city.

City identity must emerge through multiple restrained cues rather than one
landmark, food, vehicle, colour or cultural symbol.

## 9. Day/Night Modules

Time of day is a controlled inherited treatment, not a completely separate
prompt system.

Day and night must retain:

* the same asset identity
* the same gameplay meaning
* the same structural form
* the same city identity pillars
* the same accessibility logic
* the same procedural compatibility

Night modules may change:

* value range
* restrained palette mood
* localized practical lights
* selected lighting overlays
* practical-light variants
* ambience flavour
* controlled highlights
* shadow treatment where relevant

Night modules must explicitly protect:

* player visibility
* enemy readability
* hazard readability
* pickup readability
* gameplay colour ownership
* road-centre stability
* road-boundary clarity
* mobile readability

Do not reduce night prompts to "make it darker."

Do not allow dramatic cinematic lighting, large glow pools or
gameplay-obscuring shadows.

## 10. Reference-Image Protocol

Reference images are subordinate to written project rules.

Every reference must be labelled with its exact purpose.

Example reference labels:

```text
Reference A
→ silhouette only

Reference B
→ awning construction only

Reference C
→ material cue only

Reference D
→ palette mood only
```

State what must not be copied when necessary.

References must not:

* redefine the Masala Run style
* override the Art Bible
* introduce realism
* introduce complete-scene composition
* introduce unwanted landmarks or stereotypes
* cause uncontrolled stylistic blending

A small labelled reference set is preferred over many unstructured references.

## 11. Technical Asset Contract Integration

Technical requirements must appear in a dedicated final prompt section.

Applicable requirements may include:

* file type
* canvas size
* transparent background
* alpha behaviour
* crop rules
* padding
* isolation
* orientation
* pivot expectations
* left/right variants
* asset bounds
* naming
* metadata
* export requirements

The Technical Asset Contract remains authoritative for technical integration.

Do not duplicate or rewrite the entire Technical Asset Contract inside the Prompt
Bible.

Define how applicable technical requirements are inserted into production
prompts.

## 12. Variation Protocol

Variation must remain controlled around an approved brief.

Approved variation dimensions may include:

* optional attachments
* minor proportion changes
* controlled accent-colour changes
* wear level
* crop
* orientation
* left/right treatment
* selected lighting state
* small procedural-safe scale changes

Variations must not change:

* gameplay category
* gameplay meaning
* visual-priority tier
* core silhouette identity
* approved city identity pillars
* style language
* technical compatibility

Do not ask for many wildly unrelated concepts inside one production batch.

## 13. Prompt Metadata & Versioning

Required prompt metadata:

```text
Prompt ID
Prompt Title
Prompt Category
Gameplay / Environmental Role
Visual-Priority Tier
Version
Status
Art Bible Version
Prompt Bible Version
City-Kit Version, when applicable
Technical Asset Contract Version
Last Approved Date
Change Summary
Owner / Approver, where applicable
```

Reusable templates and production prompts should both be versioned.

Old prompts must not be silently overwritten without a change record.

Suggested statuses:

```text
Draft
In Review
Approved
Deprecated
Rejected
```

## 14. Prompt Review Checklist

Before generation, every prompt should be reviewed in this order:

1. Does it preserve the approved gameplay meaning?
2. Does it follow the global priority hierarchy?
3. Is the gameplay or environmental role explicit?
4. Is the visual-priority tier explicit?
5. Does it request a modular production asset rather than a complete scene?
6. Is the asset category clear?
7. Does it follow the approved Style & Shape Language?
8. Are city cues restrained and based on multiple approved identity pillars?
9. Does it avoid stereotypes and landmark dependence?
10. Does day/night treatment preserve gameplay fairness?
11. Are reference-image purposes explicit?
12. Are applicable technical requirements present?
13. Are negative constraints relevant and non-contradictory?
14. Are variation dimensions controlled?
15. Are acceptance criteria objectively reviewable?
16. Can the prompt be reused or scaled without rewriting the project foundations?

## 15. Rejection & Escalation Rules

Reject or revise any prompt that:

* contradicts the Art Bible
* weakens gameplay clarity
* weakens accessibility or comfort
* breaks modular or procedural production
* depends on the model inferring gameplay role
* lacks an explicit visual-priority tier
* asks for a complete painted environment
* combines too many unrelated production assets
* requests excessive detail or texture
* allows environmental assets to resemble gameplay objects
* allows city flavour to override gameplay meaning
* relies primarily on landmarks or stereotypes
* uses generic tourism-poster treatment
* creates a completely separate night identity
* contains contradictory creative and technical instructions
* uses unlabelled references
* requests uncontrolled variation
* lacks measurable acceptance criteria
* cannot be connected to an approved Art Bible rule

When a prompt exposes an unresolved Art Bible or Technical Asset Contract issue,
escalate the conflict rather than inventing a rule.

## 16. Production Prompt Templates

Production prompt templates demonstrate structure and inheritance placeholders
only.

They must not be populated with final Mumbai, Jaisalmer, or asset-specific
content in this frozen global framework.

### Template: Isolated Gameplay Asset

```text
Prompt Metadata:
[Prompt ID / Title / Category / Version / Status]

Inherited Modules:
[Global Rules]
[Asset-Category Module: player / enemy / pickup / hazard / attack / projectile]
[City-skin Framework, if applicable]
[Day/Night Module, if applicable]
[Technical Asset Contract]

Asset Purpose:
[What the asset is for]

Gameplay or Environmental Role:
[Gameplay meaning and category]

Visual Priority:
[Tier declaration and why]

Shape and Style:
[Silhouette, outline, proportion, fills, detail limits]

City Treatment:
[City skin or none]

Time-of-Day or Lighting Treatment:
[Day/night treatment or none]

Composition and Isolation Requirements:
[Isolation, background, crop, orientation]

Technical Output Requirements:
[Applicable Technical Asset Contract requirements]

Negative Constraints:
[Global and category-specific exclusions]

Review Target / Acceptance Criteria:
[Objective checks before generation and after review]
```

### Template: Environmental Prop

```text
Prompt Metadata and Inherited Modules:
[Required metadata]
[Global Rules]
[Environmental Props Prompt Module]
[City-skin Framework]
[Day/Night Module, if applicable]
[Technical Asset Contract]

1. Asset Role and Tier 4 Declaration:
[Declare one isolated, decorative, non-interactive Tier 4 environmental prop
subordinate to gameplay objects]

2. Specific Object Identity:
[Name and briefly define the single prop; do not describe an asset catalogue]

3. Intended Edge Placement:
[Non-playable left or right edge zone and any applicable side awareness]

4. Silhouette and Proportion Requirements:
[Gameplay-distance recognition, moderately simplified outer silhouette, one or
two identifying forms, slightly exaggerated world-native proportions]

5. Shape-Language Requirements:
[Mostly rounded stable masses, controlled asymmetry, only useful structural
accents]

6. Detail-Density Limits:
[Approximately two to four meaningful internal cues and their purposes]

7. Fill, Shading and Outline Rules:
[Flat fills, at most one simple shade/highlight/accent layer, soft outline,
Tier 4 visual quietness]

8. Material Abstraction:
[Real-world material plus its simplified flat-cartoon treatment]

9. City-Skin Instructions:
[One or two restrained cues from approved city identity pillars]

10. Pattern or Motif Limits:
[One small structurally natural area, if needed; low density and subordinate]

11. Camera and Orientation:
[Approved high bird’s-eye camera, slight recognition-oriented tilt, applicable
orientation]

12. Isolation and Transparent-Output Instructions:
[Complete single object, transparent background, safe padding, predictable
framing, no clipping]

13. Ground and Shadow Restrictions:
[No baked surface or environmental base; tightly contained contact shadow only
when the module and Technical Asset Contract allow it]

14. Category-Confusion Negatives:
[Explicitly prohibit resemblance to every gameplay and UI category listed in the
Environmental Props Prompt Module]

15. Global Negative Inheritance:
[Inherit global exclusions plus all mandatory environmental-prop negatives]

16. Technical Asset Contract Inheritance:
[Insert only the applicable authoritative output, canvas, naming, orientation,
pivot, padding, metadata, variant, side-awareness, and path requirements]

17. Acceptance Criteria:
[Apply the ordered environmental-prop acceptance criteria and rejection rules]
```

### Template: Modular Micro-Cluster

```text
Prompt Metadata and Inherited Modules:
[Required metadata]
[Global Rules]
[Environmental Props Prompt Module]
[Modular Micro-Clusters Prompt Module]
[City-skin Framework]
[Day/Night Module, if applicable]
[Technical Asset Contract]

1. Asset Role:
[Declare one isolated, decorative, non-interactive Tier 4 environmental
micro-cluster for procedural edge placement, subordinate to gameplay]

2. Cluster Idea:
[State the one environmental idea; do not describe a mini-scene or catalogue]

3. Primary Anchor:
[Name the single approved anchor that defines the cluster identity]

4. Approved Attachments:
[List the controlled attachment pool, allowed combination, minor elements, and
prohibited additions]

5. Internal Hierarchy:
[Anchor > supporting attachments > minor accessories; approximately three to six
visible components without competing anchors]

6. Density and Breathing Space:
[Sparse-to-medium density, readable separation, selective overlap, no clutter or
accidental gaps]

7. Camera and Orientation:
[Approved high bird’s-eye camera, slight recognition-oriented tilt, road-facing
direction, and intentional left/right or universal treatment]

8. Road-Facing Behaviour:
[Acknowledge the road where natural while remaining outside it, non-interactive,
and boundary-safe]

9. Style and Shape Language:
[Inherited flat-cartoon style, silhouette readability, softened outline,
moderate detail, and prohibited rendering treatments]

10. Colour and City Skin:
[One or two restrained approved city cues, muted palette, controlled accents,
and no gameplay-colour confusion]

11. Day or Night State:
[Preserve structure and footprint; declare only approved controlled lighting or
palette treatment]

12. Isolation, Alpha and Crop Requirements:
[Transparent isolated composition, safe padding, complete default output, or
explicit intentional crop direction and purpose]

13. Repetition Variant Requested:
[Choose only approved attachment, orientation, colour, lighting, crop, scale, or
spacing variation while preserving family identity]

14. Technical Inheritance:
[Insert applicable authoritative dimensions, pivots, alpha, padding, cropping,
naming, export, metadata, bounds, and file-path requirements]

15. Category-Confusion Negatives:
[Inherit global and environmental-prop negatives and explicitly prohibit every
gameplay, interaction, UI, scene, ground, clutter, and crop confusion listed in
the Modular Micro-Clusters Prompt Module]

16. Acceptance Criteria:
[Apply the ordered micro-cluster acceptance hierarchy and immediate rejection
rules]
```

### Template: Road Base or Overlay

```text
Prompt Metadata and Inherited Modules:
[Required metadata and versioning]
[Global Rules]
[Road Bases & Safe Road Overlays Prompt Module]
[City-skin Framework, if applicable]
[Day/Night Module, if applicable]
[Technical Asset Contract]

Asset Category:
[ROAD_BASE or SAFE_ROAD_OVERLAY; never combine categories]

Asset Purpose and Environmental Role:
[Foundational gameplay canvas or passive non-actionable surface variation]

Visual Priority:
[Lowest Tier 5 environmental sublayer beneath frontage]

Road Material / Overlay Identity:
[One dominant road material or one passive overlay treatment]

Road-Centre and Placement-Zone Rules:
[Centre, outer-band, or boundary-adjacent eligibility and required quietness]

Camera and Orientation:
[Approved top-down survivors-like arena orientation; no forward-runner framing]

Positive Visual Instructions:
[Broad flat-cartoon forms, restrained material identity, extremely low noise,
minimal outline, and applicable cue limit]

City-Skin Instructions:
[Shared road grammar plus restrained city material flavour]

Time-of-Day Treatment:
[Same structural asset with controlled mood; no localized light baked in]

Passive-versus-Actionable Separation:
[Explicit hazard, pickup, path, spawn, objective, interaction, and instruction
confusion protections]

Modularity and Procedural Use:
[Assembly role, repetition-disguise plan, placement eligibility, and neighbour
independence]

Allowed Variation:
[Only approved crop, opacity, scale, rotation, placement-zone, spacing,
city-material, or wear variations; state directional restrictions]

Isolation and Transparency:
[For overlays: isolated passive variation with required alpha and no sample
context; for bases: preserve contract-governed format]

Technical Output Requirements:
[Insert only applicable authoritative dimensions, format, alpha, padding,
naming, metadata, orientation, bounds, and export requirements]

Negative Constraints:
[Inherit global negatives and all road-base / safe-overlay rejection rules]

Reference Images, if used:
[Label each reference purpose and prohibited carry-over]

Acceptance and Rejection Criteria:
[Apply the ordered module hierarchy and rejection conditions]
```

### Template: Frontage Asset

```text
Prompt Metadata and Inherited Modules:
[Required metadata]
[Global Rules]
[Frontage & Architectural Elements Prompt Module]
[City-skin Framework]
[Day/Night Module, if applicable]
[Technical Asset Contract]

1. Asset Role and Tier 5 Declaration:
[Declare one passive, non-gameplay Tier 5 cropped modular architectural segment
behind props and micro-clusters]

2. Specific Frontage Identity:
[FRONTAGE_IDENTITY]

3. Architectural Idea:
[ARCHITECTURAL_IDEA: one readable idea only]

4. Intended Left/Right Edge Placement:
[EDGE_SIDE]

5. Segment Scale:
[Approximately one to three broad bays or equivalent simple rhythm]

6. Crop and Continuation Behaviour:
[CROP_BEHAVIOUR: complete bounds, deliberate off-canvas continuation, and
accidental-clipping exclusions]

7. Broad Silhouette and Massing:
[Primary quiet architectural masses and simplified outer silhouette]

8. Opening Rhythm:
[OPENING_RHYTHM: sparse large doors, shutters, windows, or arches]

9. Structural Features:
[STRUCTURAL_VARIANT and selected supporting architectural features]

10. Fixed Attachment Limits:
[FIXED_FEATURES: inseparable fixtures only; exclude freestanding props and
micro-clusters]

11. Shallow-Depth Restriction:
[No deep alley, interior, side street, or receding architectural scene]

12. Detail-Density and Outline Limits:
[Sparse meaningful detail, minimal or soft outlines, Tier 5 quietness]

13. Flat-Fill and Shading Rules:
[Flat solid fills and at most one simple shade or accent layer]

14. Simplified Material Treatment:
[MATERIAL_CUES: real material identity translated into quiet flat-cartoon cues]

15. City-Skin Instructions:
[CITY_SKIN: coordinated restrained cues within the shared frontage family]

16. Landmark and Motif Restraint:
[Only approved abstract echoes; no literal landmark, stereotype, postcard, or
tourist treatment]

17. Signage Restrictions:
[Abstract unreadable shape-based signage only; no text, brands, logos, or
trademarks]

18. Camera and Road-Facing Orientation:
[Approved high bird’s-eye camera, slight tilt, medium survivors-style context,
shallow edge depth, and correct road-facing direction]

19. Left/Right-Awareness Rule:
[Intentional side-specific variant where direction matters; never assume
automatic mirroring]

20. Day/Night State:
[DAY_NIGHT_STATE: same architecture and city identity with controlled mood only]

21. Localized Practical-Light Rule:
[PRACTICAL_LIGHT_STATE: selected compact source and explicit spill, bloom, beam,
and road-centre limits]

22. Isolation and Transparency Requirements:
[Transparent isolated frontage segment, safe padding, no surroundings, and
intentional crop distinguished from clipping]

23. Ground, People, Prop and Scene Exclusions:
[No environmental ground, visible people, detailed interiors, separate props,
complete building, street, edge strip, or background]

24. Category-Confusion Negatives:
[Explicitly prohibit every gameplay, interaction, navigation, UI, reward, and
enterable-location confusion in the frontage module]

25. Global Negative Inheritance:
[Inherit all global exclusions and frontage rejection rules]

26. Technical Asset Contract Inheritance:
[ASSET_CONTRACT_REQUIREMENTS: insert authoritative dimensions, pivots, alpha,
padding, cropping, naming, export, metadata, bounds, and paths]

27. Acceptance Criteria:
[Apply the ordered frontage acceptance hierarchy and rejection rules]

Controlled Variation:
[CONTROLLED_VARIATION: choose only approved opening, shutter, awning, roofline,
crop, material, accent, fixed-fixture, orientation, lighting, or wear variables]
```

### Template: Lighting Overlay

```text
Prompt Metadata:
[Prompt ID / Title / Category / Version / Status]

Inherited Modules:
[Global Rules]
[Asset-Category Module: lighting or shadow overlay]
[City-skin Framework, if applicable]
[Day/Night Module]
[Technical Asset Contract]

Asset Purpose:
[Runtime-friendly lighting or shadow support]

Gameplay or Environmental Role:
[Mood support without gameplay obstruction]

Visual Priority:
[Tier declaration based on use]

Shape and Style:
[Soft, controlled, flat-cartoon-compatible treatment]

City Treatment:
[Restrained city lighting flavour]

Time-of-Day or Lighting Treatment:
[Day/night mood role]

Composition and Isolation Requirements:
[Overlay/isolation requirements]

Technical Output Requirements:
[Applicable Technical Asset Contract requirements]

Negative Constraints:
[No baked time-of-day scene, no glow flood, no gameplay-obscuring shadow]

Review Target / Acceptance Criteria:
[Readability, restraint, runtime compatibility, no category confusion]
```

### Template: VFX Asset

```text
Prompt Metadata:
[Prompt ID / Title / Category / Version / Status]

Inherited Modules:
[Global Rules]
[Asset-Category Module: VFX and particles]
[City-skin Framework, if applicable]
[Day/Night Module, if applicable]
[Technical Asset Contract]

Asset Purpose:
[Feedback, impact, pickup, hazard, or ambient VFX purpose]

Gameplay or Environmental Role:
[Gameplay meaning or ambient support role]

Visual Priority:
[Tier declaration]

Shape and Style:
[Flat stylized shape, short-lived readable effect language]

City Treatment:
[Optional restrained flavour]

Time-of-Day or Lighting Treatment:
[Palette-compatible treatment]

Composition and Isolation Requirements:
[Isolated VFX asset requirements]

Technical Output Requirements:
[Applicable Technical Asset Contract requirements]

Negative Constraints:
[No excessive particles, no bloom, no category confusion, no spectacle override]

Review Target / Acceptance Criteria:
[Meaning, timing, density safety, accessibility, technical readiness]
```

## 17. Prompt Bible Freeze Declaration

The Prompt Bible completed its freeze audit on 2026-07-31. All planned global,
category, interface, lighting, VFX, and city-skin framework modules are complete.
The Prompt Bible is frozen and is the production authority immediately beneath
the frozen Art Bible.

All future production prompts, city kits, and category-specific asset briefs
must derive from this frozen Prompt Bible. Generated assets and implementation
outputs may validate its rules but cannot redefine them. New creative
foundations cannot be added informally.

The post-freeze authority and production chain is:

```text
Frozen Art Bible → Frozen Prompt Bible → Technical Asset Contract → City Kit → Asset Brief → Generated Asset → Review
```

City-kit production and limited pilot asset production may now begin.

### Change Control

Changes require formal review and documented justification. Each approved
change must identify the affected rules and dependencies, assess gameplay,
accessibility, modularity, category, city-skin, and technical impact, record an
approver and change summary, update the Prompt Bible version/status metadata,
and update affected governance and dependent production documentation.

Technical implementation findings may clarify this document but cannot
silently alter frozen creative principles. When technical constraints conflict
with a frozen creative rule, document and escalate the conflict under the
authority order rather than changing the rule implicitly.
