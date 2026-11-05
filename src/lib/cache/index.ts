import { LRUCache } from 'lru-cache';
import { UserStats } from '../github/types';

// In-memory LRU cache for user stats (45 minutes TTL)
const statsCache = new LRUCache<string, UserStats>({
  max: 1000,
  ttl: 45 * 60 * 1000, // 45 minutes
});

// In-memory LRU cache for rendered SVG cards (20 minutes TTL)
const svgCache = new LRUCache<string, string>({
  max: 2000,
  ttl: 20 * 60 * 1000, // 20 minutes
});

// Simple sliding window rate limiter for abuse prevention
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const ipRateLimits = new LRUCache<string, RateLimitRecord>({
  max: 5000,
  ttl: 60 * 1000, // 1 minute window
});

/**
 * Checks and updates rate limit for a client IP.
 * Default: 120 requests per minute per IP.
 */
export function checkRateLimit(ip: string, limit = 120): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  let record = ipRateLimits.get(ip);

  if (!record || now > record.resetAt) {
    record = {
      count: 1,
      resetAt: now + 60 * 1000,
    };
    ipRateLimits.set(ip, record);
    return { allowed: true, remaining: limit - 1, resetAt: record.resetAt };
  }

  record.count++;
  if (record.count > limit) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  return { allowed: true, remaining: limit - record.count, resetAt: record.resetAt };
}

/**
 * Get cached user stats
 */
export async function getCachedUserStats(username: string): Promise<UserStats | null> {
  const normalized = username.toLowerCase().trim();
  const local = statsCache.get(normalized);
  if (local) return local;

  // Optional Upstash Redis lookup
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/stats:${normalized}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        if (json.result) {
          const parsed = JSON.parse(json.result);
          statsCache.set(normalized, parsed);
          return parsed;
        }
      }
    } catch {
      // Ignore remote redis lookup errors and proceed
    }
  }

  return null;
}

/**
 * Save cached user stats
 */
export async function setCachedUserStats(username: string, stats: UserStats): Promise<void> {
  const normalized = username.toLowerCase().trim();
  statsCache.set(normalized, stats);

  // Optional Upstash Redis store
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const url = `${process.env.UPSTASH_REDIS_REST_URL}/set/stats:${normalized}`;
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        body: JSON.stringify([JSON.stringify(stats), 'EX', 2700]), // 45 min
        cache: 'no-store',
      });
    } catch {
      // Ignore
    }
  }
}

/**
 * Get cached SVG card
 */
export async function getCachedSvg(cacheKey: string): Promise<string | null> {
  const local = svgCache.get(cacheKey);
  if (local) return local;
  return null;
}

/**
 * Set cached SVG card
 */
export async function setCachedSvg(cacheKey: string, svg: string): Promise<void> {
  svgCache.set(cacheKey, svg);
}
