#!/usr/bin/env python3
"""Crop ImageGen door renders tightly and publish them over their catalogue assets.

The raw PNG files stay in ``output/imagegen/wonly-2026-card-v2``. Only PNGs
whose slug matches a product in the WONLY 2026 manifest are accepted.
"""

from __future__ import annotations

import json
import math
import re
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps, ImageStat


ROOT = Path(__file__).resolve().parents[1]
INPUT_DIR = ROOT / "output" / "imagegen" / "wonly-2026-card-v2"
PREVIEW_DIR = INPUT_DIR / "final"
MANIFEST_PATH = ROOT / "data" / "wonly-2026-assets.json"


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def product_directory(family: str) -> Path:
    if family.startswith("pvc"):
        return ROOT / "public" / "images" / "PUERTAS" / "PVC" / "2026"
    if family.startswith("aluminium"):
        return ROOT / "public" / "images" / "PUERTAS" / "CORREDIZA" / "2026"
    return ROOT / "public" / "images" / "PUERTAS" / "MADERAACÚSTICA" / "2026"


def background_colour(image: Image.Image) -> tuple[int, int, int]:
    sample_size = max(8, min(image.size) // 40)
    corners = (
        (0, 0, sample_size, sample_size),
        (image.width - sample_size, 0, image.width, sample_size),
        (0, image.height - sample_size, sample_size, image.height),
        (image.width - sample_size, image.height - sample_size, image.width, image.height),
    )
    samples = [ImageStat.Stat(image.crop(box)).median for box in corners]
    return tuple(round(sum(sample[channel] for sample in samples) / len(samples)) for channel in range(3))


def tight_crop(image: Image.Image) -> Image.Image:
    rgb = image.convert("RGB")
    background = Image.new("RGB", rgb.size, background_colour(rgb))
    difference = ImageChops.difference(rgb, background).convert("L")
    mask = difference.point(lambda value: 255 if value > 8 else 0)
    mask = mask.filter(ImageFilter.MaxFilter(5))
    bounds = mask.getbbox()
    if not bounds:
        raise ValueError("No se ha detectado la puerta sobre el fondo.")

    left, top, right, bottom = bounds
    padding = max(4, round(max(right - left, bottom - top) * 0.005))
    bounds = (
        max(0, left - padding),
        max(0, top - padding),
        min(rgb.width, right + padding),
        min(rgb.height, bottom + padding),
    )
    cropped = rgb.crop(bounds)
    if max(cropped.size) > 1800:
        cropped = ImageOps.contain(cropped, (1800, 1800), Image.Resampling.LANCZOS)
    return cropped


def make_catalog_contact_sheet(products: list[dict]) -> Path:
    """Render the final files inside the same 3:5 frame used by the website."""
    columns = 8
    card_size = (180, 300)
    label_height = 28
    rows = math.ceil(len(products) / columns)
    sheet = Image.new(
        "RGB",
        (columns * card_size[0], rows * (card_size[1] + label_height)),
        "#e7e7e7",
    )
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()

    for index, product in enumerate(products):
        slug = slugify(product["name"])
        path = product_directory(product["family"]) / f"door-{slug}.webp"
        x = index % columns * card_size[0]
        y = index // columns * (card_size[1] + label_height)
        sheet.paste("#fcfcfc", (x, y, x + card_size[0], y + card_size[1]))
        with Image.open(path) as source:
            preview = ImageOps.contain(
                source.convert("RGB"),
                (round(card_size[0] * 0.86), round(card_size[1] * 0.87)),
                Image.Resampling.LANCZOS,
            )
        image_x = x + (card_size[0] - preview.width) // 2
        image_y = y + card_size[1] - round(card_size[1] * 0.06) - preview.height
        sheet.paste(preview, (image_x, image_y))
        draw.text((x + 7, y + card_size[1] + 8), product["name"], fill="black", font=font)

    path = INPUT_DIR / "final-contact-sheet.jpg"
    sheet.save(path, "JPEG", quality=92, subsampling=0)
    return path


def main() -> None:
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        manifest = json.load(handle)
    product_list = manifest["products"]
    products = {slugify(product["name"]): product for product in product_list}

    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    published = 0
    for source_path in sorted(INPUT_DIR.glob("wl-*.png")):
        slug = source_path.stem
        product = products.get(slug)
        if not product:
            raise ValueError(f"{source_path.name} no corresponde a un producto del manifiesto.")

        with Image.open(source_path) as source:
            final = tight_crop(source)

        preview_path = PREVIEW_DIR / f"{slug}.webp"
        public_path = product_directory(product["family"]) / f"door-{slug}.webp"
        final.save(preview_path, "WEBP", quality=94, method=6)
        final.save(public_path, "WEBP", quality=94, method=6)
        print(f"{product['name']}: {source.size[0]}x{source.size[1]} -> {final.width}x{final.height}")
        published += 1

    contact_sheet = make_catalog_contact_sheet(product_list)
    print(f"Imágenes ImageGen publicadas: {published}")
    print(f"Control visual: {contact_sheet.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
