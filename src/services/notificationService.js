import axios from 'axios';

export const notificationService = {
  // Get All Notifications
  getNotifications: async (page = 1, limit = 20) => {
    try {
      const response = await axios.get('/api/notifications', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Mark Notification as Read
  markAsRead: async (notificationId) => {
    try {
      const response = await axios.patch(`/api/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Mark All Notifications as Read
  markAllAsRead: async () => {
    try {
      const response = await axios.patch('/api/notifications/mark-all-read');
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  // Get Unread Count
  getUnreadCount: async () => {
    try {
      const response = await axios.get('/api/notifications/unread-count');
      return response.data;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  },

  // Update Notification Preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await axios.put('/api/notifications/preferences', preferences);
      return response.data;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      throw error;
    }
  },

  // Send Custom Notification
  sendCustomNotification: async (data) => {
    try {
      const response = await axios.post('/api/notifications/send', data);
      return response.data;
    } catch (error) {
      console.error('Error sending custom notification:', error);
      throw error;
    }
  },

  // Get Notification Settings
  getSettings: async () => {
    try {
      const response = await axios.get('/api/notifications/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching notification settings:', error);
      throw error;
    }
  },

  // Update Notification Settings
  updateSettings: async (settings) => {
    try {
      const response = await axios.put('/api/notifications/settings', settings);
      return response.data;
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  },

  // Notification Types
  TYPES: {
    ORDER_PLACED: 'طلب جديد',
    ORDER_CONFIRMED: 'تأكيد الطلب',
    ORDER_SHIPPED: 'تم شحن الطلب',
    ORDER_DELIVERED: 'تم توصيل الطلب',
    PAYMENT_RECEIVED: 'تم استلام الدفع',
    LOW_STOCK: 'تنبيه المخزون',
    REVIEW_RECEIVED: 'تقييم جديد',
    PRICE_ALERT: 'تنبيه السعر',
    SYSTEM_UPDATE: 'تحديث النظام'
  },

  // Subscribe to Push Notifications
  subscribeToPush: async (subscription) => {
    try {
      const response = await axios.post('/api/notifications/push/subscribe', subscription);
      return response.data;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      throw error;
    }
  },

  // Unsubscribe from Push Notifications
  unsubscribeFromPush: async (subscription) => {
    try {
      const response = await axios.post('/api/notifications/push/unsubscribe', subscription);
      return response.data;
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      throw error;
    }
  },

  // Send SMS Notification
  sendSMS: async (phoneNumber, message) => {
    try {
      const response = await axios.post('/api/notifications/sms/send', {
        phoneNumber,
        message
      });
      return response.data;
    } catch (error) {
      console.error('Error sending SMS notification:', error);
      throw error;
    }
  },

  // Get Notification Templates
  getTemplates: async (language = 'ar') => {
    try {
      const response = await axios.get('/api/notifications/templates', {
        params: { language }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching notification templates:', error);
      throw error;
    }
  },

  // Update Notification Template
  updateTemplate: async (templateId, content) => {
    try {
      const response = await axios.put(`/api/notifications/templates/${templateId}`, {
        content
      });
      return response.data;
    } catch (error) {
      console.error('Error updating notification template:', error);
      throw error;
    }
  }
};
