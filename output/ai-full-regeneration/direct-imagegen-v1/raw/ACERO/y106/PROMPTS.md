# ACERO/y106 — generación directa NO_LOGO (10/10)

Las diez PNG aceptadas proceden de generaciones independientes con la herramienta ImageGen integrada. Cada llamada utilizó como única referencia visual:

`output/ai-full-regeneration/masters/ACERO/y106/master-no-logo-ai-tight.png`

No se usó ninguna salida generada ni imagen de logo como referencia. Tampoco se aplicaron filtros, recoloreado local, máscaras, recorte, redimensionado, composición ni conversión de formato.

## Contrato común de prompt

- Caso de uso: fotografía de producto para catálogo, vista frontal ortográfica.
- Petición: generar una toma nueva y fotorrealista de la misma puerta, cambiando únicamente el acabado visible solicitado.
- Geometría invariable: panel superior ancho, dos montantes laterales, todas las molduras escalonadas, panel inferior rectangular y celosía central con exactamente 6 columnas por 12 filas de huecos idénticos con esquinas recortadas.
- Cerradura: misma posición y proporciones; pantalla negra completamente vacía; control inferior como superficie gris lisa y totalmente vacía, sin icono, glifo, ranura, huella, letra, cifra, reflejo con forma de carácter ni pseudotexto.
- Encuadre: marco exterior completo y ambos extremos inferiores visibles; producto frontal y casi a ras del lienzo, con margen blanco objetivo de 0–8 px por lado y tolerancia absoluta de 11 px, sin recortar el marco.
- Fondo: blanco puro y uniforme, sin suelo, pared, estancia, horizonte, pedestal, sombra proyectada, objetos ni perspectiva.
- Prohibiciones: ningún logo, marca, insignia, texto, letra, cifra, símbolo, microtexto, pseudotexto, marca de agua o firma; ninguna alteración geométrica ni herraje inventado.

## Cláusulas de acabado

| Acabado | Material solicitado |
|---|---|
| `original` | metal grafito casi negro, satinado |
| `negro` | metal negro profundo, satinado |
| `wengue` | madera wengué espresso muy oscura, veta vertical fina y discreta |
| `gris-oscuro` | metal gris oscuro neutro, acabado en polvo satinado |
| `antracita` | metal gris antracita frío con leve matiz azul, satinado |
| `nogal` | nogal marrón cálido medio-oscuro, veta vertical natural |
| `roble` | roble claro miel-beige, veta vertical sutil |
| `gris-claro` | metal gris claro neutro, satinado y claramente separado del fondo blanco |
| `natural` | madera natural rubia muy clara, beige suave y veta vertical fina |
| `blanco` | metal blanco limpio, satinado, con definición gris sutil en los cantos |

## Cierre de los dos acabados pendientes

Para `gris-claro` y `blanco` se realizaron dos llamadas nuevas por acabado, siempre desde el máster único. El primer resultado nuevo de cada uno se rechazó porque ImageGen inventó un pequeño glifo en el control inferior. El segundo resultado nuevo de cada acabado fue aceptado:

- `gris-claro.png`: celosía 6×12, cerradura vacía, marco completo; márgenes 5/3/6/4 px (izquierda/arriba/derecha/abajo).
- `blanco.png`: celosía 6×12, cerradura vacía, marco completo; márgenes 6/5/9/3 px.

Los intentos descartados se conservaron completos en `_rejected`. No se corrigió ninguna salida mediante edición local. El lote queda en estado `PASS_10_OF_10`, sin conversión y sin publicación.
