'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  alpha,
  Collapse,
  useTheme,
} from '@mui/material';
import { useSearchStore } from '@/lib/store';
import { PROPERTY_TYPES, LISTING_TYPES, VIETNAM_CITIES, CATEGORIES, ITEM_CONDITIONS } from '@/types';

// ===========================================
// Types & Interfaces
// ===========================================

interface SearchFiltersProps {
  onSearch?: () => void;
  variant?: 'horizontal' | 'vertical';
}

interface PriceConfig {
  max: number;
  step: number;
  marks: Array<{ value: number; label: string }>;
  format: (v: number) => string;
}

// ===========================================
// Price configuration by category (OCP — easily extensible)
// ===========================================

const PRICE_CONFIGS: Record<string, PriceConfig> = {
  ELECTRONICS: {
    max: 200_000_000, step: 5_000_000,
    marks: [{ value: 0, label: '0' }, { value: 50_000_000, label: '50tr' }, { value: 100_000_000, label: '100tr' }, { value: 200_000_000, label: '200tr+' }],
    format: (v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)} tr` : `${v.toLocaleString()}`,
  },
  VEHICLES: {
    max: 5_000_000_000, step: 100_000_000,
    marks: [{ value: 0, label: '0' }, { value: 1_000_000_000, label: '1 tỷ' }, { value: 3_000_000_000, label: '3 tỷ' }, { value: 5_000_000_000, label: '5 tỷ+' }],
    format: (v) => v >= 1_000_000_000 ? `${(v / 1_000_000_000).toFixed(1)} tỷ` : `${(v / 1_000_000).toFixed(0)} tr`,
  },
  FASHION: {
    max: 100_000_000, step: 1_000_000,
    marks: [{ value: 0, label: '0' }, { value: 10_000_000, label: '10tr' }, { value: 50_000_000, label: '50tr' }, { value: 100_000_000, label: '100tr+' }],
    format: (v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)} tr` : `${v.toLocaleString()}`,
  },
  DEFAULT: {
    max: 20_000_000_000, step: 500_000_000,
    marks: [{ value: 0, label: '0' }, { value: 5_000_000_000, label: '5 tỷ' }, { value: 10_000_000_000, label: '10 tỷ' }, { value: 20_000_000_000, label: '20 tỷ+' }],
    format: (v) => `${(v / 1_000_000_000).toFixed(1)} tỷ`,
  },
};

function getPriceConfig(category: string): PriceConfig {
  return PRICE_CONFIGS[category] || PRICE_CONFIGS.DEFAULT;
}

// ===========================================
// Sub-components
// ===========================================

/** MD3 tonal filter chip */
function FilterChip({
  label,
  icon,
  active = false,
  onClose,
  onClick,
}: {
  label: string;
  icon?: string;
  active?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}) {
  const theme = useTheme();
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        bgcolor: active ? theme.md3.secondaryContainer : theme.md3.surfaceContainerHigh,
        color: active ? theme.md3.onSecondaryContainer : theme.md3.onSurface,
        borderRadius: '0.75rem',
        fontWeight: 500,
        fontSize: '0.85rem',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s',
        '&:hover': { bgcolor: active ? theme.md3.secondaryContainer : theme.md3.surfaceContainerHighest },
      }}
    >
      {icon && (
        <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>
          {icon}
        </Box>
      )}
      {label}
      {onClose ? (
        <Box
          component="span"
          className="material-symbols-outlined"
          onClick={(e: React.MouseEvent) => { e.stopPropagation(); onClose(); }}
          sx={{ fontSize: 16, cursor: 'pointer', ml: 0.5 }}
        >
          close
        </Box>
      ) : (
        <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>
          expand_more
        </Box>
      )}
    </Box>
  );
}

