import { useMemo, useCallback } from 'react';
import { NewsContext } from './entity-contexts';
import { useEntityState } from '../hooks/useEntityState';
import { STORAGE_KEYS } from '../data/entities';
import { seedNews } from '../data/seed/news';
import { createId } from '../utils/id';
import { nowIso } from '../utils/date';

export const NewsProvider = ({ children }) => {
  const state = useEntityState(STORAGE_KEYS.NEWS, seedNews);

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
