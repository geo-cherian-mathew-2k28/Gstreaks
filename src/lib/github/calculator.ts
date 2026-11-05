import { ContributionDay, ContributionWeek, StreakSpan, UserStats } from './types';

/**
 * Calculates current streak, longest streak, and total contributions
 * from a list of GitHub daily contribution records.
 */
export function calculateStreaks(
  days: ContributionDay[],
  username: string,
  extra?: { name?: string; avatarUrl?: string; weeks?: ContributionWeek[] }
): UserStats {
  if (!days || days.length === 0) {
    const emptySpan: StreakSpan = { count: 0, startDate: '', endDate: '' };
    return {
      username,
      name: extra?.name,
      avatarUrl: extra?.avatarUrl,
      totalContributions: 0,
      currentStreak: emptySpan,
      longestStreak: emptySpan,
      totalDays: 0,
      contributedDays: 0,
      allDays: [],
      weeks: extra?.weeks || [],
      isNewAccount: true,
      hasZeroContributions: true,
      fetchedAt: new Date().toISOString(),
    };
  }

  // Sort chronological ascending (oldest to newest)
  const sortedDays = [...days].sort((a, b) => a.date.localeCompare(b.date));

  // Compute total contributions and active days
  let totalContributions = 0;
  let contributedDays = 0;

  for (const day of sortedDays) {
    totalContributions += day.contributionCount;
    if (day.contributionCount > 0) {
      contributedDays++;
    }
  }

  // 1. Calculate Longest Streak
  let longestCount = 0;
  let longestStart = '';
  let longestEnd = '';

  let currentRunCount = 0;
  let currentRunStart = '';
  let currentRunEnd = '';

  for (let i = 0; i < sortedDays.length; i++) {
    const day = sortedDays[i];
    if (day.contributionCount > 0) {
      if (currentRunCount === 0) {
        currentRunStart = day.date;
      }
      currentRunCount++;
      currentRunEnd = day.date;

      if (currentRunCount > longestCount) {
        longestCount = currentRunCount;
        longestStart = currentRunStart;
        longestEnd = currentRunEnd;
      }
    } else {
      currentRunCount = 0;
      currentRunStart = '';
      currentRunEnd = '';
    }
  }

  // 2. Calculate Current Streak
  // We determine whether today or yesterday is the anchor
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Map for fast lookup by date
  const dateMap = new Map<string, number>();
  for (const d of sortedDays) {
    dateMap.set(d.date, d.contributionCount);
  }

  // Find the most recent day in the dataset
  const lastDay = sortedDays[sortedDays.length - 1];

  let currentStreakCount = 0;
  let currentStreakStart = '';
  let currentStreakEnd = '';

  // Determine starting index for current streak walk
  // Find where to begin walking backwards
  let startIndex = sortedDays.length - 1;

  // Filter out future dates if any in dataset
  while (startIndex >= 0 && sortedDays[startIndex].date > todayStr) {
    startIndex--;
  }

  if (startIndex >= 0) {
    const targetDay = sortedDays[startIndex];
    const isToday = targetDay.date === todayStr;
    const isYesterday = targetDay.date === yesterdayStr;

    if (targetDay.contributionCount > 0) {
      // User contributed on the latest recorded date
      currentStreakEnd = targetDay.date;
      currentStreakCount = 1;
      currentStreakStart = targetDay.date;

      for (let i = startIndex - 1; i >= 0; i--) {
        if (sortedDays[i].contributionCount > 0) {
          currentStreakCount++;
          currentStreakStart = sortedDays[i].date;
        } else {
          break;
        }
      }
    } else if (isToday) {
      // Today has 0 contributions so far.
      // Check if yesterday had contributions - streak is still alive!
      const prevIndex = startIndex - 1;
      if (prevIndex >= 0 && sortedDays[prevIndex].contributionCount > 0) {
        currentStreakEnd = sortedDays[prevIndex].date;
        currentStreakCount = 1;
        currentStreakStart = sortedDays[prevIndex].date;

        for (let i = prevIndex - 1; i >= 0; i--) {
          if (sortedDays[i].contributionCount > 0) {
            currentStreakCount++;
            currentStreakStart = sortedDays[i].date;
          } else {
            break;
          }
        }
      }
    }
  }

  // Edge case: if longest streak is 0 (no contributions anywhere)
  const hasZeroContributions = totalContributions === 0;

  return {
    username,
    name: extra?.name,
    avatarUrl: extra?.avatarUrl,
    totalContributions,
    currentStreak: {
      count: currentStreakCount,
      startDate: currentStreakStart,
      endDate: currentStreakEnd,
    },
    longestStreak: {
      count: longestCount,
      startDate: longestStart,
      endDate: longestEnd,
    },
    totalDays: sortedDays.length,
    contributedDays,
    allDays: sortedDays,
    weeks: extra?.weeks || [],
    isNewAccount: sortedDays.length < 30 && totalContributions < 10,
    hasZeroContributions,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Helper to format date range for cards
 * e.g. "Jan 12 - Feb 28, 2025" or "Today"
 */
export function formatStreakRange(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return 'No streak active';
  if (startDate === endDate) {
    const d = new Date(startDate + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const s = new Date(startDate + 'T00:00:00');
  const e = new Date(endDate + 'T00:00:00');

  const sameYear = s.getFullYear() === e.getFullYear();

  const startFormatted = s.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  });

  const endFormatted = e.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `${startFormatted} – ${endFormatted}`;
}
