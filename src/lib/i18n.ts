// Internationalization (i18n) configuration

export type Language = 'vi' | 'en';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

// Translation dictionary
export const translations = {
  vi: {
    // Navigation
    home: 'Trang chủ',
    search: 'Tìm kiếm',
    map: 'Bản đồ',
    favorites: 'Yêu thích',
    myProperties: 'Tin đăng của tôi',
    account: 'Tài khoản',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    register: 'Đăng ký',
    postProperty: 'Đăng tin',

    // Hero section
    heroTitle: 'Mua Bán Mọi Thứ',
    heroSubtitle: 'Bất động sản, xe cộ, điện tử, thời trang - tất cả trong một nơi',
    searchPlaceholder: 'Nhập địa điểm, dự án, hoặc từ khóa...',
    searchButton: 'Tìm kiếm',

    // Property types
    propertyTypes: 'Loại bất động sản',
    apartment: 'Căn hộ chung cư',
    house: 'Nhà riêng',
    villa: 'Biệt thự',
    land: 'Đất nền',
    office: 'Văn phòng',
    shophouse: 'Shophouse',

    // Listing types
    forSale: 'Nhà đất bán',
    forRent: 'Nhà đất cho thuê',
    sale: 'Bán',
    rent: 'Cho thuê',

    // Features section
    whyChooseUs: 'Tại sao chọn chúng tôi?',
    fastSearch: 'Tìm kiếm nhanh chóng',
    fastSearchDesc: 'Hệ thống tìm kiếm thông minh giúp bạn tìm được sản phẩm phù hợp trong vài giây',
    safeReliable: 'An toàn & Uy tín',
    safeReliableDesc: 'Thông tin được xác minh, đảm bảo giao dịch an toàn cho người mua và người bán',
    continuousUpdate: 'Cập nhật liên tục',
    continuousUpdateDesc: 'Hàng nghìn tin đăng mới mỗi ngày trong nhiều danh mục khác nhau',

    // CTA section
    readyToFind: 'Sẵn sàng tìm kiếm?',
    startNow: 'Đăng tin miễn phí ngay hôm nay để tiếp cận người mua tiềm năng',
    browseProperties: 'Xem tin đăng',
    postForFree: 'Đăng tin miễn phí',

    // Property details
    price: 'Giá',
    area: 'Diện tích',
    bedrooms: 'Phòng ngủ',
    bathrooms: 'Phòng tắm',
    address: 'Địa chỉ',
    description: 'Mô tả',
    contactOwner: 'Liên hệ chủ nhà',
    addToFavorites: 'Thêm vào yêu thích',
    removeFromFavorites: 'Bỏ yêu thích',
    share: 'Chia sẻ',

    // Filters
    filters: 'Bộ lọc',
    priceRange: 'Khoảng giá',
    areaRange: 'Diện tích',
    minPrice: 'Giá tối thiểu',
    maxPrice: 'Giá tối đa',
    minArea: 'Diện tích tối thiểu',
    maxArea: 'Diện tích tối đa',
    city: 'Tỉnh/Thành phố',
    district: 'Quận/Huyện',
    allCities: 'Tất cả tỉnh thành',
    allDistricts: 'Tất cả quận huyện',
    allTypes: 'Tất cả loại',
    applyFilters: 'Áp dụng',
    resetFilters: 'Đặt lại',

    // Forms
    email: 'Email',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    fullName: 'Họ và tên',
    phone: 'Số điện thoại',
    title: 'Tiêu đề',
    submit: 'Gửi',
    cancel: 'Hủy',
    save: 'Lưu',
    edit: 'Sửa',
    delete: 'Xóa',

    // Messages
    loginSuccess: 'Đăng nhập thành công',
    loginError: 'Email hoặc mật khẩu không đúng',
    registerSuccess: 'Đăng ký thành công',
    propertyCreated: 'Đăng tin thành công',
    propertyUpdated: 'Cập nhật thành công',
    propertyDeleted: 'Xóa tin thành công',
    messageSent: 'Gửi tin nhắn thành công',
    addedToFavorites: 'Đã thêm vào yêu thích',
    removedFromFavorites: 'Đã bỏ yêu thích',

    // Misc
    noResults: 'Không tìm thấy kết quả',
    loading: 'Đang tải...',
    error: 'Có lỗi xảy ra',
    viewMore: 'Xem thêm',
    viewDetails: 'Xem chi tiết',
    perMonth: '/tháng',
    sqm: 'm²',
    billion: 'tỷ',
    million: 'triệu',

    // Settings
    settings: 'Cài đặt',
    theme: 'Giao diện',
    language: 'Ngôn ngữ',
    lightMode: 'Sáng',
    darkMode: 'Tối',
    systemMode: 'Theo hệ thống',
  },
  en: {
    // Navigation
    home: 'Home',
    search: 'Search',
    map: 'Map',
    favorites: 'Favorites',
    myProperties: 'My Properties',
    account: 'Account',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    postProperty: 'Post Listing',

    // Hero section
    heroTitle: 'Buy & Sell Everything',
    heroSubtitle: 'Real estate, vehicles, electronics, fashion - all in one place',
    searchPlaceholder: 'Enter location, project, or keyword...',
    searchButton: 'Search',

    // Property types
    propertyTypes: 'Property Types',
    apartment: 'Apartment',
    house: 'House',
    villa: 'Villa',
    land: 'Land',
    office: 'Office',
    shophouse: 'Shophouse',

    // Listing types
    forSale: 'For Sale',
    forRent: 'For Rent',
    sale: 'Sale',
    rent: 'Rent',

    // Features section
    whyChooseUs: 'Why Choose Us?',
    fastSearch: 'Fast Search',
    fastSearchDesc: 'Smart search system helps you find the right item in seconds',
    safeReliable: 'Safe & Reliable',
    safeReliableDesc: 'Verified information ensures safe transactions for buyers and sellers',
    continuousUpdate: 'Continuous Updates',
    continuousUpdateDesc: 'Thousands of new listings every day across multiple categories',

    // CTA section
    readyToFind: 'Ready to Find?',
    startNow: 'Post for free today and reach potential buyers',
    browseProperties: 'Browse Listings',
    postForFree: 'Post for Free',

    // Property details
    price: 'Price',
    area: 'Area',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    address: 'Address',
    description: 'Description',
    contactOwner: 'Contact Owner',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    share: 'Share',

    // Filters
    filters: 'Filters',
    priceRange: 'Price Range',
    areaRange: 'Area Range',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    minArea: 'Min Area',
    maxArea: 'Max Area',
    city: 'City/Province',
    district: 'District',
    allCities: 'All Cities',
    allDistricts: 'All Districts',
    allTypes: 'All Types',
    applyFilters: 'Apply',
    resetFilters: 'Reset',

    // Forms
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    phone: 'Phone Number',
    title: 'Title',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',

    // Messages
    loginSuccess: 'Login successful',
    loginError: 'Invalid email or password',
    registerSuccess: 'Registration successful',
    propertyCreated: 'Property posted successfully',
    propertyUpdated: 'Property updated successfully',
    propertyDeleted: 'Property deleted successfully',
    messageSent: 'Message sent successfully',
    addedToFavorites: 'Added to favorites',
    removedFromFavorites: 'Removed from favorites',

    // Misc
    noResults: 'No results found',
    loading: 'Loading...',
    error: 'An error occurred',
    viewMore: 'View More',
    viewDetails: 'View Details',
    perMonth: '/month',
    sqm: 'sqm',
    billion: 'B',
    million: 'M',

    // Settings
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    lightMode: 'Light',
    darkMode: 'Dark',
    systemMode: 'System',
  },
} as const;

export type TranslationKey = keyof typeof translations.vi;

// Helper function to get translation
export function t(key: TranslationKey, language: Language): string {
  return translations[language][key] || translations.vi[key] || key;
}
