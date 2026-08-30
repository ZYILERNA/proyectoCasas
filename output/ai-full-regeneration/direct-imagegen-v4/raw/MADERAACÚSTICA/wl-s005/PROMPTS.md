# MADERAACÚSTICA/wl-s005 — direct built-in ImageGen prompt audit

All 48 audited PNGs came from 48 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

`public/images/PUERTAS/MADERAACÚSTICA/wl-s005/original.webp`

Reference SHA-256 before and after the run: `67feda1f5042bea8efb04b247c01e6cb48ffb630d08263b21f9a445e163d0791`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every workspace PNG is a byte-for-byte copy of the corresponding built-in ImageGen result.

This file records the prompt families and attempt mapping. The first 47 calls retain their original family-level audit; the final minimum-margin revision is recorded below from its literal `image_generation_end.revised_prompt` event without paraphrase or reconstruction.

## Shared subject and invariant contract

```text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: regenerate the same wl-s005 door in {{FINISH_CLAUSE}}.
Composition/framing: straight-on, extremely tall and narrow, complete door and frame, occupying almost the entire canvas with the smallest safe pure-white margin. Ideal margin 2-6 px; target maximum 12 px. Never cut any outer contour.
Geometry invariants: preserve two complete outer vertical frame posts, the complete straight layered/beveled top header, the dark recessed full-height reveal immediately inside the far-left post, exactly one narrow upper-left vertical seam from below the header to the horizontal seam, exactly one horizontal seam around 69% height, and exactly one lower vertical seam left of center.
Hardware invariants: preserve exactly one slim dark horizontal lever on one round rosette and exactly one separate round key cylinder below it. No visible hinges and no other hardware.
Finish invariants: change only the requested finish; preserve geometry, proportions, grain direction, hardware placement, neutral lighting and orthographic catalog presentation.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, escutcheons, hinges, panels, seams, glass, inlays, decoration, room scene, people or props.
```

## Finish clauses

- `negro`: deep neutral black wood with restrained authentic vertical grain.
- `wengue`: very dark espresso-brown wenge wood with subtle near-black grain, clearly brown rather than neutral black.
- `gris-oscuro`: deep neutral dark-charcoal wood, clearly gray rather than black.
- `antracita`: very dark cool graphite/anthracite wood with subtle grain.
- `nogal`: refined warm walnut brown with natural darker grain, neither orange nor red.
- `roble`: light-to-medium warm natural oak with clearly defined realistic grain, lighter than walnut.
- `gris-claro`: pale neutral light-gray wood with subtle cool-silver grain, distinct from white.
- `natural`: very light untreated natural wood in pale beige/sand tones with understated grain.
- `blanco`: clean neutral matte white-painted wood without cream or yellow cast, retaining very subtle grain.

## Prompt families

### F1 — base geometry-faithful catalog generation

The shared contract above with the finish clause substituted. It requested a complete full-frame door on pure white from the sole canonical reference.

### F2 — tighter direct framing retry

The shared contract plus a targeted request to enlarge the complete assembly and reduce excessive side padding without cutting any post, header bevel or bottom endpoint.

### F3 — strict minimal-border retry

The shared contract with the preferred 2–6 px hairline and 12 px maximum stated explicitly, while repeating the exact seam and hardware counts.

### F4 — native-edge full-silhouette retry

The shared contract asked ImageGen to reproduce the source-like near-edge termination. Contact at an edge was eligible only after native inspection showed the complete silhouette and all mouldings; no crop or resize was permitted.

### F5 — numeric near-edge framing variants for roble

Independent roble calls varied direct instructions such as approximately 98–99% canvas width, explicit x-position targets, or a minimum occupied pixel span. All calls again used only `original.webp` and produced untouched native PNGs.

### F6 — canonical aspect guard for roble

The canonical width/height ratio was stated explicitly alongside the tight-border request. Attempts with materially divergent canvas or silhouette proportions were rejected even when their measured margins passed.

### F7 — source-framing match for roble

Rather than specifying output dimensions, these calls requested the original composition, placement and tall-narrow proportions unchanged, with only the oak finish substituted. Attempt 14 was selected by native inspection.

### F8 — edge-definition and maximum-safe-scale roble retries

The prompt requested a defined natural-oak outer contour and maximum safe scale so the RGB<245 metric could distinguish the light frame from the white background without any postprocessing.

### F9 — slight right-bias roble retries

