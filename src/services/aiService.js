import axios from 'axios';

const AI_ENDPOINTS = {
  PRODUCT_DESCRIPTION: '/api/ai/generate-description',
  MARKET_ANALYSIS: '/api/ai/market-analysis',
  PRICE_OPTIMIZATION: '/api/ai/optimize-price',
  CUSTOMER_SUPPORT: '/api/ai/customer-support',
  IMAGE_ENHANCEMENT: '/api/ai/enhance-image',
  TRANSLATION: '/api/ai/translate',
};

export const aiService = {
  // Generate SEO-optimized product descriptions in Arabic
  async generateProductDescription(productDetails) {
    try {
      const response = await axios.post(AI_ENDPOINTS.PRODUCT_DESCRIPTION, {
        details: productDetails,
        language: 'ar',
        targetMarket: 'algeria'
      });
      return response.data;
    } catch (error) {
      console.error('Error generating product description:', error);
      throw error;
    }
  },

  // Analyze market trends and competition
  async analyzeMarket(category, region) {
    try {
      const response = await axios.post(AI_ENDPOINTS.MARKET_ANALYSIS, {
        category,
        region,
        country: 'algeria'
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing market:', error);
      throw error;
    }
  },

  // Optimize product pricing based on market data
  async optimizePrice(productData) {
    try {
      const response = await axios.post(AI_ENDPOINTS.PRICE_OPTIMIZATION, {
        product: productData,
        market: 'algeria',
        currency: 'DZD'
      });
      return response.data;
    } catch (error) {
      console.error('Error optimizing price:', error);
      throw error;
    }
  },

  // AI-powered customer support responses
  async generateSupportResponse(customerQuery) {
    try {
      const response = await axios.post(AI_ENDPOINTS.CUSTOMER_SUPPORT, {
        query: customerQuery,
        language: 'ar',
        context: 'algerian_ecommerce'
      });
      return response.data;
    } catch (error) {
      console.error('Error generating support response:', error);
      throw error;
    }
  },

  // Enhance product images
  async enhanceImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.post(AI_ENDPOINTS.IMAGE_ENHANCEMENT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error enhancing image:', error);
      throw error;
    }
  },

  // Translate content between Arabic and French
  async translateContent(text, fromLang, toLang) {
    try {
      const response = await axios.post(AI_ENDPOINTS.TRANSLATION, {
        text,
        from: fromLang,
        to: toLang,
        context: 'ecommerce'
      });
      return response.data;
    } catch (error) {
      console.error('Error translating content:', error);
      throw error;
    }
  }
};
