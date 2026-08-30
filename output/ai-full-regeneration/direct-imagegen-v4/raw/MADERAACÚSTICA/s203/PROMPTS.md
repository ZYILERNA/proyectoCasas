# MADERAACÚSTICA/s203 — direct built-in ImageGen prompt and regeneration audit

The current minimal-margin correction made 27 new independent built-in ImageGen calls: 9 final acceptances and 18 preserved rejects. Nine verified outputs from the earlier run were moved byte-for-byte from the root into `_rejected` before replacement. Across both runs this package traces 36 verified built-in ImageGen calls.

Every verified call used this image as its sole reference:

    public/images/PUERTAS/MADERAACÚSTICA/s203/original.webp

Reference SHA-256 before and after the correction: `f028e24e32a1942afd35dc26223df296a4bc3cce3cadfdaaaeae48d00524e0e1`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output, logo image or secondary image was ever supplied as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. All verified PNGs are byte-for-byte workspace copies or moves of their built-in ImageGen results.

The pre-existing `rejected/negro-attempt-1.png` remains untouched but is excluded from call and byte-equality counts because its generator ID/source artifact was not recoverable.

This file records operational prompt families and attempt mapping. The built-in tool did not emit a separate normalized internal prompt log, so the descriptions preserve the actual requested subject, invariants and retry intent without claiming a character-for-character reconstruction of internal prompt normalization.

## Shared geometry and hardware contract

~~~text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the only reference and sole canonical geometry source.
Primary request: directly generate the same s203 door-and-frame in {{FINISH_CLAUSE}}, changing only material appearance.
Backdrop: pure #FFFFFF; no wall, floor, room, props, pedestal, cast shadow or perspective.
Architecture: complete thick rectangular outer casing with one broad straight top header and two straight full-height side jambs; one thin dark reveal around the leaf; one flat leaf with exactly ONE large tall centered rectangular inset/raised panel; exactly ONE continuous multi-step beveled rectangular molding and its thin outer routed rectangle; one unbroken lower leaf field.
Hardware: exactly ONE short slim dark horizontal lever pointing right from ONE compact rectangular backplate at the canonical height; exactly ONE circular lock detail integrated inside that same backplate; NO separate escutcheon/cylinder, no extra handle, no extra lock hardware and no protruding added hinges.
Composition: preserve the 448:997 tall straight-on silhouette. Keep every outer corner, header edge and jamb endpoint complete.
NO_LOGO: no WONLY logo, brand, badge, plaque, watermark, text, letters, numbers, signature, microtext or pseudotext.
Avoid: extra panels, seams, grooves, ornament, glass, logos, separate cylinders, extra handles, room scenes or props.
~~~

## Finish clauses

- negro: deep neutral black wood with subtle restrained grain and readable molded relief.
- wengue: very dark espresso-brown wenge wood with subtle near-black grain, visibly brown rather than neutral black.
- gris-oscuro: refined deep charcoal-gray wood with subtle realistic grain, clearly gray rather than pure black.
- antracita: very dark cool-neutral anthracite wood with restrained grain and readable relief.
- nogal: refined warm walnut-brown wood with elegant darker grain, neither orange nor red.
- roble: natural light-to-medium warm honey-beige oak with authentic restrained grain, not orange.
- gris-claro: pale neutral cool-gray wood with restrained grain and complete contours against white.
- natural: pale untreated natural ash/beech wood in light warm beige, not yellow-orange.
- blanco: clean white-painted wood with barely visible fine grain and shallow relief against pure white, without an artificial outline.

## Prompt families

### F0 — previous verified direct generation, now superseded

The nine earlier direct ImageGen outputs preserved the model and finishes but measured 13–27 px on at least one RGB<245 edge. The new user rule invalidated them as root acceptances. They were moved individually and byte-for-byte to `_rejected/legacy-accepted-...` before any root replacement. Their original generator artifacts remain under `C:/Users/zhen/.codex/generated_images/01a048aa-f626-77e1-b70b-645644e26d83`.

### F1 — initial maximum-scale correction (attempt 2)

