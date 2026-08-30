# MADERAACÚSTICA/wl-j003 — direct ImageGen prompts

Use case: `product-mockup`. Image 1 was always the sole reference: `public/images/PUERTAS/MADERAACÚSTICA/wl-j003/original.webp`.

Shared invariant contract: preserve the complete very tall narrow square-post frame, straight top rail, plain vertical-grain leaf, exactly three slim parallel decorative inlay strips in one tight cluster near the right side and running continuously from top to bottom, exactly one dark slim lever on a round rosette and one separate dark round key cylinder below on the left. Front-facing and complete on pure white. NO_LOGO: no logo, brand, badge, text, symbols, watermark, microtext or pseudotext. No extra strips, panels, seams, grooves, glass, decoration, hardware or scene.

Final composition contract: exact 447:1089 canvas proportion and the door scaled as large as possible, with only a 2–10 px-equivalent white hairline. Broad padding and clipped outer edges are forbidden. Close framing must be created directly by ImageGen; no crop, resize or bitmap processing is allowed.

Independent finish requests: deep matte black (`negro`), very dark espresso wenge (`wengue`), dark charcoal (`gris-oscuro`), graphite anthracite (`antracita`), rich walnut (`nogal`), golden oak (`roble`), light gray wood (`gris-claro`), pale natural unfinished wood (`natural`) and clean matte white wood (`blanco`). The three right-side inlays remain visibly contrasting warm-golden or pale-golden wood lines.

The first direct `negro` and `wengue` results preserved the model but measured 15–17 px side padding. They remain in `_rejected/` and were replaced by new independent ImageGen calls measuring at most 8 px. Native inspection confirmed the reference signature contains three inlay strips; every accepted call explicitly preserved exactly three. No generated image was used as an input and no bitmap was altered after generation.
