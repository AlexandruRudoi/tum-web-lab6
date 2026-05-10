import { useAuth } from '../context/useEntityContexts';

// Returns true when the current user holds the ADMIN role.
export const useCanManage = () => useAuth().isAdmin;
