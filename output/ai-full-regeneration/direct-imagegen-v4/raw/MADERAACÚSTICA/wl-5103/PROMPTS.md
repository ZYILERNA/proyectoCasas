# ImageGen prompt log — MADERAACÚSTICA / wl-5103

- Mode: built-in ImageGen.
- Use case: precise-object-edit.
- Sole reference in every call: `public/images/PUERTAS/MADERAACÚSTICA/wl-5103/original.webp`.
- Reference SHA-256: `dccf4789efad462735216458eb9d197eda9d1fab8c728eb29aa32a1e92e68d1c`.
- Policy: `NO_LOGO`.
- Every call was independent. No generated output was supplied as a reference.
- No postprocessing was performed. Workspace PNGs are byte-identical copies of the ImageGen artifacts.

## Provenance

| Finish | Attempt | Result | Generator ID | UTC | Workspace file |
|---|---:|---|---|---|---|
| negro | 1 | PASS | `exec-cd15a445-0fa5-4d05-bcd2-107ac0423e9a` | 2026-08-28T14:01:35.448Z | `negro.png` |
| wengue | 1 | PASS | `exec-dd9ae1e0-f15c-4dfd-8178-d66f28f3c6e9` | 2026-08-28T14:02:12.395Z | `wengue.png` |
| gris-oscuro | 1 | PASS | `exec-36278c4d-b844-4614-bb84-0e26927ad6d7` | 2026-08-28T14:02:49.183Z | `gris-oscuro.png` |
| antracita | 1 | PASS | `exec-8ebfccbe-0914-48af-a14f-ac0b8607addf` | 2026-08-28T14:03:23.474Z | `antracita.png` |
| nogal | 1 | PASS | `exec-89308a64-1b9a-4345-b703-962ffb241355` | 2026-08-28T14:04:29.879Z | `nogal.png` |
| roble | 1 | PASS | `exec-f1096583-3806-4359-af50-8e349ded9b0e` | 2026-08-28T14:05:07.504Z | `roble.png` |
| gris-claro | 1 | PASS | `exec-470d3df9-bb21-4496-bdb4-02ab4d8c1223` | 2026-08-28T14:05:41.113Z | `gris-claro.png` |
| natural | 1 | PASS | `exec-f9e4a904-af76-4f1a-993a-ab9d2eb2ceff` | 2026-08-28T14:06:19.967Z | `natural.png` |
| blanco | 1 | REJECT — aspect ratio | `exec-75165ff8-aba9-48bc-911d-7168c35e541f` | 2026-08-28T14:07:01.695Z | `_rejected/blanco-attempt-1.png` |
| blanco | 2 | PASS | `exec-bc8e8dcc-4467-4eb3-b0c2-a49abaacc594` | 2026-08-28T14:08:31.755Z | `blanco.png` |

## Exact prompt composition for template-A calls

