'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FURNITURE_FAVORITES_KEY,
  MAX_FURNITURE_FAVORITES,
  emptyFurnitureFavorites,
  getFurnitureProductId,
  isFurnitureCollection,
  parseFurnitureFavorites,
  readFurnitureFavorites,
  toggleStoredFurnitureFavorite,
} from '../../lib/furniture-favorites';

export { getFurnitureProductId } from '../../lib/furniture-favorites';

function getLocalStorage() {
  try { return window.localStorage; } catch { return null; }
}

function retainLocalCollections(incoming, previous, collections) {
  let remaining = MAX_FURNITURE_FAVORITES - Object.entries(incoming)
    .reduce((count, [key, ids]) => count + (collections.has(key) ? 0 : ids.length), 0);
  for (const key of collections) {
    incoming[key] = previous[key].slice(0, Math.max(0, remaining));
    remaining -= incoming[key].length;
  }
  return incoming;
}

export function useFurnitureFavorites(collection) {
  const [favorites, setFavorites] = useState(emptyFurnitureFavorites);
  const [isReady, setIsReady] = useState(false);
  const favoritesRef = useRef(favorites);
  const readyRef = useRef(false);
  const localCollectionsRef = useRef(new Set());

  useEffect(() => {
    const storage = getLocalStorage();
    const initial = readFurnitureFavorites(storage);
    favoritesRef.current = initial;
    setFavorites(initial);
    readyRef.current = true;
    setIsReady(true);

    const handleStorage = (event) => {
      if (event.key !== null && event.key !== FURNITURE_FAVORITES_KEY) return;
      if (storage && event.storageArea && event.storageArea !== storage) return;
      const next = event.key === null ? emptyFurnitureFavorites() : parseFurnitureFavorites(event.newValue);
      // A failed write still leaves a useful local selection. Updates to other
      // collections must not discard it while this tab cannot persist it.
      const merged = retainLocalCollections(next, favoritesRef.current, localCollectionsRef.current);
      favoritesRef.current = merged;
      setFavorites(merged);
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      readyRef.current = false;
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const toggleFavorite = useCallback((product) => {
    // The server and first client render are empty; storage is read before any
    // write, even if a caller forgets to disable its button during hydration.
    if (!readyRef.current || !isFurnitureCollection(collection)) return;
    const id = getFurnitureProductId(product);
    if (!id) return;
    const result = toggleStoredFurnitureFavorite(
      getLocalStorage(), collection, id, favoritesRef.current,
      localCollectionsRef.current.has(collection),
    );
    if (result.persisted) localCollectionsRef.current.delete(collection);
    else localCollectionsRef.current.add(collection);
    const otherLocalCollections = new Set([...localCollectionsRef.current].filter((key) => key !== collection));
    const merged = retainLocalCollections(result.favorites, favoritesRef.current, otherLocalCollections);
    favoritesRef.current = merged;
    setFavorites(merged);
  }, [collection]);

  return { favoriteIds: isFurnitureCollection(collection) ? favorites[collection] : [], isReady, toggleFavorite };
}

export default useFurnitureFavorites;
