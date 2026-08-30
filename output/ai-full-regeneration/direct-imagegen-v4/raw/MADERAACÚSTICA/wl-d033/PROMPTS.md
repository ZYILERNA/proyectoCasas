# MADERAACÚSTICA/wl-d033 — direct built-in ImageGen prompts

The package records 20 independent built-in ImageGen calls: nine currently accepted PNGs and eleven preserved rejected or retired attempts. Every call used this single canonical reference and no other image:

`public/images/PUERTAS/MADERAACÚSTICA/wl-d033/original.webp`

Reference SHA-256 before and after generation: `6c721bcd5fd0be33ca59e000d15a4de8c93c340eb493e5e40c64563f98929317`.

Policy: `NO_LOGO`. The original's central rectangular spacer contains a zigzag motif classified as pseudologo. Every currently accepted output retains the spacer as an architectural element with a completely plain, flat and blank interior. No generated variant or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, or format conversion was applied to any preserved PNG. Every workspace file is a byte-for-byte copy of the built-in generator result recorded in `manifest.json`.

Prompt traceability is intentionally explicit. The literal text for the original 11 calls and the final three smooth-spacer calls is preserved below. The literal text for the six minimum-margin revision calls was lost during context compaction and is not invented; those calls are marked `prompt_reconstruction_status: unavailable_after_context_compaction` and only their faithfully reconstructed instructions are documented.

## Exact base first-attempt template

