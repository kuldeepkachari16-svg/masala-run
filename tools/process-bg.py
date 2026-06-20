#!/usr/bin/env python3
"""Process a raw generated backdrop into a clean, muted, flat theme asset.

One pass that makes any over-rendered AI "pixel/flat" image sit back as a game
backdrop: resize -> denoise -> mute (brightness+saturation) -> posterize flat.
Keeps full resolution (clean-vector look, NOT a chunky pixel grid).

Usage:
    python3 tools/process-bg.py <input> <output.png> [--width 720]
    python3 tools/process-bg.py raw.png assets/themes/retro-day/bg-1.png

Tuning knobs (the "gentle mute" the look was approved at):
"""
import sys
from PIL import Image, ImageEnhance, ImageFilter

WIDTH = 720          # target master width; height follows the source aspect
BRIGHTNESS = 0.84    # < 1 darkens so the backdrop recedes
SATURATION = 0.68    # < 1 mutes/desaturates
COLORS = 20          # posterize palette size -> flat fills
DENOISE = 3          # median filter radius -> kills AI grain on flat areas


def process(inp, outp, width=WIDTH):
    img = Image.open(inp).convert("RGB")
    w, h = img.size
    th = round(h * width / w)
    img = img.resize((width, th), Image.LANCZOS)          # to final res first
    img = img.filter(ImageFilter.MedianFilter(size=DENOISE))
    img = ImageEnhance.Brightness(img).enhance(BRIGHTNESS)
    img = ImageEnhance.Color(img).enhance(SATURATION)
    img = img.quantize(colors=COLORS, method=Image.FASTOCTREE,
                       dither=Image.Dither.NONE).convert("RGB")  # flatten
    img.save(outp)
    print(f"{inp}  ->  {outp}  ({width}x{th}, {COLORS} colors)")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    width = WIDTH
    if "--width" in sys.argv:
        width = int(sys.argv[sys.argv.index("--width") + 1])
    process(sys.argv[1], sys.argv[2], width)
