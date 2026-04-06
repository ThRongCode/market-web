'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Skeleton, alpha } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { CATEGORIES, Property, PaginatedResponse } from '@/types';
import { PropertyCard } from '@/components/property';
import { useSettingsStore } from '@/lib/store';
import { gradients } from '@/lib/theme';
import { keyframes } from '@mui/system';

// ===========================================
// Animations
// ===========================================

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// ===========================================
// Data Fetchers
// ===========================================

async function fetchFeaturedListings(): Promise<PaginatedResponse<Property>> {
  const response = await fetch('/api/properties?pageSize=8&page=1');
  if (!response.ok) throw new Error('Failed to fetch listings');
  return response.json();
}

async function fetchStats(): Promise<{ totalListings: number; totalUsers: number; totalCategories: number }> {
  const response = await fetch('/api/properties?pageSize=1');
  if (!response.ok) throw new Error('Failed to fetch stats');
  const data = await response.json();
  return { totalListings: data.total, totalUsers: 0, totalCategories: CATEGORIES.length };
}

// ===========================================
// Trending chips data
// ===========================================

const TRENDING_CHIPS = [
  { label: 'Căn hộ Quận 7', keyword: 'Căn hộ Quận 7' },
  { label: 'Nhà phố Thủ Đức', keyword: 'Nhà phố Thủ Đức' },
  { label: 'Toyota Camry', keyword: 'Toyota Camry' },
  { label: 'iPhone 15 Pro', keyword: 'iPhone 15 Pro' },
  { label: 'MacBook Pro M3', keyword: 'MacBook Pro M3' },
  { label: 'Xe Wave Alpha', keyword: 'Xe Wave Alpha' },
];

// ===========================================
// Sub-components (Single Responsibility)
// ===========================================

