import { useMemo, useCallback } from 'react';
import { BookingsContext } from './entity-contexts';
import { useEntityState } from '../hooks/useEntityState';
import { STORAGE_KEYS, BOOKING_STATUS } from '../data/entities';
import { seedBookings } from '../data/seed/bookings';
import { createId } from '../utils/id';
import { nowIso } from '../utils/date';

export const BookingsProvider = ({ children }) => {
  const state = useEntityState(STORAGE_KEYS.BOOKINGS, seedBookings);

  const create = useCallback(
    (data) => {
      const booking = {
        id: createId(),
        status: BOOKING_STATUS.PENDING,
        notes: '',
        createdAt: nowIso(),
        ...data,
      };
      state.add(booking);
      return booking;
    },
    [state],
  );

  const setStatus = useCallback(
    (id, status) => {
      state.update(id, { status });
    },
    [state],
  );

  const value = useMemo(
    () => ({
      bookings: state.items,
      addBooking: create,
      updateBooking: state.update,
      removeBooking: state.remove,
      setBookingStatus: setStatus,
      resetBookings: state.reset,
    }),
    [state, create, setStatus],
  );

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
};
