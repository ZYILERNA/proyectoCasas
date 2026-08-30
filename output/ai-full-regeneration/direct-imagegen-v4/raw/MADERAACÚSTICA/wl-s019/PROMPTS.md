# MADERAACÚSTICA/wl-s019 — direct built-in ImageGen prompt audit and minimum-margin revision

All 50 audited PNGs came from 50 independent calls to the built-in ImageGen tool: 38 in the original positive-gap round and 12 in the later minimum-margin revision. Image 1 was always the sole reference:

`public/images/PUERTAS/MADERAACÚSTICA/wl-s019/original.webp`

Reference SHA-256 before and after the run: `d7690e376b8476f207127c2a326bcb4e14e5e889db7a1aa6c907689d401974e5`.

Current policy: `NO_LOGO_MINIMUM_MARGIN_CANONICAL_CONTACT_MAXIMUM_SUBJECT`. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every accepted, displaced or rejected workspace PNG is a byte-for-byte copy of its built-in ImageGen result.

This file records the operational prompt families and complete attempt mapping. The built-in tool did not emit a separate normalized prompt log, so the families preserve the explicit requests and invariants without claiming to reproduce hidden internal normalization.

## Shared subject and invariant contract

> Use case: precise-object-edit.
>
> Asset type: e-commerce acoustic-door catalog finish variant.
>
> Input images: Image 1 is the sole edit target, sole reference and sole canonical geometry source.
>
> Primary request: directly generate the exact wl-s019 door in the requested finish while retaining realistic wood grain and the complete original model.
>
> Composition: preserve the 411:1108 tall narrow ratio and perfectly front-facing orthographic presentation. Make the intact complete assembly as large as possible.
>
> Historical positive-gap round: calls 1–38 requested a positive pure-white gap on all four sides because the source measures `[3, 6, 5, 3]` pixels at RGB<245.
>
> Minimum-margin revision: calls 39–50 followed the user's later priority to minimize whitespace. The preferred range is 0–6 pixels per side, the normal ceiling is 12, and 0-pixel edge contact is allowed when the complete outer frame and bottom ends remain visibly intact under native-detail inspection.
>
> Frame geometry: exactly two slim complete outer side posts, one straight top crossbar, one inner beveled lintel, one wide dark recessed reveal at left and one fine inner edge line at right.
>
> Leaf geometry: exactly one plain flat leaf with exactly TWO and only two thin full-width horizontal joints at the source heights, dividing it into exactly three sections. No extra seam or panel.
>
> Grain: predominantly horizontal on leaf and top crossbar; vertical on the two outer posts.
>
> Hardware: exactly one short dark horizontal lever on one dark round rosette and exactly one separate dark round key cylinder below at the original location and scale.
>
> NO_LOGO: no WONLY logo, badge, brand, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
>
> Avoid: extra panels, grooves, seams, handles, locks, glass, inlays, decoration, architecture, room, wall, floor, props, perspective or cast shadow.

## Finish clauses

- negro: near-black stained wood with restrained visible grain.
- wengue: rich very dark chocolate-brown wenge, recognizably brown rather than neutral black.
- gris-oscuro: deep charcoal dark-gray stained wood.
- antracita: matte neutral graphite/anthracite gray, distinct from black.
- nogal: medium warm walnut brown.
- roble: classic medium golden oak, restrained honey warmth.
- gris-claro: pale cool light-gray stained wood, distinct from white.
- natural: very pale raw natural oak/ash, neutral blond beige.
- blanco: clean whitewashed wood with subtle grain and enough edge definition against pure white.

## Previous positive-gap round prompt families (calls 1–38)

### F1 — strict 2–6 px base

The shared contract requested the exact 411:1108 ratio, a complete source-faithful silhouette, and a continuous 2–6 px pure-white safety hairline on all four sides. Nine independent first attempts used this family.

### F2 — explicit 2–4 or 4–6 px correction

The prompt named all four edges and corners individually, prohibited edge contact, required visible white below both post bottoms, and set 6–12 px as the absolute ceiling. This family produced the accepted negro and gris-oscuro candidates; in other finishes ImageGen either retained wider margins or added much more whitespace.

### F3 — aggressive 1–3 px almost-full-bleed correction

The prompt required an almost borderless fresh render with at least one genuine white pixel on every side, zero contact forbidden, and no margin above 6 px. Several outputs became tighter, but the bottom edge touched in gris-oscuro, natural and blanco and those attempts were rejected unchanged.

