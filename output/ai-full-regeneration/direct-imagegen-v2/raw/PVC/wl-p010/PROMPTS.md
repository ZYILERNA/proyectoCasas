# PVC/wl-p010 - direct built-in ImageGen prompts

Every accepted finish is an untouched output from one independent built-in ImageGen call using only this master reference:

`output/ai-full-regeneration/new-defects/PVC/wl-p010/master-no-logo-ai.png`

No generated variant was used as a reference. No logo image, filter, recolor operation, mask, crop, resize, composite, or format conversion was used on an accepted PNG.

The interrupted first generation pass did not persist its exact prose prompts. Its seven accepted files were therefore validated against their original `$CODEX_HOME/generated_images` PNGs by SHA-256 and audited visually against the contract below. The `original`, `natural`, and `blanco` calls made during completion used the shared prompt below verbatim with their respective finish clauses.

## Shared prompt contract

Use case: precise-object-edit. Asset type: ecommerce catalog product image. Image 1 is the sole edit target and sole visual reference. Create a faithful finish variant of exactly the same complete PVC door shown in Image 1. Preserve the exact very tall narrow single-leaf door, its full surrounding frame, the two recessed rectangular moulded panels (large upper panel and smaller lower panel), the left-side dark metal horizontal lever on its round rosette, and the separate round key escutcheon directly below. Keep all proportions, panel positions, bevels, wood-grain direction, hardware count, hardware placement, front-facing viewpoint, and geometry unchanged.

Use extreme tight catalog framing. Keep the complete outer frame visible but make it fill more than 98 percent of the canvas. The outermost door-frame edges must touch or sit only 0-8 pixels from every canvas edge. Preserve the very tall narrow portrait silhouette of Image 1, approximately 0.36 width-to-height. Leave almost no white background anywhere; do not zoom out; do not add floor, wall, shadow, scene, padding, border, or whitespace.

Policy: NO_LOGO. Absolutely no logo, brand, letters, words, numbers, labels, badges, watermark, symbols, or pseudotext. Do not add, remove, duplicate, or alter any hardware or architectural feature. Produce a clean photorealistic front-on product render with even neutral studio light and crisp complete geometry.

## Independent finish clauses

- `original`: preserve the original neutral cool grey wood finish and vertical subtle wood grain from Image 1. Change no other property.
- `negro`: rich near-black charcoal wood/PVC finish with restrained vertical grain and enough subtle highlights to retain every moulding edge.
- `wengue`: deep dark chocolate-brown wenge finish with understated straight vertical grain.
- `gris-oscuro`: matte dark graphite-grey finish, clearly grey rather than black, with subtle vertical grain.
- `antracita`: deep anthracite charcoal finish with a restrained cool undertone and subtle vertical grain.
- `nogal`: refined medium warm walnut-brown finish with restrained natural vertical grain.
- `roble`: warm light honey-oak finish with refined natural vertical grain, clearly lighter and more golden than walnut.
- `gris-claro`: light cool-grey finish, clearly distinct from white, with subtle vertical grain and legible bevels.
- `natural`: natural pale untreated wood, light beige-tan with understated vertical grain and matte low sheen. Change no other property.
- `blanco`: clean warm white painted wood with very subtle visible vertical grain and gentle bevel shading so every panel edge remains legible. Change no other property.

`original` passed on its second attempt after rejecting one overly wide rendering. The other nine finishes passed on their first retained attempt.