The calls for negro, wengue, gris-oscuro, antracita, nogal, roble and natural used the following exact template. Replace only `PRIMARY_REQUEST` with the verbatim value in the substitution list; no other text changes were made.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce product image for the wl-5103 acoustic wooden door
Input images: Image 1 is the sole edit target and sole reference; it is the canonical original.
PRIMARY_REQUEST
Architecture invariants: preserve the complete rectangular wooden outer frame with two full-height vertical jambs and the single top lintel, with no bottom threshold. Preserve one flat rectangular door leaf and exactly TWO thin straight decorative seams: exactly one full-height vertical seam near the right quarter of the leaf, and exactly one single horizontal seam across the leaf at the same low position below the hardware. They cross cleanly. Preserve their positions, thickness and proportions. Add no other grooves, panels, moldings, inserts or decoration.
Hardware invariants: preserve exactly one slim straight horizontal silver/dark-metal lever on one circular rosette on the left, plus exactly one separate circular key cylinder/escutcheon directly below. Preserve position, orientation, proportions and scale; no duplicate hardware.
Composition/framing: straight-on orthographic catalog view, same near-edge-to-edge crop as Image 1, complete top and both side jambs visible, door bottom visible. The entire output canvas must match the extremely tall narrow source aspect ratio, about 0.37674 width/height (approximately 760 px wide by 2018 px high). Do not use a conventional 2:3 portrait; do not exceed 0.385 width/height. Plain white studio backdrop only in the same very narrow margins. No zoom-out, widening, squashing, cropping, rotation or perspective.
Constraints: change only the finish; preserve architecture, joinery, vertical grain direction, lighting direction and clean product-render character. NO_LOGO policy. Absolutely no logo, brand mark, badge, plaque, label, lettering, numbers, pseudo-text, watermark, signature or QR code. No added objects, wall, floor or room.
Avoid: wrong aspect ratio, missing or extra seams, altered seam positions, extra panels, missing frame, bottom threshold, cropped product, distorted handle or lock, decorative inlays, horizontal grain. Native ImageGen result only.
```

### Template-A substitutions

Negro:

```text
PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to NEGRO: neutral near-black wood with subtle realistic vertical grain. Keep restrained tonal separation so every frame step, seam and edge remains legible.
```

Wengue:

```text
PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to WENGUE: very dark espresso-brown wenge wood, unmistakably brown rather than black, with subtle realistic vertical grain. Keep restrained tonal separation so every frame step, seam and edge remains legible.
```

Gris oscuro:

```text
PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to GRIS OSCURO: dark neutral gray wood, clearly lighter than black and not blue, with subtle realistic vertical grain. Keep restrained tonal separation so every frame step, seam and edge remains legible.
```

Antracita:

```text
PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to ANTRACITA: deep cool graphite-charcoal wood, darker and cooler than neutral dark gray but still visibly lighter than pure black, with subtle realistic vertical grain. Keep restrained tonal separation so every frame step, seam and edge remains legible.
```

Nogal:

```text
PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to NOGAL: warm medium walnut brown with natural restrained walnut grain, darker and browner than oak but clearly lighter than wenge. Keep restrained tonal separation so every frame step, seam and edge remains legible.
```

Roble:

```text
PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to ROBLE: warm golden honey oak with subtle realistic vertical oak grain, clearly lighter and more golden than walnut and natural wood. Keep restrained tonal separation so every frame step, seam and edge remains legible.
```

Natural:

```text
PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to NATURAL: pale neutral unfinished-looking natural wood, light beige with subtle realistic vertical grain, less golden and less saturated than oak. Keep restrained tonal separation so every frame step, seam and edge remains legible.
```

## Gris claro — attempt 1 — PASS

```text
Use case: precise-object-edit
Asset type: canonical e-commerce product image for the wl-5103 acoustic wooden door
Input images: Image 1 is the sole edit target and sole reference; it is the canonical original.
Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to GRIS CLARO: light neutral gray wood, clearly gray rather than white, with subtle realistic vertical grain. Keep restrained tonal separation so every frame step, seam and edge remains legible against white.
Architecture invariants: preserve the complete rectangular wooden outer frame with two full-height vertical jambs and the single top lintel, with no bottom threshold. Preserve one flat rectangular door leaf and exactly TWO thin straight decorative seams: exactly one full-height vertical seam near the right quarter of the leaf, and exactly one single horizontal seam across the leaf at the same low position below the hardware. They cross cleanly. Preserve their positions, thickness and proportions. Add no other grooves, panels, moldings, inserts or decoration.
Hardware invariants: preserve exactly one slim straight horizontal silver/dark-metal lever on one circular rosette on the left, plus exactly one separate circular key cylinder/escutcheon directly below. Preserve position, orientation, proportions and scale; no duplicate hardware.
Composition/framing: straight-on orthographic catalog view, same near-edge-to-edge crop as Image 1, complete top and both side jambs visible, door bottom visible. The entire output canvas must match the extremely tall narrow source aspect ratio, about 0.37674 width/height (approximately 760 px wide by 2018 px high). Do not use a conventional 2:3 portrait; do not exceed 0.385 width/height. Plain white studio backdrop only in the same very narrow margins. No zoom-out, widening, squashing, cropping, rotation or perspective.
Constraints: change only the finish; preserve architecture, joinery, vertical grain direction, lighting direction and clean product-render character. NO_LOGO policy. Absolutely no logo, brand mark, badge, plaque, label, lettering, numbers, pseudo-text, watermark, signature or QR code. No added objects, wall, floor or room.
Avoid: wrong aspect ratio, missing or extra seams, altered seam positions, extra panels, missing frame, bottom threshold, cropped product, distorted handle or lock, decorative inlays, horizontal grain, overexposure that erases geometry. Native ImageGen result only.
```

## Blanco — attempt 1 — REJECT

```text
Use case: precise-object-edit
Asset type: canonical e-commerce product image for the wl-5103 acoustic wooden door
Input images: Image 1 is the sole edit target and sole reference; it is the canonical original.
Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to BLANCO: neutral white wood with subtle realistic vertical grain, neither cream nor gray. Use restrained shading so every frame step, the leaf, both seams and all edges remain clearly legible against the white backdrop.
Architecture invariants: preserve the complete rectangular wooden outer frame with two full-height vertical jambs and the single top lintel, with no bottom threshold. Preserve one flat rectangular door leaf and exactly TWO thin straight decorative seams: exactly one full-height vertical seam near the right quarter of the leaf, and exactly one single horizontal seam across the leaf at the same low position below the hardware. They cross cleanly. Preserve their positions, thickness and proportions. Add no other grooves, panels, moldings, inserts or decoration.
Hardware invariants: preserve exactly one slim straight horizontal silver/dark-metal lever on one circular rosette on the left, plus exactly one separate circular key cylinder/escutcheon directly below. Preserve position, orientation, proportions and scale; no duplicate hardware.
Composition/framing: straight-on orthographic catalog view, same near-edge-to-edge crop as Image 1, complete top and both side jambs visible, door bottom visible. The entire output canvas must match the extremely tall narrow source aspect ratio, about 0.37674 width/height (approximately 760 px wide by 2018 px high). Do not use a conventional 2:3 portrait; do not exceed 0.385 width/height. Plain white studio backdrop only in the same very narrow margins. No zoom-out, widening, squashing, cropping, rotation or perspective.
Constraints: change only the finish; preserve architecture, joinery, vertical grain direction, lighting direction and clean product-render character. NO_LOGO policy. Absolutely no logo, brand mark, badge, plaque, label, lettering, numbers, pseudo-text, watermark, signature or QR code. No added objects, wall, floor or room.
Avoid: wrong aspect ratio, missing or extra seams, altered seam positions, extra panels, missing frame, bottom threshold, cropped product, distorted handle or lock, decorative inlays, horizontal grain, cream cast, overexposure that erases geometry. Native ImageGen result only.
```

## Minimum-margin revision — 12 additional independent calls

These twelve prompts were recovered directly from the `image_generation_end` events' `payload.revised_prompt` fields in the originating session JSONL. The two repeated families below are recorded as exact templates plus exact finish substitutions, which is a lossless representation of the literal prompts; P3 is recorded in full. Every call referenced only the same canonical `original.webp` named above.

| Finish | Revision attempt | Result | Generator ID | UTC | Workspace file |
|---|---:|---|---|---|---|
| negro | 1 | REJECT — wide canvas | `exec-690d22c4-1871-4092-b6b9-69b7f1ec0a6c` | 2026-08-29T15:15:28.894Z | `_rejected/negro-minimum-margin-revision-attempt1-wide.png` |
| gris-oscuro | 1 | REJECT — wide canvas | `exec-ee11634d-1ecb-4552-b595-2e272842e673` | 2026-08-29T15:15:28.895Z | `_rejected/gris-oscuro-minimum-margin-revision-attempt1-wide.png` |
| antracita | 1 | REJECT — wide canvas | `exec-8d4c2ad6-04b4-42a2-947d-70697a179c2b` | 2026-08-29T15:15:28.897Z | `_rejected/antracita-minimum-margin-revision-attempt1-wide.png` |
| natural | 1 | REJECT — wide canvas | `exec-4dc17634-0919-4603-9535-4dd48dd4231e` | 2026-08-29T15:15:28.900Z | `_rejected/natural-minimum-margin-revision-attempt1-wide.png` |
| negro | 2 | REJECT — wide canvas | `exec-598e20ee-d294-42c6-b9bc-2c60bae758f3` | 2026-08-29T15:15:28.903Z | `_rejected/negro-minimum-margin-revision-attempt2-wide.png` |
| gris-oscuro | 2 | REJECT — top margin 14 | `exec-66975858-30da-49c6-baa7-e32711b5b97f` | 2026-08-29T15:15:28.905Z | `_rejected/gris-oscuro-minimum-margin-revision-attempt2-padding-over12.png` |
| antracita | 2 | PASS | `exec-4289c8b2-44e9-4e7c-9a8a-c726eac71308` | 2026-08-29T15:15:28.907Z | `antracita.png` |
| natural | 2 | REJECT — wide canvas | `exec-5d285a0a-0f16-4002-9205-cc0ddd9f3643` | 2026-08-29T15:15:28.910Z | `_rejected/natural-minimum-margin-revision-attempt2-wide.png` |
| negro | 3 | PASS | `exec-9b9f18ee-d768-499b-8631-2506ce52389b` | 2026-08-29T15:15:28.913Z | `negro.png` |
| gris-oscuro | 3 | REJECT — top 14/right 13 | `exec-e132ecc8-6cc1-4b10-8749-5c5d074a6ff3` | 2026-08-29T15:15:28.915Z | `_rejected/gris-oscuro-minimum-margin-revision-attempt3-padding-over12.png` |
| natural | 3 | PASS | `exec-31740e37-5370-4e11-be31-799f205a521d` | 2026-08-29T15:15:28.917Z | `natural.png` |
| gris-oscuro | 4 | PASS — contact | `exec-e390edda-3e60-410b-a97a-0087ffc28e16` | 2026-08-29T15:15:28.919Z | `gris-oscuro.png` |

### Revision template P1 — exact text

The first four revision calls used this exact text, replacing only `{{FINISH}}` with the exact block listed after it.

```text
Edit ONLY the supplied canonical wl-5103 original into one fresh photorealistic studio product image. Use the canonical original as the sole reference; never use a generated image. Direct ImageGen only — no filter, scripted recolor, crop, resize, mask, composite, conversion or post-processing.

