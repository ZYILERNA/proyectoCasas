# MADERAACÚSTICA/wl-s023 — direct built-in ImageGen prompt audit

Thirty-eight independent built-in ImageGen calls produced nine accepted PNGs and twenty-nine preserved rejects. Every call used only `public/images/PUERTAS/MADERAACÚSTICA/wl-s023/original.webp` (SHA-256 `cafef4a0be6417631b59d3af0596eb347069de97221adb356ba6955bdf8e231b`).

No generated output, logo image or other reference was used. No filter, scripted recolor, mask, crop, resize, composite, conversion or other pixel processing was applied. Every workspace PNG is byte-for-byte identical to its direct ImageGen output.

## Shared invariant prompt

> Faithfully redraw the referenced door as a clean photorealistic e-commerce cutout on a pure white background. Preserve the exact wl-s023 model identity and geometry: source ratio 391:1024; front orthographic view; complete slim squared casing; one plain vertically grained leaf; exactly one near-black full-height recessed channel on the left; exactly one continuous very thin warm-gold inset perimeter outline whose left segment makes exactly one rightward rectangular detour around the hardware, with one upper short horizontal step, one short vertical segment down, one lower short horizontal return and then the main left line continuing; exactly one circular handle rosette with one straight lever pointing right; exactly one separate circular key escutcheon below. No extra border, panel, groove, line, channel, molding, handle, lock, logo, text, badge, brand, watermark, floor, wall, prop, scene or decoration. Keep the full outer casing and complete silhouette visible and uncropped. NO_LOGO. Direct built-in AI generation only, not a filter.

## Framing clauses and retries

> Enlarge the door so it occupies virtually the entire portrait canvas. The outer casing should almost touch all four edges with only the minimum pure-white clearance needed to retain the complete frame. Avoid broad white margins, especially at top and bottom. Do not crop any real geometry.

The strictest retry additionally requested the reference occupied-area percentage: at least 99.5% of canvas width and 99.6% of canvas height, with the complete casing tangent to the canvas where ImageGen could retain all real geometry. ImageGen did not always obey those numeric targets exactly, so every direct result was measured and the tightest valid silhouette was selected. Five later calls closed the two former 13-pixel exceptions: `nogal` now measures `[0,0,3,0]` and `natural` measures `[7,3,8,0]`. Native inspection confirmed that their full header, corners, jambs, reveal and bottom endpoints remain intact. No post-generation crop or resize was used.

A later ratio audit imposed an explicit maximum absolute relative aspect-ratio delta of 1%. The former `gris-claro` active measured 1.047213% and was therefore displaced losslessly. Two new direct calls from the canonical source produced a 0.032899% candidate rejected for a 14-pixel margin, followed by the selected 0.016378% candidate with `[2,0,3,0]` margins. All nine active files now satisfy both ratio delta `<=1%` and perimeter `<=12px`.

## Literal 2026-08-30 closure prompts recovered from rollout

The following five prompts are reproduced verbatim from the complete rollout event for each ImageGen ID. The referenced image in every call was only the canonical `original.webp` above.

### `exec-87ea69fd-be73-4d9e-9672-89bab6dcadc3` — natural attempt 5

```text
Use case: product-mockup.
Asset type: photorealistic e-commerce door catalog cutout.
Input image: the referenced canonical wl-s023 original is the sole visual reference.
Primary request: Faithfully redraw the exact referenced wl-s023 door in the requested finish, changing only the finish color/material while preserving the model identity and geometry.
Composition/framing: front orthographic view on a pure white portrait canvas matching the source's extremely tall narrow 391:1024 aspect ratio (width/height 0.3818; approximately 775x2030), never a wider conventional portrait ratio. Enlarge the complete door assembly until it occupies virtually the whole canvas. Keep the entire outer casing, header, both jambs, reveal, bottom endpoints and all four outer corners intact and uncropped. Target only 0–6 pixels of white clearance on each side; absolute maximum 12 pixels. It is acceptable for the complete outer casing to be tangent to an image edge (0 px) if no actual geometry is cut.
Geometry invariants: complete slim squared casing; one plain vertically grained leaf; exactly one near-black full-height recessed channel on the left; exactly one continuous very thin warm-gold inset perimeter outline whose left segment makes exactly one rightward rectangular detour around the hardware, with one upper short horizontal step, one short vertical segment down, one lower short horizontal return, then the main left line continuing; exactly one circular handle rosette with one straight lever pointing right; exactly one separate circular key escutcheon below.
Constraints: NO_LOGO. No logo, text, badge, brand or watermark. No extra border, panel, groove, line, channel, molding, handle, lock, window, floor, wall, prop, scene or decoration. Pure white background. Direct built-in AI generation only, not a filter.
Finish: pale natural oak / light natural wood with subtle straight vertical grain. Apply this finish coherently to leaf and visible wood casing; keep the recessed channel near-black, gold outline warm gold, and hardware dark graphite.
```

