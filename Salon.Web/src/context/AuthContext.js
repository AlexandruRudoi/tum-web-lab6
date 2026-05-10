import { createContext } from 'react';

export const AuthContext = createContext({
  role: null,
  isAdmin: false,
  isManager: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});