Finish: {{FINISH}}. Apply the named finish coherently to the complete door assembly — layered frame and leaf — with restrained authentic vertical grain.

Preserve exact wl-5103 identity: straight-on ultra-tall narrow single door; complete layered rectangular frame with projecting full-height outer posts, complete top header and deep recessed far-left reveal; exactly ONE thin straight vertical groove from inner top to inner bottom near 72% of leaf width; exactly ONE thin straight horizontal groove across the leaf near 70% of total height, crossing the vertical at one clean right-angle intersection and making exactly four plain fields. Exactly one silver/dark horizontal lever on one round rosette on the left, above the horizontal groove, and exactly one separate round key escutcheon below the lever but also above the groove. No extra line, panel, groove, diagonal, curve, hardware or window.

STRICT SCALE: retain the source 405:1075 ultra-tall ratio (~0.3767) on a matching approximately 770×2045 canvas; never 1:2, 9:16 or wider. Scale the complete intact outer assembly to occupy at least 99% of the bitmap. Target fully-white margins [left,top,right,bottom]=[0,0,0,0], preferred 0–4 physical pixels and absolute maximum 12 px per side. Edge contact is allowed but every top corner, header edge, reveal, jamb and both bottom endpoints must remain recognizable and uncropped. No white mat, padding, border, wall, floor, room, scenery or broad shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.
```

Exact P1 substitutions:

- `exec-690d22c4-1871-4092-b6b9-69b7f1ec0a6c`: `NEGRO — refined deep black with restrained vertical grain and readable grooves`
- `exec-ee11634d-1ecb-4552-b595-2e272842e673`: `GRIS OSCURO — deep dark gray with restrained vertical grain`
- `exec-8d4c2ad6-04b4-42a2-947d-70697a179c2b`: `ANTRACITA — rich graphite charcoal with restrained vertical grain`
- `exec-4dc17634-0919-4603-9535-4dd48dd4231e`: `NATURAL — pale natural honey wood with restrained authentic vertical grain`

### Revision template P2 — exact text

The next seven revision calls used this exact text, replacing only `{{FINISH}}` with the exact block listed after it.

```text
Regenerate one new photorealistic studio product image from ONLY the supplied canonical wl-5103 original. Never reference a generated image. ImageGen only: no filter, scripted recolor, crop, resize, mask, composite, conversion or post-processing.

