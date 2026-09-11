export const FURNITURE_FAVORITES_KEY = 'wonly:furniture:favorites:v1';
export const MAX_FURNITURE_FAVORITES = 500;

const COLLECTIONS = ['sofas', 'mesas', 'sillas', 'dormitorios', 'gabinetes'];
const validId = (value) => typeof value === 'string' && value.length <= 512
  && /^(id|code|name):.+$/.test(value) && !/[\u0000-\u001f\u007f]/.test(value);

export const isFurnitureCollection = (collection) => COLLECTIONS.includes(collection);

export function emptyFurnitureFavorites() {
  return Object.fromEntries(COLLECTIONS.map((collection) => [collection, []]));
}

export function getFurnitureProductId(product) {
  for (const field of ['id', 'code', 'name']) {
    const value = product?.[field];
    if (typeof value !== 'string' && !(typeof value === 'number' && Number.isFinite(value))) continue;
    const text = String(value).trim();
    const id = `${field}:${text}`;
    if (text && validId(id)) return id;
  }
  return '';
}

export function normalizeFurnitureFavorites(value) {
  const result = emptyFurnitureFavorites();
  if (!value || typeof value !== 'object' || Array.isArray(value)) return result;
  let count = 0;
  for (const collection of COLLECTIONS) {
    if (!Array.isArray(value[collection])) continue;
    const seen = new Set();
    for (const id of value[collection]) {
      if (count >= MAX_FURNITURE_FAVORITES) break;
      if (!validId(id) || seen.has(id)) continue;
      seen.add(id);
      result[collection].push(id);
      count += 1;
    }
  }
  return result;
}

export function parseFurnitureFavorites(value) {
  try {
    return normalizeFurnitureFavorites(JSON.parse(value));
  } catch {
    return emptyFurnitureFavorites();
  }
}

export function readFurnitureFavorites(storage, fallback) {
  try {
    return parseFurnitureFavorites(storage.getItem(FURNITURE_FAVORITES_KEY));
  } catch {
    return normalizeFurnitureFavorites(fallback);
  }
}

export function toggleStoredFurnitureFavorite(storage, collection, id, fallback, useLocalCollection = false) {
  const local = normalizeFurnitureFavorites(fallback);
  if (!isFurnitureCollection(collection) || !validId(id)) {
    return { favorites: local, persisted: false };
  }

  // Read immediately before writing so navigation or another collection's
  // changes are preserved. Never write a stale snapshot of the whole catalogue.
  let favorites;
  let readable = true;
  try {
    favorites = parseFurnitureFavorites(storage.getItem(FURNITURE_FAVORITES_KEY));
  } catch {
    favorites = local;
    readable = false;
  }
  if (useLocalCollection) {
    const otherCount = Object.entries(favorites).reduce((count, [key, ids]) => count + (key === collection ? 0 : ids.length), 0);
    favorites[collection] = local[collection].slice(0, MAX_FURNITURE_FAVORITES - otherCount);
  }
  const selected = favorites[collection].includes(id);
  const total = Object.values(favorites).reduce((count, ids) => count + ids.length, 0);
  if (selected) favorites[collection] = favorites[collection].filter((entry) => entry !== id);
  else if (total < MAX_FURNITURE_FAVORITES) favorites[collection] = [...favorites[collection], id];

  if (!readable) return { favorites, persisted: false };
  try {
    storage.setItem(FURNITURE_FAVORITES_KEY, JSON.stringify(favorites));
    return { favorites, persisted: true };
  } catch {
    return { favorites, persisted: false };
  }
}
