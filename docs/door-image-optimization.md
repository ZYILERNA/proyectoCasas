# Optimización del catálogo de puertas

## Resultado — 15 de septiembre de 2026

Se convirtieron 2.506 PNG rastreados del catálogo a WebP de alta calidad,
sin cambiar las dimensiones ni regenerar el contenido de las imágenes.

| Medida | Bytes |
| --- | ---: |
| PNG originales sustituidos | 3.778.840.928 |
| Nuevos WebP | 458.325.658 |
| Ahorro | 3.320.515.270 (87,87 %) |

La compresión es con pérdida, calidad 95. Cada imagen se comparó con su
original: PSNR mínimo exigido de 40 dB y error absoluto medio máximo de
1,6 sobre 255. El peor resultado fue 41,32 dB / 1,55. Se revisaron además
comparativas visuales de materiales, herrajes y del resultado con mayor error.

El PNG transparente `AI/door-x50-max-transparent.png` se conserva intacto.
Los 21 PNG auxiliares no rastreados y todos los WebP anteriores también se
conservan. Los WebP anteriores no son necesariamente iguales a los PNG:
algunos representan otras versiones del producto o del logotipo.

## Rutas y compatibilidad

- Las nuevas imágenes se llaman `nombre.optimized.webp`, sin sobrescribir
  las versiones `nombre.webp` anteriores.
- `lib/door-image-assets.js` selecciona las versiones optimizadas para la
  presentación. No se modificaron las identidades ni las URLs de Supabase.
- `next.config.js` reescribe las antiguas URLs del catálogo terminadas en
  `.png` a `.optimized.webp`, después de comprobar archivos existentes.
  Así siguen funcionando los PNG que se conservan y los enlaces antiguos.
- Las rutas directas con caracteres reservados deben codificar cada segmento
  con `encodeURIComponent` (por ejemplo, una coma como `%2C`).

## Copias y herramientas

Todos los PNG sustituidos están respaldados fuera del proyecto, bajo la
carpeta local `catalog-image-optimization-2026-09-15`. Su `manifest.json`
registra rutas, tamaños, dimensiones y hashes SHA-256 de ambas versiones.
No incluir esa carpeta de respaldo en Git ni en un despliegue.

Para una nueva tanda de PNG rastreados, usando otra carpeta externa vacía:

```powershell
node scripts/optimize-door-images.cjs sample C:\ruta-externa\backup
node scripts/optimize-door-images.cjs apply C:\ruta-externa\backup
node scripts/optimize-door-images.cjs verify C:\ruta-externa\backup
node scripts/test-door-image-paths.cjs
npm run build
```

El compresor rechaza originales con cambios pendientes, perfiles ICC,
profundidades distintas de 8 bits y animaciones; conserva PNG transparentes.
Verifica toda la tanda antes de reemplazar los originales. Si se interrumpe
durante la codificación, puede reutilizar los WebP de staging tras validarlos
de nuevo. Si existe un manifiesto de aplicación parcial, hay que revisar ese
manifiesto y las copias antes de reintentar: no fuerza sobrescrituras.

## Verificación realizada

- 2.506 pares original/optimizado: hashes, dimensiones y decodificación.
- 2.505 rutas del helper, 15 referencias directas y conservación de queries.
- Compilación de producción: 49 páginas generadas correctamente.
- GET locales de imágenes directas, URLs PNG antiguas y `/_next/image`,
  incluyendo carpetas y nombres con tildes/coma; también PNG conservados y 404.

El ahorro corresponde a los archivos de nuevos despliegues. No elimina
almacenamiento de despliegues históricos de Vercel. Esta tanda no se ha
publicado; falta comprobar el despliegue remoto cuando se autorice.
