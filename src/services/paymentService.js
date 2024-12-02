import axios from 'axios';

export const paymentService = {
  // CCP Payment
  processCCPPayment: async (orderData) => {
    try {
      const response = await axios.post('/api/payments/ccp', {
        ccpNumber: orderData.ccpNumber,
        amount: orderData.amount,
        orderId: orderData.orderId,
      });
      return response.data;
    } catch (error) {
      console.error('CCP payment error:', error);
      throw error;
    }
  },

  // Baridimob Payment
  processBaridimobPayment: async (orderData) => {
    try {
      const response = await axios.post('/api/payments/baridimob', {
        phoneNumber: orderData.phoneNumber,
        amount: orderData.amount,
        orderId: orderData.orderId,
      });
      return response.data;
    } catch (error) {
      console.error('Baridimob payment error:', error);
      throw error;
    }
  },

  // EDAHABIA Card Payment
  processEdahabiaPayment: async (orderData) => {
    try {
      const response = await axios.post('/api/payments/edahabia', {
        cardNumber: orderData.cardNumber,
        expiryDate: orderData.expiryDate,
        cvv: orderData.cvv,
        amount: orderData.amount,
        orderId: orderData.orderId,
      });
      return response.data;
    } catch (error) {
      console.error('EDAHABIA payment error:', error);
      throw error;
    }
  },

  // Cash on Delivery
  processCashOnDelivery: async (orderData) => {
    try {
      const response = await axios.post('/api/payments/cash-on-delivery', {
        address: orderData.address,
        wilaya: orderData.wilaya,
        amount: orderData.amount,
        orderId: orderData.orderId,
      });
      return response.data;
    } catch (error) {
      console.error('Cash on delivery error:', error);
      throw error;
    }
  },

  // Payment Verification
  verifyPayment: async (paymentId) => {
    try {
      const response = await axios.get(`/api/payments/verify/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  },

  // Get Payment Methods by Wilaya
  getAvailablePaymentMethods: async (wilaya) => {
    try {
      const response = await axios.get(`/api/payments/methods/${wilaya}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  },

  // Generate Payment Receipt
  generateReceipt: async (paymentId) => {
    try {
      const response = await axios.get(`/api/payments/receipt/${paymentId}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error generating receipt:', error);
      throw error;
    }
  }
};
