import { describe, it, expect } from 'vitest';
import { calculateStreaks, formatStreakRange } from '@/lib/github/calculator';
import { ContributionDay } from '@/lib/github/types';

describe('Streak Calculator Engine', () => {
  it('handles empty contribution dataset gracefully', () => {
    const stats = calculateStreaks([], 'octocat');
    expect(stats.currentStreak.count).toBe(0);
    expect(stats.longestStreak.count).toBe(0);
    expect(stats.totalContributions).toBe(0);
    expect(stats.hasZeroContributions).toBe(true);
  });

  it('handles user with zero contributions across all days', () => {
    const days: ContributionDay[] = [
      { date: '2024-01-01', contributionCount: 0, weekday: 1 },
      { date: '2024-01-02', contributionCount: 0, weekday: 2 },
      { date: '2024-01-03', contributionCount: 0, weekday: 3 },
    ];
    const stats = calculateStreaks(days, 'newuser');
    expect(stats.currentStreak.count).toBe(0);
    expect(stats.longestStreak.count).toBe(0);
    expect(stats.totalContributions).toBe(0);
    expect(stats.hasZeroContributions).toBe(true);
  });

  it('accurately calculates longest streak across historical dates', () => {
    const days: ContributionDay[] = [
      { date: '2024-01-01', contributionCount: 3, weekday: 1 },
      { date: '2024-01-02', contributionCount: 1, weekday: 2 },
      { date: '2024-01-03', contributionCount: 5, weekday: 3 },
      { date: '2024-01-04', contributionCount: 2, weekday: 4 }, // 4-day streak here
      { date: '2024-01-05', contributionCount: 0, weekday: 5 }, // gap
      { date: '2024-01-06', contributionCount: 2, weekday: 6 },
      { date: '2024-01-07', contributionCount: 4, weekday: 0 }, // 2-day streak
    ];
    const stats = calculateStreaks(days, 'coder');
    expect(stats.longestStreak.count).toBe(4);
    expect(stats.longestStreak.startDate).toBe('2024-01-01');
    expect(stats.longestStreak.endDate).toBe('2024-01-04');
    expect(stats.totalContributions).toBe(17);
    expect(stats.contributedDays).toBe(6);
  });

  it('handles leap years correctly across Feb 28 - Feb 29 - Mar 01', () => {
    const leapDays: ContributionDay[] = [
      { date: '2024-02-28', contributionCount: 2, weekday: 3 },
      { date: '2024-02-29', contributionCount: 4, weekday: 4 }, // Leap day
      { date: '2024-03-01', contributionCount: 1, weekday: 5 },
    ];
    const stats = calculateStreaks(leapDays, 'leapcoder');
    expect(stats.longestStreak.count).toBe(3);
    expect(stats.longestStreak.startDate).toBe('2024-02-28');
    expect(stats.longestStreak.endDate).toBe('2024-03-01');
  });

  it('maintains active current streak if yesterday had contributions and today has 0', () => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const dayBeforeYesterday = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const dayBeforeYesterdayStr = dayBeforeYesterday.toISOString().split('T')[0];

    const days: ContributionDay[] = [
      { date: dayBeforeYesterdayStr, contributionCount: 3, weekday: 1 },
      { date: yesterdayStr, contributionCount: 5, weekday: 2 },
      { date: todayStr, contributionCount: 0, weekday: 3 }, // haven't committed yet today
    ];

    const stats = calculateStreaks(days, 'dailycoder');
    expect(stats.currentStreak.count).toBe(2);
    expect(stats.currentStreak.startDate).toBe(dayBeforeYesterdayStr);
    expect(stats.currentStreak.endDate).toBe(yesterdayStr);
  });

  it('formats streak ranges cleanly', () => {
    expect(formatStreakRange('', '')).toBe('No streak active');
    const single = formatStreakRange('2024-05-10', '2024-05-10');
    expect(single).toContain('May 10');
    const range = formatStreakRange('2024-01-01', '2024-01-15');
    expect(range).toContain('Jan 1');
    expect(range).toContain('Jan 15');
  });
});
