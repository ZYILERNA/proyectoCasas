# MADERAACÚSTICA/wl-5110 — direct ImageGen prompt ledger

Tool mode: built-in ImageGen. The historical ledger below covers 11 independent calls; the minimum-margin revision section adds 18 more, for 29 total. Every call referenced only `public/images/PUERTAS/MADERAACÚSTICA/wl-5110/original.webp`; no generated output, logo, mask, or auxiliary image was ever supplied as a reference.

## Shared production specification

Use case: `precise-object-edit`. Asset type: ecommerce catalog door-finish variant. Image 1 is the sole canonical edit target and architecture/composition reference.

Re-render the same complete straight-on single-leaf door assembly and change only the visible wood finish on leaf and frame. Preserve the complete top header, both full-height side jambs, both bottom ends, original frame joinery, one full-height vertical seam near the left quarter, one low horizontal seam, the narrow lower-left vertical groove cluster, and the original flat-panel proportions. Preserve exactly one short horizontal lever on one circular rosette plus exactly one separate circular key cylinder below it, in their original positions on the left.

Keep a plain pure-white catalog background. Match the canonical 400:1074 extreme portrait proportion (width/height about 0.3724). The complete frame must fill almost all canvas width and height, with only minimum hairline clearance required to keep every outer edge visible. No noticeable padding, wide canvas, shrink/zoom-out, crop, clipped edge, tilt, or perspective change.

NO_LOGO constraints repeated in every call: no logo, brand mark, badge, plaque, text, letters, numbers, microtext, pseudotext, watermark, signature, QR code, or symbols. Avoid extra grooves, panels, molding, hinges, peepholes, keyholes, handles, decoration, floor, wall, room, props, or scene shadows.

## Call ledger and finish-specific instructions

| Order | Finish | Attempt | Generator ID | Outcome | Finish-specific request / targeted retry |
|---:|---|---:|---|---|---|
| 1 | negro | 1 | `exec-02428c02-9e9d-4d84-a313-82fab8b24b2a` | PASS | Uniform deep neutral matte black with restrained realistic vertical texture; hardware remains realistic silver/dark metal. This call used “nearly filling” language before the margin rule was strengthened; its measured margins and native view passed the strengthened rule. |
| 2 | wengue | 1 | `exec-e10cbf4c-1981-4bf8-9977-aded3669f74d` | REJECT | Very dark espresso-brown wenge with fine authentic vertical grain, never orange/red. Rejected after native metrics: 864×1821, aspect deviation 27.3937%. |
| 3 | gris-oscuro | 1 | `exec-4b8be30b-3b9b-4f32-9eee-57929c466eee` | PASS | Refined dark neutral slate gray with subtle fine vertical texture, visibly gray rather than black. Explicitly required virtually full-canvas occupancy with only hairline clearance. |
| 4 | antracita | 1 | `exec-b47d0e5c-704e-4029-b3ea-d14dc7312b4a` | PASS | Deep anthracite charcoal gray, neutral-to-slightly-warm, not pure black, with restrained vertical texture. Explicit hairline-clearance framing. |
| 5 | nogal | 1 | `exec-34b59263-88c7-4ad5-a1ae-0522d7133f13` | REJECT | Premium medium-dark neutral walnut with elegant vertical grain. Rejected: 886×1774, aspect deviation 34.0986%, and visible lateral padding of 23/36 px under the RGB<245 metric. |
| 6 | nogal | 2 | `exec-346b876e-58c4-46cc-b827-b233c7e0e9e5` | PASS | Fresh call from the original only. Added mandatory exact 400:1074 canvas language and target 0.5–1% white clearance; no wide canvas, shrink, zoom-out, crop, or clipping. |
| 7 | roble | 1 | `exec-7ab0855d-38d0-48a6-befa-2ef5f12c1120` | PASS | Warm honey-golden oak with authentic visible vertical oak grain, natural rather than orange or saturated yellow; exact 400:1074 and minimum-clearance instructions. |
| 8 | gris-claro | 1 | `exec-331d4b3e-0abf-4c08-9bc0-9f26deec63f0` | PASS | Soft neutral light gray, clearly distinct from white, subtle fine vertical texture, no blue cast; retain tonal separation from the white background while using minimum clearance. |
| 9 | natural | 1 | `exec-ade24bc9-7a49-4103-884d-4920900c124c` | PASS | Pale natural untreated-looking wood, light beige-tan, delicate authentic vertical grain, low saturation; exact 400:1074 and minimum-clearance instructions. |
| 10 | blanco | 1 | `exec-b92ecda1-7e96-41fb-b86c-25b64dc79d5b` | PASS | Clean neutral satin white with restrained edge shading so frame, seams, and panels remain readable against pure white; exact 400:1074 and minimum-clearance instructions. |
| 11 | wengue | 2 | `exec-bd71234e-ce2c-435f-975c-d89d61b1553d` | PASS | Fresh call from the original only after aspect rejection. Mandatory very-tall 400:1074 canvas, 0.5–1% target clearance, full outer contour, and explicit preservation of lower-left groove detailing. |