### `exec-d731e6e5-bf46-4f3e-9237-159c875162a8` — nogal attempt 5

```text
Use case: product-mockup.
Asset type: photorealistic e-commerce door catalog cutout.
Input image: the referenced canonical wl-s023 original is the sole visual reference.
Primary request: Faithfully redraw the exact referenced wl-s023 door in the requested finish, changing only the finish color/material while preserving the model identity and geometry.
Composition/framing: front orthographic view on a pure white portrait canvas matching the source's extremely tall narrow 391:1024 aspect ratio (width/height 0.3818; approximately 775x2030), never a wider conventional portrait ratio. Enlarge the complete door assembly until it occupies virtually the whole canvas. Keep the entire outer casing, header, both jambs, reveal, bottom endpoints and all four outer corners intact and uncropped. Target only 0–6 pixels of white clearance on each side; absolute maximum 12 pixels. It is acceptable for the complete outer casing to be tangent to an image edge (0 px) if no actual geometry is cut.
Geometry invariants: complete slim squared casing; one plain vertically grained leaf; exactly one near-black full-height recessed channel on the left; exactly one continuous very thin warm-gold inset perimeter outline whose left segment makes exactly one rightward rectangular detour around the hardware, with one upper short horizontal step, one short vertical segment down, one lower short horizontal return, then the main left line continuing; exactly one circular handle rosette with one straight lever pointing right; exactly one separate circular key escutcheon below.
Constraints: NO_LOGO. No logo, text, badge, brand or watermark. No extra border, panel, groove, line, channel, molding, handle, lock, window, floor, wall, prop, scene or decoration. Pure white background. Direct built-in AI generation only, not a filter.
Finish: rich medium-dark walnut wood with natural straight vertical grain and warm brown tonal variation. Apply this finish coherently to leaf and visible wood casing; keep the recessed channel near-black, gold outline warm gold, and hardware dark graphite.
```

### `exec-05f90bc1-196c-450f-a864-69d71c2f1b26` — natural attempt 6

```text
Use case: product-mockup. Create a clean photorealistic e-commerce cutout by faithfully redrawing only the canonical referenced wl-s023 door.
NON-NEGOTIABLE CANVAS AND SCALE: use the source's extremely tall narrow 391:1024 portrait ratio, width/height 0.3818 (around 775x2030), never 2:3, 3:4 or any wider canvas. FULL-BLEED PRODUCT SCALE: the complete outer casing must span essentially the entire image width. Place the outside face of the left jamb tangent to the left image edge and the outside face of the right jamb tangent to the right image edge (0–4 px white maximum); place the complete top outer casing only 0–4 px from the top edge and complete bottom jamb endpoints 0–4 px from the bottom. No decorative white padding. Preserve all four casing corners, full header, both full jambs, reveal and bottom endpoints; tangent is required, cropping real geometry is forbidden.
Exact identity: front orthographic complete slim squared casing; one plain vertically grained leaf; exactly one near-black full-height recessed channel at far left; exactly one continuous very thin warm-gold inset perimeter outline whose left segment makes exactly one rightward rectangular detour around the hardware consisting of one short upper horizontal step, one short vertical down, one short lower horizontal return, then the main left line continues; exactly one circular dark handle rosette, one straight dark lever pointing right, and exactly one separate circular dark key escutcheon below.
Keep NO_LOGO: no logo, text, badge, brand, watermark. No extra border, panel, seam, groove, line, channel, molding, handle, lock, window, wall, floor, prop, scene or decoration. Pure white background. Direct built-in AI generation only, not a filter.
Finish change only: pale natural oak / light natural wood with subtle straight vertical grain on leaf and visible wood casing. Keep channel near-black, outline warm gold, hardware dark graphite.
```

