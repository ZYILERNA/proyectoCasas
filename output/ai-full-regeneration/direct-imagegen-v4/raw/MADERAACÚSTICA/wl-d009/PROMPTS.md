# MADERAACÚSTICA/wl-d009 — lossless built-in ImageGen prompt audit

All 38 independent ImageGen calls used one sole visual reference:

`public/images/PUERTAS/MADERAACÚSTICA/wl-d009/original.webp`

Canonical SHA-256 before and after the work: `d79c459f9fa7425befa35be18ae82236db30025617d1a07cf58a38965f51939c`.

Policy: `NO_LOGO_MINIMAL_MARGIN_ASPECT_LOCK`. No generated image or logo asset was ever a reference. No filter, scripted recolor, mask, crop, resize, composite, conversion, or post-generation pixel edit was applied. The 29 revision prompts were recovered from the complete rollout as the literal `revised_prompt` strings. The templates and exact substitutions below are a lossless representation; the per-call SHA-256 is over the exact UTF-8 prompt with no trailing newline.

## Historical family H — 9 calls

Each historical call used this template verbatim after replacing `{{FINISH_CLAUSE}}`. `{{WHITE_AVOID}}` was empty except for `blanco`, where it was `, beige or yellow cast`.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference.
Primary request: Change only every visible door-leaf wood surface to an exact {{FINISH_CLAUSE}}.
Subject: the exact same acoustic door model wl-d009 shown in Image 1.
Style/medium: high-fidelity photorealistic architectural product photography.
Composition/framing: preserve the exact extremely tall narrow straight-on silhouette, complete outer frame, near-flush catalog crop, minimal white background, scale, and original 399:1069 width-to-height ratio of about 0.373. Do not widen, shorten, crop, tilt, or add margin.
Critical geometry: preserve the single thin black closed inset outline exactly. It is a tall symmetrical squared contour with no curves and no diagonals: a shorter centered top horizontal segment; at each top end a short vertical drop, a short outward horizontal shoulder, then one very long vertical side; near the bottom each long side turns inward with a short horizontal shoulder, then drops a short distance; finally one shorter centered bottom horizontal segment closes the shape. Preserve all twelve right-angle corners, the exact widths, the exact upper and lower step heights, and the uninterrupted plain central field.
Hardware/frame invariants: preserve the narrow dark recessed reveal immediately inside the far-left frame; the layered neutral gray wood perimeter frame and top mouldings; exactly one dark horizontal lever handle on one round rosette left of the inset outline; and exactly one separate circular key escutcheon directly below, with identical size and placement.
Constraints: change only the leaf finish; retain frame finish, complete contour path, proportions, depths, shadows, vertical grain direction, hardware count and placement, neutral lighting, plain catalog background, and composition. No redesign, new objects, crop, resize, reframing, or added margin.
Avoid: logo, WONLY mark, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding{{WHITE_AVOID}}, duplicated or missing hardware, simple rectangle replacing the stepped contour, missing corners, curves, diagonals, extra outlines or panels, room scene, people, props.
```

Historical substitutions and final disposition:

- `negro` — `NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible` — `exec-932bcb42-16b0-4513-b01b-bf99a79ea016` — ACTIVE.
- `wengue` — `WENGUÉ finish: very dark espresso-brown tropical wood with restrained near-black vertical grain, clearly brown rather than neutral black` — `exec-70d4d7e2-8ff3-4fe9-8ece-83967d61e26a` — REJECTED/displaced.
- `gris-oscuro` — `GRIS OSCURO finish: deep neutral charcoal-gray stained wood, clearly gray rather than black, with subtle authentic vertical grain` — `exec-9656920c-d112-40e3-9644-25f6037c10a2` — REJECTED/displaced.
- `antracita` — `ANTRACITA finish: saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain` — `exec-afbeaf3c-0c3b-441c-89dd-e397b986231f` — REJECTED/displaced.
- `nogal` — `NOGAL finish: refined medium-rich warm walnut brown with natural darker vertical grain, elegant and realistic, neither orange nor red` — `exec-b3a6414e-53ce-4a32-8581-022d7a5bfea7` — ACTIVE; retained because the revision result was too wide.
- `roble` — `ROBLE finish: light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange` — `exec-e0ffbdb5-6ceb-4fdc-9a08-0029353e39b2` — REJECTED/displaced.
- `gris-claro` — `GRIS CLARO finish: pale neutral light-gray stained wood, soft cool silver-gray with subtle authentic vertical grain, clearly lighter than the original leaf yet distinct from pure white` — `exec-c3f87deb-57d3-4439-a9f3-b0c0883c752f` — ACTIVE; retained because the revision result was too wide.
- `natural` — `NATURAL finish: very light untreated natural wood in warm pale beige and sand tones, matte, unstained, with understated authentic vertical grain` — `exec-83945222-e0e4-43c7-9dd1-5ea18b083aae` — REJECTED/displaced.
- `blanco` — `BLANCO finish: clean neutral matte white-painted wood without cream or gray cast, with very subtle authentic vertical grain still visible` — `exec-2d929d22-30f9-4239-bf17-a662c03eba89` — ACTIVE; used the non-empty `{{WHITE_AVOID}}` substitution.

## Revision family A — 9 calls

Exact template; replace only `{{FINISH_PHRASE}}`:

```text
Edit ONLY the supplied original wl-d009 door reference and derive this fresh result from no generated image. Reproduce this exact isolated catalog door, changing only the flat leaf finish to {{FINISH_PHRASE}} while retaining the layered neutral-gray wood perimeter frame and top moldings. Preserve the original tall 399:1069 proportions, straight-on view, complete square frame, narrow dark recessed far-left reveal, vertical grain direction and all depths. CRITICAL signature geometry: retain exactly one thin closed dark symmetrical stepped inset outline on the leaf, with no curves or diagonals: one shorter centered top horizontal segment; at each top end one short vertical drop then one short outward horizontal shoulder; exactly two long vertical sides; near the bottom each side turns inward through one short horizontal shoulder then drops through one short vertical segment; one shorter centered bottom horizontal segment closes the contour. Preserve exactly all twelve right-angle corners and the uninterrupted plain central field. Preserve exactly one dark horizontal lever on one round rosette left of the outline and exactly one separate circular key escutcheon below. NO Wonly logo; no logo, brand, text, letters, digits, badge, symbol, watermark or pseudotext. No duplicated hardware, extra outline, panel, groove, seam, glass, room, wall, floor, prop, shadow halo or border. Pure #FFFFFF background. Make the complete intact assembly as large as physically possible: target 0–4 white pixels per side and allow 0-pixel edge contact when every frame corner, molding and bottom endpoint remains complete. No white mat, padding, zoom-out or cropping.
```

Exact substitutions:

- `A-negro`: `deep matte black (negro)`
- `A-wengue`: `deep wenge, nearly black-brown (wengue)`
- `A-gris-oscuro`: `dark graphite gray (gris-oscuro)`
- `A-antracita`: `anthracite charcoal (antracita)`
- `A-nogal`: `medium-dark walnut (nogal)`
- `A-roble`: `warm light oak (roble)`
- `A-gris-claro`: `light cool gray (gris-claro)`
- `A-natural`: `natural pale wood (natural)`
- `A-blanco`: `clean matte white (blanco)`

## Revision family B — 9 calls

Exact template; replace only the full `{{FINISH_PARAGRAPH}}`:

```text
Edit ONLY the supplied original wl-d009 into one clean photorealistic studio product image. This must be a fresh AI regeneration from that original, never a crop, resize, filter, recolor, mask, composite, or edit of another generated image.