The first calls for `negro`, `wengue`, `gris-oscuro`, `antracita`, `nogal`, and `roble` used the following prompt verbatim after replacing `{{FINISH_CLAUSE}}` with the exact clause below.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference.
Primary request: Change only every visible door-leaf wood surface to an exact {{FINISH_CLAUSE}}.
Subject: the exact same acoustic door model wl-d033 shown in Image 1.
Style/medium: high-fidelity photorealistic architectural product photography.
Composition/framing: preserve the exact extremely tall narrow straight-on silhouette, complete outer frame, scale, near-flush catalog crop, minimal white background, and original 411:1107 width-to-height ratio of about 0.371. Do not widen, shorten, crop, or add margin.
Critical geometry: preserve two broad uninterrupted vertical leaf panels separated by one narrow full-height central fluted band with the exact count, spacing, width, and vertical position of its fine parallel ribs; preserve the small rectangular interruption in that band at the same upper-quarter height, but render it only as a simple unbranded flat or vertically ribbed connector with no zigzag letterform, emblem, mark, or symbol.
Hardware/frame invariants: preserve the layered gray perimeter frame and header moulding, narrow side posts, exactly one black horizontal lever handle on a single round rosette on the lower-left portion, and exactly one separate circular key escutcheon directly below, all in their original positions.
Constraints: change only the leaf finish; retain geometry, depths, groove shadows, vertical grain direction, hardware count and placement, lighting, white catalog background, and composition. No redesign, new objects, crop, resize, reframing, or added margin.
Avoid: logo, WONLY mark, monogram, emblem, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding, decorative letterform in the central rectangle, duplicated or missing hardware, altered fluted band, extra seams or panels, room scene, people, props.
```

Exact substitutions and results:

- `negro` — `NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible` — `exec-11bce4ed-686b-41b6-9d64-68af63353329` — attempt 1, initially selected; later REJECTED and retired because stricter native QA found vertical ribs inside the spacer, which was not completely smooth and blank.
- `wengue` — `WENGUÉ finish: very dark espresso-brown tropical wood with restrained near-black vertical grain, clearly brown rather than neutral black` — `exec-7a8bca94-7206-44b7-8363-8ddfe4978d05` — attempt 1, initially selected; later REJECTED and retired for RGB<245 margins `[16,11,17,15]`.
- `gris-oscuro` — `GRIS OSCURO finish: deep neutral charcoal-gray stained wood, clearly gray rather than black, with subtle authentic vertical grain` — `exec-b96da2ee-b046-4acb-9967-688d052e020c` — attempt 1, initially selected; later REJECTED and retired because stricter native QA found a visible zigzag/M-like pseudologo inside the spacer.
- `antracita` — `ANTRACITA finish: saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain` — `exec-37feed29-9ef5-4b78-b9f6-9009ac838cb1` — attempt 1, REJECTED for an M-like central letterform.
- `nogal` — `NOGAL finish: refined medium-rich warm walnut brown with natural darker vertical grain, elegant and realistic, neither orange nor red` — `exec-19391a00-c831-4ad9-bce5-93874ddce822` — attempt 1, initially selected; later REJECTED and retired for RGB<245 right margin 14 px.
- `roble` — `ROBLE finish: light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange` — `exec-0ae09646-7741-45bf-8c59-8fdb22488023` — attempt 1, REJECTED for ambiguous M-like pseudotext in the central spacer.

## Exact `antracita` retry prompt

The rejected first result was never used as a reference. The second and final attempt was another independent call using only the canonical original.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference. Do not use or infer from any previous generated result.
Primary request: Create the ANTRACITA finish of this exact wl-d033 door by changing only every visible broad door-leaf wood surface to saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain.
Mandatory NO_LOGO correction: in the narrow full-height central fluted band, keep the small rectangular interruption at the same upper-quarter position but make its interior a completely blank, flat, solid graphite rectangle. It must contain no grooves, diagonals, zigzags, chevrons, M shape, W shape, letterform, emblem, symbol, texture pattern, or pseudotext of any kind.
Composition/framing: preserve the original extremely tall narrow straight-on silhouette, complete outer frame, near-flush crop, minimal white background, and exact 411:1107 width-to-height ratio of about 0.371. A result near 2048 pixels tall should be about 760 pixels wide. Do not widen or shorten it.
Critical geometry: preserve two broad uninterrupted vertical panels and one narrow full-height central band with its fine parallel ribs above and below the blank rectangular spacer, at the same width and position as Image 1.
Hardware/frame invariants: preserve the layered gray perimeter frame and header moulding, narrow side posts, exactly one black horizontal lever handle on one round rosette at lower left, and exactly one separate circular key escutcheon below it in their original positions.
Style/medium: high-fidelity photorealistic architectural product photography, even neutral catalog lighting.
Constraints: change only the leaf finish and neutralize the logo-like motif inside the small spacer; preserve all other geometry, depths, groove shadows, vertical grain, hardware, lighting, white background, and composition. No crop, resize, reframing, redesign, extra object, or added margin.
Avoid: logo, WONLY mark, monogram, emblem, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding, any diagonal or letter-like pattern in the central rectangle, duplicated hardware, missing hardware, extra seams or panels, room scene, people, props.
```

Accepted generator: `exec-78442c4f-2b50-4172-95b3-4886d8aa35a1`, attempt 2.

## Exact `roble` retry prompt

