# MADERAACÚSTICA/wl-j011 — direct ImageGen prompts

Use case: `product-mockup`. Image 1 was always the sole reference: `public/images/PUERTAS/MADERAACÚSTICA/wl-j011/original.webp`.

Shared invariant contract: preserve the complete tall narrow outer geometry, exactly one distinctive fluted full-height vertical column on the left, exactly one smooth rounded main module, their original junction and contours, exactly one lever handle and exactly one separate cylinder below. Front-facing and complete on pure white. NO_LOGO: no logo, brand, badge, text, symbols, watermark, microtext or pseudotext. No extra columns, fluting, panels, seams, grooves, glass, decoration, hardware or scene.

Final composition contract: exact 403:1093 canvas proportion and the door scaled as large as safely possible, with only a hairline white margin. Broad padding and clipping are forbidden. A zero top or bottom RGB<245 measurement may be accepted only when native-detail inspection confirms the complete silhouette; this model's canonical original also ends its uprights at the canvas edge. Four-edge contact is not accepted. Close framing must be created directly by ImageGen; no crop, resize or bitmap processing is allowed.

Independent finish requests: deep matte black (`negro`), very dark espresso wenge (`wengue`), dark charcoal (`gris-oscuro`), graphite anthracite (`antracita`), rich walnut (`nogal`), golden oak (`roble`), light gray wood (`gris-claro`), pale natural unfinished wood (`natural`) and clean matte white wood (`blanco`). The fluted column, smooth rounded module, hardware, camera, lighting and white background remain invariant in every independent request.

Selected attempts: `negro` 5, `wengue` 5, `gris-oscuro` 1, `antracita` 2, `nogal` 1, `roble` 1, `gris-claro` 2, `natural` 2 and `blanco` 4. Every accepted image has a maximum nonzero RGB<245 margin of 12 px and native inspection confirms complete geometry with no logo or text. The 33 unselected calls remain in `_rejected/`: most have excessive padding; one `blanco` call touches all four edges, one `roble` call has the wrong canvas proportion, two calls also drift to an overly light finish, and one valid `nogal` candidate was superseded by the tighter selected result.

Every call was an independent built-in ImageGen call against `original.webp`; no generated result was used as an input. The accepted and rejected PNG files are untouched byte-for-byte copies of their generator outputs. No filters, recoloring, masks, crop, resize, compositing, format conversion or promotion to `public/` was performed.
