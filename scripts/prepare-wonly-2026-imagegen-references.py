#!/usr/bin/env python3
"""Extract clean WONLY 2026 product references for ImageGen from the source PDF."""

from __future__ import annotations

import argparse
import io
import json
import math
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "data" / "wonly-2026-assets.json"
DEFAULT_OUTPUT = ROOT / "output" / "imagegen" / "wonly-2026-all-v3" / "references"


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def make_contact_sheet(items: list[tuple[str, Path]], output: Path) -> None:
    columns = 8
    cell = (180, 300)
    label_height = 28
    rows = math.ceil(len(items) / columns)
    sheet = Image.new("RGB", (columns * cell[0], rows * (cell[1] + label_height)), "#e8e8e8")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()

    for index, (label, path) in enumerate(items):
        x = index % columns * cell[0]
        y = index // columns * (cell[1] + label_height)
        sheet.paste("white", (x, y, x + cell[0], y + cell[1]))
        with Image.open(path) as source:
            preview = ImageOps.contain(source.convert("RGB"), (164, 284), Image.Resampling.LANCZOS)
        sheet.paste(preview, (x + (cell[0] - preview.width) // 2, y + (cell[1] - preview.height) // 2))
        draw.text((x + 7, y + cell[1] + 8), label, fill="black", font=font)

    sheet.save(output, "JPEG", quality=92, subsampling=0)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        products = json.load(handle)["products"]

    output = args.output.resolve()
    output.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(args.pdf.resolve()))
    spreads: dict[int, Image.Image] = {}
    previews: list[tuple[str, Path]] = []

    for product in products:
        spread_number = product["spread"]
        if spread_number not in spreads:
            images = list(reader.pages[spread_number - 1].images)
            if not images:
                raise RuntimeError(f"El pliego {spread_number} no contiene una imagen extraíble.")
            largest = max(images, key=lambda item: len(item.data))
            with Image.open(io.BytesIO(largest.data)) as source:
                spreads[spread_number] = source.convert("RGB")

        x1, y1, x2, y2 = product["imageCrop"]
        crop = spreads[spread_number].crop((x1, y1, x2, y2))
        path = output / f"{slugify(product['name'])}.png"
        crop.save(path, "PNG", optimize=True)
        previews.append((product["name"], path))

    contact_sheet = output.parent / "references-contact-sheet.jpg"
    make_contact_sheet(previews, contact_sheet)
    print(f"Referencias extraídas: {len(previews)}")
    print(f"Control visual: {contact_sheet.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
