# MADERAACÚSTICA/wl-s026 — direct built-in ImageGen prompt audit

Forty-five independent built-in ImageGen calls produced nine accepted PNGs and thirty-six preserved rejects. Every call used only `public/images/PUERTAS/MADERAACÚSTICA/wl-s026/original.webp` (SHA-256 `c517a4acdadf813218846663dad6664a26180aae430007f6b05ce2b44c983c8b`).

No generated output, logo image or other reference was used. No filter, scripted recolor, mask, crop, resize, composite, conversion or other pixel processing was applied. Every workspace PNG is byte-for-byte identical to its direct ImageGen output.

## Shared invariant prompt

> Faithfully redraw the referenced wl-s026 door as a photorealistic isolated product on pure white, changing only its finish. Preserve the exact 408:1102 tall narrow proportions, straight frontal camera, complete slim squared outer casing and lintel, the full-height dark recessed left reveal, narrow vertical stiles, top and bottom rails, exactly one broad middle rail, and exactly two molded rectangular panels: one much taller upper panel and one shorter lower panel. Preserve each panel's stepped inward bevels, 45-degree mitered corners, narrow raised inner lip and flat center. Preserve exactly one small circular handle rosette with one straight right-pointing lever and exactly one separate circular key escutcheon below. No extra or missing panel, rail, seam, groove, molding, line, hardware, hinge, glass, decoration, logo, text, badge, brand, watermark, wall, floor, prop, cast shadow, halo or vignette. Pure uniform white background. NO_LOGO. Direct built-in AI generation only.

## Framing and aspect-ratio retries

> Copy the original composition: the complete casing is almost edge-to-edge with only its original minimal white hairline, while every real outer edge remains visible and uncropped. Target the original `[2,5,3,3]` bounds scaled to generated resolution, ideally about `[4,9,6,6]`, with 0–6 pixels preferred and 12 pixels as the normal maximum. Preserve width/height 0.37024; do not widen, squash, crop or post-process the result.

Five direct results that appeared tight were rejected because ImageGen widened the door beyond the canonical ratio, including the new `roble` attempt 8 at 883×1781. One nominal zero-margin black result was rejected after native inspection revealed a detached dark edge line. New direct retries now place every accepted finish at or below the 12-pixel hard ceiling: `nogal` is `[9,10,10,6]` and `roble` is `[3,0,3,0]`. Native original-detail inspection confirms the oak contact keeps both outer corners, the entire header, both jambs, the left reveal and both bottom endpoints intact. No crop or resize was used.

## Finish calls

