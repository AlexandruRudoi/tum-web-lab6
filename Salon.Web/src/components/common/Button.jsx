const variants = {
  primary:
    'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_auto] text-white shadow-soft hover:bg-[position:right_center] focus-visible:ring-gold-300',
  secondary:
    'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus-visible:ring-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
  outline:
    'border border-gold-400 text-gold-700 hover:bg-gold-50 focus-visible:ring-gold-300 dark:border-gold-600 dark:text-gold-300 dark:hover:bg-gold-900/30',
  ghost:
    'text-neutral-600 hover:bg-gold-50 hover:text-gold-700 focus-visible:ring-gold-200 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-gold-300',
  danger:
    'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-300',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'p-2',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...rest
}) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