The prompt asked ImageGen itself to place the intact assembly slightly farther right to reduce the recurring one-pixel right-margin excess. These remained independent generations; no accepted or rejected PNG was moved after generation.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | `exec-50050084-86c2-4f10-a90a-c27933fe88dd` | rejected — right padding above target |
| negro | 2 | F2 | `exec-8302843c-085c-41f7-8f38-d9991aa8caa5` | rejected — broad side padding |
| negro | 3 | F3 | `exec-7a2ed1b2-3f4d-4de1-9c77-e19c9ac0d0be` | accepted |
| wengue | 1 | F1 | `exec-fea62933-9f36-4cf7-9d78-d223885808be` | rejected — right padding above target |
| wengue | 2 | F2 | `exec-5638c682-ccb4-4c3c-a2d1-52602b6d6720` | rejected — broad side padding |
| wengue | 3 | F3 | `exec-d825bde8-b6ed-4356-a2fb-5c6b3f59422e` | rejected — side padding above target |
| wengue | 4 | F4 | `exec-3cb01443-285e-4c0f-a73f-e98573819f00` | rejected — superseded by tighter later native result |
| wengue | 5 | F3 | `exec-95e65310-97cf-4f12-b2dc-89736afc2881` | rejected — side padding above target |
| wengue | 6 | F4 | `exec-930b4d11-3430-4f10-82bf-076a4778286b` | accepted — native-complete top/bottom edge contact |
| gris-oscuro | 1 | F1 | `exec-3a99b050-f306-42e1-b6db-29d0d88d8281` | accepted — native-complete bottom edge |
| antracita | 1 | F1 | `exec-b0110c17-d12a-40f3-82c4-0e839d6aa87c` | rejected — left padding above target |
| antracita | 2 | F2 | `exec-36880291-697d-44e0-b937-1ba823ae8afd` | rejected — right margin 13 px |
| antracita | 3 | F3 | `exec-729ccf2b-f008-4355-a122-39c7c7091726` | rejected — side padding above target |
| antracita | 4 | F4 | `exec-23c49264-4283-43c4-8e49-8df33eefdfe1` | accepted — native-complete bottom edge |
| nogal | 1 | F1 | `exec-0dd95b5f-b67c-4154-92d4-6b74ec1453de` | rejected — broad side padding |
| nogal | 2 | F2 | `exec-f305ac67-a021-42da-aa9c-ca180c586801` | rejected — side padding above target |
| nogal | 3 | F3 | `exec-1e14ee14-fb7b-478d-8cc7-3518fa9d2b91` | rejected — side padding above target |
| nogal | 4 | F3 | `exec-6db1fca3-f9ee-4590-b9a7-11ad7d3ebe79` | rejected — side margins 13 px |
| nogal | 5 | F4 | `exec-64343fb8-18a1-4b02-a02c-1e48f7b3f82e` | accepted — native-complete bottom edge |
| roble | 1 | F1 | `exec-d4fb4207-2d91-44d6-8e82-a166e63232e0` | rejected — gray/tinted background reached all edges |
| roble | 2 | F2 | `exec-b429a590-37d8-4350-94c0-4ff266c46aa8` | rejected — gray/tinted background reached all edges |
| roble | 3 | F3 | `exec-efeda0ea-11fa-4974-a77f-57ba43bb0d35` | rejected — broad padding |
| roble | 4 | F4 | `exec-2ff2e1d7-cc6f-4806-96c5-14fce34f4e9e` | rejected — right margin 14 px |
| roble | 5 | F5 | `exec-5a025c92-2626-49e1-9ff3-338512972f5a` | rejected — broad padding |
| roble | 6 | F5 | `exec-473df9cc-5913-4537-9991-5fda810fbdc9` | rejected — broad padding |
| roble | 7 | F5 | `exec-a44d17a2-f9a7-4aaa-acf9-52bfcfe2524d` | rejected — side padding above target |
| roble | 8 | F5 | `exec-2adbd18a-6b09-48ea-9f17-c2eed232bd12` | rejected — broad padding |
| roble | 9 | F5 | `exec-43c53e31-0d7f-4d03-9085-cb5f428dc42e` | rejected — materially wrong aspect |
| roble | 10 | F5 | `exec-0d199f64-1603-48ee-b198-52d01b676ba3` | rejected — broad padding |
| roble | 11 | F6 | `exec-73e81ec1-7c35-43e3-86bd-548e72554805` | rejected — broad padding |
| roble | 12 | F6 | `exec-ce30d0e4-5b07-47ec-b9e2-e774e8d38ae2` | rejected — margins passed but aspect narrowed materially |
| roble | 13 | F7 | `exec-69cf158c-1fb9-4d8b-bb10-d29c801070d7` | rejected — side padding above target |
| roble | 14 | F7 | `exec-3e01f497-ec64-4124-9bd3-c0df9d468ed9` | rejected — previous selected result retired byte-for-byte after attempt 21 |
| roble | 15 | F8 | `exec-65e065e3-9bb1-4e5d-b677-733e112e2734` | rejected — right margin 14 px |
| roble | 16 | F8 | `exec-7c038d04-e79e-4c14-8cf9-416e7d6c5b11` | rejected — side padding above target |
| roble | 17 | F8 | `exec-ab56e61a-7b5a-4048-8aee-dd655008133a` | rejected — same margin exception, less faithful finish |
| roble | 18 | F8 | `exec-654feeee-d8f9-490b-86b1-9f94975010f3` | rejected — broad side padding |
| roble | 19 | F9 | `exec-fa66568a-93e9-443f-b350-71f97cd68956` | rejected — broad padding |
| roble | 20 | F9 | `exec-22439466-588d-4e7a-9f68-71603e256134` | rejected — broad padding |
| roble | 21 | R1 literal | `exec-8970f4a4-6ba1-4fd7-8ce7-6fcd1ffe4855` | accepted — [12,7,6,0], native-complete bottom edge |
| gris-claro | 1 | F1 | `exec-5dbcfaf2-9dfb-4d37-9346-25cabb304975` | rejected — right padding above target |
| gris-claro | 2 | F2 | `exec-1ac05890-4167-4f54-ae86-8c8cf5c7a02a` | rejected — broad side padding |
| gris-claro | 3 | F3 | `exec-da02ddcd-1190-4660-b747-809f7fd49bb5` | rejected — side padding above target |
| gris-claro | 4 | F4 | `exec-4182727f-1c65-4ee7-8386-a0c0955ef08a` | accepted — native-complete bottom edge |
| natural | 1 | F1 | `exec-9625faea-7a34-4939-8c80-ed9999ec3e10` | rejected — side padding above target |
| natural | 2 | F2 | `exec-a7e6f1a6-63cc-45b9-b6d2-db79d78c8249` | rejected — broad padding |
| natural | 3 | F4 | `exec-7e45879b-244d-4df3-95ee-32ad50672a25` | accepted — native-complete bottom edge |
| blanco | 1 | F1 | `exec-03c6aec9-c38e-402b-86fa-d39c8683ed62` | accepted |

