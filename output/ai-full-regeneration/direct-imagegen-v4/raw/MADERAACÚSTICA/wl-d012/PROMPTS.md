# MADERAACÚSTICA/wl-d012 — direct built-in ImageGen prompts and minimum-margin revision

All 36 renders were independent built-in ImageGen calls. Every call referenced only `public/images/PUERTAS/MADERAACÚSTICA/wl-d012/original.webp`; no generated variant or logo asset was referenced. Reference SHA-256 before/after: `7bed1073d49bbff2055a07c17ad29252880768c58a6d76ba701fd24bb4b84cd1`.

Policy: `NO_LOGO`. No filter, scripted recolor, mask, crop, resize, composition, format conversion, or post-generation pixel processing was applied. Nine prior selections, all new non-selected attempts, and all final selections are preserved byte-for-byte. Exact hashes and native metrics are in `manifest.json` and `QA.json`.

For templated prompts below, replacing the named placeholder with the listed exact value yields the complete literal prompt; no other text was added or removed.

## Historical prompt (9 displaced calls)

~~~text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference.
Primary request: Change only every visible broad door-leaf wood surface to an exact {{FINISH_CLAUSE}}.
Subject: the exact same acoustic door model wl-d012 shown in Image 1.
Style/medium: high-fidelity photorealistic architectural product photography.
Composition/framing: preserve the exact extremely tall narrow straight-on silhouette, complete layered outer frame, near-flush catalog crop, minimal white background, scale, and original 412:1066 width-to-height ratio of about 0.3865. Do not widen, shorten, crop, tilt, or add margin.
Critical geometry: preserve the signature dark navy inlay exactly. One very thin vertical groove descends from the top near the left side of the leaf to just above the handle. At handle height it connects to a single solid dark-navy slanted parallelogram insert: a short upper diagonal runs down-right, a short right vertical edge passes behind the handle area, a parallel lower diagonal runs up-left, and a short left vertical edge closes the filled shape. From the lower right corner, a second very thin vertical groove continues straight to the bottom; this lower groove is offset to the right of the upper groove. Preserve this precise offset, both parallel diagonal edges, the filled navy area, and all junctions.
Hardware/frame invariants: preserve the narrow dark recessed reveal immediately inside the far-left frame; the layered neutral gray perimeter frame and top mouldings; exactly one dark horizontal lever handle on one round rosette crossing the upper portion of the navy insert; and exactly one separate circular key escutcheon directly below the rosette, with identical size and placement.
Constraints: change only the broad leaf finish; retain frame finish, dark navy inlay color and geometry, proportions, depths, shadows, vertical grain direction, hardware count and placement, neutral lighting, plain catalog background, and composition. No redesign, new objects, crop, resize, reframing, or added margin.
Avoid: logo, WONLY mark, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding{{WHITE_AVOID}}, duplicated or missing hardware, straight continuous groove replacing the offset design, missing parallelogram, extra inlays or panels, curves, room scene, people, props.
~~~

Historical substitutions:

- `negro`: `NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible`; `{{WHITE_AVOID}}` = empty.
- `wengue`: `WENGUÉ finish: very dark espresso-brown tropical wood with restrained near-black vertical grain, clearly brown rather than neutral black`; `{{WHITE_AVOID}}` = empty.
- `gris-oscuro`: `GRIS OSCURO finish: deep neutral charcoal-gray stained wood, clearly gray rather than black, with subtle authentic vertical grain`; `{{WHITE_AVOID}}` = empty.
- `antracita`: `ANTRACITA finish: saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain`; `{{WHITE_AVOID}}` = empty.
- `nogal`: `NOGAL finish: refined medium-rich warm walnut brown with natural darker vertical grain, elegant and realistic, neither orange nor red`; `{{WHITE_AVOID}}` = empty.
- `roble`: `ROBLE finish: light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange`; `{{WHITE_AVOID}}` = empty.
- `gris-claro`: `GRIS CLARO finish: pale neutral light-gray stained wood, soft cool silver-gray with subtle authentic vertical grain, clearly lighter than the original leaf yet distinct from pure white`; `{{WHITE_AVOID}}` = empty.
- `natural`: `NATURAL finish: very light untreated natural wood in warm pale beige and sand tones, matte, unstained, with understated authentic vertical grain`; `{{WHITE_AVOID}}` = empty.
- `blanco`: `BLANCO finish: clean neutral matte white-painted wood without cream or gray cast, with very subtle authentic vertical grain still visible`; `{{WHITE_AVOID}}` = `, beige or yellow cast`.

The nine historical call IDs are in the ledger below.

## Revision finish clauses

