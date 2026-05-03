const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white/60 px-6 py-16 text-center dark:border-neutral-700 dark:bg-neutral-900/40">
    {Icon && <Icon className="mb-3 h-10 w-10 text-primary-400" />}
    <h3 className="font-display text-xl font-semibold text-neutral-800 dark:text-neutral-100">
      {title}
    </h3>
    {description && (
      <p className="mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