| Finish | Attempt | Built-in ImageGen ID | Result |
|---|---:|---|---|
| negro | 1 | `exec-780f9c03-3110-441f-85e9-217163aed57c` | rejected; margins 19/16/16/9 |
| wengue | 1 | `exec-9c0ad7cf-d764-4071-873f-4df638eb88b2` | accepted attempt 1 |
| gris-oscuro | 1 | `exec-c2e3efa5-3f93-4fde-8e7c-27f39f499dc1` | rejected; margins 22/22/19/21 |
| antracita | 1 | `exec-fbc4a3dc-d89a-4fd2-8118-68cd64da9695` | rejected; margins 14/11/13/0 |
| nogal | 1 | `exec-7faa6c33-41da-4f2a-b115-63044c6757df` | rejected; margins 18/16/20/11 |
| roble | 1 | `exec-c24fe855-cece-44dd-8deb-68dcb9a73cd6` | rejected; margins 23/20/25/10 |
| gris-claro | 1 | `exec-060c6381-af84-4c93-aec1-fa8f44a0a962` | rejected; margins 13/10/12/0 |
| natural | 1 | `exec-7d3afa62-d455-494d-a48b-7c6fbbde2fec` | rejected; margins 33/30/34/30 |
| blanco | 1 | `exec-bbad21a2-2857-4d7a-862a-489df38f5d52` | accepted attempt 1 |
| negro | 2 | `exec-2c36f268-7add-47d2-b578-a064cd3321f3` | rejected; margins 14/11/17/11 |
| gris-oscuro | 2 | `exec-1c0a67f0-af36-40e2-8ff0-a2e85b3d5cba` | rejected; margins 18/11/26/14 |
| antracita | 2 | `exec-3d7300a8-4929-4299-9f29-a6f1d56cf211` | rejected; margins 9/11/13/21 |
| nogal | 2 | `exec-b064b119-ae19-45ad-a680-5015565a00dd` | rejected; margins 24/19/22/15 |
| roble | 2 | `exec-705da150-4ddf-42f9-88c3-234e4b9cce49` | rejected; margins 14/11/11/8 |
| gris-claro | 2 | `exec-c16b1615-8d3b-4037-87e7-f41d7fefdfd1` | rejected; margins 17/11/16/0 |
| natural | 2 | `exec-a4922423-483a-48c1-948b-7c2e66f0eea1` | rejected; margins 15/12/17/4 |
| negro | 3 | `exec-32e9e236-8036-4195-9ba8-231a5740d346` | rejected; margins 16/15/13/16 |
| gris-oscuro | 3 | `exec-e0bfeda5-b20d-4afc-80ee-9812506749a4` | rejected; margins 12/11/13/8 |
| antracita | 3 | `exec-d0e9c967-4c1a-4fdf-91ce-9feddebc959e` | accepted attempt 3 |
| nogal | 3 | `exec-3b43bac1-0d8e-45ab-8f63-064f2af33c2d` | rejected; margins 18/16/22/7 |
| roble | 3 | `exec-6376dd5a-1e7c-44d4-a4e3-38b1f10b4413` | rejected after displacement; margins 14/10/12/6 |
| gris-claro | 3 | `exec-747f26da-2cba-4a90-bd0d-6a50282e4099` | rejected; margins 29/20/29/21 |
| natural | 3 | `exec-7d32e6a2-35dc-429c-9f55-cbce3f1fe823` | rejected; margins 24/12/27/10 |
| negro | 4 | `exec-8cb5e7b1-5ea2-49df-9486-16d85e17449c` | rejected; aspect ratio drift |
| nogal | 4 | `exec-a7411522-7f77-4ddc-b616-2a2fe82bb7cd` | rejected; aspect ratio drift |
| natural | 4 | `exec-68603dcc-9ab8-4796-8ae3-988f2540bcd3` | rejected; aspect ratio drift |
| gris-oscuro | 4 | `exec-ad7102cb-c6d0-4c2e-8e8c-69e73a80912d` | accepted attempt 4 |
| roble | 4 | `exec-fc308c3d-6af7-470f-8a63-d4a9cb2b5c31` | rejected; margins 13/11/15/5 |
| gris-claro | 4 | `exec-9f60be2c-9e7e-43f0-8817-e5210a175e01` | accepted attempt 4 |
| negro | 5 | `exec-91036f1d-88dd-4041-982a-c3393a98788e` | rejected; detached edge-line artifact |
| nogal | 5 | `exec-0fc3364b-e5a0-4806-90fe-fd5608bcc997` | rejected; margins 16/14/17/7 |
| roble | 5 | `exec-1ba98375-3a2d-4d7b-98a7-41d0b66145db` | rejected; aspect ratio drift |
| natural | 5 | `exec-bb611ead-d7d2-4ccb-bfee-ccdf24150db3` | rejected; margins 14/16/14/0 |
| negro | 6 | `exec-396fda3c-5f97-4955-815e-acce2125b08a` | rejected; margins 61/57/61/40 |
| nogal | 6 | `exec-e1ad854a-53e9-4d6a-8750-cc9fae5e947c` | rejected; margins 49/30/49/18 |
| roble | 6 | `exec-881a25bc-80b9-48ce-b6b6-86a00d1f28af` | rejected; margins 40/40/41/33 |
| natural | 6 | `exec-61e9c020-6a69-40b4-9f0b-2daed36b5b94` | rejected; margins 34/34/34/34 |
| negro | 7 | `exec-f3f82cad-add5-481f-91c9-8aaf27143afa` | accepted attempt 7 |
| nogal | 7 | `exec-6d876c8b-f4fd-4bd9-8c31-67b1d2c5dc89` | rejected after displacement; margins 14/13/14/0 |
| roble | 7 | `exec-1bd5044e-1a8d-4196-bd10-c4380f256628` | rejected; margins 13/14/14/9 |
| natural | 7 | `exec-da3bd3ce-f497-408f-9d54-8387966d891a` | accepted attempt 7 |
| nogal | 8 | `exec-8251f108-7625-4be0-90de-235d97c3c543` | rejected; margins 15/16/17/5 |
| roble | 8 | `exec-a8296a0a-df38-47ea-bb03-eca7c80c75ad` | rejected; 883×1781 aspect-ratio drift |
| nogal | 9 | `exec-29b9dd00-e6d7-44c1-966a-756de616a2c1` | accepted; margins 9/10/10/6 |
| roble | 9 | `exec-1336a9fb-ede4-46ed-a278-34a4a6c831fb` | accepted; margins 3/0/3/0 |

