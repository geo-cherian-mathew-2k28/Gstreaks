import { CardRenderOptions } from '../types';
import { escapeXml, sanitizeColor } from '../sanitizer';
import { getExpressionForStreak, getStreakTier } from '../../mascots/types';
import { renderMascotSvg } from '../../mascots/mascots';

export function renderMinimalLayout(opts: CardRenderOptions): string {
  const { stats, theme, mascotId, customExpression, animated, hideBorder, hideTitle, hideCurrentStreak, hideLongestStreak, hideTotalContributions, radius } = opts;

  const bg = sanitizeColor(opts.customBg, theme.background);
  const border = hideBorder ? 'transparent' : sanitizeColor(opts.customBorder, theme.border);
  const text = sanitizeColor(opts.customText, theme.text);
  const muted = theme.muted;
  const primary = sanitizeColor(opts.customPrimary, theme.primary);
  const flame = theme.flame;

  const width = 460;
  const height = 125;

  const tier = getStreakTier(stats.currentStreak.count);
  const expression = getExpressionForStreak(stats.currentStreak.count, customExpression);

  const mascotSvg = renderMascotSvg(mascotId, expression, tier, {
    animated,
    width: 68,
    height: 68,
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="minBg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="${theme.surface}" />
        </linearGradient>
      </defs>

      <style>
        .bold { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; }
        .regular { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 400; }
        .mono { font-family: 'JetBrains Mono', Consolas, Monaco, monospace; }
      </style>

      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}"
            fill="url(#minBg)" stroke="${border}" stroke-width="1.5" />

      <!-- Left Mascot -->
      <g transform="translate(18, 28)">
        ${mascotSvg}
      </g>

      <!-- Center Content -->
      <g transform="translate(100, 24)">
        ${!hideTitle ? `
          <text x="0" y="14" fill="${text}" font-size="14" class="bold">
            ${escapeXml(stats.username)} <tspan fill="${muted}" font-size="11" class="regular">streaks</tspan>
          </text>
        ` : ''}

        <!-- Metrics Row -->
        <g transform="translate(0, ${hideTitle ? 14 : 34})">
          ${!hideCurrentStreak ? `
            <g transform="translate(0, 0)">
              <text x="0" y="12" fill="${muted}" font-size="10" class="bold">CURRENT</text>
              <text x="0" y="36" fill="${flame}" font-size="22" class="bold">${stats.currentStreak.count} <tspan font-size="12" fill="${text}">days</tspan></text>
            </g>
          ` : ''}

          ${!hideLongestStreak ? `
            <g transform="translate(110, 0)">
              <text x="0" y="12" fill="${muted}" font-size="10" class="bold">LONGEST</text>
              <text x="0" y="36" fill="${primary}" font-size="22" class="bold">${stats.longestStreak.count} <tspan font-size="12" fill="${text}">days</tspan></text>
            </g>
          ` : ''}

          ${!hideTotalContributions ? `
            <g transform="translate(220, 0)">
              <text x="0" y="12" fill="${muted}" font-size="10" class="bold">TOTAL</text>
              <text x="0" y="36" fill="${text}" font-size="22" class="bold">${stats.totalContributions.toLocaleString()}</text>
            </g>
          ` : ''}
        </g>
      </g>
    </svg>
  `;
}
