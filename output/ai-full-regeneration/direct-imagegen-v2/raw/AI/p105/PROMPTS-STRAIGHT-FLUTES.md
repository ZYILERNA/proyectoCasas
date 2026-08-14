# AI/p105 straight-flutes and blank-lock recovery — 2026-08-14

Four independent built-in ImageGen calls were used for `original`, `antracita` and `negro`. Every call referenced only:

`output/ai-full-regeneration/masters/AI/p105/master-no-logo-ai-tight.png`

No generated output or logo was supplied as a reference. No filter, recolor, mask, crop, resize, composite, conversion or public write was used.

## Shared prompt requirements

```text
Use case: precise-object-edit. Image 1 is the sole and only geometry reference for the exact AI/p105 model.
Preserve the strict straight-on p105 architecture: complete thick beveled outer frame, both lower feet and full threshold, full-width smooth top header, the same off-center smooth vertical stile, exactly one aligned horizontal rail, exactly four fluted rectangular fields, and one slim black lock/handle in the same position and proportions.
All four fluted fields must contain perfectly straight, rigid, parallel, vertical ribs with identical regular spacing and uniform width from top to bottom. Every highlight, shadow edge and groove boundary must be straight. No wave, curve, bend, serpentine path, wobble, ripple, kink, melting, bulge, convergence, divergence, drift, irregular spacing or local distortion.
Preserve the elongated outer lock casing and the physical lower pull-handle/grip geometry. Make every visible lock face completely smooth, plain and empty. Remove camera, sensor, lens, keypad, dots, matrix, screen content, buttons, indicators, icons and every mark. Zero logo, brand, text, microtext or pseudotext anywhere.
Show the complete intact frame, feet and threshold almost touching the canvas: target 0–4 px, maximum 8 px, no crop. Pure near-white exterior sliver only; no scene, floor, wall, shadow, props or watermark.
```

Finish directives were appended independently: canonical deep blue-charcoal/graphite satin for `original`, neutral anthracite satin for `antracita`, and deep matte black for `negro`.

| Finish | Attempt | Generator ID | Result |
| --- | ---: | --- | --- |
| original | 1 | `exec-f0e811cc-3880-4f03-a700-a3f5a543dafa` | PASS, activated |
| antracita | 1 | `exec-2df88ffe-565f-4c38-a483-d4db1cedf573` | PASS, activated |
| negro | 1 | `exec-e74229d6-ed52-46bf-ad17-07d9bf26632c` | REJECTED: right margin 10 px and 97.964% horizontal coverage |
| negro | 2 | `exec-ce0b4437-145d-4610-8cf8-0fd74d4bc3ed` | PASS, activated |

The second `negro` prompt repeated every invariant and tightened framing to 0–3 px on both horizontal sides while keeping the complete frame intact.
