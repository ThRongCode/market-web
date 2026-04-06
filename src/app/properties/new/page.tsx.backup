'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { CloudUpload, Delete, Image as ImageIcon } from '@mui/icons-material';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { propertySchema, PropertyFormData } from '@/lib/validations';
import { PROPERTY_TYPES, LISTING_TYPES, VIETNAM_CITIES, CATEGORIES, ITEM_CONDITIONS } from '@/types';

// Check if Cloudinary is configured
const isCloudinaryConfigured = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

interface UploadedImage {
  url: string;
  publicId: string;
}

export default function NewPropertyPage() {
  const router = useRouter();
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
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>
          Đăng tin
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit((data) => createMutation.mutate(data))}>
          {/* Basic Info */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Thông tin cơ bản
          </Typography>

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
          <Typography variant="h6" sx={{ mb: 2 }}>
            Giá & Chi tiết
          </Typography>

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
                  <TextField
                    fullWidth
                    label="Thương hiệu"
                    {...register('brand')}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Model / Mẫu"
                    {...register('model')}
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* Location */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Vị trí
          </Typography>

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
              <TextField
                fullWidth
                label="Phường/Xã (tùy chọn)"
                {...register('ward')}
              />
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
          <Typography variant="h6" sx={{ mb: 2 }}>
            Hình ảnh
          </Typography>

          <Box sx={{ mb: 3 }}>
            {isCloudinaryConfigured ? (
              <CloudinaryUploader
                images={images}
                onUploadSuccess={handleUploadSuccess}
                onRemoveImage={handleRemoveImage}
              />
            ) : (
              <Box
                sx={{
                  p: 3,
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  textAlign: 'center',
                  bgcolor: 'action.hover',
                }}
              >
                <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  Tính năng tải ảnh chưa được cấu hình.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Bạn có thể đăng tin mà không cần hình ảnh.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? <CircularProgress size={24} /> : 'Đăng tin'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

// Cloudinary uploader component - only loaded when configured
interface CloudinaryUploaderProps {
  images: UploadedImage[];
  onUploadSuccess: (result: unknown) => void;
  onRemoveImage: (publicId: string) => void;
}

function CloudinaryUploader({ images, onUploadSuccess, onRemoveImage }: CloudinaryUploaderProps) {
  // Dynamic import to avoid error when Cloudinary is not configured
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
        options={{
          multiple: true,
          maxFiles: 10,
          resourceType: 'image',
        }}
      >
        {({ open }) => (
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => open()}
            sx={{ mb: 2 }}
          >
            Tải ảnh lên
          </Button>
        )}
      </CldUploadWidget>

      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid key={image.publicId} size={{ xs: 6, sm: 4, md: 3 }}>
            <Box sx={{ position: 'relative', paddingTop: '75%' }}>
              <Image
                src={image.url}
                alt="Property image"
                fill
                style={{ objectFit: 'cover', borderRadius: 8 }}
              />
              <Button
                size="small"
                color="error"
                onClick={() => onRemoveImage(image.publicId)}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  minWidth: 'auto',
                  p: 0.5,
                  bgcolor: 'white',
                }}
              >
                <Delete fontSize="small" />
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
