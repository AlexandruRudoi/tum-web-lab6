import { api } from './client';

// Backend category enum uses 'Skin'; frontend uses 'Skincare'.
const CAT_FROM = (c) => (c === 'Skin' ? 'Skincare' : c);
const CAT_TO = (c) => (c === 'Skincare' ? 'Skin' : c);

const fromDto = (dto) => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  price: dto.price,
  duration: dto.durationMinutes,
  category: CAT_FROM(dto.category),
  image: dto.imageUrl ?? '',
  likesCount: dto.likesCount ?? 0,
  liked: false,
  createdAt: dto.createdAt,
});

const toDto = (data) => ({
  name: data.name,
  description: data.description,
  price: Number(data.price),
  durationMinutes: Number(data.duration),
  category: CAT_TO(data.category),
  imageUrl: data.image ?? '',
});

export const servicesApi = {
  getAll: async (limit = 100, offset = 0) => {
    const paged = await api.get(`/services?limit=${limit}&offset=${offset}`);
    return paged.items.map(fromDto);
  },

  getById: async (id) => fromDto(await api.get(`/services/${id}`)),

  create: async (data) => fromDto(await api.post('/services', toDto(data))),

  update: async (id, data) => fromDto(await api.put(`/services/${id}`, toDto(data))),

  delete: async (id) => api.delete(`/services/${id}`),

  like: async (id) => fromDto(await api.post(`/services/${id}/like`)),
};
