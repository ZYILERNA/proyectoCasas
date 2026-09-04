#!/usr/bin/env python3
"""Extract the WONLY 2026 catalogue assets without altering the source PDF.

Examples:
  python scripts/extract-wonly-2026-assets.py --spreads-dir tmp/pdfs/wonly-2026-pages
  python scripts/extract-wonly-2026-assets.py --pdf "C:/path/to/catalogue.pdf"

Dependencies: Pillow and, only for --pdf, pypdf.
"""

from __future__ import annotations

import argparse
import io
import json
import math
import re
import shutil
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "data" / "wonly-2026-assets.json"
PUBLIC_IMAGES = ROOT / "public" / "images"
EXPECTED_SPREAD_SIZE = (3120, 1576)


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def asset_directory(family: str) -> Path:
    if family.startswith("pvc"):
        return PUBLIC_IMAGES / "PUERTAS" / "PVC" / "2026"
    if family.startswith("aluminium"):
        return PUBLIC_IMAGES / "PUERTAS" / "CORREDIZA" / "2026"
    return PUBLIC_IMAGES / "PUERTAS" / "MADERAACÚSTICA" / "2026"


def load_manifest() -> dict:
    with MANIFEST_PATH.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def extract_spreads_from_pdf(pdf_path: Path, destination: Path) -> None:
    try:
        from pypdf import PdfReader
    except ImportError as exc:  # pragma: no cover - depends on local runtime
        raise SystemExit("Para usar --pdf instala pypdf; --spreads-dir solo requiere Pillow.") from exc

    reader = PdfReader(str(pdf_path))
    destination.mkdir(parents=True, exist_ok=True)
    for index, page in enumerate(reader.pages, start=1):
        images = list(page.images)
        if not images:
            raise RuntimeError(f"El pliego {index} no contiene una imagen extraíble.")
        largest = max(images, key=lambda item: len(item.data))
        with Image.open(io.BytesIO(largest.data)) as image:
            rgb = image.convert("RGB")
            rgb.save(destination / f"spread-{index:02d}.jpg", quality=96, subsampling=0)


def validate_crop(crop: list[int], size: tuple[int, int], label: str) -> tuple[int, int, int, int]:
    if len(crop) != 4:
        raise ValueError(f"Recorte inválido para {label}: {crop}")
    x1, y1, x2, y2 = crop
    width, height = size
    if not (0 <= x1 < x2 <= width and 0 <= y1 < y2 <= height):
        raise ValueError(f"Recorte fuera de límites para {label}: {crop} sobre {size}")
    return x1, y1, x2, y2


