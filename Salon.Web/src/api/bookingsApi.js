import { api } from './client';

// Backend expects capitalized status; frontend uses lowercase.
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const fromDto = (dto) => {
  // appointmentAt: "2026-05-10T10:00:00" → date + time
  const dt = dto.appointmentAt ? new Date(dto.appointmentAt) : null;
  const date = dt ? dt.toISOString().slice(0, 10) : '';
  const time = dt ? dt.toTimeString().slice(0, 5) : '';

  return {
    id: dto.id,
    clientName: dto.clientName,
    clientEmail: dto.clientEmail ?? '',
    phone: dto.clientPhone,
    serviceId: dto.serviceId,
    date,
    time,
    notes: dto.notes ?? '',
    status: (dto.status ?? 'Pending').toLowerCase(),
    createdAt: dto.createdAt,
  };
};

const toCreateDto = (data) => ({
  clientName: data.clientName,
  clientEmail: data.clientEmail ?? '',
  clientPhone: data.phone ?? '',
  serviceId: data.serviceId,
  appointmentAt: `${data.date}T${data.time}:00`,
  notes: data.notes ?? '',
});

export const bookingsApi = {
  getAll: async (limit = 100, offset = 0) => {
    const paged = await api.get(`/bookings?limit=${limit}&offset=${offset}`);
    return paged.items.map(fromDto);
  },

  getById: async (id) => fromDto(await api.get(`/bookings/${id}`)),

  create: async (data) => fromDto(await api.post('/bookings', toCreateDto(data))),

  updateStatus: async (id, status) =>
    fromDto(await api.patch(`/bookings/${id}/status`, { status: capitalize(status) })),

  delete: async (id) => api.delete(`/bookings/${id}`),
};
