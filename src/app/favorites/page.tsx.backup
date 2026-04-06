'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  Skeleton,
  Button,
} from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { PropertyCard } from '@/components/property';
import { useFavoritesStore } from '@/lib/store';
import { Favorite, PaginatedResponse } from '@/types';
import Link from 'next/link';

async function fetchFavorites(): Promise<PaginatedResponse<Favorite>> {
  const response = await fetch('/api/favorites?pageSize=100');
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return response.json();
}

export default function FavoritesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { setFavorites } = useFavoritesStore();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/favorites');
    }
  }, [status, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    enabled: !!session,
  });

  const favorites = data?.data;

  useEffect(() => {
    if (favorites) {
      setFavorites(favorites.map((f) => f.propertyId));
    }
  }, [favorites, setFavorites]);

  if (status === 'loading' || isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" height={60} width={300} sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rectangular" height={320} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Đã có lỗi xảy ra. Vui lòng thử lại.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FavoriteIcon color="error" sx={{ mr: 1, fontSize: 32 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Tin đăng yêu thích
        </Typography>
      </Box>

      {!favorites || favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <FavoriteIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Chưa có tin đăng yêu thích
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Hãy lưu những tin đăng bạn quan tâm để xem lại sau
          </Typography>
          <Button component={Link} href="/search" variant="contained">
            Khám phá ngay
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {favorites.length} tin đăng đã lưu
          </Typography>
          <Grid container spacing={3}>
            {favorites.map((favorite) => (
              <Grid key={favorite.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <PropertyCard property={favorite.property} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
