#!/usr/bin/env python3
"""Compose the Meme Sprint 3 entry image.

Takes the generated illustration (no text in it) and builds the final
meme: the picture between two black bars carrying the joke in big bold
white letters, top and bottom, in classic meme layout. The bars keep the
words off the artwork, so nothing in the picture is covered and the text
stays readable even shrunk to a phone screen.

Layout (all pixels, square 1024 canvas):
  - top bar: 102 px, black, first line centred
  - picture: 1024 x 820, the illustration resized with LANCZOS
  - bottom bar: 102 px, black, punchline centred

The font size is fitted, not guessed: each line starts large and shrinks
until it fits the bar with a margin on both sides, so no word is ever
cut off. The output is a PNG written with optimisation on; the script
prints its byte size so the 1 MiB gate can be checked at a glance.

Usage: python3 compose.py   (run from this repository's root)
"""

from PIL import Image, ImageDraw, ImageFont

SOURCE = "media-generation-illustration-0-e39442e8-7878-449e-be81-bb6552828f5b.webp"
OUTPUT = "meme.png"
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

CANVAS = 1024
BAR = 102
MAX_TEXT_WIDTH = CANVAS - 64
START_SIZE = 72
MIN_SIZE = 28

TOP_LINE = "I OPTIMIZED THE WORKFLOW."
BOTTOM_LINE = "YOU WERE THE BOTTLENECK."


def fit_font(draw, text, start=START_SIZE):
    """Largest bold font size at which `text` fits the bar width."""
    size = start
    while size > MIN_SIZE:
        font = ImageFont.truetype(FONT_PATH, size)
        left, _, right, _ = draw.textbbox((0, 0), text, font=font)
        if right - left <= MAX_TEXT_WIDTH:
            return font
        size -= 2
    return ImageFont.truetype(FONT_PATH, MIN_SIZE)


def draw_centred(draw, text, bar_top):
    """Draw one line centred horizontally and vertically in its bar."""
    font = fit_font(draw, text)
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    width = right - left
    height = bottom - top
    x = (CANVAS - width) // 2 - left
    y = bar_top + (BAR - height) // 2 - top
    draw.text((x, y), text, font=font, fill=(255, 255, 255))
    return font.size


def main():
    picture = Image.open(SOURCE).convert("RGB")
    picture = picture.resize((CANVAS, CANVAS - 2 * BAR), Image.LANCZOS)

    canvas = Image.new("RGB", (CANVAS, CANVAS), (0, 0, 0))
    canvas.paste(picture, (0, BAR))

    draw = ImageDraw.Draw(canvas)
    top_size = draw_centred(draw, TOP_LINE, 0)
    bottom_size = draw_centred(draw, BOTTOM_LINE, CANVAS - BAR)

    canvas.save(OUTPUT, "PNG", optimize=True)

    import os

    size = os.path.getsize(OUTPUT)
    print(f"wrote {OUTPUT}: {canvas.size[0]}x{canvas.size[1]}, {size} bytes")
    print(f"font sizes: top {top_size}px, bottom {bottom_size}px")
    print(f"gate: {'OK' if size <= 1_048_576 else 'OVER 1 MiB'} "
          f"({size} / 1048576 bytes)")


if __name__ == "__main__":
    main()
