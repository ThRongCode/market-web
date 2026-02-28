import { Container, Typography, Box, Paper, Divider } from '@mui/material';

export const metadata = {
  title: 'Điều khoản sử dụng | ChoTot',
  description: 'Điều khoản sử dụng dịch vụ ChoTot',
};

const sections = [
  {
    title: '1. Chấp nhận điều khoản',
    content:
      'Bằng việc truy cập và sử dụng website ChoTot, bạn đồng ý tuân thủ các điều khoản và điều kiện sử dụng được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch vụ.',
  },
  {
    title: '2. Tài khoản người dùng',
    content:
      'Bạn chịu trách nhiệm bảo mật thông tin tài khoản của mình, bao gồm mật khẩu. Bạn đồng ý thông báo cho chúng tôi ngay lập tức nếu phát hiện bất kỳ truy cập trái phép nào vào tài khoản của bạn.',
  },
  {
    title: '3. Nội dung đăng tải',
    content:
      'Bạn cam kết rằng các thông tin bạn đăng tải là chính xác và hợp pháp. Chúng tôi có quyền xóa hoặc từ chối đăng bất kỳ nội dung nào vi phạm quy định.',
  },
  {
    title: '4. Giới hạn trách nhiệm',
    content:
      'ChoTot không chịu trách nhiệm về tính chính xác của thông tin do người dùng đăng tải. Chúng tôi không phải là bên trung gian trong các giao dịch giữa người mua và người bán.',
  },
  {
    title: '5. Sửa đổi điều khoản',
    content:
      'Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.',
  },
];

export default function TermsPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
        Điều khoản sử dụng
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
