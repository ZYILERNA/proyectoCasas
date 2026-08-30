# ImageGen prompt log — MADERAACÚSTICA / wl-5109

- Mode: built-in ImageGen only.
- Use case: `precise-object-edit`.
- Canonical and sole reference in every one of the 28 calls: `public/images/PUERTAS/MADERAACÚSTICA/wl-5109/original.webp`.
- Verified full reference SHA-256: `bf97ee7ffb3719a7a9b9192b424c39c9db17f22b70150a0fb197fc509f93e60a`.
- Policy: `NO_LOGO`.
- Execution: one independent direct call per finish or retry; no generated output was ever used as an input.
- Postprocessing: none. No filter, recolor, mask, crop, resize, conversion, composite, upscaling or pixel processing.
- Transfer: every represented PNG was copied byte-for-byte from its built-in ImageGen artifact.
- Coverage: 28 calls = 9 active selections + 19 rejected/retired artifacts.
- Prompt provenance correction: the initially specified compacted snapshot `C:/Users/zhen/.codex/sessions/2026/08/29/rollout-2026-08-29T17-15-22-01a04e16-f641-7251-bd41-f5b413018c09.jsonl` contains none of the 17 target events. The literal `image_generation_end.revised_prompt` values were recovered in streaming mode from `C:/Users/zhen/.codex/sessions/2026/08/11/rollout-2026-08-11T09-58-35-019fefd4-996a-77f0-a377-59d6191e00c0.jsonl`, whose session ID exactly matches the new `generated_images` directory.

## Provenance

| Order | Phase | Finish | Attempt | Result | Generator ID | Dimensions | RGB<245 L/T/R/B | Workspace file |
|---:|---|---|---:|---|---|---|---|---|
| 1 | previous-package | negro | 1 | REJECTED | `exec-930c6d83-abc4-4cc3-8a68-b74b0ae0aa0b` | `975×1614` | `112/9/113/6` | `_rejected/negro-attempt-1-padding-and-aspect.png` |
| 2 | previous-package | wengue | 1 | REJECTED | `exec-3a8beeb5-4d36-478c-87c1-9c720c1eeaf9` | `907×1735` | `68/9/70/8` | `_rejected/wengue-attempt-1-padding-and-aspect.png` |
| 3 | previous-package | gris-oscuro | 1 | RETIRED | `exec-c8c13010-2148-4df4-b4a7-4d5c5b0acf9f` | `774×2032` | `10/14/11/7` | `_rejected/gris-oscuro-previous-selected-before-minimum-margin-revision.png` |
| 4 | previous-package | antracita | 1 | ACCEPTED | `exec-bdc8f687-5324-4634-870d-36625553d4cc` | `774×2032` | `10/8/11/2` | `antracita.png` |
| 5 | previous-package | nogal | 1 | ACCEPTED | `exec-264b4fe3-8835-41d2-8f7d-74727228f976` | `774×2031` | `7/7/6/5` | `nogal.png` |
| 6 | previous-package | roble | 1 | ACCEPTED | `exec-d6c4e612-7398-4e8c-a4a4-e402b243bce6` | `774×2032` | `9/7/9/4` | `roble.png` |
| 7 | previous-package | gris-claro | 1 | RETIRED | `exec-d9f9274e-1036-4c91-9748-5c28ae49eb99` | `775×2030` | `11/8/13/5` | `_rejected/gris-claro-previous-selected-before-minimum-margin-revision.png` |
| 8 | previous-package | natural | 1 | RETIRED | `exec-2ea23513-6997-41dd-b2f3-6310d72e7a82` | `774×2032` | `12/8/14/7` | `_rejected/natural-previous-selected-before-minimum-margin-revision.png` |
| 9 | previous-package | blanco | 1 | RETIRED | `exec-0cd2d412-a66d-474f-abe7-c1757bdca8d7` | `775×2030` | `12/8/15/5` | `_rejected/blanco-previous-selected-before-minimum-margin-revision.png` |
| 10 | previous-package | negro | 2 | ACCEPTED | `exec-37fe36bf-792d-4da0-99b5-00a6a4ef783e` | `775×2030` | `9/7/9/0` | `negro.png` |
| 11 | previous-package | wengue | 2 | ACCEPTED | `exec-5eb7e38b-6aa3-42ba-a04b-e29b8bfcc559` | `775×2030` | `9/6/11/0` | `wengue.png` |
| 12 | minimum-margin-revision | blanco | 1 | REJECTED | `exec-b8b83929-3f15-49e4-902d-52ccab6bbe52` | `889×1768` | `82/6/82/6` | `_rejected/blanco-minimum-margin-revision-attempt-1-aspect-and-padding.png` |
| 13 | minimum-margin-revision | gris-claro | 1 | REJECTED | `exec-3f4e9245-acd2-49db-874d-055d03fccb60` | `773×2033` | `18/14/21/16` | `_rejected/gris-claro-minimum-margin-revision-attempt-1-padding.png` |
| 14 | minimum-margin-revision | gris-oscuro | 1 | REJECTED | `exec-99d7882f-e738-42a9-a106-3af653fc26f7` | `890×1767` | `84/10/88/5` | `_rejected/gris-oscuro-minimum-margin-revision-attempt-1-aspect-and-padding.png` |
| 15 | minimum-margin-revision | natural | 1 | REJECTED | `exec-c8dbe3d8-5fa5-4244-bf4a-1ca0ed5aa7a0` | `890×1767` | `41/16/53/13` | `_rejected/natural-minimum-margin-revision-attempt-1-aspect-and-padding.png` |
| 16 | minimum-margin-revision | blanco | 2 | REJECTED | `exec-861b1617-bdbb-4684-b5ee-44d445062009` | `891×1766` | `36/15/30/7` | `_rejected/blanco-minimum-margin-revision-attempt-2-aspect-and-padding.png` |
| 17 | minimum-margin-revision | gris-claro | 2 | REJECTED | `exec-b1cab9f8-f395-426d-8939-8a26f5d5a30a` | `774×2031` | `14/9/16/10` | `_rejected/gris-claro-minimum-margin-revision-attempt-2-padding.png` |
| 18 | minimum-margin-revision | gris-oscuro | 2 | ACCEPTED | `exec-e54359ba-b3c3-4d68-8da5-ceb916bbc6bb` | `774×2033` | `9/9/9/5` | `gris-oscuro.png` |
| 19 | minimum-margin-revision | natural | 2 | REJECTED | `exec-20d2cfe1-2969-4cad-845f-6684719eb851` | `773×2033` | `18/16/18/14` | `_rejected/natural-minimum-margin-revision-attempt-2-padding.png` |
| 20 | minimum-margin-revision | blanco | 3 | REJECTED | `exec-c2b2f3fa-9646-4d2c-9b18-2bcbe7215941` | `774×2032` | `10/6/16/4` | `_rejected/blanco-minimum-margin-revision-attempt-3-padding.png` |
| 21 | minimum-margin-revision | gris-claro | 3 | ACCEPTED | `exec-baf8c92e-961d-42b7-91cc-b2f30da65814` | `773×2033` | `11/9/11/9` | `gris-claro.png` |
| 22 | minimum-margin-revision | natural | 3 | ACCEPTED | `exec-81025393-7ae0-41d0-b0aa-6b68797a57ab` | `774×2033` | `10/7/10/4` | `natural.png` |
| 23 | minimum-margin-revision | blanco | 4 | REJECTED | `exec-717f33e6-a460-4963-bdce-99c9c1429605` | `887×1773` | `75/2/75/2` | `_rejected/blanco-minimum-margin-revision-attempt-4-aspect-and-padding.png` |
| 24 | minimum-margin-revision | blanco | 5 | REJECTED | `exec-aaf9ad03-d528-4421-b132-471d3351af0e` | `890×1767` | `38/15/44/2` | `_rejected/blanco-minimum-margin-revision-attempt-5-aspect-and-padding.png` |
| 25 | minimum-margin-revision | blanco | 6 | REJECTED | `exec-cde7a31d-371b-4c6c-8e95-e749fd3f539f` | `774×2032` | `16/6/18/7` | `_rejected/blanco-minimum-margin-revision-attempt-6-padding.png` |
| 26 | minimum-margin-revision | blanco | 7 | SUPERSEDED | `exec-43eef4aa-22eb-450a-8663-27b13f22a3db` | `773×2035` | `10/5/11/8` | `_rejected/blanco-minimum-margin-revision-attempt-7-superseded.png` |
| 27 | minimum-margin-revision | blanco | 8 | ACCEPTED | `exec-16b45ae4-0f89-4861-a71e-883302c0cac3` | `774×2033` | `11/3/8/4` | `blanco.png` |
| 28 | minimum-margin-revision | blanco | 9 | SUPERSEDED | `exec-7dcfaadf-8a94-4c0f-a815-6f294b876e83` | `774×2033` | `10/7/11/4` | `_rejected/blanco-minimum-margin-revision-attempt-9-superseded.png` |

