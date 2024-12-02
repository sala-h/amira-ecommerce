import { createTheme, alpha } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

// Custom colors inspired by Algerian culture and landscape
const colors = {
  sahara: {
    light: '#FFE4B5',
    main: '#DAA520',
    dark: '#B8860B',
  },
  mediterranean: {
    light: '#48D1CC',
    main: '#008B8B',
    dark: '#006666',
  },
  casbah: {
    light: '#F5F5DC',
    main: '#DEB887',
    dark: '#D2691E',
  },
  atlas: {
    light: '#98FB98',
    main: '#228B22',
    dark: '#006400',
  }
};

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'light',
    primary: {
      main: '#008060',
      light: '#33997F',
      dark: '#005940',
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.mediterranean.main,
      light: colors.mediterranean.light,
      dark: colors.mediterranean.dark,
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
      accent: colors.sahara.light,
    },
    text: {
      primary: '#1A2027',
      secondary: '#4A5568',
      disabled: '#A0AEC0',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: colors.mediterranean.main,
      light: colors.mediterranean.light,
      dark: colors.mediterranean.dark,
    },
    success: {
      main: colors.atlas.main,
      light: colors.atlas.light,
      dark: colors.atlas.dark,
    },
    divider: alpha('#94A3B8', 0.12),
  },
  typography: {
    fontFamily: '"Cairo", "Noto Sans Arabic", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8FAFC',
          minHeight: '100vh',
        },
        'input[type=number]': {
          'MozAppearance': 'textfield',
          '&::-webkit-outer-spin-button': {
            'WebkitAppearance': 'none',
            margin: 0,
          },
          '&::-webkit-inner-spin-button': {
            'WebkitAppearance': 'none',
            margin: 0,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        standardSuccess: {
          backgroundColor: alpha(colors.atlas.main, 0.1),
          color: colors.atlas.dark,
        },
        standardError: {
          backgroundColor: alpha('#EF4444', 0.1),
          color: '#DC2626',
        },
        standardWarning: {
          backgroundColor: alpha('#F59E0B', 0.1),
          color: '#D97706',
        },
        standardInfo: {
          backgroundColor: alpha(colors.mediterranean.main, 0.1),
          color: colors.mediterranean.dark,
        },
      },
    },
  },
});

// Configure RTL support
theme.typography = {
  ...theme.typography,
  fontFamily: theme.direction === 'rtl' 
    ? '"Cairo", "Noto Sans Arabic", sans-serif'
    : '"Plus Jakarta Sans", sans-serif',
};

// Add RTL cache configuration
export const cacheRtl = {
  stylisPlugins: [prefixer, rtlPlugin],
};

export default theme;
