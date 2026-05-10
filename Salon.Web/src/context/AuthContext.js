import { createContext } from 'react';

export const AuthContext = createContext({
  role: null,
  user: null, // { name, email } — only set for credential-based logins
  isAdmin: false,
  isManager: false,
  isLoading: true,
  login: async (_email, _password) => {},
  logout: async () => {},
});
