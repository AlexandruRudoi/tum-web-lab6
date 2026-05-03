import { Heart, Trash2, Clock, CalendarPlus } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const ServiceCard = ({ service, onToggleLike, onRemove, onBook }) => (
  <Card className="flex h-full flex-col overflow-hidden">
    <div className="flex items-start justify-between p-5 pb-3">
      <div>
        <span className="inline-block rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
          {service.category}
        </span>
        <h3 className="mt-2 font-display text-lg font-semibold text-neutral-900 dark:text-white">
          {service.name}
        </h3>
      </div>
      <button
        type="button"
        onClick={() => onToggleLike?.(service.id)}
        aria-label={service.liked ? 'Unlike service' : 'Like service'}
        className={`rounded-full p-2 transition-colors ${
          service.liked
            ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-300'
            : 'text-neutral-400 hover:bg-neutral-100 hover:text-primary-500 dark:hover:bg-neutral-800'
        }`}
      >
        <Heart className={`h-5 w-5 ${service.liked ? 'fill-current' : ''}`} />
      </button>
    </div>

    <p className="px-5 text-sm text-neutral-600 dark:text-neutral-300">{service.description}</p>

    <div className="mt-4 flex items-center justify-between px-5 text-sm text-neutral-500 dark:text-neutral-400">
      <span className="flex items-center gap-1.5">
        <Clock className="h-4 w-4" />
        {service.duration} min
      </span>
      <span className="font-display text-lg font-semibold text-primary-600 dark:text-primary-300">
        {service.price} MDL
      </span>
    </div>

    <div className="mt-5 flex items-center justify-between gap-2 border-t border-neutral-100 bg-neutral-50/60 p-4 dark:border-neutral-800 dark:bg-neutral-900/40">
      <Button variant="primary" size="sm" onClick={() => onBook?.(service)}>
        <CalendarPlus className="h-4 w-4" />
        Book
      </Button>
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(service.id)}
          aria-label="Remove service"
          className="text-neutral-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  </Card>
);

export default ServiceCard;