## Retry prompts

The two retries were new built-in ImageGen calls and did not reference their rejected predecessors.

For `nogal` attempt 2, the targeted addition was: “MANDATORY CANVAS AND SCALE: Match Image 1's exact extreme portrait canvas proportion, 400:1074 (width/height approximately 0.3724). The complete outer door frame must fill almost all of that narrow canvas: target roughly 0.5–1% pure-white clearance at the left and right and similarly minimal clearance at top/bottom, while retaining every outer edge and both bottom ends fully visible. Do not make a wider canvas. Do not shrink or zoom out. No noticeable white padding. Do not crop or clip any frame edge.”

For `wengue` attempt 2, the targeted addition was: “This is a very tall, very narrow output, not a conventional portrait. Match 400:1074 (width/height approximately 0.3724). Do not use the previously wrong wider aspect. Preserve the original narrow vertical groove detailing below the horizontal seam. Target roughly 0.5–1% white clearance while every outer edge remains fully visible.”

Accepted assets and both rejected attempts were copied byte-for-byte from the paths recorded in `manifest.json`. No pixel transformation or format conversion was performed.

## Minimum-margin revision — 18 additional independent calls

The exact revised prompts were recovered directly from `payload.revised_prompt` in the 18 `image_generation_end` events in:

`C:/Users/zhen/.codex/sessions/2026/08/11/rollout-2026-08-11T09-58-35-019fefd4-996a-77f0-a377-59d6191e00c0.jsonl`

The repeated prompt families below are recorded as exact templates plus exact substitutions. This is a lossless representation of every literal prompt and is checked byte-for-byte at the text level against the source events.

