import { getFurnitureCategoryLabel } from "./furniture-labels";

function cleanText(value, maxLength = 120) {
  return String(value || "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

export function formatFurnitureFinishRequest(finishes) {
  if (!Array.isArray(finishes)) return cleanText(typeof finishes === "string" ? finishes : finishes?.name);
  return finishes.map((finish) => {
    const name = cleanText(typeof finish === "string" ? finish : finish?.name);
    const group = typeof finish === "object" && finish ? cleanText(finish.group, 80) : "";
    return name ? (group ? `${group}: ${name}` : name) : "";
  }).filter(Boolean).join("; ").slice(0, 1600);
}

export function buildFurnitureContactHref(product, finish) {
  const params = new URLSearchParams();
  const values = {
    producto: cleanText(product?.name || product?.code),
    codigo: cleanText(product?.code, 80),
    acabado: formatFurnitureFinishRequest(finish),
    categoria: cleanText(getFurnitureCategoryLabel(product?.category || "Mobiliario")),
  };
  Object.entries(values).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  return `/contacto?${params.toString()}#formulario-contacto`;
}

export function readFurnitureContactRequest(params) {
  const product = cleanText(params.get("producto"));
  const category = cleanText(getFurnitureCategoryLabel(params.get("categoria")));
  if (product === "WL-J001" || (!product && category.toLowerCase() !== "mobiliario")) return null;
  const code = cleanText(params.get("codigo"), 80);
  const finish = cleanText(params.get("acabado"), 1600);
  const collection = cleanText(params.get("coleccion"));
  const lines = [
    product
      ? `Hola, me gustaría solicitar un presupuesto para ${product}.`
      : "Hola, me gustaría recibir asesoramiento y un presupuesto de mobiliario.",
    "",
    product ? `Modelo: ${product}` : null,
    code ? `Código: ${code}` : null,
    category ? `Categoría: ${category}` : null,
    collection ? `Colección: ${collection}` : null,
    finish ? `Acabados a consultar: ${finish}` : null,
    "",
    "Me gustaría conocer las opciones disponibles y el presupuesto para mi proyecto.",
  ].filter((line) => line !== null);
  return { product, category, collection, code, finish, message: lines.join("\n") };
}
