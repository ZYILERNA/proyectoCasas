# AI/x50 — ImageGen directo KEEP_WONLY

Fecha de cierre: 2026-08-14. Los diez PNG aceptados proceden de diez llamadas independientes al ImageGen integrado. Cada llamada usó únicamente:

- Máster arquitectónico: `output/ai-full-regeneration/masters/AI/x50/master-no-logo-ai-tight.png` (SHA-256 `bca5c8d0d592e830fe0c2f3a348389e5099131defcf6c81986e838330657c5a0`).
- Logo oficial: `public/images/logo-wonly.webp` (SHA-256 `f55b5ae0b73967e7395c9e8f16dedb07c7d20e430e03f9c3a289c348e9fb2e1b`).

Nunca se utilizó una salida generada como referencia. Tampoco se aplicaron filtros, recolor local, máscaras, recorte, redimensionado, composición o conversión a los activos aceptados. Las hojas situadas en `qa/` son derivados exclusivos de inspección y nunca deben promocionarse.

## Especificación común

```text
Use case: precise-object-edit
Asset type: front-facing e-commerce catalog product image for the AI/x50 security entrance door.
Input images: Image 1 is the sole architectural master and strictly controls the complete door, frame, proportions, panel layout and hardware. Image 2 is the sole official WONLY logo reference.
Primary request: create a new independent AI-generated photorealistic image of the complete AI/x50 door, changing only its requested finish while preserving every architectural element. Add exactly one official “WONLY” mark, matching Image 2 exactly, small, clean and horizontal on a subtle dark plaque in the upper-right area of the wide top door panel.
Composition/framing: strict straight-on orthographic front view. Keep the complete outer frame visible and nearly touching all four canvas edges: 0–8 px near-white exterior margin, absolute maximum 11 px, and more than 98% coverage on both axes. Never crop the frame.
Architecture invariants: exact tall single-leaf proportions; complete thick stepped outer frame and bottom sill; wide solid top panel and its single horizontal seam; lower leaf with a narrow left section of fine vertical ribs and a large smooth right section; same tall slim black electronic keypad lock on the left ribbed section; same separate lower black rectangular reader module; all corners, seams, ribs and both hardware modules fully visible and unchanged.
Text: exactly one “WONLY”, spelled W-O-N-L-Y and matching Image 2. No other letters, words, digits, labels, badges, pseudo-writing or watermark. The keypad may contain only tiny non-alphabetic functional dots/icons.
Scene/backdrop: plain near-white studio background visible only in the tiny exterior margin; no room, wall, floor plane, baseboard, horizon, pedestal, props or exterior cast shadow.
Style/medium: photorealistic premium product catalog render, crisp straight edges, accurate materials and neutral even studio lighting.
Avoid: perspective, angled view, extra white space, thick border, cropped frame, altered hardware, missing reader, extra grooves or seams, handles, door viewer, duplicate logo, misspelled logo or pseudotext.
```

## Bloques de acabado usados

- `original` — grafito gris original, metal premium, microrranura únicamente en la zona izquierda y panel principal liso.
- `negro` — negro profundo mate, con separación tonal suficiente para conservar toda la geometría.
- `wengue` — madera wengué chocolate muy oscuro con veta vertical fina; marco exterior grafito.
- `gris-oscuro` — gris carbón oscuro, distinguible del negro.
- `antracita` — gris antracita neutro, entre carbón y gris medio.
- `nogal` — nogal marrón medio-oscuro con veta vertical fina; marco exterior grafito.
- `roble` — roble dorado claro, cálido pero no anaranjado, con veta vertical fina; marco exterior grafito.
- `gris-claro` — gris frío claro, claramente gris y con marco ligeramente más oscuro.
- `natural` — madera natural rubia muy clara, beige pálido neutro y menos dorado que el roble; marco exterior grafito.
- `blanco` — blanco mate suave con sombreado gris frío sutil; marco gris claro visible contra el fondo.

## Resultado

Las diez salidas fueron aceptadas en el primer intento. La auditoría confirma diez hashes únicos, marco completo, arquitectura y herrajes conservados, un único logo oficial WONLY por imagen, cero texto adicional o pseudotexto y márgenes máximos de 3–11 px. Todos los activos superan el 98% de cobertura en ambos ejes. No se escribió en `public`.
