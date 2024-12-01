import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { userService } from '../services/api';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  language: 'ar', // Default to Arabic
  theme: 'light',
  notifications: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      return {
        ...state,
        language: action.payload,
      };
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload);
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }

    // Load user data if token exists
    const token = localStorage.getItem('token');
    if (token) {
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await userService.getProfile();
      dispatch({ type: 'SET_USER', payload: response.data });
    } catch (error) {
      console.error('Failed to load user data:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load user data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Translation helper
  const t = (key) => {
    const translations = {
      ar: {
        dashboard: 'لوحة التحكم',
        store: 'المتجر',
        analytics: 'التحليلات',
        chat: 'المحادثة',
        settings: 'الإعدادات',
        // Add more translations as needed
      },
      fr: {
        dashboard: 'Tableau de bord',
        store: 'Magasin',
        analytics: 'Analytique',
        chat: 'Chat',
        settings: 'Paramètres',
        // Add more translations as needed
      },
    };

    return translations[state.language]?.[key] || key;
  };

  const value = {
    ...state,
    dispatch,
    t,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
