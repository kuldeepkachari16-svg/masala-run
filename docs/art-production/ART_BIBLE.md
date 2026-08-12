# Art Bible

Version: 1.0
Status: Frozen
Freeze Date: 2026-07-23
Next Production Phase: Prompt Bible authoring

Post-Freeze Change Control:
- The frozen Art Bible may be changed only through an explicit creative review.
- A change must identify the affected chapter and rule.
- A change must explain why the existing rule is insufficient.
- A change must assess cross-chapter impact.
- A change must assess gameplay, accessibility and modularity impact.
- A change must be deliberately approved.
- A change must update the relevant decision log or governance record.
- Prompt results, generated images, implementation convenience, individual asset
  needs or production pressure must never silently redefine the Art Bible.

## Art Bible Authority & Global Principles

The Art Bible is the highest creative authority for Masala Run.

The Prompt Bible derives from the Art Bible.

The Technical Asset Contract governs runtime capability, technical integration,
and what the shipped implementation can consume.

Document authority model:

```text
Art Bible
→ Prompt Bible
→ Technical Asset Contract
```

The Technical Asset Contract governs runtime integration but must not redefine
approved creative intent.

Masala Run remains a top-down survivors-like mobile game.

Gameplay readability is the primary creative requirement.

Modularity and procedural compatibility are mandatory production requirements.

Every asset and system must satisfy both gameplay readability and
modular/procedural viability.

Assets must remain modular, reusable and procedurally compatible.

AI generates modular assets, not complete painted backgrounds.

Generated images may validate approved rules but may never redefine them.

The environment supports gameplay and never competes with it.

Day and night use the same gameplay language with different mood treatments.

Cities may skin gameplay meaning but may not redefine it.

Important gameplay communication should not depend on only one sensory cue.

Global priority hierarchy:

```text
Gameplay clarity
> accessibility and comfort
> modular and procedural viability
> gameplay-category recognition
> responsiveness and feedback
> city identity
> charm and personality
> beauty and spectacle
```

Chapter-specific review hierarchies may extend this global hierarchy, but they
must not contradict it.

Global cross-system consistency rule:

```text
Same gameplay meaning
→ same readability, timing and urgency logic

Different city
→ different restrained material, palette, motif, lighting and audio flavour
```

Night changes mood, not gameplay fairness.

Accessibility logic remains consistent across cities and times of day.

Visual, animation, feedback, audio, haptic and accessibility systems inherit the
same gameplay-first hierarchy.

Medium-specific chapters retain their specialised rules.

The Art Bible may define creative constraints that affect production, but it
does not replace gameplay code, rendering implementation, runtime systems, input
systems, procedural algorithms, platform integration, metadata schemas, or the
Technical Asset Contract.

Technical implementation belongs in the relevant technical documents.

## Art Bible Freeze Criteria

The Art Bible may be frozen only when:

* no foundational creative chapter remains unresolved
* chapter authority and priority are unambiguous
* no approved chapters contradict one another
* every chapter has a clear scope boundary
* gameplay readability remains protected
* modularity and procedural assembly remain mandatory
* cross-city and day/night logic are consistent
* accessibility remains reliable across every medium
* each chapter can be translated into Prompt Bible rules
* principles can be understood without relying on generated images
* future cities can use the system without rewriting its foundations

The Art Bible satisfies these criteria as of the Freeze Date above and is the
stable creative authority for Prompt Bible production.

## Part I — Design Philosophy

### Chapter 1 — Core Visual Identity

The core visual identity is governed by Art Bible Authority & Global Principles
and expressed through the approved chapters that follow.

Masala Run's identity is gameplay-first, readable, modular, warm, playful,
mobile-appropriate, and city-skinnable without changing gameplay meaning.

### Chapter 2 — Gameplay Readability

Gameplay readability is governed globally and reinforced by every approved
chapter.

The player, threats, hazards, pickups, attacks, movement boundaries, UI,
feedback, audio, haptics, accessibility cues, road, edges, and city identity must
preserve the global gameplay-first hierarchy.

### Chapter 3 — Camera & Composition

#### Purpose

Camera and composition define the visual hierarchy of Masala Run.

The chapter protects the approved priority order:

1. Playable arena.
2. Gameplay readability.
3. Environmental identity.

The environment MUST support gameplay. It MUST NOT compete with gameplay.

#### Visual Hero

The playable arena is the visual hero of every frame.

Player movement, enemies, pickups, hazards, and moment-to-moment combat exist
within this arena. Every other visual element MUST support the readability of the
arena.

Environmental detail MAY communicate place, but it MUST NOT attract more
attention than the playable area.

#### Camera

Masala Run uses a high bird's-eye camera.

The camera MUST support a top-down Survivors-style view where gameplay
information remains immediately readable.

#### Viewing Angle

The viewing angle is primarily top-down.

A slight perspective tilt is allowed only to improve object recognition.

#### Perspective

Perspective exists to improve recognition, never spectacle.

Perspective MUST remain restrained. It MUST NOT reduce gameplay clarity, distort
the readable arena, or make the environment visually dominant.

#### Zoom

Masala Run uses a medium Survivors-style zoom.

The zoom MUST provide enough visibility for tactical gameplay. City identity
SHOULD remain recognizable without becoming the focus.

#### Gameplay Arena

The gameplay arena is the central compositional priority.

The road is the primary gameplay canvas. It is where player movement, enemies,
pickups, hazards, and combat are read.

Gameplay readability MUST always take priority over visual complexity.

#### Playable Area

The playable arena occupies approximately 76-80% of the screen width.

The environment occupies approximately 20-24% of the screen width.

Environmental visual presence is achieved through edge props and frontage
positioned partly off-screen where useful so they visually bleed inward without
competing with gameplay.

Edge assets MUST tolerate cropping. No essential silhouette, face, or identifying
feature should be placed in the outer half of a cropped cluster.

Arena width SHOULD remain stable so the playable space stays consistent and
readable.

#### Road Philosophy

The road is the primary gameplay canvas.

By default, the road SHOULD remain clean and readable. Hazards MAY occupy the
road where gameplay requires, including harder levels.

Hazards MUST read as gameplay information. They MUST NOT become decorative
clutter.

#### Environment Role

The environment exists to communicate place, not attract attention.

Environment elements SHOULD establish city identity through subtle, recognizable
cues. They MUST frame gameplay rather than compete with it.

#### Edge Philosophy

The approved composition is:

```text
Edge → Road → Edge
```

Footpaths belong to the environment, not the playable arena.

Players MAY move right up to the playable edge.

Left and right edges SHOULD remain intentionally asymmetrical. Edge density
SHOULD feel alive without becoming visually busy.

#### World Continuation

The world SHOULD appear to continue naturally beyond the visible screen.

Masala Run uses a one-screen-wide vertical corridor. The camera scrolls
vertically only.

World continuation comes from top/bottom scrolling and cropped left/right edge
elements.

There is no horizontal camera movement or horizontal environment reveal.

Edges frame the arena. They MUST NOT imply that the world ends at the screen
boundary.

#### Gameplay Readability

Gameplay readability always overrides visual complexity.

No camera, zoom, road, edge, or environment decision may reduce the player's
ability to read gameplay clearly.

#### Composition Priorities

Composition MUST preserve the following order:

1. Keep the playable arena as the visual hero.
2. Keep the road readable as the primary gameplay canvas.
3. Preserve stable arena width.
4. Keep environment edges secondary.
5. Use asymmetrical edge composition.
6. Allow the world to feel larger than the visible screen.

#### Implementation Notes (Non-Normative)

This section is explanatory only.

This chapter should be interpreted as a framing and priority specification for
engineers, prompt writers, and reviewers.

It does not define asset style, city identity, prop design, color palettes, or
technical implementation.

When reviewing prompts, assets, or compositions, the intended reading order is:
playable arena first, gameplay readability second, environmental identity third.

### Chapter 4 — Edge Architecture

#### Purpose

Edge Architecture defines how the left and right environmental boundaries of Masala Run are constructed.

Edges exist to frame the playable road, signal the non-playable limit, express city identity lightly, and preserve gameplay readability.

Edges are not runner-style forward segments. They do not imply one-way movement, upcoming chunks, or progression down a track.

Masala Run remains a top-down survivors-like game. The player can move freely within the playable road/arena, while the environment sits along the left and right sides as a supporting visual frame.

#### Core Composition

The base composition is:

LEFT EDGE | PLAYABLE ROAD / ARENA | RIGHT EDGE

There are no top and bottom edge systems in the primary composition model.

The road remains the primary gameplay canvas. The left and right edges are non-playable environmental boundaries.

Players may move right up to the edge, but not beyond it.

#### Boundary Philosophy

Every left/right edge must include a subtle but readable boundary cue between the playable road and the non-playable environment.

The boundary should feel native to the city, not like an artificial game wall.

Examples:

* Mumbai: curb, footpath step, drainage line, painted road edge.
* Jaisalmer: stone lip, sand-to-road color shift, low platform edge.
* Future cities: locally appropriate separators.

The player should intuitively understand: “I can move up to here, but not beyond.”

There should be no invisible boundary and no harsh game-wall boundary.

#### Shallow Layered Edge

Masala Run edges should be shallow layered strips.

Base layer order:

PLAYABLE ROAD
→ Boundary cue layer
→ Ground / footpath layer
→ Prop cluster layer
→ Frontage / background layer
→ Offscreen continuation

The edge may suggest depth, but it must not become visually deep.

The edge should never feel like a second gameplay area, a detailed diorama, or a painted environment scene.

#### Intentional Asymmetry

Left and right edges should be intentionally asymmetrical, but never so different that one side steals attention from gameplay.

Each screen view may have one slightly more active edge and one calmer edge.

The purpose of asymmetry is to avoid mirror-image artificiality, not to create spectacle.

Good:

* quiet shopfront edge | playable road | slightly active food-stall edge

Bad:

* empty edge | playable road | visually loud festival-market painting

#### Frontage / Background Layer

The frontage/background layer should suggest city identity through simplified silhouettes and broad shapes, not detailed illustration.

It should make the world feel continuous beyond the screen while remaining visually quiet.

Good:

* simple shopfront shape
* low-contrast awning
* muted balcony
* wall
* arch
* shutter

Avoid:

* detailed signboards
* readable text
* busy interiors
* many windows
* high-detail clutter

The frontage exists to identify the place lightly. It should not become the visual hero.

#### Prop Cluster Layer

Edge props should appear as small controlled clusters, not scattered noise and not dense street scenes.

Each cluster should be readable as one simple idea from gameplay distance.

Good:

* tea stall + kettle + 1 stool
* fruit cart + 2 crates
* cycle + basket
* umbrella + compact counter
* plant cluster + small wall

Bad:

* stall + chairs + utensils + many baskets + signage + people + vehicle + random extras

A prop cluster should read as one unit, not multiple competing objects.

The player should read “tea stall,” “fruit cart,” “parked cycle,” or “plant corner,” not a collection of tiny details.

#### Density Rhythm

Edge density should follow a natural rhythm.

Small controlled clusters should be separated by breathing gaps.

Spacing should feel organic, not evenly tiled, but never chaotic.

Good:

* cluster → small gap → quiet stretch → cluster → medium gap → small detail

Avoid:

* cluster → cluster → cluster → cluster
* random object → random gap → random object → dense mess

Edges should feel alive, but never busy.

#### Near Boundary, Not Intruding

Edge props may sit close to the playable boundary, but they must never visually intrude into the road or confuse the movement limit.

The road silhouette must remain clean.

Good:

* road | curb | cart close behind curb

Bad:

* cart wheel spilling into road
* stool visually inside playable space
* prop overlapping the movement boundary

#### Boundary Objects, Not Gameplay Obstacles

Edge objects should be read as part of the non-playable boundary, not as individual gameplay obstacles.

Any true obstacle inside the playable road must be designed separately as a gameplay object, not smuggled in through edge decoration.

Edge decoration:

* stall
* cart
* plant
* wall
* shopfront
* bench
* parked vehicle

Gameplay obstacle:

* pothole
* barricade
* puddle
* slowing zone
* road hazard
* enemy object

The edge must remain visually rich but mechanically clean.

#### City Identity Load

Edges should carry moderate city identity through restrained, repeatable visual cues.

They should make the city recognizable without relying on landmarks, readable text, or dense illustration.

Good:

* Mumbai: compact shopfronts, awnings, curb/drainage cues, food carts, muted local color hints.
* Jaisalmer: sandstone frontage, low platforms, jharokha-like silhouettes, desert market props.

Avoid:

* literal landmarks
* tourist-poster architecture
* dense traffic
* hyper-detailed signage
* decorative overload

The edge is responsible for city flavor, not city spectacle.

#### Landmark Echoes

Masala Run should use landmark echoes, not literal landmarks.

City identity should come from simplified architectural language, materials, colors, and street-culture cues rather than direct landmark replicas.

Good:

* Mumbai: colonial arch hints, sea-wall rhythm, local train color hints, compact shopfronts.
* Jaisalmer: sandstone arches, jharokha-inspired windows, carved wall silhouettes.

Bad:

* tiny Gateway of India on the edge
* miniature Jaisalmer Fort façade
* literal monument replicas

The world should feel charming, not like a tourism postcard.

#### Signage

Edges may include signboards and street signage, but text should be abstract, unreadable, icon-like, or shape-based.

Readable text should generally be avoided unless deliberately approved for a specific gameplay or branding reason.

Good:

* colored signboard shape
* simple food icon
* abstract strokes
* painted blocks
* non-readable shop marks

Avoid:

* clear shop names
* long readable Hindi/English text
* written jokes
* high-contrast signs that pull attention

#### Human Presence

Edges should imply human presence through objects, lighting, arrangement, and street-life props rather than visible people.

Human figures should generally be avoided in edge decoration unless later approved as a separate NPC/gameplay system.

Good:

* open stall
* tea cups
* stacked crates
* parked cycle
* lit counter
* hanging utensils
* umbrella
* half-open shutter
* small food cart
* arranged stools without people

Avoid:

* standing vendor
* sitting customers
* crowd silhouettes
* tiny pedestrians
* decorative non-interactive humans

In a survivors game, visible people can be mistaken for NPCs, enemies, rescue targets, obstacles, or interaction objects.

#### Vehicles

Vehicles may appear only as parked/static edge decoration unless specifically designed later as gameplay hazards.

Edge vehicles must remain muted, cropped or compact, and clearly outside the playable road.

Good:

* parked scooter behind curb
* cycle leaning near shopfront
* small auto tucked into edge
* partially cropped taxi outside playable area
* delivery cart as edge prop

Avoid:

* vehicle inside playable road
* large vehicle dominating the screen
* moving traffic implied as decoration
* vehicle overlapping the movement boundary

Vehicles should support city identity, not create gameplay confusion.

#### Height and Silhouette

Edges should primarily use low and medium-height silhouettes.

Tall structures should be implied through cropped frontage or background mass, not fully expressed as dominant scenery.

Good:

* low cart
* crate stack
* plant cluster
* footpath step
* shop shutter
* awning
* compound wall
* cropped balcony
* simple arch silhouette

Avoid:

* full tall building façade
* tower-like edge mass
* large vertical structure pulling attention
* environment feeling like a boxed corridor

The edge should suggest a city, not enclose the player.

#### Cropped Continuation

Edges should imply world continuation through cropped frontage, partial props, ground strips, shadows, and boundary elements that extend beyond the screen.

This continuation must remain shallow and quiet, never deep or attention-seeking.

Good:

* half-visible shopfront at screen edge
* cropped awning
* wall continuing offscreen
* partial parked scooter
* ground strip extending beyond frame
* soft shadow suggesting more city outside

Avoid:

* deep background world
* large distant scenery
* complex cityscape beyond the edge
* edge feeling more interesting than the road

#### Color and Contrast

Edges should remain low-contrast overall, with only small controlled accent colors for city identity and charm.

The playable road, player, enemies, pickups, and hazards must remain more readable than edge decoration.

Good:

* muted shopfronts
* dusty awnings
* small food-cart accents
* soft taxi/auto color hints
* warm sandstone patches
* subtle painted trims

Avoid:

* bright signboards
* high-saturation edge props
* glowing decorative colors
* edge elements brighter than gameplay objects

#### Night Edge Lighting

Night edges should use localized practical lighting from believable objects.

Light should add warmth and life, but remain tight, soft, and subordinate to gameplay readability.

Good:

* stall bulb glow
* shop interior glow
* small lantern
* window light
* tiny vehicle light hint
* warm counter light

Avoid:

* large glow pools on road
* cinematic neon
* dramatic shadows
* bright edge lighting
* beautiful lighting that competes with enemies or pickups

Night lighting should make the edge feel alive, not make the edge the hero.

#### Modularity

Edge assets should primarily be modular micro-clusters.

A modular micro-cluster is a small reusable composition that reads as one idea.

Individual props may support clusters when needed.

Full edge strips should be avoided unless explicitly approved for technical reasons.

Good:

* tea stall cluster
* fruit cart cluster
* parked scooter cluster
* shopfront cluster
* plant corner cluster
* small wall + crate cluster

Also acceptable:

* single crate
* single plant
* single pole
* single basket
* single awning

Avoid:

* long pre-painted edge strip
* full street-side illustration
* complete background scene

This protects the modular asset pipeline and procedural assembly strategy.

#### Anchor + Optional Attachments

Each edge micro-cluster should have one clear anchor object and a small set of optional supporting objects.

