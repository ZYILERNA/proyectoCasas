# WONLY España

Web corporativa y catálogo de WONLY España construidos con Next.js App Router,
Tailwind CSS y Supabase.

## Puesta en marcha

1. Copia `.env.example` como `.env.local` y completa las variables.
2. Instala dependencias con `pnpm install`.
3. Ejecuta `pnpm dev` para desarrollo o `pnpm build && pnpm start` para validar
   la versión de producción.

## Seguridad y datos

- `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` y `ADMIN_SESSION_SECRET` son
  secretos de servidor: nunca deben usar el prefijo `NEXT_PUBLIC_`.
- La tabla `page_visits` debe denegar operaciones directas al rol `anon`. Las
  inserciones se realizan exclusivamente desde `/api/track`, después del
  consentimiento analítico. Ejecuta una vez
  `scripts/harden-page-visits.sql` en el editor SQL de Supabase.
- Las tablas de catálogo solo deben exponer al rol público las columnas y
  operaciones de lectura necesarias.
- El limitador incluido protege una única instancia. En producción conviene
  complementarlo con reglas del CDN/WAF o un almacén compartido como Redis/KV,
  especialmente para `/wonly-panel`.

Antes de publicar, completa el NIF y los datos registrales oficiales de
Zhongyuankeji S.L. en el aviso legal.
