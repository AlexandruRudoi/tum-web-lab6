const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gold-300/70 bg-white/70 px-6 py-16 text-center backdrop-blur dark:border-gold-700/50 dark:bg-neutral-900/40">
    {Icon && <Icon className="mb-3 h-10 w-10 text-gold-500" />}
    <h3 className="font-display text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
      {title}
    </h3>
    <span className="mt-3 block h-px w-16 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
    {description && (
      <p className="mt-3 max-w-md text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
