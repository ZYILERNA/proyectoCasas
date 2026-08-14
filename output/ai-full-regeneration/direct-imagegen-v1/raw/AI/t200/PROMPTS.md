# AI T200 — direct ImageGen prompt record

Mode: built-in ImageGen. Each accepted asset is a direct independent generation from:

- `output/ai-full-regeneration/masters/AI/t200/master-no-logo-ai-tight.png` — exact T200 architecture and hardware reference.
- `public/images/logo-wonly.webp` — official logo reference.

No generated finish is used to create another finish. No filter, recolor, mask, crop, resize, composite, retouch, or local repair is allowed.

## Shared prompt contract audited across the ten active assets

Use case: `precise-object-edit`.

Generate a complete, centered, strict front-facing catalog image of the exact T200. Preserve the complete dark outer frame, wide upper header, three vertical door sections, full brushed-silver vertical center strip, one long recessed black pull handle, and exactly two black control modules to its left. Keep the complete frame visible and make it fill almost the whole portrait canvas, leaving only 0–8 pixels of visually white margin. Use a pure white background with no room, wall, floor, shadow, halo, decorative rectangle, props, or perspective.

Place exactly one official logo reading `WONLY` in the upper area. Do not add a second logo, altered spelling, or any other words, letters, numbers, labels, microtext, or pseudo-writing. In particular, both control modules must remain unlabelled. Do not add, remove, or relocate hardware.

## Finish directives

- `original`: original dark graphite finish.
- `negro`: elegant near-black finish.
- `wengue`: dark chocolate-brown wenge finish with subtle vertical grain.
- `gris-oscuro`: dark neutral-grey finish, lighter than black.
- `antracita`: charcoal anthracite finish.
- `nogal`: rich medium walnut-brown finish.
- `roble`: medium-light golden oak finish.
- `gris-claro`: clean light-grey finish, distinct from white.
- `natural`: pale blond natural-wood finish.
- `blanco`: soft-white finish, distinguishable from the white background.

## Exact prompt used for the 2026-08-13 `gris-claro` generation

```text
Use case: precise-object-edit
Asset type: ecommerce catalog product image for the WONLY T200 entrance door, light-grey finish.
Input images: Image 1 is the exact T200 door architecture and framing reference; Image 2 is the official WONLY logo reference that must be reproduced exactly once.
Primary request: generate a complete, front-facing, centered T200 door in a refined light-grey / gris claro finish. Preserve the exact architecture from Image 1: complete dark outer frame, wide horizontal header, three vertical door sections, the full brushed-silver vertical center strip, the original long recessed black pull handle, and the two original black control modules to its left.
Composition/framing: the entire door and complete outer frame must be visible and fill almost the entire portrait canvas; leave only 0–8 pixels of clean white margin on every side, visually almost no white border. Straight frontal elevation, no perspective, no cropping.
Branding: place exactly ONE official logo reading “WONLY” on the upper-right area of the header, matching Image 2 exactly. No second logo, no altered spelling, no other words or marks.
Finish: uniform elegant light grey on the door panels and header, clearly lighter than dark grey but distinct from white; retain realistic subtle material texture. Keep the outer frame dark charcoal/black and the center strip brushed silver.
Controls: preserve both control modules and their shapes, but show no letters, words, numbers, pseudo-text, or readable characters on them; simple unlabelled dark interface details only.
Lighting/mood: neutral soft catalog lighting, clean high-end product photography, pure white background.
Constraints: change only the panel/header surface finish and add the single official logo; preserve all geometry, proportions, hardware count, placement, seams, frame, and handle. Complete door, one WONLY logo only, no text anywhere else, no invented hardware.
Avoid: crop, excessive white border, room, wall, floor, cast shadow, halo, decorative rectangle, duplicate logo, misspelled brand, watermark, labels, letters, numbers, extra control modules, extra handles, distorted architecture.
```

The prior rejected attempt remains under `_rejected/gris-claro-no-wonly.png` for audit and is not part of the accepted set.
