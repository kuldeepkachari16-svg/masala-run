# Art Bible

Version: 0.1
Status: Workshop

Freeze Policy:
- Only completed chapters become frozen.
- Frozen chapters are modified only through explicit creative decisions.
- Creative authority belongs to the Art Bible authoring process.

## Part I — Design Philosophy

### Chapter 1 — Core Visual Identity

TODO: Define this chapter during the Art Bible authoring process.

### Chapter 2 — Gameplay Readability

TODO: Define this chapter during the Art Bible authoring process.

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

The playable arena occupies approximately 76–80% of the screen width.

The environment occupies approximately 20–24% of the screen width.

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

Use base assets plus lighting overlays, lighting variants, glow elements, shadow elements, and time-of-day treatments.

Do not create separate complete painted scenes for day and night.

Rule:

```text
Base asset + controlled lighting treatment.
Not separate painted background.
```

#### 27. Night Asset Production

Night should reuse the same structural asset logic as day.

Night variants are allowed only where needed for readability, mood, or practical light behaviour.

Examples:

* lit window variant
* stall light variant
* lamp glow overlay
* soft shadow overlay
* night-tinted road overlay
* practical light spill element

Avoid duplicating entire city scenes as fixed night paintings.

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

## Part II — Environment Design

### Chapter 10 — Environment Composition

TODO: Define this chapter during the Art Bible authoring process.

### Chapter 11 — Roads & Play Space

TODO: Define this chapter during the Art Bible authoring process.

### Chapter 12 — Props & World Building

TODO: Define this chapter during the Art Bible authoring process.

### Chapter 13 — City Identity

TODO: Define this chapter during the Art Bible authoring process.

## Part III — Asset Standards

### Chapter 14 — Asset Categories

TODO: Define this chapter during the Art Bible authoring process.

### Chapter 15 — Asset Quality Standards

TODO: Define this chapter during the Art Bible authoring process.

### Chapter 16 — Animation Principles

TODO: Define this chapter during the Art Bible authoring process.

## Part IV — AI Production Pipeline

### Chapter 17 — Prompt Philosophy

TODO: Define this chapter during the Art Bible authoring process.

### Chapter 18 — Prompt Rules

TODO: Define this chapter during the Art Bible authoring process.

### Chapter 19 — Asset Review Process

TODO: Define this chapter during the Art Bible authoring process.

## Appendices

### Glossary

TODO: Define terms during the Art Bible authoring process.

### Visual Checklist

TODO: Define checklist items during the Art Bible authoring process.

### Revision History

TODO: Record Art Bible revisions here.
