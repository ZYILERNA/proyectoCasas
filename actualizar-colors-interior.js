// Actualiza colors.interior con nombre, hex e imagen correcta por color
// Mapeo basado en análisis visual de cada imagen
const fs = require('fs');
const path = require('path');

const COLORES_INTERIOR = {
    "hysf88-standard": [
        { name: "Gris",   hex: "#9BA4B1", image: "/images/SOFA/SOFA1/img1.jpg" },
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA1/img3.jpg" },
        { name: "Marrón", hex: "#8B6F52", image: "/images/SOFA/SOFA1/img17.jpg" },
    ],
    "hysf88-modular": [
        { name: "Marrón", hex: "#4A4644", image: "/images/SOFA/SOFA2/img1.jpg" },
        { name: "Gris",   hex: "#9BA4B1", image: "/images/SOFA/SOFA2/img3.jpg" },
        { name: "Azul",   hex: "#4E7F8C", image: "/images/SOFA/SOFA2/img2.jpg" },
        { name: "Verde",  hex: "#7A8A55", image: "/images/SOFA/SOFA2/img4.jpg" },
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA2/img8.jpg" },
    ],
    "hysf88-curved": [
        { name: "Gris",   hex: "#A39E9E", image: "/images/SOFA/SOFA3/img1.jpg" },
        { name: "Beige",  hex: "#D9D0BF", image: "/images/SOFA/SOFA3/img4.jpg" },
        { name: "Negro",  hex: "#2A2A2A", image: "/images/SOFA/SOFA3/img20.jpg" },
        { name: "Marrón", hex: "#6B5A40", image: "/images/SOFA/SOFA3/img22.jpg" },
        { name: "Rojo",   hex: "#8A3535", image: "/images/SOFA/SOFA3/img23.jpg" },
        { name: "Verde",  hex: "#4A6A35", image: "/images/SOFA/SOFA3/img26.jpg" },
        { name: "Azul",   hex: "#4E7F8C", image: "/images/SOFA/SOFA3/img28.jpg" },
    ],
    "hysf88106-modular": [
        { name: "Beige",  hex: "#E5E1D9", image: "/images/SOFA/SOFA4/img1.jpg" },
        { name: "Negro",  hex: "#2A2A2A", image: "/images/SOFA/SOFA4/img7.jpg" },
        { name: "Marrón", hex: "#8B7355", image: "/images/SOFA/SOFA4/img10.jpg" },
        { name: "Gris",   hex: "#9BA4B1", image: "/images/SOFA/SOFA4/img17.jpg" },
    ],
    "hysf88107-modular": [
        { name: "Negro",  hex: "#2A2A2A", image: "/images/SOFA/SOFA5/img1.jpg" },
        { name: "Verde",  hex: "#4A6A35", image: "/images/SOFA/SOFA5/img11.jpg" },
        { name: "Marrón", hex: "#8B7355", image: "/images/SOFA/SOFA5/img12.jpg" },
        { name: "Dorado", hex: "#C9A84C", image: "/images/SOFA/SOFA5/img15.jpg" },
        { name: "Azul",   hex: "#4E7F8C", image: "/images/SOFA/SOFA5/img21.jpg" },
    ],
    "hysf88119-modular": [
        { name: "Gris",   hex: "#6D6D6D", image: "/images/SOFA/SOFA6/img1.jpg" },
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA6/img2.jpg" },
    ],
    "hysf88120-2958": [
        { name: "Negro",  hex: "#353535", image: "/images/SOFA/SOFA7/img1.jpg" },
        { name: "Gris",   hex: "#6B6B6B", image: "/images/SOFA/SOFA7/img1.jpg" },
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA7/img2.jpg" },
        { name: "Verde",  hex: "#6A8A5A", image: "/images/SOFA/SOFA7/img7.jpg" },
        { name: "Marrón", hex: "#7A6045", image: "/images/SOFA/SOFA7/img8.jpg" },
    ],
    "hysf88121-modular": [
        { name: "Gris",   hex: "#9E968A", image: "/images/SOFA/SOFA8/img1.jpg" },
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA8/img3.jpg" },
        { name: "Negro",  hex: "#1A1A1A", image: "/images/SOFA/SOFA8/img5.jpg" },
        { name: "Marrón", hex: "#73675B", image: "/images/SOFA/SOFA8/img6.jpg" },
    ],
    "hysf88123-modular": [
        { name: "Negro",  hex: "#1A1A1B", image: "/images/SOFA/SOFA9/img1.jpg" },
        { name: "Gris",   hex: "#6D6D6D", image: "/images/SOFA/SOFA9/img27.jpg" },
        { name: "Blanco", hex: "#F0EDE8", image: "/images/SOFA/SOFA9/img22.jpg" },
        { name: "Beige",  hex: "#D9D9D9", image: "/images/SOFA/SOFA9/img25.jpg" },
    ],
    "hysf88125-modular": [
        { name: "Blanco", hex: "#F2F2F0", image: "/images/SOFA/SOFA10/render_iso.jpg" },
        { name: "Negro",  hex: "#1A1A1A", image: "/images/SOFA/SOFA10/img10.jpg" },
        { name: "Gris",   hex: "#9BA4B1", image: "/images/SOFA/SOFA10/img1.jpg" },
        { name: "Beige",  hex: "#C2BCB2", image: "/images/SOFA/SOFA10/img5.jpg" },
    ],
    "hysf88126-modular": [
        { name: "Gris",   hex: "#8A8279", image: "/images/SOFA/SOFA11/render_iso.jpg" },
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA11/img18.jpg" },
        { name: "Marrón", hex: "#634734", image: "/images/SOFA/SOFA11/img11.jpg" },
    ],
    "hysf88127-modular": [
        { name: "Beige",  hex: "#F2F2F0", image: "/images/SOFA/SOFA12/render_iso.jpg" },
        { name: "Marrón", hex: "#8B6F52", image: "/images/SOFA/SOFA12/img13.jpg" },
    ],
    "hysf88128-standard": [
        { name: "Gris",   hex: "#7E7873", image: "/images/SOFA/SOFA13/render_iso.jpg" },
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA13/img2.jpg" },
    ],
    "hysf88129-modular": [
        { name: "Beige",  hex: "#D6D3D1", image: "/images/SOFA/SOFA14/render_iso.jpg" },
        { name: "Gris",   hex: "#5C5C5C", image: "/images/SOFA/SOFA14/img8.jpg" },
    ],
    "hysf88130-standard": [
        { name: "Marrón", hex: "#9B8E85", image: "/images/SOFA/SOFA15/render_iso.jpg" },
    ],
    "hysf88132-standard": [
        { name: "Beige",  hex: "#D9D1C5", image: "/images/SOFA/SOFA16/render_iso.jpg" },
        { name: "Marrón", hex: "#8B6F52", image: "/images/SOFA/SOFA16/img3.jpg" },
    ],
    "hysf88133-modular": [
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA17/render_iso.jpg" },
        { name: "Marrón", hex: "#8B6F52", image: "/images/SOFA/SOFA17/img1.jpg" },
        { name: "Blanco", hex: "#F0EDE8", image: "/images/SOFA/SOFA17/img2.jpg" },
        { name: "Rojo",   hex: "#8A3535", image: "/images/SOFA/SOFA17/img6.jpg" },
        { name: "Gris",   hex: "#B8B3AC", image: "/images/SOFA/SOFA17/img4.jpg" },
    ],
    "hysf88203-modular": [
        { name: "Gris",   hex: "#D1D5D9", image: "/images/SOFA/SOFA18/render_iso.jpg" },
        { name: "Beige",  hex: "#D4C9B0", image: "/images/SOFA/SOFA18/img1.jpg" },
    ],
    "hysf88206-butaca": [
        { name: "Marrón", hex: "#63433B", image: "/images/SOFA/SOFA19/render_iso.jpg" },
    ],
    "hysf88131-modular": [
        { name: "Gris",   hex: "#D4D0CC", image: "/images/SOFA/SOFA20/render_iso.jpg" },
        { name: "Beige",  hex: "#C8B89A", image: "/images/SOFA/SOFA20/img3.jpg" },
    ],
};

