# PVC/wl-p005 — ImageGen directo NO_LOGO

Estado final: PASS 10/10, 2026-08-14. Todos los activos aceptados proceden de llamadas independientes al ImageGen integrado que referenciaron únicamente `output/ai-full-regeneration/new-defects/PVC/wl-p005/master-no-logo-ai.png` (SHA-256 `19ac3f0fbe589dc59930c941ab025ea1d10304e6ceba1b408a477997cada7d50`). Nunca se usó una salida generada ni una referencia de logo como entrada.

## Reglas comunes de la serie

Conservar una sola hoja PVC alta y estrecha, el marco exterior rectangular completo, el dintel, una única moldura interior grande de doble línea con esquinas redondeadas, una única manilla horizontal plateada sobre roseta circular oscura a la izquierda y un único cilindro circular separado directamente debajo. Vista frontal ortográfica, sin duplicar, mover, espejar, rediseñar ni recortar ningún componente. Fondo blanco de catálogo; objetivo de margen 0–8 px y tolerancia absoluta 11 px solo con marco completo y cobertura superior al 98%.

Cero logo, marca WONLY, texto, letras, cifras, pseudotexto, pegatina, insignia o marca de agua. Cero filtros, recolor, máscaras, crop, resize, composición, conversión, publicación o promoción.

Acabados aceptados: original blanco, negro, wengué, gris oscuro, antracita, nogal, roble, gris claro, madera natural rubia y blanco.

## Prompt exacto de recuperación de `natural`

```text
Use case: product-mockup
Asset type: e-commerce catalog door image.
Input image: Image 1 is the sole structural reference and edit target.
Primary request: Generate a fresh photorealistic natural-finish version of exactly the PVC/wl-p005 door in Image 1. Change only the surface finish to pale blond natural wood, light warm beige-gold, with restrained fine vertical grain.
Architecture invariants: Preserve the exact tall narrow single-leaf proportions, the complete rectangular outer frame and head rail, and exactly one large tall rounded-rectangle double-line inset molding on the leaf. Preserve exactly one straight horizontal silver lever on one round dark rosette at the left, plus exactly one separate round dark key-cylinder escutcheon directly below it. Keep their size, spacing, side, height, orientation, and count. Do not add, remove, duplicate, move, redesign, mirror, or crop any frame, molding, lever, rosette, cylinder, hinge, panel, seam, trim, or hardware.
Composition/framing: strict straight-on orthographic front view matching Image 1. Keep the entire outermost frame visible, but make it nearly touch every canvas edge: target 0–6 pixels of pure white border on each side, never more than 8 pixels. The full door must occupy over 99% of canvas height. Do not zoom out. No room, wall, floor, plinth, perspective angle, cast shadow, wide whitespace, or cut-off frame.
Backdrop/lighting: pure white catalog background, neutral even studio lighting, no colored cast.
Branding/text: absolutely no logo, no WONLY mark, no brand, no badge, no label, no letters, no numbers, no words, no pseudotext, no watermark.
Constraints: This is one new direct AI generation from Image 1 only. Do not use or imitate any generated output.
```

El primer intento nuevo (`exec-b71c7751-ac64-430a-a648-51ec25ffb222`) pasó el QA visual y mecánico: márgenes 3/2/2/0 px (izquierda/arriba/derecha/abajo), cobertura vertical 99,904% con umbral RGB 245 y marco íntegro. Por ello no se consumió el segundo intento autorizado. Los dos rechazos históricos de `natural` y el estado bloqueado anterior permanecen archivados en `_rejected/`.
