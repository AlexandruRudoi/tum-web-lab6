import { useMemo } from 'react';
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
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  useServices,
  useProducts,
  useNews,
  useBookings,
} from '../context/useEntityContexts';
import { translateService } from '../i18n/translateEntity';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { formatDate } from '../utils/date';

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

const DashboardPage = () => {
  const { services } = useServices();
  const { products } = useProducts();
  const { news } = useNews();
  const { bookings } = useBookings();
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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Scissors} label={t('dashboard.stats.services')} value={services.length} accent="text-neutral-900 dark:text-white" to="/services" viewLabel={view} />
        <StatCard icon={ShoppingBag} label={t('dashboard.stats.products')} value={products.length} accent="text-neutral-900 dark:text-white" to="/products" viewLabel={view} />
        <StatCard icon={Newspaper} label={t('dashboard.stats.news')} value={news.length} accent="text-neutral-900 dark:text-white" to="/news" viewLabel={view} />
        <StatCard icon={CalendarCheck} label={t('dashboard.stats.bookings')} value={bookings.length} accent="text-neutral-900 dark:text-white" to="/booking" viewLabel={view} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={Clock} label={t('dashboard.stats.pending')} value={stats.pending} accent="text-amber-600" />
        <StatCard icon={CalendarCheck} label={t('dashboard.stats.confirmed')} value={stats.confirmed} accent="text-emerald-600" />
        <StatCard icon={TrendingUp} label={t('dashboard.stats.lowStock')} value={stats.lowStock + stats.outOfStock} accent="text-red-500" />
        <StatCard icon={Heart} label={t('dashboard.stats.favorites')} value={stats.liked} accent="text-gold-700" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
                {t('dashboard.upcoming')}
              </h2>
              <span className="mt-1 block h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />
            </div>
            <Link to="/booking">
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
    </section>
  );
};

export default DashboardPage;
