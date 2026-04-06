'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  InputAdornment,
  alpha,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { propertySchema, PropertyFormData } from '@/lib/validations';
import { PROPERTY_TYPES, LISTING_TYPES, VIETNAM_CITIES, CATEGORIES, ITEM_CONDITIONS } from '@/types';

const isCloudinaryConfigured = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

interface UploadedImage {
  url: string;
  publicId: string;
}

// ===========================================
// Sub-components (SRP)
// ===========================================

/** Section header with Material Symbol icon */
function SectionHeader({ icon, label }: { icon: string; label: string }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, mt: 4 }}>
      <Box
        component="span"
        className="material-symbols-outlined"
        sx={{ fontSize: 22, color: theme.md3.primary }}
      >
        {icon}
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: theme.md3.onSurface }}>
        {label}
      </Typography>
    </Box>
  );
}

/** Image placeholder when Cloudinary is not configured */
function ImagePlaceholder() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 5,
        border: `2px dashed ${alpha(theme.md3.outlineVariant, 0.3)}`,
        borderRadius: '1.5rem',
        textAlign: 'center',
        bgcolor: theme.md3.surfaceContainerLow,
      }}
    >
      <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 48, color: theme.md3.outlineVariant, display: 'block', mb: 1 }}>
        add_photo_alternate
      </Box>
      <Typography sx={{ color: theme.md3.onSurfaceVariant, fontSize: '0.9rem' }}>
        Tính năng tải ảnh chưa được cấu hình.
      </Typography>
      <Typography sx={{ color: theme.md3.outline, fontSize: '0.8rem', mt: 0.5 }}>
        Bạn có thể đăng tin mà không cần hình ảnh.
      </Typography>
    </Box>
  );
}

/** Cloudinary uploader component */
function CloudinaryUploader({
  images,
  onUploadSuccess,
  onRemoveImage,
}: {
  images: UploadedImage[];
  onUploadSuccess: (result: unknown) => void;
  onRemoveImage: (publicId: string) => void;
}) {
  const theme = useTheme();
  const [CldUploadWidget, setCldUploadWidget] = useState<React.ComponentType<{
    uploadPreset?: string;
    onSuccess: (result: unknown) => void;
    options: Record<string, unknown>;
    children: (props: { open: () => void }) => React.ReactNode;
  }> | null>(null);

  useEffect(() => {
    import('next-cloudinary').then((mod) => {
      setCldUploadWidget(() => mod.CldUploadWidget);
    });
  }, []);

  if (!CldUploadWidget) {
    return <CircularProgress size={24} />;
  }

  return (
    <>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={onUploadSuccess}
        options={{ multiple: true, maxFiles: 10, resourceType: 'image' }}
      >
        {({ open }) => (
          <Box
            component="button"
            type="button"
            onClick={() => open()}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.5,
              bgcolor: 'transparent',
              color: theme.md3.primary,
              border: `1px solid ${alpha(theme.md3.outlineVariant, 0.3)}`,
              borderRadius: '0.75rem',
              fontFamily: 'inherit',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              mb: 2,
              '&:hover': { bgcolor: alpha(theme.md3.primary, 0.05) },
            }}
          >
            <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>cloud_upload</Box>
            Tải ảnh lên
          </Box>
        )}
      </CldUploadWidget>

      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid key={image.publicId} size={{ xs: 6, sm: 4, md: 3 }}>
            <Box sx={{ position: 'relative', paddingTop: '75%', borderRadius: '1rem', overflow: 'hidden' }}>
              <Image src={image.url} alt="Property image" fill style={{ objectFit: 'cover' }} />
              <Box
                component="button"
                type="button"
                onClick={() => onRemoveImage(image.publicId)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 16 }}>close</Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

// ===========================================
// Main Page
// ===========================================

