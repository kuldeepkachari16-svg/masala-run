#!/usr/bin/env python3
"""Create a blank Masala Run asset metadata record.

Usage:
  python3 tools/new_asset_metadata.py mumbai_prop_cart_a_day_1x_v001 --city mumbai --category prop
  python3 tools/new_asset_metadata.py global_sprite_player_a_neutral_1x_v001 --output assets/metadata/player.json
"""
import argparse
import json
import os
import sys


CATEGORIES = {"bg", "prop", "sprite", "fx", "ui", "audio", "font", "other"}


def build_record(asset_id, city, category, width, height):
    return {
        "id": asset_id,
        "city": city,
        "category": category,
        "dimensions": {
            "width": width,
            "height": height,
            "unit": "px",
        },
        "collision": {
            "type": "none",
            "solid": False,
        },
        "placementWeight": 1,
        "placementRules": {
            "allowedZones": [],
            "blockedZones": [],
            "minSpacing": 0,
        },
        "anchor": {
            "x": 0.5,
            "y": 0.5,
            "origin": "center",
        },
        "lightingCompatibility": [],
        "biomeCompatibility": [],
        "tags": [],
        "status": "draft",
        "notes": "TODO",
    }


def main():
    ap = argparse.ArgumentParser(description="Generate an asset metadata template.")
    ap.add_argument("asset_id", help="stable asset id, usually the filename stem")
    ap.add_argument("--city", default="global", help="city key, or global")
    ap.add_argument("--category", default="other", choices=sorted(CATEGORIES))
    ap.add_argument("--width", type=float, default=0)
    ap.add_argument("--height", type=float, default=0)
    ap.add_argument("--output", help="optional JSON file to write")
    args = ap.parse_args()

    record = build_record(args.asset_id, args.city, args.category, args.width, args.height)
    text = json.dumps(record, indent=2) + "\n"

    if args.output:
        os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(text)
    else:
        sys.stdout.write(text)


if __name__ == "__main__":
    main()
