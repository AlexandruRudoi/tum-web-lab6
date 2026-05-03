import { NavLink } from 'react-router-dom';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../context/useThemeContext';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { CAN_MANAGE } from '../../config/permissions';

const linkDefs = [
  { to: '/', key: 'home', end: true },
  { to: '/services', key: 'services' },
  { to: '/products', key: 'products' },
  { to: '/news', key: 'news' },
  { to: '/booking', key: 'booking' },
  { to: '/dashboard', key: 'dashboard', requiresManage: true },
];

const Navbar = () => {
  const { isDark, toggleMode } = useThemeContext();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-sticky border-b border-gold-300/70 bg-neutral-50/85 backdrop-blur-md dark:border-gold-700/50 dark:bg-neutral-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-soft ring-2 ring-gold-200/60 dark:ring-gold-700/40">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold tracking-[0.18em] text-neutral-800 dark:text-neutral-50">
              HAPPINESS
            </span>
            <span className="font-display text-[11px] italic tracking-[0.35em] text-gold-600 dark:text-gold-400">
              {t('nav.tagline')}
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {linkDefs
            .filter(({ requiresManage }) => !requiresManage || CAN_MANAGE)
            .map(({ to, key, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-gold-700 dark:text-gold-300'
                    : 'text-neutral-600 hover:text-gold-700 dark:text-neutral-300 dark:hover:text-gold-300'
                } after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-gradient-to-r after:from-gold-400 after:to-gold-600 after:transition-all hover:after:w-6 ${
                  isActive ? 'after:w-6' : ''
                }`
              }
            >
              {t(`nav.${key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={toggleMode}
            aria-label={t('nav.toggleTheme')}
            className="rounded-full border border-gold-300/70 bg-white/70 p-2 text-gold-700 transition-colors hover:bg-gold-50 dark:border-gold-700/50 dark:bg-neutral-900/70 dark:text-gold-300 dark:hover:bg-neutral-800"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
