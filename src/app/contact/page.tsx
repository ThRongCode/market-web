'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Stack,
  Alert,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import { SITE_CONFIG } from '@/lib/site-config';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    content: '',
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // In production, this would POST to /api/contact
      // For now, simulate a brief delay and show success
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', content: '' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
        Liên hệ
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Bạn có câu hỏi hoặc cần hỗ trợ? Hãy liên hệ với chúng tôi.
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            {[
              { icon: <Phone />, label: 'Điện thoại', value: SITE_CONFIG.contact.phone },
              { icon: <Email />, label: 'Email', value: SITE_CONFIG.contact.email },
              { icon: <LocationOn />, label: 'Địa chỉ', value: SITE_CONFIG.contact.address },
            ].map((item) => (
              <Stack key={item.label} direction="row" spacing={2} alignItems="flex-start">
                <Box sx={{ color: 'primary.main', mt: 0.5 }}>{item.icon}</Box>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {item.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.value}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3 }}>
            {submitted ? (
              <Alert severity="success">
                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
              </Alert>
            ) : (
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="Họ tên"
                    required
                    fullWidth
                    value={formData.name}
                    onChange={handleChange('name')}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    value={formData.email}
                    onChange={handleChange('email')}
                  />
                  <TextField
                    label="Số điện thoại"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange('phone')}
                  />
                  <TextField
                    label="Nội dung"
                    required
                    multiline
                    rows={4}
                    fullWidth
                    value={formData.content}
                    onChange={handleChange('content')}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
                  >
                    {isLoading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </Button>
                </Stack>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