### F4 — reproduce canonical source scale

The prompt asked ImageGen to reproduce the reference's exact nearly edge-to-edge placement and original tiny positive margins rather than conventional catalog padding. It produced the best non-contact candidates for some finishes but did not consistently honor the numeric perimeter.

### F5 — explicit generated-pixel bounding box

The prompt expressed the desired bounding box on a typical 764x2059 output. ImageGen instead returned a materially different aspect for negro/antracita attempts, so both were rejected unchanged. No scripted correction followed.

## Previous positive-gap round attempt mapping

| Finish | Attempt | Family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | exec-1d410b8c-c781-4ba7-80a1-2a84683ff5ea | rejected — max 16 px |
| negro | 2 | F2 | exec-39dbf937-a468-4ada-a561-523b21fc033c | accepted — `[11, 9, 11, 7]` |
| negro | 3 | F5 | exec-8394d208-3573-4975-9284-a611cb26751d | rejected — wrong aspect |
| wengue | 1 | F1 | exec-7180dd1e-35c8-42a8-a219-b260c0b37db4 | accepted exception — `[14, 9, 13, 7]` |
| wengue | 2 | F4 | exec-3d64ce9c-1a59-4f77-8ef9-eaacb2734cfc | rejected — 33–49 px |
| wengue | 3 | F2 | exec-5e12b58f-0f4a-482f-9f00-ddd530f09d1c | rejected — max 16 px |
| wengue | 4 | F3 | exec-dff37ed2-57b8-43b1-bf26-5516ea1a8dbd | rejected — greater total padding |
| wengue | 5 | F2 | exec-b01965f5-2989-4b82-b627-05fcb62d51c6 | rejected — 55–96 px |
| gris-oscuro | 1 | F1 | exec-16d2f89d-1ee2-4058-ad44-edcb11e38aaa | rejected — max 16 px |
| gris-oscuro | 2 | F2 | exec-d6ad2faa-1779-4459-aaf8-baf66d188e8d | accepted exception — `[15, 11, 11, 6]` |
| gris-oscuro | 3 | F3 | exec-8a3c12cf-ff37-4f19-8680-0029435bf16b | rejected — bottom contact |
| gris-oscuro | 4 | F3 | exec-7ad378d0-6d77-437d-bc79-c3972447e368 | rejected — max 16 px |
| antracita | 1 | F1 | exec-3ef683d1-ed5b-456a-8d87-2dafc167eaf7 | accepted exception — `[15, 14, 16, 11]` |
| antracita | 2 | F3 | exec-35261705-54cf-4aa9-b080-9880c3006f73 | rejected — max 17 px |
| antracita | 3 | F5 | exec-e53131f0-ff86-4bc0-8a1d-fa2fc0b2258e | rejected — wrong aspect |
| antracita | 4 | F2 | exec-b25bbccf-ead1-4d0a-834b-3dd60565f8ef | rejected — max 21 px |
| nogal | 1 | F1 | exec-9d103ef4-2d72-44c1-81d0-fd0d671e5abb | rejected — max 17 px |
| nogal | 2 | F3 | exec-51195eac-d195-4897-85f0-ba23207d539f | rejected — max 18 px |
| nogal | 3 | F2 | exec-1e856848-c4eb-42e3-b4e2-4c56897ebf42 | rejected — 20–32 px |
| nogal | 4 | F3 | exec-a8f98306-8105-42d2-88a7-f3892a0c28ed | accepted exception — `[14, 12, 12, 6]` |
| roble | 1 | F1 | exec-4aa11c4d-ba03-4bb4-a9bd-c411a69f6e8b | rejected — max 18 px |
| roble | 2 | F2 | exec-85f3acf6-03e2-4d69-820f-766bd2bd9d91 | rejected — max 18 px |
| roble | 3 | F3 | exec-2524f98e-3696-4525-87a6-5411fa8b89f8 | accepted exception — `[16, 17, 17, 8]` |
| roble | 4 | F3 | exec-791ad3d6-8cd5-44dd-a3d9-869b8f859818 | rejected — max 18 px |
| gris-claro | 1 | F1 | exec-59c3547f-1d83-418a-9570-8e32ac0d85c6 | accepted exception — `[17, 16, 17, 9]` |
| gris-claro | 2 | F3 | exec-8d68ab38-d7b5-4502-ad4f-36939a684a7d | rejected — max 27 px |
| gris-claro | 3 | F3 | exec-a4926e56-d686-494e-b686-d238a43f2ca3 | rejected — max 26 px |
| gris-claro | 4 | F3 | exec-cbf1f8ee-eb4a-4f3c-816a-f996dc8cef07 | rejected — max 18 px |
| natural | 1 | F1 | exec-58094c27-e986-4e7c-bfbb-39398556e212 | accepted exception — `[14, 13, 16, 4]` |
| natural | 2 | F3 | exec-01f5d663-a498-4aeb-b5ba-dfa3d6dfa81c | rejected — bottom contact |
| natural | 3 | F3 | exec-20d5a708-cd4b-4493-8715-c8a32e579b25 | rejected — bottom contact |
| natural | 4 | F3 | exec-84ad6012-b9b4-4557-bcb0-1a690e4accb4 | rejected — max 17 px |
| blanco | 1 | F1 | exec-d10a7268-dd33-4067-a480-816d43e1c0cf | accepted exception — RGB<250 `[21, 13, 23, 11]` |
| blanco | 2 | F3 | exec-d1ba6450-f402-420c-b3c8-2dda2408c5a5 | rejected — max 26 px |
| blanco | 3 | F3 | exec-d85d0106-d41c-4aa7-909b-60be16453564 | rejected — bottom contact |
| blanco | 4 | F4 | exec-67ef1189-bc5b-415f-8547-957951fe747b | rejected — bottom contact |
| blanco | 5 | F2 | exec-183fbd90-e065-4935-9141-b5e4dc90a93f | rejected — 60–83 px |
| blanco | 6 | F2 | exec-7d38a08c-b2ab-4b97-99f4-d636ac0b3ddd | rejected — 48–62 px |

