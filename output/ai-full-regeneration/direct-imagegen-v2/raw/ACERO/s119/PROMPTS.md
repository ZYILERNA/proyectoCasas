# ACERO/s119 — recuperación ImageGen directa NO_LOGO

Fecha de cierre: 2026-08-14. Esta recuperación realizó 16 llamadas nuevas e independientes al ImageGen integrado, incluida la recuperación posterior de cara lisa para `blanco`, y auditó los 20 intentos históricos documentados. Cada llamada nueva usó exclusivamente:

- `output/ai-full-regeneration/masters/ACERO/s119/master-no-logo-ai-tight.png`
- SHA-256 del máster: `9892c0ecd4321531eb66ccac34e9629c10876028d6a6a3dd235c995ffd2ac8d9`

No se referenció ningún logo ni ninguna salida generada. No se aplicaron filtros, recolor local, máscaras, recorte, redimensionado, composición o conversión. Los recortes y hojas de `qa-recovery/` son derivados exclusivos de inspección y nunca deben promocionarse.

## Especificación común

```text
Use case: precise-object-edit
Asset type: front-facing e-commerce catalog image for ACERO/s119.
Input image: Image 1 is the sole architectural reference and controls the complete door, outer frame, vertical accent and smart-lock silhouette.
Primary request: create a new independent photorealistic image of the complete s119, changing only the requested finish.
Architecture invariants: one tall flat single slab; complete stepped outer frame with lintel, both jambs and sill; one narrow full-height rose-grey metallic accent slightly left of center bounded by a thin bright straight metal edge on both sides; one tall slim black rounded-rectangle smart lock on the left panel.
Lock invariants: retain the silhouette, camera/sensor and necessary functional controls as regular geometric shapes. The face may contain only plain circles/dots and one blank tall rectangular lower panel. All other lock areas must be uninterrupted black.
Text prohibition: no logo, brand, word, letter, digit, number, microtext, pseudotext, badge, writing-like icon, emblem, dash, scribble, watermark or irregular tiny mark. Do not reproduce the faint top or bottom markings visible in the master lock.
Composition: strict straight-on orthographic view; full outer frame visible and almost flush with canvas; target 0–8 px near-white exterior margin; at most 11 px only when coverage remains above 98% on both axes; never crop.
Scene: near-white studio exterior visible only in the tiny margin; no room, wall, floor plane, baseboard, horizon, pedestal, props or cast shadow.
Avoid: perspective, thick white border, extra panels, handles, peephole, extra trim, text or writing-like reflections.
```

### Override final autorizado para `blanco`

```text
Preserve exactly the elongated outer lock casing and its physical lower pull-handle/grip geometry.
Make the entire front face one pristine plane of smooth glossy black glass, totally blank and uninterrupted.
Remove every keypad dot, matrix, camera, sensor, circle, icon, button, indicator, screen content, seam graphic, label and decorative mark.
Zero graphic elements on the glass face; no text, pseudotext or writing-like reflection.
Keep the complete s119 frame almost flush with the canvas, targeting 0–8 px exterior margin without cropping.
```

## Acabados solicitados

- `original`: grafito oscuro original.
- `negro`: negro profundo mate.
- `wengue`: madera wengué chocolate muy oscuro con veta vertical fina.
- `gris-oscuro`: gris carbón oscuro, distinguible del negro.
- `antracita`: gris antracita neutro.
- `nogal`: nogal marrón medio-oscuro con veta vertical fina.
- `roble`: roble dorado claro, cálido pero no anaranjado.
- `gris-claro`: gris frío claro con marco grafito.
- `natural`: madera rubia muy clara, beige pálido y menos dorada que el roble.
- `blanco`: blanco mate suave con marco gris contrastado.

## Resultado y cierre

Los diez activos cumplen geometría, ausencia total de logo/texto/pseudotexto y encuadre. `original` y `gris-oscuro` se recuperaron de intentos históricos independientes re-auditados: ambos proceden únicamente del mismo máster, sin logo ni salida previa como referencia.

Historial de recuperación de `blanco`:

1. El primer intento conserva una marca tenue similar a escritura en la parte superior del lock.
2. El segundo elimina completamente esa marca, pero deja márgenes de 18–20 px y solo 95,34% de cobertura mínima. Aceptarlo requeriría un recorte o redimensionado prohibido.
3. La recuperación final (`exec-00faa595-d691-41bf-b559-4f96d99ec4c1`) logra margen máximo de 3 px y cobertura mínima del 99,40%, pero la inspección original-detail revela micro-marcas semejantes a escritura sobre el sensor y marcas irregulares tenues bajo la matriz circular. Se archivó sin activar en `_rejected/recovery-2026-08-14/blanco-final-authorized-pseudotext-m3.png`.
4. Se autorizaron hasta tres llamadas adicionales con la cara de vidrio negro completamente vacía. La primera (`exec-3cbc9909-2e75-4b6c-bb41-276c88c62e1f`) pasa: carcasa alargada y tirador físico conservados; cero controles, sensores, iconos, texto o pseudotexto; margen máximo de 4 px y cobertura mínima del 99,16%. Se detuvieron las dos llamadas restantes y el PNG raw se activó como `blanco.png`.

El cierre es `PASS 10/10`. No se escribió nada en `public`.