- `negro`: `NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible`
- `wengue`: `WENGUÉ finish: very dark espresso-brown tropical wood with restrained near-black vertical grain, clearly brown rather than neutral black`
- `gris-oscuro`: `GRIS OSCURO finish: deep neutral charcoal-gray stained wood, clearly gray rather than black, with subtle authentic vertical grain`
- `antracita`: `ANTRACITA finish: saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain`
- `nogal`: `NOGAL finish: refined medium-rich warm walnut brown with natural darker vertical grain, elegant and realistic, neither orange nor red`
- `roble`: `ROBLE finish: light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange`
- `gris-claro`: `GRIS CLARO finish: pale neutral light-gray stained wood, soft cool silver-gray with subtle authentic vertical grain, distinct from pure white`
- `natural`: `NATURAL finish: very light untreated natural wood in warm pale beige and sand tones, matte, unstained, with understated authentic vertical grain`
- `blanco`: `BLANCO finish: clean neutral matte white-painted/whitewashed wood without cream or gray cast, with subtle authentic vertical grain and clear edge definition`

## Shared revision prompt bodies


### shared-r1

~~~text
Use case: precise-object-edit
Asset type: canonical e-commerce acoustic-door catalog image
Input images: Image 1 is the sole edit target, sole visual reference, and sole canonical geometry source. Do not use or infer from any generated variant.
Primary request: Generate a fresh independent direct AI catalog render of the exact MADERAACÚSTICA/wl-d012 door shown in Image 1 in the {{FINISH_CLAUSE}}. Change only the broad leaf wood finish.
Architecture and geometry invariants: preserve the exact extremely tall narrow 412:1066 straight-on orthographic model; the complete layered neutral-gray metal outer casing; full top lintel and every stepped perimeter molding; narrow side rails; dark far-left recessed reveal; both complete bottom endpoints and every corner.
Signature inlay invariants: preserve exactly one very thin dark-navy upper vertical groove near the left side from the top to just above handle height; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; and exactly one very thin lower vertical groove continuing from the parallelogram's lower-right corner to the bottom, visibly offset rightward from the upper groove. Preserve every junction, width, angle, dark-navy color, and source position. No other seam, panel, insert, inlay, groove, molding, curve, or decoration.
Hardware invariants: exactly one short slim dark horizontal lever pointing right on one round dark rosette, crossing the upper portion of the navy insert, and exactly one separate small round dark key cylinder directly below at the source position and scale. No other hardware, hinge, handle, lock, or rosette.
Scene/backdrop: pure seamless white background only; no wall, room, floor, horizon, props, cast shadow, fake outline, or border.
Composition/framing: preserve the exact front-facing proportion and make the complete intact casing as large as possible. MANDATORY MINIMUM WHITE MARGINS: target 0–4 pixels on left, top, right, and bottom. Edge contact at 0 pixels is allowed and preferred over extra padding when all casing layers, corners, rails, and both bottom endpoints remain fully visible and uncropped. No conventional catalog safety padding.
NO_LOGO: no logo, WONLY mark, brand, badge, text, letters, numbers, symbols, watermark, signature, microtext, or pseudotext.
Constraints: preserve frame material/color, navy inlay, hardware, proportions, lighting, grain direction, and silhouette exactly. No redesign, crop, resize, filter, recolor, mask, compositing, conversion, or post-processing.
~~~

### shared-r2-enlarge

~~~text
Use case: precise-object-edit
Asset type: canonical e-commerce acoustic-door catalog image
Input images: Image 1 is the sole edit target, sole visual reference, and sole canonical geometry source. Do not use or infer from any generated variant.
Primary request: Generate a fresh independent direct AI catalog render of the exact MADERAACÚSTICA/wl-d012 door shown in Image 1 in the {{FINISH_CLAUSE}}. Change only the broad leaf wood finish.
Architecture and geometry invariants: preserve the exact extremely tall narrow 412:1066 straight-on orthographic model; the complete layered neutral-gray metal outer casing; full top lintel and every stepped perimeter molding; narrow side rails; dark far-left recessed reveal; both complete bottom endpoints and every corner.
Signature inlay invariants: preserve exactly one very thin dark-navy upper vertical groove near the left side from the top to just above handle height; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; and exactly one very thin lower vertical groove continuing from the parallelogram's lower-right corner to the bottom, visibly offset rightward from the upper groove. Preserve every junction, width, angle, dark-navy color, and source position. No other seam, panel, insert, inlay, groove, molding, curve, or decoration.
Hardware invariants: exactly one short slim dark horizontal lever pointing right on one round dark rosette, crossing the upper portion of the navy insert, and exactly one separate small round dark key cylinder directly below at the source position and scale. No other hardware, hinge, handle, lock, or rosette.
Scene/backdrop: pure seamless white background only; no wall, room, floor, horizon, props, cast shadow, fake outline, or border.
Composition/framing: preserve the exact front-facing proportion and enlarge the complete intact casing until every outermost casing edge lies only 0–4 pixels from its corresponding canvas edge. The target is 0–4 pixels of pure-white clearance on left, top, right, and bottom, never 5 pixels or more. Edge contact at 0 pixels is explicitly allowed and preferred over excess padding. Keep every casing layer, corner, narrow rail, and both bottom endpoints fully visible and uncropped. No conventional catalog safety padding.
NO_LOGO: no logo, WONLY mark, brand, badge, text, letters, numbers, symbols, watermark, signature, microtext, or pseudotext.
Constraints: preserve frame material/color, navy inlay, hardware, proportions, lighting, grain direction, and silhouette exactly. No redesign, crop, resize, filter, recolor, mask, compositing, conversion, or post-processing.
~~~