Historical round totals: 38 independent built-in ImageGen calls, 9 selected at that time and 29 rejected.

## Historical positive-gap result

`negro` remains within the normal 12-pixel maximum. The other eight selected finishes exceed 12 pixels on at least one side, with maxima from 14 to 23 pixels. Each exception was selected only after four to six independent direct calls: alternatives either touched the bottom edge, had the wrong aspect ratio, or increased whitespace. The selected candidate is the least-wide intact positive-gap result available for that finish, and every rejected source is preserved unchanged in `_rejected`.

Native-detail inspection confirms the complete two-post frame, top crossbar and bevel, wide left reveal, fine right line, exactly two leaf joints, one lever/rosette, one separate key cylinder and NO_LOGO in all nine selected PNGs.

No file under `public` was touched. No accepted or rejected PNG was processed after generation.

## Minimum-margin revision prompt family F6 (calls 39–50)

Each revision attempt was a fresh built-in ImageGen call using only the same canonical `original.webp`. The operational wording was:

> Use Image 1 as the sole edit target and sole reference. Directly generate the exact MADERAACÚSTICA wl-s019 door in **[FINISH]**, preserving the complete model rather than redesigning it.
>
> Preserve exactly: the tall narrow front-on orthographic proportion; both complete slim outer side posts; the complete straight top crossbar and inner beveled lintel; the wide dark recessed reveal on the left; the fine inner edge line on the right; the one plain flat leaf; exactly two and only two thin full-width horizontal leaf joints at the source heights; the one short dark horizontal lever on one dark round rosette; and the one separate dark round key cylinder below.
>
> Scale the complete door assembly to the absolute maximum size on the canvas. Minimize pure-white whitespace on every side. Preferred measured margin is 0–6 pixels on left, top, right and bottom, with 12 pixels as the normal maximum. Do not add a catalog safety border. Edge contact at 0 pixels is allowed and preferred when it makes the door larger, provided the full outer posts, top crossbar, bottom ends, handle and lock remain complete and uncropped.
>
> Keep a pure-white neutral background. NO_LOGO: no logo, badge, brand, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext. No extra panels, grooves, seams, handles, locks, glass, inlays, decoration, architecture, room, wall, floor, props, perspective or cast shadow.

For the three second revision attempts, the correction clause explicitly named the previous measured margins and requested a fresh render with the same exact geometry, finish and hardware but a smaller 0–6-pixel placement. No previous generated PNG was supplied as a reference.

## Minimum-margin revision attempt mapping

