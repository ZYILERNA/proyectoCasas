// app/blog/blogData.js
// -----------------------------------------------------------------------------
// CASOS REALES DE INSTALACIÓN (BLOG)
// Cada entrada representa una instalación real de puertas de seguridad o
// cerraduras inteligentes realizada por WONLY. Los archivos viven en
// /public/images/BLOG/<CARPETA>/...
//
// Para añadir un nuevo caso: copia un objeto, cambia el "slug" (debe ser único),
// la ubicación, el tipo y la lista de "media". El primer elemento de "media"
// se usa automáticamente como portada en el listado.
//
// Marca con "before: true" las fotos del ANTES de la reforma. Si un caso tiene
// alguna, la página de detalle mostrará dos bloques separados: "Antes" y
// "Después". Si no hay ninguna, se muestra una "Galería" normal.
// -----------------------------------------------------------------------------

const BASE = "/images/BLOG";

// Tipos disponibles (sirven para el filtro y la etiqueta de cada tarjeta)
export const TIPOS = {
  PUERTA: "Puerta de Seguridad",
  CERRADURA: "Cerradura Inteligente",
  MANILLA: "Manilla de Puerta",
};

export const blogPosts = [
  {
    slug: "montgat",
    title: "Instalación de Puerta Acorazada en Montgat",
    location: "Montgat, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt:
      "Sustitución completa de la puerta de acceso por una puerta de seguridad WONLY: del estado original al acabado final.",
    description:
      "Reportaje completo de la instalación de una puerta de seguridad en una vivienda de Montgat. Documentamos el estado previo, el transporte y montaje de la nueva puerta y el resultado final con su demostración en vídeo.",
    media: [
      { type: "image", src: `${BASE}/MONTGAT/despues1.webp`, alt: "Puerta de seguridad instalada y finalizada en Montgat" },
      { type: "image", src: `${BASE}/MONTGAT/despues2.webp`, alt: "Detalle de la puerta instalada en Montgat" },
      { type: "image", before: true, src: `${BASE}/MONTGAT/fotoantes1.webp`, alt: "Estado del acceso antes de la instalación" },
      { type: "image", before: true, src: `${BASE}/MONTGAT/fotoantes2.webp`, alt: "Estado del acceso antes de la instalación" },
      { type: "video", src: `${BASE}/MONTGAT/llevandolapuerta.mp4`, alt: "Transporte de la puerta hasta la vivienda" },
      { type: "video", src: `${BASE}/MONTGAT/demodelapuerta.mp4`, alt: "Demostración de la puerta instalada" },
      { type: "video", src: `${BASE}/MONTGAT/videodemo.mp4`, alt: "Vídeo demostración de la puerta de seguridad" },
    ],
  },
  {
    slug: "arc-de-triomf",
    title: "Manilla de Puerta junto al Arc de Triomf",
    location: "Arc de Triomf, Barcelona",
    tipo: TIPOS.MANILLA,
    excerpt:
      "Instalación de manilla en pleno centro de Barcelona, documentada paso a paso.",
    description:
      "Caso de instalación de una manilla en una finca situada junto al Arc de Triomf de Barcelona. Mostramos el proceso de instalación y el resultado final.",
    media: [
      { type: "image", src: `${BASE}/ARCDETRIOMF/despues1.webp`, alt: "Puerta de seguridad instalada junto al Arc de Triomf" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/despues2.webp`, alt: "Detalle de la puerta instalada" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/despues3.webp`, alt: "Detalle de la puerta instalada" },
      { type: "video", src: `${BASE}/ARCDETRIOMF/vidinstalando.mp4`, alt: "Vídeo del proceso de instalación" },
    ],
  },
  {
    slug: "panaderia-arc-de-triomf",
    title: "Cerradura Inteligente para Panadería",
    location: "Arc de Triomf, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt:
      "Instalación de cerradura inteligente en un local comercial (panadería), con vídeo del montaje y demostración.",
    description:
      "Instalación de una cerradura inteligente en una panadería de la zona del Arc de Triomf. Documentamos el proceso de montaje en vídeo y el acabado final del local.",
    media: [
      { type: "image", src: `${BASE}/ARCDETRIOMF/PANADERIA/despues1.webp`, alt: "Puerta de seguridad acabada en la panadería" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/PANADERIA/despues2.webp`, alt: "Detalle de la instalación en la panadería" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/PANADERIA/despues3.webp`, alt: "Detalle de la instalación en la panadería" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/PANADERIA/despues4.webp`, alt: "Detalle de la instalación en la panadería" },
      { type: "video", src: `${BASE}/ARCDETRIOMF/PANADERIA/instalando.mp4`, alt: "Vídeo del montaje de la puerta en la panadería" },
      { type: "video", src: `${BASE}/ARCDETRIOMF/PANADERIA/demovideo.mp4`, alt: "Vídeo demostración de la puerta de la panadería" },
    ],
  },
  {
    slug: "calle-marina",
    title: "Cerradura Inteligente en Calle Marina",
    location: "Calle Marina, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt:
      "Instalación de cerradura inteligente con vídeos del proceso y de la demostración de uso.",
    description:
      "Instalación de una cerradura inteligente WONLY en una vivienda de la Calle Marina. Incluimos el vídeo del proceso de instalación y una demostración del funcionamiento (apertura por código, huella y app).",
    media: [
      { type: "image", src: `${BASE}/CALLEMARINA/despues1.webp`, alt: "Cerradura inteligente instalada en Calle Marina" },
      { type: "image", src: `${BASE}/CALLEMARINA/despues2.webp`, alt: "Detalle de la cerradura inteligente instalada" },
      { type: "video", src: `${BASE}/CALLEMARINA/videoinstalacioncerradura.mp4`, alt: "Vídeo de la instalación de la cerradura" },
      { type: "video", src: `${BASE}/CALLEMARINA/videodemocerradurainteligente.mp4`, alt: "Demostración de la cerradura inteligente" },
    ],
  },
  {
    slug: "castelldefels-cliente-1",
    title: "Cerradura Inteligente en Castelldefels — Cliente 1",
    location: "Castelldefels, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt:
      "Instalación de cerradura inteligente en una vivienda de Castelldefels.",
    description:
      "Instalación de una cerradura inteligente en una vivienda de Castelldefels. Mostramos el resultado final de la instalación.",
    media: [
      { type: "image", src: `${BASE}/CASTELLDEFERS/CLIENTE1/despues1.webp`, alt: "Cerradura inteligente instalada en Castelldefels" },
      { type: "image", src: `${BASE}/CASTELLDEFERS/CLIENTE1/despues2.webp`, alt: "Vista frontal de la cerradura instalada" },
    ],
  },
  {
    slug: "castelldefels-cliente-2",
    title: "Cerradura Inteligente en Castelldefels — Cliente 2",
    location: "Castelldefels, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt:
      "Instalación de cerradura inteligente con vídeo de demostración del resultado final.",
    description:
      "Instalación de una cerradura inteligente en otra vivienda de Castelldefels. Incluimos una demostración en vídeo de la cerradura ya en funcionamiento.",
    media: [
      { type: "image", src: `${BASE}/CASTELLDEFERS/CLIENTE2/despues3.webp`, alt: "Cerradura inteligente instalada en Castelldefels" },
      { type: "video", src: `${BASE}/CASTELLDEFERS/CLIENTE2/videodemocerradurainstalada.mp4`, alt: "Demostración de la cerradura instalada" },
    ],
  },
  {
    slug: "badalona",
    title: "Cerradura Inteligente en Badalona",
    location: "Badalona, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt:
      "Sustitución de la cerradura tradicional por una cerradura inteligente WONLY.",
    description:
      "Sustitución de la cerradura convencional por una cerradura inteligente en una vivienda de Badalona. Documentamos la retirada de la cerradura antigua, la instalación de la nueva y el acabado final.",
    media: [
      { type: "image", src: `${BASE}/BADALONA/despues1.webp`, alt: "Cerradura inteligente instalada en Badalona" },
      { type: "image", src: `${BASE}/BADALONA/despues2.webp`, alt: "Acabado final de la instalación" },
      { type: "image", before: true, src: `${BASE}/BADALONA/antes1.webp`, alt: "Estado previo a la instalación" },
    ],
  },
  {
    slug: "carrer-del-marcell-esquius",
    title: "Cerradura Inteligente en Carrer del Marcell i Esquius",
    location: "Carrer del Marcell i Esquius, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt:
      "Instalación de cerradura inteligente con vista interior y exterior del resultado.",
    description:
      "Instalación de una cerradura inteligente en una vivienda del Carrer del Marcell i Esquius. Mostramos el resultado final tanto desde el interior como desde el exterior de la puerta.",
    media: [
      { type: "image", src: `${BASE}/CARRERDELMARCELLIESQUIUS/despues1.webp`, alt: "Cerradura inteligente instalada" },
      { type: "image", src: `${BASE}/CARRERDELMARCELLIESQUIUS/despues2.webp`, alt: "Vista exterior de la cerradura instalada" },
    ],
  },
  {
    slug: "carrer-del-pou",
    title: "Cerradura Inteligente en Carrer del Pou",
    location: "Carrer del Pou, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt:
      "Instalación de cerradura inteligente, con la puerta abriéndose en la demostración final.",
    description:
      "Instalación de una cerradura inteligente en una vivienda del Carrer del Pou. Documentamos el proceso y mostramos la apertura de la puerta como prueba del correcto funcionamiento.",
    media: [
      { type: "image", src: `${BASE}/CARRERDELPOU/foto2acabado.webp`, alt: "Cerradura inteligente acabada" },
      { type: "image", src: `${BASE}/CARRERDELPOU/foto1.webp`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/CARRERDELPOU/foto3abriendopuerta.webp`, alt: "Apertura de la puerta con la cerradura" },
      { type: "image", src: `${BASE}/CARRERDELPOU/foto4puertaabierta.webp`, alt: "Puerta abierta tras la demostración" },
    ],
  },
  {
    slug: "villa-huespedes-granollers",
    title: "Instalación en Villa de Huéspedes de Granollers",
    location: "Granollers, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt:
      "Reforma de seguridad en una villa de huéspedes: comparación del antes y el después.",
    description:
      "Trabajo de seguridad realizado en una villa de huéspedes de Granollers. Documentamos el estado previo y el resultado final de la instalación con varias fotografías del antes y el después.",
    media: [
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/despues1.webp`, alt: "Resultado final en la villa de huéspedes" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/despues2.webp`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/despues3.webp`, alt: "Detalle de la instalación" },
      { type: "image", before: true, src: `${BASE}/VILLAHUESPEDGRANOLLERS/antes1.webp`, alt: "Estado previo a la instalación" },
      { type: "image", before: true, src: `${BASE}/VILLAHUESPEDGRANOLLERS/antes2.webp`, alt: "Estado previo a la instalación" },
    ],
  },
  {
    slug: "gava",
    title: "Instalación en Gavà",
    location: "Gavà, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt: "Instalación realizada en una vivienda de Gavà.",
    description:
      "Trabajo de instalación realizado en una vivienda de Gavà. A continuación mostramos las fotografías del resultado.",
    media: [
      { type: "image", src: `${BASE}/GAVA/despues1.webp`, alt: "Instalación en Gavà" },
      { type: "image", src: `${BASE}/GAVA/despues2.webp`, alt: "Detalle de la instalación en Gavà" },
    ],
  },
  {
    slug: "pineda-de-mar",
    title: "Instalación en Pineda de Mar",
    location: "Pineda de Mar, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt: "Instalación realizada en una vivienda de Pineda de Mar.",
    description:
      "Trabajo de instalación realizado en una vivienda de Pineda de Mar. A continuación mostramos las fotografías del resultado.",
    media: [
      { type: "image", src: `${BASE}/PINEDADEMAR/foto1.webp`, alt: "Instalación en Pineda de Mar" },
      { type: "image", src: `${BASE}/PINEDADEMAR/foto2.webp`, alt: "Detalle de la instalación en Pineda de Mar" },
    ],
  },
  {
    slug: "sant-joan-despi",
    title: "Manilla de Puerta en Sant Joan Despí",
    location: "Sant Joan Despí, Barcelona",
    tipo: TIPOS.MANILLA,
    excerpt: "Instalación de manilla de puerta en una vivienda de Sant Joan Despí.",
    description:
      "Instalación de una manilla de puerta en una vivienda de Sant Joan Despí. A continuación mostramos la fotografía del resultado.",
    media: [
      { type: "image", src: `${BASE}/SANJOANDESPI/FOTO1.webp`, alt: "Instalación en Sant Joan Despí" },
    ],
  },
  {
    slug: "viladecans",
    title: "Instalación en Viladecans",
    location: "Viladecans, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt: "Instalación realizada en una tienda de Viladecans.",
    description:
      "Trabajo de instalación realizado en una tienda de Viladecans, sede principal de WONLY. A continuación mostramos las fotografías del resultado.",
    media: [
      { type: "image", src: `${BASE}/VILADECANS/foto1.webp`, alt: "Instalación en Viladecans" },
      { type: "image", src: `${BASE}/VILADECANS/foto2.webp`, alt: "Instalación en Viladecans" },
      { type: "image", src: `${BASE}/VILADECANS/foto3.webp`, alt: "Instalación en Viladecans" },
      { type: "image", src: `${BASE}/VILADECANS/foto4.webp`, alt: "Instalación en Viladecans" },
      { type: "image", src: `${BASE}/VILADECANS/foto5.webp`, alt: "Instalación en Viladecans" },
      { type: "image", src: `${BASE}/VILADECANS/foto6.webp`, alt: "Instalación en Viladecans" },
      { type: "video", src: `${BASE}/VILADECANS/demodelanave.mp4`, alt: "Vídeo demostración de la nave en Viladecans" },
    ],
  },
  {
    slug: "la-maquinista",
    title: "Instalación en La Maquinista",
    location: "La Maquinista, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt: "Instalación realizada en la zona de La Maquinista.",
    description:
      "Trabajo de instalación realizado en una vivienda de la zona de La Maquinista, en Barcelona. A continuación mostramos la fotografía del resultado.",
    media: [
      { type: "image", src: `${BASE}/LAMAQUINISTA/despues1.webp`, alt: "Instalación en La Maquinista" },
    ],
  },
];

// Devuelve un post por su slug
export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

// Devuelve la portada (primer elemento de tipo imagen, o el primer media)
export function getCover(post) {
  const firstImage = post.media.find((m) => m.type === "image");
  return (firstImage || post.media[0])?.src;
}