### shared-r3-rgb245-edge

~~~text
Use case: precise-object-edit
Asset type: canonical e-commerce acoustic-door catalog image
Input images: Image 1 is the sole edit target, sole visual reference, and sole canonical geometry source. Do not use or infer from any generated variant.
Primary request: Generate a fresh independent direct AI catalog render of the exact MADERAACÚSTICA/wl-d012 door shown in Image 1 in the {{FINISH_CLAUSE}}. Change only the broad leaf wood finish.
Architecture and geometry invariants: preserve the exact extremely tall narrow 412:1066 straight-on orthographic model; the complete layered neutral-gray metal outer casing; full top lintel and every stepped perimeter molding; narrow side rails; dark far-left recessed reveal; both complete bottom endpoints and every corner.
Signature inlay invariants: preserve exactly one very thin dark-navy upper vertical groove near the left side from the top to just above handle height; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; and exactly one very thin lower vertical groove continuing from the parallelogram's lower-right corner to the bottom, visibly offset rightward from the upper groove. Preserve every junction, width, angle, dark-navy color, and source position. No other seam, panel, insert, inlay, groove, molding, curve, or decoration.
Hardware invariants: exactly one short slim dark horizontal lever pointing right on one round dark rosette, crossing the upper portion of the navy insert, and exactly one separate small round dark key cylinder directly below at the source position and scale. No other hardware, hinge, handle, lock, or rosette.
Scene/backdrop: pure seamless white background only; no wall, room, floor, horizon, props, cast shadow, fake outline, or border.
Composition/framing: preserve the exact front-facing proportion. Fill the portrait canvas with the complete intact casing. On each of left, top, right, and bottom, the first authentic neutral-gray metal casing pixel visibly darker than RGB 245 must occur within 0–4 pixels of the canvas edge. Do not leave a near-white halo that counts as padding. Edge contact at 0 pixels is explicitly allowed and preferred. Keep the complete outer casing layers, true metal contours, every corner, both side rails, and both bottom endpoints visible and uncropped; do not invent a border or outline. No conventional catalog safety padding.
NO_LOGO: no logo, WONLY mark, brand, badge, text, letters, numbers, symbols, watermark, signature, microtext, or pseudotext.
Constraints: preserve frame material/color, navy inlay, hardware, proportions, lighting, grain direction, and silhouette exactly. No redesign, crop, resize, filter, recolor, mask, compositing, conversion, or post-processing.
~~~

### shared-r4-touch

~~~text
Use case: precise-object-edit
Asset type: canonical e-commerce acoustic-door catalog image
Input images: Image 1 is the sole edit target, sole visual reference, and sole canonical geometry source. Do not use or infer from any generated variant.
Primary request: Generate a fresh independent direct AI catalog render of the exact MADERAACÚSTICA/wl-d012 door shown in Image 1 in the {{FINISH_CLAUSE}}. Change only the broad leaf wood finish.
Architecture and geometry invariants: preserve the exact extremely tall narrow 412:1066 straight-on orthographic model; the complete layered neutral-gray metal outer casing; full top lintel and every stepped perimeter molding; narrow side rails; dark far-left recessed reveal; both complete bottom endpoints and every corner.
Signature inlay invariants: preserve exactly one very thin dark-navy upper vertical groove near the left side from the top to just above handle height; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; and exactly one very thin lower vertical groove continuing from the parallelogram's lower-right corner to the bottom, visibly offset rightward from the upper groove. Preserve every junction, width, angle, dark-navy color, and source position. No other seam, panel, insert, inlay, groove, molding, curve, or decoration.
Hardware invariants: exactly one short slim dark horizontal lever pointing right on one round dark rosette, crossing the upper portion of the navy insert, and exactly one separate small round dark key cylinder directly below at the source position and scale. No other hardware, hinge, handle, lock, or rosette.
Scene/backdrop: pure seamless white background only; no wall, room, floor, horizon, props, cast shadow, fake outline, or border.
Composition/framing: preserve the exact front-facing proportion. The complete intact outer metal casing must visually touch or nearly touch all four canvas edges: use 0 pixels of white clearance wherever possible and never more than 4 pixels on any side. Scale the whole door uniformly within the generated canvas while keeping every original casing layer, true contour, corner, side rail, and both bottom endpoints completely visible and uncropped. No white halo, no safety padding, no invented border or outline.
NO_LOGO: no logo, WONLY mark, brand, badge, text, letters, numbers, symbols, watermark, signature, microtext, or pseudotext.
Constraints: preserve frame material/color, navy inlay, hardware, proportions, lighting, grain direction, and silhouette exactly. No redesign, crop, resize, filter, recolor, mask, compositing, conversion, or post-processing.
~~~

## Finish-specific literal retry prompts

### negro-r2

