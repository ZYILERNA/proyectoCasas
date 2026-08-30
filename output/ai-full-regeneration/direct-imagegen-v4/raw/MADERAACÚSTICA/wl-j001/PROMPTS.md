# MADERAACÚSTICA/wl-j001 — direct ImageGen v4 prompt ledger

Tool mode: built-in ImageGen. The requested workflow label is `direct-imagegen-v4`; the built-in tool did not expose a separate API model identifier. All 35 attempts were independent calls: 23 in the original package and 12 in the minimum-margin revision. Every call referenced only `public/images/PUERTAS/MADERAACÚSTICA/wl-j001/original.webp`; no generated output, logo, mask, or auxiliary image was ever supplied as a reference.

## Canonical intent shared by every call

- Use case: `precise-object-edit`.
- Asset: ecommerce catalog door-finish variant.
- Image 1: sole canonical edit target, geometry reference, composition reference, and only input image.
- Preserve one completely flat unpaneled slab leaf; full shallow-beveled header; both full-height jambs and both bottom tips; the original narrow leaf gaps; exactly one short horizontal lever on one circular rosette and exactly one separate circular cylinder below it, on the left in the original positions.
- Match the extreme 408:1105 portrait proportion (`width/height = 0.3692`) and keep the complete outer contour visible against pure white.
- Change only the leaf/frame finish. Preserve dark graphite hardware.
- `NO_LOGO`: no logo, brand mark, badge, plaque, label, text, letters, digits, microtext, pseudo-text, watermark, signature, QR code, icon, or symbol.
- Avoid panels, grooves, seams, molding, hinges, peephole, threshold, extra hardware, extra geometry, room, wall, floor, props, decoration, border art, vignette, tilt, or perspective.

## Finish-specific clauses

| Key | Finish clause used |
|---|---|
| `F-NEGRO` | Uniform deep neutral matte black, black rather than gray or brown, with restrained realistic fine vertical wood texture. |
| `F-WENGUE` | Very dark espresso-brown wood, almost black-brown yet unmistakably brown, with authentic tight fine vertical wenge grain; never orange, red, purple, or pure black. |
| `F-GRIS-OSCURO` | Refined dark neutral slate gray, visibly gray rather than black, with restrained fine vertical wood texture and no blue cast. |
| `F-ANTRACITA` | Deep charcoal graphite gray, neutral-to-slightly-warm and clearly distinct from pure black and slate gray, with restrained realistic fine vertical wood texture. |
| `F-NOGAL` | Premium medium-dark neutral walnut brown with elegant authentic vertical walnut grain and restrained tonal variation; rich brown but never orange, red, purple, or nearly black. |
| `F-ROBLE` | Warm honey-golden oak with authentic visible vertical oak grain, natural and refined rather than orange or saturated yellow; clearly lighter and more golden than walnut. |
| `F-GRIS-CLARO` | Soft neutral light gray, clearly distinct from pure white and pale natural wood, with subtle fine vertical wood texture and no blue, green, or beige cast; retain gentle tonal separation from the white background without adding an outline. |
| `F-NATURAL` | Pale untreated-looking natural wood, light beige-tan with low saturation and delicate authentic vertical grain; airy and clearly distinct from white, light gray, and golden oak. |
| `F-BLANCO` | Clean neutral satin white with restrained vertical wood texture and very subtle natural edge shading so the complete white frame, slab, narrow gaps, and hardware remain readable against pure white; no colored outline or border. |

## Prompt versions

Each version below was a complete built-in prompt after replacing `FINISH_SPEC` with the applicable finish clause. There were no hidden mask, crop, size, format, or postprocessing parameters.

### P1 — initial canonical render

