# MADERAACÚSTICA/wl-s001 — direct built-in ImageGen prompt audit

All 32 audited PNGs came from 32 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

public/images/PUERTAS/MADERAACÚSTICA/wl-s001/original.webp

Reference SHA-256 before and after the run: ee2eff0723f86d06c8a8b5b21d6dab99dd5c3d38de7ab54aab9a263588a598e4.

Policy: NO_LOGO_MINIMAL_WHITE_MARGIN. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every workspace PNG is a byte-for-byte copy of its built-in ImageGen result.

This file records the operational prompt families and complete attempt mapping. The first 31 calls retain their original family-level audit; the final minimum-margin revision is recorded below from its literal `image_generation_end.revised_prompt` event without paraphrase or reconstruction.

## Shared subject and invariant contract

> Use case: precise-object-edit.
>
> Asset type: e-commerce acoustic-door catalog finish variant.
>
> Input images: Image 1 is the sole edit target, sole reference and sole canonical geometry source.
>
> Primary request: change only all wood surfaces of the complete wl-s001 door-and-frame assembly to the requested finish while retaining realistic subtle vertical wood grain.
>
> Composition/framing: preserve the original 397:1063 tall narrow ratio and perfectly front-facing orthographic presentation. Make the complete assembly as large as possible with the minimum white perimeter. Keep the full top and bottom tips of both projecting side posts intact.
>
> Geometry invariants: exactly one smooth plain unpanelled leaf; exactly two square vertical outer posts; one straight top crossbar; one inner beveled lintel; identical proportions, gaps, bevels and silhouette.
>
> Hardware invariants: exactly one slim dark horizontal lever on one round rosette and exactly one separate dark round key cylinder beneath it at the original left-side position and scale.
>
> NO_LOGO constraints: no WONLY logo, badge, brand, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
>
> Avoid: extra handles, cylinders, grooves, panels, seams, glass, inlays, decoration, architecture, room scene, wall, floor, props, perspective or cast shadow.

## Finish clauses

- negro: deep matte neutral black wood with restrained vertical grain.
- wengue: rich very dark wenge brown-black wood, recognizably brown rather than neutral black.
- gris-oscuro: deep charcoal dark-gray wood.
- antracita: neutral matte anthracite gray wood, slightly lighter than black.
- nogal: warm medium-dark natural walnut brown.
- roble: warm golden honey oak.
- gris-claro: light neutral gray wood, visibly darker than the pure-white background.
- natural: pale blond natural raw oak, light warm beige without yellow-orange saturation.
- blanco: clean matte white-painted wood with subtle vertical grain and enough edge contrast against the pure-white background.

## Prompt families

### F1 — base minimal-border edit

The shared contract plus a requested uniform white safety line of 4–8 pixels on every side. The complete frame had to fill almost the entire canvas without cropping.

### F2 — tight framing correction

The shared contract plus a targeted correction for previous excess or uneven padding. It requested approximately 3–6 pixels on all sides and repeated the complete-post-tip invariant.

### F3 — quantified ultra-tight retry

The shared contract specified source ratio 397:1063, approximately 99 percent subject width and 99.4 percent subject height, with a target 3-pixel white line and absolute 12-pixel maximum.

### F4 — explicit bottom hairline retry

The shared contract requested 2–6 pixels on left/top/right and a continuous 2–4 pixel strip below the lowest post tips. Every retry still referenced only original.webp.

### F5 — original-like zero-padding retry

The shared contract requested an intact complete silhouette only 0–4 pixels from the canvas edges, explicitly allowing the complete lowest post tips to end on the last pixel exactly as in the canonical original. Acceptance still required native-detail confirmation that no geometry was lost.

### F6 — white-finish final scale check

