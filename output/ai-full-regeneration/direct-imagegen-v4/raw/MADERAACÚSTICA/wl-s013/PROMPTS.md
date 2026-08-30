# MADERAACÚSTICA/wl-s013 — direct built-in ImageGen prompt audit

All 11 audited PNGs came from 11 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

`public/images/PUERTAS/MADERAACÚSTICA/wl-s013/original.webp`

Reference SHA-256 before and after the run: `1f6a173fefe5de29b4c04e6763b384c53db45a48a2713b471c804d6b761040f1`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output or logo image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every workspace PNG is a byte-for-byte copy of the corresponding built-in ImageGen result.

This file records the prompt families and attempt mapping. The built-in tool did not emit a separate prompt log file, so these families preserve the operational request and invariants without claiming a character-for-character reconstruction of internal prompt normalization.

## Shared subject and invariant contract

```text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: regenerate the same wl-s013 door in {{FINISH_CLAUSE}}.
Composition/framing: preserve the original 396:1066 extremely tall narrow orthographic view and enormous object scale. The canonical original measures RGB<245 margins [0,4,0,0], so left/right/bottom contact is permitted only with the full silhouette, bevels and lower endpoints intact. Prefer 0-6 px where the source contacts and 2-6 px at top; never exceed 12 px.
Geometry invariants: complete two-post outer frame; complete straight layered/beveled top header; dark recessed full-height reveal immediately inside the far-left post; one plain uninterrupted slab leaf; exactly one narrow double-line horizontal band at the original hardware height; no decorative panels, extra grooves or glass.
Hardware invariants: exactly one exceptionally long slim dark horizontal lever extending almost to the right jamb from one circular rosette; exactly one separate circular key cylinder below; no visible hinges or additional hardware.
Finish invariants: change only the requested finish; preserve geometry, grain direction, hardware placement, neutral lighting and straight-on catalog presentation.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, rosettes, cylinders, hinges, seams, bands, panels, glass, decoration, room scene, people or props.
```

## Finish clauses

- `negro`: deep neutral black wood with restrained authentic vertical grain and sufficient tonal separation for the mouldings.
- `wengue`: very dark espresso-brown wenge wood with subtle near-black grain, visibly brown rather than neutral black.
- `gris-oscuro`: deep neutral dark-charcoal gray wood, clearly gray rather than black.
- `antracita`: very dark cool graphite/anthracite wood with subtle vertical grain.
- `nogal`: refined warm walnut brown with natural darker grain, neither orange nor red.
- `roble`: light-to-medium warm golden natural oak with fine restrained grain, clearly lighter than walnut.
- `gris-claro`: pale neutral light-gray wood with subtle cool-silver grain and clearly defined edges against white.
- `natural`: very light untreated natural wood in pale beige/sand tones, lighter and less golden than oak.
- `blanco`: clean neutral matte white-painted wood without cream or yellow cast, retaining subtle grain and defined gray-shadowed contours.

## Prompt families

### F1 — base source-edge catalog generation

The shared contract above with the finish clause substituted. It explicitly allowed source-faithful left/right/bottom contact only with the complete silhouette intact and requested a small top safety gap.

### F2 — top-gap correction

For `gris-oscuro` attempt 2, the shared contract was repeated with a targeted request to restore a 2–6 px pure-white top gap while retaining the source-like side and bottom contact. The first output remained untouched and was preserved as rejected.

### F3 — tighter natural framing correction

For `natural` attempt 2, the shared contract requested the complete side posts closer to the left/right edges because attempt 1 measured 13 px at the left. The retry again used only `original.webp`; no crop, resize or repositioning was applied afterward.

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | `exec-46684a7b-344d-484b-a944-312f2048abba` | accepted — native-complete bottom contact |
| wengue | 1 | F1 | `exec-ba84e756-e94c-4b56-b178-0989ed10e5fa` | accepted — native-complete bottom contact |
| gris-oscuro | 1 | F1 | `exec-f48336a8-6225-4293-9689-ba5b4cfff1e1` | rejected — noncanonical top contact |
| gris-oscuro | 2 | F2 | `exec-1eed5b73-b33a-455d-84c5-13b843d117bd` | accepted — source-faithful left/bottom contact and restored top gap |
| antracita | 1 | F1 | `exec-4ed2370f-f836-49c6-b47f-2b3e0cf91f98` | accepted — native-complete bottom contact |
| nogal | 1 | F1 | `exec-f0628477-78af-40e7-851e-0f86673d9a1b` | accepted — native-complete bottom contact |
| roble | 1 | F1 | `exec-1299cc4c-78d5-4c64-aab4-5c1574ec551e` | accepted — native-complete bottom contact |
| gris-claro | 1 | F1 | `exec-d28a8e85-23bb-442c-9e74-bc11ef0ea92c` | accepted — native-complete light finish |
| natural | 1 | F1 | `exec-7938067f-1ff1-47cc-a57b-570a2dc2d331` | rejected — left margin 13 px |
| natural | 2 | F3 | `exec-6ba7b43d-d632-46d3-9571-661505508961` | accepted — tighter native result |
| blanco | 1 | F1 | `exec-e816425d-828a-4bc3-8426-926793b35f0a` | accepted — native-complete light finish |

Totals: 11 independent built-in ImageGen calls, 9 accepted, 2 rejected.

## Source-edge contact and light-finish notes

Every accepted PNG measures 0 px at the bottom under the RGB<245 metric. `gris-oscuro` also measures 0 px at the left. These files were not cropped or resized: native-detail inspection confirms the complete two posts, header, bevels, lower endpoints, horizontal band and hardware. This matches the canonical original, which measures `[0,4,0,0]`.

For `gris-claro` and `blanco`, the RGB<245 metric reports up to 12 px because the light finish approaches the pure-white background. Native inspection confirms that their visual white border remains minimal and the entire silhouette is intact.

No file under `public/` was touched, and no accepted or rejected PNG was processed after generation.