{{FINISH_PARAGRAPH}}

Preserve the exact wl-d009 identity and geometry: straight-on extreme-tall single door assembly; complete square outer frame and top molding; dark recessed strip at far left; exactly one thin, closed, symmetrical dark stepped outline on the leaf, with a shorter centered top horizontal, short downward and outward shoulders at both upper ends, two long vertical sides, inward shoulders near the bottom, short downward segments, and one centered bottom horizontal — exactly 12 crisp right-angle corners, no curves or diagonals; uninterrupted plain center; exactly one dark horizontal lever on one round rosette and exactly one circular key escutcheon below.

EXTREME TIGHT FRAMING IS MANDATORY. Enlarge the complete door assembly until its outermost intact silhouette touches the canvas edges or remains only 0–4 physical pixels from each edge; target measured white margins [left, top, right, bottom] = [0,0,0,0]. Absolutely no white mat, border, padding, generous whitespace, floor, wall, shadow field, or decorative surrounding scene. Nevertheless, do not crop or lose even one outer corner, molding edge, left reveal, jamb tip, bottom endpoint, or hardware detail. Every structural endpoint must remain fully visible and intact. Use a tall portrait canvas matching the source proportions and a pure white background only in any unavoidable microscopic gap.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark, no extra hardware, no extra grooves, no panel subdivisions.
```

Exact substitutions:

- `B-negro`: `Finish: NEGRO — change only the door leaf to a refined near-black finish with restrained vertical wood grain. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`
- `B-wengue`: `Finish: WENGUÉ — a very dark chocolate-brown wengé wood finish with restrained fine vertical grain. Change only the door leaf finish. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`
- `B-gris-oscuro`: `Finish: GRIS OSCURO — a deep dark-gray finish with restrained fine vertical wood grain. Change only the door leaf finish. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`
- `B-antracita`: `Finish: ANTRACITA — a rich charcoal-anthracite finish with restrained fine vertical wood grain. Change only the door leaf finish. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`
- `B-nogal`: `Finish: NOGAL — a warm medium-dark walnut wood finish with restrained natural vertical grain. Change only the door leaf finish. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`
- `B-roble`: `Finish: ROBLE — a warm golden light-oak wood finish with restrained natural vertical grain. Change only the door leaf finish. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`
- `B-gris-claro`: `Finish: GRIS CLARO — a light cool-gray finish with restrained fine vertical wood grain. Change only the door leaf finish. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`
- `B-natural`: `Finish: NATURAL — a pale natural honey wood finish with restrained authentic vertical grain. Change only the door leaf finish. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`
- `B-blanco`: `Finish: BLANCO — a clean soft-white door-leaf finish with only very subtle vertical grain; keep enough tonal separation for the stepped dark outline and neutral-gray frame to remain crisp. Change only the door leaf finish. Keep the complete layered perimeter frame, top moldings, deep far-left reveal, jambs and all surrounding structural parts neutral gray exactly as in the original.`

## Revision family C — 3 calls

Exact template; replace only `{{LEAF_FINISH_PARAGRAPH}}`:

```text
Use ONLY the supplied canonical wl-d009 original as visual reference and regenerate it as one photorealistic studio product image. Never use any prior generated image. No filtering, scripted recolor, crop, resize, compositing, masking, or post-processing.

