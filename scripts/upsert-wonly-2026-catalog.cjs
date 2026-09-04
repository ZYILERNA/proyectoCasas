#!/usr/bin/env node

/**
 * Safe importer for the WONLY 2026 catalogue.
 *
 * Dry-run (default): node scripts/upsert-wonly-2026-catalog.cjs
 * Apply:             node scripts/upsert-wonly-2026-catalog.cjs --apply
 * Verify public read: node scripts/upsert-wonly-2026-catalog.cjs --verify
 * Products only:     node scripts/upsert-wonly-2026-catalog.cjs --apply --only-products
 * Hardware only:     node scripts/upsert-wonly-2026-catalog.cjs --apply --only-hardware
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  WONLY_2026_HARDWARE,
  WONLY_2026_PRODUCTS,
} = require('../data/wonly-2026-products.cjs');

const ROOT = path.resolve(__dirname, '..');
const args = new Set(process.argv.slice(2));
const apply = args.has('--apply');
const verify = args.has('--verify');
const includeProducts = !args.has('--only-hardware');
const includeHardware = !args.has('--only-products');

if (apply && verify) {
  console.error('No combines --apply y --verify.');
  process.exit(1);
}

if (args.has('--only-products') && args.has('--only-hardware')) {
  console.error('No combines --only-products y --only-hardware.');
  process.exit(1);
}

const publicAssetExists = (publicPath) => fs.existsSync(
  path.join(ROOT, 'public', ...publicPath.replace(/^\//, '').split('/')),
);

const missingAssets = [
  ...(includeProducts ? WONLY_2026_PRODUCTS.map((product) => product.img) : []),
  ...(includeHardware ? WONLY_2026_HARDWARE.map((item) => item.image) : []),
].filter((assetPath) => !publicAssetExists(assetPath));

if (missingAssets.length) {
  console.error('Faltan assets; se cancela la importación:');
  missingAssets.forEach((assetPath) => console.error(`  - ${assetPath}`));
  process.exit(1);
}

console.log(`Productos preparados: ${includeProducts ? WONLY_2026_PRODUCTS.length : 0}`);
console.log(`Herrajes preparados: ${includeHardware ? WONLY_2026_HARDWARE.length : 0}`);
console.log(`Assets verificados: ${missingAssets.length === 0 ? 'sí' : 'no'}`);

if (!apply && !verify) {
  console.log('Simulación completada; Supabase no se ha modificado. Usa --apply para confirmar la carga.');
  process.exit(0);
}

require('dotenv').config({ path: path.join(ROOT, '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = verify
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('Faltan las credenciales necesarias de Supabase en .env.local.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function syncProducts() {
  const names = WONLY_2026_PRODUCTS.map((product) => product.name);
  const { data: existing, error: readError } = await supabase
    .from('products')
    .select('id,name')
    .in('name', names);
  if (readError) throw readError;

  const existingByName = new Map((existing || []).map((row) => [row.name, row.id]));
  const inserts = WONLY_2026_PRODUCTS.filter((product) => !existingByName.has(product.name));
  const updates = WONLY_2026_PRODUCTS.filter((product) => existingByName.has(product.name));

  if (inserts.length) {
    const { error } = await supabase.from('products').insert(inserts);
    if (error) throw error;
  }

  for (const product of updates) {
    const { error } = await supabase
      .from('products')
      .update(product)
      .eq('id', existingByName.get(product.name));
    if (error) throw error;
  }

  return { inserted: inserts.length, updated: updates.length };
}

async function syncHardware() {
  const ids = WONLY_2026_HARDWARE.map((item) => item.id);
  const { data: existing, error: readError } = await supabase
    .from('manillas')
    .select('id')
    .in('id', ids);
  if (readError) throw readError;

  const existingIds = new Set((existing || []).map((row) => row.id));
  const inserts = WONLY_2026_HARDWARE.filter((item) => !existingIds.has(item.id));
  const updates = WONLY_2026_HARDWARE.filter((item) => existingIds.has(item.id));

  if (inserts.length) {
    const { error } = await supabase.from('manillas').insert(inserts);
    if (error) throw error;
  }

  for (const item of updates) {
    const { error } = await supabase.from('manillas').update(item).eq('id', item.id);
    if (error) throw error;
  }

  return { inserted: inserts.length, updated: updates.length };
}

async function verifyPublicCatalog() {
  const productNames = WONLY_2026_PRODUCTS.map((product) => product.name);
  const hardwareIds = WONLY_2026_HARDWARE.map((item) => item.id);
  const [productsResponse, hardwareResponse, searchResponse] = await Promise.all([
    supabase
      .from('products')
      .select('name,category,description,specs,features,unlock,colors,img')
      .in('name', productNames),
    supabase.from('manillas').select('id').in('id', hardwareIds),
    supabase.from('products').select('name,category,img').ilike('name', '%WL-D055%').limit(3),
  ]);

  if (productsResponse.error) throw productsResponse.error;
  if (hardwareResponse.error) throw hardwareResponse.error;
  if (searchResponse.error) throw searchResponse.error;

  const visibleProducts = new Set((productsResponse.data || []).map((item) => item.name));
  const visibleHardware = new Set((hardwareResponse.data || []).map((item) => item.id));
  const missingProducts = productNames.filter((name) => !visibleProducts.has(name));
  const missingHardware = hardwareIds.filter((id) => !visibleHardware.has(id));
  const incompleteProducts = (productsResponse.data || []).filter((item) => (
    !item.category
    || !item.description
    || !item.unlock
    || !item.img
    || !Array.isArray(item.specs)
    || item.specs.length === 0
    || !Array.isArray(item.features)
    || item.features.length === 0
    || !Array.isArray(item.colors)
    || item.colors.length === 0
  ));

  console.log(`Productos visibles con la clave pública: ${visibleProducts.size}/${productNames.length}`);
  console.log(`Fichas completas con información y foto: ${visibleProducts.size - incompleteProducts.length}/${productNames.length}`);
  console.log(`Herrajes visibles con la clave pública: ${visibleHardware.size}/${hardwareIds.length}`);
  console.log(`Búsqueda pública "WL-D055": ${(searchResponse.data || []).map((item) => item.name).join(', ') || 'sin resultados'}`);

  if (missingProducts.length || missingHardware.length || incompleteProducts.length || !(searchResponse.data || []).length) {
    throw new Error('La verificación pública no devuelve todo el catálogo WONLY 2026.');
  }
}

async function main() {
  if (verify) {
    await verifyPublicCatalog();
    console.log('Verificación pública WONLY 2026 completada.');
    return;
  }

  if (includeProducts) {
    const result = await syncProducts();
    console.log(`Productos: ${result.inserted} creados, ${result.updated} actualizados.`);
  }
  if (includeHardware) {
    const result = await syncHardware();
    console.log(`Herrajes: ${result.inserted} creados, ${result.updated} actualizados.`);
  }
  console.log('Carga WONLY 2026 completada sin borrar registros existentes.');
}

main().catch((error) => {
  console.error('Error en la carga WONLY 2026:', error.message);
  if (error.cause) {
    const causeCode = error.cause.code ? `${error.cause.code}: ` : '';
    console.error(`Causa de conexión: ${causeCode}${error.cause.message}`);
  }
  process.exit(1);
});
