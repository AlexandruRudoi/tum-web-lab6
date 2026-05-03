import { Scissors, Package, Newspaper } from 'lucide-react';

const ICONS = {
  service: Scissors,
  product: Package,
  news: Newspaper,
};

/**
 * CardMedia — fills the card frame with a cover-crop image.
 * Aspect ratios are fixed per kind so every card is uniform.
 *  - service: 4 / 3   (export 1200x900)
 *  - product: 1 / 1   (export 1000x1000)
 *  - news:    16 / 9  (export 1600x900)
 * Override with the `aspect` prop if needed.
 */
const CardMedia = ({ src, alt, kind = 'service', aspect, className = '' }) => {
  const Icon = ICONS[kind] || Scissors;
  const defaultAspect =
    kind === 'product'
      ? 'aspect-square'
      : kind === 'news'
        ? 'aspect-[16/9]'
        : 'aspect-[4/3]';
  const aspectClass = aspect || defaultAspect;

  return (
    <div
      className={`relative ${aspectClass} w-full overflow-hidden bg-gradient-to-br from-gold-100 via-gold-50 to-neutral-100 dark:from-gold-900/40 dark:via-gold-900/20 dark:to-neutral-900 ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon className="h-12 w-12 text-gold-500/70" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  );
};

export default CardMedia;
