# ACERO/cl96 — registro de prompts

Todas las llamadas usaron exclusivamente esta referencia:

`output/ai-full-regeneration/masters/ACERO/cl96/master-no-logo-ai-tight.png`

Nunca se usó una salida generada como referencia ni se adjuntó un logotipo. Cada acabado fue una llamada independiente al ImageGen integrado.

## Invariantes compartidas

Generar un bitmap nuevo y fotorrealista de catálogo, frontal y ortográfico. Preservar el marco completo a inglete, el travesaño superior dividido, el panel izquierdo liso, el montante central con cerradura, el gran paño derecho de acanalado vertical fino y el panel inferior derecho. El marco debe quedar casi al ras, con 0–8 px de blanco exterior (hasta 11 px solo para conservarlo completo). La cerradura debe estar presente pero totalmente sin marca: pantalla rectangular vacía y controles circulares geométricos sin etiquetas. Prohibidos logo, wordmark, badge, letras, cifras, microtexto, pseudotexto, iconos decorativos y watermark. Prohibidos filtros, recolor, máscaras, crop, resize, composite y postprocesado.

## Prompts aceptados por acabado

### original — intento 1

Acabado metal grafito/carbón original. Cerradura negra alta y delgada con pantalla oscura completamente vacía, sensor circular y dos o tres controles circulares simples. Mantener todas las proporciones, divisiones y estrías del máster.

### negro — intento 1

Acabado negro mate intenso uniforme, con luz suave que diferencie paneles y flautas negras. Cerradura sin etiquetas: pantalla negra vacía, sensor circular y dos o tres controles circulares simples.

### wengue — intento 2

Acabado wengué marrón espresso profundo con veta recta sutil; marco y cerradura negros. Una placa de cerradura negra, alta, lisa y completamente sin marca: pantalla negra vacía, un sensor circular y dos botones redondos aislados. La zona restante debe quedar ininterrumpida, sin raya, guion, muesca, glifo, relieve, inscripción ni marca decorativa.

### gris-oscuro — intento 2

Acabado metálico gris oscuro neutro, claramente gris y no negro. Placa negra lisa con una pantalla rectangular negra vacía y exactamente tres círculos negros simples; no añadir compartimento inferior, borde, línea, guion, muesca, texto ni icono.

### antracita — intento 2

Acabado antracita carbón oscuro con matiz frío muy sutil. Placa negra totalmente lisa con una pantalla rectangular negra vacía y exactamente tres círculos negros rellenos, separados y sin solaparse. No añadir aros, botones extra, líneas, compartimentos, grabados ni símbolos.

### nogal — intento 1

Acabado nogal marrón medio-oscuro rico con veta natural contenida; marco y cerradura negros. Placa negra con una pantalla vacía y exactamente tres círculos simples separados, sin otras formas o marcas.

### roble — intento 1

Acabado roble cálido dorado claro con veta recta realista y contenida; marco y cerradura negros. Placa negra con pantalla vacía y exactamente tres controles circulares separados, sin ninguna otra marca.

### gris-claro — intento 1

Acabado metálico gris claro neutro y elegante. Placa negra lisa con pantalla vacía y exactamente tres círculos negros separados; ningún aro solapado, compartimento, línea, guion, grabado o icono.

### natural — intento 1

Acabado madera natural pálida, beige/miel tipo fresno, más claro y menos dorado que roble; marco y cerradura negros. Pantalla vacía y exactamente tres círculos oscuros separados en una placa totalmente limpia.

### blanco — intento 1

Acabado blanco mate neutro-cálido; marco completo y cerradura en negro profundo para definir el producto. Pantalla negra vacía y exactamente tres círculos simples separados; ninguna otra forma, letra o marca.

## Correcciones descartadas

- `wengue` intento 1 se descartó por una raya tenue bajo el sensor.
- `gris-oscuro` intento 1 se descartó por líneas ambiguas en el bloque inferior.
- `antracita` intento 1 se descartó por controles circulares duplicados/solapados.
