# MADERAACÚSTICA/5203 — direct built-in ImageGen prompt audit and minimum-margin revision

All 30 audited PNGs came from 30 independent calls to the built-in ImageGen tool: 11 in the previous round and 19 in the minimum-margin revision. Image 1 was always the sole reference:

`public/images/PUERTAS/MADERAACÚSTICA/5203/original.webp`

Reference SHA-256 before and after: `bf7b6be04efeca7805862fe0daf9b5f81df843d6506097025101d7826a6aaefc`.

Current policy: `NO_LOGO_MINIMUM_MARGIN_CANONICAL_CONTACT_MAXIMUM_SUBJECT`. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every accepted, displaced and rejected workspace PNG is a byte-for-byte copy of its built-in ImageGen result.

The built-in tool did not emit a separate normalized prompt log. The wording below records the operational request and invariants without claiming to expose hidden normalization.

## Shared invariant contract

> Use case: precise-object-edit for an e-commerce acoustic-door finish variant.
>
> Image 1 is the sole edit target, sole reference and sole canonical geometry source.
>
> Generate the exact MADERAACÚSTICA 5203 door in **[FINISH]** while preserving the complete very tall narrow front-on product.
>
> Preserve exactly the source-specific square post-and-rail frame: one straight projecting top rail, two projecting square side posts and the complete lower ends/threshold. Do not replace this joinery with a mitered picture frame.
>
> Preserve the vertically grained leaf; exactly one upper-left vertical joint; exactly one lower-right vertical joint; one wide lower-middle horizontal dark wood band at the source height; exactly one slim horizontal lever; and exactly one separate round key cylinder below it. Keep their source positions and scale.
>
> Pure white catalog background. Complete and uncropped. NO_LOGO: no brand, badge, text, letters, numbers, symbols, watermark, signature, microtext or pseudotext. No extra panels, seams, hardware, glass, decoration, architecture, wall, floor, props, perspective or scene.

Finish clauses: deep black (`negro`), espresso wenge (`wengue`), dark charcoal (`gris-oscuro`), graphite anthracite (`antracita`), medium walnut (`nogal`), golden oak (`roble`), light neutral gray (`gris-claro`), pale natural wood (`natural`) and warm white (`blanco`).

## Previous-round mapping (calls 1–11)

| Finish | Historical attempt | Built-in ImageGen ID | Historical result |
|---|---:|---|---|
| negro | 1 | exec-3c6fe0ad-70fd-473c-866e-a150daca1fb5 | selected at that time |
| wengue | 1 | exec-8bfec0f8-e4ac-4c23-9e1f-5574f3e8e9ca | selected at that time |
| gris-oscuro | 1 | exec-de2210eb-16dc-461d-b92d-a6819fcccdbb | selected at that time |
| antracita | 1 | exec-a52aaaf7-a125-4576-aef6-6af2f1e04c97 | selected at that time |
| nogal | 1 | exec-e9f36545-a13e-4d13-b194-b82acaf3d7a0 | selected at that time |
| roble | 1 | exec-b4a9fca9-c788-470c-b64a-3f31a3881c59 | selected at that time |
| gris-claro | 1 | exec-d38cf82f-0f5b-471b-a511-d1eca4e7ee30 | selected at that time; wide positive padding |
| natural | 1 | exec-4a5c3585-f1d8-42df-a354-e18eae2f4289 | selected at that time |
| blanco | 1 | exec-3d9e6759-1a68-4d00-9985-c8b7d719dc6d | selected at that time |
| gris-claro | 2 | exec-c198b06f-d2ac-4551-83d1-38faa56254ea | rejected — mitered-frame architecture drift |
| gris-claro | 3 | exec-b13eb4f5-f236-48f9-a0d4-d681deec8a97 | rejected — no padding improvement |

Historical total: 11 independent calls, 9 selected at that time and 2 rejected.

## Minimum-margin revision prompt family

Each revision attempt was a fresh built-in ImageGen call using only the canonical `original.webp`. The revision added:

> Scale the complete 5203 assembly to the absolute maximum size on the canvas. Minimize pure-white whitespace on every side. Preferred measured margin is 0–6 pixels on left, top, right and bottom, with 12 pixels as the normal maximum. Do not add a conventional catalog safety border.
>
> Edge contact at 0 pixels is allowed and preferred when it makes the product larger, provided the full square side posts, projecting top rail, lower ends/threshold, signature joints, dark band, lever and cylinder remain complete and uncropped.

