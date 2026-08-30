# MADERAACÚSTICA/wl-s012 — direct built-in ImageGen prompt audit

All 18 audited PNGs came from 18 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

public/images/PUERTAS/MADERAACÚSTICA/wl-s012/original.webp

Reference SHA-256 before and after the run: c7ba732b33a5bac4c43972a794ab82f72cc61177e22ed9e7e70137aebc03d387.

Policy: NO_LOGO_CANONICAL_EDGE_CONTACT_MAXIMUM_SUBJECT. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every workspace PNG is a byte-for-byte copy of its built-in ImageGen result.

This file records the operational prompt families and complete attempt mapping. The built-in tool did not emit a separate normalized prompt log, so the families preserve the explicit requests and invariants without claiming to reproduce any hidden internal normalization.

## Shared subject and invariant contract

> Use case: precise-object-edit.
>
> Asset type: e-commerce acoustic-door catalog finish variant.
>
> Input images: Image 1 is the sole edit target, sole reference and sole canonical geometry source.
>
> Primary request: change only all wood surfaces of the complete wl-s012 door-and-frame assembly to the requested finish while retaining restrained realistic vertical wood grain.
>
> Composition: preserve the original 394:1071 tall narrow ratio and perfectly front-facing orthographic presentation. The complete assembly must occupy essentially the entire canvas.
>
> Canonical contacts: the source measures [0, 0, 2, 0] pixels at RGB<245. Its complete assembly intentionally contacts the left, top and bottom canvas edges. Reproducing these contacts is allowed only when native inspection confirms both posts, their top tips, bottom ends and full silhouette remain complete.
>
> Frame geometry: exactly two square outer side posts projecting above one straight top crossbar and extending fully downward; one inner beveled lintel.
>
> Leaf geometry: exactly one smooth plain leaf with one fine inset line at the right side.
>
> Signature flutes: preserve the narrow far-left cluster of close parallel vertical flutes. Its upper run descends from the lintel, forms the original angular chevron/diamond interruption around the hardware, and resumes as the lower run to the bottom. Preserve count, spacing, lengths, angles and placement.
>
> Hardware: exactly one short horizontal dark-silver lever on one dark circular rosette and exactly one separate dark round key cylinder below, at the original position and scale.
>
> NO_LOGO: no WONLY logo, badge, brand, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
>
> Avoid: extra panels, grooves, flutes, seams, handles, locks, glass, inlays, decoration, architecture, room, wall, floor, props, perspective or cast shadow.

## Finish clauses

- negro: deep matte neutral black wood with restrained vertical grain.
- wengue: rich very dark wenge brown-black wood, recognizably warm brown rather than neutral black.
- gris-oscuro: deep charcoal dark-gray wood.
- antracita: neutral matte anthracite gray wood, clearly lighter than black.
- nogal: warm medium-dark natural walnut brown.
- roble: warm golden honey oak.
- gris-claro: light neutral gray wood, visibly darker than the pure-white background.
- natural: pale blond natural raw oak, light warm beige without yellow-orange saturation.
- blanco: clean matte white-painted wood with subtle vertical grain and enough edge contrast against the pure-white background.

## Prompt families

### F1 — canonical-contact base

The shared contract requested the exact 394:1071 ratio and enormous source-like scale. It explicitly requested 0-pixel contact at left, top and bottom, about 2 pixels on the right, and a complete uncut silhouette. Nine independent first attempts used this family.

### F2 — strict 0–6-pixel correction

The shared contract repeated canonical left/top/bottom contact and prohibited more than 6 pixels on any side. It produced accepted negro, roble and natural candidates. Gris-oscuro, antracita and gris-claro still retained 11 pixels on the right and remained rejected unchanged.

### F3 — right-edge 0–2-pixel correction

The shared contract required the intact full right post to end on the final pixel or retain no more than 2 white pixels, while keeping the source-like left/top/bottom contacts. It produced the accepted gris-oscuro, antracita and gris-claro candidates.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | exec-7a3a10da-ebb0-4147-8c36-5a131bb126a7 | rejected — right margin 10 px |
| negro | 2 | F2 | exec-5250b947-280b-43d1-8edc-2d2580cdab10 | accepted — [0, 1, 0, 0] |
| wengue | 1 | F1 | exec-379c6985-c825-4508-9097-82990eb9aa6d | accepted — [0, 0, 4, 0] |
| gris-oscuro | 1 | F1 | exec-82f884e3-e903-410f-86dd-25f4d9311e98 | rejected — right margin 9 px |
| gris-oscuro | 2 | F2 | exec-8f58a4b8-a88c-4df0-a7fb-e8954f95e25b | rejected — right margin 11 px |
| gris-oscuro | 3 | F3 | exec-e33d908e-32d7-41ea-89ce-6f02e5f3ee24 | accepted — [0, 0, 0, 0] |
| antracita | 1 | F1 | exec-c209c7c2-ca62-456d-8b4d-881b560d9ca8 | rejected — right margin 11 px |
| antracita | 2 | F2 | exec-bce6bc87-82f1-49ca-9907-e005021f3e48 | rejected — right margin 11 px |
| antracita | 3 | F3 | exec-b261d945-c4e8-45b9-9acc-14d300a1ff12 | accepted — [0, 0, 0, 0] |
| nogal | 1 | F1 | exec-bda4ab69-f706-40ef-9aee-75fb2cc5ddc2 | accepted — [0, 0, 0, 0] |
| roble | 1 | F1 | exec-0833a8ab-5bd5-446a-8fdf-de1545452adb | rejected — [7, 0, 11, 0] |
| roble | 2 | F2 | exec-c54bf164-f17e-456c-bbe9-0f2542a3bd10 | accepted — [0, 0, 0, 0] |
| gris-claro | 1 | F1 | exec-0dc74946-e75b-404b-9a15-288806aab106 | rejected — right margin 10 px |
| gris-claro | 2 | F2 | exec-b20b12b8-4791-4742-bdb2-cb4dbede0a06 | rejected — right margin 11 px |
| gris-claro | 3 | F3 | exec-58060c42-32da-4cca-8dff-7d665de727bb | accepted — [0, 0, 2, 0] |
| natural | 1 | F1 | exec-b44243b9-b9c2-4ec6-8d9e-c6e4be553d69 | rejected — [10, 1, 11, 0] |
| natural | 2 | F2 | exec-2f8e4374-ee42-418c-9c17-4580a24a1a99 | accepted — [0, 0, 2, 0] |
| blanco | 1 | F1 | exec-5e339ebc-fa35-44d4-9f63-2d2778074375 | accepted — RGB<250 [3, 2, 3, 0] |

Totals: 18 independent built-in ImageGen calls, 9 accepted and 9 rejected.

## Maximum-subject result

All nine accepted candidates measure within the preferred 0–6-pixel range; the measured maximum is 4 pixels. The zero-pixel terminations reproduce the source's canonical edge-contact composition rather than cropping it. Native-detail inspection confirms the complete outer posts, their top and bottom ends, full leaf silhouette, left split flute cluster, angular hardware interruption, lever and separate key cylinder in every selected PNG.

For blanco, RGB<245 can under-detect the nearly white frame. RGB<250 reports [3, 2, 3, 0] pixels and matches the visible silhouette confirmed natively.

No file under public was touched. No accepted or rejected PNG was processed after generation.
