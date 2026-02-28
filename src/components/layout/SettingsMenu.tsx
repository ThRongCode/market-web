'use client';

import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  LightMode,
  DarkMode,
  SettingsBrightness,
  Check,
} from '@mui/icons-material';
import { useSettingsStore } from '@/lib/store';
import { languages, t, Language } from '@/lib/i18n';

type ThemeMode = 'light' | 'dark' | 'system';

const themeModes: { value: ThemeMode; icon: React.ElementType }[] = [
  { value: 'light', icon: LightMode },
  { value: 'dark', icon: DarkMode },
  { value: 'system', icon: SettingsBrightness },
];

export default function SettingsMenu() {
  const { themeMode, language, setThemeMode, setLanguage } = useSettingsStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const getThemeLabel = (mode: ThemeMode) => {
    switch (mode) {
      case 'light':
        return t('lightMode', language);
      case 'dark':
        return t('darkMode', language);
      case 'system':
        return t('systemMode', language);
    }
  };

  return (
    <>
      <Tooltip title={t('settings', language)}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 1 }}
          aria-controls={open ? 'settings-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="settings-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: { width: 220, mt: 1 },
        }}
      >
        {/* Theme Section */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            {t('theme', language).toUpperCase()}
          </Typography>
        </Box>
        {themeModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <MenuItem
              key={mode.value}
              onClick={() => handleThemeChange(mode.value)}
              selected={themeMode === mode.value}
            >
              <ListItemIcon>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{getThemeLabel(mode.value)}</ListItemText>
              {themeMode === mode.value && (
                <Check fontSize="small" color="primary" />
              )}
            </MenuItem>
          );
        })}

        <Divider sx={{ my: 1 }} />

        {/* Language Section */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            {t('language', language).toUpperCase()}
          </Typography>
        </Box>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={language === lang.code}
          >
            <ListItemIcon>
              <Typography fontSize="large">{lang.flag}</Typography>
            </ListItemIcon>
            <ListItemText>{lang.name}</ListItemText>
            {language === lang.code && (
              <Check fontSize="small" color="primary" />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
