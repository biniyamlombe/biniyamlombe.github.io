#!/usr/bin/env bash
#
# Rebuild the served profile photo from a full-resolution original.
#
#   npm run headshot                          # uses originals/headshot-full.jpg
#   npm run headshot -- ~/Desktop/me.jpg      # uses any other file
#
# Writes public/headshot.webp and public/headshot.jpg, both square and 640x640,
# which is 2x the 264px the left rail draws. A camera JPEG is normally 2-3 MB;
# these come out around 25 KB and 75 KB.
#
# The source is centre-cropped to a square, which is exactly the crop the CSS
# (object-fit: cover) was applying anyway. If your face sits off-centre, crop
# the original to a square yourself first and pass that in.
#
# Requires: sips (ships with macOS) and cwebp (brew install webp).
# Without cwebp the WebP step is skipped and browsers fall back to the JPEG.

set -euo pipefail

SOURCE="${1:-originals/headshot-full.jpg}"
SIZE=640

if [ ! -f "$SOURCE" ]; then
  echo "No such file: $SOURCE" >&2
  echo "Put the full-resolution photo at originals/headshot-full.jpg, or pass a path." >&2
  exit 1
fi

if ! command -v sips >/dev/null 2>&1; then
  echo "sips not found. This script is macOS-only; resize by hand to ${SIZE}x${SIZE}." >&2
  exit 1
fi

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

WIDTH=$(sips -g pixelWidth "$SOURCE" | awk '/pixelWidth/ {print $2}')
HEIGHT=$(sips -g pixelHeight "$SOURCE" | awk '/pixelHeight/ {print $2}')
EDGE=$(( WIDTH < HEIGHT ? WIDTH : HEIGHT ))

sips -c "$EDGE" "$EDGE" "$SOURCE" --out "$WORK/square.jpg" >/dev/null
sips -Z "$SIZE" "$WORK/square.jpg" -s format jpeg -s formatOptions 80 \
  --out public/headshot.jpg >/dev/null
echo "public/headshot.jpg   $(du -h public/headshot.jpg | cut -f1)"

if command -v cwebp >/dev/null 2>&1; then
  cwebp -quiet -q 80 -resize "$SIZE" "$SIZE" "$WORK/square.jpg" -o public/headshot.webp
  echo "public/headshot.webp  $(du -h public/headshot.webp | cut -f1)"
else
  echo "cwebp not found, skipped the WebP. Install it with: brew install webp" >&2
fi
