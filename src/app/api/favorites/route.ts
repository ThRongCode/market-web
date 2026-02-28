import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import {
  unauthorized,
  badRequest,
  notFound,
  serverError,
  rateLimited,
  clampPage,
  clampPageSize,
} from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':favorites-list', RATE_LIMITS.api);
    if (!success) return rateLimited();

    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized();
    }

    const { searchParams } = new URL(request.url);
    const page = clampPage(searchParams.get('page'));
    const pageSize = clampPageSize(searchParams.get('pageSize'));

    const where = { userId: session.user.id };

    const total = await prisma.favorite.count({ where });

    const favorites = await prisma.favorite.findMany({
      where,
      include: {
        property: {
          include: {
            images: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      data: favorites,
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
    const { success } = rateLimit(getClientIp(request) + ':favorites-create', RATE_LIMITS.mutation);
    if (!success) return rateLimited();

    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized();
    }

    const { propertyId } = await request.json();

    if (!propertyId) {
      return badRequest('Property ID is required');
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return notFound('Không tìm thấy tin đăng');
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    });

    if (existingFavorite) {
      return badRequest('Đã có trong danh sách yêu thích');
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        propertyId,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':favorites-delete', RATE_LIMITS.mutation);
    if (!success) return rateLimited();

    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized();
    }

    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');

    if (!propertyId) {
      return badRequest('Thiếu mã tin đăng');
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    });

    if (!existingFavorite) {
      return notFound('Không tìm thấy trong danh sách yêu thích');
    }

    await prisma.favorite.delete({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    });

    return NextResponse.json({ message: 'Đã xóa khỏi yêu thích' });
  } catch (error) {
    return serverError(error);
  }
}