The anchor defines the idea. Attachments add variation without visual noise.

Good:

* anchor: tea stall; optional: kettle / stool / crate / small bulb
* anchor: parked scooter; optional: basket / wall shadow / small plant
* anchor: shopfront; optional: awning / shutter / abstract signboard / crate

Avoid:

* five unrelated objects grouped together
* cluster with no clear main idea
* random procedural pile

#### Cluster Scale

Edge micro-clusters should be small-to-medium in scale.

They must be large enough to read as a clear idea from gameplay distance, but never large enough to dominate the playable road.

Good:

* small tea stall
* compact fruit cart
* small scooter cluster
* short shopfront slice
* small plant corner
* low crate stack

Avoid:

* large marketplace setup
* big decorative building block
* oversized vehicle
* large shop scene
* edge set-piece stealing attention

#### Repetition

Reusable edge clusters may repeat, but repetition should be disguised through optional attachments, cropping, spacing rhythm, color accents, and left/right placement variation.

Good:

* same tea stall + different stool/crate/light
* same shopfront + different awning/sign shape
* same cart + different fruit/crate arrangement
* same wall + different plant/shadow/crop
* same cluster reused on opposite edge with altered spacing

Avoid:

* same exact cart repeated frequently
* identical shopfronts tiled like wallpaper
* same prop cluster mirrored left/right
* obvious procedural stamping

Rotation should be used carefully. Some assets may require left-edge and right-edge variants instead of arbitrary rotation.

#### Left / Right-Aware Variants

Important edge assets should support left/right-aware variants when perspective, shadows, cropping, or frontage direction matter.

Simple props may remain universal.

Left/right variants may be needed for:

* shopfronts
* awnings
* cropped buildings
* frontage walls
* vehicles with directionality
* lit stalls
* shadow-heavy clusters

Universal assets may be acceptable for:

* crate
* plant
* barrel
* small basket
* simple pole
* small stone
* loose ground detail

This prevents the edge from feeling like mirrored stickers while keeping production manageable.

#### Ground / Footpath Layer

The edge ground/footpath layer should be subtly distinct from the playable road, using local material cues while staying low-contrast and visually quiet.

Good:

* Mumbai: curb tone, slightly raised footpath, drainage line, paving strip.
* Jaisalmer: stone platform, sandy edge, warm ground strip, low step.

Avoid:

* edge ground so different that it looks like another gameplay lane
* busy patterns
* high-contrast tiles
* decorative ground that pulls attention

The player should understand where the playable road ends, but the edge ground should not become a second visual attraction.

#### Layer-Assigned Placement

Every edge asset should belong to a defined layer.

Procedural placement should respect that layer so the edge feels intentionally composed rather than randomly decorated.

Layer model:

PLAYABLE ROAD
→ Boundary cue layer
→ Ground / footpath layer
→ Prop cluster layer
→ Frontage / background layer
→ Offscreen continuation

Examples:

* Boundary cue layer: curb, drainage line, low step.
* Ground / footpath layer: small stains, paving, soft shadow, subtle texture.
* Prop cluster layer: cart, stool, crate, scooter, plant.
* Frontage / background layer: shopfront, wall, shutter, awning, cropped building.

Assets should not be freely placed across layers without purpose.

#### Gameplay-Protection Restrictions

Edges must never include decoration that can be mistaken for gameplay objects, movement paths, enemies, pickups, hazards, NPCs, or interaction targets.

Anything that pulls attention away from survival readability should be removed or redesigned.

Avoid:

* readable signage
* decorative people
* moving vehicles
* literal landmarks
* road-intruding props
* dense clutter
* bright high-contrast edge objects
* full painted edge strips
* pickup-like objects
* enemy-like silhouettes
* hazard-like decoration
* interactable-looking NPCs

The edge should never make the player ask:

* Can I collect that?
* Is that an enemy?
* Can I walk there?
* Is that an obstacle?
* Is that person important?

#### Shared Architecture, City-Specific Skin

All cities should share the same edge architecture, but express identity through city-specific materials, silhouettes, prop clusters, boundary cues, and color accents.

Universal structure:

PLAYABLE ROAD
→ Boundary cue
→ Ground / footpath layer
→ Prop cluster layer
→ Frontage / background layer
→ Offscreen continuation

City-specific skin examples:

* Mumbai: curb, drainage line, compact shopfronts, food carts, scooters, awnings, muted urban colors.
* Jaisalmer: stone lip, sandy ground strip, sandstone walls, jharokha echoes, low platforms, desert market props.

This keeps the system scalable without making every city feel the same.

#### Named Edge Archetypes

Each city should define a small set of named edge archetypes.

Archetypes give procedural placement a design intent while still using the shared edge layer system.

Starting range:

* 4–6 edge archetypes per city.

Example Mumbai archetypes:

* compact shopfront edge
* food cart edge
* residential wall edge
* parked scooter edge
* market frontage edge

Example Jaisalmer archetypes:

* sandstone wall edge
* desert market edge
* low platform edge
* jharokha frontage edge
* quiet settlement edge

These are examples only, not final asset-kit decisions.

#### Soft Archetype Blending

Edge archetypes should transition softly rather than switch abruptly.

Shared boundary cues, neutral ground strips, quiet frontage, and breathing gaps should help one archetype blend into another without looking like tiled runner segments.

Good:

* shopfront edge → quiet wall/ground gap → food cart edge → neutral frontage → residential edge

Bad:

* shopfront tile → market tile → wall tile → stall tile

This is especially important because Masala Run is a survivors game, not a runner. The edge system must not feel like forward-moving chunks.

#### Review Criteria

Edge assets must be reviewed first for gameplay readability and boundary clarity, then for modularity, archetype fit, city identity, and charm.

Review order:

1. Does it preserve road readability?
2. Does it clearly belong outside the playable area?
3. Is it modular?
4. Does it fit the edge layer/archetype?
5. Does it express city identity moderately?
6. Is it charming without stealing attention?

Beauty alone is never a reason to accept an edge asset.

#### Reject or Redesign Rule

Any edge asset that violates gameplay readability, boundary clarity, modularity, or layer-assigned placement must be rejected or redesigned, regardless of visual quality.

Examples:

* Nice asset, but the cart overlaps the road boundary. Redesign.
* Beautiful shopfront, but it is too detailed and high-contrast. Simplify.
* Great Mumbai feel, but it reads like a gameplay obstacle. Reject or rework.

Do not keep rule-breaking edge assets just because they look good.

#### Scope Boundary

Edge Architecture defines the structural grammar of left/right environmental boundaries.

This chapter can decide:

* left/right edge role
* boundary behavior
* shallow layers
* prop cluster logic
* frontage behavior
* asymmetry
* density rhythm
* modularity
* archetypes
* review rules

This chapter must not decide:

* exact Mumbai asset kit
* exact Jaisalmer asset kit
* final palettes
* road hazard design
* enemy readability
* pickup readability
* Prompt Bible wording
* implementation details

#### Workflow Rule

After freezing Edge Architecture decisions, the next step is to formalize them into the Art Bible before generating images, city kits, or production prompts.

Required sequence:

Rule → Chapter → Prompt → Image → Critique

Never use:

Rule → Image → Adjust rules

Images may validate the Edge Architecture chapter later, but they must not redefine it.

### Chapter 5 — Road & Playable Surface

#### Purpose

The road is the primary playable surface of Masala Run.

It must support movement, survival decisions, enemy readability, pickup readability, attack readability, and hazard readability before it supports city flavour.

The road should feel like a simplified real street, not an abstract game board and not a detailed realistic street.

The player should subconsciously understand:

```text
This is where gameplay happens.
```

#### Core Principle

The playable road should feel real enough to belong to the city, but quiet enough to protect gameplay.

The road is the hero surface, but not the visual hero.

Gameplay remains the visual priority.

#### Default Road Style

Masala Run uses a **real street road, simplified**.

The road may include:

* subtle wear
* soft repaired patches
* faint markings
* gentle material shifts
* light city-specific surface character

The road must avoid:

* heavy stains
* busy cracks
* dense realism
* decorative clutter
* strong high-contrast noise
* surface detail that competes with gameplay objects

#### Safe Road Surface

The default safe road surface should be **lightly varied**.

Safe road texture may include low-contrast variation, but it must remain passive.

Safe road texture should never make the player ask:

* “Should I avoid this?”
* “Should I collect this?”
* “Is this a path?”
* “Is this a hazard?”

If a surface detail creates fake gameplay signal, reject or redesign it.

#### Road Material Structure

Each city should have one dominant playable road material.

The road should be **mostly continuous**, with occasional soft variation zones.

Allowed soft zones:

* faded repairs
* dusty strips
* gentle discoloration
* worn patches
* softened edge wear
* subtle material shifts

These zones must blend softly and must not create visible lanes, chunks, or runner-style segmentation.

The road must never feel like a sequence of forward tiles.

#### Road Markings

Road markings should be **faint and broken**.

Allowed:

* faded lane lines
* worn paint traces
* old edge marks
* broken markings
* soft repair traces

Avoid:

* bold zebra crossings
* bright arrows
* sharp parking lines
* high-contrast dividers
* anything that looks like a gameplay instruction unless deliberately designed as gameplay

Road markings should feel like **street memory**, not visual commands.

#### Safe Variation vs Gameplay Hazards

Safe road variation and gameplay hazards may belong to the same world, but they must not be visually equal.

Safe surface variation is passive.

Gameplay hazards are actionable.

A hazard must be more readable than ordinary road texture.

Hazards may use:

* clearer silhouette
* slightly stronger contrast
* simple outline
* subtle animation
* particles
* VFX
* repeated visual language

The player should instantly understand:

```text
That affects me.
```

#### Hazard Frequency

Road hazards are **difficulty-dependent**.

Early gameplay should keep the road mostly clean and readable.

Higher-difficulty levels may introduce more hazards directly on the playable road.

Hazard density should increase only because gameplay needs it, not because the road needs atmosphere.

Decorative cracks, puddles, stains, dust, or clutter should not be added just to make the road feel real.

#### City Identity

The road should receive **restrained city-specific treatment**.

Examples:

* Mumbai: simplified muted asphalt with faint wear and subtle urban road character.
* Jaisalmer: warmer dusty stone/sand-influenced surface, still smooth and readable.

Future cities may have their own restrained road identity.

However, all cities must follow the same readability rules:

* lightly varied safe surface
* mostly continuous material
* faint and broken markings
* passive safe texture
* clearly readable hazards
* clean playable center

The road may say:

```text
Which city am I in?
```

It should never say:

```text
Look at me.
```

#### Road-to-Edge Connection

The road should connect to the left and right edges through a **readable boundary with soft blending**.

The player must always understand where the playable road ends.

The boundary should feel native to the city, not like an artificial game wall.

Allowed boundary softening:

* road dust
* faded paint
* drainage lines
* curb shadows
* worn edge marks
* material transition
* city-specific edge wear

The movement limit must remain readable at all times.

#### Road Center

The center of the playable road is the cleanest visual zone.

This is where the player, enemies, pickups, attacks, and hazards most often overlap.

The center may still have tiny surface variation, but it should avoid:

* strong cracks
* heavy marks
* prominent stains
* bold markings
* decorative patches
* clutter

Road hierarchy:

```text
Road center = cleanest
Outer road bands = lightly varied
Boundary area = readable transition
Edges = city identity + decoration
```

#### Variation Distribution

Road variation should increase gently toward the edges.

The center remains calmest.

Subtle wear, dust, faded paint, repaired patches, and material shifts are more acceptable near the road boundaries.

Variation should increase gradually, not form visible lanes or repeated bands.

#### Road Clutter

There should be **no decorative clutter on the playable road**.

The playable road may contain only:

1. subtle safe surface texture, or
2. clear gameplay objects / hazards.

Do not add random paper scraps, bottles, stones, food bits, leaves, or everyday objects purely for atmosphere.

If an object is on the playable road and visually noticeable, it must have gameplay meaning or be removed.

Examples:

* Mumbai puddle in the playable road = allowed only as a gameplay hazard.
* Jaisalmer sand patch in the playable road = allowed only as a gameplay hazard.
* Potholes, oil patches, open manhole zones, broken tiles, or slowdown zones = allowed only when they are readable gameplay elements.

#### Hazard Visual Behaviour

Road hazards should be **world-native, but game-readable first**.

They should feel like they belong to the city surface, but they must be clearer than ordinary road texture.

Examples:

```text
Safe puddle-like stain = muted, flat, passive
Gameplay puddle hazard = clearer shape, stronger edge/highlight, optional ripple/VFX
```

```text
Normal dusty road variation = soft and blended
Jaisalmer sand hazard = readable patch shape, clearer boundary, optional moving dust effect
```

Hazards should not look like random decoration.

#### Shared Hazard Language

Road hazards should share a consistent readability language across cities.

Different cities may skin hazards differently, but the player should not need to relearn visual rules every city.

Example:

```text
Slowdown hazard
Mumbai skin = shallow puddle / wet patch
Jaisalmer skin = loose sand patch
Shared cue = readable shape + clearer boundary + subtle motion/effect
```

Rule:

```text
Same gameplay meaning → same readability logic
Different city → different material flavour
```

#### Day and Night Treatment

Day and night roads should use the **same structure, different mood**.

The road should not become a new design at night.

Night may change:

* overall tone
* warmth/coolness
* contrast level
* localized light influence
* hazard readability treatment

Localized practical lights from edge props may lightly affect nearby road edges, but should not flood the playable surface.

The center must remain readable in both day and night.

#### Night Readability

Night road readability should be **slightly moodier, still safe**.

Night may feel darker, cooler, softer, or warmer near edge lights.

Night must never hide:

* enemies
* pickups
* hazards
* player attacks
* movement boundaries

Night should create mood, not unfair difficulty.

Any low-visibility challenge should be treated later as a deliberate gameplay mechanic, not as a default art rule.

#### Road Surface Production

Road surfaces should be produced as:

```text
Base road + modular overlays
```

Each city should have:

* a clean readable base road
* modular safe overlays
* modular city-specific material overlays
* modular road marking overlays
* modular hazard skins

Avoid producing a complete painted road background.

Variation should come from procedural assembly, not fixed illustration.

#### Safe Road Overlays

Safe overlays are decorative, but must never be signal-like.

They may add surface life and prevent flatness, but must not look like:

* hazards
* pickups
* movement paths
* lane instructions
* enemy spawn zones
* interaction targets

Safe overlays should stay:

* low-contrast
* passive
* blended
* non-directional
* non-actionable

If an overlay creates gameplay confusion, reject or redesign it.

#### Overlay Repetition

Road overlays may repeat, but repetition must be disguised.

Use:

* rotation
* opacity variation
* soft cropping
* slight scale changes
* spacing rhythm
* city-specific variants
* left/right/center placement rules

The road must not look stamped, tiled, patterned, or procedurally obvious.

Repetition should feel like natural road wear, not an asset grid.

#### Base Road Identity

The base road should have **subtle built-in material identity**.

It should not be blank.

It should carry faint city-specific material character before overlays are applied.

However, the base road must remain quiet enough for:

* overlays
* hazards
* enemies
* pickups
* player attacks
* movement readability

Overlays add variation.

They should not be required to rescue a dead-looking base.

#### Review Rule

Road assets must be reviewed first for:

1. gameplay readability
2. modular/procedural usability

A road asset is acceptable only if:

* player readability is protected
* enemy readability is protected
* pickup readability is protected
* hazard readability is protected
* attack readability is protected
* movement boundaries remain clear
* it works with modular overlays
* it supports procedural assembly
* it does not behave like a complete painted background

Beauty, mood, city flavour, and polish are secondary.

A beautiful road asset that harms readability or modularity must be rejected or redesigned.

#### Anti-Drift Rule

Never use the road surface to compensate for weak edge design or weak city identity.

The road supports gameplay first.

City identity should be present, restrained, and readable.

The road should never become a decorative canvas that competes with survival gameplay.

### Chapter 6 — Gameplay Objects Readability

#### Purpose

This chapter defines how active gameplay objects must read clearly during play.

It covers player, enemies, pickups, attacks, projectiles, hazards, VFX, outlines, colour ownership, scale, animation, overlap handling, grounding, and review rules.

This chapter defines readability rules only.

Exact player designs, enemy lists, pickup catalogues, attack names, city-specific object sets, and final production prompts belong to later city kits or object design chapters.

#### Core Principle

Masala Run uses an interaction-first readability hierarchy.

The most important object at any moment should be easiest to read, while player visibility is always protected.

Base hierarchy:

1. Player position and movement safety
2. Immediate threats / enemies / hazards
3. Player attacks and impact feedback
4. Pickups and rewards
5. Secondary effects / ambient VFX
6. Environment and road texture

#### Player Readability

The player must remain readable through silhouette, outline, colour contrast, and animation.

The player should have a protected visual identity, remain visible during chaos, and still feel like part of the world rather than a floating UI marker.

#### Enemy Readability

Enemies should read as danger first, while still carrying Masala Run's charm, humour, food influence, and local flavour.

Enemy personality is welcome.

Enemy confusion is not.

Enemy priority:

```text
Threat clarity → movement readability → silhouette → personality → detail
```

#### Enemy Family System

All enemies should share a common danger language, while each enemy type keeps a distinct silhouette and movement style.

Enemies should feel related through outline, contrast, motion, and hostile behaviour cues.

Enemy types should differ through shape, size, animation, and movement pattern.

The player should quickly understand:

```text
That is dangerous.
What kind of danger is it?
```