### `exec-950fa330-937c-4e38-9987-b7a472870069` — nogal attempt 6, accepted

```text
Use case: product-mockup. Create a clean photorealistic e-commerce cutout by faithfully redrawing only the canonical referenced wl-s023 door.
NON-NEGOTIABLE CANVAS AND SCALE: use the source's extremely tall narrow 391:1024 portrait ratio, width/height 0.3818 (around 775x2030), never 2:3, 3:4 or any wider canvas. FULL-BLEED PRODUCT SCALE: the complete outer casing must span essentially the entire image width. Place the outside face of the left jamb tangent to the left image edge and the outside face of the right jamb tangent to the right image edge (0–4 px white maximum); place the complete top outer casing only 0–4 px from the top edge and complete bottom jamb endpoints 0–4 px from the bottom. No decorative white padding. Preserve all four casing corners, full header, both full jambs, reveal and bottom endpoints; tangent is required, cropping real geometry is forbidden.
Exact identity: front orthographic complete slim squared casing; one plain vertically grained leaf; exactly one near-black full-height recessed channel at far left; exactly one continuous very thin warm-gold inset perimeter outline whose left segment makes exactly one rightward rectangular detour around the hardware consisting of one short upper horizontal step, one short vertical down, one short lower horizontal return, then the main left line continues; exactly one circular dark handle rosette, one straight dark lever pointing right, and exactly one separate circular dark key escutcheon below.
Keep NO_LOGO: no logo, text, badge, brand, watermark. No extra border, panel, seam, groove, line, channel, molding, handle, lock, window, wall, floor, prop, scene or decoration. Pure white background. Direct built-in AI generation only, not a filter.
Finish change only: rich medium-dark walnut with natural straight vertical grain and warm brown tonal variation on leaf and visible wood casing. Keep channel near-black, outline warm gold, hardware dark graphite.
```

### `exec-40dc2f04-0344-4e73-bd6f-ec7a58f3e492` — natural attempt 7, accepted

```text
Use case: product-mockup. Sole input: the canonical referenced wl-s023 original. Faithfully redraw this exact door as a pale natural oak / light natural wood photorealistic catalog cutout; change only the wood finish. Preserve subtle straight vertical grain.
MATCH THE SOURCE CANVAS: extremely tall narrow 391:1024 portrait aspect, width/height 0.3818, approximately 775x2030; absolutely never a wider standard portrait.
FULL-BLEED SCALE IS REQUIRED: make the complete door assembly 99.5–100% of the image width and 99.6–100% of image height. The complete outermost left jamb must be tangent to the left image boundary and the complete outermost right jamb tangent to the right boundary (0–3 px white clearance only). Complete header and intact upper corners tangent to the top boundary (0–3 px). Intact lower jamb endpoints tangent to the bottom boundary (0–3 px). Do not add white padding. Tangency is intentional; do not cut any wood, edge, corner, casing, header, jamb, reveal or bottom endpoint.
Exact geometry: front orthographic complete slim squared casing; one plain vertically grained leaf; exactly one near-black full-height recessed channel at far left; exactly one continuous very thin warm-gold inset perimeter outline. On the left the gold line makes exactly one rightward rectangular detour around the hardware: one short upper horizontal step, one short vertical down, one short lower horizontal return, then the main left line continues. Exactly one circular dark handle rosette, one straight dark lever pointing right, and exactly one separate circular dark key escutcheon below. Keep the dark channel, warm-gold line and dark graphite hardware unchanged.
NO_LOGO. No logo, text, badge, brand, watermark. No extra border, panel, seam, groove, line, channel, molding, hardware, lock, window, wall, floor, prop, scene or decoration. Pure white background. Direct built-in AI generation only, not a filter.
```

### `exec-7e306e32-d612-41e6-9cdf-54eae5ec44f5` — gris-claro attempt 5

