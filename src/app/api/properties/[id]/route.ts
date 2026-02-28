import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { propertySchema } from '@/lib/validations';
import {
  unauthorized,
  forbidden,
  notFound,
  badRequest,
  serverError,
  rateLimited,
  sanitizePropertyData,
  createAuditLog,
} from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

interface Params {
  params: Promise<{ id: string }>;
}

async function isOwnerOrAdmin(userId: string, resourceOwnerId: string): Promise<boolean> {
  if (userId === resourceOwnerId) return true;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === 'ADMIN';
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':property-detail', RATE_LIMITS.api);
    if (!success) return rateLimited();

    const { id } = await params;

    const property = await prisma.property.findUnique({
      where: { id, deletedAt: null },
      include: {
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            phone: true,
            email: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });

    if (!property) {
      return notFound('Không tìm thấy tin đăng');
    }

    const session = await auth();
    let isFavorited = false;

    if (session?.user?.id) {
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_propertyId: {
            userId: session.user.id,
            propertyId: id,
          },
        },
      });
      isFavorited = !!favorite;
    }

    const isOwner = session?.user?.id === property.user.id;
    const userInfo = isOwner
      ? property.user
      : { ...property.user, phone: null };

    return NextResponse.json({
      ...property,
      user: userInfo,
      isFavorited,
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':property-update', RATE_LIMITS.mutation);
    if (!success) return rateLimited();

    const session = await auth();
    const { id } = await params;

    if (!session?.user?.id) {
      return unauthorized();
    }

    const existingProperty = await prisma.property.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingProperty) {
      return notFound('Không tìm thấy tin đăng');
    }

    if (!(await isOwnerOrAdmin(session.user.id, existingProperty.userId))) {
      return forbidden('Bạn không có quyền chỉnh sửa tin này');
    }

    const body = await request.json();

    const validationResult = propertySchema.safeParse(body);
    if (!validationResult.success) {
      return badRequest(validationResult.error.issues[0].message);
    }

    const { images, ...propertyData } = body;
    sanitizePropertyData(propertyData);

    if (images) {
      await prisma.propertyImage.deleteMany({ where: { propertyId: id } });
      if (images.length > 0) {
        await prisma.propertyImage.createMany({
          data: images.map((img: { url: string; publicId?: string }) => ({
            url: img.url,
            publicId: img.publicId,
            propertyId: id,
          })),
        });
      }
    }

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: propertyData,
      include: {
        images: true,
        user: {
          select: { id: true, name: true, image: true, phone: true },
        },
      },
    });

    await createAuditLog(session.user.id, 'UPDATE', 'Property', id);

    return NextResponse.json(updatedProperty);
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':property-delete', RATE_LIMITS.mutation);
    if (!success) return rateLimited();

    const session = await auth();
    const { id } = await params;

    if (!session?.user?.id) {
      return unauthorized();
    }

    const existingProperty = await prisma.property.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingProperty) {
      return notFound('Không tìm thấy tin đăng');
    }

    if (!(await isOwnerOrAdmin(session.user.id, existingProperty.userId))) {
      return forbidden('Bạn không có quyền xóa tin này');
    }

    await prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await createAuditLog(session.user.id, 'DELETE', 'Property', id);

    return NextResponse.json({ message: 'Đã xóa tin đăng' });
  } catch (error) {
    return serverError(error);
  }
}
