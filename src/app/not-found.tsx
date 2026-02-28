'use client';

import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
          Trang không tồn tại
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Typography>
        <Button component={Link} href="/" variant="contained" size="large">
          Về trang chủ
        </Button>
      </Box>
    </Container>
  );
}