The rejected first result was never used as a reference. The second and final attempt was another independent call using only the canonical original.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference. Do not use or infer from any previous generated result.
Primary request: Create the ROBLE finish of this exact wl-d033 door by changing only every visible broad door-leaf wood surface to light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange.
Mandatory NO_LOGO correction: in the narrow full-height central fluted band, keep the small rectangular interruption at the same upper-quarter position but make its interior a completely blank, flat, solid oak-color rectangle. It must contain no wood grain, grooves, diagonals, zigzags, chevrons, M shape, W shape, letterform, emblem, symbol, texture pattern, or pseudotext of any kind.
Composition/framing: preserve the original extremely tall narrow straight-on silhouette, complete outer frame, near-flush crop, minimal white background, and exact 411:1107 width-to-height ratio of about 0.371. A result near 2048 pixels tall should be about 760 pixels wide. Do not widen or shorten it.
Critical geometry: preserve two broad uninterrupted vertical panels and one narrow full-height central band with its fine parallel ribs above and below the blank rectangular spacer, at the same width and position as Image 1.
Hardware/frame invariants: preserve the layered gray perimeter frame and header moulding, narrow side posts, exactly one black horizontal lever handle on one round rosette at lower left, and exactly one separate circular key escutcheon below it in their original positions.
Style/medium: high-fidelity photorealistic architectural product photography, even neutral catalog lighting.
Constraints: change only the leaf finish and neutralize the logo-like motif inside the small spacer; preserve all other geometry, depths, groove shadows, vertical grain, hardware, lighting, white background, and composition. No crop, resize, reframing, redesign, extra object, or added margin.
Avoid: logo, WONLY mark, monogram, emblem, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding, any diagonal, grain, or letter-like pattern in the central rectangle, duplicated hardware, missing hardware, extra seams or panels, room scene, people, props.
```

Generator `exec-1bc698ef-fa0e-47a8-8eb0-5dfd21f6f5fb`, attempt 2, passed the original package QA but was later REJECTED and retired for RGB<245 margins `[14,8,14,6]`. It remains preserved byte-for-byte in `_rejected/roble-previous-selected-before-minimum-margin-revision.png`.

## Exact strengthened first-attempt template

The first calls for `gris-claro`, `natural`, and `blanco` used the following prompt verbatim after replacing `{{FINISH_NAME}}`, `{{FINISH_CLAUSE}}`, `{{SPACER_COLOR}}`, and `{{EXTRA_AVOID}}` with the exact values below.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference.
Primary request: Change only every visible broad door-leaf wood surface to an exact {{FINISH_NAME}} finish: {{FINISH_CLAUSE}}.
Subject: the exact same acoustic door model wl-d033 shown in Image 1.
Mandatory NO_LOGO treatment: preserve the small rectangular interruption in the narrow central fluted band at its exact upper-quarter position, but make its interior a completely blank, flat, solid {{SPACER_COLOR}} rectangle with no wood grain, grooves, diagonals, zigzags, chevrons, letterform, emblem, symbol, texture pattern, or pseudotext.
Style/medium: high-fidelity photorealistic architectural product photography.
Composition/framing: preserve the exact extremely tall narrow straight-on silhouette, complete outer frame, scale, near-flush catalog crop, minimal white background, and original 411:1107 width-to-height ratio of about 0.371. Do not widen, shorten, crop, or add margin.
Critical geometry: preserve two broad uninterrupted vertical leaf panels separated by one narrow full-height central fluted band with the exact count, spacing, width, and position of its fine parallel ribs above and below the blank rectangular spacer.
Hardware/frame invariants: preserve the layered gray perimeter frame and header moulding, narrow side posts, exactly one black horizontal lever handle on a single round rosette on the lower-left portion, and exactly one separate circular key escutcheon directly below, all in their original positions.
Constraints: change only the leaf finish and neutralize the logo-like motif inside the small spacer; retain all other geometry, depths, groove shadows, vertical grain direction, hardware count and placement, lighting, white catalog background, and composition. No redesign, new objects, crop, resize, reframing, or added margin.
Avoid: logo, WONLY mark, monogram, emblem, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding, any diagonal, grain, or letter-like pattern in the central rectangle{{EXTRA_AVOID}}, duplicated or missing hardware, altered fluted band, extra seams or panels, room scene, people, props.
```

Exact substitutions and original outcomes:

