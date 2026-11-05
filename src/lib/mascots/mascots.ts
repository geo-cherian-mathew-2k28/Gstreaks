import { MascotExpression, MascotId, MascotInfo, StreakTier } from './types';

export const MASCOTS: Record<MascotId, MascotInfo> = {
  streaky: {
    id: 'streaky',
    name: 'Streaky',
    tagline: 'The Cosmic Flame',
    description: 'A cheerful purple flame spirit born from uninterrupted git commit streaks.',
    color: '#8B5CF6',
    secondaryColor: '#EC4899',
    accentColor: '#FDE047',
  },
  gitty: {
    id: 'gitty',
    name: 'Gitty',
    tagline: 'The Branch Guardian',
    description: 'A smart little creature made of git commit nodes and branching paths.',
    color: '#3B82F6',
    secondaryColor: '#06B6D4',
    accentColor: '#10B981',
  },
  mochi: {
    id: 'mochi',
    name: 'Mochi',
    tagline: 'The Cozy Dumpling',
    description: 'An impossibly squishy, adorable dumpling who cheers for your daily coding habits.',
    color: '#F8FAFC',
    secondaryColor: '#FDA4AF',
    accentColor: '#F472B6',
  },
  byte: {
    id: 'byte',
    name: 'Byte',
    tagline: 'The Pixel Bot',
    description: 'A pocket-sized retro terminal droid that displays your stats on its mini screen.',
    color: '#10B981',
    secondaryColor: '#34D399',
    accentColor: '#38BDF8',
  },
  spark: {
    id: 'spark',
    name: 'Spark',
    tagline: 'The Cosmic Star',
    description: 'A brilliant celestial star sprite that ignites with each consecutive day of code.',
    color: '#F59E0B',
    secondaryColor: '#FDE047',
    accentColor: '#EF4444',
  },
  blob: {
    id: 'blob',
    name: 'Blob',
    tagline: 'The Jellicode',
    description: 'A bouncy, shapeshifting jelly creature that absorbs bugs and radiates energy.',
    color: '#06B6D4',
    secondaryColor: '#8B5CF6',
    accentColor: '#A78BFA',
  },
};

/**
 * Renders mascot SVG fragment (centered at 0,0 within a viewBox or given scale)
 */
