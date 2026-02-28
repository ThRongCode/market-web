import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { propertySchema } from '@/lib/validations';
import {
  unauthorized,
  badRequest,
  serverError,
  rateLimited,
  clampPageSize,
  clampPage,
  clampKeyword,
  sanitizePropertyData,
  createAuditLog,
} from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':properties-list', RATE_LIMITS.api);
    if (!success) return rateLimited();

    const { searchParams } = new URL(request.url);

    const page = clampPage(searchParams.get('page'));
    const pageSize = clampPageSize(searchParams.get('pageSize'));
    const keyword = clampKeyword(searchParams.get('keyword'));
    const category = searchParams.get('category') || '';
    const city = searchParams.get('city') || '';
    const district = searchParams.get('district') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const listingType = searchParams.get('listingType') || '';
    const condition = searchParams.get('condition') || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minArea = searchParams.get('minArea');
    const maxArea = searchParams.get('maxArea');
    const bedrooms = searchParams.get('bedrooms');
    let userId = searchParams.get('userId');

    // Resolve "me" to the actual session user ID
    if (userId === 'me') {
      const session = await auth();
      userId = session?.user?.id ?? null;
      if (!userId) {
        return NextResponse.json({ data: [], total: 0, page: 1, pageSize, totalPages: 0 });
      }
    } else if (userId) {
      // Non-"me" userId: only the owner can view their own non-ACTIVE listings
      const session = await auth();
      if (session?.user?.id !== userId) {
        // Other users can only see ACTIVE listings from this user
        userId = null; // Fall through to public search with ACTIVE filter
      }
    }

    const where: Record<string, unknown> = {
      deletedAt: null,
    };

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
        { address: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    // Only filter by ACTIVE status for public searches, not when viewing own properties
    if (!userId) {
      where.status = 'ACTIVE';
    }

    if (category) where.category = category;
    if (city) where.city = city;
    if (district) where.district = district;
    if (propertyType) where.propertyType = propertyType;
    if (listingType) where.listingType = listingType;
    if (condition) where.condition = condition;
    if (userId) where.userId = userId;

    if (minPrice || maxPrice) {
      where.price = {};
      const parsedMin = parseFloat(minPrice || '');
      const parsedMax = parseFloat(maxPrice || '');
      if (!isNaN(parsedMin)) (where.price as Record<string, number>).gte = parsedMin;
      if (!isNaN(parsedMax)) (where.price as Record<string, number>).lte = parsedMax;
    }

    if (minArea || maxArea) {
      where.area = {};
      const parsedMinArea = parseFloat(minArea || '');
      const parsedMaxArea = parseFloat(maxArea || '');
      if (!isNaN(parsedMinArea)) (where.area as Record<string, number>).gte = parsedMinArea;
      if (!isNaN(parsedMaxArea)) (where.area as Record<string, number>).lte = parsedMaxArea;
    }

    if (bedrooms) {
      const parsedBedrooms = parseInt(bedrooms);
      if (!isNaN(parsedBedrooms)) where.bedrooms = { gte: parsedBedrooms };
    }

    const total = await prisma.property.count({ where });

    const properties = await prisma.property.findMany({
      where,
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
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return NextResponse.json({
      data: properties,
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
    const { success } = rateLimit(getClientIp(request) + ':properties-create', RATE_LIMITS.mutation);
    if (!success) return rateLimited();

    const session = await auth();

    if (!session?.user?.id) {
      return unauthorized('Bạn cần đăng nhập để đăng tin');
    }

    const body = await request.json();

    const validationResult = propertySchema.safeParse(body);
    if (!validationResult.success) {
      return badRequest(validationResult.error.issues[0].message);
    }

    const { images, ...propertyData } = body;
    sanitizePropertyData(propertyData);

    const property = await prisma.property.create({
      data: {
        ...propertyData,
        userId: session.user.id,
        images: images?.length
          ? {
              create: images.map((img: { url: string; publicId?: string }) => ({
                url: img.url,
                publicId: img.publicId,
              })),
            }
          : undefined,
      },
      include: {
        images: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            phone: true,
          },
        },
      },
    });

    await createAuditLog(session.user.id, 'CREATE', 'Property', property.id);

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
