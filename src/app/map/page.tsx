'use client';

import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
      }}
    >
      <CircularProgress />
    </Box>
  ),
});

export default function MapPage() {
  return <MapContent />;
}
