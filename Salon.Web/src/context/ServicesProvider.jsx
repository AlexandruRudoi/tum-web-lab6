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

// Backfill local image paths for cached entries that still reference
// the old picsum placeholders or have no image at all.
const KEY_TO_IMAGE = {
  signatureHaircut: '/images/services/signature_haircut.jpg',
  hairColoring: '/images/services/hair_coloring.jpg',
  classicManicure: '/images/services/classic_manicure.jpg',
  spaPedicure: '/images/services/spa_pedicure.jpg',
  eveningMakeup: '/images/services/evening_makeup.jpg',
  hydratingFacial: '/images/services/hydrating_facial.jpg',
  eyebrowShaping: '/images/services/eyebrow_shaping.jpg',
};

const needsImageBackfill = (img) => !img || img.includes('picsum.photos');

export const ServicesProvider = ({ children }) => {
  const state = useEntityState(STORAGE_KEYS.SERVICES, seedServices);
  const migrated = useRef(false);

  useEffect(() => {
    if (migrated.current) return;
    migrated.current = true;
    const needsBackfill = state.items.some((s) => {
      const key = s.i18nKey || NAME_TO_KEY[s.name];
      if (!s.i18nKey && key) return true;
      if (key && KEY_TO_IMAGE[key] && needsImageBackfill(s.image)) return true;
      return false;
    });
    if (!needsBackfill) return;
    state.setItems((prev) =>
      prev.map((s) => {
        const key = s.i18nKey || NAME_TO_KEY[s.name];
        if (!key) return s;
        const next = { ...s };
        if (!s.i18nKey) next.i18nKey = key;
        if (KEY_TO_IMAGE[key] && needsImageBackfill(s.image)) {
          next.image = KEY_TO_IMAGE[key];
        }
        return next;
      }),
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
