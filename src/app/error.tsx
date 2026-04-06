'use client';

import { Box, Typography, Alert, useTheme } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', p: 4 }}>
      <Box sx={{ maxWidth: 480 }}>
        <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 64, color: theme.md3.error, mb: 2, display: 'block' }}>
          error
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: theme.md3.onSurface, mb: 2 }}>
          Đã có lỗi xảy ra
        </Typography>
        <Alert severity="error" sx={{ mb: 4, textAlign: 'left' }}>
          {error.message || 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.'}
        </Alert>
        <Box
          component="button"
          type="button"
          onClick={reset}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 4,
            py: 1.5,
            background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
            color: '#fff',
            fontWeight: 600,
            fontFamily: 'inherit',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            '&:active': { transform: 'scale(0.95)' },
          }}
        >
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>refresh</Box>
          Thử lại
        </Box>
      </Box>
    </Box>
  );
}
