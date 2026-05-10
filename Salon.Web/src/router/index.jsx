import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import ServicesPage from '../pages/ServicesPage';
import ProductsPage from '../pages/ProductsPage';
import NewsPage from '../pages/NewsPage';
import BookingPage from '../pages/BookingPage';
import DashboardPage from '../pages/DashboardPage';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';

import ManageBookingsPage from '../pages/ManageBookingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'booking', element: <BookingPage /> },
      { path: 'manage-bookings', element: <ManageBookingsPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