```text
Edit ONLY the attached canonical wl-s023 original into a faithful GRIS CLARO finish. Preserve the exact ultra-tall narrow front-facing proportions at source ratio 391:1024 (width/height 0.381836); never widen it.

Preserve the complete slim square outer casing, straight top header, both jambs, all four corners, both bottom endpoints, and exactly ONE near-black full-height recessed channel immediately inside the far-left frame. The leaf remains plain and vertically grained.

Preserve exactly ONE continuous ultra-thin warm-gold inset outline and its exact path: it runs around the near-full leaf perimeter as one closed large rectangle, but along the left side it makes exactly ONE small rightward rectangular detour around the handle/lock zone, then returns to the same left vertical path. No break, no second outline, no panel, seam, groove or extra line. Preserve exactly ONE dark circular handle rosette with ONE straight horizontal lever pointing right and exactly ONE separate dark circular key escutcheon below, aligned inside that one detour. No additional hardware. NO_LOGO: no Wonly, text, badge, watermark, letters or pseudotext.

Refinish leaf and matching casing coherently in pale neutral cool light gray with restrained fine vertical wood grain; keep the far-left channel dark, hardware dark and outline warm gold.

FRAMING: make the complete intact assembly nearly fill the correctly proportioned canvas. Target 0–6 px white clearance per side, absolute max 12; edge contact allowed only with full header/corners/jambs/channel/endpoints intact. No padding, broad white border, floor, room or cast shadow. Pure white background. Straight-on photorealistic crisp ecommerce cutout.
```

### `exec-9700b9a6-8028-4527-8233-8a20fa0d800a` — gris-claro attempt 6, accepted

```text
Using ONLY the canonical wl-s023 original, create the same GRIS CLARO door at the strict source aspect ratio 391:1024 (0.381836), never wider. Preserve exactly: complete slim square header and casing, both jambs/corners/bottom endpoints; one near-black full-height recessed channel at far left; one plain vertically grained leaf; exactly one continuous hairline warm-gold closed perimeter outline with exactly one small rightward rectangular detour around the handle zone on its left side; one dark circular rosette and one straight right-pointing lever; one separate dark circular key escutcheon below. No other line, panel, groove, channel, glass or hardware. NO_LOGO, no Wonly/text/badge/watermark/pseudotext. Pale neutral cool light-gray wood finish; channel/hardware dark, outline warm gold.

MANDATORY EDGE-TO-EDGE FRAMING: the complete colored left casing post must touch the first pixel column and the complete colored right casing post must touch the last pixel column; the intact header should touch or sit within 0–2 pixels of the top and both intact bottom endpoints should touch the bottom. Occupy 100% of canvas width with NO white vertical strip or padding, while keeping the full widths of both posts and all corners visibly intact, not truncated. Pure white only in tiny negative-space contours; no border, floor, room or shadow. Photorealistic straight-on crisp catalog image.
```

## Finish calls