{{LEAF_FINISH_PARAGRAPH}}

IDENTITY LOCK: exactly the original straight-on, extremely tall wl-d009 door; one complete square layered outer frame; exactly one thin closed symmetrical black stepped outline on the leaf with precisely 12 right-angle corners (shorter centered top, two upper shoulders, two long sides, two lower shoulders, centered bottom); empty plain center; exactly one dark horizontal lever on one round rosette; exactly one round key escutcheon below; no other detail.

EDGE-TO-EDGE PRODUCT CUTOUT — THIS IS THE PRIMARY COMPOSITION REQUIREMENT. The complete intact outer silhouette must fill the entire bitmap. Put a visible neutral-gray structural pixel on every one of the four canvas boundary lines: x=0, x=width−1, y=0 and y=height−1. The leftmost jamb coincides with the left canvas edge, the rightmost jamb with the right edge, the topmost molding with the top edge, and the intact bottom jamb tips with the bottom edge. Therefore there must be ZERO fully white rows or columns around the product and measured white margins must be exactly [left, top, right, bottom]=[0,0,0,0]. This is contact, not truncation: retain every outer corner, reveal, bevel, molding edge and both bottom endpoints fully recognizable. No white mat, padding, border, whitespace, wall, floor, scenery or surrounding shadow field. Pure white appears only in tiny negative-space gaps intrinsic to the complete silhouette.

