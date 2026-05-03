const variants = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-300',
  secondary:
    'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus-visible:ring-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
  outline:
    'border border-primary-300 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-300 dark:border-primary-700 dark:text-primary-300 dark:hover:bg-primary-900/30',
  ghost:
    'text-neutral-600 hover:bg-neutral-100 focus-visible:ring-neutral-300 dark:text-neutral-300 dark:hover:bg-neutral-800',
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
    className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
