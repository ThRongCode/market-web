'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Typography,
  Avatar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  alpha,
  useTheme,
} from '@mui/material';
import { profileSchema, ProfileFormData } from '@/lib/validations';

// ===========================================
// Sub-components (SRP)
// ===========================================

/** Profile avatar + identity card */
function IdentityCard({ name, email, image }: { name?: string | null; email?: string | null; image?: string | null }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        p: 4,
        bgcolor: theme.md3.surfaceContainer,
        borderRadius: '1.5rem',
        mb: 4,
      }}
    >
      <Avatar
        src={image || undefined}
        sx={{
          width: 80,
          height: 80,
          bgcolor: theme.md3.primaryContainer,
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 800,
        }}
      >
        {name?.[0]?.toUpperCase()}
      </Avatar>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: theme.md3.onSurface }}>
          {name}
        </Typography>
        <Typography sx={{ color: theme.md3.onSurfaceVariant, fontSize: '0.9rem' }}>
          {email}
        </Typography>
      </Box>
    </Box>
  );
}

/** MD3 form field */
function ProfileField({
  icon,
  label,
  error,
  helperText,
  ...inputProps
}: {
  icon: string;
  label: string;
  error?: boolean;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 3 }}>
      <Typography
        component="label"
        sx={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: theme.md3.outline,
          ml: 0.5,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="span"
          className="material-symbols-outlined"
          sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: theme.md3.outline, fontSize: 20, pointerEvents: 'none' }}
        >
          {icon}
        </Box>
        <Box
          component="input"
          {...inputProps}
          sx={{
            width: '100%',
            pl: 6,
            pr: 2,
            py: 2,
            bgcolor: theme.md3.surfaceContainerLow,
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '0.95rem',
            color: theme.md3.onSurface,
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'box-shadow 0.2s',
            '&::placeholder': { color: alpha(theme.md3.outline, 0.5) },
            '&:focus': { boxShadow: `0 0 0 2px ${alpha(theme.md3.primary, 0.2)}` },
          }}
        />
      </Box>
      {error && helperText && (
        <Typography sx={{ fontSize: '0.75rem', color: theme.md3.error, ml: 0.5 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

// ===========================================
// Main Page
// ===========================================

export default function ProfilePage() {
  const router = useRouter();
  const theme = useTheme();
  const { data: session, status, update } = useSession();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/profile');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetch('/api/user/profile')
        .then((res) => res.json())
        .then((profile) => {
          setValue('name', profile.name || '');
          setValue('phone', profile.phone || '');
        })
        .catch(() => {
          setValue('name', session.user?.name || '');
        });
    }
  }, [session, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || 'Đã có lỗi xảy ra');
        return;
      }

      await update();
      setSuccess(true);
    } catch {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/user/profile', { method: 'DELETE' });
      if (response.ok) {
        await signOut({ callbackUrl: '/' });
      }
    } catch {
      setError('Không thể xóa tài khoản. Vui lòng thử lại.');
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 640, mx: 'auto' }}>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.md3.onSurface, mb: 4 }}>
        Tài khoản
      </Typography>

      {/* Identity card */}
      <IdentityCard
        name={session?.user?.name}
        email={session?.user?.email}
        image={session?.user?.image}
      />

      {/* Alerts */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Cập nhật thông tin thành công!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Edit form */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          bgcolor: theme.md3.surfaceContainerLowest,
          p: { xs: 3, md: 5 },
          borderRadius: '1.5rem',
          border: `1px solid ${alpha(theme.md3.outlineVariant, 0.1)}`,
          mb: 4,
        }}
      >
        <ProfileField
          icon="person"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register('name')}
        />

        <ProfileField
          icon="call"
          label="Số điện thoại"
          placeholder="0901 234 567"
          type="tel"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          {...register('phone')}
        />

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
            fontSize: '1rem',
            fontFamily: 'inherit',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: isLoading ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            boxShadow: '0 4px 16px rgba(70, 72, 212, 0.2)',
            opacity: isLoading ? 0.7 : 1,
            '&:active': { transform: 'scale(0.95)' },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: '#ffffff' }} />
          ) : (
            <>
              <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>save</Box>
              Cập nhật
            </>
          )}
        </Box>
      </Box>

      {/* Danger zone */}
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          bgcolor: alpha(theme.md3.error, 0.04),
          borderRadius: '1.5rem',
          border: `1px solid ${alpha(theme.md3.error, 0.1)}`,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: theme.md3.error, mb: 1 }}>
          Vùng nguy hiểm
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: theme.md3.onSurfaceVariant, mb: 3, lineHeight: 1.6 }}>
          Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động này không thể hoàn tác.
        </Typography>
        <Box
          component="button"
          type="button"
          onClick={() => setDeleteDialogOpen(true)}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.5,
            bgcolor: 'transparent',
            color: theme.md3.error,
            border: `1px solid ${alpha(theme.md3.error, 0.3)}`,
            borderRadius: '0.75rem',
            fontFamily: 'inherit',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            '&:hover': { bgcolor: alpha(theme.md3.error, 0.08) },
          }}
        >
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>delete</Box>
          Xóa tài khoản
        </Box>
      </Box>

      {/* Delete dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tài khoản? Tất cả dữ liệu bao gồm tin đăng, tin nhắn và danh sách yêu thích sẽ bị xóa vĩnh viễn.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button color="error" onClick={handleDeleteAccount} disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={20} /> : 'Xóa tài khoản'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
