#!/usr/bin/env python3
"""Masala Run — edge-prop master recompression.

Shrinks a delivered prop PNG without moving a single measured bound.

WHY THE ODD ACCEPTANCE TEST: every EDGE_PROP_DEFS bound (visualBounds,
footprint, cropSafe, pivot) is derived from the alpha >= 32 mask of the master,
including the per-column bottom-opaque scans used for oblique compositions. So
the bar is NOT "looks the same" — it is that the BINARIZED ALPHA MASK IS
BIT-IDENTICAL before and after. One flipped bit can silently move a pivot.
Comparing bounding boxes alone is not sufficient; this compares the full mask.

Any candidate encoding that moves one mask bit is rejected outright. Three are
tried per file, smallest survivor wins:

  A. quantize RGBA together (pngquant-style, palette + tRNS). Biggest win
     (~85%), but it rewrites alpha, so it fails the mask test on some files.
  B. quantize RGB only, re-attach the ORIGINAL alpha channel byte-for-byte.
     Cannot change the mask by construction. ~55%.
  C. as B, but alpha additionally snapped to coarse steps that never cross the
     32 boundary (0 stays 0; 1..31 -> 16; >=32 rounds to /16, floored at 32).
     Compresses the alpha plane harder, mask still safe by construction.

Session 59 measured 1349 KB -> 354 KB (73.7%) across the three live masters.

DELIBERATELY SINGLE-PASS. Re-running this tool on its own output compresses
further (the C strategies leave alpha pre-snapped, which then lets a palette
pass succeed where it first failed) and the mask stays identical to the
original — measured on the left cart v003: 244 KB -> 78 KB. But RGB error
compounds: fidelity vs the original went max 41 / mean 3.34 -> max 54 / mean
5.42. Not worth it on a master awaiting PM visual sign-off. If you ever do want
that, run the tool twice knowingly; do not automate it.

Usage:
    python3 tools/optimize_prop_master.py assets/props/foo.png [more.png ...]
    python3 tools/optimize_prop_master.py --dry-run assets/props/*.png
    python3 tools/optimize_prop_master.py --out /tmp/opt assets/props/foo.png

Default writes IN PLACE (the repo copy is the shipped copy). Use --out to
stage elsewhere first. --dry-run reports without writing anything.
"""
import argparse
import os
import shutil
import sys
import tempfile

from PIL import Image, ImageChops, ImageStat

THRESH = 32  # the alpha cutoff every EDGE_PROP_DEFS bound is measured at


def mask_bytes(im):
    """The binarized alpha >= THRESH mask, as raw bytes."""
    a = im.convert("RGBA").split()[3]
    return a.point(lambda v: 255 if v >= THRESH else 0).tobytes()


def mask_bbox(im):
    a = im.convert("RGBA").split()[3]
    return a.point(lambda v: 255 if v >= THRESH else 0).getbbox()


def _snap_alpha(v):
    if v == 0:
        return 0
    if v < THRESH:
        return 16
    return max(THRESH, min(255, int(round(v / 16.0)) * 16))


def strat_a(im, colors):
    return im.convert("RGBA").quantize(colors=colors, method=Image.FASTOCTREE)


def _quantize_rgb_keep_alpha(im, colors, alpha_fn=None):
    im = im.convert("RGBA")
    r, g, b, a = im.split()
    q = Image.merge("RGB", (r, g, b)).quantize(
        colors=colors, method=Image.FASTOCTREE).convert("RGB")
    q.putalpha(a.point(alpha_fn) if alpha_fn else a)
    return q


def strat_b(im, colors):
    return _quantize_rgb_keep_alpha(im, colors)


def strat_c(im, colors):
    return _quantize_rgb_keep_alpha(im, colors, _snap_alpha)


