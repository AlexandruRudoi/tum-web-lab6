import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';
import { acquireToken, loginWithCredentials } from '../api/authApi';
import { clearToken, getTokenRole, getTokenUser, isTokenValid } from '../api/client';

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => (isTokenValid() ? getTokenRole() : null));
  const [user, setUser] = useState(() => (isTokenValid() ? getTokenUser() : null));
  const [isLoading, setIsLoading] = useState(!isTokenValid());
  const refreshTimer = useRef(null);

  // Schedule a silent visitor-token refresh (only for anonymous tokens).
  const scheduleRefresh = useCallback((expiresInSeconds) => {
    clearTimeout(refreshTimer.current);
    const ms = Math.max(0, (expiresInSeconds - 15) * 1000);
    refreshTimer.current = setTimeout(async () => {
      try {
        const data = await acquireToken('VISITOR');
        setRole('VISITOR');
        setUser(null);
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
        setUser(null);
        scheduleRefresh(data.expiresInSeconds);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));

    return () => clearTimeout(refreshTimer.current);
  }, [scheduleRefresh]);

  /** Log in with email + password (MANAGER or ADMIN). */
  const login = useCallback(async (email, password) => {
    const data = await loginWithCredentials(email, password);
    clearTimeout(refreshTimer.current); // stop anonymous refresh
    setRole(data.role);
    setUser({ name: data.name, email: data.email });
    return data;
  }, []);

  /** Log out — re-acquire an anonymous VISITOR token. */
  const logout = useCallback(async () => {
    clearToken();
    setRole(null);
    setUser(null);
    const data = await acquireToken('VISITOR');
    setRole('VISITOR');
    scheduleRefresh(data.expiresInSeconds);
  }, [scheduleRefresh]);

  const isAdmin = role === 'ADMIN';
  const isManager = role === 'MANAGER' || role === 'ADMIN';

  const value = useMemo(
    () => ({ role, user, isAdmin, isManager, isLoading, login, logout }),
    [role, user, isAdmin, isManager, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

