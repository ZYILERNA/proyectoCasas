# MADERAACÚSTICA/wl-s002 — direct built-in ImageGen prompt audit

All 16 audited PNGs came from 16 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

`public/images/PUERTAS/MADERAACÚSTICA/wl-s002/original.webp`

Reference SHA-256 before and after the run: `baec2ce7d7c23ba77e0c90a17f2298c6eb0f9fc156e9c03a537210d29e2491de`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every workspace PNG is a byte-for-byte copy of the corresponding built-in ImageGen result.

This file records the prompt families and attempt mapping. The built-in tool did not emit a separate prompt log file, so these families preserve the operational request and invariants without claiming a character-for-character reconstruction of internal prompt normalization.

## Shared subject and invariant contract

```text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: render the same wl-s002 door in {{FINISH_CLAUSE}}.
Composition/framing: front-facing, extremely tall and narrow, complete door and frame, occupying almost the entire canvas with the smallest safe white margin. Preserve the original 411:1090 proportion. Do not widen, shorten, tilt, crop or add broad padding.
Geometry invariants: preserve exactly one tall inset panel and its complete double moulding; preserve the complete layered outer frame and original bottom termination.
Hardware invariants: preserve exactly one rectangular horizontal lever on one square rosette, exactly one separate square escutcheon below, and exactly two hinges on the right, in the original count and placement.
Finish invariants: change only the requested finish; preserve geometry, grain direction, hardware, proportions, neutral lighting and straight-on catalog presentation.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, escutcheons, hinges, panels, seams, glass, inlays, decoration, room scene, people or props.
```

## Finish clauses

- `negro`: deep neutral black wood with restrained authentic vertical grain.
- `wengue`: very dark espresso-brown wenge wood with subtle near-black vertical grain, clearly brown rather than neutral black.
- `gris-oscuro`: deep neutral dark-charcoal wood, clearly gray rather than black.
- `antracita`: very dark cool graphite/anthracite wood with subtle vertical grain.
- `nogal`: refined warm walnut brown with natural darker vertical grain, neither orange nor red.
- `roble`: light-to-medium warm golden oak with realistic restrained vertical grain, clearly lighter than walnut.
- `gris-claro`: pale neutral light-gray wood with subtle cool-silver grain, distinct from white.
- `natural`: very light untreated natural wood in pale beige/sand tones with understated vertical grain.
- `blanco`: clean neutral matte white-painted wood without cream or yellow cast, retaining very subtle grain.

## Prompt families

### F1 — base compact catalog generation

The shared contract above, with the finish clause substituted. It requested the complete door with minimal white margin from the first independent call.

### F2 — tighter direct framing retry

The shared contract plus one targeted instruction: make the complete door assembly substantially larger in the canvas, reduce excess white padding to a thin safety hairline, and retain every outer moulding and the original bottom termination. Each retry again referenced only `original.webp`.

### F3 — tightened light-finish alternative

For `gris-claro`, the shared contract repeated that broad white border was a failure and requested a smaller uniform safety line while keeping the light frame distinguishable from the white background.

### F4 — native-edge light-finish alternative

For the final `gris-claro` call, the shared contract requested the original's near-edge lower termination with the complete silhouette and mouldings intact. Native inspection, not cropping or resizing, determined acceptance.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | `exec-4d3c3e60-2429-4f9e-bbaa-8fb928e07731` | rejected — broad padding |
| negro | 2 | F2 | `exec-f9fb1b07-b182-4cbb-824b-df8d9c726054` | accepted |
| wengue | 1 | F1 | `exec-b2c7e385-5964-47f5-b57d-dbbea3d7459c` | accepted |
| gris-oscuro | 1 | F1 | `exec-98d6589e-a236-4dcd-94e0-e715e555ea55` | rejected — side padding above target |
| gris-oscuro | 2 | F2 | `exec-246abb61-25bf-4f43-a0a5-e6c41315dfbc` | accepted |
| antracita | 1 | F1 | `exec-89cb5b24-9545-435a-bed5-c50338b0b5f9` | accepted |
| nogal | 1 | F1 | `exec-5553e7b9-8210-4939-8e7e-1f4f916c9f6f` | rejected — side padding above target |
| nogal | 2 | F2 | `exec-bf5e3482-0941-40a8-a15b-eb0cc5aa8b71` | accepted |
| roble | 1 | F1 | `exec-a9f62282-2152-49f8-867a-65827c3f63a9` | rejected — broad padding |
| roble | 2 | F2 | `exec-1708c2bd-27da-4740-8c62-329e5ad0c20e` | accepted |
| gris-claro | 1 | F1 | `exec-308c82bd-c626-48a9-b56c-9dfe8e0ebde7` | rejected — broad padding |
| gris-claro | 2 | F2 | `exec-9e7b59b9-9c8e-45d1-8dcb-04395fd1ef98` | rejected — padding above target |
| gris-claro | 3 | F3 | `exec-d68b67e2-f522-4326-bce2-355f086abfe4` | rejected — top/right padding just above target |
| gris-claro | 4 | F4 | `exec-7ff1a9d4-be18-4779-99d3-747cc5cccb3f` | accepted — native-complete bottom-edge exception |
| natural | 1 | F1 | `exec-990779c3-bb9b-44ae-b77c-8aadfe881f51` | accepted |
| blanco | 1 | F1 | `exec-33be226f-2de9-4961-98e9-8a457e3d2310` | accepted — native-complete bottom-edge exception |

Totals: 16 independent built-in ImageGen calls, 9 accepted, 7 rejected.

## Minimal-margin exceptions

The RGB<245 metric reports 0 px at the bottom for `gris-claro` and `blanco`. These are not cropped or resized files: native-detail inspection confirms the complete silhouette, the lower moulding and all required geometry. The canonical `original.webp` also reaches the bottom edge, so retaining these untouched ImageGen outputs is consistent with the explicit request to minimize white margins and enlarge the door.

No file under `public/` was touched, and no accepted or rejected PNG was processed after generation.
