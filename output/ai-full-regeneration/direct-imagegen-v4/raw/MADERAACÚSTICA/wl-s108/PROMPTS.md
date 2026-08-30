# MADERAACÚSTICA/wl-s108 — direct built-in ImageGen prompt audit

All 29 audited PNGs came from 29 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

    public/images/PUERTAS/MADERAACÚSTICA/wl-s108/original.webp

Reference SHA-256 before and after the run: `8d03ff7180d3e652fc6faa8700b9893d0e307385ae12cbc28a3baf18ad6f10ad`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output, logo image or secondary image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every accepted and rejected PNG in this package is a byte-for-byte copy of its built-in ImageGen result.

This file records the operational prompt families and attempt mapping. The first 27 calls retain their original family-level audit. The two final minimum-margin revisions are additionally reproduced below from their literal `image_generation_end.revised_prompt` values without paraphrase or reconstruction.

## Shared subject and invariant contract

~~~text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: regenerate the exact same wl-s108 door in {{FINISH_CLAUSE}}.
Scene/backdrop: pure clean white; no wall, floor line, room, props, external cast shadow or perspective.
Composition/framing: preserve the canonical 384:1032 extremely tall narrow straight-on view and enormous object scale. The source measures RGB<245 margins [4,4,3,0]. Prefer 0-6 px and normally never exceed 12 px. Bottom contact is permitted only because the source touches that edge and only when every molding and both lower endpoints remain complete. Never crop the silhouette.
Geometry invariants: complete two slim square-profile outer posts; straight layered top header and inner lintel; one very dark recessed full-height reveal immediately inside the left post; one smooth flat slab with fine HORIZONTAL grain. Preserve the exact thin asymmetric orthogonal routed-line motif and endpoints: one long handle-height horizontal line, one upper-left vertical step, one narrow rectangular step around the lower-left lock zone, and one larger lower step extending to a second vertical drop near the first third before its lower horizontal continuation reaches the right jamb.
Hardware invariants: exactly one short slim dark horizontal lever extending right from one circular rosette at the far left around 58% height; exactly one separate small circular dark key cylinder below; no visible hinges or additional hardware.
Finish invariants: change only the requested finish; retain all proportions, reveal, routed-line topology, hardware placement, neutral light and camera alignment.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, rosettes, cylinders, hinges, seams, panels, grooves, glass, decoration, baseboard, pedestal, people, room scene or props.
~~~

## Finish clauses

- negro: deep neutral black wood veneer with restrained fine horizontal grain and enough tonal separation to keep every frame edge readable.
- wengue: very dark espresso-brown wenge veneer with subtle near-black horizontal grain, visibly brown rather than neutral black.
- gris-oscuro: deep neutral dark-gray wood veneer with restrained fine horizontal grain, clearly gray rather than black.
- antracita: very dark cool-neutral charcoal wood veneer with subtle fine horizontal grain, charcoal rather than pure black.
- nogal: refined warm walnut-brown veneer with elegant darker horizontal grain, neither orange nor red.
- roble: natural light-to-medium warm honey-beige oak veneer with refined authentic horizontal grain, not orange.
- gris-claro: pale neutral cool-gray wood veneer with restrained horizontal grain and complete contours against white.
- natural: pale untreated natural ash/beech veneer in light warm beige, not yellow-orange.
- blanco: clean white-painted wood with barely visible fine horizontal grain and natural shallow edge relief against pure white, without a drawn outline.

## Prompt families

### F1 — base source-scale generation

The shared contract above with the finish clause substituted. It requested the complete outer frame as large as possible from the first call, canonical 384:1032 proportion, a 0–6 px preference, 12 px normal maximum, exact routed-line topology and source-faithful bottom contact only with an intact silhouette.

### F2 — targeted minimal-gap retry

The full geometry/hardware contract was repeated after a measured edge exceeded 12 px. The prompt explicitly requested only 2–6 actual source-PNG pixels of white clearance on left, top and right, about 99% canvas-width fill and canonical bottom contact. Every retry started independently from `original.webp`.

### F3 — strict 3–5 px scale retry