The shared contract requested the white finish with the outer posts about 4 pixels from the sides and top. This later attempt was rejected because it added broad padding; the earlier F5 result remained the accepted white output.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | exec-8f0fb63e-a8dc-4ef9-8edd-05f2d6365772 | rejected — left padding above limit |
| negro | 2 | F2 | exec-be369a0f-4521-4718-9056-6cc2fd68b3d4 | rejected — broad padding |
| negro | 3 | F4 | exec-bd9509cd-967d-4ff6-99ed-ca27aa4cd229 | accepted — native-complete bottom-edge exception |
| wengue | 1 | F1 | exec-ab98c953-826c-41d6-b5f2-e35dc34ae457 | rejected — left padding one pixel above limit |
| wengue | 2 | F2 | exec-95026611-8d25-44c2-8720-7e481d181eb1 | rejected — padding above limit |
| wengue | 3 | F4 | exec-6684333a-2b8a-4d6b-8802-f25fb962e311 | rejected — broad padding |
| wengue | 4 | F5 | exec-427e197e-9341-4b9a-895e-2c11ccc78acd | accepted — native-complete bottom-edge exception |
| gris-oscuro | 1 | F1 | exec-d354d60a-0ee6-4c4c-9b9e-37b2c176fea4 | rejected — left/top padding above limit |
| gris-oscuro | 2 | F2 | exec-8227eab4-658d-41ce-b64e-7ff20aa2e4dd | rejected — broad padding |
| gris-oscuro | 3 | F4 | exec-1a9e41b9-fd36-47a4-b5fd-089fc145d6d1 | rejected — left/top one pixel above limit |
| gris-oscuro | 4 | F5 | exec-57276416-db67-4b41-859b-5ff322631333 | accepted — native-complete bottom-edge exception |
| antracita | 1 | F1 | exec-05c8869d-f399-482a-8150-5ff4f979fe5b | rejected — side padding above limit |
| antracita | 2 | F2 | exec-8f4d3ace-04e2-4786-82a9-2c76955ab0bf | accepted |
| nogal | 1 | F1 | exec-84db0ffe-bc12-4d86-8166-b1ddda285841 | rejected — side padding above limit |
| nogal | 2 | F3 | exec-ff46f701-6c82-401c-95a4-30e0d6a1557d | rejected — wrong aspect ratio |
| nogal | 3 | F4 | exec-49eb2b2a-97e9-4a7e-a23d-39304d75b3d4 | rejected — side padding one pixel above limit |
| nogal | 4 | F5 | exec-a056f221-737c-4546-a9fc-3a092e0dc6c3 | accepted |
| roble | 1 | F1 | exec-dd6f73f1-2b46-490f-b313-273ae91e6482 | rejected — broad padding |
| roble | 2 | F3 | exec-1136fe6e-3f84-46b4-a6df-172c8ee785c8 | rejected — left/top one pixel above limit |
| roble | 3 | F4 | exec-7e32426c-3a54-4fdb-bb30-30eab11da0d8 | rejected — side padding above limit |
| roble | 4 | F5 | exec-e04c53b9-ba2c-4f50-8823-fa5f7fe26856 | accepted — native-complete bottom-edge exception |
| gris-claro | 1 | F1 | exec-cad0f030-5cba-417a-b86d-d1ad1a90f990 | rejected — wrong aspect ratio and broad padding |
| gris-claro | 2 | F4 | exec-9da435fb-9533-4fe6-9390-28e624ef9c67 | rejected — broad padding |
| gris-claro | 3 | F5 | exec-64448398-ad9f-40ec-8ae8-7fc4f987f49a | accepted |
| natural | 1 | F1 | exec-04969a44-467c-4991-a560-db8b22a70e2f | rejected — broad padding |
| natural | 2 | F3 | exec-d4697a58-a6f6-4868-8b0b-47e2d78a14af | accepted — native-complete bottom-edge exception |
| natural | 3 | F4 | exec-3818fcec-9c94-491c-91b5-ca91bc267219 | rejected — broad padding |
| blanco | 1 | F1 | exec-756d8270-2c06-4faf-b10a-035e043b6751 | rejected — broad padding |
| blanco | 2 | F4 | exec-9a8147cb-aa48-4ad4-8102-c66978a08d02 | rejected — broad padding |
| blanco | 3 | F5 | exec-c475d8a1-c9ce-4707-b44f-7dd8ee76db21 | rejected — previous selected result retired byte-for-byte after the tighter revision |
| blanco | 4 | F6 | exec-adc53fe0-b390-4ec6-9906-14fc168fc9f1 | rejected — broad padding |
| blanco | 5 | R1 literal | exec-c1ad8342-de63-441d-9b79-238e07a6e139 | accepted — [11,4,11,0] at RGB<245, native-complete bottom edge |

Totals: 32 independent built-in ImageGen calls, 9 accepted and 23 rejected.

## Minimal-margin exceptions

The canonical original measures [4, 4, 1, 0] pixels at RGB<245 and therefore reaches the lower image edge. After multiple direct retries, negro, wengue, gris-oscuro, roble, natural and blanco retain the same 0-pixel bottom termination. Native-detail inspection confirms that their lower post tips and complete silhouette are intact.

The final blanco revision is directly detectable at RGB<245 and measures [11, 4, 11, 0]. Native-detail inspection confirms the full white header, both jambs, all four corners and both bottom endpoints. The displaced attempt 3 remains byte-for-byte under `_rejected/` with its historical RGB<250 audit.

No file under public was touched. No accepted or rejected PNG was processed after generation.

## Final minimum-margin revision — literal prompt

- Generator ID: `exec-c1ad8342-de63-441d-9b79-238e07a6e139`.
- Disposition: selected as blanco attempt 5.
- Dimensions: `766×2052`.
- RGB<245 margins `[left, top, right, bottom]`: `[11,4,11,0]`.
- SHA-256: `5bbf67f39664a7da12af53d16c8e921bf6ee555caa2f410f2aaa1c9cbcda9e59`.

The following is the literal `revised_prompt` recovered from the complete rollout:

```text
Edit ONLY this canonical reference into the BLANCO finish variant of the exact same door. Preserve the model exactly: straight-on ultra-tall narrow complete rectangular frame with intact top header, both side jambs/reveals, all four outer corners and both bottom endpoints; one completely plain flat slab leaf with absolutely no panels, grooves, inlays, glass or decorative lines; exactly one dark graphite/black straight horizontal lever on one round rosette at the lower-left-middle position and exactly one separate small round dark key escutcheon directly below it. No additional hardware. No text, badge, watermark, emblem or Wonly logo (NO_LOGO).

Refinish only the leaf and matching frame in clean matte white with faint restrained vertical material texture and enough subtle edge contrast for the whole silhouette to remain detectable against the pure white background. Keep all hardware dark and unchanged. Preserve source aspect ratio 397:1063 (width/height 0.37347), never widen it.

CRITICAL FRAMING: enlarge the complete assembly within the generated canvas so the outer frame nearly touches every image boundary, leaving only a hairline 0–4 pixel pure-white margin at left, top, right and bottom. At least 99% subject occupancy in width and height. No padding, breathing room, floor band, broad white border or cast shadow beyond the frame. Nevertheless, every outer corner, full header, both jambs/reveals and both bottom endpoints must remain fully visible and intact, never cropped. Photorealistic, centered, crisp ecommerce cutout.
```
