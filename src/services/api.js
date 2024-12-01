import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
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

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
};

// Store services
export const storeService = {
  getProducts: () => api.get('/store/products'),
  addProduct: (product) => api.post('/store/products', product),
  updateProduct: (id, product) => api.put(`/store/products/${id}`, product),
  deleteProduct: (id) => api.delete(`/store/products/${id}`),
  getCategories: () => api.get('/store/categories'),
};

// Analytics services
export const analyticsService = {
  getSalesStats: (timeRange) => api.get('/analytics/sales', { params: { timeRange } }),
  getProductStats: () => api.get('/analytics/products'),
  getRegionalStats: () => api.get('/analytics/regions'),
  getCustomerStats: () => api.get('/analytics/customers'),
};

// Chat services
export const chatService = {
  sendMessage: (message) => api.post('/chat/message', { message }),
  getHistory: () => api.get('/chat/history'),
  getAIResponse: (query) => api.post('/chat/ai-response', { query }),
};

// Payment services
export const paymentService = {
  initiatePayment: (data) => api.post('/payments/initiate', data),
  verifyPayment: (transactionId) => api.post('/payments/verify', { transactionId }),
  getTransactions: () => api.get('/payments/transactions'),
};

// User services
export const userService = {
  updateProfile: (data) => api.put('/users/profile', data),
  updateSettings: (settings) => api.put('/users/settings', settings),
  getNotifications: () => api.get('/users/notifications'),
  updateNotificationSettings: (settings) => api.put('/users/notifications/settings', settings),
};

export default api;
