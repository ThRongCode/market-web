'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Box, Typography, Alert, Skeleton, Menu, MenuItem, CircularProgress, alpha, useTheme } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Property, PaginatedResponse, PROPERTY_STATUS } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

async function fetchMyProperties(): Promise<PaginatedResponse<Property>> {
  const response = await fetch('/api/properties?userId=me&pageSize=100');
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
}

/** Status badge with tonal styling */
function StatusBadge({ status }: { status: string }) {
  const theme = useTheme();
  const isActive = status === 'ACTIVE';
  const statusInfo = PROPERTY_STATUS.find((s) => s.value === status);
  return (
    <Box
      component="span"
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: '9999px',
        fontSize: '0.7rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        bgcolor: isActive ? alpha('#10b981', 0.12) : theme.md3.surfaceContainerHigh,
        color: isActive ? '#059669' : theme.md3.onSurfaceVariant,
      }}
    >
      {statusInfo?.label || status}
    </Box>
  );
}

/** Individual property list item */
function PropertyListItem({
  property,
  onMenuOpen,
}: {
  property: Property;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, property: Property) => void;
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: theme.md3.surfaceContainer,
        borderRadius: '1.5rem',
        overflow: 'hidden',
        transition: 'all 0.2s',
        '&:hover': { bgcolor: theme.md3.surfaceContainerHigh, transform: 'scale(1.005)' },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={property.images?.[0]?.url || '/placeholder-property.svg'}
        alt={property.title}
        sx={{
          width: { xs: 120, sm: 200 },
          height: { xs: 120, sm: 150 },
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />

      {/* Content */}
      <Box sx={{ flex: 1, p: { xs: 2, sm: 3 }, display: 'flex', justifyContent: 'space-between', minWidth: 0 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component={Link}
            href={`/properties/${property.id}`}
            sx={{
              fontWeight: 700,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              color: theme.md3.onSurface,
              textDecoration: 'none',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              '&:hover': { color: theme.md3.primary },
            }}
          >
            {property.title}
          </Typography>

          <Typography sx={{ fontWeight: 800, color: theme.md3.primary, fontSize: '1rem', mt: 0.5 }}>
            {formatCurrency(property.price)}
            {property.listingType === 'RENT' && '/tháng'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
            <StatusBadge status={property.status} />
            <Box
              component="span"
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: '9999px',
                fontSize: '0.7rem',
                fontWeight: 600,
                bgcolor: theme.md3.surfaceContainerHigh,
                color: theme.md3.onSurfaceVariant,
              }}
            >
              {property.listingType === 'SALE' ? 'Bán' : 'Cho thuê'}
            </Box>
          </Box>

          <Typography sx={{ fontSize: '0.75rem', color: theme.md3.onSurfaceVariant, mt: 1, display: { xs: 'none', sm: 'block' } }}>
            {property.district}, {property.city} • Ngày đăng: {formatDate(property.createdAt)}
          </Typography>
        </Box>

        {/* More button */}
        <Box
          component="button"
          type="button"
          onClick={(e: React.MouseEvent<HTMLElement>) => onMenuOpen(e, property)}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            pt: 0.5,
            bgcolor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: theme.md3.onSurfaceVariant,
            flexShrink: 0,
            '&:hover': { color: theme.md3.primary },
          }}
        >
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>more_vert</Box>
        </Box>
      </Box>
    </Box>
  );
}

/** Empty state */
function EmptyProperties() {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: 'center', py: 10, animation: `${fadeInUp} 0.5s ease-out` }}>
      <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 80, color: theme.md3.outlineVariant, display: 'block', mb: 2 }}>
        inventory_2
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: theme.md3.onSurface, mb: 1 }}>
        Bạn chưa có tin đăng nào
      </Typography>
      <Typography sx={{ color: theme.md3.onSurfaceVariant, fontSize: '0.9rem', mb: 3 }}>
        Đăng tin ngay để tiếp cận người mua tiềm năng
      </Typography>
      <Box
        component={Link}
        href="/properties/new"
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
        <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>add</Box>
        Đăng tin ngay
      </Box>
    </Box>
  );
}

export default function MyPropertiesPage() {
  const router = useRouter();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/my-properties');
    }
  }, [status, router]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['my-properties'],
    queryFn: fetchMyProperties,
    enabled: !!session,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete property');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-properties'] });
      handleMenuClose();
    },
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, property: Property) => {
    setAnchorEl(event.currentTarget);
    setSelectedProperty(property);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProperty(null);
  };

  const handleDelete = () => {
    if (selectedProperty && confirm('Bạn có chắc chắn muốn xóa tin này?')) {
      deleteMutation.mutate(selectedProperty.id);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
        <Skeleton variant="text" height={48} width={300} sx={{ mb: 3 }} />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={150} sx={{ mb: 2, borderRadius: '1.5rem' }} />
        ))}
      </Box>
    );
  }

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.md3.onSurface }}>
            Tin đăng của tôi
          </Typography>
          {data && data.data.length > 0 && (
            <Typography sx={{ color: theme.md3.onSurfaceVariant, fontSize: '0.9rem', mt: 0.5 }}>
              {data.data.length} tin đăng
            </Typography>
          )}
        </Box>
        <Box
          component={Link}
          href="/properties/new"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.5,
            background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '0.75rem',
            textDecoration: 'none',
            fontSize: '0.9rem',
            '&:active': { transform: 'scale(0.95)' },
          }}
        >
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>add</Box>
          Đăng tin mới
        </Box>
      </Box>

      {/* Content */}
      {!data || data.data.length === 0 ? (
        <EmptyProperties />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.data.map((property, i) => (
            <Box
              key={property.id}
              sx={{
                animation: `${fadeInUp} 0.5s ease-out`,
                animationDelay: `${i * 0.05}s`,
                animationFillMode: 'both',
              }}
            >
              <PropertyListItem property={property} onMenuOpen={handleMenuOpen} />
            </Box>
          ))}
        </Box>
      )}

      {/* Context menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem component={Link} href={`/properties/${selectedProperty?.id}`} onClick={handleMenuClose}>
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18, mr: 1.5 }}>visibility</Box>
          Xem tin
        </MenuItem>
        <MenuItem component={Link} href={`/properties/${selectedProperty?.id}/edit`} onClick={handleMenuClose}>
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18, mr: 1.5 }}>edit</Box>
          Chỉnh sửa
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: theme.md3.error }}>
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18, mr: 1.5 }}>delete</Box>
          Xóa
        </MenuItem>
      </Menu>
    </Box>
  );
}
