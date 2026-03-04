// subir-gabinete.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las variables de entorno en .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --------------------------------------------------------------------------------
// 1. DATOS COMPLETOS DE GABINETES
// --------------------------------------------------------------------------------

const gabinetesData = [
  // --- MUEBLES TV Y APARADORES ---
{ 
    id: "gabinete-lateral-hygl81501-a", 
    name: "Gabinete HYGL81501-A", 
    category: "Gabinete", 
    code: "HYGL81501-A/HBG1856Y", 
    priceBase: 27590, 
    // RECUERDA: Guardar imagen en la ruta correspondiente, ej: /public/images/GABINETES/LATERAL/HYGL81501-A/render.jpg
    image: "/images/GABINETES/GAB1/render.jpg", 
    schematics: [
        "/images/GABINETES/GAB1/img1.jpg", 
        "/images/GABINETES/GAB1/img2.jpg",
        "/images/GABINETES/GAB1/img3.jpg"
    ],
    specs: { 
        dimensions: "1788 * 450 * 860 mm", 
        volume: "1.11 m³", 
        assembly: "Desmontado y Ensamblado / 2 Piezas" 
    },
    materials: [
        { part: "Cuerpo principal (Main body)", material: "MDF Grado E0", detail: "Color cera de aceite + Rojo Huayi (Alto brillo)" },
        { part: "Panel", material: "Mármol", detail: "Zilo Red (Oil-bright)" },
        { part: "Patas (Hardware foot)", material: "Acero Inoxidable", detail: "Gunmetal cepillado (Brushed Gunmetal)" }
    ],
    colors: {
        marble: [
            { name: "Zilo Red (Oil-bright)", hex: "#6A2C2A" } // Rojo oscuro texturizado (estimado basado en la imagen)
        ]
    },
    configurations: [
        { code: "HYGL81501-A", desc: "1788*450*860 mm", price: 27590 }
    ],
    priceList: [
        { name: "Gabinete Lateral 1788mm (Zilo Red)", size: "1788*450*860 mm", price: 27590 }
    ],
    customInstructions: {
        marble: "Interchangeable (oil-finish marbles)",
        dimensions: "Not customizable" // Asumido ya que no hay lista de otras medidas
    }
},
];

// --- 2. FUNCIÓN DE SUBIDA ---
async function subirGabinetes() {
  console.log(`🔥 Limpiando tabla 'gabinetes' en Supabase...`);
  
  // OJO: Esto borra TODO lo que haya en la tabla 'gabinetes' (y dejamos los dormitorios a salvo)
  const { error: deleteError } = await supabase.from('gabinetes').delete().neq('id', '0');
  
  if (deleteError) {
      console.error("❌ Error borrando datos existentes:", deleteError);
      return;
  }

  console.log(`📦 Preparando subida de ${gabinetesData.length} productos...`);
  
  // Insertamos en la tabla correcta
  const { data, error } = await supabase.from('gabinetes').insert(gabinetesData);

  if (error) {
    console.error("❌ Error subiendo datos:", error.message);
  } else {
    console.log(`✅ ¡ÉXITO! Los ${gabinetesData.length} gabinetes se han subido correctamente a la tabla 'gabinetes'.`);
  }
}

// Llamada a la función
subirGabinetes();