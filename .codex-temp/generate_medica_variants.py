from pathlib import Path
import math
import re
import unicodedata

import numpy as np
from PIL import Image, ImageDraw


ROOT = Path("public/images/PUERTAS/MEDICA")
COLORS = [
    ("negro", "#171717", False),
    ("wengue", "#4A2E1A", True),
    ("gris-oscuro", "#36383A", False),
    ("antracita", "#484A4B", False),
    ("nogal", "#5C3524", True),
    ("roble", "#A8784E", True),
    ("gris-claro", "#A5A19A", False),
    ("natural", "#C19A6B", True),
    ("blanco", "#E8E5DE", False),
]

MASKS = {
    "door-puerta-automática-plana,-hermética-y-abatible": {
        "rects": [(110, 70, 385, 535)],
        "exclude": [(205, 185, 300, 275), (85, 0, 440, 68), (0, 365, 95, 430), (390, 365, 528, 430)],
    },
    "door-puerta-cortafuego-aislante1": {
        "rects": [(135, 105, 385, 585)],
        "exclude": [(238, 85, 292, 575), (188, 215, 230, 405), (326, 210, 365, 410), (270, 0, 356, 82)],
    },
    "door-puerta-cortafuego-aislante2": {
        "rects": [(164, 78, 361, 538)],
        "exclude": [(218, 215, 253, 390), (155, 0, 496, 70), (360, 390, 496, 618)],
    },
    "door-puerta-de-sala1": {
        "rects": [(52, 35, 279, 625)],
        "exclude": [(106, 145, 172, 365), (166, 500, 218, 565), (220, 38, 268, 73)],
    },
    "door-puerta-de-sala2": {
        "rects": [(67, 42, 279, 617)],
        "exclude": [(108, 143, 168, 360), (52, 388, 289, 465), (222, 44, 272, 78)],
    },
    "door-puerta-de-sala3": {
        "rects": [(64, 40, 290, 626)],
        "exclude": [(107, 134, 207, 238), (217, 40, 270, 76)],
    },
    "door-puerta-de-sala4": {
        "rects": [(55, 78, 303, 624)],
        "exclude": [(133, 247, 187, 432), (36, 421, 318, 497), (55, 73, 303, 153), (55, 500, 72, 624)],
    },
    "door-puerta-de-sala5": {
        "rects": [(57, 45, 315, 630)],
        "exclude": [(138, 198, 193, 425), (224, 45, 289, 82)],
    },
    "door-puertas-automáticas-herméticas": {
        "rects": [(237, 74, 496, 530)],
        "exclude": [(345, 167, 437, 281), (230, 354, 496, 426), (0, 0, 226, 561)],
    },
}


