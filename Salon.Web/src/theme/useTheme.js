// Hook for accessing theme tokens in components.
import { useMemo } from 'react';
import { theme } from './index.js';

export const useTheme = () => useMemo(() => theme, []);
