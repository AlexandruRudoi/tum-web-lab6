import { api, setToken } from './client';

/**
 * Acquire a JWT from the backend.
 * @param {'VISITOR'|'ADMIN'} role
 * @returns {{ token: string, expiresInSeconds: number }}
 */
export const acquireToken = async (role = 'VISITOR') => {
  const data = await api.post('/token', { role });
  setToken(data.token, role, data.expiresInSeconds);
  return data;
};
