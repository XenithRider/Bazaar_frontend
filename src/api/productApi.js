import api from './axiosInstance'

export const getAllProducts     = ()        => api.get('/products')
export const getProductById    = (id)      => api.get(`/products/${id}`)
export const getSellerProducts = ()        => api.get('/products/seller')
export const createProduct     = (data)    => api.post('/products', data)
export const updateProduct     = (id, data)=> api.put(`/products/${id}`, data)
export const deleteProduct     = (id)      => api.delete(`/products/${id}`)
export const getAiSuggestions  = (productId) => api.get(`/products/ai/suggestions?productId=${productId}`)