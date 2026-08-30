# MADERAACÚSTICA/wl-5105 — direct built-in ImageGen prompt audit and minimum-margin revision

This package audits 16 independent built-in ImageGen calls: the nine-call historical round and seven minimum-margin revision calls. Image 1 was always the sole reference:

`public/images/PUERTAS/MADERAACÚSTICA/wl-5105/original.webp`

Reference SHA-256 before and after: `cd9319f6647a3a96873c867a936b3012cb11225311020981b3b24d35d891c963`.

Policy: `NO_LOGO_MINIMUM_MARGIN_MAXIMUM_SUBJECT`. No generated output, logo, mask or secondary image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, conversion or other pixel transformation was used. Every active, displaced and rejected workspace PNG is byte-for-byte identical to its built-in ImageGen artifact.

The built-in tool did not emit a separate normalized prompt log. The text below records the operational prompt families and invariant contract without claiming to expose hidden normalization.

## Shared invariant contract

> Use case: precise-object-edit. Asset type: ecommerce catalog door-finish variant.
>
> Image 1 is the sole edit target, sole reference and sole canonical geometry source. Re-render the exact same very tall, narrow single-leaf door assembly shown in Image 1.
>
> Preserve the complete outer frame, top header, side stiles, front elevation, slight depth, original elongated inset panel with exactly two thin continuous nested rounded-rectangle contour lines, and exactly one rectangular horizontal silver bar handle on the left. Preserve every contour corner and endpoint. Keep exactly one handle and no rosette, key cylinder or extra hardware. Do not add or remove architectural details.
>
> Pure-white catalog background. Complete and uncropped. NO_LOGO: no brand, badge, text, letters, numbers, symbols, watermark, signature, microtext or pseudotext. No extra panels, grooves, hardware, hinges, keyholes, peepholes, decoration, floor, wall, room, props, perspective, tilted view or wide canvas.

## Canonical finish clauses

- `negro`: uniform deep matte black with restrained realistic surface texture.
- `wengue`: very dark espresso-brown wenge wood with fine authentic vertical grain; never orange or red.
- `gris-oscuro`: refined dark slate gray with subtle fine vertical wood texture; visibly gray rather than black.
- `antracita`: deep anthracite charcoal gray, subtly warmer and darker than slate gray but not pure black, with restrained vertical texture.
- `nogal`: premium medium-dark walnut brown with realistic elegant vertical walnut grain and no orange cast.
- `roble`: warm honey-golden oak with authentic visible vertical oak grain; natural rather than yellow-orange.
- `gris-claro`: soft neutral light gray with very subtle fine vertical surface texture and no blue cast.
- `natural`: pale natural untreated-looking wood, light beige-tan with delicate authentic vertical grain and low saturation.
- `blanco`: clean neutral satin white with gentle shading sufficient to retain the frame and double-contour depth.

## F0 — historical direct family (calls 1–9)

F0 used the shared invariant contract and the corresponding canonical finish clause. It required the same extreme portrait proportion and complete frame on white, but predated the later numeric minimum-margin correction.

| Call | Finish | Finish attempt | Built-in ImageGen ID | Final disposition |
|---:|---|---:|---|---|
| 1 | negro | 1 | `exec-380ba5e7-05be-4a29-802f-49b997ae06ed` | active; retained because all margins are within 12 px |
| 2 | wengue | 1 | `exec-4d092857-3913-43da-baa0-db2fee68ff8b` | displaced and preserved; later selection is tighter |
| 3 | gris-oscuro | 1 | `exec-5eac9b18-80b4-4287-9034-468a1645ef57` | displaced and preserved; later selection is tighter |
| 4 | antracita | 1 | `exec-c089d5b1-a9a4-40b9-b51a-98707859c984` | displaced and preserved; later selection is tighter |
| 5 | nogal | 1 | `exec-cb20d5e7-e098-4de3-818a-c3a5b0b8bd5e` | displaced and preserved; later selection is tighter |
| 6 | roble | 1 | `exec-3a391f69-b7a4-4da6-8543-c5dd3931c81a` | active; retained because all margins are within 12 px |
| 7 | gris-claro | 1 | `exec-9cb325b2-bfaf-4a5b-8deb-cab1acd0a8f2` | active; retained because all margins are within 12 px |
| 8 | natural | 1 | `exec-5c0de565-07a7-4e5c-b142-b377e22356f1` | active; retained because all margins are within 12 px |
| 9 | blanco | 1 | `exec-6e1ec8b5-c0c8-4b73-8cf3-073d5954660a` | displaced and preserved; later selection is tighter |

Historical total: nine independent calls, all initially selected. Four remain active; five are preserved byte-for-byte in `_rejected` after the minimum-margin revision.

