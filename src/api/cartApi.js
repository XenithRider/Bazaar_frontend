import api from './axiosInstance'

export const getCartSummary = ()     => api.get('/cart/summary')
export const addToCart      = (data) => api.post('/cart', data)
export const removeFromCart = (id)   => api.delete(`/cart/${id}`)
export const swapToEco      = (data) => api.post('/cart/swap', data)