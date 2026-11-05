import { CardRenderOptions } from '../types';
import { escapeXml, sanitizeColor } from '../sanitizer';
import { getExpressionForStreak, getStreakTier } from '../../mascots/types';
import { renderMascotSvg } from '../../mascots/mascots';

export function renderCompactLayout(opts: CardRenderOptions): string {
  const { stats, theme, mascotId, customExpression, animated, hideBorder, radius } = opts;

  const bg = sanitizeColor(opts.customBg, theme.background);
  const border = hideBorder ? 'transparent' : sanitizeColor(opts.customBorder, theme.border);
  const text = sanitizeColor(opts.customText, theme.text);
  const muted = theme.muted;
  const primary = sanitizeColor(opts.customPrimary, theme.primary);
  const flame = theme.flame;

  const width = 530;
  const height = 90;

  const tier = getStreakTier(stats.currentStreak.count);
  const expression = getExpressionForStreak(stats.currentStreak.count, customExpression);

  const mascotSvg = renderMascotSvg(mascotId, expression, tier, {
    animated,
    width: 60,
    height: 60,
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="compBg" x1="0%" y1="0%" x2="100%" y2="0%">
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
            fill="url(#compBg)" stroke="${border}" stroke-width="1.5" />

      <!-- Left Mascot -->
      <g transform="translate(14, 15)">
        ${mascotSvg}
      </g>

      <!-- Center Content Single Row -->
      <g transform="translate(86, 26)">
        <text x="0" y="0" fill="${text}" font-size="13" class="bold">
          ${escapeXml(stats.username)}
        </text>

        <!-- Inline Badges -->
        <g transform="translate(0, 14)">
          <!-- Current Streak -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="120" height="34" rx="6" fill="${theme.surface}" stroke="${border}" stroke-width="1" />
            <text x="8" y="14" fill="${muted}" font-size="8.5" class="bold">CURRENT</text>
            <text x="8" y="28" fill="${flame}" font-size="14" class="bold">${stats.currentStreak.count} <tspan font-size="9" fill="${text}">days</tspan></text>
          </g>

          <!-- Longest Streak -->
          <g transform="translate(128, 0)">
            <rect x="0" y="0" width="120" height="34" rx="6" fill="${theme.surface}" stroke="${border}" stroke-width="1" />
            <text x="8" y="14" fill="${muted}" font-size="8.5" class="bold">LONGEST</text>
            <text x="8" y="28" fill="${primary}" font-size="14" class="bold">${stats.longestStreak.count} <tspan font-size="9" fill="${text}">days</tspan></text>
          </g>

          <!-- Total Contributions -->
          <g transform="translate(256, 0)">
            <rect x="0" y="0" width="130" height="34" rx="6" fill="${theme.surface}" stroke="${border}" stroke-width="1" />
            <text x="8" y="14" fill="${muted}" font-size="8.5" class="bold">TOTAL COMMITS</text>
            <text x="8" y="28" fill="${text}" font-size="14" class="bold">${stats.totalContributions.toLocaleString()}</text>
          </g>
        </g>
      </g>
    </svg>
  `;
}
