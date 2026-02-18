import api from './axiosInstance'

export const checkout      = ()    => api.post('/orders/checkout')
export const getMyOrders   = ()    => api.get('/orders')