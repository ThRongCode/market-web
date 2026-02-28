import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';
import {
  badRequest,
  serverError,
  rateLimited,
  sanitizeText,
} from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':auth-register', RATE_LIMITS.auth);
    if (!success) return rateLimited();

    const body = await request.json();

    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return badRequest(validationResult.error.issues[0].message);
    }

    const { name, email, password, phone } = validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return badRequest('Email đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sanitizedName = sanitizeText(name, 100);

    const user = await prisma.user.create({
      data: {
        name: sanitizedName,
        email,
        password: hashedPassword,
        phone,
      },
    });

    return NextResponse.json(
      {
        message: 'Đăng ký thành công',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return serverError(error);
  }
}