The shared contract requested the complete assembly almost tangent to the canvas, 2–5 actual output pixels on each edge, about 99% width and height fill, pure white backdrop and no crop. All nine preserved geometry, but at least one measured edge remained 14–26 px; all were rejected and preserved.

### F2 — deliberate overscale / normalized-coordinate correction (attempt 3)

The same original-only contract explicitly asked to enlarge the complete assembly about 4% relative to the prior rendering, aim for 0–2 px, never more than 6, and span normalized coordinates approximately x=0.002..0.998 and y=0.001..0.999. All nine still had at least one edge over 12 px and were preserved as rejects.

### F3 — door-bounding-box tangent lock (attempt 4)

The final independent family explicitly distinguished the door object's bounding box from the white padding in the reference. It requested the intact casing boundary tangent to all four canvas edges, 100% width/height fill, no visible white mat and no part extending beyond the canvas. Native inspection was the gate for accepting contact. All nine passed: seven measure `[0,0,0,0]`, roble `[0,0,2,0]`, and blanco `[12,12,10,0]` under the conservative RGB245 pale-finish threshold.

## Complete verified attempt mapping

| Finish | Attempt | Family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F0 | `exec-c8aca54a-fa63-46f8-a0f1-3ad356f39666` | superseded — `[23,26,16,17]` |
| wengue | 1 | F0 | `exec-f22661bd-c19d-4a34-b99f-f5b4b6ca079a` | superseded — `[20,24,18,15]` |
| gris-oscuro | 1 | F0 | `exec-83b850ac-e296-449f-8e95-c95f76c4738d` | superseded — `[22,24,21,18]` |
| antracita | 1 | F0 | `exec-34975a9e-89e2-4e3e-9811-1edc09a8f8e4` | superseded — `[23,24,21,17]` |
| nogal | 1 | F0 | `exec-b5a90655-724d-440d-a59f-b68be961baca` | superseded — `[23,24,18,13]` |
| roble | 1 | F0 | `exec-ac49dc99-0816-4ebd-aafa-fdad00c92920` | superseded — `[23,27,22,17]` |
| gris-claro | 1 | F0 | `exec-ae6ae3b3-af6e-45e6-aaa3-ff1252b51282` | superseded — `[23,25,19,17]` |
| natural | 1 | F0 | `exec-f787a45d-2b40-48f0-a89e-5488a85e9a00` | superseded — `[23,27,21,17]` |
| blanco | 1 | F0 | `exec-8af401b7-2915-4969-95e7-20a745408639` | superseded — `[24,26,23,16]` |
| negro | 2 | F1 | `exec-16995c62-8639-4a92-a20f-a9e1b2fbb4b1` | rejected — `[16,14,16,10]` |
| wengue | 2 | F1 | `exec-b2788c9a-3278-477f-af44-9d4a285bc49b` | rejected — `[21,21,18,11]` |
| gris-oscuro | 2 | F1 | `exec-6b659590-4c8e-4083-9777-ed8997282395` | rejected — `[19,20,17,11]` |
| antracita | 2 | F1 | `exec-32fcfe04-b259-45b8-8cab-3d22e41dc0e4` | rejected — `[17,17,18,14]` |
| nogal | 2 | F1 | `exec-a253711d-c0d9-43a8-9aa3-4ef3ee6707d1` | rejected — `[19,21,22,11]` |
| roble | 2 | F1 | `exec-d633dfe7-4e6a-4bef-a0e0-36d0bc237a37` | rejected — `[23,25,22,16]` |
| gris-claro | 2 | F1 | `exec-b4cab019-eda0-4ddb-80f4-96e0e03fd07f` | rejected — `[17,17,18,11]` |
| natural | 2 | F1 | `exec-a514dbfe-4bb0-4a5a-a209-ffeb7a0a65c3` | rejected — `[20,26,22,17]` |
| blanco | 2 | F1 | `exec-9ee35d13-da81-429d-b2a3-c551cd574092` | rejected — `[24,26,26,17]` |
| negro | 3 | F2 | `exec-a5c58fd8-6ba7-4e17-bde7-f7c28b7edb61` | rejected — `[15,11,17,10]` |
| wengue | 3 | F2 | `exec-db236252-34c1-4e52-b574-e38d33dc8f1d` | rejected — `[16,11,17,10]` |
| gris-oscuro | 3 | F2 | `exec-76ad4d0f-dbd2-443c-809e-39514e00ea6b` | rejected — top 16 px, `[12,16,11,0]` |
| antracita | 3 | F2 | `exec-d0e9354d-5ad5-4b8c-ab2d-c921efc25130` | rejected — `[20,17,17,14]` |
| nogal | 3 | F2 | `exec-74718b7c-7b00-481e-a83e-9465b8b2801a` | rejected — `[18,13,15,10]` |
| roble | 3 | F2 | `exec-86823e8d-fa12-493d-adef-063f28928d20` | rejected — `[18,19,24,14]` |
| gris-claro | 3 | F2 | `exec-f2ece62d-33fe-4353-8e6e-829750cb1cef` | rejected — `[22,20,22,16]` |
| natural | 3 | F2 | `exec-d3ed52a5-0029-4dcd-9550-2fa5326a942b` | rejected — `[20,24,19,14]` |
| blanco | 3 | F2 | `exec-2b320b76-1d5a-4ebe-b6de-ae73844fcc1a` | rejected — `[20,12,15,3]` |
| negro | 4 | F3 | `exec-2ce1af34-b4dd-4d23-b405-bdc6de76c09e` | accepted — `[0,0,0,0]`, complete tangent silhouette |
| wengue | 4 | F3 | `exec-18f22403-4885-4883-985c-3be1c3a54e14` | accepted — `[0,0,0,0]`, complete tangent silhouette |
| gris-oscuro | 4 | F3 | `exec-4940e375-aaf5-49ec-b28b-1e2d58a22428` | accepted — `[0,0,0,0]`, complete tangent silhouette |
| antracita | 4 | F3 | `exec-4dc8106c-3243-4137-934a-f6914e00d5d3` | accepted — `[0,0,0,0]`, complete tangent silhouette |
| nogal | 4 | F3 | `exec-86f1ac5c-ace8-40d6-9bf2-2d33bf81cad8` | accepted — `[0,0,0,0]`, complete tangent silhouette |
| roble | 4 | F3 | `exec-6241996e-2aff-400e-bb0f-e1f81ed6fe5c` | accepted — `[0,0,2,0]`, complete silhouette |
| gris-claro | 4 | F3 | `exec-bc1bca1d-a05c-46ea-bb67-be70177b14dc` | accepted — `[0,0,0,0]`, complete pale tangent silhouette |
| natural | 4 | F3 | `exec-9324d64f-ec34-4f3d-a929-a0189b4bed29` | accepted — `[0,0,0,0]`, complete tangent silhouette |
| blanco | 4 | F3 | `exec-271cb015-7d03-4cd6-894f-ea3e5caab7c8` | accepted — `[12,12,10,0]`, complete white frame; conservative RGB245 threshold |

Totals: 36 verified independent built-in ImageGen calls across history, comprising 9 superseded previous acceptances, 18 current rejects and 9 current acceptances. One unverified pre-existing reject is preserved separately and excluded.

## Native-inspection notes

Contact at 0 px is intentional under the current rule and is not evidence of a crop. Native-detail inspection confirms that the seven all-edge tangent assets retain all four outside corners, the full top header, both full-height side jambs and both lower endpoints. Roble retains the same full structure with 2 px on the right. Blanco retains a complete pale frame and measures no more than 12 px on any RGB245 edge.

Every accepted finish preserves exactly one tall centered panel with one continuous multi-step beveled molding and thin outer routed rectangle, exactly one lever/backplate assembly with one circular lock detail inside it, no separate escutcheon, no extra hardware, no logo, no text and no pseudotext.

No file under `public/` was modified. No accepted or rejected PNG was filtered, recolored by script, masked, cropped, resized, composited or converted after generation.
