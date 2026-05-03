import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarPlus, Clock, User, Phone, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useBookings, useServices } from '../context/useEntityContexts';
import { translateService } from '../i18n/translateEntity';
import { BOOKING_STATUS } from '../data/entities';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { formatDate } from '../utils/date';

const statusStyles = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
  confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200',
  completed: 'bg-gold-100 text-gold-700 dark:bg-gold-900/40 dark:text-gold-200',
};

const todayIso = () => new Date().toISOString().slice(0, 10);

const BookingPage = () => {
  const { services } = useServices();
  const { bookings, addBooking, removeBooking, setBookingStatus } = useBookings();
  const [params, setParams] = useSearchParams();
  const { t } = useTranslation();

  const [form, setForm] = useState(() => {
    const sid = params.get('serviceId');
    const valid = sid && services.some((s) => s.id === sid);
    return {
      clientName: '',
      phone: '',
      serviceId: valid ? sid : services[0]?.id || '',
      date: todayIso(),
      time: '10:00',
      notes: '',
    };
  });
  const [errors, setErrors] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const serviceMap = useMemo(
    () => Object.fromEntries(services.map((s) => [s.id, s])),
    [services],
  );

  const validate = () => {
    const next = {};
    if (!form.clientName.trim()) next.clientName = t('validation.nameRequired');
    if (!/^[+\d\s()-]{6,}$/.test(form.phone.trim())) next.phone = t('validation.phoneInvalid');
    if (!form.serviceId) next.serviceId = t('validation.serviceRequired');
    if (!form.date) next.date = t('validation.dateRequired');
    if (!form.time) next.time = t('validation.timeRequired');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const booking = addBooking({
      clientName: form.clientName.trim(),
      phone: form.phone.trim(),
      serviceId: form.serviceId,
      date: form.date,
      time: form.time,
      notes: form.notes.trim(),
    });
    toast.success(t('booking.requested', { name: booking.clientName }));
    setForm((f) => ({ ...f, clientName: '', phone: '', notes: '' }));
    if (params.get('serviceId')) setParams({});
  };

  const handleRemoveConfirm = () => {
    if (!pendingDelete) return;
    removeBooking(pendingDelete.id);
    toast.info(t('booking.removed'));
  };

  const sortedBookings = useMemo(
    () =>
      [...bookings].sort((a, b) => {
        const da = `${a.date}T${a.time}`;
        const db = `${b.date}T${b.time}`;
        return db.localeCompare(da);
      }),
    [bookings],
  );

  const inputClass =
    'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:ring-gold-900/40';
  const labelClass = 'mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-200';
  const errorClass = 'mt-1 text-xs text-red-500';
  const currency = t('common.currency');

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-3 text-gold-600 dark:text-gold-400">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em]">
            {t('booking.eyebrow')}
          </span>
        </div>
        <h1 className="font-display text-5xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-6xl">
          {t('booking.titlePart')}{' '}
          <span className="italic bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
            {t('booking.titleAccent')}
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
          {t('booking.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
            {t('booking.newBooking')}
          </h2>
          <span className="mt-2 mb-5 block h-px w-12 bg-gradient-to-r from-gold-400 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>{t('form.fullName')}</label>
              <input
                className={inputClass}
                value={form.clientName}
                onChange={update('clientName')}
                placeholder={t('form.namePlaceholder')}
              />
              {errors.clientName && <p className={errorClass}>{errors.clientName}</p>}
            </div>
            <div>
              <label className={labelClass}>{t('form.phone')}</label>
              <input
                className={inputClass}
                value={form.phone}
                onChange={update('phone')}
                placeholder={t('form.phonePlaceholder')}
              />
              {errors.phone && <p className={errorClass}>{errors.phone}</p>}
            </div>
            <div>
              <label className={labelClass}>{t('form.service')}</label>
              <select
                className={inputClass}
                value={form.serviceId}
                onChange={update('serviceId')}
              >
                <option value="">{t('booking.chooseService')}</option>
                {services.map((s) => {
                  const ts = translateService(s, t);
                  return (
                    <option key={s.id} value={s.id}>
                      {ts.name} · {s.price} {currency}
                    </option>
                  );
                })}
              </select>
              {errors.serviceId && <p className={errorClass}>{errors.serviceId}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t('form.date')}</label>
                <input
                  type="date"
                  min={todayIso()}
                  className={inputClass}
                  value={form.date}
                  onChange={update('date')}
                />
                {errors.date && <p className={errorClass}>{errors.date}</p>}
              </div>
              <div>
                <label className={labelClass}>{t('form.time')}</label>
                <input
                  type="time"
                  className={inputClass}
                  value={form.time}
                  onChange={update('time')}
                />
                {errors.time && <p className={errorClass}>{errors.time}</p>}
              </div>
            </div>
            <div>
              <label className={labelClass}>{t('form.notes')}</label>
              <textarea
                rows={3}
                className={inputClass}
                value={form.notes}
                onChange={update('notes')}
                placeholder={t('form.notesPlaceholder')}
              />
            </div>
            <Button type="submit" className="w-full">
              <CalendarPlus className="h-4 w-4" />
              {t('booking.submit')}
            </Button>
          </form>
        </Card>

        <div className="lg:col-span-3">
          <h2 className="mb-4 font-display text-2xl font-semibold text-neutral-900 dark:text-white">
            {t('booking.yourBookings')}
          </h2>

          {sortedBookings.length === 0 ? (
            <EmptyState
              icon={CalendarPlus}
              title={t('booking.emptyTitle')}
              description={t('booking.emptyDescription')}
            />
          ) : (
            <div className="space-y-4">
              {sortedBookings.map((b) => {
                const svc = serviceMap[b.serviceId];
                const tsvc = svc ? translateService(svc, t) : null;
                return (
                  <Card key={b.id} className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex rounded-full px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusStyles[b.status]}`}
                          >
                            {t(`booking.status.${b.status}`)}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {t('booking.bookedOn', { date: formatDate(b.createdAt) })}
                          </span>
                        </div>
                        <h3 className="mt-2 font-display text-lg font-semibold text-neutral-900 dark:text-white">
                          {tsvc ? tsvc.name : t('booking.serviceRemoved')}
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                          <span className="flex items-center gap-1.5">
                            <User className="h-4 w-4 text-gold-600" />
                            {b.clientName}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Phone className="h-4 w-4 text-gold-600" />
                            {b.phone}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-gold-600" />
                            {b.date} · {b.time}
                          </span>
                        </div>
                        {b.notes && (
                          <p className="mt-2 text-sm italic text-neutral-500 dark:text-neutral-400">
                            "{b.notes}"
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {b.status !== BOOKING_STATUS.CONFIRMED && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setBookingStatus(b.id, BOOKING_STATUS.CONFIRMED)}
                            aria-label={t('booking.confirmAria')}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                        )}
                        {b.status !== BOOKING_STATUS.CANCELLED && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setBookingStatus(b.id, BOOKING_STATUS.CANCELLED)}
                            aria-label={t('booking.cancelAria')}
                            className="text-amber-600 hover:text-amber-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setPendingDelete(b)}
                          aria-label={t('booking.removeAria')}
                          className="text-neutral-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleRemoveConfirm}
        title={t('booking.removeTitle')}
      />
    </section>
  );
};

export default BookingPage;