- `gris-claro`: `{{FINISH_NAME}}` = `GRIS CLARO`; `{{FINISH_CLAUSE}}` = `pale neutral light-gray stained wood, soft cool silver-gray with subtle authentic vertical grain, clearly lighter than the original leaf yet distinct from pure white`; `{{SPACER_COLOR}}` = `light-gray`; `{{EXTRA_AVOID}}` = empty — `exec-87df72e9-e05b-42aa-8bdd-f6dc3fd07a5b`, attempt 1, PASS.
- `natural`: `{{FINISH_NAME}}` = `NATURAL`; `{{FINISH_CLAUSE}}` = `very light untreated natural wood in warm pale beige and sand tones, matte, unstained, with understated authentic vertical grain`; `{{SPACER_COLOR}}` = `pale natural-wood-color`; `{{EXTRA_AVOID}}` = empty — `exec-028eba45-5d30-4e04-9aa5-8950733ba508`, attempt 1, initially selected; later REJECTED and retired for RGB<245 right margin 14 px.
- `blanco`: `{{FINISH_NAME}}` = `BLANCO`; `{{FINISH_CLAUSE}}` = `clean neutral matte white-painted wood without cream or gray cast, with very subtle authentic vertical grain still visible`; `{{SPACER_COLOR}}` = `neutral-white`; `{{EXTRA_AVOID}}` = `, beige or yellow cast` — `exec-27388940-4c5d-4070-91ec-c9d5e039f625`, attempt 1, PASS.

## Minimum-margin revision — reconstructed instructions only

`prompt_reconstruction_status: unavailable_after_context_compaction`

The literal prompt strings for these six calls could not be recovered from the surviving conversation artifact or generator files. They are therefore not presented as verbatim prompts. The following is a faithful, non-literal reconstruction of the recorded instruction shared by those calls:

> Use only `public/images/PUERTAS/MADERAACÚSTICA/wl-d033/original.webp` as the sole visual reference in a fresh independent built-in ImageGen call. Preserve the exact tall wl-d033 architecture: complete cool-gray casing and header, two broad leaf fields, one narrow central full-height fluted strip with parallel ribs and one upper-quarter rectangular spacer, exactly one lever and one separate key cylinder. Render the spacer blank and unbranded under `NO_LOGO`; do not introduce the original zigzag, an M/W form, text, emblem, symbol, watermark or pseudotext. Change only the requested wood finish. Use a pure seamless white background and enlarge the intact assembly to minimize exterior white margin, ideally 0–6 px per side and normally no more than 12 px; edge contact is acceptable only with the complete silhouette visible. Do not use a filter, scripted recolor, mask, crop, resize, conversion or composite, and do not use any generated output as a reference.

Recorded calls and outcomes, with RGB<245 arrays ordered `[left,top,right,bottom]`:

- `wengue`, attempt 2 — requested wengué/dark espresso-brown wood — `exec-95941b32-fa90-41f5-b4e9-59562ec01912` — `[9,3,10,5]` — ACCEPTED.
- `nogal`, attempt 2 — requested warm walnut wood — `exec-5992d737-273c-4c84-895f-402c041e609b` — `[13,9,15,6]` — REJECTED because left and right exceeded 12 px.
- `nogal`, attempt 3 — requested warm walnut wood with stronger maximum-scale/contact framing — `exec-2efd71e8-aaa8-4d3a-9497-d34df1738d40` — `[0,0,0,0]` — ACCEPTED after native inspection confirmed the complete frame.
- `roble`, attempt 3 — requested light honey-oak wood — `exec-8a611c42-96da-4a47-947e-0077c75cf49e` — `[10,7,12,4]` — ACCEPTED.
- `natural`, attempt 2 — requested very light untreated natural wood — `exec-0d70434b-1ea4-4560-829b-4659a0b32d9c` — `[12,9,13,6]` — REJECTED because right exceeded 12 px.
- `natural`, attempt 3 — requested very light untreated natural wood with stronger maximum-scale/contact framing — `exec-7bee56cd-cfa3-4a3e-a8a8-53e81cfefe54` — `[0,0,0,0]` — ACCEPTED after native inspection confirmed the complete frame.

## Exact smooth-spacer revision prompt shared by negro attempt 2 and gris-oscuro attempt 2

The following prompt is literal. Only `FINISH` was replaced with the exact finish phrase listed after the block.