## Previous package prompt log

The following prior-package prompt templates, substitutions and rejection measurements are preserved verbatim from the existing package documentation. Together they specify the exact prompts for calls 1–11.

## Exact prompt composition — template 1

This template was used verbatim for negro attempt 1, wengue attempt 1, gris-oscuro attempt 1 and antracita attempt 1. `PRIMARY_REQUEST_LINE` and `AVOID_LINE` were replaced by the exact finish-specific lines below; nothing else changed.

```text
Use case: precise-object-edit
Asset type: ecommerce catalog product image of an interior acoustic wood door
Input images: Image 1 is the only edit target and only reference.
PRIMARY_REQUEST_LINE
Composition/framing: Preserve the exact original straight-on viewpoint, portrait canvas, door scale, centering, full-door visibility, and all outer margins.
Constraints: Preserve exactly the door model, proportions, panel layout, narrow left vertical inset, horizontal lower seam, angled notch around the handle area, grooves, moldings, frame profiles, thresholds, handle, lock, hardware positions and shapes, white background, lighting direction, contact shadows, and photographic realism. Change only the wood color/finish. Keep every part fully inside the canvas. No crop, zoom, resize, rotation, perspective shift, added object, removed object, redesign, or stylization.
NO_LOGO: Absolutely no text, letters, numbers, words, logos, brand marks, watermarks, signatures, labels, stickers, emblems, QR codes, barcodes, captions, UI, microtext, tiny glyphs, or pseudo-writing anywhere.
AVOID_LINE
```

### Template 1 substitutions

Negro attempt 1 — REJECT:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to a refined deep matte BLACK (negro) wood finish, near-black neutral charcoal with clearly retained subtle vertical wood grain and readable edge detail.
AVOID_LINE = Avoid: pure featureless black, crushed shadows, glossy lacquer, metallic finish, color casts, invented decorative marks, extra hardware.
```

Wengue attempt 1 — REJECT:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to WENGUÉ: a very dark espresso-brown tropical wood finish, rich brown-black rather than neutral black, with restrained warm undertones and clearly retained fine vertical wood grain.
AVOID_LINE = Avoid: neutral black, red mahogany, orange cast, flat paint, glossy lacquer, metallic finish, invented decorative marks, extra hardware.
```

Gris oscuro attempt 1 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to GRIS OSCURO: a dark neutral graphite-gray wood finish, clearly gray (not brown and not near-black), with retained fine vertical wood grain and enough tonal detail to read the panels and frame.
AVOID_LINE = Avoid: brown cast, blue cast, near-black antracite, pale gray, flat paint, glossy lacquer, metallic finish, invented decorative marks, extra hardware.
```

Antracita attempt 1 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to ANTRACITA: a deep cool charcoal-anthracite gray wood finish, darker and cooler than ordinary dark gray but still visibly gray, with retained fine vertical wood grain and readable panel edges.
AVOID_LINE = Avoid: brown or warm cast, pure black, medium gray, flat paint, glossy lacquer, metallic finish, invented decorative marks, extra hardware.
```

## Exact prompt composition — template 2, minimal-margin framing

This template was used verbatim for nogal, roble, gris-claro, natural and blanco. `PRIMARY_REQUEST_LINE`, `CONSTRAINTS_LINE` and `AVOID_LINE` were replaced by the exact finish-specific lines below; nothing else changed.

```text
Use case: precise-object-edit
Asset type: ecommerce catalog product image of an interior acoustic wood door
Input images: Image 1 is the only edit target and only reference.
PRIMARY_REQUEST_LINE
Composition/framing: Straight-on portrait product view. The complete door and outer frame must fill almost the entire canvas width and height, matching the tight framing of Image 1. Use only a very thin, minimal white safety margin on every side; no notable padding; do not cut, clip, or touch any outer edge.
CONSTRAINTS_LINE
NO_LOGO: Absolutely no text, letters, numbers, words, logos, brand marks, watermarks, signatures, labels, stickers, emblems, QR codes, barcodes, captions, UI, microtext, tiny glyphs, or pseudo-writing anywhere.
AVOID_LINE
```

### Template 2 substitutions

Nogal attempt 1 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to NOGAL: a refined medium-dark warm walnut brown with natural chocolate and subtle amber variation, elegant visible vertical walnut grain, neither orange nor nearly black.
CONSTRAINTS_LINE = Constraints: Preserve exactly the door model, proportions, panel layout, narrow left vertical inset, horizontal lower seam, angled notch around the handle area, grooves, moldings, frame profiles, thresholds, handle, lock, hardware positions and shapes, white background, lighting direction, contact shadows, and photographic realism. Change only the wood color/finish. No crop after generation, no rotation, perspective shift, added object, removed object, redesign, or stylization.
AVOID_LINE = Avoid: orange-red mahogany, wenge darkness, pale oak, flat paint, glossy lacquer, metallic finish, invented decorative marks, extra hardware, wide white margins.
```

Roble attempt 1 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to ROBLE: a classic golden honey oak finish, warm light-to-medium golden brown with realistic pronounced but refined vertical oak grain, clearly distinct from pale natural wood and darker walnut.
CONSTRAINTS_LINE = Constraints: Preserve exactly the door model, proportions, panel layout, narrow left vertical inset, horizontal lower seam, angled notch around the handle area, grooves, moldings, frame profiles, thresholds, handle, lock, hardware positions and shapes, white background, lighting direction, contact shadows, and photographic realism. Change only the wood color/finish. No crop after generation, no rotation, perspective shift, added object, removed object, redesign, or stylization.
AVOID_LINE = Avoid: orange saturation, red mahogany, dark walnut, washed-out beige, flat paint, glossy lacquer, invented decorative marks, extra hardware, wide white margins.
```

