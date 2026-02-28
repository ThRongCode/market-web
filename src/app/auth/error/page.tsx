'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Container, Typography, Paper, Button, Stack, Alert } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import Link from 'next/link';

const ERROR_MESSAGES: Record<string, string> = {
  Configuration: 'Có lỗi cấu hình máy chủ. Vui lòng liên hệ quản trị viên.',
  AccessDenied: 'Bạn không có quyền truy cập. Vui lòng thử lại với tài khoản khác.',
  Verification: 'Liên kết xác minh đã hết hạn hoặc đã được sử dụng.',
  OAuthSignin: 'Không thể kết nối đến nhà cung cấp đăng nhập.',
  OAuthCallback: 'Có lỗi xảy ra trong quá trình xác thực.',
  OAuthCreateAccount: 'Không thể tạo tài khoản với nhà cung cấp này.',
  Callback: 'Có lỗi xảy ra trong quá trình xác thực.',
  CredentialsSignin: 'Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại.',
  Default: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.',
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') ?? 'Default';
  const message = ERROR_MESSAGES[error] ?? ERROR_MESSAGES.Default;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Lỗi xác thực
        </Typography>

        <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
          {message}
        </Alert>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" component={Link} href="/auth/login">
            Đăng nhập lại
          </Button>
          <Button variant="outlined" component={Link} href="/">
            Trang chủ
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Typography>Đang tải...</Typography>
        </Container>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
