const manifest = require('./wonly-2026-assets.json');

const PALETTES = Object.freeze({
  'high-end': [
    { name: 'Nogal premium n.º 3', hex: '#71503A' },
    { name: 'Rosa premium n.º 2', hex: '#765043' },
    { name: 'Nogal macizo premium', hex: '#9A704A' },
    { name: 'Madera natural clásica', hex: '#A9825D' },
    { name: 'Blanco premium', hex: '#E8E2D8' },
    { name: 'Gris moderno premium', hex: '#9B948B' },
  ],
  minimalist: [
    { name: 'Blanco puro', hex: '#F3F2EF' },
    { name: 'Gris noble', hex: '#CAC4B8' },
    { name: 'Nogal macizo', hex: '#936440' },
    { name: 'Madera natural', hex: '#A87849' },
    { name: 'Nogal n.º 3', hex: '#614031' },
    { name: 'Blanco nieve', hex: '#F1F2EE' },
    { name: 'Blanco marfil', hex: '#EEE9DB' },
    { name: 'Gris brocado', hex: '#B3ACA0' },
    { name: 'Beige cacao', hex: '#C7B18E' },
    { name: 'Nogal luz de luna', hex: '#A49A8D' },
    { name: 'Olmo natural', hex: '#B99A70' },
    { name: 'Gris moderno', hex: '#969087' },
  ],
  pvc: [
    { name: 'Gris claro', hex: '#C9C5B4' },
    { name: 'Madera beige seda', hex: '#C9B38A' },
    { name: 'Impresión tecnológica', hex: '#9E8F78' },
    { name: 'Blanco marfil', hex: '#EEE9D8' },
    { name: 'Roble claro', hex: '#BD9561' },
    { name: 'Roble Senna', hex: '#5E4A3E' },
  ],
  'solid-wood': [
    { name: 'Blanco elegante', hex: '#EEE9DA' },
    { name: 'Blanco nieve', hex: '#E7E5DD' },
    { name: 'Blanco palacio', hex: '#F2EEE4' },
    { name: 'Gris claro', hex: '#BFC0B8' },
    { name: 'Gris cálido', hex: '#B6ACA0' },
    { name: 'Gris Mino', hex: '#BBA999' },
    { name: 'Café con leche', hex: '#C4AD99' },
    { name: 'Nogal rojo', hex: '#5B2E28' },
    { name: 'Nogal oscuro café', hex: '#4E2F23' },
    { name: 'Nogal italiano', hex: '#79533E' },
    { name: 'Gris nube', hex: '#9A918A' },
    { name: 'Negro puro', hex: '#211918' },
  ],
  aluminium: [
    { name: 'Blanco esmalte', hex: '#E9E7E0' },
    { name: 'Negro piel', hex: '#25292D' },
    { name: 'Nogal', hex: '#654532' },
    { name: 'Nogal caqui', hex: '#8B725D' },
    { name: 'Gris metálico', hex: '#656A70' },
  ],
});

const FAMILY_META = Object.freeze({
  'high-end': {
    category: 'PUERTA ACÚSTICA DE MADERA',
    collection: 'High-End 2026',
    material: 'Madera con acabado premium',
    features: ['Carpintería de inspiración clásica', 'Acabados premium de la colección 2026', 'Disponible en fabricación a medida'],
  },
  minimalist: {
    category: 'PUERTA ACÚSTICA DE MADERA',
    collection: 'Minimalista 2026',
    material: 'Madera de ingeniería',
    features: ['Líneas minimalistas', 'Sistema de cierre magnético según configuración', 'Carta de acabados de la colección 2026'],
  },
  'minimalist-glass': {
    category: 'PUERTA ACÚSTICA DE MADERA',
    collection: 'Minimalista con vidrio 2026',
    material: 'Madera de ingeniería y vidrio decorativo',
    features: ['Entrada de luz con privacidad', 'Diseño minimalista', 'Acabados coordinados con la colección 2026'],
  },
  pvc: {
    category: 'PUERTA DE PVC',
    collection: 'PVC 2026',
    material: 'Revestimiento PVC',
    features: ['Superficie fácil de limpiar', 'Adecuada para ambientes húmedos', 'Seis acabados coordinados disponibles'],
  },
  'pvc-glass': {
    category: 'PUERTA DE PVC',
    collection: 'PVC con vidrio 2026',
    material: 'Revestimiento PVC y vidrio decorativo',
    features: ['Entrada de luz con privacidad', 'Superficie fácil de limpiar', 'Acabados coordinados de PVC'],
  },
  'solid-wood': {
    category: 'PUERTA ACÚSTICA DE MADERA',
    collection: 'Madera 2026',
    material: 'Serie de madera',
    features: ['Diseño atemporal', 'Molduras y relieves según modelo', 'Carta de acabados de madera 2026'],
  },
  'solid-wood-glass': {
    category: 'PUERTA ACÚSTICA DE MADERA',
    collection: 'Madera con vidrio 2026',
    material: 'Serie de madera y vidrio decorativo',
    features: ['Vidrio decorativo con privacidad', 'Molduras de inspiración clásica', 'Carta de acabados de madera 2026'],
  },
  aluminium: {
    category: 'PUERTAS CORREDIZAS Y ABATIBLES',
    collection: 'Aluminio 2026',
    material: 'Perfil de aluminio y vidrio',
    features: ['Perfil estrecho contemporáneo', 'Vidrio técnico según modelo', 'Apertura abatible de mantenimiento sencillo'],
  },
  'aluminium-sliding': {
    category: 'PUERTAS CORREDIZAS Y ABATIBLES',
    collection: 'Aluminio corredero 2026',
    material: 'Perfil de aluminio y vidrio',
    features: ['Apertura corredera de gran formato', 'Perfil estrecho contemporáneo', 'Configuración de vidrio según modelo'],
  },
  'aluminium-folding': {
    category: 'PUERTAS CORREDIZAS Y ABATIBLES',
    collection: 'Aluminio plegable 2026',
    material: 'Perfil de aluminio y vidrio',
    features: ['Apertura plegable de gran formato', 'Máximo aprovechamiento del hueco', 'Vidrio técnico según modelo'],
  },
});