| Finish | Built-in ImageGen ID | Result |
|---|---|---|
| negro | `exec-5abce4ea-0dad-4d86-9405-38453433bdf1` | rejected; tighter retry selected |
| negro | `exec-93cbf2e0-3b38-4398-bdfe-4ed2eb310124` | accepted attempt 2 |
| negro | `exec-81ac23a1-a47c-4245-8105-df303e529a58` | rejected; 13-pixel margin |
| wengue | `exec-d586eaee-8463-4933-bc03-160496decdba` | rejected; later result had closer ratio and lower bottom margin |
| wengue | `exec-48157e48-df18-44ac-8006-aa2845d41c85` | rejected; did not improve selection |
| wengue | `exec-d1c948d7-0f8b-48de-b0d1-3a011c9d0e57` | accepted attempt 3 |
| gris-oscuro | `exec-353a8103-0721-43e5-9878-c81e441cfbaf` | rejected; 14-pixel margin |
| gris-oscuro | `exec-bcd19e11-121d-48b4-9eb4-5b0f6f67090b` | accepted attempt 2 |
| gris-oscuro | `exec-4edc5def-deed-4db9-b2b7-7a4c55439d8e` | rejected; 13-pixel margin |
| antracita | `exec-efc479d2-ef25-41cd-8625-9e3a0f472efe` | rejected; 15-pixel margin |
| antracita | `exec-ac6bf37e-fc2c-4603-b0e6-cad8d662b5ea` | rejected; 21-pixel margin |
| antracita | `exec-78100f3a-cc18-4efe-9e59-76dba5f771fd` | rejected; 13-pixel margin |
| antracita | `exec-34fb8bf8-0b92-428b-97e5-5ae5a2699d97` | accepted attempt 4 |
| antracita | `exec-d5d246e8-b216-423d-a6a9-aa43e71a50ea` | rejected; 17-pixel margin |
| nogal | `exec-c1a51cfb-f13d-43cd-9cbe-760de09ae2d1` | rejected; later result had smaller total perimeter |
| nogal | `exec-48197b80-d8d7-4393-a5a7-fb501baef95c` | rejected; 19-pixel margin |
| nogal | `exec-4d3a92ca-e91a-4315-8fde-4e1d6f704fcf` | displaced by attempt 6; preserved as reject |
| nogal | `exec-e6d5fc7a-15b9-4629-a9af-7b0bd3f05ff9` | rejected; 16-pixel margin |
| roble | `exec-443ff694-ecb3-40ab-9e4c-03c994fa1144` | rejected; 25-pixel margin |
| roble | `exec-73a5ebfd-ddc1-466a-a559-fb45d2c02437` | rejected; 17-pixel margin |
| roble | `exec-55003a25-9fe5-4ff3-abdd-798aaafaad1f` | accepted attempt 3 |
| gris-claro | `exec-95ef632f-adfd-4b37-ae53-ebfdada975bb` | rejected; 16-pixel margin |
| gris-claro | `exec-a4b7106e-658e-4275-911a-5a181d7f6939` | rejected; 14-pixel margin |
| gris-claro | `exec-8c85d4ab-57c2-4a3d-a639-da1cb1c9f4a3` | rejected; 13-pixel margin |
| gris-claro | `exec-50643fdd-56c4-47f9-a2bf-c20b295077ac` | displaced by ratio audit; preserved as reject |
| natural | `exec-0d742427-94a0-46ec-a8a8-0535b61f0a84` | rejected; 17-pixel margin |
| natural | `exec-402981f1-69d4-4f75-bdbe-3b183c578d00` | rejected; 14-pixel margin |
| natural | `exec-67afb05e-6fb3-4735-b437-36130c2f16c4` | displaced by attempt 7; preserved as reject |
| natural | `exec-ef4dea0c-29a6-470b-a6cd-55a39a1e2e45` | rejected; 20-pixel margin |
| blanco | `exec-f87b3830-2fae-4c3a-b3ca-434a799aa25e` | accepted attempt 1 |
| blanco | `exec-67bf7762-ab7f-4fa5-9664-913adb72a628` | rejected; 13-pixel margin |
| natural | `exec-87ea69fd-be73-4d9e-9672-89bab6dcadc3` | rejected attempt 5; 13-pixel margin |
| nogal | `exec-d731e6e5-bf46-4f3e-9237-159c875162a8` | rejected attempt 5; 19-pixel margin |
| natural | `exec-05f90bc1-196c-450f-a864-69d71c2f1b26` | rejected attempt 6; 13-pixel margin |
| nogal | `exec-950fa330-937c-4e38-9987-b7a472870069` | accepted attempt 6; `[0,0,3,0]` margins |
| natural | `exec-40dc2f04-0344-4e73-bd6f-ec7a58f3e492` | accepted attempt 7; `[7,3,8,0]` margins |
| gris-claro | `exec-7e306e32-d612-41e6-9cdf-54eae5ec44f5` | rejected attempt 5; 14-pixel margin, ratio delta 0.032899% |
| gris-claro | `exec-9700b9a6-8028-4527-8233-8a20fa0d800a` | accepted attempt 6; `[2,0,3,0]` margins, ratio delta 0.016378% |

Native-detail inspection confirmed complete silhouettes and exact signature geometry in all nine accepted files, including the edge-tangent but intact new `nogal` and `gris-claro` results. No file under `public/` was changed and no promotion, conversion, commit or push occurred.
