import { useMemo, useCallback, useEffect, useRef } from 'react';
import { ProductsContext } from './entity-contexts';
import { useEntityState } from '../hooks/useEntityState';
import { STORAGE_KEYS } from '../data/entities';
import { seedProducts } from '../data/seed/products';
import { createId } from '../utils/id';
import { nowIso } from '../utils/date';

// Backfill local product images for cached entries that still
// reference picsum placeholders or have no image at all.
const NAME_TO_IMAGE = {
  'Argan Repair Shampoo': '/images/products/argan_repair_shampoo.jpg',
  'Keratin Hair Mask': '/images/products/keratin_hair_mask.jpg',
  'Vitamin Nail Oil': '/images/products/vitamin_nail_oil.jpg',
  'Hyaluronic Face Cream': '/images/products/hyaluronic_face_cream.jpg',
  'Glow Hair Serum': '/images/products/glow_hair_serum.jpg',
  'Velvet Matte Lipstick': '/images/products/velvet_matte_lipstick.jpg',
};

const needsImageBackfill = (img) => !img || img.includes('picsum.photos');

export const ProductsProvider = ({ children }) => {
  const state = useEntityState(STORAGE_KEYS.PRODUCTS, seedProducts);
  const migrated = useRef(false);

  useEffect(() => {
    if (migrated.current) return;
    migrated.current = true;
    const needsBackfill = state.items.some(
      (p) => NAME_TO_IMAGE[p.name] && needsImageBackfill(p.image),
    );
    if (!needsBackfill) return;
    state.setItems((prev) =>
      prev.map((p) =>
        NAME_TO_IMAGE[p.name] && needsImageBackfill(p.image)
          ? { ...p, image: NAME_TO_IMAGE[p.name] }
          : p,
      ),
    );
  }, [state]);

  const create = useCallback(
    (data) => {
      const product = {
        id: createId(),
        liked: false,
        stock: 0,
        createdAt: nowIso(),
        image: '',
        ...data,
      };
      state.add(product);
      return product;
    },
    [state],
  );

  const value = useMemo(
    () => ({
      products: state.items,
      addProduct: create,
      updateProduct: state.update,
      removeProduct: state.remove,
      toggleLike: state.toggleLike,
      resetProducts: state.reset,
    }),
    [state, create],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
