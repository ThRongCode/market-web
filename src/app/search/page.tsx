'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography, Pagination, Skeleton, Alert, alpha, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { PropertyCard, SearchFilters } from '@/components/property';
import { useViewModeStore, useSearchStore } from '@/lib/store';
import { Property, PaginatedResponse } from '@/types';
import { buildQueryString } from '@/lib/utils';
import { keyframes } from '@mui/system';

// ===========================================
// Animations
// ===========================================

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ===========================================
// Data Fetcher
// ===========================================

async function fetchProperties(params: Record<string, unknown>): Promise<PaginatedResponse<Property>> {
  const queryString = buildQueryString(params);
  const response = await fetch(`/api/properties?${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
}

// ===========================================
// Sub-components (SRP)
// ===========================================

/** View mode toggle — grid/list with Material Symbols */
function ViewModeToggle({
  viewMode,
  onChange,
}: {
  viewMode: 'grid' | 'list';
  onChange: (mode: 'grid' | 'list') => void;
}) {
  const theme = useTheme();
  const modes = [
    { value: 'grid' as const, icon: 'grid_view' },
    { value: 'list' as const, icon: 'view_list' },
  ];
  return (
    <Box sx={{ display: 'flex', borderRadius: '0.75rem', overflow: 'hidden', bgcolor: theme.md3.surfaceContainerHigh }}>
      {modes.map((m) => (
        <Box
          key={m.value}
          component="button"
          type="button"
          onClick={() => onChange(m.value)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            bgcolor: viewMode === m.value ? theme.md3.primary : 'transparent',
            color: viewMode === m.value ? '#ffffff' : theme.md3.onSurface,
            transition: 'all 0.2s',
            '&:hover': { bgcolor: viewMode === m.value ? theme.md3.primary : theme.md3.surfaceContainerHighest },
          }}
        >
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>
            {m.icon}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

/** Empty state */
function EmptyState() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 10,
        animation: `${fadeInUp} 0.5s ease-out`,
      }}
    >
      <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 80, color: theme.md3.outlineVariant, mb: 2, display: 'block' }}>
        search_off
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: theme.md3.onSurface, mb: 1 }}>
        Không tìm thấy kết quả phù hợp
      </Typography>
      <Typography sx={{ color: theme.md3.onSurfaceVariant, fontSize: '0.9rem' }}>
        Thử thay đổi bộ lọc để tìm kiếm kết quả khác
      </Typography>
    </Box>
  );
}

/** Loading skeleton grid */
function LoadingGrid({ viewMode }: { viewMode: 'grid' | 'list' }) {
  const theme = useTheme();
  const shimmerBg = `linear-gradient(90deg, ${alpha(theme.md3.surfaceContainerHigh, 0.4)} 25%, ${alpha(theme.md3.surfaceContainerHighest, 0.6)} 50%, ${alpha(theme.md3.surfaceContainerHigh, 0.4)} 75%)`;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'grid'
          ? { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }
          : '1fr',
        gap: 3,
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            bgcolor: theme.md3.surfaceContainer,
            borderRadius: '1.5rem',
            overflow: 'hidden',
            animation: `${fadeInUp} 0.5s ease-out`,
            animationDelay: `${i * 0.1}s`,
            animationFillMode: 'both',
            ...(viewMode === 'list' && { display: 'flex' }),
          }}
        >
          <Box
            sx={{
              width: viewMode === 'list' ? 280 : '100%',
              height: viewMode === 'list' ? 200 : 220,
              background: shimmerBg,
              backgroundSize: '200% 100%',
              animation: `${shimmer} 1.5s infinite`,
              flexShrink: 0,
            }}
          />
          <Box sx={{ p: 3, flex: 1 }}>
            <Skeleton variant="text" width="90%" height={28} />
            <Skeleton variant="text" width="50%" height={32} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="70%" height={20} sx={{ mt: 1 }} />
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Skeleton variant="rounded" width={70} height={28} sx={{ borderRadius: '0.5rem' }} />
              <Skeleton variant="rounded" width={70} height={28} sx={{ borderRadius: '0.5rem' }} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

// ===========================================
// Main Page
// ===========================================

export default function SearchPage() {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const { viewMode, setViewMode } = useViewModeStore();
  const { filters, setFilters } = useSearchStore();
  const [page, setPage] = useState(1);

  // Sync URL params to store
  useEffect(() => {
    const keyword = searchParams.get('keyword') || '';
    const category = searchParams.get('category') || '';
    const city = searchParams.get('city') || '';
    const district = searchParams.get('district') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const listingType = searchParams.get('listingType') || '';
    const condition = searchParams.get('condition') || '';

    setFilters({ keyword, category, city, district, propertyType, listingType, condition });
  }, [searchParams, setFilters]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['properties', filters, page],
    queryFn: () => fetchProperties({ ...filters, page, pageSize: 12 }),
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header + Filter chips */}
      <Box component="header" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 800, letterSpacing: '-0.02em', color: theme.md3.onSurface }}>
              {filters.keyword
                ? `Kết quả cho "${filters.keyword}"`
                : 'Tất cả tin đăng'}
            </Typography>
            {data?.total != null && (
              <Typography sx={{ color: theme.md3.onSurfaceVariant, fontSize: '0.9rem', mt: 0.5 }}>
                {data.total.toLocaleString()} kết quả
              </Typography>
            )}
          </Box>
          <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
        </Box>

        <SearchFilters onSearch={() => setPage(1)} />
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, animation: `${fadeInUp} 0.5s ease-out` }}>
          Đã có lỗi xảy ra. Vui lòng thử lại.
        </Alert>
      )}

      {/* Loading */}
      {isLoading && <LoadingGrid viewMode={viewMode} />}

      {/* Results */}
      {!isLoading && data && (
        <>
          {data.data.length === 0 ? (
            <EmptyState />
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid'
                  ? { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }
                  : '1fr',
                gap: 3,
              }}
            >
              {data.data.map((property, index) => (
                <Box
                  key={property.id}
                  sx={{
                    animation: `${fadeInUp} 0.5s ease-out`,
                    animationDelay: `${index * 0.05}s`,
                    animationFillMode: 'both',
                  }}
                >
                  <PropertyCard property={property} variant={viewMode} />
                </Box>
              ))}
            </Box>
          )}

          {/* Pagination */}
          {data.totalPages > 1 && (
            <Box
              component="footer"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 8,
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
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
