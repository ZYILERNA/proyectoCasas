# MADERAACÚSTICA/wl-s003 — direct built-in ImageGen prompt audit

All 54 PNGs in this package came from 54 independent calls to the built-in ImageGen tool: 39 historical calls plus 15 minimum-margin revision calls. Every call used only:

`public/images/PUERTAS/MADERAACÚSTICA/wl-s003/original.webp`

Reference SHA-256 before and after: `b4a10e6a9ba6b1efd159d7411b609202948600f2f8465b5a3748486212070b73`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, conversion or other pixel transformation was applied. Every saved PNG is a byte-for-byte copy of its ImageGen result.

## Shared invariant contract

> Image 1 is the sole edit target, reference and canonical geometry source. Preserve one complete squared casing with two vertical posts and one top rail; one plain unpanelled slab; one narrow dark recessed full-height strip beside the left slab edge; exactly one dark straight lever on a round rosette; exactly one separate round key escutcheon below. Preserve the tall 381:1027 reference ratio and orthographic front presentation. Pure white catalog background. NO_LOGO. Do not add panels, grooves, trim, hinges, hardware, text, badges, branding, architecture, room, wall, floor, props, perspective, shadows or watermark.

## Finish clauses

- negro: deep neutral matte black.
- wengue: dark brown-black wenge with restrained vertical grain.
- gris-oscuro: neutral graphite dark gray.
- antracita: deep anthracite matte gray.
- nogal: medium-dark warm walnut.
- roble: warm golden honey oak.
- gris-claro: light neutral cool gray, distinct from white.
- natural: pale blond raw oak with subtle vertical grain.
- blanco: clean matte white with object-edge definition only.

## Framing prompt families

- F1: complete assembly, target 2–6 px, no clipping.
- F2: stronger 1–4 px hairline and approximately 99% canvas fill.
- F3: quantified source ratio, 99% width/height, no broad border.
- F4: exact-coordinate request on an approximately 764×2058 canvas.
- F5: original-like 0–4 px; bottom tips may end on the final row as in the original, but all contour tips must remain whole.
- F6: continuous 3–6 px safety line; this often caused ImageGen to over-pad light finishes.
- F7: source ratio 381:1027, finish/framing only, essentially zero padding, explicit complete-tip invariant.
- F8: final 97–98% width / 99% height scale check with a 12 px normal maximum.

## Historical attempt mapping before the minimum-margin revision

This table preserves the original 39-call lineage. Its `Accepted` column means selected before the later revision; the former `gris-claro`, `gris-oscuro` and `natural` selections are now retained byte-for-byte under `rejected/`.

| Finish | Attempts | Accepted | Rejected | Prompt evolution |
|---|---:|---|---|---|
| negro | 4 | `exec-897bf1e6-5937-4c96-9538-94048f6863d9` | `exec-ee5b0243…`, `exec-d223c839…`, `exec-cdfa9191…` | F1 → F2 → F3 → F5 |
| wengue | 3 | `exec-74603965-41d4-4c5d-91e2-fb7814b61c2b` | `exec-cdc8e119…`, `exec-20417b23…` | F1 → F2 → F3 |
| gris-oscuro | 6 | `exec-05b47162-6cc3-4dc1-9bfd-462743201c34` | `exec-88806057…`, `exec-3218cab6…`, `exec-0b67fb6a…`, `exec-7ff21f4f…`, `exec-0e09565f…` | F1 → F2 → F3 → F5 → F7 → F8 |
| antracita | 1 | `exec-2f9c3a2c-5e97-47c9-b355-6c03fe22803c` | — | F2 |
| nogal | 1 | `exec-38675c90-8070-401d-b6d5-6f5b143a6281` | — | F2 |
| roble | 4 | `exec-33b736a6-fc7d-4834-9ff6-6769bfaf58ab` | `exec-16c879ae…`, `exec-32db5659…`, `exec-005b5e5a…` | F2 → F5 → F6 → F7 |
| gris-claro | 8 | `exec-32f4b71e-35b7-47e4-8975-c089b811f02e` | `exec-d16bc5a2…`, `exec-0301cfb1…`, `exec-acea92a8…`, `exec-8172b823…`, `exec-256a51e2…`, `exec-79bea103…`, `exec-40bac483…` | F1 → F2 → F4 → F5 → F6 → F7 → F7 → F8 |
| natural | 8 | `exec-dbf17e71-168f-41e0-aca4-82c9263ca3b6` | `exec-8d64ec48…`, `exec-7bd29128…`, `exec-5139df73…`, `exec-d12a6fa7…`, `exec-bf5b8906…`, `exec-cd963ffd…`, `exec-decea12c…` | F1 → F2 → F4 → F5 → F6 → F7 → F7 → F8 |
| blanco | 4 | `exec-ccb67a86-1f64-4715-8ae2-96a766d7befb` | `exec-36eb68eb…`, `exec-3cc72d91…`, `exec-3a7db504…` | F1 → F2 → F4 → F5 |

