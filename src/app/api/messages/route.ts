import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { contactSchema } from '@/lib/validations';
import {
  unauthorized,
  badRequest,
  notFound,
  serverError,
  rateLimited,
  sanitizeText,
  clampPage,
  clampPageSize,
  createAuditLog,
} from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':messages-list', RATE_LIMITS.api);
    if (!success) return rateLimited();

    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized();
    }

    const { searchParams } = new URL(request.url);
    const page = clampPage(searchParams.get('page'));
    const pageSize = clampPageSize(searchParams.get('pageSize'));

    const where = { receiverId: session.user.id };

    const total = await prisma.message.count({ where });

    const messages = await prisma.message.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
        property: {
          select: {
            id: true,
            title: true,
            images: {
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      data: messages,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':messages-create', RATE_LIMITS.mutation);
    if (!success) return rateLimited();

    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized('Bạn cần đăng nhập để gửi tin nhắn');
    }

    const body = await request.json();

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return badRequest(validationResult.error.issues[0].message);
    }

    const { propertyId, content, phone, email } = body;

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return notFound('Không tìm thấy tin đăng');
    }

    if (property.userId === session.user.id) {
      return badRequest('Bạn không thể gửi tin nhắn cho chính mình');
    }

    const sanitizedContent = sanitizeText(content, 5000);

    const message = await prisma.message.create({
      data: {
        content: sanitizedContent,
        phone,
        email,
        senderId: session.user.id,
        receiverId: property.userId,
        propertyId,
      },
    });

    await createAuditLog(session.user.id, 'CREATE', 'Message', message.id);

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
