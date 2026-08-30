# ImageGen prompt log — MADERAACÚSTICA / wl-d038

- Mode: built-in ImageGen.
- Use case: precise-object-edit.
- Sole reference in every call: public/images/PUERTAS/MADERAACÚSTICA/wl-d038/original.webp.
- Reference SHA-256: ed28e9ab7be355f81a860fe4971776d0d93b87ac39ec1b9d70f49f935f49442d.
- Policy: NO_LOGO.
- Every call was independent. No generated output was supplied as a reference.
- No postprocessing was performed. Workspace PNGs are byte-identical copies of the ImageGen artifacts.

## Provenance

| Finish | Attempt | Result | Generator ID | UTC | Workspace file |
|---|---:|---|---|---|---|
| negro | 1 | PASS | exec-7abc1bad-63fa-4bfc-b7fa-19fd3d924e64 | 2026-08-18T09:56:50.453Z | negro.png |
| wengue | 1 | PASS | exec-22825854-d02d-4dbe-883b-1db7db97b74e | 2026-08-18T09:58:55.280Z | wengue.png |
| gris-oscuro | 1 | PASS | exec-2ad01627-6d80-4150-af7f-0a0eb75b8d77 | 2026-08-18T09:59:48.222Z | gris-oscuro.png |
| antracita | 1 | PASS | exec-37cf3fed-49c8-45e7-95c6-cc8e2e129e95 | 2026-08-18T10:00:40.573Z | antracita.png |
| nogal | 1 | PASS | exec-3b4bdbbd-e933-48f5-acbe-30e8a76041c3 | 2026-08-18T10:01:38.817Z | nogal.png |
| roble | 1 | PASS | exec-6cb80b77-4fce-421a-8860-08a2a5c63b34 | 2026-08-18T10:02:35.137Z | roble.png |
| gris-claro | 1 | REJECT — aspect ratio | exec-3fd95ba5-3961-4736-ab60-730e9c204e50 | 2026-08-18T10:03:33.598Z | rejected/gris-claro-attempt-1.png |
| gris-claro | 2 | PASS | exec-082e044a-fde1-4d47-816c-bb8812657f07 | 2026-08-18T10:04:49.346Z | gris-claro.png |
| natural | 1 | PASS | exec-d077915d-817a-49e8-9c32-4ca768a3ae18 | 2026-08-18T10:05:39.082Z | natural.png |
| blanco | 1 | PASS | exec-add48587-282b-49d7-a35a-eb17d365868e | 2026-08-18T10:07:15.279Z | blanco.png |

## Exact prompt composition for template-A calls

The calls for negro, wengue, gris-oscuro, antracita, nogal, roble and gris-claro attempt 1 used the following exact template. Replace only PRIMARY_REQUEST and GROOVE_COUNT with the verbatim values in the substitution table; no other text changes were made.

    Use case: precise-object-edit
    Asset type: canonical e-commerce product image for the wl-d038 acoustic wooden door
    Input images: Image 1 is the sole edit target and sole reference; it is the canonical original.
    PRIMARY_REQUEST
    Architecture invariants: preserve the complete multi-step outer frame and the single uninterrupted flat door leaf. Preserve exactly one narrow decorative band at handle height made from exactly GROOVE_COUNT close, thin, parallel horizontal recessed grooves; the grooves begin just to the right of the hardware with the same short diagonal beveled/chamfered left end and extend straight to the right edge. Preserve the groove count, spacing, thickness, bevel geometry and height. Add no other seams, panels or grooves.
    Hardware invariants: preserve exactly one short straight dark-metal lever on one circular rosette on the left, plus exactly one separate circular key escutcheon directly below. Preserve position, orientation, proportions and scale; no duplicate hardware.
    Composition/framing: straight-on orthographic catalog view, same near-edge-to-edge crop as Image 1, complete top and side frame visible. The output canvas must match the extremely tall, narrow source aspect ratio, about 0.37054 width/height (approximately 760 px wide by 2052 px high). Do not use a conventional 2:3 portrait and do not exceed 0.38 width/height. Plain white studio backdrop only in the same narrow margins. No zoom-out, widening, squashing, rotation or perspective.
    Constraints: change only the finish; preserve architecture, joinery, lighting direction and clean product-render character. NO_LOGO policy. Absolutely no logo, brand mark, badge, plaque, label, lettering, numbers, pseudo-text, watermark, signature or QR code. No added objects, wall, floor or room.
    Avoid: wrong groove count, missing diagonal band start, extra panels, missing frame, cropped product, distorted handle or lock, decorative inlays. Native ImageGen result only.

