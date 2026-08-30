# MADERAACÚSTICA / wl-s205 — direct built-in ImageGen prompts

## Execution contract

- Mode: built-in ImageGen only.
- One independent call per finish or retry.
- Sole reference for all 10 calls: public/images/PUERTAS/MADERAACÚSTICA/wl-s205/original.webp.
- No generated output was used as a later reference.
- NO_LOGO: no logo reference, logo, brand, text, badge, watermark or pseudotext.
- No filter, recolor operation, mask, crop, resize, conversion, composite or post-generation pixel processing.
- Every selected and rejected PNG was copied from the generated-images store byte for byte.

## Canonical signature locked from native inspection

Straight-on tall narrow door with two slim full-height outer posts, one straight top lintel and a narrow inner bevel. A dark recessed vertical reveal runs down the inside-left edge. The leaf is one large flat uninterrupted slab with no panels. Exactly one thin muted gold/brass inlay consists of one near-full-height vertical line near the left leaf edge and one horizontal line that begins at that vertical at handle height and runs only to the right leaf edge. Hardware is exactly one short horizontal lever pointing right on a dark round rosette and one separate dark rounded key escutcheon/cylinder directly below. The original reaches the right and bottom edges at RGB<245 while its silhouette remains complete.

## F1 — shared first-call prompt

    Use case: product-mockup
    Asset type: photorealistic e-commerce door catalog image
    Input images: Image 1 is the sole structural and composition reference.
    Primary request: Generate a completely new photorealistic studio catalog rendering of exactly the same complete minimalist door design shown in Image 1. Apply the requested finish through native AI generation; do not add or redesign anything.
    Scene/backdrop: pure white seamless background, no floor, no horizon, no props, no cast shadow.
    Subject invariants: exact straight-on front orthographic view and exact tall narrow proportions. Preserve the complete slim outer casing: exactly two full-height vertical side posts, one straight horizontal top lintel, and the same narrow inner bevel/reveal. Preserve the narrow dark recessed vertical shadow channel along the inside-left edge. Preserve exactly one large uninterrupted flat slab leaf with no raised or recessed panels. Preserve exactly one very thin metallic gold/brass inlay design: one long vertical line at the identical offset near the left edge of the leaf, running almost the full leaf height, intersected at the identical handle height by one thin horizontal line that starts at that vertical line and continues straight to the right leaf edge. Keep the same line width, position, intersection and muted gold color. No additional inlay lines or decorations.
    Hardware invariants: preserve exactly one short slim silver/dark-metal horizontal lever pointing right on one dark circular rosette, plus exactly one separate small dark rounded key escutcheon/cylinder directly below it, at the identical left-side location, scale and spacing. No other hardware.
    Composition/framing: reproduce the source's maximum-size product occupancy and its narrow width-to-height ratio of about 0.388:1. The complete intact door assembly must fill essentially the entire portrait canvas. Target only 0–6 final-image pixels of pure-white margin on every side; 12 pixels is the absolute normal maximum. Canonical 0-pixel contact is allowed on the right and bottom, as in Image 1, only when native inspection confirms that the complete outer posts, lintel and bottom corners remain visible. Fit the generated canvas tightly to the complete door; do not place a smaller door inside broad whitespace. Do not crop or truncate any casing edge or corner.
    Style/medium: realistic premium product photography/rendering, crisp joinery, natural material detail, neutral even studio light, no dramatic styling.
    Constraints: use only Image 1; preserve geometry, linework, hardware, viewpoint, narrow proportions and framing exactly; change only the regenerated finish; pure-white background; complete silhouette; no logo, no brand mark, no text, no letters, no numbers, no badge, no watermark, no pseudotext.
    Avoid: wide/squat proportions, extra panels, grooves, extra gold lines, altered inlay intersection, duplicate handles, extra locks, peepholes, hinges, threshold, floor, perspective, angled view, decor, shadow halo, oversized white margins, cropped silhouette.

Finish clauses appended to F1:

