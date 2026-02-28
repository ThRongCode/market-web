import { rateLimit, getClientIp } from '../rate-limit';

describe('rateLimit', () => {
  it('allows requests under the limit', () => {
    const config = { maxRequests: 3, windowMs: 60000 };
    const result1 = rateLimit('test-key-1', config);
    expect(result1.success).toBe(true);
    expect(result1.remaining).toBe(2);
  });

  it('blocks requests over the limit', () => {
    const config = { maxRequests: 2, windowMs: 60000 };
    rateLimit('test-key-2', config);
    rateLimit('test-key-2', config);
    const result = rateLimit('test-key-2', config);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('uses separate counters per key', () => {
    const config = { maxRequests: 1, windowMs: 60000 };
    const result1 = rateLimit('key-a', config);
    const result2 = rateLimit('key-b', config);
    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
  });
});

describe('getClientIp', () => {
  it('extracts IP from x-forwarded-for header', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
    });
    expect(getClientIp(request)).toBe('1.2.3.4');
  });

  it('extracts IP from x-real-ip header', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-real-ip': '9.8.7.6' },
    });
    expect(getClientIp(request)).toBe('9.8.7.6');
  });

  it('falls back to 127.0.0.1', () => {
    const request = new Request('http://localhost');
    expect(getClientIp(request)).toBe('127.0.0.1');
  });
});