Gris claro attempt 1 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to GRIS CLARO: a light neutral-to-slightly-cool gray wood finish, soft architectural gray with clearly retained fine vertical grain and enough contrast for grooves, frame profiles, and panel boundaries.
CONSTRAINTS_LINE = Constraints: Preserve exactly the door model, proportions, panel layout, narrow left vertical inset, horizontal lower seam, angled notch around the handle area, grooves, moldings, frame profiles, thresholds, handle, lock, hardware positions and shapes, pure white background, lighting direction, contact shadows, and photographic realism. Change only the wood color/finish. Maintain clear separation between the light-gray door and white background. No crop after generation, no rotation, perspective shift, added object, removed object, redesign, or stylization.
AVOID_LINE = Avoid: white finish, medium/dark gray, blue cast, beige cast, flat featureless paint, glossy lacquer, invented decorative marks, extra hardware, wide white margins.
```

Natural attempt 1 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to NATURAL: a pale warm natural unfinished-wood look, light beige-sand with subtle cream and straw tones, understated realistic vertical grain, lighter and less golden than oak.
CONSTRAINTS_LINE = Constraints: Preserve exactly the door model, proportions, panel layout, narrow left vertical inset, horizontal lower seam, angled notch around the handle area, grooves, moldings, frame profiles, thresholds, handle, lock, hardware positions and shapes, pure white background, lighting direction, contact shadows, and photographic realism. Change only the wood color/finish. Maintain clear separation between the pale wood and white background. No crop after generation, no rotation, perspective shift, added object, removed object, redesign, or stylization.
AVOID_LINE = Avoid: golden orange oak, dark brown walnut, gray, white paint, washed-out background blending, glossy lacquer, invented decorative marks, extra hardware, wide white margins.
```

Blanco attempt 1 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to BLANCO: an elegant soft warm-white painted wood finish, visibly white against the pure white backdrop through subtle realistic grain, edge shading, and panel relief; clean, matte, and not featureless.
CONSTRAINTS_LINE = Constraints: Preserve exactly the door model, proportions, panel layout, narrow left vertical inset, horizontal lower seam, angled notch around the handle area, grooves, moldings, frame profiles, thresholds, handle, lock, hardware positions and shapes, pure white background, lighting direction, contact shadows, and photographic realism. Change only the wood color/finish. Ensure the white door silhouette and all frame edges remain clearly legible against the background. No crop after generation, no rotation, perspective shift, added object, removed object, redesign, or stylization.
AVOID_LINE = Avoid: beige natural wood, gray finish, blown highlights, disappearing edges, flat featureless fill, glossy lacquer, invented decorative marks, extra hardware, wide white margins.
```

## Exact prompt composition — template 3, fresh strict-aspect retries

This template was used verbatim for negro attempt 2 and wengue attempt 2. Each retry again referenced only the canonical `original.webp`. `PRIMARY_REQUEST_LINE` and `AVOID_LINE` were replaced by the exact lines below; nothing else changed.

```text
Use case: precise-object-edit
Asset type: ecommerce catalog product image of an interior acoustic wood door
Input images: Image 1 is the only edit target and only reference. This is a fresh edit from Image 1; ignore all other images.
PRIMARY_REQUEST_LINE
Composition/framing — critical: Match Image 1's very tall narrow canvas aspect ratio (approximately 0.3805 width/height), straight-on view, and tight product framing. The complete outer door frame must fill almost the entire canvas width and height. Leave only a tiny, even white safety margin of about 1% or less on left, right, top, and bottom. No notable white padding. Every outer frame edge must remain fully visible and must not touch or be clipped by the canvas.
Constraints: Preserve exactly the door model, proportions, panel layout, narrow left vertical inset, horizontal lower seam, angled notch around the handle area, grooves, moldings, frame profiles, thresholds, handle, lock, hardware positions and shapes, pure white background, lighting direction, contact shadows, and photographic realism. Change only the wood color/finish. No post-generation crop or resize, no rotation, perspective shift, added object, removed object, redesign, or stylization.
NO_LOGO: Absolutely no text, letters, numbers, words, logos, brand marks, watermarks, signatures, labels, stickers, emblems, QR codes, barcodes, captions, UI, microtext, tiny glyphs, or pseudo-writing anywhere.
AVOID_LINE
```

### Template 3 substitutions

Negro attempt 2 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to a refined deep matte BLACK (negro) wood finish, near-black neutral charcoal with clearly retained subtle vertical wood grain and readable edge detail.
AVOID_LINE = Avoid: wide margins, featureless pure black, crushed shadows, glossy lacquer, metallic finish, color casts, invented decorative marks, extra hardware.
```

Wengue attempt 2 — PASS:

```text
PRIMARY_REQUEST_LINE = Primary request: Change only the visible wood finish of the door leaf and its matching wooden frame/trim to WENGUÉ: a very dark espresso-brown tropical wood finish, rich brown-black rather than neutral black, with restrained warm undertones and clearly retained fine vertical wood grain.
AVOID_LINE = Avoid: wide margins, neutral black, red mahogany, orange cast, flat paint, glossy lacquer, metallic finish, invented decorative marks, extra hardware.
```

## Rejection measurements

- Negro attempt 1: `975x1614`, ratio `0.604089219`, deviation `58.7765%`; foreground margins `[left 110, top 0, right 111, bottom 0]`. Rejected for wide canvas and clearly notable horizontal padding.
- Wengue attempt 1: `907x1735`, ratio `0.522766571`, deviation `37.4020%`; foreground margins `[left 65, top 0, right 61, bottom 0]`. Rejected for wide canvas and notable horizontal padding.
- Both rejected PNGs remain unmodified under `_rejected/` and retain their original generator hashes and C2PA/JUMBF provenance.

## Minimum-margin revision literal prompts

The following 17 blocks reproduce each `image_generation_end.revised_prompt` exactly; the surrounding metadata is documentation only.

## Minimum-margin revision exec-b8b83929-3f15-49e4-902d-52ccab6bbe52

