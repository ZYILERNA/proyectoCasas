# AI/p105 recovery prompts — 2026-08-14

Every call was an independent built-in ImageGen edit and referenced only:

`output/ai-full-regeneration/masters/AI/p105/master-no-logo-ai-tight.png`

No generated output or logo was used as a reference.

## Attempt 1 base prompt

> Generate a photorealistic, front-facing premium catalogue image of this exact p105 entrance-door model, using ONLY the supplied reference image for geometry. Preserve the complete p105 architecture exactly: the full thick beveled outer frame and bottom sill, full-width plain top header, the same off-center smooth vertical stile carrying the lock, one aligned horizontal rail, and exactly four vertically fluted rectangular fields in the same proportions. Preserve exactly one slim black smart lock in the same place and proportions. The lock may show ONLY: one small circular camera near its top, one regular plain dot matrix, and one blank vertical rounded-rectangular control. CRITICAL HARDWARE RULE: from the bottom edge of that blank vertical rectangular control all the way to the physical bottom tip of the lock, the surface must be one completely plain, smooth, uninterrupted matte-black area. Put absolutely nothing there: no horizontal strokes, no lines, no bars, no wings, no chevrons, no emblem, no insignia, no letter shape, no icon, no button, no badge, no mark, no logo, no brand, no text, no microtext and no pseudotext. The entire door image must be fully unbranded: zero logo or writing anywhere. Show the entire outer frame and sill intact, centered and nearly edge-to-edge on pure white: target only 0–4 pixels white margin on each center axis, never more than 8 pixels, with no room scene, floor, wall, shadow, prop, crop, or missing frame. Keep a strict orthographic front view and realistic premium product lighting.

The corresponding finish directive was appended independently for `original`, `wengue`, `nogal`, `gris-claro`, `natural` and `blanco`.

| Finish | Generator ID | Disposition |
| --- | --- | --- |
| original | `exec-b80e4d15-7be6-4ee7-8409-9a4afbe844c6` | rejected: margins |
| wengue | `exec-1382bd86-a3b0-48e3-b184-0652f54f06b7` | PASS candidate |
| nogal | `exec-71a5efbe-0bd6-42cb-a657-c6358b20c981` | rejected: margins |
| gris-claro | `exec-53e89b68-0945-4596-b7ab-a797ba1c77be` | rejected: margins and lock mark |
| natural | `exec-e8b32c7d-0446-4f66-8808-0dcdec571b29` | rejected: margins and lock mark |
| blanco | `exec-cece1fb9-e11d-4147-a84d-6b685d77dd85` | rejected: margins and lock mark |

## Attempt 2 base prompt

> Create a photorealistic straight-on catalogue image of the exact p105 entrance door in the sole supplied reference. Reproduce the architecture exactly: complete thick beveled outer frame with both lower feet and the full bottom sill, full-width plain top header, same off-center smooth vertical stile, one aligned horizontal rail, exactly four vertically fluted fields, identical proportions, and exactly one slim black smart lock in the same position. The lock may contain only one small circular camera, one neat plain dot matrix, and one blank vertical rounded-rectangle control. ABSOLUTE LOCK RULE: immediately below the lower edge of the blank rectangular control, continuing to the physical bottom tip of the lock, show a completely featureless uninterrupted matte-black surface. There must be no mark of any kind there—not even a faint stroke or tiny relief: no lines, bars, stacked strokes, wing shape, chevron, badge, emblem, insignia, letter, icon, logo, brand, text, microtext, pseudotext, extra button, seam, or replacement lower component. Zero branding or writing anywhere in the image. Preserve one lock only; do not add hardware. FRAMING RULE: make the complete outer frame as large as physically possible while remaining fully visible. The outermost frame must meet or nearly meet every canvas edge: 0–2 pixels of white at the left, top, right and bottom center axes, hard maximum 8 pixels. The center of the bottom sill itself must sit at the bottom canvas edge; do not leave a white strip beneath it. Keep both frame feet intact. Pure white background only, no room, wall, floor, shadow or props. Strict orthographic front view.

The corresponding finish directive was appended independently for every finish still failing after attempt 1.

| Finish | Generator ID | Disposition |
| --- | --- | --- |
| original | `exec-ff3da3c0-e5c4-4c8f-891e-92431dd60dbe` | rejected: right margin 9 px |
| nogal | `exec-4f85ae44-9768-42d0-b59c-fcc24bdbac5b` | rejected: margins |
| gris-claro | `exec-a6947bff-dd54-415b-9126-87a044b95948` | rejected: margins, lock stroke and flute distortion |
| natural | `exec-fb0419f6-29f4-4026-b60f-63991673a044` | rejected: lower-lock pseudomark |
| blanco | `exec-7d63a376-6b17-4c1b-9c0b-c852adad5a16` | rejected: lower-lock pseudotext |
