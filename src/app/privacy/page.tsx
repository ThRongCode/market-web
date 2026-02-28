import { Container, Typography, Box, Paper, Divider } from '@mui/material';

export const metadata = {
  title: 'Chính sách bảo mật | ChoTot',
  description: 'Chính sách bảo mật của ChoTot',
};

const sections = [
  {
    title: '1. Thông tin chúng tôi thu thập',
    content:
      'Chúng tôi thu thập thông tin cá nhân như tên, email, số điện thoại khi bạn đăng ký tài khoản. Ngoài ra, chúng tôi thu thập dữ liệu sử dụng như lịch sử tìm kiếm và tương tác trên website để cải thiện dịch vụ.',
  },
  {
    title: '2. Mục đích sử dụng thông tin',
    content:
      'Thông tin cá nhân được sử dụng để cung cấp dịch vụ, hỗ trợ khách hàng, gửi thông báo quan trọng, và cải thiện trải nghiệm người dùng. Chúng tôi không bán thông tin cá nhân cho bên thứ ba.',
  },
  {
    title: '3. Bảo mật thông tin',
    content:
      'Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép.',
  },
  {
    title: '4. Cookie',
    content:
      'Website sử dụng cookie để cải thiện trải nghiệm người dùng. Bạn có thể quản lý cài đặt cookie trong trình duyệt của mình.',
  },
  {
    title: '5. Quyền của bạn',
    content:
      'Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất cứ lúc nào. Liên hệ chúng tôi tại support@chotot.com để thực hiện các quyền này.',
  },
];

export default function PrivacyPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
        Chính sách bảo mật
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Cập nhật lần cuối: Tháng 7, 2025
      </Typography>

      <Paper sx={{ p: 4 }}>
        {sections.map((section, index) => (
          <Box key={section.title}>
            {index > 0 && <Divider sx={{ my: 3 }} />}
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              {section.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {section.content}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Container>
  );
}
