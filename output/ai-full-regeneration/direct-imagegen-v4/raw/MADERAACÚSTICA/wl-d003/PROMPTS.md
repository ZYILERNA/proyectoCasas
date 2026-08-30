# MADERAACÚSTICA/wl-d003 — direct built-in ImageGen prompts

All nine accepted PNGs are untouched outputs from nine independent built-in ImageGen calls. Every call used this single canonical reference and no other image:

`public/images/PUERTAS/MADERAACÚSTICA/wl-d003/original.webp`

Reference SHA-256 before and after generation: `7d816b2ee317a13038089b97e3b2159c72ba20c80cfafd8b87caf6edccdcd053`.

Policy: `NO_LOGO`. No generated variant or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, or format conversion was applied to an accepted PNG. The workspace files are byte-for-byte copies of the built-in generator results recorded in `manifest.json`.

## Exact rendered-prompt template

Each independent call used the following prompt verbatim after replacing `{{FINISH_CLAUSE}}` with the exact clause below. `{{WHITE_AVOID}}` was empty for eight finishes and was `, beige or yellow cast` for `blanco`.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference.
Primary request: Change only every visible door-leaf wood surface to an exact {{FINISH_CLAUSE}}.
Subject: the exact same acoustic door model wl-d003 shown in Image 1.
Style/medium: high-fidelity photorealistic architectural product photography.
Composition/framing: preserve the exact extremely tall narrow straight-on silhouette, complete layered outer frame including the bottom edge, near-flush catalog crop, minimal white background, scale, and original 451:1168 width-to-height ratio of about 0.386. Do not widen, shorten, crop, tilt, or add margin.
Critical geometry: preserve the narrow dark recessed vertical reveal immediately inside the far-left frame. Preserve the exact thin black stepped seam: one vertical line just inboard from the left runs down from the top, turns right a short distance above the handle, turns vertically downward past the handle and key area, turns left the same short distance, then continues vertically to the bottom. Preserve the single long thin horizontal seam that starts at the middle of that short vertical step beside the handle and runs straight to the right edge. Keep the rest of the leaf as two plain uninterrupted broad surfaces with continuous vertical grain.
Hardware/frame invariants: preserve the layered gray-brown wood perimeter frame, top mouldings and bottom threshold; exactly one dark horizontal lever handle on one round rosette at the left step; and exactly one separate circular key escutcheon directly below, with identical size and placement.
Constraints: change only the leaf finish; retain frame finish, geometry, seam paths and intersections, proportions, depths, shadows, vertical grain direction, hardware count and placement, neutral lighting, plain catalog background, and composition. No redesign, new objects, crop, resize, reframing, or added margin.
Avoid: logo, WONLY mark, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding{{WHITE_AVOID}}, duplicated or missing hardware, straightened or missing step, extra seams, decorative panels, room scene, people, props.
```

## Exact finish clauses and generator IDs

- `negro` — `NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible` — `exec-56670793-0c0d-4750-aaca-b44fbb08e958` — attempt 1, PASS.
- `wengue` — `WENGUÉ finish: very dark espresso-brown tropical wood with restrained near-black vertical grain, clearly brown rather than neutral black` — `exec-3ec621aa-f791-4a4b-8086-9807687fa746` — attempt 1, PASS.
- `gris-oscuro` — `GRIS OSCURO finish: deep neutral charcoal-gray stained wood, clearly gray rather than black, with subtle authentic vertical grain` — `exec-14d4c64c-02af-4763-8110-020694acc9b8` — attempt 1, PASS.
- `antracita` — `ANTRACITA finish: saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain` — `exec-165f2b3f-3b94-4c01-8e9c-a46de37d8688` — attempt 1, PASS.
- `nogal` — `NOGAL finish: refined medium-rich warm walnut brown with natural darker vertical grain, elegant and realistic, neither orange nor red` — `exec-1f60c147-77ef-4885-8f6f-871cd1a5b8b6` — attempt 1, PASS.
- `roble` — `ROBLE finish: light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange` — `exec-d593d547-19c3-44ee-bb51-b072025c3d48` — attempt 1, PASS.
- `gris-claro` — `GRIS CLARO finish: pale neutral light-gray stained wood, soft cool silver-gray with subtle authentic vertical grain, clearly lighter than the original leaf yet distinct from pure white` — `exec-afa8b662-5d5a-496c-889c-a846631d294f` — attempt 1, PASS.
- `natural` — `NATURAL finish: very light untreated natural wood in warm pale beige and sand tones, matte, unstained, with understated authentic vertical grain` — `exec-f87e4124-ffbb-4985-a526-2bc0e96c6ec1` — attempt 1, PASS.
- `blanco` — `BLANCO finish: clean neutral matte white-painted wood without cream or gray cast, with very subtle authentic vertical grain still visible` — `exec-811bd253-2367-40bc-85df-15d946d598b5` — attempt 1, PASS. This call also used the `{{WHITE_AVOID}}` text specified above.
