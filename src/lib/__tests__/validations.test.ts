import { registerSchema, propertySchema, contactSchema, loginSchema } from '../validations';

describe('registerSchema', () => {
  it('rejects weak passwords', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@test.com',
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.success).toBe(false);
  });

  it('rejects passwords without uppercase', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password1!',
      confirmPassword: 'password1!',
    });
    expect(result.success).toBe(false);
  });

  it('rejects passwords without numbers', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@test.com',
      password: 'Password!',
      confirmPassword: 'Password!',
    });
    expect(result.success).toBe(false);
  });

  it('rejects passwords without special characters', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@test.com',
      password: 'Password1',
      confirmPassword: 'Password1',
    });
    expect(result.success).toBe(false);
  });

  it('accepts strong passwords', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@test.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });
    expect(result.success).toBe(true);
  });

  it('rejects mismatched passwords', () => {
    const result = registerSchema.safeParse({
      name: 'Test User',
      email: 'test@test.com',
      password: 'Password1!',
      confirmPassword: 'Different1!',
    });
    expect(result.success).toBe(false);
  });
});

describe('loginSchema', () => {
  it('requires min 8 char password', () => {
    const result = loginSchema.safeParse({
      email: 'test@test.com',
      password: '1234567',
    });
    expect(result.success).toBe(false);
  });

  it('accepts valid login', () => {
    const result = loginSchema.safeParse({
      email: 'test@test.com',
      password: '12345678',
    });
    expect(result.success).toBe(true);
  });
});

describe('propertySchema', () => {
  const validProperty = {
    title: 'A valid property title here',
    description: 'A'.repeat(50),
    price: 5000000000,
    area: 100,
    bedrooms: 3,
    bathrooms: 2,
    address: '123 Main Street',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    propertyType: 'APARTMENT' as const,
    listingType: 'SALE' as const,
  };

  it('accepts valid property', () => {
    const result = propertySchema.safeParse(validProperty);
    expect(result.success).toBe(true);
  });

  it('rejects absurd price', () => {
    const result = propertySchema.safeParse({ ...validProperty, price: 9999999999999 });
    expect(result.success).toBe(false);
  });

  it('rejects absurd area', () => {
    const result = propertySchema.safeParse({ ...validProperty, area: 999999 });
    expect(result.success).toBe(false);
  });

  it('rejects negative price', () => {
    const result = propertySchema.safeParse({ ...validProperty, price: -100 });
    expect(result.success).toBe(false);
  });
});

describe('contactSchema', () => {
  it('requires at least phone or email', () => {
    const result = contactSchema.safeParse({
      content: 'Hello, I am interested in this property.',
    });
    expect(result.success).toBe(false);
  });

  it('accepts with phone', () => {
    const result = contactSchema.safeParse({
      content: 'Hello, I am interested in this property.',
      phone: '0912345678',
    });
    expect(result.success).toBe(true);
  });

  it('accepts with email', () => {
    const result = contactSchema.safeParse({
      content: 'Hello, I am interested in this property.',
      email: 'test@test.com',
    });
    expect(result.success).toBe(true);
  });
});
