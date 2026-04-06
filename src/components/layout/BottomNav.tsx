'use client';

import { Box, alpha } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettingsStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { BOTTOM_NAV_HEIGHT } from './AppShell';

interface BottomNavItem {
  label: string;
  href: string;
  icon: string;
}

/**
 * BottomNav — Fixed bottom navigation bar (mobile only).
 *
 * Shows 4 main nav destinations with MD3 icon styling.
 * Active state: primary color + filled icon variant.
 */
export default function BottomNav() {
  const pathname = usePathname();
  const { language } = useSettingsStore();

  const items: BottomNavItem[] = [
    { label: t('home', language), href: '/', icon: 'home' },
    { label: t('search', language), href: '/search', icon: 'search' },
    { label: t('map', language), href: '/map', icon: 'map' },
    { label: t('favorites', language), href: '/favorites', icon: 'favorite' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <Box
      component="nav"
      aria-label="Mobile navigation"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: BOTTOM_NAV_HEIGHT,
        zIndex: (theme) => theme.zIndex.appBar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        px: 2,
        bgcolor: (theme) => alpha(theme.md3.surface, 0.8),
        backdropFilter: 'blur(20px)',
      }}
    >
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Box
            key={item.href}
            component={Link}
            href={item.href}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.25,
              textDecoration: 'none',
              color: active ? 'primary.main' : 'text.secondary',
              transition: 'color 0.2s ease',
            }}
          >
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{
                fontSize: 24,
                fontVariationSettings: active
                  ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                  : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >
              {item.icon}
            </Box>
            <Box
              component="span"
              sx={{
                fontSize: '0.625rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {item.label}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