No Wonly logo, no logo, no text, no letters, no badge, no emblem, no watermark. No curves, diagonals, extra grooves, panels, hardware or keyholes.
```

Exact substitutions:

- `C-negro`: `Leaf finish: NEGRO — refined near-black with restrained fine vertical wood grain. Refinish ONLY the door leaf. The complete layered perimeter frame, header moldings, deep dark far-left reveal, side jambs and bottom tips must remain neutral gray.`
- `C-roble`: `Leaf finish: ROBLE — warm golden light oak with restrained authentic vertical grain. Refinish ONLY the door leaf. The complete layered perimeter frame, header moldings, deep dark far-left reveal, side jambs and bottom tips must remain neutral gray.`
- `C-natural`: `Leaf finish: NATURAL — pale natural honey wood with restrained authentic vertical grain. Refinish ONLY the door leaf. The complete layered perimeter frame, header moldings, deep dark far-left reveal, side jambs and bottom tips must remain neutral gray.`

## Revision family D — 2 calls

Exact template; replace only `{{LEAF_FINISH_PARAGRAPH}}`:

```text
Use ONLY the supplied canonical wl-d009 original as the visual reference and regenerate one photorealistic studio product image. No prior generated image. No filters, scripted recolor, crop, resize, composite, mask, conversion, or post-processing.

{{LEAF_FINISH_PARAGRAPH}}

Lock the exact original wl-d009 construction: straight-on single door; one complete square layered outer frame; exactly one thin closed symmetric black stepped outline with precisely 12 crisp 90-degree corners (short centered top, two upper shoulders, two long sides, two lower shoulders, short downward segments, centered bottom); uninterrupted center; exactly one dark horizontal lever on one round rosette and one round key escutcheon below. No Wonly logo, logo, text, badge, watermark, extra hardware, grooves, panels, curves or diagonals.

CANVAS AND SCALE LOCK: use the same extremely tall and narrow source ratio 399:1069, approximately 3:8 — never a wider 4:9, 1:2, 9:16, 2:3 or square-looking door. A suitable native output is approximately 766×2052. Within that exact tall-narrow bitmap, make the complete intact assembly fill the canvas edge-to-edge. Put real neutral-gray structure on x=0, x=width−1, y=0 and y=height−1, so measured fully white margins [left, top, right, bottom] are ideally [0,0,0,0] and never more than 4 px. This must be achieved by composing the regenerated object large within the correct canvas, NOT by altering its proportions. Contact without truncation: all four outside corners, top molding, left reveal, both jambs and both bottom endpoints remain fully recognizable. No white mat, padding, border, wall, floor, scene or surrounding shadow field.
```

Exact substitutions:

- `D-roble`: `Leaf finish: ROBLE — warm golden light oak with restrained authentic vertical grain. Change ONLY the door leaf finish. Keep the layered perimeter frame, header moldings, deep dark far-left reveal, jambs and both bottom tips neutral gray.`
- `D-natural`: `Leaf finish: NATURAL — pale natural honey wood with restrained authentic vertical grain. Change ONLY the door leaf finish. Keep the layered perimeter frame, header moldings, deep dark far-left reveal, jambs and both bottom tips neutral gray.`

## Revision family E — 2 calls

Exact template; replace only `{{FINISH_PARAGRAPH}}`:

```text
Regenerate one new photorealistic product image from ONLY the supplied canonical wl-d009 original. No other reference and no generated-image reuse. No filters, scripted recolor, crop, resize, mask, composite, conversion or post-processing.

{{FINISH_PARAGRAPH}}

