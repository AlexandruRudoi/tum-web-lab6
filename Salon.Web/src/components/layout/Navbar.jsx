import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun, ShieldCheck, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../context/useThemeContext';
import { useAuth } from '../../context/useEntityContexts';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useCanManage } from '../../config/permissions';
import logoUrl from '../../assets/logo.svg';

const ROLES = [
  { value: 'VISITOR', label: 'Visitor', desc: 'Browse only' },
  { value: 'MANAGER', label: 'Manager', desc: 'Approve appointments' },
  { value: 'ADMIN',   label: 'Admin',   desc: 'Full access' },
];

const roleColors = {
  VISITOR: 'text-neutral-500 dark:text-neutral-400',
  MANAGER: 'text-blue-600 dark:text-blue-400',
  ADMIN:   'text-gold-700 dark:text-gold-300',
};

const linkDefs = [
  { to: '/', key: 'home', end: true },
  { to: '/services', key: 'services' },
  { to: '/products', key: 'products' },
  { to: '/news', key: 'news' },
  { to: '/booking', key: 'booking' },
  { to: '/contact', key: 'contact' },
  { to: '/dashboard', key: 'dashboard', requiresManage: true },
];

const Navbar = () => {
  const { isDark, toggleMode } = useThemeContext();
  const { t } = useTranslation();
  const canManage = useCanManage();
  const { role, login, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const currentRole = role ?? 'VISITOR';

  const handleSelect = (value) => {
    setOpen(false);
    if (value === 'VISITOR') logout();
    else login(value);
  };

  return (
    <header className="sticky top-0 z-sticky border-b border-gold-300/70 bg-neutral-50/85 backdrop-blur-md dark:border-gold-700/50 dark:bg-neutral-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="group flex items-center gap-3">
          <img
            src={logoUrl}
            alt="HAPPINESS Beauty Salon"
            className="h-11 w-11 rounded-full shadow-soft ring-2 ring-gold-200/60 transition-transform duration-300 group-hover:scale-105 dark:ring-gold-700/40"
          />
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
            .filter(({ requiresManage }) => !requiresManage || canManage)
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

          {/* Role switcher dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-neutral-300/70 bg-white/70 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-gold-400 dark:border-neutral-700/50 dark:bg-neutral-900/70 dark:hover:border-gold-600"
            >
              <ShieldCheck className={`h-3.5 w-3.5 ${roleColors[currentRole]}`} />
              <span className={roleColors[currentRole]}>{currentRole.charAt(0) + currentRole.slice(1).toLowerCase()}</span>
              <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <>
                {/* backdrop */}
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
                  {ROLES.map(({ value, label, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleSelect(value)}
                      className={`flex w-full flex-col items-start px-4 py-2.5 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${value === currentRole ? 'bg-neutral-50 dark:bg-neutral-800' : ''}`}
                    >
                      <span className={`text-xs font-semibold ${roleColors[value]}`}>{label}</span>
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500">{desc}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

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