- Finish/attempt: `blanco` / `1`
- Event UTC: `2026-08-29T15:19:06.050Z`
- Result: `REJECTED`
- Dimensions: `889×1768`
- RGB<245 margins: `[82,6,82,6]`
- SHA-256: `6e969726519f58afd672f729ec80bb32f957912fa23576aa23bd702023ba8bfc`
- Workspace: `_rejected/blanco-minimum-margin-revision-attempt-1-aspect-and-padding.png`
- Reason: Canvas 32.16% wider than canonical and 82 px side margins.

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never use any generated image as a reference. Direct ImageGen only; no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Preserve the exact wl-5109 construction and proportions: straight-on ultra-tall narrow single door; complete layered rectangular frame with both full-height outer jambs, intact top header, slim inner recess and far-left reveal. Preserve the leaf's distinctive exact seam geometry: one upper vertical seam near 28% of leaf width running from the inner top down to about 65% height; at its lower endpoint one horizontal seam continues right to the inner frame, while one short diagonal segment slopes down-left to an offset lower vertical seam; that lower vertical seam continues to the bottom; one short horizontal seam runs left from the diagonal's lower endpoint to the inner frame. Preserve this single clean stepped/chamfered junction exactly—no extra seams, grooves, panels, curves or diagonals. Preserve exactly one horizontal lever on one round rosette and one separate round key escutcheon directly below it, both in the small left field beside the junction. No window and no extra hardware.

CANVAS AND SCALE ARE STRICT: retain the canonical 409:1075 ultra-tall ratio, width/height = 0.3805, on an approximately 774×2035 bitmap. Never output 1:2, 9:16, 887×1772 or width/height above 0.39. Keep the entire slender assembly intact and enlarge it within the canvas so the nearest non-white outer silhouette is only 4–8 physical pixels from left, top and right and 0–6 pixels from the bottom; absolute maximum 12 px on every side. Do not crop or damage any outer corner, header edge, reveal, jamb or bottom endpoint. Pure white seamless background only; no white mat, broad padding, border, room, wall, floor, scenery or surrounding shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.

Finish: BLANCO — clean warm white with subtle believable wood grain and crisp readable grooves. Apply the named finish coherently to the complete frame and leaf, while retaining natural material realism and the exact construction.
```

## Minimum-margin revision exec-3f4e9245-acd2-49db-874d-055d03fccb60

- Finish/attempt: `gris-claro` / `1`
- Event UTC: `2026-08-29T15:19:27.842Z`
- Result: `REJECTED`
- Dimensions: `773×2033`
- RGB<245 margins: `[18,14,21,16]`
- SHA-256: `ab6afb5152daf2ca158a557b5f909ee5cbc16c8c56970f9026575dc0f439bf9d`
- Workspace: `_rejected/gris-claro-minimum-margin-revision-attempt-1-padding.png`
- Reason: Correct ratio, but RGB<245 margins [18,14,21,16] exceed 12 px.

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never use any generated image as a reference. Direct ImageGen only; no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Preserve the exact wl-5109 construction and proportions: straight-on ultra-tall narrow single door; complete layered rectangular frame with both full-height outer jambs, intact top header, slim inner recess and far-left reveal. Preserve the leaf's distinctive exact seam geometry: one upper vertical seam near 28% of leaf width running from the inner top down to about 65% height; at its lower endpoint one horizontal seam continues right to the inner frame, while one short diagonal segment slopes down-left to an offset lower vertical seam; that lower vertical seam continues to the bottom; one short horizontal seam runs left from the diagonal's lower endpoint to the inner frame. Preserve this single clean stepped/chamfered junction exactly—no extra seams, grooves, panels, curves or diagonals. Preserve exactly one horizontal lever on one round rosette and one separate round key escutcheon directly below it, both in the small left field beside the junction. No window and no extra hardware.

CANVAS AND SCALE ARE STRICT: retain the canonical 409:1075 ultra-tall ratio, width/height = 0.3805, on an approximately 774×2035 bitmap. Never output 1:2, 9:16, 887×1772 or width/height above 0.39. Keep the entire slender assembly intact and enlarge it within the canvas so the nearest non-white outer silhouette is only 4–8 physical pixels from left, top and right and 0–6 pixels from the bottom; absolute maximum 12 px on every side. Do not crop or damage any outer corner, header edge, reveal, jamb or bottom endpoint. Pure white seamless background only; no white mat, broad padding, border, room, wall, floor, scenery or surrounding shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.

Finish: GRIS CLARO — refined light gray with restrained vertical wood grain and crisp readable grooves. Apply the named finish coherently to the complete frame and leaf, while retaining natural material realism and the exact construction.
```

## Minimum-margin revision exec-99d7882f-e738-42a9-a106-3af653fc26f7

- Finish/attempt: `gris-oscuro` / `1`
- Event UTC: `2026-08-29T15:19:47.772Z`
- Result: `REJECTED`
- Dimensions: `890×1767`
- RGB<245 margins: `[84,10,88,5]`
- SHA-256: `c842c24b18b6f29a1220aef9b54b7baa1eb39ed14e4d8095272bd08190247909`
- Workspace: `_rejected/gris-oscuro-minimum-margin-revision-attempt-1-aspect-and-padding.png`
- Reason: Canvas 32.38% wider than canonical and broad side padding.

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never use any generated image as a reference. Direct ImageGen only; no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Preserve the exact wl-5109 construction and proportions: straight-on ultra-tall narrow single door; complete layered rectangular frame with both full-height outer jambs, intact top header, slim inner recess and far-left reveal. Preserve the leaf's distinctive exact seam geometry: one upper vertical seam near 28% of leaf width running from the inner top down to about 65% height; at its lower endpoint one horizontal seam continues right to the inner frame, while one short diagonal segment slopes down-left to an offset lower vertical seam; that lower vertical seam continues to the bottom; one short horizontal seam runs left from the diagonal's lower endpoint to the inner frame. Preserve this single clean stepped/chamfered junction exactly—no extra seams, grooves, panels, curves or diagonals. Preserve exactly one horizontal lever on one round rosette and one separate round key escutcheon directly below it, both in the small left field beside the junction. No window and no extra hardware.

CANVAS AND SCALE ARE STRICT: retain the canonical 409:1075 ultra-tall ratio, width/height = 0.3805, on an approximately 774×2035 bitmap. Never output 1:2, 9:16, 887×1772 or width/height above 0.39. Keep the entire slender assembly intact and enlarge it within the canvas so the nearest non-white outer silhouette is only 4–8 physical pixels from left, top and right and 0–6 pixels from the bottom; absolute maximum 12 px on every side. Do not crop or damage any outer corner, header edge, reveal, jamb or bottom endpoint. Pure white seamless background only; no white mat, broad padding, border, room, wall, floor, scenery or surrounding shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.