~~~text
Use case: precise-object-edit
Asset type: canonical e-commerce acoustic-door catalog image
Input images: Image 1 is the sole edit target, sole visual reference, and sole canonical geometry source. Do not use or infer from any generated variant.
Primary request: Generate a fresh independent direct AI catalog render of the exact MADERAACÚSTICA/wl-d012 door shown in Image 1 in the NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible. Change only the broad leaf wood finish.
Architecture and geometry invariants: preserve the exact extremely tall narrow 412:1066 straight-on orthographic model; the complete layered neutral-gray metal outer casing; full top lintel and every stepped perimeter molding; narrow side rails; dark far-left recessed reveal; both complete bottom endpoints and every corner.
Signature inlay invariants: preserve exactly one very thin dark-navy upper vertical groove near the left side from the top to just above handle height; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; and exactly one very thin lower vertical groove continuing from the parallelogram's lower-right corner to the bottom, visibly offset rightward from the upper groove. Preserve every junction, width, angle, dark-navy color, and source position. No other seam, panel, insert, inlay, groove, molding, curve, or decoration.
Hardware invariants: exactly one short slim dark horizontal lever pointing right on one round dark rosette, crossing the upper portion of the navy insert, and exactly one separate small round dark key cylinder directly below at the source position and scale. No other hardware, hinge, handle, lock, or rosette.
Scene/backdrop: pure seamless white background only; no wall, room, floor, horizon, props, cast shadow, fake outline, or border.
Composition/framing: preserve the exact front-facing proportion. MANDATORY EDGE-TO-EDGE SCALE CORRECTION: the previous independent render left 8–11 pixels of white safety padding and is rejected. From the original itself, enlarge the complete intact casing until it nearly fills the canvas, matching or improving the original’s roughly 1-pixel left, 5-pixel top, 6-pixel right, and 2-pixel bottom clearance. Target 0–4 pixels on every side. Edge contact at 0 pixels is explicitly allowed and preferred to visible padding, provided every casing layer, corner, rail, and both bottom endpoints remains fully visible and uncropped. Any white margin greater than 4 pixels is a framing failure. No conventional catalog safety padding.
NO_LOGO: no logo, WONLY mark, brand, badge, text, letters, numbers, symbols, watermark, signature, microtext, or pseudotext.
Constraints: preserve frame material/color, navy inlay, hardware, proportions, lighting, grain direction, and silhouette exactly. No redesign, crop, resize, filter, recolor, mask, compositing, conversion, or post-processing.
~~~

### negro-r3

~~~text
Use case: precise-object-edit
Asset type: canonical e-commerce acoustic-door catalog image
Input images: Image 1 is the sole edit target, sole visual reference, and sole canonical geometry source. Do not use or infer from any generated variant.
Primary request: Generate a fresh independent direct AI catalog render of the exact MADERAACÚSTICA/wl-d012 door shown in Image 1 in the NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible. Change only the broad leaf wood finish.
Architecture and geometry invariants: preserve the exact extremely tall narrow 412:1066 straight-on orthographic model; the complete layered neutral-gray metal outer casing; full top lintel and every stepped perimeter molding; narrow side rails; dark far-left recessed reveal; both complete bottom endpoints and every corner.
Signature inlay invariants: preserve exactly one very thin dark-navy upper vertical groove near the left side from the top to just above handle height; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; and exactly one very thin lower vertical groove continuing from the parallelogram's lower-right corner to the bottom, visibly offset rightward from the upper groove. Preserve every junction, width, angle, dark-navy color, and source position. No other seam, panel, insert, inlay, groove, molding, curve, or decoration.
Hardware invariants: exactly one short slim dark horizontal lever pointing right on one round dark rosette, crossing the upper portion of the navy insert, and exactly one separate small round dark key cylinder directly below at the source position and scale. No other hardware, hinge, handle, lock, or rosette.
Scene/backdrop: pure seamless white background only; no wall, room, floor, horizon, props, cast shadow, fake outline, or border.
Composition/framing: preserve the exact front-facing proportion. MANDATORY CANONICAL CONTACT SCALE: place the complete outer casing almost edge-to-edge exactly like Image 1. Make its left outer edge 0–3 pixels from x=0, its right outer edge 0–3 pixels from the final column, its complete top 0–3 pixels from y=0, and both complete bottom endpoints 0–3 pixels from the final row. The previous two independent attempts left 8 or 11 pixels at the right and are rejected. Eliminate that right-side safety padding by enlarging/centering the AI render from the original, while keeping every layer and corner fully visible. Target 0–4 pixels all sides; any margin above 4 is failure. Edge contact is explicitly allowed and not cropping. No conventional catalog padding.
NO_LOGO: no logo, WONLY mark, brand, badge, text, letters, numbers, symbols, watermark, signature, microtext, or pseudotext.
Constraints: preserve frame material/color, navy inlay, hardware, proportions, lighting, grain direction, and silhouette exactly. No redesign, crop, resize, filter, recolor, mask, compositing, conversion, or post-processing.
~~~

### negro-r4

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as sole visual reference. Create a fresh independent direct AI render in NEGRO: deep neutral near-black stained wood with subtle authentic vertical grain. Preserve exact 412:1066 architecture: complete layered gray metal casing, dark far-left reveal, one thin navy upper groove, one filled navy slanted parallelogram at handle height, one thin lower groove offset right, exactly one lever on one round rosette plus one separate round key cylinder below. NO extra geometry or hardware. NO logo, brand, text, symbols, watermark, microtext or pseudotext. Pure seamless white background; straight-on orthographic.

