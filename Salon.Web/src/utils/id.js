// Generates a short, sortable, URL-safe id.
// Not cryptographically strong — only used for client-side entity ids.
export const createId = () => {
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${time}-${rand}`;
};
