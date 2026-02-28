import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
  .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
  .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 số')
  .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt');

function withPasswordConfirmation<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.refine((data) => {
    const d = data as Record<string, unknown>;
    return d.password === d.confirmPassword;
  }, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });
}

export const propertySchema = z.object({
  title: z.string().min(10, 'Tiêu đề phải có ít nhất 10 ký tự').max(200),
  description: z.string().min(50, 'Mô tả phải có ít nhất 50 ký tự').max(10000),
  price: z.number().positive('Giá phải là số dương').max(1000000000000, 'Giá không hợp lệ'),
  category: z.enum(['REAL_ESTATE', 'VEHICLES', 'ELECTRONICS', 'FASHION', 'HOME_GARDEN', 'SPORTS', 'JOBS', 'SERVICES', 'OTHER']),
  area: z.number().positive('Diện tích phải là số dương').max(100000, 'Diện tích không hợp lệ').optional(),
  bedrooms: z.number().int().min(0).max(50).optional(),
  bathrooms: z.number().int().min(0).max(50).optional(),
  address: z.string().min(5, 'Địa chỉ phải có ít nhất 5 ký tự').max(500),
  city: z.string().min(1, 'Vui lòng chọn thành phố'),
  district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
  ward: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  propertyType: z.enum(['APARTMENT', 'HOUSE', 'VILLA', 'LAND', 'OFFICE', 'SHOPHOUSE']).optional(),
  listingType: z.enum(['SALE', 'RENT']),
  condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']).optional(),
  brand: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  yearMade: z.number().int().min(1900).max(2100).optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

export const searchSchema = z.object({
  keyword: z.string().max(100).optional(),
  category: z.enum(['REAL_ESTATE', 'VEHICLES', 'ELECTRONICS', 'FASHION', 'HOME_GARDEN', 'SPORTS', 'JOBS', 'SERVICES', 'OTHER']).optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  propertyType: z.enum(['APARTMENT', 'HOUSE', 'VILLA', 'LAND', 'OFFICE', 'SHOPHOUSE']).optional(),
  listingType: z.enum(['SALE', 'RENT']).optional(),
  condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minArea: z.number().optional(),
  maxArea: z.number().optional(),
  bedrooms: z.number().optional(),
});

export type SearchFormData = z.infer<typeof searchSchema>;

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = withPasswordConfirmation(z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: passwordSchema,
  confirmPassword: z.string(),
  phone: z.string().optional(),
}));

export type RegisterFormData = z.infer<typeof registerSchema>;

export const contactSchema = z.object({
  propertyId: z.string().min(1, 'Thiếu mã tin đăng'),
  content: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự').max(2000),
  phone: z.string().optional(),
  email: z.string().email('Email không hợp lệ').optional(),
}).refine((data) => data.phone || data.email, {
  message: 'Vui lòng cung cấp số điện thoại hoặc email',
  path: ['phone'],
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const profileSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  phone: z.string().optional(),
  image: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const reportSchema = z.object({
  reason: z.string().min(5, 'Lý do phải có ít nhất 5 ký tự').max(200),
  details: z.string().max(2000).optional(),
  propertyId: z.string().min(1),
});

export type ReportFormData = z.infer<typeof reportSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = withPasswordConfirmation(z.object({
  token: z.string().min(1),
  password: passwordSchema,
  confirmPassword: z.string(),
}));

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
