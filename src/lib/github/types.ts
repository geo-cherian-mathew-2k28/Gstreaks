export interface ContributionDay {
  date: string; // YYYY-MM-DD
  contributionCount: number;
  weekday: number; // 0 (Sunday) to 6 (Saturday)
  color?: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface StreakSpan {
  count: number;
  startDate: string;
  endDate: string;
}

export interface UserStats {
  username: string;
  name?: string;
  avatarUrl?: string;
  totalContributions: number;
  currentStreak: StreakSpan;
  longestStreak: StreakSpan;
  totalDays: number;
  contributedDays: number;
  allDays: ContributionDay[];
  weeks: ContributionWeek[];
  isNewAccount: boolean;
  hasZeroContributions: boolean;
  fetchedAt: string;
}

export interface GitHubApiError {
  status: number;
  message: string;
  code: 'NOT_FOUND' | 'RATE_LIMITED' | 'UNAUTHORIZED' | 'SERVER_ERROR' | 'UNKNOWN';
}
