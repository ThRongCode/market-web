'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Switch,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Map as MapIcon,
  Favorite as FavoriteIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Language as LanguageIcon,
  Close as CloseIcon,
  ChevronRight as ChevronRightIcon,
  MailOutline as MailOutlineIcon,
  Home as HomeIconBrand,
} from '@mui/icons-material';
import { gradients } from '@/lib/theme';
import { useSettingsStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import SettingsMenu from './SettingsMenu';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: session } = useSession();
  const { language, setLanguage, themeMode, setThemeMode } = useSettingsStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigation = [
    { name: t('home', language), href: '/', icon: HomeIcon },
    { name: t('search', language), href: '/search', icon: SearchIcon },
    { name: t('map', language), href: '/map', icon: MapIcon },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const drawer = (
    <Box sx={{ width: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Drawer Header with Branding */}
      <Box
        sx={{
          p: 2,
          background: gradients.hero,
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HomeIconBrand sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">
              ChoTot
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* User Section in Drawer */}
        {session ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={session.user?.image || undefined}
              alt={session.user?.name || 'User'}
              sx={{ width: 48, height: 48, border: '2px solid white' }}
            >
              {session.user?.name?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                {session.user?.name || 'User'}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {session.user?.email}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              component={Link}
              href="/auth/login"
              variant="contained"
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ 
                flex: 1, 
                color: 'primary.main',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
              }}
            >
              {t('login', language)}
            </Button>
            <Button
              component={Link}
              href="/auth/register"
              variant="outlined"
              onClick={handleDrawerToggle}
              sx={{ 
                flex: 1, 
                color: 'white', 
                borderColor: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              {t('register', language)}
            </Button>
          </Box>
        )}
      </Box>

      {/* Post Property CTA */}
      {session && (
        <Box sx={{ p: 2 }}>
          <Button
            component={Link}
            href="/properties/new"
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleDrawerToggle}
            sx={{ py: 1.5 }}
          >
            {t('postProperty', language)}
          </Button>
        </Box>
      )}

      <Divider />

      {/* Navigation Links */}
      <List sx={{ flex: 1 }}>
        {navigation.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              sx={{
                py: 1.5,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              <ChevronRightIcon sx={{ color: 'text.secondary' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* User Menu Items */}
      {session && (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/favorites"
                onClick={handleDrawerToggle}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon sx={{ color: 'error.main' }}>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary={t('favorites', language)} />
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/messages"
                onClick={handleDrawerToggle}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon sx={{ color: 'warning.main' }}>
                  <MailOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={language === 'vi' ? 'Tin nhắn' : 'Messages'} />
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/my-properties"
                onClick={handleDrawerToggle}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon sx={{ color: 'info.main' }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={t('myProperties', language)} />
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/profile"
                onClick={handleDrawerToggle}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon sx={{ color: 'secondary.main' }}>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={t('account', language)} />
                <ChevronRightIcon sx={{ color: 'text.secondary' }} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </>
      )}

      {/* Settings Section */}
      <Box sx={{ p: 2 }}>
        <Typography variant="overline" color="text.secondary" sx={{ px: 1 }}>
          {t('settings', language)}
        </Typography>
        
        {/* Theme Toggle */}
        <ListItem sx={{ px: 1, py: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            {themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
          </ListItemIcon>
          <ListItemText primary={t('theme', language)} />
          <Switch
            checked={themeMode === 'dark'}
            onChange={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            size="small"
          />
        </ListItem>

        {/* Language Toggle */}
        <ListItem sx={{ px: 1, py: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={t('language', language)} />
          <Chip
            label={language === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}
            size="small"
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            sx={{ cursor: 'pointer' }}
          />
        </ListItem>
      </Box>

      {/* Logout Button */}
      {session && (
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleSignOut}
          >
            {t('logout', language)}
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              mr: 4,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: gradients.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HomeIconBrand sx={{ color: 'white', fontSize: 22 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: gradients.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              ChoTot
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  color="inherit"
                  startIcon={<item.icon />}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Settings Menu */}
          <SettingsMenu />

          {session ? (
            <>
              <Button
                component={Link}
                href="/properties/new"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ ml: 2, mr: 2, display: { xs: 'none', sm: 'flex' } }}
              >
                {t('postProperty', language)}
              </Button>
              <IconButton
                component={Link}
                href="/messages"
                sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
              >
                <MailOutlineIcon />
              </IconButton>
              <IconButton
                component={Link}
                href="/favorites"
                sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  src={session.user?.image || undefined}
                  alt={session.user?.name || 'User'}
                  sx={{ width: 32, height: 32 }}
                >
                  {session.user?.name?.[0]?.toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  component={Link}
                  href="/profile"
                  onClick={handleMenuClose}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  {t('account', language)}
                </MenuItem>
                <MenuItem
                  component={Link}
                  href="/my-properties"
                  onClick={handleMenuClose}
                >
                  <ListItemIcon>
                    <HomeIcon fontSize="small" />
                  </ListItemIcon>
                  {t('myProperties', language)}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  {t('logout', language)}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <Button
                component={Link}
                href="/auth/login"
                variant="outlined"
              >
                {t('login', language)}
              </Button>
              <Button
                component={Link}
                href="/auth/register"
                variant="contained"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                {t('register', language)}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
