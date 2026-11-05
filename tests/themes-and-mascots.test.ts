import { describe, it, expect } from 'vitest';
import { THEMES, getTheme } from '@/lib/themes';
import { MASCOTS, renderMascotSvg } from '@/lib/mascots/mascots';
import { MascotId, MascotExpression } from '@/lib/mascots/types';

describe('Themes and Mascot Systems', () => {
  it('provides at least 15 comprehensive themes', () => {
    const keys = Object.keys(THEMES);
    expect(keys.length).toBeGreaterThanOrEqual(15);

    // Required developer themes
    expect(keys).toContain('tokyo-night');
    expect(keys).toContain('dracula');
    expect(keys).toContain('nord');
    expect(keys).toContain('github-dark');
    expect(keys).toContain('github-light');
    expect(keys).toContain('monokai');
    expect(keys).toContain('catppuccin-mocha');
    expect(keys).toContain('one-dark');

    // Required creative themes
    expect(keys).toContain('lavender-dreams');
    expect(keys).toContain('sakura');
    expect(keys).toContain('ocean-breeze');
    expect(keys).toContain('sunset');
    expect(keys).toContain('cyberpunk');
    expect(keys).toContain('pastel-candy');
    expect(keys).toContain('midnight-galaxy');
  });

  it('provides safe fallback for unknown themes', () => {
    const fallback = getTheme('unknown-nonexistent-theme');
    expect(fallback.id).toBe('tokyo-night');
  });

  it('renders all 6 mascots with valid SVG across all expressions', () => {
    const mascotIds: MascotId[] = ['streaky', 'gitty', 'mochi', 'byte', 'spark', 'blob'];
    const expressions: MascotExpression[] = ['idle', 'happy', 'excited', 'sleeping', 'surprised', 'celebrating', 'determined'];

    mascotIds.forEach((id) => {
      expect(MASCOTS[id]).toBeDefined();

      expressions.forEach((exp) => {
        const svg = renderMascotSvg(id, exp, 'gold', { animated: true });
        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
      });
    });
  });

  it('renders legendary crown for tier "legendary"', () => {
    const svg = renderMascotSvg('streaky', 'celebrating', 'legendary');
    expect(svg).toContain('tier-crown');
  });
});
