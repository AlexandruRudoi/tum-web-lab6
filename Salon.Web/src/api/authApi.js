import { api, setToken } from './client';

/**
 * Acquire an anonymous JWT for the given role (VISITOR, USER, MANAGER, ADMIN).
 * Used only for the anonymous VISITOR auto-token; real users log in via loginWithCredentials.
 */
export const acquireToken = async (role = 'VISITOR') => {
  const data = await api.post('/token', { role });
  setToken(data.token, role, data.expiresInSeconds, null);
  return data;
};

/**
 * Authenticate with email + password.
 * Returns { token, expiresInSeconds, name, email, role }.
 */
export const loginWithCredentials = async (email, password) => {
  const data = await api.post('/api/auth/login', { email, password });
  setToken(data.token, data.role, data.expiresInSeconds, { name: data.name, email: data.email });
  return data;
};
