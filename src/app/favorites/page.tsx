'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Box, Typography, Alert, Skeleton, alpha, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { PropertyCard } from '@/components/property';
import { useFavoritesStore } from '@/lib/store';
import { Favorite, PaginatedResponse } from '@/types';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

async function fetchFavorites(): Promise<PaginatedResponse<Favorite>> {
  const response = await fetch('/api/favorites?pageSize=100');
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return response.json();
}

/** Empty state with icon + CTA */
function EmptyFavorites() {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: 'center', py: 10, animation: `${fadeInUp} 0.5s ease-out` }}>
      <Box
        component="span"
        className="material-symbols-outlined"
        sx={{ fontSize: 80, color: theme.md3.outlineVariant, display: 'block', mb: 2 }}
      >
        favorite
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: theme.md3.onSurface, mb: 1 }}>
        Chưa có tin đăng yêu thích
      </Typography>
      <Typography sx={{ color: theme.md3.onSurfaceVariant, fontSize: '0.9rem', mb: 3 }}>
        Hãy lưu những tin đăng bạn quan tâm để xem lại sau
      </Typography>
      <Box
        component={Link}
        href="/search"
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
        <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>explore</Box>
        Khám phá ngay
      </Box>
    </Box>
  );
}

/** Loading skeleton */
function LoadingSkeleton() {
  const theme = useTheme();
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Skeleton variant="text" height={48} width={300} sx={{ mb: 3 }} />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Box key={i} sx={{ bgcolor: theme.md3.surfaceContainer, borderRadius: '1.5rem', overflow: 'hidden' }}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ p: 3 }}>
              <Skeleton variant="text" width="80%" height={28} />
              <Skeleton variant="text" width="50%" height={24} sx={{ mt: 1 }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function FavoritesPage() {
  const router = useRouter();
  const theme = useTheme();
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

  if (status === 'loading' || isLoading) return <LoadingSkeleton />;

  if (error) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
        <Alert severity="error">Đã có lỗi xảy ra. Vui lòng thử lại.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <Box
          component="span"
          className="material-symbols-outlined"
          sx={{ fontSize: 32, color: theme.md3.error }}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          favorite
        </Box>
        <Box>
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.md3.onSurface }}>
            Tin đăng yêu thích
          </Typography>
          {favorites && favorites.length > 0 && (
            <Typography sx={{ color: theme.md3.onSurfaceVariant, fontSize: '0.9rem' }}>
              {favorites.length} tin đăng đã lưu
            </Typography>
          )}
        </Box>
      </Box>

      {/* Content */}
      {!favorites || favorites.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {favorites.map((favorite, i) => (
            <Box
              key={favorite.id}
              sx={{
                animation: `${fadeInUp} 0.5s ease-out`,
                animationDelay: `${i * 0.05}s`,
                animationFillMode: 'both',
              }}
            >
              <PropertyCard property={favorite.property} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