```text
Use case: precise-object-edit
Asset type: ecommerce catalog door-finish variant
Input images: Image 1 is the sole canonical edit target and the only reference.
Primary request: Re-render the same complete straight-on single-leaf door assembly from Image 1 and change only the visible finish of the door leaf and matching outer frame to FINISH_SPEC. Keep the metal lever and cylinder dark graphite metal, readable but subtle.
Subject and invariants: Preserve the exact extremely tall narrow proportions; one completely flat unpaneled slab leaf; the full top frame/header with its original shallow beveled inner edge; both full-height side jambs; both lower frame ends; the original narrow gaps around the slab; exactly one short horizontal lever on one circular rosette and exactly one separate circular key cylinder below it, both on the left at the same height and position. Preserve the original straight-on orthographic catalog view. Do not add panels, grooves, seams, molding, hinges, peephole, threshold, or any second hardware.
Scene/backdrop: plain pure-white seamless catalog background only.
Composition/framing: MANDATORY extreme portrait canvas matching Image 1 at 408:1105, width/height approximately 0.3692, not a conventional portrait. The complete outer door frame must occupy 98–99% of the canvas width and height, leaving only hairline pure-white clearance around it (target about 0.5–1% per edge; roughly no more than 10–12 pixels at about 760 px output width). Every outer edge and both bottom ends must remain fully visible. No noticeable padding, no wide canvas, no zoom-out, no shrink, no crop, no clipped border, no tilt, no perspective change.
Lighting/materials: clean neutral studio rendering, realistic restrained vertical grain, subtle edge shading sufficient to distinguish leaf, frame and hardware; no cast room shadow.
NO_LOGO constraints: no logo, brand mark, badge, plaque, label, text, letters, numbers, microtext, pseudo-text, watermark, signature, QR code, icons, or symbols anywhere.
Avoid: any room, wall, floor, props, decoration, scene elements, extra hardware, extra geometry, ornamental details, border graphics, or vignette.
```

### P2 — first targeted hairline retry

```text
Use case: precise-object-edit
Asset type: ecommerce catalog door-finish variant
Input images: Image 1 is the sole canonical edit target and the only reference. This is a fresh independent regeneration from Image 1 only.
Primary request: Re-render the same complete straight-on single-leaf door assembly from Image 1 and change only the visible finish of the door leaf and matching outer frame to FINISH_SPEC. Keep the metal lever and cylinder dark graphite metal, readable but subtle.
Subject and invariants: Preserve the exact extremely tall narrow proportions; one completely flat unpaneled slab leaf; the full top frame/header with its original shallow beveled inner edge; both full-height side jambs; both lower frame ends; the original narrow gaps around the slab; exactly one short horizontal lever on one circular rosette and exactly one separate circular key cylinder below it, both on the left at the same height and position. Preserve the original straight-on orthographic catalog view. Do not add panels, grooves, seams, molding, hinges, peephole, threshold, or any second hardware.
Scene/backdrop: plain pure-white seamless catalog background only.
Composition/framing — targeted retry: MANDATORY extreme portrait canvas matching Image 1 at 408:1105, width/height approximately 0.3692. Scale the complete door assembly up closer to all four canvas edges than a normal catalog rendering. At an output about 760 px wide, leave an actual pure-white safety hairline of only 4–8 pixels at left and right, never more than 10 pixels; use similarly minimal 4–10 pixel clearance at top and bottom. The frame should cover about 98–99% of the canvas width and height. Every outer edge and both lower frame ends must remain fully visible, separated from the canvas edge by a tiny hairline. No noticeable padding, no wide canvas, no zoom-out, no shrink, no crop, no clipped border, no tilt, no perspective change.
Lighting/materials: clean neutral studio rendering, realistic restrained vertical grain, subtle edge shading sufficient to distinguish leaf, frame and hardware; no cast room shadow.
NO_LOGO constraints: no logo, brand mark, badge, plaque, label, text, letters, numbers, microtext, pseudo-text, watermark, signature, QR code, icons, or symbols anywhere.
Avoid: any room, wall, floor, props, decoration, scene elements, extra hardware, extra geometry, ornamental details, border graphics, or vignette.
```

### P3 — source-scale coordinate retry

