import { formatCurrency, formatArea, formatDate, formatRelativeTime, buildQueryString } from '../utils';

describe('formatCurrency', () => {
  it('formats billions correctly', () => {
    expect(formatCurrency(1500000000)).toBe('1.5 tỷ');
    expect(formatCurrency(2000000000)).toBe('2.0 tỷ');
  });

  it('formats millions correctly', () => {
    expect(formatCurrency(500000000)).toBe('500 triệu');
    expect(formatCurrency(50000000)).toBe('50 triệu');
  });

  it('formats small amounts with VND', () => {
    const result = formatCurrency(500000);
    expect(result).toContain('500');
  });
});

describe('formatArea', () => {
  it('formats area with m²', () => {
    expect(formatArea(100)).toContain('100');
    expect(formatArea(100)).toContain('m²');
  });
});

describe('formatDate', () => {
  it('formats dates in Vietnamese format', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});

describe('formatRelativeTime', () => {
  it('returns "Vừa xong" for recent times', () => {
    const now = new Date();
    expect(formatRelativeTime(now)).toBe('Vừa xong');
  });

  it('returns minutes ago', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatRelativeTime(fiveMinAgo)).toBe('5 phút trước');
  });

  it('returns hours ago', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoHoursAgo)).toBe('2 giờ trước');
  });

  it('returns days ago', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(threeDaysAgo)).toBe('3 ngày trước');
  });
});

describe('buildQueryString', () => {
  it('builds query string from params', () => {
    const result = buildQueryString({ city: 'Hà Nội', page: 1 });
    expect(result).toContain('city=');
    expect(result).toContain('page=1');
  });

  it('skips undefined, null, and empty values', () => {
    const result = buildQueryString({ a: 'test', b: undefined, c: null, d: '' });
    expect(result).toBe('a=test');
  });
});
