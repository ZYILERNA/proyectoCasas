# MADERAACÚSTICA/wl-j010 — direct ImageGen prompts

Use case: `product-mockup`. Image 1 was the sole reference in every independent call: `public/images/PUERTAS/MADERAACÚSTICA/wl-j010/original.webp`.

Shared geometry contract: preserve exactly the reference door's very tall, narrow and front-facing geometry: two straight square outer frame posts, one straight top lintel, one plain flat single leaf with subtle vertical wood grain, the deep dark vertical reveal immediately inside the left frame, and exactly one thin paired horizontal routed detail at handle height. Preserve the short angular/stepped notch near the left end of that routed detail and its straight continuation to the right. Preserve exactly one dark slim lever pointing right on its round rosette and exactly one separate round key cylinder below it on the left. Preserve the lower opening, both complete frame-post tips, proportions, perspective and hardware placement. Do not add, remove, mirror or redesign any part.

Shared exclusion contract: NO_LOGO. Generate no logo, wordmark, brand, badge, text, letters, numbers, symbols, watermark, signature, microtext or pseudotext. Add no panels, grooves, glass, decoration, duplicate hardware, extra locks, room scene, floor, wall or props.

Shared composition contract: pure white background; exact `406:1093` canvas proportion; place the complete door as large as safely possible with only a hairline white margin. Target 2–8 px and never more than 12 px around the complete silhouette. Broad padding is forbidden. Do not clip the top lintel, either side post, either bottom post tip, lever or cylinder. The close framing must be generated natively by ImageGen.

Independent finish requests: deep matte black (`negro`), very dark espresso wenge (`wengue`), dark charcoal wood (`gris-oscuro`), graphite anthracite wood (`antracita`), rich medium-dark walnut (`nogal`), warm golden oak (`roble`), light gray wood (`gris-claro`), pale natural unfinished wood (`natural`) and clean matte white wood (`blanco`). Only the material finish changes; geometry, routed detail, dark reveal, hardware, camera, lighting and white background remain invariant.

Retry guidance repeated when needed: keep the `406:1093` portrait proportion and enlarge the whole door natively until every nonzero RGB<245 edge margin is at most 12 px, while retaining the entire silhouette and the exact signature geometry. Do not use a prior generated result as a reference.

Selected attempts: `negro` 3, `wengue` 2, `gris-oscuro` 12, `antracita` 4, `nogal` 10, `roble` 1, `gris-claro` 7, `natural` 10 and `blanco` 6. There were 56 independent ImageGen calls in total: 9 selected and 47 retained in `_rejected/`.

The accepted `wengue` attempt measures 0 px only at the bottom. It was selected after three independent wengue attempts because native-detail inspection confirmed both full bottom post tips, the complete silhouette and the same termination visible in the canonical original, whose frame posts also end at the canvas bottom. The four-edge-contact `gris-oscuro` attempt 8 was rejected.

Every accepted and rejected PNG is an untouched byte-for-byte copy of its built-in ImageGen output. No filter, recoloring, mask, crop, resize, compositing, format conversion, pixel processing or promotion to `public/` was performed.
