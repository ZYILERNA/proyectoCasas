# MADERAACÚSTICA / wl-s102b — direct built-in ImageGen prompts

## Execution contract

- Mode: built-in ImageGen only.
- One independent call per finish or retry.
- Sole reference for all 11 calls: public/images/PUERTAS/MADERAACÚSTICA/wl-s102b/original.webp.
- No generated candidate was used as a reference for a later call.
- NO_LOGO: no logo reference, logo, brand, text, badge, watermark or pseudotext.
- No filter, recolor operation, mask, crop, resize, conversion, composite or post-generation pixel processing.
- Every selected or rejected PNG was copied from the generated-images store byte for byte.

## Canonical signature locked from native inspection

Straight-on tall narrow door with two slim full-height outer casing posts and a straight molded top lintel. The leaf has two wide vertical stiles, one solid horizontal top rail, one solid horizontal bottom rail and exactly one very tall centered silver-gray rough/stippled textured rectangular inset panel. Hardware is exactly one short slim silver horizontal lever pointing right on a dark round rosette and one separate dark rounded key escutcheon/cylinder below, at the original left-side location and spacing. Grain is vertical on posts/stiles and horizontal on lintel/rails. The canonical source reaches the bottom edge at RGB<245 and all four edges at RGB<250 while its complete silhouette remains visible.

## F1 — shared first-call prompt

    Use case: product-mockup
    Asset type: photorealistic e-commerce door catalog image
    Input images: Image 1 is the sole structural and composition reference.
    Primary request: Generate a completely new photorealistic studio catalog rendering of exactly the same complete door design shown in Image 1. Apply the requested finish through native AI generation; do not add or redesign anything.
    Scene/backdrop: pure white seamless background, no floor, no horizon, no cast shadow, no props.
    Subject invariants: exact straight-on front orthographic view; exact tall narrow proportions; preserve the complete outer casing with two slim full-height outer posts and the straight molded top lintel; preserve the door leaf with two wide vertical wood stiles, one solid horizontal top rail, one solid horizontal bottom rail, and exactly one very tall centered silver-gray rough/stippled textured rectangular inset panel. Preserve the original panel dimensions, border widths, joints, bevels, depths, grain directions, and every edge. Preserve exactly one short slim silver horizontal lever pointing right on one dark circular rosette plus exactly one separate dark key escutcheon/cylinder directly below, at the identical left-side location, scale and spacing. No other hardware.
    Composition/framing: reproduce the source's maximum-size catalog occupancy. The intact complete door assembly must fill essentially the entire portrait canvas, scaled so the outer silhouette has only 0–6 final-image pixels of white margin on left, top, right and bottom; 12 pixels is the absolute normal maximum. Canonical 0-pixel contact is allowed where the reference reaches an edge and the complete silhouette remains intact. Do not crop, truncate or hide any portion of the outer casing, top lintel, side posts or bottom corners. Fit the canvas tightly to the complete door; do not place a smaller door inside generous whitespace.
    Style/medium: realistic premium product photography/rendering, crisp construction details, natural material texture, neutral even studio light, no dramatic styling.
    Constraints: use only Image 1 as reference; preserve geometry, hardware, viewpoint, proportions, framing and textured panel exactly; change only the regenerated wood finish; complete silhouette visible; pure white background; no logo, no brand mark, no text, no letters, no numbers, no badge, no watermark, no pseudotext.
    Avoid: extra panels, missing rails, changed panel texture, duplicate handles, extra locks, peepholes, hinges, thresholds, floor, perspective, angled view, shadows, decor, oversized white margins, cropped silhouette.

Finish clauses appended to F1:

- negro: Finish: deep neutral black-stained wood across every wooden casing and leaf component, with restrained realistic wood grain still visible; keep the central textured panel silver-gray and the hardware unchanged.
- wengue attempt 1: Finish: very dark chocolate espresso wenge wood across every wooden casing and leaf component, with fine realistic straight grain and subtle warm undertones; keep the central textured panel silver-gray and the hardware unchanged.
- gris-oscuro: Finish: dark cool charcoal-gray stained wood across every wooden casing and leaf component, with restrained realistic wood grain; keep the central textured panel silver-gray and the hardware unchanged.
- antracita: Finish: near-black anthracite graphite stained wood across every wooden casing and leaf component, with subtle cool wood grain and realistic relief; keep the central textured panel silver-gray and the hardware unchanged.
- nogal: Finish: rich medium warm walnut wood across every wooden casing and leaf component, with natural varied walnut grain, balanced brown color and restrained satin sheen; keep the central textured panel silver-gray and the hardware unchanged.
- roble: Finish: light-to-medium honey oak wood across every wooden casing and leaf component, with authentic open oak grain, restrained golden tone and natural satin finish; keep the central textured panel silver-gray and the hardware unchanged.
- gris-claro: Finish: light cool gray stained wood across every wooden casing and leaf component, clearly distinguishable from the pure-white background, with subtle visible wood grain and realistic relief; keep the central textured panel silver-gray and the hardware unchanged.
- natural: Finish: pale natural unfinished wood, light warm beige blond oak/beech tone across every wooden casing and leaf component, with delicate authentic grain and matte natural surface; keep the central textured panel silver-gray and the hardware unchanged.

