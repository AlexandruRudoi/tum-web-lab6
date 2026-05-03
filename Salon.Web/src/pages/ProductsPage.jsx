import { useState } from 'react';
import { Plus, ShoppingBag, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../context/useEntityContexts';
import { useFilterSearch } from '../hooks/useFilterSearch';
import { PRODUCT_CATEGORIES } from '../data/entities';
import SearchBar from '../components/common/SearchBar';
import CategoryFilter from '../components/common/CategoryFilter';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ProductCard from '../components/products/ProductCard';
import ProductFormModal from '../components/products/ProductFormModal';

const ProductsPage = () => {
  const { products, addProduct, removeProduct, toggleLike } = useProducts();
  const { t } = useTranslation();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useFilterSearch(products, {
    query,
    category,
    searchKeys: ['name', 'description'],
  }).filter((p) => (showOnlyLiked ? p.liked : true));

  const handleAdd = (data) => {
    addProduct(data);
    toast.success(t('products.added', { name: data.name }));
  };

  const handleRemoveConfirm = () => {
    if (!pendingDelete) return;
    removeProduct(pendingDelete.id);
    toast.info(t('products.removed', { name: pendingDelete.name }));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-gold-600 dark:text-gold-400">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
              {t('products.eyebrow')}
            </span>
          </div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
            {t('products.titlePart')}{' '}
            <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              {t('products.titleAccent')}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
            {t('products.subtitle')}
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4" />
          {t('products.addBtn')}
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="md:w-80">
          <SearchBar value={query} onChange={setQuery} placeholder={t('products.searchPlaceholder')} />
        </div>
        <div className="flex-1">
          <CategoryFilter
            categories={PRODUCT_CATEGORIES}
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

      {filtered.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title={t('products.emptyTitle')}
          description={t('products.emptyDescription')}
          action={
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="h-4 w-4" />
              {t('products.addBtn')}
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleLike={toggleLike}
              onRemove={() => setPendingDelete(product)}
            />
          ))}
        </div>
      )}

      <ProductFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAdd}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleRemoveConfirm}
        title={t('products.removeTitle')}
        message={pendingDelete ? t('products.removeMessage', { name: pendingDelete.name }) : ''}
        confirmLabel={t('common.remove')}
        cancelLabel={t('common.cancel')}
      />
    </section>
  );
};

export default ProductsPage;
