'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Alert, CircularProgress, alpha } from '@mui/material';
import { registerSchema, RegisterFormData } from '@/lib/validations';

// ===========================================
// Constants
// ===========================================

const FORM_FIELDS = {
  name: { label: 'HỌ VÀ TÊN', icon: 'person', placeholder: 'Nguyễn Văn A', type: 'text' },
  phone: { label: 'SỐ ĐIỆN THOẠI', suffix: '(tùy chọn)', icon: 'call', placeholder: '0901 234 567', type: 'tel' },
  email: { label: 'EMAIL', icon: 'mail', placeholder: 'example@email.com', type: 'email' },
  password: { label: 'MẬT KHẨU', icon: 'lock', placeholder: '••••••••', type: 'password' },
  confirmPassword: { label: 'XÁC NHẬN MẬT KHẨU', icon: 'verified_user', placeholder: '••••••••', type: 'password' },
} as const;

// ===========================================
// Sub-components (SRP)
// ===========================================

/** Branded side panel — visible on md+ */
function BrandPanel() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        gridColumn: 'span 5',
        bgcolor: (theme) => theme.md3.primaryContainer,
        p: { md: 6, lg: 10 },
        borderRadius: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        height: 600,
        color: '#ffffff',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography sx={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', fontStyle: 'italic', mb: 8 }}>
          ChoTot
        </Typography>
        <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, mb: 2 }}>
          The Digital Curator
        </Typography>
        <Typography sx={{ fontSize: '1.1rem', fontWeight: 400, opacity: 0.8, maxWidth: 300, lineHeight: 1.6 }}>
          Tham gia cộng đồng mua bán hiện đại, tinh tế và an toàn nhất Việt Nam.
        </Typography>
      </Box>

      {/* Social proof */}
      <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex' }}>
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: (theme) => alpha(theme.md3.primaryFixed, 0.3),
                border: (theme) => `2px solid ${theme.md3.primaryContainer}`,
                ml: i > 1 ? '-12px' : 0,
              }}
            />
          ))}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>10M+ users</Typography>
          <Typography sx={{ opacity: 0.7, fontSize: '0.8rem' }}>trusted sellers</Typography>
        </Box>
      </Box>

      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: '50%',
          bgcolor: (theme) => alpha(theme.md3.primaryFixed, 0.2),
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 40,
          right: 40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.1)',
          filter: 'blur(40px)',
        }}
      />
    </Box>
  );
}

