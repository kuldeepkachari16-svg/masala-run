# Asset Metadata

## Purpose

Define the reusable metadata contract for assets. This document is a framework
linked to the schema in `assets/metadata/asset.schema.json`.

## Table Of Contents

- Scope
- Metadata Location
- Required Fields
- Optional Fields
- Validation
- Lifecycle
- TODO

## Scope

TODO: Confirm which assets require metadata files.

## Metadata Location

Metadata files should live near the metadata schema until the asset library is
large enough to justify deeper organization.

TODO: Decide the final folder layout for metadata records.

## Required Fields

The reusable schema includes:

- `id`
- `city`
- `category`
- `dimensions`
- `collision`
- `placementWeight`
- `placementRules`
- `anchor`
- `lightingCompatibility`
- `biomeCompatibility`
- `tags`

TODO: Confirm which fields are mandatory for each asset category.

## Optional Fields

TODO: Add optional production fields as systems need them.

## Validation

Use `tools/validate_asset_metadata.py` to validate metadata records.

## Lifecycle

TODO: Define draft, review, approved, deprecated, and archived states.

## TODO

- TODO: Add approved metadata examples.
- TODO: Align field names with gameplay systems.
- TODO: Decide whether generated files and source files share one metadata record.
