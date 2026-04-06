'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Alert,
  Skeleton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Property, PaginatedResponse, PROPERTY_STATUS } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

async function fetchMyProperties(): Promise<PaginatedResponse<Property>> {
  const response = await fetch('/api/properties?userId=me&pageSize=100');
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
}

export default function MyPropertiesPage() {
  const router = useRouter();
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="text" height={60} width={300} sx={{ mb: 3 }} />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={150} sx={{ mb: 2 }} />
        ))}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Tin đăng của tôi
        </Typography>
        <Button
          component={Link}
          href="/properties/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Đăng tin mới
        </Button>
      </Box>

      {!data || data.data.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Bạn chưa có tin đăng nào
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Đăng tin ngay để tiếp cận người mua tiềm năng
          </Typography>
          <Button
            component={Link}
            href="/properties/new"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Đăng tin ngay
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {data.data.length} tin đăng
          </Typography>

          {data.data.map((property) => {
            const statusInfo = PROPERTY_STATUS.find((s) => s.value === property.status);
            return (
              <Card key={property.id} sx={{ display: 'flex', mb: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 200, height: 150 }}
                  image={property.images?.[0]?.url || '/placeholder-property.jpg'}
                  alt={property.title}
                />
                <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" component={Link} href={`/properties/${property.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                      {property.title}
                    </Typography>
                    <Typography variant="body1" color="primary" fontWeight="bold">
                      {formatCurrency(property.price)}
                      {property.listingType === 'RENT' && '/tháng'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.district}, {property.city}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                      <Chip
                        label={statusInfo?.label || property.status}
                        size="small"
                        color={property.status === 'ACTIVE' ? 'success' : 'default'}
                      />
                      <Chip
                        label={property.listingType === 'SALE' ? 'Bán' : 'Cho thuê'}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Ngày đăng: {formatDate(property.createdAt)}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={(e) => handleMenuOpen(e, property)}>
                      <MoreVert />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Actions Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem
          component={Link}
          href={`/properties/${selectedProperty?.id}`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          Xem tin
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/properties/${selectedProperty?.id}/edit`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Chỉnh sửa
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Xóa tin</Typography>
        </MenuItem>
      </Menu>
    </Container>
  );
}
