import { useMemo, useState } from 'react';
import { Plus, Newspaper, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNews } from '../context/useEntityContexts';
import { useFilterSearch } from '../hooks/useFilterSearch';
import { NEWS_CATEGORIES } from '../data/entities';
import SearchBar from '../components/common/SearchBar';
import CategoryFilter from '../components/common/CategoryFilter';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import NewsCard from '../components/news/NewsCard';
import NewsFormModal from '../components/news/NewsFormModal';

const NewsPage = () => {
  const { news, addNews, removeNews, toggleLike, togglePin } = useNews();

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
    toast.success(`"${data.title}" published`);
  };

  const handleRemoveConfirm = () => {
    if (!pendingDelete) return;
    removeNews(pendingDelete.id);
    toast.info(`"${pendingDelete.title}" removed`);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-gold-600 dark:text-gold-400">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
              Journal
            </span>
          </div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
            News &{' '}
            <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              Promotions
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
            Stories, offers and little moments from inside the salon — pinned posts
            stay at the top.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Publish post
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="md:w-80">
          <SearchBar value={query} onChange={setQuery} placeholder="Search posts…" />
        </div>
        <div className="flex-1">
          <CategoryFilter
            categories={NEWS_CATEGORIES}
            value={category}
            onChange={setCategory}
          />
        </div>
        <Button
          variant={showOnlyLiked ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setShowOnlyLiked((v) => !v)}
        >
          <Heart className={`h-4 w-4 ${showOnlyLiked ? 'fill-current' : ''}`} />
          Favorites
        </Button>
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="No posts yet"
          description="Try clearing your filters, or publish the first post."
          action={
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="h-4 w-4" />
              Publish post
            </Button>
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
              onRemove={() => setPendingDelete(post)}
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
        title="Remove post?"
        message={pendingDelete ? `"${pendingDelete.title}" will be permanently removed.` : ''}
        confirmLabel="Remove"
      />
    </section>
  );
};

export default NewsPage;
