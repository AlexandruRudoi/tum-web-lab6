import { api } from './client';

export const fetchUsers = () => api.get('/api/users');

export const updateUserRole = (id, role) =>
  api.patch(`/api/users/${id}/role`, { role });

export const deleteUser = (id) => api.delete(`/api/users/${id}`);