Use a true ultra-tall approximately 3:8 canvas like 766×2052, never 1:2 or wider. Scale the entire intact assembly up to occupy at least 98% of the canvas width and height. Leave only a microscopic white safety gap of about 4–8 actual pixels at left, top and right and 0–4 px at bottom; never 13 px or more on any side. The silhouette must remain complete: no clipped outer corner, molding, reveal, jamb or bottom endpoint. Pure white background, no white mat, border, padding, floor, wall, room, scenery or broad shadow field.
```

Exact substitutions:

- `E-roble`: `Make ONLY the leaf ROBLE, warm golden light oak with restrained authentic vertical grain; keep all layered outer-frame parts, top moldings, far-left dark reveal, jambs and tips neutral gray. Preserve the original exactly: front elevation, extremely tall narrow 399:1069 proportion; complete square layered frame; one and only one thin closed symmetrical black stepped outline, precisely 12 right-angle corners, short centered top and bottom with paired upper and lower shoulders and two long vertical sides; plain empty center; one dark horizontal lever on one round rosette; one round key escutcheon below. No Wonly logo, no logo, text, badge, watermark, extra hardware, grooves, panels, diagonals or curves.`
- `E-natural`: `Make ONLY the leaf NATURAL, pale natural honey wood with restrained authentic vertical grain; keep all layered outer-frame parts, top moldings, far-left dark reveal, jambs and tips neutral gray. Preserve the original exactly: front elevation, extremely tall narrow 399:1069 proportion; complete square layered frame; one and only one thin closed symmetrical black stepped outline, precisely 12 right-angle corners, short centered top and bottom with paired upper and lower shoulders and two long vertical sides; plain empty center; one dark horizontal lever on one round rosette; one round key escutcheon below. No Wonly logo, no logo, text, badge, watermark, extra hardware, grooves, panels, diagonals or curves.`

## Revision family F — 4 calls

Exact template; replace only `{{FINISH_PARAGRAPH}}`:

```text
Regenerate one new photorealistic studio product image from ONLY the supplied canonical wl-d009 original. Never use a generated image. No filter, scripted recolor, crop, resize, mask, composite, conversion or post-processing.

{{FINISH_PARAGRAPH}}

