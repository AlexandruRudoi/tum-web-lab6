import { useMemo } from 'react';

/**
 * Filters a list of items by a free-text query and an optional category.
 *
 * @param {Array} items
 * @param {{
 *   query?: string,
 *   category?: string|null,
 *   searchKeys?: string[],     fields to search; defaults to ['name']
 *   categoryKey?: string,      defaults to 'category'
 * }} options
 */
export const useFilterSearch = (items, { query = '', category = null, searchKeys = ['name'], categoryKey = 'category' } = {}) =>
  useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (category && it[categoryKey] !== category) return false;
      if (!q) return true;
      return searchKeys.some((k) => String(it[k] ?? '').toLowerCase().includes(q));
    });
  }, [items, query, category, searchKeys, categoryKey]);