export default function NewPropertyPage() {
  const router = useRouter();
  const theme = useTheme();
  const { data: session, status } = useSession();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/properties/new');
    }
  }, [status, router]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      category: 'REAL_ESTATE',
      bedrooms: 1,
      bathrooms: 1,
      propertyType: 'APARTMENT',
      listingType: 'SALE',
    },
  });

  const selectedCategory = watch('category');

  const createMutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, images }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create property');
      }
      return response.json();
    },
    onSuccess: (data) => {
      router.push(`/properties/${data.id}`);
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleUploadSuccess = (result: unknown) => {
    const uploadResult = result as { info?: { secure_url?: string; public_id?: string } };
    if (uploadResult.info?.secure_url && uploadResult.info?.public_id) {
      setImages((prev) => [
        ...prev,
        { url: uploadResult.info!.secure_url!, publicId: uploadResult.info!.public_id! },
      ]);
    }
  };

  const handleRemoveImage = (publicId: string) => {
    setImages((prev) => prev.filter((img) => img.publicId !== publicId));
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto' }}>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: theme.md3.onSurface, mb: 1 }}>
        Đăng tin
      </Typography>
      <Typography sx={{ color: theme.md3.onSurfaceVariant, mb: 4 }}>
        Tạo tin đăng mới để tiếp cận hàng triệu người dùng
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit((data) => createMutation.mutate(data))}
        sx={{
          bgcolor: theme.md3.surfaceContainerLowest,
          p: { xs: 3, md: 5 },
          borderRadius: '1.5rem',
          border: `1px solid ${alpha(theme.md3.outlineVariant, 0.1)}`,
        }}
      >
        {/* Basic Info */}
        <SectionHeader icon="edit_note" label="Thông tin cơ bản" />

        <TextField
          fullWidth
          label="Tiêu đề tin đăng"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Mô tả chi tiết"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{ mb: 2 }}
        />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Danh mục</InputLabel>
                  <Select {...field} label="Danh mục">
                    {CATEGORIES.map((cat) => (
                      <MenuItem key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="listingType"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Loại giao dịch</InputLabel>
                  <Select {...field} label="Loại giao dịch">
                    {LISTING_TYPES.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          {selectedCategory === 'REAL_ESTATE' && (
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller
                name="propertyType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Loại bất động sản</InputLabel>
                    <Select {...field} label="Loại bất động sản">
                      {PROPERTY_TYPES.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          )}
        </Grid>

        {/* Price & Details */}
        <SectionHeader icon="payments" label="Giá & Chi tiết" />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Giá"
              type="number"
              {...register('price', { valueAsNumber: true })}
              error={!!errors.price}
              helperText={errors.price?.message}
              InputProps={{
                endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
              }}
            />
          </Grid>
          {selectedCategory === 'REAL_ESTATE' && (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Diện tích"
                  type="number"
                  {...register('area', { valueAsNumber: true })}
                  error={!!errors.area}
                  helperText={errors.area?.message}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <TextField
                  fullWidth
                  label="Phòng ngủ"
                  type="number"
                  {...register('bedrooms', { valueAsNumber: true })}
                  error={!!errors.bedrooms}
                  helperText={errors.bedrooms?.message}
                />
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <TextField
                  fullWidth
                  label="Phòng tắm"
                  type="number"
                  {...register('bathrooms', { valueAsNumber: true })}
                  error={!!errors.bathrooms}
                  helperText={errors.bathrooms?.message}
                />
              </Grid>
            </>
          )}
          {selectedCategory !== 'REAL_ESTATE' && (
            <>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="condition"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Tình trạng</InputLabel>
                      <Select {...field} value={field.value || ''} label="Tình trạng">
                        <MenuItem value="">Không xác định</MenuItem>
                        {ITEM_CONDITIONS.map((cond) => (
                          <MenuItem key={cond.value} value={cond.value}>
                            {cond.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Thương hiệu" {...register('brand')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Model / Mẫu" {...register('model')} />
              </Grid>
            </>
          )}
        </Grid>

        {/* Location */}
        <SectionHeader icon="location_on" label="Vị trí" />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.city}>
                  <InputLabel>Thành phố</InputLabel>
                  <Select {...field} label="Thành phố">
                    {VIETNAM_CITIES.map((city) => (
                      <MenuItem key={city.code} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Quận/Huyện"
              {...register('district')}
              error={!!errors.district}
              helperText={errors.district?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="Phường/Xã (tùy chọn)" {...register('ward')} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Địa chỉ cụ thể"
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Vĩ độ (tùy chọn)"
              type="number"
              inputProps={{ step: 'any' }}
              {...register('latitude', { valueAsNumber: true })}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Kinh độ (tùy chọn)"
              type="number"
              inputProps={{ step: 'any' }}
              {...register('longitude', { valueAsNumber: true })}
            />
          </Grid>
        </Grid>

        {/* Images */}
        <SectionHeader icon="photo_library" label="Hình ảnh" />

        <Box sx={{ mb: 4 }}>
          {isCloudinaryConfigured ? (
            <CloudinaryUploader
              images={images}
              onUploadSuccess={handleUploadSuccess}
              onRemoveImage={handleRemoveImage}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </Box>

        {/* Submit */}
        <Box
          component="button"
          type="submit"
          disabled={createMutation.isPending}
          sx={{
            width: '100%',
            py: 2,
            background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1.05rem',
            fontFamily: 'inherit',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: createMutation.isPending ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            boxShadow: '0 4px 16px rgba(70, 72, 212, 0.2)',
            opacity: createMutation.isPending ? 0.7 : 1,
            '&:active': { transform: 'scale(0.95)' },
            '&:hover': { boxShadow: '0 8px 24px rgba(70, 72, 212, 0.3)' },
          }}
        >
          {createMutation.isPending ? (
            <CircularProgress size={24} sx={{ color: '#ffffff' }} />
          ) : (
            <>
              <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>publish</Box>
              Đăng tin
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