#### Pickup Readability

Pickups should be clearly collectible and attractive, but less visually urgent than enemies, hazards, and immediate threats.

Pickups invite.

Threats interrupt.

Pickups may use small glow, bounce, sparkle, or outline if needed, but should not become loud UI objects.

#### Attack and Projectile Readability

Basic attacks should stay readable and controlled.

Special attacks may be more expressive, but no attack may hide critical gameplay information.

Attacks should show direction, range, timing, and impact.

Visual excitement should scale with gameplay importance.

#### Hazard Readability

Hazards should feel native to the city, but use consistent gameplay readability logic across cities.

Rule:

```text
Same gameplay meaning → same readability logic
Different city → different material flavour
```

Hazards must be clearer than safe road texture and should never be mistaken for passive stains, decoration, or road variation.

#### Hazard Animation and VFX

Hazard animation and VFX should scale with gameplay risk.

Low-risk hazards may be mostly static.

Medium-risk hazards may use subtle motion, shimmer, ripple, dust, or edge cues.

High-risk hazards may use stronger animation, warning pulse, particles, clearer boundary, or stronger effect language.

Hazard VFX should improve readability, not decorate the road.

#### Overall VFX Behaviour

Juice is allowed.

Visual chaos is not.

VFX should make the game feel polished, responsive, and fun, but must never hide the player, enemies, hazards, pickups, or movement boundaries.

Bigger VFX should be reserved for higher gameplay importance.

Ambient/passive VFX must stay lowest priority.

#### Outline System

Outline strength should follow gameplay importance.

Strongest separation:

* Player
* Immediate threats / enemies
* High-risk hazards

Medium separation:

* Pickups
* Medium-risk hazards
* Important projectiles / attacks

Light separation:

* Basic attack trails
* Pickup sparkles
* Secondary VFX

Minimal or no outlines:

* Ambient effects
* Road texture
* Edge decoration

#### Colour Ownership

Masala Run uses a semi-protected colour language.

Gameplay categories need colour logic.

Cities still need flavour.

Player: protected hero colour identity.

Enemies: shared threat colour logic with type-specific variation.

Pickups: reward-readable accents, not threat-like.

Hazards: danger/action-readable cues, skinned by city material.

Attacks: clear but controlled effect colours.

Environment/road: muted, low-priority colour base.

Critical gameplay colours should not be reused casually in the environment if they create confusion.

#### Gameplay Scale

Gameplay objects should feel world-native, but may be exaggerated enough to protect readability.

Believable enough to belong.

Exaggerated enough to play well.

Strict real-world scale should not block gameplay clarity.

#### Animation Readability

Animation should first communicate gameplay meaning, then add charm where it does not reduce clarity.

Function first.

Personality second.

Enemy animation should communicate movement, threat state, attack wind-up, or behaviour type.

Pickup animation should communicate collectibility.

Hazard animation should communicate active danger or state.

Player animation should support position, movement, and action readability.

#### Overlap Readability

Masala Run should use both render-layer priority and visual separation rules.

Layering decides visibility.

Separation prevents confusion.

Player should never disappear under enemies, pickups, attacks, or VFX.

Immediate threats and hazards should remain readable during attack effects.

VFX should be capped so it does not bury active gameplay objects.

Basic priority:

```text
Player safety / player position
> immediate threats / hazards
> important attacks / projectiles
> pickups
> short-lived feedback VFX
> passive VFX
> road
> environment
```

#### Shadows and Contact Grounding

Use grounding cues selectively.

Player and enemies should have consistent readable grounding.

Pickups use light grounding only if needed.

Flat hazards may use edge/highlight instead of shadow.

Attacks/projectiles use shadow only if it helps direction, height, or impact readability.

VFX usually do not need shadow unless gameplay-critical.

Shadows should support readability and anchoring, not make the road muddy or overly realistic.

#### City-Flavoured Gameplay Objects

Gameplay objects should keep universal readability rules across all cities, while allowing city-specific flavour in skin, material, motif, humour, and some silhouettes.

Rule:

```text
Same gameplay meaning → same readability logic
Different city → different flavour
```

The player should not need to relearn the visual language every time the city changes.

#### Review Hierarchy

A beautiful gameplay object is not acceptable if it is confusing during play.

Review order:

1. Gameplay readability
2. Category identity
3. Threat / reward / hazard meaning
4. Silhouette clarity
5. Overlap safety
6. City flavour
7. Charm / humour / polish

#### Scope Boundary

This chapter may define readability rules, hierarchy, outlines, colour ownership, scale, animation, overlap, grounding, and review principles.

This chapter must not define exact Mumbai enemies, Jaisalmer enemies, pickup catalogue, hero costume, attack names, city-specific VFX packs, final production prompts, or asset lists.

### Chapter 7 — Style & Shape Language

#### Purpose

Masala Run uses a clean flat cartoon shape language.

This chapter defines the shared style rules for silhouettes, forms, proportions, outlines, fills, detail, material cues, charm, category expression, and city flavour.

#### Core Rules

Use clean, simple, polished, readable flat-cartoon shapes.

Default forms should be mostly rounded.

Use selective sharp accents only where they clarify danger, tools, signs, rooflines, broken edges, attacks, hazards, or city motifs.

Use slightly exaggerated proportions:

```text
Believable enough to belong.
Exaggerated enough to play well.
```

Use moderate selective detail only when it supports readability, gameplay category, city flavour, or controlled charm.

Prioritize silhouette first.

Internal detail only confirms identity.

Use variable outlines by gameplay importance.

Use flat fills with at most one simple shade/accent layer.

Avoid gradients, painterly lighting, airbrushed shadows, realistic textures, complex material rendering, and 3D rendering.

Show materials through simplified cues, not detailed rendering.

Keep all assets in one shared visual world, but allow category-specific cues.

Gameplay objects may be more iconic and readable.

Environment assets must remain quieter.

Charm should be light and controlled, never joke-heavy or distracting.

Assets should follow shared rules with flexible expression across categories and cities.

#### City Flavour

City flavour should come from restrained motifs, materials, silhouettes, prop types, rooflines, frontage, and street-culture cues.

Frontage should use simplified recognizable shapes, not detailed architecture.

Environmental props should be charming but subordinate.

#### Patterns

Patterns are allowed only in small controlled areas such as:

* awnings
* cloth
* stall covers
* tile strips
* small sign shapes
* food packaging
* special city props

Patterns must never dominate the playable road or resemble gameplay signals.

#### Gameplay Categories

Danger should use shape + colour + outline/separation + motion, never colour alone.

Pickups should feel rounded, appealing, slightly bouncy, and collectible, but less urgent than threats.

Environmental props should be charming but subordinate.

#### Outline Hierarchy

Outline strength follows gameplay importance.

Player:

* clearest outline / separation

Enemies, high-risk hazards, immediate threats:

* strong outline / separation

Pickups, important projectiles, medium-risk hazards:

* medium outline / separation

Basic attack trails, pickup sparkles, secondary effects:

* light outline / separation

Road texture, edge decoration, frontage, ambient details:

* minimal, soft, or no outline

#### Final Style Boundary

Masala Run must avoid, in this order:

1. Too decorative / noisy
2. Too generic / mobile-template
3. Too realistic

#### Review Checklist

Review every asset against these questions:

* Is the silhouette readable at gameplay distance?
* Does the asset follow the clean flat cartoon style?
* Are proportions slightly exaggerated but still world-native?
* Are details selective and meaningful?
* Does outline strength match gameplay importance?
* Are fills flat with minimal simple shading?
* Are material cues simplified rather than rendered?
* Does the asset belong to the same visual world?
* Does the category read clearly?
* Is charm controlled?
* Is city flavour restrained?
* Are patterns limited and safe?
* Is the asset avoiding realism?
* Is the asset avoiding generic mobile-template styling?
* Is the asset avoiding decorative noise?
* Does gameplay readability remain protected?

If any gameplay-readability answer is no, reject or redesign the asset.

### Chapter 8 — Colour & Contrast Language

#### Core Direction

Masala Run uses a muted, warm, restrained, gameplay-first colour system.

Colour must protect gameplay readability first, while giving each city a restrained identity.

The colour system should be globally consistent across the game, with city-specific palette skins.

Rule:

```text
Gameplay readability first.
City flavour second.
Palette beauty third.
```

#### 1. Primary Role of Colour

Colour should protect gameplay readability first, while giving each city a restrained colour identity.

The player, enemies, hazards, pickups, attacks, road, and environment should not compete equally for attention.

Colour should help the player understand what matters immediately.

#### 2. Overall Palette Feel

The overall palette should feel:

* muted
* warm
* friendly
* welcoming
* readable
* restrained
* mobile-game appropriate

Controlled accent colours may be used for gameplay meaning and city flavour.

Avoid:

* excessive saturation
* noisy Indian street realism
* loud tourist-poster colours
* high-contrast decoration
* palette choices that compete with gameplay

#### 3. Contrast Distribution

Contrast should follow gameplay importance.

Highest contrast:

* player
* immediate threats
* important enemies
* high-risk hazards
* critical attacks / projectiles

Medium contrast:

* pickups
* medium-risk hazards
* important feedback effects
* special gameplay objects

Low contrast:

* safe road surface
* road overlays
* edge props
* frontage
* ambient details
* decorative city flavour

Rule:

```text
Active gameplay objects should be more readable than the road and environment.
```

#### 4. Global Colour System with City Skins

All cities should share a global Masala Run colour system.

Each city may have its own palette skin.

Meaning:

* gameplay colour logic stays consistent
* cities feel distinct through restrained material and mood changes
* the player should not need to relearn colour meaning in each city
* city flavour must never break gameplay readability

Rule:

```text
Same gameplay meaning → same colour logic.
Different city → different palette flavour.
```

#### 5. Semi-Protected Colour Ownership

Masala Run uses semi-protected colour ownership.

Gameplay categories own colour logic, but cities may skin them carefully.

Player:

* strongly protected colour identity
* must remain readable across all cities and times of day

Enemies:

* shared threat colour logic
* type-specific and city-flavoured variation allowed

Pickups:

* inviting reward colours
* attractive but less urgent than threats

Hazards:

* city-native colours
* clearer boundary, contrast, or effect than safe road texture

Attacks:

* clear controlled effect colours
* visual excitement scales with gameplay importance

Road:

* quiet, low-contrast, city-flavoured canvas

Edges / environment:

* muted city colours
* small controlled accents only

#### 6. Player Colour Identity

The player should have a strongly protected colour identity across all cities and times of day.

The player must never get lost.

Player readability should come from:

* silhouette
* outline / separation
* protected colour identity
* animation
* contrast against road, enemies, pickups, hazards, and VFX

The player may receive small contextual lighting influence, but the core identity must remain stable.

#### 7. Enemy Colour Language

Enemies should share a recognizable threat colour logic, while allowing type-specific and city-flavoured variation.

Enemies should quickly communicate:

* this is dangerous
* what type of danger it is
* how it behaves

Enemy colours may vary by enemy type, city skin, material, or personality, but they must remain threat-readable.

Enemy personality is welcome.

Enemy confusion is not.

#### 8. Pickup Colour Language

Pickups should use inviting reward colours that feel attractive, but stay less urgent than enemies and hazards.

Rule:

```text
Pickups invite.
Threats interrupt.
```

Pickups may use controlled brightness, warmth, glow, sparkle, bounce, or outline where useful.

Avoid making pickups look like enemies, hazards, attacks, UI buttons, or urgent warnings.

#### 9. Hazard Colour Language

Hazards should use city-native colours, but with stronger readable boundaries, contrast, or effects than safe road texture.

Hazards must be clearly actionable.

Examples:

Mumbai slowdown hazard:

* shallow puddle / wet patch skin
* clearer edge, ripple, highlight, or motion cue

Jaisalmer slowdown hazard:

* loose sand patch skin
* clearer boundary, dust motion, or contrast cue

Rule:

```text
A hazard may belong to the city material world, but it must never read as passive decoration.
```

#### 10. Road Colour Treatment

Road colour should be quiet, low-contrast, city-flavoured, and never visually louder than gameplay objects.

The road is the gameplay canvas.

It should support:

* player readability
* enemy readability
* pickup readability
* attack readability
* hazard readability
* movement boundary clarity

Road colour may carry faint city identity, but should not demand attention.

#### 11. Edge and Environment Colour Treatment

Edges should use muted city colours with small controlled accents.

Edges should:

* frame gameplay
* carry restrained city flavour
* remain subordinate to active gameplay
* avoid strong contrast near the playable road unless used for boundary clarity

Edge accents are allowed, but should be small, controlled, and placed away from critical gameplay readability zones.

#### 12. Accent Colour Usage

Accent colours should be limited and intentional.

Priority:

1. Gameplay meaning
2. Readability support
3. City charm
4. Visual delight

Avoid using accent colours casually across the environment.

If too many objects use strong accent colours, nothing feels important.

Rule:

```text
Accent colour is attention currency.
Spend it carefully.
```

#### 13. Saturation Rule

Use mostly restrained saturation.

Higher saturation should be reserved for:

* player identity
* important enemies
* pickups
* high-risk hazards
* special attacks
* important feedback
* select city accents

Roads, edges, frontage, and ambient decoration should remain lower saturation.

Saturation should guide attention, not decorate everything.

#### 14. Day and Night Relationship

Day and night should use the same underlying colour system, with mood and lighting adjustments.

Night should not become a separate visual language.

Night may adjust:

* value range
* warmth / coolness
* localized light influence
* hazard readability treatment
* edge lighting mood
* road tone

But gameplay category recognition must remain stable.

#### 15. Night Contrast

Night can be moodier, but gameplay objects, hazards, attacks, pickups, and boundaries must remain clearly readable.

Night should create mood, not unfair difficulty.

Avoid:

* hiding enemies
* hiding hazards
* reducing player visibility
* losing road-edge boundary clarity
* letting lighting effects overpower gameplay objects

Any low-visibility challenge must be designed later as deliberate gameplay, not default art direction.

#### 16. City Colour Identity

Each city should have a restrained palette skin built from:

* local materials
* atmosphere
* surface colour
* street-culture cues
* controlled accents
* day/night mood

City palettes should not rely on loud, literal, tourist-poster colours.

City identity should be recognizable but quiet.

#### 17. Mumbai Colour Direction

Mumbai should lean toward:

* muted urban asphalt
* soft concrete tones
* faded paint
* warm shopfront accents
* subdued signage shapes
* controlled pops of street colour
* practical night warmth

Mumbai should feel urban, warm, lively, and slightly worn, but never chaotic or noisy.

#### 18. Jaisalmer Colour Direction

Jaisalmer should lean toward:

* warm sandstone
* dusty golds
* muted desert oranges
* soft browns
* pale sand tones
* restrained textile-like accents
* warm low practical lighting at night

Jaisalmer should feel warm, dry, distinct, and charming, but still readable and gameplay-safe.

#### 19. Pattern and Colour Interaction

Patterns may use colour accents only in small controlled areas.

Allowed pattern areas:

* awnings
* cloth
* stall covers
* tile strips
* small sign shapes
* special city props
* occasional edge frontage details

Avoid:

* high-contrast patterns near gameplay action
* patterned road center
* patterns that resemble pickups, hazards, attacks, or enemy cues
* dense colour noise
* repeated decorative motifs across too many assets

Rule:

```text
Patterns are flavour.
Patterns are never the gameplay canvas.
```

#### 20. Review Rule

Any colour choice that harms gameplay readability, category recognition, or contrast hierarchy must be rejected even if it looks beautiful.

Review order:

1. Does the player remain readable?
2. Are enemies and immediate threats clear?
3. Are hazards clearly more actionable than safe road texture?
4. Are pickups attractive but less urgent than threats?
5. Are attacks readable without hiding important gameplay?
6. Is the road quiet enough?
7. Are edges subordinate?
8. Is city identity present but restrained?
9. Are accents controlled?
10. Does the screen avoid colour noise?

If colour beauty conflicts with gameplay clarity, gameplay clarity wins.

#### Final Principle

Masala Run colour should be:

```text
Muted, warm, restrained, gameplay-first, globally consistent, city-skinned, and contrast-hierarchical.
```

### Chapter 9 — Lighting & Time of Day

#### 1. Primary Role of Lighting

Lighting in Masala Run must support gameplay readability first.

Lighting may add mood, warmth, time-of-day identity, city flavour, and polish, but it must never hide the player, enemies, hazards, pickups, attacks, projectiles, movement boundaries, or road readability.

Rule:

```text
Gameplay readability first.
Mood second.
Lighting beauty third.
```

#### 2. Overall Lighting Style

Masala Run uses soft stylized lighting, not realistic lighting.

Lighting should feel simple, readable, warm, playful, and mobile-game appropriate.

Avoid:

* realistic dramatic lighting
* harsh cinematic contrast
* deep shadows that hide gameplay
* painterly illumination
* complex global illumination
* lighting that makes the game feel visually heavy

Lighting should support the clean flat cartoon style.

#### 3. Day Lighting Direction

Day lighting should feel bright, warm, clean, and lightly atmospheric.

Day scenes should be easy to read at a glance.

Day lighting may include:

* warm daylight tone
* soft ambient brightness
* slight city atmosphere
* gentle material warmth
* subtle highlights where useful

Avoid strong cast shadows, excessive glare, washed-out roads, or high-contrast lighting patterns across the playable surface.

#### 4. Night Lighting Direction

