// Script para agregar color_general y material_general a los productos de sofás y mesas
const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────────────────────
// MAPEO COMPLETO  id → { color_general, material_general }
// Derivado del análisis visual de imágenes + datos existentes de materiales/colores
// ─────────────────────────────────────────────────────────────────────────────

const SOFAS_MAP = {
    "hysf88-standard":      { color_general: "Gris",   material_general: "Tela"   },
    "hysf88-modular":       { color_general: "Marrón", material_general: "Cuero"  },
    "hysf88-curved":        { color_general: "Gris",   material_general: "Tela"   },
    "hysf88106-modular":    { color_general: "Beige",  material_general: "Tela"   },
    "hysf88107-modular":    { color_general: "Gris",   material_general: "Cuero"  },
    "hysf88119-modular":    { color_general: "Gris",   material_general: "Cuero"  },
    "hysf88120-2958":       { color_general: "Negro",  material_general: "Mixto"  },
    "hysf88121-modular":    { color_general: "Marrón", material_general: "Mixto"  },
    "hysf88123-modular":    { color_general: "Negro",  material_general: "Mixto"  },
    "hysf88125-modular":    { color_general: "Blanco", material_general: "Mixto"  },
    "hysf88126-modular":    { color_general: "Gris",   material_general: "Mixto"  },
    "hysf88127-modular":    { color_general: "Blanco", material_general: "Mixto"  },
    "hysf88128-standard":   { color_general: "Gris",   material_general: "Tela"   },
    "hysf88129-modular":    { color_general: "Blanco", material_general: "Mixto"  },
    "hysf88130-standard":   { color_general: "Beige",  material_general: "Cuero"  },
    "hysf88132-standard":   { color_general: "Beige",  material_general: "Tela"   },
    "hysf88133-modular":    { color_general: "Beige",  material_general: "Mixto"  },
    "hysf88203-modular":    { color_general: "Blanco", material_general: "Tela"   },
    "hysf88206-butaca":     { color_general: "Marrón", material_general: "Mixto"  },
    "hysf88131-modular":    { color_general: "Beige",  material_general: "Mixto"  },
};

