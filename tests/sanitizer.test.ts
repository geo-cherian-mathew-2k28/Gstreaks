import { describe, it, expect } from 'vitest';
import { escapeXml, isValidColor, sanitizeColor, clampNumber, parseBoolean } from '@/lib/svg/sanitizer';

describe('Sanitizer & Security Utilities', () => {
  it('escapes dangerous XML/HTML characters to prevent SVG injection', () => {
    const dangerous = '<script>alert("XSS")</script>&"\'';
    const escaped = escapeXml(dangerous);
    expect(escaped).not.toContain('<script>');
    expect(escaped).toContain('&lt;script&gt;');
    expect(escaped).toContain('&quot;XSS&quot;');
    expect(escaped).toContain('&amp;');
    expect(escaped).toContain('&apos;');
  });

  it('validates and sanitizes hex and rgb colors safely', () => {
    expect(isValidColor('#ffffff')).toBe(true);
    expect(isValidColor('#fff')).toBe(true);
    expect(isValidColor('1a1b26')).toBe(true);
    expect(isValidColor('rgb(255, 0, 0)')).toBe(true);
    expect(isValidColor('rgba(255, 0, 0, 0.5)')).toBe(true);

    // Malicious or invalid injection attempts
    expect(isValidColor('"><script>alert(1)</script>')).toBe(false);
    expect(isValidColor('red; background: black')).toBe(false);
    expect(isValidColor('')).toBe(false);

    expect(sanitizeColor('1a1b26', '#000')).toBe('#1a1b26');
    expect(sanitizeColor('#1a1b26', '#000')).toBe('#1a1b26');
    expect(sanitizeColor('invalid-hack', '#000')).toBe('#000');
  });

  it('clamps numbers within range boundaries', () => {
    expect(clampNumber(20, 0, 32, 14)).toBe(20);
    expect(clampNumber(100, 0, 32, 14)).toBe(32);
    expect(clampNumber(-5, 0, 32, 14)).toBe(0);
    expect(clampNumber(undefined, 0, 32, 14)).toBe(14);
    expect(clampNumber('not-a-number', 0, 32, 14)).toBe(14);
  });

  it('corrects and parses boolean values', () => {
    expect(parseBoolean('true', false)).toBe(true);
    expect(parseBoolean('1', false)).toBe(true);
    expect(parseBoolean('false', true)).toBe(false);
    expect(parseBoolean('0', true)).toBe(false);
    expect(parseBoolean(undefined, true)).toBe(true);
  });
});
