import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export interface ApiErrorResponse {
  error: string;
  code: string;
  message: string;
}

export function apiError(message: string, code: string, status: number): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ error: code, code, message }, { status });
}

export function unauthorized(message = 'Bạn cần đăng nhập'): NextResponse<ApiErrorResponse> {
  return apiError(message, 'UNAUTHORIZED', 401);
}

export function forbidden(message = 'Bạn không có quyền thực hiện hành động này'): NextResponse<ApiErrorResponse> {
  return apiError(message, 'FORBIDDEN', 403);
}

export function notFound(message = 'Không tìm thấy'): NextResponse<ApiErrorResponse> {
  return apiError(message, 'NOT_FOUND', 404);
}

export function badRequest(message: string): NextResponse<ApiErrorResponse> {
  return apiError(message, 'BAD_REQUEST', 400);
}

export function rateLimited(): NextResponse<ApiErrorResponse> {
  return apiError('Quá nhiều yêu cầu. Vui lòng thử lại sau.', 'RATE_LIMITED', 429);
}

export function serverError(error: unknown): NextResponse<ApiErrorResponse> {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error('[API Error]', message, error);
  return apiError('Đã có lỗi xảy ra', 'INTERNAL_ERROR', 500);
}

export function sanitizeText(text: string, maxLength = 5000): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, maxLength);
}

export function clampPageSize(pageSize: string | null, defaultSize = 12, maxSize = 50): number {
  const parsed = parseInt(pageSize || String(defaultSize));
  if (isNaN(parsed) || parsed < 1) return defaultSize;
  return Math.min(parsed, maxSize);
}

export function clampPage(page: string | null): number {
  const parsed = parseInt(page || '1');
  return isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

export function clampKeyword(keyword: string | null, maxLength = 100): string {
  return (keyword || '').trim().slice(0, maxLength);
}

export function sanitizePropertyData(data: Record<string, unknown>): void {
  if (typeof data.title === 'string') {
    data.title = sanitizeText(data.title);
  }
  if (typeof data.description === 'string') {
    data.description = sanitizeText(data.description, 10000);
  }
}

export async function createAuditLog(
  userId: string,
  action: string,
  resource: string,
  resourceId?: string,
  details?: string
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: { userId, action, resource, resourceId, details },
    });
  } catch {
    console.error('[Audit] Failed to create audit log');
  }
}
