-- Migración: agregar columnas de filtro a las tablas sofas y mesas
-- Ejecutar en: Supabase Dashboard → SQL Editor

ALTER TABLE sofas
  ADD COLUMN IF NOT EXISTS color_general          TEXT,
  ADD COLUMN IF NOT EXISTS material_general       TEXT,
  ADD COLUMN IF NOT EXISTS colores_disponibles    TEXT[],
  ADD COLUMN IF NOT EXISTS materiales_disponibles TEXT[];

ALTER TABLE mesas
  ADD COLUMN IF NOT EXISTS color_general          TEXT,
  ADD COLUMN IF NOT EXISTS material_general       TEXT,
  ADD COLUMN IF NOT EXISTS colores_disponibles    TEXT[],
  ADD COLUMN IF NOT EXISTS materiales_disponibles TEXT[];