```text
Use case: precise-object-edit
Asset type: ecommerce catalog door-finish variant
Input images: Image 1 is the sole canonical edit target and the only reference. This is a new independent regeneration from Image 1 only.
Primary request: Re-render the same complete straight-on single-leaf door assembly from Image 1 and change only the visible finish of the door leaf and matching outer frame to FINISH_SPEC. Keep the metal lever and cylinder dark graphite metal, readable but subtle.
Subject and invariants: Preserve exactly one completely flat unpaneled slab leaf; the complete top frame/header and shallow beveled inner edge; both full-height side jambs; both lower frame ends; the original narrow gaps around the slab; exactly one short horizontal lever on one circular rosette and exactly one separate circular key cylinder below it, both on the left in the same position. Do not add panels, grooves, seams, molding, hinges, peephole, threshold, or second hardware. Straight-on orthographic catalog view.
Scene/backdrop: pure-white seamless background only.
Composition/framing — mandatory coordinate-level rule: Use the same extreme 408:1105 proportion, width/height 0.3692. Reproduce Image 1's near-edge scale: its outer frame begins only about 3–5 pixels from each side of a 408 px source. At a native output around 762 px wide, put the left outer frame edge at x=4–8 and the right outer frame edge at x=754–758, leaving a continuous pure-white safety line of only 4–8 pixels. Put the top and bottom outer frame edges similarly within 4–8 pixels of the canvas edge. The assembly must occupy about 98–99% of canvas width and height. Keep every contour and both bottom ends fully visible with the tiny white safety line. Do not leave 12–15 pixel catalog padding. No crop, no edge contact, no clipping, no wide canvas, no zoom-out, no shrink, no tilt or perspective.
Lighting/materials: neutral studio rendering; restrained realistic vertical grain; subtle edge shading only; no cast room shadow.
NO_LOGO: no logo, brand mark, badge, plaque, label, text, letters, numbers, microtext, pseudo-text, watermark, signature, QR code, icon, or symbol.
Avoid any room, wall, floor, props, decoration, scene element, extra hardware, extra geometry, ornamental detail, border graphic, or vignette.
```

### P4 — near-edge 2–6 px retry

```text
Use case: precise-object-edit
Asset type: ecommerce catalog door-finish variant
Input images: Image 1 is the sole canonical edit target and the only reference. Fresh independent regeneration from Image 1 only.
Primary request: Re-render the same complete straight-on single-leaf door assembly from Image 1 and change only the finish of leaf and matching frame to FINISH_SPEC. Keep the lever and cylinder dark graphite metal.
Invariants: exactly one flat unpaneled slab leaf; complete top header and shallow inner bevel; both full-height jambs and lower ends; original narrow leaf gaps; exactly one short horizontal lever on one circular rosette and one separate circular cylinder below it on the left in the original positions. No panels, grooves, seams, molding, hinges, peephole, threshold, or extra hardware. Straight-on orthographic view.
Background: pure-white seamless catalog canvas only.
Composition/framing: mandatory extreme 408:1105 proportion, width/height 0.3692. Scale the whole complete assembly to virtually touch all edges while retaining a continuous white safety hairline. At about 762 px output width, the outermost visible frame must begin 2–6 pixels from left and end 2–6 pixels from right; same 2–8 pixel target at top and bottom. Door coverage target 98–99%. No 12–15 px catalog padding. Preserve every frame contour and both lower ends; no actual contact, crop, clipping, conventional portrait canvas, zoom-out, shrink, tilt, or perspective.
Lighting/materials: clean neutral studio rendering, restrained realistic vertical texture, subtle edge shading only, no cast room shadow.
NO_LOGO: no logo, brand mark, badge, plaque, label, text, letters, numbers, microtext, pseudo-text, watermark, signature, QR code, icon, or symbol.
Avoid room, wall, floor, props, decoration, scene elements, extra geometry, ornamental detail, border graphic, or vignette.
```

### P5 — final positive-clearance edge-to-edge retry

```text
Use case: precise-object-edit
Asset type: tightly framed ecommerce catalog door variant
Input images: Image 1 is the sole canonical edit target and the only reference. Independent fresh rendering; do not use any earlier output.
Primary request: Re-render Image 1's exact single flat door and frame in FINISH_SPEC. Keep its dark graphite lever and separate cylinder.
Architecture lock: exactly one perfectly flat unpaneled slab; complete shallow-beveled header; complete left and right jambs through both bottom tips; same narrow leaf gaps; one short horizontal lever on one circular rosette plus one separate circular cylinder directly below, on the left. No added or lost component; no grooves, panels, seams, molding, hinges, peephole, threshold or extra hardware.
Canvas: pure white only, extreme narrow portrait exactly matching 408:1105 (0.3692).
Edge-to-edge composition: make the complete outer frame nearly edge-to-edge, larger than a conventional product cutout. At native width near 762 px, preserve a visible continuous white line only 2–5 pixels wide outside each of the four outer frame edges. Door/frame footprint 99% of canvas. Both bottom tips and every outer contour must be completely visible, never cut, with at least 2 white pixels separating them from the canvas boundary. Do not leave 10–15 px padding. Do not change aspect ratio, shrink, zoom out, crop, touch the boundary, clip, tilt or add perspective.
Finish/material: realistic restrained fine vertical wood texture, neutral studio illumination, subtle dimensional shading, no floor or cast scene shadow.
NO_LOGO: absolutely no logo, brand mark, badge, plaque, label, text, letters, digits, microtext, pseudo-text, watermark, signature, QR code, icon or symbol.
No room, wall, floor, prop, decoration, border art, vignette, extra geometry or extra hardware.
```

