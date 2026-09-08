# Escena X60 Pro · Mediterráneo

Escena creada con la herramienta integrada ImageGen para la portada de WONLY España. La entrada toma como referencia el modelo real X60 Pro del catálogo, con hoja única acanalada, banda metálica y módulos de acceso. El salón y la cala mediterránea son ambientes generados; no representan una instalación real.

- `exterior.webp`: entrada cerrada, 1672 × 941 px, 221386 bytes.
- `interior.webp`: salón panorámico y costa mediterránea, 1672 × 941 px, 246882 bytes.
- `generation.json`: prompts completos, referencia del catálogo y coordenadas de la hoja.
- Copias locales de los originales PNG: `output/imagegen/catalog-door-v1/` (fuera del commit; los WebP incluidos son los assets de la web).

`CatalogDoorScene.jsx` usa cuatro recortes CSS de la misma fotografía alrededor del hueco y una hoja en perspectiva con bisagra derecha. El controlador de portada dirige la apertura y el avance de cámara con el scroll; no descarga secuencias de fotogramas. Menú y texto del interior se revelan al completar el recorrido. La secuencia de referencia anterior se conserva solo en el entorno local, fuera de esta entrega y sin cargarla en la portada.
