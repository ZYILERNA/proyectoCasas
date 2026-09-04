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
// Marca con "zona: true" las fotos del barrio/entorno: se muestran en un
// bloque propio ("La zona") al final de la galería.
// -----------------------------------------------------------------------------

const BASE = "/images/BLOG";

// Tipos disponibles (sirven para el filtro y la etiqueta de cada tarjeta)
export const TIPOS = {
  PUERTA: "Puerta de Seguridad",
  PUERTA_INTERIOR: "Puerta de Interior",
  CERRADURA: "Cerradura Inteligente",
  MANILLA: "Manilla de Puerta",
};

export const blogPosts = [
  {
    slug: "puerta-cerradura-integrada-lhospitalet",
    title: "Puerta con Cerradura Inteligente Integrada en L’Hospitalet",
    location: "L’Hospitalet de Llobregat, Barcelona",
    tipo: TIPOS.PUERTA,
    cover: `${BASE}/LHOSPITALET-PUERTA-INTEGRADA/instalacion1.jpg`,
    excerpt:
      "Instalación de una puerta de seguridad con cerradura inteligente integrada y acabado personalizado al color de la comunidad.",
    description:
      "Instalación completa de una puerta de seguridad WONLY en una vivienda de L’Hospitalet de Llobregat. La cerradura inteligente queda integrada en la propia puerta y el acabado exterior se ha personalizado para respetar el color y la estética de las puertas de la comunidad. Mostramos el resultado desde el rellano y desde el interior, además de tres vídeos de la instalación y su funcionamiento.",
    media: [
      { type: "image", src: `${BASE}/LHOSPITALET-PUERTA-INTEGRADA/instalacion1.jpg`, alt: "Puerta de seguridad con cerradura inteligente integrada y acabado personalizado en L’Hospitalet" },
      { type: "image", src: `${BASE}/LHOSPITALET-PUERTA-INTEGRADA/instalacion2.jpg`, alt: "Vista interior de la puerta con cerradura inteligente integrada" },
      { type: "image", src: `${BASE}/LHOSPITALET-PUERTA-INTEGRADA/instalacion3.jpg`, alt: "Detalle del grosor y los cierres de la puerta de seguridad WONLY" },
      { type: "video", src: `${BASE}/LHOSPITALET-PUERTA-INTEGRADA/demostracion1.mp4`, alt: "Vídeo de la puerta personalizada instalada en L’Hospitalet" },
      { type: "video", src: `${BASE}/LHOSPITALET-PUERTA-INTEGRADA/demostracion2.mp4`, alt: "Demostración de la cerradura inteligente integrada" },
      { type: "video", src: `${BASE}/LHOSPITALET-PUERTA-INTEGRADA/demostracion3.mp4`, alt: "Funcionamiento de la puerta de seguridad y su cerradura inteligente" },
    ],
  },
  {
    slug: "cerradura-inteligente-premia-de-dalt",
    title: "Instalación de Cerraduras Inteligentes en Premià de Dalt",
    location: "Premià de Dalt, Barcelona",
    tipo: TIPOS.CERRADURA,
    cover: `${BASE}/PREMIADE DALT/instalacion1.jpg`,
    excerpt:
      "Instalación de cerraduras inteligentes WONLY en los accesos exteriores e interiores de una vivienda de Premià de Dalt.",
    description:
      "Proyecto de instalación de cerraduras inteligentes WONLY en una vivienda de Premià de Dalt. La galería muestra los accesos exteriores con cerraduras integradas, los detalles del teclado y lector biométrico, y una cerradura inteligente instalada en una puerta interior. Incluimos también dos vídeos del resultado y su funcionamiento.",
    media: [
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion1.jpg`, alt: "Acceso exterior con cerradura inteligente instalado en Premià de Dalt" },
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion2.jpg`, alt: "Puerta de entrada con cerradura inteligente WONLY" },
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion3.jpg`, alt: "Segundo acceso exterior con cerradura inteligente" },
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion4.jpg`, alt: "Vista frontal de la puerta con teclado y lector biométrico" },
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion5.jpg`, alt: "Conjunto de cerraduras inteligentes instaladas en Premià de Dalt" },
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion6.jpg`, alt: "Detalle de la cerradura inteligente del acceso exterior" },
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion7.jpg`, alt: "Detalle del teclado y lector biométrico de la cerradura" },
      { type: "image", before: true, src: `${BASE}/PREMIADE DALT/instalacion8.jpg`, alt: "Mecanismo interior antes de completar la instalación" },
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion9.jpg`, alt: "Cerradura inteligente instalada en una puerta interior" },
      { type: "image", src: `${BASE}/PREMIADE DALT/instalacion10.jpg`, alt: "Vista general de la cerradura inteligente interior" },
      { type: "video", src: `${BASE}/PREMIADE DALT/demostracion1.mp4`, alt: "Demostración de la cerradura inteligente en Premià de Dalt" },
      { type: "video", src: `${BASE}/PREMIADE DALT/demostracion2.mp4`, alt: "Funcionamiento de la cerradura inteligente WONLY instalada" },
    ],
  },
  {
    slug: "cerradura-inteligente-lhospitalet",
    title: "Instalación de Cerradura Inteligente en L’Hospitalet",
    location: "L’Hospitalet de Llobregat, Barcelona",
    tipo: TIPOS.CERRADURA,
    cover: `${BASE}/LHOSPITALET/instalacion1.jpg`,
    excerpt:
      "Instalación de una cerradura inteligente WONLY en una vivienda de L’Hospitalet de Llobregat.",
    description:
      "Instalación de una cerradura inteligente WONLY en la puerta de entrada de una vivienda de L’Hospitalet de Llobregat. Las fotografías muestran el resultado final y los vídeos permiten ver la cerradura instalada y su funcionamiento.",
    media: [
      { type: "image", src: `${BASE}/LHOSPITALET/instalacion1.jpg`, alt: "Puerta de entrada con cerradura inteligente WONLY instalada en L’Hospitalet" },
      { type: "image", src: `${BASE}/LHOSPITALET/instalacion2.jpg`, alt: "Vista frontal de la cerradura inteligente instalada en L’Hospitalet" },
      { type: "image", src: `${BASE}/LHOSPITALET/instalacion3.jpg`, alt: "Detalle de la cerradura inteligente WONLY instalada" },
      { type: "video", src: `${BASE}/LHOSPITALET/demostracion.mp4`, alt: "Demostración de la cerradura inteligente instalada en L’Hospitalet" },
      { type: "video", src: `${BASE}/LHOSPITALET/demostracion2.mp4`, alt: "Funcionamiento de la cerradura inteligente WONLY" },
      { type: "video", src: `${BASE}/LHOSPITALET/demostracion3.mp4`, alt: "Vídeo del resultado final de la instalación en L’Hospitalet" },
    ],
  },
  {
    slug: "l2-encants",
    title: "Cerradura Inteligente en L2 Encants",
    location: "Encants, Barcelona",
    tipo: TIPOS.CERRADURA,
    cover: `${BASE}/L2 ENCANÇ/despues1.webp`,
    excerpt:
      "Sustitución de una manilla convencional por una cerradura inteligente en la zona de L2 Encants.",
    description:
      "Instalación de una cerradura inteligente WONLY en una vivienda de la zona de Encants, en Barcelona. Mostramos el estado original de la puerta y el resultado final con teclado numérico y lector biométrico integrados.",
    media: [
      { type: "image", before: true, src: `${BASE}/L2 ENCANÇ/antes1.webp`, alt: "Manilla convencional antes de instalar la cerradura inteligente en Encants" },
      { type: "image", src: `${BASE}/L2 ENCANÇ/despues1.webp`, alt: "Cerradura inteligente WONLY instalada en una vivienda de Encants" },
      { type: "image", src: `${BASE}/L2 ENCANÇ/despues2.webp`, alt: "Detalle de la cerradura inteligente instalada en Encants" },
    ],
  },
  {
    slug: "canovelles",
    title: "Instalación en Canovelles",
    location: "Canovelles, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt:
      "Proyecto en curso en una nave de Canovelles: documentamos el estado previo antes de la instalación.",
    description:
      "Reportaje del estado inicial de una nave en Canovelles antes de la instalación de la puerta de seguridad WONLY. El trabajo aún está en curso; próximamente añadiremos las fotografías y vídeos del resultado final.",
    media: [
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes1.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes2.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes3.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes4.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes5.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes6.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes7.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes8.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes9.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes10.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes11.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes12.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "image", before: true, src: `${BASE}/CANOVELLES/antes13.webp`, alt: "Estado previo de la nave en Canovelles" },
      { type: "video", src: `${BASE}/CANOVELLES/video1.mp4`, alt: "Vídeo del estado previo de la nave en Canovelles" },
      { type: "video", src: `${BASE}/CANOVELLES/video2.mp4`, alt: "Vídeo del estado previo de la nave en Canovelles" },
    ],
  },
  {
    slug: "fabra-y-puig",
    title: "Instalación de Puerta Interior en la zona de Fabra y Puig",
    location: "Fabra i Puig, Barcelona",
    tipo: TIPOS.PUERTA_INTERIOR,
    cover: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/zona2.webp`,
    excerpt:
      "Sustitución de las puertas de interior de una vivienda en la zona de Fabra y Puig: del estado original al acabado final, con vídeos de demostración.",
    description:
      "Instalación de puertas de interior WONLY en una vivienda de la zona de Fabra y Puig, en Barcelona. Documentamos el estado previo de la vivienda, el resultado final en cada estancia y varios vídeos de demostración del acabado.",
    media: [
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues1.webp`, alt: "Puerta de interior instalada en Fabra y Puig" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues2.webp`, alt: "Detalle de la puerta de interior instalada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues3.webp`, alt: "Puerta de interior acabada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues4.webp`, alt: "Detalle del acabado de la puerta" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues5.webp`, alt: "Puerta de interior instalada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues6.webp`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues7.webp`, alt: "Resultado final de la instalación" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues8.webp`, alt: "Puerta de interior vista desde la estancia" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues9.webp`, alt: "Detalle del marco y la hoja de la puerta" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues10.webp`, alt: "Acabado final de la puerta de interior" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues11.webp`, alt: "Puerta de interior terminada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues12.webp`, alt: "Vista de la puerta instalada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues13.webp`, alt: "Detalle de la puerta de interior" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues14.webp`, alt: "Resultado final de la instalación" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues15.webp`, alt: "Puerta de interior instalada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues16.webp`, alt: "Detalle de la puerta de interior" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues17.webp`, alt: "Acabado de la puerta de interior" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues18.webp`, alt: "Puerta de interior terminada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues19.webp`, alt: "Vista de la puerta instalada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues20.webp`, alt: "Detalle del acabado" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues21.webp`, alt: "Puerta de interior instalada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues22.webp`, alt: "Detalle de la instalación" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues23.webp`, alt: "Resultado final en la estancia" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues24.webp`, alt: "Puerta de interior acabada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues25.webp`, alt: "Detalle del marco y la hoja" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues26.webp`, alt: "Puerta de interior vista desde la estancia" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues27.webp`, alt: "Acabado final de la puerta" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues28.webp`, alt: "Detalle de la puerta instalada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues29.webp`, alt: "Puerta de interior terminada" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues30.webp`, alt: "Resultado final de la instalación" },
      { type: "image", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/despues31.webp`, alt: "Vista general del acabado final" },
      { type: "image", before: true, src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/antes4.webp`, alt: "Estado previo de la vivienda" },
      { type: "image", before: true, src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/antes5.webp`, alt: "Estado previo de la vivienda" },
      { type: "image", before: true, src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/antes6.webp`, alt: "Estado previo de la vivienda" },
      { type: "image", before: true, src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/antes7.webp`, alt: "Estado previo de la vivienda" },
      { type: "image", before: true, src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/antes8.webp`, alt: "Estado previo de la vivienda" },
      { type: "image", zona: true, src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/zona1.webp`, alt: "Fotografía de la zona de Fabra i Puig" },
      { type: "image", zona: true, src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/zona2.webp`, alt: "Fotografía de la zona de Fabra i Puig" },
      { type: "image", zona: true, src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/zona3.webp`, alt: "Fotografía de la zona de Fabra i Puig" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/videocalle.mp4`, alt: "Vídeo de la zona de la instalación" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/instalacion.mp4`, alt: "Vídeo del proceso de instalación" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/instalacio2.mp4`, alt: "Vídeo del proceso de instalación" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/cocinavideo.mp4`, alt: "Vídeo de la puerta de la cocina instalada" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/demopuerta.mp4`, alt: "Demostración de la puerta de interior" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/demopuerta2.mp4`, alt: "Demostración de la puerta de interior" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/recorrido.mp4`, alt: "Recorrido por la vivienda con las puertas instaladas" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/videodespues.mp4`, alt: "Vídeo del resultado final" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/videodespues2.mp4`, alt: "Vídeo del resultado final" },
      { type: "video", src: `${BASE}/FABRAYPUIG/PUERTAINTERIOR1/videodespues3.mp4`, alt: "Vídeo del resultado final" },
    ],
  },
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
    slug: "l2-monumental",
    title: "Puerta de Seguridad en L2 Monumental",
    location: "Arc de Triomf, Barcelona",
    tipo: TIPOS.PUERTA,
    excerpt:
      "Instalación de puerta de seguridad en la zona de L2 Monumental, junto al Arc de Triomf: del estado original al resultado final.",
    description:
      "Instalación completa de puerta de seguridad WONLY en una vivienda de la zona de L2 Monumental, cerca del Arc de Triomf de Barcelona. Documentamos el estado previo del acceso con vídeos y fotografías, y mostramos el resultado final de la instalación.",
    media: [
      { type: "image", src: `${BASE}/ARCDETRIOMF/L2-MONUMENTAL/despues1.webp`, alt: "Puerta de seguridad instalada en L2 Monumental" },
      { type: "video", src: `${BASE}/ARCDETRIOMF/L2-MONUMENTAL/despuesvideo.mp4`, alt: "Vídeo del resultado final de la instalación" },
      { type: "image", before: true, src: `${BASE}/ARCDETRIOMF/L2-MONUMENTAL/antes1.webp`, alt: "Estado previo del acceso antes de la instalación" },
      { type: "video", before: true, src: `${BASE}/ARCDETRIOMF/L2-MONUMENTAL/antesvideo.mp4`, alt: "Vídeo del estado previo del acceso" },
      { type: "video", before: true, src: `${BASE}/ARCDETRIOMF/L2-MONUMENTAL/antesvideo2.mp4`, alt: "Vídeo del estado previo del acceso" },
      { type: "video", before: true, src: `${BASE}/ARCDETRIOMF/L2-MONUMENTAL/antesvideo3.mp4`, alt: "Vídeo del estado previo del acceso" },
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

// Devuelve la portada: el campo "cover" si el post lo define, y si no,
// el primer elemento de tipo imagen (o el primer media)
export function getCover(post) {
  if (post.cover) return post.cover;
  const firstImage = post.media.find((m) => m.type === "image");
  return (firstImage || post.media[0])?.src;
}
