import { Scissors, Package, Newspaper } from 'lucide-react';

const ICONS = {
  service: Scissors,
  product: Package,
  news: Newspaper,
};

const CardMedia = ({ src, alt, kind = 'service', className = '' }) => {
  const Icon = ICONS[kind] || Scissors;
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-gold-100 via-gold-50 to-neutral-100 dark:from-gold-900/40 dark:via-gold-900/20 dark:to-neutral-900 ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon className="h-12 w-12 text-gold-500/70" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
};

export default CardMedia;