## F2 — wengue framing retry

F1 was repeated with the wengue finish clause and this single targeted correction:

    Targeted framing correction: the previous independent result left 13-pixel side gutters. Do not repeat that. In this new generation, scale the complete intact door slightly larger so the outside edge of the left post is at x=0–4 pixels and the outside edge of the right post is at width-1 minus 0–4 pixels. Prefer full-height canonical edge contact at left/right and bottom, exactly like the tightly fitted source, while keeping every outer edge and corner complete. No visible broad white vertical gutters.

## W1 — blanco first call

The white call restated the same structural invariants and used this finish/framing block:

    Finish/material: clean neutral white painted wood on every wooden casing and leaf component. Preserve subtle realistic wood relief, joints, bevel shading and edge definition so the white door remains clearly distinguishable from the pure-white background. Keep the central textured panel silver-gray and the hardware unchanged.
    Composition/framing: reproduce the source's maximum-size catalog occupancy. The intact complete door assembly must fill essentially the entire portrait canvas. Scale it so the visible outside edges of the left and right posts sit within 0–4 final-image pixels of their canvas edges, and top/bottom within 0–6 pixels; never exceed 12. Canonical edge contact is encouraged where the source reaches an edge, provided the complete silhouette remains intact. Do not crop, truncate or hide any portion of the outer casing, top lintel, side posts or bottom corners. Fit the canvas tightly to the complete door; no broad white gutters.
    Style/medium: realistic premium product photography/rendering, crisp joinery, neutral even studio light, restrained internal contact shadows only, no external drop shadow.

## W2 — blanco tighter framing retry

The white structural and NO_LOGO invariants were repeated, with this single targeted correction:

    Mandatory framing correction: Generate the canvas already tightly fitted to the complete door. The complete outside face of the left outer post must physically reach x=0 or x=1, and the complete outside face of the right outer post must reach x=width-1 or width-2. The complete top lintel/post caps must reach y=0 or y=1; bottom post ends must reach y=height-1. There must be no broad pure-white gutter outside the side posts. This is intentional canonical edge contact, because Image 1 is also tightly fitted and its full silhouette is intact. Keep both posts, top lintel, bottom rail and all four outer corners visibly complete: edge contact is not cropping. Target 0–2 pixels on every side, never more than 6.

## Call and result map

| Call | Finish | Attempt | Built-in ImageGen ID | Result | Measured margins L/T/R/B |
| --- | --- | ---: | --- | --- | --- |
| 1 | negro | 1 | exec-bf259c26-7299-405d-8501-e474e5c1dcda | accepted | 8/7/6/0 |
| 2 | wengue | 1 | exec-0dcf11cf-5717-4456-a99a-0ee2810f4866 | rejected: side margins 13 exceed maximum 12 | 13/0/13/7 |
| 3 | gris-oscuro | 1 | exec-fdf17be5-c4a8-4d7d-9226-cc153c521a88 | accepted | 6/5/6/5 |
| 4 | wengue | 2 | exec-910dddc6-6437-4f73-99c4-379c4d12d260 | accepted: canonical contact, native silhouette complete | 0/0/0/0 |
| 5 | antracita | 1 | exec-ae9496fa-f494-4c20-9f66-64c9f2f3cb29 | accepted | 7/0/8/0 |
| 6 | nogal | 1 | exec-0a16b348-0d97-4a8f-834d-99806c4b98e7 | accepted | 9/0/9/0 |
| 7 | roble | 1 | exec-f5ed96fa-c68a-4b03-9810-8d2bcdd7882c | accepted | 6/5/7/0 |
| 8 | gris-claro | 1 | exec-66ce1609-2e1c-4254-967e-5270d9b16fb8 | accepted | 11/9/10/0 |
| 9 | natural | 1 | exec-926cb915-416f-4fce-a890-680d6beed47d | accepted | 10/6/10/0 |
| 10 | blanco | 1 | exec-828abfc3-e65c-474c-90fe-d85b4a485f04 | rejected: valid maximum but replaced by tighter attempt | 12/9/12/1 at RGB<250 |
| 11 | blanco | 2 | exec-30947ba6-7a02-4d7f-a055-1cb634b97664 | accepted | 11/2/11/0 at RGB<250 |

## Final QA

All nine selected PNGs passed native visual inspection for the complete casing, single centered textured panel, original rail/stile layout, one lever/rosette, one separate key escutcheon and NO_LOGO. The two rejected PNGs remain under _rejected. The selected PNGs and rejects are byte-identical to their generator files. The canonical original remained unchanged.
