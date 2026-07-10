#!/usr/bin/env python3
"""Validate Masala Run asset metadata JSON records.

By default this checks every JSON file in assets/metadata except asset.schema.json.
The validator is intentionally small and stdlib-only; it enforces the project
contract directly rather than requiring an external JSON Schema package.
"""
import argparse
import json
import os
import re
import sys


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_DIR = os.path.join(ROOT, "assets", "metadata")
ID_RE = re.compile(r"^[a-z0-9]+(?:_[a-z0-9]+)*$")
REQUIRED = {
    "id",
    "city",
    "category",
    "dimensions",
    "collision",
    "placementWeight",
    "placementRules",
    "anchor",
    "lightingCompatibility",
    "biomeCompatibility",
    "tags",
}
CATEGORIES = {"bg", "prop", "sprite", "fx", "ui", "audio", "font", "other"}
COLLISION_TYPES = {"none", "rect", "circle", "polygon", "custom"}
ANCHORS = {"center", "top_left", "top_center", "bottom_center", "custom"}
STATUSES = {"draft", "review", "approved", "deprecated", "archived"}


def rel(path):
    return os.path.relpath(path, ROOT)


def json_files(paths):
    if paths:
        return paths
    if not os.path.isdir(DEFAULT_DIR):
        return []
    out = []
    for name in sorted(os.listdir(DEFAULT_DIR)):
        if name.endswith(".json") and name != "asset.schema.json":
            out.append(os.path.join(DEFAULT_DIR, name))
    return out


def require_object(errors, data, key):
    value = data.get(key)
    if not isinstance(value, dict):
        errors.append(f"{key} must be an object")
        return {}
    return value


def require_array(errors, data, key):
    value = data.get(key)
    if not isinstance(value, list):
        errors.append(f"{key} must be an array")
        return []
    return value


def validate_record(path, data):
    errors = []
    missing = sorted(REQUIRED - set(data))
    if missing:
        errors.append("missing required fields: " + ", ".join(missing))

    if not isinstance(data.get("id"), str) or not ID_RE.match(data.get("id", "")):
        errors.append("id must be lowercase snake_case")
    if not isinstance(data.get("city"), str) or not ID_RE.match(data.get("city", "")):
        errors.append("city must be lowercase snake_case or global")
    if data.get("category") not in CATEGORIES:
        errors.append("category must be one of: " + ", ".join(sorted(CATEGORIES)))

    dimensions = require_object(errors, data, "dimensions")
    for key in ("width", "height"):
        value = dimensions.get(key)
        if not isinstance(value, (int, float)) or value < 0:
            errors.append(f"dimensions.{key} must be a non-negative number")
    if dimensions.get("unit") not in {"px", "tile", "world"}:
        errors.append("dimensions.unit must be px, tile, or world")

    collision = require_object(errors, data, "collision")
    if collision.get("type") not in COLLISION_TYPES:
        errors.append("collision.type must be one of: " + ", ".join(sorted(COLLISION_TYPES)))
    if not isinstance(collision.get("solid"), bool):
        errors.append("collision.solid must be boolean")

    weight = data.get("placementWeight")
    if not isinstance(weight, (int, float)) or weight < 0:
        errors.append("placementWeight must be a non-negative number")

    rules = require_object(errors, data, "placementRules")
    for key in ("allowedZones", "blockedZones"):
        values = rules.get(key)
        if not isinstance(values, list) or not all(isinstance(v, str) for v in values):
            errors.append(f"placementRules.{key} must be an array of strings")
    spacing = rules.get("minSpacing")
    if not isinstance(spacing, (int, float)) or spacing < 0:
        errors.append("placementRules.minSpacing must be a non-negative number")

    anchor = require_object(errors, data, "anchor")
    for key in ("x", "y"):
        value = anchor.get(key)
        if not isinstance(value, (int, float)):
            errors.append(f"anchor.{key} must be a number")
    if anchor.get("origin") not in ANCHORS:
        errors.append("anchor.origin must be one of: " + ", ".join(sorted(ANCHORS)))

    for key in ("lightingCompatibility", "biomeCompatibility"):
        values = require_array(errors, data, key)
        if not all(isinstance(v, str) for v in values):
            errors.append(f"{key} must contain only strings")
        if len(values) != len(set(values)):
            errors.append(f"{key} must not contain duplicates")

    tags = require_array(errors, data, "tags")
    if not all(isinstance(v, str) and ID_RE.match(v) for v in tags):
        errors.append("tags must contain only lowercase snake_case strings")
    if len(tags) != len(set(tags)):
        errors.append("tags must not contain duplicates")

    if "status" in data and data["status"] not in STATUSES:
        errors.append("status must be one of: " + ", ".join(sorted(STATUSES)))

    return errors


def main():
    ap = argparse.ArgumentParser(description="Validate asset metadata records.")
    ap.add_argument("paths", nargs="*", help="metadata JSON files to validate")
    args = ap.parse_args()

    paths = json_files(args.paths)
    if not paths:
        print("No metadata records found.")
        return 0

    failed = 0
    for path in paths:
        try:
            with open(path, encoding="utf-8") as f:
                data = json.load(f)
        except Exception as e:
            print(f"FAIL {rel(path)}: cannot read JSON: {e}")
            failed += 1
            continue
        errors = validate_record(path, data)
        if errors:
            failed += 1
            print(f"FAIL {rel(path)}")
            for err in errors:
                print(f"  - {err}")
        else:
            print(f"OK   {rel(path)}")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
