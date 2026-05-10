import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookingsContext } from './entity-contexts';
import { bookingsApi } from '../api/bookingsApi';

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingsApi
      .getAll()
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addBooking = useCallback(async (data) => {
    const created = await bookingsApi.create(data);
    setBookings((prev) => [created, ...prev]);
    return created;
  }, []);

  const updateBooking = useCallback((id, patch) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }, []);

  const removeBooking = useCallback(async (id) => {
    await bookingsApi.delete(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const setBookingStatus = useCallback(async (id, status) => {
    const updated = await bookingsApi.updateStatus(id, status);
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
  }, []);

  const resetBookings = useCallback(async () => {
    setLoading(true);
    try {
      const fresh = await bookingsApi.getAll();
      setBookings(fresh);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ bookings, loading, addBooking, updateBooking, removeBooking, setBookingStatus, resetBookings }),
    [bookings, loading, addBooking, updateBooking, removeBooking, setBookingStatus, resetBookings],
  );

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
};
