# MADERAACÚSTICA/wl-d017 — direct built-in ImageGen prompt audit

All 34 current-audit PNGs came from 34 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

`public/images/PUERTAS/MADERAACÚSTICA/wl-d017/original.webp`

Reference SHA-256 before and after the run: `b20730b02c46a6541375f99a942e02104eca4707c7476697804c3436d438b98d`.

Literal prompt source for attempts 6–8: `C:/Users/zhen/.codex/sessions/2026/08/29/rollout-2026-08-29T18-04-53-01a04e44-4a5a-7f91-b736-408565f5fe05.jsonl`, using each `image_generation_end.revised_prompt` value. Prompt SHA-256 values are `3b8e7e915b6861f7109b3461a13f4ecb1a787d6b216a80751bb6bca4c0c6aeed`, `e0b3e65fc05be5b165a5c42dffd72c3fadc77b6ac29af4f4ac9cc3fb32498b0a` and `ff0b3781ed3621d4674ac7a1e867e93091bab02f44459d08899e3f50bc7a33ea` respectively.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every PNG in the current audit is a byte-for-byte copy of the corresponding built-in ImageGen result.

This file records the prompt families and their attempt mapping. The built-in tool did not emit a separate prompt log file, so the families below preserve the operational request and invariants without claiming a character-for-character reconstruction of internal prompt normalization.

## Shared subject and invariant contract