| Finish | Revision attempt | Built-in ImageGen ID | RGB edge margins [L,T,R,B] | Result |
|---|---:|---|---|---|
| negro | 1 | exec-4e2a4760-9550-49b3-9c7e-ba84ead44466 | RGB<245 `[0, 0, 0, 0]` | accepted — native complete contact |
| wengue | 1 | exec-5ad71f57-0e14-461e-912b-d0282b4aacd7 | RGB<245 `[0, 8, 11, 4]` | rejected — wider than revised selection |
| wengue | 2 | exec-e0a7d3ec-868a-4658-922e-9f566e459df4 | RGB<245 `[0, 0, 2, 0]` | accepted — native complete contact |
| gris-oscuro | 1 | exec-94058728-c2ff-419b-bfc1-ee85d10965eb | RGB<245 `[14, 13, 13, 13]` | rejected — above 12 px |
| gris-oscuro | 2 | exec-2d3df1b8-4e2c-4132-8906-497deeeb2c1a | RGB<245 `[0, 0, 0, 0]` | accepted — native complete contact |
| antracita | 1 | exec-a49ff7e5-7e6e-48e8-a1ce-2f807c0e840c | RGB<245 `[0, 0, 0, 0]` | accepted — native complete contact |
| nogal | 1 | exec-13711b94-ed3f-4ee1-a6d0-b8c013f7fb79 | RGB<245 `[0, 0, 0, 0]` | accepted — native complete contact |
| roble | 1 | exec-54df8b9c-1966-477e-a1cb-e1d0aedc6714 | RGB<245 `[6, 0, 0, 0]` | accepted — native complete contact |
| gris-claro | 1 | exec-9eaaef67-5869-4491-bdb3-8649083b4309 | RGB<245 `[0, 5, 0, 0]` | accepted — native complete contact |
| natural | 1 | exec-eaffe6da-7e6a-4b33-842a-c4baa78e230f | RGB<245 `[0, 6, 0, 0]` | accepted — native complete contact |
| blanco | 1 | exec-4a59d686-f743-47f4-97cd-b3fa07b405ec | RGB<245 `[10, 10, 12, 0]`; RGB<250 `[10, 9, 10, 0]` | rejected — wider than revised selection |
| blanco | 2 | exec-be490980-b958-4bfe-84f4-8bc881aaca56 | RGB<245 and RGB<250 `[0, 0, 0, 0]` | accepted — native complete contact |

## Preservation of the nine displaced selections

Before replacing any root PNG, each previous selection was copied byte-for-byte to:

| Finish | Previous built-in ImageGen ID | Preserved file |
|---|---|---|
| negro | exec-39dbf937-a468-4ada-a561-523b21fc033c | `_rejected/negro-previous-selected-before-minimum-margin-revision.png` |
| wengue | exec-7180dd1e-35c8-42a8-a219-b260c0b37db4 | `_rejected/wengue-previous-selected-before-minimum-margin-revision.png` |
| gris-oscuro | exec-d6ad2faa-1779-4459-aaf8-baf66d188e8d | `_rejected/gris-oscuro-previous-selected-before-minimum-margin-revision.png` |
| antracita | exec-3ef683d1-ed5b-456a-8d87-2dafc167eaf7 | `_rejected/antracita-previous-selected-before-minimum-margin-revision.png` |
| nogal | exec-a8f98306-8105-42d2-88a7-f3892a0c28ed | `_rejected/nogal-previous-selected-before-minimum-margin-revision.png` |
| roble | exec-2524f98e-3696-4525-87a6-5411fa8b89f8 | `_rejected/roble-previous-selected-before-minimum-margin-revision.png` |
| gris-claro | exec-59c3547f-1d83-418a-9570-8e32ac0d85c6 | `_rejected/gris-claro-previous-selected-before-minimum-margin-revision.png` |
| natural | exec-58094c27-e986-4e7c-bfbb-39398556e212 | `_rejected/natural-previous-selected-before-minimum-margin-revision.png` |
| blanco | exec-d10a7268-dd33-4067-a480-816d43e1c0cf | `_rejected/blanco-previous-selected-before-minimum-margin-revision.png` |

## Final revised result

The package now audits 50 independent built-in ImageGen calls: 9 current accepted root PNGs and 41 preserved rejects (29 historical rejects, 9 displaced previous selections and 3 unsuccessful minimum-margin revision attempts).

All nine current selections measure within the preferred 0–6-pixel range, with a maximum accepted margin of 6 pixels. Native-detail inspection confirms the complete two-post frame, complete top and bottom ends, inner bevel, wide left reveal, fine right line, exactly two leaf joints, one lever/rosette, one separate key cylinder and NO_LOGO in every revised PNG, including all edge-contact cases.

No file under `public` was touched. No accepted, displaced or rejected PNG was processed after generation.
