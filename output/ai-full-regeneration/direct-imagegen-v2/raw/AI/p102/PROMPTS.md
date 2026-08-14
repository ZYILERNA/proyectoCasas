# AI/p102 — ImageGen directo KEEP_WONLY

Fecha de cierre: 2026-08-14. Los diez PNG aceptados proceden de llamadas independientes al ImageGen integrado. Cada llamada usó únicamente:

- Máster arquitectónico: `output/ai-full-regeneration/masters/AI/p102/master-no-logo-ai-tight.png` (SHA-256 `75e228a47241527564e8215b9ed59da44df0c5bcc3c537e5ec72346ba9a06bc1`).
- Logo oficial: `public/images/logo-wonly.webp` (SHA-256 `f55b5ae0b73967e7395c9e8f16dedb07c7d20e430e03f9c3a289c348e9fb2e1b`).

Nunca se utilizó una salida generada como referencia. Tampoco se aplicaron filtros, recolor local, máscaras, recorte, redimensionado, composición o conversión.

## Especificación común

```text
Use case: precise-object-edit
Asset type: front-facing e-commerce catalog product image for the AI/p102 security entrance door.
Input images: Image 1 is the sole architectural master and controls the door, frame, proportions and hardware. Image 2 is the sole official WONLY logo reference.
Primary request: recreate the complete AI/p102 door from Image 1 as a new AI-generated image, changing only the leaf finish. Add exactly one official logo reading “WONLY”, matching Image 2 exactly, small and horizontal in the upper-right area of the leaf.
Composition/framing: strict straight-on orthographic view. Keep the complete outer frame visible and nearly touching the canvas edges: 0–8 px exterior margin, absolute tolerance 11 px. Never crop the frame.
Architecture invariants: exact single-leaf proportions; complete thick dark stepped frame; thin horizontal seam near the top; same narrow vertical metallic inlays left of center; same tall black electronic smart lock on the left; all corners, sill, lock and inlays fully visible.
Text: exactly one “WONLY”, spelled W-O-N-L-Y. No other letters, words, badges, labels or pseudotext. The keypad may contain only small round functional dots/icons, never letters or numbers.
Scene/backdrop: plain near-white studio background visible only in the tiny exterior margin; no room, wall, floor plane, baseboard, horizon, pedestal or props.
Style/medium: photorealistic premium product catalog render, crisp edges, accurate materials and even studio lighting.
Avoid: perspective, extra margins, thick white border, cropped frame, altered lock, missing inlays, extra grooves, extra objects, exterior shadows, watermark, signature, duplicate logo, misspelled logo or pseudotext.
```

## Acabados

- `original`: grafito gris oscuro con microrranura vertical, fiel al máster.
- `negro`: negro profundo con microrranura vertical.
- `wengue`: madera wengué marrón muy oscuro con veta vertical fina.
- `gris-oscuro`: gris carbón oscuro con microrranura vertical.
- `antracita`: antracita con microrranura vertical.
- `nogal`: nogal marrón medio-oscuro con veta vertical fina.
- `roble`: roble dorado claro con veta vertical fina.
- `gris-claro`: gris frío claro con microrranura vertical.
- `natural`: madera natural rubia muy clara con veta vertical fina.
- `blanco`: blanco mate con microrranura vertical sutil.

La auditoría final confirma diez hashes únicos, marco completo, un único logo oficial WONLY por imagen, cero texto adicional o pseudotexto y margen máximo observado de 9 px dentro de la tolerancia aprobada.
