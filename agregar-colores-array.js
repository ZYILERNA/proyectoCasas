// Script: agrega colores_disponibles y materiales_disponibles (arrays) a sofás
// Basado en análisis visual de TODAS las imágenes (render_iso + img1..imgN)
const fs = require('fs');
const path = require('path');

const SOFAS_ARRAYS = {
    "hysf88-standard":    { colores_disponibles: ["Gris", "Beige", "Marrón"],                        materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88-modular":     { colores_disponibles: ["Marrón", "Gris", "Azul", "Verde", "Beige"],       materiales_disponibles: ["Cuero", "Tela"] },
    "hysf88-curved":      { colores_disponibles: ["Gris", "Beige", "Negro", "Marrón", "Rojo", "Verde", "Azul"], materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88106-modular":  { colores_disponibles: ["Beige", "Gris", "Marrón", "Negro"],               materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88107-modular":  { colores_disponibles: ["Negro", "Verde", "Marrón", "Dorado", "Azul"],     materiales_disponibles: ["Cuero", "Tela"] },
    "hysf88119-modular":  { colores_disponibles: ["Gris", "Beige"],                                  materiales_disponibles: ["Cuero"] },
    "hysf88120-2958":     { colores_disponibles: ["Negro", "Gris", "Beige", "Verde", "Marrón"],      materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88121-modular":  { colores_disponibles: ["Gris", "Beige", "Negro", "Marrón"],               materiales_disponibles: ["Cuero", "Tela"] },
    "hysf88123-modular":  { colores_disponibles: ["Negro", "Gris", "Blanco", "Beige"],               materiales_disponibles: ["Cuero", "Tela"] },
    "hysf88125-modular":  { colores_disponibles: ["Blanco", "Negro", "Gris", "Beige"],               materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88126-modular":  { colores_disponibles: ["Gris", "Beige", "Marrón"],                        materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88127-modular":  { colores_disponibles: ["Beige", "Marrón"],                                materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88128-standard": { colores_disponibles: ["Gris", "Beige"],                                  materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88129-modular":  { colores_disponibles: ["Beige", "Gris"],                                  materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88130-standard": { colores_disponibles: ["Marrón"],                                          materiales_disponibles: ["Cuero"] },
    "hysf88132-standard": { colores_disponibles: ["Beige", "Marrón"],                                materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88133-modular":  { colores_disponibles: ["Beige", "Marrón", "Rojo", "Gris", "Blanco"],     materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88203-modular":  { colores_disponibles: ["Gris", "Beige"],                                  materiales_disponibles: ["Tela", "Cuero"] },
    "hysf88206-butaca":   { colores_disponibles: ["Marrón"],                                          materiales_disponibles: ["Tela"] },
    "hysf88131-modular":  { colores_disponibles: ["Gris", "Beige"],                                  materiales_disponibles: ["Tela", "Cuero"] },
};

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const sofasPath = path.join(__dirname, 'subir-datos-sofas.js');
let content = fs.readFileSync(sofasPath, 'utf8');

if (content.includes('colores_disponibles:')) {
    console.log('⚠️  Ya contiene colores_disponibles. Abortando.');
    process.exit(0);
}

let count = 0;
for (const [id, fields] of Object.entries(SOFAS_ARRAYS)) {
    const coloresStr = JSON.stringify(fields.colores_disponibles);
    const materialesStr = JSON.stringify(fields.materiales_disponibles);

    const pattern = new RegExp(
        `([ \\t]+material_general:\\s*"[^"]*",)(\\r?\\n)`,
        ''
    );

    // Reemplaza la línea material_general del producto correcto
    // Usamos el id como ancla para hacer reemplazos únicos
    const idPattern = new RegExp(
        `(id:\\s*"${escapeRegex(id)}",[\\s\\S]*?material_general:\\s*"[^"]*",)(\\r?\\n)`,
        ''
    );

    const before = content;
    content = content.replace(idPattern, (match, p1, p2) => {
        return `${p1}${p2}        colores_disponibles: ${coloresStr},${p2}        materiales_disponibles: ${materialesStr},${p2}`;
    });
    if (content !== before) count++;
}

fs.writeFileSync(sofasPath, content, 'utf8');
console.log(`✅ subir-datos-sofas.js: ${count} de ${Object.keys(SOFAS_ARRAYS).length} productos actualizados con colores_disponibles[]`);
