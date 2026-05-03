const Card = ({ className = '', children, ...rest }) => (
  <div
    className={`group relative rounded-2xl border border-gold-200/70 bg-white/95 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-cardHover dark:border-gold-700/40 dark:bg-neutral-900/85 ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
