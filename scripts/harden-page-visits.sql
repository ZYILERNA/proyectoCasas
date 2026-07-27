-- Ejecutar una vez en Supabase SQL Editor.
-- La web inserta y lee page_visits exclusivamente con la service role.

alter table public.page_visits enable row level security;

revoke all privileges on table public.page_visits from anon;
revoke all privileges on table public.page_visits from authenticated;

-- Elimina políticas públicas conocidas si existieran con estos nombres.
drop policy if exists "Enable insert for anon users" on public.page_visits;
drop policy if exists "Enable read access for all users" on public.page_visits;
drop policy if exists "Allow anonymous inserts" on public.page_visits;
drop policy if exists "Allow public reads" on public.page_visits;

comment on table public.page_visits is
  'Analítica interna con consentimiento; acceso exclusivo mediante service role.';

-- Retención diaria de 13 meses. Supabase ofrece pg_cron en el esquema cron.
create extension if not exists pg_cron;

do $$
declare
  existing_job bigint;
begin
  select jobid
    into existing_job
    from cron.job
   where jobname = 'wonly-prune-page-visits'
   limit 1;

  if existing_job is not null then
    perform cron.unschedule(existing_job);
  end if;
end
$$;

select cron.schedule(
  'wonly-prune-page-visits',
  '17 3 * * *',
  $$delete from public.page_visits
      where visited_at < now() - interval '13 months';$$
);
