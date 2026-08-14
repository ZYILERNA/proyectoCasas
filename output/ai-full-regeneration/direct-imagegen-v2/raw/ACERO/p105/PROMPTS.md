# ACERO/p105 — direct ImageGen prompt set

Every attempt was a separate built-in ImageGen call referencing only:

`output/ai-full-regeneration/masters/ACERO/p105/master-no-logo-ai-tight.png`

Common prompt constraints:

- Generate a fresh independent product render from the original master only.
- Preserve the complete P105 frame, header, central stile, two rails, four fine-fluted fields, and long smart-lock/pull-handle geometry.
- Keep every flute rigid, ruler-straight, vertical, parallel, evenly spaced, and continuous.
- Render the lock body and distinct inset rectangular pull-handle with completely blank surfaces.
- Render zero WONLY, other logo, letters, words, numbers, icons, pseudo-text, micro-labels, or watermark.
- Keep the full frame front-on and 0–8 px from the canvas edges; allow at most 11 px only with occupancy above 98%.
- Do not use a filter, recolor operation, mask, crop, resize, composite, pasted patch, generated-output reference, or logo reference.

Finish requests:

- `original`: original deep midnight blue-black satin metal.
- `negro`: satin lacquered black, approximately `#151515`.
- `antracita`: anthracite charcoal satin, approximately `#34383D`.
- `gris-oscuro`: dark cool-gray satin, approximately `#4A4D52`.
- `gris-claro`: light warm-gray satin, approximately `#A5A19A`.
- `blanco`: warm satin white, approximately `#ECEBE6`, distinct from the pure-white background.
- `natural`: restrained warm natural honey-tan, approximately `#C19A6B`.
- `roble`: refined warm oak tone, approximately `#A8784E`, with no knots or busy grain.
- `nogal`: refined dark walnut tone, approximately `#5C3524`, with no knots or busy grain.
- `wengue`: deep espresso wengué brown, approximately `#3F291B`, with no knots or busy grain.

Corrective attempts changed only the failed requirement: lock marks (`original`), framing (`gris-oscuro`, `blanco`), or hardware preservation (`antracita`).

Final `antracita` resolution used built-in output `exec-1de59f90-58cd-4a7f-9769-b1bea7cc79a8.png`. Its prompt explicitly required both the upper keypad/sensor body and the separate long inset pull-handle, ruler-straight fluting, zero branding or text, and the full frame within 0–6 px. It passed at 4/4/5/5 px.
