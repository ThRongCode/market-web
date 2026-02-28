'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material';
import { Google as GoogleIcon, Person as PersonIcon } from '@mui/icons-material';
import { loginSchema, LoginFormData } from '@/lib/validations';

// Test users — only shown in development
const TEST_USERS = process.env.NODE_ENV === 'development'
  ? [
      { email: 'nguyen.van.a@email.com', password: 'password123', name: 'Nguyễn Văn A' },
      { email: 'tran.thi.b@email.com', password: 'password123', name: 'Trần Thị B' },
      { email: 'le.van.c@email.com', password: 'password123', name: 'Lê Văn C' },
    ]
  : [];

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const fillTestUser = (user: typeof TEST_USERS[0]) => {
    setValue('email', user.email);
    setValue('password', user.password);
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email hoặc mật khẩu không đúng');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => signIn('google', { callbackUrl: '/' });

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold" sx={{ mb: 1 }}>
          Đăng nhập
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
          Chào mừng bạn quay lại ChoTot
        </Typography>

        {/* Test Users — only visible in development */}
        {TEST_USERS.length > 0 && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
              🧪 Test accounts (click to fill):
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {TEST_USERS.map((user) => (
                <Chip
                  key={user.email}
                  icon={<PersonIcon />}
                  label={user.name}
                  onClick={() => fillTestUser(user)}
                  clickable
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
              Password: password123
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 1 }}
          />

          <Box sx={{ textAlign: 'right', mb: 2 }}>
            <Link href="/auth/forgot-password" style={{ color: '#1976d2', textDecoration: 'none', fontSize: '0.875rem' }}>
              Quên mật khẩu?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Đăng nhập'}
          </Button>
        </form>

        <Divider sx={{ my: 2 }}>hoặc</Divider>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{ mb: 3 }}
        >
          Đăng nhập với Google
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Chưa có tài khoản?{' '}
            <Link href="/auth/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Đăng ký ngay
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
