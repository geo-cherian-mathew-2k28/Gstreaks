import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubUserStats } from '@/lib/github/client';
import { getCachedUserStats, setCachedUserStats } from '@/lib/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user') || searchParams.get('username');

  if (!user || user.trim() === '') {
    return NextResponse.json(
      { success: false, error: 'Missing "user" query parameter' },
      { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  const normalizedUser = user.toLowerCase().trim();

  try {
    let stats = await getCachedUserStats(normalizedUser);
    if (!stats) {
      stats = await fetchGitHubUserStats(normalizedUser);
      await setCachedUserStats(normalizedUser, stats);
    }

    return NextResponse.json(
      { success: true, data: stats },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=1800, s-maxage=1800',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to fetch GitHub contributions';
    const status = errorMsg.includes('does not exist') || errorMsg.includes('not found') ? 404 : 500;
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
