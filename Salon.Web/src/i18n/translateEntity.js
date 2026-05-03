// Helpers to translate entity fields that originate from seed data.
// Stored items keep their original English strings as a fallback so that
// user-created entries still render when no translation is available.

const SERVICE_CATEGORY_KEYS = {
  Hair: 'hair',
  Nails: 'nails',
  Makeup: 'makeup',
  Skincare: 'skincare',
  'Brows & Lashes': 'browsLashes',
};

export const translateCategory = (category, t) => {
  if (!category) return '';
  const key = SERVICE_CATEGORY_KEYS[category];
  if (!key) return category;
  return t(`categories.${key}`, { defaultValue: category });
};

export const translateService = (service, t) => {
  if (!service) return service;
  const i18nKey = service.i18nKey;
  const name = i18nKey
    ? t(`servicesData.${i18nKey}.name`, { defaultValue: service.name })
    : service.name;
  const description = i18nKey
    ? t(`servicesData.${i18nKey}.description`, { defaultValue: service.description })
    : service.description;
  return {
    ...service,
    name,
    description,
    category: translateCategory(service.category, t),
  };
};
