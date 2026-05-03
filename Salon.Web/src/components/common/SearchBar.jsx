import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search…' }) => (
  <div className="relative w-full">
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-full border border-gold-300/70 bg-white/85 py-2 pl-10 pr-10 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-100 dark:border-gold-700/50 dark:bg-neutral-900/60 dark:text-neutral-100 dark:focus:border-gold-400 dark:focus:ring-gold-900/40"
    />
    {value && (
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </div>
);

export default SearchBar;
