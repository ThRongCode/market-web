const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
] as const;

const optionalEnvVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET',
] as const;

export function validateEnv(): void {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((v) => `  - ${v}`).join('\n')}`
    );
  }

  if (process.env.NEXTAUTH_SECRET === 'super-secret-key-for-development-only-change-in-production' &&
      process.env.NODE_ENV === 'production') {
    throw new Error('NEXTAUTH_SECRET must be changed from the default value in production');
  }

  const warnings: string[] = [];
  for (const envVar of optionalEnvVars) {
    if (!process.env[envVar]) {
      warnings.push(envVar);
    }
  }

  if (warnings.length > 0 && process.env.NODE_ENV !== 'test') {
    console.warn(
      `Optional environment variables not set (some features may be disabled):\n${warnings.map((v) => `  - ${v}`).join('\n')}`
    );
  }
}
