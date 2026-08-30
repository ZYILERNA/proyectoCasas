# MADERAACÚSTICA/wl-d026 — direct built-in ImageGen prompts

All nine accepted PNGs are untouched outputs from nine independent built-in ImageGen calls. Every call used this single canonical reference and no other image:

`public/images/PUERTAS/MADERAACÚSTICA/wl-d026/original.webp`

Reference SHA-256 before and after generation: `122d48eb3dba2c087a4c0439ef2fb5277489af1a45353f503b6c0aec82f03d69`.

Policy: `NO_LOGO`. No generated variant or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, or format conversion was applied to an accepted PNG. The workspace files are byte-for-byte copies of the built-in generator results recorded in `manifest.json`.

## Exact rendered-prompt template

Each call used the following prompt verbatim after replacing `{{FINISH_CLAUSE}}` with the exact clause listed below. `{{WHITE_AVOID}}` was empty for eight finishes and was `, beige or yellow cast on the white finish` for `blanco`.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference.
Primary request: Change only the visible wood finish of the complete door leaf, including the large right panel and narrow matching left stile, to an exact {{FINISH_CLAUSE}}.
Subject: the exact same acoustic door model wl-d026 shown in Image 1.
Style/medium: high-fidelity photorealistic architectural product photography.
Composition/framing: preserve the exact very tall narrow portrait aspect ratio, straight-on camera, near-flush catalog crop, scale, margins, and complete outer door frame from Image 1.
Design invariants: preserve the dark recessed vertical reveal along the far-left side, the two very thin parallel vertical black grooves near the left edge of the main leaf, the plain uninterrupted large right panel, the silver-gray perimeter frame and layered top/side mouldings, one left lever handle, and one circular key escutcheon exactly where they are.
Constraints: change only the wood finish; preserve geometry, proportions, depths, grooves, shadows, hardware count, hardware placement, lighting, white catalog background, and composition. No redesign, new objects, crop, resize, reframing, or added margin.
Avoid: logo, WONLY mark, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, sticker, branding, duplicated hardware, horizontal seams, decorative panels, room scene, people, props{{WHITE_AVOID}}.
```

## Exact finish clauses and generator IDs

- `negro` — `NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible` — `exec-e30e3958-929c-409f-8368-65ca911e6c0f` — attempt 1, PASS.
- `wengue` — `WENGUÉ finish: very dark espresso-brown tropical wood with restrained near-black vertical grain, clearly brown rather than neutral black` — `exec-ee26bc11-2e7a-4446-b473-4ebb188bc310` — attempt 1, PASS.
- `gris-oscuro` — `GRIS OSCURO finish: deep neutral charcoal-gray stained wood, clearly gray rather than black, with subtle authentic vertical grain` — `exec-53624bcb-be2d-41aa-afdd-b6ce9fb26a68` — attempt 1, PASS.
- `antracita` — `ANTRACITA finish: saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain` — `exec-dcbcac2a-2bf7-4017-87de-59198e1aee44` — attempt 1, PASS.
- `nogal` — `NOGAL finish: refined medium-rich warm walnut brown with natural darker vertical grain, elegant and realistic, neither orange nor red` — `exec-052b8318-5412-4e67-851d-fe7857d11df3` — attempt 1, PASS.
- `roble` — `ROBLE finish: light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange` — `exec-2ef8dfdc-50a2-49db-997c-e2dd57f71d66` — attempt 1, PASS.
- `gris-claro` — `GRIS CLARO finish: pale neutral light-gray stained wood, soft cool silver-gray with subtle authentic vertical grain, clearly lighter than the original leaf yet distinct from pure white` — `exec-bcff5573-6a28-4ce0-9c37-6b32827465dc` — attempt 1, PASS.
- `natural` — `NATURAL finish: very light untreated natural wood in warm pale beige and sand tones, matte, unstained, with understated authentic vertical grain` — `exec-8e30417e-15e8-4a22-883a-a0ba1549a501` — attempt 1, PASS.
- `blanco` — `BLANCO finish: clean neutral matte white-painted wood without cream or gray cast, with very subtle authentic vertical grain still visible` — `exec-8425b747-6369-4d6f-94da-2ed75390749a` — attempt 1, PASS. This call also used the `{{WHITE_AVOID}}` phrase specified above.
