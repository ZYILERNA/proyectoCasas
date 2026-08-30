# MADERAACÚSTICA/wl-s022 — direct built-in ImageGen prompt audit

All 35 audited PNGs came from 35 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

    public/images/PUERTAS/MADERAACÚSTICA/wl-s022/original.webp

Reference SHA-256 before and after the run: `a3cd0e63fea563ce10303bb980b14ef6cc8d8bce1d4639dd28a83c7f73f59613`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output, logo image or secondary image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every accepted and rejected PNG in this package is a byte-for-byte copy of its built-in ImageGen result.

This file records the operational prompt families and attempt mapping. The built-in tool did not emit a separate normalized prompt log, so these families preserve the actual requested subject, constraints and retry intent without claiming a character-for-character reconstruction of internal prompt normalization.

## Shared subject and invariant contract

~~~text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: regenerate the same wl-s022 door in {{FINISH_CLAUSE}}.
Composition/framing: preserve the original 402:1102 extremely tall narrow orthographic front view and enormous object scale. The canonical original measures RGB<245 margins [1,0,2,2]. Prefer 0-6 px on every edge and never exceed 12 px. Top contact is permitted only because the canonical source touches the top and only if the entire header is visibly intact. Do not contact the side or bottom edges; keep the complete silhouette and lower frame endpoints visible.
Geometry invariants: complete two-post square-profile outer frame; straight full top header with a beveled inner opening; dark recessed full-height reveal immediately inside the far-left post; one smooth flat slab. Preserve exactly the asymmetric seam network: one thin upper vertical seam near the left quarter, descending into one diagonal down-left segment at handle height, continuing as one lower vertical seam; exactly one horizontal branch from the angled junction to the right jamb. No extra panels, grooves, joints, glass or decoration.
Hardware invariants: exactly one short slim dark horizontal lever on one circular rosette at the left around 57% height; exactly one separate small dark key cylinder below; no visible hinges or additional hardware.
Finish invariants: change only the requested material/colour finish; retain geometry, seam placement, hardware placement, subtle wood texture, neutral lighting and straight-on catalog presentation.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, rosettes, cylinders, hinges, seams, panels, glass, decoration, room scene, people or props.
~~~

## Finish clauses

- negro: deep neutral black wood with restrained authentic grain and enough tonal separation to keep every frame edge and seam readable.
- wengue: very dark espresso-brown wenge wood with subtle near-black grain, visibly brown rather than neutral black.
- gris-oscuro: deep neutral dark-charcoal gray wood, clearly gray rather than black.
- antracita: medium-dark cool graphite/anthracite wood with restrained realistic grain.
- nogal: refined warm walnut brown with elegant darker grain, neither orange nor red.
- roble: natural medium-light warm golden oak with refined grain, beige-gold rather than orange.
- gris-claro: pale neutral cool-gray wood with clearly defined contours against white.
- natural: pale untreated natural ash/beech in light warm beige, not yellow-orange.
- blanco: bright neutral matte white wood with subtle grain and gently shadowed frame/seam contours, without gray or cream cast.

## Prompt families

### F1 — base source-faithful minimal-margin generation

The shared contract above with the finish clause substituted. It requested the whole door and frame as large as possible, a 0–6 px target, a 12 px normal maximum, pure-white background and source-faithful top contact only with an intact silhouette.

### F2 — targeted edge-gap retry

The shared contract was repeated after excessive padding or noncanonical edge contact. It explicitly requested a thin but visible side/bottom hairline, the intact lower endpoints, and no broad padding. The canonical aspect and exact one-reference rule were reiterated.

### F3 — strict aspect-lock retry

The geometry contract was repeated with an explicit `402:1102` / approximately `0.3648` width-to-height aspect lock, a very tall portrait canvas and no square or moderately portrait reinterpretation. This family was used on attempt 3 for candidates still needing framing correction.

### F4 — full-canvas percentage retry

The same invariant contract explicitly requested the intact frame to fill more than 98% of the canvas width, with the silhouette kept inside the canvas and only narrow white edge gaps. It forbade reducing the subject scale or introducing a pedestal-like bottom band.

### F5 — coordinate-lock final framing