- negro: Finish: deep neutral black-stained wood across every wooden casing and leaf component, with restrained realistic grain visible without obscuring the thin gold/brass inlay; keep the dark left reveal and both hardware pieces unchanged.
- wengue attempt 1: Finish: very dark chocolate espresso wenge wood across every wooden casing and leaf component, with fine realistic straight grain and subtle warm undertones; keep the thin gold/brass inlay, dark left reveal and hardware unchanged.
- gris-oscuro: Finish: dark cool charcoal-gray stained wood across every wooden casing and leaf component, with restrained realistic grain; keep the thin gold/brass inlay, dark left reveal and hardware unchanged.
- antracita: Finish: near-black anthracite graphite stained wood across every wooden casing and leaf component, with subtle cool grain and realistic relief; keep the thin gold/brass inlay, dark left reveal and hardware unchanged.
- nogal: Finish: rich medium warm walnut wood across every wooden casing and leaf component, with natural varied walnut grain, balanced brown color and restrained satin sheen; keep the thin gold/brass inlay, dark left reveal and hardware unchanged.
- roble: Finish: light-to-medium honey oak wood across every wooden casing and leaf component, with authentic open oak grain, restrained golden tone and natural satin finish; keep the thin gold/brass inlay, dark left reveal and hardware unchanged.
- gris-claro: Finish: light cool gray stained wood across every wooden casing and leaf component, clearly distinguishable from the pure-white background, with subtle visible grain and realistic relief; keep the thin gold/brass inlay, dark left reveal and hardware unchanged.
- natural: Finish: pale natural unfinished wood, light warm beige blond oak/beech tone across every wooden casing and leaf component, with delicate authentic grain and matte natural surface; keep the thin gold/brass inlay, dark left reveal and hardware unchanged.

## F2 — wengue ratio and margin retry

F1 was repeated with the wengue finish clause and this single targeted correction:

    Targeted correction: the previous independent candidate was 18.9% too wide and left 14–15 pixel side gutters. Generate this result in the canonical very narrow 0.388 width-to-height proportion, not 0.46. Scale the complete slim silhouette up so the two outside side-post edges are within 0–4 pixels of the canvas edges, with the complete frame visible.

## W1 — blanco prompt

The same structural, inlay, hardware, ratio and NO_LOGO invariants were restated with this finish/framing block:

    Finish/material: clean neutral white painted wood on every wooden casing and leaf component, with subtle realistic relief, internal bevel shading and edge definition so the complete white silhouette remains distinguishable from the pure-white background. Keep the dark left reveal, thin gold/brass inlay and both hardware pieces unchanged.
    Composition/framing: reproduce the source's maximum-size product occupancy. Generate the canvas tightly fitted to the complete door. Target 0–4 final-image pixels of white margin on left and right and 0–6 on top and bottom; 12 is the absolute normal maximum. Canonical edge contact is encouraged at right and bottom, as in Image 1, provided both outer posts, the full lintel and all four corners remain visibly complete. Do not crop. Do not place a smaller door inside broad white gutters.
    Style/medium: realistic premium product photography/rendering, crisp joinery, neutral even studio light, restrained internal contact shading only, no external drop shadow.

## Call and result map

| Call | Finish | Attempt | Built-in ImageGen ID | Result | Measured margins L/T/R/B |
| --- | --- | ---: | --- | --- | --- |
| 1 | negro | 1 | exec-12d64ef7-a602-455e-9a8d-2a5f72d9f8ed | accepted | 9/10/6/0 |
| 2 | wengue | 1 | exec-3e0fee5c-2c67-46ae-97ca-ccabcbd95a4b | rejected: 18.887859% too wide; side margins above 12 | 14/5/15/0 |
| 3 | gris-oscuro | 1 | exec-8296315f-4e35-41ad-a93e-9a78998232bf | accepted | 9/4/9/0 |
| 4 | wengue | 2 | exec-9ed109f7-b02e-4621-945f-95aef876be7e | accepted after ratio correction | 10/3/8/0 |
| 5 | antracita | 1 | exec-dbf63834-a32f-430f-bbf8-94b6919314ea | accepted | 11/11/7/0 |
| 6 | nogal | 1 | exec-d9ae8e3f-75fa-4806-bd8f-1ad71359bd3d | accepted | 7/1/8/0 |
| 7 | roble | 1 | exec-4a00fd10-e48e-4a93-9b0a-bec6709fbc0a | accepted | 9/9/8/0 |
| 8 | gris-claro | 1 | exec-d60570d8-82c4-40a0-bf66-309df8637f2d | accepted | 10/8/9/0 |
| 9 | natural | 1 | exec-60c0cb64-252e-42e1-91e8-890babd56324 | accepted | 11/6/8/0 |
| 10 | blanco | 1 | exec-20f07a35-b62d-4102-a32f-29c908056860 | accepted | 6/6/5/0 at RGB<250 |

## Final QA

All nine selected PNGs passed native visual inspection for the full casing, unpaneled slab, dark left reveal, exact two-stroke gold/brass inlay, one lever/rosette, one separate key escutcheon and NO_LOGO. The rejected wengue remains under _rejected. Every saved PNG is byte-identical to its generator file. The canonical original remained unchanged.
