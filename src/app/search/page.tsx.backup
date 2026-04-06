'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Grid,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
  Alert,
  alpha,
  useTheme,
} from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { PropertyCard, SearchFilters } from '@/components/property';
import { useViewModeStore, useSearchStore } from '@/lib/store';
import { Property, PaginatedResponse } from '@/types';
import { buildQueryString } from '@/lib/utils';
import { keyframes } from '@mui/system';

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Stagger animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

async function fetchProperties(params: Record<string, unknown>): Promise<PaginatedResponse<Property>> {
  const queryString = buildQueryString(params);
  const response = await fetch(`/api/properties?${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { viewMode, setViewMode } = useViewModeStore();
  const { filters, setFilters } = useSearchStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category') || '';
    const city = searchParams.get('city') || '';
    const district = searchParams.get('district') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const listingType = searchParams.get('listingType') || '';
    const condition = searchParams.get('condition') || '';

    setFilters({
      keyword,
      category,
      city,
      district,
      propertyType,
      listingType,
      condition,
    });
  }, [searchParams, setFilters]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['properties', filters, page],
    queryFn: () =>
      fetchProperties({
        ...filters,
        page,
        pageSize: 12,
      }),
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Filters */}
      <SearchFilters onSearch={() => setPage(1)} />

      {/* Results Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 3,
        }}
      >
        <Typography variant="h6">
          {data?.total ? `${data.total.toLocaleString()} kết quả` : 'Đang tìm kiếm...'}
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, value) => value && setViewMode(value)}
          size="small"
        >
          <ToggleButton value="grid">
            <ViewModule />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, animation: `${fadeInUp} 0.5s ease-out` }}>
          Đã có lỗi xảy ra. Vui lòng thử lại.
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <LoadingGrid viewMode={viewMode} />
      )}

      {/* Results */}
      {!isLoading && data && (
        <>
          {data.data.length === 0 ? (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                animation: `${fadeInUp} 0.5s ease-out`,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Không tìm thấy kết quả phù hợp
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Thử thay đổi bộ lọc để tìm kiếm kết quả khác
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {data.data.map((property, index) => (
                <Grid
                  key={property.id}
                  size={{ xs: 12, sm: 6, md: viewMode === 'grid' ? 4 : 12 }}
                  sx={{
                    animation: `${fadeInUp} 0.5s ease-out`,
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <PropertyCard property={property} variant={viewMode} />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {data.totalPages > 1 && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 4,
                animation: `${fadeInUp} 0.5s ease-out`,
                animationDelay: '0.3s',
                animationFillMode: 'both',
              }}
            >
              <Pagination
                count={data.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

// Loading grid component
function LoadingGrid({ viewMode }: { viewMode: 'grid' | 'list' }) {
  const theme = useTheme();
  
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid 
          key={index} 
          size={{ xs: 12, sm: 6, md: viewMode === 'grid' ? 4 : 12 }}
          sx={{
            animation: `${fadeInUp} 0.5s ease-out`,
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'both',
          }}
        >
          {viewMode === 'grid' ? (
            <Box
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 1,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 220,
                  background: `linear-gradient(90deg, ${alpha(theme.palette.action.hover, 0.3)} 25%, ${alpha(theme.palette.action.hover, 0.5)} 50%, ${alpha(theme.palette.action.hover, 0.3)} 75%)`,
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 1.5s infinite`,
                }}
              />
              <Box sx={{ p: 2.5 }}>
                <Skeleton variant="text" width="90%" height={28} />
                <Skeleton variant="text" width="50%" height={32} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="70%" height={20} sx={{ mt: 1 }} />
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Skeleton variant="rounded" width={70} height={28} />
                  <Skeleton variant="rounded" width={70} height={28} />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                bgcolor: 'background.paper',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 1,
              }}
            >
              <Box
                sx={{
                  width: 280,
                  height: 200,
                  background: `linear-gradient(90deg, ${alpha(theme.palette.action.hover, 0.3)} 25%, ${alpha(theme.palette.action.hover, 0.5)} 50%, ${alpha(theme.palette.action.hover, 0.3)} 75%)`,
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 1.5s infinite`,
                }}
              />
              <Box sx={{ flex: 1, p: 2 }}>
                <Skeleton variant="text" width="80%" height={32} />
                <Skeleton variant="text" width="40%" height={28} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Skeleton variant="rounded" width={80} height={32} />
                  <Skeleton variant="rounded" width={80} height={32} />
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      ))}
    </Grid>
  );
}
