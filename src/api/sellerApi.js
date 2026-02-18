import api from './axiosInstance'

export const requestSellerRole  = () => api.post('/seller-request/request')
export const hasSellerPending   = () => api.get('/seller-request/has-pending')
export const requestAdminAccess = () => api.post('/admin-request/request')
export const hasAdminPending    = () => api.get('/admin-request/has-pending')