The same invariants were repeated with the entire assembly locked to 3–5 px left/top/right clearance, about 99% width and 99.8% height, no centered padding band and no crop.

### F4 — canonical placement lock

The prompt reframed the task as a finish-only transformation with the source layout locked. It stated the canonical `[4,4,3,0]` placement and prohibited zooming out or adding a white border. This produced the accepted antracita and gris-claro attempts.

### F5 — approximate coordinate lock

The prompt specified approximate canonical coordinates on the 384x1032 reference: left outer post near x=4, header near y=4, right post ending near x=380 and intact bottom flush at y=1031. Gris-oscuro attempt 5 was the historical selection before the final full-bleed revision; the corresponding blanco result remained over 12 px.

### F6 — white near-tangent retry

The white-only sixth call used the complete invariant contract and requested 2–4 px on left/top/right, with the outer posts almost tangent to the edges while fully visible. It was the historical selection before the final full-bleed revision.

### F7 — final deliberate overscale retry

The final gris-oscuro and blanco calls requested the intact assembly about 1% larger than a typical centered rendering. Gris-oscuro was rejected for a 16 px left margin and a spurious pale oval on the upper leaf. Blanco was rejected because its 14 px left/top readings were worse than accepted attempt 6.

### R1 — final full-bleed literal revisions

Two additional independent calls again referenced only the canonical `original.webp` and required the complete casing within 0–3 pixels of every boundary while retaining every corner, lower endpoint, reveal, routed-line segment and hardware item. Their literal prompts are reproduced in full below.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | `exec-7ef94ee8-bf96-436e-b452-96328267d8c6` | accepted — complete frame, `[12,11,10,5]` |
| wengue | 1 | F1 | `exec-b83cc72c-cd8e-4dea-9e86-2903cfe0924c` | accepted — complete frame, `[12,7,10,0]`, canonical bottom contact |
| gris-oscuro | 1 | F1 | `exec-826edb4f-15f0-4f41-8f05-ba3b6039d37d` | rejected — side margins `[13,12,13,6]` before retries |
| gris-oscuro | 2 | F2 | `exec-8d2c9708-f9d8-4808-bde5-517fcdf9bf65` | rejected — `[12,6,13,6]`; native QA found routed line and hardware shifted upward |
| gris-oscuro | 3 | F3 | `exec-5a5c98e4-6411-40f4-999d-66c16ce53a2c` | rejected — left margin 16 px |
| gris-oscuro | 4 | F4 | `exec-666d58cd-a697-42e0-8fb1-430749b10b7e` | rejected — left margin 15 px |
| gris-oscuro | 5 | F5 | `exec-01ce803f-f466-4d38-bb76-52fa0ef6209f` | rejected — previous selected result retired byte-for-byte after tighter attempt 7 |
| gris-oscuro | 6 | F7 | `exec-3b52bb44-8a7d-4320-8572-9c9b31150a02` | rejected — left margin 16 px and spurious pale oval artifact |
| gris-oscuro | 7 | R1 literal | `exec-a5f3570b-bf72-4f9c-a1fb-fd65bebc1d79` | accepted — `[10,7,11,0]`, native-complete canonical bottom contact |
| antracita | 1 | F1 | `exec-ba2f4a60-b795-4d2e-9e21-beaa4bbffc31` | rejected — left margin 13 px |
| antracita | 2 | F2 | `exec-277e3c6e-f96b-4fe8-979a-112a6f9dc374` | rejected — margins `[14,13,13,8]` |
| antracita | 3 | F3 | `exec-bd543d17-25fb-456b-980e-d717e7624a5c` | rejected — margins `[14,14,16,10]` |
| antracita | 4 | F4 | `exec-f0478983-a7e4-4e2a-9b4b-cf85bd003fb8` | accepted — `[12,11,9,0]`, complete canonical bottom contact |
| nogal | 1 | F1 | `exec-e10e5188-6799-4f07-9259-0da36cce1f53` | accepted — complete frame, `[10,11,10,8]` |
| roble | 1 | F1 | `exec-40ac869f-f22e-4ccf-b473-74a81d80080b` | rejected — left margin 13 px |
| roble | 2 | F2 | `exec-a3a6df98-42b5-4fdb-808e-f5f188727cbe` | accepted — complete frame, `[12,12,12,6]` |
| gris-claro | 1 | F1 | `exec-8311b03f-e424-46cc-8a2e-58d876a9f1aa` | rejected — right margin 13 px |
| gris-claro | 2 | F2 | `exec-4ce0881e-102f-42a3-b9c5-00ec4673d139` | rejected — broad `[19,14,22,4]` padding |
| gris-claro | 3 | F3 | `exec-1fdc1887-2fc1-4f02-a51d-7b64c262f730` | rejected — left/right `[14,13]` |
| gris-claro | 4 | F4 | `exec-b64ca0be-519e-40c4-930a-cb03e8bedf5a` | accepted — complete pale frame, `[12,10,12,4]` |
| natural | 1 | F1 | `exec-25b8b834-12f6-4651-90d6-753c3823ebc2` | accepted — complete frame, `[11,11,12,3]` |
| blanco | 1 | F1 | `exec-6c916891-99a4-4eea-b179-e61661c68d41` | rejected — margins `[18,13,18,9]` |
| blanco | 2 | F2 | `exec-f9a5a033-3546-4ff1-8568-dcaa21b563f6` | rejected — side margins `[14,15]` |
| blanco | 3 | F3 | `exec-f89bf8d7-048e-4e7d-9a63-fb6e2838c9a9` | rejected — broad `[27,15,26,7]` padding |
| blanco | 4 | F4 | `exec-fd4507d7-0a7b-44fc-a528-b33fb9757cca` | rejected — side margins `[15,17]` |
| blanco | 5 | F5 | `exec-28f16b5e-5e7a-4cde-9ffc-560d6ec962cf` | rejected — side margins `[15,14]` |
| blanco | 6 | F6 | `exec-09826fc3-f3b2-4856-aca9-1d0106df45c9` | rejected — previous selected result retired byte-for-byte after tighter attempt 8 |
| blanco | 7 | F7 | `exec-eff0a3c7-070f-4ed2-951c-0d0db7a833b2` | rejected — `[14,14,12,9]`, worse than attempt 6 |
| blanco | 8 | R1 literal | `exec-8377ddfd-13bd-4470-8aef-afd0791df1ca` | accepted — `[9,8,10,0]`, native-complete canonical bottom contact |

