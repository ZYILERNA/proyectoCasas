# MADERAACÚSTICA/wl-5117 — direct ImageGen v4 prompts

Use case: `precise-object-edit`. In all 40 built-in ImageGen calls, Image 1 was the sole canonical edit target and sole visual reference: `public/images/PUERTAS/MADERAACÚSTICA/wl-5117/original.webp`. No generated output, logo, mask or secondary image was ever referenced.

## Shared invariant contract

Change only the wooden finish while preserving the same single extremely tall narrow front-facing door, complete square-post outer frame, straight top rail, plain slab leaf, exactly two narrow vertical decorative line motifs on the right with their squared terminals, and exactly one slim horizontal brushed silver-gray metal handle. Keep the background pure white. Do not add a keyhole, cylinder, escutcheon, dots, screws, panels, grooves, glass, decoration, props, room, floor, wall or perspective.

`NO_LOGO`: no logo, brand, badge, text, letters, numbers, symbols, watermark, microtext or pseudotext.

## Composition contract

Preserve the original `393:1066` extremely tall canvas proportion. Render the complete unit almost edge-to-edge, approximately 98–99% of canvas width and 99–99.9% of canvas height, with only a visible pure-white hairline. Keep every outer edge and both bottom corners complete and uncut. The final targeted prompts specified roughly 5–8 pixels per lateral edge at an output width near 762 px. This framing was produced directly by ImageGen; no crop, resize, mask, composite, recolor, filter or other pixel operation was used.

## Finish requests

- `negro`: deep matte black wood with restrained fine vertical grain.
- `wengue`: very dark espresso-brown wenge wood with restrained fine vertical grain.
- `gris-oscuro`: dark charcoal-gray wood, distinctly gray rather than black.
- `antracita`: cool graphite anthracite wood with restrained fine vertical grain.
- `nogal`: rich medium-dark warm walnut with realistic vertical grain.
- `roble`: warm natural golden oak with realistic vertical oak grain.
- `gris-claro`: light neutral gray wood with fine vertical grain.
- `natural`: pale blond-beige unfinished timber with realistic vertical grain.
- `blanco`: clean matte white wood, softly off-white so all design lines remain visible.

## Iteration history

The initial prompt requested the exact master ratio, full geometry, pure white background, `NO_LOGO`, and a 3–8 px hairline. Read-only QA showed several results at roughly 97.0–97.7% width fill, so later independent calls strengthened the framing language to match the original almost-edge-to-edge composition, then targeted 1–5 px and finally a safer 5–8 px band to avoid clipping.

Hardware invariants were tightened after `roble` attempt 1 invented two keyhole-like marks and `natural` attempt 3 turned the silver handle into wood. A `wengue` result that appeared to score 100% under the simple RGB threshold was rejected after robust column occupancy showed the right post touching the canvas for its full height.

Accepted call/attempt matrix:

| Finish | Attempt | Generator ID |
|---|---:|---|
| negro | 3 | `exec-9b9f1684-1950-43ff-8dcf-4b3da725fbfe` |
| wengue | 3 | `exec-4002011d-4fe6-4533-bbdd-a69ebc88006e` |
| gris-oscuro | 3 | `exec-1612d6c5-9ca4-451b-8b3b-7955fbd9499b` |
| antracita | 6 | `exec-6a5e4267-b7d3-454d-bf73-33a1c3a8041c` |
| nogal | 1 | `exec-cfb4f807-fe9d-4ced-9a51-9b7bfc7ff916` |
| roble | 7 | `exec-51b22f63-a5a7-4791-8ec6-238cdbff009e` |
| gris-claro | 1 | `exec-348cfae0-500a-4925-a255-483f3e610849` |
| natural | 6 | `exec-155b5739-6cb5-4959-8152-5d7bb0b7cfb0` |
| blanco | 2 | `exec-8db00476-3273-43c5-bc8e-2a987aa89377` |

Thirty-one direct results are segregated in `_rejected/`: 28 for padding beyond the tightened hairline target, one for full-height right-edge contact, one for invented hardware and one for handle-finish drift. Every retry was a fresh built-in ImageGen call using only `original.webp`; no accepted or rejected bitmap was programmatically altered.
