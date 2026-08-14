# ImageGen prompt record

## Shared specification

Every finish was produced through a separate built-in ImageGen call. The only image reference in every call was:

`output/ai-full-regeneration/large-doors/MEDICA/puerta-cortafuego-aislante2/master-no-logo-ai.png`

Each prompt requested a new front-orthographic ecommerce catalog render of the exact insulated medical fire door. The locked invariants were one complete rectangular leaf, the complete outer frame, the tall narrow vertical vision panel on the left, and the complete silver horizontal panic bar with its two curved end mounts. The complete product had to occupy more than 98% of the canvas span on pure white, with a preferred margin of 0–8 px and an intact-frame tolerance of 9–11 px.

Every call explicitly prohibited logos, brands, words, letters, digits, labels, symbols, pseudo-text, badges, signage and watermarks. It also explicitly prohibited filters, local recoloring, post-processing, crops, masks, resizing, compositing, conversion, and using another generated finish as a reference.

## Finish-specific instructions

- `original`: clean medium sky-blue painted steel matching the master.
- `negro`: deep matte-black painted steel.
- `wengue`: dark wenge-brown decorative fire-rated finish with restrained fine vertical grain.
- `gris-oscuro`: uniform dark graphite-gray painted steel.
- `antracita`: matte RAL-7016-like charcoal, visibly cooler and lighter than black.
- `nogal`: rich medium walnut-brown decorative fire-rated finish with fine vertical grain.
- `roble`: warm golden medium-oak decorative fire-rated finish with fine vertical grain.
- `gris-claro`: uniform light cool-gray satin painted steel.
- `natural`: very light natural pale-beige ash with subtle fine vertical grain.
- `blanco`: clean bright-white satin painted steel, with restrained gray bevel shading so the complete frame remains distinguishable from the white background.

All prompts kept the vision-panel insert neutral and the panic bar silver.

## Targeted second attempts

- `wengue`: repeated the geometry and no-text lock, then required the complete outside frame at 2–6 px from every boundary after attempt 1 fell just below 98% horizontal span.
- `gris-claro`: repeated the geometry and no-text lock, then required the complete outside frame at 2–6 px from every boundary after attempt 1 exceeded the side-margin tolerance.
- `blanco`: repeated the geometry and no-text lock, added subtle frame-edge contrast, and required the complete outside frame at 2–6 px from every boundary after attempt 1 exceeded the side-margin tolerance.
