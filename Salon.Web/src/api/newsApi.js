import { api } from './client';

const fromDto = (dto) => ({
  id: dto.id,
  title: dto.title,
  content: dto.content,
  image: dto.imageUrl ?? '',
  pinned: dto.isPinned ?? false,
  likesCount: dto.likesCount ?? 0,
  liked: false,
  category: '',
  createdAt: dto.createdAt,
});

const toDto = (data) => ({
  title: data.title,
  content: data.content,
  imageUrl: data.image ?? '',
  isPinned: data.pinned ?? false,
});

export const newsApi = {
  getAll: async (limit = 100, offset = 0) => {
    const paged = await api.get(`/news?limit=${limit}&offset=${offset}`);
    return paged.items.map(fromDto);
  },

  getById: async (id) => fromDto(await api.get(`/news/${id}`)),

  create: async (data) => fromDto(await api.post('/news', toDto(data))),

  update: async (id, data) => fromDto(await api.put(`/news/${id}`, toDto(data))),

  delete: async (id) => api.delete(`/news/${id}`),

  like: async (id) => fromDto(await api.post(`/news/${id}/like`)),

  pin: async (id) => fromDto(await api.post(`/news/${id}/pin`)),
};
