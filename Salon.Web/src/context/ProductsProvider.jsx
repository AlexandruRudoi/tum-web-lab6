import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductsContext } from './entity-contexts';
import { productsApi } from '../api/productsApi';

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi
      .getAll()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addProduct = useCallback(async (data) => {
    const created = await productsApi.create(data);
    setProducts((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateProduct = useCallback((id, patch) => {
    setProducts((prev) => {
      const current = prev.find((p) => p.id === id);
      const merged = { ...current, ...patch };
      productsApi
        .update(id, merged)
        .then((updated) => setProducts((p) => p.map((x) => (x.id === id ? updated : x))))
        .catch(console.error);
      return prev.map((p) => (p.id === id ? merged : p));
    });
  }, []);

  const removeProduct = useCallback(async (id) => {
    await productsApi.delete(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleLike = useCallback(async (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)),
    );
    try {
      const updated = await productsApi.like(id);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...updated, liked: !p.liked } : p)),
      );
    } catch {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)),
      );
    }
  }, []);

  const resetProducts = useCallback(async () => {
    setLoading(true);
    try {
      const fresh = await productsApi.getAll();
      setProducts(fresh);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ products, loading, addProduct, updateProduct, removeProduct, toggleLike, resetProducts }),
    [products, loading, addProduct, updateProduct, removeProduct, toggleLike, resetProducts],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
