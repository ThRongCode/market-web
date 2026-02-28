import { sanitizeText, clampPageSize, clampPage, clampKeyword } from '../api-utils';

describe('sanitizeText', () => {
  it('removes script tags', () => {
    const input = 'Hello <script>alert("xss")</script> World';
    expect(sanitizeText(input)).toBe('Hello  World');
  });

  it('removes HTML tags', () => {
    const input = '<b>Bold</b> and <i>italic</i>';
    expect(sanitizeText(input)).toBe('Bold and italic');
  });

  it('truncates to maxLength', () => {
    const input = 'a'.repeat(100);
    expect(sanitizeText(input, 50)).toHaveLength(50);
  });

  it('trims whitespace', () => {
    expect(sanitizeText('  hello  ')).toBe('hello');
  });
});

describe('clampPageSize', () => {
  it('returns default for null', () => {
    expect(clampPageSize(null)).toBe(12);
  });

  it('clamps to max', () => {
    expect(clampPageSize('100')).toBe(50);
  });

  it('returns default for invalid input', () => {
    expect(clampPageSize('abc')).toBe(12);
    expect(clampPageSize('0')).toBe(12);
    expect(clampPageSize('-5')).toBe(12);
  });

  it('accepts valid values', () => {
    expect(clampPageSize('20')).toBe(20);
  });
});

describe('clampPage', () => {
  it('returns 1 for null', () => {
    expect(clampPage(null)).toBe(1);
  });

  it('returns 1 for invalid input', () => {
    expect(clampPage('abc')).toBe(1);
    expect(clampPage('-1')).toBe(1);
  });

  it('accepts valid values', () => {
    expect(clampPage('5')).toBe(5);
  });
});

describe('clampKeyword', () => {
  it('returns empty string for null', () => {
    expect(clampKeyword(null)).toBe('');
  });

  it('trims and limits length', () => {
    const long = 'a'.repeat(200);
    expect(clampKeyword(long)).toHaveLength(100);
  });

  it('trims whitespace', () => {
    expect(clampKeyword('  hello  ')).toBe('hello');
  });
});
