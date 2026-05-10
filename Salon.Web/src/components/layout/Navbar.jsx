import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Moon, Sun, ShieldCheck, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../context/useThemeContext';
import { useAuth } from '../../context/useEntityContexts';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useCanManage } from '../../config/permissions';
import logoUrl from '../../assets/logo.svg';

const roleColors = {
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
  const { role, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isAuthenticated = role === 'MANAGER' || role === 'ADMIN';

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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

          {isAuthenticated && (
            /* Logged-in user dropdown */
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-neutral-200/70 bg-white/70 px-3 py-1.5 dark:border-neutral-700/50 dark:bg-neutral-900/70"
              >
                <ShieldCheck className={`h-3.5 w-3.5 ${roleColors[role] ?? 'text-neutral-500'}`} />
                <span className={`text-xs font-semibold ${roleColors[role] ?? 'text-neutral-600'}`}>
                  {user?.name ?? role}
                </span>
                <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-neutral-200/70 bg-white shadow-lg dark:border-neutral-700/50 dark:bg-neutral-900">
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-gold-50 hover:text-gold-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-gold-300"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <div className="mx-3 h-px bg-neutral-100 dark:bg-neutral-800" />
                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); logout(); }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

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
