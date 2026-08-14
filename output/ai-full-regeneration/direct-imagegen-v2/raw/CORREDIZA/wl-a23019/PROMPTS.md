# CORREDIZA wl-a23019 — direct ImageGen, NO_LOGO

All ten accepted PNG files are independent built-in ImageGen generations. Every call referenced only:

`output/ai-full-regeneration/large-doors/CORREDIZA/wl-a23019/master-no-logo-ai.png`

No generated output and no logo asset was used as a reference. No filter, recolor, mask, crop, resize, composite, conversion, or local image repair was applied.

## Shared prompt specification

- Use case: premium architectural product mockup for a tall catalog image.
- Preserve: complete rectangular outer frame, one large frosted-glass field, exactly two slim vertical muntins near the right, exactly two horizontal rails across the lower-middle, and exactly one black rectangular lever handle/backplate on the left.
- Framing: straight-on orthographic front elevation, fully visible frame, almost edge-to-edge, 0–8 px near-white margin and at least 98% measured product bounding coverage.
- Environment: plain catalog background only; no perspective, room, wall, floor, props, presentation mat, or external cast shadow.
- Exclude: WONLY, all logos/brands/wordmarks/badges, letters, numbers, words, microtext, pseudotext, watermarks, signatures, decorative pictograms, extra handles, hinges, locks, dots, buttons, peepholes, ornaments, added panels or added rails.
- Generation policy: each finish is a new built-in ImageGen call from the same master; never use another generated variant as input.

## Finish-specific requests and accepted calls

| Finish | Surface request | Accepted generator |
|---|---|---|
| original | Original neutral medium cool-gray powder-coated metal | `exec-96c97097-4c15-4767-ae52-c84bba0dcbfc` |
| negro | Uniform deep matte-black powder-coated metal | `exec-262cca73-7d22-41d3-bc43-2d546850b0f4` |
| wengue | Very dark chocolate-brown wenge coating with subtle straight fine grain | `exec-9d99318a-2ba2-4f63-a153-7c5a34d7a631` |
| gris-oscuro | Uniform dark graphite-gray powder-coated metal, visibly lighter than black | `exec-3b994716-2879-4b29-980b-2f961e6115cc` |
| antracita | Satin near-black charcoal anthracite with faint cool undertone | `exec-4a62f9e0-008c-4645-b52f-f38900b1aece` |
| nogal | Medium-dark warm walnut wood-look coating with restrained straight grain | `exec-5c2e3436-bf46-4341-afa3-e66a361fbfab` |
| roble | Light golden oak wood-look coating with restrained natural straight grain | `exec-1d026a4a-6d1e-49fe-81fb-48ab3d68adb2` |
| gris-claro | Uniform light cool-gray powder-coated metal, clearly distinct from white | `exec-a2511b12-2169-472d-9953-927804e8c918` |
| natural | Pale neutral blond natural-wood coating with fine straight grain | `exec-7fb1f9b8-136a-4ae6-9a2a-930cfcbcf4ee` |
| blanco | Uniform satin architectural white with subtle edge shading | `exec-bf30d617-bdc5-4b60-8210-8afdad714da5` |

The accepted `original` is a second independent generation whose framing clause was tightened to 0–4 px and over 99% bounding coverage. Its rejected first attempt is preserved under `_rejected/`; it was never used as an input.
