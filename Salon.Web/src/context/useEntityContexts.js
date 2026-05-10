import { useContext } from 'react';
import {
  ServicesContext,
  ProductsContext,
  BookingsContext,
  NewsContext,
} from './entity-contexts';
import { AuthContext } from './AuthContext';

export const useAuth = () => useContext(AuthContext);
export const useServices = () => useContext(ServicesContext);
export const useProducts = () => useContext(ProductsContext);
export const useBookings = () => useContext(BookingsContext);
export const useNews = () => useContext(NewsContext);
