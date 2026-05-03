import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useServices } from '../context/useEntityContexts';
import { useFilterSearch } from '../hooks/useFilterSearch';
import { SERVICE_CATEGORIES } from '../data/entities';
import { CAN_MANAGE } from '../config/permissions';
import { translateService, translateCategory } from '../i18n/translateEntity';
import SearchBar from '../components/common/SearchBar';
import CategoryFilter from '../components/common/CategoryFilter';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ServiceCard from '../components/services/ServiceCard';
import ServiceFormModal from '../components/services/ServiceFormModal';

const ServicesPage = () => {
  const { services, addService, removeService, toggleLike } = useServices();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useFilterSearch(services, {
    query,
    category,
    searchKeys: ['name', 'description'],
  }).filter((s) => (showOnlyLiked ? s.liked : true));

  const handleAdd = (data) => {
    addService(data);
    toast.success(t('services.added', { name: data.name }));
  };

  const handleRemoveConfirm = () => {
    if (!pendingDelete) return;
    removeService(pendingDelete.id);
    toast.info(t('services.removed', { name: pendingDelete.name }));
  };

  const handleBook = (service) => {
    navigate(`/booking?serviceId=${service.id}`);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-gold-600 dark:text-gold-400">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
              {t('services.eyebrow')}
            </span>
          </div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
            {t('services.titlePart')}{' '}
            <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              {t('services.titleAccent')}
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
            {t('services.subtitle')}
          </p>
        </div>
        {CAN_MANAGE && (
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="h-4 w-4" />
            {t('services.addBtn')}
          </Button>
        )}
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="md:w-80">
          <SearchBar value={query} onChange={setQuery} placeholder={t('services.searchPlaceholder')} />
        </div>
        <div className="flex-1">
          <CategoryFilter
            categories={SERVICE_CATEGORIES}
            value={category}
            onChange={setCategory}
            label={t('common.all')}
            getLabel={(c) => translateCategory(c, t)}
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
          icon={Sparkles}
          title={t('services.emptyTitle')}
          description={t('services.emptyDescription')}
          action={
            CAN_MANAGE ? (
              <Button onClick={() => setFormOpen(true)}>
                <Plus className="h-4 w-4" />
                {t('services.addBtn')}
              </Button>
            ) : null
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={translateService(service, t)}
              onToggleLike={() => toggleLike(service.id)}
              onRemove={CAN_MANAGE ? () => setPendingDelete(service) : undefined}
              onBook={() => handleBook(service)}
            />
          ))}
        </div>
      )}

      <ServiceFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAdd}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleRemoveConfirm}
        title={t('services.removeTitle')}
        message={pendingDelete ? t('services.removeMessage', { name: pendingDelete.name }) : ''}
        confirmLabel={t('common.remove')}
        cancelLabel={t('common.cancel')}
      />
    </section>
  );
};

export default ServicesPage;
