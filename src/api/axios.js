import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    config => {
        return config
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.status, error.response?.data)
        return Promise.reject(error)
    }
)

export default api
