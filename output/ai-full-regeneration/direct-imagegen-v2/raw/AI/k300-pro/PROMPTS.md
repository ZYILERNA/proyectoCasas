# Prompt set — AI/k300-pro v2

Modo: **built-in ImageGen**. Las llamadas nuevas fueron independientes y usaron una sola referencia:

`output/ai-full-regeneration/pilots/AI/k300-pro/master-no-logo-ai-tight.png`

No se usó referencia de logo ni salida generada como entrada.

## Especificación común de las llamadas nuevas

```text
Use case: precise-object-edit
Asset type: tightly bounded vertical e-commerce product image for AI k300-pro.
Input image: Image 1 is the only edit target and sole reference. Generate a fresh independent AI rendering from this master only; do not use any generated output.
Preserve the exact complete front-facing K300 Pro architecture: full beveled outer frame, two broad fields of perfectly vertical narrow louvres, one wide smooth central band, one narrow uninterrupted brushed-silver vertical strip immediately to its right, full lower edge, and exactly two physically separate stacked black access modules on the smooth band.
Hardware: exactly two separate black rectangular casings with a clear gap and no connector. Upper casing may contain only a round camera and simple separated circular functional controls. Lower casing is a plain geometric black module. Zero dash, letter, digit, microtext, pseudotext, icon, logo, badge or watermark.
Scene: pure white. Strict straight-on orthographic elevation. Complete frame almost touches every canvas edge, with 0–4 px white and no crop.
No filters, recoloring, masks, crop, resize, composite or local pixel repair.
```

## Acabados nuevos y llamadas

| Acabado | Intento aceptado | Llamada aceptada | Rechazo anterior |
| --- | ---: | --- | --- |
| original | 2 | `exec-2ff3b990-1e5b-479e-9a95-560e9339ea0d` | `exec-a29d0ddb-84b8-4dca-b712-76d507f8b7de`: raya extra |
| negro | 1 | `exec-3777787d-8bc7-4c68-a48d-34a39c4ee929` | ninguno |
| wengue | 2 | `exec-f47e5550-1db8-418e-9129-b6ba71ab253a` | `exec-ee3c4a96-f452-4900-a1b3-5694926fec70`: columna de rayas/pseudotexto potencial |
| natural | 2 | `exec-04fc9e4a-edca-488d-bff2-320e7b5bfb9b` | `exec-12bfa597-13a1-4987-a536-e56ad351cf5f`: columna de rayas/pseudotexto potencial |

Para los segundos intentos se reforzó el herraje: una lente circular, cuatro controles circulares grandes en 2×2, cara restante vacía y segundo módulo rectangular sin marcas.

## Activos directos reutilizados

`gris-oscuro`, `antracita`, `nogal`, `roble`, `gris-claro` y `blanco` pasaron auditoría ampliada y se copiaron byte a byte. Su procedencia y hashes están documentados en `LEGACY-AUDIT.md` y `QA.json`.
