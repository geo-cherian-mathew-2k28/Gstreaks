import { CardRenderOptions, CardLayoutId } from './types';
import { renderClassicLayout } from './layouts/classic';
import { renderMinimalLayout } from './layouts/minimal';
import { renderGraphLayout } from './layouts/graph';
import { renderMascotLayout } from './layouts/mascot';
import { renderTerminalLayout } from './layouts/terminal';
import { renderGlassLayout } from './layouts/glass';
import { renderCompactLayout } from './layouts/compact';
import { escapeXml, sanitizeColor } from './sanitizer';
import { ThemePalette } from '../themes';
import { renderMascotSvg } from '../mascots/mascots';

/**
 * Main SVG card generator router.
 */
export function generateStreakCardSvg(opts: CardRenderOptions): string {
  let svgContent: string;

  switch (opts.layout) {
    case 'minimal':
      svgContent = renderMinimalLayout(opts);
      break;
    case 'graph':
      svgContent = renderGraphLayout(opts);
      break;
    case 'mascot':
      svgContent = renderMascotLayout(opts);
      break;
    case 'terminal':
      svgContent = renderTerminalLayout(opts);
      break;
    case 'glass':
      svgContent = renderGlassLayout(opts);
      break;
    case 'compact':
      svgContent = renderCompactLayout(opts);
      break;
    case 'classic':
    default:
      svgContent = renderClassicLayout(opts);
      break;
  }

  return svgContent.trim();
}

/**
 * Generates an elegant SVG error card when GitHub data fails to load or user does not exist.
 * Styled with the requested theme so it embeds gracefully without breaking GitHub READMEs.
 */
export function generateErrorCardSvg(
  message: string,
  theme: ThemePalette,
  customBg?: string,
  customBorder?: string
): string {
  const bg = sanitizeColor(customBg, theme.background);
  const surface = theme.surface;
  const border = sanitizeColor(customBorder, theme.border);
  const text = theme.text;
  const muted = theme.muted;

  const width = 480;
  const height = 140;

  const mascotSvg = renderMascotSvg('streaky', 'sleeping', 'dormant', {
    animated: false,
    width: 60,
    height: 60,
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="errBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" />
          <stop offset="100%" stop-color="${surface}" />
        </linearGradient>
      </defs>

      <style>
        .bold { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 700; }
        .regular { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 400; }
      </style>

      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="12"
            fill="url(#errBg)" stroke="${border}" stroke-width="1.5" />

      <!-- Left Mascot (Sleepy) -->
      <g transform="translate(18, 38)">
        ${mascotSvg}
      </g>

      <!-- Error Content -->
      <g transform="translate(94, 38)">
        <rect x="0" y="0" width="84" height="20" rx="10" fill="#EF4444" fill-opacity="0.2" />
        <text x="42" y="14" fill="#EF4444" font-size="10" class="bold" text-anchor="middle">
          GEOSTREAK
        </text>

        <text x="0" y="42" fill="${text}" font-size="14" class="bold">
          Could not load contribution stats
        </text>

        <text x="0" y="62" fill="${muted}" font-size="11" class="regular">
          ${escapeXml(message)}
        </text>
      </g>
    </svg>
  `.trim();
}
