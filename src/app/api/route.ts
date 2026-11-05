import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubUserStats } from '@/lib/github/client';
import { getTheme, THEMES } from '@/lib/themes';
import { MascotId, MascotExpression } from '@/lib/mascots/types';
import { MASCOTS } from '@/lib/mascots/mascots';
import { CardLayoutId } from '@/lib/svg/types';
import { generateStreakCardSvg, generateErrorCardSvg } from '@/lib/svg/generator';
import { clampNumber, parseBoolean, sanitizeColor } from '@/lib/svg/sanitizer';
import { checkRateLimit, getCachedSvg, getCachedUserStats, setCachedSvg, setCachedUserStats } from '@/lib/cache';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Rate Limiting
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const rateLimit = checkRateLimit(clientIp);

  if (!rateLimit.allowed) {
    const errorSvg = generateErrorCardSvg(
      'Rate limit exceeded. Please wait a minute before requesting again.',
      THEMES['tokyo-night']
    );
    return new NextResponse(errorSvg, {
      status: 429,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Retry-After': '60',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // Parse parameters
  const user = searchParams.get('user') || searchParams.get('username');
  const themeParam = searchParams.get('theme') || 'tokyo-night';
  const theme = getTheme(themeParam);

  const customBg = searchParams.get('background') || searchParams.get('bg') || undefined;
  const customBorder = searchParams.get('border') || undefined;
  const customText = searchParams.get('text') || searchParams.get('color') || undefined;
  const customPrimary = searchParams.get('primary') || undefined;

  const hideBorder = parseBoolean(searchParams.get('hide_border'), false);
  const hideTitle = parseBoolean(searchParams.get('hide_title'), false);
  const hideCurrentStreak = parseBoolean(searchParams.get('hide_current_streak'), false);
  const hideLongestStreak = parseBoolean(searchParams.get('hide_longest_streak'), false);
  const hideTotalContributions = parseBoolean(searchParams.get('hide_total_contributions'), false);
  const animation = parseBoolean(searchParams.get('animation'), true);
  const showGraph = parseBoolean(searchParams.get('show_graph') || searchParams.get('show_calendar'), false);
  const compact = parseBoolean(searchParams.get('compact'), false);

  const rawLayout = (searchParams.get('layout') || (compact ? 'compact' : showGraph ? 'graph' : 'classic')).toLowerCase();
  const validLayouts: CardLayoutId[] = ['classic', 'minimal', 'graph', 'mascot', 'terminal', 'glass', 'compact'];
  const layout: CardLayoutId = validLayouts.includes(rawLayout as CardLayoutId) ? (rawLayout as CardLayoutId) : 'classic';

  const rawMascot = (searchParams.get('mascot') || 'streaky').toLowerCase();
  const mascotId: MascotId = rawMascot in MASCOTS ? (rawMascot as MascotId) : 'streaky';

  const rawExpression = searchParams.get('expression')?.toLowerCase();
  const validExpressions: MascotExpression[] = ['idle', 'happy', 'excited', 'sleeping', 'surprised', 'celebrating', 'determined'];
  const customExpression: MascotExpression | undefined = validExpressions.includes(rawExpression as MascotExpression)
    ? (rawExpression as MascotExpression)
    : undefined;

  const radius = clampNumber(searchParams.get('radius'), 0, 32, 14);

  // Validate username
  if (!user || user.trim() === '') {
    const errorSvg = generateErrorCardSvg(
      'Missing "user" query parameter. Example: /api?user=torvalds',
      theme,
      customBg,
      customBorder
    );
    return new NextResponse(errorSvg, {
      status: 400,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // Construct cache key for rendered SVG
  const normalizedUser = user.toLowerCase().trim();
  const svgCacheKey = `svg:${normalizedUser}:${theme.id}:${layout}:${mascotId}:${animation}:${hideBorder}:${hideTitle}:${hideCurrentStreak}:${hideLongestStreak}:${hideTotalContributions}:${radius}:${customBg || ''}:${customBorder || ''}:${customText || ''}`;

  const cachedSvg = await getCachedSvg(svgCacheKey);
  if (cachedSvg) {
    return new NextResponse(cachedSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1200, s-maxage=1800, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'X-GeoStreak-Cache': 'HIT',
      },
    });
  }

  // Fetch or retrieve cached stats
  try {
    let stats = await getCachedUserStats(normalizedUser);
    if (!stats) {
      stats = await fetchGitHubUserStats(normalizedUser);
      await setCachedUserStats(normalizedUser, stats);
    }

    const svg = generateStreakCardSvg({
      stats,
      theme,
      mascotId,
      customExpression,
      animated: animation,
      layout,
      hideBorder,
      hideTitle,
      hideCurrentStreak,
      hideLongestStreak,
      hideTotalContributions,
      showGraph,
      radius,
      customBg,
      customBorder,
      customText,
      customPrimary,
    });

    // Save to SVG cache
    await setCachedSvg(svgCacheKey, svg);

    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1200, s-maxage=1800, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'X-GeoStreak-Cache': 'MISS',
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to retrieve GitHub contributions';
    const errorSvg = generateErrorCardSvg(errorMsg, theme, customBg, customBorder);

    const status = errorMsg.includes('does not exist') || errorMsg.includes('not found') ? 404 : 500;

    return new NextResponse(errorSvg, {
      status,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
