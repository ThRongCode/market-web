'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  Alert,
  Skeleton,
} from '@mui/material';
import { Mail as MailIcon } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { Message, PaginatedResponse } from '@/types';
import { formatRelativeTime } from '@/lib/utils';

async function fetchMessages(): Promise<PaginatedResponse<Message>> {
  const response = await fetch('/api/messages');
  if (!response.ok) throw new Error('Failed to fetch messages');
  return response.json();
}

export default function MessagesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/messages');
    }
  }, [status, router]);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    enabled: !!session,
  });

  const messages = response?.data ?? [];

  if (status === 'loading' || isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="text" height={60} width={300} sx={{ mb: 3 }} />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={120} sx={{ mb: 2, borderRadius: 1 }} />
        ))}
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">Đã có lỗi xảy ra. Vui lòng thử lại.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MailIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Hộp thư đến
        </Typography>
      </Box>

      {messages.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <MailIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Chưa có tin nhắn nào
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Khi có người liên hệ về tin đăng của bạn, tin nhắn sẽ xuất hiện ở đây.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {response?.total ?? messages.length} tin nhắn
          </Typography>

          {messages.map((message) => (
            <Card
              key={message.id}
              sx={{
                mb: 2,
                bgcolor: message.read ? 'background.paper' : 'action.hover',
                borderLeft: message.read ? 'none' : '4px solid',
                borderLeftColor: message.read ? 'transparent' : 'primary.main',
              }}
            >
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                  src={message.sender?.image || undefined}
                  alt={message.sender?.name || 'User'}
                  sx={{ width: 48, height: 48 }}
                >
                  {message.sender?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle1" fontWeight={message.read ? 'normal' : 'bold'}>
                      {message.sender?.name || 'Người dùng'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {!message.read && (
                        <Chip label="Mới" size="small" color="primary" />
                      )}
                      <Typography variant="caption" color="text.secondary">
                        {formatRelativeTime(message.createdAt)}
                      </Typography>
                    </Box>
                  </Box>

                  {message.property && (
                    <Typography
                      variant="body2"
                      component={Link}
                      href={`/properties/${message.propertyId}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      {message.property.images?.[0] && (
                        <Box
                          component="img"
                          src={message.property.images[0].url}
                          alt={message.property.title}
                          sx={{
                            width: 40,
                            height: 30,
                            objectFit: 'cover',
                            borderRadius: 0.5,
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {message.property.title}
                    </Typography>
                  )}

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {message.content}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
