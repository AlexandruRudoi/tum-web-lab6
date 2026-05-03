/** @type {import('tailwindcss').Config} */
import { theme } from './src/theme/index.js';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        accent: theme.colors.accent,
        neutral: theme.colors.neutral,
        status: theme.colors.status,
      },
      fontFamily: {
        sans: theme.typography.fontFamily.primary,
        display: theme.typography.fontFamily.display,
      },
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      zIndex: theme.zIndex,
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
