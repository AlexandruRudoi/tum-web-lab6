import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Sparkles, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useServices } from '../context/useEntityContexts';
import { useFilterSearch } from '../hooks/useFilterSearch';
import { SERVICE_CATEGORIES } from '../data/entities';
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
    toast.success(`"${data.name}" added`);
  };

  const handleRemoveConfirm = () => {
    if (!pendingDelete) return;
    removeService(pendingDelete.id);
    toast.info(`"${pendingDelete.name}" removed`);
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
              Treatments
            </span>
          </div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
            Our{' '}
            <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
            Browse, filter and book the beauty treatments offered at HAPPINESS — each
            one crafted with care and a touch of gold.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="h-4 w-4" />
          Add service
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="md:w-80">
          <SearchBar value={query} onChange={setQuery} placeholder="Search services…" />
        </div>
        <div className="flex-1">
          <CategoryFilter
            categories={SERVICE_CATEGORIES}
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

      {filtered.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No services found"
          description="Try adjusting your search or filters, or add a new service."
          action={
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="h-4 w-4" />
              Add service
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onToggleLike={toggleLike}
              onRemove={() => setPendingDelete(service)}
              onBook={handleBook}
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
        title="Remove service?"
        message={pendingDelete ? `"${pendingDelete.name}" will be permanently removed.` : ''}
        confirmLabel="Remove"
      />
    </section>
  );
};

export default ServicesPage;