Finish: GRIS OSCURO — deep dark gray with restrained vertical wood grain and crisp readable grooves. Apply the named finish coherently to the complete frame and leaf, while retaining natural material realism and the exact construction.
```

## Minimum-margin revision exec-c8dbe3d8-5fa5-4244-bf4a-1ca0ed5aa7a0

- Finish/attempt: `natural` / `1`
- Event UTC: `2026-08-29T15:20:20.448Z`
- Result: `REJECTED`
- Dimensions: `890×1767`
- RGB<245 margins: `[41,16,53,13]`
- SHA-256: `1136c5e10d73a37ce531b5a7a87bd77e5f74816da692a50907f0d432d4bf1b6e`
- Workspace: `_rejected/natural-minimum-margin-revision-attempt-1-aspect-and-padding.png`
- Reason: Canvas 32.38% wider than canonical and broad padding.

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never use any generated image as a reference. Direct ImageGen only; no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Preserve the exact wl-5109 construction and proportions: straight-on ultra-tall narrow single door; complete layered rectangular frame with both full-height outer jambs, intact top header, slim inner recess and far-left reveal. Preserve the leaf's distinctive exact seam geometry: one upper vertical seam near 28% of leaf width running from the inner top down to about 65% height; at its lower endpoint one horizontal seam continues right to the inner frame, while one short diagonal segment slopes down-left to an offset lower vertical seam; that lower vertical seam continues to the bottom; one short horizontal seam runs left from the diagonal's lower endpoint to the inner frame. Preserve this single clean stepped/chamfered junction exactly—no extra seams, grooves, panels, curves or diagonals. Preserve exactly one horizontal lever on one round rosette and one separate round key escutcheon directly below it, both in the small left field beside the junction. No window and no extra hardware.

CANVAS AND SCALE ARE STRICT: retain the canonical 409:1075 ultra-tall ratio, width/height = 0.3805, on an approximately 774×2035 bitmap. Never output 1:2, 9:16, 887×1772 or width/height above 0.39. Keep the entire slender assembly intact and enlarge it within the canvas so the nearest non-white outer silhouette is only 4–8 physical pixels from left, top and right and 0–6 pixels from the bottom; absolute maximum 12 px on every side. Do not crop or damage any outer corner, header edge, reveal, jamb or bottom endpoint. Pure white seamless background only; no white mat, broad padding, border, room, wall, floor, scenery or surrounding shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.

Finish: NATURAL — pale natural honey wood with restrained authentic vertical grain and crisp readable grooves. Apply the named finish coherently to the complete frame and leaf, while retaining natural material realism and the exact construction.
```

## Minimum-margin revision exec-861b1617-bdbb-4684-b5ee-44d445062009

- Finish/attempt: `blanco` / `2`
- Event UTC: `2026-08-29T15:21:14.387Z`
- Result: `REJECTED`
- Dimensions: `891×1766`
- RGB<245 margins: `[36,15,30,7]`
- SHA-256: `71d441f29b3ddacae12e54742f437c515d2322b935499387ee30c9701a805dc1`
- Workspace: `_rejected/blanco-minimum-margin-revision-attempt-2-aspect-and-padding.png`
- Reason: Canvas 32.61% wider than canonical and broad padding.

```text
Regenerate one new photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never reference a generated image. ImageGen only: no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

CANVAS RATIO OVERRIDES EVERY OTHER COMPOSITION CHOICE: output the canonical 409:1075 ultra-tall ratio, width/height = 0.3805, approximately 773×2032. NEVER output 889×1768, 890×1767, 1:2, 9:16 or any width/height above 0.39. The door must remain extremely tall and slender.

Preserve exact wl-5109 identity: straight-on single door; complete layered frame with both full-height outer jambs, complete top header, slim inner recess and far-left reveal. Preserve the exact stepped seam junction: one upper vertical seam near 28% leaf width from the inner top to about 65% height; one horizontal seam continues right from that endpoint; one short diagonal slopes down-left to an offset lower vertical seam continuing to the bottom; one short horizontal seam continues left from the diagonal's lower endpoint. Exactly these five seam segments, no extra seam, panel, groove, diagonal or curve. Preserve exactly one horizontal lever on one round rosette plus one separate round key escutcheon below in the small left field. No window or extra hardware. No Wonly logo, logo, text, badge, emblem, watermark or pseudotext.

Fit the entire intact assembly large in that exact ultra-tall canvas. Move and scale the complete object so its non-white silhouette is only 4–8 physical pixels from left, top and right and 0–6 px from bottom; absolute maximum 12 on every side. Do not crop: all outer corners, header edges, reveal, jambs and both bottom endpoints stay fully recognizable. White seamless background only. No broad padding, white mat, border, wall, floor, room, scenery or surrounding shadow field.

Apply a BLANCO finish — clean warm white with subtle believable vertical wood grain — coherently to the complete frame and leaf. Keep grooves crisp and material realism restrained.
```

## Minimum-margin revision exec-b1cab9f8-f395-426d-8939-8a26f5d5a30a

- Finish/attempt: `gris-claro` / `2`
- Event UTC: `2026-08-29T15:21:30.519Z`
- Result: `REJECTED`
- Dimensions: `774×2031`
- RGB<245 margins: `[14,9,16,10]`
- SHA-256: `83b9957bbd0175dacf076e8ef965513b9b2bc4b8103c0f6ff1c4afc0ba57470f`
- Workspace: `_rejected/gris-claro-minimum-margin-revision-attempt-2-padding.png`
- Reason: Correct ratio, but RGB<245 margins [14,9,16,10] exceed 12 px.

```text
Regenerate one new photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never reference a generated image. ImageGen only: no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

CANVAS RATIO OVERRIDES EVERY OTHER COMPOSITION CHOICE: output the canonical 409:1075 ultra-tall ratio, width/height = 0.3805, approximately 773×2032. NEVER output 889×1768, 890×1767, 1:2, 9:16 or any width/height above 0.39. The door must remain extremely tall and slender.

Preserve exact wl-5109 identity: straight-on single door; complete layered frame with both full-height outer jambs, complete top header, slim inner recess and far-left reveal. Preserve the exact stepped seam junction: one upper vertical seam near 28% leaf width from the inner top to about 65% height; one horizontal seam continues right from that endpoint; one short diagonal slopes down-left to an offset lower vertical seam continuing to the bottom; one short horizontal seam continues left from the diagonal's lower endpoint. Exactly these five seam segments, no extra seam, panel, groove, diagonal or curve. Preserve exactly one horizontal lever on one round rosette plus one separate round key escutcheon below in the small left field. No window or extra hardware. No Wonly logo, logo, text, badge, emblem, watermark or pseudotext.

Fit the entire intact assembly large in that exact ultra-tall canvas. Move and scale the complete object so its non-white silhouette is only 4–8 physical pixels from left, top and right and 0–6 px from bottom; absolute maximum 12 on every side. Do not crop: all outer corners, header edges, reveal, jambs and both bottom endpoints stay fully recognizable. White seamless background only. No broad padding, white mat, border, wall, floor, room, scenery or surrounding shadow field.

Apply a GRIS CLARO finish — refined light gray with restrained vertical wood grain — coherently to the complete frame and leaf. Keep grooves crisp and material realism restrained.
```

## Minimum-margin revision exec-e54359ba-b3c3-4d68-8da5-ceb916bbc6bb

- Finish/attempt: `gris-oscuro` / `2`
- Event UTC: `2026-08-29T15:21:47.869Z`
- Result: `ACCEPTED`
- Dimensions: `774×2033`
- RGB<245 margins: `[9,9,9,5]`
- SHA-256: `ab057256bdfd1e7aaf9fb5f8cd87b095578823e1fbba0fb8ec268bfde048d536`
- Workspace: `gris-oscuro.png`
- Reason: Native QA PASS; correct ratio, complete silhouette and all margins <=12 px.

