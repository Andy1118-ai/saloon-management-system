import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const salonApi = {
  // Auth
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  
  // Appointments
  getAppointments: () => api.get('/appointments'),
  createAppointment: (appointment: any) => api.post('/appointments', appointment),
  updateAppointment: (id: string, updates: any) => api.put(`/appointments/${id}`, updates),
  deleteAppointment: (id: string) => api.delete(`/appointments/${id}`),
  
  // Services
  getServices: () => api.get('/services'),
  createService: (service: any) => api.post('/services', service),
  updateService: (id: string, updates: any) => api.put(`/services/${id}`, updates),
  deleteService: (id: string) => api.delete(`/services/${id}`),
  
  // Staff
  getStaff: () => api.get('/staff'),
  createStaff: (staff: any) => api.post('/staff', staff),
  updateStaff: (id: string, updates: any) => api.put(`/staff/${id}`, updates),
  deleteStaff: (id: string) => api.delete(`/staff/${id}`),
  
  // Customers
  getCustomers: () => api.get('/customers'),
  createCustomer: (customer: any) => api.post('/customers', customer),
  updateCustomer: (id: string, updates: any) => api.put(`/customers/${id}`, updates),
  deleteCustomer: (id: string) => api.delete(`/customers/${id}`),
  
  // Inventory
  getInventory: () => api.get('/inventory'),
  createInventoryItem: (item: any) => api.post('/inventory', item),
  updateInventoryItem: (id: string, updates: any) => api.put(`/inventory/${id}`, updates),
  deleteInventoryItem: (id: string) => api.delete(`/inventory/${id}`),
  
  // Payments
  getPayments: () => api.get('/payments'),
  processPayment: (payment: any) => api.post('/payments', payment),
  
  // Reports
  getReports: () => api.get('/reports'),
  getDashboardStats: () => api.get('/reports/dashboard'),
  
  // M-Pesa
  initiatePayment: (payment: any) => api.post('/payments/mpesa', payment),
  checkPaymentStatus: (transactionId: string) => api.get(`/payments/mpesa/${transactionId}`)
};