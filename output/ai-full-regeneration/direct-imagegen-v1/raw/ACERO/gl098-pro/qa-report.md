# QA comparativa - ACERO / gl098-pro

Estado final: **PASS (10/10)**.

## Metodo

- Inspeccion visual individual de cada PNG generado directamente con ImageGen.
- Las 13 llamadas partieron siempre del mismo master y del logo oficial; ninguna llamada uso un acabado generado previamente.
- Se comprobaron dimensiones, SHA-256, margen blanco, puerta completa, arquitectura, herraje, logotipo y texto espurio.
- El margen robusto es el primer borde cuya columna o fila contiene mas de un 5 % de pixeles por debajo de RGB 245.
- No se aplicaron filtros, recoloreado, mascaras, composicion, recorte, redimensionado ni postprocesado de pixeles.

## Resultado

| Comprobacion | Resultado |
| --- | --- |
| Acabados esperados / aceptados | 10 / 10 |
| PNG validos | 10 / 10 |
| Hashes unicos | 10 / 10 |
| Puerta completa, frontal y vertical | 10 / 10 |
| Marco y umbral completos | 10 / 10 |
| Division gl098-pro conservada | 10 / 10 |
| Una unica cerradura vertical negra | 10 / 10 |
| Halos o rectangulos en herraje/logo | 0 / 10 |
| Un unico `WONLY` correctamente escrito | 10 / 10 |
| Otro texto, microtexto o letras en cerradura | 0 / 10 |
| Margen robusto de 0 a 8 px | 10 / 10 |

## Encuadre

Los activos aceptados tienen margenes robustos entre 0 y 7 px. `original`, `negro` y `gris-oscuro` necesitaron una segunda llamada directa de ImageGen; sus primeros intentos se conservan en `rejected/` y no forman parte del lote aprobado.

## Consistencia visual

- Todos conservan el marco perimetral, el panel superior horizontal, dos paneles principales lisos, la franja central acanalada y el umbral inferior.
- La cerradura mantiene el tipo, la orientacion y la posicion central; no hay duplicados ni texto alfabetico en su cara.
- Cada imagen contiene un solo `WONLY` en la parte superior derecha, directamente sobre la hoja y sin placa.
- Las dimensiones model-native varian solo entre 879-880 px de ancho y 1787-1789 px de alto.

## Diferenciacion de acabados

| Acabado | RGB medio de muestra | Luminancia |
| --- | --- | ---: |
| wengue | 35.4, 25.2, 20.6 | 27.0 |
| negro | 34.8, 34.7, 36.4 | 34.8 |
| original | 50.2, 50.4, 54.6 | 50.7 |
| antracita | 56.0, 57.0, 59.9 | 57.0 |
| gris-oscuro | 79.9, 79.9, 81.0 | 80.0 |
| nogal | 112.8, 73.0, 51.2 | 79.9 |
| roble | 200.9, 142.2, 70.8 | 149.5 |
| gris-claro | 173.1, 168.7, 166.8 | 169.5 |
| natural | 218.0, 199.4, 175.9 | 201.7 |
| blanco | 236.3, 232.7, 227.9 | 233.1 |

Los colores oscuros se distinguen por neutralidad o temperatura y textura; las maderas se diferencian con claridad entre wengue oscuro, nogal medio, roble dorado y natural palido.

## Estado de entrega

El lote permanece en `raw`. No se ha convertido a WebP ni se ha promovido a `public`.
