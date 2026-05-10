import { useCallback, useEffect, useMemo, useState } from 'react';
import { ServicesContext } from './entity-contexts';
import { servicesApi } from '../api/servicesApi';

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesApi
      .getAll()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addService = useCallback(async (data) => {
    const created = await servicesApi.create(data);
    setServices((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateService = useCallback((id, patch) => {
    setServices((prev) => {
      const current = prev.find((s) => s.id === id);
      const merged = { ...current, ...patch };
      servicesApi
        .update(id, merged)
        .then((updated) => setServices((p) => p.map((s) => (s.id === id ? updated : s))))
        .catch(console.error);
      return prev.map((s) => (s.id === id ? merged : s)); // optimistic
    });
  }, []);

  const removeService = useCallback(async (id) => {
    await servicesApi.delete(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const toggleLike = useCallback(async (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s)),
    );
    try {
      const updated = await servicesApi.like(id);
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...updated, liked: !s.liked } : s)),
      );
    } catch {
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s)),
      );
    }
  }, []);

  const resetServices = useCallback(async () => {
    setLoading(true);
    try {
      const fresh = await servicesApi.getAll();
      setServices(fresh);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ services, loading, addService, updateService, removeService, toggleLike, resetServices }),
    [services, loading, addService, updateService, removeService, toggleLike, resetServices],
  );

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};
