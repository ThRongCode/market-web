'use client';

import { Box, IconButton, Button, Avatar, Menu, MenuItem, ListItemIcon, Divider, alpha } from '@mui/material';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useSettingsStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { TOP_BAR_HEIGHT, SIDE_RAIL_WIDTH } from './AppShell';
import SettingsMenu from './SettingsMenu';

/**
 * TopBar — Fixed top navigation bar.
 *
 * Follows the MD3 glass-nav pattern:
 * - Background: surface at 80% opacity + 20px backdrop blur
 * - Desktop: offset left by SIDE_RAIL_WIDTH
 * - Shows: Brand name (mobile), notification bell, "Đăng tin" CTA, avatar menu
 */
export default function TopBar() {
  const { data: session } = useSession();
  const { language } = useSettingsStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    signOut();
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: { xs: 0, md: `${SIDE_RAIL_WIDTH}px` },
        right: 0,
        height: TOP_BAR_HEIGHT,
        zIndex: (theme) => theme.zIndex.appBar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        bgcolor: (theme) => alpha(theme.md3.surfaceContainerLow, 0.8),
        backdropFilter: 'blur(20px)',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Left: Brand name */}
      <Box
        component={Link}
        href="/"
        sx={{
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 900,
          color: 'primary.main',
          letterSpacing: '-0.04em',
          fontFamily: '"Be Vietnam Pro", sans-serif',
        }}
      >
        ChoTot
      </Box>

      {/* Right: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Settings */}
        <SettingsMenu />

        {session ? (
          <>
            {/* Notification bell (desktop) */}
            <IconButton
              sx={{
                display: { xs: 'none', sm: 'flex' },
                bgcolor: (theme) => theme.md3.surfaceContainerHigh,
                borderRadius: '0.75rem',
                px: 1.5,
                py: 1,
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>
                notifications
              </Box>
            </IconButton>

            {/* Post listing CTA */}
            <Button
              component={Link}
              href="/properties/new"
              variant="contained"
              size="small"
              sx={{
                borderRadius: '0.75rem',
                px: 3,
                py: 1,
                fontWeight: 700,
                fontSize: '0.85rem',
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              {t('postProperty', language)}
            </Button>

            {/* Avatar menu */}
            <IconButton onClick={handleMenuOpen} sx={{ p: 0, ml: 0.5 }}>
              <Avatar
                src={session.user?.image || undefined}
                alt={session.user?.name || 'User'}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: (theme) => theme.md3.surfaceContainerHighest,
                }}
              >
                {session.user?.name?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>

            {/* Dropdown menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              slotProps={{ paper: { sx: { mt: 1, minWidth: 200 } } }}
            >
              <MenuItem component={Link} href="/profile" onClick={handleMenuClose}>
                <ListItemIcon>
                  <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>
                    person
                  </Box>
                </ListItemIcon>
                {t('account', language)}
              </MenuItem>
              <MenuItem component={Link} href="/my-properties" onClick={handleMenuClose}>
                <ListItemIcon>
                  <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>
                    home_work
                  </Box>
                </ListItemIcon>
                {t('myProperties', language)}
              </MenuItem>
              <MenuItem component={Link} href="/messages" onClick={handleMenuClose}>
                <ListItemIcon>
                  <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>
                    mail
                  </Box>
                </ListItemIcon>
                {language === 'vi' ? 'Tin nhắn' : 'Messages'}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20, color: 'error.main' }}>
                    logout
                  </Box>
                </ListItemIcon>
                {t('logout', language)}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              href="/auth/login"
              variant="outlined"
              size="small"
              sx={{ borderRadius: '0.75rem', px: 2.5 }}
            >
              {t('login', language)}
            </Button>
            <Button
              component={Link}
              href="/auth/register"
              variant="contained"
              size="small"
              sx={{
                borderRadius: '0.75rem',
                px: 2.5,
                display: { xs: 'none', sm: 'flex' },
              }}
            >
              {t('register', language)}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
