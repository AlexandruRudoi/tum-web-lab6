import { useMemo, useCallback, useEffect, useRef } from 'react';
import { ServicesContext } from './entity-contexts';
import { useEntityState } from '../hooks/useEntityState';
import { STORAGE_KEYS } from '../data/entities';
import { seedServices } from '../data/seed/services';
import { createId } from '../utils/id';
import { nowIso } from '../utils/date';

// Map seed service names to their stable i18n keys so that previously
// cached entries (created before the i18nKey field existed) still get
// translated on next load.
const NAME_TO_KEY = {
  'Signature Haircut': 'signatureHaircut',
  'Hair Coloring': 'hairColoring',
  'Classic Manicure': 'classicManicure',
  'Spa Pedicure': 'spaPedicure',
  'Evening Makeup': 'eveningMakeup',
  'Hydrating Facial': 'hydratingFacial',
  'Eyebrow Shaping': 'eyebrowShaping',
};

export const ServicesProvider = ({ children }) => {
  const state = useEntityState(STORAGE_KEYS.SERVICES, seedServices);
  const migrated = useRef(false);

  useEffect(() => {
    if (migrated.current) return;
    migrated.current = true;
    const needsBackfill = state.items.some(
      (s) => !s.i18nKey && NAME_TO_KEY[s.name],
    );
    if (!needsBackfill) return;
    state.setItems((prev) =>
      prev.map((s) =>
        !s.i18nKey && NAME_TO_KEY[s.name] ? { ...s, i18nKey: NAME_TO_KEY[s.name] } : s,
      ),
    );
  }, [state]);

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
