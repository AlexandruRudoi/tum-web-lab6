// Returns the current timestamp as an ISO string.
export const nowIso = () => new Date().toISOString();

// Formats an ISO date as a localized short date (e.g. "Jan 12, 2026").
export const formatDate = (iso, locale = 'en-GB') => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};
