'use client';

import { useMemo, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { createAppTheme } from '@/lib/theme';
import { useSettingsStore } from '@/lib/store';
import useMediaQuery from '@mui/material/useMediaQuery';

interface MUIProviderProps {
  children: React.ReactNode;
}

export default function MUIProvider({ children }: MUIProviderProps) {
  const { themeMode } = useSettingsStore();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = useMemo(() => {
    const mode = themeMode === 'system'
      ? (prefersDarkMode ? 'dark' : 'light')
      : themeMode;
    
    return createAppTheme(mode);
  }, [themeMode, prefersDarkMode]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <AppRouterCacheProvider>
        <ThemeProvider theme={createAppTheme('light')}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    );
  }

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