### Template-A substitutions

Negro:

    PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to NEGRO: neutral near-black wood with subtle realistic vertical grain. Keep restrained tonal separation so the leaf, frame, grooves and edges remain legible.
    GROOVE_COUNT = FOUR

The original pixel scan subsequently confirmed five grooves. Although the negro prompt said FOUR, the generated output independently reproduced all five canonical grooves and passed native visual QA.

Wengue:

    PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to WENGUE: very dark espresso-brown wenge wood, unmistakably brown rather than black, with subtle realistic vertical grain. Keep restrained tonal separation so the leaf, frame, grooves and edges remain legible.
    GROOVE_COUNT = FIVE

Gris oscuro:

    PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to GRIS OSCURO: dark neutral gray wood, clearly lighter than black and not blue, with subtle realistic vertical grain. Keep restrained tonal separation so the leaf, frame, grooves and edges remain legible.
    GROOVE_COUNT = FIVE

Antracita:

    PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to ANTRACITA: deep cool graphite-charcoal wood, darker and cooler than neutral dark gray but still visibly lighter than pure black, with subtle realistic vertical grain. Keep restrained tonal separation so the leaf, frame, grooves and edges remain legible.
    GROOVE_COUNT = FIVE

Nogal:

    PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to NOGAL: warm medium walnut brown with natural restrained walnut grain, darker and browner than oak but clearly lighter than wenge. Keep restrained tonal separation so the leaf, frame, grooves and edges remain legible.
    GROOVE_COUNT = FIVE

Roble:

    PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to ROBLE: warm golden honey oak with subtle realistic vertical oak grain, clearly lighter and more golden than walnut and natural wood. Keep restrained tonal separation so the leaf, frame, grooves and edges remain legible.
    GROOVE_COUNT = FIVE

Gris claro, attempt 1:

    PRIMARY_REQUEST = Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to GRIS CLARO: light neutral gray wood, clearly gray rather than white, with subtle realistic vertical grain. Keep restrained tonal separation so the leaf, frame, grooves and edges remain legible against white.
    GROOVE_COUNT = FIVE

This attempt was rejected because its 833×1888 canvas had a 0.441207627 aspect ratio, 19.0716% wider than the canonical source.

## Gris claro — attempt 2 — PASS

    Use case: precise-object-edit
    Asset type: canonical e-commerce product image for the wl-d038 acoustic wooden door
    Input images: Image 1 is the sole edit target and sole reference; it is the canonical original.
    Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to GRIS CLARO: light neutral gray wood, clearly gray rather than white, with subtle realistic vertical grain.
    Critical aspect-ratio correction: the ENTIRE OUTPUT CANVAS must be an extremely tall, narrow portrait matching Image 1 at about 0.37054 width/height, approximately 763 px wide by 2060 px high. This is mandatory. Do not make a conventional 2:3 portrait, do not exceed 0.38 width/height, do not widen the door and do not add side space. The complete door and frame must almost fill this exact tall-narrow canvas.
    Architecture invariants: complete multi-step outer frame; one uninterrupted flat leaf; exactly one narrow band at handle height containing exactly FIVE close thin parallel horizontal recessed grooves. The five grooves begin just right of the hardware with the same short diagonal beveled left end and extend to the right edge. Preserve count, spacing, thickness, height and bevel. No other seams, panels or grooves.
    Hardware invariants: exactly one short straight dark-metal lever on one circular rosette on the left, and exactly one separate circular key escutcheon directly below. Preserve scale and position; no duplicate hardware.
    Composition/framing: straight-on orthographic view, near-edge-to-edge crop, complete top and side frame visible, plain white studio backdrop only in narrow margins. No zoom-out, rotation, perspective, wall, floor or room.
    Constraints: change only the finish. NO_LOGO policy. No logo, brand, badge, plaque, label, lettering, numbers, pseudo-text, watermark, signature or QR code. No added objects.
    Avoid: wrong aspect ratio; wrong groove count; missing diagonal band start; extra panels; missing frame; cropped product; distorted hardware. Native ImageGen result only.

