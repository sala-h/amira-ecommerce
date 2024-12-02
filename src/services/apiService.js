import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Request interceptor for API calls
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Accept-Language'] = localStorage.getItem('language') || 'ar';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        const { token } = response.data;
        localStorage.setItem('auth_token', token);
        return axios(originalRequest);
      } catch (err) {
        // Redirect to login if refresh token fails
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Authentication
  auth: {
    login: credentials => axios.post(`${API_BASE_URL}/auth/login`, credentials),
    register: userData => axios.post(`${API_BASE_URL}/auth/register`, userData),
    logout: () => axios.post(`${API_BASE_URL}/auth/logout`),
    verifyEmail: token => axios.post(`${API_BASE_URL}/auth/verify-email`, { token }),
    resetPassword: data => axios.post(`${API_BASE_URL}/auth/reset-password`, data),
  },

  // Products
  products: {
    getAll: params => axios.get(`${API_BASE_URL}/products`, { params }),
    getById: id => axios.get(`${API_BASE_URL}/products/${id}`),
    create: data => axios.post(`${API_BASE_URL}/products`, data),
    update: (id, data) => axios.put(`${API_BASE_URL}/products/${id}`, data),
    delete: id => axios.delete(`${API_BASE_URL}/products/${id}`),
    search: query => axios.get(`${API_BASE_URL}/products/search`, { params: { q: query } }),
  },

  // Orders
  orders: {
    getAll: params => axios.get(`${API_BASE_URL}/orders`, { params }),
    getById: id => axios.get(`${API_BASE_URL}/orders/${id}`),
    create: data => axios.post(`${API_BASE_URL}/orders`, data),
    update: (id, data) => axios.put(`${API_BASE_URL}/orders/${id}`, data),
    updateStatus: (id, status) => axios.patch(`${API_BASE_URL}/orders/${id}/status`, { status }),
    getStats: () => axios.get(`${API_BASE_URL}/orders/stats`),
  },

  // Customers
  customers: {
    getAll: params => axios.get(`${API_BASE_URL}/customers`, { params }),
    getById: id => axios.get(`${API_BASE_URL}/customers/${id}`),
    update: (id, data) => axios.put(`${API_BASE_URL}/customers/${id}`, data),
    getStats: () => axios.get(`${API_BASE_URL}/customers/stats`),
  },

  // Analytics
  analytics: {
    getDashboardStats: () => axios.get(`${API_BASE_URL}/analytics/dashboard`),
    getSalesReport: params => axios.get(`${API_BASE_URL}/analytics/sales`, { params }),
    getProductPerformance: params => axios.get(`${API_BASE_URL}/analytics/products`, { params }),
    getCustomerInsights: params => axios.get(`${API_BASE_URL}/analytics/customers`, { params }),
  },

  // Shipping
  shipping: {
    calculateRate: data => axios.post(`${API_BASE_URL}/shipping/calculate`, data),
    getWilayaRates: () => axios.get(`${API_BASE_URL}/shipping/wilaya-rates`),
    trackOrder: trackingId => axios.get(`${API_BASE_URL}/shipping/track/${trackingId}`),
    updateShippingStatus: (id, status) => axios.patch(`${API_BASE_URL}/shipping/${id}/status`, { status }),
  },

  // Payments
  payments: {
    processPayment: data => axios.post(`${API_BASE_URL}/payments/process`, data),
    verifyPayment: id => axios.get(`${API_BASE_URL}/payments/verify/${id}`),
    getTransactions: params => axios.get(`${API_BASE_URL}/payments/transactions`, { params }),
  },

  // Store Settings
  settings: {
    get: () => axios.get(`${API_BASE_URL}/settings`),
    update: data => axios.put(`${API_BASE_URL}/settings`, data),
    updateLogo: file => {
      const formData = new FormData();
      formData.append('logo', file);
      return axios.post(`${API_BASE_URL}/settings/logo`, formData);
    },
  },

  // Chat
  chat: {
    getConversations: () => axios.get(`${API_BASE_URL}/chat/conversations`),
    getMessages: conversationId => axios.get(`${API_BASE_URL}/chat/messages/${conversationId}`),
    sendMessage: (conversationId, message) => 
      axios.post(`${API_BASE_URL}/chat/messages/${conversationId}`, { message }),
  },

  // Notifications
  notifications: {
    getAll: () => axios.get(`${API_BASE_URL}/notifications`),
    markAsRead: id => axios.patch(`${API_BASE_URL}/notifications/${id}/read`),
    getUnreadCount: () => axios.get(`${API_BASE_URL}/notifications/unread-count`),
  }
};