FINAL RIGHT-MARGIN CORRECTION: three prior independent attempts were rejected; the best measured RGB<245 [0,3,7,0]. Recreate from the original with the complete RIGHT OUTER RAIL touching the final canvas column or at most 3 pixels from it, while keeping left 0–3, top 0–3, and bottom 0–3. All stepped metal edges, top corners, side rails and both bottom endpoints must remain fully visible. Contact is explicitly allowed and not cropping. Do not add catalog padding; target every side 0–4 pixels.

Change only the broad leaf finish. No filter, crop, resize, recolor operation, mask, composite, conversion, or post-processing.
~~~

### roble-r2

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as the sole visual reference. Generate a fresh independent direct AI catalog render in the ROBLE finish: light-to-medium honey oak, warm golden beige, restrained realistic vertical oak grain, lighter than walnut and not orange. Preserve the exact 412:1066 model and change only the broad leaf finish.

Preserve the complete layered neutral-gray metal outer casing, full top lintel, stepped moldings, narrow side rails, dark far-left recessed reveal, every corner, and both complete bottom endpoints. Preserve exactly one thin dark-navy upper vertical groove; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; exactly one thin lower vertical groove from its lower-right corner to the bottom, offset rightward. Preserve exactly one slim dark horizontal lever on one round rosette plus exactly one separate small round dark key cylinder below. No extra seam, panel, insert, groove, hardware, hinge, decoration, logo, brand, text, letters, numbers, symbols, watermark, microtext, or pseudotext.

Pure seamless white background only; no room, wall, floor, horizon, props, cast shadow, outline, or border. Exact centered straight-on orthographic view.

MANDATORY MINIMUM-MARGIN REVISION: the prior independent AI attempt measured RGB<245 white clearances [9,9,14,0] and is rejected. From the original itself, render the intact casing larger so LEFT, TOP, RIGHT, BOTTOM margins are each 0–4 pixels. The right outer casing must be 0–3 pixels from the final column, not 14. The top and left must also be 0–4. Edge contact is allowed and is not cropping; retain all casing layers, corners, rails, and endpoints visibly complete. Visible catalog safety padding is forbidden. Any margin above 4 pixels is failure.

No redesign, filter, crop, resize, recolor operation, mask, compositing, conversion, or post-processing. This must be a new direct AI render from the sole original.
~~~

### roble-r3

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as sole visual reference. Create a fresh independent direct AI render in ROBLE: light-to-medium honey oak, warm golden beige, restrained authentic vertical oak grain, not orange. Preserve exact 412:1066 architecture: complete layered gray metal casing, dark far-left reveal, one thin navy upper groove, one filled navy slanted parallelogram at handle height, one thin lower groove offset right, exactly one lever on one round rosette plus one separate round key cylinder below. NO extra geometry or hardware. NO logo, brand, text, symbols, watermark, microtext or pseudotext. Pure seamless white background; straight-on orthographic.

MANDATORY CONTACT-SCALE CORRECTION: two prior independent attempts measured RGB<245 [9,9,14,0] and [9,10,10,0] and are rejected. Render the casing substantially larger. Place its left and right outer rails in direct contact or at most 3 pixels from their canvas edges; place its complete top lintel in direct contact or at most 3 pixels from y=0; place both complete bottom endpoints in contact or at most 3 pixels from the final row. Contact is allowed and is not cropping. Every stepped molding, corner, rail and endpoint must remain complete. Do not leave any white safety padding. Target every side 0–4 pixels; any side above 4 is failure.

Change only the broad leaf finish. No filter, crop, resize, recolor operation, mask, composite, conversion, or post-processing.
~~~

### gris-claro-r2

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as the sole visual reference. Generate a fresh independent direct AI catalog render in the GRIS CLARO finish: pale neutral light-gray stained wood, soft cool silver-gray, subtle authentic vertical grain, distinct from pure white. Preserve the exact 412:1066 model and change only the broad leaf finish.

Preserve the complete layered neutral-gray metal outer casing, full top lintel, stepped moldings, narrow side rails, dark far-left recessed reveal, every corner, and both complete bottom endpoints. Preserve exactly one thin dark-navy upper vertical groove; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; exactly one thin lower vertical groove from its lower-right corner to the bottom, offset rightward. Preserve exactly one slim dark horizontal lever on one round rosette plus exactly one separate small round dark key cylinder below. No extra seam, panel, insert, groove, hardware, hinge, decoration, logo, brand, text, letters, numbers, symbols, watermark, microtext, or pseudotext.

Pure seamless white background only; no room, wall, floor, horizon, props, cast shadow, outline, or border. Exact centered straight-on orthographic view.

MANDATORY MINIMUM-MARGIN REVISION: the prior independent AI attempt measured RGB<245 white clearances [2,7,7,0] and is rejected. From the original itself, enlarge the intact casing slightly so LEFT, TOP, RIGHT, BOTTOM margins are each 0–4 pixels. The top and right outer casing must be 0–4 pixels from the canvas edges, not 7. Edge contact is allowed and is not cropping; retain all casing layers, corners, rails, and endpoints visibly complete. Visible catalog safety padding is forbidden. Any margin above 4 pixels is failure.

