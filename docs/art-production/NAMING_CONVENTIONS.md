# Naming Conventions

## Purpose

Define asset naming rules that scale to thousands of files while staying readable
for humans. This document is a framework with an initial technical convention.

## Table Of Contents

- Scope
- Filename Pattern
- Field Rules
- Versioning
- Examples
- Validation
- TODO

## Scope

TODO: Confirm which folders must follow this convention.

## Filename Pattern

Use lowercase ASCII with underscores:

```text
<city>_<category>_<subject>_<variant>_<lighting>_<size>_v###.<ext>
```

For global assets that do not belong to one city:

```text
global_<category>_<subject>_<variant>_<lighting>_<size>_v###.<ext>
```

## Field Rules

- `city`: city key or `global`.
- `category`: broad asset type, such as `prop`, `sprite`, `bg`, `fx`, or `ui`.
- `subject`: short human-readable subject.
- `variant`: variant label, such as `a`, `b`, or a functional variant.
- `lighting`: lighting state, such as `day`, `night`, or `neutral`.
- `size`: production size label, such as `1x`, `2x`, or another approved token.
- `v###`: three-digit version number.
- `ext`: approved file extension.

## Versioning

TODO: Define when to increment file versions and when to replace a file.

## Examples

TODO: Add approved examples after the convention is adopted.

## Validation

Use `tools/validate_asset_names.py` to check production asset filenames.

## TODO

- TODO: Confirm allowed category values.
- TODO: Confirm allowed lighting values.
- TODO: Decide whether legacy files keep their current names or receive aliases.
