'use client';

import { Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', p: 4 }}>
      <Box>
        <Typography
          sx={{
            fontSize: '8rem',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: theme.md3.onSurface, mb: 1 }}>
          Trang không tồn tại
        </Typography>
        <Typography sx={{ color: theme.md3.onSurfaceVariant, mb: 4, maxWidth: 400, mx: 'auto' }}>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Typography>
        <Box
          component={Link}
          href="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 4,
            py: 1.5,
            background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '0.75rem',
            textDecoration: 'none',
            '&:active': { transform: 'scale(0.95)' },
          }}
        >
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>home</Box>
          Về trang chủ
        </Box>
      </Box>
    </Box>
  );
}
