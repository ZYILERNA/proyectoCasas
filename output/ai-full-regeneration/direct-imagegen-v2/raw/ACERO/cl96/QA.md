# ACERO/cl96 — QA de generación directa

Resultado: **PASS 10/10**. Política canónica: **NO_LOGO**. No se ha convertido, redimensionado, recortado, filtrado, recoloreado, enmascarado ni compuesto ningún PNG. Los diez activos son copias byte a byte de salidas independientes de ImageGen y no se ha modificado `public/`.

## Criterios revisados

- Arquitectura CL96: marco completo a inglete, travesaño superior dividido, panel izquierdo liso, montante central, paño derecho acanalado y zócalo inferior derecho.
- Vista frontal ortográfica, sin escena ni perspectiva.
- Marco y esquinas inferiores completos.
- Cerradura inteligente presente, reducida a pantalla vacía y controles geométricos sin etiqueta.
- Ausencia de logotipo, marca, letras, cifras, microtexto, pseudotexto, iconos decorativos y watermark.
- Máximo dos intentos por acabado.

## Resultados por acabado

| Acabado | Intentos | Dimensiones | Margen L/R/T/B (px) | Arquitectura | Cerradura limpia | NO_LOGO | Resultado |
|---|---:|---:|---:|---|---|---|---|
| original | 1 | 918×1713 | 4/4/4/3 | PASS | PASS | PASS | PASS |
| negro | 1 | 918×1713 | 6/8/7/3 | PASS | PASS | PASS | PASS |
| wengue | 2 | 918×1713 | 4/4/4/0 | PASS | PASS | PASS | PASS |
| gris-oscuro | 2 | 918×1713 | 5/6/6/5 | PASS | PASS | PASS | PASS |
| antracita | 2 | 918×1713 | 4/7/5/4 | PASS | PASS | PASS | PASS |
| nogal | 1 | 918×1713 | 4/5/6/4 | PASS | PASS | PASS | PASS |
| roble | 1 | 919×1711 | 4/4/5/4 | PASS | PASS | PASS | PASS |
| gris-claro | 1 | 918×1713 | 4/4/5/3 | PASS | PASS | PASS | PASS |
| natural | 1 | 918×1713 | 3/3/4/3 | PASS | PASS | PASS | PASS |
| blanco | 1 | 918×1713 | 6/7/6/4 | PASS | PASS | PASS | PASS |

El margen se midió únicamente como análisis de píxeles del PNG crudo. `wengue` toca el borde inferior (0 px) pero el travesaño inferior y ambas esquinas permanecen visibles y completos; cumple el objetivo de casi nada de blanco.

## Intentos descartados

- `wengue` intento 1: pequeña raya ambigua en la placa de la cerradura.
- `gris-oscuro` intento 1: dos líneas débiles en el compartimento inferior de la cerradura.
- `antracita` intento 1: exceso de círculos/aros solapados en los controles.

Los descartes están aislados en `_rejected/` y no forman parte del set activo.