```text
Regenerate one new photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never reference a generated image. ImageGen only: no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

CANVAS RATIO OVERRIDES EVERY OTHER COMPOSITION CHOICE: output the canonical 409:1075 ultra-tall ratio, width/height = 0.3805, approximately 773×2032. NEVER output 889×1768, 890×1767, 1:2, 9:16 or any width/height above 0.39. The door must remain extremely tall and slender.

Preserve exact wl-5109 identity: straight-on single door; complete layered frame with both full-height outer jambs, complete top header, slim inner recess and far-left reveal. Preserve the exact stepped seam junction: one upper vertical seam near 28% leaf width from the inner top to about 65% height; one horizontal seam continues right from that endpoint; one short diagonal slopes down-left to an offset lower vertical seam continuing to the bottom; one short horizontal seam continues left from the diagonal's lower endpoint. Exactly these five seam segments, no extra seam, panel, groove, diagonal or curve. Preserve exactly one horizontal lever on one round rosette plus one separate round key escutcheon below in the small left field. No window or extra hardware. No Wonly logo, logo, text, badge, emblem, watermark or pseudotext.

Fit the entire intact assembly large in that exact ultra-tall canvas. Move and scale the complete object so its non-white silhouette is only 4–8 physical pixels from left, top and right and 0–6 px from bottom; absolute maximum 12 on every side. Do not crop: all outer corners, header edges, reveal, jambs and both bottom endpoints stay fully recognizable. White seamless background only. No broad padding, white mat, border, wall, floor, room, scenery or surrounding shadow field.

Apply a GRIS OSCURO finish — deep dark gray with restrained vertical wood grain — coherently to the complete frame and leaf. Keep grooves crisp and material realism restrained.
```

## Minimum-margin revision exec-20d2cfe1-2969-4cad-845f-6684719eb851

- Finish/attempt: `natural` / `2`
- Event UTC: `2026-08-29T15:22:06.579Z`
- Result: `REJECTED`
- Dimensions: `773×2033`
- RGB<245 margins: `[18,16,18,14]`
- SHA-256: `4846b5849ae042ce6ed19da2b90b62ee33bd13cf2438e4faee0c79d9ee64ccbd`
- Workspace: `_rejected/natural-minimum-margin-revision-attempt-2-padding.png`
- Reason: Correct ratio, but RGB<245 margins [18,16,18,14] exceed 12 px.

```text
Regenerate one new photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never reference a generated image. ImageGen only: no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

CANVAS RATIO OVERRIDES EVERY OTHER COMPOSITION CHOICE: output the canonical 409:1075 ultra-tall ratio, width/height = 0.3805, approximately 773×2032. NEVER output 889×1768, 890×1767, 1:2, 9:16 or any width/height above 0.39. The door must remain extremely tall and slender.

Preserve exact wl-5109 identity: straight-on single door; complete layered frame with both full-height outer jambs, complete top header, slim inner recess and far-left reveal. Preserve the exact stepped seam junction: one upper vertical seam near 28% leaf width from the inner top to about 65% height; one horizontal seam continues right from that endpoint; one short diagonal slopes down-left to an offset lower vertical seam continuing to the bottom; one short horizontal seam continues left from the diagonal's lower endpoint. Exactly these five seam segments, no extra seam, panel, groove, diagonal or curve. Preserve exactly one horizontal lever on one round rosette plus one separate round key escutcheon below in the small left field. No window or extra hardware. No Wonly logo, logo, text, badge, emblem, watermark or pseudotext.

Fit the entire intact assembly large in that exact ultra-tall canvas. Move and scale the complete object so its non-white silhouette is only 4–8 physical pixels from left, top and right and 0–6 px from bottom; absolute maximum 12 on every side. Do not crop: all outer corners, header edges, reveal, jambs and both bottom endpoints stay fully recognizable. White seamless background only. No broad padding, white mat, border, wall, floor, room, scenery or surrounding shadow field.

Apply a NATURAL finish — pale natural honey wood with restrained authentic vertical grain — coherently to the complete frame and leaf. Keep grooves crisp and material realism restrained.
```

## Minimum-margin revision exec-c2b2f3fa-9646-4d2c-9b18-2bcbe7215941

- Finish/attempt: `blanco` / `3`
- Event UTC: `2026-08-29T15:23:01.259Z`
- Result: `REJECTED`
- Dimensions: `774×2032`
- RGB<245 margins: `[10,6,16,4]`
- SHA-256: `13a8e9debbd558992d5293401eec0e658984e240637005ed85603967e30f6eac`
- Workspace: `_rejected/blanco-minimum-margin-revision-attempt-3-padding.png`
- Reason: Correct ratio, but right RGB<245 margin is 16 px.

```text
Create a fresh AI-generated photorealistic studio product image using ONLY the supplied canonical wl-5109 original. Do not use any generated output as reference. No filters, scripts, recoloring, cropping, resizing, masking, compositing, conversion, upscaling or post-processing.

MANDATORY PORTRAIT SHAPE: exactly follow the original 409×1075 proportions (width/height 0.3805), equivalent to about 774×2034. The image must be much taller than twice its width. Reject any 1:2-like or 890×1767-like wide canvas. Preserve the complete ultra-tall narrow assembly.

Preserve exact construction: full left and right outer jambs, full top header, inner recess and far-left reveal; one upper vertical seam at about 28% leaf width; at about 65% height it joins one horizontal seam to the right and one short diagonal descending left; the diagonal ends at an offset lower vertical seam continuing to the bottom and a short horizontal seam continuing left. Exactly this stepped five-segment junction. Exactly one horizontal lever on one round rosette and one separate round key escutcheon below in the small left field. No added/removed seam, panel, groove, diagonal, curve, window or hardware. No Wonly logo, logo, text, badge, emblem, watermark or pseudotext.

ENLARGE WITHOUT CROPPING: position the intact outer silhouette extremely close to the canvas, ideally touching at one harmless point. Leave 0–6 physical white pixels on left, top, right and bottom, never more than 10. All four outer corners, top header edges, reveal, both jambs and both bottom endpoints must remain fully visible and undamaged. Pure white background only; no mat, padding, border, room, wall, floor, scenery or broad shadow field.

Render the complete frame and leaf coherently in BLANCO: warm architectural white, with subtle visible vertical grain and clearly defined frame edges. Keep seam readability and realistic material definition.
```

## Minimum-margin revision exec-baf8c92e-961d-42b7-91cc-b2f30da65814

- Finish/attempt: `gris-claro` / `3`
- Event UTC: `2026-08-29T15:23:24.894Z`
- Result: `ACCEPTED`
- Dimensions: `773×2033`
- RGB<245 margins: `[11,9,11,9]`
- SHA-256: `711479a6d2e2b763c4e5948c3f7fb3e00087fed9e2b29a7bb319880507252e79`
- Workspace: `gris-claro.png`
- Reason: Native QA PASS; correct ratio, complete silhouette and all margins <=12 px.

