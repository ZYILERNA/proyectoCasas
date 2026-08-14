# ACERO/s108-pro direct ImageGen prompt set

All accepted assets were produced by separate built-in ImageGen calls. Every call referenced only:

- `output/ai-full-regeneration/masters/ACERO/s108-pro/master-no-logo-ai-tight.png` as the architecture reference.
- `public/images/logo-wonly.webp` as the sole official brand reference.

No generated result was used as an input. No filter, recolor, mask, crop, resize, composite or format conversion was applied after generation.

## Shared prompt specification

- Use case: photorealistic product-mockup for a square catalog image.
- Preserve the ACERO/s108-pro architecture: complete heavy rectangular outer frame, wide smooth horizontal header, finely fluted full-height left and right fields, narrow smooth center strip, exact seams and one slim black smart lock.
- Expand the door horizontally as needed so the complete frame fills more than 98% of the square canvas and reaches or remains only 0–8 px from every edge.
- Keep the view straight-on. Do not add a wall, room, floor, scene, cast-shadow stage or broad white surround.
- Place exactly one small official WONLY logo, faithful to the supplied official reference, high on the smooth center strip. The exact visible word is `WONLY` once.
- The lock may contain only functional unlabeled geometry: camera lens, fingerprint pad, status light and simple round controls. No digits, letters, words, pseudo-text, keypad glyphs, UI symbols, labels, badges, icons or decoration.
- Generate a new image directly with AI; do not simulate finishes by filtering or recoloring an earlier image.

## Finish requests and accepted generation IDs

- `original` — original dark graphite charcoal powder-coated steel. Accepted retry: `exec-e29e5dd3-8d0c-4740-ae96-bbf7ae943860`.
- `negro` — deep satin black. Accepted: `exec-db8576c1-ade2-4814-9489-f92f20e2c3d7`.
- `wengue` — very dark espresso/chocolate wenge with restrained vertical grain. Accepted: `exec-9a43b9e8-254b-4bc2-904a-7195528fcc88`.
- `gris-oscuro` — neutral dark gunmetal gray, lighter than black. Accepted: `exec-534b1617-96ef-4953-a545-9dab556188ee`.
- `antracita` — rich anthracite gray with a subtle warm-charcoal undertone. Accepted: `exec-87d91b93-469c-434e-a6af-3de2d7673f8d`.
- `nogal` — medium-dark natural walnut brown with subtle vertical walnut grain. Accepted: `exec-5cd81154-30f8-4100-adc5-78bb9a4c806f`.
- `roble` — warm light oak with beige-golden vertical grain. Accepted: `exec-d1040be4-bd1c-40ac-a86a-712c1878f125`.
- `gris-claro` — uniform light neutral gray, clearly gray rather than white. Accepted: `exec-f0634822-168f-42c6-9be5-2a04e5853193`.
- `natural` — pale honey-beige natural timber with minimal stain. Accepted: `exec-7f2395c5-0bd1-41cb-98e9-56e9a565f01c`.
- `blanco` — clean satin architectural white; WONLY rendered in a contrasting graphite/silver treatment while preserving the official shape. Accepted blank-lock retry: `exec-461504ec-850f-47df-84aa-00314f302fa3`.

## Rejections

- `original` attempt 1 (`exec-4231e042-8d0c-4ad2-b402-26978388835d`) was rejected because it left large white side columns.
- `blanco` attempt 1 (`exec-601d4351-7d7f-4f44-9ebd-4a7f2f10bd5e`) was rejected because the lock showed avoidable curved pseudo-symbols; the accepted retry uses a blank lock face.

These ten images remain raw staging artifacts only. No conversion and no write to public catalog paths was performed.
