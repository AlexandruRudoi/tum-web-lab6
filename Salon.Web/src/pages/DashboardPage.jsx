import { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scissors,
  ShoppingBag,
  Newspaper,
  CalendarCheck,
  Heart,
  TrendingUp,
  Pin,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useServices,
  useProducts,
  useNews,
  useBookings,
  useAuth,
} from '../context/useEntityContexts';
import { translateService } from '../i18n/translateEntity';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { formatDate } from '../utils/date';
import { fetchUsers, updateUserRole, deleteUser } from '../api/usersApi';
import { useCanApproveBookings } from '../config/permissions';

const roleColors = {
  MANAGER: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
  ADMIN:   'text-gold-700 dark:text-gold-300 bg-gold-50 dark:bg-gold-900/30',
};

const StatCard = ({ icon: Icon, label, value, accent, to, viewLabel }) => (
  <Card className="p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
        <p className={`mt-2 font-display text-4xl font-semibold ${accent}`}>{value}</p>
      </div>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-50 text-gold-600 dark:from-gold-900/40 dark:to-gold-900/10 dark:text-gold-300">
        <Icon className="h-6 w-6" />
      </span>
    </div>
    {to && (
      <Link
        to={to}
        className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-gold-700 hover:text-gold-800 dark:text-gold-300"
      >
        {viewLabel} →
      </Link>
    )}
  </Card>
);

