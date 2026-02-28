// Centralized site configuration — single source of truth
// All contact info, branding, and social links live here.

export const SITE_CONFIG = {
  name: 'ChoTot',
  url: 'https://chotot.com',
  description: {
    vi: 'Chợ trực tuyến hàng đầu Việt Nam. Mua bán bất động sản, xe cộ, điện tử, thời trang và nhiều hơn nữa.',
    en: "Vietnam's leading online marketplace. Buy and sell real estate, vehicles, electronics, fashion and more.",
  },
  contact: {
    phone: '1900 1234',
    email: 'support@chotot.com',
    address: '123 Nguyễn Văn Linh, Quận 7, TP. HCM',
  },
  social: {
    facebook: 'https://facebook.com/chotot',
    youtube: 'https://youtube.com/@chotot',
    instagram: 'https://instagram.com/chotot',
  },
} as const;