### P6 — minimum-margin maximum-scale revision

The following prompt was used literally for calls 24-32 after replacing only `FINISH` with the exact descriptor listed below.

```text
Edit ONLY the supplied original wl-j001 door reference and derive this fresh result from no generated image. Reproduce the exact same isolated door assembly in FINISH. Preserve the original extreme 408:1105 proportions and straight-on orthographic catalog view; exactly one completely flat unpaneled slab leaf with restrained realistic VERTICAL grain; the complete shallow-beveled top header; exactly two full-height side jambs; both lower frame tips extending to the bottom; the same narrow dark leaf gaps including the deep left reveal; exactly one short horizontal dark lever on one circular rosette and exactly one separate circular key cylinder below it on the left. Preserve the source's slight bottom relationship between leaf and the two lower jamb tips. No panel, groove, seam, molding, hinge, peephole, threshold or extra hardware. NO Wonly logo and no logo, brand, plaque, badge, label, text, letters, numbers, pseudotext, watermark, signature, QR code, icon or symbol. Pure #FFFFFF seamless background; no room, wall, floor, prop, shadow halo, border or vignette. Critical framing: enlarge the complete physical assembly until it reaches or nearly reaches all four canvas edges. Target 0–4 white pixels on every side; zero edge contact is preferred and acceptable where all outer contours, header corners and both bottom tips remain physically complete. Do not add a white mat, padding or breathing room, and do not crop any component.
```

Exact `FINISH` descriptors and call order:

- 24, `negro`: `deep matte black (negro)`.
- 25, `wengue`: `deep wenge, nearly black-brown (wengue)`.
- 26, `gris-oscuro`: `dark graphite gray (gris-oscuro)`.
- 27, `antracita`: `anthracite charcoal (antracita)`.
- 28, `nogal`: `medium-dark walnut (nogal)`.
- 29, `roble`: `warm light oak (roble)`.
- 30, `gris-claro`: `light cool gray (gris-claro)`.
- 31, `natural`: `natural pale wood (natural)`.
- 32, `blanco`: `clean matte white (blanco)`.

### P7 — mandatory direct-contact retry

The following prompt was used literally for calls 33 and 34 after replacing only `FINISH`.

```text
Edit ONLY the supplied original wl-j001 door reference, using no generated image. Reproduce this exact extreme 408:1105 straight-on single flat unpaneled door assembly in FINISH, with realistic restrained VERTICAL grain. Preserve the complete shallow-beveled top header, both full-height jambs and both lower frame tips; the same deep dark left reveal and narrow gaps; exactly one short dark horizontal lever on one circular rosette and exactly one separate circular key cylinder below. Preserve the source's slight bottom relationship between the leaf and the two lower jamb tips. No panels, grooves, seams, molding, hinges, peephole, threshold or extra hardware. NO Wonly logo; no logo, text, badge, symbols or pseudotext. Pure #FFFFFF seamless background with no scene or shadow halo. Mandatory edge-to-edge framing: the intact outer assembly must make direct contact with all four canvas boundaries, targeting RGB<245 margins [0,0,0,0]. Do not add any visible white side band, mat, padding or breathing room. Edge contact is required, but no header corner, jamb contour, bottom tip or other physical component may be cut.
```

Exact substitutions:

- 33, `roble`: `FINISH` = `warm light oak (roble)`.
- 34, `natural`: `FINISH` = `natural pale wood (natural)`.

### P8 — natural full-canvas retry

The following call 35 prompt is literal.

```text
Edit ONLY the supplied original wl-j001 door reference, using no generated image. Reproduce this exact extreme 408:1105 straight-on single flat unpaneled door assembly in natural pale wood (natural), with realistic restrained VERTICAL grain. Preserve the complete shallow-beveled top header, both full-height jambs and both lower frame tips; the same deep dark left reveal and narrow gaps; exactly one short dark horizontal lever on one circular rosette and exactly one separate circular key cylinder below. Preserve the source's slight bottom relationship between the leaf and the two lower jamb tips. No panels, grooves, seams, molding, hinges, peephole, threshold or extra hardware. NO Wonly logo; no logo, text, badge, symbols or pseudotext. Pure #FFFFFF seamless background with no scene or shadow halo. The outer frame must span the FULL canvas width and height: its leftmost physical wood edge at x=0, rightmost wood edge at the final pixel, header at y=0, and both intact lower jamb tips reaching the final row. Do not show any white vertical band outside the frame. Target RGB<245 margins [0,0,0,0]. This is intentional edge contact, not cropping: all corners, contours and lower tips must remain complete.
```

