import { SHOW_FURNITURE_PRICES } from "./furniture-settings";

// Remove monetary asides from displayed catalogue copy while prices are hidden.
// Plain numbers, measurements and the source data remain unchanged.
const MONETARY_ASIDE = /\s*\(\s*(?:(?:price|precio)\s*:\s*(?:[€$£¥]\s*)?\d[\d.,]*(?:\s*(?:yuan|rmb|cny|eur|euros?|usd|gbp|[€$£¥]))?|\d[\d.,]*\s*(?:yuan|rmb|cny|eur|euros?|usd|gbp|[€$£¥])|[€$£¥]\s*\d[\d.,]*)\s*\)/gi;

export function formatFurnitureDetailText(value, showPrices = SHOW_FURNITURE_PRICES) {
  if (typeof value !== "string" || showPrices) return value;
  return value.replace(MONETARY_ASIDE, "");
}