## Final minimum-margin decisions

The original itself measures `[5, 6, 1, 0]` at RGB<245. Native-detail inspection confirmed every accepted lower post tip ending at row zero is complete.

The 15-call revision replaced `gris-claro`, `gris-oscuro` and `natural` with direct ImageGen results measuring respectively `[0,0,0,0]`, `[0,0,0,0]` and `[9,0,0,0]` at RGB<245. Native-detail inspection confirms the intentional contact results retain the complete header corners, jamb contours, deep left reveal, right stop and both bottom endpoints. All nine final variants now remain within the 12 px normal cap.

No file under `public/` was changed. No promotion, conversion, commit or push occurred in this package step.

## Revision call ledger

All dimensions and margins below were measured from the untouched direct PNG bytes. Margin order is `[left, top, right, bottom]` at RGB<245.

| Revision call | Finish | Revision attempt | Dimensions | Margins | SHA-256 | Disposition |
|---|---|---:|---|---|---|---|
| `exec-2328f141-f3f9-4e7a-a3a5-f3b50916f9f0` | gris-claro | 1 | 764×2058 | `[24,17,25,1]` | `461d5321a4b81df6f9de827b490eb2ba223a501bb34b27de82e9f348ef955b02` | rejected: padding above 12 px |
| `exec-19a86f8c-4d49-490d-8889-6e04fba6e40f` | gris-oscuro | 1 | 764×2057 | `[14,16,11,0]` | `976692fe26031a183e8a12c072bc92b1d733ebdf1f39a5781e34548e4048a38e` | rejected: padding above 12 px |
| `exec-898bd7e6-5e45-4127-bda3-9a707df31500` | natural | 1 | 764×2059 | `[14,14,13,0]` | `c511d20297e57c7ecaeec83fc771402a7aaabb2a7393358d1675845de5f90b73` | rejected: padding above 12 px |
| `exec-6c758465-c0c5-4a3e-9dc9-d67e321a200d` | gris-claro | 2 | 764×2059 | `[0,0,0,0]` | `af687bdf21161ff2bffda2016778028b17d1bd897db343964dd5e4be059ff6ba` | selected; contact verified intact natively |
| `exec-b3e16db5-5226-4e4f-97cc-1f5f5fe5cac6` | gris-oscuro | 2 | 884×1778 | `[6,4,11,0]` | `ffe4e8c2c3e639eb0592e743d9105d2ea5abf59eb81bc2d7be0af7d97b2f9496` | rejected: wrong 0.497188 ratio |
| `exec-0be32f4f-fc6c-4c43-92f5-631b1ad27e61` | natural | 2 | 764×2059 | `[14,15,11,0]` | `497af1dee523006c47b71d2a9caa831e0421311fdea8d80e79237e8b3c09c32b` | rejected: padding above 12 px |
| `exec-f7583254-b491-495d-9bc2-02c94e9b2ce0` | gris-oscuro | 3 | 764×2058 | `[16,16,19,10]` | `dec22642b914ed331c277d59adfd5d4cc64cfc8f2f468fe65f0ff947d932fc01` | rejected: padding above 12 px |
| `exec-a1ff3dff-e396-41cf-a4d4-59e449a0b94e` | natural | 3 | 764×2058 | `[16,14,21,8]` | `3cfc287256da45df189273c1f23f62b378a1026749003b91a02d75a14ed85d6e` | rejected: padding above 12 px |
| `exec-f95931dd-21b3-4c09-ac7f-ad9fc13d1650` | gris-oscuro | 4 | 884×1778 | `[0,0,0,0]` | `fa576d4ffecaab03864faef8fc6dbac8a06a0d7ef5f8c4956591e7c6b4b82860` | rejected: wrong 0.497188 ratio |
| `exec-833ec8d0-db42-496b-b35e-e33bef186dc0` | gris-oscuro | 5 | 884×1778 | `[0,1,2,0]` | `eb27fda0c394d45cc373d1cd461097edd6ed6858ec8c35b04300bc7e6593db55` | rejected: wrong 0.497188 ratio |
| `exec-0dc7a07e-3cea-42ff-8616-e1300797e87f` | natural | 4 | 765×2057 | `[9,0,0,0]` | `bdee751b87680b304cc2f45dcfad22d1af478b230f12252a79124058e341e947` | selected; contact verified intact natively |
| `exec-fe31b9e5-8cee-4c2c-984a-a2a3a9568902` | natural | 5 | 884×1778 | `[7,3,6,0]` | `87df4d7417cd941b7f34d0fce2eaba34b609131bed5d1af6f57bd649bc34e7d0` | rejected: wrong 0.497188 ratio |
| `exec-40456ffb-4373-442c-b4fb-6450eb9258e0` | gris-oscuro | 6 | 764×2058 | `[0,0,0,0]` | `e1f3888a91d51c8f1bb5a735eb53d482f329b36d73e20dfd5177955c78ad5ee0` | selected; contact verified intact natively |
| `exec-e41ead80-f27a-4787-902b-591a3bed7cc2` | gris-oscuro | 7 | 764×2059 | `[0,0,0,0]` | `71f6d5ae2a0ccc13a68c03711f6652256ef4009cf5056462db118f532c91bb29` | valid alternate, superseded and preserved |
| `exec-e40b45db-2286-44bf-a95c-cba201c8ef44` | gris-oscuro | 8 | 764×2059 | `[0,0,0,0]` | `47d847640d54f1bee9484dc592373025f23c14bfa103eb8aa6398d80a7662d56` | valid alternate, superseded and preserved |

