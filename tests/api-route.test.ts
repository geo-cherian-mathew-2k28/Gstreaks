import { describe, it, expect, vi } from 'vitest';
import { GET } from '@/app/api/route';
import { NextRequest } from 'next/server';
import { setCachedUserStats } from '@/lib/cache';

describe('API Route Handler GET /api', () => {
  it('returns 400 error card when username is missing', async () => {
    const req = new NextRequest('http://localhost:3000/api');
    const res = await GET(req);

    expect(res.status).toBe(400);
    expect(res.headers.get('content-type')).toContain('image/svg+xml');

    const body = await res.text();
    expect(body).toContain('<svg');
    // Notice XML entity escaping &quot;
    expect(body).toContain('Missing &quot;user&quot; query parameter');
  });

  it('renders valid SVG card for valid parameters with cached/mocked user', async () => {
    await setCachedUserStats('torvalds', {
      username: 'torvalds',
      totalContributions: 850,
      currentStreak: { count: 12, startDate: '2024-10-24', endDate: '2024-11-05' },
      longestStreak: { count: 35, startDate: '2024-03-01', endDate: '2024-04-05' },
      totalDays: 365,
      contributedDays: 180,
      allDays: [],
      weeks: [],
      isNewAccount: false,
      hasZeroContributions: false,
      fetchedAt: new Date().toISOString(),
    });

    const req = new NextRequest(
      'http://localhost:3000/api?user=torvalds&theme=dracula&layout=compact&animation=true'
    );
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('image/svg+xml');

    const body = await res.text();
    expect(body).toContain('<svg');
    expect(body).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(body).toContain('torvalds');
  });

  it('safely sanitizes invalid colors and unknown themes', async () => {
    const req = new NextRequest(
      'http://localhost:3000/api?user=torvalds&theme=nonexistent&background=hack%22%3E%3Cscript%3E'
    );
    const res = await GET(req);

    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).not.toContain('<script>');
  });
});
