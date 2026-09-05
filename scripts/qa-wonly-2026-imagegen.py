#!/usr/bin/env python3
"""Stage and visually compare the regenerated WONLY 2026 catalogue images.

The default mode is read-only with respect to ``public``: generated PNGs are
tightly cropped into a staging directory and reference/comparison sheets are
created for visual QA. Passing ``--publish`` is deliberately strict and only
works when every manifest product has a generated image.
"""

from __future__ import annotations

import argparse
import json
import math
import re
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps, ImageStat


ROOT = Path(__file__).resolve().parents[1]
RUN_DIR = ROOT / "output" / "imagegen" / "wonly-2026-all-v3"
GENERATED_DIR = RUN_DIR / "generated"
REFERENCE_DIR = RUN_DIR / "references"
STAGED_DIR = RUN_DIR / "staged"
QA_DIR = RUN_DIR / "qa"
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
    return tuple(
        round(sum(sample[channel] for sample in samples) / len(samples))
        for channel in range(3)
    )


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
    padding = max(3, round(max(right - left, bottom - top) * 0.004))
    bounds = (
        max(0, left - padding),
        max(0, top - padding),
        min(rgb.width, right + padding),
        min(rgb.height, bottom + padding),
    )
    return rgb.crop(bounds)


def contain_on_canvas(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    canvas = Image.new("RGB", size, "#fbfbfb")
    fitted = ImageOps.contain(image.convert("RGB"), size, Image.Resampling.LANCZOS)
    canvas.paste(fitted, ((size[0] - fitted.width) // 2, (size[1] - fitted.height) // 2))
    return canvas


def make_comparison_sheet(products: list[dict], available: list[str]) -> Path:
    columns = 3
    panel = (210, 330)
    gutter = 10
    label_height = 42
    tile = (panel[0] * 2 + gutter, panel[1] + label_height)
    rows = math.ceil(len(available) / columns)
    sheet = Image.new("RGB", (columns * tile[0], rows * tile[1]), "#dedede")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    by_slug = {slugify(product["name"]): product for product in products}

    for index, slug in enumerate(available):
        x = index % columns * tile[0]
        y = index // columns * tile[1]
        with Image.open(REFERENCE_DIR / f"{slug}.png") as reference:
            left = contain_on_canvas(reference, panel)
        with Image.open(STAGED_DIR / f"{slug}.webp") as generated:
            right = contain_on_canvas(generated, panel)
        sheet.paste(left, (x, y))
        sheet.paste(right, (x + panel[0] + gutter, y))
        draw.text((x + 8, y + panel[1] + 7), f"{by_slug[slug]['name']}  ORIGINAL | IMAGEGEN", fill="black", font=font)

    output = QA_DIR / "comparison-all.jpg"
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "JPEG", quality=94, subsampling=0)
    return output


def make_comparison_pages(products: list[dict], available: list[str]) -> list[Path]:
    """Create smaller high-resolution sheets so fine model details remain legible."""
    outputs: list[Path] = []
    page_size = 12
    by_slug = {slugify(product["name"]): product for product in products}
    panel = (300, 470)
    gutter = 14
    label_height = 48
    tile = (panel[0] * 2 + gutter, panel[1] + label_height)
    columns = 2

    for page_index, offset in enumerate(range(0, len(available), page_size), start=1):
        page_slugs = available[offset : offset + page_size]
        rows = math.ceil(len(page_slugs) / columns)
        sheet = Image.new("RGB", (columns * tile[0], rows * tile[1]), "#dedede")
        draw = ImageDraw.Draw(sheet)
        font = ImageFont.load_default()
        for index, slug in enumerate(page_slugs):
            x = index % columns * tile[0]
            y = index // columns * tile[1]
            with Image.open(REFERENCE_DIR / f"{slug}.png") as reference:
                left = contain_on_canvas(reference, panel)
            with Image.open(STAGED_DIR / f"{slug}.webp") as generated:
                right = contain_on_canvas(generated, panel)
            sheet.paste(left, (x, y))
            sheet.paste(right, (x + panel[0] + gutter, y))
            draw.text(
                (x + 8, y + panel[1] + 8),
                f"{by_slug[slug]['name']}  ORIGINAL | IMAGEGEN",
                fill="black",
                font=font,
            )
        output = QA_DIR / f"comparison-page-{page_index:02d}.jpg"
        sheet.save(output, "JPEG", quality=95, subsampling=0)
        outputs.append(output)
    return outputs


def make_card_sheet(products: list[dict], available: list[str]) -> Path:
    columns = 8
    card = (180, 300)
    label_height = 28
    rows = math.ceil(len(available) / columns)
    sheet = Image.new("RGB", (columns * card[0], rows * (card[1] + label_height)), "#e7e7e7")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    by_slug = {slugify(product["name"]): product for product in products}

    for index, slug in enumerate(available):
        x = index % columns * card[0]
        y = index // columns * (card[1] + label_height)
        with Image.open(STAGED_DIR / f"{slug}.webp") as source:
            preview = contain_on_canvas(source, card)
        sheet.paste(preview, (x, y))
        draw.text((x + 7, y + card[1] + 8), by_slug[slug]["name"], fill="black", font=font)

    output = QA_DIR / "cards-all.jpg"
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "JPEG", quality=94, subsampling=0)
    return output


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--publish",
        action="store_true",
        help="replace public catalogue assets; requires all manifest images",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    with MANIFEST_PATH.open(encoding="utf-8") as handle:
        products = json.load(handle)["products"]

    expected = [slugify(product["name"]) for product in products]
    available = [slug for slug in expected if (GENERATED_DIR / f"{slug}.png").is_file()]
    unexpected = sorted(path.stem for path in GENERATED_DIR.glob("*.png") if path.stem not in expected)
    if unexpected:
        raise ValueError(f"Archivos generados sin producto: {', '.join(unexpected)}")

    STAGED_DIR.mkdir(parents=True, exist_ok=True)
    dimensions: dict[str, dict[str, list[int]]] = {}
    for slug in available:
        source_path = GENERATED_DIR / f"{slug}.png"
        with Image.open(source_path) as source:
            source_size = list(source.size)
            final = tight_crop(source)
        staged_path = STAGED_DIR / f"{slug}.webp"
        final.save(staged_path, "WEBP", quality=94, method=6)
        dimensions[slug] = {"source": source_size, "cropped": list(final.size)}

    QA_DIR.mkdir(parents=True, exist_ok=True)
    with (QA_DIR / "dimensions.json").open("w", encoding="utf-8") as handle:
        json.dump(dimensions, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    comparison = make_comparison_sheet(products, available) if available else None
    comparison_pages = make_comparison_pages(products, available) if available else []
    cards = make_card_sheet(products, available) if available else None

    if args.publish:
        missing = [slug for slug in expected if slug not in available]
        if missing:
            raise ValueError(
                f"Publicación cancelada: faltan {len(missing)} modelos: {', '.join(missing)}"
            )
        for product in products:
            slug = slugify(product["name"])
            destination = product_directory(product["family"]) / f"door-{slug}.webp"
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(STAGED_DIR / f"{slug}.webp", destination)
        print(f"Publicadas: {len(products)}")

    print(f"Generadas disponibles: {len(available)}/{len(expected)}")
    if comparison:
        print(f"Comparación: {comparison.relative_to(ROOT)}")
    if comparison_pages:
        print(f"Páginas de detalle: {len(comparison_pages)}")
    if cards:
        print(f"Tarjetas: {cards.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
