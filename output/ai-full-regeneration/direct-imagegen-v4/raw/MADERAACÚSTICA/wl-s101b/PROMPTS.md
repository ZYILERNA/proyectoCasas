# MADERAACÚSTICA/wl-s101b — direct ImageGen prompts

Use case: `product-mockup`. All 15 requests were independent built-in ImageGen edits. Every call referenced only `public/images/PUERTAS/MADERAACÚSTICA/wl-s101b/original.webp`. No generated result, public variant, logo asset or secondary image was ever supplied as input.

## Shared invariant contract

Create one premium catalog finish variant while preserving the reference door's exact architecture, proportions, front-facing viewpoint and hardware: the same very tall narrow single flat door leaf; complete straight outer casing with a square top lintel and two slim side posts; deep narrow dark reveal down the inner left edge; exactly one very tall, extremely narrow rectangular frosted/textured-glass insert left of center, with its canonical thin frame, position, width and vertical length; otherwise one completely plain uninterrupted leaf with no panels or grooves; exactly one slim silver horizontal lever on one round silver rosette at the left, pointing right at the canonical height; and exactly one separate small round silver key escutcheon directly below. Keep the textured glass and silver hardware unchanged. Change only the opaque door-and-casing material finish.

Use a pure white empty catalog background. NO_LOGO: no logo, wordmark, badge, letters, numbers, text, watermark, microtext or pseudotext. Add no glass, panel, seam, groove, molding, lock, handle, hinge, ornament, wall, floor, scene or cast shadow. Preserve all joins, proportions and all four outer corners.

Reproduce the original's extreme `[5,4,2,5]` occupancy: door as large as possible, almost full bleed, with 0–6 px preferred clearance per side and 12 px normal maximum, never broad padding. Keep the complete silhouette uncropped; no programmatic crop or resize is permitted.

## Finish instructions

- `negro`: deep neutral architectural black, restrained matte texture, readable edges.
- `wengue`: very dark espresso-brown wenge, subtle realistic straight vertical grain, not reddish.
- `gris-oscuro`: dark neutral charcoal gray, refined low sheen.
- `antracita`: deep graphite anthracite, restrained low sheen.
- `nogal`: medium warm walnut brown, fine straight grain, not orange.
- `roble`: warm golden oak, subtle straight grain, no knots or rustic defects.
- `gris-claro`: pale neutral light gray, subtle matte texture, distinct from the white background.
- `natural`: very light pale-beige natural unfinished wood, subtle straight vertical grain.
- `blanco`: clean warm architectural white, controlled relief against the white background.

## Calls and selections

| Finish | Calls | Selected attempt | Selected generator ID | RGB<245 margins L/T/R/B |
|---|---:|---:|---|---|
| negro | 1 | 1 | `exec-209b7392-1c41-497d-a68b-0f44be3b041e` | 11/8/7/6 |
| wengue | 1 | 1 | `exec-500160c5-27c8-4ebe-92b3-68e4028971f2` | 12/7/7/5 |
| gris-oscuro | 1 | 1 | `exec-85a0df37-0608-4bd7-846a-a83309ae8b85` | 9/7/7/4 |
| antracita | 2 | 2 | `exec-82fb0287-bc0d-45b0-8341-9cbae7707c17` | 10/10/8/8 |
| nogal | 1 | 1 | `exec-aad098ed-7cff-4f96-a3bc-cf882ed787eb` | 10/7/8/8 |
| roble | 2 | 2 | `exec-d0f97b8b-8d0d-426b-a650-1163f2e97215` | 9/7/6/6 |
| gris-claro | 1 | 1 | `exec-825cda65-7a9c-425c-9247-1be676363909` | 10/8/10/8 |
| natural | 5 | 5 | `exec-6a05d926-b510-4f15-b819-29f756006335` | 0/0/0/0 |
| blanco | 1 | 1 | `exec-4aa0c14d-e9e8-4e02-8fec-519f96ce36d4` | 9/8/7/10 |

Retries repeated the full invariant contract against the same sole original and strengthened only the framing clause. Natural attempt 5 is the final selection at `[0,0,0,0]`; native-detail inspection confirms the complete lintel, both full-width side posts, all four corners, deep reveal and both bottom endpoints. The prior selected attempt 3 and all other discarded calls are retained byte-for-byte, giving six rejected outputs under `_rejected/`.

## Natural attempt 5 — literal minimum-margin revision

- Generator ID: `exec-6a05d926-b510-4f15-b819-29f756006335`.
- Disposition: selected as `natural` attempt 5.
- Dimensions: `778×2020`.
- RGB<245 margins `[left, top, right, bottom]`: `[0,0,0,0]`.
- SHA-256: `3d2f68648adcf950b0087df1c089434bf0ae50b9009ce982ae070b643386e957`.
- Literal prompt SHA-256 (UTF-8): `61e3af41cf0be4ede8f7180bf3d7f49aaf1aa448efddcc82df140cad3c42dbc0`.

The following is the literal `image_generation_end.revised_prompt` recovered losslessly from the complete rollout. Image 1 was only the canonical `original.webp`:

```text
Edit ONLY the attached canonical original into its NATURAL finish variant. Preserve the exact door model: front-facing very tall narrow flat single leaf; complete square top lintel and two slim side casing posts with all four outer corners and both bottom endpoints; deep narrow inner-left reveal; exactly ONE very tall extremely narrow textured/frosted-glass rectangle left of center, with straight four-sided border and the same height/width/placement; otherwise the leaf is completely plain, uninterrupted and undecorated. Preserve exactly ONE slim silver horizontal lever pointing right on ONE round silver rosette, plus exactly ONE separate small round silver key escutcheon below, at the canonical left placement. No other panels, glass, seams, grooves, hinges, moldings or hardware. Absolutely no logo, Wonly mark, text, badge, watermark or pseudotext (NO_LOGO).

Refinish only leaf and matching casing in very light natural unfinished wood, warm pale beige with subtle fine straight vertical grain. Keep the glass translucent textured silver-white and hardware silver. Preserve canonical width/height ratio 0.385407; never widen.

CRITICAL FULL-BLEED FRAMING: the complete outer casing should meet or sit within 0–3 pixels of all four canvas edges. Make the full assembly occupy at least 99.5% of both width and height. No white padding, breathing room, broad border, floor band or shadow. Prefer the outer colored left and right posts to touch the first and last pixel columns, while their complete widths, all four outer corners, full lintel, deep reveal and both bottom endpoints remain visibly intact—not cut off. Pure white background only outside the exact silhouette. Straight-on, centered, photorealistic, crisp ecommerce cutout.
```
