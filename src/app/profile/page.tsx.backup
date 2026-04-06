'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Alert,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { profileSchema, ProfileFormData } from '@/lib/validations';

export default function ProfilePage() {
  const router = useRouter();
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
      // Fetch full profile (includes phone) from API
      fetch('/api/user/profile')
        .then((res) => res.json())
        .then((profile) => {
          setValue('name', profile.name || '');
          setValue('phone', profile.phone || '');
        })
        .catch(() => {
          // Fallback to session data
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

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
          Tài khoản
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={session?.user?.image || undefined}
            sx={{ width: 80, height: 80, mr: 2 }}
          >
            {session?.user?.name?.[0]?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">{session?.user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {session?.user?.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Cập nhật thông tin thành công!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Họ và tên"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Số điện thoại"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Cập nhật'}
          </Button>
        </form>

        <Divider sx={{ my: 4 }} />

        {/* Danger Zone */}
        <Typography variant="subtitle2" color="error" fontWeight="bold" sx={{ mb: 1 }}>
          Vùng nguy hiểm
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Xóa tài khoản sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Hành động này không thể hoàn tác.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setDeleteDialogOpen(true)}
        >
          Xóa tài khoản
        </Button>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tài khoản? Tất cả dữ liệu bao gồm tin đăng, tin nhắn và danh sách yêu thích sẽ bị xóa vĩnh viễn.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Hủy
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={isDeleting}
            onClick={async () => {
              setIsDeleting(true);
              try {
                const response = await fetch('/api/user/delete', { method: 'DELETE' });
                if (response.ok) {
                  await signOut({ callbackUrl: '/' });
                } else {
                  const result = await response.json();
                  setError(result.message || 'Không thể xóa tài khoản');
                  setDeleteDialogOpen(false);
                }
              } catch {
                setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
                setDeleteDialogOpen(false);
              } finally {
                setIsDeleting(false);
              }
            }}
          >
            {isDeleting ? <CircularProgress size={20} /> : 'Xóa tài khoản'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
