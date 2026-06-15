require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las variables de entorno en .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
    // --- GAB1-GAB11 (Gabinetes laterales / consolas) ---
    { id: "gabinete-lateral-hygl81501-a",  colores_disponibles: ["Negro", "Rojo"],          materiales_disponibles: ["Madera", "Mármol", "Metal"] },
    { id: "gabinete-lateral-hygl81502",    colores_disponibles: ["Marrón"],                 materiales_disponibles: ["Madera", "Metal"] },
    { id: "gabinete-lateral-hygl81503",    colores_disponibles: ["Gris", "Azul"],           materiales_disponibles: ["Madera", "Metal"] },
    { id: "gabinete-lateral-hygl81507-a",  colores_disponibles: ["Natural", "Blanco"],      materiales_disponibles: ["Madera", "Mármol", "Metal"] },
    { id: "gabinete-lateral-hygl81515",    colores_disponibles: ["Naranja"],                materiales_disponibles: ["Madera"] },
    { id: "gabinete-lateral-hygl81516",    colores_disponibles: ["Gris"],                   materiales_disponibles: ["Madera"] },
    { id: "gabinete-lateral-hygl81517",    colores_disponibles: ["Beige"],                  materiales_disponibles: ["Cuero", "Madera", "Metal"] },
    { id: "gabinete-hygl81518",            colores_disponibles: ["Negro", "Blanco"],        materiales_disponibles: ["Madera", "Vidrio", "Metal"] },
    { id: "gabinete-hygl81505-b",          colores_disponibles: ["Rojo", "Negro"],          materiales_disponibles: ["Mármol", "Metal"] },
    { id: "gabinete-hygl81506",            colores_disponibles: ["Negro", "Rojo"],          materiales_disponibles: ["Madera", "Metal"] },
    { id: "gabinete-hygl81302",            colores_disponibles: ["Gris", "Beige"],          materiales_disponibles: ["Madera", "Cuero", "Vidrio", "Metal"] },
    // --- GAB16-GAB19 (Estanterías / Biombo) ---
    { id: "estanteria-hygl81909",          colores_disponibles: ["Negro", "Dorado"],        materiales_disponibles: ["Madera", "Metal"] },
    { id: "gabinete-hygl81705-a",          colores_disponibles: ["Negro", "Gris"],          materiales_disponibles: ["Madera", "Mármol", "Metal"] },
    { id: "gabinete-hygl81705-b",          colores_disponibles: ["Negro", "Beige"],         materiales_disponibles: ["Madera", "Cuero", "Metal"] },
    { id: "biombo-hygl81913",              colores_disponibles: ["Negro", "Beige"],         materiales_disponibles: ["Madera", "Metal", "Tela"] },
    // --- GAB20-GAB27 (Estanterías / Cómodas / Escritorios / Gabinetes especiales) ---
    { id: "Estanteria-hygl819098",         colores_disponibles: ["Negro", "Rojo"],          materiales_disponibles: ["Madera", "Metal"] },
    { id: "comoda-hygl81906-1",            colores_disponibles: ["Gris", "Beige"],          materiales_disponibles: ["Cuero", "Vidrio", "Metal"] },
    { id: "escritorio-hytl86303",          colores_disponibles: ["Negro", "Beige"],         materiales_disponibles: ["Madera", "Cuero", "Metal"] },
    { id: "escritorio-hytl86305",          colores_disponibles: ["Negro", "Gris"],          materiales_disponibles: ["Madera", "Metal"] },
    { id: "escritorio-hytl86301",          colores_disponibles: ["Negro", "Gris", "Beige"], materiales_disponibles: ["Madera", "Cuero", "Metal"] },
    { id: "gabinete-hysf88901-fsg-01",     colores_disponibles: ["Gris", "Beige"],          materiales_disponibles: ["Cuero", "Metal"] },
    { id: "gabinete-hygl81918-a",          colores_disponibles: ["Verde", "Gris"],          materiales_disponibles: ["Madera", "Metal"] },
    { id: "estanteria-hygl81910",          colores_disponibles: ["Beige", "Gris"],          materiales_disponibles: ["Madera", "Metal"] },
    // --- GAB28-GAB29 (Vitrinas / Gabinete de Té) ---
    { id: "gabinete-hygl81901-hm1833y-1",  colores_disponibles: ["Negro", "Beige"],         materiales_disponibles: ["Madera", "Vidrio", "Metal"] },
    { id: "gabinete-hygl81701-hcg1801y-1", colores_disponibles: ["Negro", "Gris"],          materiales_disponibles: ["Madera", "Metal"] },
    // --- GAB30-GAB32 (Tocadores) ---
    { id: "mesa-tocador-hygl81606",        colores_disponibles: ["Gris", "Negro"],          materiales_disponibles: ["Madera", "Metal"] },
    { id: "mesa-tocador-hygl81605",        colores_disponibles: ["Gris", "Dorado"],         materiales_disponibles: ["Madera", "Cuero", "Mármol"] },
    { id: "tocador-hygl81603-a",           colores_disponibles: ["Negro", "Dorado"],        materiales_disponibles: ["Madera", "Vidrio", "Metal"] },
];

async function actualizarGabinetes() {
    console.log(`🔄 Actualizando ${updates.length} productos con colores_disponibles y materiales_disponibles...\n`);

    let ok = 0;
    let errors = 0;

    for (const item of updates) {
        const { id, colores_disponibles, materiales_disponibles } = item;
        const { error } = await supabase
            .from('gabinetes')
            .update({ colores_disponibles, materiales_disponibles })
            .eq('id', id);

        if (error) {
            console.error(`❌ Error en ${id}:`, error.message);
            errors++;
        } else {
            console.log(`✅ ${id}`);
            ok++;
        }
    }

    console.log(`\n✅ ${ok} productos actualizados`);
    if (errors > 0) console.log(`❌ ${errors} errores`);
    console.log('\n💡 Si hay errores de columna faltante, ejecuta primero esta migración en Supabase SQL Editor:');
    console.log('   ALTER TABLE gabinetes ADD COLUMN IF NOT EXISTS colores_disponibles text[];');
    console.log('   ALTER TABLE gabinetes ADD COLUMN IF NOT EXISTS materiales_disponibles text[];');
}

actualizarGabinetes();