def hex_rgb(value):
    value = value.lstrip("#")
    return np.array([int(value[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float32)


def slugify(stem):
    base = stem[5:] if stem.startswith("door-") else stem
    base = unicodedata.normalize("NFKD", base).encode("ascii", "ignore").decode("ascii")
    base = base.lower().replace(",", "")
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    return base


def draw_mask(size, spec):
    w, h = size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    for rect in spec["rects"]:
        draw.rectangle(rect, fill=255)
    for rect in spec.get("exclude", []):
        draw.rectangle(rect, fill=0)
    return np.array(mask) > 0


def grain_pattern(h, w, seed):
    rng = np.random.default_rng(seed)
    columns = rng.normal(0, 1, w)
    columns = np.convolve(columns, np.ones(19) / 19, mode="same")
    columns = columns / (np.max(np.abs(columns)) + 1e-6)
    x = np.arange(w)
    waves = 0.45 * np.sin(x / 8.0 + seed) + 0.28 * np.sin(x / 19.0 + seed * 0.5)
    waves = waves / (np.max(np.abs(waves)) + 1e-6)
    vertical = (columns * 0.65 + waves * 0.35)[None, :]
    fine = rng.normal(0, 0.28, (h, w))
    fine = np.cumsum(fine, axis=0)
    fine = fine / (np.max(np.abs(fine)) + 1e-6)
    return vertical * 0.095 + fine * 0.02


def recolor(image, spec, target_hex, wood, seed):
    rgba = np.array(image.convert("RGBA")).astype(np.float32)
    rgb = rgba[:, :, :3]
    alpha = rgba[:, :, 3]
    region = draw_mask(image.size, spec) & (alpha > 10)

    luma = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    maxc = rgb.max(axis=2)
    minc = rgb.min(axis=2)
    sat = np.where(maxc > 0, (maxc - minc) / np.maximum(maxc, 1), 0)

    very_dark_hardware = (luma < 70) & (sat < 0.45)
    green_label = (rgb[:, :, 1] > rgb[:, :, 0] * 1.15) & (rgb[:, :, 1] > rgb[:, :, 2] * 1.05) & (sat > 0.18)
    mask = region & ~very_dark_hardware & ~green_label

    target = hex_rgb(target_hex)
    median = np.median(luma[mask]) if mask.any() else 160.0
    shade = np.clip((luma / max(median, 1)) ** 0.84, 0.50, 1.45)

    color = target[None, None, :] * shade[:, :, None]
    if target.mean() > 210:
        color = target[None, None, :] * np.clip(0.82 + (shade - 0.50) * 0.35, 0.80, 1.06)[:, :, None]
    if target.mean() < 45:
        color = target[None, None, :] * np.clip(0.82 + (shade - 0.50) * 0.72, 0.66, 1.34)[:, :, None]

    if wood:
        h, w = alpha.shape
        grain = grain_pattern(h, w, seed)
        std = max(float(np.std(luma[mask])) if mask.any() else 35.0, 16.0)
        original_texture = (luma - median) / std
        wood_factor = np.clip(1.0 + grain + original_texture * 0.04, 0.76, 1.25)
        color = color * wood_factor[:, :, None] * np.array([1.04, 0.98, 0.91], dtype=np.float32)[None, None, :]
    else:
        texture = np.clip(1.0 + (luma - median) / 950.0, 0.90, 1.10)
        color = color * texture[:, :, None]

    rgba[:, :, :3][mask] = np.clip(color[mask], 0, 255)
    return Image.fromarray(np.clip(rgba, 0, 255).astype(np.uint8), "RGBA")


def make_sheet(model_dirs):
    tiles = []
    for model_dir in model_dirs:
        for slug, _, _ in COLORS:
            f = model_dir / f"door-{model_dir.name}-{slug}-ai.webp"
            im = Image.open(f).convert("RGB")
            im.thumbnail((128, 154))
            tile = Image.new("RGB", (160, 205), "white")
            tile.paste(im, ((160 - im.width) // 2, 7))
            ImageDraw.Draw(tile).text((5, 169), f"{model_dir.name[:22]}\n{slug}", fill=(0, 0, 0))
            tiles.append(tile)
    cols = 9
    rows = math.ceil(len(tiles) / cols)
    sheet = Image.new("RGB", (cols * 160, rows * 205), (238, 238, 238))
    for i, tile in enumerate(tiles):
        sheet.paste(tile, ((i % cols) * 160, (i // cols) * 205))
    sheet.save(".codex-temp/medica-variants-sheet.jpg", quality=92)


def main():
    model_dirs = []
    for source in sorted(ROOT.glob("door-*.webp")):
        stem = source.stem
        spec = MASKS.get(stem)
        if not spec:
            raise RuntimeError(f"missing mask for {stem}")
        slug = slugify(stem)
        out_dir = ROOT / slug
        out_dir.mkdir(exist_ok=True)
        original = Image.open(source).convert("RGBA")
        original.save(out_dir / "original.webp", "WEBP", quality=92, method=6)
        for idx, (name, hex_value, wood) in enumerate(COLORS):
            variant = recolor(original, spec, hex_value, wood, seed=sum(ord(c) for c in slug) + idx * 37)
            variant.save(out_dir / f"door-{slug}-{name}-ai.webp", "WEBP", quality=92, method=6)
        model_dirs.append(out_dir)
        print(stem, "=>", slug)
    make_sheet(model_dirs)
    print(f"generated {len(model_dirs)} medical model folders")


if __name__ == "__main__":
    main()