## Revision call prompts — literal, lossless

The following five bodies and per-call suffixes were recovered from `image_generation_end.revised_prompt` events in the complete rollout JSONL. For each call, its literal prompt is exactly the named body followed by two newline characters and the suffix shown. This factorization is lossless: no placeholder, paraphrase or reconstructed wording is used.

### R1 body

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-s003 original. Never use a generated image. Direct ImageGen only; no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Preserve exact wl-s003 identity: straight-on ultra-tall narrow plain flush slab with absolutely no decorative panel, groove, seam, line, molding, glass or window on its face. Preserve the complete rectangular assembly: both full-height outer jambs, intact top header, right inner stop, and the distinctive deep recessed vertical shadow/reveal along the left side of the slab with one single narrow dark separation line running from inner top to bottom. That left separation is a frame/reveal gap, not a decorative leaf groove. Preserve exactly one horizontal lever on one round rosette and one separate round key escutcheon immediately below, located in the recessed left area around mid-height. No extra hardware.

CANVAS RATIO OVERRIDES ALL: retain the canonical 381:1027 ultra-tall ratio, width/height = 0.3710, approximately 764×2059. Never output a conventional portrait, 1:2, 9:16, 886×1776 or any ratio above 0.385. Fit the complete intact assembly large in this exact narrow canvas: 3–9 physical white pixels at left, top and right, 0–4 at bottom, absolute maximum 12 on every side. Keep all four outer corners, header edges, reveal, jambs and both bottom endpoints fully visible. Pure white seamless background only; no broad padding, mat, border, wall, floor, room, scenery or broad shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.
```

R1 suffixes:

- `exec-2328f141-f3f9-4e7a-a3a5-f3b50916f9f0`: `Apply GRIS CLARO—refined light gray with restrained vertical grain—coherently to the complete visible wood assembly while retaining the deep left reveal/shadow and exact minimalist construction.`
- `exec-19a86f8c-4d49-490d-8889-6e04fba6e40f`: `Apply GRIS OSCURO—deep dark gray with restrained vertical grain—coherently to the complete visible wood assembly while retaining the deep left reveal/shadow and exact minimalist construction.`
- `exec-898bd7e6-5e45-4127-bda3-9a707df31500`: `Apply NATURAL—pale natural honey wood with restrained authentic vertical grain—coherently to the complete visible wood assembly while retaining the deep left reveal/shadow and exact minimalist construction.`

### R2 body

```text
Create one new photorealistic AI-generated catalog image using ONLY the canonical wl-s003 original. Never use a generated reference. No filters, scripted recolor, crop, resize, mask, composite, conversion, upscaling or pixel post-processing.

