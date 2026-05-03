import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check, ChevronDown } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ro', label: 'Română', short: 'RO' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const active = LANGS.find((l) => l.code === current) ?? LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('common.language')}
        className="flex items-center gap-1.5 rounded-full border border-gold-300/70 bg-white/70 px-3 py-1.5 text-xs font-semibold tracking-wider text-neutral-700 transition-colors hover:border-gold-500 hover:text-gold-700 dark:border-gold-700/50 dark:bg-neutral-900/70 dark:text-neutral-200 dark:hover:text-gold-300"
      >
        <Languages className="h-4 w-4 text-gold-600 dark:text-gold-400" />
        <span>{active.short}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('common.language')}
          className="absolute right-0 z-dropdown mt-2 w-44 overflow-hidden rounded-xl border border-gold-300/70 bg-white/95 shadow-card backdrop-blur-md dark:border-gold-700/50 dark:bg-neutral-900/95"
        >
          {LANGS.map((l) => {
            const isActive = l.code === current;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  lang={l.code}
                  onClick={() => {
                    i18n.changeLanguage(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-300'
                      : 'text-neutral-700 hover:bg-gold-50/60 hover:text-gold-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-gold-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-gold-600 dark:text-gold-400">
                      {l.short}
                    </span>
                    <span>{l.label}</span>
                  </span>
                  {isActive && <Check className="h-4 w-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