Apply {{FINISH}} coherently to the complete layered frame and leaf with restrained vertical grain. Preserve the original construction exactly: straight-on single door; projecting full-height outer posts, complete top header, far-left recessed reveal; exactly one straight vertical groove at 72% of leaf width from inner top to inner bottom; exactly one straight horizontal groove at 70% of height, crossing it once at 90 degrees and producing exactly four plain fields; exactly one horizontal lever on one round rosette and one separate round key escutcheon below, both at left and above the horizontal groove. No extra line, panel, groove, diagonal, curve, window or hardware. No Wonly logo, logo, text, badge or watermark.

CANVAS RATIO OVERRIDES ALL OTHER COMPOSITION CHOICES: use the canonical 405:1075 ultra-tall ratio, width/height = 0.3767, with a 770×2045-like bitmap. NEVER output 887×1772, 1:2, 9:16 or any width/height above 0.39. The door must remain extremely tall and slender. Fit the entire intact assembly large within that correct canvas, leaving only 4–10 physical white pixels at left/top/right and 0–6 at bottom; absolute maximum 12 on every side. Do not touch or crop any outer corner, header, reveal, jamb or bottom endpoint. No white mat, broad padding, room, wall, floor, scenery or surrounding shadow field.
```

Exact P2 substitutions and calls:

- `a refined deep NEGRO finish with readable grooves`: `exec-598e20ee-d294-42c6-b9bc-2c60bae758f3`, `exec-9b9f18ee-d768-499b-8631-2506ce52389b`
- `a deep GRIS OSCURO finish with readable grooves`: `exec-66975858-30da-49c6-baa7-e32711b5b97f`, `exec-e132ecc8-6cc1-4b10-8749-5c5d074a6ff3`
- `a rich graphite ANTRACITA finish with readable grooves`: `exec-4289c8b2-44e9-4e7c-9a8a-c726eac71308`
- `a pale NATURAL honey wood finish with restrained authentic grain`: `exec-5d285a0a-0f16-4002-9205-cc0ddd9f3643`, `exec-31740e37-5370-4e11-be31-799f205a521d`

### Revision prompt P3 — exact full text

Call: `exec-e390edda-3e60-410b-a97a-0087ffc28e16`.

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-5103 original. Never use a generated image. ImageGen only; no filter, recolor script, crop, resize, mask, composite, conversion or post-processing.

Render the entire layered frame and leaf in deep GRIS OSCURO with restrained vertical grain. Preserve exact wl-5103 geometry: straight-on ultra-tall door; full outer posts, top header, far-left reveal; exactly one vertical groove at 72% width; exactly one horizontal groove at 70% height; one clean intersection, exactly four plain fields; one horizontal lever on one round rosette plus one round key escutcheon below, all above the horizontal groove. No extra lines, panels, hardware, logo, Wonly mark, text or watermark.

CANVAS MUST BE 405:1075, width/height 0.3767, approximately 770×2043; never 887×1772, never width/height above 0.39. Keep the complete slender assembly. Move the complete top header upward until its intact outer edge is only 0–6 physical pixels from y=0. Leave only 4–10 pixels at left/right and 0–6 at bottom; absolute maximum 12 on every side. No cropping: all corners, header edges, jambs and bottom tips remain fully visible. No white mat, padding, wall, floor, room or scenery.
```

