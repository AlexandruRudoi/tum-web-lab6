import { useCallback, useEffect, useMemo, useState } from 'react';
import { NewsContext } from './entity-contexts';
import { newsApi } from '../api/newsApi';

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsApi
      .getAll()
      .then(setNews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addNews = useCallback(async (data) => {
    const created = await newsApi.create(data);
    setNews((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateNews = useCallback((id, patch) => {
    setNews((prev) => {
      const current = prev.find((n) => n.id === id);
      const merged = { ...current, ...patch };
      newsApi
        .update(id, merged)
        .then((updated) => setNews((p) => p.map((n) => (n.id === id ? updated : n))))
        .catch(console.error);
      return prev.map((n) => (n.id === id ? merged : n));
    });
  }, []);

  const removeNews = useCallback(async (id) => {
    await newsApi.delete(id);
    setNews((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const toggleLike = useCallback(async (id) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, liked: !n.liked } : n)),
    );
    try {
      const updated = await newsApi.like(id);
      setNews((prev) =>
        prev.map((n) => (n.id === id ? { ...updated, liked: !n.liked } : n)),
      );
    } catch {
      setNews((prev) =>
        prev.map((n) => (n.id === id ? { ...n, liked: !n.liked } : n)),
      );
    }
  }, []);

  const togglePin = useCallback(async (id) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
    try {
      const updated = await newsApi.pin(id);
      setNews((prev) =>
        prev.map((n) => (n.id === id ? { ...updated, liked: n.liked } : n)),
      );
    } catch {
      setNews((prev) =>
        prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
      );
    }
  }, []);

  const resetNews = useCallback(async () => {
    setLoading(true);
    try {
      const fresh = await newsApi.getAll();
      setNews(fresh);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ news, loading, addNews, updateNews, removeNews, toggleLike, togglePin, resetNews }),
    [news, loading, addNews, updateNews, removeNews, toggleLike, togglePin, resetNews],
  );

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
