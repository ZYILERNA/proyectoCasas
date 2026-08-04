export const WL_J001_PRODUCT = Object.freeze({
  code: "WL-J001",
  series: "J",
  name: "Puerta acústica de madera WL-J001",
  category: "Puerta acústica de madera",
  application: "Interior",
  description:
    "Puerta interior de hoja lisa con veta vertical, núcleo de madera sólida y acabados configurables para cada proyecto.",
  core: "Madera sólida",
  operation: "Manilla magnética",
  finishPreviewCount: 9,
});

export const WL_J001_TECHNICAL_FACTS = Object.freeze([
  {
    id: "application",
    label: "Aplicación",
    value: "Interior",
    detail: "Serie J · colección acústica de madera",
  },
  {
    id: "design",
    label: "Diseño",
    value: "Hoja lisa",
    detail: "Veta vertical y lectura contemporánea",
  },
  {
    id: "core",
    label: "Núcleo",
    value: "Madera sólida",
    detail: "Construcción indicada en el catálogo",
  },
  {
    id: "acoustic",
    label: "Aislamiento",
    value: "Configuración acústica",
    detail: "La prestación final se confirma para cada proyecto",
  },
  {
    id: "operation",
    label: "Accionamiento",
    value: "Manilla magnética",
    detail: "Sistema indicado para la colección",
  },
  {
    id: "finishes",
    label: "Simulación de acabados",
    value: "9 visualizaciones",
    detail: "Orientativas; disponibilidad por confirmar",
  },
]);

export const WL_J001_DIMENSION_FIELDS = Object.freeze([
  {
    id: "width",
    label: "Ancho del hueco",
    shortLabel: "Ancho",
    placeholder: "Indicar",
  },
  {
    id: "height",
    label: "Alto del hueco",
    shortLabel: "Alto",
    placeholder: "Indicar",
  },
  {
    id: "wallThickness",
    label: "Espesor del muro",
    shortLabel: "Espesor",
    placeholder: "Indicar",
    optional: true,
  },
]);

export const WL_J001_FINISH_OPTIONS = Object.freeze([
  { id: "negro", name: "Negro" },
  { id: "wengue", name: "Wengué" },
  { id: "gris-oscuro", name: "Gris oscuro" },
  { id: "antracita", name: "Antracita" },
  { id: "nogal", name: "Nogal" },
  { id: "roble", name: "Roble" },
  { id: "gris-claro", name: "Gris claro" },
  { id: "natural", name: "Natural" },
  { id: "blanco", name: "Blanco" },
]);

export const WL_J001_OPENING_OPTIONS = Object.freeze([
  {
    id: "pending",
    buttonLabel: "Por definir",
    label: "Por definir",
  },
  {
    id: "left",
    buttonLabel: "Izquierda",
    label: "Bisagras a la izquierda, vistas desde la entrada",
  },
  {
    id: "right",
    buttonLabel: "Derecha",
    label: "Bisagras a la derecha, vistas desde la entrada",
  },
]);

export const WL_J001_DEFAULT_CONFIGURATION = Object.freeze({
  finishId: "natural",
  width: "",
  height: "",
  wallThickness: "",
  opening: "pending",
  quantity: "1",
});

export const isWLJ001PositiveInteger = (value, maxLength) => (
  new RegExp(`^\\d{1,${maxLength}}$`).test(value) && Number(value) > 0
);

export const isWLJ001ConfigurationValid = (configuration) => (
  [configuration.width, configuration.height, configuration.wallThickness]
    .every((value) => !value || isWLJ001PositiveInteger(value, 5))
  && isWLJ001PositiveInteger(configuration.quantity, 3)
);

export const buildWLJ001ContactHref = (configuration) => {
  const finish = WL_J001_FINISH_OPTIONS.find(
    ({ id }) => id === configuration.finishId,
  ) || WL_J001_FINISH_OPTIONS.find(({ id }) => id === "natural");
  const opening = WL_J001_OPENING_OPTIONS.find(
    ({ id }) => id === configuration.opening,
  ) || WL_J001_OPENING_OPTIONS[0];
  const quantity = isWLJ001PositiveInteger(configuration.quantity, 3)
    ? configuration.quantity
    : "1";
  const query = new URLSearchParams({
    producto: WL_J001_PRODUCT.code,
    acabado: finish.name,
    apertura: opening.label,
    cantidad: quantity,
  });

  [
    ["ancho", configuration.width],
    ["alto", configuration.height],
    ["espesor", configuration.wallThickness],
  ].forEach(([key, value]) => {
    if (isWLJ001PositiveInteger(value, 5)) query.set(key, value);
  });

  return `/contacto?${query.toString()}#formulario-contacto`;
};

export const WL_J001_FAQS = Object.freeze([
  {
    id: "medicion",
    question: "¿Qué medidas debo indicar para valorar la WL-J001?",
    answer:
      "Indica el ancho y el alto del hueco en milímetros. Si lo conoces, añade también el espesor del muro. Son medidas preliminares y deben comprobarse profesionalmente antes de confirmar el proyecto.",
  },
  {
    id: "dimensiones",
    question: "¿La WL-J001 tiene una medida estándar?",
    answer:
      "Esta ficha no publica una medida estándar. La configuración se estudia a partir del hueco y de las necesidades del espacio; puedes enviar ancho, alto y espesor para su validación técnica.",
  },
  {
    id: "acustica",
    question: "¿Qué aislamiento acústico ofrece?",
    answer:
      "La WL-J001 pertenece a la colección acústica de madera, pero la información disponible no establece un valor concreto en dB. La prestación final depende de la configuración validada para el proyecto.",
  },
  {
    id: "acabados",
    question: "¿Los nueve acabados mostrados están confirmados?",
    answer:
      "No. La página muestra nueve visualizaciones orientativas para comparar tonos. La disponibilidad y el acabado definitivo deben confirmarse para cada proyecto.",
  },
  {
    id: "bisagras",
    question: "¿Cómo indico la posición de las bisagras?",
    answer:
      "Selecciona izquierda o derecha mirando la puerta desde el lado de entrada. Esta elección es orientativa y la mano final se confirma técnicamente.",
  },
  {
    id: "validacion",
    question: "¿Qué se valida antes de confirmar el proyecto?",
    answer:
      "Se revisan las medidas preliminares, la posición final de las bisagras, la disponibilidad del acabado y la configuración acústica. La selección solo se considera definitiva después de la validación técnica.",
  },
]);