## Call ledger

| Order | Finish | Attempt | Prompt | Generator ID | Outcome | Decision |
|---:|---|---:|---|---|---|---|
| 1 | negro | 1 | P1 + F-NEGRO | `exec-90611522-da23-41b3-8606-3526dcf5eaa2` | REJECT | Bottom RGB<245 bbox touched the canvas edge. |
| 2 | wengue | 1 | P1 + F-WENGUE | `exec-efc54503-e98d-4f8d-9a51-a0f83de57472` | REJECT | 13 px lateral proxy clearance; framing retries requested. |
| 3 | gris-oscuro | 1 | P1 + F-GRIS-OSCURO | `exec-570850e7-7ad7-48af-8126-c77915a43606` | RETIRED | Original selection preserved in `_rejected`; superseded by call 26 at `[0,0,0,0]`. |
| 4 | antracita | 1 | P1 + F-ANTRACITA | `exec-3a9cb943-968b-4df3-989f-213a5908ee5b` | REJECT | Superseded by tighter attempt 3. |
| 5 | nogal | 1 | P1 + F-NOGAL | `exec-7cd7ecb5-6b4c-434d-920c-55014141ed42` | REJECT | 14/15 px lateral proxy margins. |
| 6 | roble | 1 | P1 + F-ROBLE | `exec-ac0a9547-cbd4-4295-9daa-a331492ff964` | REJECT | 13/14 px lateral proxy margins. |
| 7 | natural | 1 | P1 + F-NATURAL | `exec-47db612d-020a-48bc-99ab-a73d972c8b27` | RETIRED | Original selection preserved in `_rejected`; superseded by call 31 with smaller aggregate padding. |
| 8 | gris-claro | 1 | P1 + F-GRIS-CLARO | `exec-0d5abfea-0bf3-4126-ac21-76475b3991f0` | REJECT | Superseded by tighter right/bottom framing. |
| 9 | blanco | 1 | P1 + F-BLANCO | `exec-18d4a4c6-fba1-4138-9294-4a6d5a92f6e4` | REJECT | Larger conservative light-edge bbox than retry. |
| 10 | wengue | 2 | P2 + F-WENGUE | `exec-645ea393-0035-4bbe-b94a-9f84d64436d6` | REJECT | Still 13 px on both lateral sides. |
| 11 | gris-oscuro | 2 | P2 + F-GRIS-OSCURO | `exec-dc51a4fa-b34c-400a-94b4-a5d21aa83635` | REJECT | Did not improve selected attempt 1. |
| 12 | antracita | 2 | P2 + F-ANTRACITA | `exec-e74b2a6f-c0ed-4f31-8c51-3f9920ef5f79` | REJECT | Right RGB<245 bbox touched the canvas edge. |
| 13 | wengue | 3 | P3 + F-WENGUE | `exec-4f97c59c-05e8-4d14-85da-ae75fc1c237c` | REJECT | 13 px left and 14 px bottom; superseded. |
| 14 | gris-oscuro | 3 | P3 + F-GRIS-OSCURO | `exec-e0e09e0a-b622-420e-a625-33d1e008930f` | REJECT | Worse than selected attempt 1. |
| 15 | antracita | 3 | P3 + F-ANTRACITA | `exec-bc3bc45a-2687-4cac-9851-aa6d74f53ac1` | RETIRED | Original selection preserved in `_rejected`; superseded by call 27 at `[0,0,0,0]`. |
| 16 | nogal | 2 | P4 + F-NOGAL | `exec-7ddd4731-0428-4e4b-a23f-dc95b6f1a8ab` | RETIRED | Original selection preserved in `_rejected`; superseded by call 28 at `[4,3,4,0]`. |
| 17 | roble | 2 | P4 + F-ROBLE | `exec-9923ef18-a885-4362-975b-6ec6e2265176` | RETIRED | Original selection preserved in `_rejected`; superseded by call 33 at `[0,0,0,0]`. |
| 18 | gris-claro | 2 | P4 + F-GRIS-CLARO | `exec-aee6a531-4d57-4441-bd01-421ea829221a` | RETIRED | Original selection preserved in `_rejected`; superseded by call 30 at `[0,0,0,0]`. |
| 19 | natural | 2 | P4 + F-NATURAL | `exec-3308e6f1-a516-4429-b14b-9f0307315fd5` | REJECT | 14 px left and 15 px bottom; worse than attempt 1. |
| 20 | blanco | 2 | P4 + F-BLANCO | `exec-cded35c5-18c2-4b4a-97b2-db06e683dc58` | RETIRED | Original selection preserved in `_rejected`; superseded by call 32 at `[5,4,2,4]`. |
| 21 | negro | 2 | P5 + F-NEGRO | `exec-109dda57-a3de-4d34-85a7-d79fd67313e4` | RETIRED | Original selection preserved in `_rejected`; superseded by call 24 at `[0,0,0,0]`. |
| 22 | wengue | 4 | P5 + F-WENGUE | `exec-1d669a5e-a698-4bd5-81b9-157992bce7fb` | RETIRED | Original selection preserved in `_rejected`; superseded by call 25 at `[0,0,0,0]`. |
| 23 | gris-oscuro | 4 | P5 + F-GRIS-OSCURO | `exec-15c062eb-5c0b-4eaf-8427-ed62e202220d` | REJECT | 14/13 px lateral proxy margins; worse than attempt 1. |
| 24 | negro | 3 | P6 + deep matte black | `exec-0edfbe37-271f-46c6-927a-b0c49aeb8774` | PASS | RGB<245 `[0,0,0,0]`; complete native contour. |
| 25 | wengue | 5 | P6 + deep wenge | `exec-96560c60-97b2-468d-a53c-9ff430c658c8` | PASS | RGB<245 `[0,0,0,0]`; complete native contour. |
| 26 | gris-oscuro | 5 | P6 + dark graphite gray | `exec-9489d528-80e7-4742-ae79-bf9f7f7d144a` | PASS | RGB<245 `[0,0,0,0]`; complete native contour. |
| 27 | antracita | 4 | P6 + anthracite charcoal | `exec-24292073-71f5-4f4e-a269-55a4a35576f6` | PASS | RGB<245 `[0,0,0,0]`; complete native contour. |
| 28 | nogal | 3 | P6 + medium-dark walnut | `exec-35b5cd63-c940-40a8-aa5f-d6a9bedab4d9` | PASS | RGB<245 `[4,3,4,0]`; complete native contour. |
| 29 | roble | 3 | P6 + warm light oak | `exec-d26e2104-2342-493b-a930-5d9a5a0c0be1` | REJECT | Valid `[11,9,10,0]` result superseded by tighter call 33. |
| 30 | gris-claro | 3 | P6 + light cool gray | `exec-73aaf237-8dfa-402e-a90f-d3adaf1cb982` | PASS | RGB<245 `[0,0,0,0]`; complete native contour. |
| 31 | natural | 3 | P6 + natural pale wood | `exec-bbbd29b3-f57f-48ab-80ab-285a41ade122` | PASS | RGB<245 `[12,0,0,0]`; smallest aggregate natural margin and complete native contour. |
| 32 | blanco | 3 | P6 + clean matte white | `exec-b442e93b-5a75-43b0-838d-31484806615a` | PASS | RGB<245 `[5,4,2,4]`; complete native contour. |
| 33 | roble | 4 | P7 + warm light oak | `exec-519a0156-6513-4f78-afad-92381782511d` | PASS | RGB<245 `[0,0,0,0]`; complete native contour. |
| 34 | natural | 4 | P7 + natural pale wood | `exec-1ec1e234-206a-41d5-84d0-e3bbb59f07c0` | REJECT | Valid `[11,6,11,0]` result superseded by call 31's smaller aggregate margin. |
| 35 | natural | 5 | P8 | `exec-cca8d472-28e5-4c07-a7c7-6253f070958b` | REJECT | RGB<245 `[13,8,11,8]`; left exceeded the 12 px normal maximum and aggregate padding was worse. |

## Transfer and QA note

The nine current selections and all 26 rejected or retired attempts were copied byte-for-byte from the generator paths recorded in `manifest.json`. No filter, recolor, mask, crop, resize, composite, conversion, or pixel processing was used. Sharp was used only to decode/read metadata and calculate conservative RGB<245/RGB<250 foreground bounds; native-detail `view_image` inspection determined final completeness, logo absence, geometry, and visible padding.
