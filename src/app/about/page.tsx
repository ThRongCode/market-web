import { Container, Typography, Box, Paper, Grid, Stack } from '@mui/material';
import { Verified, Speed, LocalOffer } from '@mui/icons-material';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata = {
  title: 'Về chúng tôi | ChoTot',
  description: 'Tìm hiểu về ChoTot - chợ trực tuyến hàng đầu Việt Nam',
};

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
        Về chúng tôi
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        ChoTot là chợ trực tuyến hàng đầu Việt Nam.
        Mua bán bất động sản, xe cộ, điện tử, thời trang và nhiều hơn nữa - nhanh chóng, an toàn và hiệu quả.
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {[
          {
            icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Nhanh chóng',
            description: 'Tìm kiếm và đăng tin trong vài giây với hệ thống thông minh.',
          },
          {
            icon: <Verified sx={{ fontSize: 40, color: 'success.main' }} />,
            title: 'Uy tín',
            description: 'Thông tin được xác minh, đảm bảo giao dịch an toàn.',
          },
          {
            icon: <LocalOffer sx={{ fontSize: 40, color: 'warning.main' }} />,
            title: 'Miễn phí',
            description: 'Đăng tin hoàn toàn miễn phí, không phí ẩn.',
          },
        ].map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Box sx={{ mb: 2 }}>{item.icon}</Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Liên hệ
        </Typography>
        <Stack spacing={1}>
          <Typography variant="body1">📍 {SITE_CONFIG.contact.address}</Typography>
          <Typography variant="body1">📞 {SITE_CONFIG.contact.phone}</Typography>
          <Typography variant="body1">✉️ {SITE_CONFIG.contact.email}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