Totals: 29 independent built-in ImageGen calls, 9 accepted and 20 rejected.

## Framing and native-inspection notes

Wengue, antracita, gris-oscuro and blanco measure 0 px at the bottom. This is not a crop or resize: the canonical source also touches the bottom, and native-detail inspection confirms every complete lower post endpoint, corner, molding, routed-line endpoint and full silhouette.

Gris-oscuro attempt 7 is accepted at `[10,7,11,0]`; blanco attempt 8 is accepted at `[9,8,10,0]`. Both eliminate the former 13 px exceptions while preserving the canonical aspect ratio and signature geometry. Their displaced historical selections remain byte-for-byte in `rejected/`.

No file under `public/` was touched, and no accepted or rejected PNG was processed after generation.

## Final minimum-margin revisions — literal prompts

### Blanco attempt 8

- Generator ID: `exec-8377ddfd-13bd-4470-8aef-afd0791df1ca`.
- Dimensions: `765×2055`.
- RGB<245 margins `[left, top, right, bottom]`: `[9,8,10,0]`.
- SHA-256: `09a48ab08a8f0b21829170c6c3242e0f160856b2ed2399f7fd07cc38cc4ec5db`.
- Literal prompt SHA-256 (UTF-8): `ae5129172cab9584679ab62e5f2012b95c1cc40df6c82b39017c59cdd195886c`.