```text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: render the same wl-d017 door in {{FINISH_CLAUSE}}.
Composition/framing: front-facing, extremely tall and narrow, complete door and frame, occupying virtually the entire canvas with the smallest possible white safety margin. Preserve the original 409:1095 proportion. Do not widen, shorten, tilt, crop or add broad padding.
Geometry invariants: preserve the complete outer frame and mouldings, the narrow dark strip at the far left, exactly one blue-gray vertical line with its characteristic angular deviation, and exactly one horizontal joint.
Hardware invariants: preserve exactly one horizontal lever and exactly one separate key cylinder in the original position and count.
Finish invariants: change only the requested finish; preserve geometry, grain direction, hardware, proportions, lighting and straight-on catalog presentation.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, cylinders, seams, lines, panels, glass, inlays, decoration, room scene, people or props.
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

The shared contract above, with the finish clause substituted. It requested the complete silhouette with minimal white margin from the first direct generation.

### F2 — tighter direct framing retry

The shared contract plus one targeted instruction: make the complete door assembly substantially larger in the canvas; reduce white padding to a very thin hairline; retain every outer moulding and the original bottom termination. This was always a new ImageGen call from `original.webp`.

### F3 — compact-framing alternative

The shared contract plus a stronger reminder that broad white border is a failure and that the complete assembly should fill approximately 98–100% of the usable height. No crop or resize was requested or applied.

### F4 — native-edge fill alternative

The shared contract plus direct edge-termination guidance: reproduce the canonical original's near-edge presentation, keep the complete silhouette and mouldings, and minimize background even when the outer frame visually terminates at the canvas edge. Native inspection, not a scripted transformation, determined acceptance.

### F5 — visible-hairline alternative

After a native-complete F4 result, one further independent alternative requested a tiny visible safety hairline while keeping the door equally large. These four alternatives produced substantially broader padding, so the prior native-complete F4 results were retained.

### F6 — blanco attempt 6, literal built-in ImageGen prompt

The following prompt is preserved verbatim from the built-in ImageGen call. Image 1 was the canonical `original.webp` only.

```text
Use case: product-mockup.
Asset type: e-commerce acoustic-door catalog variant.
Input image: Image 1 is the sole canonical geometry and composition reference.
Primary request: Recreate exactly the same wl-d017 door shown in Image 1, changing only the door and frame finish to clean neutral matte white-painted wood, without cream or yellow cast and with only very subtle natural wood texture.
Composition/framing: strict straight-on orthographic catalog view; preserve the source's extremely tall, very narrow 409:1095 width-to-height proportion (approximately 0.3735), never a conventional or wider door ratio. Show the complete outer frame, header, both jambs, lower endpoints, door leaf and reveal. Make the complete assembly occupy virtually the entire canvas: pure white background margin ideally 2–6 pixels on left, top and right, 0–4 pixels at bottom, and never more than 12 pixels on any edge. Do not crop any corner, moulding, reveal, jamb or lower endpoint.
Geometry invariants: preserve the complete stepped rectangular outer frame and top header; preserve the deep narrow dark reveal strip at the far left; preserve exactly one thin blue-gray vertical decorative line near the left side, including its original characteristic angular deviations around the hardware area; preserve exactly one thin horizontal joint extending across the leaf at handle height. Keep the plain slab surface. Do not add panels, grooves, extra lines, glass, windows, inlays or decoration.
Hardware invariants: preserve exactly one dark horizontal lever handle on the left and exactly one separate dark round key cylinder immediately below it, in the original positions and count. No other hardware.
Lighting/style: clean photorealistic studio product image, restrained soft shading, no floor, no room, no props.
NO_LOGO: the canonical source has no WONLY logo. Add no logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext anywhere.
Critical constraints: use only Image 1 as reference; change only finish and direct AI-generated framing; preserve geometry, proportions, hardware, line count and locations. No broad white padding. No cropping. No redesign.
```

### F7 — blanco attempt 7, literal built-in ImageGen prompt

The following prompt is preserved verbatim from the built-in ImageGen call. Image 1 was the canonical `original.webp` only.

```text
Use case: product-mockup.
Asset type: e-commerce acoustic-door catalog variant.
Input image: Image 1 is the sole canonical geometry and composition reference.
Primary request: Recreate exactly the same wl-d017 door shown in Image 1, changing only the door and frame finish to clean neutral matte white-painted wood, without cream or yellow cast and with only very subtle natural wood texture.
Geometry invariants: preserve the complete stepped rectangular outer frame and header, both jambs and both lower endpoints; preserve the deep narrow dark reveal strip at the far left; preserve exactly one thin blue-gray vertical decorative line near the left side with its original angular deviations around the hardware; preserve exactly one thin horizontal joint at handle height; retain the plain slab. No extra panels, grooves, lines, glass, windows, inlays or decoration.
Hardware invariants: exactly one dark horizontal lever on the left and exactly one separate dark round key cylinder below it, in the source position and count. No other hardware.
Ratio: strict straight-on extremely tall and narrow 409:1095 width-to-height proportion, approximately 0.3735. Never widen or shorten the door.
Lighting/style: clean photorealistic studio catalog image on a pure white background, no floor, room, people or props.
NO_LOGO: the canonical source has no logo. Add no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Critical: use only Image 1; change only finish and direct AI-generated framing. Preserve every structural and hardware detail.
Framing revision: generate the complete assembly substantially larger than the prior catalog framing. Place the outermost visible left and right frame edges only 1–4 pixels from the canvas edges, the complete header only 1–4 pixels from the top, and the complete lower endpoints 0–3 pixels from the bottom. The white background must be only a tiny hairline. More than 10 pixels of background on any edge is a failure. Keep all four outer corners, moulding profiles, reveals and bottom endpoints fully visible; do not crop.
```

### F8 — blanco attempt 8, literal built-in ImageGen prompt

The following prompt is preserved verbatim from the built-in ImageGen call. Image 1 was the canonical `original.webp` only.

```text
Use case: product-mockup.
Asset type: e-commerce acoustic-door catalog variant.
Input image: Image 1 is the sole canonical geometry and composition reference.
Primary request: Recreate exactly the same wl-d017 door shown in Image 1, changing only the door and frame finish to clean neutral matte white-painted wood, without cream or yellow cast and with only very subtle natural wood texture.
Geometry invariants: preserve the complete stepped rectangular outer frame and header, both jambs and both lower endpoints; preserve the deep narrow dark reveal strip at the far left; preserve exactly one thin blue-gray vertical decorative line near the left side with its original angular deviations around the hardware; preserve exactly one thin horizontal joint at handle height; retain the plain slab. No extra panels, grooves, lines, glass, windows, inlays or decoration.
Hardware invariants: exactly one dark horizontal lever on the left and exactly one separate dark round key cylinder below it, in the source position and count. No other hardware.
Ratio: strict straight-on extremely tall and narrow 409:1095 width-to-height proportion, approximately 0.3735. Never widen or shorten the door.
Lighting/style: clean photorealistic studio catalog image on a pure white background, no floor, room, people or props.
NO_LOGO: the canonical source has no logo. Add no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Critical: use only Image 1; change only finish and direct AI-generated framing. Preserve every structural and hardware detail.
Framing revision: reproduce the canonical original's near-edge termination. The complete outer frame should almost touch both vertical canvas edges and the header should almost touch the top, leaving approximately 0–3 pixels of pure-white safety margin. The frame must occupy at least 99% of the usable width and height. Broad padding is a failure. Preserve the full uncropped outer silhouette, all header corners, both jamb profiles, reveal and both bottom endpoints.
```

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | `exec-df14eb58-6aca-462a-8cd6-580753497ba7` | rejected — excess side padding |
| negro | 2 | F2 | `exec-0e1a524a-74d3-475f-a643-5ff30fc7cc1e` | accepted |
| wengue | 1 | F1 | `exec-c502bee6-cc2c-4dae-a7e7-0af745d275e6` | rejected — side padding above target |
| wengue | 2 | F2 | `exec-01cf3b96-4dd8-456b-b353-71661c1a4ebd` | accepted after native-complete review |
| wengue | 3 | F3 | `exec-852fcb8c-3131-4dae-8915-ebaa2fd6cfb6` | rejected — left padding above target |
| wengue | 4 | F4 | `exec-a1de07f6-b0e3-438f-8040-cca809756e9f` | rejected — attempt 2 remained tighter |
| gris-oscuro | 1 | F1 | `exec-f4e4a3f0-f412-4b87-a998-3d117fb574fc` | accepted |
| antracita | 1 | F1 | `exec-6441a438-3020-4fa3-aad7-cf2b6fc84b82` | rejected — side padding above target |
| antracita | 2 | F2 | `exec-d575cb29-c936-4c6a-97ac-9367630eac3e` | accepted after native-complete review |
| nogal | 1 | F1 | `exec-070ea00f-ef30-44d0-bbc3-7da46e0faf29` | rejected — broad padding |
| nogal | 2 | F2 | `exec-2ea938cb-5178-499f-af2c-1d6300139f59` | accepted |
| roble | 1 | F1 | `exec-278d63ac-22b0-41dd-9aab-c6c93ddc6bcb` | rejected — broad padding |
| roble | 2 | F2 | `exec-18926ee6-c700-4589-aa96-c2db2c42ba1e` | rejected — padding above target |
| roble | 3 | F3 | `exec-abe99ae1-076c-46f6-9274-4074330472a7` | rejected — broad padding |
| roble | 4 | F4 | `exec-20394351-21d8-4d73-9667-e672a4eb6516` | accepted — native-complete edge exception |
| roble | 5 | F5 | `exec-ad5340cf-31b4-471a-be08-bb6d6c69205f` | rejected — broad padding introduced |
| gris-claro | 1 | F1 | `exec-5d941720-8f25-4ddc-a5b5-f29cf95a4b98` | rejected — broad padding |
| gris-claro | 2 | F2 | `exec-0ebd9815-8c8b-4ee6-959b-883ae60b1b36` | rejected — padding above target |
| gris-claro | 3 | F3 | `exec-fc3e61ac-fec4-4708-9578-f947da3e266e` | rejected — broad padding |
| gris-claro | 4 | F4 | `exec-064e3294-af87-4ab9-b252-6303bb9f6420` | accepted — native-complete light-threshold edge exception |
| gris-claro | 5 | F5 | `exec-7e3d5e04-8f19-4b2d-829f-23bfe314cd80` | rejected — broad padding introduced |
| natural | 1 | F1 | `exec-bc661edc-ed92-405f-8804-092420692d4e` | rejected — broad padding |
| natural | 2 | F2 | `exec-2f5a0253-bded-4df7-bb3a-90c621a26131` | rejected — side padding above target |
| natural | 3 | F3 | `exec-8ea628d0-f978-42dd-8c59-8cb64f1bb2e4` | rejected — side padding above target |
| natural | 4 | F4 | `exec-ea0afcba-7ebc-4535-b233-cf026e1f79d2` | accepted — native-complete edge exception |
| natural | 5 | F5 | `exec-47ce9420-9ef6-4292-b88f-8439a14f7885` | rejected — broad padding introduced |
| blanco | 1 | F1 | `exec-e9df713f-b833-415b-bfb8-e51c71a30bc4` | rejected — broad padding |
| blanco | 2 | F2 | `exec-0f3c87fd-f191-44ce-972a-9cf652eacd87` | rejected — side padding above target |
| blanco | 3 | F3 | `exec-84f714ea-ecff-4261-841d-cdf2d90dbaad` | rejected — broad padding |
| blanco | 4 | F4 | `exec-c7d96a49-81e7-4471-8365-88fc202e163d` | rejected after policy revision — 13 px sides exceed the absolute ceiling |
| blanco | 5 | F5 | `exec-f95cba29-9c11-4cc8-9712-0fbdf25ee882` | rejected — very broad padding introduced |
| blanco | 6 | F6 | `exec-ad081d33-d6f4-431e-bce1-514186fde879` | rejected — 13 px left and right |
| blanco | 7 | F7 | `exec-48a18f10-5cb6-4d31-b97d-4df7413d42f4` | rejected — 15 px left and 13 px right |
| blanco | 8 | F8 | `exec-186e6ee6-0ebd-4d01-8ec1-2b2d4ecf5317` | accepted — `[12,12,12,3]`, complete native silhouette |

Totals: 34 independent built-in ImageGen calls, 9 accepted, 25 rejected.

## Minimal-margin exceptions

The RGB<245 metric reports one or more 0 px edges for `negro`, `wengue`, `antracita`, `roble`, `gris-claro`, `natural` and `blanco`. These are not crops: after direct alternatives, native-detail inspection confirms the complete silhouette, mouldings and original edge termination. Retaining these untouched ImageGen outputs follows the explicit requirement to minimize white border and enlarge the door.

For `blanco`, attempt 8 meets the same absolute ceiling as every other finish: `[12,12,12,3]`. Native-detail inspection confirms the complete header corners, jamb profiles, reveal and lower endpoints without any post-generation crop or resize.

## Legacy preservation

Nine prior root PNGs and two prior rejected PNGs were preserved under `_legacy-postprocessed/accepted/` and `_legacy-postprocessed/rejected/`. They are excluded from the 31-call direct-ImageGen audit because they were not byte-identical to the built-in generator files. Nothing was deleted, and no file under `public/` was touched.
