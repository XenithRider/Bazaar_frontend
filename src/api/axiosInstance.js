import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally — only force logout on auth-related 401s,
// NOT on every API call (cart, orders, etc. may 401 for other reasons)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const url = err.config?.url ?? ''
      // Only auto-logout if it's a protected resource AND there's actually a token stored
      // (i.e. the session truly expired server-side, not just a missing-auth error)
      const hasToken = !!localStorage.getItem('token')
      const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register')

      if (hasToken && !isAuthEndpoint) {
        // Session expired — clear state and redirect
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // Use replace so back-button doesn't loop
        window.location.replace('/login')
      }
    }
    return Promise.reject(err)
  }
)

export default api