```text
Create a fresh AI-generated photorealistic studio product image using ONLY the supplied canonical wl-5109 original. Do not use any generated output as reference. No filters, scripts, recoloring, cropping, resizing, masking, compositing, conversion, upscaling or post-processing.

MANDATORY PORTRAIT SHAPE: exactly follow the original 409×1075 proportions (width/height 0.3805), equivalent to about 774×2034. The image must be much taller than twice its width. Reject any 1:2-like or 890×1767-like wide canvas. Preserve the complete ultra-tall narrow assembly.

Preserve exact construction: full left and right outer jambs, full top header, inner recess and far-left reveal; one upper vertical seam at about 28% leaf width; at about 65% height it joins one horizontal seam to the right and one short diagonal descending left; the diagonal ends at an offset lower vertical seam continuing to the bottom and a short horizontal seam continuing left. Exactly this stepped five-segment junction. Exactly one horizontal lever on one round rosette and one separate round key escutcheon below in the small left field. No added/removed seam, panel, groove, diagonal, curve, window or hardware. No Wonly logo, logo, text, badge, emblem, watermark or pseudotext.

ENLARGE WITHOUT CROPPING: position the intact outer silhouette extremely close to the canvas, ideally touching at one harmless point. Leave 0–6 physical white pixels on left, top, right and bottom, never more than 10. All four outer corners, top header edges, reveal, both jambs and both bottom endpoints must remain fully visible and undamaged. Pure white background only; no mat, padding, border, room, wall, floor, scenery or broad shadow field.

Render the complete frame and leaf coherently in GRIS CLARO: refined light gray with restrained visible vertical grain. Keep seam readability and realistic material definition.
```

## Minimum-margin revision exec-81025393-7ae0-41d0-b0aa-6b68797a57ab

- Finish/attempt: `natural` / `3`
- Event UTC: `2026-08-29T15:23:43.033Z`
- Result: `ACCEPTED`
- Dimensions: `774×2033`
- RGB<245 margins: `[10,7,10,4]`
- SHA-256: `d06069262b56216fde0bf97464b82d26350f7325567026824be49e784f5ddc97`
- Workspace: `natural.png`
- Reason: Native QA PASS; correct ratio, complete silhouette and all margins <=12 px.

```text
Create a fresh AI-generated photorealistic studio product image using ONLY the supplied canonical wl-5109 original. Do not use any generated output as reference. No filters, scripts, recoloring, cropping, resizing, masking, compositing, conversion, upscaling or post-processing.

MANDATORY PORTRAIT SHAPE: exactly follow the original 409×1075 proportions (width/height 0.3805), equivalent to about 774×2034. The image must be much taller than twice its width. Reject any 1:2-like or 890×1767-like wide canvas. Preserve the complete ultra-tall narrow assembly.

Preserve exact construction: full left and right outer jambs, full top header, inner recess and far-left reveal; one upper vertical seam at about 28% leaf width; at about 65% height it joins one horizontal seam to the right and one short diagonal descending left; the diagonal ends at an offset lower vertical seam continuing to the bottom and a short horizontal seam continuing left. Exactly this stepped five-segment junction. Exactly one horizontal lever on one round rosette and one separate round key escutcheon below in the small left field. No added/removed seam, panel, groove, diagonal, curve, window or hardware. No Wonly logo, logo, text, badge, emblem, watermark or pseudotext.

ENLARGE WITHOUT CROPPING: position the intact outer silhouette extremely close to the canvas, ideally touching at one harmless point. Leave 0–6 physical white pixels on left, top, right and bottom, never more than 10. All four outer corners, top header edges, reveal, both jambs and both bottom endpoints must remain fully visible and undamaged. Pure white background only; no mat, padding, border, room, wall, floor, scenery or broad shadow field.

Render the complete frame and leaf coherently in NATURAL: pale natural honey oak with restrained authentic vertical grain. Keep seam readability and realistic material definition.
```

## Minimum-margin revision exec-717f33e6-a460-4963-bdce-99c9c1429605

- Finish/attempt: `blanco` / `4`
- Event UTC: `2026-08-29T15:24:36.913Z`
- Result: `REJECTED`
- Dimensions: `887×1773`
- RGB<245 margins: `[75,2,75,2]`
- SHA-256: `fdfed51b1e007ec8b91b3ef2e05049254bea56bf34728f27c65cab063872cb6d`
- Workspace: `_rejected/blanco-minimum-margin-revision-attempt-4-aspect-and-padding.png`
- Reason: Canvas 31.49% wider than canonical and 75 px side margins.

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-5109 original. Never use a generated image. ImageGen only—no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Render the entire frame and leaf in a subtly warm architectural BLANCO finish, visibly distinct from the pure-white background through believable off-white wood grain, crisp edges and restrained contact shadows. Preserve exact wl-5109 construction: straight-on ultra-tall narrow door; complete left/right jambs, complete header, inner recess and far-left reveal; upper vertical seam near 28% width; at ~65% height, one horizontal segment right and one short diagonal down-left; offset lower vertical segment to bottom plus short horizontal segment left. Exactly this five-segment stepped junction. Exactly one horizontal lever on a round rosette and one separate round key escutcheon below. No extra seam, panel, groove, diagonal, curve, window or hardware. No Wonly logo, logo, text, emblem, badge, watermark or pseudotext.

CANVAS IS MANDATORY: original 409:1075 ratio, width/height 0.3805, approximately 773×2033. Never output 1:2, 9:16, 889×1768 or any ratio above 0.39. Enlarge the complete intact assembly until the leftmost outer jamb is only 4–8 physical pixels from x=0 and the rightmost outer jamb is only 4–8 pixels from the right edge; top 4–8 px, bottom 0–6 px, absolute maximum 10 per side. Keep every corner, header edge, reveal, jamb and bottom endpoint fully visible. Pure white seamless background, but no white mat, padding, border, wall, room, floor, scenery or broad shadow field.
```

## Minimum-margin revision exec-aaf9ad03-d528-4421-b132-471d3351af0e

- Finish/attempt: `blanco` / `5`
- Event UTC: `2026-08-29T15:25:34.346Z`
- Result: `REJECTED`
- Dimensions: `890×1767`
- RGB<245 margins: `[38,15,44,2]`
- SHA-256: `ee333324f5d3704cc15cf92719848052f88b4c7b2adfee80a1fbc820fb44e10c`
- Workspace: `_rejected/blanco-minimum-margin-revision-attempt-5-aspect-and-padding.png`
- Reason: Canvas 32.38% wider than canonical and broad padding.

```text
Edit ONLY the supplied canonical wl-5109 original into a new AI-generated photorealistic product image. Use that original as the sole reference. No filter, script, recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Change the complete frame and leaf to subtly warm BLANCO wood, clearly distinguishable from the pure-white background. Preserve every construction detail exactly: complete jambs/header/reveal; the upper vertical seam, right horizontal seam, short down-left diagonal, offset lower vertical seam and short left horizontal seam; one lever on one round rosette and one round key escutcheon below; no extra geometry or hardware; no Wonly mark, logo, text or watermark.

