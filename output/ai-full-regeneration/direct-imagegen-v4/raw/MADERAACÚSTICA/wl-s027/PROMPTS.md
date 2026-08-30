# MADERAACÚSTICA/wl-s027 — direct built-in ImageGen prompt audit

All 20 audited PNGs came from 20 independent calls to the built-in ImageGen tool. Image 1 was always the sole reference:

    public/images/PUERTAS/MADERAACÚSTICA/wl-s027/original.webp

Reference SHA-256 before and after the run: `76f431646e8572f201d528eace94b1f5727a4c7fe53e7e77f625fef0906cd9c7`.

Policy: `NO_LOGO_MINIMAL_WHITE_MARGIN`. No generated output, logo image or secondary image was used as a reference. No filter, scripted recolor, mask, crop, resize, composite, format conversion or other pixel transformation was applied. Every accepted and rejected PNG in this package is a byte-for-byte copy of its built-in ImageGen result.

For the original 19-call package, this file records the audited operational prompt families and attempt mapping without claiming a character-for-character reconstruction of internal prompt normalization. The twentieth call is additionally recorded below verbatim from its complete local rollout event.

## Shared subject and invariant contract

~~~text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: regenerate the exact same wl-s027 door in {{FINISH_CLAUSE}}.
Scene/backdrop: pure clean white studio background; no floor line, room, props or external cast shadow.
Composition/framing: preserve the canonical 403:1069 extremely tall narrow straight-on view and enormous object scale. The source measures RGB<245 margins [1,4,0,0]. Prefer 0-6 px and normally never exceed 12 px. Right and bottom contact are permitted only because the source touches those edges and only when every molding and both lower endpoints are complete. Preserve a visible left and top hairline; never crop the silhouette.
Geometry invariants: complete two slim square-profile side posts; one straight layered top header plus inner beveled lintel; one very dark recessed full-height reveal immediately inside the left post; one thin warm vertical trim between the reveal and the leaf; one smooth flat leaf. Preserve the exact mirrored diagonal veneer: upper and lower opposing grain fields meet in one subtle horizontal chevron/arrow transition around 60% height. This is grain, not a raised panel or added groove.
Hardware invariants: exactly one short slim dark horizontal lever extending right from one circular rosette at the far left around 58% height; exactly one separate small circular dark key cylinder below; no visible hinges or additional hardware.
Finish invariants: change only the requested finish; retain all proportions, reveal, trim, grain transition, hardware placement, neutral light and camera alignment.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, rosettes, cylinders, hinges, seams, panels, grooves, glass, decoration, baseboard, pedestal, people, room scene or props.
~~~

## Finish clauses

- negro: deep neutral black wood veneer with restrained authentic diagonal grain and enough tonal separation to keep every frame edge readable.
- wengue: very dark espresso-brown wenge veneer with subtle near-black diagonal grain, visibly brown rather than neutral black.
- gris-oscuro: deep neutral dark-charcoal gray wood veneer, clearly gray rather than black.
- antracita: medium-dark cool graphite/anthracite wood veneer with restrained realistic grain.
- nogal: refined warm walnut brown veneer with elegant darker grain, neither orange nor red.
- roble: natural medium-light warm golden oak veneer with refined grain, beige-gold rather than orange.
- gris-claro: pale neutral cool-gray wood veneer with clearly defined contours against white.
- natural: pale untreated natural ash/beech veneer in light warm beige, not yellow-orange.
- blanco: bright neutral matte white wood veneer with subtle diagonal grain and gently shadowed contours, without gray or cream cast.

## Prompt families

### F1 — base source-scale generation

The shared contract above with the finish clause substituted. It requested the complete outer frame as large as possible from the first call, a 0–6 px preference, a 12 px normal maximum, exact tall aspect and source-faithful right/bottom contact only with an intact silhouette.

### F2 — targeted edge-gap retry