/** MD3 native input field with icon */
function FormField({
  icon,
  label,
  suffix,
  type = 'text',
  placeholder,
  error,
  helperText,
  ...inputProps
}: {
  icon: string;
  label: string;
  suffix?: string;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      <Typography
        component="label"
        sx={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: (theme) => theme.md3.outline,
          ml: 0.5,
        }}
      >
        {label}
        {suffix && (
          <Typography component="span" sx={{ fontStyle: 'italic', fontWeight: 400, textTransform: 'lowercase', ml: 0.5, fontSize: 'inherit' }}>
            {suffix}
          </Typography>
        )}
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="span"
          className="material-symbols-outlined"
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: (theme) => theme.md3.outline,
            fontSize: 20,
            pointerEvents: 'none',
          }}
        >
          {icon}
        </Box>
        <Box
          component="input"
          type={type}
          placeholder={placeholder}
          {...inputProps}
          sx={{
            width: '100%',
            pl: 6,
            pr: 2,
            py: 2,
            bgcolor: (theme) => theme.md3.surfaceContainerLow,
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '0.95rem',
            color: (theme) => theme.md3.onSurface,
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'box-shadow 0.2s',
            '&::placeholder': { color: (theme) => alpha(theme.md3.outline, 0.5) },
            '&:focus': { boxShadow: (theme) => `0 0 0 2px ${alpha(theme.md3.primary, 0.2)}` },
          }}
        />
      </Box>
      {error && helperText && (
        <Typography sx={{ fontSize: '0.75rem', color: (theme) => theme.md3.error, ml: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

// ===========================================
// Main Page
// ===========================================

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Đã có lỗi xảy ra');
        return;
      }

      router.push('/auth/login?registered=true');
    } catch {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: (theme) => theme.md3.surface,
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        component="main"
        sx={{
          width: '100%',
          maxWidth: 1100,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          gap: 3,
        }}
      >
        <BrandPanel />

        {/* Registration form card */}
        <Box
          sx={{
            gridColumn: { xs: 'span 12', md: 'span 7' },
            bgcolor: (theme) => theme.md3.surfaceContainerLowest,
            p: { xs: 4, md: 6, lg: 8 },
            borderRadius: '1.5rem',
            border: (theme) => `1px solid ${alpha(theme.md3.outlineVariant, 0.1)}`,
          }}
        >
          <Box sx={{ mb: 5 }}>
            <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', color: (theme) => theme.md3.onSurface, mb: 1 }}>
              Đăng ký tài khoản
            </Typography>
            <Typography sx={{ color: (theme) => theme.md3.onSurfaceVariant }}>
              Bắt đầu hành trình mua sắm và rao vặt của bạn.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Name + Phone row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <FormField
                icon={FORM_FIELDS.name.icon}
                label={FORM_FIELDS.name.label}
                type={FORM_FIELDS.name.type}
                placeholder={FORM_FIELDS.name.placeholder}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
              />
              <FormField
                icon={FORM_FIELDS.phone.icon}
                label={FORM_FIELDS.phone.label}
                suffix={FORM_FIELDS.phone.suffix}
                type={FORM_FIELDS.phone.type}
                placeholder={FORM_FIELDS.phone.placeholder}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register('phone')}
              />
            </Box>

            {/* Email */}
            <FormField
              icon={FORM_FIELDS.email.icon}
              label={FORM_FIELDS.email.label}
              type={FORM_FIELDS.email.type}
              placeholder={FORM_FIELDS.email.placeholder}
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
            />

            {/* Password + Confirm row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <FormField
                icon={FORM_FIELDS.password.icon}
                label={FORM_FIELDS.password.label}
                type={FORM_FIELDS.password.type}
                placeholder={FORM_FIELDS.password.placeholder}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
              />
              <FormField
                icon={FORM_FIELDS.confirmPassword.icon}
                label={FORM_FIELDS.confirmPassword.label}
                type={FORM_FIELDS.confirmPassword.type}
                placeholder={FORM_FIELDS.confirmPassword.placeholder}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
            </Box>

            {/* Terms checkbox */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, px: 0.5 }}>
              <Box
                component="input"
                type="checkbox"
                sx={{ mt: 0.5, accentColor: '#4648d4', width: 18, height: 18, cursor: 'pointer' }}
              />
              <Typography sx={{ fontSize: '0.85rem', color: (theme) => theme.md3.onSurfaceVariant, lineHeight: 1.6 }}>
                Tôi đồng ý với{' '}
                <Typography
                  component={Link}
                  href="/terms"
                  sx={{ color: (theme) => theme.md3.primary, fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Điều khoản sử dụng
                </Typography>{' '}
                và{' '}
                <Typography
                  component={Link}
                  href="/privacy"
                  sx={{ color: (theme) => theme.md3.primary, fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Chính sách bảo mật
                </Typography>{' '}
                của ChoTot.
              </Typography>
            </Box>

            {/* Submit */}
            <Box
              component="button"
              type="submit"
              disabled={isLoading}
              sx={{
                width: '100%',
                py: 2,
                background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1.05rem',
                fontFamily: 'inherit',
                borderRadius: '0.75rem',
                border: 'none',
                cursor: isLoading ? 'wait' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                boxShadow: '0 4px 16px rgba(70, 72, 212, 0.2)',
                opacity: isLoading ? 0.7 : 1,
                '&:active': { transform: 'scale(0.95)' },
                '&:hover': { boxShadow: '0 8px 24px rgba(70, 72, 212, 0.3)' },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: '#ffffff' }} />
              ) : (
                <>
                  Đăng ký
                  <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>arrow_forward</Box>
                </>
              )}
            </Box>
          </Box>

          {/* Login link */}
          <Box sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
              <Box sx={{ flex: 1, height: '1px', bgcolor: (theme) => alpha(theme.md3.outlineVariant, 0.3) }} />
              <Typography sx={{ mx: 2, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: (theme) => theme.md3.outline }}>
                Đã có tài khoản?
              </Typography>
              <Box sx={{ flex: 1, height: '1px', bgcolor: (theme) => alpha(theme.md3.outlineVariant, 0.3) }} />
            </Box>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                component={Link}
                href="/auth/login"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 4,
                  py: 1.5,
                  bgcolor: (theme) => alpha(theme.md3.secondaryContainer, 0.3),
                  color: (theme) => theme.md3.secondary,
                  fontWeight: 700,
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: (theme) => alpha(theme.md3.secondaryContainer, 0.5) },
                }}
              >
                Đăng nhập ngay
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer copyright */}
        <Box sx={{ gridColumn: 'span 12', mt: 2, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: (theme) => theme.md3.outline }}>
            © 2024 ChoTot Digital Curator. All rights reserved.
          </Typography>
        </Box>
      </Box>

      {/* Background blurs */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -50, pointerEvents: 'none', opacity: 0.4 }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0, width: 500, height: 500, bgcolor: '#eef2ff', borderRadius: '50%', filter: 'blur(120px)' }} />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: 600, height: 600, bgcolor: '#f1f5f9', borderRadius: '50%', filter: 'blur(100px)' }} />
      </Box>
    </Box>
  );
}
