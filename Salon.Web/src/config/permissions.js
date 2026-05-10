import { useAuth } from '../context/useEntityContexts';

// True when the current user can create/edit/delete content (ADMIN only).
export const useCanManage = () => useAuth().isAdmin;

// True when the current user can confirm or decline appointments (MANAGER or ADMIN).
export const useCanApproveBookings = () => useAuth().isManager;