## Revision selection note

The active set now uses the new direct outputs for negro, gris-oscuro, antracita and natural. Wengue, nogal, roble, gris-claro and blanco retain their previous direct ImageGen selections. The four displaced selections and all eight non-selected revision calls remain byte-for-byte in `_rejected`; no PNG was filtered, recolored, cropped, resized, composited, converted or otherwise post-processed.

This 793×1981 attempt was rejected because its 0.400302877 aspect ratio was 6.2532% wider than the canonical source.

## Blanco — attempt 2 — PASS

```text
Use case: precise-object-edit
Asset type: canonical e-commerce product image for the wl-5103 acoustic wooden door
Input images: Image 1 is the sole edit target and sole reference; it is the canonical original.
Primary request: Recreate exactly the same wl-5103 door from Image 1 and change only its wood finish to BLANCO: neutral white wood with subtle realistic vertical grain, neither cream nor gray. Use restrained shading so every frame step, the leaf, both seams and all edges remain clearly legible against the white backdrop.
Critical aspect-ratio correction: the ENTIRE OUTPUT CANVAS must be an extremely tall, narrow portrait matching Image 1 at about 0.37674 width/height, approximately 770 px wide by 2043 px high. This is mandatory. Do not make a conventional 2:3 portrait, do not exceed 0.385 width/height, do not widen the door and do not add side space. The complete door and frame must almost fill this exact tall-narrow canvas.
Architecture invariants: preserve the complete rectangular wooden outer frame with two full-height vertical jambs and the single top lintel, with no bottom threshold. Preserve one flat rectangular door leaf and exactly TWO thin straight decorative seams: exactly one full-height vertical seam near the right quarter of the leaf, and exactly one single horizontal seam across the leaf at the same low position below the hardware. They cross cleanly. Preserve their positions, thickness and proportions. Add no other grooves, panels, moldings, inserts or decoration.
Hardware invariants: preserve exactly one slim straight horizontal silver/dark-metal lever on one circular rosette on the left, plus exactly one separate circular key cylinder/escutcheon directly below. Preserve position, orientation, proportions and scale; no duplicate hardware.
Composition/framing: straight-on orthographic catalog view, same near-edge-to-edge crop as Image 1, complete top and both side jambs visible, door bottom visible. Plain white studio backdrop only in the same very narrow margins. No zoom-out, widening, squashing, cropping, rotation or perspective.
Constraints: change only the finish; preserve architecture, joinery, vertical grain direction, lighting direction and clean product-render character. NO_LOGO policy. Absolutely no logo, brand mark, badge, plaque, label, lettering, numbers, pseudo-text, watermark, signature or QR code. No added objects, wall, floor or room.
Avoid: wrong aspect ratio, missing or extra seams, altered seam positions, extra panels, missing frame, bottom threshold, cropped product, distorted handle or lock, decorative inlays, horizontal grain, cream cast, overexposure that erases geometry. Native ImageGen result only.
```
