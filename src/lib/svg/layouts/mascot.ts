import { CardRenderOptions } from '../types';
import { escapeXml, sanitizeColor } from '../sanitizer';
import { getExpressionForStreak, getStreakTier } from '../../mascots/types';
import { renderMascotSvg } from '../../mascots/mascots';

export function renderMascotLayout(opts: CardRenderOptions): string {
  const { stats, theme, mascotId, customExpression, animated, hideBorder, hideTitle, radius } = opts;

  const bg = sanitizeColor(opts.customBg, theme.background);
  const surface = theme.surface;
  const border = hideBorder ? 'transparent' : sanitizeColor(opts.customBorder, theme.border);
  const text = sanitizeColor(opts.customText, theme.text);
  const muted = theme.muted;
  const primary = sanitizeColor(opts.customPrimary, theme.primary);
  const flame = theme.flame;

  const width = 530;
  const height = 220;

  const tier = getStreakTier(stats.currentStreak.count);
  const expression = getExpressionForStreak(stats.currentStreak.count, customExpression);

  const mascotSvg = renderMascotSvg(mascotId, expression, tier, {
    animated,
    width: 120,
    height: 120,
  });

  // Dynamic speech bubble text based on streak
  let speech = 'Ready to commit today?';
  if (stats.currentStreak.count === 0) {
    speech = 'Zzz... commit to wake me up!';
  } else if (stats.currentStreak.count <= 3) {
    speech = 'Great start! Keep it burning!';
  } else if (stats.currentStreak.count <= 7) {
    speech = 'Awesome! One week unstoppable!';
  } else if (stats.currentStreak.count <= 30) {
    speech = 'Incredible streak! You rock!';
  } else if (stats.currentStreak.count < 100) {
    speech = 'Celestial coder! Cosmic level!';
  } else {
    speech = 'Legendary champion! 100+ days!';
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mascotBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="${surface}" />
        </linearGradient>
      </defs>

      <style>
        .bold { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; }
        .regular { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 400; }
        .mono { font-family: 'JetBrains Mono', Consolas, Monaco, monospace; }
        ${animated ? `
          .speech-anim {
            animation: speechFloat 3s ease-in-out infinite alternate;
          }
          @keyframes speechFloat {
            0% { transform: translateY(0); }
            100% { transform: translateY(-3px); }
          }
        ` : ''}
      </style>

      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}"
            fill="url(#mascotBg)" stroke="${border}" stroke-width="1.5" />

      <!-- Left Hero Mascot -->
      <g transform="translate(18, 48)">
        ${mascotSvg}
      </g>

      <!-- Speech Bubble -->
      <g transform="translate(145, 24)" class="${animated ? 'speech-anim' : ''}">
        <rect x="0" y="0" width="230" height="36" rx="14" fill="${surface}" stroke="${border}" stroke-width="1" />
        <!-- Speech Bubble Pointer -->
        <polygon points="0,18 -8,22 0,26" fill="${surface}" />
        <path d="M0,18 L-8,22 L0,26" stroke="${border}" stroke-width="1" fill="${surface}" />
        <text x="14" y="22" fill="${text}" font-size="11" class="bold">
          ${escapeXml(speech)}
        </text>
      </g>

      <!-- Right Side Stats Cards -->
      <g transform="translate(150, 72)">
        ${!hideTitle ? `
          <text x="0" y="16" fill="${muted}" font-size="11" class="regular">
            STATS FOR <tspan fill="${text}" class="bold">${escapeXml(stats.username)}</tspan>
          </text>
        ` : ''}

        <!-- 3 Stat Blocks Row -->
        <g transform="translate(0, 28)">
          <!-- Current Streak -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="112" height="78" rx="8" fill="${surface}" stroke="${border}" stroke-width="1" />
            <text x="12" y="20" fill="${muted}" font-size="9.5" class="bold">CURRENT</text>
            <text x="12" y="46" fill="${flame}" font-size="22" class="bold">${stats.currentStreak.count}</text>
            <text x="12" y="64" fill="${muted}" font-size="8.5" class="regular">days streak</text>
          </g>

          <!-- Longest Streak -->
          <g transform="translate(122, 0)">
            <rect x="0" y="0" width="112" height="78" rx="8" fill="${surface}" stroke="${border}" stroke-width="1" />
            <text x="12" y="20" fill="${muted}" font-size="9.5" class="bold">LONGEST</text>
            <text x="12" y="46" fill="${primary}" font-size="22" class="bold">${stats.longestStreak.count}</text>
            <text x="12" y="64" fill="${muted}" font-size="8.5" class="regular">days record</text>
          </g>

          <!-- Total -->
          <g transform="translate(244, 0)">
            <rect x="0" y="0" width="112" height="78" rx="8" fill="${surface}" stroke="${border}" stroke-width="1" />
            <text x="12" y="20" fill="${muted}" font-size="9.5" class="bold">TOTAL</text>
            <text x="12" y="46" fill="${text}" font-size="22" class="bold">${stats.totalContributions.toLocaleString()}</text>
            <text x="12" y="64" fill="${muted}" font-size="8.5" class="regular">contributions</text>
          </g>
        </g>
      </g>
    </svg>
  `;
}
