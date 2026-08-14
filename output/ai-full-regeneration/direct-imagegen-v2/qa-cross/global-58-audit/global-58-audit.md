# Auditoria global del inventario canonico de 58 modelos

Snapshot UTC: `2026-08-14T10:50:49.4970165Z`

Se aplico la seleccion exacta v2 -> v1 a los 58 modelos. `AI/p105` y `ACERO/s119` se incluyen tras confirmarse estables. La reconciliacion solo actualizo manifiestos/documentacion y archivo marcadores historicos; no se editaron imagenes ni `public`. El auditor escribe unicamente este reporte y su JSON reproducible.

## Resultado

- Modelos de politica: **58**; auditados: **58**; excluidos: **0**.
- Seleccion: **49 v2** y **9 v1**.
- Inventario fisico: **58/58** modelos con 10 PNG raiz, acabados exactos, firma PNG y 10 hashes internos unicos.
- Unicidad global: **580/580** hashes; grupos duplicados: **0**.
- Coherencia QA/manifest: **58/58**.
- Politica de logo semanticamente declarada: **58/58**; enum exacto: **58/58**.
- Procedencia independiente/ImageGen/referencias documentada de forma completa: **58/58**.
- Ausencia de filtros, conversion y escritura publica declarada de forma completa: **58/58**.
- Clasificacion estricta: **58 PASS**, **0 PASS_WITH_WARNINGS**, **0 FAIL_DOCUMENTATION/FAIL_INVENTORY**.

## Anomalias reales

No se detectaron errores.

## Advertencias documentales

No se detectaron advertencias.

## Resultado por modelo

| Modelo | Set | Politica | PNG/unicos | QA+manifest | Procedencia | Sin filtros/conversion/public | Resultado | Incidencias |
|---|---:|---|---:|---:|---:|---:|---|---|
| `AI/t200` | v1 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `AI/x50-pro` | v1 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `AI/k300-pro` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `AI/l5857` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `AI/l5859` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `AI/p101` | v1 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `AI/p105` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `AI/p107` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `AI/x70-shunliu` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `AI/x50` | v2 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `AI/p102` | v2 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `AI/x50-max` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `AI/x60-pro` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACORAZADA/wl006` | v1 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACORAZADA/wl008` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACORAZADA/wl015` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACORAZADA/wl016` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACORAZADA/wl017` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACORAZADA/wl007` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/cl96` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/contemporary` | v2 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `ACERO/gl098-pro` | v1 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `ACERO/gl099` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/jd073` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/l5601` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/mid-night` | v2 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `ACERO/n9518` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/p101` | v1 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `ACERO/p103` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/p105` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/p106` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/p107` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/s108` | v2 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `ACERO/s108-pro` | v2 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `ACERO/s119` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/s121` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/y106` | v1 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/y118` | v1 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ACERO/gl098` | v2 | KEEP_WONLY | 10/10 | True | True | True | PASS | -- |
| `ACERO/y119` | v1 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `PVC/wl-p003` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `PVC/wl-p005` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `PVC/wl-p010` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `EVACUACION/gk-03` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `EVACUACION/mk-01` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ALUMINIO/chaohe` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ALUMINIO/chaoling` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `ALUMINIO/lange` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `CORREDIZA/wl-a23001` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `CORREDIZA/wl-a23002` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `CORREDIZA/wl-a23019` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `CORREDIZA/wl-a23020` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `COBRE/tdf-2003` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `COBRE/tdf-2009` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `MEDICA/puerta-automatica-plana-hermetica-y-abatible` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `MEDICA/puertas-automaticas-hermeticas` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `MEDICA/puerta-cortafuego-aislante1` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |
| `MEDICA/puerta-cortafuego-aislante2` | v2 | NO_LOGO | 10/10 | True | True | True | PASS | -- |

## Metodo y limites

- Se recalculo SHA-256 directamente de cada PNG y se comprobo su firma binaria; no se acepto un estado `PASS` como evidencia suficiente.
- La coherencia documental compara presencia/parseo, recuentos declarados, estados superiores, politica, y bindings estructurados archivo-hash cuando existen.
- Para `KEEP_WONLY`, se admite el master canonico mas el logo WONLY oficial como conjunto de referencias permitido; nunca un output generado.
- Esta auditoria valida inventario y declaraciones. No sustituye una inspeccion visual/OCR independiente de los 580 PNG.
- Cadena SHA-256 del snapshot ordenado modelo/archivo/hash: `38FBBC6D96B0A0C74E8B5A35E68C962476EA73BA2843925B2909A4D83BA3094C`.
- `ACERO/l5601-correction` aparece como directorio v2 extra fuera del inventario; no se selecciono porque no es un modelo de `logo-policy.json`.

