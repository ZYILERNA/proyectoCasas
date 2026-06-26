// subir-datos-manillas.js
// Sube el catálogo de Manillas (manijas de puerta WONLY) a Supabase.
//
// 1) Crea la tabla en Supabase Dashboard → SQL Editor (solo la primera vez):
//
//   CREATE TABLE IF NOT EXISTS manillas (
//     id          TEXT PRIMARY KEY,
//     code        TEXT,
//     name        TEXT,
//     category    TEXT,            -- familia de color / acabado (para filtros)
//     description TEXT,
//     image       TEXT,            -- imagen principal (estudio)
//     gallery     TEXT[],          -- resto de imágenes (incluye la foto del KIT)
//     has_kit     BOOLEAN DEFAULT false,
//     colors      JSONB,           -- [{ name, hex }]
//     specs       JSONB,           -- ficha técnica
//     colores_disponibles TEXT[]   -- para filtros rápidos
//   );
//   ALTER TABLE manillas ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "lectura publica manillas" ON manillas FOR SELECT USING (true);
//
// 2) Ejecuta:  node subir-datos-manillas.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Preferimos la SERVICE_ROLE para permisos de escritura
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno en .env.local');
  console.error('Necesitas NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Paletas de acabado reutilizables ---
const C = {
  negro:   { name: 'Negro',         hex: '#1a1a1a' },
  grafito: { name: 'Grafito',       hex: '#3a3d42' },
  nogal:   { name: 'Madera Nogal',  hex: '#6b4226' },
  dorado:  { name: 'Dorado',        hex: '#c9a227' },
  niquel:  { name: 'Níquel',        hex: '#b8bcc0' },
  cromo:   { name: 'Cromo Pulido',  hex: '#c0c4c8' },
  oroRosa: { name: 'Oro Rosa',      hex: '#b76e79' },
};

const BASE = '/images/MANILLAS';

// Genera el array de galería [img2..imgN] a partir del nº de imágenes
const galeria = (carpeta, total) =>
  Array.from({ length: total - 1 }, (_, i) => `${BASE}/${carpeta}/img${i + 2}.webp`);

// --- MODELOS ---
const MODELOS = [
  {
    id: '114088',
    code: '114088',
    name: 'Manilla 114088',
    category: 'Negro',
    description:
      'Manilla de palanca recta minimalista en negro mate con roseta redonda. Líneas rectas y perfil plano para puertas de interior de estilo contemporáneo.',
    image: `${BASE}/114088/img1.webp`,
    gallery: galeria('114088', 4),
    has_kit: false,
    colors: [C.negro],
    specs: {
      color_familia: 'Negro',
      distancia_ejes: '90 mm',
      material: 'Aleación de hierro y zinc',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Negro'],
  },
  {
    id: '114108',
    code: '114108',
    name: 'Manilla 114108',
    category: 'Negro',
    description:
      'Manilla de palanca ergonómica curva en negro mate con roseta redonda. Empuñadura suave y cómoda, ideal para dormitorios y baños.',
    image: `${BASE}/114108/img1.webp`,
    gallery: galeria('114108', 4),
    has_kit: false,
    colors: [C.negro],
    specs: {
      color_familia: 'Negro',
      distancia_ejes: '90 mm',
      material: 'Aleación de hierro y zinc',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Negro'],
  },
  {
    id: '5801259',
    code: '5801259',
    name: 'Manilla 5801259',
    category: 'Grafito',
    description:
      'Manilla de diseño angular facetado en acabado grafito (gunmetal) con roseta cuadrada. Set completo de instalación con cuerpo, cilindro, bisagras y tornillería.',
    image: `${BASE}/5801259/img1.webp`,
    gallery: galeria('5801259', 5),
    has_kit: true,
    colors: [C.grafito],
    specs: {
      color_familia: 'Grafito',
      distancia_ejes: '90 mm',
      material: 'Aleación de hierro y zinc',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Grafito'],
  },
  {
    id: '5801270',
    code: '5801270',
    name: 'Manilla 5801270',
    category: 'Madera',
    description:
      'Manilla bicolor que combina cuerpo grafito con empuñadura de madera de nogal natural y roseta redonda. Set completo de instalación incluido.',
    image: `${BASE}/5801270/img1.webp`,
    gallery: galeria('5801270', 5),
    has_kit: true,
    colors: [C.grafito, C.nogal],
    specs: {
      color_familia: 'Grafito / Nogal',
      distancia_ejes: '90 mm',
      material: 'Aleación de zinc y madera de nogal',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Grafito', 'Madera Nogal'],
  },
  {
    id: '5801271',
    code: '5801271',
    name: 'Manilla 5801271',
    category: 'Madera',
    description:
      'Manilla clásica con cuerpo dorado pulido y empuñadura de madera de nogal natural. Acabado cálido y elegante con set completo de instalación.',
    image: `${BASE}/5801271/img1.webp`,
    gallery: galeria('5801271', 5),
    has_kit: true,
    colors: [C.dorado, C.nogal],
    specs: {
      color_familia: 'Dorado / Nogal',
      distancia_ejes: '90 mm',
      material: 'Aleación de zinc y madera de nogal',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Dorado', 'Madera Nogal'],
  },
  {
    id: '5801277',
    code: '5801277',
    name: 'Manilla 5801277',
    category: 'Dorado',
    description:
      'Manilla premium bicolor con roseta redonda, disponible en dorado pulido con níquel satinado y en acabado oro rosa con inserto de madera clara. Diseño de lujo con set completo de instalación (cuerpo, cilindro, bisagras y tope).',
    image: `${BASE}/5801277/img1.webp`,
    gallery: galeria('5801277', 6),
    has_kit: true,
    colors: [C.dorado, C.niquel, C.oroRosa],
    specs: {
      color_familia: 'Dorado / Níquel / Oro Rosa',
      distancia_ejes: '90 mm',
      material: 'Aleación de hierro y zinc',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Dorado', 'Níquel', 'Oro Rosa'],
  },
  {
    id: '5801312',
    code: '5801312',
    name: 'Manilla 5801312',
    category: 'Negro',
    description:
      'Manilla cilíndrica con empuñadura estriada (acanalada) en negro mate y roseta redonda. Textura de agarre superior y estética industrial. Set completo incluido.',
    image: `${BASE}/5801312/img1.webp`,
    gallery: galeria('5801312', 5),
    has_kit: true,
    colors: [C.negro],
    specs: {
      color_familia: 'Negro',
      distancia_ejes: '90 mm',
      material: 'Aleación de hierro y zinc',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Negro'],
  },
  {
    id: 'l5801282',
    code: 'L5801282',
    name: 'Manilla L5801282',
    category: 'Negro',
    description:
      'Manilla de palanca recta en acabado negro con roseta redonda y bocallave de cilindro. Diseño plano y sobrio para puertas de interior modernas.',
    image: `${BASE}/L5801282/img1.webp`,
    gallery: galeria('L5801282', 4),
    has_kit: false,
    colors: [C.negro],
    specs: {
      color_familia: 'Negro',
      distancia_ejes: '90 mm',
      material: 'Aleación de hierro y zinc',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Negro'],
  },
  {
    id: 'l5802237',
    code: 'L5802237',
    name: 'Manilla L5802237',
    category: 'Madera',
    description:
      'Manilla negra mate con inserto de madera de nogal y roseta cuadrada. Contraste elegante de metal y madera con set completo de instalación.',
    image: `${BASE}/L5802237/img1.webp`,
    gallery: galeria('L5802237', 5),
    has_kit: true,
    colors: [C.negro, C.nogal],
    specs: {
      color_familia: 'Negro / Nogal',
      distancia_ejes: '90 mm',
      material: 'Aleación de zinc y madera de nogal',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Negro', 'Madera Nogal'],
  },
  {
    id: 'ld119',
    code: 'LD119',
    name: 'Manilla LD119',
    category: 'Cromo',
    description:
      'Manilla curva en acabado cromo pulido brillante con roseta redonda. Reflejo espejo y línea elegante. Incluye set completo de instalación en níquel.',
    image: `${BASE}/Ld119/img1.webp`,
    gallery: galeria('Ld119', 6),
    has_kit: true,
    colors: [C.cromo],
    specs: {
      color_familia: 'Cromo',
      distancia_ejes: '90 mm',
      material: 'Aleación de hierro y zinc',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Cromo Pulido'],
  },
  {
    id: 'mai165',
    code: 'MAI 165',
    name: 'Manilla Mai 165',
    category: 'Negro',
    description:
      'Modelo básico de palanca recta en negro mate con roseta redonda. Solución sencilla, robusta y económica para puertas de interior.',
    image: `${BASE}/MAI165/img1.webp`,
    gallery: galeria('MAI165', 3),
    has_kit: false,
    colors: [C.negro],
    specs: {
      color_familia: 'Negro',
      distancia_ejes: '90 mm',
      material: 'Aleación de hierro y zinc',
      perforacion: 'Orificio de cilindro',
      marca: 'WONLY',
    },
    colores_disponibles: ['Negro'],
  },
];

async function uploadData() {
  console.log('📡 Conectando a Supabase...');
  console.log(`Subiendo ${MODELOS.length} manillas...`);

  // Limpiamos la tabla para evitar registros huérfanos al reejecutar
  const { error: errDelete } = await supabase.from('manillas').delete().neq('id', '');
  if (errDelete) {
    console.error('❌ Error al limpiar manillas:', errDelete.message);
    console.error('   ¿Creaste la tabla "manillas"? Revisa el SQL al inicio de este archivo.');
    return;
  }

  const { error } = await supabase.from('manillas').insert(MODELOS);
  if (error) {
    console.error('❌ Error al insertar manillas:', error.message);
  } else {
    console.log('✅ Manillas subidas correctamente.');
  }
}

uploadData();