export function renderMascotSvg(
  id: MascotId,
  expression: MascotExpression,
  tier: StreakTier,
  options?: { animated?: boolean; width?: number; height?: number }
): string {
  const animated = options?.animated ?? true;
  const w = options?.width ?? 96;
  const h = options?.height ?? 96;

  const animClass = animated ? 'mascot-anim' : '';

  // Tier overlays (crown for legendary, halo for diamond)
  const isLegendary = tier === 'legendary';
  const isDiamond = tier === 'diamond' || isLegendary;

  let tierOverlay = '';
  if (isLegendary) {
    // Golden crown
    tierOverlay = `
      <g class="tier-crown" transform="translate(0, -38)">
        <polygon points="-16,-6 -20,-18 -8,-10 0,-24 8,-10 20,-18 16,-6" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5" />
        <circle cx="-20" cy="-18" r="2.5" fill="#EF4444" />
        <circle cx="0" cy="-24" r="3" fill="#3B82F6" />
        <circle cx="20" cy="-18" r="2.5" fill="#10B981" />
      </g>
    `;
  } else if (isDiamond) {
    // Glowing celestial halo
    tierOverlay = `
      <ellipse cx="0" cy="-34" rx="22" ry="6" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="4 2" opacity="0.85" />
    `;
  }

  // Expression features
  let faceContent = '';
  switch (expression) {
    case 'sleeping':
      faceContent = `
        <path d="M-12,-4 Q-8,0 -4,-4" fill="none" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round" />
        <path d="M4,-4 Q8,0 12,-4" fill="none" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round" />
        <path d="M-3,8 Q0,6 3,8" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round" />
        <text x="16" y="-14" fill="#94A3B8" font-size="10" font-family="sans-serif" font-weight="bold" class="sleep-z">z</text>
        <text x="22" y="-22" fill="#94A3B8" font-size="12" font-family="sans-serif" font-weight="bold" class="sleep-z">Z</text>
      `;
      break;

    case 'happy':
      faceContent = `
        <path d="M-13,-5 Q-8,-11 -3,-5" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />
        <path d="M3,-5 Q8,-11 13,-5" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />
        <ellipse cx="-15" cy="1" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.75" />
        <ellipse cx="15" cy="1" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.75" />
        <path d="M-5,4 Q0,10 5,4" fill="none" stroke="#1E293B" stroke-width="2.2" stroke-linecap="round" />
      `;
      break;

    case 'excited':
      faceContent = `
        <ellipse cx="-8" cy="-5" rx="3.5" ry="5" fill="#1E293B" />
        <ellipse cx="8" cy="-5" rx="3.5" ry="5" fill="#1E293B" />
        <circle cx="-6.5" cy="-7" r="1.5" fill="#FFFFFF" />
        <circle cx="9.5" cy="-7" r="1.5" fill="#FFFFFF" />
        <ellipse cx="-15" cy="2" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="15" cy="2" rx="4" ry="2.5" fill="#FDA4AF" opacity="0.8" />
        <path d="M-6,2 Q0,12 6,2 Z" fill="#EF4444" stroke="#1E293B" stroke-width="1.8" />
        <path d="M-3,5 Q0,9 3,5" fill="#FDA4AF" />
      `;
      break;

    case 'celebrating':
      faceContent = `
        <polygon points="-11,-10 -8,-3 -14,-7 -7,-7 -12,-3" fill="#F59E0B" />
        <polygon points="11,-10 8,-3 14,-7 7,-7 12,-3" fill="#F59E0B" />
        <ellipse cx="-8" cy="-4" rx="3" ry="4" fill="#1E293B" />
        <ellipse cx="8" cy="-4" rx="3" ry="4" fill="#1E293B" />
        <circle cx="-7" cy="-5.5" r="1.2" fill="#FFFFFF" />
        <circle cx="9" cy="-5.5" r="1.2" fill="#FFFFFF" />
        <ellipse cx="-15" cy="2" rx="4" ry="2.5" fill="#F472B6" opacity="0.85" />
        <ellipse cx="15" cy="2" rx="4" ry="2.5" fill="#F472B6" opacity="0.85" />
        <path d="M-7,3 Q0,14 7,3 Z" fill="#EC4899" stroke="#1E293B" stroke-width="1.8" />
        <circle cx="-24" cy="-18" r="2" fill="#F43F5E" class="sparkle-particle" />
        <circle cx="26" cy="-14" r="2.5" fill="#3B82F6" class="sparkle-particle" />
        <circle cx="22" cy="18" r="1.8" fill="#10B981" class="sparkle-particle" />
      `;
      break;

    case 'surprised':
      faceContent = `
        <circle cx="-8" cy="-6" r="4.5" fill="#1E293B" />
        <circle cx="8" cy="-6" r="4.5" fill="#1E293B" />
        <circle cx="-6.5" cy="-8" r="1.8" fill="#FFFFFF" />
        <circle cx="9.5" cy="-8" r="1.8" fill="#FFFFFF" />
        <ellipse cx="0" cy="5" rx="3.5" ry="5.5" fill="#1E293B" />
      `;
      break;

    case 'determined':
      faceContent = `
        <path d="M-14,-10 L-3,-6" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />
        <path d="M14,-10 L3,-6" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="-8" cy="-4" r="3.5" fill="#1E293B" />
        <circle cx="8" cy="-4" r="3.5" fill="#1E293B" />
        <circle cx="-7" cy="-5" r="1.2" fill="#FFFFFF" />
        <circle cx="7" cy="-5" r="1.2" fill="#FFFFFF" />
        <path d="M-5,6 L5,6" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" />
      `;
      break;

    case 'idle':
    default:
      faceContent = `
        <circle cx="-8" cy="-4" r="3.2" fill="#1E293B" />
        <circle cx="8" cy="-4" r="3.2" fill="#1E293B" />
        <circle cx="-6.5" cy="-5.5" r="1.2" fill="#FFFFFF" />
        <circle cx="9.5" cy="-5.5" r="1.2" fill="#FFFFFF" />
        <ellipse cx="-14" cy="2" rx="3.5" ry="2" fill="#FDA4AF" opacity="0.6" />
        <ellipse cx="14" cy="2" rx="3.5" ry="2" fill="#FDA4AF" opacity="0.6" />
        <path d="M-4,3 Q0,7 4,3" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round" />
      `;
      break;
  }

  // Mascot body definitions
  let bodyContent = '';

  switch (id) {
    case 'streaky':
      bodyContent = `
        <defs>
          <linearGradient id="streakyGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#7C3AED" />
            <stop offset="50%" stop-color="#9333EA" />
            <stop offset="100%" stop-color="#F43F5E" />
          </linearGradient>
          <linearGradient id="streakyInner" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#F43F5E" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#FDE047" />
          </linearGradient>
        </defs>
        <!-- Outer Flame Body -->
        <path d="M0,-34 C18,-20 32,-4 30,16 C28,32 16,36 0,36 C-16,36 -28,32 -30,16 C-32,-4 -18,-20 0,-34 Z"
              fill="url(#streakyGrad)" filter="drop-shadow(0 4px 10px rgba(139, 92, 246, 0.4))" />
        <!-- Inner Flame Glow -->
        <path d="M0,-18 C10,-8 18,2 16,18 C15,28 8,30 0,30 C-8,30 -15,28 -16,18 C-18,2 -10,-8 0,-18 Z"
              fill="url(#streakyInner)" opacity="0.65" />
      `;
      break;

    case 'gitty':
      bodyContent = `
        <defs>
          <linearGradient id="gittyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2563EB" />
            <stop offset="100%" stop-color="#06B6D4" />
          </linearGradient>
        </defs>
        <!-- Commit Node Ears / Antennas -->
        <line x1="-16" y1="-20" x2="-26" y2="-32" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
        <circle cx="-26" cy="-32" r="5" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1.5" />
        <line x1="16" y1="-20" x2="26" y2="-32" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" />
        <circle cx="26" cy="-32" r="5" fill="#38BDF8" stroke="#FFFFFF" stroke-width="1.5" />
        <!-- Main Body -->
        <rect x="-28" y="-22" width="56" height="52" rx="24" fill="url(#gittyGrad)"
              filter="drop-shadow(0 4px 10px rgba(37, 99, 235, 0.4))" />
        <!-- Belly Patch -->
        <ellipse cx="0" cy="8" rx="18" ry="16" fill="#F0F9FF" opacity="0.85" />
        <!-- Git branch icon on belly -->
        <circle cx="-5" cy="5" r="2.5" fill="#0284C7" />
        <circle cx="-5" cy="13" r="2.5" fill="#0284C7" />
        <circle cx="5" cy="9" r="2.5" fill="#0284C7" />
        <line x1="-5" y1="5" x2="-5" y2="13" stroke="#0284C7" stroke-width="1.5" />
        <path d="M-5,8 Q0,8 5,9" fill="none" stroke="#0284C7" stroke-width="1.5" />
      `;
      break;

    case 'mochi':
      bodyContent = `
        <defs>
          <linearGradient id="mochiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="100%" stop-color="#F1F5F9" />
          </linearGradient>
        </defs>
        <!-- Round Squishy Body -->
        <ellipse cx="0" cy="2" rx="32" ry="28" fill="url(#mochiGrad)" stroke="#E2E8F0" stroke-width="2"
                 filter="drop-shadow(0 4px 12px rgba(148, 163, 184, 0.35))" />
        <!-- Tiny Stubby Paws -->
        <circle cx="-22" cy="18" r="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
        <circle cx="22" cy="18" r="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      `;
      break;

    case 'byte':
      bodyContent = `
        <defs>
          <linearGradient id="byteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
        </defs>
        <!-- Robot Antenna -->
        <line x1="0" y1="-26" x2="0" y2="-36" stroke="#10B981" stroke-width="3" stroke-linecap="round" />
        <circle cx="0" cy="-37" r="4.5" fill="#34D399" />
        <!-- Robot Body/Monitor -->
        <rect x="-30" y="-26" width="60" height="54" rx="12" fill="url(#byteGrad)" stroke="#10B981" stroke-width="2"
              filter="drop-shadow(0 4px 10px rgba(16, 185, 129, 0.3))" />
        <!-- Inner Screen -->
        <rect x="-24" y="-20" width="48" height="36" rx="8" fill="#042F2E" />
      `;
      break;

    case 'spark':
      bodyContent = `
        <defs>
          <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE047" />
            <stop offset="50%" stop-color="#F59E0B" />
            <stop offset="100%" stop-color="#EA580C" />
          </linearGradient>
        </defs>
        <!-- Star Silhouette -->
        <path d="M0,-36 Q4,-8 28,-14 Q8,2 18,28 Q0,10 -18,28 Q-8,2 -28,-14 Q-4,-8 0,-36 Z"
              fill="url(#sparkGrad)" filter="drop-shadow(0 4px 12px rgba(245, 158, 11, 0.45))" />
        <!-- Star highlight -->
        <circle cx="0" cy="0" r="16" fill="#FEF08A" opacity="0.3" />
      `;
      break;

    case 'blob':
    default:
      bodyContent = `
        <defs>
          <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#06B6D4" />
            <stop offset="100%" stop-color="#8B5CF6" />
          </linearGradient>
        </defs>
        <!-- Jelly Blob Shape -->
        <path d="M-28,8 C-32,-16 -12,-32 8,-28 C28,-24 34,-6 30,14 C26,30 2,36 -12,32 C-24,28 -24,20 -28,8 Z"
              fill="url(#blobGrad)" filter="drop-shadow(0 4px 12px rgba(6, 182, 212, 0.4))" />
        <!-- Top shine -->
        <ellipse cx="-8" cy="-14" rx="8" ry="4" fill="#FFFFFF" opacity="0.3" transform="rotate(-20 -8 -14)" />
      `;
      break;
  }

  return `
    <svg width="${w}" height="${h}" viewBox="-50 -50 100 100" class="geostreak-mascot ${animClass}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .mascot-anim {
          animation: mascotFloat 3.5s ease-in-out infinite;
          transform-origin: center;
        }
        .sleep-z {
          animation: sleepFloat 2.4s ease-in-out infinite;
        }
        .sparkle-particle {
          animation: sparklePop 1.8s ease-in-out infinite;
        }
        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1.5deg); }
        }
        @keyframes sleepFloat {
          0% { opacity: 0.2; transform: translate(0, 0) scale(0.8); }
          50% { opacity: 1; transform: translate(3px, -4px) scale(1.1); }
          100% { opacity: 0; transform: translate(6px, -8px) scale(1.2); }
        }
        @keyframes sparklePop {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mascot-anim, .sleep-z, .sparkle-particle {
            animation: none !important;
          }
        }
      </style>
      <g>
        ${tierOverlay}
        ${bodyContent}
        <g class="mascot-face">
          ${faceContent}
        </g>
      </g>
    </svg>
  `;
}
