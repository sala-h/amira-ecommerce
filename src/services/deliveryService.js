import axios from 'axios';

export const deliveryService = {
  // Calculate Shipping Cost
  calculateShipping: async (orderData) => {
    try {
      const response = await axios.post('/api/delivery/calculate', {
        fromWilaya: orderData.fromWilaya,
        toWilaya: orderData.toWilaya,
        weight: orderData.weight,
        dimensions: orderData.dimensions,
        provider: orderData.provider, // 'yassir', 'algeriePoste', etc.
      });
      return response.data;
    } catch (error) {
      console.error('Error calculating shipping:', error);
      throw error;
    }
  },

  // Get Available Delivery Providers by Wilaya
  getAvailableProviders: async (wilaya) => {
    try {
      const response = await axios.get(`/api/delivery/providers/${wilaya}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching providers:', error);
      throw error;
    }
  },

  // Track Shipment
  trackShipment: async (trackingNumber, provider) => {
    try {
      const response = await axios.get('/api/delivery/track', {
        params: { trackingNumber, provider }
      });
      return response.data;
    } catch (error) {
      console.error('Error tracking shipment:', error);
      throw error;
    }
  },

  // Yassir Delivery Integration
  yassir: {
    requestDelivery: async (orderData) => {
      try {
        const response = await axios.post('/api/delivery/yassir/request', orderData);
        return response.data;
      } catch (error) {
        console.error('Error requesting Yassir delivery:', error);
        throw error;
      }
    },
    cancelDelivery: async (deliveryId) => {
      try {
        const response = await axios.post(`/api/delivery/yassir/cancel/${deliveryId}`);
        return response.data;
      } catch (error) {
        console.error('Error canceling Yassir delivery:', error);
        throw error;
      }
    }
  },

  // Algérie Poste Integration
  algeriePoste: {
    createShipment: async (orderData) => {
      try {
        const response = await axios.post('/api/delivery/algerie-poste/create', orderData);
        return response.data;
      } catch (error) {
        console.error('Error creating Algérie Poste shipment:', error);
        throw error;
      }
    },
    getOffices: async (wilaya) => {
      try {
        const response = await axios.get(`/api/delivery/algerie-poste/offices/${wilaya}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching Algérie Poste offices:', error);
        throw error;
      }
    }
  },

  // Delivery Time Estimation
  estimateDeliveryTime: async (fromWilaya, toWilaya, provider) => {
    try {
      const response = await axios.get('/api/delivery/estimate-time', {
        params: { fromWilaya, toWilaya, provider }
      });
      return response.data;
    } catch (error) {
      console.error('Error estimating delivery time:', error);
      throw error;
    }
  },

  // Get Delivery Zones
  getDeliveryZones: async () => {
    try {
      const response = await axios.get('/api/delivery/zones');
      return response.data;
    } catch (error) {
      console.error('Error fetching delivery zones:', error);
      throw error;
    }
  },

  // Generate Shipping Label
  generateShippingLabel: async (orderId) => {
    try {
      const response = await axios.get(`/api/delivery/label/${orderId}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error generating shipping label:', error);
      throw error;
    }
  }
};
