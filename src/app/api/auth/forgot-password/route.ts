import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { forgotPasswordSchema } from '@/lib/validations';
import { badRequest, serverError, rateLimited } from '@/lib/api-utils';
import { rateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { success } = rateLimit(getClientIp(request) + ':forgot-password', RATE_LIMITS.auth);
    if (!success) return rateLimited();

    const body = await request.json();

    const validationResult = forgotPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return badRequest(validationResult.error.issues[0].message);
    }

    const { email } = validationResult.data;

    // Always return the same message to prevent email enumeration
    const genericMessage = 'Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu';

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Delete any existing tokens for this email
      await prisma.verificationToken.deleteMany({
        where: { identifier: email },
      });

      await prisma.verificationToken.create({
        data: {
          identifier: email,
          token,
          expires,
        },
      });

      // In a real app, send email with reset link here
      // e.g., sendEmail({ to: email, subject: 'Reset password', link: `${baseUrl}/auth/reset-password?token=${token}` })
    }

    return NextResponse.json({ message: genericMessage });
  } catch (error) {
    return serverError(error);
  }
}