const MESAS_MAP = {
    "mesa-hyjl82103":                       { color_general: "Marrón",   material_general: "Mármol"  },
    "mesa-auxiliar-ancient":                { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-rincon-zilo":                     { color_general: "Rojo",     material_general: "Mármol"  },
    "mesa-rincon-snow":                     { color_general: "Blanco",   material_general: "Mármol"  },
    "set-mesa-brasilia":                    { color_general: "Negro",    material_general: "Mixto"   },
    "mesa-centro-brasilia":                 { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-centro-emerald":                  { color_general: "Gris",     material_general: "Mármol"  },
    "mesa-auxiliar-prada":                  { color_general: "Verde",    material_general: "Mármol"  },
    "mesa-centro-silver":                   { color_general: "Plateado", material_general: "Metal"   },
    "mesa-auxiliar-silver":                 { color_general: "Plateado", material_general: "Metal"   },
    "mesa-centro-milky-way":                { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-centro-snow-mountain":            { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-auxiliar-milky-way":              { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-centro-snow-white-rect":          { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-centro-lan-kwai":                 { color_general: "Beige",    material_general: "Mármol"  },
    "mesa-rincon-ancient-wood":             { color_general: "Negro",    material_general: "Mármol"  },
    "set-mesa-ancient-zilo":                { color_general: "Negro",    material_general: "Mármol"  },
    "set-mesa-organic-black":               { color_general: "Negro",    material_general: "Madera"  },
    "mesa-auxiliar-huayi-red":              { color_general: "Rojo",     material_general: "Madera"  },
    "set-mesa-space-gray-huayi":            { color_general: "Gris",     material_general: "Mixto"   },
    "set-mesa-calacatta-gray":              { color_general: "Gris",     material_general: "Mixto"   },
    "set-mesa-space-gray-hex":              { color_general: "Gris",     material_general: "Mármol"  },
    "mesa-centro-glass-cave":               { color_general: "Beige",    material_general: "Vidrio"  },
    "set-mesa-snow-emerald":                { color_general: "Blanco",   material_general: "Mármol"  },
    "set-mesa-emerald-olive":               { color_general: "Gris",     material_general: "Mármol"  },
    "set-mesa-verona-emerald":              { color_general: "Gris",     material_general: "Mixto"   },
    "mesa-centro-milky-way-gold":           { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-auxiliar-snow-rect":              { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-auxiliar-c-shape-gunmetal":       { color_general: "Gris",     material_general: "Metal"   },
    "mesa-rincon-space-gold":               { color_general: "Dorado",   material_general: "Metal"   },
    "mesa-rincon-calacatta-gold":           { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-rincon-gold-cave":                { color_general: "Dorado",   material_general: "Metal"   },
    "mesa-auxiliar-c-shape-gold":           { color_general: "Dorado",   material_general: "Metal"   },
    "mesa-rincon-platinum-diamond":         { color_general: "Gris",     material_general: "Mármol"  },
    "mesa-rincon-huayi-red-fiberglass":     { color_general: "Rojo",     material_general: "Mixto"   },
    "mesa-rincon-prada-glass-gold":         { color_general: "Verde",    material_general: "Vidrio"  },
    "mesa-rincon-emerald-gold":             { color_general: "Gris",     material_general: "Mármol"  },
    "mesa-rincon-prada-arch":               { color_general: "Verde",    material_general: "Mármol"  },
    "mesa-rincon-burl-calacatta":           { color_general: "Marrón",   material_general: "Madera"  },
    "mesa-rincon-prada-green-hg1911":       { color_general: "Verde",    material_general: "Mármol"  },
    "mesa-rincon-cilindrica-hg1913":        { color_general: "Dorado",   material_general: "Metal"   },
    "mesa-comedor-hytl86101":               { color_general: "Gris",     material_general: "Mármol"  },
    "mesa-comedor-redonda-hytl86102":       { color_general: "Rojo",     material_general: "Mármol"  },
    "mesa-comedor-hytl86105":               { color_general: "Marrón",   material_general: "Mármol"  },
    "mesa-comedor-hytl86108":               { color_general: "Gris",     material_general: "Mármol"  },
    "mesa-comedor-hytl86111":               { color_general: "Marrón",   material_general: "Mármol"  },
    "mesa-comedor-hytl86128-b":             { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-comedor-hytl86129-a":             { color_general: "Gris",     material_general: "Mármol"  },
    "mesa-centro-hyjl82106-a1":             { color_general: "Marrón",   material_general: "Mármol"  },
    "mesa-comedor-hyjl82901":               { color_general: "Gris",     material_general: "Mármol"  },
    "consola-te-hygl81702-b":               { color_general: "Negro",    material_general: "Madera"  },
    "banco-te-hyyd85506":                   { color_general: "Marrón",   material_general: "Mixto"   },
    "mesa-comedor-hytl86127-hf1850":        { color_general: "Beige",    material_general: "Mármol"  },
    "mesa-comedor-hytl86109-hf1838":        { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-comedor-hytl86103-hf1830y":       { color_general: "Beige",    material_general: "Mármol"  },
    "mesa-hytl86201":                       { color_general: "Blanco",   material_general: "Piedra"  },
    "mesa-hytl86202":                       { color_general: "Negro",    material_general: "Madera"  },
    "mesa-hytl86202-b":                     { color_general: "Negro",    material_general: "Madera"  },
    "mesa-hytl86205":                       { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-te-hygl81706":                    { color_general: "Negro",    material_general: "Madera"  },
    "mesa-te-hygl81703":                    { color_general: "Negro",    material_general: "Madera"  },
    "mesa-auxiliar-hyjl82309-hg1908":       { color_general: "Beige",    material_general: "Piedra"  },
    "mesa-auxiliar-set-hyjl82105-hg1917":   { color_general: "Rojo",     material_general: "Mármol"  },
    "mesa-centro-set-hyjl82103-hc1923":     { color_general: "Beige",    material_general: "Mármol"  },
    "mesa-centro-set-hc1912":               { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-auxiliar-hc1912-b":               { color_general: "Marrón",   material_general: "Mármol"  },
    "mesa-centro-hc1912-a":                 { color_general: "Gris",     material_general: "Mármol"  },
    "mesa-auxiliar-set-hyjl82302-hg1906y":  { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-centro-hyjl82157":                { color_general: "Rojo",     material_general: "Mármol"  },
    "mesa-set-hyjl82156":                   { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-consola-hyjl82153-d":             { color_general: "Negro",    material_general: "Mixto"   },
    "mesa-centro-hyjl82153-c":              { color_general: "Beige",    material_general: "Mármol"  },
    "mesa-centro-hyjl82153-a":              { color_general: "Verde",    material_general: "Madera"  },
    "mesa-centro-hyjl82152-b":              { color_general: "Beige",    material_general: "Madera"  },
    "mesa-centro-hyjl82152-a":              { color_general: "Verde",    material_general: "Mármol"  },
    "mesa-auxiliar-hyjl82151-c":            { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-centro-hyjl82151-b":              { color_general: "Verde",    material_general: "Mármol"  },
    "mesa-centro-hyjl82151-a":              { color_general: "Beige",    material_general: "Mármol"  },
    "mesa-centro-hyjl82137":                { color_general: "Gris",     material_general: "Vidrio"  },
    "mesa-set-hyjl82136":                   { color_general: "Rojo",     material_general: "Mármol"  },
    "mesa-auxiliar-hyjl82136-b":            { color_general: "Rojo",     material_general: "Madera"  },
    "mesa-centro-hyjl82136-a":              { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-set-hyjl82135":                   { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-centro-hyjl82135":                { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-centro-hyjl82132-b":              { color_general: "Rojo",     material_general: "Madera"  },
    "mesa-centro-hyjl82132-a":              { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-set-hyjl82122-hc1951":            { color_general: "Negro",    material_general: "Vidrio"  },
    "mesa-set-hyjl82112-chin":              { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-centro-hyjl82111-b-hc1930y-b":    { color_general: "Negro",    material_general: "Madera"  },
    "mesa-set-hyjl82109-hc1931":            { color_general: "Negro",    material_general: "Mármol"  },
    "mesa-set-hyjl82107-hc1929":            { color_general: "Blanco",   material_general: "Mármol"  },
    "mesa-centro-hyjl82106-hc1922y":        { color_general: "Negro",    material_general: "Madera"  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FUNCIÓN: inserta color_general y material_general tras la línea id: "..."
// ─────────────────────────────────────────────────────────────────────────────
function insertFilterFields(content, mapping) {
    let modified = content;
    let count = 0;

    for (const [id, fields] of Object.entries(mapping)) {
        // Busca la línea exacta con este id (con comillas dobles o simples)
        const pattern = new RegExp(
            `([ \\t]+id:\\s*["']${escapeRegex(id)}["'],)(\\r?\\n)`,
            'g'
        );
        const replacement = `$1$2        color_general: "${fields.color_general}",$2        material_general: "${fields.material_general}",$2`;

        const before = modified;
        modified = modified.replace(pattern, replacement);
        if (modified !== before) count++;
    }

    return { content: modified, count };
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESAR SOFÁS
// ─────────────────────────────────────────────────────────────────────────────
const sofasPath = path.join(__dirname, 'subir-datos-sofas.js');
const sofasContent = fs.readFileSync(sofasPath, 'utf8');

// Verificar que no tenga ya los campos para no duplicarlos
if (sofasContent.includes('color_general:')) {
    console.log('⚠️  subir-datos-sofas.js ya contiene color_general. No se modificará de nuevo.');
} else {
    const { content: sofasModified, count: sofasCount } = insertFilterFields(sofasContent, SOFAS_MAP);
    fs.writeFileSync(sofasPath, sofasModified, 'utf8');
    console.log(`✅ subir-datos-sofas.js actualizado → ${sofasCount} de ${Object.keys(SOFAS_MAP).length} productos modificados`);
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESAR MESAS
// ─────────────────────────────────────────────────────────────────────────────
const mesasPath = path.join(__dirname, 'subir-datos-mesas.js');
const mesasContent = fs.readFileSync(mesasPath, 'utf8');

if (mesasContent.includes('color_general:')) {
    console.log('⚠️  subir-datos-mesas.js ya contiene color_general. No se modificará de nuevo.');
} else {
    const { content: mesasModified, count: mesasCount } = insertFilterFields(mesasContent, MESAS_MAP);
    fs.writeFileSync(mesasPath, mesasModified, 'utf8');
    console.log(`✅ subir-datos-mesas.js actualizado → ${mesasCount} de ${Object.keys(MESAS_MAP).length} productos modificados`);
}

console.log('\n📌 Campos añadidos a cada producto:');
console.log('   color_general   → Negro | Gris | Blanco | Beige | Marrón | Rojo | Verde | Dorado | Plateado');
console.log('   material_general → Mármol | Madera | Metal | Vidrio | Piedra | Cuero | Tela | Mixto');
console.log('\n🚀 Recuerda volver a ejecutar los scripts subir-datos-*.js para actualizar Supabase.');
