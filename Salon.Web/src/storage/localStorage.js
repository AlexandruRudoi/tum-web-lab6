// Generic localStorage wrapper with namespaced keys and JSON serialization.
const NAMESPACE = 'salon';

const fullKey = (key) => `${NAMESPACE}:${key}`;

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = window.localStorage.getItem(fullKey(key));
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(fullKey(key), JSON.stringify(value));
    } catch {
      /* quota or serialization error — ignore */
    }
  },

  remove(key) {
    window.localStorage.removeItem(fullKey(key));
  },
};
