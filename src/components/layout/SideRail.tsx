'use client';

import { Box, IconButton, Tooltip, alpha } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSettingsStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { SIDE_RAIL_WIDTH } from './AppShell';
import { gradients } from '@/lib/theme';

/** Navigation item definition */
interface NavItem {
  label: string;
  href: string;
  icon: string;
  iconFilled: string;
}

/**
 * SideRail — Persistent 96px vertical navigation rail (desktop only).
 *
 * Shows:
 * - Brand icon at top
 * - Nav links (Home, Search, Map, Favorites)
 * - Post Listing FAB at bottom
 *
 * Active state uses a "pill" indicator with secondary-container background.
 */
export default function SideRail() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { language } = useSettingsStore();

  const navItems: NavItem[] = [
    { label: t('home', language), href: '/', icon: 'home', iconFilled: 'home' },
    { label: t('search', language), href: '/search', icon: 'search', iconFilled: 'search' },
    { label: t('map', language), href: '/map', icon: 'map', iconFilled: 'map' },
    { label: t('favorites', language), href: '/favorites', icon: 'favorite', iconFilled: 'favorite' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <Box
      component="nav"
      aria-label="Main navigation"
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: SIDE_RAIL_WIDTH,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
        gap: 3,
        bgcolor: (theme) => theme.md3.surfaceContainer,
        borderRight: 'none',
      }}
    >
      {/* Brand Icon */}
      <Box
        component={Link}
        href="/"
        sx={{
          mb: 1,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="span"
          className="material-symbols-outlined"
          sx={{
            fontSize: 30,
            color: 'primary.main',
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
          }}
        >
          rocket_launch
        </Box>
      </Box>

      {/* Nav Items */}
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Tooltip key={item.href} title={item.label} placement="right">
            <IconButton
              component={Link}
              href={item.href}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '9999px',
                transition: 'all 0.2s ease',
                bgcolor: active
                  ? (theme) => alpha(theme.palette.primary.main, 0.12)
                  : 'transparent',
                color: active ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  bgcolor: (theme) => theme.md3.surfaceContainerHigh,
                  transform: 'scale(1.1)',
                },
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
                {active ? item.iconFilled : item.icon}
              </Box>
            </IconButton>
          </Tooltip>
        );
      })}

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Post Listing FAB */}
      {session && (
        <Tooltip title={t('postProperty', language)} placement="right">
          <IconButton
            component={Link}
            href="/properties/new"
            sx={{
              width: 48,
              height: 48,
              borderRadius: '1rem',
              background: (theme) => theme.md3.tertiaryContainer,
              color: (theme) => theme.md3.onTertiaryContainer,
              boxShadow: `0 4px 16px ${alpha('#b55d00', 0.3)}`,
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 8px 24px ${alpha('#b55d00', 0.4)}`,
              },
            }}
          >
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 24 }}
            >
              add
            </Box>
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
