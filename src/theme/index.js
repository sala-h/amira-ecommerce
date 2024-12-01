import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#663399',
      light: '#7A40FF',
      dark: '#430A7F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6366F1',
      light: '#818cf8',
      dark: '#4f46e5',
      gradient: 'linear-gradient(135deg, #6366F1 0%, #4f46e5 100%)',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0F172A',
      paper: 'rgba(15, 23, 42, 0.8)',
      dark: '#0F172A',
      gradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, #0F172A 100%)',
      glow: `radial-gradient(circle at 50% 0%, ${alpha('#6366F1', 0.15)} 0%, transparent 70%)`,
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    },
    info: {
      main: '#0EA5E9',
      light: '#38BDF8',
      dark: '#0284C7',
      gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    },
    success: {
      main: '#10B981',
      light: '#34d399',
      dark: '#059669',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    },
    divider: alpha('#94A3B8', 0.12),
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "IBM Plex Sans Arabic", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%)',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (min-width:600px)': {
        fontSize: '3.25rem',
      },
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02857em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(15, 23, 42, 0.1)',
    '0px 4px 8px rgba(15, 23, 42, 0.12)',
    '0px 8px 16px rgba(15, 23, 42, 0.14)',
    '0px 12px 24px rgba(15, 23, 42, 0.16)',
    '0px 16px 32px rgba(15, 23, 42, 0.18)',
    '0px 20px 40px rgba(15, 23, 42, 0.2)',
    // ... rest of shadows
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#0F172A',
          backgroundImage: 'radial-gradient(at 50% 0%, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0) 75%)',
          minHeight: '100vh',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#1E293B',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#6366F1',
            borderRadius: '4px',
            '&:hover': {
              background: '#4F46E5',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 24px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          lineHeight: 1.5,
          textTransform: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #663399 0%, #430A7F 100%)',
          boxShadow: '0 4px 14px 0 rgba(102, 51, 153, 0.39)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7A40FF 0%, #663399 100%)',
            boxShadow: '0 6px 20px rgba(102, 51, 153, 0.5)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          borderRadius: '24px',
          boxShadow: '0 4px 14px 0 rgba(15, 23, 42, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.01)',
            boxShadow: '0 12px 28px 0 rgba(15, 23, 42, 0.12)',
            border: '1px solid rgba(102, 51, 153, 0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          '&.MuiChip-filled': {
            background: 'linear-gradient(135deg, #663399 0%, #430A7F 100%)',
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(20px)',
            '& fieldset': {
              borderColor: 'rgba(148, 163, 184, 0.2)',
              transition: 'all 0.2s',
            },
            '&:hover fieldset': {
              borderColor: '#663399',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#663399',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(148, 163, 184, 0.1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(102, 51, 153, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(102, 51, 153, 0.2)',
            },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 1,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#FFFFFF',
            '& + .MuiSwitch-track': {
              backgroundColor: '#663399',
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          backgroundColor: '#475569',
          opacity: 1,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: 'rgba(148, 163, 184, 0.1)',
        },
        bar: {
          borderRadius: 8,
          background: 'linear-gradient(135deg, #663399 0%, #430A7F 100%)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(20px)',
        },
        standardSuccess: {
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        },
        standardError: {
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
        },
        standardWarning: {
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        },
        standardInfo: {
          background: 'rgba(14, 165, 233, 0.1)',
          border: '1px solid rgba(14, 165, 233, 0.2)',
        },
      },
    },
  },
});

export default theme;
