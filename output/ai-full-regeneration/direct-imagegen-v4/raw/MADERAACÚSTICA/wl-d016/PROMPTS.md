# MADERAACÚSTICA/wl-d016 — direct built-in ImageGen prompts

All nine accepted PNGs are untouched outputs from nine independent built-in ImageGen calls. Every call used this single canonical reference and no other image:

`public/images/PUERTAS/MADERAACÚSTICA/wl-d016/original.webp`

Reference SHA-256 before and after generation: `a8c9d673a1f77ccc855e1a505b6b08fc5cde1be485377884f67dad7a72f2c5d4`.

Policy: `NO_LOGO`. No generated variant or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, or format conversion was applied to an accepted PNG. The workspace files are byte-for-byte copies of the built-in generator results recorded in `manifest.json`.

## Exact rendered-prompt template

Each independent call used the following prompt verbatim after replacing `{{FINISH_CLAUSE}}` with the exact clause below. `{{WHITE_AVOID}}` was empty for eight finishes and was `, beige or yellow cast` for `blanco`.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce acoustic-door catalog image
Input images: Image 1 is the sole edit target and sole visual reference.
Primary request: Change only all visible door-leaf wood surfaces, including the narrow left leaf stile and the broad right leaf field, to an exact {{FINISH_CLAUSE}}.
Subject: the exact same acoustic door model wl-d016 shown in Image 1.
Style/medium: high-fidelity photorealistic architectural product photography.
Composition/framing: preserve the exact extremely tall and narrow straight-on silhouette, complete layered outer frame, near-flush catalog crop, minimal white background, scale, and original 394:1066 width-to-height ratio of about 0.3696. Do not widen, shorten, crop, tilt, or add margin.
Critical geometry: preserve the single extremely narrow full-height decorative vertical insert between the narrow left leaf stile and the broad right leaf field. It begins immediately below the top inner frame and runs uninterrupted to the bottom. Preserve its exact slim width and position, its thin dark edge lines, and its irregular warm translucent mosaic appearance with alternating small beige, tan, copper-brown, and dark brown fragments. Do not turn it into a plain line, metal strip, wood strip, window, or repeated geometric pattern.
Hardware/frame invariants: preserve the dark recessed reveal immediately inside the far-left frame; the complete layered neutral-gray perimeter frame and top mouldings; exactly one dark horizontal lever handle on one round rosette mounted on the narrow left leaf stile and crossing toward the decorative insert; and exactly one separate dark circular key escutcheon directly below with one simple key slot, identical count and placement.
Constraints: change only the leaf wood finish on both sides of the decorative insert; retain the frame finish, decorative insert colors and structure, proportions, depths, shadows, vertical grain direction, hardware count and placement, neutral lighting, plain catalog background, and composition. No redesign, new objects, crop, resize, reframing, or added margin.
Avoid: logo, WONLY mark, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding{{WHITE_AVOID}}, duplicated or missing hardware, extra handles or escutcheons, missing or widened decorative insert, simple straight line replacing the mosaic insert, extra inlays, panels or windows, room scene, people, props.
```

## Exact finish clauses and generator IDs

- `negro` — `NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible` — `exec-b2b24a8a-84b8-4c7b-a500-8bf95eff88e6` — attempt 1, PASS.
- `wengue` — `WENGUÉ finish: very dark espresso-brown tropical wood with restrained near-black vertical grain, clearly brown rather than neutral black` — `exec-fae36523-8c40-4f21-9b7d-5ebb7f8dad06` — attempt 1, PASS.
- `gris-oscuro` — `GRIS OSCURO finish: deep neutral charcoal-gray stained wood, clearly gray rather than black, with subtle authentic vertical grain` — `exec-379e8d65-666d-4f85-9830-05a18f257778` — attempt 1, PASS.
- `antracita` — `ANTRACITA finish: saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain` — `exec-c06d4c45-0ab5-4734-909b-e5ec4b78511d` — attempt 1, PASS.
- `nogal` — `NOGAL finish: refined medium-rich warm walnut brown with natural darker vertical grain, elegant and realistic, neither orange nor red` — `exec-ea6c750e-1283-4272-b489-77974ccb81ec` — attempt 1, PASS.
- `roble` — `ROBLE finish: light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange` — `exec-e4d5e1db-1686-480f-8d6f-93c348b0b3c1` — attempt 1, PASS.
- `gris-claro` — `GRIS CLARO finish: pale neutral light-gray stained wood, soft cool silver-gray with subtle authentic vertical grain, clearly lighter than the original leaf yet distinct from pure white` — `exec-93b4cf9e-bcdc-4831-8329-368d9f019816` — attempt 1, PASS.
- `natural` — `NATURAL finish: very light untreated natural wood in warm pale beige and sand tones, matte, unstained, with understated authentic vertical grain` — `exec-7249ccc3-dca5-4458-92dc-b2d24a2e92e3` — attempt 1, PASS.
- `blanco` — `BLANCO finish: clean neutral matte white-painted wood without cream or gray cast, with very subtle authentic vertical grain still visible` — `exec-16f2211d-b01f-4f41-9a54-770ba94994e9` — attempt 1, PASS. This call also used the `{{WHITE_AVOID}}` text specified above.
