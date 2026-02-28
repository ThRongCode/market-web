'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validations';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Đã có lỗi xảy ra');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Liên kết không hợp lệ. Vui lòng yêu cầu đặt lại mật khẩu mới.
          </Alert>
          <Button component={Link} href="/auth/forgot-password" variant="contained">
            Yêu cầu đặt lại mật khẩu
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold" sx={{ mb: 1 }}>
          Đặt lại mật khẩu
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Nhập mật khẩu mới cho tài khoản của bạn
        </Typography>

        {success ? (
          <>
            <Alert severity="success" sx={{ mb: 2 }}>
              Mật khẩu đã được đặt lại thành công!
            </Alert>
            <Box sx={{ textAlign: 'center' }}>
              <Button component={Link} href="/auth/login" variant="contained">
                Đăng nhập ngay
              </Button>
            </Box>
          </>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <input type="hidden" {...register('token')} />

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Mật khẩu mới"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Xác nhận mật khẩu"
                type="password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Đặt lại mật khẩu'}
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
