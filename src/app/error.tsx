'use client';

import { Container, Typography, Button, Alert, Box } from '@mui/material';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Đã có lỗi xảy ra
        </Typography>
        <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
          {error.message || 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.'}
        </Alert>
        <Button variant="contained" size="large" onClick={reset}>
          Thử lại
        </Button>
      </Box>
    </Container>
  );
}