Correction calls named the previous measured margins and requested a fresh tighter render with the same exact model, finish, joinery and hardware. No previous generated PNG was supplied as a reference.

## Minimum-margin revision mapping (calls 12–30)

| Finish | Revision attempt | Built-in ImageGen ID | RGB<245 margins [L,T,R,B] | Result |
|---|---:|---|---|---|
| negro | 1 | exec-0be65c1f-fdea-4ca7-9c7d-cacd61cd3ed8 | `[14, 5, 15, 4]` | rejected — wider padding |
| negro | 2 | exec-58764bc9-017a-40de-b584-37aefc691211 | `[0, 0, 0, 0]` | accepted — native complete contact |
| wengue | 1 | exec-eb9cf5ed-1110-490c-b7ca-3db7c5bffd27 | `[12, 5, 13, 4]` | rejected — wider padding |
| wengue | 2 | exec-2771e43d-c514-4ced-8b77-5fe3b228a9ec | `[0, 0, 0, 0]` | accepted — native complete contact |
| gris-oscuro | 1 | exec-c7a4e59d-996f-446c-b470-f77b67482cfe | `[13, 8, 15, 5]` | rejected — wider padding |
| gris-oscuro | 2 | exec-a9aabdbf-5d8e-40df-8615-dec3ab9f2d0f | `[0, 0, 0, 0]` | accepted — native complete contact |
| antracita | 1 | exec-03dbf362-9d75-4c9f-9167-4ac12fe5e579 | `[9, 3, 11, 5]` | rejected — wider than final |
| antracita | 2 | exec-e7e9e392-2c3c-49bf-b318-b711780ba3ae | `[0, 1, 2, 0]` | accepted — native complete contact |
| nogal | 1 | exec-77cfb7f6-ca9b-4cea-8c6a-931bc086e10c | `[18, 7, 16, 6]` | rejected — above 12 px |
| nogal | 2 | exec-f77f00dd-3d08-4986-b749-d5fbba782476 | `[0, 0, 0, 0]` | accepted — native complete contact |
| roble | 1 | exec-284e28b0-cde3-470a-baf0-f79841b2e0d0 | `[9, 6, 10, 4]` | rejected — wider than final |
| roble | 2 | exec-5b2ae1a2-adde-4278-bec3-f46c8baba245 | `[0, 0, 0, 0]` | accepted — native complete contact |
| gris-claro | 1 | exec-d1b47b2f-7e8b-4c41-bd20-25d86f6e2738 | `[13, 4, 11, 0]` | rejected — wider than final |
| gris-claro | 2 | exec-fb754121-93be-4fc0-a2a8-79776ba6b942 | `[3, 0, 3, 0]` at RGB<245 and RGB<250 | accepted — native complete contact |
| natural | 1 | exec-ecc3812c-3994-4dde-9bb8-3deba4b2534f | `[11, 3, 11, 4]` | rejected — wider padding |
| natural | 2 | exec-1045446b-37ab-4bee-93a8-089c1a49f02d | `[7, 0, 10, 0]` | rejected — above preferred range |
| natural | 3 | exec-c4cd8bf1-f1ca-468d-be82-fab68548112c | `[5, 0, 6, 0]` | accepted — native complete contact |
| blanco | 1 | exec-0a342f1a-5b12-4c6d-98db-15ad82b41002 | `[14, 5, 17, 2]` | rejected — above 12 px |
| blanco | 2 | exec-b5ba2cf2-8cde-4f10-91ae-f05318833597 | `[0, 0, 0, 0]` at RGB<245 and RGB<250 | accepted — native complete contact |

## Preservation and final result

Before any root PNG was replaced, the nine previous selections were copied byte-for-byte to `_rejected/<finish>-previous-selected-before-minimum-margin-revision.png`. The nine first revision attempts were preserved as `_rejected/<finish>-minimum-margin-revision-attempt1-padding.png`; the extra natural correction was preserved as `_rejected/natural-minimum-margin-revision-attempt2-padding.png`.

The package now audits 30 independent built-in ImageGen calls: 9 current accepted root PNGs and 21 rejects (2 historical rejects, 9 displaced previous selections, 9 first revision attempts and 1 second natural attempt).

All nine current selections measure within the preferred 0–6-pixel range, with a maximum accepted margin of 6 pixels. Native-detail inspection confirms the complete square post-and-rail frame, projecting top rail and posts, lower ends, upper-left and lower-right joints, dark band, single lever, separate cylinder and NO_LOGO in every revised PNG, including all edge-contact cases.

No file under `public` was touched. No accepted, displaced or rejected PNG was processed after generation.
