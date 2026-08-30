# MADERAACÚSTICA/wl-d029 — direct built-in ImageGen prompts

The nine accepted PNGs are untouched outputs from independent built-in ImageGen calls. Every call used this single canonical reference and no other image:

`public/images/PUERTAS/MADERAACÚSTICA/wl-d029/original.webp`

Reference SHA-256 before and after generation: `81db2d9c946b93e87e1f67c1de024ab9dc677289bf6eb7cf894e05ea212aa84d`.

Policy: `NO_LOGO`. No generated variant or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, or format conversion was applied to an accepted PNG. The workspace files are byte-for-byte copies of the built-in generator results recorded in `manifest.json`.

## Exact first-attempt prompt template

Each finish's first call used the following prompt verbatim after replacing `{{FINISH_CLAUSE}}` with the exact clause listed below. For `blanco`, the Avoid line additionally ended with `, beige or yellow cast on the white finish.`

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference.
Primary request: Change only the visible wood finish of every door-leaf surface to an exact {{FINISH_CLAUSE}}.
Subject: the exact same acoustic door model wl-d029 shown in Image 1.
Style/medium: high-fidelity photorealistic architectural product photography.
Composition/framing: preserve the exact extremely tall narrow portrait silhouette, straight-on camera, near-flush catalog crop, scale, margins, and complete outer frame. Match Image 1's width-to-height ratio of approximately 0.367; do not widen or shorten the door.
Critical geometry: preserve the narrow left vertical strip; the upper and lower vertical seam segments at their different horizontal positions; the short diagonal connector beside the handle; the short horizontal seam across the far-left strip; and the long horizontal seam across the large right leaf. Together these lines form the exact asymmetric angular junction seen in Image 1.
Hardware/frame invariants: preserve the dark gray perimeter frame and layered mouldings, one left lever handle, and one circular key escutcheon directly below in exactly the same positions.
Constraints: change only the wood finish; keep all geometry, seam paths, proportions, grain direction, hardware count and placement, lighting, white catalog background, and composition. No redesign, new objects, crop, resize, reframing, or added margin.
Avoid: logo, WONLY mark, watermark, text, letters, numbers, symbols, signature, pseudotext, badge, branding, duplicated hardware, missing or straightened diagonal junction, extra panels, room scene, people, props.
```

## Exact finish clauses and accepted generator IDs

- `negro` — `NEGRO finish: deep neutral near-black stained wood with subtle authentic vertical grain still visible` — `exec-fa1dc773-f18d-485e-a077-16259bd09ff2` — attempt 1, PASS.
- `wengue` — `WENGUÉ finish: very dark espresso-brown tropical wood with restrained near-black vertical grain, clearly brown rather than neutral black` — `exec-1a3aee8d-ec73-49a5-87dc-71238cf6f61d` — attempt 1, PASS.
- `gris-oscuro` — `GRIS OSCURO finish: deep neutral charcoal-gray stained wood, clearly gray rather than black, with subtle authentic vertical grain` — `exec-8709a028-33d8-4196-b81b-46d8831ca5c4` — attempt 1, PASS.
- `antracita` — `ANTRACITA finish: saturated very dark cool graphite-gray wood, visibly distinct from pure black, with restrained authentic vertical grain` — `exec-5b16ea3b-43ca-4686-be5b-dbdc9b2d0f75` — attempt 1, PASS.
- `nogal` — `NOGAL finish: refined medium-rich warm walnut brown with natural darker vertical grain, elegant and realistic, neither orange nor red` — `exec-bacaf017-e99c-42f9-9398-4b4dd56a692d` — attempt 1, PASS.
- `roble` — `ROBLE finish: light-to-medium honey oak, warm golden beige with restrained realistic vertical oak grain, clearly lighter than walnut and not orange` — `exec-52bccffb-d75f-4889-b12e-af771b183f95` — attempt 1, PASS.
- `gris-claro` — `GRIS CLARO finish: pale neutral light-gray stained wood, soft cool silver-gray with subtle authentic vertical grain, clearly lighter than the original leaf yet distinct from pure white` — `exec-500b0e5a-ce03-4f6f-9bab-58c7d16b79a9` — attempt 1, PASS.
- `natural` — `NATURAL finish: very light untreated natural wood in warm pale beige and sand tones, matte, unstained, with understated authentic vertical grain` — `exec-a28d971e-22ce-46a8-8a0b-09ca4ad041b7` — attempt 1, PASS.
- `blanco` — `BLANCO finish: clean neutral matte white-painted wood without cream or gray cast, with very subtle authentic vertical grain still visible` — first call `exec-1ae4adfe-075d-4965-b722-4591c3e709dd`, attempt 1, REJECTED because its aspect ratio was +26.002% too wide. Accepted retry `exec-162c340a-29b1-41d0-9da4-1e547f8b7a0f`, attempt 2, PASS.

## Exact `blanco` retry prompt

The rejected first result was never used as a reference. The second and final attempt was another independent built-in ImageGen call using only the canonical original.

```text
Use case: precise-object-edit
Asset type: canonical e-commerce door catalog image
Input images: Image 1 is the sole edit target and sole visual reference. Do not use or infer from any previous generated output.
Primary request: Create the BLANCO finish of this exact wl-d029 door by changing only every door-leaf wood surface to clean neutral matte white-painted wood, without cream or gray cast, while retaining very subtle authentic vertical grain.
Mandatory silhouette correction: the result must be extremely tall and narrow exactly like Image 1. Match the original 402:1095 width-to-height proportion, ratio 0.3671. A roughly 2048-pixel-tall result should be only about 752 pixels wide. Do not produce a 0.46 ratio or a conventional wide door. Keep the complete outer frame nearly touching all four canvas edges with only minimal white background.
Critical geometry: preserve the narrow left vertical strip; upper and lower vertical seam segments at their different horizontal positions; the short diagonal connector beside the handle; the short horizontal seam across the far-left strip; and the long horizontal seam across the large right leaf, forming the exact asymmetric angular junction in Image 1.
Hardware/frame invariants: preserve the dark gray perimeter frame and layered mouldings, exactly one left lever handle, and exactly one circular key escutcheon below it in their original positions.
Style/medium: high-fidelity photorealistic architectural product photography, straight-on camera, even neutral catalog lighting.
Constraints: change only the leaf finish; keep geometry, seam paths, scale, vertical grain, hardware, lighting, white background, and near-flush framing. No crop, resize, reframing, redesign, extra object, or added margin.
Avoid: logo, WONLY mark, watermark, text, letters, numbers, pseudotext, badge, branding, duplicated hardware, missing diagonal junction, beige/yellow cast, widened silhouette, room scene, people, props.
```
