'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  Alert,
  Skeleton,
  Card,
  CardContent,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  Hotel,
  Bathtub,
  SquareFoot,
  Phone,
  Email,
  ChevronLeft,
  ChevronRight,
  Close,
  Flag,
} from '@mui/icons-material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Property, PROPERTY_TYPES, LISTING_TYPES, CATEGORIES, ITEM_CONDITIONS } from '@/types';
import { formatCurrency, formatArea, formatDate } from '@/lib/utils';
import { useFavoritesStore } from '@/lib/store';
import { contactSchema, ContactFormData, reportSchema, ReportFormData } from '@/lib/validations';
import { keyframes } from '@mui/system';

// Shimmer animation for skeleton
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Fade in animation
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

async function fetchProperty(id: string): Promise<Property> {
  const response = await fetch(`/api/properties/${id}`);
  if (!response.ok) throw new Error('Property not found');
  return response.json();
}

// Enhanced loading skeleton component
function PropertyDetailSkeleton() {
  const theme = useTheme();
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Image skeleton with shimmer */}
          <Box
            sx={{
              height: 400,
              borderRadius: 3,
              overflow: 'hidden',
              background: `linear-gradient(90deg, ${alpha(theme.palette.action.hover, 0.3)} 25%, ${alpha(theme.palette.action.hover, 0.5)} 50%, ${alpha(theme.palette.action.hover, 0.3)} 75%)`,
              backgroundSize: '200% 100%',
              animation: `${shimmer} 1.5s infinite`,
            }}
          />
          
          {/* Thumbnail skeletons */}
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            {[1, 2, 3, 4].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 80,
                  height: 60,
                  borderRadius: 1,
                  background: `linear-gradient(90deg, ${alpha(theme.palette.action.hover, 0.3)} 25%, ${alpha(theme.palette.action.hover, 0.5)} 50%, ${alpha(theme.palette.action.hover, 0.3)} 75%)`,
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 1.5s infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </Box>
          
          {/* Title skeleton */}
          <Box sx={{ mt: 3 }}>
            <Skeleton 
              variant="text" 
              height={48} 
              width="80%"
              sx={{ 
                borderRadius: 2,
                animation: `${shimmer} 1.5s infinite`,
              }} 
            />
            <Skeleton variant="text" height={28} width="60%" sx={{ mt: 1 }} />
          </Box>
          
          {/* Info card skeleton */}
          <Paper 
            sx={{ 
              p: 3, 
              mt: 3, 
              borderRadius: 3,
              animation: `${fadeInUp} 0.5s ease-out`,
              animationDelay: '0.2s',
              animationFillMode: 'both',
            }}
          >
            <Skeleton variant="text" height={48} width="40%" />
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {[1, 2, 3, 4].map((i) => (
                <Grid size={{ xs: 6, sm: 3 }} key={i}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" height={20} width="60%" sx={{ mt: 1 }} />
                  <Skeleton variant="text" height={24} width="40%" />
                </Grid>
              ))}
            </Grid>
          </Paper>
          
          {/* Description skeleton */}
          <Paper 
            sx={{ 
              p: 3, 
              mt: 3, 
              borderRadius: 3,
              animation: `${fadeInUp} 0.5s ease-out`,
              animationDelay: '0.3s',
              animationFillMode: 'both',
            }}
          >
            <Skeleton variant="text" height={32} width="30%" />
            <Skeleton variant="text" height={20} width="100%" sx={{ mt: 2 }} />
            <Skeleton variant="text" height={20} width="95%" />
            <Skeleton variant="text" height={20} width="90%" />
            <Skeleton variant="text" height={20} width="85%" />
          </Paper>
        </Grid>
        
        {/* Sidebar skeleton */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              animation: `${fadeInUp} 0.5s ease-out`,
              animationDelay: '0.4s',
              animationFillMode: 'both',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Skeleton variant="circular" width={64} height={64} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" height={28} width="80%" />
                <Skeleton variant="text" height={20} width="60%" />
              </Box>
            </Box>
            <Skeleton variant="rounded" height={48} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" height={48} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function PropertyDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const propertyId = params.id as string;
  const theme = useTheme();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => fetchProperty(propertyId),
  });

  const favorited = property ? isFavorite(property.id) : false;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, propertyId }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    },
    onSuccess: () => {
      setContactSuccess(true);
      reset();
      setTimeout(() => {
        setContactOpen(false);
        setContactSuccess(false);
      }, 2000);
    },
  });

  const {
    register: registerReport,
    handleSubmit: handleReportSubmit,
    reset: resetReport,
    formState: { errors: reportErrors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: { propertyId },
  });

  const reportMutation = useMutation({
    mutationFn: async (data: ReportFormData) => {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit report');
      return response.json();
    },
    onSuccess: () => {
      setReportSuccess(true);
      resetReport();
      setTimeout(() => {
        setReportOpen(false);
        setReportSuccess(false);
      }, 2000);
    },
  });

  const handleFavoriteToggle = async () => {
    if (!property) return;
    
    if (favorited) {
      removeFavorite(property.id);
      await fetch(`/api/favorites?propertyId=${property.id}`, { method: 'DELETE' });
    } else {
      addFavorite(property.id);
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId: property.id }),
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return <PropertyDetailSkeleton />;
  }

  if (error || !property) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error"
          sx={{
            animation: `${fadeInUp} 0.5s ease-out`,
            borderRadius: 2,
          }}
        >
          Không tìm thấy tin đăng này
        </Alert>
      </Container>
    );
  }

  const propertyTypeLabel = PROPERTY_TYPES.find(t => t.value === property.propertyType)?.label;
  const listingTypeLabel = LISTING_TYPES.find(t => t.value === property.listingType)?.label;
  const categoryInfo = CATEGORIES.find(c => c.value === property.category);
  const conditionLabel = ITEM_CONDITIONS.find(c => c.value === property.condition)?.label;
  const isRealEstate = property.category === 'REAL_ESTATE';
  const images = property.images?.length > 0 
    ? property.images 
    : [{ id: '1', url: '/placeholder-property.jpg', propertyId: property.id }];

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Image Gallery */}
          <Box sx={{ position: 'relative', mb: 3 }}>
            <Box
              sx={{
                position: 'relative',
                height: 400,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={images[selectedImage]?.url || '/placeholder-property.jpg'}
                alt={property.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <Chip
                label={listingTypeLabel}
                color={property.listingType === 'SALE' ? 'primary' : 'secondary'}
                sx={{ position: 'absolute', top: 16, left: 16 }}
              />
            </Box>
            
            {/* Thumbnails */}
            {images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, mt: 1, overflowX: 'auto' }}>
                {images.map((image, index) => (
                  <Box
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 80,
                      height: 60,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === index ? 2 : 0,
                      borderColor: 'primary.main',
                      opacity: selectedImage === index ? 1 : 0.7,
                    }}
                  >
                    <Image
                      src={image.url}
                      alt=""
                      width={80}
                      height={60}
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Title & Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {property.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: 'text.secondary' }}>
                <LocationOn sx={{ mr: 0.5 }} />
                <Typography>
                  {property.address}, {property.ward && `${property.ward}, `}
                  {property.district}, {property.city}
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton onClick={handleFavoriteToggle}>
                {favorited ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <IconButton onClick={handleShare}>
                <Share />
              </IconButton>
            </Box>
          </Box>

          {/* Price & Key Info */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" color="primary" fontWeight="bold" sx={{ mb: 2 }}>
              {formatCurrency(property.price)}
              {property.listingType === 'RENT' && '/tháng'}
            </Typography>
            <Grid container spacing={3}>
              {/* Category */}
              {categoryInfo && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Danh mục</Typography>
                    <Typography fontWeight="medium">{categoryInfo.icon} {categoryInfo.label}</Typography>
                  </Box>
                </Grid>
              )}
              {/* Real Estate fields */}
              {isRealEstate && property.area && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SquareFoot sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Diện tích</Typography>
                      <Typography fontWeight="medium">{formatArea(property.area)}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
              {isRealEstate && property.bedrooms != null && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Hotel sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phòng ngủ</Typography>
                      <Typography fontWeight="medium">{property.bedrooms}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
              {isRealEstate && property.bathrooms != null && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Bathtub sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phòng tắm</Typography>
                      <Typography fontWeight="medium">{property.bathrooms}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
              {isRealEstate && propertyTypeLabel && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Loại BĐS</Typography>
                    <Typography fontWeight="medium">{propertyTypeLabel}</Typography>
                  </Box>
              </Grid>
              )}
              {/* Non-RE fields */}
              {!isRealEstate && conditionLabel && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Tình trạng</Typography>
                    <Typography fontWeight="medium">{conditionLabel}</Typography>
                  </Box>
                </Grid>
              )}
              {!isRealEstate && property.brand && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Thương hiệu</Typography>
                    <Typography fontWeight="medium">{property.brand}</Typography>
                  </Box>
                </Grid>
              )}
              {!isRealEstate && property.model && (
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Model</Typography>
                    <Typography fontWeight="medium">{property.model}</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>

          {/* Description */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Mô tả chi tiết
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
              {property.description}
            </Typography>
          </Paper>

          {/* Listing Info */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Ngày đăng: {formatDate(property.createdAt)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mã tin: {property.id}
            </Typography>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Contact Card */}
          <Card sx={{ mb: 3, position: 'sticky', top: 80 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={property.user?.image || undefined}
                  sx={{ width: 56, height: 56, mr: 2 }}
                >
                  {property.user?.name?.[0]?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography fontWeight="bold">{property.user?.name || 'Chủ sở hữu'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Chủ tin đăng
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {property.user?.phone && (
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Phone />}
                  href={`tel:${property.user.phone}`}
                  sx={{ mb: 1 }}
                >
                  {property.user.phone}
                </Button>
              )}

              <Button
                variant="outlined"
                fullWidth
                startIcon={<Email />}
                onClick={() => setContactOpen(true)}
                disabled={!session}
              >
                Gửi tin nhắn
              </Button>

              {!session && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                  Đăng nhập để gửi tin nhắn
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Button
                variant="text"
                fullWidth
                size="small"
                color="warning"
                startIcon={<Flag />}
                onClick={() => setReportOpen(true)}
                disabled={!session}
              >
                Báo cáo tin đăng
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} maxWidth="lg" fullWidth>
        <DialogContent sx={{ p: 0, position: 'relative', bgcolor: 'black' }}>
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 1 }}
          >
            <Close />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>
            <IconButton
              onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              sx={{ color: 'white' }}
            >
              <ChevronLeft fontSize="large" />
            </IconButton>
            <Box sx={{ position: 'relative', width: '80%', height: 500 }}>
              <Image
                src={images[selectedImage]?.url || '/placeholder-property.jpg'}
                alt={property.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <IconButton
              onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              sx={{ color: 'white' }}
            >
              <ChevronRight fontSize="large" />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onClose={() => setContactOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Liên hệ chủ tin đăng
          </Typography>

          {contactSuccess ? (
            <Alert severity="success">Tin nhắn đã được gửi thành công!</Alert>
          ) : (
            <form onSubmit={handleSubmit((data) => contactMutation.mutate(data))}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Nội dung tin nhắn"
                {...register('content')}
                error={!!errors.content}
                helperText={errors.content?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Số điện thoại (tùy chọn)"
                {...register('phone')}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email (tùy chọn)"
                type="email"
                {...register('email')}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={contactMutation.isPending}
              >
                Gửi tin nhắn
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={reportOpen} onClose={() => setReportOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Báo cáo tin đăng
          </Typography>

          {reportSuccess ? (
            <Alert severity="success">Báo cáo đã được gửi. Cảm ơn bạn!</Alert>
          ) : (
            <form onSubmit={handleReportSubmit((data) => reportMutation.mutate(data))}>
              <input type="hidden" {...registerReport('propertyId')} />
              <TextField
                fullWidth
                label="Lý do báo cáo"
                placeholder="VD: Thông tin không chính xác, tin giả..."
                {...registerReport('reason')}
                error={!!reportErrors.reason}
                helperText={reportErrors.reason?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Chi tiết (tùy chọn)"
                {...registerReport('details')}
                error={!!reportErrors.details}
                helperText={reportErrors.details?.message}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="warning"
                fullWidth
                disabled={reportMutation.isPending}
              >
                Gửi báo cáo
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
