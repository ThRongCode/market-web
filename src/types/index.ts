// ==========================================
// MARKETPLACE TYPES - Multi-Category Support
// ==========================================

export type Category =
  | 'REAL_ESTATE'
  | 'VEHICLES'
  | 'ELECTRONICS'
  | 'FASHION'
  | 'HOME_GARDEN'
  | 'SPORTS'
  | 'JOBS'
  | 'SERVICES'
  | 'OTHER';

export type ListingType = 'SALE' | 'RENT';
export type ProductStatus = 'ACTIVE' | 'PENDING' | 'SOLD' | 'RENTED' | 'INACTIVE';
export type UserRole = 'ADMIN' | 'AGENT' | 'SELLER' | 'BUYER';
export type UserStatusType = 'ACTIVE' | 'SUSPENDED' | 'BANNED';
export type ReportStatusType = 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED' | 'DISMISSED';
export type ItemCondition = 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';

// ==========================================
// REAL ESTATE
// ==========================================

export type PropertyType = 'APARTMENT' | 'HOUSE' | 'VILLA' | 'LAND' | 'OFFICE' | 'SHOPHOUSE';

// ==========================================
// CORE INTERFACES
// ==========================================

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  address: string;
  city: string;
  district: string;
  ward?: string;
  latitude?: number;
  longitude?: number;
  propertyType?: PropertyType;
  listingType: ListingType;
  status: ProductStatus;
  condition?: ItemCondition;
  brand?: string;
  model?: string;
  yearMade?: number;
  images: PropertyImage[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  isFavorited?: boolean;
}

export interface PropertyImage {
  id: string;
  url: string;
  publicId?: string;
  propertyId: string;
}

// ==========================================
// COMMON TYPES
// ==========================================

export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatusType;
  createdAt: string;
  verified?: boolean;
  rating?: number;
}

export interface Report {
  id: string;
  reason: string;
  details?: string;
  status: ReportStatusType;
  createdAt: string;
  resolvedAt?: string;
  reporterId: string;
  propertyId?: string;
  reporter?: User;
  property?: Property;
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  property: Property;
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  phone?: string;
  email?: string;
  read: boolean;
  createdAt: string;
  senderId: string;
  receiverId: string;
  propertyId: string;
  sender: User;
  property: Property;
}

export interface SearchFilters {
  keyword?: string;
  category?: Category;
  city?: string;
  district?: string;
  listingType?: ListingType;
  condition?: ItemCondition;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
}

// ==========================================
// LOCATION DATA
// ==========================================

export interface City {
  code: string;
  name: string;
}

export interface District {
  code: string;
  name: string;
  cityCode: string;
}

export interface Ward {
  code: string;
  name: string;
  districtCode: string;
}

// ==========================================
// CONSTANTS
// ==========================================

export const CATEGORIES: { value: Category; label: string; labelEn: string; icon: string; color: string }[] = [
  { value: 'REAL_ESTATE', label: 'Bất động sản', labelEn: 'Real Estate', icon: '🏠', color: '#6366f1' },
  { value: 'VEHICLES', label: 'Xe cộ', labelEn: 'Vehicles', icon: '🚗', color: '#8b5cf6' },
  { value: 'ELECTRONICS', label: 'Điện tử', labelEn: 'Electronics', icon: '📱', color: '#06b6d4' },
  { value: 'FASHION', label: 'Thời trang', labelEn: 'Fashion', icon: '👗', color: '#ec4899' },
  { value: 'HOME_GARDEN', label: 'Nhà cửa & Vườn', labelEn: 'Home & Garden', icon: '🏡', color: '#f59e0b' },
  { value: 'SPORTS', label: 'Thể thao', labelEn: 'Sports', icon: '⚽', color: '#10b981' },
  { value: 'JOBS', label: 'Việc làm', labelEn: 'Jobs', icon: '💼', color: '#f43f5e' },
  { value: 'SERVICES', label: 'Dịch vụ', labelEn: 'Services', icon: '🛠️', color: '#3b82f6' },
  { value: 'OTHER', label: 'Khác', labelEn: 'Other', icon: '📦', color: '#64748b' },
];

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'APARTMENT', label: 'Căn hộ chung cư' },
  { value: 'HOUSE', label: 'Nhà riêng' },
  { value: 'VILLA', label: 'Biệt thự' },
  { value: 'LAND', label: 'Đất nền' },
  { value: 'OFFICE', label: 'Văn phòng' },
  { value: 'SHOPHOUSE', label: 'Shophouse' },
];

export const LISTING_TYPES: { value: 'SALE' | 'RENT'; label: string }[] = [
  { value: 'SALE', label: 'Bán' },
  { value: 'RENT', label: 'Cho thuê' },
];

export const ITEM_CONDITIONS: { value: ItemCondition; label: string; labelEn: string }[] = [
  { value: 'NEW', label: 'Mới', labelEn: 'New' },
  { value: 'LIKE_NEW', label: 'Như mới', labelEn: 'Like New' },
  { value: 'GOOD', label: 'Tốt', labelEn: 'Good' },
  { value: 'FAIR', label: 'Khá', labelEn: 'Fair' },
  { value: 'POOR', label: 'Cũ', labelEn: 'Poor' },
];

export const PROPERTY_STATUS: { value: ProductStatus; label: string }[] = [
  { value: 'ACTIVE', label: 'Đang hiển thị' },
  { value: 'SOLD', label: 'Đã bán' },
  { value: 'RENTED', label: 'Đã cho thuê' },
  { value: 'PENDING', label: 'Chờ duyệt' },
  { value: 'INACTIVE', label: 'Ẩn' },
];

export const VIETNAM_CITIES: City[] = [
  { code: 'HN', name: 'Hà Nội' },
  { code: 'HCM', name: 'TP. Hồ Chí Minh' },
  { code: 'DN', name: 'Đà Nẵng' },
  { code: 'HP', name: 'Hải Phòng' },
  { code: 'CT', name: 'Cần Thơ' },
  { code: 'BD', name: 'Bình Dương' },
  { code: 'DNA', name: 'Đồng Nai' },
  { code: 'KH', name: 'Khánh Hòa' },
  { code: 'QN', name: 'Quảng Ninh' },
  { code: 'TTH', name: 'Thừa Thiên Huế' },
];

// Helper to get category info
export function getCategoryInfo(category: Category) {
  return CATEGORIES.find(c => c.value === category);
}
