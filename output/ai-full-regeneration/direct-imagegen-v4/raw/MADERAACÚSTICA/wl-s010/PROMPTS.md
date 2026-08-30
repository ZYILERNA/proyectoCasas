# MADERAACÚSTICA/wl-s010 — direct ImageGen prompts

Use case: `product-mockup`. The sole reference supplied to every independent call was `public/images/PUERTAS/MADERAACÚSTICA/wl-s010/original.webp`. No generated result was ever used as a reference.

## Shared geometry contract

Preserve exactly the reference's tall, narrow, front-facing rectangular single-door geometry: two straight square outer vertical posts and one straight outer top cap; the inset straight inner header with its subtle beveled underside; the full-height deep dark vertical reveal immediately inside the left jamb; the plain flat single leaf with subtle vertical surface or grain; and exactly one thin routed vertical line near the left side. At handle height, that routed line must contain exactly two short crisp kinked diagonal segments and then continue straight downward. Preserve exactly one dark slim lever pointing right on a round rosette and exactly one separate dark round cylinder below it with its tiny metallic key detail. Preserve both complete bottom post tips, proportions, perspective, camera and hardware placement. Do not add, remove, mirror or redesign any part.

## Shared exclusion contract

`NO_LOGO`: generate no logo, wordmark, brand, badge, text, letters, numbers, symbols, watermark, signature, microtext or pseudotext. Add no panels, extra grooves, glass, decoration, duplicate hardware, extra locks, room scene, floor, wall or props.

## Shared composition contract

Use a pure white background and preserve the original `399:1080` portrait proportion. Generate the complete door natively as large as safely possible. Target only `0-6 px` of white around each side, with no accepted side over `12 px`. Broad padding is forbidden. Bottom contact at `0 px` is allowed only if both outer post tips remain complete and the termination exactly matches the canonical original, which also touches the bottom edge. Do not clip the top cap, side posts, either bottom post tip, lever or cylinder. The close framing must come directly from ImageGen, never from a crop or resize.

## Finish requests

Independent calls requested deep matte black (`negro`), very dark espresso wenge (`wengue`), dark charcoal wood (`gris-oscuro`), graphite anthracite wood (`antracita`), rich medium-dark walnut (`nogal`), warm golden oak (`roble`), light gray wood (`gris-claro`), pale natural unfinished wood (`natural`) and clean matte white wood (`blanco`). Only the material finish changes; geometry, routed line, deep reveal, hardware, camera, lighting and white background remain invariant.

## Retry phases

1. Initial independent pass for all nine finishes, using the complete geometry, exclusion and composition contracts.
2. Tight-framing retries explicitly repeated the `0-6 px` target and `12 px` hard acceptance maximum, always from `original.webp` alone.
3. Native-enlargement retries asked ImageGen to render the complete silhouette approximately `1.2%` larger in the same portrait proportion, while forbidding clipping and all post-generation framing.
4. Natural-finish retries additionally emphasized one perfectly straight thin routed vertical line with exactly two short crisp kinks at handle height, because several otherwise tight outputs drifted in that signature detail.

Selected attempts: `negro` 1, `wengue` 2, `gris-oscuro` 8, `antracita` 2, `nogal` 2, `roble` 2, `gris-claro` 4, `natural` 11 and `blanco` 1. There were 44 independent ImageGen calls in total: 9 selected and 35 retained in `_rejected/`.

The target of `0-6 px` was repeated across retries. Native ImageGen consistently retained `8-12 px` at some safe edges; because crop and resize were prohibited, the tightest complete and geometry-faithful candidates were selected. No accepted nonzero margin exceeds `12 px`. `Negro`, `antracita` and `nogal` measure `0 px` only at the bottom; after 3, 3 and 4 independent calls respectively, native-detail inspection confirmed their complete frame-post tips and the same bottom termination as the canonical original.

Every accepted and rejected PNG is an untouched byte-for-byte copy of its built-in ImageGen output. No filter, recoloring, mask, crop, resize, compositing, format conversion, pixel processing or promotion to `public/` was performed.