Night lighting may be moodier than day, but must remain gameplay-safe.

Night should not become a different visual language.

Night may use:

* darker value range
* warmer or cooler mood shifts
* localized practical lights
* tighter edge lighting
* subtle glow accents
* controlled contrast

Night must never reduce gameplay fairness by hiding threats, hazards, pickups, attacks, player position, or boundaries.

Rule:

```text
Night changes mood.
Night does not hide gameplay.
```

#### 5. Practical Lights

Practical lights should mainly create localized edge mood.

Examples:

* shop lights
* stall lamps
* window glow
* sign glow
* lanterns
* small street lights
* warm bulbs

Practical lights should make the world feel alive, but they must stay controlled and subordinate to gameplay readability.

#### 6. Light Spill Onto Road

Light spill may reach the playable road only near the edges.

It should be subtle, soft, and controlled.

The road center must not be flooded with decorative lighting.

Allowed:

* soft edge glow
* small warm spill near stalls
* slight road-edge tint
* faint practical-light influence near boundaries

Avoid:

* large bright pools across the center
* strong light beams
* high-contrast bands
* lighting that looks like gameplay telegraphing unless intentionally designed as gameplay

#### 7. Road Center Lighting

The road center is the most gameplay-critical visual zone.

It should remain stable and readable in both day and night.

The road center may receive minor mood shifts, but should avoid strong shadows, strong light pools, dramatic value changes, or decorative lighting effects.

Rule:

```text
Road center stays calm.
Edges carry most lighting mood.
```

#### 8. Shadow Style

Masala Run uses simple contact shadows and soft grounding cues.

Shadows should help objects feel attached to the world and clarify position.

They should not be realistic, heavy, dramatic, or visually muddy.

#### 9. Shadow Priority

Shadows exist to support position readability, not realism.

Guidance:

* player gets a consistent readable grounding cue
* enemies get grounding cues so threat position is clear
* pickups get light grounding only if needed
* hazards use shadow only if appropriate; flat hazards may use edge/highlight cues instead
* attacks and VFX use shadows only when they improve direction, height, or impact readability
* ambient decoration should avoid unnecessary shadow complexity

#### 10. Edge Lighting Density

Night edge lighting should appear as sparse pools of warmth, not continuous glowing edges.

Lighting rhythm should feel natural and practical.

Use breathing gaps between lit areas.

Avoid turning the edge into a bright decorative frame.

#### 11. City-Specific Lighting

All cities share the same global lighting logic, but each city may express lighting differently.

Rule:

```text
Same gameplay readability rules.
Different city lighting flavour.
```

City-specific lighting may vary through:

* practical light types
* warmth/coolness
* dust or atmosphere
* material response
* night accent colour
* edge-light rhythm

But gameplay readability rules remain universal.

#### 12. Mumbai Day Lighting

Mumbai day lighting should feel like warm urban daylight with slight dusty softness.

It may suggest:

* muted daylight on asphalt
* soft concrete warmth
* mild street haze
* faded urban surfaces
* lively but restrained street mood

Avoid harsh glare, chaotic colour, or realism-heavy grime.

#### 13. Mumbai Night Lighting

Mumbai night lighting should use practical warm shop and stall lights with controlled contrast.

It may suggest:

* small pools of warm light
* shopfront glow
* stall bulbs
* soft sign glow
* localized urban warmth
* slightly cooler unlit areas

Mumbai night should feel alive but not noisy.

#### 14. Jaisalmer Day Lighting

Jaisalmer day lighting should suggest warm sunlit sandstone, softened for gameplay.

It may use:

* warm sandstone mood
* dusty golden atmosphere
* pale sand bounce
* dry warmth
* softened highlights

Avoid harsh desert glare, blown-out surfaces, and high-contrast shadows.

#### 15. Jaisalmer Night Lighting

Jaisalmer night lighting should feel calm, warm, and low-lit while remaining clear.

It may use:

* warm low lamps
* lantern-like glow
* sandstone warmth
* quiet desert night atmosphere
* soft pools of practical light

Avoid making the scene too dark, too dramatic, or too cinematic.

#### 16. Enemy Visibility Under Lighting

Enemies must retain threat readability regardless of lighting state.

Lighting may influence enemies subtly, but enemy silhouettes, outlines, contrast, and motion cues must remain clear.

Rule:

```text
Mood cannot weaken threat recognition.
```

#### 17. Hazard Visibility Under Lighting

Hazards may receive city/time-of-day lighting influence, but their gameplay cues must remain clear.

Hazards must stay more actionable than safe road texture.

Lighting must not make hazards look like passive stains, decoration, or road variation.

#### 18. Pickup Visibility Under Lighting

Pickups must remain inviting and collectible under all lighting states.

They may glow, bounce, sparkle, or receive highlight treatment where useful.

However, pickups should not become brighter or more urgent than immediate threats or high-risk hazards.

Rule:

```text
Pickups invite.
Threats interrupt.
```

#### 19. Attack and VFX Lighting

Attacks and VFX may use glow, highlights, impact flashes, or light accents.

Effects should scale with gameplay importance.

Avoid screen flooding, excessive bloom, large persistent glow, or effects that hide enemies, hazards, player position, pickups, or road boundaries.

Rule:

```text
Effects may be exciting.
Effects must not create visual chaos.
```

#### 20. Ambient VFX and Light Particles

Ambient particles and small light effects are allowed only as subtle low-priority mood.

Examples:

* tiny dust motes
* faint night glow particles
* soft heat/dust hints
* small spark flicker near practical lights

They must remain sparse, low-contrast, and clearly non-gameplay.

Ambient effects must never resemble pickups, hazards, attacks, enemy cues, or gameplay warnings.

#### 21. Day/Night Gameplay Fairness

Day and night should change mood, not base difficulty.

A night level should not become harder simply because the art is darker.

Any gameplay difficulty difference must come from deliberate gameplay systems, enemy patterns, hazard density, or level design, not accidental visibility loss.

#### 22. Low-Visibility Mechanics

Low visibility may be explored later only as an explicit gameplay mechanic.

It is not part of default night art direction.

If used later, it must be designed, telegraphed, balanced, and documented separately.

#### 23. Lighting and Colour System

Lighting may modify palette mood without breaking gameplay category colour logic.

The global colour system remains stable across time of day.

Player, enemies, pickups, hazards, attacks, road, and environment must retain their category readability.

Rule:

```text
Lighting can tint the world.
Lighting cannot rewrite gameplay colour meaning.
```

#### 24. Lighting and Outlines

Outlines and separation cues must remain reliable across lighting states.

Night lighting should not reduce outline clarity for the player, enemies, hazards, important attacks, or pickups.

If lighting reduces separation, increase outline, contrast, highlight, or animation clarity.

#### 25. Lighting Consistency Across Cities

Masala Run uses global lighting rules with city-specific skins.

All cities must respect:

* gameplay-first visibility
* stable player readability
* readable enemies
* readable hazards
* controlled practical lights
* road center stability
* edge-biased mood lighting
* soft stylized shadows
* no lighting-based unfairness

#### 26. Asset Production Model

Lighting should support the modular asset pipeline.

Day and night should reuse the same base asset geometry.

Time-of-day treatment should come from palette-compatible colouring, runtime
palette changes, and optional engine-controlled glow/light overlays.

Separately painted day/night scene pairs and full edge-strip pairs are retired.

Assets must not contain baked drop shadows, glow halos, or baked time-of-day
lighting.

Rule:

```text
Same geometry + controlled runtime-friendly lighting treatment.
Not separate painted day/night scenes or strips.
```

#### 27. Night Asset Production

Night should reuse the same structural asset logic as day.

Night variants are allowed only where needed for readability, mood, or practical
light behaviour, and should remain modular overlays or restrained asset variants
rather than full duplicate scenes.

Examples:

* lit window variant
* stall light variant
* lamp glow overlay
* soft shadow overlay
* night-tinted road overlay
* practical light spill element

Avoid duplicating entire city scenes or complete edge strips as fixed night
paintings.

#### 28. Review Priority

Lighting reviews must follow this order:

1. Gameplay readability
2. Category clarity
3. Player visibility
4. Enemy and hazard visibility
5. Road and boundary clarity
6. Mood
7. City flavour
8. Beauty and polish

If beauty conflicts with readability, readability wins.

#### 29. Rejection Rule

Reject or redesign any lighting treatment that:

* hides the player
* weakens enemy readability
* hides hazards
* makes pickups look like threats
* makes hazards look decorative
* obscures attacks or projectiles
* reduces road-edge boundary clarity
* makes the road center visually unstable
* creates excessive glow, bloom, shadows, or contrast
* breaks the global colour/category logic
* feels like a complete painted scene instead of modular lighting treatment

#### 30. Final Principle

Lighting in Masala Run should make the world feel alive without becoming the main spectacle.

Final rule:

```text
Soft stylized lighting.
Gameplay-first visibility.
Mood through edges.
Stable road center.
Controlled practical lights.
Consistent category readability.
City-specific flavour without lighting chaos.
```

### Environment Props & Micro-Clusters

#### Core Direction

Masala Run environment props should be modular micro-clusters that express restrained city identity, warmth, humour, and street-life charm while remaining clearly outside the playable road and subordinate to gameplay.

Each cluster should read as one simple idea, use one anchor object with optional attachments, repeat with disguised variation, and avoid anything that looks like a pickup, hazard, enemy, obstacle, interaction target, or gameplay instruction.

Core rule:

```text
Props add controlled city charm.
Gameplay remains the focus.
```


#### Primary Role of Environment Props

Environment props exist to support city identity and charm while staying clearly subordinate to gameplay.

Props may add warmth, locality, humour, recognizability, and life, but they must never become the player’s focus.

Rule:

```text
Environment props support the world.
They do not compete with survival gameplay.
```


#### Prop Placement

Most environment props belong inside the left and right edge zones.

The playable road is the gameplay canvas.

Props should not be placed on the playable road as decoration.

If a noticeable object appears on the playable road, it must have explicit gameplay meaning as a hazard, pickup, obstacle, enemy, attack, or other gameplay object.

Rule:

```text
Decorative props live on the edges.
Gameplay objects live on the road.
```


#### Road Prop Restriction

Decorative props must not appear on the playable road.

No random paper scraps, bottles, stones, crates, food bits, leaves, or street objects should be added to the road purely for atmosphere.

If an object is visible on the playable road and attracts attention, it must be actionable or removed.


#### Preferred Production Unit

The preferred production unit for environment decoration is the modular micro-cluster.

Avoid relying on:

* individual scattered prop spam
* complete painted edge strips
* dense street scenes
* large decorative background illustrations

Micro-clusters support reuse, variation, procedural placement, and readability control.


#### Micro-Cluster Definition

A micro-cluster is a small reusable environmental composition that reads as one simple idea.

Examples:

* tea stall
* fruit cart
* parked cycle
* plant corner
* crate stack
* small shopfront
* awning segment
* clay pot group
* lantern corner

A micro-cluster should not feel like a dense mini-scene.

Rule:

```text
One cluster = one readable idea.
```


#### Anchor + Attachments

Every micro-cluster should have one clear anchor object.

The anchor defines the cluster idea.

Optional supporting attachments may add variation, flavour, asymmetry, and procedural freshness.

Example:

```text
Anchor: fruit cart
Optional attachments: crate, small cloth shade, basket, sign shape, stool
```

Attachments must never make the cluster noisy or unclear.


#### Cluster Density

Micro-clusters should be sparse to medium density with controlled detail.

They should feel alive, but not realistic, chaotic, or busy.

Avoid recreating real Indian street clutter.

Rule:

```text
Life, not noise.
Charm, not clutter.
```


#### Cluster Spacing

Micro-clusters should be organically spaced with breathing gaps.

Spacing should not look evenly tiled, stamped, or mechanically repeated.

Clusters should not be packed continuously along both edges.

The edge should have a natural density rhythm:

```text
cluster → breathing gap → smaller cluster → calm area → cluster
```


#### Left / Right Asymmetry

Left and right edge props should be intentionally asymmetrical while remaining balanced overall.

One side may be slightly more active while the other is calmer.

Asymmetry should make the world feel natural, not random.

No side should overpower gameplay.


#### City Identity Through Props

Props should carry moderate city identity through restrained local materials, forms, silhouettes, prop types, and motif accents.

Avoid:

* literal landmark-heavy design
* dense cultural symbols
* tourist-poster treatment
* stereotype-heavy props
* excessive decorative motifs

City identity should be recognizable but quiet.


#### Landmark Echoes

Masala Run should use landmark echoes, not literal landmark props.

City identity should come from:

* material language
* roofline hints
* shopfront shapes
* awning forms
* street-food objects
* boundary-adjacent props
* local silhouettes
* restrained pattern accents

Do not make literal landmarks common environmental props.


#### Signage

Signage may appear in edge props, but text should generally be abstract, unreadable, icon-like, symbolic, or shape-based.

Avoid readable text unless deliberately approved for a specific gameplay, branding, or production reason.

Readable text can distract the player, create localization problems, age badly, and pull attention away from gameplay.


#### Human Presence

Human presence should be implied through objects, lighting, arrangement, and traces of activity.

Avoid visible human figures in environmental prop clusters for now.

Visible people may confuse gameplay readability, imply NPC systems, or compete with enemies and active objects.

Examples of implied human presence:

* arranged stools
* lit stall
* stacked crates
* cup on counter
* open awning
* parked cycle
* warm shop light
* cooking setup without people


#### Vehicles

Vehicles may appear only as parked or static edge decoration unless separately designed as gameplay hazards.

Allowed examples:

* parked cycle
* parked scooter
* compact cart
* cropped parked vehicle edge element

Vehicles must remain muted, compact, cropped where useful, and clearly outside the playable road.

Moving vehicles are not part of this chapter.


#### Prop Scale

Props should use slightly exaggerated, readable, world-native scale.

Strict realism is not required.

Important identifying features may be made chunkier, cleaner, or slightly larger for gameplay-distance readability.

Rule:

```text
Believable enough to belong.
Simplified enough to read.
```


#### Prop Detail

Environmental props should use moderate selective detail only.

Details must serve one of these purposes:

* explain the object
* support city flavour
* add controlled charm
* clarify material
* improve silhouette readability

Avoid tiny decoration, excessive grime, dense patterns, realistic clutter, and unnecessary cultural ornament.


#### Prop Outlines

Environmental props should use softer or lighter outlines than gameplay objects.

They must not visually compete with the player, enemies, hazards, pickups, or attacks.

Outline priority remains:

```text
Gameplay objects > hazards / threats > pickups > props > frontage / ambient details
```

Props should be readable, but subordinate.


#### Prop Colour

Prop colours should use muted city palettes with small controlled accents.

Avoid bright saturation across many props.

Accent colour is attention currency and should be spent carefully.

Props must not reuse critical gameplay colours in ways that make them look like pickups, hazards, attacks, enemies, or interaction targets.


#### Pattern Use

Patterns are allowed only in small controlled areas.

Allowed pattern surfaces:

* awnings
* cloth
* stall covers
* tile strips
* small sign shapes
* food packaging
* special city props
* occasional frontage accents

Avoid:

* dense patterns
* high-contrast patterns near gameplay action
* patterned playable road center
* patterns that resemble pickups, hazards, attacks, enemies, or warnings

Rule:

```text
Patterns are flavour.
Patterns are never the gameplay canvas.
```


#### Shared Structure, City-Specific Skins

All cities should share the same micro-cluster grammar.

Cities may differ through:

* materials
* silhouettes
* prop families
* local street-food cues
* colour accents
* lighting attachments
* texture abstraction
* motif restraint

Rule:

```text
Same cluster logic.
Different city flavour.
```


#### City Archetype Count

Each city should begin with 4–6 environment prop / micro-cluster archetypes.

This gives enough variety for procedural composition while keeping the first asset kits manageable.

Do not define final asset lists in this chapter.


#### Mumbai Archetype Direction

Mumbai prop archetypes may later include ideas such as:

* local street-food stall
* shopfront / awning cluster
* parked cycle or scooter
* plant / crate corner
* small signage frontage
* compact urban utility cluster

These are directional examples only, not a final Mumbai asset list.

Mumbai should feel local, urban, warm, slightly worn, and lively without becoming landmark-heavy or chaotic.


#### Jaisalmer Archetype Direction

Jaisalmer prop archetypes may later include ideas such as:

* sandstone platform cluster
* small desert stall
* cloth / awning setup
* clay pot cluster
* low carved frontage
* lantern corner

These are directional examples only, not a final Jaisalmer asset list.

Jaisalmer should feel warm, sandy, stone-rich, calm, and distinct without becoming a tourist postcard.


#### Repetition Disguise

Micro-clusters may repeat, but repetition must be disguised.

Use:

* optional attachments
* cropping
* rotation where perspective allows
* slight scale variation
* spacing rhythm
* left/right variants
* colour accent variation
* lighting variants
* calm gaps between clusters

Avoid obvious procedural stamping.


#### Left / Right Variants

Important clusters should support left/right-aware variants when perspective, shadows, frontage direction, cropping, or road-boundary orientation matter.

Simple standalone props may remain universal.

Do not require separate variants for every tiny prop.


#### Boundary Interaction

Micro-clusters may sit near the playable boundary, but must never visually intrude into the road or confuse the movement limit.

The road silhouette must remain clean.

The player should never wonder whether a decorative prop is blocking movement or part of the playable space.


#### Prop Shadows

Props may use simple soft grounding shadows only where useful.

