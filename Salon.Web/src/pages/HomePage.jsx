import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Scissors, ShoppingBag, Newspaper, CalendarPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useServices, useProducts, useNews } from '../context/useEntityContexts';
import { translateService } from '../i18n/translateEntity';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { formatDate } from '../utils/date';

const HomePage = () => {
  const { services } = useServices();
  const { products } = useProducts();
  const { news } = useNews();
  const { t } = useTranslation();

  const featuredServices = useMemo(() => services.slice(0, 3), [services]);
  const featuredProducts = useMemo(
    () => [...products].filter((p) => p.stock > 0).slice(0, 3),
    [products],
  );
  const latestNews = useMemo(
    () =>
      [...news]
        .sort((a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, 2),
    [news],
  );

  const currency = t('common.currency');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-gold-200/40 blur-3xl dark:bg-gold-900/20" />
          <div className="absolute right-1/4 top-40 h-72 w-72 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/15" />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center md:py-32">
          <div className="mb-5 flex items-center gap-3 text-gold-600 dark:text-gold-400">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.4em]">
              {t('home.eyebrow')}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>

          <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-7xl">
            {t('home.titlePart1')}{' '}
            <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              {t('home.titleAccent')}
            </span>{' '}
            {t('home.titlePart2')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
            {t('home.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/booking">
              <Button size="lg">
                <CalendarPlus className="h-4 w-4" />
                {t('home.ctaBook')}
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg">
                {t('home.ctaServices')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-600 dark:text-gold-400">
              {t('home.featuredEyebrow')}
            </p>
            <h2 className="font-display text-4xl font-semibold text-neutral-900 dark:text-white">
              {t('home.featuredTitlePart')}{' '}
              <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                {t('home.featuredAccent')}
              </span>
            </h2>
          </div>
          <Link to="/services" className="hidden md:block">
            <Button variant="ghost" size="sm">
              {t('home.allServices')} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((raw) => {
            const s = translateService(raw, t);
            return (
            <Card key={s.id} className="p-5">
              <Scissors className="h-6 w-6 text-gold-600" />
              <h3 className="mt-3 font-display text-xl font-semibold text-neutral-900 dark:text-white">
                {s.name}
              </h3>
              <span className="mt-2 block h-px w-10 bg-gradient-to-r from-gold-400 to-transparent" />
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                {s.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-gold-700 dark:text-gold-300">
                  {s.price} <span className="text-xs font-normal text-neutral-400">{currency}</span>
                </span>
                <Link to={`/booking?serviceId=${s.id}`}>
                  <Button size="sm">{t('services.book')}</Button>
                </Link>
              </div>
            </Card>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-600 dark:text-gold-400">
              {t('home.boutiqueEyebrow')}
            </p>
            <h2 className="font-display text-4xl font-semibold text-neutral-900 dark:text-white">
              {t('home.boutiqueTitlePart1')}{' '}
              <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                {t('home.boutiqueAccent')}
              </span>{' '}
              {t('home.boutiqueTitlePart2')}
            </h2>
          </div>
          <Link to="/products" className="hidden md:block">
            <Button variant="ghost" size="sm">
              {t('home.allProducts')} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => (
            <Card key={p.id} className="p-5">
              <ShoppingBag className="h-6 w-6 text-gold-600" />
              <h3 className="mt-3 font-display text-xl font-semibold text-neutral-900 dark:text-white">
                {p.name}
              </h3>
              <span className="mt-2 block h-px w-10 bg-gradient-to-r from-gold-400 to-transparent" />
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                {p.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-gold-700 dark:text-gold-300">
                  {p.price} <span className="text-xs font-normal text-neutral-400">{currency}</span>
                </span>
                <Link to="/products">
                  <Button variant="outline" size="sm">
                    {t('home.shop')}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-600 dark:text-gold-400">
              {t('home.newsEyebrow')}
            </p>
            <h2 className="font-display text-4xl font-semibold text-neutral-900 dark:text-white">
              {t('home.newsTitlePart')}{' '}
              <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                {t('home.newsAccent')}
              </span>
            </h2>
          </div>
          <Link to="/news" className="hidden md:block">
            <Button variant="ghost" size="sm">
              {t('home.allNews')} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {latestNews.map((n) => (
            <Card key={n.id} className="p-6">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold-50 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700 dark:bg-gold-900/40 dark:text-gold-300">
                  {n.category}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {formatDate(n.createdAt)}
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-neutral-900 dark:text-white">
                {n.title}
              </h3>
              <span className="mt-2 block h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />
              <p className="mt-3 text-neutral-600 dark:text-neutral-300">{n.content}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-24 pt-8">
        <Card className="overflow-hidden p-10 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-gold-500" />
          <h2 className="mt-4 font-display text-4xl font-semibold text-neutral-900 dark:text-white md:text-5xl">
            {t('home.ctaEyebrow')}{' '}
            <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              {t('home.ctaAccent')}
            </span>
            {t('home.ctaQuestion')}
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300">
            {t('home.ctaSubtitle')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/booking">
              <Button size="lg">
                <CalendarPlus className="h-4 w-4" />
                {t('home.ctaBookNow')}
              </Button>
            </Link>
            <Link to="/news">
              <Button variant="outline" size="lg">
                <Newspaper className="h-4 w-4" />
                {t('home.ctaReadJournal')}
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </>
  );
};

export default HomePage;