| Order | Finish | Revision attempt | Result | Generator ID | UTC | Workspace file |
|---:|---|---:|---|---|---|---|
| 1 | negro | 1 | REJECT — wide/padding | `exec-3d9c0273-378b-47d6-a9e0-637a4577cdba` | 2026-08-29T15:30:00.895Z | `_rejected/negro-minimum-margin-revision-attempt01-wide-padding.png` |
| 2 | antracita | 1 | REJECT — wide/padding | `exec-7fc7fc92-7918-49e5-be03-48e79c525755` | 2026-08-29T15:30:21.111Z | `_rejected/antracita-minimum-margin-revision-attempt01-wide-padding.png` |
| 3 | negro | 2 | REJECT — wide/padding | `exec-65a6324e-a6f2-4419-bf33-a4ca9ea3700c` | 2026-08-29T15:31:13.038Z | `_rejected/negro-minimum-margin-revision-attempt02-wide-padding.png` |
| 4 | antracita | 2 | REJECT — padding >12 | `exec-ca568799-023b-407f-9845-3bab71ac518d` | 2026-08-29T15:31:35.303Z | `_rejected/antracita-minimum-margin-revision-attempt02-padding-over12.png` |
| 5 | negro | 3 | REJECT — wide/contact | `exec-ad2a07d0-ab6f-47f8-8fdf-2a5f981c6153` | 2026-08-29T15:32:31.392Z | `_rejected/negro-minimum-margin-revision-attempt03-wide-contact.png` |
| 6 | negro | 4 | REJECT — wide/contact | `exec-e607f83b-20e6-4525-935b-938b61404057` | 2026-08-29T15:32:50.007Z | `_rejected/negro-minimum-margin-revision-attempt04-wide-contact.png` |
| 7 | antracita | 3 | REJECT — wide/contact | `exec-f478c434-9012-4f9d-80d7-0ff5535d3f8e` | 2026-08-29T15:33:07.639Z | `_rejected/antracita-minimum-margin-revision-attempt03-wide-contact.png` |
| 8 | antracita | 4 | REJECT — wide/contact | `exec-0aca0ba4-a7f2-46f7-b2a9-e897564b2679` | 2026-08-29T15:33:29.903Z | `_rejected/antracita-minimum-margin-revision-attempt04-wide-contact.png` |
| 9 | negro | 5 | REJECT — wide/padding | `exec-6b519949-26fc-43ea-af1e-c93f236b6d7b` | 2026-08-29T15:34:44.774Z | `_rejected/negro-minimum-margin-revision-attempt05-wide-padding.png` |
| 10 | negro | 6 | REJECT — wide/padding | `exec-1aa86189-6d2e-4d4c-bd41-c7ad6058dc18` | 2026-08-29T15:35:14.730Z | `_rejected/negro-minimum-margin-revision-attempt06-wide-padding.png` |
| 11 | antracita | 5 | REJECT — padding >12 | `exec-29df5ff2-7b84-4547-beeb-d5a6b80b1693` | 2026-08-29T15:35:35.699Z | `_rejected/antracita-minimum-margin-revision-attempt05-padding-over12.png` |
| 12 | antracita | 6 | REJECT — wide/padding | `exec-bc7e0377-ccdb-4548-8992-c20b7a86f45a` | 2026-08-29T15:35:51.864Z | `_rejected/antracita-minimum-margin-revision-attempt06-wide-padding.png` |
| 13 | negro | 7 | REJECT — valid, superseded | `exec-bb4fe4ec-ded0-483e-b2f4-ac4bb56daffa` | 2026-08-29T15:36:55.848Z | `_rejected/negro-minimum-margin-revision-attempt07-valid-contact-superseded.png` |
| 14 | negro | 8 | REJECT — valid, superseded | `exec-bdd9ab7e-2ce2-4e94-988c-d365bf5232c0` | 2026-08-29T15:37:10.416Z | `_rejected/negro-minimum-margin-revision-attempt08-valid-near-contact-superseded.png` |
| 15 | negro | 9 | PASS | `exec-46a89fcb-0e54-4335-bad8-69f6acf2d521` | 2026-08-29T15:37:29.034Z | `negro.png` |
| 16 | antracita | 7 | REJECT — valid, superseded | `exec-433a8840-b3b0-4046-87b8-54cd4919e5ac` | 2026-08-29T15:38:34.053Z | `_rejected/antracita-minimum-margin-revision-attempt07-valid-near-contact-superseded.png` |
| 17 | antracita | 8 | PASS | `exec-c5ac55a2-08a7-4129-b82d-697a4c90d987` | 2026-08-29T15:38:52.451Z | `antracita.png` |
| 18 | antracita | 9 | REJECT — padding >12 | `exec-f9564f4c-f376-4158-a242-70707484195d` | 2026-08-29T15:39:09.667Z | `_rejected/antracita-minimum-margin-revision-attempt09-padding-over12.png` |

### Revision template P1 — exact text

Calls: `exec-3d9c0273-378b-47d6-a9e0-637a4577cdba`, `exec-7fc7fc92-7918-49e5-be03-48e79c525755`.

```text
Regenerate one fresh photorealistic studio product image from ONLY the supplied canonical wl-5110 original. Never use a generated image as reference. Direct ImageGen only; no filter, scripted recolor, crop, resize, mask, composite, conversion, upscaling or post-processing.

Preserve exact wl-5110 identity: straight-on ultra-tall narrow single door; complete layered rectangular frame with both full-height outer jambs, intact top header, inner recess and far-left reveal. Preserve exactly ONE straight horizontal groove across the leaf near 69% height. Preserve exactly ONE straight vertical groove from the inner top down to the bottom, near the left quarter of the leaf. Below the horizontal groove only, preserve exactly THREE additional short parallel vertical grooves to the left of that full-height groove, making four closely spaced parallel vertical lines in the lower-left zone including the continuing full-height line. All four lower lines continue cleanly to the bottom. No other groove, line, panel, diagonal, curve or window. Preserve exactly one horizontal lever on one round rosette and one separate round key escutcheon below it, both left of the full-height groove and above the horizontal groove. No extra hardware.

CANVAS RATIO OVERRIDES ALL: retain canonical 400:1074 ultra-tall ratio, width/height = 0.3724, approximately 766×2057. Never output a conventional portrait, 1:2, 9:16, 887×1772 or any ratio above 0.385. Fit the complete intact assembly large: leave 4–9 physical white pixels at left, top and right, and only 0–5 pixels at bottom; absolute maximum 12 px per side. Move the complete bottom endpoints downward close to the canvas without cropping. Every corner, header edge, reveal, jamb and both bottom endpoints remains fully visible. Pure white seamless background; no mat, broad padding, border, wall, floor, room, scenery or broad shadow field.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark or pseudotext.

{{FINISH_PARAGRAPH}}
```

