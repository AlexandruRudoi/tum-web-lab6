const Card = ({ className = '', children, ...rest }) => (
  <div
    className={`rounded-xl border border-neutral-200 bg-white shadow-card transition-shadow hover:shadow-cardHover dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
    {...rest}
  >
    {children}
  </div>
);

export default Card;
