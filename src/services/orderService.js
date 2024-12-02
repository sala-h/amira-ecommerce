import axios from 'axios';

export const orderService = {
  // Create New Order
  createOrder: async (orderData) => {
    try {
      const response = await axios.post('/api/orders', {
        ...orderData,
        currency: 'DZD',
        locale: 'ar-DZ'
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get Order Details
  getOrderById: async (orderId) => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Update Order Status
  updateOrderStatus: async (orderId, status, notes) => {
    try {
      const response = await axios.patch(`/api/orders/${orderId}/status`, {
        status,
        notes,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get Orders by Status
  getOrdersByStatus: async (status, page = 1, limit = 10) => {
    try {
      const response = await axios.get('/api/orders', {
        params: { status, page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders by status:', error);
      throw error;
    }
  },

  // Get Orders by Wilaya
  getOrdersByWilaya: async (wilaya, page = 1, limit = 10) => {
    try {
      const response = await axios.get('/api/orders/by-wilaya', {
        params: { wilaya, page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders by wilaya:', error);
      throw error;
    }
  },

  // Generate Order Invoice
  generateInvoice: async (orderId, language = 'ar') => {
    try {
      const response = await axios.get(`/api/orders/${orderId}/invoice`, {
        params: { language },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error generating invoice:', error);
      throw error;
    }
  },

  // Calculate Order Summary
  calculateOrderSummary: async (items, wilaya) => {
    try {
      const response = await axios.post('/api/orders/calculate', {
        items,
        wilaya,
        currency: 'DZD'
      });
      return response.data;
    } catch (error) {
      console.error('Error calculating order summary:', error);
      throw error;
    }
  },

  // Handle Order Refund
  processRefund: async (orderId, reason, items) => {
    try {
      const response = await axios.post(`/api/orders/${orderId}/refund`, {
        reason,
        items,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  },

  // Get Order Statistics
  getOrderStats: async (timeframe = 'month') => {
    try {
      const response = await axios.get('/api/orders/stats', {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order stats:', error);
      throw error;
    }
  },

  // Order Status Constants
  STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded'
  },

  // Order Status Labels in Arabic
  STATUS_LABELS: {
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    processing: 'قيد المعالجة',
    shipped: 'تم الشحن',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
    refunded: 'تم الاسترجاع'
  },

  // Get Recommended Products for Order
  getRecommendedProducts: async (orderId) => {
    try {
      const response = await axios.get(`/api/orders/${orderId}/recommendations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended products:', error);
      throw error;
    }
  },

  // Export Orders Report
  exportOrdersReport: async (filters, format = 'xlsx') => {
    try {
      const response = await axios.get('/api/orders/export', {
        params: { ...filters, format },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting orders report:', error);
      throw error;
    }
  },

  // Send Order Confirmation
  sendOrderConfirmation: async (orderId, method = 'sms') => {
    try {
      const response = await axios.post(`/api/orders/${orderId}/send-confirmation`, {
        method // 'sms' or 'email'
      });
      return response.data;
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      throw error;
    }
  },

  // Get Order Timeline
  getOrderTimeline: async (orderId) => {
    try {
      const response = await axios.get(`/api/orders/${orderId}/timeline`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order timeline:', error);
      throw error;
    }
  }
};
