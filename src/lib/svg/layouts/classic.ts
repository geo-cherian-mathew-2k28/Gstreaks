import { CardRenderOptions } from '../types';
import { escapeXml, sanitizeColor } from '../sanitizer';
import { formatStreakRange } from '../../github/calculator';
import { getExpressionForStreak, getStreakTier } from '../../mascots/types';
import { renderMascotSvg } from '../../mascots/mascots';

export function renderClassicLayout(opts: CardRenderOptions): string {
  const { stats, theme, mascotId, customExpression, animated, hideBorder, hideTitle, hideCurrentStreak, hideLongestStreak, hideTotalContributions, radius } = opts;

  const bg = sanitizeColor(opts.customBg, theme.background);
  const surface = theme.surface;
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

  const currentRange = formatStreakRange(stats.currentStreak.startDate, stats.currentStreak.endDate);
  const longestRange = formatStreakRange(stats.longestStreak.startDate, stats.longestStreak.endDate);

  // Mascot SVG embedded
  const mascotSvg = renderMascotSvg(mascotId, expression, tier, {
    animated,
    width: 90,
    height: 90,
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="${surface}" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="${flame}" />
          <stop offset="100%" stop-color="#FCD34D" />
        </linearGradient>
        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <style>
        .bold { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; }
        .regular { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 400; }
        .mono { font-family: 'JetBrains Mono', Consolas, Monaco, monospace; }
        ${animated ? `
          .flame-pulse {
            animation: flamePulse 2s ease-in-out infinite;
            transform-origin: 125px 95px;
          }
          .shimmer {
            animation: textShimmer 3s ease-in-out infinite alternate;
          }
          @keyframes flamePulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px ${flame}); }
            50% { transform: scale(1.08); filter: drop-shadow(0 0 8px ${flame}); }
          }
          @keyframes textShimmer {
            0% { opacity: 0.9; }
            100% { opacity: 1; }
          }
        ` : ''}
      </style>

      <!-- Background Card -->
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}"
            fill="url(#cardGrad)" stroke="${border}" stroke-width="1.5" />

      <!-- Top Header -->
      ${!hideTitle ? `
        <g transform="translate(24, 30)">
          <!-- GeoStreak Logo Icon -->
          <circle cx="8" cy="4" r="8" fill="${primary}" opacity="0.2" />
          <path d="M8,-1 L11,4 L8,9 L5,4 Z" fill="${primary}" />
          <text x="24" y="9" fill="${text}" font-size="14" class="bold">
            ${escapeXml(stats.username)}<tspan fill="${muted}" class="regular"> / geostreak</tspan>
          </text>
          <!-- Streak Tier Badge -->
          <rect x="${width - 150}" y="-6" width="94" height="20" rx="10" fill="${primary}" opacity="0.15" />
          <text x="${width - 103}" y="8" fill="${primary}" font-size="10.5" class="bold" text-anchor="middle">
            ${tier.toUpperCase()} TIER
          </text>
        </g>
      ` : ''}

      <!-- Center Stats Columns -->
      <g transform="translate(24, ${hideTitle ? 48 : 65})">
        <!-- Current Streak Column -->
        ${!hideCurrentStreak ? `
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="128" height="92" rx="10" fill="${surface}" stroke="${border}" stroke-width="1" opacity="0.6" />
            <!-- Flame Icon -->
            <g transform="translate(18, 18)" class="${animated ? 'flame-pulse' : ''}">
              <path d="M0,12 C2,6 8,2 8,-4 C10,2 14,4 16,8 C18,14 12,20 8,20 C4,20 -2,16 0,12 Z" fill="url(#flameGrad)" />
            </g>
            <text x="44" y="22" fill="${muted}" font-size="10.5" class="bold">CURRENT</text>
            <text x="44" y="44" fill="${text}" font-size="24" class="bold">
              ${stats.currentStreak.count}<tspan font-size="12" fill="${flame}"> d</tspan>
            </text>
            <text x="14" y="74" fill="${muted}" font-size="8.5" class="regular">
              ${escapeXml(currentRange)}
            </text>
          </g>
        ` : ''}

        <!-- Longest Streak Column -->
        ${!hideLongestStreak ? `
          <g transform="translate(138, 0)">
            <rect x="0" y="0" width="128" height="92" rx="10" fill="${surface}" stroke="${border}" stroke-width="1" opacity="0.6" />
            <!-- Trophy Icon -->
            <g transform="translate(16, 18)">
              <path d="M2,2 L14,2 L14,8 C14,12 11,14 8,14 C5,14 2,12 2,8 Z M0,4 L2,4 L2,6 C1,6 0,5 0,4 Z M14,4 L16,4 C16,5 15,6 14,6 Z M8,14 L8,18 M4,18 L12,18"
                    stroke="${secondary}" stroke-width="1.8" stroke-linecap="round" fill="none" />
            </g>
            <text x="40" y="22" fill="${muted}" font-size="10.5" class="bold">LONGEST</text>
            <text x="40" y="44" fill="${text}" font-size="24" class="bold">
              ${stats.longestStreak.count}<tspan font-size="12" fill="${secondary}"> d</tspan>
            </text>
            <text x="12" y="74" fill="${muted}" font-size="8.5" class="regular">
              ${escapeXml(longestRange)}
            </text>
          </g>
        ` : ''}

        <!-- Total Contributions Column -->
        ${!hideTotalContributions ? `
          <g transform="translate(276, 0)">
            <rect x="0" y="0" width="128" height="92" rx="10" fill="${surface}" stroke="${border}" stroke-width="1" opacity="0.6" />
            <!-- Star / Graph Icon -->
            <g transform="translate(16, 18)">
              <rect x="0" y="0" width="14" height="14" rx="3" stroke="${primary}" stroke-width="1.5" fill="none" />
              <line x1="4" y1="10" x2="4" y2="7" stroke="${primary}" stroke-width="1.5" stroke-linecap="round" />
              <line x1="7" y1="10" x2="7" y2="4" stroke="${primary}" stroke-width="1.5" stroke-linecap="round" />
              <line x1="10" y1="10" x2="10" y2="6" stroke="${primary}" stroke-width="1.5" stroke-linecap="round" />
            </g>
            <text x="40" y="22" fill="${muted}" font-size="10.5" class="bold">TOTAL</text>
            <text x="40" y="44" fill="${text}" font-size="24" class="bold">
              ${stats.totalContributions.toLocaleString()}
            </text>
            <text x="14" y="74" fill="${muted}" font-size="8.5" class="regular">
              ${stats.contributedDays} active days
            </text>
          </g>
        ` : ''}
      </g>

      <!-- Mascot Column (Right) -->
      <g transform="translate(${width - 105}, ${hideTitle ? 50 : 70})">
        ${mascotSvg}
      </g>

      <!-- Bottom Watermark & Status Line -->
      <g transform="translate(26, ${height - 14})">
        <circle cx="3" cy="-3" r="3" fill="#10B981" />
        <text x="12" y="0" fill="${muted}" font-size="9" class="mono">
          geostreak.dev • verified live stats
        </text>
      </g>
    </svg>
  `;
}
