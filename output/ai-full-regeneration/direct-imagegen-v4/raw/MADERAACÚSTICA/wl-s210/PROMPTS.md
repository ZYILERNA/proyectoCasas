# MADERAACÚSTICA/wl-s210 — direct built-in ImageGen prompt audit

All 20 audited PNGs came from 20 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

    public/images/PUERTAS/MADERAACÚSTICA/wl-s210/original.webp

Reference SHA-256 before and after the run: `4c2f34ce063abde62e5928e2245e2e2c54a7a873175ae8f2f42817f2dfe343fe`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output, logo image or secondary image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every accepted and rejected PNG in this package is a byte-for-byte copy of its built-in ImageGen result.

This file records the operational prompt families and attempt mapping. The built-in tool did not emit a separate normalized prompt log, so these families preserve the requested subject, constraints and retry intent without claiming a character-for-character reconstruction of internal prompt normalization.

## Shared subject and invariant contract

~~~text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: regenerate the exact same wl-s210 door in {{FINISH_CLAUSE}}.
Scene/backdrop: pure clean white; no wall, floor line, room, props, external cast shadow, pedestal or perspective.
Composition/framing: preserve the canonical 424:1063 extremely tall narrow straight-on view and enormous object scale. The source measures RGB<245 margins [4,2,4,0]. Prefer 0-6 px and normally never exceed 12 px. Edge contact is permitted only where it is canonical or near-canonical and every molding, post endpoint and the full silhouette remain complete. Never crop the silhouette.
Geometry invariants: complete two slim square-profile full-height outer posts; straight layered horizontal top header; one very dark full-height recessed reveal immediately inside the left post; asymmetric leaf/stile placement and broad right vertical field; exactly ONE tall central inset rectangular panel occupying most of the leaf; outer stepped/double raised rectangular molding with four right-angle corners; exactly ONE thin warm gold/brass complete rectangular inlay; one uninterrupted flat central field; broad bottom rail; vertical grain on panel/stiles and horizontal grain on rails/header.
Hardware invariants: exactly ONE short slim dark antique-style horizontal lever pointing right from ONE circular rosette around 58% height; exactly ONE separate small circular dark key escutcheon/cylinder below; no visible hinges or additional hardware.
Finish invariants: change only the requested finish appearance; retain all proportions, reveal, panel topology, gold inlay, hardware placement, neutral lighting and camera alignment.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, rosettes, cylinders, hinges, panels, seams, grooves, glass, ornament, baseboard, room scene, props, people or secondary objects.
~~~

## Finish clauses

- negro: deep neutral black wood with restrained realistic grain and enough separation to keep every molding readable.
- wengue: very dark espresso-brown wenge wood with subtle near-black grain, visibly brown rather than neutral black.
- gris-oscuro: refined very dark charcoal-gray wood with subtle realistic grain, clearly gray rather than black.
- antracita: very dark cool-neutral anthracite wood with restrained grain and readable molded relief.
- nogal: refined warm walnut-brown wood with elegant darker grain, neither orange nor red.
- roble: natural light-to-medium warm honey-beige oak with authentic restrained grain, not orange.
- gris-claro: pale neutral cool-gray wood with restrained grain and complete contours against white.
- natural: pale untreated natural ash/beech wood in light warm beige, not yellow-orange.
- blanco: clean white-painted wood with barely visible fine grain and natural shallow relief against pure white, without an artificial outline.

## Prompt families

### F1 — base maximum-scale generation

The shared invariant contract above with the finish clause substituted. The first call for each finish requested the complete frame at maximum safe scale, canonical 424:1063 proportions, 0–6 px preferred clearance, 12 px normal maximum, exact one-panel/gold-inlay topology and source-faithful bottom contact only with an intact silhouette.

### F2 — targeted minimal-gap retry

The full source geometry and hardware contract was repeated after any measured edge exceeded 12 px. These independent retries requested canonical placement rather than a centered white mat, a complete assembly close to the canvas edges and no structural redesign. Only `original.webp` was supplied again.

### F3 — strict coordinate and fill retry

The same invariants were repeated with the outer frame targeted to approximately 2–5 px left/top/right and 0–2 px bottom, at least 98.75% canvas-width and 99.6% canvas-height fill, while keeping every molding and frame endpoint complete. Wengue and nogal passed this family; gris-oscuro remained too narrow.

### F4 — final canonical placement lock

