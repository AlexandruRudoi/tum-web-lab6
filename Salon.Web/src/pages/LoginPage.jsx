import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/useEntityContexts';
import Button from '../components/common/Button';
import logoUrl from '../assets/logo.svg';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-4 py-16">
      {/* Logo */}
      <Link to="/" className="mb-8 flex flex-col items-center gap-2">
        <img src={logoUrl} alt="HAPPINESS" className="h-16 w-16 rounded-full ring-2 ring-gold-300/60" />
        <span className="font-display text-2xl font-semibold tracking-widest text-neutral-800 dark:text-neutral-100">
          HAPPINESS
        </span>
      </Link>

      <div className="w-full rounded-2xl border border-gold-200/60 bg-white/80 p-8 shadow-soft backdrop-blur-md dark:border-gold-800/40 dark:bg-neutral-900/80">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-gold-600 dark:text-gold-400" />
          <h1 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
            Staff Login
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@salon.com"
                className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 placeholder-neutral-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-600 dark:focus:border-gold-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 placeholder-neutral-400 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-600 dark:focus:border-gold-600"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            <LogIn className="h-4 w-4" />
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
          Not a staff member?{' '}
          <Link to="/" className="text-gold-700 hover:underline dark:text-gold-400">
            Browse as visitor
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
