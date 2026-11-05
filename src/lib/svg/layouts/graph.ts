import { CardRenderOptions } from '../types';
import { escapeXml, sanitizeColor } from '../sanitizer';
import { getExpressionForStreak, getStreakTier } from '../../mascots/types';
import { renderMascotSvg } from '../../mascots/mascots';

export function renderGraphLayout(opts: CardRenderOptions): string {
  const { stats, theme, mascotId, customExpression, animated, hideBorder, hideTitle, radius } = opts;

  const bg = sanitizeColor(opts.customBg, theme.background);
  const surface = theme.surface;
  const border = hideBorder ? 'transparent' : sanitizeColor(opts.customBorder, theme.border);
  const text = sanitizeColor(opts.customText, theme.text);
  const muted = theme.muted;
  const primary = sanitizeColor(opts.customPrimary, theme.primary);
  const flame = theme.flame;
  const levels = theme.graphLevels;

  const width = 560;
  const height = 230;

  const tier = getStreakTier(stats.currentStreak.count);
  const expression = getExpressionForStreak(stats.currentStreak.count, customExpression);

  const mascotSvg = renderMascotSvg(mascotId, expression, tier, {
    animated,
    width: 64,
    height: 64,
  });

  // Take the most recent 28 weeks (or all available)
  const allWeeks = stats.weeks && stats.weeks.length > 0 ? stats.weeks : [];
  const recentWeeks = allWeeks.slice(-28);

  // Generate SVG cells
  const cellSize = 10;
  const cellGap = 3;
  let cellsSvg = '';

  recentWeeks.forEach((week, wIndex) => {
    const x = wIndex * (cellSize + cellGap);
    week.contributionDays?.forEach((day, dIndex) => {
      const y = dIndex * (cellSize + cellGap);
      const count = day.contributionCount;
      let levelColor = levels[0];
      if (count > 0 && count <= 2) levelColor = levels[1];
      else if (count > 2 && count <= 5) levelColor = levels[2];
      else if (count > 5 && count <= 9) levelColor = levels[3];
      else if (count > 9) levelColor = levels[4];

      const delay = (wIndex * 7 + dIndex) * 0.005;

      cellsSvg += `
        <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2"
              fill="${levelColor}" class="${animated ? 'cell-anim' : ''}" style="animation-delay: ${delay}s">
          <title>${day.date}: ${count} contributions</title>
        </rect>
      `;
    });
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="graphBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="${surface}" />
        </linearGradient>
      </defs>

      <style>
        .bold { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; }
        .regular { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 400; }
        .mono { font-family: 'JetBrains Mono', Consolas, Monaco, monospace; }
        ${animated ? `
          .cell-anim {
            animation: cellFadeIn 0.6s ease-out forwards;
            opacity: 0.85;
          }
          @keyframes cellFadeIn {
            from { transform: scale(0.6); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        ` : ''}
      </style>

      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${radius}"
            fill="url(#graphBg)" stroke="${border}" stroke-width="1.5" />

      <!-- Header & Stats Bar -->
      <g transform="translate(24, 28)">
        ${!hideTitle ? `
          <text x="0" y="14" fill="${text}" font-size="15" class="bold">
            ${escapeXml(stats.username)} <tspan fill="${muted}" font-size="11" class="regular">activity map</tspan>
          </text>
        ` : ''}

        <g transform="translate(${width - 290}, 0)">
          <!-- Current Streak -->
          <text x="0" y="6" fill="${muted}" font-size="9" class="bold">CURRENT</text>
          <text x="0" y="24" fill="${flame}" font-size="16" class="bold">${stats.currentStreak.count}d</text>

          <!-- Longest Streak -->
          <text x="65" y="6" fill="${muted}" font-size="9" class="bold">MAX</text>
          <text x="65" y="24" fill="${primary}" font-size="16" class="bold">${stats.longestStreak.count}d</text>

          <!-- Total Commits -->
          <text x="120" y="6" fill="${muted}" font-size="9" class="bold">TOTAL</text>
          <text x="120" y="24" fill="${text}" font-size="16" class="bold">${stats.totalContributions.toLocaleString()}</text>
        </g>

        <!-- Small mascot in top right corner -->
        <g transform="translate(${width - 100}, -12)">
          ${mascotSvg}
        </g>
      </g>

      <!-- Calendar Mini Heatmap -->
      <g transform="translate(24, 82)">
        ${cellsSvg}
      </g>

      <!-- Legend in footer -->
      <g transform="translate(24, ${height - 18})">
        <text x="0" y="10" fill="${muted}" font-size="9" class="regular">Less</text>
        ${levels.map((lvl, idx) => `
          <rect x="${30 + idx * 12}" y="2" width="9" height="9" rx="2" fill="${lvl}" />
        `).join('')}
        <text x="${30 + levels.length * 12 + 6}" y="10" fill="${muted}" font-size="9" class="regular">More</text>
      </g>
    </svg>
  `;
}
