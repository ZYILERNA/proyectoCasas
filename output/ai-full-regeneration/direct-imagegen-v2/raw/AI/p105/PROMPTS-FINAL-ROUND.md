# AI/p105 final ImageGen round — 2026-08-14

Four independent built-in ImageGen calls were made. Every call referenced only:

`output/ai-full-regeneration/masters/AI/p105/master-no-logo-ai-tight.png`

No generated output or logo was supplied as a reference.

## Shared prompt

> Use case: product-mockup. Asset type: premium catalogue door asset. Input image: the sole supplied image is the geometry and architecture reference. Primary request: Generate the exact p105 entrance-door model in the requested finish. Subject and invariants: Strict straight-on orthographic front elevation. Preserve the complete thick beveled outer frame, both full lower frame feet and threshold, the full-width smooth top header, the same off-center smooth vertical stile, exactly one aligned horizontal rail, exactly four vertically fluted rectangular fields in identical positions and proportions, and exactly one slim black smart lock in the same position and scale. Do not redesign, mirror, duplicate, add or remove any architectural part. Smart-lock specification: The lock may contain ONLY one small round camera near the top, one clean regular dot matrix, and one blank tall rounded-rectangular control. The entire lock region below the bottom edge of that rectangular control, all the way to the rounded physical bottom tip, MUST be a single perfectly smooth, empty, uninterrupted matte-black face. Explicitly OMIT the tiny emblem visible at the bottom of the reference lock. Do not reproduce or replace it. There must be absolutely zero line, stroke, bar, pair of strokes, wing, chevron, seam, button, icon, insignia, badge, emblem, letter, number, logo, brand, text, microtext or pseudotext in that lower region. No symbol of any size or contrast, even faint embossed detail. The lock ends with featureless black material. Branding: Entire image fully unbranded; no logo, watermark, writing or pseudotext anywhere. Composition/framing: Complete frame and threshold intact and uncropped, but enlarged to sit virtually flush with the canvas. Target 0–2 px exterior white margin on every side and never show a visible white border. At least one outer vertical frame edge and the top or threshold should meet the canvas edge. Absolute maximum 11 px on any one side only if both horizontal and vertical product spans remain above 98%. Keep both lower feet and full threshold visible. Pure white catalogue background, no room, wall, floor plane, cast shadow, prop or scenery. Lighting/style: photorealistic premium product rendering, controlled studio modeling, sharp architectural geometry.

Each call appended only its finish-specific material directive.

| Finish | Generator ID | Result |
| --- | --- | --- |
| nogal | `exec-7035efec-b998-445b-a618-b09f0cc8b805` | PASS, activated |
| gris-claro | `exec-a420883c-8e03-4794-83c1-be6c308d2f04` | REJECTED, 97.738% horizontal coverage and lower-lock mark |
| natural | `exec-31966781-4c27-4114-b854-f9681746d6a0` | PASS, activated |
| blanco | `exec-de20fc4d-9270-410d-9d7e-1fe72837ad72` | PASS, activated |