Avoid realistic, heavy, dramatic, or muddy shadows.

Shadows should help place props in the world without increasing edge visual weight too much.


#### Night Prop Lighting

Only selected practical-light clusters should carry localized glow at night.

Examples:

* stall lamp
* shop light
* lantern
* window glow
* small sign glow
* warm bulb

Do not make every prop glow.

Night edge lighting should remain sparse, localized, and subordinate to gameplay readability.


#### Review Priority

Environment props and micro-clusters must be reviewed in this order:

1. Gameplay readability
2. Boundary clarity
3. Does it clearly belong outside the playable road?
4. Does it avoid looking like a gameplay object?
5. Modularity
6. Cluster readability
7. Repetition safety
8. City identity
9. Style consistency
10. Charm / humour / polish

Beauty alone is never enough.


#### Immediate Rejection Rule

Reject or redesign any prop or cluster that looks like:

* pickup
* hazard
* enemy
* obstacle
* attack
* projectile
* interaction target
* gameplay instruction
* movement path
* spawn marker
* UI element

Decorative props must never impersonate gameplay objects.


#### Scope Boundary

This chapter defines environmental prop and micro-cluster grammar.

It may define:

* prop role
* placement rules
* cluster structure
* density
* spacing
* repetition rules
* anchor / attachment logic
* city-flavour boundaries
* signage rules
* human-presence rules
* vehicle rules
* outline / colour / pattern guidance
* night lighting behaviour
* review hierarchy

It must not define:

* final Mumbai asset kit
* final Jaisalmer asset kit
* exact production prompts
* Prompt Bible wording
* gameplay code
* implementation systems
* metadata schemas
* procedural placement algorithms
* final prop counts
* enemy / pickup / hazard catalogues


#### Final Principle

Environment props in Masala Run should create controlled city charm through modular micro-clusters while staying subordinate to gameplay.

Final rule:

```text
Readable micro-clusters.
Restrained city flavour.
No decorative road clutter.
No gameplay confusion.
Procedural reuse with disguised repetition.
Gameplay first, charm second.
```

## Part II — Environment Design

### Chapter 10 — Environment Composition

Environment composition is governed by Camera & Composition, Edge Architecture,
Environment Props & Micro-Clusters, City Identity Framework, and the global
gameplay-first hierarchy.

No separate environment-composition rules are required for this freeze.

### Chapter 11 — Roads & Play Space

Roads and play space are governed by Camera & Composition and Road & Playable
Surface.

The road remains the primary gameplay canvas.

### Chapter 12 — Props & World Building

Props and world building are governed by Edge Architecture, Environment Props &
Micro-Clusters, City Identity Framework, and Modular Asset System.

Props must remain modular, readable, procedurally compatible, and subordinate to
gameplay.

### Chapter 13 — City Identity Framework

#### 1. Core City Identity Philosophy

Every Masala Run city should be a romanticized, simplified, gameplay-safe
interpretation grounded in recognisable everyday reality.

City identity should emerge through several complementary cues rather than one
landmark, monument, cliché, colour, vehicle, food item, or cultural symbol.

City flavour may change the skin of the world, but never gameplay meaning.

The chapter inherits the Art Bible's global hierarchy:

```text
Gameplay clarity
> accessibility and comfort
> modular and procedural viability
> gameplay-category recognition
> responsiveness and feedback
> city identity
> charm and personality
> beauty and spectacle
```

Rule:

```text
Recognisable through multiple restrained cues.
Never dependent on one landmark or stereotype.
```

#### 2. City Research Inputs

Before defining a city, structured research should cover:

* everyday street life
* materials
* architecture and frontage
* road and boundary treatment
* food culture
* local commerce
* climate and atmosphere
* transport and static vehicles
* lighting character
* ambient audio character
* culturally meaningful visual cues
* stereotype and tourist-poster risks
* elements that can realistically become modular assets

Research must focus on information that can be translated into reusable game
assets and procedural systems, not on producing a general city essay.

#### 3. Identity Pillars

Each city should define approximately 3-5 core identity pillars.

Identity pillars must be:

* visually translatable
* modular
* reusable
* gameplay-safe
* recognisable without excessive detail
* distinct enough to separate the city from other cities
* broad enough to support several asset families

Avoid using too few pillars, which may make the city generic, or too many
pillars, which may create visual noise and production complexity.

#### 4. Identity Translation System

Translate the approved identity pillars into a coordinated system of:

* materials
* silhouettes
* frontage shapes
* boundary cues
* road treatment
* environmental props
* modular micro-clusters
* palette skin
* lighting flavour
* audio and ambience flavour
* food and street-culture cues
* restrained motif and pattern accents

No single category should carry the entire city identity.

#### 5. Distribution of City Identity

City identity should be distributed primarily through:

```text
Edges and frontage
→ strongest environmental identity

Road and boundaries
→ restrained material and transition identity

Lighting, palette and ambience
→ supporting mood identity

Gameplay objects
→ universal gameplay meaning with selective city flavour
```

The playable road must remain the quiet gameplay canvas.

Do not use the road to compensate for weak city identity.

#### 6. Materials

Local materials must be expressed through simplified flat-cartoon cues rather
than realistic textures.

Examples:

```text
Sandstone
→ warm block forms + restrained edge marks

Urban metal
→ muted fill + small flat highlight

Cloth
→ simple fold, flap or stripe cue

Asphalt
→ quiet base + faint low-contrast wear
```

Material treatment must remain consistent with the approved Style & Shape
Language.

#### 7. Architecture and Frontage

Architectural identity should appear through:

* broad frontage silhouettes
* roofline hints
* shutters
* awnings
* windows
* low platforms
* cropped walls
* arches or edge shapes
* boundary-adjacent architectural cues
* simplified material masses

Avoid:

* complete detailed buildings
* dominant scenery
* deep architectural scenes
* literal recreation
* complete painted façades
* architecture that becomes the main spectacle

Rule:

```text
Architecture suggests place.
Architecture does not become scenery spectacle.
```

#### 8. Landmark Policy

Use landmark echoes, not regular literal landmarks.

Landmark echoes may include:

* roofline rhythm
* silhouette language
* material treatment
* arch shape
* colour relationship
* structural motif
* cropped architectural suggestion

Literal landmarks should be rare, separately approved special cases and must not
become the default city-recognition system.

#### 9. Food and Street-Culture Cues

Food is an important identity source, but it must not dominate every asset.

Selected local food cues may appear through:

* stalls
* vessels
* carts
* serving objects
* pickups
* abilities
* selected enemies
* reward effects
* audio textures
* packaging or controlled signage shapes

Avoid turning every object, sound or visual effect into food.

Prefer ordinary, locally meaningful and reusable street-culture cues over
internationally recognisable clichés.

#### 10. Stereotype Avoidance

A city must never be reduced to one exaggerated symbol.

Reject identity logic such as:

```text
Mumbai = taxi + rain
Jaisalmer = camel + fort
```

These elements may appear selectively, but the city identity must remain
recognisable without them.

Require multiple supporting cues across materials, silhouettes, architecture,
food culture, road treatment, props, lighting and ambience.

Avoid:

* stereotype-heavy props
* stock regional clichés
* tourism-poster treatment
* dense cultural decoration
* documentary realism
* maximum-density street clutter
* exoticisation
* cultural motifs used only because they look attractive

#### 11. Vehicles

Vehicles should be occasional parked or static supporting cues.

They must remain:

* muted
* compact
* cropped where useful
* clearly outside the playable road
* subordinate to gameplay
* modular and procedurally placeable

Moving vehicles and gameplay vehicle hazards remain outside this chapter unless
separately designed.

#### 12. City Archetypes

Each city should begin with approximately 4-6 named edge or environmental
archetypes.

Archetypes should provide design intent for procedural placement without
becoming fixed scenes.

They must:

* follow the shared edge architecture
* remain modular
* use one clear idea
* support soft blending
* include breathing gaps
* preserve left/right asymmetry
* avoid runner-style segmentation
* remain subordinate to the playable road

#### 13. Micro-Cluster Structure

Preferred city archetypes should use modular micro-clusters structured as:

```text
Anchor asset
+ optional attachments
+ restrained city skin
+ controlled left/right or lighting variants
```

Example only:

```text
Mumbai Compact Food Corner

Anchor
→ food cart

Optional attachments
→ crate
→ awning
→ vessel
→ stool
→ abstract sign shape
```

Do not turn the example into a final Mumbai asset list.

#### 14. Shared Versus City-Specific Assets

Use the established modular hierarchy:

```text
Base Asset
→ Variant
→ City Skin
→ Instance
```

City production should use:

```text
Shared structural library
+ shared reusable props
+ city skins
+ selected city-unique anchors
```

Do not rebuild the full asset system for each city.

A completely unique asset is justified only when an existing shared asset,
variant, skin or attachment cannot express an important identity pillar.

Visual attractiveness alone is not sufficient justification for a unique asset.

#### 15. Palette Skin

Each city should define a restrained palette skin tied to:

* materials
* atmosphere
* road tone
* frontage
* practical accents
* day/night mood
* gameplay contrast requirements

The city palette remains subordinate to the global gameplay colour system.

City palette decisions must not weaken:

* player identity
* enemy recognition
* hazard readability
* pickup recognition
* attack readability
* accessibility
* road and boundary clarity

#### 16. Day and Night Consistency

Day and night must preserve:

* the same identity pillars
* the same structural asset logic
* the same archetypes
* the same gameplay meaning
* the same accessibility logic
* the same modular system

Night may change mood through:

* controlled palette shifts
* localized practical lighting
* lighting overlays
* selected lit variants
* ambience density
* restrained audio changes

Rule:

```text
Same city.
Same structure.
Different controlled mood.
```

Night must not become a separate city kit or reduce gameplay fairness.

#### 17. Audio and Ambience Identity

City-specific audio identity should use restrained:

* ambience
* material sounds
* practical activity
* environmental rhythm
* surface response
* selected food or street-culture cues
* day/night mood changes

Avoid:

* dense realistic recordings
* loud crowd beds
* stereotype-heavy soundscapes
* stock regional clichés
* city flavour that masks gameplay cues

Rule:

```text
Same gameplay audio logic.
Different restrained city flavour.
```

#### 18. Cross-City Gameplay Consistency

Preserve the global rule:

```text
Same gameplay meaning
→ same readability, timing and urgency logic

Different city
→ different restrained material, palette, motif, lighting and audio flavour
```

The player must not need to relearn gameplay meaning when entering a new city.

City identity must not redefine:

* player readability
* enemy threat language
* pickup language
* hazard logic
* attack communication
* UI behaviour
* accessibility cues
* audio warning logic
* haptic hierarchy

#### 19. City Approval Review

Define the city-identity review order as:

1. Gameplay clarity
2. Accessibility and comfort
3. Modular and procedural viability
4. Gameplay-category recognition
5. Road and movement-boundary clarity
6. Cross-city gameplay consistency
7. Identity recognisability through multiple cues
8. Stereotype and landmark-dependence safety
9. Day/night consistency
10. Shared-versus-unique asset discipline
11. City authenticity and restraint
12. Charm and personality
13. Beauty and polish

A city treatment should be approved only when:

* gameplay remains dominant
* the city is identifiable through several restrained cues
* the system is modular and procedurally usable
* it avoids landmark dependence
* it avoids stereotypes
* it works consistently in day and night
* it preserves global gameplay meaning
* it feels warm, local and charming
* future cities can use the same framework

#### 20. Immediate Rejection Rules

Reject or redesign any city treatment that:

* harms gameplay readability
* weakens accessibility
* turns the road into decoration
* depends on a complete painted scene
* requires handcrafted placement
* breaks procedural composition
* relies primarily on landmarks
* reduces the city to one cliché
* uses dense cultural decoration
* looks like a tourism poster
* uses realistic clutter as proof of authenticity
* changes gameplay-category meaning
* becomes harder to read at night
* cannot reuse the modular asset system
* creates unnecessary unique assets
* requires future cities to rewrite the framework
* makes city identity more important than gameplay

#### 21. Scope Boundary

The City Identity Framework may define:

* research inputs
* identity-pillar methodology
* material translation
* silhouette and frontage direction
* road and boundary identity
* archetype structure
* shared-versus-city-specific logic
* palette, lighting and audio flavour
* landmark restraint
* stereotype avoidance
* day/night consistency
* approval and rejection rules

It must not define:

* final Mumbai asset kit
* final Jaisalmer asset kit
* exact production prompts
* Prompt Bible wording
* final asset catalogues
* exact prop counts
* exact enemy, pickup or hazard lists
* gameplay code
* procedural algorithms
* rendering implementation
* metadata schemas
* Technical Asset Contract changes

#### 22. Final Framework

Summary framework:

```text
Research the real city
→ define 3–5 identity pillars
→ translate pillars into materials, silhouettes and everyday street cues
→ define road and boundary treatment
→ define 4–6 modular archetypes
→ establish shared assets, city skins and justified unique anchors
→ define restrained palette, lighting and audio flavour
→ verify day/night consistency
→ test against gameplay, accessibility and modularity
→ reject stereotypes, landmark dependence and tourist-poster treatment
```

#### 23. Final Principle

Every city in Masala Run should feel recognisable through a restrained
combination of everyday street culture, materials, silhouettes, food cues,
modular props, palette, lighting and ambience.

City identity should emerge from several complementary cues rather than one
landmark or stereotype.

The same gameplay meaning, readability, accessibility and procedural structure
must remain consistent across every city and time of day.

## Part III — Asset Standards

### Modular Asset System

#### Core Principle

Masala Run is built from modular reusable assets assembled procedurally.

Every asset should maximize:

- reuse
- readability
- procedural flexibility
- long-term scalability

Never optimize an asset at the cost of gameplay readability, modularity, or
procedural compatibility.

Gameplay readability is the primary creative requirement.

Modularity and procedural compatibility are mandatory production requirements.

An asset must satisfy both.

A modular but unreadable asset must be rejected.

A readable asset that requires handcrafted scenes or breaks procedural
production must also be rejected.

Neither requirement may invalidate the other.

The production philosophy is:

```text
Reusable assets create beautiful cities.
Beautiful cities should never require unique handcrafted scenes.
```

#### 1. Default Production Unit

The preferred production unit is the modular micro-cluster.

Individual props should exist as reusable building blocks.

Micro-clusters should be assembled from these reusable props.

Avoid producing large baked edge strips or complete decorative scenes.

#### 2. Smallest Reusable Unit

Every meaningful prop should exist independently whenever practical.

Examples:

- stool
- crate
- basket
- lantern
- awning
- plant
- cycle
- cart

These can later be combined into reusable micro-clusters.

#### 3. Assembly Philosophy

Worlds should be composed from interchangeable modules.

Avoid baking multiple unrelated props into permanent compositions unless they represent one intentional micro-cluster.

#### 4. Asset Library Structure

Use a shared core asset library.

Extend it with city-specific skins and city-specific additions.

Shared logic.
Different visual flavour.

#### 5. Asset Hierarchy

Preferred hierarchy:

```text
Base Asset
→ Variant
→ City Skin
→ Instance
```

This preserves reuse while allowing controlled variation.

#### 6. Pivot Standards

Every asset category should use standardized pivot locations.

Pivot placement should remain consistent across all variants.

Artists should never choose pivots arbitrarily.

#### 7. Gameplay Bounds

Gameplay collision/readability bounds should remain independent from visual artwork.

Large decorative elements should not accidentally increase gameplay footprint.

#### 8. Cropping Philosophy

Cropping is encouraged when it improves world continuation.

Assets should comfortably support partial visibility at screen edges.

#### 9. Left / Right Variants

Create dedicated left/right variants only when perspective or readability actually changes.

Do not duplicate every asset unnecessarily.

#### 10. Rotation Support

Assets may support controlled rotation only where perspective remains believable.

Rotation should never distort visual logic.

#### 11. Scale Variation

Allow only small controlled scale variation.

Approximately 5-10% variation.

Avoid obvious random scaling.

#### 12. Colour Variants

Support restrained colour variants where appropriate.

Variants should preserve gameplay readability and category recognition.

#### 13. Wear Variants

Support light procedural wear variants.

Wear should add freshness without changing gameplay meaning.

#### 14. Overlay Philosophy

Road markings, surface variation, lighting effects and similar elements should exist as independent modular overlays whenever practical.

Avoid baking overlays permanently into base assets.

#### 15. Lighting Variants

Prefer lighting overlays and lighting variants over duplicate assets.

Reuse the same structural asset whenever possible.

#### 16. Day / Night Production

Day and night should share the same base assets.

Time-of-day differences should primarily come from lighting treatments and controlled variants.

#### 17. Material System

Materials should follow shared global rules while allowing restrained city-specific skins.

Do not rebuild assets simply to express city flavour.

#### 18. Naming Convention

Adopt a structured naming convention from the beginning.

Every reusable asset should be uniquely identifiable.

#### 19. Asset Independence

Assets should remain independently reusable whenever possible.

Avoid unnecessary dependencies between neighbouring assets.

#### 20. Modularity Protection

Reject any asset that significantly reduces procedural flexibility or reuse.

Reject any modular asset that harms gameplay readability.

Reject any readable asset that requires handcrafted scenes or breaks procedural
production.

Beauty alone is not sufficient reason to accept an asset.

#### 21. Future Scalability

The asset system should support dozens of future cities without changing the underlying production architecture.

Design for long-term expansion from the beginning.

#### 22. Procedural Compatibility

