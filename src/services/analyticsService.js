import axios from 'axios';

export const analyticsService = {
  // Get Store Overview
  getStoreOverview: async (timeframe = 'month') => {
    try {
      const response = await axios.get('/api/analytics/overview', {
        params: { timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching store overview:', error);
      throw error;
    }
  },

  // Get Regional Performance
  getRegionalPerformance: async (wilaya) => {
    try {
      const response = await axios.get(`/api/analytics/regional/${wilaya}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching regional performance:', error);
      throw error;
    }
  },

  // Get Customer Insights
  getCustomerInsights: async () => {
    try {
      const response = await axios.get('/api/analytics/customers');
      return response.data;
    } catch (error) {
      console.error('Error fetching customer insights:', error);
      throw error;
    }
  },

  // Get Product Performance
  getProductPerformance: async (productId) => {
    try {
      const response = await axios.get(`/api/analytics/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product performance:', error);
      throw error;
    }
  },

  // Get Sales Analytics
  getSalesAnalytics: async (params) => {
    try {
      const response = await axios.get('/api/analytics/sales', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching sales analytics:', error);
      throw error;
    }
  },

  // Get Market Trends
  getMarketTrends: async (category) => {
    try {
      const response = await axios.get(`/api/analytics/market-trends/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching market trends:', error);
      throw error;
    }
  },

  // Get Seasonal Analysis
  getSeasonalAnalysis: async () => {
    try {
      const response = await axios.get('/api/analytics/seasonal');
      return response.data;
    } catch (error) {
      console.error('Error fetching seasonal analysis:', error);
      throw error;
    }
  },

  // Get Competitor Analysis
  getCompetitorAnalysis: async (category, wilaya) => {
    try {
      const response = await axios.get('/api/analytics/competitors', {
        params: { category, wilaya }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching competitor analysis:', error);
      throw error;
    }
  },

  // Get Customer Behavior
  getCustomerBehavior: async () => {
    try {
      const response = await axios.get('/api/analytics/customer-behavior');
      return response.data;
    } catch (error) {
      console.error('Error fetching customer behavior:', error);
      throw error;
    }
  },

  // Get Marketing Performance
  getMarketingPerformance: async (campaign) => {
    try {
      const response = await axios.get(`/api/analytics/marketing/${campaign}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching marketing performance:', error);
      throw error;
    }
  },

  // Get Inventory Analytics
  getInventoryAnalytics: async () => {
    try {
      const response = await axios.get('/api/analytics/inventory');
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory analytics:', error);
      throw error;
    }
  },

  // Export Reports
  exportReport: async (type, params) => {
    try {
      const response = await axios.get(`/api/analytics/export/${type}`, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting report:', error);
      throw error;
    }
  }
};