function replaceColorsInterior(content, productId, newItems) {
    const idIndex = content.indexOf(`id: "${productId}"`);
    if (idIndex === -1) { console.warn(`⚠️  ID no encontrado: ${productId}`); return content; }

    const colorsIdx = content.indexOf('colors: {', idIndex);
    if (colorsIdx === -1) { console.warn(`⚠️  colors block no encontrado: ${productId}`); return content; }

    let depth = 0, i = colorsIdx, end = -1, started = false;
    while (i < content.length) {
        if (content[i] === '{') { depth++; started = true; }
        else if (content[i] === '}') {
            depth--;
            if (started && depth === 0) { end = i + 1; break; }
        }
        i++;
    }
    if (end === -1) return content;
    if (content[end] === ',') end++;

    const lineStart = content.lastIndexOf('\n', colorsIdx) + 1;
    const baseIndent = content.substring(lineStart, colorsIdx);
    const innerIndent = baseIndent + '    ';

    const items = newItems
        .map(c => {
            const imgField = c.image ? `, image: "${c.image}"` : '';
            return `${innerIndent}    { name: "${c.name}", hex: "${c.hex}"${imgField} }`;
        })
        .join(',\n');

    const newBlock = `colors: {\n${innerIndent}interior: [\n${items}\n${innerIndent}]\n${baseIndent}},`;

    return content.substring(0, colorsIdx) + newBlock + content.substring(end);
}

const filePath = path.join(__dirname, 'subir-datos-sofas.js');
let content = fs.readFileSync(filePath, 'utf8');

let count = 0;
for (const [id, items] of Object.entries(COLORES_INTERIOR)) {
    const before = content;
    content = replaceColorsInterior(content, id, items);
    if (content !== before) count++;
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ colors.interior actualizado en ${count}/20 productos (con campo image)`);
