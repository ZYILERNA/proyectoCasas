# Catálogo WONLY 2026

Integración preparada a partir de `2026王力木门电子图册NEW.pdf`. Los recursos son recortes del catálogo original; no se han redibujado ni generado con IA.

## Contenido incorporado

- 52 modelos nuevos:
  - 6 High-End.
  - 17 minimalistas, incluidos 2 modelos con vidrio.
  - 8 PVC, incluidos 2 modelos con vidrio.
  - 11 de la serie madera, incluidos 2 modelos con vidrio.
  - 10 sistemas de aluminio abatibles, correderos o plegables.
- 52 imágenes de producto en WebP.
- 52 wallpapers verticales sin textos del catálogo.
- 8 herrajes WONLY 2026.
- 1 hero panorámico para el filtro `NOVEDADES WONLY 2026`.

El manifiesto [wonly-2026-assets.json](../data/wonly-2026-assets.json) conserva para cada modelo el pliego, la página interna, el acabado mostrado y las coordenadas de extracción.

## Regenerar imágenes

El script requiere Pillow y, si se parte directamente del PDF, pypdf.

```powershell
python scripts/extract-wonly-2026-assets.py --pdf "C:\ruta\2026王力木门电子图册NEW.pdf"
```

También acepta un directorio que contenga `spread-01.jpg`, `spread-02.jpg`, etc.:

```powershell
python scripts/extract-wonly-2026-assets.py --spreads-dir tmp\pdfs\wonly-2026-pages
```

## Revisar y cargar en Supabase

La simulación es el comportamiento predeterminado y no modifica la base de datos:

```powershell
node scripts/upsert-wonly-2026-catalog.cjs
```

Después de revisar los assets y la salida de la simulación:

```powershell
node scripts/upsert-wonly-2026-catalog.cjs --apply
```

La carga actualiza por nombre o crea los registros que falten; nunca vacía las tablas. Se puede limitar con `--only-products` o `--only-hardware`.

Para comprobar con la misma clave pública que usa la web que todos los registros son visibles:

```powershell
node scripts/upsert-wonly-2026-catalog.cjs --verify
```

En equipos Windows que acceden a Supabase mediante un proxy o un certificado instalado en el sistema, añade `--use-system-ca --use-env-proxy` inmediatamente después de `node`.

Antes de publicar, conviene confirmar con WONLY los nombres comerciales traducidos, la disponibilidad regional de acabados y los derechos de reutilización del material gráfico.
