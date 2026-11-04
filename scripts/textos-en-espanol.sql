-- Revisión web (punto 05): sustituye "Flagship IA" en las descripciones de puertas.
-- Ejecutar una vez en el editor SQL de Supabase.
begin;
update public.products
   set description = 'Puerta de seguridad inteligente modelo ' || name || '.'
 where description like 'Flagship IA modelo %';
commit;
