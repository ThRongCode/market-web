'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Typography, IconButton, alpha } from '@mui/material';
import { useSettingsStore } from '@/lib/store';
import { CATEGORIES } from '@/types';
import { gradients } from '@/lib/theme';

// ===========================================
// Site contact config (centralized)
// ===========================================

const SITE_CONTACT = {
  phone: '1900 1234',
  email: 'support@chotot.com',
  address: '123 Nguyễn Văn Linh, Quận 7, TP. HCM',
};

const SOCIAL_LINKS = [
  { icon: 'public', label: 'Facebook', href: '#' },
  { icon: 'smart_display', label: 'YouTube', href: '#' },
  { icon: 'photo_camera', label: 'Instagram', href: '#' },
];

/** Footer link column definition */
interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

// ===========================================
// Newsletter Section
// ===========================================

function NewsletterSection({ language }: { language: 'vi' | 'en' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <Box
      sx={{
        background: gradients.signature,
        borderRadius: '1.5rem',
        p: { xs: 4, md: 5 },
        mb: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      <Box>
        <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', mb: 0.5 }}>
          {language === 'vi' ? 'Đăng ký nhận tin' : 'Subscribe to updates'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
          {language === 'vi'
            ? 'Nhận thông tin mới nhất về tin đăng và ưu đãi'
            : 'Get the latest listings and deals delivered to your inbox'}
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', gap: 1, width: { xs: '100%', md: 'auto' } }}
      >
        {submitted ? (
          <Typography sx={{ color: 'white', fontWeight: 600 }}>
            ✓ {language === 'vi' ? 'Đã đăng ký thành công!' : 'Subscribed successfully!'}
          </Typography>
        ) : (
          <>
            <Box
              component="input"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Email..."
              required
              sx={{
                px: 2.5,
                py: 1.5,
                bgcolor: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                outline: 'none',
                width: { xs: '100%', md: 260 },
                color: '#1a1a2e',
                '&::placeholder': { color: 'rgba(0,0,0,0.4)' },
              }}
            />
            <Box
              component="button"
              type="submit"
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: 'white',
                color: 'primary.main',
                border: 'none',
                borderRadius: '0.5rem',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              {language === 'vi' ? 'Đăng ký' : 'Subscribe'}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

// ===========================================
// Main Footer
// ===========================================

/**
 * Footer — Site footer with tonal background per MD3 design.
 *
 * Structure: newsletter, logo, link columns (explore, support, contact),
 * social icons, and copyright row.
 */
export default function Footer() {
  const { language } = useSettingsStore();

  const exploreLinks = CATEGORIES.slice(0, 4).map((cat) => ({
    label: language === 'vi' ? cat.label : cat.labelEn,
    href: `/search?category=${cat.value}`,
  }));
  exploreLinks.push({
    label: language === 'vi' ? 'Bản đồ' : 'Map',
    href: '/map',
  });

  const columns: FooterColumn[] = [
    {
      title: language === 'vi' ? 'Khám phá' : 'Explore',
      links: exploreLinks,
    },
    {
      title: language === 'vi' ? 'Hỗ trợ' : 'Support',
      links: [
        { label: language === 'vi' ? 'Giới thiệu' : 'About Us', href: '/about' },
        { label: language === 'vi' ? 'Liên hệ' : 'Contact', href: '/contact' },
        { label: language === 'vi' ? 'Điều khoản' : 'Terms', href: '/terms' },
        { label: language === 'vi' ? 'Bảo mật' : 'Privacy', href: '/privacy' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        borderRadius: '2.5rem 2.5rem 0 0',
        mt: 6,
        bgcolor: (theme) => theme.md3.surfaceContainerLow,
      }}
    >
      {/* Newsletter */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 4 }, pt: { xs: 4, md: 6 } }}>
        <NewsletterSection language={language} />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 3, md: 4 },
          py: { xs: 4, md: 5 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Brand column */}
        <Box sx={{ maxWidth: 280 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: 'primary.main', mb: 2, letterSpacing: '-0.02em' }}
          >
            ChoTot
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}
          >
            {language === 'vi'
              ? 'Nền tảng mua bán trực tuyến hàng đầu Việt Nam với hàng ngàn sản phẩm đa dạng.'
              : "Vietnam's leading online marketplace with thousands of diverse products."}
          </Typography>
          {/* Social icons */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {SOCIAL_LINKS.map((social) => (
              <IconButton
                key={social.label}
                component="a"
                href={social.href}
                aria-label={social.label}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '9999px',
                  bgcolor: (theme) => theme.md3.surfaceContainer,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>
                  {social.icon}
                </Box>
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Link columns + contact */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
            gap: { xs: 3, md: 8 },
          }}
        >
          {columns.map((col) => (
            <Box key={col.title}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}
              >
                {col.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} style={{ textDecoration: 'none' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          '&:hover': { color: 'primary.main' },
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {link.label}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          ))}

          {/* Contact info column */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}
            >
              {language === 'vi' ? 'Liên hệ' : 'Contact'}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18, color: 'primary.main' }}>call</Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{SITE_CONTACT.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18, color: 'primary.main' }}>mail</Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{SITE_CONTACT.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18, color: 'primary.main', mt: 0.25 }}>location_on</Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{SITE_CONTACT.address}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Copyright bar */}
      <Box
        sx={{
          borderTop: (theme) => `1px solid ${alpha(theme.md3.outlineVariant, 0.15)}`,
          py: 3,
          px: { xs: 3, md: 4 },
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          © {new Date().getFullYear()} ChoTot Marketplace.{' '}
          {language === 'vi' ? 'Tất cả quyền được bảo lưu.' : 'All rights reserved.'}
          {' '}
          <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
            {language === 'vi' ? 'Bảo mật' : 'Privacy'}
          </Link>
          {' | '}
          <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
            {language === 'vi' ? 'Điều khoản' : 'Terms'}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
