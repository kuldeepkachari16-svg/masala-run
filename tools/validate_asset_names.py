#!/usr/bin/env python3
"""Validate scalable production asset filenames.

Default mode reports legacy names as warnings and exits successfully. Use --strict
to fail on non-conforming production asset names.
"""
import argparse
import os
import re
import sys


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_DIRS = [
    os.path.join(ROOT, "assets", "props"),
    os.path.join(ROOT, "assets", "sprites"),
    os.path.join(ROOT, "assets", "backgrounds"),
]
EXTS = {".png", ".jpg", ".jpeg", ".webp", ".svg"}
NAME_RE = re.compile(
    r"^(?P<city>[a-z0-9]+(?:_[a-z0-9]+)*|global)_"
    r"(?P<category>bg|prop|sprite|fx|ui|audio|font|other)_"
    r"(?P<subject>[a-z0-9]+(?:_[a-z0-9]+)*)_"
    r"(?P<variant>[a-z0-9]+(?:_[a-z0-9]+)*)_"
    r"(?P<lighting>[a-z0-9]+(?:_[a-z0-9]+)*)_"
    r"(?P<size>[a-z0-9]+(?:_[a-z0-9]+)*)_"
    r"v(?P<version>[0-9]{3})$"
)


def rel(path):
    return os.path.relpath(path, ROOT)


def iter_assets(paths):
    for path in paths:
        full = path if os.path.isabs(path) else os.path.join(ROOT, path)
        if os.path.isdir(full):
            for base, dirs, files in os.walk(full):
                dirs[:] = [d for d in dirs if not d.startswith(".")]
                for name in sorted(files):
                    ext = os.path.splitext(name)[1].lower()
                    if ext in EXTS:
                        yield os.path.join(base, name)
        elif os.path.isfile(full):
            yield full


def main():
    ap = argparse.ArgumentParser(description="Validate production asset filenames.")
    ap.add_argument("paths", nargs="*", help="files or directories to scan")
    ap.add_argument("--strict", action="store_true", help="fail on legacy/non-conforming names")
    args = ap.parse_args()

    paths = args.paths or DEFAULT_DIRS
    checked = 0
    invalid = []

    for path in iter_assets(paths):
        checked += 1
        stem, ext = os.path.splitext(os.path.basename(path))
        if not NAME_RE.match(stem):
            invalid.append(path)

    if not checked:
        print("No asset files found.")
        return 0

    if invalid:
        label = "FAIL" if args.strict else "WARN"
        for path in invalid:
            print(f"{label} {rel(path)}")
        print(
            "\nExpected pattern: "
            "<city>_<category>_<subject>_<variant>_<lighting>_<size>_v###.<ext>"
        )
        return 1 if args.strict else 0

    print(f"OK {checked} asset filenames")
    return 0


if __name__ == "__main__":
    sys.exit(main())
