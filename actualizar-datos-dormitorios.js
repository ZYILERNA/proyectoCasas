require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las variables de entorno en .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// colores_disponibles y materiales_disponibles para cada producto de dormitorios
const updates = [
    // --- CAMAS ---
    { id: "cama-hyrc89101",       colores_disponibles: ["Negro"],              materiales_disponibles: ["Cuero", "Metal"] },
    { id: "cama-hyrc89101-b",     colores_disponibles: ["Marrón"],             materiales_disponibles: ["Cuero", "Metal"] },
    { id: "cama-hyrc89102",       colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "cama-hyrc89103",       colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Metal"] },
    { id: "cama-hyrc89105-bs",    colores_disponibles: ["Marrón"],             materiales_disponibles: ["Cuero", "Madera"] },
    { id: "cama-hyrc89106",       colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Madera"] },
    { id: "cama-hyrc89107",       colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero"] },
    { id: "cama-hyrc89118",       colores_disponibles: ["Gris"],               materiales_disponibles: ["Cuero", "Tela"] },
    { id: "cama-hyrc89122",       colores_disponibles: ["Beige"],              materiales_disponibles: ["Cuero", "Metal"] },
    { id: "cama-hyrc89125",       colores_disponibles: ["Marrón", "Gris"],     materiales_disponibles: ["Cuero", "Tela", "Metal"] },
    { id: "cama-hyrc89119",       colores_disponibles: ["Blanco", "Crema"],    materiales_disponibles: ["Tela", "Metal"] },
    { id: "cama-hyrc89115-b",     colores_disponibles: ["Marrón"],             materiales_disponibles: ["Cuero", "Metal"] },
    { id: "cama-hyrc89115-a",     colores_disponibles: ["Marrón"],             materiales_disponibles: ["Cuero", "Metal"] },
    // --- MESAS DE NOCHE ---
    { id: "mesa-noche-hygl81803-a",  colores_disponibles: ["Negro"],              materiales_disponibles: ["Madera", "Metal"] },
    { id: "mesa-noche-hygl81808-b",  colores_disponibles: ["Negro"],              materiales_disponibles: ["Madera", "Mármol"] },
    { id: "mesa-noche-hygl81810",    colores_disponibles: ["Marrón"],             materiales_disponibles: ["Madera"] },
    { id: "mesa-noche-hygl81811-l",  colores_disponibles: ["Gris"],               materiales_disponibles: ["Madera"] },
    { id: "mesa-noche-hygl81811-al", colores_disponibles: ["Gris"],               materiales_disponibles: ["Madera"] },
    { id: "mesa-noche-hygl81812-a",  colores_disponibles: ["Azul", "Negro"],      materiales_disponibles: ["Madera"] },
    { id: "mesa-noche-hygl81813",    colores_disponibles: ["Azul", "Gris"],       materiales_disponibles: ["Madera", "Acrílico"] },
    { id: "mesa-noche-hygl81818-a",  colores_disponibles: ["Natural"],            materiales_disponibles: ["Madera", "Vidrio"] },
    { id: "mesa-noche-hygl81823-ar", colores_disponibles: ["Negro", "Blanco"],    materiales_disponibles: ["Madera", "Mármol", "Metal"] },
    { id: "mesa-noche-hygl81823-br", colores_disponibles: ["Negro", "Gris"],      materiales_disponibles: ["Madera", "Metal"] },
    { id: "mesa-noche-hygl81825",    colores_disponibles: ["Natural"],            materiales_disponibles: ["Madera"] },
    { id: "mesa-noche-hygl81826-l",  colores_disponibles: ["Rosa", "Beige"],      materiales_disponibles: ["Cuero", "Madera"] },
    { id: "mesa-noche-hygl81827-ar", colores_disponibles: ["Beige", "Negro"],     materiales_disponibles: ["Cuero", "Madera"] },
    { id: "mesa-noche-hygl81815",    colores_disponibles: ["Negro", "Blanco"],    materiales_disponibles: ["Madera", "Metal"] },
    { id: "mesa-noche-hygl81801-r",  colores_disponibles: ["Gris", "Blanco"],     materiales_disponibles: ["Madera", "Mármol", "Metal"] },
    { id: "mesa-noche-hygl81605-1",  colores_disponibles: ["Gris"],               materiales_disponibles: ["Madera"] },
    // --- COLCHONES ---
    { id: "colchon-fyrc59201-hmcd-006", colores_disponibles: ["Blanco"],          materiales_disponibles: ["Tela"] },
    { id: "colchon-fyrc59203-hmcd-008", colores_disponibles: ["Blanco"],          materiales_disponibles: ["Tela"] },
    { id: "colchon-fyrc59202-hmcd-007", colores_disponibles: ["Blanco"],          materiales_disponibles: ["Tela"] },
    { id: "colchon-fyrc59206-hmcd-010", colores_disponibles: ["Blanco"],          materiales_disponibles: ["Tela"] },
    { id: "colchon-fyrc59207-hmcd-011", colores_disponibles: ["Blanco"],          materiales_disponibles: ["Tela"] },
    // --- BASES DE CAMA ---
    { id: "somier-tyrc9303-luxury",        colores_disponibles: ["Gris", "Blanco"], materiales_disponibles: ["Metal"] },
    { id: "somier-tyrc9305-folding",       colores_disponibles: ["Gris"],           materiales_disponibles: ["Metal", "Madera"] },
    { id: "somier-tyrc9306-disassembled",  colores_disponibles: ["Gris"],           materiales_disponibles: ["Metal", "Madera"] },
];

async function actualizarDormitorios() {
    console.log(`🔄 Actualizando ${updates.length} productos con colores_disponibles y materiales_disponibles...\n`);

    let ok = 0;
    let errors = 0;

    for (const item of updates) {
        const { id, colores_disponibles, materiales_disponibles } = item;
        const { error } = await supabase
            .from('dormitorios')
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
    console.log('   ALTER TABLE dormitorios ADD COLUMN IF NOT EXISTS colores_disponibles text[];');
    console.log('   ALTER TABLE dormitorios ADD COLUMN IF NOT EXISTS materiales_disponibles text[];');
}

actualizarDormitorios();
