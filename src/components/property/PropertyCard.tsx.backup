'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Hotel,
  Bathtub,
  SquareFoot,
  ArrowForward,
} from '@mui/icons-material';
import { Property, PROPERTY_TYPES, LISTING_TYPES, CATEGORIES } from '@/types';
import { formatCurrency, formatArea, formatRelativeTime } from '@/lib/utils';
import { useFavoritesStore } from '@/lib/store';

interface PropertyCardProps {
  property: Property;
  variant?: 'grid' | 'list';
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void;
}

export default function PropertyCard({
  property,
  variant = 'grid',
  onFavoriteToggle,
}: PropertyCardProps) {
  const theme = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = isFavorite(property.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorited) {
      removeFavorite(property.id);
      fetch(`/api/favorites?propertyId=${property.id}`, { method: 'DELETE' }).catch(() => {
        addFavorite(property.id); // Rollback on error
      });
    } else {
      addFavorite(property.id);
      fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId: property.id }),
      }).catch(() => {
        removeFavorite(property.id); // Rollback on error
      });
    }
    
    onFavoriteToggle?.(property.id, !favorited);
  };

  const propertyTypeLabel = PROPERTY_TYPES.find(
    (t) => t.value === property.propertyType
  )?.label;
  
  const listingTypeLabel = LISTING_TYPES.find(
    (t) => t.value === property.listingType
  )?.label;

  const categoryInfo = CATEGORIES.find((c) => c.value === property.category);
  const isRealEstate = property.category === 'REAL_ESTATE';

  const mainImage = property.images?.[0]?.url || '/placeholder-property.jpg';

  if (variant === 'list') {
    return (
      <Card
        component={Link}
        href={`/properties/${property.id}`}
        sx={{
          display: 'flex',
          textDecoration: 'none',
          overflow: 'hidden',
          '&:hover': {
            '& .card-image': {
              transform: 'scale(1.05)',
            },
          },
        }}
      >
        <Box sx={{ position: 'relative', width: 280, minHeight: 200, overflow: 'hidden' }}>
          <CardMedia
            className="card-image"
            component="img"
            sx={{ 
              width: 280, 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            image={mainImage}
            alt={property.title}
          />
          <Chip
            label={listingTypeLabel}
            color={property.listingType === 'SALE' ? 'primary' : 'secondary'}
            size="small"
            sx={{ position: 'absolute', top: 8, left: 8 }}
          />
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            {favorited ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </Box>
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1,
            }}
          >
            {property.title}
          </Typography>
          
          <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
            {formatCurrency(property.price)}
            {property.listingType === 'RENT' && '/tháng'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
            <LocationOn sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">
              {property.district}, {property.city}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
            {isRealEstate && property.area ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SquareFoot sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2">{formatArea(property.area)}</Typography>
              </Box>
            ) : null}
            {isRealEstate && property.bedrooms ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Hotel sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2">{property.bedrooms} PN</Typography>
              </Box>
            ) : null}
            {isRealEstate && property.bathrooms ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Bathtub sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2">{property.bathrooms} WC</Typography>
              </Box>
            ) : null}
            {!isRealEstate && property.condition && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {property.condition === 'NEW' ? 'Mới' : property.condition === 'LIKE_NEW' ? 'Như mới' : property.condition}
                </Typography>
              </Box>
            )}
            {!isRealEstate && property.brand && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">{property.brand}</Typography>
              </Box>
            )}
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              {categoryInfo && (
                <Chip label={`${categoryInfo.icon} ${categoryInfo.label}`} size="small" variant="outlined" />
              )}
              {isRealEstate && propertyTypeLabel && (
                <Chip label={propertyTypeLabel} size="small" variant="outlined" />
              )}
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {formatRelativeTime(property.createdAt)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      component={Link}
      href={`/properties/${property.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        overflow: 'hidden',
        '&:hover': {
          '& .card-image': {
            transform: 'scale(1.08)',
          },
          '& .view-btn': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          className="card-image"
          component="img"
          height="220"
          image={mainImage}
          alt={property.title}
          sx={{ 
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
            pointerEvents: 'none',
          }}
        />
        <Chip
          label={listingTypeLabel}
          color={property.listingType === 'SALE' ? 'primary' : 'secondary'}
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 12, 
            left: 12,
            fontWeight: 600,
          }}
        />
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: alpha('#fff', 0.9),
            backdropFilter: 'blur(10px)',
            '&:hover': { 
              bgcolor: 'white',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {favorited ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        {/* View button on hover */}
        <Box
          className="view-btn"
          sx={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            opacity: 0,
            transition: 'all 0.3s ease',
          }}
        >
          <Chip
            icon={<ArrowForward sx={{ fontSize: 16 }} />}
            label="Xem chi tiết"
            sx={{
              bgcolor: alpha('#fff', 0.95),
              backdropFilter: 'blur(10px)',
              fontWeight: 600,
              '& .MuiChip-icon': { color: 'primary.main' },
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1,
            minHeight: 48,
          }}
        >
          {property.title}
        </Typography>

        <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
          {formatCurrency(property.price)}
          {property.listingType === 'RENT' && '/tháng'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
          <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" noWrap>
            {property.district}, {property.city}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {isRealEstate && property.area ? (
            <Chip
              icon={<SquareFoot sx={{ fontSize: 16 }} />}
              label={formatArea(property.area)}
              size="small"
              variant="outlined"
            />
          ) : null}
          {isRealEstate && property.bedrooms ? (
            <Chip
              icon={<Hotel sx={{ fontSize: 16 }} />}
              label={`${property.bedrooms} PN`}
              size="small"
              variant="outlined"
            />
          ) : null}
          {!isRealEstate && categoryInfo && (
            <Chip
              label={`${categoryInfo.icon} ${categoryInfo.label}`}
              size="small"
              variant="outlined"
            />
          )}
          {!isRealEstate && property.condition && (
            <Chip
              label={property.condition === 'NEW' ? 'Mới' : property.condition === 'LIKE_NEW' ? 'Như mới' : property.condition}
              size="small"
              variant="outlined"
            />
          )}
        </Stack>

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {formatRelativeTime(property.createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
