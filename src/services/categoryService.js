import axios from 'axios';

export const categoryService = {
  // Get All Categories
  getAllCategories: async () => {
    try {
      const response = await axios.get('/api/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get Popular Categories by Region
  getPopularCategories: async (wilaya) => {
    try {
      const response = await axios.get(`/api/categories/popular/${wilaya}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular categories:', error);
      throw error;
    }
  },

  // Get Category Trends
  getCategoryTrends: async (categoryId) => {
    try {
      const response = await axios.get(`/api/categories/${categoryId}/trends`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category trends:', error);
      throw error;
    }
  },

  // Get Category Best Sellers
  getCategoryBestSellers: async (categoryId, wilaya) => {
    try {
      const response = await axios.get(`/api/categories/${categoryId}/best-sellers`, {
        params: { wilaya }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching category best sellers:', error);
      throw error;
    }
  },

  // Predefined Algerian Market Categories
  categories: {
    clothing: {
      traditional: ['قندورة', 'جبة', 'برنوس', 'حايك', 'شاش'],
      modern: ['قمصان', 'سراويل', 'فساتين', 'جاكيتات']
    },
    food: {
      traditional: ['زلابية', 'بقلاوة', 'قلب اللوز', 'مقروط'],
      spices: ['فلفل حار', 'كمون', 'راس الحانوت', 'زعفران']
    },
    crafts: {
      pottery: ['طاجين', 'زلايف', 'مزهريات'],
      jewelry: ['خلخال', 'أساور', 'قلادات تقليدية'],
      carpets: ['زرابي', 'حنبل', 'قطيفة']
    },
    beauty: {
      natural: ['صابون بلدي', 'زيت الأرقان', 'غاسول'],
      henna: ['حناء سودانية', 'حناء يمنية']
    },
    electronics: {
      phones: ['هواتف ذكية', 'اكسسوارات'],
      computers: ['لابتوب', 'تابلت', 'طابعات']
    },
    home: {
      furniture: ['أرائك', 'طاولات', 'خزائن'],
      decor: ['ستائر', 'سجاد', 'لوحات']
    }
  },

  // Get Category SEO Data
  getCategorySEO: async (categoryId, language = 'ar') => {
    try {
      const response = await axios.get(`/api/categories/${categoryId}/seo`, {
        params: { language }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching category SEO data:', error);
      throw error;
    }
  },

  // Get Category Pricing Insights
  getCategoryPricing: async (categoryId, wilaya) => {
    try {
      const response = await axios.get(`/api/categories/${categoryId}/pricing`, {
        params: { wilaya }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching category pricing:', error);
      throw error;
    }
  }
};