```text
Edit ONLY the attached canonical original into the exact same product model. Preserve this mandatory geometry: front-facing very tall narrow flat slab; complete two slim square-profile outer casing posts, straight layered top header and inner lintel, all four outer corners and both lower endpoints; one very dark full-height recessed reveal immediately inside the left post; otherwise one smooth flat leaf with fine HORIZONTAL grain. Preserve the exact thin asymmetric orthogonal routed-line motif: one main thin horizontal run at handle height across to the right jamb; at the far-left lock zone an upper-left vertical step, one narrow rectangular outline surrounding the lock/handle zone, and a larger lower step with a second vertical drop near the first third plus its lower horizontal continuation to the right jamb. The motif must remain thin and exactly orthogonal, not become a decorative panel. Exactly ONE short slim dark horizontal lever extending right from ONE circular rosette at the far left around 58% height, exactly ONE separate small circular dark key cylinder below. NO visible hinges and no additional hardware. No extra panels, seams, glass, groove patterns or decoration. Absolutely NO_LOGO: no Wonly, text, badge, watermark, letters or pseudotext.

Preserve canonical width/height ratio 0.372093; never widen. Pure white background, no scene or shadow.

CRITICAL FULL-BLEED FRAMING: the complete casing must meet or sit within 0–3 pixels of every canvas boundary. The colored left and right posts should touch the first and last pixel columns and the header should touch or nearly touch the top row; both intact lower endpoints should touch the bottom row. Occupy essentially 100% of width and height. No white padding, breathing room, broad border or floor band. Do not crop away any casing width, corner, lintel, reveal, routed motif, hardware or lower endpoint; the full geometry must remain intact while being flush to the canvas. Straight-on, centered, photorealistic, crisp ecommerce cutout.
Finish blanco: refinish leaf and matching casing coherently in clean warm architectural white, with restrained fine horizontal wood grain and subtle edge contrast so the complete white silhouette remains measurable against white; keep reveal and hardware dark and do not change geometry.
```

### Gris-oscuro attempt 7

- Generator ID: `exec-a5f3570b-bf72-4f9c-a1fb-fd65bebc1d79`.
- Dimensions: `765×2055`.
- RGB<245 margins `[left, top, right, bottom]`: `[10,7,11,0]`.
- SHA-256: `b216c6c3d265a8e0c03ec0bc38910e8bc05baf0d851a9c98037fe32b8e56ec1f`.
- Literal prompt SHA-256 (UTF-8): `b526385da99fcac6b0ebb52cfdd1a3bb23feecee6e3773cf11878c86898c7c73`.

```text
Edit ONLY the attached canonical original into the exact same product model. Preserve this mandatory geometry: front-facing very tall narrow flat slab; complete two slim square-profile outer casing posts, straight layered top header and inner lintel, all four outer corners and both lower endpoints; one very dark full-height recessed reveal immediately inside the left post; otherwise one smooth flat leaf with fine HORIZONTAL grain. Preserve the exact thin asymmetric orthogonal routed-line motif: one main thin horizontal run at handle height across to the right jamb; at the far-left lock zone an upper-left vertical step, one narrow rectangular outline surrounding the lock/handle zone, and a larger lower step with a second vertical drop near the first third plus its lower horizontal continuation to the right jamb. The motif must remain thin and exactly orthogonal, not become a decorative panel. Exactly ONE short slim dark horizontal lever extending right from ONE circular rosette at the far left around 58% height, exactly ONE separate small circular dark key cylinder below. NO visible hinges and no additional hardware. No extra panels, seams, glass, groove patterns or decoration. Absolutely NO_LOGO: no Wonly, text, badge, watermark, letters or pseudotext.

Preserve canonical width/height ratio 0.372093; never widen. Pure white background, no scene or shadow.

CRITICAL FULL-BLEED FRAMING: the complete casing must meet or sit within 0–3 pixels of every canvas boundary. The colored left and right posts should touch the first and last pixel columns and the header should touch or nearly touch the top row; both intact lower endpoints should touch the bottom row. Occupy essentially 100% of width and height. No white padding, breathing room, broad border or floor band. Do not crop away any casing width, corner, lintel, reveal, routed motif, hardware or lower endpoint; the full geometry must remain intact while being flush to the canvas. Straight-on, centered, photorealistic, crisp ecommerce cutout.
Finish gris-oscuro: refinish leaf and matching casing coherently in dark neutral charcoal gray, with restrained fine horizontal wood grain; keep reveal and hardware dark and do not change geometry.
```
