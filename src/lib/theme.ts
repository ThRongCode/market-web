'use client';

import { createTheme, PaletteMode, alpha } from '@mui/material/styles';

// ===========================================
// MD3 Design Tokens — Indigo Bento (from Stitch)
// ===========================================

// Light mode tokens seeded from Indigo (#6366F1)
const md3Light = {
  primary: '#4648d4',
  primaryContainer: '#6063ee',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#fffbff',
  primaryFixed: '#e1e0ff',
  primaryFixedDim: '#c0c1ff',

  secondary: '#575992',
  secondaryContainer: '#bdbefe',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#494b83',

  tertiary: '#904900',
  tertiaryContainer: '#b55d00',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#fffbff',
  tertiaryFixed: '#ffdcc5',

  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',

  surface: '#fcf8ff',
  surfaceDim: '#dbd8e4',
  surfaceBright: '#fcf8ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f5f2fe',
  surfaceContainer: '#efecf8',
  surfaceContainerHigh: '#e9e6f3',
  surfaceContainerHighest: '#e4e1ed',
  surfaceVariant: '#e4e1ed',

  onSurface: '#1b1b23',
  onSurfaceVariant: '#464554',
  outline: '#767586',
  outlineVariant: '#c7c4d7',

  inverseSurface: '#303038',
  inverseOnSurface: '#f2effb',
  inversePrimary: '#c0c1ff',
  surfaceTint: '#494bd6',
};

// Dark mode tokens
const md3Dark = {
  primary: '#c0c1ff',
  primaryContainer: '#3536b8',
  onPrimary: '#1a19a0',
  onPrimaryContainer: '#e1e0ff',
  primaryFixed: '#e1e0ff',
  primaryFixedDim: '#c0c1ff',

  secondary: '#c0c1ff',
  secondaryContainer: '#404178',
  onSecondary: '#282a60',
  onSecondaryContainer: '#e1e0ff',

  tertiary: '#ffb783',
  tertiaryContainer: '#703700',
  onTertiary: '#4e2600',
  onTertiaryContainer: '#ffdcc5',
  tertiaryFixed: '#ffdcc5',

  error: '#ffb4ab',
  errorContainer: '#93000a',
  onError: '#690005',
  onErrorContainer: '#ffdad6',

  surface: '#131318',
  surfaceDim: '#131318',
  surfaceBright: '#39383f',
  surfaceContainerLowest: '#0e0e13',
  surfaceContainerLow: '#1b1b23',
  surfaceContainer: '#201f27',
  surfaceContainerHigh: '#2a2a32',
  surfaceContainerHighest: '#35343d',
  surfaceVariant: '#464554',

  onSurface: '#e4e1ed',
  onSurfaceVariant: '#c7c4d7',
  outline: '#918fa0',
  outlineVariant: '#464554',

  inverseSurface: '#e4e1ed',
  inverseOnSurface: '#303038',
  inversePrimary: '#4648d4',
  surfaceTint: '#c0c1ff',
};

export type MD3Tokens = typeof md3Light;

// Signature gradient per DESIGN.md
export const gradients = {
  signature: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
  primary: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
  hero: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
  heroDark: 'linear-gradient(135deg, #1a19a0 0%, #3536b8 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
};

/** Returns MD3 tokens for a given mode */
export function getMd3Tokens(mode: PaletteMode): MD3Tokens {
  return mode === 'light' ? md3Light : md3Dark;
}