## Natural — attempt 1 — PASS

    Use case: precise-object-edit
    Asset type: canonical e-commerce product image for the wl-d038 acoustic wooden door
    Input images: Image 1 is the sole edit target and sole reference; it is the canonical original.
    Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to NATURAL: pale neutral unfinished-looking natural wood, light beige with subtle realistic vertical grain, less golden and less saturated than oak.
    Critical aspect ratio: the entire output canvas must be an extremely tall narrow portrait matching Image 1 at about 0.37054 width/height, approximately 763 px wide by 2060 px high. Do not make a conventional 2:3 portrait, do not exceed 0.38 width/height, do not widen the door and do not add side space.
    Architecture invariants: preserve the complete multi-step outer frame and the single uninterrupted flat door leaf. Preserve exactly one narrow decorative band at handle height made from exactly FIVE close, thin, parallel horizontal recessed grooves; the grooves begin just to the right of the hardware with the same short diagonal beveled/chamfered left end and extend straight to the right edge. Preserve the groove count, spacing, thickness, bevel geometry and height. Add no other seams, panels or grooves.
    Hardware invariants: preserve exactly one short straight dark-metal lever on one circular rosette on the left, plus exactly one separate circular key escutcheon directly below. Preserve position, orientation, proportions and scale; no duplicate hardware.
    Composition/framing: straight-on orthographic catalog view, same near-edge-to-edge crop as Image 1, complete top and side frame visible. Plain white studio backdrop only in the same narrow margins. No zoom-out, widening, squashing, rotation or perspective.
    Constraints: change only the finish; preserve architecture, joinery, lighting direction and clean product-render character. NO_LOGO policy. Absolutely no logo, brand mark, badge, plaque, label, lettering, numbers, pseudo-text, watermark, signature or QR code. No added objects, wall, floor or room.
    Avoid: wrong aspect ratio, wrong groove count, missing diagonal band start, extra panels, missing frame, cropped product, distorted handle or lock, decorative inlays. Native ImageGen result only.

## Blanco — attempt 1 — PASS

    Use case: precise-object-edit
    Asset type: canonical e-commerce product image for the wl-d038 acoustic wooden door
    Input images: Image 1 is the sole edit target and sole reference; it is the canonical original.
    Primary request: Recreate exactly the same wl-d038 door from Image 1 and change only its wood finish to BLANCO: neutral white wood with subtle realistic vertical grain, neither cream nor gray. Use restrained shading so the leaf, frame and five grooves remain legible against white.
    Critical aspect ratio: the entire output canvas must be an extremely tall narrow portrait matching Image 1 at about 0.37054 width/height, approximately 763 px wide by 2060 px high. Do not make a conventional 2:3 portrait, do not exceed 0.38 width/height, do not widen the door and do not add side space.
    Architecture invariants: preserve the complete multi-step outer frame and the single uninterrupted flat door leaf. Preserve exactly one narrow decorative band at handle height made from exactly FIVE close, thin, parallel horizontal recessed grooves; the grooves begin just to the right of the hardware with the same short diagonal beveled/chamfered left end and extend straight to the right edge. Preserve the groove count, spacing, thickness, bevel geometry and height. Add no other seams, panels or grooves.
    Hardware invariants: preserve exactly one short straight dark-metal lever on one circular rosette on the left, plus exactly one separate circular key escutcheon directly below. Preserve position, orientation, proportions and scale; no duplicate hardware.
    Composition/framing: straight-on orthographic catalog view, same near-edge-to-edge crop as Image 1, complete top and side frame visible. Plain white studio backdrop only in the same narrow margins. No zoom-out, widening, squashing, rotation or perspective.
    Constraints: change only the finish; preserve architecture, joinery, lighting direction and clean product-render character. NO_LOGO policy. Absolutely no logo, brand mark, badge, plaque, label, lettering, numbers, pseudo-text, watermark, signature or QR code. No added objects, wall, floor or room.
    Avoid: wrong aspect ratio, wrong groove count, missing diagonal band start, extra panels, missing frame, cropped product, distorted handle or lock, decorative inlays, overexposure that erases geometry. Native ImageGen result only.