## Literal revised prompts recovered from the rollout

The following strings are copied literally from `image_generation_end.revised_prompt` in the session rollout; no generated image was used as a reference.

### `exec-8251f108-7625-4be0-90de-235d97c3c543` — nogal attempt 8, rejected

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-s026 original. Never use a generated image as reference. Direct ImageGen only; no filters, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Preserve exact wl-s026 identity: straight-on ultra-tall narrow traditional single door in a complete layered rectangular frame with both full-height outer jambs, intact top header, inner stops and a deep recessed reveal along the left side. Preserve exactly TWO centered raised rectangular panels with square corners and thick multi-step beveled molding: one very tall upper panel and one shorter near-square lower panel, separated by one broad plain horizontal rail. Preserve the original surrounding plain stiles/rails. No third panel, no extra molding, groove, line, curve, diagonal, glass or window. Preserve exactly one dark horizontal lever on one round rosette and one separate round key escutcheon directly below, at the left beside the lower part of the upper panel. No extra hardware.

CANVAS RATIO OVERRIDES ALL: retain canonical 408:1102 ultra-tall ratio, width/height = 0.3702, approximately 763×2061. Never output a conventional portrait, 1:2, 9:16, 886×1776 or any ratio above 0.385. Enlarge the complete intact assembly to leave only 3–9 physical white pixels at left, top and right and 0–4 at bottom; absolute maximum 12 per side. Keep every outer corner, header edge, reveal, jamb and both bottom endpoints fully visible. Pure white seamless background only; no broad padding, mat, border, wall, floor, room, scenery or broad shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.

Render the complete frame and leaf coherently in NOGAL: medium-rich walnut wood with restrained authentic vertical grain. Keep panel depth crisp and material realism restrained.
```

### `exec-a8296a0a-df38-47ea-bb03-eca7c80c75ad` — roble attempt 8, rejected

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-s026 original. Never use a generated image as reference. Direct ImageGen only; no filters, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Preserve exact wl-s026 identity: straight-on ultra-tall narrow traditional single door in a complete layered rectangular frame with both full-height outer jambs, intact top header, inner stops and a deep recessed reveal along the left side. Preserve exactly TWO centered raised rectangular panels with square corners and thick multi-step beveled molding: one very tall upper panel and one shorter near-square lower panel, separated by one broad plain horizontal rail. Preserve the original surrounding plain stiles/rails. No third panel, no extra molding, groove, line, curve, diagonal, glass or window. Preserve exactly one dark horizontal lever on one round rosette and one separate round key escutcheon directly below, at the left beside the lower part of the upper panel. No extra hardware.

CANVAS RATIO OVERRIDES ALL: retain canonical 408:1102 ultra-tall ratio, width/height = 0.3702, approximately 763×2061. Never output a conventional portrait, 1:2, 9:16, 886×1776 or any ratio above 0.385. Enlarge the complete intact assembly to leave only 3–9 physical white pixels at left, top and right and 0–4 at bottom; absolute maximum 12 per side. Keep every outer corner, header edge, reveal, jamb and both bottom endpoints fully visible. Pure white seamless background only; no broad padding, mat, border, wall, floor, room, scenery or broad shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.

Render the complete frame and leaf coherently in ROBLE: warm oak wood with restrained authentic vertical grain. Keep panel depth crisp and material realism restrained.
```

