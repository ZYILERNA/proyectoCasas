# MADERAACÚSTICA/wl-s016 — direct built-in ImageGen prompt audit

All 15 audited PNGs came from 15 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

    public/images/PUERTAS/MADERAACÚSTICA/wl-s016/original.webp

Reference SHA-256 before and after the run: bfc7b7630b661e385f0e217ac8837ab3c5debc00855ecf9c066c606c47acc657.

Policy: NO_LOGO_MINIMAL_WHITE_MARGIN. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every workspace PNG is a byte-for-byte copy of the corresponding built-in ImageGen result.

This file records the prompt families and attempt mapping. The built-in tool did not emit a separate normalized prompt log, so these families preserve the operational request and invariants without claiming a character-for-character reconstruction of internal prompt normalization.

## Shared subject and invariant contract

~~~text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: regenerate the same wl-s016 door in {{FINISH_CLAUSE}}.
Composition/framing: preserve the original 400:1068 extremely tall narrow orthographic view and enormous object scale. The canonical original measures RGB<245 margins [0,4,0,0]. Left/right/bottom contact is permitted only with the full silhouette and every molding intact; preserve a small visible top gap. Prefer 0-6 px at source-contact edges and 2-6 px at top; never exceed 12 px.
Geometry invariants: complete two-post outer frame; straight layered/beveled top header; dark recessed full-height reveal immediately inside the far-left post; one flat slab leaf divided by exactly one horizontal joint around 70% height; pronounced HORIZONTAL grain on the large upper section and VERTICAL grain on the smaller lower section; no decorative panels, extra grooves, extra joints or glass.
Hardware invariants: exactly one short slim horizontal lever on one circular rosette at the left around 57% height; exactly one separate circular key cylinder below; no visible hinges or additional hardware.
Finish invariants: change only the requested finish; preserve geometry, grain-direction transition, hardware placement, neutral lighting and straight-on catalog presentation.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, rosettes, cylinders, hinges, seams, panels, glass, decoration, room scene, people or props.
~~~

## Finish clauses

- negro: deep neutral black wood with restrained authentic grain and enough tonal separation to keep the frame readable.
- wengue: very dark espresso-brown wenge wood with subtle near-black grain, visibly brown rather than neutral black.
- gris-oscuro: deep neutral dark-charcoal gray wood, clearly gray rather than black.
- antracita: medium-dark cool graphite/anthracite wood with restrained realistic grain.
- nogal: refined warm walnut brown with elegant darker grain, neither orange nor red.
- roble: natural medium-light warm golden oak with refined grain, beige-gold rather than orange.
- gris-claro: pale neutral cool-gray wood with clearly defined edges against white.
- natural: pale untreated natural ash/beech in light warm beige, not yellow-orange.
- blanco: bright neutral matte white wood with subtle grain and gently shadowed molding contours, without a gray or cream cast.

## Prompt families

### F1 — base minimal-margin catalog generation

The shared contract above with the finish clause substituted. It requested the complete object as large as possible, a 0–6 px target, a 12 px normal maximum, pure white background and source-faithful edge contact only with an intact silhouette.

### F2 — tighter framing retry

The shared contract was repeated after an excessive-margin result, with an explicit instruction to scale the complete door and frame up, remove broad padding, and keep the outer silhouette 0–6 px from the canvas edges without cropping. Nogal attempt 3 additionally emphasized no more than 6 px on the left.

### F3 — aggressive white framing correction

For blanco attempt 2, the white-finish contract strongly emphasized 0–6 px on every side. The result remained untouched and was rejected despite its complete native silhouette because it contacted the top edge, whereas the canonical original retains 4 px above the header.

### F4 — canonical white top-gap correction

For blanco attempt 3, the shared geometry and white-finish clauses were repeated with an explicit 2–6 px visible white gap above the complete header and permission for contact only at left, right and bottom. The retry again used only original.webp.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | exec-a46dfaf2-aad4-4ff3-a686-c53999c98b56 | accepted — native-complete source-faithful bottom contact |
| wengue | 1 | F1 | exec-d5594567-750b-45bf-8b3c-a680b59a9b26 | accepted — native-complete source-faithful bottom contact |
| gris-oscuro | 1 | F1 | exec-a80a0fd1-450e-485c-bc7b-33e5f0a28531 | accepted — native-complete source-faithful bottom contact |
| antracita | 1 | F1 | exec-39a9e1be-e0f0-4761-9833-c07463df67fb | rejected — side margins 17/22 px |
| antracita | 2 | F2 | exec-95d42e40-1a52-4ed5-8f14-7824e5b20f24 | accepted — margins [5,4,2,0] |
| nogal | 1 | F1 | exec-26033b86-7e8a-41e2-bb21-45364025df15 | rejected — broad padding [37,24,37,16] |
| nogal | 2 | F2 | exec-f3186066-1cf1-4c22-bf1e-12c586ef1ba7 | rejected — left margin 13 px |
| nogal | 3 | F2 | exec-6ba25a34-1711-4886-a2f7-fc88608efe49 | accepted — native-complete within 12 px |
| roble | 1 | F1 | exec-d7fa1565-5c7d-4dc4-bfee-f31a6c875487 | rejected — left margin 13 px |
| roble | 2 | F2 | exec-032b18e6-7878-4c34-a2cb-0652f8d7da18 | accepted — margins [5,7,4,0] |
| gris-claro | 1 | F1 | exec-d8dd14e8-5213-4b66-b6b0-5f286f1174ec | accepted — native-complete light finish |
| natural | 1 | F1 | exec-8f919ab2-11d0-4a2a-abf4-4bc5f84eeaa6 | accepted — native-complete minimal hairline |
| blanco | 1 | F1 | exec-b7a2196b-2afd-4fb3-ae8a-66381842ab87 | rejected — top margin 13 px |
| blanco | 2 | F3 | exec-31bb8b15-18eb-4ac8-9502-f591815e42f3 | rejected — noncanonical top-edge contact |
| blanco | 3 | F4 | exec-3a220987-5b58-4c99-92be-7f587c2f5766 | accepted — visible top gap and complete silhouette |

Totals: 15 independent built-in ImageGen calls, 9 accepted, 6 rejected.

## Source-edge contact and light-finish notes

Seven accepted PNGs measure 0 px at the bottom under the RGB<245 metric. They were not cropped or resized: native-detail inspection confirms the complete side posts, top header, bevels and lower endpoints. This matches the canonical original, which measures [0,4,0,0].

The final white output measures [8,10,7,2]. Because the finish approaches the pure-white background, RGB<245 is conservative; native inspection confirms a visually minimal gap, complete moldings and no cropping. A prior white result measuring [0,0,0,0] was preserved as rejected because its top contact did not match the canonical 4 px top gap.

No file under public/ was touched, and no accepted or rejected PNG was processed after generation.