No redesign, filter, crop, resize, recolor operation, mask, compositing, conversion, or post-processing. This must be a new direct AI render from the sole original.
~~~

### natural-r2

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as the sole visual reference. Generate a fresh independent direct AI catalog render in the NATURAL finish: very light untreated wood in warm pale beige and sand tones, matte, unstained, understated authentic vertical grain. Preserve the exact 412:1066 model and change only the broad leaf finish.

Preserve the complete layered neutral-gray metal outer casing, full top lintel, stepped moldings, narrow side rails, dark far-left recessed reveal, every corner, and both complete bottom endpoints. Preserve exactly one thin dark-navy upper vertical groove; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; exactly one thin lower vertical groove from its lower-right corner to the bottom, offset rightward. Preserve exactly one slim dark horizontal lever on one round rosette plus exactly one separate small round dark key cylinder below. No extra seam, panel, insert, groove, hardware, hinge, decoration, logo, brand, text, letters, numbers, symbols, watermark, microtext, or pseudotext.

Pure seamless white background only; no room, wall, floor, horizon, props, cast shadow, outline, or border. Exact centered straight-on orthographic view.

MANDATORY MINIMUM-MARGIN REVISION: the prior independent AI attempt measured RGB<245 white clearances [9,11,14,0] and is rejected. From the original itself, render the intact casing larger so LEFT, TOP, RIGHT, BOTTOM margins are each 0–4 pixels. The right outer casing must be 0–3 pixels from the final column, not 14. The top and left must also be 0–4. Edge contact is allowed and is not cropping; retain all casing layers, corners, rails, and endpoints visibly complete. Visible catalog safety padding is forbidden. Any margin above 4 pixels is failure.

No redesign, filter, crop, resize, recolor operation, mask, compositing, conversion, or post-processing. This must be a new direct AI render from the sole original.
~~~

### natural-r3

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as the sole visual reference. Generate a fresh independent direct AI catalog render in the NATURAL finish: very light untreated wood in warm pale beige and sand tones, matte, unstained, understated authentic vertical grain. Preserve the exact 412:1066 model and change only the broad leaf finish.

Preserve the complete layered neutral-gray metal outer casing, full top lintel, stepped moldings, narrow side rails, dark far-left recessed reveal, every corner, and both complete bottom endpoints. Preserve exactly one thin dark-navy upper vertical groove; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; exactly one thin lower vertical groove from its lower-right corner to the bottom, offset rightward. Preserve exactly one slim dark horizontal lever on one round rosette plus exactly one separate small round dark key cylinder below. No extra seam, panel, insert, groove, hardware, hinge, decoration, logo, brand, text, letters, numbers, symbols, watermark, microtext, or pseudotext.

Pure seamless white background only; no room, wall, floor, horizon, props, cast shadow, outline, or border. Exact centered straight-on orthographic view.

MANDATORY CONTACT-SCALE CORRECTION: two prior independent AI attempts measured [9,11,14,0] and [10,10,15,0] and are rejected. Render the original casing substantially larger. Place its left and right outer rails in direct contact or at most 3 pixels from their canvas edges; place its complete top lintel in direct contact or at most 3 pixels from y=0; place both complete bottom endpoints in contact or at most 3 pixels from the final row. Contact is allowed and is not cropping. Every stepped molding, corner, rail and endpoint must remain complete. Do not leave any white safety padding. Target RGB<245 margins [0–3,0–3,0–3,0–3]; any side above 4 is failure.

No redesign, filter, crop, resize, recolor operation, mask, compositing, conversion, or post-processing. This must be a new direct AI render from the sole original.
~~~

### natural-r4

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as the sole visual reference. Create a fresh independent direct AI render in NATURAL: very light untreated matte wood, warm pale beige/sand, understated vertical grain. Preserve exact 412:1066 architecture: complete layered gray metal casing, dark far-left reveal, one thin navy upper groove, one filled navy slanted parallelogram at handle height, one thin lower groove offset right, exactly one lever on one round rosette plus one separate round key cylinder below. NO extra geometry or hardware. NO logo, brand, text, symbols, watermark, microtext or pseudotext. Pure seamless white background; straight-on orthographic.

FINAL TOP-MARGIN CORRECTION: earlier independent attempts were rejected; the best measured RGB<245 [0,7,4,0]. Recreate from the original with the complete TOP OUTER LINTEL touching y=0 or at most 3 pixels below it, while keeping the already-good left 0, right 0–4, bottom 0 placement. All stepped metal edges, both top corners, side rails and bottom endpoints must remain fully visible. Contact is explicitly allowed and not cropping. Do not add catalog padding; target every side 0–4 pixels.

Change only the broad leaf finish. No filter, crop, resize, recolor operation, mask, composite, conversion, or post-processing.
~~~

