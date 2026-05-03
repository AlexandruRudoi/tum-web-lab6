import { useMemo, useCallback, useEffect, useRef } from 'react';
import { NewsContext } from './entity-contexts';
import { useEntityState } from '../hooks/useEntityState';
import { STORAGE_KEYS } from '../data/entities';
import { seedNews } from '../data/seed/news';
import { createId } from '../utils/id';
import { nowIso } from '../utils/date';

// Backfill local news images for cached entries that still
// reference picsum placeholders or have no image at all.
const TITLE_TO_IMAGE = {
  'Spring Promotion: 20% off all hair services': '/images/news/spring_promotion.webp',
  'New stylist joining our team': '/images/news/stylist.jpg',
};

const needsImageBackfill = (img) => !img || img.includes('picsum.photos');

export const NewsProvider = ({ children }) => {
  const state = useEntityState(STORAGE_KEYS.NEWS, seedNews);
  const migrated = useRef(false);

  useEffect(() => {
    if (migrated.current) return;
    migrated.current = true;
    const needsBackfill = state.items.some(
      (p) => TITLE_TO_IMAGE[p.title] && needsImageBackfill(p.image),
    );
    if (!needsBackfill) return;
    state.setItems((prev) =>
      prev.map((p) =>
        TITLE_TO_IMAGE[p.title] && needsImageBackfill(p.image)
          ? { ...p, image: TITLE_TO_IMAGE[p.title] }
          : p,
      ),
    );
  }, [state]);

  const create = useCallback(
    (data) => {
      const post = {
        id: createId(),
        liked: false,
        pinned: false,
        createdAt: nowIso(),
        image: '',
        ...data,
      };
      state.add(post);
      return post;
    },
    [state],
  );

  const togglePin = useCallback(
    (id) => {
      const target = state.items.find((p) => p.id === id);
      if (target) state.update(id, { pinned: !target.pinned });
    },
    [state],
  );

  const value = useMemo(
    () => ({
      news: state.items,
      addNews: create,
      updateNews: state.update,
      removeNews: state.remove,
      toggleLike: state.toggleLike,
      togglePin,
      resetNews: state.reset,
    }),
    [state, create, togglePin],
  );

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
