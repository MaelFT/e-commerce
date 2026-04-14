import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Injecte le token Bearer automatiquement sur chaque requête
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Normalise les erreurs : throw directement la data de l'API
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data
    return Promise.reject(data ?? error)
  },
)

export default client
