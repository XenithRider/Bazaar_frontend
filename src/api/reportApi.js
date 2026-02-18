import api from './axiosInstance'

export const getUserReport    = ()          => api.get('/reports/user')
export const getWeeklyCarbon  = ()          => api.get('/reports/user/weekly')
export const getSellerReport  = ()          => api.get('/reports/seller')
export const getSellerSales   = (days = 7)  => api.get(`/reports/seller/sales?days=${days}`)