### `exec-29b9dd00-e6d7-44c1-966a-756de616a2c1` — nogal attempt 9, accepted

```text
Generate one fresh photorealistic AI catalog image from ONLY the canonical wl-s026 original. Never use generated imagery as reference. ImageGen only; no filter, script, crop, resize, mask, composite, conversion, upscaling or post-processing.

CANVAS FIRST: exactly match 408:1102, width/height 0.3702, approximately 763×2061, more than 2.70 times taller than wide. NEVER output 883×1781, 1:2, 9:16 or any ratio above 0.385.

Preserve exact complete traditional construction: both jambs/header/inner stops/deep left reveal; exactly two centered square-corner raised panels with thick multistep bevel—one tall upper and one shorter near-square lower—separated by one broad plain rail; original plain stiles/rails; exactly one dark horizontal lever on a round rosette and one separate round key escutcheon below, left of the upper panel. No third panel, extra molding/groove/line, glass, window or hardware. No Wonly logo, other logo, text or watermark.

In that exact narrow canvas, enlarge the intact outer assembly until it makes harmless near-contact: 0–6 actual white pixels left/top/right and 0–3 bottom, maximum 8. Every outer corner, header edge, reveal, jamb and bottom endpoint remains fully visible. Pure white background only; no broad padding, mat, border, room, wall, floor or scenery.

Apply NOGAL (medium-rich walnut) coherently to frame and leaf with restrained authentic grain and crisp panel depth.
```

### `exec-1336a9fb-ede4-46ed-a278-34a4a6c831fb` — roble attempt 9, accepted

```text
Generate one fresh photorealistic AI catalog image from ONLY the canonical wl-s026 original. Never use generated imagery as reference. ImageGen only; no filter, script, crop, resize, mask, composite, conversion, upscaling or post-processing.

CANVAS FIRST: exactly match 408:1102, width/height 0.3702, approximately 763×2061, more than 2.70 times taller than wide. NEVER output 883×1781, 1:2, 9:16 or any ratio above 0.385.

Preserve exact complete traditional construction: both jambs/header/inner stops/deep left reveal; exactly two centered square-corner raised panels with thick multistep bevel—one tall upper and one shorter near-square lower—separated by one broad plain rail; original plain stiles/rails; exactly one dark horizontal lever on a round rosette and one separate round key escutcheon below, left of the upper panel. No third panel, extra molding/groove/line, glass, window or hardware. No Wonly logo, other logo, text or watermark.

In that exact narrow canvas, enlarge the intact outer assembly until it makes harmless near-contact: 0–6 actual white pixels left/top/right and 0–3 bottom, maximum 8. Every outer corner, header edge, reveal, jamb and bottom endpoint remains fully visible. Pure white background only; no broad padding, mat, border, room, wall, floor or scenery.

Apply ROBLE (warm oak) coherently to frame and leaf with restrained authentic grain and crisp panel depth.
```

Native-detail inspection confirmed complete silhouettes and exact two-panel geometry in all nine accepted files. No file under `public/` was changed and no promotion, conversion, commit or push occurred.