## F1 — first minimum-margin revision family (calls 10–14)

F1 repeated the entire invariant contract and corresponding canonical finish clause, then added:

> Preserve the exact source canvas proportion of 403:1069 and the exact source structure: complete outer frame; exactly two continuous nested rounded-rectangle contours; exactly one rectangular silver bar handle; no rosette, cylinder, logo or extra detail.
>
> Scale the intact wl-5105 door to the maximum safe size on the pure-white canvas. Target only 0–3 pixels of white margin on every side. Do not create a conventional catalog safety border. Never crop the silhouette, frame corners or contour endpoints.

F1 was applied independently to `wengue`, `gris-oscuro`, `antracita`, `nogal` and `blanco`, always from the canonical `original.webp` rather than from a previous output.

| Call | Finish | Revision attempt | Built-in ImageGen ID | RGB<245 margins [L,T,R,B] | Result |
|---:|---|---:|---|---|---|
| 10 | wengue | 1 | `exec-d4810d94-a1ba-466e-8e93-ecbe5cd2d926` | `[9, 0, 10, 0]` | accepted; complete and within the 12-pixel normal maximum |
| 11 | gris-oscuro | 1 | `exec-b8db205a-9558-46e8-a197-92298de119aa` | `[17, 1, 18, 0]` | rejected; lateral padding above 12 px |
| 12 | antracita | 1 | `exec-ea28b06f-6721-41fa-a02c-43decd322832` | `[2, 0, 2, 0]` | accepted; complete and within the preferred 0–6 px range |
| 13 | nogal | 1 | `exec-e679cf2a-b191-4489-b10a-c2f503320c1e` | `[7, 0, 8, 0]` | accepted; complete and within the 12-pixel normal maximum |
| 14 | blanco | 1 | `exec-498053b1-07cd-4e51-8285-d5f312ee0e11` | `[17, 3, 15, 0]` | rejected; lateral padding above 12 px |

## F2 — exact-source-scale correction family (calls 15–16)

F2 was used only for `gris-oscuro` and `blanco`. Each was a new independent built-in ImageGen call using only `original.webp`. It repeated the full invariant and finish clauses, then added:

> Match the exact maximum-subject scale of the canonical source. The source's measured RGB<245 margins are `[5, 1, 3, 2]` in `[left, top, right, bottom]` order. Aim for left 0–5 px, top 0–2 px, right 0–4 px and bottom 0–2 px.
>
> Keep the complete 403:1069 source geometry, outer-frame silhouette, both continuous nested rounded-rectangle contours and exactly one rectangular silver bar handle. No rosette, cylinder, logo or added detail. Do not crop or postprocess.

| Call | Finish | Revision attempt | Built-in ImageGen ID | Measured margins | Result |
|---:|---|---:|---|---|---|
| 15 | gris-oscuro | 2 | `exec-76cd4c38-b2d3-4155-a7c5-7a761e0a7fe2` | RGB<245 `[10, 2, 10, 6]` | accepted; natively complete and within the 12-pixel normal maximum |
| 16 | blanco | 2 | `exec-7e9435db-9368-4050-9ee3-61921489d54f` | RGB<245 `[12, 2, 6, 4]`; RGB<250 `[12, 2, 6, 0]` | accepted; natively complete and at the 12-pixel normal ceiling |

The numeric F2 targets were prompt targets, not post-generation manipulations. The accepted outputs were selected as emitted because they materially improve the rejected F1 attempts, preserve every invariant at native detail and remain within the normal 12-pixel ceiling.

## Preservation and final result

Before replacing any canonical root PNG, the prior `wengue`, `gris-oscuro`, `antracita`, `nogal` and `blanco` selections were preserved byte-for-byte as `_rejected/<finish>-previous-selected-before-minimum-margin-revision.png`. The two failed F1 outputs were preserved as `_rejected/<finish>-minimum-margin-revision-attempt1-padding.png`.

The final package contains nine active root PNGs and seven rejected PNGs, representing all 16 independent calls. The five revised selections reduce the old maximum margins as follows: `wengue` 13→10 px, `gris-oscuro` 13→10 px, `antracita` 18→2 px, `nogal` 17→8 px and `blanco` 19→12 px. The four retained selections were already within the 12-pixel normal maximum.

Native-detail inspection confirms the complete frame/contact, exactly two continuous nested rounded-rectangle contours, exactly one rectangular silver bar handle, no rosette, no key cylinder, no extra hardware and NO_LOGO in all nine current selections. No file under `public/` was touched, and no PNG was filtered, recolored, masked, cropped, resized, composited, converted or otherwise processed.