/** Hero banner with search + trending chips + CTA */
function HeroSection({ language }: { language: 'vi' | 'en' }) {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchKeyword.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 3, md: 4 } }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 380, md: 480 },
          borderRadius: '1.5rem',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          px: { xs: 3, md: 8 },
          py: { xs: 4, md: 6 },
          background: gradients.hero,
        }}
      >
        {/* Background image overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 640, width: '100%' }}>
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              px: 1.5,
              py: 0.5,
              borderRadius: '9999px',
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            {language === 'vi' ? 'Nền tảng mua bán hàng đầu' : "Vietnam's Premium Market"}
          </Box>
          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              mb: 2,
            }}
          >
            {language === 'vi' ? 'Mua bán, trao đổi dễ dàng' : 'Buy, sell, trade easily'}
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 500,
              mb: 4,
            }}
          >
            {language === 'vi'
              ? 'Nền tảng mua bán trực tuyến hàng đầu Việt Nam với hàng ngàn sản phẩm đa dạng'
              : 'Vietnamese online marketplace for the modern digital curator.'}
          </Typography>

          {/* Search box */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              gap: 1,
              mb: 3,
              bgcolor: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              borderRadius: '0.75rem',
              p: 0.75,
            }}
          >
            <Box
              component="input"
              value={searchKeyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
              placeholder={language === 'vi' ? 'Tìm kiếm sản phẩm, danh mục...' : 'Search products, categories...'}
              sx={{
                flex: 1,
                px: 2.5,
                py: 1.5,
                bgcolor: 'rgba(255,255,255,0.9)',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontFamily: 'inherit',
                color: '#1a1a2e',
                outline: 'none',
                '&::placeholder': { color: 'rgba(0,0,0,0.4)' },
              }}
            />
            <Box
              component="button"
              type="submit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1.5,
                bgcolor: 'white',
                color: 'primary.main',
                border: 'none',
                borderRadius: '0.5rem',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>search</Box>
              {language === 'vi' ? 'Tìm kiếm' : 'Search'}
            </Box>
          </Box>

          {/* Trending chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {TRENDING_CHIPS.map((chip) => (
              <Box
                key={chip.keyword}
                component={Link}
                href={`/search?keyword=${encodeURIComponent(chip.keyword)}`}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '9999px',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                }}
              >
                {chip.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/** Stats row — matches design brief: 9+ categories, Mua & Bán, Toàn quốc, 24/7 */
function StatsRow({ language }: { language: 'vi' | 'en' }) {
  const stats = [
    { value: '9+', label: language === 'vi' ? 'Danh mục' : 'Categories' },
    { value: language === 'vi' ? 'Mua & Bán' : 'Buy & Sell', label: language === 'vi' ? 'Giao dịch' : 'Transactions' },
    { value: language === 'vi' ? 'Toàn quốc' : 'Nationwide', label: language === 'vi' ? 'Phạm vi' : 'Coverage' },
    { value: '24/7', label: language === 'vi' ? 'Hỗ trợ' : 'Support' },
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
      <Box
        sx={{
          bgcolor: (theme) => theme.md3.surfaceContainerLow,
          borderRadius: '1.5rem',
          p: { xs: 3, md: 4 },
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: 3,
          textAlign: 'center',
        }}
      >
        {stats.map((stat) => (
          <Box key={stat.label}>
            <Typography
              sx={{
                fontSize: '1.875rem',
                fontWeight: 900,
                color: 'primary.main',
                letterSpacing: '-0.03em',
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** All 9 categories grid */
function CategoriesGrid({ language }: { language: 'vi' | 'en' }) {
  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, pl: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            {language === 'vi' ? 'Danh mục' : 'Categories'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {language === 'vi' ? 'Khám phá 9 danh mục sản phẩm đa dạng' : 'Explore 9 diverse product categories'}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' },
          gap: 2,
        }}
      >
        {CATEGORIES.map((cat, i) => (
          <Box
            key={cat.value}
            component={Link}
            href={`/search?category=${cat.value}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              p: 3,
              borderRadius: '1.5rem',
              bgcolor: (theme) => theme.md3.surfaceContainer,
              textDecoration: 'none',
              color: 'text.primary',
              transition: 'all 0.2s ease',
              animation: `${fadeInUp} 0.5s ease-out`,
              animationDelay: `${i * 0.05}s`,
              animationFillMode: 'both',
              '&:hover': {
                transform: 'translateY(-4px)',
                bgcolor: (theme) => alpha(cat.color, 0.1),
                '& .cat-icon': { transform: 'scale(1.2)' },
              },
            }}
          >
            <Box
              className="cat-icon"
              sx={{
                width: 56,
                height: 56,
                borderRadius: '1rem',
                background: `linear-gradient(135deg, ${alpha(cat.color, 0.15)}, ${alpha(cat.color, 0.05)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                transition: 'transform 0.2s ease',
              }}
            >
              {cat.icon}
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                {language === 'vi' ? cat.label : cat.labelEn}
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', fontWeight: 500 }}>
                {language === 'vi' ? 'Xem thêm →' : 'Browse →'}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** Why Choose Us — 3 feature cards */
function WhyChooseUs({ language }: { language: 'vi' | 'en' }) {
  const features = [
    {
      icon: 'bolt',
      title: language === 'vi' ? 'Nhanh chóng' : 'Fast',
      desc: language === 'vi'
        ? 'Đăng tin và tìm kiếm sản phẩm chỉ trong vài phút'
        : 'Post and search for products in just minutes',
    },
    {
      icon: 'verified_user',
      title: language === 'vi' ? 'Uy tín' : 'Trustworthy',
      desc: language === 'vi'
        ? 'Hệ thống xác minh người dùng và đánh giá minh bạch'
        : 'User verification system and transparent ratings',
    },
    {
      icon: 'savings',
      title: language === 'vi' ? 'Giá tốt nhất' : 'Best Prices',
      desc: language === 'vi'
        ? 'So sánh giá từ hàng ngàn người bán trên toàn quốc'
        : 'Compare prices from thousands of sellers nationwide',
    },
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
      <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', mb: 4, pl: 2, borderLeft: '4px solid', borderColor: 'primary.main' }}>
        {language === 'vi' ? 'Tại sao chọn ChoTot?' : 'Why choose ChoTot?'}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {features.map((f, i) => (
          <Box
            key={f.icon}
            sx={{
              p: 4,
              borderRadius: '1.5rem',
              bgcolor: (theme) => theme.md3.surfaceContainer,
              animation: `${fadeInUp} 0.5s ease-out`,
              animationDelay: `${i * 0.1}s`,
              animationFillMode: 'both',
            }}
          >
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 40, color: 'primary.main', mb: 2, display: 'block' }}
            >
              {f.icon}
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', mb: 1 }}>{f.title}</Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{f.desc}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** CTA Banner */
function CTABanner({ language }: { language: 'vi' | 'en' }) {
  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          background: gradients.signature,
          borderRadius: '1.5rem',
          p: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 900,
            letterSpacing: '-0.02em',
            mb: 2,
          }}
        >
          {language === 'vi' ? 'Sẵn sàng bắt đầu?' : 'Ready to get started?'}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 480, mx: 'auto' }}>
          {language === 'vi'
            ? 'Đăng tin ngay hôm nay và tiếp cận hàng triệu người mua trên toàn quốc'
            : 'Post your listing today and reach millions of buyers nationwide'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={Link}
            href="/properties/new"
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: 'white',
              color: 'primary.main',
              borderRadius: '0.75rem',
              fontWeight: 700,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
            }}
          >
            {language === 'vi' ? 'Đăng tin ngay' : 'Post now'}
          </Button>
          <Button
            component={Link}
            href="/search"
            sx={{
              px: 4,
              py: 1.5,
              border: '1px solid rgba(255,255,255,0.4)',
              color: 'white',
              borderRadius: '0.75rem',
              fontWeight: 700,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            {language === 'vi' ? 'Khám phá' : 'Explore'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/** Loading skeletons for featured section */
function FeaturedLoadingSkeleton() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            bgcolor: (theme) => theme.md3.surfaceContainer,
            borderRadius: '1.5rem',
            overflow: 'hidden',
            animation: `${fadeInUp} 0.5s ease-out`,
            animationDelay: `${i * 0.1}s`,
            animationFillMode: 'both',
          }}
        >
          <Skeleton variant="rectangular" height={224} />
          <Box sx={{ p: 2.5 }}>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="90%" height={28} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="40%" height={32} sx={{ mt: 1 }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

/** Featured listings section — fetches real data from API */
function FeaturedListings({ language }: { language: 'vi' | 'en' }) {
  const { data, isLoading } = useQuery({
    queryKey: ['featured-listings'],
    queryFn: fetchFeaturedListings,
    staleTime: 2 * 60 * 1000,
  });

  const listings = data?.data ?? [];

  return (
    <Box
      sx={{
        px: { xs: 2, md: 3 },
        py: { xs: 4, md: 6 },
        bgcolor: (theme) => theme.md3.surfaceContainerLow,
        borderRadius: '2.5rem 2.5rem 0 0',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5, px: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          {language === 'vi' ? 'Tin đăng mới nhất' : 'Latest Listings'}
        </Typography>
        <Button
          component={Link}
          href="/search"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            '&:hover': { gap: 1 },
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            transition: 'gap 0.2s ease',
          }}
        >
          {language === 'vi' ? 'Xem tất cả' : 'View all'}
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20 }}>
            arrow_forward
          </Box>
        </Button>
      </Box>

      {isLoading ? (
        <FeaturedLoadingSkeleton />
      ) : listings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Box
            component="span"
            className="material-symbols-outlined"
            sx={{ fontSize: 64, color: (theme) => theme.md3.outlineVariant, display: 'block', mb: 2 }}
          >
            storefront
          </Box>
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>
            {language === 'vi' ? 'Chưa có tin đăng nào' : 'No listings yet'}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }}>
            {language === 'vi' ? 'Hãy là người đầu tiên đăng tin!' : 'Be the first to post!'}
          </Typography>
          <Button
            component={Link}
            href="/properties/new"
            sx={{
              px: 4,
              py: 1.5,
              background: gradients.signature,
              color: '#fff',
              borderRadius: '0.75rem',
              fontWeight: 700,
            }}
          >
            {language === 'vi' ? 'Đăng tin ngay' : 'Post now'}
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {listings.slice(0, 8).map((property, i) => (
            <Box
              key={property.id}
              sx={{
                animation: `${fadeInUp} 0.5s ease-out`,
                animationDelay: `${i * 0.08}s`,
                animationFillMode: 'both',
              }}
            >
              <PropertyCard property={property} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ===========================================
// Main Page Component
// ===========================================

export default function HomePage() {
  const { language } = useSettingsStore();

  return (
    <Box>
      <HeroSection language={language} />
      <StatsRow language={language} />
      <CategoriesGrid language={language} />
      <WhyChooseUs language={language} />
      <FeaturedListings language={language} />
      <CTABanner language={language} />
    </Box>
  );
}
