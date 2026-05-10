import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';
import { acquireToken } from '../api/authApi';
import { getTokenRole, isTokenValid } from '../api/client';

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => (isTokenValid() ? getTokenRole() : null));
  const [isLoading, setIsLoading] = useState(!isTokenValid());
  const refreshTimer = useRef(null);

  // Schedule a silent visitor-token refresh before the current one expires.
  const scheduleRefresh = useCallback((expiresInSeconds) => {
    clearTimeout(refreshTimer.current);
    const ms = Math.max(0, (expiresInSeconds - 15) * 1000);
    refreshTimer.current = setTimeout(async () => {
      try {
        const data = await acquireToken('VISITOR');
        setRole('VISITOR');
        scheduleRefresh(data.expiresInSeconds);
      } catch {
        // API unreachable — keep current token until it hard-expires.
      }
    }, ms);
  }, []);

  useEffect(() => {
    if (isTokenValid()) {
      setIsLoading(false);
      return;
    }
    // Auto-acquire a visitor token on first load.
    acquireToken('VISITOR')
      .then((data) => {
        setRole('VISITOR');
        scheduleRefresh(data.expiresInSeconds);
      })
      .catch(() => {
        // Backend might be down — app still works in read/seed mode.
      })
      .finally(() => setIsLoading(false));

    return () => clearTimeout(refreshTimer.current);
  }, [scheduleRefresh]);

  // Upgrade to ADMIN (or downgrade back to VISITOR).
  const login = useCallback(
    async (targetRole = 'ADMIN') => {
      const data = await acquireToken(targetRole);
      setRole(targetRole);
      scheduleRefresh(data.expiresInSeconds);
      return data;
    },
    [scheduleRefresh],
  );

  const logout = useCallback(async () => {
    const data = await acquireToken('VISITOR');
    setRole('VISITOR');
    scheduleRefresh(data.expiresInSeconds);
  }, [scheduleRefresh]);

  const isAdmin = role === 'ADMIN';

  const value = useMemo(
    () => ({ role, isAdmin, isLoading, login, logout }),
    [role, isAdmin, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
