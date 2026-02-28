'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Paper,
  Collapse,
  InputAdornment,
  Slider,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useSearchStore } from '@/lib/store';
import { PROPERTY_TYPES, LISTING_TYPES, VIETNAM_CITIES, CATEGORIES, ITEM_CONDITIONS } from '@/types';

interface SearchFiltersProps {
  onSearch?: () => void;
  variant?: 'horizontal' | 'vertical';
}

export default function SearchFilters({
  onSearch,
  variant = 'horizontal',
}: SearchFiltersProps) {
  const { filters, setFilters, resetFilters } = useSearchStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isRealEstate = filters.category === 'REAL_ESTATE' || filters.category === '';

  // Category-aware price ranges
  const getPriceConfig = () => {
    switch (filters.category) {
      case 'ELECTRONICS':
        return { max: 200000000, step: 5000000, marks: [
          { value: 0, label: '0' },
          { value: 50000000, label: '50tr' },
          { value: 100000000, label: '100tr' },
          { value: 200000000, label: '200tr+' },
        ], format: (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(0)} tr` : `${v.toLocaleString()}` };
      case 'VEHICLES':
        return { max: 5000000000, step: 100000000, marks: [
          { value: 0, label: '0' },
          { value: 1000000000, label: '1 tỷ' },
          { value: 3000000000, label: '3 tỷ' },
          { value: 5000000000, label: '5 tỷ+' },
        ], format: (v: number) => v >= 1000000000 ? `${(v / 1000000000).toFixed(1)} tỷ` : `${(v / 1000000).toFixed(0)} tr` };
      case 'FASHION':
        return { max: 100000000, step: 1000000, marks: [
          { value: 0, label: '0' },
          { value: 10000000, label: '10tr' },
          { value: 50000000, label: '50tr' },
          { value: 100000000, label: '100tr+' },
        ], format: (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(0)} tr` : `${v.toLocaleString()}` };
      case 'SPORTS':
      case 'HOME_GARDEN':
        return { max: 500000000, step: 10000000, marks: [
          { value: 0, label: '0' },
          { value: 100000000, label: '100tr' },
          { value: 300000000, label: '300tr' },
          { value: 500000000, label: '500tr+' },
        ], format: (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(0)} tr` : `${v.toLocaleString()}` };
      case 'JOBS':
      case 'SERVICES':
        return { max: 200000000, step: 5000000, marks: [
          { value: 0, label: '0' },
          { value: 50000000, label: '50tr' },
          { value: 100000000, label: '100tr' },
          { value: 200000000, label: '200tr+' },
        ], format: (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(0)} tr` : `${v.toLocaleString()}` };
      default: // REAL_ESTATE, OTHER, or empty (all)
        return { max: 20000000000, step: 500000000, marks: [
          { value: 0, label: '0' },
          { value: 5000000000, label: '5 tỷ' },
          { value: 10000000000, label: '10 tỷ' },
          { value: 20000000000, label: '20 tỷ+' },
        ], format: (v: number) => `${(v / 1000000000).toFixed(1)} tỷ` };
    }
  };

  const priceConfig = getPriceConfig();

  const areaMarks = [
    { value: 0, label: '0' },
    { value: 100, label: '100m²' },
    { value: 200, label: '200m²' },
    { value: 500, label: '500m²+' },
  ];

  if (variant === 'vertical') {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Bộ lọc tìm kiếm
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Tìm kiếm theo từ khóa..."
            value={filters.keyword}
            onChange={(e) => setFilters({ keyword: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth size="small">
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={filters.category}
              label="Danh mục"
              onChange={(e) => setFilters({ category: e.target.value })}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Loại giao dịch</InputLabel>
            <Select
              value={filters.listingType}
              label="Loại giao dịch"
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

          {isRealEstate && (
            <FormControl fullWidth size="small">
              <InputLabel>Loại bất động sản</InputLabel>
              <Select
                value={filters.propertyType}
                label="Loại bất động sản"
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

          <Box>
            <Typography variant="body2" gutterBottom>
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

          {isRealEstate && (
            <>
              <Box>
                <Typography variant="body2" gutterBottom>
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
                  marks={areaMarks}
                />
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel>Số phòng ngủ</InputLabel>
                <Select
                  value={filters.bedrooms || ''}
                  label="Số phòng ngủ"
                  onChange={(e) =>
                    setFilters({ bedrooms: e.target.value ? Number(e.target.value) : null })
                  }
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}+ phòng
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={() => onSearch?.()}
            >
              Tìm kiếm
            </Button>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={resetFilters}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, md: 2.5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Tìm kiếm..."
            value={filters.keyword}
            onChange={(e) => setFilters({ keyword: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
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
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
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
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
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
        </Grid>

        <Grid size={{ xs: 6, md: 3.5 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={() => onSearch?.()}
              fullWidth
            >
              Tìm kiếm
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <FilterIcon />
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Collapse in={showAdvanced}>
        <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: isRealEstate ? 3 : 4 }}>
              <Typography variant="body2" gutterBottom>
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
              />
            </Grid>

            {isRealEstate && (
              <>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography variant="body2" gutterBottom>
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
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Phòng ngủ</InputLabel>
                    <Select
                      value={filters.bedrooms || ''}
                      label="Phòng ngủ"
                      onChange={(e) =>
                        setFilters({ bedrooms: e.target.value ? Number(e.target.value) : null })
                      }
                    >
                      <MenuItem value="">Tất cả</MenuItem>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}+
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            {!isRealEstate && filters.category !== '' && (
              <Grid size={{ xs: 12, md: 3 }}>
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
              </Grid>
            )}

            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                fullWidth
                variant="text"
                startIcon={<ClearIcon />}
                onClick={resetFilters}
              >
                Xóa bộ lọc
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
}