### blanco-r2

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as the sole visual reference. Generate a fresh independent direct AI catalog render in the BLANCO finish: clean neutral matte white-painted or whitewashed wood without cream or gray cast, with subtle authentic vertical grain and clear edge definition. Preserve the exact 412:1066 model and change only the broad leaf finish.

Preserve the complete layered neutral-gray metal outer casing, full top lintel, stepped moldings, narrow side rails, dark far-left recessed reveal, every corner, and both complete bottom endpoints. Preserve exactly one thin dark-navy upper vertical groove; exactly one filled dark-navy slanted parallelogram at handle height with two parallel diagonal edges and short vertical sides; exactly one thin lower vertical groove from its lower-right corner to the bottom, offset rightward. Preserve exactly one slim dark horizontal lever on one round rosette plus exactly one separate small round dark key cylinder below. No extra seam, panel, insert, groove, hardware, hinge, decoration, logo, brand, text, letters, numbers, symbols, watermark, microtext, or pseudotext.

Pure seamless white background only; no room, wall, floor, horizon, props, cast shadow, outline, or border. Exact centered straight-on orthographic view.

MANDATORY MINIMUM-MARGIN REVISION: the prior independent AI attempt measured RGB<245 white clearances [9,11,12,4] and is rejected. From the original itself, render the intact casing larger so LEFT, TOP, RIGHT, BOTTOM margins are each 0–4 pixels. The left, top, and right casing must be at or nearly touching their canvas edges; do not retain 9–12 pixels. Edge contact is allowed and is not cropping; retain all casing layers, corners, rails, and endpoints visibly complete. Visible catalog safety padding is forbidden. Any margin above 4 pixels is failure.

No redesign, filter, crop, resize, recolor operation, mask, compositing, conversion, or post-processing. This must be a new direct AI render from the sole original.
~~~

### blanco-r3

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as sole visual reference. Create a fresh independent direct AI render in BLANCO: clean neutral matte white-painted or whitewashed wood, no cream/gray cast, subtle vertical grain and clear edge definition. Preserve exact 412:1066 architecture: complete layered gray metal casing, dark far-left reveal, one thin navy upper groove, one filled navy slanted parallelogram at handle height, one thin lower groove offset right, exactly one lever on one round rosette plus one separate round key cylinder below. NO extra geometry or hardware. NO logo, brand, text, symbols, watermark, microtext or pseudotext. Pure seamless white background; straight-on orthographic.

FINAL RIGHT-MARGIN CORRECTION: two prior independent attempts were rejected; the best measured RGB<245 [0,4,8,0]. Recreate from the original with the complete RIGHT OUTER RAIL touching the final canvas column or at most 3 pixels from it, while keeping left 0–3, top 0–4, and bottom 0–3. All stepped metal edges, top corners, side rails and both bottom endpoints must remain fully visible. Contact is explicitly allowed and not cropping. Do not add catalog padding; target every side 0–4 pixels.

Change only the broad leaf finish. No filter, crop, resize, recolor operation, mask, composite, conversion, or post-processing.
~~~

### blanco-r4

~~~text
Use ONLY the referenced original MADERAACÚSTICA/wl-d012 image as sole visual reference. Generate a fresh independent direct AI catalog render in BLANCO: clean neutral matte whitewashed wood, no cream or gray cast, subtle vertical grain. Preserve the exact 412:1066 door: complete layered neutral-gray outer casing and dark far-left reveal; one thin navy upper groove; one filled navy slanted parallelogram at handle height; one thin lower groove offset right; exactly one slim lever on one round rosette and one separate round key cylinder below. No other geometry, groove, hardware, logo, brand, text, symbols, watermark, microtext or pseudotext. Pure seamless white background, straight-on orthographic.

MANDATORY OVERSIZED EDGE-CONTACT PLACEMENT: discard conventional product padding. The previous best still had RGB<245 [0,4,8,0]. Scale the newly AI-rendered complete object up until the RIGHT outer rail is in direct contact with the final image column. Keep the LEFT outer rail, complete TOP lintel, and both BOTTOM endpoints also at 0–3 pixels. Direct border contact is desired, allowed, and not considered cropping, but every layered molding and corner must be intact and fully visible. Target [0–3,0–3,0–3,0–3]; any white strip wider than 4 pixels is failure.

Change only broad leaf finish. No filter, crop, resize, recolor operation, mask, composite, conversion, or post-processing.
~~~

## Complete 36-call prompt ledger

