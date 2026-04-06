'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Paper,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowForward,
  Verified,
  Speed,
  LocalOffer,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { CATEGORIES } from '@/types';
import { useSettingsStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { gradients } from '@/lib/theme';

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { language } = useSettingsStore();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Speed,
      title: language === 'vi' ? 'Nhanh chóng' : 'Fast',
      description: language === 'vi' 
        ? 'Tìm kiếm và đăng tin trong vài giây' 
        : 'Search and post in seconds',
      gradient: gradients.info,
    },
    {
      icon: Verified,
      title: language === 'vi' ? 'An toàn' : 'Secure',
      description: language === 'vi' 
        ? 'Thông tin xác minh, giao dịch minh bạch' 
        : 'Verified listings, transparent transactions',
      gradient: gradients.success,
    },
    {
      icon: LocalOffer,
      title: language === 'vi' ? 'Giá tốt' : 'Great Prices',
      description: language === 'vi' 
        ? 'So sánh giá, tìm sản phẩm phù hợp ngân sách' 
        : 'Compare prices, find the best deals for your budget',
      gradient: gradients.warning,
    },
  ];

  const trendingSearches = [
    { label: language === 'vi' ? 'Căn hộ Quận 7' : 'District 7 Apartment', href: '/search?category=REAL_ESTATE&propertyType=APARTMENT' },
    { label: language === 'vi' ? 'Xe máy Honda' : 'Honda Motorcycle', href: '/search?category=VEHICLES&keyword=Honda' },
    { label: language === 'vi' ? 'iPhone' : 'iPhone', href: '/search?category=ELECTRONICS&keyword=iPhone' },
    { label: language === 'vi' ? 'Nhà riêng Hà Nội' : 'House in Hanoi', href: '/search?category=REAL_ESTATE&city=Hà Nội' },
  ];

  return (
    <Box>
      {/* Hero Section - Modern Gradient */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '85vh', md: '92vh' },
          display: 'flex',
          alignItems: 'center',
          background: theme.palette.mode === 'dark'
            ? gradients.heroDark
            : gradients.hero,
          overflow: 'hidden',
        }}
      >
        {/* Animated gradient orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '-5%',
            width: { xs: 300, md: 500 },
            height: { xs: 300, md: 500 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '-10%',
            width: { xs: 350, md: 600 },
            height: { xs: 350, md: 600 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            right: '20%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'float 6s ease-in-out infinite 2s',
          }}
        />

        {/* Grid pattern overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 900, mx: 'auto' }}>
            <Box
              sx={{
                animation: mounted ? 'fadeInUp 0.8s ease-out' : 'none',
                opacity: mounted ? 1 : 0,
              }}
            >
              {/* Badge */}
              <Chip
                label={language === 'vi' ? '✨ Chợ trực tuyến hàng đầu Việt Nam' : '✨ #1 Online Marketplace'}
                sx={{
                  mb: 4,
                  py: 2.5,
                  px: 1,
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  '& .MuiChip-label': { px: 2 },
                }}
              />

              {/* Main Heading */}
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  color: 'white',
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  textShadow: '0 4px 30px rgba(0,0,0,0.3)',
                }}
              >
                {language === 'vi' ? 'Mua Bán Mọi Thứ' : 'Buy & Sell Everything'}
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    mt: 1,
                    background: 'linear-gradient(90deg, #fcd34d, #f472b6, #818cf8)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradientShift 3s ease infinite',
                  }}
                >
                  {language === 'vi' ? 'Dễ Dàng & Nhanh Chóng' : 'Easy & Fast'}
                </Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 5,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: 650,
                  mx: 'auto',
                }}
              >
                {language === 'vi'
                  ? 'Bất động sản, xe cộ, điện tử, thời trang - tất cả trong một nơi'
                  : 'Real estate, vehicles, electronics, fashion - all in one place'}
              </Typography>

              {/* Search Box */}
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  borderRadius: 4,
                  bgcolor: alpha('#ffffff', 0.98),
                  boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
                  maxWidth: 700,
                  mx: 'auto',
                  mb: 4,
                }}
              >
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder={language === 'vi' 
                      ? 'Bạn muốn tìm gì hôm nay?' 
                      : 'What are you looking for today?'}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        border: 'none',
                        bgcolor: 'transparent',
                        '& fieldset': { border: 'none' },
                        '&:hover fieldset': { border: 'none' },
                        '&.Mui-focused fieldset': { border: 'none' },
                        boxShadow: 'none !important',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '1.1rem',
                        py: 1.5,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'text.secondary', fontSize: 28 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    component={Link}
                    href={`/search${searchKeyword ? `?keyword=${searchKeyword}` : ''}`}
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      borderRadius: 3,
                      minWidth: 140,
                      background: gradients.primary,
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                    }}
                  >
                    {language === 'vi' ? 'Tìm kiếm' : 'Search'}
                  </Button>
                </Box>
              </Paper>

              {/* Trending Searches */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }}>
                  {language === 'vi' ? 'Xu hướng:' : 'Trending:'}
                </Typography>
                {trendingSearches.slice(0, 4).map((item) => (
                  <Chip
                    key={item.label}
                    component={Link}
                    href={item.href}
                    label={item.label}
                    clickable
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.25)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'float 2s ease-in-out infinite',
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 50,
              borderRadius: 15,
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex',
              justifyContent: 'center',
              pt: 1,
            }}
          >
            <Box
              sx={{
                width: 4,
                height: 10,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.6)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, mt: -8, position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            bgcolor: 'background.paper',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              {language === 'vi' ? 'Danh Mục' : 'Categories'}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500, mx: 'auto' }}
            >
              {language === 'vi'
                ? 'Khám phá hàng nghìn tin đăng theo danh mục'
                : 'Explore thousands of listings by category'}
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {CATEGORIES.map((cat, index) => (
              <Grid key={cat.value} size={{ xs: 6, sm: 4, md: 3, lg: 'auto' }} sx={{ flex: { lg: 1 } }}>
                <Box
                  component={Link}
                  href={`/search?category=${cat.value}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                    borderRadius: 4,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: mounted ? `fadeInUp 0.5s ease-out ${index * 0.05}s both` : 'none',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      '& .category-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                      '& .category-label': {
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <Box
                    className="category-icon"
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '22px',
                      background: gradients.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      fontSize: '2rem',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.25)}`,
                    }}
                  >
                    {cat.icon}
                  </Box>
                  <Typography
                    className="category-label"
                    variant="body2"
                    fontWeight={600}
                    color="text.primary"
                    textAlign="center"
                    sx={{ transition: 'all 0.3s ease' }}
                  >
                    {language === 'en' ? cat.labelEn : cat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #0a0a0f 0%, #16161f 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              {language === 'vi' ? 'Tại Sao Chọn Chúng Tôi?' : 'Why Choose Us?'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
              {language === 'vi'
                ? 'Trải nghiệm mua bán trực tuyến tốt nhất cho bạn'
                : 'The best online buying and selling experience for you'}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 4,
                    textAlign: 'center',
                    animation: mounted ? `fadeInUp 0.6s ease-out ${index * 0.15}s both` : 'none',
                    position: 'relative',
                    overflow: 'visible',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: feature.gradient,
                      borderRadius: '24px 24px 0 0',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '24px',
                      background: feature.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <feature.icon sx={{ fontSize: 36, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Popular Categories Quick Links */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Box>
            <Typography variant="h3" component="h2" fontWeight={700} sx={{ mb: 1 }}>
              🔥 {language === 'vi' ? 'Phổ Biến Nhất' : 'Most Popular'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {language === 'vi' 
                ? 'Các danh mục được tìm kiếm nhiều nhất' 
                : 'Most searched categories'}
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/search"
            endIcon={<KeyboardArrowRight />}
            sx={{ 
              fontWeight: 600,
              '&:hover': { transform: 'translateX(4px)' },
            }}
          >
            {language === 'vi' ? 'Xem tất cả' : 'View all'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          {CATEGORIES.slice(0, 6).map((cat, index) => (
            <Grid key={cat.value} size={{ xs: 6, sm: 4, md: 2 }}>
              <Paper
                component={Link}
                href={`/search?category=${cat.value}`}
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 4,
                  textDecoration: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  animation: mounted ? `fadeInUp 0.5s ease-out ${index * 0.08}s both` : 'none',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.15)}`,
                  },
                }}
              >
                <Typography variant="h5" sx={{ mb: 1 }}>{cat.icon}</Typography>
                <Typography variant="body1" fontWeight={600} color="text.primary">
                  {language === 'en' ? cat.labelEn : cat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          background: gradients.hero,
          overflow: 'hidden',
        }}
      >
        {/* Animated shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(236,72,153,0.2)',
            filter: 'blur(80px)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              mb: 3,
              fontWeight: 800,
            }}
          >
            {language === 'vi' 
              ? 'Sẵn Sàng Bắt Đầu?' 
              : 'Ready to Get Started?'}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              mb: 5,
              fontWeight: 400,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            {language === 'vi'
              ? 'Đăng tin miễn phí ngay hôm nay và tiếp cận người mua tiềm năng'
              : 'Post for free today and reach potential buyers'}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/properties/new"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.95)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                },
              }}
            >
              {language === 'vi' ? 'Đăng tin ngay' : 'Post Now'}
            </Button>
            <Button
              component={Link}
              href="/search"
              variant="outlined"
              size="large"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                borderWidth: 2,
                px: 5,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderWidth: 2,
                },
              }}
            >
              {language === 'vi' ? 'Khám phá' : 'Explore'}
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { value: String(CATEGORIES.length), label: language === 'vi' ? 'Danh mục' : 'Categories' },
            { value: '🛒', label: language === 'vi' ? 'Mua & Bán' : 'Buy & Sell' },
            { value: '📍', label: language === 'vi' ? 'Toàn quốc' : 'Nationwide' },
            { value: '24/7', label: language === 'vi' ? 'Hỗ trợ' : 'Support' },
          ].map((stat, index) => (
            <Grid key={index} size={{ xs: 6, md: 3 }}>
              <Box 
                sx={{ 
                  textAlign: 'center',
                  animation: mounted ? `fadeInUp 0.5s ease-out ${index * 0.1}s both` : 'none',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    background: gradients.primary,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight={500}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
