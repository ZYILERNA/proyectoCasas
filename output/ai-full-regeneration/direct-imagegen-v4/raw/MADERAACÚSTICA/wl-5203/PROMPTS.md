# MADERAACÚSTICA/wl-5203 — direct ImageGen prompts

Use case: `product-mockup`. Image 1 was always the sole reference: `public/images/PUERTAS/MADERAACÚSTICA/wl-5203/original.webp`.

Shared invariant contract: preserve the complete very tall narrow door and square-post frame, plain vertical-grain leaf, one upper vertical seam near the left ending at the horizontal band, one single wide full-width wood-inlay band below the handle, one lower vertical seam right of center beginning below the band, exactly one slim lever on a round rosette and one separate round key cylinder in the upper-left field. Front-facing and complete on pure white. NO_LOGO: no logo, brand, badge, text, symbols, watermark, microtext or pseudotext. No extra panels, seams, grooves, glass, decoration, hardware or scene.

Final composition contract: exact extremely tall 393:1071 canvas proportion, with the door scaled as large as possible and only a hairline white safety margin. Broad padding and clipped outer edges are forbidden. The close framing must come directly from ImageGen; no crop, resize or other bitmap operation is allowed.

Independent finish requests: deep matte black (`negro`), very dark espresso wenge (`wengue`), dark charcoal (`gris-oscuro`), graphite anthracite (`antracita`), rich walnut (`nogal`), golden oak (`roble`), light gray wood (`gris-claro`), pale natural unfinished wood (`natural`) and clean matte white wood (`blanco`). The horizontal band remains a visible contrasting wood inlay appropriate to each finish.

The first direct `roble` result retained the model but measured 14–15 px side padding. It was rejected under the tightened minimal-margin rule, preserved in `_rejected/`, and replaced by a second direct ImageGen result measuring 3/8 px on the sides. No output was used as an input and no bitmap was programmatically altered.
