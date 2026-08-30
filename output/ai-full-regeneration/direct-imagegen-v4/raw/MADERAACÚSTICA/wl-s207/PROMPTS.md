# MADERAACÚSTICA / wl-s207 — direct built-in ImageGen prompts

## Provenance and execution policy

- Sole reference in every call: `public/images/PUERTAS/MADERAACÚSTICA/wl-s207/original.webp`.
- Reference SHA-256 before and after: `0e109470488d04bc3fe94291a0156b791a621480fac50adf21004b4293a0c4ad`.
- Every finish and retry was a separate built-in ImageGen call.
- No accepted or rejected generation was used as a reference for another call.
- Logo policy: **NO_LOGO**.
- No filter, deterministic recolor, mask, crop, resize, conversion, composite or other pixel processing was applied.
- Every PNG in this package is a byte-for-byte copy of its generator output.

## Shared prompt — attempt 1

```text
Use case: product-mockup / precise reference edit.
Input image: Image 1 is the sole edit target and sole canonical reference.
Primary request: Regenerate the exact same complete front-facing acoustic wooden door assembly shown in Image 1. Change ONLY the visible wood surface finish of the leaf and matching wooden outer casing to the finish specified below.
Canonical structure that must remain identical: the exceptionally tall narrow 393:1062 proportions; straight-on orthographic view; slim complete outer casing and top lintel; narrow dark recessed vertical reveal down the inside-left edge; the exact classical leaf geometry with one very large upper recessed rectangular panel surrounded by stepped beveled moulding, one middle horizontal rail containing exactly one long narrow recessed rectangular inset, and one lower recessed rectangular panel surrounded by stepped beveled moulding; the same flat lower rail; exactly one short black horizontal lever pointing right on a dark round rosette at the source location on the left; exactly one separate small dark round key escutcheon directly below it at the same spacing. Preserve every bevel, rail width, panel size, corner, seam, reveal, handle shape, hardware count, location, scale and spacing exactly. Do not add, remove, simplify, move, mirror or redesign anything.
Scene/backdrop: pure clean white catalog background only; no floor, room, wall, horizon, pedestal, reflection or cast shadow.
Composition/framing: preserve the exact source width-to-height ratio 393:1062 (0.3700565:1), within 1 percent. Keep the full uncropped casing and complete silhouette. Make the door assembly as large as physically possible by uniformly scaling the entire reference composition to nearly touch the canvas: target final blank margins 0–6 pixels per side and never more than 12 pixels. Reproduce the source's near-contact on the right and its canonical bottom-edge contact; 0 pixels on right or bottom is acceptable only while the entire native silhouette remains visible. Prefer about 2–6 pixels left and top. No extra padding. No cropping.
Style/medium: highly faithful photorealistic e-commerce catalog product image; crisp native detail; realistic material grain; clean edge separation.
Logo/text policy: NO LOGO. No branding, word, letters, symbols, badges, plaques, text, pseudotext, watermark or signature anywhere.
Hard constraints: edit only the wood finish; preserve geometry, hardware, lighting direction, viewpoint, proportions and framing; no glass; no extra grooves or panels; no decorative ornament; no environment; no perspective change.
<FINISH CLAUSE>
Output intent: one final raster catalog asset for canonical finish "<FINISH>".
```

## Finish clauses

- `negro`: `Finish: deep neutral black-stained wood with restrained fine visible grain, matte-satin, not blue and not glossy. Keep bevel highlights legible.`
- `wengue`: `Finish: dark chocolate espresso wenge wood with fine straight grain, warm-neutral undertone, matte-satin. It must read distinctly brown, not black.`
- `gris-oscuro`: `Finish: dark cool charcoal-gray stained wood with restrained fine grain, matte-satin. Distinct from black and from anthracite.`
- `antracita`: `Finish: near-black anthracite graphite stained wood with a subtle cool mineral undertone and restrained fine grain, matte-satin. It must be distinguishable from neutral black and from dark gray.`
- `nogal`: `Finish: rich medium warm walnut wood, balanced brown with subtle amber depth and refined natural grain, matte-satin; neither orange nor very dark.`
- `roble`: `Finish: light-medium honey oak wood with authentic straight-to-soft cathedral grain, warm golden-beige tone, matte-satin; clearly lighter than walnut.`
- `gris-claro`: `Finish: light cool gray stained wood with restrained fine grain, matte-satin, clearly visible against pure white while remaining genuinely light gray.`
- `natural`: `Finish: pale warm natural blond wood, beige-blond oak or beech tone with subtle realistic grain, matte-satin; lighter and less golden than honey oak.`
- `blanco`: `Finish: clean neutral white painted wood, matte-satin, with subtle realistic wood relief and crisp bevel-edge tonal definition so the complete white casing remains detectable against the pure-white background. Do not gray or cream the door.`

## Framing-correction prompt — attempt 2 for natural and blanco

The retry was an independent built-in ImageGen call referencing only the same `original.webp`. It did not reference attempt 1.

