'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
  Stack,
  TextField,
  Button,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  YouTube,
  Instagram,
  Phone,
  Email,
  LocationOn,
  Send,
  Home as HomeIconBrand,
} from '@mui/icons-material';
import { useSettingsStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { gradients } from '@/lib/theme';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Footer() {
  const theme = useTheme();
  const { language } = useSettingsStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#1e293b',
        color: 'grey.300',
        pt: 8,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Newsletter Section */}
        <Box
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: 4,
            p: 4,
            mb: 6,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" color="white" fontWeight={700} gutterBottom>
                {language === 'vi' ? 'Đăng ký nhận tin' : 'Subscribe to Newsletter'}
              </Typography>
              <Typography variant="body2" color="grey.400">
                {language === 'vi' 
                  ? 'Nhận thông tin sản phẩm mới nhất và cơ hội tốt nhất'
                  : 'Get the latest listings and best opportunities'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Email"
                  size="small"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  disabled={newsletterSubmitted}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: alpha('#fff', 0.05),
                      '& fieldset': { borderColor: alpha('#fff', 0.2) },
                      '&:hover fieldset': { borderColor: alpha('#fff', 0.3) },
                      '& input': { color: 'white' },
                      '& input::placeholder': { color: 'grey.500' },
                    },
                  }}
                />
                <Button 
                  variant="contained" 
                  endIcon={<Send />}
                  disabled={newsletterSubmitted || !newsletterEmail.trim()}
                  onClick={() => {
                    // TODO: Gọi API newsletter khi có endpoint
                    setNewsletterSubmitted(true);
                  }}
                  sx={{ minWidth: 120, whiteSpace: 'nowrap' }}
                >
                  {newsletterSubmitted
                    ? (language === 'vi' ? 'Đã đăng ký ✓' : 'Subscribed ✓')
                    : (language === 'vi' ? 'Đăng ký' : 'Subscribe')}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: gradients.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HomeIconBrand sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Typography variant="h5" color="white" fontWeight={700}>
                ChoTot
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.8 }}>
              {language === 'vi'
                ? 'Chợ trực tuyến hàng đầu Việt Nam. Mua bán bất động sản, xe cộ, điện tử, thời trang và nhiều hơn nữa.'
                : 'Vietnam\'s leading online marketplace. Buy and sell real estate, vehicles, electronics, fashion and more.'}
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { Icon: Facebook, href: SITE_CONFIG.social.facebook },
                { Icon: YouTube, href: SITE_CONFIG.social.youtube },
                { Icon: Instagram, href: SITE_CONFIG.social.instagram },
              ].map(({ Icon, href }) => (
                <IconButton
                  key={href}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'grey.400',
                    bgcolor: alpha('#fff', 0.05),
                    '&:hover': { 
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-4px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>
              {language === 'vi' ? 'Khám phá' : 'Explore'}
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {[
                { label: language === 'vi' ? 'Bất động sản' : 'Real Estate', href: '/search?category=REAL_ESTATE' },
                { label: language === 'vi' ? 'Xe cộ' : 'Vehicles', href: '/search?category=VEHICLES' },
                { label: language === 'vi' ? 'Điện tử' : 'Electronics', href: '/search?category=ELECTRONICS' },
                { label: language === 'vi' ? 'Xem bản đồ' : 'Map View', href: '/map' },
              ].map((item) => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'grey.400', 
                      '&:hover': { color: 'primary.main', pl: 1 },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>
              {language === 'vi' ? 'Hỗ trợ' : 'Support'}
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {[
                { label: language === 'vi' ? 'Về chúng tôi' : 'About Us', href: '/about' },
                { label: language === 'vi' ? 'Liên hệ' : 'Contact', href: '/contact' },
                { label: language === 'vi' ? 'Điều khoản' : 'Terms', href: '/terms' },
                { label: language === 'vi' ? 'Chính sách bảo mật' : 'Privacy', href: '/privacy' },
              ].map((item) => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'grey.400', 
                      '&:hover': { color: 'primary.main', pl: 1 },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Typography variant="subtitle1" color="white" fontWeight={600} gutterBottom>
              {language === 'vi' ? 'Liên hệ' : 'Contact'}
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              {[
                { icon: LocationOn, text: SITE_CONFIG.contact.address },
                { icon: Phone, text: SITE_CONFIG.contact.phone },
                { icon: Email, text: SITE_CONFIG.contact.email },
              ].map((item, index) => (
                <Stack key={index} direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: alpha('#fff', 0.05),
                    }}
                  >
                    <item.icon sx={{ fontSize: 18, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="body2" color="grey.400">
                    {item.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: alpha('#fff', 0.1) }} />

        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} ChoTot. {language === 'vi' ? 'Tất cả quyền được bảo lưu.' : 'All rights reserved.'}
          </Typography>
          <Stack direction="row" spacing={3}>
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms', href: '/terms' },
            ].map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'grey.500',
                    '&:hover': { color: 'grey.300' },
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