def fit_on_canvas(source: Image.Image, canvas_size: tuple[int, int], margin: int = 32) -> Image.Image:
    inner = (canvas_size[0] - margin * 2, canvas_size[1] - margin * 2)
    fitted = ImageOps.contain(source.convert("RGB"), inner, Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", canvas_size, "white")
    position = ((canvas.width - fitted.width) // 2, (canvas.height - fitted.height) // 2)
    canvas.paste(fitted, position)
    return canvas


def build_wallpaper(source: Image.Image) -> Image.Image:
    """Create a clean, text-free catalogue wallpaper from the model crop."""
    target_size = (900, 1400)
    background = ImageOps.fit(
        source.convert("RGB"),
        target_size,
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    ).filter(ImageFilter.GaussianBlur(24))
    background = ImageEnhance.Color(background).enhance(0.72)
    background = ImageEnhance.Brightness(background).enhance(0.68).convert("RGBA")

    foreground = ImageOps.contain(source.convert("RGBA"), (760, 1260), Image.Resampling.LANCZOS)
    x = (target_size[0] - foreground.width) // 2
    y = (target_size[1] - foreground.height) // 2

    shadow_mask = Image.new("L", target_size, 0)
    shadow_draw = ImageDraw.Draw(shadow_mask)
    shadow_draw.rounded_rectangle(
        (x - 12, y - 12, x + foreground.width + 12, y + foreground.height + 12),
        radius=24,
        fill=115,
    )
    shadow_mask = shadow_mask.filter(ImageFilter.GaussianBlur(22))
    shadow = Image.new("RGBA", target_size, (0, 0, 0, 0))
    shadow.putalpha(shadow_mask)
    background.alpha_composite(shadow)

    foreground_mask = Image.new("L", foreground.size, 0)
    ImageDraw.Draw(foreground_mask).rounded_rectangle(
        (0, 0, foreground.width - 1, foreground.height - 1),
        radius=14,
        fill=255,
    )
    background.paste(foreground, (x, y), foreground_mask)
    return background.convert("RGB")


def save_webp(image: Image.Image, path: Path, quality: int = 90) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "WEBP", quality=quality, method=6)


def make_contact_sheet(items: list[tuple[str, Path]], output_path: Path, columns: int = 6) -> None:
    thumb_size = (220, 260)
    label_height = 34
    rows = math.ceil(len(items) / columns)
    sheet = Image.new("RGB", (columns * thumb_size[0], rows * (thumb_size[1] + label_height)), "#ededed")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()

    for index, (label, path) in enumerate(items):
        x = (index % columns) * thumb_size[0]
        y = (index // columns) * (thumb_size[1] + label_height)
        with Image.open(path) as image:
            thumb = ImageOps.contain(image.convert("RGB"), (thumb_size[0] - 12, thumb_size[1] - 12))
        sheet.paste(thumb, (x + (thumb_size[0] - thumb.width) // 2, y + 6))
        draw.text((x + 8, y + thumb_size[1] + 8), label, fill="black", font=font)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output_path, quality=92)


def run(spreads_dir: Path, qa_dir: Path | None) -> None:
    manifest = load_manifest()
    product_previews: list[tuple[str, Path]] = []
    wallpaper_previews: list[tuple[str, Path]] = []

    for product in manifest["products"]:
        spread_path = spreads_dir / f"spread-{product['spread']:02d}.jpg"
        if not spread_path.exists():
            raise FileNotFoundError(f"Falta {spread_path}")

        with Image.open(spread_path) as source:
            spread = source.convert("RGB")
        if spread.size != EXPECTED_SPREAD_SIZE:
            raise ValueError(f"{spread_path.name} mide {spread.size}; se esperaba {EXPECTED_SPREAD_SIZE}.")

        crop_box = validate_crop(product["imageCrop"], spread.size, product["name"])
        cropped = spread.crop(crop_box)
        ratio = cropped.width / cropped.height
        canvas_size = (1200, 900) if ratio >= 0.72 else (900, 1200)
        product_image = fit_on_canvas(cropped, canvas_size)

        slug = slugify(product["name"])
        product_path = asset_directory(product["family"]) / f"door-{slug}.webp"
        wallpaper_path = PUBLIC_IMAGES / "PUERTAS" / "WALLPAPER" / "2026" / f"{slug}.webp"
        save_webp(product_image, product_path, quality=92)
        save_webp(build_wallpaper(cropped), wallpaper_path, quality=88)
        product_previews.append((product["name"], product_path))
        wallpaper_previews.append((product["name"], wallpaper_path))

    hardware_dir = PUBLIC_IMAGES / "Asset" / "Accesorios" / "WONLY-2026"
    hardware_previews: list[tuple[str, Path]] = []
    for hardware in manifest["hardware"]:
        spread_path = spreads_dir / f"spread-{hardware['spread']:02d}.jpg"
        with Image.open(spread_path) as source:
            spread = source.convert("RGB")
        crop_box = validate_crop(hardware["crop"], spread.size, hardware["name"])
        hardware_image = fit_on_canvas(spread.crop(crop_box), (640, 360), margin=18)
        hardware_path = hardware_dir / f"{slugify(hardware['name'])}.webp"
        save_webp(hardware_image, hardware_path, quality=92)
        hardware_previews.append((hardware["name"], hardware_path))

    hero = manifest["hero"]
    hero_spread_path = spreads_dir / f"spread-{hero['spread']:02d}.jpg"
    with Image.open(hero_spread_path) as source:
        hero_spread = source.convert("RGB")
    hero_crop = validate_crop(hero["crop"], hero_spread.size, "hero 2026")
    hero_image = ImageOps.fit(
        hero_spread.crop(hero_crop),
        (1920, 900),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.5),
    )
    hero_path = ROOT / "public" / hero["output"].lstrip("/")
    save_webp(hero_image, hero_path, quality=90)

    if qa_dir:
        make_contact_sheet(product_previews, qa_dir / "wonly-2026-products.jpg")
        make_contact_sheet(wallpaper_previews, qa_dir / "wonly-2026-wallpapers.jpg")
        make_contact_sheet(hardware_previews, qa_dir / "wonly-2026-hardware.jpg", columns=4)

    print(f"Productos extraídos: {len(product_previews)}")
    print(f"Wallpapers extraídos: {len(wallpaper_previews)}")
    print(f"Herrajes extraídos: {len(hardware_previews)}")
    print(f"Hero extraído: {hero_path.relative_to(ROOT)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--spreads-dir", type=Path, help="Directorio con spread-01.jpg, spread-02.jpg, etc.")
    source.add_argument("--pdf", type=Path, help="PDF original del catálogo")
    parser.add_argument("--qa-dir", type=Path, default=ROOT / "tmp" / "pdfs" / "wonly-2026-qa")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    temporary: Path | None = None
    try:
        if args.pdf:
            temporary = Path(tempfile.mkdtemp(prefix="wonly-2026-spreads-"))
            extract_spreads_from_pdf(args.pdf.resolve(), temporary)
            spreads_dir = temporary
        else:
            spreads_dir = args.spreads_dir.resolve()
        run(spreads_dir, args.qa_dir.resolve() if args.qa_dir else None)
    finally:
        if temporary:
            shutil.rmtree(temporary, ignore_errors=True)


if __name__ == "__main__":
    main()
