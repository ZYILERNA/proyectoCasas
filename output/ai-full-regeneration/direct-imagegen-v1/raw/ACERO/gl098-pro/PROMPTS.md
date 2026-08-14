# Prompt set - ACERO / gl098-pro

Modo: **built-in ImageGen**, una llamada independiente por intento.

Referencias de todas las llamadas:

- Edit target: `output/ai-full-regeneration/masters/ACERO/gl098-pro/master-no-logo-ai-tight.png`
- Logo reference: `public/images/logo-wonly.webp`

## Especificacion comun

```text
Use case: precise-object-edit
Asset type: tightly bounded vertical e-commerce product image for ACERO gl098-pro.
Input images: Image 1 is the exact door architecture/edit target; Image 2 is the official WONLY logo.
Generate a fresh independent AI rendering from Image 1. Preserve the complete exact frontal architecture: outer frame, upper horizontal transom, two broad plain panels, narrow central vertical ribbed strip, complete lower threshold and exactly one slim black smart lock at its original position.
Apply only the requested finish to the frame, transom and broad panels; keep the ribbed strip as dark brushed metal and the lock black.
Add exactly one correctly spelled “WONLY” directly on the upper-right leaf, using Image 2 as spelling/shape reference; no badge or plaque.
Scene: pure solid #FFFFFF only.
Composition: strict straight-on orthographic elevation. The complete product is visible and maximized; outermost frame 0-4 px from every canvas edge, virtually no white, no crop.
Constraints: one door, one frame, one lock and one WONLY. Lock face may show abstract icon dots only, never letters.
Avoid: any other word, microtext or invented characters; duplicate logo/lock; badge, sticker, halo or rectangular patch; room, wall, floor, shadow, reflection, perspective, broad border, crop, extra objects or watermark.
```

## Directivas por acabado

- `original`: acabado original grafito/negro, textura oscura sutil.
- `negro`: negro neutro profundo, mate y uniforme.
- `wengue`: madera wengue espresso casi negra, veta vertical fina.
- `gris-oscuro`: gris oscuro neutro, claramente mas claro que negro/antracita.
- `antracita`: carbon profundo con matiz grafito frio, no negro puro.
- `nogal`: nogal medio calido, marron rico y veta vertical natural.
- `roble`: roble miel/dorado con veta vertical fina.
- `gris-claro`: gris claro neutro con textura mate de metal.
- `natural`: madera natural palida beige, menos dorada que roble.
- `blanco`: blanco calido/marfil muy claro con definicion gris en los bordes.

## Reintentos de encuadre

Los reintentos de `original`, `negro` y `gris-oscuro` mantuvieron la misma especificacion y el mismo master. Solo se reforzo la instruccion de encuadre:

```text
CRITICAL CANVAS FIT: tightly bound the canvas to the complete product. The OUTERMOST FRAME must TOUCH or sit only 0-2 pixels from LEFT, TOP, RIGHT and BOTTOM edges. NO visible white bands. Preserve all four frame corners and the full threshold; fit canvas to product, never crop product.
```

Los primeros intentos se rechazaron exclusivamente por margen superior a 8 px y se guardaron en `rejected/`.