/** Advanced filter panel (collapsible) */
function AdvancedFilterPanel({
  open,
  isRealEstate,
  priceConfig,
}: {
  open: boolean;
  isRealEstate: boolean;
  priceConfig: PriceConfig;
}) {
  const theme = useTheme();
  const { filters, setFilters, resetFilters } = useSearchStore();

  return (
    <Collapse in={open}>
      <Box
        sx={{
          mt: 3,
          p: 4,
          bgcolor: theme.md3.surfaceContainerLow,
          borderRadius: '1.5rem',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: isRealEstate ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)' },
          gap: 4,
        }}
      >
        {/* Category */}
        <FormControl fullWidth size="small">
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={filters.category}
            label="Danh mục"
            onChange={(e) => setFilters({ category: e.target.value, propertyType: '' })}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Transaction type */}
        <FormControl fullWidth size="small">
          <InputLabel>Giao dịch</InputLabel>
          <Select
            value={filters.listingType}
            label="Giao dịch"
            onChange={(e) => setFilters({ listingType: e.target.value })}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {LISTING_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* City */}
        <FormControl fullWidth size="small">
          <InputLabel>Thành phố</InputLabel>
          <Select
            value={filters.city}
            label="Thành phố"
            onChange={(e) => setFilters({ city: e.target.value })}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {VIETNAM_CITIES.map((city) => (
              <MenuItem key={city.code} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* RE-specific: property type */}
        {isRealEstate && (
          <FormControl fullWidth size="small">
            <InputLabel>Loại BĐS</InputLabel>
            <Select
              value={filters.propertyType}
              label="Loại BĐS"
              onChange={(e) => setFilters({ propertyType: e.target.value })}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {PROPERTY_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Non-RE: condition */}
        {!isRealEstate && filters.category !== '' && (
          <FormControl fullWidth size="small">
            <InputLabel>Tình trạng</InputLabel>
            <Select
              value={filters.condition || ''}
              label="Tình trạng"
              onChange={(e) => setFilters({ condition: e.target.value })}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {ITEM_CONDITIONS.map((cond) => (
                <MenuItem key={cond.value} value={cond.value}>
                  {cond.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Price slider */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.md3.onSurfaceVariant, mb: 1 }}>
            Khoảng giá
          </Typography>
          <Slider
            value={[filters.minPrice || 0, filters.maxPrice || priceConfig.max]}
            onChange={(_, value) => {
              const [min, max] = value as number[];
              setFilters({ minPrice: min, maxPrice: max });
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={priceConfig.format}
            min={0}
            max={priceConfig.max}
            step={priceConfig.step}
            marks={priceConfig.marks}
          />
        </Box>

        {/* RE: area + bedrooms */}
        {isRealEstate && (
          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
            <Box>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.md3.onSurfaceVariant, mb: 1 }}>
                Diện tích
              </Typography>
              <Slider
                value={[filters.minArea || 0, filters.maxArea || 500]}
                onChange={(_, value) => {
                  const [min, max] = value as number[];
                  setFilters({ minArea: min, maxArea: max });
                }}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v} m²`}
                min={0}
                max={500}
                step={10}
              />
            </Box>
            <FormControl fullWidth size="small">
              <InputLabel>Phòng ngủ</InputLabel>
              <Select
                value={filters.bedrooms || ''}
                label="Phòng ngủ"
                onChange={(e) => setFilters({ bedrooms: e.target.value ? Number(e.target.value) : null })}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>{num}+ phòng</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Reset */}
        <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' }, display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            component="button"
            type="button"
            onClick={resetFilters}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.5,
              bgcolor: 'transparent',
              color: theme.md3.primary,
              border: 'none',
              borderRadius: '0.75rem',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              '&:hover': { bgcolor: alpha(theme.md3.primary, 0.05) },
            }}
          >
            <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>close</Box>
            Xóa bộ lọc
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
}

// ===========================================
// Main Component
// ===========================================

export default function SearchFilters({ onSearch, variant = 'horizontal' }: SearchFiltersProps) {
  const theme = useTheme();
  const { filters, setFilters, resetFilters } = useSearchStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isRealEstate = filters.category === 'REAL_ESTATE' || filters.category === '';
  const priceConfig = getPriceConfig(filters.category);

  const activeCategoryLabel = CATEGORIES.find((c) => c.value === filters.category)?.label;

  // Vertical variant (sidebar mode)
  if (variant === 'vertical') {
    return (
      <Box
        sx={{
          p: 4,
          bgcolor: theme.md3.surfaceContainerLow,
          borderRadius: '1.5rem',
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 3, color: theme.md3.onSurface }}>
          Bộ lọc tìm kiếm
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Keyword */}
          <Box sx={{ position: 'relative' }}>
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 20, color: theme.md3.onSurfaceVariant, pointerEvents: 'none' }}
            >
              search
            </Box>
            <Box
              component="input"
              placeholder="Tìm kiếm theo từ khóa..."
              value={filters.keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ keyword: e.target.value })}
              sx={{
                width: '100%',
                pl: 5.5,
                pr: 2,
                py: 1.5,
                bgcolor: theme.md3.surfaceContainerHigh,
                border: 'none',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                color: theme.md3.onSurface,
                outline: 'none',
                '&::placeholder': { color: alpha(theme.md3.onSurfaceVariant, 0.5) },
                '&:focus': { boxShadow: `0 0 0 2px ${alpha(theme.md3.primary, 0.2)}` },
              }}
            />
          </Box>

          <FormControl fullWidth size="small">
            <InputLabel>Danh mục</InputLabel>
            <Select value={filters.category} label="Danh mục" onChange={(e) => setFilters({ category: e.target.value })}>
              <MenuItem value="">Tất cả</MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>{cat.icon} {cat.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Giao dịch</InputLabel>
            <Select value={filters.listingType} label="Giao dịch" onChange={(e) => setFilters({ listingType: e.target.value })}>
              <MenuItem value="">Tất cả</MenuItem>
              {LISTING_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {isRealEstate && (
            <FormControl fullWidth size="small">
              <InputLabel>Loại BĐS</InputLabel>
              <Select value={filters.propertyType} label="Loại BĐS" onChange={(e) => setFilters({ propertyType: e.target.value })}>
                <MenuItem value="">Tất cả</MenuItem>
                {PROPERTY_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {!isRealEstate && filters.category !== '' && (
            <FormControl fullWidth size="small">
              <InputLabel>Tình trạng</InputLabel>
              <Select value={filters.condition || ''} label="Tình trạng" onChange={(e) => setFilters({ condition: e.target.value })}>
                <MenuItem value="">Tất cả</MenuItem>
                {ITEM_CONDITIONS.map((cond) => (
                  <MenuItem key={cond.value} value={cond.value}>{cond.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl fullWidth size="small">
            <InputLabel>Thành phố</InputLabel>
            <Select value={filters.city} label="Thành phố" onChange={(e) => setFilters({ city: e.target.value })}>
              <MenuItem value="">Tất cả</MenuItem>
              {VIETNAM_CITIES.map((city) => (
                <MenuItem key={city.code} value={city.name}>{city.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.md3.onSurfaceVariant, mb: 1 }}>Khoảng giá</Typography>
            <Slider
              value={[filters.minPrice || 0, filters.maxPrice || priceConfig.max]}
              onChange={(_, value) => { const [min, max] = value as number[]; setFilters({ minPrice: min, maxPrice: max }); }}
              valueLabelDisplay="auto"
              valueLabelFormat={priceConfig.format}
              min={0} max={priceConfig.max} step={priceConfig.step} marks={priceConfig.marks}
            />
          </Box>

          {isRealEstate && (
            <>
              <Box>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: theme.md3.onSurfaceVariant, mb: 1 }}>Diện tích</Typography>
                <Slider
                  value={[filters.minArea || 0, filters.maxArea || 500]}
                  onChange={(_, value) => { const [min, max] = value as number[]; setFilters({ minArea: min, maxArea: max }); }}
                  valueLabelDisplay="auto" valueLabelFormat={(v) => `${v} m²`}
                  min={0} max={500} step={10}
                />
              </Box>
              <FormControl fullWidth size="small">
                <InputLabel>Phòng ngủ</InputLabel>
                <Select value={filters.bedrooms || ''} label="Phòng ngủ" onChange={(e) => setFilters({ bedrooms: e.target.value ? Number(e.target.value) : null })}>
                  <MenuItem value="">Tất cả</MenuItem>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>{num}+ phòng</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
            <Box
              component="button"
              type="button"
              onClick={() => onSearch?.()}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 1.5,
                background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.75rem',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>search</Box>
              Tìm kiếm
            </Box>
            <Box
              component="button"
              type="button"
              onClick={resetFilters}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 2,
                py: 1.5,
                bgcolor: 'transparent',
                color: theme.md3.onSurfaceVariant,
                border: `1px solid ${alpha(theme.md3.outlineVariant, 0.3)}`,
                borderRadius: '0.75rem',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                '&:hover': { bgcolor: alpha(theme.md3.primary, 0.05) },
              }}
            >
              <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>close</Box>
              Xóa
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Horizontal variant — MD3 chip bar with keyword search
  return (
    <Box>
      {/* Keyword search + chips row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {/* Keyword search input */}
        <Box sx={{ position: 'relative', flexShrink: 0, minWidth: { xs: 180, sm: 240 } }}>
          <Box
            component="span"
            className="material-symbols-outlined"
            sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: theme.md3.onSurfaceVariant, pointerEvents: 'none' }}
          >
            search
          </Box>
          <Box
            component="input"
            placeholder="Từ khóa..."
            value={filters.keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ keyword: e.target.value })}
            onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter') onSearch?.(); }}
            sx={{
              width: '100%',
              pl: 5,
              pr: 2,
              py: 1.25,
              bgcolor: theme.md3.surfaceContainerHigh,
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.85rem',
              fontFamily: 'inherit',
              color: theme.md3.onSurface,
              outline: 'none',
              '&::placeholder': { color: alpha(theme.md3.onSurfaceVariant, 0.5) },
              '&:focus': { boxShadow: `0 0 0 2px ${alpha(theme.md3.primary, 0.2)}` },
            }}
          />
        </Box>

        {/* Active category chip */}
        {filters.category && (
          <FilterChip
            label={activeCategoryLabel || filters.category}
            icon="category"
            active
            onClose={() => setFilters({ category: '', propertyType: '' })}
          />
        )}

        {/* Quick tonal chips */}
        <FilterChip label="Giá" icon="payments" onClick={() => setShowAdvanced((p) => !p)} />
        {isRealEstate && <FilterChip label="Diện tích" icon="straighten" onClick={() => setShowAdvanced((p) => !p)} />}
        {isRealEstate && <FilterChip label="Số phòng ngủ" icon="bed" onClick={() => setShowAdvanced((p) => !p)} />}

        {/* All filters toggle */}
        <FilterChip label="Tất cả bộ lọc" icon="tune" onClick={() => setShowAdvanced((p) => !p)} />
      </Box>

      <AdvancedFilterPanel open={showAdvanced} isRealEstate={isRealEstate} priceConfig={priceConfig} />
    </Box>
  );
}
