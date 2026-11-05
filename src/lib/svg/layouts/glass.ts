import { CardRenderOptions } from '../types';
import { escapeXml, sanitizeColor } from '../sanitizer';
import { getExpressionForStreak, getStreakTier } from '../../mascots/types';
import { renderMascotSvg } from '../../mascots/mascots';

export function renderGlassLayout(opts: CardRenderOptions): string {
  const { stats, theme, mascotId, customExpression, animated, hideBorder, hideTitle, radius } = opts;

  const bg = sanitizeColor(opts.customBg, theme.background);
  const border = hideBorder ? 'transparent' : sanitizeColor(opts.customBorder, theme.border);
  const text = sanitizeColor(opts.customText, theme.text);
  const muted = theme.muted;
  const primary = sanitizeColor(opts.customPrimary, theme.primary);
  const flame = theme.flame;
  const secondary = theme.secondary;

  const width = 520;
  const height = 210;

  const tier = getStreakTier(stats.currentStreak.count);
  const expression = getExpressionForStreak(stats.currentStreak.count, customExpression);

  const mascotSvg = renderMascotSvg(mascotId, expression, tier, {
    animated,
    width: 90,
    height: 90,
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Background Radial Glow Orbs -->
        <radialGradient id="orb1" cx="20%" cy="30%" r="50%">
          <stop offset="0%" stop-color="${primary}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${bg}" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="orb2" cx="80%" cy="70%" r="50%">
          <stop offset="0%" stop-color="${secondary}" stop-opacity="0.3" />
          <stop offset="100%" stop-color="${bg}" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.03" />
        </linearGradient>
      </defs>

      <style>
        .bold { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; }
        .regular { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 400; }
        .mono { font-family: 'JetBrains Mono', Consolas, Monaco, monospace; }
        ${animated ? `
          .orb-drift {
            animation: orbDrift 8s ease-in-out infinite alternate;
          }
          @keyframes orbDrift {
            0% { transform: scale(1); }
            100% { transform: scale(1.15) translate(10px, -5px); }
          }
        ` : ''}
      </style>

      <!-- Main Deep Background -->
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="${bg}" />

      <!-- Ambient Glow Orbs -->
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#orb1)" class="${animated ? 'orb-drift' : ''}" />
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#orb2)" class="${animated ? 'orb-drift' : ''}" />

      <!-- Translucent Glass Foreground Card -->
      <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="${Math.max(6, radius - 4)}"
            fill="url(#glassGrad)" stroke="rgba(255, 255, 255, 0.18)" stroke-width="1.2" />

      <!-- Top Glass Header -->
      <g transform="translate(30, 36)">
        ${!hideTitle ? `
          <text x="0" y="10" fill="${text}" font-size="14" class="bold">
            ${escapeXml(stats.username)} <tspan fill="${muted}" class="regular">/ geostreak glass</tspan>
          </text>
        ` : ''}
      </g>

      <!-- Glass Stats Tiles -->
      <g transform="translate(30, 68)">
        <!-- Current Streak Tile -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="118" height="88" rx="10" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <text x="14" y="24" fill="${muted}" font-size="9.5" class="bold">CURRENT</text>
          <text x="14" y="52" fill="${flame}" font-size="24" class="bold">${stats.currentStreak.count} <tspan font-size="12" fill="${text}">d</tspan></text>
          <text x="14" y="72" fill="${muted}" font-size="8.5" class="regular">Active Streak</text>
        </g>

        <!-- Longest Streak Tile -->
        <g transform="translate(128, 0)">
          <rect x="0" y="0" width="118" height="88" rx="10" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <text x="14" y="24" fill="${muted}" font-size="9.5" class="bold">LONGEST</text>
          <text x="14" y="52" fill="${primary}" font-size="24" class="bold">${stats.longestStreak.count} <tspan font-size="12" fill="${text}">d</tspan></text>
          <text x="14" y="72" fill="${muted}" font-size="8.5" class="regular">Personal Best</text>
        </g>

        <!-- Total Activity Tile -->
        <g transform="translate(256, 0)">
          <rect x="0" y="0" width="118" height="88" rx="10" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
          <text x="14" y="24" fill="${muted}" font-size="9.5" class="bold">COMMITS</text>
          <text x="14" y="52" fill="${text}" font-size="24" class="bold">${stats.totalContributions.toLocaleString()}</text>
          <text x="14" y="72" fill="${muted}" font-size="8.5" class="regular">Yearly Activity</text>
        </g>
      </g>

      <!-- Mascot on Right -->
      <g transform="translate(${width - 105}, 65)">
        ${mascotSvg}
      </g>
    </svg>
  `;
}
