import { useMemo, useCallback } from 'react';
import { ServicesContext } from './entity-contexts';
import { useEntityState } from '../hooks/useEntityState';
import { STORAGE_KEYS } from '../data/entities';
import { seedServices } from '../data/seed/services';
import { createId } from '../utils/id';
import { nowIso } from '../utils/date';

export const ServicesProvider = ({ children }) => {
  const state = useEntityState(STORAGE_KEYS.SERVICES, seedServices);

  const create = useCallback(
    (data) => {
      const service = {
        id: createId(),
        liked: false,
        createdAt: nowIso(),
        image: '',
        ...data,
      };
      state.add(service);
      return service;
    },
    [state],
  );

  const value = useMemo(
    () => ({
      services: state.items,
      addService: create,
      updateService: state.update,
      removeService: state.remove,
      toggleLike: state.toggleLike,
      resetServices: state.reset,
    }),
    [state, create],
  );

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};
