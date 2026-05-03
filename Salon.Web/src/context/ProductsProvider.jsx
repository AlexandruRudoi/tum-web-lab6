import { useMemo, useCallback } from 'react';
import { ProductsContext } from './entity-contexts';
import { useEntityState } from '../hooks/useEntityState';
import { STORAGE_KEYS } from '../data/entities';
import { seedProducts } from '../data/seed/products';
import { createId } from '../utils/id';
import { nowIso } from '../utils/date';

export const ProductsProvider = ({ children }) => {
  const state = useEntityState(STORAGE_KEYS.PRODUCTS, seedProducts);

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