Exact P1 substitutions:

- `exec-3d9c0273-378b-47d6-a9e0-637a4577cdba`: `Apply a NEGRO finish—refined near-black wood with readable restrained vertical grain—coherently to the complete frame and leaf, retaining crisp groove readability and authentic material realism.`
- `exec-7fc7fc92-7918-49e5-be03-48e79c525755`: `Apply a ANTRACITA finish—rich graphite-charcoal wood with readable restrained vertical grain—coherently to the complete frame and leaf, retaining crisp groove readability and authentic material realism.`

### Revision template P2 — exact text

Calls: `exec-65a6324e-a6f2-4419-bf33-a4ca9ea3700c`, `exec-ca568799-023b-407f-9845-3bab71ac518d`.

```text
Create one fresh AI-generated photorealistic studio image using ONLY the supplied canonical wl-5110 original. Never reference any generated image. No filters, scripts, crop, resize, masking, compositing, conversion, upscaling or post-processing.

CANVAS SHAPE IS THE PRIMARY REQUIREMENT: exactly match the source's extremely narrow 400:1074 proportions, width/height 0.3724, approximately 766×2055. The canvas must be much taller than 2.6 times its width. NEVER output 885×1778, 1:2, 9:16 or any ratio over 0.385.

Preserve exact wl-5110 geometry: complete layered frame with two outer jambs, full header, inner recess and left reveal; exactly one horizontal groove at about 69% height; exactly one vertical groove through the leaf from inner top to bottom near the left quarter; below the horizontal groove only, exactly three additional parallel vertical grooves to its left, creating four close lower lines including the continuing line. Preserve all four lower line endpoints. Exactly one horizontal lever on one round rosette and one separate round key escutcheon below, above the horizontal groove. No extra groove, panel, diagonal, curve, window or hardware. No Wonly logo, logo, text, badge, emblem, watermark or pseudotext.

In the mandatory narrow canvas, enlarge the entire intact assembly to within 4–9 physical pixels of left/top/right and 0–5 pixels of bottom, absolute maximum 12. Keep every outer corner, header edge, reveal, jamb and bottom endpoint fully visible. Pure white seamless background only; no mat, padding, border, room, wall, floor, scenery or broad shadow field.

{{FINISH_PARAGRAPH}}
```

Exact P2 substitutions:

- `exec-65a6324e-a6f2-4419-bf33-a4ca9ea3700c`: `Render the complete frame and leaf coherently in NEGRO (deep black) with restrained authentic vertical grain and crisp readable grooves.`
- `exec-ca568799-023b-407f-9845-3bab71ac518d`: `Render the complete frame and leaf coherently in ANTRACITA (graphite charcoal) with restrained authentic vertical grain and crisp readable grooves.`

### Revision template P3 — exact text

Calls: `exec-ad2a07d0-ab6f-47f8-8fdf-2a5f981c6153`, `exec-e607f83b-20e6-4525-935b-938b61404057`, `exec-f478c434-9012-4f9d-80d7-0ff5535d3f8e`, `exec-0aca0ba4-a7f2-46f7-b2a9-e897564b2679`.