The gris-oscuro-only fourth call again used only the original and explicitly locked the complete assembly to the reference's near-edge placement and 424:1063 silhouette ratio. It requested about 2–5 px left/top/right and 0–2 px bottom, no white mat, at least 98.75% width and 99.6% height fill, while preserving the one panel, double molding, gold inlay, dark left reveal, one lever, one cylinder and no hinges. It passed at `[12,3,12,0]` after native inspection confirmed the full silhouette.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | `exec-601dcbc7-47e3-4a5c-83ba-900bb82dd5ff` | accepted — complete frame, `[12,4,9,0]`, canonical bottom contact |
| wengue | 1 | F1 | `exec-4629df4b-8b27-4757-85c2-cf73afe5dcaf` | rejected — left margin 13 px |
| gris-oscuro | 1 | F1 | `exec-e7c973c6-e0ae-4231-aa8b-6451ea00fdeb` | rejected — right margin 13 px |
| antracita | 1 | F1 | `exec-40eea0fb-1cf4-416c-ac23-97dd7c4b113c` | accepted — complete frame, `[11,5,11,0]`, canonical bottom contact |
| nogal | 1 | F1 | `exec-4376a68f-3706-44cc-9de2-f842e21e454a` | rejected — side margins `[14,15]` |
| roble | 1 | F1 | `exec-007b0a89-6f25-4927-ad25-1f22b4e5e80f` | rejected — left margin 13 px |
| gris-claro | 1 | F1 | `exec-dee5af2d-9fb3-47d9-bc97-2835936983ed` | rejected — broad `[16,11,23,17]` padding |
| natural | 1 | F1 | `exec-f95260df-11b0-4595-bb57-939e5783f3dd` | rejected — side margins `[14,14]` |
| blanco | 1 | F1 | `exec-4af8827e-7b43-4311-aaf7-29513f90f768` | rejected — side margins `[15,17]` |
| wengue | 2 | F2 | `exec-37afd464-21f3-4dd5-b3b4-ea459d14b971` | rejected — left margin 16 px |
| gris-oscuro | 2 | F2 | `exec-dab51da2-f51e-40e2-b9c8-55bbcd5bcd04` | rejected — side margins `[17,13]` |
| nogal | 2 | F2 | `exec-f23df596-e008-48e6-a6f6-672b8c4a9f4a` | rejected — side margins `[16,15]` |
| roble | 2 | F2 | `exec-87e64dfc-3444-4169-a84b-27093d4db331` | accepted — complete frame, `[12,2,12,0]` |
| gris-claro | 2 | F2 | `exec-ac4d0c60-9afd-48c6-84b7-dcc7ec4bb542` | accepted — complete pale frame, `[12,5,10,3]` |
| natural | 2 | F2 | `exec-d9a42b22-4303-4857-a894-6c912a752268` | accepted — complete frame, `[11,3,11,0]`, canonical bottom contact |
| blanco | 2 | F2 | `exec-d0589693-cc93-45ed-bb71-59b8c44dd196` | accepted — complete pale frame, `[12,2,11,1]` |
| wengue | 3 | F3 | `exec-05e2d14f-6f39-444a-aec6-87bc56ed10f6` | accepted — complete frame, `[12,3,11,0]`, canonical bottom contact |
| gris-oscuro | 3 | F3 | `exec-54405683-2de6-45a8-9e46-64d34d7d2dd2` | rejected — side margins `[15,16]` |
| nogal | 3 | F3 | `exec-d3536348-8059-4574-a2af-2cd9c1f8dc19` | accepted — complete frame, `[10,0,11,0]`, near-canonical top and canonical bottom contact |
| gris-oscuro | 4 | F4 | `exec-ea85abc2-0e16-48fd-9a16-713cc677209e` | accepted — complete frame, `[12,3,12,0]`, canonical bottom contact |

Totals: 20 independent built-in ImageGen calls, 9 accepted and 11 rejected.

## Framing and native-inspection notes

The source itself measures `[4,2,4,0]`, so bottom contact is canonical. Negro, wengue, gris-oscuro, antracita, roble and natural retain that bottom contact. Nogal measures `[10,0,11,0]`; its top contact is only two pixels closer than the source. Native-detail inspection confirms the complete header, both outer posts, both lower endpoints, all moldings and the full silhouette in every accepted contact case.

All nine accepted images stay at or below the normal 12 px RGB<245 maximum. Gris-claro and blanco are also inspected visually because their pale outer wood can approach the RGB245 threshold; both retain a minimal visible border and complete contours.

Native-detail QA confirms exactly one tall central inset panel, one outer stepped/double raised rectangular molding, one complete thin gold/brass rectangular inlay, one dark full-height left reveal, one horizontal lever on one circular rosette, one separate circular cylinder, no visible hinges, and no logo, text or pseudotext in every accepted finish.

No file under `public/` was touched, and no accepted or rejected PNG was processed after generation.
