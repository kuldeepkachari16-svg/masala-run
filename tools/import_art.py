#!/usr/bin/env python3
"""Masala Run — art ingestion.

Validate, rename, optimize and place AI-generated images (downloaded manually
from ChatGPT web) into the game's asset folders, driven by assets/art_manifest.json.

Pipeline:
  1. scan assets/incoming/ for images
  2. match each file (by name, before the extension) to a manifest asset's
     `incoming_label`
  3. validate dimensions / aspect ratio / transparency per asset kind
  4. optimize  (backgrounds: resize+mute to a flat master; sprites: trim alpha +
     downscale, keep transparency)
  5. write to the asset's `target_path`  (never overwrites an existing approved
     asset unless --force)
  6. report matched, missing (in manifest, not dropped) and unexpected files

DRY-RUN by default — prints the plan and validation results, writes nothing.
Pass --apply to actually optimize, place files, and archive the raw source.

Usage:
    python3 tools/import_art.py                 # dry-run: validate + show plan
    python3 tools/import_art.py --apply         # do it
    python3 tools/import_art.py --apply --force # also overwrite existing assets
    python3 tools/import_art.py --only courier  # one asset (by id or label)

Requires Pillow (already used by tools/process-bg.py).
"""
import argparse
import json
import os
import sys

try:
    from PIL import Image, ImageEnhance, ImageFilter
