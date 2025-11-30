import { api } from './axios'

export const WordsApi = {
    getAll: () => api.get('/words'),

    getById: id => api.get(`/words/${id}`),

    create: data => api.post('/words', data),

    update: (id, data) => api.put(`/words/${id}`, data),

    delete: id => api.delete(`/words/${id}`),
}
