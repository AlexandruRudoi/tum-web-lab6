import { Heart, Trash2, Pin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../common/Card';
import Button from '../common/Button';
import CardMedia from '../common/CardMedia';
import { formatDate } from '../../utils/date';

const NewsCard = ({ post, onToggleLike, onTogglePin, onRemove }) => {
  const { t } = useTranslation();
  return (
    <Card className={`flex h-full flex-col overflow-hidden ${post.pinned ? 'ring-2 ring-gold-400/60' : ''}`}>
      <CardMedia src={post.image} alt={post.title} kind="news" />
      <div className="flex items-start justify-between p-5 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/70 bg-gold-50 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-700 dark:border-gold-700/50 dark:bg-gold-900/30 dark:text-gold-300">
              {post.category}
            </span>
            {post.pinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                <Pin className="h-3 w-3" />
                {t('news.pinned')}
              </span>
            )}
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-neutral-900 dark:text-white">
            {post.title}
          </h3>
          <span className="mt-2 block h-px w-10 bg-gradient-to-r from-gold-400 to-transparent" />
        </div>
        <button
          type="button"
          onClick={() => onToggleLike?.(post.id)}
          aria-label={post.liked ? t('news.unlikeAria') : t('news.likeAria')}
          className={`rounded-full p-2 transition-colors ${
            post.liked
              ? 'bg-gold-100 text-gold-700 dark:bg-gold-900/50 dark:text-gold-300'
              : 'text-neutral-400 hover:bg-gold-50 hover:text-gold-600 dark:hover:bg-neutral-800 dark:hover:text-gold-300'
          }`}
        >
          <Heart className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="mt-3 px-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {post.content}
      </p>

      <div className="mt-5 flex items-center gap-1.5 px-5 text-xs text-neutral-500 dark:text-neutral-400">
        <Calendar className="h-3.5 w-3.5" />
        {formatDate(post.createdAt)}
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-gold-200/60 bg-gradient-to-r from-gold-50/40 to-neutral-50/60 p-4 dark:border-gold-800/40 dark:from-gold-900/15 dark:to-neutral-900/40">
        <Button
          variant={post.pinned ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onTogglePin?.(post.id)}
        >
          <Pin className="h-4 w-4" />
          {post.pinned ? t('news.unpin') : t('news.pin')}
        </Button>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(post.id)}
            aria-label={t('news.removeAria')}
            className="text-neutral-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default NewsCard;