def strat_d(im, colors):
    """Snap alpha to coarse steps FIRST, then palette-quantize RGBA together.

    This is the strategy that unlocks A-tier compression on files where plain A
    fails. A fails when quantizing alpha drifts pixels across the 32 boundary;
    once alpha is already snapped to multiples of 16 (and never near-boundary),
    quantization has nothing left to drift, so the palette pass becomes
    mask-safe. Mask identity is still MEASURED below, never assumed.
    """
    im = im.convert("RGBA")
    r, g, b, a = im.split()
    snapped = Image.merge("RGBA", (r, g, b, a.point(_snap_alpha)))
    return snapped.quantize(colors=colors, method=Image.FASTOCTREE)


STRATEGIES = [
    ("A/256", strat_a, 256), ("A/128", strat_a, 128),
    ("B/256", strat_b, 256),
    ("C/256", strat_c, 256), ("C/128", strat_c, 128),
    ("D/256", strat_d, 256), ("D/128", strat_d, 128),
]


def fidelity(orig, new):
    """Max + mean per-channel RGB delta over pixels visible at alpha >= THRESH."""
    o, n = orig.convert("RGBA"), new.convert("RGBA")
    m = o.split()[3].point(lambda v: 255 if v >= THRESH else 0)
    st = ImageStat.Stat(ImageChops.difference(o.convert("RGB"), n.convert("RGB")), mask=m)
    return max(st.extrema[i][1] for i in range(3)), max(st.mean)


def optimize(path, tmpdir):
    """Return (strategy, size, tmp_path, max_delta, mean_delta) or None."""
    im = Image.open(path)
    ref_mask, ref_bbox = mask_bytes(im), mask_bbox(im)
    best = None
    for name, fn, colors in STRATEGIES:
        tmp = os.path.join(tmpdir, name.replace("/", "_") + "_" + os.path.basename(path))
        fn(im, colors).save(tmp, "PNG", optimize=True)
        reloaded = Image.open(tmp)
        # The whole correctness argument lives in this one comparison.
        if mask_bytes(reloaded) == ref_mask and mask_bbox(reloaded) == ref_bbox:
            size = os.path.getsize(tmp)
            if best is None or size < best[1]:
                if best:
                    os.remove(best[2])
                best = (name, size, tmp)
                continue
        os.remove(tmp)
    if best is None:
        return None
    md, mnd = fidelity(im, Image.open(best[2]))
    return best + (md, mnd)


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="+", help="prop PNG master(s)")
    ap.add_argument("--out", help="write here instead of in place")
    ap.add_argument("--dry-run", action="store_true", help="report only, write nothing")
    args = ap.parse_args()

    if args.out:
        os.makedirs(args.out, exist_ok=True)

    print(f"{'file':46} {'before':>9} {'after':>9} {'save':>6} {'strat':6} {'maxd':>5} {'mean':>6}")
    total_before = total_after = 0
    failed = []
    with tempfile.TemporaryDirectory() as tmpdir:
        for path in args.files:
            before = os.path.getsize(path)
            res = optimize(path, tmpdir)
            if res is None:
                print(f"{os.path.basename(path)[:46]:46} {before:>9} {'-':>9} "
                      f"{'-':>6} {'NONE':6} {'-':>5} {'-':>6}  mask moved in every candidate")
                failed.append(path)
                continue
            name, size, tmp, md, mnd = res
            total_before += before
            total_after += size
            print(f"{os.path.basename(path)[:46]:46} {before:>9} {size:>9} "
                  f"{100*(1-size/before):>5.1f}% {name:6} {md:>5} {mnd:>6.2f}")
            if args.dry_run:
                continue
            dest = os.path.join(args.out, os.path.basename(path)) if args.out else path
            shutil.move(tmp, dest)

    if total_before:
        print(f"\nTOTAL  {total_before/1024:.0f} KB -> {total_after/1024:.0f} KB "
              f"({100*(1-total_after/total_before):.1f}% off)")
    print("alpha>=32 mask + bbox: identical for every file written "
          "(candidates that moved either were rejected)")
    if args.dry_run:
        print("DRY RUN — nothing written")
    if failed:
        print(f"\n{len(failed)} file(s) had no safe encoding — left untouched:", file=sys.stderr)
        for p in failed:
            print("  " + p, file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