```text
Use case: product-mockup / precise reference edit.
Input image: Image 1 is the sole edit target and sole canonical reference. This is a fresh independent generation; do not use or infer any other generated image.
Primary request: Regenerate the exact same complete front-facing acoustic wooden door assembly shown in Image 1. Change ONLY the visible wood surface finish of the leaf and matching wooden outer casing to the finish specified below.
Canonical structure that must remain identical: the exceptionally tall narrow 393:1062 proportions; straight-on orthographic view; slim complete outer casing and top lintel; narrow dark recessed vertical reveal down the inside-left edge; the exact classical leaf geometry with one very large upper recessed rectangular panel surrounded by stepped beveled moulding, one middle horizontal rail containing exactly one long narrow recessed rectangular inset, and one lower recessed rectangular panel surrounded by stepped beveled moulding; the same flat lower rail; exactly one short black horizontal lever pointing right on a dark round rosette at the source location on the left; exactly one separate small dark round key escutcheon directly below it at the same spacing. Preserve every bevel, rail width, panel size, corner, seam, reveal, handle shape, hardware count, location, scale and spacing exactly. Do not add, remove, simplify, move, mirror or redesign anything.
Scene/backdrop: pure clean white catalog background only; no floor, room, wall, horizon, pedestal, reflection or cast shadow.
Composition/framing — critical correction: preserve the exact source canvas ratio 393:1062 (0.3700565:1), within 1 percent. Uniformly scale the complete intact door assembly UP until it is essentially edge-to-edge. The final outer silhouette bounding box must leave about 2–6 pixels at LEFT, 2–6 pixels at TOP, 0–6 pixels at RIGHT, and exactly 0–3 pixels at BOTTOM at final native resolution. All four margins MUST be at most 12 pixels. Eliminate any unnecessary white strip above the top casing. Keep the outer posts, top lintel and bottom rail fully visible and uncropped. Do not change geometry to achieve this; only set the composition scale correctly. No extra padding.
Style/medium: highly faithful photorealistic e-commerce catalog product image; crisp native detail; realistic material grain; clean edge separation.
Logo/text policy: NO LOGO. No branding, word, letters, symbols, badges, plaques, text, pseudotext, watermark or signature anywhere.
Hard constraints: edit only the wood finish; preserve geometry, hardware, lighting direction, viewpoint, proportions and framing; no glass; no extra grooves or panels; no decorative ornament; no environment; no perspective change.
<FINISH CLAUSE>
Output intent: final raster catalog asset candidate for "<FINISH>-attempt-2".
```

## Independent call ledger

| Finish | Attempt | Generator ID | Result | Workspace file | RGB<245 margins L/T/R/B |
|---|---:|---|---|---|---|
| negro | 1 | `exec-7783f1f8-6a9e-44b8-b6b5-758e3683d203` | accepted | `negro.png` | 11 / 9 / 11 / 8 |
| wengue | 1 | `exec-c60465c7-4d0d-4161-ac13-5549ff6eabaa` | accepted | `wengue.png` | 9 / 8 / 9 / 0 |
| gris-oscuro | 1 | `exec-5193128a-781e-40cd-9433-27cbe6cf1982` | accepted | `gris-oscuro.png` | 0 / 8 / 4 / 0 |
| antracita | 1 | `exec-38ba821b-ec78-4cbd-aab9-6119ad015872` | accepted | `antracita.png` | 5 / 12 / 8 / 0 |
| nogal | 1 | `exec-b1ad724d-03a8-4b20-a49a-1a71fd4a56ff` | accepted | `nogal.png` | 0 / 0 / 0 / 0 |
| roble | 1 | `exec-2a333fcb-69b3-443e-aefe-0a97838f0f9d` | accepted | `roble.png` | 8 / 9 / 10 / 0 |
| gris-claro | 1 | `exec-758fca63-5045-4c14-97d2-220bd7f7a8cc` | accepted | `gris-claro.png` | 0 / 0 / 0 / 0 |
| natural | 1 | `exec-67e76843-d43a-4271-91e5-91c7a623c9c3` | rejected: top 16 > 12 | `_rejected/natural-attempt-1-top-margin.png` | 11 / 16 / 11 / 0 |
| blanco | 1 | `exec-b3bf9421-2074-4a73-a3a9-ce0b33d88586` | rejected: top 18 > 12 | `_rejected/blanco-attempt-1-top-margin.png` | 13 / 18 / 11 / 0 |
| natural | 2 | `exec-99718f73-7185-484e-864b-b97e7d5286e9` | accepted | `natural.png` | 3 / 1 / 0 / 0 |
| blanco | 2 | `exec-890ce933-58c2-4ba5-919d-e06bc5b89393` | accepted | `blanco.png` | 11 / 6 / 11 / 0 |

## Native inspection result

All nine accepted assets retain the exact two-panel classical signature, the single middle rectangular inset, the complete casing and dark left reveal, and exactly one lever/round rosette plus one separate round key escutcheon. No logo, text, badge, watermark or pseudotext is visible. Contacts at zero pixels were accepted only after native-detail inspection confirmed that the complete posts, lintel and bottom rail remain present; they are close to the original's 5/6/1/0 margins.