// ── Users management panel (ADMIN only) ───────────────────────────────────────
const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchUsers()
      .then((data) => { if (!cancelled) setUsers(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const handleRoleChange = async (id, role) => {
    setBusy(true);
    try {
      const updated = await updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: updated.role } : u)));
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    setBusy(true);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <Users className="h-5 w-5 text-gold-600 dark:text-gold-400" />
        <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
          Staff Users
        </h2>
      </div>
      <span className="mb-4 block h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />

      {users.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-200/50 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:border-gold-800/40 dark:text-neutral-400">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Created</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-100/60 dark:divide-gold-900/30">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 pr-4 font-medium text-neutral-800 dark:text-neutral-100">{u.name}</td>
                  <td className="py-3 pr-4 text-neutral-600 dark:text-neutral-400">{u.email}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={u.role}
                      disabled={busy}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className={`rounded-lg border border-neutral-200 bg-transparent px-2 py-1 text-xs font-semibold focus:outline-none dark:border-neutral-700 ${roleColors[u.role] ?? 'text-neutral-600'}`}
                    >
                      <option value="MANAGER">MANAGER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="py-3 pr-4 text-neutral-500 dark:text-neutral-400">
                    {formatDate(u.createdAt)}
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleDelete(u.id)}
                      title="Delete user"
                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Permissions reference */}
      <div className="mt-8">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gold-600 dark:text-gold-400" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
            Role Permissions
          </h3>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gold-200/60 dark:border-gold-800/40">
          <table className="w-full text-xs">
            <thead className="bg-gold-50/50 dark:bg-gold-900/10">
              <tr className="text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5">Browse & Book</th>
                <th className="px-4 py-2.5">appointments:manage</th>
                <th className="px-4 py-2.5">content:manage</th>
                <th className="px-4 py-2.5">users:manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-100/40 dark:divide-gold-900/20">
              {[
                { role: 'VISITOR', browse: true, appts: false, content: false, users: false },
                { role: 'USER',    browse: true, appts: false, content: false, users: false },
                { role: 'MANAGER', browse: true, appts: true,  content: false, users: false },
                { role: 'ADMIN',   browse: true, appts: true,  content: true,  users: true  },
              ].map(({ role: r, browse, appts, content, users: u }) => (
                <tr key={r} className="bg-white/60 dark:bg-neutral-900/40">
                  <td className={`px-4 py-2.5 font-semibold ${roleColors[r] ?? 'text-neutral-500'}`}>{r}</td>
                  {[browse, appts, content, u].map((has, i) => (
                    <td key={i} className="px-4 py-2.5 text-center">
                      {has
                        ? <CheckCircle className="inline h-3.5 w-3.5 text-emerald-500" />
                        : <XCircle className="inline h-3.5 w-3.5 text-neutral-300 dark:text-neutral-600" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

const DashboardPage = () => {
  const { services } = useServices();
  const { products } = useProducts();
  const { news } = useNews();
  const { bookings } = useBookings();
  const { isAdmin } = useAuth();
  const canApprove = useCanApproveBookings();
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const lowStock = products.filter((p) => p.stock > 0 && p.stock < 5).length;
    const outOfStock = products.filter((p) => p.stock <= 0).length;
    const pending = bookings.filter((b) => b.status === 'pending').length;
    const confirmed = bookings.filter((b) => b.status === 'confirmed').length;
    const liked =
      services.filter((s) => s.liked).length +
      products.filter((p) => p.liked).length +
      news.filter((n) => n.liked).length;
    const pinnedNews = news.filter((n) => n.pinned).length;
    return { lowStock, outOfStock, pending, confirmed, liked, pinnedNews };
  }, [services, products, news, bookings]);

  const upcoming = useMemo(
    () =>
      [...bookings]
        .filter((b) => b.status !== 'cancelled')
        .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
        .slice(0, 5),
    [bookings],
  );

  const serviceMap = useMemo(
    () => Object.fromEntries(services.map((s) => [s.id, s])),
    [services],
  );

  const recentNews = useMemo(
    () =>
      [...news]
        .sort((a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, 4),
    [news],
  );

  const lowStockItems = useMemo(
    () =>
      [...products].filter((p) => p.stock < 5).sort((a, b) => a.stock - b.stock).slice(0, 5),
    [products],
  );

  const view = t('common.view');

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-3 text-gold-600 dark:text-gold-400">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
            {t('dashboard.eyebrow')}
          </span>
        </div>
        <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
          {t('dashboard.titlePart')}{' '}
          <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
            {t('dashboard.titleAccent')}
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Scissors} label={t('dashboard.stats.services')} value={services.length} accent="text-neutral-900 dark:text-white" to="/services" viewLabel={view} />
        <StatCard icon={ShoppingBag} label={t('dashboard.stats.products')} value={products.length} accent="text-neutral-900 dark:text-white" to="/products" viewLabel={view} />
        <StatCard icon={Newspaper} label={t('dashboard.stats.news')} value={news.length} accent="text-neutral-900 dark:text-white" to="/news" viewLabel={view} />
        <StatCard icon={CalendarCheck} label={t('dashboard.stats.bookings')} value={bookings.length} accent="text-neutral-900 dark:text-white" to="/manage-bookings" viewLabel={view} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Clock} label={t('dashboard.stats.pending')} value={stats.pending} accent="text-amber-600" />
        <StatCard icon={CalendarCheck} label={t('dashboard.stats.confirmed')} value={stats.confirmed} accent="text-emerald-600" />
        <StatCard icon={TrendingUp} label={t('dashboard.stats.lowStock')} value={stats.lowStock + stats.outOfStock} accent="text-red-500" />
        <StatCard icon={Heart} label={t('dashboard.stats.favorites')} value={stats.liked} accent="text-gold-700" />
      </div>

      {/* Overview cards */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
                {t('dashboard.upcoming')}
              </h2>
              <span className="mt-1 block h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />
            </div>
            <Link to="/manage-bookings">
              <Button variant="outline" size="sm">{t('common.viewAll')}</Button>
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('dashboard.noUpcoming')}
            </p>
          ) : (
            <ul className="divide-y divide-gold-200/50 dark:divide-gold-800/40">
              {upcoming.map((b) => {
                const svc = serviceMap[b.serviceId];
                const tsvc = svc ? translateService(svc, t) : null;
                return (
                  <li key={b.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-neutral-800 dark:text-neutral-100">
                        {tsvc ? tsvc.name : t('booking.serviceRemoved')}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {b.clientName} · {b.date} · {b.time}
                      </p>
                    </div>
                    <span className="rounded-full bg-gold-50 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700 dark:bg-gold-900/40 dark:text-gold-300">
                      {t(`booking.status.${b.status}`)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
              {t('dashboard.lowStock')}
            </h2>
            <span className="mt-1 block h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />
          </div>
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('dashboard.noLowStock')}
            </p>
          ) : (
            <ul className="space-y-3">
              {lowStockItems.map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-800 dark:text-neutral-100">{p.name}</span>
                  <span
                    className={`font-semibold ${
                      p.stock <= 0 ? 'text-red-500' : 'text-amber-600'
                    }`}
                  >
                    {p.stock <= 0 ? t('dashboard.stockOut') : t('dashboard.stockLeft', { count: p.stock })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
                {t('dashboard.recentPosts')}
              </h2>
              <span className="mt-1 block h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />
            </div>
            <Link to="/news">
              <Button variant="outline" size="sm">{t('common.viewAll')}</Button>
            </Link>
          </div>
          {recentNews.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('dashboard.noPosts')}
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {recentNews.map((n) => (
                <li
                  key={n.id}
                  className="rounded-xl border border-gold-200/60 bg-white/70 p-3 dark:border-gold-800/40 dark:bg-neutral-900/50"
                >
                  <div className="flex items-center gap-2">
                    {n.pinned && <Pin className="h-3 w-3 text-gold-600" />}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-700 dark:text-gold-300">
                      {n.category}
                    </span>
                    <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">
                      {formatDate(n.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 font-medium text-neutral-800 dark:text-neutral-100">
                    {n.title}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* MANAGER + ADMIN: Link to bookings management */}
      {canApprove && (
        <div className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-5 w-5 text-gold-600 dark:text-gold-400" />
                <div>
                  <h2 className="font-display text-xl font-semibold text-neutral-900 dark:text-white">
                    Bookings Management
                  </h2>
                  <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
                    {stats.pending} pending · {stats.confirmed} confirmed
                  </p>
                </div>
              </div>
              <Link to="/manage-bookings">
                <Button variant="outline" size="sm">
                  Manage <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* ADMIN only: Users + Permissions */}
      {isAdmin && (
        <div className="mt-6">
          <UsersPanel />
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
