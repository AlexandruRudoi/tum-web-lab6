import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, CheckCircle, XCircle, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useBookings, useServices } from '../context/useEntityContexts';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const BOOKING_STATUS = { PENDING: 'pending', CONFIRMED: 'confirmed', CANCELLED: 'cancelled' };

const STATUS_FILTERS = ['all', 'pending', 'confirmed', 'cancelled'];

const statusBadge = (status) => {
  const map = {
    pending:   'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    confirmed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    cancelled: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    completed: 'bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',
  };
  return map[status] ?? 'bg-neutral-100 text-neutral-600';
};

const ManageBookingsPage = () => {
  const { bookings, setBookingStatus, removeBooking } = useBookings();
  const { services } = useServices();
  const [filter, setFilter] = useState('all');

  const serviceMap = useMemo(
    () => Object.fromEntries(services.map((s) => [s.id, s])),
    [services],
  );

  const sorted = useMemo(() => {
    const base = [...bookings].sort((a, b) =>
      `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`),
    );
    return filter === 'all' ? base : base.filter((b) => b.status === filter);
  }, [bookings, filter]);

  const handleConfirm = async (id) => {
    try {
      await setBookingStatus(id, BOOKING_STATUS.CONFIRMED);
      toast.success('Booking confirmed.');
    } catch {
      toast.error('Failed to confirm booking.');
    }
  };

  const handleCancel = async (id) => {
    try {
      await setBookingStatus(id, BOOKING_STATUS.CANCELLED);
      toast.info('Booking cancelled.');
    } catch {
      toast.error('Failed to cancel booking.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeBooking(id);
      toast.info('Booking deleted.');
    } catch {
      toast.error('Failed to delete booking.');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/dashboard"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-gold-600 dark:text-neutral-400 dark:hover:text-gold-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-3 flex items-center gap-3 text-gold-600 dark:text-gold-400">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">Staff Panel</span>
        </div>
        <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
          Manage{' '}
          <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
            Bookings
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
          Review, confirm, or cancel client appointments.
        </p>
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              filter === s
                ? 'bg-gold-600 text-white dark:bg-gold-500'
                : 'border border-neutral-200 bg-white text-neutral-600 hover:border-gold-400 hover:text-gold-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400'
            }`}
          >
            {s}
            {s !== 'all' && (
              <span className="ml-1.5 opacity-70">
                ({bookings.filter((b) => b.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <CalendarCheck className="h-5 w-5 text-gold-600 dark:text-gold-400" />
          <h2 className="font-display text-xl font-semibold text-neutral-900 dark:text-white">
            {filter === 'all' ? 'All Bookings' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Bookings`}
            <span className="ml-2 text-sm font-normal text-neutral-400">({sorted.length})</span>
          </h2>
        </div>
        <span className="mb-4 block h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />

        {sorted.length === 0 ? (
          <p className="py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No bookings found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold-200/50 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:border-gold-800/40 dark:text-neutral-400">
                  <th className="pb-3 pr-4">Client</th>
                  <th className="pb-3 pr-4">Service</th>
                  <th className="pb-3 pr-4">Date & Time</th>
                  <th className="pb-3 pr-4">Notes</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-100/60 dark:divide-gold-900/30">
                {sorted.map((b) => (
                  <tr key={b.id} className="group">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-neutral-800 dark:text-neutral-100">{b.clientName}</p>
                      {b.clientEmail && (
                        <p className="text-[11px] text-neutral-400">{b.clientEmail}</p>
                      )}
                      {b.phone && (
                        <p className="text-[11px] text-neutral-400">{b.phone}</p>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-neutral-700 dark:text-neutral-300">
                      {serviceMap[b.serviceId]?.name ?? '—'}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                      {b.date}<br />
                      <span className="text-[11px] text-neutral-400">{b.time}</span>
                    </td>
                    <td className="py-3 pr-4 max-w-[180px] text-xs text-neutral-500 dark:text-neutral-400 italic">
                      {b.notes || '—'}
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${statusBadge(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        {b.status !== BOOKING_STATUS.CONFIRMED && (
                          <button
                            type="button"
                            onClick={() => handleConfirm(b.id)}
                            title="Confirm"
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-emerald-600 transition-colors hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                          >
                            <CheckCircle className="h-3.5 w-3.5" /> Confirm
                          </button>
                        )}
                        {b.status !== BOOKING_STATUS.CANCELLED && (
                          <button
                            type="button"
                            onClick={() => handleCancel(b.id)}
                            title="Cancel"
                            className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30"
                          >
                            <XCircle className="h-3.5 w-3.5" /> Cancel
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDelete(b.id)}
                          title="Delete"
                          className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </section>
  );
};

export default ManageBookingsPage;
