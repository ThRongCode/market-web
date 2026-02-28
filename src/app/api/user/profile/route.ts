import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { profileSchema } from '@/lib/validations';
import {
  unauthorized,
  badRequest,
  notFound,
  serverError,
  rateLimited,
  sanitizeText,
  createAuditLog,
} from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

export async function PUT(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':profile-update', RATE_LIMITS.mutation);
    if (!success) return rateLimited();

    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized();
    }

    const body = await request.json();

    const validationResult = profileSchema.safeParse(body);
    if (!validationResult.success) {
      return badRequest(validationResult.error.issues[0].message);
    }

    const { name, phone, image } = validationResult.data;

    const sanitizedName = sanitizeText(name, 100);

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: sanitizedName,
        phone,
        image,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
      },
    });

    await createAuditLog(session.user.id, 'UPDATE', 'User', session.user.id);

    return NextResponse.json(user);
  } catch (error) {
    return serverError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':profile-get', RATE_LIMITS.api);
    if (!success) return rateLimited();

    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized();
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            properties: true,
            favorites: true,
          },
        },
      },
    });

    if (!user) {
      return notFound('Không tìm thấy người dùng');
    }

    return NextResponse.json(user);
  } catch (error) {
    return serverError(error);
  }
}
