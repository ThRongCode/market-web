import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { reportSchema } from '@/lib/validations';
import { unauthorized, badRequest, notFound, serverError, rateLimited } from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':report', RATE_LIMITS.mutation);
    if (!success) return rateLimited();

    const session = await auth();
    if (!session?.user?.id) {
      return unauthorized();
    }

    const body = await request.json();

    const validationResult = reportSchema.safeParse(body);
    if (!validationResult.success) {
      return badRequest(validationResult.error.issues[0].message);
    }

    const { reason, details, propertyId } = validationResult.data;

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return notFound('Không tìm thấy tin đăng');
    }

    const report = await prisma.report.create({
      data: {
        reason,
        details,
        propertyId,
        reporterId: session.user.id,
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    return serverError(error);
  }
}