Totals: 48 independent built-in ImageGen calls, 9 accepted, 39 rejected.

## Minimal-margin exceptions

The RGB<245 metric reports edge contact for several accepted outputs. Native-detail inspection confirms that every top header, outer post, layered bevel, bottom endpoint, seam and required hardware item remains complete. The canonical `original.webp` also reaches the lower edge, so the 0 px lower readings are consistent with the explicit request to make the door as large as possible.

For `roble`, the fresh direct attempt 21 preserves the canonical aspect and exact segmented geometry while measuring `[12,7,6,0]`, so the prior one-pixel exception is closed. The previous attempt 14 remains byte-for-byte under `rejected/`; no crop, resize or other pixel operation was used.

No file under `public/` was touched, and no accepted or rejected PNG was processed after generation.

## Final minimum-margin revision — literal prompt

- Generator ID: `exec-8970f4a4-6ba1-4fd7-8ce7-6fcd1ffe4855`.
- Disposition: selected as roble attempt 21.
- Dimensions: `770×2041`.
- RGB<245 margins `[left, top, right, bottom]`: `[12,7,6,0]`.
- SHA-256: `0efd6eb5198c6b624b8ee9d9be612a97e3a07ebbce7d3016c4b360be247a9993`.

The following is the literal `revised_prompt` recovered from the complete rollout:

```text
Edit ONLY this canonical source into a faithful ROBLE finish variant. Preserve the exact modern segmented door geometry: straight-on ultra-tall narrow complete outer rectangular frame/header/two jambs/deep left reveal/all corners/bottom endpoints; a flat flush leaf with exactly ONE thin horizontal segmentation seam across the full leaf at about 68–69% of height; exactly ONE thin vertical seam in the UPPER section near the left side, running only from the top of the leaf to the horizontal seam; exactly ONE thin vertical seam in the LOWER section near the center, running only from the horizontal seam to the bottom. No other seams, panels, grooves, moldings, inlays, glass or decorations. Preserve exactly one dark graphite straight horizontal lever on one round rosette in the upper-left section and exactly one separate round dark key escutcheon directly below. No other hardware. No text, badge, watermark, emblem or Wonly logo (NO_LOGO).

Refinish leaf and matching frame coherently in warm golden honey oak wood with restrained fine vertical grain; hardware remains dark. Preserve source ratio 402:1065 (width/height 0.377465), never widen.

CRITICAL FRAMING: enlarge the whole complete door assembly until the outer frame is almost tangent to all four canvas boundaries, leaving only 0–4 pixels of pure-white hairline clearance at left, top, right and bottom; at least 99% occupancy in width and height. No padding, breathing room, floor band, broad border or cast shadow. Keep the full header, both jambs/reveals, all four corners and both bottom endpoints intact and visible, with nothing cropped. Pure white background, photorealistic, centered, crisp ecommerce cutout.
```
