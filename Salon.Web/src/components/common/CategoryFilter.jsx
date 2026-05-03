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
            className={`rounded-full px-4 py-1.5 text-sm font-medium tracking-wide transition-all ${
              active
                ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-white shadow-soft'
                : 'border border-gold-300/70 bg-white/70 text-neutral-700 hover:border-gold-500 hover:text-gold-700 dark:border-gold-700/50 dark:bg-neutral-900/50 dark:text-neutral-300 dark:hover:border-gold-500 dark:hover:text-gold-300'
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
