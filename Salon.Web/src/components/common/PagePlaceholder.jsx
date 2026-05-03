const PagePlaceholder = ({ title, description }) => (
  <section className="mx-auto max-w-7xl px-4 py-12">
    <h1 className="font-display text-4xl font-semibold text-neutral-900 dark:text-white">
      {title}
    </h1>
    {description && (
      <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">{description}</p>
    )}
    <div className="mt-8 rounded-lg border border-dashed border-primary-300 bg-primary-50/50 p-8 text-center text-primary-700 dark:border-primary-800 dark:bg-primary-900/20 dark:text-primary-200">
      Coming soon — this page will be implemented in a dedicated feature branch.
    </div>
  </section>
);

export default PagePlaceholder;
