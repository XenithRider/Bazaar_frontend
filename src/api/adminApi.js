import api from './axiosInstance'

export const getAdminReport      = ()     => api.get('/admin/reports')
export const exportCsv           = ()     => api.get('/admin/reports/export')
export const getPendingProducts  = ()     => api.get('/admin/pending-products')
export const getPendingSellers   = ()     => api.get('/admin/pending-sellers')
export const approveProduct      = (id)   => api.put(`/admin/approveProduct/${id}`)
export const rejectProduct       = (id)   => api.put(`/admin/rejectProduct/${id}`)
export const approveSeller       = (id)   => api.put(`/admin/approveSeller/${id}`)
export const rejectSeller        = (id)   => api.put(`/admin/rejectSeller/${id}`)
export const getPendingAdminReqs = ()     => api.get('/admin-request/pending')
export const approveAdminReq     = (id)   => api.post(`/admin-request/approve/${id}`)
export const rejectAdminReq      = (id)   => api.post(`/admin-request/reject/${id}`)