```text
Edit ONLY the supplied original wl-d033 door reference, using no generated image. Create the same isolated product in FINISH. Preserve the complete cool-gray square casing, the same plain leaf, exactly one narrow central full-height fluted strip containing many parallel vertical ribs, and exactly one small rectangular spacer interrupting the ribs in the upper quarter. CRITICAL: that small spacer must be completely plain, flat and blank—no M, no zigzag, no ribs, no icon, no embossing, no markings. Preserve exactly one lever handle and one separate key cylinder. No Wonly logo, no logo of any kind, no letters, no symbols, no additional decoration. Pure #FFFFFF seamless background. Preserve the original 411:1107 tall proportions and full intact outer silhouette. Make the complete assembly as large as possible: target 0–4 white pixels per side, with edge contact allowed where the complete corners/endpoints remain visible; no white mat or generous padding.
```

Exact substitutions and results:

- `negro`, attempt 2 — `FINISH` = `deep matte black (negro)` — `exec-fa6fde24-4f25-45cd-8602-5b84fca9f824` — smooth blank spacer and NO_LOGO passed; RGB<245 `[10,7,16,7]` caused rejection because the right margin exceeded 12 px.
- `gris-oscuro`, attempt 2 — `FINISH` = `dark graphite gray (gris-oscuro)` — `exec-43684f75-1d1a-41b8-bb1f-5ebd0ea02419` — RGB<245 `[8,6,10,4]` — ACCEPTED.

## Exact negro attempt 3 prompt

The rejected negro attempt 2 was not used as a reference. This independent retry again used only the canonical original.

```text
Edit ONLY the supplied original wl-d033 door reference, using no generated image. Create the same isolated product in deep matte black (negro). Preserve the complete cool-gray square casing, the same plain leaf, exactly one narrow central full-height fluted strip containing many parallel vertical ribs, and exactly one small rectangular spacer interrupting the ribs in the upper quarter. CRITICAL: that small spacer must be completely plain, flat and blank—no M, no zigzag, no ribs, no icon, no embossing, no markings. Preserve exactly one lever handle and one separate key cylinder. No Wonly logo, no logo of any kind, no letters, no symbols, no additional decoration. Pure #FFFFFF seamless background. Preserve the original 411:1107 tall proportions and all physical corners/endpoints. Framing is decisive: expand the intact complete assembly to direct contact with all four canvas boundaries, targeting RGB<245 margins [0,0,0,0]. Do not add side bands, a white mat, border, padding or breathing room. Edge contact is required but no physical component may be cut.
```

Accepted generator: `exec-5ee123c6-a478-4b3b-812d-61861a16299d`, attempt 3. Measured RGB<245 and RGB<250 margins are both `[0,0,0,0]`; native inspection confirms the complete frame, top corners and lower endpoints remain intact.

## Final active-call ledger

- `negro` — `exec-5ee123c6-a478-4b3b-812d-61861a16299d`, attempt 3.
- `wengue` — `exec-95941b32-fa90-41f5-b4e9-59562ec01912`, attempt 2.
- `gris-oscuro` — `exec-43684f75-1d1a-41b8-bb1f-5ebd0ea02419`, attempt 2.
- `antracita` — `exec-78442c4f-2b50-4172-95b3-4886d8aa35a1`, attempt 2.
- `nogal` — `exec-2efd71e8-aaa8-4d3a-9497-d34df1738d40`, attempt 3.
- `roble` — `exec-8a611c42-96da-4a47-947e-0077c75cf49e`, attempt 3.
- `gris-claro` — `exec-87df72e9-e05b-42aa-8bdd-f6dc3fd07a5b`, attempt 1.
- `natural` — `exec-7bee56cd-cfa3-4a3e-a8a8-53e81cfefe54`, attempt 3.
- `blanco` — `exec-27388940-4c5d-4070-91ec-c9d5e039f625`, attempt 1.
