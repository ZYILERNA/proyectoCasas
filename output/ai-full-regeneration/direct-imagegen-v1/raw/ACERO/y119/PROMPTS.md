# ACERO/y119 direct ImageGen prompts

All active PNGs are independent built-in ImageGen renders made from the canonical tight master only. No generated finish and no logo file was used as an input.

Shared constraints:

- Generate the same complete frontal Y119 door in the requested finish.
- Preserve the wide header, every panel seam, the four-line trim and the entire long ornamental grille with rounded ends and central circular motif.
- Preserve exactly one right-side smart lock with one circular sensor, a clean geometric control, plain circular keypad dots and one long lower pull.
- Keep the lock face free of letters, digits and text-like marks.
- Policy `NO_LOGO`: no WONLY, brand, badge, wordmark, letters, microtext or watermark.
- Keep the full outer frame and threshold visible while filling the canvas nearly edge-to-edge; target 0-8 px of exterior white.
- No room, wall, floor, perspective, extra hardware, missing hardware, halos or rectangular patches.
- No filters, recoloring, masks, compositing, cropping or resizing after generation.

Finish requests: `original`, `negro`, `wengue`, `gris-oscuro`, `antracita`, `nogal`, `roble`, `gris-claro`, `natural`, `blanco`.

The final active `negro`, `wengue`, `gris-oscuro`, `antracita`, `roble` and `natural` outputs are explicitly recorded in `manifest.json`. Rejected oversized-margin variants remain under `_rejected`.
