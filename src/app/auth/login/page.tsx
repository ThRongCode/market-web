'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Button, Alert, CircularProgress, alpha } from '@mui/material';
import { loginSchema, LoginFormData } from '@/lib/validations';

// ===========================================
// Constants
// ===========================================

const TEST_USERS = process.env.NODE_ENV === 'development'
  ? [
      { email: 'nguyen.van.a@email.com', password: 'password123', name: 'nguyen.van.a' },
      { email: 'tran.thi.b@email.com', password: 'password123', name: 'tran.thi.b' },
    ]
  : [];

// ===========================================
// Sub-components
// ===========================================

/** Editorial sidebar — visible on large screens only */
function EditorialPanel() {
  return (
    <Box
      sx={{
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        gap: 3,
        gridColumn: 'span 7',
      }}
    >
      {/* Hero image card */}
      <Box
        sx={{
          bgcolor: (theme) => theme.md3.primaryFixed,
          p: 6,
          borderRadius: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
          alt=""
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
            mixBlendMode: 'multiply',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            sx={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: (theme) => theme.md3.onSurface,
              letterSpacing: '-0.03em',
              fontStyle: 'italic',
              mb: 1,
            }}
          >
            ChoTot
          </Typography>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: 'text.secondary', maxWidth: 420 }}>
            Experience second-hand commerce as a high-end editorial journey.
          </Typography>
        </Box>
      </Box>

      {/* Bottom info cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <Box
          sx={{
            bgcolor: (theme) => theme.md3.surfaceContainer,
            p: 4,
            borderRadius: '1.5rem',
          }}
        >
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 32, color: 'primary.main', mb: 2, display: 'block' }}>
            verified_user
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Authenticated Luxury
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Every listing is curated to ensure the highest standards of quality and trust.
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: (theme) => theme.md3.tertiaryContainer,
            color: (theme) => theme.md3.onTertiaryContainer,
            p: 4,
            borderRadius: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.65rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              opacity: 0.8,
            }}
          >
            Featured Community
          </Typography>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2 }}>
            Join 2M+ Curators in Vietnam.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

/** Google logo SVG */
function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ===========================================
// Main Page
// ===========================================

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

  const fillTestUser = (user: (typeof TEST_USERS)[0]) => {
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
          gap: 4,
          alignItems: 'center',
        }}
      >
        {/* Left editorial panel */}
        <EditorialPanel />

        {/* Right login form */}
        <Box sx={{ gridColumn: { xs: 'span 1', lg: 'span 5' }, width: '100%' }}>
          <Box
            sx={{
              bgcolor: (theme) => theme.md3.surfaceContainerLowest,
              borderRadius: '1.5rem',
              p: { xs: 4, md: 6 },
              boxShadow: (theme) => `0 32px 64px ${alpha(theme.md3.onSurface, 0.06)}`,
              border: (theme) => `1px solid ${alpha(theme.md3.outlineVariant, 0.15)}`,
            }}
          >
            {/* Heading */}
            <Box sx={{ mb: 5 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: '-0.02em', mb: 1 }}
              >
                Đăng nhập
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Chào mừng bạn trở lại với Digital Curator.
              </Typography>
            </Box>

            {/* Test user chips */}
            {TEST_USERS.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: '0.6rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'text.secondary',
                    mb: 1.5,
                  }}
                >
                  Tài khoản dùng thử
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {TEST_USERS.map((user) => (
                    <Box
                      key={user.email}
                      component="button"
                      onClick={() => fillTestUser(user)}
                      sx={{
                        bgcolor: (theme) => theme.md3.surfaceContainerHigh,
                        border: 'none',
                        borderRadius: '9999px',
                        px: 2,
                        py: 1,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        color: 'text.primary',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: (theme) => theme.md3.secondaryContainer,
                        },
                        '&:active': { transform: 'scale(0.95)' },
                      }}
                    >
                      <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 16 }}>
                        person
                      </Box>
                      {user.name}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Email */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  component="label"
                  htmlFor="email"
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'text.secondary',
                    ml: 0.5,
                  }}
                >
                  Email
                </Typography>
                <Box
                  component="input"
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  {...register('email')}
                  sx={{
                    width: '100%',
                    bgcolor: (theme) => theme.md3.surfaceContainerLow,
                    border: 'none',
                    borderRadius: '0.75rem',
                    px: 2,
                    py: 2,
                    fontSize: '1rem',
                    color: 'text.primary',
                    outline: 'none',
                    transition: 'box-shadow 0.2s ease',
                    '&:focus': {
                      boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
                    },
                    '&::placeholder': { color: (theme) => theme.md3.outline },
                  }}
                />
                {errors.email && (
                  <Typography variant="caption" sx={{ color: 'error.main', ml: 0.5 }}>
                    {errors.email.message}
                  </Typography>
                )}
              </Box>

              {/* Password */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0.5 }}>
                  <Typography
                    component="label"
                    htmlFor="password"
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'text.secondary',
                    }}
                  >
                    Mật khẩu
                  </Typography>
                  <Link
                    href="/auth/forgot-password"
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'primary.main',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Quên mật khẩu?
                    </Typography>
                  </Link>
                </Box>
                <Box
                  component="input"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password')}
                  sx={{
                    width: '100%',
                    bgcolor: (theme) => theme.md3.surfaceContainerLow,
                    border: 'none',
                    borderRadius: '0.75rem',
                    px: 2,
                    py: 2,
                    fontSize: '1rem',
                    color: 'text.primary',
                    outline: 'none',
                    transition: 'box-shadow 0.2s ease',
                    '&:focus': {
                      boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
                    },
                    '&::placeholder': { color: (theme) => theme.md3.outline },
                  }}
                />
                {errors.password && (
                  <Typography variant="caption" sx={{ color: 'error.main', ml: 0.5 }}>
                    {errors.password.message}
                  </Typography>
                )}
              </Box>

              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 2,
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {isLoading ? <CircularProgress size={22} color="inherit" /> : 'Tiếp tục'}
              </Button>
            </Box>

            {/* Divider */}
            <Box sx={{ position: 'relative', my: 5 }}>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '100%', borderTop: (theme) => `1px solid ${alpha(theme.md3.outlineVariant, 0.3)}` }} />
              </Box>
              <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <Typography
                  sx={{
                    px: 2,
                    bgcolor: (theme) => theme.md3.surfaceContainerLowest,
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: (theme) => theme.md3.outline,
                  }}
                >
                  Hoặc
                </Typography>
              </Box>
            </Box>

            {/* Google sign in */}
            <Button
              fullWidth
              onClick={handleGoogleSignIn}
              sx={{
                py: 2,
                borderRadius: '0.75rem',
                border: (theme) => `1px solid ${theme.md3.outlineVariant}`,
                color: 'text.primary',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                '&:hover': {
                  bgcolor: (theme) => theme.md3.surfaceContainer,
                },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              <GoogleLogo />
              Đăng nhập với Google
            </Button>

            {/* Register link */}
            <Typography variant="body2" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
              Chưa có tài khoản?{' '}
              <Link href="/auth/register" style={{ textDecoration: 'none' }}>
                <Typography
                  component="span"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    '&:hover': { textDecoration: 'underline' },
                    ml: 0.5,
                  }}
                >
                  Đăng ký ngay
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Floating brand watermark */}
      <Typography
        sx={{
          position: 'fixed',
          bottom: 32,
          color: (theme) => alpha(theme.md3.onSurface, 0.06),
          fontWeight: 900,
          fontStyle: 'italic',
          fontSize: '2.5rem',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        ChoTot
      </Typography>
    </Box>
  );
}