The same contract specified approximate outside-frame coordinates: left edge around `x=0.5–1.5%`, right edge around `x=98.5–99.5%`, top around `y=0–0.5%`, and complete bottom endpoints around `y=99.4–99.8%`. Each call still used only `original.webp`. Results with noncanonical bottom/side contact or excessive padding were rejected untouched and retried by another independent ImageGen call.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | `exec-71904068-682e-403c-97d2-6d3a3cda76f8` | rejected — broad margins `[25,23,29,18]` |
| negro | 2 | F2 | `exec-b74da161-7153-411c-a823-0f455c7c0231` | rejected — left margin 14 px |
| negro | 3 | F3 | `exec-febd78f8-cb47-486b-bd66-78d5113c7899` | rejected — wrong `927x1696` aspect and broad sides |
| negro | 4 | F4 | `exec-52dac354-bee1-4585-95b1-e4acf471622b` | rejected — margins `[19,11,26,13]` |
| negro | 5 | F5 | `exec-ffd6bf3d-6329-4396-a6a3-997999711361` | rejected — noncanonical bottom contact |
| negro | 6 | F5 | `exec-1b03a90d-71b8-4149-b71f-60449138ee3b` | accepted — complete silhouette, `[10,9,12,9]` |
| wengue | 1 | F1 | `exec-78843a4e-47c8-404a-80b8-c5b107837f6e` | accepted — complete silhouette, `[10,4,12,5]` |
| gris-oscuro | 1 | F1 | `exec-988d366e-26a1-42d0-899c-ebc4aa17ee80` | rejected — noncanonical contact `[0,0,0,0]` |
| gris-oscuro | 2 | F2 | `exec-9cee0ff9-f23f-4f54-8317-f443d4acb06e` | rejected — broad margins `[42,45,42,68]` |
| gris-oscuro | 3 | F3 | `exec-0c53e329-6c94-418b-beff-fd087063508a` | rejected — wrong `924x1701` aspect and 88 px sides |
| gris-oscuro | 4 | F4 | `exec-9702dcc2-cfce-42db-b436-fabf2ee460f9` | rejected — broad margins `[52,36,54,31]` |
| gris-oscuro | 5 | F5 | `exec-4ad73227-1dcd-4a9f-96f7-abc93fb23b0f` | rejected — noncanonical bottom contact |
| gris-oscuro | 6 | F5 | `exec-40b32734-fbc5-45ee-bb32-4bcf9bb866a0` | rejected — margins `[22,12,31,26]` |
| gris-oscuro | 7 | F5 | `exec-ad10f359-ddcc-43a7-80de-7bba2d19f5b6` | rejected — noncanonical bottom contact |
| gris-oscuro | 8 | F5 | `exec-59c6905f-e6df-4a65-afa5-6e6d325ef8e1` | accepted — complete silhouette, `[8,6,9,9]` |
| antracita | 1 | F1 | `exec-7a799435-37f0-4eb9-ad24-fcf73e83c684` | rejected — noncanonical bottom contact |
| antracita | 2 | F2 | `exec-ac04332c-92fa-41e1-bd57-42dab8df4017` | accepted — complete silhouette, `[10,8,11,5]` |
| nogal | 1 | F1 | `exec-7209ca0b-833e-4267-ae14-bb72a3d3e42a` | rejected — right margin 13 px |
| nogal | 2 | F2 | `exec-6aad4450-2a2f-4352-babe-e201c3ed4a0f` | rejected — noncanonical contact `[0,0,0,0]` |
| nogal | 3 | F3 | `exec-0ba0696d-1497-4119-a9e7-a1fdacb5782f` | rejected — broad margins `[28,18,28,29]` |
| nogal | 4 | F4 | `exec-2d160c0c-905d-42e4-945f-913455b8c0b5` | rejected — side margins 15/17 px |
| nogal | 5 | F5 | `exec-078ed427-2e9b-44cb-b814-66f8898eec4b` | accepted — complete silhouette, `[5,6,10,6]` |
| roble | 1 | F1 | `exec-a9f7d1d4-7b47-4c25-bc30-9f96c00f9c2b` | rejected — margins `[14,6,18,16]` |
| roble | 2 | F2 | `exec-42fe7859-0217-4562-87f5-5a483c6b79a8` | rejected — side margins 13/16 px |
| roble | 3 | F3 | `exec-c1f8e01d-71e6-4b70-8257-b8640faba9cd` | rejected — broad margins `[40,26,44,38]` |
| roble | 4 | F4 | `exec-da60bb21-fed4-4e60-96fd-887cf7b9cfa1` | rejected — broad margins `[25,29,32,33]` |
| roble | 5 | F5 | `exec-292e5253-759a-4f47-81a8-d3f71679f8b9` | accepted — complete silhouette, `[9,3,12,4]` |
| gris-claro | 1 | F1 | `exec-4875ea8d-5369-4f2f-93d3-2a3c7cd97deb` | rejected — right 13 px and noncanonical bottom contact |
| gris-claro | 2 | F2 | `exec-08598b8c-59e3-4a1e-a97a-fe20ac5ab9f2` | rejected — broad margins `[28,26,27,26]` |
| gris-claro | 3 | F3 | `exec-d952b537-ea7e-4980-a28b-23349d2b30a4` | rejected — broad margins `[43,32,43,34]` |
| gris-claro | 4 | F4 | `exec-c656939a-9105-4610-b463-ccb3f14cdf03` | rejected — side margins 23/29 px |
| gris-claro | 5 | F5 | `exec-dc9c69b9-1d20-436d-8c67-83b800c43cc1` | accepted — complete pale silhouette, `[10,3,11,2]` |
| natural | 1 | F1 | `exec-e89a9240-c498-473f-94c7-2002559537d9` | rejected — margins `[16,4,30,17]` |
| natural | 2 | F2 | `exec-4f60870b-1e40-41a7-8c41-fff9d41c1e36` | accepted — complete silhouette, `[12,6,12,11]` |
| blanco | 1 | F1 | `exec-d174484d-60f3-414d-bb35-1303257d6786` | accepted — complete pale silhouette, `[7,3,4,3]` |

Totals: 35 independent built-in ImageGen calls, 9 accepted and 26 rejected.

## Framing and edge-contact notes

The canonical original measures `[1,0,2,2]`. It touches only the top edge; therefore top contact could be accepted only with a complete native silhouette. None of the final accepted results needed that exception: all retain a positive measured gap on all four sides. Candidates with bottom or side contact were preserved in `rejected/`, even where the complete silhouette could still be seen.

Every final margin is at or below the 12 px normal maximum. Several finishes remain above the 0–6 px ideal on one or more edges after independent retries, notably negro attempt 6 and gris-oscuro attempt 8. Those are explicitly accepted because the door fills approximately 97–99% of the measured width and more than 99% of the measured height, native inspection confirms every outer molding and lower endpoint, and further tightening repeatedly caused noncanonical contact or larger padding. No crop, resize or other postprocessing was used.

For gris-claro and blanco, the RGB<245 measurement is conservative because the finish approaches the pure-white background. Both were inspected at native detail and show the complete frame and silhouette with minimal visible border.

No file under `public/` was touched, and no accepted or rejected PNG was processed after generation.