Mandatory construction: an ultra-tall narrow plain flush slab with zero decorative panels, grooves, seams or windows; complete outer left/right jambs and top header; right inner stop; one deep recessed left reveal/shadow and one narrow full-height dark separation gap at the slab's left edge; exactly one horizontal lever on one round rosette plus one separate round key escutcheon below in the recessed left area. No other hardware. No Wonly logo, logo, text, badge, watermark or pseudotext.

Mandatory canvas: the source's exact 381:1027 ratio, width/height 0.3710, approximately 764×2059, over 2.69 times taller than wide. In that canvas, enlarge the intact complete assembly until its outer jambs and header make harmless edge contact: left clearance 0–5 actual pixels, top 0–5, right 0–5, bottom 0–3; never more than 8. All corners, header edges, reveal, jambs and bottom endpoints remain fully recognizable and uncropped. Seamless white background only, with no mat, broad padding, border, wall, floor, room or scenery.
```

R2 suffixes:

- `exec-6c758465-c0c5-4a3e-9dc9-d67e321a200d`: `Render all visible wood coherently in GRIS CLARO (refined light gray) with restrained vertical grain, preserving the deep left recess and minimalist identity.`
- `exec-b3e16db5-5226-4e4f-97cc-1f5f5fe5cac6`: `Render all visible wood coherently in GRIS OSCURO (deep dark gray) with restrained vertical grain, preserving the deep left recess and minimalist identity.`
- `exec-0be32f4f-fc6c-4c43-92f5-631b1ad27e61`: `Render all visible wood coherently in NATURAL (pale natural honey wood) with restrained vertical grain, preserving the deep left recess and minimalist identity.`

### R3 body

```text
Regenerate a fresh photorealistic AI catalog image from ONLY the supplied canonical wl-s003 original. Never use a generated reference. ImageGen only; no filter, script, crop, resize, mask, composite, conversion, upscaling or post-processing.

CANVAS FIRST: exact source aspect 381:1027, width/height 0.3710, approximately 764×2059. The canvas must be more than 2.69 times taller than wide. NEVER output 884×1778, 1:2, 9:16 or any ratio above 0.385.

Preserve the exact minimalist door: completely plain flush slab, no decorative line/groove/panel/window; complete left/right jambs and top header, right inner stop, deep full-height left recessed shadow and one narrow dark separation gap at the slab's left edge; exactly one lever on one round rosette and one separate round key escutcheon directly below in the left recess. No extra hardware, Wonly logo, other logo, text or watermark.