Use the SAME extremely narrow 409:1075 aspect ratio as the source, approximately 774×2033, width/height 0.3805. This is mandatory; never use a wider portrait ratio. Enlarge the entire intact assembly laterally until both outer jambs reach within 0–6 pixels of the left and right canvas edges, with top 0–6 and bottom 0–4 pixels. Maximum 10 pixels per side. All corners and endpoints stay fully visible. Pure-white background only, no surrounding mat, padding, room, wall, floor or scenery.
```

## Minimum-margin revision exec-cde7a31d-371b-4c6c-8e95-e749fd3f539f

- Finish/attempt: `blanco` / `6`
- Event UTC: `2026-08-29T15:25:50.720Z`
- Result: `REJECTED`
- Dimensions: `774×2032`
- RGB<245 margins: `[16,6,18,7]`
- SHA-256: `77d1c7cf135bc2a97bc5e55c30cc034adbea309260ecd0e4deac639f74e06354`
- Workspace: `_rejected/blanco-minimum-margin-revision-attempt-6-padding.png`
- Reason: Correct ratio, but RGB<245 margins [16,6,18,7] exceed 12 px.

```text
Generate one fresh photorealistic studio image from ONLY the canonical wl-5109 original. Never reference any generated image. ImageGen alone; no filters, scripted recolor, crop, resize, mask, composite, conversion or post-processing.

Produce the exact same ultra-tall slender 409:1075 composition as the original (width/height 0.3805; about 773×2033), not a conventional portrait. The complete door assembly must span essentially the full canvas width: left outer jamb 0–6 physical pixels from x=0, right outer jamb 0–6 pixels from x=width-1, intact header 0–6 pixels from top, bottom tips 0–4 pixels from bottom. Never exceed 10 pixels of white per side and never crop the silhouette.

Render complete frame and leaf in warm architectural BLANCO with subtle visible grain against pure-white background. Preserve exact stepped seam geometry: upper vertical to the junction, right horizontal, one short diagonal down-left, offset lower vertical to bottom, short left horizontal; complete frame/reveal; exactly one lever/round rosette and one round key escutcheon below. No extra panels, seams, window, hardware, Wonly logo, other logo, letters, text, badge or watermark. No mat, border, wall, floor, room or scenery.
```

## Minimum-margin revision exec-43eef4aa-22eb-450a-8663-27b13f22a3db

- Finish/attempt: `blanco` / `7`
- Event UTC: `2026-08-29T15:26:53.593Z`
- Result: `SUPERSEDED`
- Dimensions: `773×2035`
- RGB<245 margins: `[10,5,11,8]`
- SHA-256: `e664bd21086b5c448296bd46ef721e6dc826b5409f4fa7fd6bcc055b71f51afd`
- Workspace: `_rejected/blanco-minimum-margin-revision-attempt-7-superseded.png`
- Reason: Native QA eligible, then superseded by attempt 8 with lower aggregate exterior padding.

```text
Regenerate one AI-created photorealistic product image from ONLY the canonical wl-5109 original. No generated reference and no filter, script, crop, resize, mask, composite, conversion or post-processing. Preserve exact door/frame/seam-junction/hardware geometry. Finish the complete frame and leaf in refined IVORY-WHITE wood: visibly off-white enough that every outer jamb edge is clearly detectable against a pure-white background, yet unmistakably a white finish. No Wonly/logo/text/watermark.

Use the original exact narrow 409:1075 ratio (0.3805), about 774×2033. The intact door must fill the width: outer left jamb edge at x=2–6 and outer right jamb edge at x=width-3–7; top edge y=2–6; bottom endpoints 0–4 px from bottom. Never exceed 10 white pixels per side. Do not crop any corner, header, reveal, jamb or bottom tip. No room, wall, floor, border, mat or extra padding. Preserve exactly the five stepped seam segments and exactly one lever plus one round key escutcheon.
```

## Minimum-margin revision exec-16b45ae4-0f89-4861-a71e-883302c0cac3

- Finish/attempt: `blanco` / `8`
- Event UTC: `2026-08-29T15:27:12.525Z`
- Result: `ACCEPTED`
- Dimensions: `774×2033`
- RGB<245 margins: `[11,3,8,4]`
- SHA-256: `fdc7e9ad5ff9d12952149a596c354e0b6478ca84bdc1e702336ab08833790421`
- Workspace: `blanco.png`
- Reason: Native QA PASS; correct ratio, complete readable white silhouette and all margins <=12 px; lowest aggregate padding among eligible white attempts.

```text
Generate one new AI-only product image based solely on the canonical wl-5109 original. Preserve the entire slender door assembly and exact five-part stepped seam junction, complete outer frame/reveal, one lever/round rosette and one separate round key escutcheon. No other panel, groove, hardware, logo, Wonly mark, text or watermark. Apply a softly warm WHITE-OAK paint finish, almost white but with enough pale beige-gray grain to separate the silhouette from a pure-white background.

Output must match the source's ultra-narrow 409:1075 proportions, width/height 0.3805 (around 774×2034), never conventional portrait. The intact outer jambs should almost touch both side edges: 0–5 physical white pixels at left and right; intact header 0–5 top; intact bottom tips 0–3 bottom. No crop, no white mat/padding, room, wall, floor or scenery. ImageGen only; no filter, scripted recolor, crop, resize, mask, composite, conversion, upscale or post-processing.
```

## Minimum-margin revision exec-7dcfaadf-8a94-4c0f-a815-6f294b876e83

- Finish/attempt: `blanco` / `9`
- Event UTC: `2026-08-29T15:27:34.734Z`
- Result: `SUPERSEDED`
- Dimensions: `774×2033`
- RGB<245 margins: `[10,7,11,4]`
- SHA-256: `f018cb55e31305d42eac076f883019f3e614f935246e8e3bb24a50ae0a4832f2`
- Workspace: `_rejected/blanco-minimum-margin-revision-attempt-9-superseded.png`
- Reason: Native QA eligible, but selected attempt 8 retains lower aggregate exterior padding.

```text
Create a fresh photorealistic studio rendering from ONLY the supplied canonical wl-5109 original, with direct ImageGen and zero pixel post-processing. Render all wood surfaces in warm architectural WHITE with subtle cream-gray grain and visible outer contours against a pure-white canvas. Keep the exact complete frame, the original stepped upper-vertical/right-horizontal/short-diagonal/lower-vertical/short-left-horizontal seam geometry, and the original lever plus separate circular key escutcheon. No additions, logo, Wonly mark, letters or watermark.

MANDATORY canvas shape is 409:1075 (width/height 0.3805), approximately 773×2033, much taller than twice its width. Make the complete object occupy at least 98.5% of canvas width and 99.4% of height, without cropping: leave only 2–6 pixels white left/right/top and 0–4 bottom, absolute maximum 10. Every endpoint and outer corner remains visible. No broad white space, mat, wall, floor, room or scenery.
```
