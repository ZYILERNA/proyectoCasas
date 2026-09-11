const normalize = (value) => typeof value === 'string'
    ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
    : '';

const unique = (values) => [...new Set(values.filter(Boolean))];

const COLOR_RULES = [
    ['Negro', /\b(negro|black)\b/],
    ['Blanco', /\b(blanco|white)\b/],
    ['Gris', /\b(gris|gr[ae]y|greyish|slate|gunmetal|charcoal|graphite)\b/],
    ['Beige', /\b(beige|cream|crema|sand|arena|khaki)\b/],
    ['Topo', /\b(taupe|topo)\b/],
    ['Marrón', /\b(marron|brown|walnut|umber|caramel|mocha|tan|rosewood)\b/],
    ['Azul', /\b(azul|blue|navy)\b/],
    ['Verde', /\b(verde|green|teal|emerald|olive)\b/],
    ['Rojo', /\b(rojo|red|burgundy|crimson|ruby|wine)\b/],
    ['Rosa', /\b(rosa|pink|pinkish|rose|blush)\b/],
    ['Morado', /\b(morado|purple|violet|violeta|purpura)\b/],
    ['Amarillo', /\b(amarillo|yellow|mustard|ochre|amber)\b/],
    ['Naranja', /\b(naranja|orange)\b/],
    ['Terracota', /\b(terracota|terracotta)\b/],
    ['Dorado', /\b(dorado|gold|golden|brass)\b/],
    ['Plateado', /\b(plateado|silver)\b/],
    ['Transparente', /\b(transparente|transparent|clear)\b/],
    ['Multicolor', /\b(multicolor)\b/],
];

const MATERIAL_RULES = [
    ['Tela', /\b(tela|fabric|textil|textile|velvet|terciopelo|boucle|fleece)\b/],
    ['Madera', /\b(madera|wood|fresno|roble|nogal|haya|ash|oak|walnut|beech|birch|poplar)\b/],
    ['MDF', /\bmdf\b/],
    ['Metal', /\b(metal|acero|steel|inox|aluminio|aluminum|aluminium|zinc|laton|brass)\b/],
    ['Mármol', /\b(marmol|marble)\b/],
    ['Piedra', /\b(piedra|stone|travertino|travertine|obsidiana|obsidian|roca|rock slab)\b/],
    ['Vidrio', /\b(vidrio|glass|espejo|mirror)\b/],
    ['Fibra', /\b(fibra|fiberglass)\b/],
    ['Acrílico', /\b(acrilico|acrylic)\b/],
    ['Látex', /\b(latex)\b/],
    ['Espuma', /\b(espuma|foam)\b/],
    ['Nailon', /\b(nailon|nylon)\b/],
    ['Cuerda', /\b(cuerda|rope|cord)\b/],
    ['Poliuretano', /\b(pu|poliuretano|polyurethane)\b/],
];

const matchingLabels = (text, rules) => rules
    .filter(([, pattern]) => pattern.test(text))
    .map(([label]) => label);

function colorLabels(value) {
    // White oak names a timber species, not a white finish.
    const text = normalize(value).replace(/\bwhite oak\b/g, 'oak');
    return matchingLabels(text, COLOR_RULES);
}

function materialLabels(value) {
    const text = normalize(value);
    const labels = matchingLabels(text, MATERIAL_RULES);
    const syntheticLeather = /\b(?:eco[ -]?leather|microfiber leather|cuero sintetico|piel sintetica|polipiel|(?:cuero|piel|leather)\s+pu)\b/g;
    if (syntheticLeather.test(text)) labels.push('Cuero sintético');
    // Keep synthetic leather distinct, while allowing mixed materials.
    const remaining = text.replace(syntheticLeather, '');
    if (/\b(cuero|leather|piel)\b/.test(remaining)) labels.push('Cuero');
    return labels;
}

function declaredValues(value) {
    return Array.isArray(value)
        ? value.filter((item) => typeof item === 'string' && item.trim())
        : [];
}

/** Broad color names, never supplier codes or guessed colors from swatch hexes. */
export function getProductColors(product) {
    const declared = declaredValues(product?.colores_disponibles);
    if (declared.length) return unique(declared.flatMap(colorLabels));

    const groups = product?.colors && typeof product.colors === 'object'
        ? Object.values(product.colors)
        : [];
    const names = groups.flatMap((group) => Array.isArray(group)
        ? group.map((color) => typeof color === 'string' ? color : color?.name)
        : []);
    return unique(names.flatMap(colorLabels));
}

/** Prefer catalog facets; derive material families when those facets are empty. */
export function getProductMaterials(product) {
    const declared = declaredValues(product?.materiales_disponibles);
    if (declared.length) return unique(declared.flatMap(materialLabels));

    const materials = Array.isArray(product?.materials) ? product.materials : [];
    return unique(materials.flatMap((item) => materialLabels(
        typeof item === 'string' ? item : item?.material
    )));
}
