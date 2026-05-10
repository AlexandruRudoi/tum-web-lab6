import { api } from './client';

const fromDto = (dto) => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  price: dto.price,
  image: dto.imageUrl ?? '',
  likesCount: dto.likesCount ?? 0,
  liked: false,
  stock: 0,
  createdAt: dto.createdAt,
});

const toDto = (data) => ({
  name: data.name,
  description: data.description,
  price: Number(data.price),
  imageUrl: data.image ?? '',
});

export const productsApi = {
  getAll: async (limit = 100, offset = 0) => {
    const paged = await api.get(`/products?limit=${limit}&offset=${offset}`);
    return paged.items.map(fromDto);
  },

  getById: async (id) => fromDto(await api.get(`/products/${id}`)),

  create: async (data) => fromDto(await api.post('/products', toDto(data))),

  update: async (id, data) => fromDto(await api.put(`/products/${id}`, toDto(data))),

  delete: async (id) => api.delete(`/products/${id}`),

  like: async (id) => fromDto(await api.post(`/products/${id}/like`)),
};