Every asset should assume procedural placement by default.

Manual handcrafted placement should never become a production requirement.

#### 23. Review Priority

Review order:

1. Gameplay Readability
2. Modularity
3. Reusability
4. Procedural Compatibility
5. City Flavour
6. Visual Polish

This review order follows the global hierarchy: gameplay readability is primary,
while modularity and procedural compatibility remain mandatory production
requirements.

#### 24. Immediate Rejection Rule

Reject or redesign any asset that:

- harms gameplay readability
- reduces modular reuse
- requires handcrafted placement
- breaks procedural composition
- duplicates existing functionality unnecessarily
- introduces city-specific logic into shared assets

#### 25. Final Principle

Masala Run's production pipeline should favor reusable modular assets that naturally create beautiful cities through procedural composition.

Rule:

```text
Gameplay readability is the primary creative requirement.
Modularity and procedural compatibility are mandatory production requirements.
An asset must satisfy both.
```

### Chapter 14 — Asset Categories

Asset categories are governed by Gameplay Objects Readability, Environment Props
& Micro-Clusters, City Identity Framework, Modular Asset System, Animation
Language, Visual Feedback & UI Language, Audio & Haptic Language, and
Accessibility & Comfort Language.

No separate final asset catalogue is defined by the Art Bible.

### Chapter 15 — Asset Quality Standards

Asset quality is governed by the global hierarchy and each medium-specific
chapter's review and rejection rules.

Quality requires gameplay readability, accessibility, modularity, procedural
compatibility, category recognition, restrained city flavour, and production
reuse.

### Chapter 16 — Animation Language

#### 1. Primary Role of Animation

Animation in Masala Run exists primarily to communicate gameplay.

Gameplay readability always takes precedence over visual spectacle.

Personality is added only after gameplay clarity is preserved.

Responsiveness is preferred over realism.

Rule:

```text
Gameplay communication first.
Responsiveness second.
Personality third.
Realism last.
```

#### 2. Player Responsiveness

Player animation must feel immediate.

Movement, turning, damage response, attacks, collection feedback, and recovery
states should reinforce the feeling that the player remains under direct control.

Animation must not delay input response, hide player position, obscure the
player silhouette, or make movement feel heavy.

The player may use moderate stylized exaggeration, but the exaggeration must be
quick, readable, and subordinate to control.

#### 3. Enemy Behaviour

Enemy animation must make behaviour readable before it makes enemies charming.

Enemy movement, approach rhythm, attack preparation, recovery, hit reaction, and
death should clearly communicate state and threat level.

Enemies may have personality, but personality must never confuse:

* direction of movement
* attack intent
* active danger state
* recovery state
* enemy family identity

#### 4. Attack Telegraphing

Attacks should telegraph before execution.

Telegraphs must be short, readable, and visually distinct from idle motion,
ambient motion, pickups, and decorative effects.

Execution should feel satisfying but brief.

Impact animation should clarify that something happened, then clear quickly so
the next gameplay read is not blocked.

#### 5. Idle and Secondary Motion

Idle animations should be subtle.

They may add life, warmth, and recognition, but they must not compete with
movement, attack telegraphs, hazards, pickups, or player feedback.

Secondary motion is allowed when it supports readability or controlled
personality.

Avoid loose, noisy, realistic, or delayed secondary motion that makes the object
feel disconnected from gameplay timing.

#### 6. Pickup Animation

Pickup animation should be restrained, inviting, and immediately readable.

Pickups may pulse, bounce, shimmer, or glow where useful, but they must remain
less urgent than active threats and attacks.

Pickup animation should help the player notice collectible value without making
the pickup look dangerous.

#### 7. Death and Hit Reactions

Hit reactions should be quick and readable.

Death animations may be expressive, but they must remain brief.

Enemy death animation should confirm removal without blocking the player,
covering hazards, hiding other enemies, or creating persistent visual noise.

Impacts should feel satisfying through timing, contrast, compression,
exaggeration, or simple effects, not through long animation.

#### 8. Environmental Motion

Environmental animation should be localized and low priority.

Allowed ambient motion includes:

* subtle wind behaviour
* small cloth movement
* light sign flicker
* gentle stall or awning motion
* sparse practical-light shimmer
* contained prop movement near edges

Environmental motion must never imply gameplay danger unless it is attached to a
real gameplay system.

Motion near the road edge should remain especially restrained so it does not
weaken the readable boundary defined in Camera & Composition.

#### 9. Motion Priority

Animation priority is:

1. Player
2. Threats
3. Attacks
4. Pickups
5. Ambient Environment

Higher-priority gameplay animations should never be visually obscured by
lower-priority ambient animation.

If two animations compete for attention, the lower-priority animation should be
reduced, delayed, simplified, or removed.

#### 10. Timing

Animation timing should be quick and readable.

Masala Run favours short animation beats over long realistic motion.

Timing should communicate:

* action start
* threat build-up
* execution
* hit confirmation
* recovery
* removal

Animation should only hold on a pose when the hold improves gameplay reading.

#### 11. Camera Shake

Camera shake must be limited.

It may be used only for important impacts, boss moments, or high-value feedback,
and must remain short, controlled, and gameplay-safe.

Camera shake must never make the player, threats, hazards, pickups, attacks, road
boundaries, or movement direction harder to read.

#### 12. Silhouette, Timing, and Motion

Readability should come from silhouette, timing, and motion.

Animation should preserve the object's readable shape during important gameplay
states.

Important poses should be recognizable even in a busy scene.

Avoid animation that hides the face, body direction, attack source, pickup
identity, hazard edge, or gameplay category.

#### 13. Reusable Animation Loops

Animation loops should be short, modular, and reusable.

Avoid long bespoke sequences that depend on one handcrafted scene.

Animation sets should be designed so they can be reused across many enemies,
props, pickups, cities, and procedural placements.

Loop timing should avoid obvious mechanical repetition where possible, but must
stay predictable enough for gameplay readability.

#### 14. Shared Animation Language Across Cities

All cities share the same animation philosophy.

City identity may affect motion flavour through restrained differences in prop
movement, environmental rhythm, material response, or practical-light behaviour.

City flavour must not change gameplay animation meaning.

The same player, threat, attack, pickup, and ambient priority rules apply in
every city.

#### 15. Day and Night Animation

Day and night variants use the same animation philosophy.

Night may add restrained practical-light motion, glow rhythm, or reduced ambient
activity where appropriate.

Night animation must not create extra visual noise, hide gameplay information, or
make threats harder to read.

#### 16. Modular Production

Animation should support the Modular Asset System.

Animation should work with reusable assets, reusable micro-clusters, procedural
placement, and city-specific skins.

Avoid animation that requires handcrafted scene-specific behaviour, unique
placement logic, or non-reusable timing relationships between neighbouring
assets.

Animation should be added only where it improves gameplay communication,
readability, responsiveness, personality, or world life.

#### 17. Cross-Chapter Alignment

Animation must align with Gameplay Objects Readability.

Gameplay object animation must preserve player readability, enemy readability,
pickup readability, hazard readability, attack readability, outline clarity,
scale clarity, and overlap readability.

Animation must align with Camera & Composition.

Motion must preserve the playable arena as the visual hero and keep edge motion
secondary.

Animation must align with the Modular Asset System.

Animated assets should remain reusable, procedurally compatible, and independent
wherever practical.

#### 18. Animation Review Order

Animation reviews must follow this order:

1. Gameplay Readability
2. Responsiveness
3. Timing
4. Threat Communication
5. Personality
6. City Identity
7. Polish

If polish conflicts with readability, readability wins.

#### 19. Rejection Rule

Reject or redesign any animation that:

* delays gameplay unnecessarily
* reduces readability
* prioritizes realism over responsiveness
* creates visual noise
* obscures gameplay information
* cannot be reused modularly
* depends on handcrafted scene-specific behaviour
* prioritizes city flavour over gameplay communication

#### 20. Final Principle

Animation should communicate gameplay first, feel responsive, add controlled
personality, remain modular, support procedural production, and make the world
feel alive without distracting from survival gameplay.

Rule:

```text
Gameplay first.
Responsive motion.
Controlled personality.
Reusable animation.
Alive world.
No survival distraction.
```

### Chapter 17 — Visual Feedback & UI Language

#### 1. Core Direction

Masala Run uses controlled, punchy and playful visual feedback.

Visual feedback exists to confirm gameplay events first and add satisfaction
second.

Feedback strength must scale with gameplay importance.

Feedback must help the player understand:

* what happened
* who caused it
* whether it was effective
* whether immediate action is required

Not every gameplay event should receive equal visual emphasis.

Rule:

```text
Gameplay meaning first.
Readability second.
Satisfaction third.
Personality fourth.
Spectacle only when earned.
```

#### 2. Visual Feedback Hierarchy

Use this general priority:

```text
Player damage / critical danger
> major enemy attacks and hazards
> major player attacks
> ordinary enemy hits
> ordinary player attacks
> pickups and rewards
> secondary feedback
> ambient effects
```

Lower-priority feedback must never obscure higher-priority gameplay
information.

The player, immediate threats, hazards, movement boundaries, critical attacks,
and road readability must remain readable at all times.

#### 3. Basic Player Attacks

Ordinary attacks should feel:

* small
* crisp
* readable
* responsive
* short-lived
* controlled during dense gameplay

They may use:

* compact impact shapes
* brief flashes
* small directional particles
* short enemy reactions
* restrained sound and camera response where appropriate

Basic attacks must not flood the screen or hide threats.

#### 4. Special and Upgraded Attacks

Special or upgraded attacks may be more expressive than basic attacks.

They may use:

* larger impact shapes
* stronger colour accents
* additional particles
* brief controlled glow
* stronger enemy reactions
* limited camera shake

They must still preserve:

* player position
* enemy visibility
* hazard visibility
* movement boundaries
* road readability

No attack may become visually dominant for longer than its gameplay importance
justifies.

#### 5. Enemy Hit Feedback

Enemy-hit confirmation should use a combined system rather than relying on one
cue.

Recommended combination:

```text
brief hit flash
+ short recoil
+ compact impact effect
+ optional damage number
+ visible health response where relevant
```

Hit feedback should remain readable during rapid or repeated attacks.

Hit flashes must be brief and controlled.

Rapid-fire attacks may throttle flash frequency to avoid flickering or visual
noise.

Enemy silhouettes must remain recognizable during hit feedback.

#### 6. Player Damage Feedback

Player damage should use layered but tightly controlled feedback.

Possible elements:

* clear player reaction
* brief disruption of the player's protected visual identity
* local impact effect
* short screen-edge warning
* small proportional camera response
* clear health reduction

Avoid prolonged full-screen overlays or effects that obscure gameplay.

Screen-edge damage feedback should be:

* brief
* proportional to damage severity
* stronger for heavy or critical damage
* subtle for minor damage
* never persistent enough to reduce visibility

The centre of the gameplay screen must remain clear.

#### 7. Camera Shake

Camera shake should be used sparingly and proportionally.

It may be used for:

* heavy player damage
* major enemy attacks
* boss impacts
* powerful special attacks
* major upgrades
* significant destruction or defeat moments

Routine attacks should use little or no camera shake.

Camera shake must never reduce movement control, player tracking, threat
readability, or road readability.

#### 8. Enemy Death and Cleanup

Ordinary enemy deaths should be:

* short
* expressive
* immediately readable
* satisfying
* quickly cleaned up

Recommended structure:

```text
short reaction
→ compact collapse / pop / burst
→ fast cleanup
```

Possible defeat treatments:

* small dust burst
* stylized pop
* compact food-themed effect where contextually appropriate
* quick scale-down
* rapid shadow removal

Do not leave persistent defeated bodies on the playable road.

Persistent remains would create visual clutter and interfere with gameplay
readability.

#### 9. Boss and Major Enemy Defeat

Bosses and major enemies may receive longer and more celebratory defeat feedback
than normal enemies.

Allowed elements:

* stronger reaction
* staged collapse
* larger controlled particles
* reward burst
* modest camera shake
* short celebratory emphasis

Boss defeat feedback must remain bounded and consistent with the normal visual
language.

Avoid full-screen cinematic effects that disconnect from gameplay or cover
critical information.

#### 10. Particle Style

Particles should match the clean flat-cartoon visual language.

They should use:

* stylized flat shapes
* simple readable silhouettes
* one or two-tone colour treatment
* short lifetimes
* limited scale variation
* clear directional behaviour where relevant

Avoid:

* realistic particle simulation
* volumetric smoke
* excessive bloom
* painterly effects
* dense uncontrolled particle clouds
* realistic debris rendering

Particle quantity must scale with:

* gameplay importance
* current screen density
* overlap risk
* readability requirements
* device-performance constraints

A powerful action does not always require many particles.

Strength may instead come from clearer timing, a stronger silhouette, a larger
single impact shape, or cleaner colour contrast.

#### 11. Dust Effects

Dust should be localized, short-lived and linked to specific action or
atmosphere.

Possible uses:

* movement bursts
* enemy landings
* strong impacts
* Jaisalmer hazards
* selected environmental ambience
* spawn and defeat feedback

Dust should remain:

* low
* compact
* brief
* subordinate to gameplay objects

Avoid continuous ambient dust across the playable road.

#### 12. Food-Themed Effects

Food-themed feedback may be used selectively to reinforce Masala Run's
personality, humour and thematic identity.

Appropriate uses may include:

* food-based attacks
* food pickups
* enemy-specific defeat effects
* upgrade celebrations
* reward moments

Do not use ingredient or food confetti for every action.

Food effects must strengthen meaning or personality rather than become
decorative noise.

#### 13. Enemy Spawn Feedback

Enemy spawns should use short readable arrival cues.

Possible cues:

* compact dust puff
* short scale-in
* shadow formation
* brief ground cue
* quick entry animation

Spawn cues must not resemble:

* pickups
* road hazards
* rewards
* interaction markers
* player attacks

Spawn-warning strength should scale with threat severity.

Recommended hierarchy:

```text
Ordinary enemy
→ minimal or movement-based arrival cue

Elite enemy
→ clearer short warning

Boss / high-risk spawn
→ stronger location and timing telegraph
```

Warnings must be actionable and proportional.

#### 14. Pickup Collection Feedback

Pickup collection should use short, attractive confirmation feedback.

Recommended sequence:

```text
small pop / bounce
→ compact sparkle or streak
→ quick movement toward player or HUD where appropriate
→ clear confirmation
```

Pickups should feel rewarding without hiding enemies, hazards or movement
information.

Pickup effects must remain less urgent than immediate threats.

#### 15. Damage Numbers

Damage numbers are allowed, but must be restrained and prioritized.

They should support:

* build understanding
* progression feedback
* damage comparison
* critical-hit recognition
* status-effect recognition

Rules:

* combine or batch rapid low-value hits where practical
* prioritize critical or unusually large damage
* use compact readable typography
* use short display lifetimes
* prevent number stacking from covering gameplay
* support future settings to reduce or disable damage numbers

Damage-number hierarchy:

```text
Normal damage
→ compact and neutral

Critical damage
→ slightly larger with restrained emphasis

Status / special damage
→ controlled category colour or small symbol

Healing
→ separate positive visual language
```

Avoid giving every damage type a unique font, effect or bright colour.

Do not create a rainbow of competing numbers.

#### 16. Enemy Health Bars

Enemy health bars should appear only where they improve gameplay decisions.

Recommended rules:

```text
Ordinary enemies
→ usually no persistent health bar

Durable enemies
→ health bar may appear after damage or when relevant

Elite enemies
→ clearer health bar

Bosses
→ persistent dedicated health display
```

Avoid placing permanent health bars above every enemy.

World-space health bars should be:

* simple
* compact
* highly readable
* minimally framed
* stable in size
* lightly animated
* free from decorative city styling

They are gameplay instruments, not decorative assets.

#### 17. HUD

HUD means Heads-Up Display.

The HUD is the persistent screen-space interface used to show run and player
information such as:

* player health
* experience or level progress
* timer
* currency or score
* ability status
* pause or settings controls
* boss health
* other persistent run information

The HUD should be:

* globally consistent across cities
* clean
* compact
* lightly Masala Run-branded
* readable on mobile
* subordinate to the playable road

The HUD may express the global Masala Run identity through:

* clean flat panel shapes
* typography
* icon language
* restrained accent colours
* rounded or simplified visual forms

Do not heavily reskin the HUD for each city.

City identity should primarily live inside the game world, not inside persistent
interface decoration.

Avoid generic system UI, but also avoid decorative HUD treatment that competes
with gameplay.

#### 18. HUD Screen Occupancy

The HUD should occupy minimal fixed zones around the screen perimeter.

Recommended approach:

* compact persistent status area near the top
* limited corner controls where necessary
* temporary notifications that clear quickly
* no large permanent side panels
* no persistent information over the road centre
* preserve visibility of the approximately 76-80% playable road area

The playable road must remain visually dominant.

#### 19. World-Space UI vs Screen-Space UI

Use world-space UI only for local, immediate and actionable information.

World-space UI may include:

* local enemy health
* status icons
* targeting cues
* interaction markers
* danger warnings
* object-specific feedback

Use screen-space UI for persistent player and run information.

Screen-space UI may include:

* player health
* level and experience
* timer
* score or currency
* ability status
* boss health
* pause and system controls
* persistent progression information

Rule:

```text
Local information stays near the object.
Persistent information stays in the HUD.
```

World-space UI must not cover the road with unnecessary labels, bars or icons.

