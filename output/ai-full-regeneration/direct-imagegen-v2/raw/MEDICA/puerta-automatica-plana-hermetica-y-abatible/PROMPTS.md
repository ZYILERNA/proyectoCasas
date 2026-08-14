# ImageGen prompt record

## Shared specification

Each finish was generated through a separate built-in ImageGen call. The only image reference in every call was:

`output/ai-full-regeneration/large-doors/MEDICA/puerta-automatica-plana-hermetica-y-abatible/master-no-logo-ai.png`

The shared instruction was to create a completely new, high-fidelity, front orthographic catalog render of exactly the same single-leaf flat hermetic hinged medical door. It explicitly prohibited filters, recoloring operations, masks, crops, resizing, composites, conversion, logos, brands, text, letters, digits, labels, signage, watermarks, pseudo-text, symbols, badges and emblems.

Every call locked these architectural invariants: complete rectangular outer frame; flush leaf; centered rectangular dark-glazed inspection window; long horizontal upper mechanism; separate overhead closer/operator with articulated arm; exactly three right-side hinges; silver lever and round cylinder on the left. The complete assembly had to remain intact, occupy more than 98% of the canvas span and leave only 0–8 pixels of white margin per edge (9–11 tolerated only for an intact frame above 98% span coverage).

## Finish-specific instructions

- `original`: original very light hygienic medical-blue powder coat, faithful to the master.
- `negro`: deep uniform matte-black powder coat with visible edge definition.
- `wengue`: very dark espresso-brown wenge veneer with fine restrained vertical grain.
- `gris-oscuro`: uniform dark-gray hygienic matte powder coat, visibly lighter than black.
- `antracita`: near-black charcoal powder coat with a subtle cool blue-gray cast.
- `nogal`: medium-dark warm walnut veneer with fine vertical grain and restrained tonal movement.
- `roble`: natural light golden-oak veneer with authentic fine vertical grain.
- `gris-claro`: very light cool-gray hygienic powder coat, clearly gray rather than white.
- `natural`: pale untreated natural hardwood veneer in neutral sand-beige, low-contrast straight grain.
- `blanco`: clean bright hygienic white satin powder coat with subtle edge shading against white.

Neutral silver hardware and the dark-charcoal window surround were requested in all variants.

## Targeted retries

- `original` attempt 2: repeated all invariants and requested the left, right, top and bottom extents at 2–6 pixels from the corresponding canvas edges after attempt 1 was too small.
- `antracita` attempt 2: repeated all invariants and requested over 99% span with each outer extent at 2–6 pixels after attempt 1 was too small.
