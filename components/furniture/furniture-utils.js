// Preserve the existing catalogue's conversion; this is an indicative price,
// not a live exchange-rate quote.
const CATALOG_EUR_FACTOR = 0.13;
const euroFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function hasFurniturePrice(value) {
  return value !== null && value !== undefined && value !== ""
    && Number.isFinite(Number(value)) && Number(value) > 0;
}

export function formatFurniturePrice(value) {
  return hasFurniturePrice(value)
    ? euroFormatter.format(Number(value) * CATALOG_EUR_FACTOR)
    : null;
}

export function getFurnitureFinishes(colors) {
  const values = Array.isArray(colors) ? colors : Object.values(colors || {}).flat();
  return values.filter((finish) => finish && typeof finish === "object" && !Array.isArray(finish));
}

export function getFurnitureImage(src) {
  return src === "/images/MESAS/MESA24/img1.webp"
    ? "/images/MESAS/MESA24/image.webp"
    : src;
}
