'use client';

import Link from 'next/link';
import { Box, Typography, alpha } from '@mui/material';
import { Property, CATEGORIES, LISTING_TYPES, ITEM_CONDITIONS } from '@/types';
import { formatCurrency, formatArea, formatRelativeTime } from '@/lib/utils';
import { useFavoritesStore } from '@/lib/store';

// ===========================================
// Types
// ===========================================

interface PropertyCardProps {
  property: Property;
  variant?: 'grid' | 'list';
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void;
}

// ===========================================
// Favorite Button (extracted — SRP)
// ===========================================

function FavoriteButton({
  propertyId,
  onToggle,
}: {
  propertyId: string;
  onToggle?: (id: string, isFavorited: boolean) => void;
}) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = isFavorite(propertyId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorited) {
      removeFavorite(propertyId);
      fetch(`/api/favorites?propertyId=${propertyId}`, { method: 'DELETE' }).catch(() => {
        addFavorite(propertyId);
      });
    } else {
      addFavorite(propertyId);
      fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId }),
      }).catch(() => {
        removeFavorite(propertyId);
      });
    }

    onToggle?.(propertyId, !favorited);
  };

  return (
    <Box
      component="button"
      onClick={handleClick}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        p: 1,
        borderRadius: '9999px',
        border: 'none',
        bgcolor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(8px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        color: favorited ? 'error.main' : 'text.secondary',
        '&:hover': {
          bgcolor: favorited ? 'error.main' : 'rgba(255,255,255,0.95)',
          color: favorited ? 'white' : 'error.main',
        },
      }}
    >
      <Box
        component="span"
        className="material-symbols-outlined"
        sx={{
          fontSize: 20,
          fontVariationSettings: favorited
            ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
            : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        }}
      >
        favorite
      </Box>
    </Box>
  );
}

// ===========================================
// Card Content (shared between variants)
// ===========================================

function CardMeta({ property }: { property: Property }) {
  const categoryInfo = CATEGORIES.find((c) => c.value === property.category);
  const listingTypeLabel = LISTING_TYPES.find((lt) => lt.value === property.listingType)?.label;
  const isRealEstate = property.category === 'REAL_ESTATE';

  return (
    <>
      {/* Tag + time row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography
          sx={{
            fontSize: '0.6rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'primary.main',
            bgcolor: (theme) => theme.md3.primaryFixed,
            px: 1,
            py: 0.25,
            borderRadius: 0.5,
          }}
        >
          {listingTypeLabel}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {formatRelativeTime(property.createdAt)}
        </Typography>
      </Box>

      {/* Title */}
      <Typography
        sx={{
          fontWeight: 700,
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.4,
          transition: 'color 0.2s ease',
        }}
      >
        {property.title}
      </Typography>

      {/* Price + location */}
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 900,
            color: (theme) => theme.md3.tertiary,
            letterSpacing: '-0.02em',
          }}
        >
          {formatCurrency(property.price)}
          {property.listingType === 'RENT' ? '/th' : ''}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, color: 'text.secondary' }}>
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 14 }}>
            location_on
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            {property.district ? `${property.district}, ` : ''}
            {property.city}
          </Typography>
        </Box>
      </Box>

      {/* RE specs */}
      {isRealEstate && (property.area || property.bedrooms) && (
        <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
          {property.area && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {formatArea(property.area)}
            </Typography>
          )}
          {property.bedrooms && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {property.bedrooms} PN
            </Typography>
          )}
          {property.bathrooms && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {property.bathrooms} WC
            </Typography>
          )}
        </Box>
      )}

      {/* Non-RE condition/category */}
      {!isRealEstate && categoryInfo && (
        <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {categoryInfo.icon} {categoryInfo.label}
          </Typography>
          {property.condition && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {ITEM_CONDITIONS.find((c) => c.value === property.condition)?.label ?? property.condition}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

// ===========================================
// Grid Variant
// ===========================================

function GridCard({ property, onFavoriteToggle }: PropertyCardProps) {
  const mainImage = property.images?.[0]?.url || '/placeholder-property.svg';

  return (
    <Box
      component={Link}
      href={`/properties/${property.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: (theme) => theme.md3.surface,
        borderRadius: '1.5rem',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'text.primary',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => `0 16px 48px ${alpha(theme.md3.onSurface, 0.08)}`,
          '& .card-img': { transform: 'scale(1.1)' },
          '& .card-title': { color: 'primary.main' },
        },
      }}
    >
      {/* Image */}
      <Box sx={{ height: 224, overflow: 'hidden', position: 'relative' }}>
        <Box
          className="card-img"
          component="img"
          src={mainImage}
          alt={property.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s ease',
          }}
        />
        <FavoriteButton propertyId={property.id} onToggle={onFavoriteToggle} />
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box className="card-title">
          <CardMeta property={property} />
        </Box>
      </Box>
    </Box>
  );
}

// ===========================================
// List Variant
// ===========================================

function ListCard({ property, onFavoriteToggle }: PropertyCardProps) {
  const mainImage = property.images?.[0]?.url || '/placeholder-property.svg';

  return (
    <Box
      component={Link}
      href={`/properties/${property.id}`}
      sx={{
        display: 'flex',
        bgcolor: (theme) => theme.md3.surface,
        borderRadius: '1.5rem',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'text.primary',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => `0 8px 24px ${alpha(theme.md3.onSurface, 0.06)}`,
          '& .card-img': { transform: 'scale(1.05)' },
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative', width: { xs: 140, sm: 240 }, minHeight: 180, overflow: 'hidden', flexShrink: 0 }}>
        <Box
          className="card-img"
          component="img"
          src={mainImage}
          alt={property.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
        <FavoriteButton propertyId={property.id} onToggle={onFavoriteToggle} />
      </Box>

      {/* Content */}
      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardMeta property={property} />
      </Box>
    </Box>
  );
}

// ===========================================
// Main Export
// ===========================================

export default function PropertyCard(props: PropertyCardProps) {
  return props.variant === 'list' ? <ListCard {...props} /> : <GridCard {...props} />;
}
