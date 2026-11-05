import { CardRenderOptions } from '../types';
import { escapeXml, sanitizeColor } from '../sanitizer';
import { getExpressionForStreak, getStreakTier } from '../../mascots/types';
import { renderMascotSvg } from '../../mascots/mascots';

export function renderTerminalLayout(opts: CardRenderOptions): string {
  const { stats, theme, mascotId, customExpression, animated, hideBorder, radius } = opts;

  const bg = sanitizeColor(opts.customBg, theme.background);
  const border = hideBorder ? 'transparent' : sanitizeColor(opts.customBorder, theme.border);
  const text = sanitizeColor(opts.customText, theme.text);
  const muted = theme.muted;
  const primary = sanitizeColor(opts.customPrimary, theme.primary);
  const flame = theme.flame;

  const width = 520;
  const height = 215;

  const tier = getStreakTier(stats.currentStreak.count);
  const expression = getExpressionForStreak(stats.currentStreak.count, customExpression);

  const mascotSvg = renderMascotSvg(mascotId, expression, tier, {
    animated,
    width: 80,
    height: 80,
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="termGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="#0a0c10" />
        </linearGradient>
      </defs>

      <style>
        .mono { font-family: 'JetBrains Mono', 'Fira Code', Menlo, Consolas, Monaco, monospace; }
        .bold { font-weight: 700; }
        ${animated ? `
          .cursor-blink {
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            50% { opacity: 0; }
          }
        ` : ''}
      </style>

      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}"
            fill="url(#termGrad)" stroke="${border}" stroke-width="1.5" />

      <!-- Terminal Top Bar -->
      <g transform="translate(16, 14)">
        <circle cx="0" cy="0" r="5" fill="#EF4444" />
        <circle cx="16" cy="0" r="5" fill="#F59E0B" />
        <circle cx="32" cy="0" r="5" fill="#10B981" />
        <text x="56" y="4" fill="${muted}" font-size="11" class="mono">
          geostreak: ~/${escapeXml(stats.username)} (zsh)
        </text>
      </g>
      <line x1="1" y1="28" x2="${width - 1}" y2="28" stroke="${border}" stroke-width="1" />

      <!-- Terminal Content -->
      <g transform="translate(24, 52)">
        <!-- Command Line -->
        <text x="0" y="0" fill="${primary}" font-size="12" class="mono bold">
          ❯ <tspan fill="${text}">geostreak stats --user ${escapeXml(stats.username)}</tspan>
        </text>

        <!-- Output Box -->
        <g transform="translate(4, 18)">
          <text x="0" y="14" fill="${muted}" font-size="11" class="mono">┌─── Contribution Metrics ──────────┐</text>
          
          <text x="0" y="36" fill="${muted}" font-size="11" class="mono">│ Current Streak : </text>
          <text x="145" y="36" fill="${flame}" font-size="11" class="mono bold">${stats.currentStreak.count} days</text>
          <text x="264" y="36" fill="${muted}" font-size="11" class="mono">│</text>

          <text x="0" y="56" fill="${muted}" font-size="11" class="mono">│ Longest Streak : </text>
          <text x="145" y="56" fill="${primary}" font-size="11" class="mono bold">${stats.longestStreak.count} days</text>
          <text x="264" y="56" fill="${muted}" font-size="11" class="mono">│</text>

          <text x="0" y="76" fill="${muted}" font-size="11" class="mono">│ Total Activity : </text>
          <text x="145" y="76" fill="${text}" font-size="11" class="mono bold">${stats.totalContributions.toLocaleString()} commits</text>
          <text x="264" y="76" fill="${muted}" font-size="11" class="mono">│</text>

          <text x="0" y="98" fill="${muted}" font-size="11" class="mono">└─── Status: <tspan fill="#10B981">Online</tspan> ─────────────────┘</text>
        </g>

        <!-- Prompt with blinking cursor -->
        <g transform="translate(0, 134)">
          <text x="0" y="0" fill="${primary}" font-size="12" class="mono bold">❯ </text>
          <rect x="14" y="-10" width="7" height="12" fill="${text}" class="${animated ? 'cursor-blink' : ''}" />
        </g>
      </g>

      <!-- Terminal Mascot on Right -->
      <g transform="translate(${width - 110}, 65)">
        ${mascotSvg}
      </g>
    </svg>
  `;
}