#### 20. Feedback and UI Style Integration

Visual feedback and UI must remain consistent with Masala Run's established
visual language:

* clean flat cartoon shapes
* readable silhouettes
* restrained colour use
* controlled outlines
* minimal shading
* limited glow
* no painterly effects
* no realistic material rendering
* no excessive decorative detail
* no generic mobile-template appearance

Gameplay category colours and contrast hierarchy must remain intact.

Lighting may influence feedback slightly, but must not rewrite gameplay meaning.

Day and night must use the same feedback and UI logic.

Cities may add restrained flavour to specific world effects where appropriate,
but the global readability system remains unchanged.

#### 21. Performance and Density Safety

Visual feedback must remain safe during dense survivors-style gameplay.

The system should support:

* particle-count limits
* feedback throttling
* damage-number batching
* effect lifetime limits
* overlap controls
* reduced feedback during high-density moments
* performance-scalable quality settings where appropriate

This chapter defines visual principles only.

It does not implement systems or gameplay code.

#### 22. Cross-Chapter Alignment

Visual feedback and UI must align with Gameplay Objects Readability.

Feedback must preserve player readability, enemy readability, hazard
readability, pickup readability, attack readability, outline clarity, overlap
safety, and protected gameplay colour ownership.

Visual feedback and UI must align with Camera & Composition.

The playable arena remains the visual hero. Persistent UI, decorative feedback,
and ambient effects must not cover the road centre or weaken movement-boundary
readability.

Visual feedback and UI must align with Animation Language.

Feedback timing must stay responsive, short, readable, and proportional.

Visual feedback and UI must align with Colour & Contrast Language.

Feedback colour may add emphasis, but must not create new meanings that compete
with gameplay category colours.

#### 23. Review Priority

Review Visual Feedback & UI Language in this order:

1. Gameplay meaning
2. Player and threat readability
3. Timing and responsiveness
4. Visual hierarchy
5. Overlap safety
6. Consistency with Animation Language
7. Consistency with Colour & Contrast Language
8. Density and performance safety
9. Satisfaction
10. Personality
11. Polish

Beauty and spectacle never override clarity.

#### 24. Immediate Rejection Rule

Reject or redesign any feedback or UI treatment that:

* hides the player
* hides enemies or hazards
* obscures movement boundaries
* covers the playable road centre
* persists longer than necessary
* creates excessive particles
* creates frequent or disruptive camera shake
* produces unreadable damage-number clutter
* makes pickups appear more urgent than threats
* makes world-space UI dominate gameplay
* uses prolonged screen overlays
* breaks the clean flat-cartoon style
* breaks gameplay colour ownership
* resembles unrelated gameplay categories
* requires handcrafted scene-specific behaviour
* cannot scale to dense procedural gameplay
* prioritizes spectacle over gameplay communication

#### 25. Final Principle

Masala Run uses controlled, punchy and playful visual feedback.

Feedback confirms gameplay first and adds satisfaction second.

Strength scales with gameplay importance.

Basic actions remain compact and readable.

Major actions may become more expressive without hiding gameplay.

Particles are flat, stylized, short-lived and density-controlled.

Damage feedback uses layered cues without prolonged overlays.

Enemy deaths are short, expressive and quickly cleaned up.

Spawns are readable and proportionally telegraphed.

Damage numbers are restrained and prioritized.

Enemy health bars appear only where they improve decisions.

World-space UI communicates local actionable information.

Screen-space UI carries persistent player and run information.

The HUD remains globally consistent, clean and lightly branded rather than
heavily city-skinned.

The road centre remains protected from persistent UI and decorative feedback.

Rule:

```text
Gameplay meaning first.
Readability second.
Satisfaction third.
Personality fourth.
Spectacle only when earned.
```

### Chapter 18 — Audio & Haptic Language

#### 1. Core Philosophy

Audio exists to communicate gameplay first, then add satisfaction and world
personality.

Sound should help the player understand:

* what happened
* where it happened
* whether it is dangerous
* whether an action succeeded
* whether immediate action is required

Masala Run's sound personality should feel:

* playful
* tactile
* warm
* punchy
* controlled
* responsive
* mobile-game appropriate

It should not feel:

* realistic and gritty
* excessively cartoonish
* loud and chaotic
* arcade-generic
* constantly comedic

Rule:

```text
Gameplay meaning
→ Readability
→ Satisfaction
→ Personality
→ Spectacle only when earned
```

#### 2. Audio Priority Hierarchy

Sound intensity and prominence must follow gameplay importance.

Recommended priority:

```text
Critical player danger
> boss and major enemy warnings
> high-risk hazards
> major player attacks
> player damage
> ordinary enemy attacks
> ordinary player attacks
> pickups and rewards
> UI confirmation
> ambient city sound
```

Lower-priority sounds must yield to higher-priority gameplay cues.

Not every event should receive equal volume, layering, duration, frequency range,
repetition rate, or haptic strength.

#### 3. Player Movement Audio

Ordinary movement audio should be subtle and rhythmic.

It may:

* lightly confirm movement
* reflect broad surface categories where useful
* use restrained sound variation
* reduce in prominence during dense combat
* avoid tiring continuous repetition

Movement audio must never compete with attacks, hazards, enemy warnings, or
player-damage cues.

#### 4. Basic Player Attacks

Basic attacks should sound:

* compact
* crisp
* responsive
* readable
* short
* repetition-safe

They should use:

* clear attack initiation
* clear impact where relevant
* short sound tails
* subtle sound variants
* restrained low-frequency energy
* restrained overall volume

Basic attacks must remain comfortable during rapid repetition.

#### 5. Upgraded and Special Attacks

Upgraded and special attacks may use stronger sound layering proportional to
gameplay importance.

They may use:

* broader frequency range
* heavier impact
* stronger but controlled low-end
* additional tactile or food-related texture
* a short tonal or musical accent
* clearer power differentiation

They must not mask:

* enemy telegraphs
* boss warnings
* player-damage cues
* high-risk hazards
* critical state warnings

#### 6. Ability Sound Families

Individual weapons and abilities should have recognizable audio identities, but
they should belong to shared sound families rather than sounding like unrelated
systems.

Ability audio should communicate:

* attack type
* timing
* power level
* range or direction where relevant
* impact behaviour where relevant

Consistency should come from shared construction, timing principles, mix
hierarchy, and material abstraction.

#### 7. Enemy Audio

Enemy sound exists to communicate threat first and personality second.

Enemy audio should help communicate:

* proximity where useful
* arrival
* attack wind-up
* attack execution
* enemy type
* elite or boss status
* damage reaction where useful
* defeat

Enemy personality and humour are welcome only after danger remains clear.

Rule:

```text
Threat communication first.
Personality second.
```

#### 8. Enemy Idle Sound

Ordinary enemies should not produce constant idle vocalisations during large
waves.

Enemy sound should be primarily event-driven.

Appropriate ordinary-enemy sound moments include:

* arrival
* attack telegraph
* attack
* meaningful damage reaction
* defeat

Constant enemy noise should be avoided because it would become unreadable during
dense survivors-style gameplay.

#### 9. Enemy Attack Telegraphs

All meaningful enemy attacks should use clear and proportional audio telegraphs
where sound improves readability.

Hierarchy:

```text
Ordinary attack
→ brief local cue

Elite attack
→ clearer and more recognizable warning

Boss or high-risk attack
→ strong signature or directional telegraph
```

Telegraphs must occur early enough to be actionable.

Stronger danger may use clearer timing, broader sound presence, stronger
identity, or more recognizable warning structure.

#### 10. Positional Audio

Positional or stereo audio may support:

* offscreen threats
* boss attacks
* incoming projectiles
* directional hazards
* important spatial events

However, positional audio must never be the only warning system.

Gameplay must remain understandable:

* with sound muted
* through a single mobile speaker
* through headphones
* under accessibility settings

Visual and animation telegraphs remain essential.

#### 11. Ordinary Hit Audio

Ordinary enemy hits should sound short, tactile and material-aware.

Recommended structure:

```text
attack sound
+ compact impact
+ optional enemy reaction
```

Do not play every layer loudly for every rapid hit.

The audio system should support restrained variation, batching, throttling,
prioritisation, or simplification during rapid repeated attacks.

#### 12. Player Damage Audio

Player damage must be clearer and more urgent than ordinary enemy damage.

Player-damage sound should include:

* immediate confirmation
* a protected player-specific identity
* stronger feedback for heavy damage
* distinct treatment for critical danger
* short duration
* high recognizability

The player must immediately understand that they were hit.

#### 13. Critical Health Audio

Critical health may use a repeating warning system, but it must remain sparse and
non-fatiguing.

Recommended structure:

* a clear initial warning
* occasional restrained reminder
* no constant loud heartbeat loop
* no continuous panic-inducing sound
* support for reduced or disabled warning settings where appropriate

Urgency must not become annoyance.

#### 14. Enemy Death Audio

Ordinary enemy deaths should be:

* short
* expressive
* readable
* quickly cleared
* repetition-safe

Recommended structure:

```text
compact defeat cue
→ brief material or personality accent
→ immediate cleanup
```

Elite and boss defeats may use stronger and longer treatments, but they must not
block subsequent gameplay cues.

#### 15. Pickup Audio

Pickup sounds should be:

* attractive
* bright
* brief
* rewarding
* less urgent than threats

Rule:

```text
Pickups invite.
Threats interrupt.
```

Rapid pickup collection should support:

* batching
* throttling
* restrained pitch variation
* rising sequences where useful
* prevention of uncontrolled sound stacking

#### 16. Pickup Sound Families

Different pickup categories may have distinct sounds within a shared reward
family.

Possible categories include:

* health
* currency
* experience
* temporary power
* major upgrade
* rare reward

They should feel related while remaining identifiable.

Pickup sounds must not resemble:

* enemy warnings
* hazards
* player damage
* hostile attacks
* urgent system alerts

#### 17. Major Upgrades and Level-Ups

Major upgrades, level-ups, or significant reward moments may use celebratory and
memorable audio.

They may briefly rise above ordinary combat audio, but should:

* remain short
* feel rewarding
* avoid masking active threats
* preserve danger telegraphs
* remain consistent with the playful Masala Run sound world
* avoid long cinematic interruption

#### 18. Hazard Audio

Hazards should use shared functional warning logic with city-specific material
skins.

Rule:

```text
Same gameplay meaning
→ same timing and urgency logic

Different city
→ different material flavour
```

Example:

```text
Slowdown hazard

Mumbai skin
→ shallow water, ripple or splash texture

Jaisalmer skin
→ loose sand, scrape or dust texture

Shared meaning
→ recognizable slowdown-warning structure
```

City flavour must not change the gameplay meaning.

#### 19. Environmental Prop Audio

Decorative environmental props should produce sound only where:

* gameplay interacts with them
* occasional ambience genuinely benefits
* the sound remains localized and low priority
* it does not imply interaction where none exists

Decorative props should not constantly announce themselves.

Ambient prop sound must never make a non-interactive object appear actionable.

#### 20. Ambient City Sound

City ambience should be light, layered and spacious.

Possible components:

* distant street presence
* soft wind
* occasional stall activity
* faint architectural or material cues
* sparse localized environmental details
* subtle signs of life

Avoid:

* dense literal street recordings
* continuous traffic-like noise
* stereotype-heavy soundscapes
* chaotic stock "India ambience"
* ambience that masks gameplay cues
* ambience that creates a realistic documentary tone

Masala Run presents a romanticized street world. The ambience should support that
same principle.

#### 21. Implied Human Presence

Ambient sound may imply human presence even where visible people are absent.

Possible cues:

* distant indistinct chatter
* utensils
* shutters
* faint stall activity
* distant movement
* occasional non-verbal activity

Avoid:

* clear dialogue
* identifiable spoken sentences
* voices that imply visible NPCs
* loud crowd beds
* narrative dialogue inside ordinary ambience

#### 22. Day and Night Ambience

Day and night should share the same city identity while using different density
and mood.

Day may feel:

* slightly livelier
* more open
* warmer
* more active

Night may feel:

* calmer
* more spacious
* more localized
* slightly cooler in inactive spaces
* warmer around practical activity

Night must not become silent, threatening, or harder to read unless a future
gameplay mechanic deliberately requires it.

#### 23. City-Specific Audio Identity

Each city may use restrained audio flavour through:

* local material textures
* environmental rhythm
* practical activity
* ambience density
* wind or atmospheric character
* selected street-culture cues
* city-specific surface response

City audio must avoid:

* stereotypes
* tourist-documentary treatment
* stock regional clichés
* maximum-density ambience
* city flavour overriding gameplay readability

Rule:

```text
Same gameplay audio logic.
Different restrained city flavour.
```

#### 24. Food-Themed Audio Identity

Food may influence Masala Run's sound identity through controlled tactile
flavour.

Possible texture families include:

* crisp
* crunchy
* soft
* sizzling
* bubbling
* sticky
* metallic utensil accents
* light container or serving sounds

Food-influenced sound may support:

* food-based attacks
* pickups
* upgrades
* selected enemy personalities
* reward moments
* ability identities

Avoid making every sound event resemble literal cooking.

Food texture must strengthen identity or gameplay meaning rather than become a
constant joke.

#### 25. UI Sound Language

UI audio should feel:

* clean
* compact
* friendly
* lightly tactile
* consistent
* readable
* restrained
* lightly branded

UI sound hierarchy should distinguish:

* ordinary navigation
* selection
* confirmation
* cancellation
* warning
* unavailable action
* major unlock or progression event

Important actions should receive stronger confirmation than routine taps.

UI audio should not be heavily reskinned for each city.

The UI should primarily express the global Masala Run identity.

#### 26. Music Behaviour

Music should adapt through broad layers rather than react to every individual
gameplay event.

Recommended structure:

```text
Base city or gameplay layer
+ increased-pressure layer
+ elite or boss layer
+ major success or transition accent
```

Music should:

* support momentum
* reinforce world personality
* preserve gameplay cue readability
* avoid constant micro-reactivity
* allow important warnings to remain intelligible
* avoid fighting the SFX mix

Critical gameplay audio must remain clear during music-heavy moments.

#### 27. Haptic Philosophy

Masala Run should use sparse, hierarchical, optional and tightly synchronized
haptic feedback.

Haptics should complement sound, animation and visual feedback.

They must not compensate for unclear gameplay communication.

Haptic hierarchy:

```text
Strongest
→ heavy player damage
→ boss impact or major danger
→ major upgrade or milestone

Medium
→ important player attack
→ elite defeat
→ significant interaction

Light
→ selected pickup
→ meaningful UI confirmation
→ minor event only where genuinely useful

None
→ routine movement
→ most ordinary attacks
→ ambient events
→ repeated low-value hits
```

#### 28. Haptic Repetition and Comfort

Haptics should:

* never run continuously
* avoid triggering for every rapid event
* batch or throttle repeated triggers
* remain comfortable during long sessions
* preserve battery and device comfort where relevant
* support reduced or disabled settings
* avoid turning ordinary gameplay into constant vibration

A stronger event should receive a stronger or more recognizable haptic pattern
only when justified by gameplay importance.

#### 29. Shared System Across Cities

All cities should share:

* gameplay sound hierarchy
* danger-warning logic
* reward logic
* player-damage identity
* ability-family construction
* UI sound language
* music-layer logic
* haptic hierarchy
* repetition-control principles
* mobile comfort principles

Cities may differ through restrained:

* ambience
* material skins
* practical environmental cues
* surface response
* selected food or cultural texture
* day/night sound flavour

The player should not need to relearn gameplay meaning in each city.

#### 30. Repetition Control

Audio production and implementation should assume frequent repetition during
dense survivors-style gameplay.

The design must support:

* subtle variants
* randomised selection within controlled families
* pitch variation where appropriate
* volume variation where appropriate
* cooldowns
* throttling
* batching
* concurrency limits
* priority-based voice stealing
* reduced layering during dense moments
* shorter tails for frequently repeated actions

This chapter defines the creative requirement for repetition safety.

Do not add implementation code.

#### 31. Modular Audio Production

Audio should follow modular production principles.

Preferred structure:

```text
Base sound family
→ gameplay variant
→ city or material skin
→ runtime instance
```

Day and night should reuse the same core sound language.

Avoid handcrafted scene-specific audio systems that cannot scale to future
cities.

#### 32. Cross-Chapter Alignment

Audio and haptics must align with Animation Language.

Sound and vibration should reinforce timing, responsiveness, threat
communication, hit confirmation, pickups, deaths, and readable motion.

Audio and haptics must align with Visual Feedback & UI Language.

Sound, vibration, visual feedback, and UI should share the same gameplay
priority hierarchy and density-control logic.

Audio and haptics must align with Gameplay Objects Readability.

Audio cues must preserve player readability, threat readability, hazard
readability, pickup meaning, attack communication, and overlap safety.

Audio and haptics must align with the Modular Asset System.

Sound families should remain reusable, city-skinnable, and compatible with
procedural generation.

#### 33. Review Priority

Review Audio & Haptic Language in this order:

1. Gameplay meaning
2. Threat and state communication
3. Player feedback clarity
4. Timing and responsiveness
5. Mix hierarchy
6. Repetition safety
7. Dense-gameplay readability
8. Mobile comfort
9. Consistency with Animation Language
10. Consistency with Visual Feedback & UI Language
11. Modularity and reuse
12. City flavour
13. Satisfaction
14. Personality
15. Polish

Beauty, humour, realism, musicality and spectacle must never override gameplay
communication.

