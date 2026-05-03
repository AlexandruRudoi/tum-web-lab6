const Footer = () => (
  <footer className="mt-20 border-t border-gold-300/70 bg-neutral-50/70 py-10 text-center backdrop-blur dark:border-gold-700/50 dark:bg-neutral-950/70">
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4">
      <div className="flex items-center gap-3 text-gold-600 dark:text-gold-400">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400" />
        <span className="font-display text-xs tracking-[0.4em]">HAPPINESS</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400" />
      </div>
      <p className="font-display text-lg italic text-neutral-700 dark:text-neutral-200">
        Where beauty meets serenity.
      </p>
      <p className="text-xs tracking-wider text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} HAPPINESS Beauty Salon
      </p>
    </div>
  </footer>
);

export default Footer;