except ImportError:
    sys.exit("Pillow not installed. Run:  python3 -m pip install Pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = os.path.join(ROOT, "assets", "art_manifest.json")
INCOMING = os.path.join(ROOT, "assets", "incoming")
ARCHIVE = os.path.join(INCOMING, "_processed")
EXTS = (".png", ".jpg", ".jpeg", ".webp")

# Background "gentle mute" — flat AI illustration only needs a light touch (resize
# + slight recede), NOT the heavy posterize tools/process-bg.py used for noisy art.
BG_BRIGHTNESS = 0.96
BG_SATURATION = 0.92
BG_DENOISE = 1          # 1 = off; bump to 3 if a source shows AI grain
SPRITE_PAD = 0.04       # transparent padding kept around a trimmed sprite (fraction)

C = {"g": "\033[32m", "y": "\033[33m", "r": "\033[31m", "b": "\033[34m", "_": "\033[0m"}
def col(s, c):
    return f"{C[c]}{s}{C['_']}" if sys.stdout.isatty() else s


def load_manifest():
    with open(MANIFEST) as f:
        return json.load(f)


def parse_aspect(s):
    # "2:3" -> 0.667 ; tolerant of "2:3 portrait" and "1:1, transparent background"
    tok = s.strip().split()[0].rstrip(",.;")
    if ":" in tok:
        a, b = tok.split(":")
        return float(a.strip()) / float(b.strip().rstrip(",.;"))
    return float(tok)


def has_real_alpha(img):
    if img.mode not in ("RGBA", "LA") and "transparency" not in img.info:
        return False
    a = img.convert("RGBA").getchannel("A")
    lo, hi = a.getextrema()
    return lo < 250  # at least some transparent pixels


def find_incoming(label):
    """Return path of an incoming file whose stem == label (case-insensitive)."""
    if not os.path.isdir(INCOMING):
        return None
    for fn in os.listdir(INCOMING):
        stem, ext = os.path.splitext(fn)
        if ext.lower() in EXTS and stem.lower() == label.lower():
            return os.path.join(INCOMING, fn)
    return None


def validate(img, asset, defaults):
    kind = asset["kind"]
    d = defaults[kind]
    w, h = img.size
    short = min(w, h)
    errs, warns = [], []

    if short < d["min_short_edge"]:
        errs.append(f"too small: short edge {short}px < {d['min_short_edge']}px")

    target_ar = parse_aspect(asset["aspect_ratio"])
    got_ar = w / h
    tol = d.get("aspect_tolerance", 0.12)
    if abs(got_ar - target_ar) > tol:
        msg = f"aspect {got_ar:.3f} off target {target_ar:.3f} (tol {tol})"
        # backgrounds get cover-cropped, so a near miss is only a warning
        (warns if kind == "background" else errs).append(msg)

    if kind == "sprite" and d.get("require_alpha") and not has_real_alpha(img):
        errs.append("no transparency — sprite needs a transparent background")
    if kind == "background" and has_real_alpha(img):
        warns.append("background has transparency (will be flattened on a black field)")

    return errs, warns


def process_background(img, defaults):
    img = img.convert("RGB")
    w, h = img.size
    tw = defaults["background"]["master_width"]
    th = round(h * tw / w)
    img = img.resize((tw, th), Image.LANCZOS)
    if BG_DENOISE > 1:
        img = img.filter(ImageFilter.MedianFilter(size=BG_DENOISE))
    img = ImageEnhance.Brightness(img).enhance(BG_BRIGHTNESS)
    img = ImageEnhance.Color(img).enhance(BG_SATURATION)
    return img


def process_sprite(img, defaults):
    img = img.convert("RGBA")
    bbox = img.getchannel("A").getbbox()
    if bbox:
        img = img.crop(bbox)
    w, h = img.size
    pad = round(max(w, h) * SPRITE_PAD)
    canvas = Image.new("RGBA", (w + 2 * pad, h + 2 * pad), (0, 0, 0, 0))
    canvas.paste(img, (pad, pad))
    img = canvas
    m = defaults["sprite"]["master_max"]
    if max(img.size) > m:
        s = m / max(img.size)
        img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    return img


def main():
    ap = argparse.ArgumentParser(description="Import AI art into Masala Run.")
    ap.add_argument("--apply", action="store_true", help="actually write/move files")
    ap.add_argument("--force", action="store_true", help="overwrite existing approved assets")
    ap.add_argument("--only", help="limit to one asset (by asset_id or incoming_label)")
    args = ap.parse_args()

    man = load_manifest()
    defaults = man["defaults"]
    assets = man["assets"]
    if args.only:
        assets = [a for a in assets if args.only in (a["asset_id"], a["incoming_label"])]
        if not assets:
            sys.exit(f"--only '{args.only}' matched no asset.")

    mode = col("APPLY", "g") if args.apply else col("DRY-RUN", "y")
    print(f"\nMasala Run art import — {mode}\n" + "-" * 52)

    matched_labels = set()
    placed, blocked, missing, failed = [], [], [], []

    for a in assets:
        label = a["incoming_label"]
        src = find_incoming(label)
        if not src:
            missing.append(a)
            continue
        matched_labels.add(os.path.splitext(os.path.basename(src))[0].lower())

        try:
            img = Image.open(src)
            img.load()
        except Exception as e:
            failed.append((a, f"cannot open: {e}"))
            continue

        errs, warns = validate(img, a, defaults)
        tag = col("OK", "g") if not errs else col("FAIL", "r")
        print(f"\n[{tag}] {a['asset_id']}  ({os.path.basename(src)} → {a['target_path']})")
        print(f"      {img.size[0]}x{img.size[1]}  {a['kind']}")
        for w_ in warns:
            print("      " + col("warn: " + w_, "y"))
        for e_ in errs:
            print("      " + col("error: " + e_, "r"))
        if errs:
            failed.append((a, "; ".join(errs)))
            continue

        target = os.path.join(ROOT, a["target_path"])
        if os.path.exists(target) and not args.force:
            print("      " + col("exists — kept (use --force to overwrite)", "y"))
            blocked.append(a)
            continue

        if a["kind"] == "background":
            out = process_background(img, defaults)
        else:
            out = process_sprite(img, defaults)
        print(f"      optimized → {out.size[0]}x{out.size[1]}")

        if args.apply:
            os.makedirs(os.path.dirname(target), exist_ok=True)
            out.save(target)
            os.makedirs(ARCHIVE, exist_ok=True)
            os.replace(src, os.path.join(ARCHIVE, os.path.basename(src)))
            print("      " + col("written + raw archived to assets/incoming/_processed/", "g"))
        placed.append(a)

    # Unexpected files: in incoming/, not matching any label
    unexpected = []
    if os.path.isdir(INCOMING):
        labels = {a["incoming_label"].lower() for a in man["assets"]}
        for fn in os.listdir(INCOMING):
            stem, ext = os.path.splitext(fn)
            if ext.lower() in EXTS and stem.lower() not in labels:
                unexpected.append(fn)

    print("\n" + "=" * 52 + "\nSUMMARY")
    print(f"  {col(str(len(placed)), 'g')} ready/placed   "
          f"{col(str(len(blocked)), 'y')} kept(exists)   "
          f"{col(str(len(failed)), 'r')} failed   "
          f"{len(missing)} missing")
    if missing:
        print("\n  Missing (drop these into assets/incoming/):")
        for a in missing:
            print(f"    - {a['incoming_label']}  ({a['asset_id']})")
    if failed:
        print("\n  Failed validation (regenerate — see prompts/chatgpt_image_batches.md):")
        for a, why in failed:
            print(f"    - {a['incoming_label']}: {why}")
    if unexpected:
        print("\n  Unexpected in incoming/ (no manifest match — rename to a label?):")
        for fn in unexpected:
            print(f"    - {fn}")
    if not args.apply and placed:
        print("\n  " + col("Dry-run only. Re-run with --apply to optimize + place these.", "b"))
    if args.apply and placed:
        print("\n  " + col("Done. Remember: bump CACHE in sw.js + add new paths to ASSETS "
                            "so the new art caches for offline/PWA.", "b"))
    print()
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
