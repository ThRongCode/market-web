'use client';

import { createTheme, PaletteMode, alpha } from '@mui/material/styles';

// Modern gradient color palette - Vibrant & Fresh
const primaryColor = {
  main: '#6366f1',      // Indigo
  light: '#818cf8',
  dark: '#4f46e5',
  contrastText: '#ffffff',
};

const secondaryColor = {
  main: '#ec4899',      // Pink
  light: '#f472b6',
  dark: '#db2777',
  contrastText: '#ffffff',
};

// Gradient presets
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  warning: 'linear-gradient(135deg, #fc6076 0%, #ff9a44 100%)',
  info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  dark: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  sunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ocean: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  aurora: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  cosmic: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
  electric: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
  fresh: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ec4899 100%)',
  heroLight: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f3e8ff 100%)',
  heroDark: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
  card: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  cardDark: 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(30,27,75,0.7) 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
};

// Create theme based on mode
export const createAppTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: primaryColor,
    secondary: secondaryColor,
    error: {
      main: '#f43f5e',
      light: '#fb7185',
      dark: '#e11d48',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#06b6d4',
      light: '#22d3ee',
      dark: '#0891b2',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: mode === 'light' ? '#fafafa' : '#0a0a0f',
      paper: mode === 'light' ? '#ffffff' : '#16161f',
    },
    text: {
      primary: mode === 'light' ? '#1a1a2e' : '#f1f5f9',
      secondary: mode === 'light' ? '#6b7280' : '#9ca3af',
    },
    divider: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: mode === 'light' ? '#f1f5f9' : '#1e1b4b',
          },
          '&::-webkit-scrollbar-thumb': {
            background: mode === 'light' ? '#c7d2fe' : '#4f46e5',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: mode === 'light' ? '#a5b4fc' : '#6366f1',
          },
        },
        '@keyframes fadeInUp': {
          from: {
            opacity: 0,
            transform: 'translateY(30px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        '@keyframes scaleIn': {
          from: {
            opacity: 0,
            transform: 'scale(0.9)',
          },
          to: {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
        '@keyframes slideInRight': {
          from: {
            opacity: 0,
            transform: 'translateX(-30px)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'scale(1.05)',
          },
        },
        '@keyframes shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-20px) rotate(5deg)',
          },
        },
        '@keyframes gradientShift': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        '@keyframes glow': {
          '0%, 100%': {
            boxShadow: `0 0 20px ${alpha(primaryColor.main, 0.3)}`,
          },
          '50%': {
            boxShadow: `0 0 40px ${alpha(primaryColor.main, 0.5)}`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 14,
          padding: '12px 24px',
          fontWeight: 600,
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.6s ease',
          },
          '&:hover::before': {
            transform: 'translateX(100%)',
          },
          '&:hover': {
            transform: 'translateY(-3px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: gradients.primary,
          boxShadow: `0 8px 25px ${alpha(primaryColor.main, 0.3)}`,
          '&:hover': {
            boxShadow: `0 12px 35px ${alpha(primaryColor.main, 0.4)}`,
          },
        },
        containedSecondary: {
          background: gradients.secondary,
          boxShadow: `0 8px 25px ${alpha(secondaryColor.main, 0.3)}`,
          '&:hover': {
            boxShadow: `0 12px 35px ${alpha(secondaryColor.main, 0.4)}`,
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: mode === 'light' ? primaryColor.main : 'rgba(255,255,255,0.7)',
          color: mode === 'light' ? primaryColor.main : '#ffffff',
          '&:hover': {
            borderWidth: 2,
            borderColor: mode === 'light' ? primaryColor.dark : '#ffffff',
            background: mode === 'light' ? alpha(primaryColor.main, 0.08) : alpha('#ffffff', 0.15),
          },
        },
        outlinedInherit: {
          borderColor: 'rgba(255,255,255,0.5)',
          color: '#ffffff',
          '&:hover': {
            borderColor: '#ffffff',
            background: alpha('#ffffff', 0.1),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: mode === 'light' 
            ? '0 4px 20px rgba(0,0,0,0.04), 0 8px 40px rgba(0,0,0,0.04)' 
            : '0 4px 20px rgba(0,0,0,0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'}`,
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: mode === 'light'
              ? `0 20px 40px rgba(99, 102, 241, 0.15), 0 8px 20px rgba(0,0,0,0.08)`
              : `0 20px 40px rgba(99, 102, 241, 0.25)`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            transition: 'all 0.3s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: primaryColor.main,
                borderWidth: 2,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: primaryColor.main,
                borderWidth: 2,
              },
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: primaryColor.main,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
        notchedOutline: {
          borderColor: mode === 'light' ? 'rgba(0,0,0,0.23)' : 'rgba(255,255,255,0.23)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        filled: {
          background: gradients.primary,
          color: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: mode === 'light' 
            ? alpha('#ffffff', 0.75)
            : alpha('#0a0a0f', 0.75),
          borderBottom: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          backgroundImage: 'none',
          background: mode === 'light' 
            ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
            : 'linear-gradient(180deg, #16161f 0%, #0a0a0f 100%)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          margin: '4px 12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: mode === 'light' 
              ? alpha(primaryColor.main, 0.08)
              : alpha(primaryColor.main, 0.15),
            transform: 'translateX(8px)',
          },
          '&.Mui-selected': {
            background: gradients.primary,
            color: '#ffffff',
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
            '&:hover': {
              background: gradients.primary,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)'
            : '0 2px 8px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.15) rotate(5deg)',
            background: alpha(primaryColor.main, 0.1),
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          boxShadow: mode === 'light'
            ? '0 10px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.05)'
            : '0 10px 40px rgba(0,0,0,0.5)',
          border: `1px solid ${mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}`,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 10,
          padding: '10px 18px',
          fontSize: '0.875rem',
          background: gradients.dark,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          boxShadow: '0 25px 80px rgba(0,0,0,0.2)',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: 12,
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
            '&.Mui-selected': {
              background: gradients.primary,
              boxShadow: `0 4px 15px ${alpha(primaryColor.main, 0.3)}`,
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 2,
          background: gradients.primary,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          '&:hover': {
            color: primaryColor.main,
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          },
          '& .Mui-checked .MuiSwitch-thumb': {
            background: gradients.primary,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        standardSuccess: {
          background: `linear-gradient(135deg, ${alpha('#10b981', 0.1)} 0%, ${alpha('#34d399', 0.1)} 100%)`,
          border: `1px solid ${alpha('#10b981', 0.2)}`,
        },
        standardError: {
          background: `linear-gradient(135deg, ${alpha('#f43f5e', 0.1)} 0%, ${alpha('#fb7185', 0.1)} 100%)`,
          border: `1px solid ${alpha('#f43f5e', 0.2)}`,
        },
      },
    },
  },
});

// Light theme (default)
export const lightTheme = createAppTheme('light');

// Dark theme
export const darkTheme = createAppTheme('dark');

export default lightTheme;
