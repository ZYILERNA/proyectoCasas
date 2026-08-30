# MADERAACÚSTICA/wl-s020 — direct built-in ImageGen prompt audit

Sixteen independent built-in ImageGen calls produced nine accepted PNGs and seven preserved rejects. Every call used only `public/images/PUERTAS/MADERAACÚSTICA/wl-s020/original.webp` (SHA-256 `e62e2a2e44173ee4919ea120623e1a22b070d4c99b2d17a3a2577c542607cef4`).

No generated output, logo image or other reference was used. No filter, scripted recolor, mask, crop, resize, composite, conversion or other pixel processing was applied. Every workspace PNG is byte-for-byte identical to its direct ImageGen output.

## Shared invariant prompt

> Precise finish-only AI regeneration from Image 1, the sole reference and canonical geometry source. Preserve the exact wl-s020 acoustic door: source ratio 403:1069, perfectly front-facing orthographic view; one otherwise plain unpanelled leaf; complete slim squared casing with far-left outer post, straight top lintel, narrow right post and the same shallow inner bevels; exactly one deep near-black recessed full-height vertical channel between the far-left post and leaf; exactly one small dark circular handle rosette inside that channel, exactly one slim straight dark horizontal lever pointing right onto the leaf, and exactly one separate small dark circular key escutcheon immediately below. Preserve exactly one narrow horizontal contrasting warm natural-wood accent band across the full leaf width below the hardware, at the reference's exact height and position, bounded by exactly two very thin dark straight edges. The accent band remains warm wood and distinct from the main finish. Preserve all dimensions, relative spacing, depths, gaps, outlines, bevels and hardware positions. No extra panel, seam, groove, line, band, channel, strip, inlay, hardware, hinge, trim, glass, decoration, logo, text, badge, brand, watermark, architecture, room, wall, floor, prop, perspective, cast shadow, halo or vignette. Pure uniform white background. NO_LOGO. Direct built-in AI generation only, not a filter.

## Framing clause and retries

> Match the canonical original's `[3,4,3,2]` perimeter. Enlarge the complete intact assembly uniformly so its outer posts and lintel are ideally only 0–6 pixels from the canvas and its bottom endpoints 0–4 pixels away. Do not crop real geometry.

Retries strengthened that same framing instruction whenever a direct result was not the tightest available. No crop, resize or other post-processing was used. The first `natural` result exceeded the normal 12-pixel maximum; attempts two and three reduced its maximum to 12 and then 10 pixels.

## Finish calls

| Finish | Built-in ImageGen ID | Result |
|---|---|---|
| negro | `exec-c48b091c-ebba-4ed8-9965-28db778188f1` | rejected; tighter retry selected |
| negro | `exec-dff269ca-512e-4adf-a479-e6adc57d2059` | accepted attempt 2 |
| wengue | `exec-eb332bf8-d64d-4416-9e27-a9ed7ffdc492` | accepted attempt 1 |
| wengue | `exec-bc03f386-78a5-4160-9e76-643017635e6e` | rejected; did not improve selection |
| gris-oscuro | `exec-0ff1c210-1de0-40b5-a25c-1a2eaa7b5973` | rejected; tighter retry selected |
| gris-oscuro | `exec-10213472-01c9-45bf-b8c6-2317b2201e3f` | accepted attempt 2 |
| antracita | `exec-3c338600-77e1-4cdf-ab3e-a6b431ac0843` | rejected; tighter retry selected |
| antracita | `exec-fe9e523a-106c-4176-8ba3-fff926cb54bb` | accepted attempt 2 |
| nogal | `exec-b0b0999c-ab5c-4229-9f43-14e7f06f84d0` | accepted attempt 1 |
| roble | `exec-10c5f957-ba7b-4581-97d6-b0df121bf523` | accepted attempt 1 |
| gris-claro | `exec-f4dd7124-6d7e-4886-a14b-9be2fcd5020f` | accepted attempt 1 |
| natural | `exec-4baaadb0-eca0-40e1-8487-679608185faa` | rejected; 15-pixel margin |
| natural | `exec-3876ea95-69e2-4106-a5d9-1361b4d2b945` | rejected; tighter third result selected |
| natural | `exec-833ab46b-a4f1-420c-be43-2e7137531e40` | accepted attempt 3 |
| blanco | `exec-d0fd752b-1873-449e-8f7f-c1f2c094d5f0` | rejected; tighter retry selected |
| blanco | `exec-278ff8b5-81df-4705-89ea-fad3f3c630fb` | accepted attempt 2 |

Native-detail inspection confirmed complete silhouettes and exact signature geometry in all nine accepted files. No file under `public/` was changed and no promotion, conversion, commit or push occurred.