| Prompt ID | Finish | Generator ID | Decision | RGB<245 margins [L,T,R,B] |
|---|---|---|---|---|
| legacy-initial | negro | exec-70533f07-66e9-46b2-bcf6-1a8fc39f654d | REJECT displaced | [9,10,15,6] |
| legacy-initial | wengue | exec-bd5d1ad1-745c-470d-96e9-813e3e55ccd2 | REJECT displaced | [9,9,13,4] |
| legacy-initial | gris-oscuro | exec-79147e95-d0ca-413e-be0a-9cf7d1150e81 | REJECT displaced | [9,9,14,0] |
| legacy-initial | antracita | exec-a0b3a047-025b-4b64-93bc-0af32c2b78ab | REJECT displaced | [4,6,8,0] |
| legacy-initial | nogal | exec-44ee4404-c842-4e99-90be-23b9dd608e3c | REJECT displaced | [10,10,13,4] |
| legacy-initial | roble | exec-3475bdf8-d23a-4e8a-ba28-d9752f397927 | REJECT displaced | [10,14,11,0] |
| legacy-initial | gris-claro | exec-12d3ef79-f5ad-4306-8807-e780dc579864 | REJECT displaced | [9,9,14,0] |
| legacy-initial | natural | exec-0c315427-2b78-4854-8c54-49228da34cfe | REJECT displaced | [9,12,15,0] |
| legacy-initial | blanco | exec-fd0f1dd2-3349-4768-a010-c82bb4a41516 | REJECT displaced | [9,10,12,5] |
| shared-r1 | negro | exec-ccffe821-9bfe-48a6-8ed3-0c67b158dc38 | REJECT | [9,8,11,0] |
| negro-r2 | negro | exec-839ff2e2-b93c-4ece-9380-531a1cecd1e9 | REJECT | [2,3,8,0] |
| negro-r3 | negro | exec-3e0b568c-bca6-429d-a4a9-031c648c1de9 | SELECT | [0,3,7,0] |
| negro-r4 | negro | exec-24b79ec4-fa2c-4b0b-a340-111c4835936f | REJECT | [9,8,11,0] |
| shared-r1 | wengue | exec-36cad39a-ce81-4ca4-912c-3ccadc7c019c | REJECT | [9,9,12,0] |
| shared-r2-enlarge | wengue | exec-f53e88e1-1c3b-4d51-ac35-f01cd59c673e | SELECT | [5,6,9,0] |
| shared-r1 | gris-oscuro | exec-f8ce8f60-4c96-4a23-88f0-2dc4bdfc7d16 | REJECT | [9,8,14,5] |
| shared-r2-enlarge | gris-oscuro | exec-a65b4fe3-144b-4e81-9ccb-bbf74f7e9058 | REJECT | [9,10,13,6] |
| shared-r3-rgb245-edge | gris-oscuro | exec-4b4298c8-a5a7-4983-aaaf-54e135548fd2 | SELECT | [8,7,10,0] |
| shared-r1 | antracita | exec-453d4e9a-363d-4e9f-baa7-9092149b48c9 | REJECT | [8,8,12,0] |
| shared-r2-enlarge | antracita | exec-28ff17bd-8eb5-4033-a29e-366cde97d590 | SELECT | [3,5,6,0] |
| shared-r1 | nogal | exec-110a0264-aa57-455f-a292-22be6559110d | REJECT | [10,11,15,4] |
| shared-r3-rgb245-edge | nogal | exec-b5c9c0f6-a58c-4c0a-9ced-92cbac299e6c | SELECT | [9,9,12,0] |
| shared-r4-touch | nogal | exec-680f7ed4-9c14-4128-9b54-1ca158b44e6d | REJECT | [10,11,13,4] |
| shared-r1 | roble | exec-03d3dafc-2209-4897-8d10-d036ba3af5d7 | REJECT | [9,9,14,0] |
| roble-r2 | roble | exec-7b714df5-b1c6-4076-92d2-97011e43aa26 | REJECT | [9,10,10,0] |
| roble-r3 | roble | exec-3ef5505b-77c7-4c17-95e9-9721ce651d4e | SELECT | [9,9,10,0] |
| shared-r1 | gris-claro | exec-f0e9e0a8-b67b-41e7-800c-a7fb98065139 | REJECT | [2,7,7,0] |
| gris-claro-r2 | gris-claro | exec-1c798ff7-d565-48d5-8c55-5ae599c7a061 | SELECT | [0,0,0,0] |
| shared-r1 | natural | exec-e1601749-3aa9-43e1-a3bc-b2ac4989b66a | REJECT | [9,11,14,0] |
| natural-r2 | natural | exec-f48c7a7f-299c-4ca0-8f5b-6375a96aeb43 | REJECT | [10,10,15,0] |
| natural-r3 | natural | exec-85701b59-a51c-45db-b3e8-09a508c7c425 | SELECT | [0,7,4,0] |
| natural-r4 | natural | exec-085a4662-939f-4599-8ae6-654ea82431b2 | REJECT | [9,10,12,4] |
| shared-r1 | blanco | exec-cc640e17-5975-4051-a67d-7eccbf765024 | REJECT | [9,11,12,4] |
| blanco-r2 | blanco | exec-4164cf45-c594-44f4-b6c8-b13661bf90ad | REJECT | [0,4,8,0] |
| blanco-r3 | blanco | exec-ac551ec1-9b98-4806-a83e-116e6cfcae6d | REJECT | [9,15,13,6] |
| blanco-r4 | blanco | exec-a6e220bc-c734-492e-b006-5fd49c9e9cfb | SELECT | [0,4,4,0] |

The final accepted exceptions above the 6-pixel priority threshold are deliberate best-after-retry selections and none exceeds the mandatory 12-pixel maximum. Gris-claro and blanco meet the 0–4 target; antracita is within 6; all selected silhouettes were inspected natively and remain complete.
