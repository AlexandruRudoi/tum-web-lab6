const ALL = '__all__';

const CategoryFilter = ({ categories, value, onChange, label = 'All' }) => {
  const items = [{ key: ALL, label }, ...categories.map((c) => ({ key: c, label: c }))];
  const current = value ?? ALL;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ key, label: l }) => {
        const active = current === key;
        return (
          <button
            type="button"
            key={key}
            onClick={() => onChange(key === ALL ? null : key)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-primary-500 text-white shadow-soft'
                : 'border border-neutral-200 text-neutral-600 hover:border-primary-300 hover:text-primary-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-primary-600 dark:hover:text-primary-300'
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
