require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las variables de entorno en .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// colores_disponibles y materiales_disponibles para cada silla (basado en análisis visual de imágenes)
const updates = [
    // Lounge chairs SILLA1-SILLA9
    { id: "hyyd85-lounge-chair",           colores_disponibles: ["Negro"],              materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85102-lounge-chair",        colores_disponibles: ["Marrón"],             materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-lounge-chair-red",       colores_disponibles: ["Rojo"],               materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85-lounge-chair-bicolor",   colores_disponibles: ["Marrón", "Beige"],    materiales_disponibles: ["Cuero", "Tela", "Metal"] },
    { id: "hyyd85-lounge-chair-pattern",   colores_disponibles: ["Negro", "Blanco"],    materiales_disponibles: ["Tela", "Cuero", "Metal"] },
    { id: "hyyd85-lounge-chair-comfy",     colores_disponibles: ["Gris"],               materiales_disponibles: ["Tela"] },
    { id: "hyyd85-lounge-chair-swivel",    colores_disponibles: ["Marrón"],             materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-lounge-chair-wrap",      colores_disponibles: ["Marrón", "Gris"],     materiales_disponibles: ["Cuero", "Tela"] },
    { id: "hyyd85-lounge-chair-draped",    colores_disponibles: ["Beige"],              materiales_disponibles: ["Tela", "Madera"] },
    // SILLA10
    { id: "hyyd85-lounge-chair-85122",     colores_disponibles: ["Marrón", "Rojo"],     materiales_disponibles: ["Cuero", "Tela", "Madera", "Metal"] },
    // SILLA12
    { id: "hyyd85-cigar-chair",            colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Madera", "Metal"] },
    // SILLA13
    { id: "hyyd85-lounge-chair-127",       colores_disponibles: ["Verde"],              materiales_disponibles: ["Cuero", "Tela"] },
    // SILLA14-15 Rabbit chairs
    { id: "hyyd85-rabbit-chair",           colores_disponibles: ["Blanco"],             materiales_disponibles: ["Tela"] },
    { id: "hyyd85-rabbit-chair-black",     colores_disponibles: ["Negro"],              materiales_disponibles: ["Tela"] },
    // SILLA16-20
    { id: "hyyd85-lounge-chair-132",       colores_disponibles: ["Beige"],              materiales_disponibles: ["Tela", "Madera"] },
    { id: "hyyd85-butterfly-chair",        colores_disponibles: ["Rosa"],               materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85-knot-chair",             colores_disponibles: ["Beige"],              materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85-knot-chair-art",         colores_disponibles: ["Multicolor"],         materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85-monkey-chair",           colores_disponibles: ["Negro", "Gris"],      materiales_disponibles: ["Tela"] },
    // Dining chairs SILLA21-29
    { id: "hyyd85-dining-chair-201",       colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-dining-chair-202",       colores_disponibles: ["Negro"],              materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85-dining-chair-203",       colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Tela", "Metal"] },
    { id: "hyyd85-dining-chair-211b",      colores_disponibles: ["Gris"],               materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85-dining-chair-212a",      colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85-dining-chair-212b",      colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85-dining-chair-213a",      colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-dining-chair-215",       colores_disponibles: ["Beige", "Gris"],      materiales_disponibles: ["Cuero", "Tela", "Metal"] },
    { id: "hyyd85-dining-chair-216",       colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Madera"] },
    // SILLA31-36
    { id: "hyyd85-dining-chair-217",       colores_disponibles: ["Negro", "Beige"],     materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85-dining-chair-219",       colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero"] },
    { id: "hyyd85-bar-chair-301c",         colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85-chair-305",              colores_disponibles: ["Marrón"],             materiales_disponibles: ["Cuero"] },
    { id: "hyyd85-chin-chair",             colores_disponibles: ["Marrón"],             materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-bar-chair-307",          colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Madera"] },
    // Chaise lounges SILLA37-38
    { id: "hyyd85-chaise-lounge-501b",     colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-chaise-lounge-501c",     colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    // Footrests/Stools SILLA39-54
    { id: "hyyd85-footrest-505",           colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-footrest-506",           colores_disponibles: ["Negro", "Beige"],     materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85-footrest-507",           colores_disponibles: ["Gris"],               materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85-footrest-510",           colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero"] },
    { id: "hyyd85-footrest-512b",          colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-footrest-512c",          colores_disponibles: ["Rojo"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-footrest-512d",          colores_disponibles: ["Rosa"],               materiales_disponibles: ["Tela", "Madera"] },
    { id: "hyyd85-makeup-stool-515a",      colores_disponibles: ["Negro", "Beige"],     materiales_disponibles: ["Cuero", "Tela"] },
    { id: "hyyd85-stool-519a",             colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero"] },
    { id: "hyyd85-footrest-520",           colores_disponibles: ["Azul", "Blanco"],     materiales_disponibles: ["Cuero", "Tela"] },
    { id: "hyyd85-stool-521",              colores_disponibles: ["Marrón"],             materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85-footrest-522",           colores_disponibles: ["Beige", "Gris"],      materiales_disponibles: ["Cuero", "Tela", "Metal"] },
    { id: "hyyd85-footrest-523",           colores_disponibles: ["Rojo"],               materiales_disponibles: ["Cuero"] },
    { id: "hyyd85-tea-stool-525",          colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Tela", "Madera"] },
    { id: "hyyd85-bench-526",              colores_disponibles: ["Azul"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-stool-905",              colores_disponibles: ["Negro", "Marrón"],    materiales_disponibles: ["Madera"] },
    // Special / artistic chairs SILLA55-58
    { id: "hyyd85-egg-119",                colores_disponibles: ["Rojo"],               materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85-loong-118",              colores_disponibles: ["Negro", "Morado", "Rojo", "Azul"], materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85-ant-137",                colores_disponibles: ["Morado"],             materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85-flower-133",             colores_disponibles: ["Rojo"],               materiales_disponibles: ["Cuero", "Metal"] },
    // SILLA59-67
    { id: "hyyd85-heart-518",              colores_disponibles: ["Blanco"],             materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85210-cornice-dining-chair", colores_disponibles: ["Gris"],              materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85209-a-dining-chair",      colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85129-change-tea-chair",    colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85128-wabi-sabi-lounge-chair", colores_disponibles: ["Rosa"],            materiales_disponibles: ["Tela", "Metal"] },
    { id: "hyyd85509-footrest-d16",        colores_disponibles: ["Beige"],              materiales_disponibles: ["Tela", "Madera"] },
    { id: "hyyd85309-book-chair",          colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Metal"] },
    { id: "hyyd85308-book-chair",          colores_disponibles: ["Negro"],              materiales_disponibles: ["Cuero", "Madera"] },
    { id: "hyyd85218-dining-chair",        colores_disponibles: ["Marrón", "Beige"],    materiales_disponibles: ["Cuero", "Metal"] },
];

async function actualizarSillas() {
    console.log(`🔄 Actualizando ${updates.length} sillas con colores_disponibles y materiales_disponibles...\n`);

    let ok = 0;
    let errors = 0;

    for (const item of updates) {
        const { id, colores_disponibles, materiales_disponibles } = item;
        const { error } = await supabase
            .from('sillas')
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
    console.log('   ALTER TABLE sillas ADD COLUMN IF NOT EXISTS colores_disponibles text[];');
    console.log('   ALTER TABLE sillas ADD COLUMN IF NOT EXISTS materiales_disponibles text[];');
}

actualizarSillas();
