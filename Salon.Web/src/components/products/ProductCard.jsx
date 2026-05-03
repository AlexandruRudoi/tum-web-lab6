import { Heart, Trash2, Package, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../common/Card';
import Button from '../common/Button';

const stockTone = (stock) => {
  if (stock <= 0) return 'text-red-500';
  if (stock < 5) return 'text-amber-600 dark:text-amber-400';
  return 'text-emerald-600 dark:text-emerald-400';
};

const ProductCard = ({ product, onToggleLike, onRemove }) => {
  const { t } = useTranslation();
  const outOfStock = product.stock <= 0;

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="flex items-start justify-between p-5 pb-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/70 bg-gold-50 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700 dark:border-gold-700/50 dark:bg-gold-900/30 dark:text-gold-300">
            {product.category}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-neutral-900 dark:text-white">
            {product.name}
          </h3>
          <span className="mt-2 block h-px w-10 bg-gradient-to-r from-gold-400 to-transparent" />
        </div>
        <button
          type="button"
          onClick={() => onToggleLike?.(product.id)}
          aria-label={product.liked ? t('products.unlikeAria') : t('products.likeAria')}
          className={`rounded-full p-2 transition-colors ${
            product.liked
              ? 'bg-gold-100 text-gold-700 dark:bg-gold-900/50 dark:text-gold-300'
              : 'text-neutral-400 hover:bg-gold-50 hover:text-gold-600 dark:hover:bg-neutral-800 dark:hover:text-gold-300'
          }`}
        >
          <Heart className={`h-5 w-5 ${product.liked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="mt-3 px-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {product.description}
      </p>

      <div className="mt-5 flex items-center justify-between px-5 text-sm">
        <span className={`flex items-center gap-1.5 ${stockTone(product.stock)}`}>
          <Package className="h-4 w-4" />
          {outOfStock
            ? t('products.outOfStock')
            : t('products.inStock', { count: product.stock })}
        </span>
        <span className="font-display text-xl font-semibold text-gold-700 dark:text-gold-300">
          {product.price}{' '}
          <span className="text-xs font-normal tracking-wider text-neutral-400">
            {t('common.currency')}
          </span>
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-gold-200/60 bg-gradient-to-r from-gold-50/40 to-neutral-50/60 p-4 dark:border-gold-800/40 dark:from-gold-900/15 dark:to-neutral-900/40">
        <span className="flex items-center gap-2 text-xs italic text-neutral-600 dark:text-neutral-300">
          <Info className="h-4 w-4 text-gold-600" />
          {t('products.askInSalon')}
        </span>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(product.id)}
            aria-label={t('products.removeAria')}
            className="text-neutral-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
