'use client';

import { Box, CircularProgress, Typography, alpha, useTheme, Skeleton } from '@mui/material';
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

// Pulse animation for dots
const pulse = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Spin animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'pulse';
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ 
  size = 'medium', 
  variant = 'spinner',
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const theme = useTheme();
  
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {variant === 'spinner' && (
        <Box
          sx={{
            width: sizeMap[size],
            height: sizeMap[size],
            borderRadius: '50%',
            border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderTopColor: theme.palette.primary.main,
            animation: `${spin} 0.8s linear infinite`,
          }}
        />
      )}
      
      {variant === 'dots' && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: size === 'small' ? 8 : size === 'medium' ? 12 : 16,
                height: size === 'small' ? 8 : size === 'medium' ? 12 : 16,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                animation: `${pulse} 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </Box>
      )}

      {variant === 'pulse' && (
        <Box
          sx={{
            width: sizeMap[size],
            height: sizeMap[size],
            borderRadius: '50%',
            bgcolor: 'primary.main',
            animation: `${pulse} 1.5s ease-in-out infinite`,
          }}
        />
      )}
      
      {text && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
}

// Animated skeleton for cards
interface CardSkeletonProps {
  variant?: 'property' | 'list';
}

export function CardSkeleton({ variant = 'property' }: CardSkeletonProps) {
  const theme = useTheme();
  
  if (variant === 'list') {
    return (
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'background.paper',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 1,
        }}
      >
        <Box
          sx={{
            width: 280,
            height: 200,
            background: `linear-gradient(90deg, ${alpha(theme.palette.action.hover, 0.3)} 25%, ${alpha(theme.palette.action.hover, 0.5)} 50%, ${alpha(theme.palette.action.hover, 0.3)} 75%)`,
            backgroundSize: '200% 100%',
            animation: `${shimmer} 1.5s infinite`,
          }}
        />
        <Box sx={{ flex: 1, p: 2 }}>
          <Skeleton variant="text" width="80%" height={32} />
          <Skeleton variant="text" width="40%" height={28} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Skeleton variant="rounded" width={80} height={32} />
            <Skeleton variant="rounded" width={80} height={32} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 220,
          background: `linear-gradient(90deg, ${alpha(theme.palette.action.hover, 0.3)} 25%, ${alpha(theme.palette.action.hover, 0.5)} 50%, ${alpha(theme.palette.action.hover, 0.3)} 75%)`,
          backgroundSize: '200% 100%',
          animation: `${shimmer} 1.5s infinite`,
        }}
      />
      <Box sx={{ p: 2.5 }}>
        <Skeleton variant="text" width="90%" height={28} />
        <Skeleton variant="text" width="50%" height={32} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ mt: 1 }} />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rounded" width={70} height={28} />
          <Skeleton variant="rounded" width={70} height={28} />
        </Box>
      </Box>
    </Box>
  );
}

// Page loading skeleton
export function PageSkeleton() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        animation: 'fadeIn 0.3s ease-out',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      {/* Hero skeleton */}
      <Box
        sx={{
          height: 300,
          background: `linear-gradient(90deg, ${alpha(theme.palette.action.hover, 0.3)} 25%, ${alpha(theme.palette.action.hover, 0.5)} 50%, ${alpha(theme.palette.action.hover, 0.3)} 75%)`,
          backgroundSize: '200% 100%',
          animation: `${shimmer} 1.5s infinite`,
        }}
      />
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
        <Skeleton variant="text" width="40%" height={48} />
        <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} />
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ flex: 1 }}>
              <CardSkeleton />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// Progress bar for navigation
export function NavigationProgress({ isLoading }: { isLoading: boolean }) {
  const theme = useTheme();
  
  if (!isLoading) return null;
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '100%',
          bgcolor: 'primary.main',
          animation: 'progress 1s ease-in-out infinite',
          '@keyframes progress': {
            '0%': {
              width: '0%',
              marginLeft: '0%',
            },
            '50%': {
              width: '30%',
              marginLeft: '35%',
            },
            '100%': {
              width: '0%',
              marginLeft: '100%',
            },
          },
        }}
      />
    </Box>
  );
}