#### 34. Rejection Rules

Reject or redesign any audio or haptic treatment that:

* masks enemy telegraphs
* hides critical player-damage feedback
* makes pickups more urgent than threats
* creates constant enemy noise
* becomes tiring during rapid repetition
* depends entirely on stereo positioning
* makes gameplay unclear when sound is muted
* uses ambience dense enough to compete with gameplay
* uses stereotype-heavy city audio
* turns every action into a comedy sound
* uses excessive bass, volume, tails or layering
* makes night gameplay harder through reduced audio readability
* triggers haptics continuously
* triggers haptics for every ordinary repeated event
* causes mobile discomfort
* breaks the shared gameplay meaning across cities
* requires handcrafted scene-specific behaviour
* cannot scale modularly
* prioritizes spectacle over gameplay communication

#### 35. Final Principle

Masala Run uses playful, tactile and gameplay-first audio with restrained city
ambience and sparse hierarchical haptics.

Sound communicates danger, action, success and state changes before adding
personality.

Important cues remain clear during dense survivors-style play, while ordinary
repeated actions stay compact and repetition-controlled.

Shared audio families provide consistent gameplay meaning across cities, with
restrained city-specific material and ambient flavour.

Haptics are optional, proportional and reserved for meaningful events rather than
constant stimulation.

Rule:

```text
Gameplay meaning first.
Readable sound.
Responsive feel.
Restrained flavour.
Sparse haptics.
No constant noise.
```

### Chapter 19 — Accessibility & Comfort Language

#### Core Philosophy

Masala Run should be readable and comfortable by default, with clear optional
controls that allow players to adapt the experience further.

Accessibility is part of the core gameplay language, not merely a settings-menu
feature or a late-stage correction.

The default presentation should already be broadly understandable, readable, and
comfortable. Accessibility settings extend that foundation rather than compensate
for unclear design.

Accessibility must strengthen the established gameplay language without
weakening, replacing, or visually cluttering it.

This chapter defines creative, presentation, interaction, and experience
principles. It does not define implementation architecture or platform-specific
code.

Rule:

```text
Readable and comfortable by default.
Adaptable through clear optional controls.
Never dependent on one sensory cue.
```

#### 1. Built-In Clarity with Optional Controls

Masala Run should use built-in clarity supported by optional accessibility
controls.

The base game should already provide:

* readable silhouettes
* clear gameplay hierarchy
* understandable category language
* restrained visual density
* actionable threat communication
* comfortable motion
* repetition-controlled audio and haptics
* readable mobile typography
* clear touch interaction

Settings should allow further adjustment for different visual, auditory, motion,
haptic, ergonomic, and comfort needs.

Accessibility settings must not become an excuse for unclear default design.

#### 2. Multi-Cue Gameplay Communication

Important gameplay meaning should use at least two complementary communication
cues where practical.

Possible cue families include:

* shape
* silhouette
* outline
* colour
* contrast
* motion
* position
* icon
* pattern
* visual effect
* sound
* caption
* haptic feedback

Critical gameplay information may use more than two cues when justified.

No important gameplay event should depend entirely on one colour, sound,
animation, vibration, stereo position, or small text label.

Rule:

```text
Important meaning should survive the loss of any one cue.
```

#### 3. Colour-Vision Safety

Gameplay meaning must never depend on colour alone.

Colour should work alongside non-colour communication such as:

* silhouette
* outline strength
* shape
* iconography
* motion
* boundary treatment
* pattern
* position
* animation timing
* visual hierarchy

The existing semi-protected gameplay colour system remains valid, but colour
ownership must always be reinforced by other readable cues.

#### 4. Colour-Vision Support Options

Masala Run should support colour-vision accessibility through:

* tested preset colour treatments
* gameplay-specific category adjustments where practical
* preserved contrast hierarchy
* preserved category distinction
* stable player readability
* stable hazard and threat recognition

Preset support may include common colour-vision needs, but full-screen filtering
alone should not be treated as sufficient.

Player, enemy, hazard, pickup, attack, healing, warning, and UI categories should
remain distinguishable through more than colour.

#### 5. Hazard Accessibility

Hazards should communicate danger through a combined system:

```text
shape
+ readable boundary
+ motion or state cue where appropriate
+ colour / contrast
```

Hazards must remain distinguishable from:

* safe road variation
* passive stains
* road overlays
* decorative effects
* environmental props
* pickups
* spawn markers

Persistent warning icons should not be added above every hazard by default,
because this would create world-space UI clutter.

The hazard itself should remain readable wherever possible.

#### 6. Optional Player-Location Assistance

The player must remain readable by default through the existing protected system
of:

* silhouette
* outline
* colour identity
* contrast
* animation
* grounding cue

Optional player-location assistance may strengthen this with restrained
treatments such as:

* stronger outline
* clearer contact marker
* controlled highlight
* optional subtle ring
* reduced surrounding visual noise

Avoid permanent oversized arrows, markers, or UI elements that disconnect the
player from the world or dominate gameplay.

#### 7. Typography

Masala Run should use clear, compact, lightly branded typography.

Typography should preserve:

* mobile readability
* clear character distinction
* comfortable spacing
* rapid comprehension
* consistency across cities
* consistency across day and night
* compatibility with supported text-size presets

Avoid:

* decorative lettering that reduces readability
* compressed text
* excessive stylization
* thin low-contrast text
* tiny labels carrying essential meaning
* city-specific typography that changes gameplay understanding

Typography may carry restrained global Masala Run personality, but readability
always comes first.

#### 8. Text-Size Presets

The game should support several tested text and UI-size presets rather than
unrestricted scaling that may break layouts.

Recommended conceptual presets:

* Standard
* Large
* Extra Large

All supported presets should be intentionally designed and reviewed.

Important information must remain readable and must not be clipped, overlap
other UI, or cover critical gameplay areas.

#### 9. HUD Scaling

Critical HUD information and secondary controls should support different scaling
priorities.

Critical information may include:

* player health
* experience and level progress
* boss health
* critical status
* important warnings
* ability state where immediately relevant

Secondary information may include:

* pause controls
* less urgent counters
* optional run statistics
* non-critical labels

Avoid treating the entire HUD as one uniformly scaled image if that prevents
critical information from receiving stronger accessibility support.

The playable road centre must remain protected at all supported HUD scales.

#### 10. HUD Information Density

The persistent HUD should show essential information clearly and compactly.

Secondary data may be:

* optional
* contextual
* expandable
* temporarily displayed
* configurable where appropriate

Avoid showing every useful metric persistently.

Accessibility should improve comprehension, not create permanent UI overload.

#### 11. Damage-Number Controls

Damage numbers should support adjustable presentation.

Possible controls should conceptually include:

* enable or disable
* reduced density
* size presets
* emphasis level
* critical-hit emphasis
* batching or simplified display

Damage-number settings must preserve gameplay understanding while reducing
visual fatigue and overlap.

Essential combat feedback must not depend entirely on damage numbers.

#### 12. Enemy Health-Bar Accessibility

The approved enemy health-bar hierarchy remains:

```text
Ordinary enemies
→ usually no persistent health bar

Durable enemies
→ health bar may appear after damage or when relevant

Elite enemies
→ clearer health bar

Bosses
→ persistent dedicated health display
```

Accessibility options may increase health-bar visibility, size, contrast, or
duration where useful.

Do not force persistent health bars over every ordinary enemy by default.

Health bars remain gameplay instruments and must not become decorative or
city-skinned.

#### 13. Screen-Shake Controls

Screen shake should support at least three conceptual levels:

* Off
* Reduced
* Full

The existing rule remains that screen shake is sparse and proportional.

Reduced or disabled shake must not remove the gameplay meaning of an event.

Other cues such as impact effects, animation, sound, haptics, or UI response
must continue to communicate the event clearly.

#### 14. Reduced-Motion Support

Reduced-motion support should address more than camera shake.

It should reduce or simplify non-essential motion such as:

* rapid zoom
* strong screen pulses
* excessive bounce
* repeated oscillation
* screen displacement
* continuous ambient movement
* decorative parallax where applicable
* unnecessary large-scale effect travel

Reduced-motion mode must preserve:

* player responsiveness
* attack timing
* enemy telegraphs
* hazard timing
* gameplay state changes
* input feedback
* threat recognition

Do not disable all animation.

Functional gameplay motion remains necessary.

#### 15. Animation Under Reduced Motion

Reduced-motion treatment should shorten, simplify, or replace non-essential
movement without changing gameplay timing.

Do not slow gameplay animations in ways that alter:

* responsiveness
* attack timing
* telegraph duration
* hit confirmation
* hazard timing
* enemy behaviour understanding

The gameplay event remains mechanically and temporally identical.

Only unnecessary visual travel, bounce, pulse, shake, or repetition should be
reduced.

#### 16. VFX and Particle Reduction

Accessibility-focused VFX reduction should be distinct from technical
graphics-quality settings.

A player may need fewer effects even when using a powerful device.

Reduced-effects options may limit:

* decorative particles
* repeated flashes
* secondary trails
* ambient effects
* excessive impact layering
* persistent glow
* non-essential debris
* duplicate feedback layers

Critical telegraphs, danger boundaries, attack direction, player position, and
essential state feedback must remain.

Reduced VFX must never remove required gameplay information.

#### 17. Flash and Pulse Safety

Avoid rapid, repeated, high-contrast flashing.

Important flashes and pulses should be:

* brief
* proportional
* controlled
* low in repetition
* replaceable through safer treatments where practical

Reduced-flash treatment may use:

* outline changes
* controlled colour transitions
* shape changes
* scale changes
* brief opacity shifts
* directional markers
* animation cues

Do not remove all visual emphasis, but avoid unnecessary repeated flashing and
extreme full-screen contrast changes.

#### 18. Audio Accessibility Controls

Audio should support separate controls for major functional categories where
practical.

Conceptual categories may include:

* master volume
* music
* gameplay sound effects
* ambience
* UI sounds
* voice or dialogue where applicable
* critical gameplay cues

Players should be able to reduce ambience or music while preserving important
threat and state information.

Audio settings must remain clear, understandable, and free from unnecessary
complexity.

#### 19. Muted-Audio Playability

Masala Run must remain understandable and playable with sound muted.

All essential audio information must have a visual equivalent.

This includes:

* critical danger
* player damage
* boss warnings
* enemy telegraphs
* high-risk hazards
* important state changes
* major rewards
* unavailable actions where relevant

Sound may reinforce gameplay meaning, but it must never be the only source of
essential information.

#### 20. Subtitles and Gameplay Captions

Subtitles should be used for dialogue where dialogue exists.

Optional gameplay captions may communicate important non-speech sounds such as:

* major off-screen threats
* boss warnings
* important directional danger
* critical state changes
* significant object-specific audio events

Do not caption every ordinary attack, movement sound, pickup, or ambient sound.

Captions must remain selective and actionable.

#### 21. Caption Presentation

Gameplay captions should be:

* compact
* readable
* categorized where useful
* directional where useful
* short-lived
* positioned away from the protected road centre
* visually distinct from ordinary dialogue subtitles
* consistent across cities

Avoid attaching floating captions to every sound source.

Captions must not create world-space clutter or become more visually urgent than
the threat they describe.

#### 22. Stereo and Mono Safety

Stereo and positional audio may improve spatial awareness, but must never carry
essential meaning alone.

Important events must remain understandable through:

* a single mobile speaker
* mono output
* headphones
* reduced audio settings
* captions where relevant
* visual telegraphs
* animation
* timing
* sound identity independent of position

Directional audio is supportive, not exclusive.

#### 23. Haptic Controls

Haptic feedback should support:

* Off
* Reduced
* Full

Additional category controls may be supported where practical, but are not
required by this chapter.

Haptics remain:

* optional
* hierarchical
* sparse
* repetition-controlled
* synchronized with meaningful events

Haptic feedback must never be required to understand gameplay.

#### 24. Touch-Control Comfort

Touch controls should support meaningful ergonomic adjustment.

Conceptual support should include:

* control-size adjustment
* position adjustment
* sensitivity options
* handedness support
* tested safe placement
* compatibility with different screen sizes
* comfortable thumb reach
* avoidance of critical HUD overlap

Use tested customization options rather than unrestricted configuration that
overwhelms players or creates unusable layouts.

Touch controls must remain responsive and must not obscure critical gameplay.

#### 25. Long-Session Comfort

Masala Run should reduce fatigue by default.

Long-session comfort should consider:

* repetitive audio
* repeated haptics
* continuous screen motion
* excessive particles
* bright flashes
* high-contrast pulses
* prolonged warning states
* small text
* dense HUD information
* continuous touch strain
* repeated high-intensity feedback

The game may support optional break reminders or comfort prompts where
appropriate.

Do not forcibly end runs after a fixed duration as an accessibility rule.

Player agency should remain intact.

#### 26. Difficulty-Independent Accessibility

Accessibility must remain independent from gameplay difficulty.

Increasing difficulty may increase:

* enemy pressure
* attack complexity
* hazard frequency
* decision load
* encounter intensity

It must not reduce:

* player readability
* threat clarity
* text readability
* audio intelligibility
* visual accessibility
* movement-boundary clarity
* supported accessibility settings

Accessibility options must not be treated as difficulty reductions unless a
separate assist system explicitly defines that relationship.

#### 27. Day and Night Accessibility

Day and night must use the same accessibility logic.

Night may change mood, palette, ambience, and localized lighting, but must not
weaken:

* player visibility
* enemy recognition
* hazard readability
* pickup understanding
* UI readability
* subtitle readability
* caption readability
* movement boundaries
* gameplay colour ownership

Accessibility must not become less reliable at night.

#### 28. Cross-City Consistency

All cities should share the same accessibility foundations.

The player should not need to relearn accessibility cues in each city.

All cities must preserve consistent logic for:

* player emphasis
* enemy danger
* hazard actionability
* reward recognition
* typography
* HUD
* captions
* colour-vision safety
* reduced motion
* reduced VFX
* audio hierarchy
* haptic hierarchy
* touch comfort

Cities may change flavour, but not accessibility meaning.

#### 29. Settings Clarity

Accessibility settings should use clear, direct language.

Settings should explain their effects without requiring technical knowledge.

Where practical, settings should provide:

* understandable names
* concise descriptions
* safe defaults
* immediate preview
* reversible changes
* tested preset combinations

Avoid hiding essential accessibility controls behind progression, payment,
advanced menus, or unclear terminology.

#### 30. Review Priority

Review Accessibility & Comfort Language in this order:

1. Core gameplay meaning
2. Player and threat readability
3. Non-colour communication
4. Muted-audio playability
5. Motion and flash comfort
6. Typography and HUD readability
7. Touch ergonomics
8. Feedback-density control
9. Day/night consistency
10. Cross-city consistency
11. Settings clarity
12. Visual and thematic polish

Accessibility must be reviewed alongside readability throughout production, not
only after art and gameplay are complete.

#### 31. Rejection Rules

Reject or redesign any visual, audio, haptic, UI, animation, feedback, or
interaction treatment that:

* depends on colour alone
* depends on sound alone
* depends on haptics
* depends entirely on stereo positioning
* becomes unreadable at supported text or UI sizes
* hides essential gameplay information in reduced-effects mode
* removes essential telegraphs in reduced-motion mode
* changes gameplay timing under reduced motion
* uses unsafe repeated flashing
* forces disruptive camera movement
* creates unavoidable damage-number clutter
* creates unavoidable particle clutter
* becomes harder to understand with sound muted
* becomes harder to read at night
* breaks accessibility consistency between cities
* places essential accessibility behind payment or progression
* makes accessibility settings unnecessarily technical
* treats accessibility as a substitute for clear default design
* weakens the established gameplay hierarchy
* covers the protected playable-road centre
* requires handcrafted city-specific accessibility logic
* cannot scale to future cities and procedural content

#### 32. Final Principle

Masala Run should be readable and comfortable by default, adaptable through clear
optional controls, and understandable without dependence on any single colour,
sound, motion, haptic, stereo-position, or text cue.

Accessibility strengthens the gameplay language.

It does not weaken, replace, or visually clutter it.

The same accessibility logic must remain reliable across dense survivors-style
gameplay, every city, every time of day, and future procedural expansions.

Rule:

```text
Readable by default.
Comfortable by default.
Adaptable through clear controls.
Never one-cue dependent.
Consistent across cities and time of day.
```

## Part IV — AI Production Pipeline

### Chapter 20 — Prompt Philosophy

Prompt philosophy derives from the frozen Art Bible.

Prompt Bible production is the next phase and must translate these rules without
creating new creative authority.

### Chapter 21 — Prompt Rules

Prompt rules must derive from the frozen Art Bible, preserve all chapter
hierarchies, and remain subordinate to the Art Bible.

Prompt results may validate or reveal issues, but they must not silently redefine
approved creative intent.

### Chapter 22 — Asset Review Process

Asset review is governed by the relevant Art Bible chapter review orders and the
Technical Asset Contract's runtime approval gate.

Creative approval comes from Art Bible alignment; runtime acceptance comes from
the Technical Asset Contract.

## Appendices

### Glossary

Key terms are defined locally in the chapters where they are used.

If a future shared glossary is added, it must preserve existing chapter meaning.

### Visual Checklist

Visual checks derive from the review and rejection rules in each approved
chapter.

Generated images may support review but may never redefine Art Bible rules.

### Revision History

2026-07-23 — Art Bible formally frozen for Prompt Bible production after final
freeze audit.