const paletteFor = (family) => {
  if (family.startsWith('minimalist')) return PALETTES.minimalist;
  if (family.startsWith('pvc')) return PALETTES.pvc;
  if (family.startsWith('solid-wood')) return PALETTES['solid-wood'];
  if (family.startsWith('aluminium')) return PALETTES.aluminium;
  return PALETTES[family] || [];
};

const imagePathFor = ({ name, family }) => {
  const slug = name.toLowerCase();
  if (family.startsWith('pvc')) return `/images/PUERTAS/PVC/2026/door-${slug}.webp`;
  if (family.startsWith('aluminium')) return `/images/PUERTAS/CORREDIZA/2026/door-${slug}.webp`;
  return `/images/PUERTAS/MADERAACÚSTICA/2026/door-${slug}.webp`;
};

const WONLY_2026_PRODUCTS = manifest.products.map((entry) => {
  const meta = FAMILY_META[entry.family];
  if (!meta) throw new Error(`Familia WONLY 2026 no configurada: ${entry.family}`);

  const specs = [
    { label: 'Colección', value: meta.collection },
    { label: 'Material', value: meta.material },
    { label: 'Acabado mostrado', value: entry.finish },
    { label: 'Página de catálogo', value: `WONLY 2026 · pág. ${entry.catalogPage}` },
  ];
  if (entry.process) specs.splice(2, 0, { label: 'Vidrio / proceso', value: entry.process });

  return {
    name: entry.name,
    category: meta.category,
    description: `${entry.name}, modelo de la colección ${meta.collection}, mostrado en acabado ${entry.finish}. Consulta medidas, apertura y acabados disponibles para tu proyecto.`,
    specs,
    features: meta.features,
    unlock: 'Manilla mecánica o magnética según configuración',
    colors: paletteFor(entry.family),
    img: imagePathFor(entry),
  };
});

const HARDWARE_COLORS = Object.freeze({
  'WL-A01': [{ name: 'Negro', hex: '#1A1A1A' }, { name: 'Gris', hex: '#666A6E' }],
  'WL-WS001': [{ name: 'Negro', hex: '#171717' }],
  'WL-WS003': [{ name: 'Dorado', hex: '#B18A43' }],
  'WL-WS005': [{ name: 'PVD dorado', hex: '#B99B55' }],
  'WL-WS009': [{ name: 'Oro', hex: '#B6944F' }],
  'WL-W013': [{ name: 'Gris cañón', hex: '#64615B' }],
  'WL-W016': [{ name: 'Oro clásico', hex: '#B89548' }],
  'WL-W103': [{ name: 'Negro', hex: '#1B1819' }],
});

const WONLY_2026_HARDWARE = manifest.hardware.map((entry) => {
  const colors = HARDWARE_COLORS[entry.name] || [{ name: 'Negro', hex: '#1A1A1A' }];
  return {
    id: `wonly-2026-${entry.name.toLowerCase()}`,
    code: entry.name,
    name: entry.label,
    category: entry.name === 'WL-A01' ? 'Cerradura inteligente' : colors[0].name,
    description: `${entry.label} WONLY ${entry.name}, presentado en el catálogo de herrajes 2026.`,
    image: `/images/Asset/Accesorios/WONLY-2026/${entry.name.toLowerCase()}.webp`,
    gallery: [],
    has_kit: false,
    colors,
    specs: {
      marca: 'WONLY',
      modelo: entry.name,
      coleccion: 'Herrajes 2026',
      compatibilidad: 'Confirmar con el modelo de puerta',
    },
    colores_disponibles: colors.map((color) => color.name),
  };
});

module.exports = {
  PALETTES,
  WONLY_2026_HARDWARE,
  WONLY_2026_PRODUCTS,
};
