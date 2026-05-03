import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ro', label: 'RO' },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || 'en';

  return (
    <div
      className="flex items-center overflow-hidden rounded-full border border-gold-300/70 bg-white/70 dark:border-gold-700/50 dark:bg-neutral-900/70"
      role="group"
      aria-label={t('common.language')}
    >
      <span className="hidden items-center pl-2 pr-1 text-gold-700 dark:text-gold-300 sm:inline-flex">
        <Languages className="h-4 w-4" />
      </span>
      {LANGS.map((l) => {
        const active = current.startsWith(l.code);
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => i18n.changeLanguage(l.code)}
            className={`px-2.5 py-1.5 text-xs font-semibold tracking-wider transition-colors ${
              active
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white'
                : 'text-neutral-600 hover:text-gold-700 dark:text-neutral-300 dark:hover:text-gold-300'
            }`}
            aria-pressed={active}
            lang={l.code}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
