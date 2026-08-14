# ACERO/s108 — direct ImageGen prompt record

All active assets were generated with one independent built-in ImageGen call. Every call used exactly these two references and no others:

1. `output/ai-full-regeneration/masters/ACERO/s108/master-no-logo-ai-tight.png` — exact architecture, frame, relief and hardware.
2. `public/images/logo-wonly.webp` — canonical WONLY artwork.

No generated output was ever reused as a reference. No filter, recolor, mask, crop, resize or composite was applied to an active PNG.

## Shared active prompt

```text
Use case: product-mockup
Asset type: ecommerce catalog product image for ACERO S108, finish <FINISH>
Input images: Image 1 is the sole reference for exact door architecture, proportions, complete frame, vertical fluting, top horizontal header, left smooth stile and smart-lock hardware. Image 2 is the sole reference for the official WONLY logo artwork.
Primary request: independently generate a photorealistic straight-on catalog image of this exact S108 door. Apply <FINISH-DIRECTIVE> to the door leaf while preserving all architecture and relief.
Composition/framing: complete closed door and every outer frame edge, corner and threshold visible; centered front elevation; extremely tight crop with 0–8 pixels of plain white preferred, and never more than 11 pixels; never crop the frame.
Architecture invariants: retain exactly one wide smooth top header divided by one horizontal seam, one wide smooth vertical left strip, dense narrow vertical ribs over the rest of the leaf, the same slim dark outer frame, the same bottom threshold, proportions and the same tall slim lock position on the lower-left. Add no handles, hinges, panels, seams, windows, decorations, rooms, walls, floors, props, scenery or cast shadows.
Hardware: keep the tall slim black lock geometry and camera/sensor aperture with a blank lower pad. The lock face must contain no digits, letters, words, logo, wing mark, chevron, hand icon, wireless icon, keypad numerals, pseudo-characters or microtext.
Logo: exactly ONE small official WONLY logo from Image 2, faithful and legible, centered inside a restrained slim black rectangular metal plaque on the upper-right of the smooth top header. No second WONLY anywhere.
Scene/backdrop: pure plain white only.
Style/medium: premium realistic product photography, crisp material detail, neutral studio lighting, no perspective.
Text (verbatim): "WONLY"
Constraints: exactly one WONLY and zero other text or pseudotext; no watermark; full frame nearly flush to canvas.
Avoid: invented lettering or symbols, duplicate logo, changed architecture or hardware, cropped frame, large white border, perspective or environment.
```

## Finish directives

| Finish | Directive |
| --- | --- |
| original | Original dark graphite-charcoal satin steel. |
| negro | Deep matte black steel with subtle realistic grain. |
| wengue | Dark wenge wood, near-black chocolate brown, restrained straight vertical grain. |
| gris-oscuro | Cool dark-gray satin steel, visibly gray and lighter than black. |
| antracita | Rich neutral anthracite satin steel, distinct from pure black. |
| nogal | Medium-dark walnut with realistic vertical brown grain. |
| roble | Natural medium oak, warm honey-tan with fine vertical grain. |
| gris-claro | Light cool-gray satin steel with clear relief contrast. |
| natural | Pale unfinished oak, light beige-blond with delicate vertical grain. |
| blanco | Warm white satin-painted steel with soft gray relief shading. |

The accepted `roble` call used a stricter blank-lock clause after attempt 1 invented a wing-like lower emblem. The accepted `gris-claro` call used a stricter 0–6 px framing clause after attempt 1 exceeded the margin tolerance. The second antracita and gris-oscuro framing attempts were independently generated from the same two sources but were rejected because their borders were wider than the accepted first attempts.