The invariant contract was repeated after an excessive margin, with explicit approximate raster targets: 2–6 px left and top, 0–6 px right, 0–4 px bottom and no edge over 12 px. Each retry started independently from `original.webp`.

### F3 — strict coordinate-lock retry

The same contract specified approximate outer-frame coordinates and requested more than 98% width / 99% height fill. Both F3 results were preserved as rejected because ImageGen returned a wrong `888x1771` wide aspect with large side padding.

### F4 — exact canonical scale retry

The shared invariants were simplified and the model was told to copy Image 1's exact canvas aspect, camera, object scale and `[1,4,0,0]` edge placement, without broad recentering. This produced the accepted gris-oscuro attempt 4 and a wengue result rejected for noncanonical left contact.

### F5 — wengue left-hairline correction

This wengue call again used only `original.webp` and explicitly restored a 2–6 px white hairline left of the complete post while retaining huge scale and source-faithful right/bottom placement. It was the former selection with a documented 13 px top exception and is now preserved byte-for-byte under `rejected/` after the tighter margin revision.

### F6 — literal wengue top-margin correction

The exact prompt below was recovered verbatim from the complete local rollout event for `exec-98027764-99a6-4642-b32c-fa3120ae0a65`. Image 1 was the sole referenced image and was the canonical `original.webp`.

~~~text
Use case: product-mockup
Asset type: e-commerce acoustic-door catalog finish variant
Input images: Image 1 is the sole reference and sole canonical geometry source.
Primary request: Regenerate the exact same wl-s027 door in very dark espresso-brown wenge veneer with subtle near-black diagonal grain, visibly brown rather than neutral black.
Scene/backdrop: pure clean white studio background; no floor line, room, props or external cast shadow.
Composition/framing: copy Image 1's exact 403:1069 extremely tall, very narrow straight-on canvas ratio (width/height approximately 0.37699), camera, object scale and edge placement. Make the complete door assembly enormous in the canvas: target 2–6 px of pure-white clearance at the left and top, 0–4 px at the right and bottom, and absolutely no edge above 12 px. The top header must sit closer to the top edge than in a 13 px-gap rendering. Right and bottom contact are permitted if needed, but every outer corner, both full square-profile side posts, the entire layered header/lintel, every reveal, and both lower post endpoints must remain fully visible and intact. Do not crop or broaden/recenter the composition.
Geometry invariants: complete two slim square-profile side posts; one straight layered top header plus inner beveled lintel; one very dark recessed full-height reveal immediately inside the left post; one thin warm vertical trim between the reveal and leaf; one smooth flat leaf. Preserve the exact mirrored diagonal veneer: upper and lower opposing grain fields meet in one subtle horizontal chevron/arrow transition around 60% height. This is grain, not a raised panel or added groove.
Hardware invariants: exactly one short slim dark horizontal lever extending right from one circular rosette at the far left around 58% height; exactly one separate small circular dark key cylinder below; no visible hinges or additional hardware.
Finish invariants: change only the wood finish; retain all proportions, dark reveal, warm trim, grain transition, hardware placement, neutral light and camera alignment.
NO_LOGO constraints: no WONLY logo, brand, badge, watermark, text, letters, numbers, symbols, signature, microtext or pseudotext.
Avoid: extra handles, rosettes, cylinders, hinges, seams, panels, grooves, glass, decoration, baseboard, pedestal, people, room scene, props, generous white padding, conventional portrait aspect or widened canvas.
~~~

## Complete attempt mapping

