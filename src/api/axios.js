import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.status, error.response?.data)
        return Promise.reject(error)
    }
)
