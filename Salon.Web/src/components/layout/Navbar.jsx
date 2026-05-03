import { NavLink } from 'react-router-dom';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useThemeContext } from '../../context/useThemeContext';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/products', label: 'Products' },
  { to: '/news', label: 'News' },
  { to: '/booking', label: 'Booking' },
  { to: '/dashboard', label: 'Dashboard' },
];

const Navbar = () => {
  const { isDark, toggleMode } = useThemeContext();

  return (
    <header className="sticky top-0 z-sticky border-b border-neutral-200/70 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary-500" />
          <span className="font-display text-xl font-semibold tracking-wide">
            HAPPINESS <span className="text-primary-500">Beauty Salon</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleMode}
          aria-label="Toggle color theme"
          className="rounded-full border border-neutral-200 p-2 text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
