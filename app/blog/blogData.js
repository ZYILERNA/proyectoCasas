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
// -----------------------------------------------------------------------------

const BASE = "/images/BLOG";

// Tipos disponibles (sirven para el filtro y la etiqueta de cada tarjeta)
export const TIPOS = {
  PUERTA: "Puerta de Seguridad",
  CERRADURA: "Cerradura Inteligente",
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
      { type: "image", src: `${BASE}/MONTGAT/finalizado.jpg`, alt: "Puerta de seguridad instalada y finalizada en Montgat" },
      { type: "image", src: `${BASE}/MONTGAT/puertamontado.jpg`, alt: "Puerta montada en Montgat" },
      { type: "image", src: `${BASE}/MONTGAT/foto4.png`, alt: "Detalle de la puerta instalada en Montgat" },
      { type: "image", src: `${BASE}/MONTGAT/fot1antes.jpg`, alt: "Estado del acceso antes de la instalación" },
      { type: "image", src: `${BASE}/MONTGAT/fot2antes.jpg`, alt: "Estado del acceso antes de la instalación" },
      { type: "image", src: `${BASE}/MONTGAT/fot3antes.jpg`, alt: "Estado del acceso antes de la instalación" },
      { type: "video", src: `${BASE}/MONTGAT/llevandolapuerta.mp4`, alt: "Transporte de la puerta hasta la vivienda" },
      { type: "video", src: `${BASE}/MONTGAT/demodelapuerta.mp4`, alt: "Demostración de la puerta instalada" },
      { type: "video", src: `${BASE}/MONTGAT/videodemo.mp4`, alt: "Vídeo demostración de la puerta de seguridad" },
    ],
  },
  {
    slug: "arc-de-triomf",
    title: "Puerta de Seguridad junto al Arc de Triomf",
    location: "Arc de Triomf, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt:
      "Instalación de puerta de seguridad en pleno centro de Barcelona, documentada paso a paso.",
    description:
      "Caso de instalación de una puerta de seguridad en una finca situada junto al Arc de Triomf de Barcelona. Mostramos el proceso de instalación y el resultado final.",
    media: [
      { type: "image", src: `${BASE}/ARCDETRIOMF/fot1.jpg`, alt: "Instalación de puerta junto al Arc de Triomf" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/fot2.jpg`, alt: "Proceso de instalación de la puerta" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/for3.jpg`, alt: "Detalle de la puerta instalada" },
      { type: "video", src: `${BASE}/ARCDETRIOMF/vidinstalando.mp4`, alt: "Vídeo del proceso de instalación" },
    ],
  },
  {
    slug: "panaderia-arc-de-triomf",
    title: "Puerta de Seguridad para Panadería",
    location: "Arc de Triomf, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt:
      "Instalación de puerta de seguridad en un local comercial (panadería), con vídeo del montaje y demostración.",
    description:
      "Instalación de una puerta de seguridad en una panadería de la zona del Arc de Triomf. Documentamos el proceso de montaje en vídeo y el acabado final del local.",
    media: [
      { type: "image", src: `${BASE}/ARCDETRIOMF/PANADERIA/foto1acabado.jpg`, alt: "Puerta acabada en la panadería" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/PANADERIA/foto2.jpg`, alt: "Detalle de la instalación en la panadería" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/PANADERIA/foto3.jpg`, alt: "Detalle de la instalación en la panadería" },
      { type: "image", src: `${BASE}/ARCDETRIOMF/PANADERIA/foto4.jpg`, alt: "Detalle de la instalación en la panadería" },
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
      { type: "image", src: `${BASE}/CALLEMARINA/cerradurainstalada.jpg`, alt: "Cerradura inteligente instalada en Calle Marina" },
      { type: "image", src: `${BASE}/CALLEMARINA/cerradurapantalla.jpg`, alt: "Pantalla de la cerradura inteligente" },
      { type: "video", src: `${BASE}/CALLEMARINA/videoinstalacioncerradura.mp4`, alt: "Vídeo de la instalación de la cerradura" },
      { type: "video", src: `${BASE}/CALLEMARINA/videodemocerradurainteligente.mp4`, alt: "Demostración de la cerradura inteligente" },
    ],
  },
  {
    slug: "castelldefels",
    title: "Cerradura Inteligente en Castelldefels",
    location: "Castelldefels, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt:
      "Instalación de cerradura inteligente con vídeo de demostración del resultado final.",
    description:
      "Instalación de una cerradura inteligente en una vivienda de Castelldefels. Mostramos el proceso de instalación y una demostración en vídeo de la cerradura ya en funcionamiento.",
    media: [
      { type: "image", src: `${BASE}/CASTELLDEFERS/fot3vistainstalada.jpg`, alt: "Cerradura inteligente instalada en Castelldefels" },
      { type: "image", src: `${BASE}/CASTELLDEFERS/fot4vistafrontal.jpg`, alt: "Vista frontal de la cerradura instalada" },
      { type: "image", src: `${BASE}/CASTELLDEFERS/instalandocerradura.jpg`, alt: "Proceso de instalación de la cerradura" },
      { type: "video", src: `${BASE}/CASTELLDEFERS/videodemocerradurainstalada.mp4`, alt: "Demostración de la cerradura instalada" },
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
      { type: "image", src: `${BASE}/BADALONA/cerradurainstalada.jpg`, alt: "Cerradura inteligente instalada en Badalona" },
      { type: "image", src: `${BASE}/BADALONA/acabado.jpg`, alt: "Acabado final de la instalación" },
      { type: "image", src: `${BASE}/BADALONA/removiendocerradura.jpg`, alt: "Retirada de la cerradura antigua" },
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
      { type: "image", src: `${BASE}/CARRERDELMARCELLIESQUIUS/cerradurainstalada.jpg`, alt: "Cerradura inteligente instalada" },
      { type: "image", src: `${BASE}/CARRERDELMARCELLIESQUIUS/cerraduravistaafuera.jpg`, alt: "Vista exterior de la cerradura instalada" },
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
      { type: "image", src: `${BASE}/CARRERDELPOU/foto2acabado.jpg`, alt: "Cerradura inteligente acabada" },
      { type: "image", src: `${BASE}/CARRERDELPOU/foto1.jpg`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/CARRERDELPOU/foto3abriendopuerta.jpg`, alt: "Apertura de la puerta con la cerradura" },
      { type: "image", src: `${BASE}/CARRERDELPOU/foto4puertaabierta.jpg`, alt: "Puerta abierta tras la demostración" },
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
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot1.jpg`, alt: "Resultado final en la villa de huéspedes" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot2.jpg`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot3.jpg`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot4.jpg`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot5.jpg`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot6.jpg`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot7.jpg`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot1antes.jpg`, alt: "Estado previo a la instalación" },
      { type: "image", src: `${BASE}/VILLAHUESPEDGRANOLLERS/fot2antes.jpg`, alt: "Estado previo a la instalación" },
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
      { type: "image", src: `${BASE}/GAVA/foto1.jpg`, alt: "Instalación en Gavà" },
      { type: "image", src: `${BASE}/GAVA/foto2.jpg`, alt: "Detalle de la instalación en Gavà" },
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
      { type: "image", src: `${BASE}/PINEDADEMAR/foto1.png`, alt: "Instalación en Pineda de Mar" },
      { type: "image", src: `${BASE}/PINEDADEMAR/foto2.png`, alt: "Detalle de la instalación en Pineda de Mar" },
    ],
  },
  {
    slug: "sant-joan-despi",
    title: "Instalación en Sant Joan Despí",
    location: "Sant Joan Despí, Barcelona",
    tipo: TIPOS.CERRADURA,
    excerpt: "Instalación realizada en una vivienda de Sant Joan Despí.",
    description:
      "Trabajo de instalación realizado en una vivienda de Sant Joan Despí. A continuación mostramos la fotografía del resultado.",
    media: [
      { type: "image", src: `${BASE}/SANJOANDESPI/FOTO1.jpg`, alt: "Instalación en Sant Joan Despí" },
    ],
  },
  {
    slug: "viladecans",
    title: "Instalación en Viladecans",
    location: "Viladecans, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt: "Instalación realizada en una vivienda de Viladecans.",
    description:
      "Trabajo de instalación realizado en una vivienda de Viladecans, sede principal de WONLY. A continuación mostramos la fotografía del resultado.",
    media: [
      { type: "image", src: `${BASE}/VILADECANS/foto1.png`, alt: "Instalación en Viladecans" },
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
      { type: "image", src: `${BASE}/LAMAQUINISTA/foto1.jpg`, alt: "Instalación en La Maquinista" },
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
