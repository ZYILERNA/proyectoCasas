# ALUMINIO/chaohe — registro de prompts directos de ImageGen

Modo: built-in ImageGen. Política: `NO_LOGO`. Cada PNG activo procede de una llamada independiente que usó como única referencia:

`output/ai-full-regeneration/other-categories/ALUMINIO/chaohe/master-no-logo-ai-tight.png`

No se reutilizó ninguna imagen generada como referencia. No se aplicaron filtros, recoloración local, máscaras, recorte, redimensionado, composición ni conversión a ningún PNG activo.

## Especificación común

```text
Use case: product-mockup.
Asset type: imagen de catálogo de puerta.
Input image: única referencia visual y arquitectónica; genera un render nuevo con IA de esta misma puerta ALUMINIO CHAOHE.
Primary request: conserva exactamente el marco exterior completo, dintel, panel horizontal superior liso, dos paños de lamas verticales finas, franja central lisa y cerradura inteligente negra alargada en idéntica posición. En la cerradura conserva solo pequeños puntos circulares abstractos y un aro circular simple, sin caracteres.
Composition/framing CRITICAL: vista frontal ortográfica, lienzo vertical ajustado casi exactamente al marco. El borde exterior completo debe quedar a solo 2–5 píxeles de cada borde del lienzo, con los cuatro lados y el umbral totalmente visibles. La puerta debe ocupar más del 99% del ancho y alto. No dejes bandas blancas amplias, pared, suelo ni perspectiva. No recortes ninguna parte del marco.
Style/medium: fotografía/render fotorealista limpio de catálogo, fondo blanco puro únicamente en ese margen mínimo.
Constraints: nueva generación por IA usando solo la imagen de referencia; preservar arquitectura, lamas, proporciones, cerradura, frame y umbral.
Avoid: cualquier texto, letra, número, pseudotexto, logotipo WONLY u otro logo, marca, insignia, pictograma, sello, símbolo decorativo, marca de agua, tirador adicional, bisagras visibles, objetos, adornos, sombras externas.
```

## Acabados activos

| Acabado | Directiva |
| --- | --- |
| original | Bronce marrón oscuro original, satinado, equivalente al master. |
| negro | Negro profundo satinado. |
| wengue | Marrón casi negro con veta longitudinal fina y discreta. |
| gris-oscuro | Gris oscuro neutro satinado. |
| antracita | Antracita grafito satinado. |
| nogal | Nogal medio cálido realista con veta longitudinal fina y discreta; la arquitectura sigue siendo aluminio y no cambia. |
| roble | Roble claro cálido, tono miel suave, con veta longitudinal fina y discreta; la arquitectura sigue siendo aluminio y no cambia. |
| gris-claro | Gris claro frío satinado con contraste suficiente para ver las lamas. |
| natural | Madera natural claro-neutro, beige cálido suave, con veta muy fina. |
| blanco | Blanco cálido satinado, con contornos gris muy suave para distinguir el marco del fondo. |

## Recuperación de los tres acabados bloqueados

`original`, `nogal` y `roble` recibieron una llamada nueva e independiente cada uno con la especificación crítica anterior. Los tres primeros intentos nuevos pasaron: margen máximo de 4 px, 5 px y 4 px respectivamente. No fue necesario usar el segundo intento nuevo permitido.
