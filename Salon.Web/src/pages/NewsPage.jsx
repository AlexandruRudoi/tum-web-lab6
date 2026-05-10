import { useMemo, useState } from 'react';
import { Plus, Newspaper, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNews } from '../context/useEntityContexts';
import { useFilterSearch } from '../hooks/useFilterSearch';
import { NEWS_CATEGORIES } from '../data/entities';
import { useCanManage } from '../config/permissions';
import SearchBar from '../components/common/SearchBar';
import CategoryFilter from '../components/common/CategoryFilter';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import NewsCard from '../components/news/NewsCard';
import NewsFormModal from '../components/news/NewsFormModal';

const NewsPage = () => {
  const { news, addNews, removeNews, toggleLike, togglePin } = useNews();
  const { t } = useTranslation();
  const canManage = useCanManage();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useFilterSearch(news, {
    query,
    category,
    searchKeys: ['title', 'content'],
  }).filter((p) => (showOnlyLiked ? p.liked : true));

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      }),
    [filtered],
  );

  const handleAdd = (data) => {
    addNews(data);
    toast.success(t('news.published', { title: data.title }));
  };

  const handleRemoveConfirm = () => {
    if (!pendingDelete) return;
    removeNews(pendingDelete.id);
    toast.info(t('news.removed', { title: pendingDelete.title }));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-gold-600 dark:text-gold-400">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
              {t('news.eyebrow')}
            </span>
          </div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
            {t('news.titlePart')}{' '}
            <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              {t('news.titleAccent')}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
            {t('news.subtitle')}
          </p>
        </div>
        {canManage && (
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4" />
            {t('news.addBtn')}
          </Button>
        )}
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="md:w-80">
          <SearchBar value={query} onChange={setQuery} placeholder={t('news.searchPlaceholder')} />
        </div>
        <div className="flex-1">
          <CategoryFilter
            categories={NEWS_CATEGORIES}
            value={category}
            onChange={setCategory}
            label={t('common.all')}
          />
        </div>
        <Button
          variant={showOnlyLiked ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setShowOnlyLiked((v) => !v)}
        >
          <Heart className={`h-4 w-4 ${showOnlyLiked ? 'fill-current' : ''}`} />
          {t('common.favorites')}
        </Button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title={t('news.emptyTitle')}
          description={t('news.emptyDescription')}
          action={
            canManage ? (
              <Button onClick={() => setFormOpen(true)}>
                <Plus className="h-4 w-4" />
                {t('news.addBtn')}
              </Button>
            ) : null
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <NewsCard
              key={post.id}
              post={post}
              onToggleLike={toggleLike}
              onTogglePin={togglePin}
              onRemove={canManage ? () => setPendingDelete(post) : undefined}
            />
          ))}
        </div>
      )}

      <NewsFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAdd}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleRemoveConfirm}
        title={t('news.removeTitle')}
        message={pendingDelete ? t('news.removeMessage', { title: pendingDelete.title }) : ''}
        confirmLabel={t('common.remove')}
        cancelLabel={t('common.cancel')}
      />
    </section>
  );
};

export default NewsPage;