```text
Generate one fresh photorealistic AI product image from ONLY the canonical wl-5110 original; never use a generated reference. ImageGen only, without filters, scripts, crop, resize, masks, compositing, conversion or post-processing.

Use the canonical ultra-narrow 400:1074 canvas ratio, width/height 0.3724, about 766×2053; it must be over 2.65 times taller than wide. Never output 885×1778, width/height near 0.50 or any ratio above 0.385.

Preserve exact complete frame/reveal and leaf. Exactly one horizontal groove at ~69% height; exactly one full-height leaf groove near the left quarter; below the horizontal only, exactly three extra parallel grooves to its left, yielding exactly four close lower vertical lines including the continuing groove. Exactly one lever on a round rosette and one separate round key escutcheon below. No other line, groove, panel, diagonal, window or hardware. No Wonly logo, logo, text or watermark.

The entire intact outer silhouette must be enlarged until it makes harmless edge contact: left jamb reaches x=0, right jamb reaches the final x pixel, intact top header reaches y=0, and both intact bottom jamb endpoints reach within 0–3 pixels of the bottom. Edge contact is REQUIRED, but do not cut off any corner, header, reveal, jamb or endpoint. No white padding, mat, border, wall, room, floor, scenery or broad shadow field; only a seamless white background in the small negative spaces.

{{FINISH_AND_COMPOSITION_PARAGRAPH}}
```

Exact P3 substitutions:

- `exec-ad2a07d0-ab6f-47f8-8fdf-2a5f981c6153`: `Render the complete frame and leaf coherently in NEGRO (deep refined black), with restrained vertical grain and readable grooves. Composition attempt A: obey edge contact and the source ratio exactly.`
- `exec-e607f83b-20e6-4525-935b-938b61404057`: `Render the complete frame and leaf coherently in NEGRO (deep refined black), with restrained vertical grain and readable grooves. Composition attempt B: obey edge contact and the source ratio exactly.`
- `exec-f478c434-9012-4f9d-80d7-0ff5535d3f8e`: `Render the complete frame and leaf coherently in ANTRACITA (graphite charcoal), with restrained vertical grain and readable grooves. Composition attempt A: obey edge contact and the source ratio exactly.`
- `exec-0aca0ba4-a7f2-46f7-b2a9-e897564b2679`: `Render the complete frame and leaf coherently in ANTRACITA (graphite charcoal), with restrained vertical grain and readable grooves. Composition attempt B: obey edge contact and the source ratio exactly.`

### Revision template P4 — exact text

Calls: `exec-6b519949-26fc-43ea-af1e-c93f236b6d7b`, `exec-1aa86189-6d2e-4d4c-bd41-c7ad6058dc18`, `exec-29df5ff2-7b84-4547-beeb-d5a6b80b1693`, `exec-bc7e0377-ccdb-4548-8992-c20b7a86f45a`.

```text
Regenerate one photorealistic studio product image from ONLY the supplied canonical wl-5110 original. Direct ImageGen only; never use a generated image; no filters, scripts, crop, resize, masks, compositing, conversion, upscaling or post-processing.

FIRST choose an EXTRA-NARROW canvas matching the original 400:1074 bitmap: width is only 37.24% of height. Required output is approximately 766 pixels wide × 2054 pixels high. Do not use 886×1776, 885×1778, a 1:2 canvas, a 9:16 canvas, or width above 38.5% of height. The full result must visually retain the original's unusually thin catalog silhouette.

Then preserve exact geometry: complete outer jambs/header/inner recess/left reveal; exactly one horizontal groove at 69%; one vertical groove from inner top to bottom near the left quarter; below the horizontal only, exactly three additional parallel grooves to its left, so exactly four close vertical lines appear in the lower-left zone including the continuing groove. Exactly one lever on one round rosette and one separate round key escutcheon below, both above the horizontal. No extra line, panel, curve, diagonal, window or hardware. No Wonly logo, logo, text, badge or watermark.

Within that mandatory 400:1074 canvas, enlarge the complete intact assembly to at least 97% of canvas width and 99% of height. Target white clearances of 4–10 pixels at left/top/right and 0–5 at bottom, never above 12. Do not crop any corner, header edge, reveal, jamb or bottom endpoint. Seamless pure white background only; no broad padding, mat, border, wall, floor, room, scenery or broad shadow field.

{{FINISH_AND_ATTEMPT_PARAGRAPH}}
```

Exact P4 substitutions:

- `exec-6b519949-26fc-43ea-af1e-c93f236b6d7b`: `Apply NEGRO (deep black) coherently to the complete frame and leaf, with restrained vertical grain and clear grooves. Independent attempt 1.`
- `exec-1aa86189-6d2e-4d4c-bd41-c7ad6058dc18`: `Apply NEGRO (deep black) coherently to the complete frame and leaf, with restrained vertical grain and clear grooves. Independent attempt 2.`
- `exec-29df5ff2-7b84-4547-beeb-d5a6b80b1693`: `Apply ANTRACITA (graphite charcoal) coherently to the complete frame and leaf, with restrained vertical grain and clear grooves. Independent attempt 1.`
- `exec-bc7e0377-ccdb-4548-8992-c20b7a86f45a`: `Apply ANTRACITA (graphite charcoal) coherently to the complete frame and leaf, with restrained vertical grain and clear grooves. Independent attempt 2.`

### Revision template P5 — exact text

Calls: `exec-bb4fe4ec-ded0-483e-b2f4-ac4bb56daffa`, `exec-bdd9ab7e-2ce2-4e94-988c-d365bf5232c0`, `exec-46a89fcb-0e54-4335-bad8-69f6acf2d521`, `exec-433a8840-b3b0-4046-87b8-54cd4919e5ac`, `exec-c5ac55a2-08a7-4129-b82d-697a4c90d987`, `exec-f9564f4c-f376-4158-a242-70707484195d`.

```text
Regenerate a new photorealistic studio product image from ONLY the supplied canonical wl-5110 original. Never use any generated image. Direct ImageGen only; no filter, recolor script, crop, resize, mask, composite, conversion, upscale or post-processing.

{{FINISH_PARAGRAPH}}

CANVAS MUST BE THE SOURCE'S 400:1074 RATIO: width/height 0.3724, about 766×2054, over 2.68 times taller than wide. NEVER use 886×1776 or any width/height above 0.385. In that exact narrow canvas, zoom the intact assembly closer than the source: the complete left outer jamb should begin within 0–8 actual pixels of x=0 and the complete right jamb should end within 0–8 pixels of the last x; top 0–8 pixels, bottom 0–4. Absolute maximum 10 white pixels per side. Keep every corner, header edge, reveal, jamb and bottom endpoint intact. Pure white background only; absolutely no broad surrounding whitespace, mat, border, wall, floor, room or scenery.

{{COMPOSITION_PARAGRAPH}}
```

Exact P5 finish substitutions:

- Negro calls: `Render complete frame and leaf in refined deep NEGRO with restrained vertical grain. Preserve exact geometry: complete frame/reveal; one horizontal groove near 69%; one vertical groove from top to bottom near the left quarter; exactly three additional parallel vertical grooves below the horizontal and to its left, yielding four lower vertical lines total; one lever on one round rosette and one separate round key escutcheon below. No extra geometry/hardware and no Wonly/logo/text/watermark.`
- Antracita calls: `Render complete frame and leaf in rich graphite ANTRACITA with restrained vertical grain. Preserve exact geometry: complete frame/reveal; one horizontal groove near 69%; one vertical groove from top to bottom near the left quarter; exactly three additional parallel vertical grooves below the horizontal and to its left, yielding four lower vertical lines total; one lever on one round rosette and one separate round key escutcheon below. No extra geometry/hardware and no Wonly/logo/text/watermark.`

Exact P5 composition substitutions:

- `exec-bb4fe4ec-ded0-483e-b2f4-ac4bb56daffa`, `exec-433a8840-b3b0-4046-87b8-54cd4919e5ac`: `Independent composition A. The ultra-narrow 400:1074 canvas and 0–10 px margins are mandatory.`
- `exec-bdd9ab7e-2ce2-4e94-988c-d365bf5232c0`, `exec-c5ac55a2-08a7-4129-b82d-697a4c90d987`: `Independent composition B. The ultra-narrow 400:1074 canvas and 0–10 px margins are mandatory.`
- `exec-46a89fcb-0e54-4335-bad8-69f6acf2d521`, `exec-f9564f4c-f376-4158-a242-70707484195d`: `Independent composition C. The ultra-narrow 400:1074 canvas and 0–10 px margins are mandatory.`

## Revision selection note

The active set now uses revision calls `exec-46a89fcb-0e54-4335-bad8-69f6acf2d521` for negro and `exec-c5ac55a2-08a7-4129-b82d-697a4c90d987` for antracita. The other seven finishes retain their historical direct ImageGen selections. Both displaced historical actives, all sixteen non-selected revision calls, and both historical rejects remain byte-for-byte in `_rejected`. No PNG was filtered, recolored, cropped, resized, composited, converted, upscaled or otherwise post-processed.