Use an ultra-tall 766×2052-like canvas, NEVER 1:2 or wider. Maximize the intact door assembly in that canvas. The complete left and right outer frame edges must lie only 4–10 physical pixels from their canvas edges; the full top edge only 4–10 px from the top; bottom endpoints 0–4 px from bottom. ABSOLUTE MAXIMUM 12 WHITE PIXELS ON EVERY SIDE. No generous whitespace, mat, border, padding, floor, wall, room or scenery. Keep every outer corner, molding, reveal, jamb and endpoint fully visible, uncropped and proportionally faithful.
```

Exact substitutions:

- `F-roble`: `Leaf finish: ROBLE — warm golden light oak with restrained authentic vertical grain. Change ONLY the leaf. Keep the entire layered gray perimeter frame, top molding, far-left dark reveal, side jambs and bottom tips neutral gray. Preserve exact original identity: straight-on ultra-tall narrow single door at 399:1069 (about 3:8); one complete square layered frame; exactly one thin closed symmetrical black stepped outline with precisely 12 right-angle corners, shorter centered top and bottom, paired upper/lower shoulders and two long sides; plain center; exactly one dark horizontal lever on one round rosette and one round key escutcheon below. No Wonly logo, logo, text, letters, badge, watermark, extra hardware, grooves, panels, curves or diagonals.`
- `F-natural`: `Leaf finish: NATURAL — pale natural honey wood with restrained authentic vertical grain. Change ONLY the leaf. Keep the entire layered gray perimeter frame, top molding, far-left dark reveal, side jambs and bottom tips neutral gray. Preserve exact original identity: straight-on ultra-tall narrow single door at 399:1069 (about 3:8); one complete square layered frame; exactly one thin closed symmetrical black stepped outline with precisely 12 right-angle corners, shorter centered top and bottom, paired upper/lower shoulders and two long sides; plain center; exactly one dark horizontal lever on one round rosette and one round key escutcheon below. No Wonly logo, logo, text, letters, badge, watermark, extra hardware, grooves, panels, curves or diagonals.`

## Revision call roster — 29/29 lossless prompts recovered

| UTC timestamp | Generator ID | Family/substitution | Prompt SHA-256 | Final disposition |
|---|---|---|---|---|
| 2026-08-29T14:19:17.676Z | `exec-b17d5262-1bb5-4743-bcae-a381a38ace09` | A-negro | `a7ff296b71a46c4a7da4bb7a862ca2bd12a75bb0d9007c0dccc17b01e22e7a97` | REJECTED |
| 2026-08-29T14:19:38.249Z | `exec-98cd2987-915b-466c-a557-790d28450d37` | A-wengue | `9762f722ac735461b25f3bd4765cc17c0d88cd2a7118a29e5e5a85bb8e5606e0` | REJECTED |
| 2026-08-29T14:19:56.663Z | `exec-5a48a38c-0276-4790-adfc-a46aca42ef17` | A-gris-oscuro | `7f4477dd0ed76a256737d9a3573049414fad97ccd28cf8f1623810322c8e2a8e` | REJECTED |
| 2026-08-29T14:20:14.205Z | `exec-89ede49c-33db-4389-9c3a-d93251ef7b86` | A-antracita | `d778a71f04553e677fca32e03747c9655f42396582091803e8f10b096a2db94f` | REJECTED |
| 2026-08-29T14:20:32.207Z | `exec-9fd80e09-d995-4a1d-9db2-e5558c6d586e` | A-nogal | `1a107b300db06fe2d33d7ca6a991adfa3cf29e263c39b4e775c2482d31795c37` | REJECTED |
| 2026-08-29T14:20:49.081Z | `exec-48fb6b0b-dd2d-44c2-a547-d594487ba0e4` | A-roble | `d6cbbcff2df6a35bf4645030b089f078f5626790411df413417c5d84071d4449` | REJECTED |
| 2026-08-29T14:21:08.105Z | `exec-d21b49d7-c4b8-4004-8686-8ccd277a1031` | A-gris-claro | `f0283ac4a57de6a347b2c93d8918f97217a58f1c0c210ac3277ad89edb1fa40b` | REJECTED |
| 2026-08-29T14:21:27.319Z | `exec-af4f72da-315c-4c33-b418-e51294bae7cd` | A-natural | `348d70d878c87dd4ed9cb945815d9da7b35f1c54131b43f39442d0c76defff5b` | REJECTED |
| 2026-08-29T14:21:45.373Z | `exec-8dc30b66-4e4c-4f2c-99f0-d8550424dd9a` | A-blanco | `438dc6d9fa773b159949721ea44c752d9533afd9ca0c12987d86d9ef1da6b813` | REJECTED |
| 2026-08-29T14:25:26.296Z | `exec-c745c4a3-bd2d-435c-a288-9230b611077e` | B-negro | `858ee05d56f3b16acce218849dd67b1ac9379290c84ad3f10f261c5c446b85e7` | REJECTED |
| 2026-08-29T14:26:05.883Z | `exec-087a9071-55d6-4614-b738-5ca9e5fa9748` | B-wengue | `fd415eefc0768a6c72e2a91f3addae951e2100057954021cd7fefba39d005acb` | ACTIVE |
| 2026-08-29T14:26:22.536Z | `exec-cc535f9a-b776-420d-804c-28f57b5a0693` | B-gris-oscuro | `f66aca032e894351a7cc019502de776a632608d4140c58bd1c18e908bee990d4` | ACTIVE |
| 2026-08-29T14:26:40.246Z | `exec-12322f87-6412-444a-844d-910c2856fd27` | B-antracita | `11b601f7d971c96feb40116e597ea0875c04ca63f45ffe90fde7851d8ef58ce9` | ACTIVE |
| 2026-08-29T14:27:13.740Z | `exec-91f4749c-06b5-4423-a073-71607178c7b5` | B-nogal | `cd8375e18e71942ada72d4fee4f413b63a2cef62be90714a21c5d44ae2e56c61` | REJECTED — ratio +22.201438% |
| 2026-08-29T14:27:32.566Z | `exec-ffd9ed29-9498-491c-858d-29488d6f7027` | B-roble | `721ca3c097237dc06d305ba1851e7a0742a27fe1d3cf12c8dd0d101bcff278c6` | REJECTED |
| 2026-08-29T14:27:48.037Z | `exec-efdc023c-d4fd-4546-8014-e9f1b289ab83` | B-gris-claro | `e19a85090000e164e56828ab17474d4af7137c382319ae803ecf26734f569252` | REJECTED — ratio +33.9599% |
| 2026-08-29T14:28:19.793Z | `exec-3ca4959a-bda3-4e9a-9b89-acfc8f1fb900` | B-natural | `12f0dc645a2277644e4e79701455ef1a1059cba940b1b02e047607ff80eaaa54` | REJECTED |
| 2026-08-29T14:28:38.709Z | `exec-4872c96c-d6c2-4933-8347-80803cf312a8` | B-blanco | `f6e8b7b057023b7223bd9fe171ced581d9bf4c37d646c0dcbc1fa62143730118` | REJECTED |
| 2026-08-29T14:30:35.173Z | `exec-8bc5faa8-f44a-442f-8545-bf3ccd7e5a42` | C-negro | `bfac0c9679b823976ba6c2936b1d07673b62ceace111b3173b384c3bb4b53f3e` | REJECTED |
| 2026-08-29T14:30:54.952Z | `exec-44801362-28f8-4ae6-b47a-8e515166bc09` | C-roble | `bc8397f099e52d2463c19e93cd8b5d79c2735a437ff0b79b15c96ba6a25918a6` | REJECTED |
| 2026-08-29T14:31:12.336Z | `exec-6c725995-018d-410d-91c7-4216b0147cd6` | C-natural | `4f123214c1eef4ccbc7aa02d4c78a22481e67442bf74a15a3805357ed58bbf0d` | REJECTED |
| 2026-08-29T14:33:00.989Z | `exec-391e100e-4c84-4583-a22d-4f59d95e1993` | D-roble | `7f0a7b2e7c5100b7d4d660093d5868336de5ac8cca9172292e090beefbf8fb37` | REJECTED |
| 2026-08-29T14:33:21.716Z | `exec-f4b1ea4d-aced-418f-bd31-e61079a6ac12` | D-natural | `366ac77925087c8c12e38eb139e1c7a26d1f244ef996c77e82c5562b0e7022d3` | REJECTED |
| 2026-08-29T14:34:24.835Z | `exec-1a357ce2-96d8-4a4d-8450-0a6a3148361b` | E-roble | `049861759b91b1c64964425e7ec5be6c1b046909ad9fd554afd0ef8db15c987c` | REJECTED |
| 2026-08-29T14:34:45.218Z | `exec-9d13429b-0329-48aa-9954-ee4c5a2bd8a0` | E-natural | `29b771f5194b094153fe943e994b0c426bdc46f7b0c118adb14bbc55eb3236c1` | REJECTED |
| 2026-08-29T14:35:50.567Z | `exec-3b3724dd-364b-4020-ae69-e685ed4fdee4` | F-roble | `82ef507a4462c58d2f295c4d85cf5758aa6d304996d2534785fe43844ff07c78` | REJECTED |
| 2026-08-29T14:36:08.093Z | `exec-8db234dd-dab3-49c9-a92b-532a830d0c66` | F-roble | `82ef507a4462c58d2f295c4d85cf5758aa6d304996d2534785fe43844ff07c78` | ACTIVE |
| 2026-08-29T14:36:29.222Z | `exec-a9aaadde-dc9f-4249-b6c1-ad05fc844c17` | F-natural | `f95bf90111e6c9c856b8aac8695fcd1037c89ee360066fc61526a7071f240604` | REJECTED |
| 2026-08-29T14:36:47.223Z | `exec-eb55e577-9bd1-4b01-aeaf-de204134c552` | F-natural | `f95bf90111e6c9c856b8aac8695fcd1037c89ee360066fc61526a7071f240604` | ACTIVE |

Revision prompt recovery: `29/29 PASS`.
