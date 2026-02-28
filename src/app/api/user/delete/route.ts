import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { unauthorized, serverError, rateLimited, createAuditLog } from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

export async function DELETE(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':user-delete', RATE_LIMITS.auth);
    if (!success) return rateLimited();

    const session = await auth();
    if (!session?.user?.id) {
      return unauthorized();
    }

    const userId = session.user.id;

    await createAuditLog(
      userId,
      'ACCOUNT_DELETE',
      'user',
      userId,
      'User requested account deletion (GDPR)'
    );

    // Soft-delete all user's properties
    await prisma.property.updateMany({
      where: { userId, deletedAt: null },
      data: { deletedAt: new Date(), status: 'INACTIVE' },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: 'Deleted User',
        email: `deleted-${userId}@deleted.local`,
        phone: null,
        image: null,
        status: 'BANNED',
      },
    });

    return NextResponse.json({ message: 'Tài khoản đã được xóa thành công' });
  } catch (error) {
    return serverError(error);
  }
}
