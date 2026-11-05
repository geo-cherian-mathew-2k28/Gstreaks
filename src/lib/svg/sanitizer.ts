/**
 * XML and SVG Sanitizer Utility
 * Ensures safe rendering and prevents SVG/XSS injection attacks.
 */

export function escapeXml(str: string | number | undefined | null): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const HEX_COLOR_REGEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGB_COLOR_REGEX = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i;

export function isValidColor(color?: string): boolean {
  if (!color) return false;
  const c = color.trim();
  // Support hex with or without leading hash in query params e.g. "ff0055" or "#ff0055"
  if (HEX_COLOR_REGEX.test(c) || HEX_COLOR_REGEX.test('#' + c)) return true;
  if (RGB_COLOR_REGEX.test(c)) return true;
  return false;
}

export function sanitizeColor(color: string | undefined, fallback: string): string {
  if (!color) return fallback;
  const c = color.trim();
  if (HEX_COLOR_REGEX.test(c)) return c;
  if (HEX_COLOR_REGEX.test('#' + c)) return '#' + c;
  if (RGB_COLOR_REGEX.test(c)) return c;
  return fallback;
}

export function clampNumber(
  val: string | number | undefined | null,
  min: number,
  max: number,
  defaultVal: number
): number {
  if (val === undefined || val === null) return defaultVal;
  const num = typeof val === 'number' ? val : parseInt(val, 10);
  if (isNaN(num)) return defaultVal;
  return Math.min(Math.max(num, min), max);
}

export function parseBoolean(
  val: string | boolean | undefined | null,
  defaultVal = false
): boolean {
  if (val === undefined || val === null) return defaultVal;
  if (typeof val === 'boolean') return val;
  const s = String(val).toLowerCase().trim();
  if (s === 'true' || s === '1' || s === 'yes') return true;
  if (s === 'false' || s === '0' || s === 'no') return false;
  return defaultVal;
}
