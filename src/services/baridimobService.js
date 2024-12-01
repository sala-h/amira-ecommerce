import axios from 'axios';

const BARIDI_MOB_API_URL = process.env.REACT_APP_BARIDI_MOB_API_URL;
const MERCHANT_ID = process.env.REACT_APP_MERCHANT_ID;

export const baridimobService = {
  // Initialize payment request
  initiatePayment: async (amount, orderId) => {
    try {
      const response = await axios.post(`${BARIDI_MOB_API_URL}/initiate`, {
        merchantId: MERCHANT_ID,
        amount: amount,
        orderId: orderId,
        currency: 'DZD',
        language: 'ar',
        returnUrl: `${window.location.origin}/payment/callback`,
      });
      return response.data;
    } catch (error) {
      console.error('Baridi Mob payment initiation failed:', error);
      throw error;
    }
  },

  // Verify payment status
  verifyPayment: async (transactionId) => {
    try {
      const response = await axios.post(`${BARIDI_MOB_API_URL}/verify`, {
        merchantId: MERCHANT_ID,
        transactionId: transactionId,
      });
      return response.data;
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw error;
    }
  },

  // Generate QR code for payment
  generateQRCode: async (amount, orderId) => {
    try {
      const response = await axios.post(`${BARIDI_MOB_API_URL}/qr-code`, {
        merchantId: MERCHANT_ID,
        amount: amount,
        orderId: orderId,
      });
      return response.data.qrCodeUrl;
    } catch (error) {
      console.error('QR code generation failed:', error);
      throw error;
    }
  }
};