In that exact narrow canvas, make the intact assembly fill the image: outer silhouette 0–6 actual pixels from left/top/right and 0–3 from bottom, never above 8. Edge contact is allowed only with all outer corners, header, reveal, jambs and bottom tips recognizable and uncut. Pure white background only; no mat, padding, border, wall, floor, room or scenery.
```

R3 suffixes:

- `exec-f7583254-b491-495d-9bc2-02c94e9b2ce0`: `Render all visible wood coherently in GRIS OSCURO (deep dark gray) with restrained vertical grain and preserve the deep left reveal.`
- `exec-a1ff3dff-e396-41cf-a4d4-59e449a0b94e`: `Render all visible wood coherently in NATURAL (pale natural honey wood) with restrained vertical grain and preserve the deep left reveal.`

### R4 body

```text
Generate a new photorealistic catalog rendering using ONLY the canonical wl-s003 original. Never use generated imagery as reference. ImageGen alone; no filter, script, crop, resize, mask, composite, conversion, upscaling or post-processing.

Keep the door entirely plain and flush. Preserve complete frame, both jambs, header, right stop, deep full-height left recess, one thin dark full-height separation at the slab's left edge, one lever/round rosette and one round key escutcheon below. No panel, decorative groove, seam, glass, extra hardware, Wonly logo, other logo, text or watermark.

Output exactly the source's extremely narrow 381:1027 proportions (width/height 0.3710), around 764×2059. Never choose any wider portrait. ZOOM THE COMPLETE ASSEMBLY TO THE EDGES: its intact outer left jamb must touch x=0, intact right jamb must touch the last x pixel, intact header must touch y=0, and both bottom endpoints must touch or be within 2 pixels of the bottom. This edge contact is required, but every outer corner, header edge, jamb and bottom tip must remain fully recognizable, not cut away. No white padding, mat, border, wall, floor, room or scenery; only tiny white background slivers where unavoidable.
```

R4 suffixes:

- `exec-f95931dd-21b3-4c09-ac7f-ad9fc13d1650`: `Apply GRIS OSCURO (deep dark gray) coherently to all visible wood while preserving the left recess. Independent attempt A.`
- `exec-833ec8d0-db42-496b-b35e-e33bef186dc0`: `Apply GRIS OSCURO (deep dark gray) coherently to all visible wood while preserving the left recess. Independent attempt B.`
- `exec-0dc7a07e-3cea-42ff-8616-e1300797e87f`: `Apply NATURAL (pale natural honey wood) coherently to all visible wood while preserving the left recess. Independent attempt A.`
- `exec-fe31b9e5-8cee-4c2c-984a-a2a3a9568902`: `Apply NATURAL (pale natural honey wood) coherently to all visible wood while preserving the left recess. Independent attempt B.`

### R5 body

```text
Regenerate one new photorealistic studio product image from ONLY the supplied canonical wl-s003 original. Never reference a generated image. ImageGen only; no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

CANVAS RATIO OVERRIDES EVERYTHING: use exactly the original 381:1027 ultra-tall ratio, width/height 0.3710, approximately 764×2059. It must be over 2.69 times taller than wide. NEVER output 884×1778, 1:2, 9:16 or any ratio above 0.385.

Render the complete assembly in deep GRIS OSCURO with restrained vertical grain. Preserve wl-s003 exactly: plain flush slab without panel/groove/seam/window; complete two jambs and top header/right stop; deep full-height left recessed shadow; one narrow full-height dark separation gap at the slab's left edge; one horizontal lever/round rosette and one separate round key escutcheon below in the left recess. No extra hardware, Wonly logo, other logo, text or watermark.

Within that mandatory 381:1027 canvas, enlarge the intact assembly so the outer silhouette is 0–7 physical pixels from left/top/right and 0–3 from bottom; maximum 8. Edge contact allowed only with complete corners, header edges, jambs, reveal and bottom tips visible. No broad white padding, mat, wall, floor, room, border or scenery.
```

R5 suffixes:

- `exec-40456ffb-4373-442c-b4fb-6450eb9258e0`: `Independent attempt A; obey the exact narrow canvas.`
- `exec-e41ead80-f27a-4787-902b-591a3bed7cc2`: `Independent attempt B; obey the exact narrow canvas.`
- `exec-e40b45db-2286-44bf-a95c-cba201c8ef44`: `Independent attempt C; obey the exact narrow canvas.`