| Finish | Attempt | Prompt family | Built-in ImageGen ID | Result |
|---|---:|---|---|---|
| negro | 1 | F1 | `exec-b5403115-c592-48a2-a7fe-e979efc019bf` | accepted — complete frame, `[7,10,5,0]` |
| wengue | 1 | F1 | `exec-469e3646-29dd-4802-998d-173bd676f82c` | rejected — top margin 13 px before retries |
| wengue | 2 | F2 | `exec-f4b450d9-7fe5-4ea5-9597-420bc931e4f0` | rejected — margins `[17,15,18,14]` |
| wengue | 3 | F3 | `exec-ddc314d7-cebf-4689-971a-cce1148b191e` | rejected — wrong `888x1771` aspect and broad sides |
| wengue | 4 | F4 | `exec-10e667c2-9732-4ab7-95d6-923dc497b1df` | rejected — noncanonical left contact `[0,10,1,0]` |
| wengue | 5 | F5 | `exec-b17bee31-a62a-4e5a-83a7-c16eb08dddae` | rejected — former selection displaced and preserved byte-for-byte; top margin `[8,13,2,0]` exceeded 12 px |
| wengue | 6 | F6 | `exec-98027764-99a6-4642-b32c-fa3120ae0a65` | accepted — complete frame, `[10,10,8,0]`; maximum margin 10 px |
| gris-oscuro | 1 | F1 | `exec-03c85c93-edad-444a-a067-336fc131e9f6` | rejected — broad margins `[17,14,20,55]` |
| gris-oscuro | 2 | F2 | `exec-ddc869d8-db00-410a-bb74-bd9f55ccad56` | rejected — margins `[15,13,12,18]` |
| gris-oscuro | 3 | F3 | `exec-649f9f6d-c30a-4271-bbfb-f848dc57d8d2` | rejected — wrong `888x1771` aspect and broad sides |
| gris-oscuro | 4 | F4 | `exec-acaf8f63-3a0e-4640-b24c-6978cb431b92` | accepted — complete frame, `[10,12,4,0]` |
| antracita | 1 | F1 | `exec-13afb1b4-afae-4735-a221-32bbab74debf` | rejected — top margin 13 px |
| antracita | 2 | F2 | `exec-98a7715b-34b4-4c1b-b839-2b9ba0ddb9ac` | accepted — complete frame, `[11,11,8,0]` |
| nogal | 1 | F1 | `exec-236bc9d7-74f1-4983-b6a7-a77666264a8f` | accepted — complete frame, `[8,12,7,5]` |
| roble | 1 | F1 | `exec-52df6e83-6248-496a-89d5-5b36b4b0f5b9` | rejected — left/top 14/15 px |
| roble | 2 | F2 | `exec-1bb7f0b1-e0cf-429b-a7ff-4ce3d064ef23` | accepted — complete frame, `[7,12,5,0]` |
| gris-claro | 1 | F1 | `exec-23cf36af-b9f3-4072-9f26-c0a01e14319d` | accepted — complete pale frame, `[9,12,8,8]` |
| natural | 1 | F1 | `exec-3dbc23b9-4384-4abb-b917-d602c115058c` | accepted — complete frame, `[12,12,7,4]` |
| blanco | 1 | F1 | `exec-9e3744c5-1805-46ca-abd4-71da443ebe47` | rejected — top margin 13 px |
| blanco | 2 | F2 | `exec-8d6f4b9a-7d23-4d71-9e2a-86a3babce003` | accepted — complete white frame, `[5,8,4,3]` |

Totals: 20 independent built-in ImageGen calls, 9 accepted and 11 rejected.

## Framing and native-inspection notes

Five accepted PNGs measure 0 px at the bottom. This is not a crop or resize: the canonical source also touches the bottom, and native-detail inspection confirms both complete lower post endpoints and the full silhouette in negro, wengue, gris-oscuro, antracita and roble.

Wengue attempt 6 replaces the former 13 px top-gap exception with `[10,10,8,0]`. The object fills 97.662% of width and 99.511% of height; native inspection confirms a complete outer frame, both lower endpoints, correct chevron grain, exact lever/cylinder hardware and no logo. The displaced attempt 5 and every earlier alternative remain preserved under `rejected/`. No postprocessing was used.

For gris-claro and blanco, RGB<245 is conservative because the finish approaches the pure-white background. Both were inspected at native detail and retain complete, visible contours.

No file under `public/` was touched, and no accepted or rejected PNG was processed after generation.
