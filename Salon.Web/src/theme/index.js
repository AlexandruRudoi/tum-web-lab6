// Design tokens for HAPPINESS Beauty Salon
// Consumed by tailwind.config.js (extend) and useTheme hook.

export const theme = {
  colors: {
    // Primary pink (brand)
    primary: {
      50: '#FFF1F5',
      100: '#FFE4EC',
      200: '#FFC9D9',
      300: '#FFA3BE',
      400: '#FF74A0',
      500: '#FF4F87', // brand pink
      600: '#E83A73',
      700: '#C12860',
      800: '#8F1D48',
      900: '#5E1230',
    },

    // Rose-gold accent
    accent: {
      50: '#FBF1EE',
      100: '#F6DED6',
      200: '#EDBBA8',
      300: '#E29C82',
      400: '#D87E5E',
      500: '#B76E79', // rose-gold
      600: '#9A5A64',
      700: '#7A4750',
      800: '#5A343C',
      900: '#3A2228',
    },

    // Neutrals (grays)
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B',
      950: '#0B0B0E',
    },

    // Status colors
    status: {
      pending: '#F59E0B',
      confirmed: '#10B981',
      cancelled: '#EF4444',
      completed: '#6366F1',
    },
  },

  typography: {
    fontFamily: {
      primary: ['Poppins', 'system-ui', 'sans-serif'],
      display: ['"Playfair Display"', 'Georgia', 'serif'],
    },
  },

  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
  },

  shadows: {
    soft: '0 2px 8px rgba(255, 79, 135, 0.08)',
    card: '0 4px 16px rgba(0, 0, 0, 0.06)',
    cardHover: '0 8px 24px rgba(255, 79, 135, 0.15)',
    elevated: '0 12px 32px rgba(0, 0, 0, 0.12)',
  },

  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    toast: 500,
  },
};
