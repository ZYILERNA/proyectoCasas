# MADERAACÚSTICA/wl-j012 — direct ImageGen prompts

Use case: `product-mockup`. Every call was a fresh built-in ImageGen call. Image 1 was always the sole reference and edit target: `public/images/PUERTAS/MADERAACÚSTICA/wl-j012/original.webp`. No generated image, logo image or alternate product image was ever supplied as an input.

## Shared invariant contract

Recreate the exact very tall narrow `wl-j012` front elevation and preserve the complete square-post outer frame, straight top rail, broad plain vertical-grain leaf, one contrasting very dark full-height accent band close to the left edge, exactly two very slim parallel full-height trim lines immediately to the right of that band, and exactly one long slim dark horizontal recessed inlay at handle height across the broad leaf toward the right frame. Preserve exactly one dark slim horizontal lever on one round rosette and exactly one separate dark round key cylinder below it on the left.

Do not add grooves, strips, panels, glass, molding, decoration, hardware, floor, wall, room or scene. Render a centered front-facing orthographic-looking premium product image on pure white. `NO_LOGO`: no logo, brand, badge, text, symbol, watermark, microtext or pseudotext.

## Finish requests

- `negro`: deep matte black wood with subtle refined vertical grain.
- `wengue`: rich very dark espresso-brown wenge with subtle vertical grain.
- `gris-oscuro`: sophisticated dark charcoal-gray wood, visibly gray rather than black.
- `antracita`: deep neutral graphite anthracite-gray wood.
- `nogal`: rich warm walnut wood, medium-dark and not orange.
- `roble`: elegant golden oak, medium-light honey-gold and not orange.
- `gris-claro`: refined light neutral-gray wood, visibly gray rather than beige.
- `natural`: pale natural unfinished wood, light warm-neutral and neither yellow nor orange.
- `blanco`: clean matte neutral-white wood with subtle vertical grain and enough realistic edge shading to remain distinguishable from the white background.

## Direct composition contract

Use the canonical `405:1093` portrait proportion. Scale the complete door as large as possible so it almost fills the canvas. The target was a visible pure-white hairline of approximately 2–8 px per side; 12 px was the absolute accepted upper bound. Keep all outside frame edges and bottom ends complete. Broad padding and visible clipping are forbidden. Close framing must be created directly by ImageGen; no crop, resize, mask, filter, recolor, composite, conversion or other pixel processing is allowed.

For stubborn margin retries, the prompt was changed only to strengthen framing: `full-bleed and edge-to-edge`, `match Image 1's unusually tight original framing`, or `the white safety border is no wider than the two narrow vertical trims together`. Each retry repeated every geometry, hardware and NO_LOGO invariant and again referenced only `original.webp`.

## Call trace

| Finish | Calls | Accepted direct result | Outcome |
| --- | ---: | --- | --- |
| negro | 1 | `exec-3cab1de2-098b-464c-9458-9d2eb2054aed` | accepted attempt 1 |
| wengue | 4 | `exec-50a839f5-adbf-4c8c-9c82-75a3c7a69dfa` | attempts 1–3 rejected for 13–16 px side padding; accepted attempt 4 at max 11 px |
| gris-oscuro | 2 | `exec-6f116d37-2af0-44a5-8e1a-30c49a38b0bc` | attempt 1 rejected for 21/16 px side padding; accepted attempt 2 at max 5 px |
| antracita | 9 | `exec-9195bce8-fb37-46f0-b68d-80f11d8750dc` | accepted attempt 4 after native completeness review; other attempts rejected for padding, wrong aspect ratio or unsafe apparent clipping |
| nogal | 1 | `exec-1b7b087f-4313-4b1e-8744-33987d430c3f` | accepted attempt 1 at max 12 px |
| roble | 1 | `exec-4bd5da9b-ace9-48d9-a0da-5b1e03302d9e` | accepted attempt 1 at max 10 px |
| gris-claro | 5 | `exec-0903c6ff-e048-4742-9bd8-3c9e2c81a2ba` | accepted attempt 5; earlier attempts rejected for padding, wrong aspect ratio or unsafe three-edge contact |
| natural | 1 | `exec-d3b7169a-5689-45d2-b931-40547e3eb33d` | accepted attempt 1 at max 12 px |
| blanco | 1 | `exec-c6b99bc3-d621-47b3-9761-fe5646967c87` | accepted attempt 1 at max 5 px |

Total: 25 independent built-in ImageGen calls, 9 accepted untouched PNGs and 16 preserved rejected PNGs. Native visual QA confirmed the exact left accent, two parallel vertical trims, single horizontal inlay, one lever, one cylinder, complete frame geometry and absence of any logo/text in every accepted asset.