// ===========================================
// Theme Factory
// ===========================================
export const createAppTheme = (mode: PaletteMode) => {
  const t = getMd3Tokens(mode);

  return createTheme({
    palette: {
      mode,
      primary: {
        main: t.primary,
        light: t.primaryFixedDim ?? t.primaryContainer,
        dark: mode === 'light' ? '#3536b8' : '#8182ff',
        contrastText: t.onPrimary,
      },
      secondary: {
        main: t.secondary,
        contrastText: t.onSecondary,
      },
      error: {
        main: t.error,
        contrastText: t.onError,
      },
      warning: {
        main: t.tertiary,
        contrastText: t.onTertiary,
      },
      info: { main: '#06b6d4' },
      success: { main: '#10b981' },
      background: {
        default: t.surface,
        paper: t.surfaceContainerLowest,
      },
      text: {
        primary: t.onSurface,
        secondary: t.onSurfaceVariant,
      },
      divider: alpha(t.outlineVariant, 0.15),
    },
    md3: t,
    typography: {
      fontFamily: '"Be Vietnam Pro", "Inter", "Roboto", sans-serif',
      h1: { fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 },
      h2: { fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 },
      h3: { fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2 },
      h4: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.01em' },
      h5: { fontSize: '1.25rem', fontWeight: 700 },
      h6: { fontSize: '1rem', fontWeight: 700 },
      body1: { lineHeight: 1.7 },
      body2: { lineHeight: 1.6 },
      overline: { letterSpacing: '0.05em', fontWeight: 700 },
      button: { fontWeight: 600, letterSpacing: '0.02em' },
    },
    shape: { borderRadius: 12 },
    shadows: [
      'none',
      `0 2px 8px ${alpha('#1b1b23', 0.04)}`,
      `0 4px 12px ${alpha('#1b1b23', 0.05)}`,
      `0 6px 16px ${alpha('#1b1b23', 0.06)}`,
      `0 8px 24px ${alpha('#1b1b23', 0.06)}`,
      `0 12px 32px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
      `0 16px 48px ${alpha('#1b1b23', 0.06)}`,
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: '"Be Vietnam Pro", "Inter", "Roboto", sans-serif',
            scrollBehavior: 'smooth',
            backgroundColor: t.surface,
            '&::-webkit-scrollbar': { width: '8px' },
            '&::-webkit-scrollbar-track': { background: t.surfaceContainerLow },
            '&::-webkit-scrollbar-thumb': { background: t.outlineVariant, borderRadius: '4px' },
            '&::-webkit-scrollbar-thumb:hover': { background: t.outline },
          },
          '@keyframes fadeInUp': {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          '@keyframes fadeIn': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          '@keyframes scaleIn': {
            from: { opacity: 0, transform: 'scale(0.95)' },
            to: { opacity: 1, transform: 'scale(1)' },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '0.75rem',
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            '&:active': { transform: 'scale(0.95)' },
          },
          contained: {
            background: gradients.signature,
            boxShadow: `0 4px 16px ${alpha('#4648d4', 0.2)}`,
            color: '#ffffff',
            '&:hover': {
              boxShadow: `0 8px 24px ${alpha('#4648d4', 0.3)}`,
              transform: 'scale(1.02)',
            },
          },
          outlined: {
            borderColor: t.outlineVariant,
            color: t.onSurface,
            '&:hover': {
              borderColor: t.primary,
              background: alpha(t.primary, 0.05),
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '1.5rem',
            border: 'none',
            boxShadow: `0 2px 8px ${alpha('#1b1b23', 0.04)}`,
            backgroundColor: t.surfaceContainerLowest,
            transition: 'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              backgroundColor: t.surfaceContainerHigh,
              boxShadow: `0 8px 24px ${alpha('#1b1b23', 0.08)}`,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.75rem',
              backgroundColor: t.surfaceContainerLow,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: t.primary,
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: '0.75rem' },
          notchedOutline: { borderColor: 'transparent' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: '9999px', fontWeight: 600, border: 'none' },
          filled: { background: t.surfaceContainerHigh, color: t.onSurface },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backdropFilter: 'blur(20px)',
            backgroundColor: alpha(t.surface, 0.8),
            borderBottom: 'none',
            color: t.onSurface,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { borderRadius: 0, backgroundImage: 'none', backgroundColor: t.surfaceContainer },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${alpha(t.outlineVariant, 0.15)}`,
          },
          elevation0: { border: 'none', boxShadow: 'none' },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease',
            '&:hover': { transform: 'scale(1.1)', background: alpha(t.primary, 0.08) },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: '1.5rem',
            boxShadow: `0 32px 64px ${alpha('#1b1b23', 0.06)}`,
            border: `1px solid ${alpha(t.outlineVariant, 0.15)}`,
            backdropFilter: 'blur(20px)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: '1.5rem', boxShadow: `0 32px 64px ${alpha('#1b1b23', 0.12)}` },
        },
      },
      MuiPagination: {
        styleOverrides: {
          root: {
            '& .MuiPaginationItem-root': {
              borderRadius: '0.75rem',
              fontWeight: 600,
              '&.Mui-selected': { background: gradients.signature, color: '#ffffff' },
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
            margin: '2px 8px',
            '&:hover': { backgroundColor: t.surfaceContainerHigh },
            '&.Mui-selected': {
              backgroundColor: t.secondaryContainer,
              '&:hover': { backgroundColor: t.secondaryContainer },
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: { root: { borderRadius: '1rem', fontWeight: 500, border: 'none' } },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: '0.75rem',
            padding: '8px 16px',
            backgroundColor: t.inverseSurface,
            color: t.inverseOnSurface,
          },
        },
      },
      MuiTabs: {
        styleOverrides: { indicator: { height: 3, borderRadius: 2, background: gradients.signature } },
      },
      MuiTab: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
      },
    },
  });
};

// Augment MUI theme to include md3 tokens
declare module '@mui/material/styles' {
  interface Theme {
    md3: MD3Tokens;
  }
  interface ThemeOptions {
    md3?: MD3Tokens;
  }
}

export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');
export default lightTheme;
