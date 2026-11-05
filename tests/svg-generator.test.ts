import { describe, it, expect } from 'vitest';
import { generateStreakCardSvg, generateErrorCardSvg } from '@/lib/svg/generator';
import { THEMES } from '@/lib/themes';
import { UserStats } from '@/lib/github/types';
import { CardLayoutId } from '@/lib/svg/types';

describe('Dynamic SVG Generation Engine', () => {
  const mockStats: UserStats = {
    username: 'testdeveloper',
    name: 'Test Dev',
    totalContributions: 1420,
    currentStreak: { count: 18, startDate: '2024-10-18', endDate: '2024-11-05' },
    longestStreak: { count: 45, startDate: '2024-05-01', endDate: '2024-06-15' },
    totalDays: 365,
    contributedDays: 240,
    allDays: [],
    weeks: [
      {
        contributionDays: [
          { date: '2024-11-01', contributionCount: 4, weekday: 5 },
          { date: '2024-11-02', contributionCount: 2, weekday: 6 },
          { date: '2024-11-03', contributionCount: 0, weekday: 0 },
          { date: '2024-11-04', contributionCount: 6, weekday: 1 },
          { date: '2024-11-05', contributionCount: 3, weekday: 2 },
        ],
      },
    ],
    isNewAccount: false,
    hasZeroContributions: false,
    fetchedAt: new Date().toISOString(),
  };

  const layouts: CardLayoutId[] = ['classic', 'minimal', 'graph', 'mascot', 'terminal', 'glass', 'compact'];

  layouts.forEach((layout) => {
    it(`renders valid SVG for layout "${layout}"`, () => {
      const svg = generateStreakCardSvg({
        stats: mockStats,
        theme: THEMES['tokyo-night'],
        mascotId: 'streaky',
        animated: true,
        layout,
        hideBorder: false,
        hideTitle: false,
        hideCurrentStreak: false,
        hideLongestStreak: false,
        hideTotalContributions: false,
        showGraph: false,
        radius: 14,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('testdeveloper');
      expect(svg).not.toContain('<script');
    });
  });

  it('renders static SVG when animation is disabled', () => {
    const svg = generateStreakCardSvg({
      stats: mockStats,
      theme: THEMES['tokyo-night'],
      mascotId: 'streaky',
      animated: false,
      layout: 'classic',
      hideBorder: false,
      hideTitle: false,
      hideCurrentStreak: false,
      hideLongestStreak: false,
      hideTotalContributions: false,
      showGraph: false,
      radius: 14,
    });

    expect(svg).toContain('<svg');
    expect(svg).not.toContain('@keyframes flamePulse');
  });

  it('generates a clean styled error SVG card on missing data', () => {
    const errorSvg = generateErrorCardSvg(
      'GitHub user "nonexistent-user-123" does not exist.',
      THEMES['dracula']
    );

    expect(errorSvg).toContain('<svg');
    expect(errorSvg).toContain('Could not load contribution stats');
    expect(errorSvg).toContain('nonexistent-user-123');
    expect(errorSvg).toContain('</svg>');
  });
});
