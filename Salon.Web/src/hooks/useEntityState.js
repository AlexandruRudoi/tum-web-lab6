import { useEffect, useState, useCallback } from 'react';
import { storage } from '../storage/localStorage';

/**
 * useEntityState — generic hook for managing a list entity persisted in localStorage.
 *
 * Returns: { items, add, update, remove, toggleLike, setItems, reset }
 *
 * @param {string} storageKey      key under the "salon:" namespace
 * @param {() => any[]} seedFn     called once if no data is present in storage
 */
export const useEntityState = (storageKey, seedFn) => {
  const [items, setItems] = useState(() => {
    const stored = storage.get(storageKey);
    if (Array.isArray(stored)) return stored;
    const seed = seedFn();
    storage.set(storageKey, seed);
    return seed;
  });

  useEffect(() => {
    storage.set(storageKey, items);
  }, [storageKey, items]);

  const add = useCallback((item) => {
    setItems((prev) => [item, ...prev]);
  }, []);

  const update = useCallback((id, patch) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const toggleLike = useCallback((id) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, liked: !it.liked } : it)));
  }, []);

  const reset = useCallback(() => {
    const seed = seedFn();
    setItems(seed);
  }, [seedFn]);

  return { items, setItems, add, update, remove, toggleLike, reset };
};
