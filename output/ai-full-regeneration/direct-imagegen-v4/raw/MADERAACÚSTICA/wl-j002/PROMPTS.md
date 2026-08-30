# MADERAACÚSTICA/wl-j002 — direct ImageGen prompts

Use case: `product-mockup`. Image 1 was always the sole reference: `public/images/PUERTAS/MADERAACÚSTICA/wl-j002/original.webp`.

Shared invariant contract: preserve the complete very tall narrow square-post outer frame, straight top rail, plain vertical-grain leaf, exactly one slim full-height vertical groove near the left side, and exactly three parallel horizontal grooves that begin at that vertical groove and continue to the right edge of the leaf. Preserve exactly one dark slim lever on a round rosette and one separate dark round key cylinder below. Front-facing and complete on pure white. NO_LOGO: no logo, brand, badge, text, symbols, watermark, microtext or pseudotext. No extra panels, seams, grooves, glass, decoration, hardware or scene.

Final composition contract: exact 465:1086 canvas proportion and the door scaled as large as possible, with only a visible 2–10 px-equivalent white hairline around the complete silhouette. Broad padding, edge contact and clipped outer edges are forbidden. Close framing must be created directly by ImageGen; no crop, resize or bitmap processing is allowed.

Independent finish requests: deep matte black (`negro`), very dark espresso wenge (`wengue`), dark charcoal (`gris-oscuro`), graphite anthracite (`antracita`), rich walnut (`nogal`), golden oak (`roble`), light gray wood (`gris-claro`), pale natural unfinished wood (`natural`) and clean matte white wood (`blanco`). The groove topology, frame, hardware, camera, lighting and white background remain invariant in every independent request.

Padding-only iterations retained the same sole-reference and invariant contract while tightening the visible white hairline. Attempts were accepted at: `negro` 5, `wengue` 2, `gris-oscuro` 5, `antracita` 4, `nogal` 2, `roble` 2, `gris-claro` 6, `natural` 4 and `blanco` 2. Twenty-two otherwise usable attempts with excessive padding and one `natural` attempt touching all four canvas edges remain in `_rejected/`. All nine accepted results measure no more than 11 px of RGB<245 edge margin and preserve a complete, unclipped silhouette.

Every call was an independent built-in ImageGen call against `original.webp`; no generated result was used as an input. The accepted and rejected PNG files are untouched byte-for-byte copies of their generator outputs. No filters, recoloring, masks, crop, resize, compositing, format conversion or promotion to `public/` was performed.
