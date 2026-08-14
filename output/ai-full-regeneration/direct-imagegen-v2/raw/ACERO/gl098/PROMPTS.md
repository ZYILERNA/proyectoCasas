# Prompt set — ACERO/gl098

Modo: **built-in ImageGen**, con una llamada independiente por acabado.

Cada una de las diez llamadas usó únicamente:

- Imagen 1, objetivo de edición: `output/ai-full-regeneration/pilots/ACERO/gl098/master-no-logo-ai-tight.png`
- Imagen 2, referencia oficial del logotipo: `public/images/logo-wonly.webp`

Ninguna llamada usó como referencia una salida generada anteriormente.

## Especificación común

```text
Use case: precise-object-edit
Asset type: tightly bounded vertical e-commerce product image for ACERO gl098.
Input images: Image 1 is the only edit target and exact canonical door architecture. Image 2 is only the official WONLY wordmark spelling/shape reference.
Primary request: Create a fresh independent AI rendering from Image 1. Keep the exact complete frontal ACERO gl098 architecture unchanged: full chamfered outer frame with all four corners, full upper horizontal transom and its straight lower seam with small metal hinge caps, three lower vertical regions (narrow left panel, medium central brushed-silver metal strip, broad right panel), full bottom threshold, and exactly one slim black smart lock in its original position on the central strip. Apply only the requested finish to the outer frame, transom, left panel and right panel. Keep the central strip brushed silver metal and the smart lock black.
Logo: Add exactly one correctly spelled official “WONLY” wordmark, matching Image 2, small and clean on the upper-right area of the transom, directly on the surface without any badge, plaque, rectangle, halo or patch. Zero other text, letters, numbers, microtext or pseudotext anywhere, including on the lock.
Scene/backdrop: pure solid white only.
Composition/framing: strict straight-on orthographic elevation. Complete door and frame maximized almost edge-to-edge. The outermost frame must touch or sit only 0–4 pixels from left, top, right and bottom edges; virtually no white. Preserve the complete product and never crop any frame corner or threshold.
Style: photorealistic premium catalog product rendering.
Constraints: one door, one frame, one lock, exactly one WONLY. Preserve proportions, seams, hardware, lock location and architecture. No output from another generation may influence this image.
Avoid: extra marks, invented glyphs, misspelled logo, duplicate logo or lock, logo background shape, room, wall, floor, cast shadow, reflection, perspective, broad white border, crop, extra object or watermark.
```

## Directivas por acabado y llamada

| Acabado | Directiva de superficie | Llamada |
| --- | --- | --- |
| original | Grafito/carbón original, metal cepillado sutil. | `exec-55c848aa-6d59-45d9-bbec-cfd00f8b38f6` |
| negro | Negro neutro profundo mate, con definición tonal. | `exec-9145f7e2-9bcc-4077-8935-872f74b7c6f9` |
| wengue | Wengué espresso muy oscuro, veta vertical fina. | `exec-daea0637-8347-4e12-89c0-a7ca217c49ce` |
| gris-oscuro | Gris oscuro neutro, más claro que negro y antracita. | `exec-cde532a9-099a-4541-8bc9-985f8cc93645` |
| antracita | Carbón/antracita frío, oscuro pero no negro puro. | `exec-e7e54bde-caa8-4607-bb50-27b31d52a4b5` |
| nogal | Nogal medio cálido, marrón rico y veta vertical natural. | `exec-16320154-f237-4070-b493-96fcfb3edf84` |
| roble | Roble miel/dorado, veta vertical refinada. | `exec-24c34f9d-f314-4f60-81c0-64700d125ee6` |
| gris-claro | Gris claro neutro mate; bordes más oscuros para definición. | `exec-befdedf6-7432-4a98-8921-bc9cabcc1ecc` |
| natural | Madera natural pálida beige, menos dorada que roble. | `exec-845a6836-ee11-406f-820d-e6398866f57f` |
| blanco | Blanco cálido/marfil muy claro, bordes grises definidos. | `exec-7b2329a7-4498-4de8-a2fa-cff933fe88f9` |

Todos los acabados pasaron en el primer intento; no se aplicaron filtros, recoloreado, máscaras, composición, recorte, redimensionado, conversión ni posprocesado de píxeles a los PNG activos.
