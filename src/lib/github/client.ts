import { ContributionCalendar, ContributionDay, ContributionWeek, UserStats } from './types';
import { calculateStreaks } from './calculator';

// Request deduplication map to prevent thundering herd
const pendingRequests = new Map<string, Promise<UserStats>>();

// Token pool management
function getTokens(): string[] {
  const tokens: string[] = [];
  if (process.env.GITHUB_TOKEN) {
    tokens.push(process.env.GITHUB_TOKEN.trim());
  }
  if (process.env.GITHUB_TOKENS) {
    const list = process.env.GITHUB_TOKENS.split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    tokens.push(...list);
  }
  return Array.from(new Set(tokens));
}

let tokenIndex = 0;
function getNextToken(): string | null {
  const tokens = getTokens();
  if (tokens.length === 0) return null;
  const token = tokens[tokenIndex % tokens.length];
  tokenIndex = (tokenIndex + 1) % tokens.length;
  return token;
}

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      createdAt
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
              color
            }
          }
        }
      }
    }
  }
`;

/**
 * Fallback parser using GitHub's public contribution calendar page
 * if no token is configured on the server.
 */
async function fetchPublicContributionData(username: string): Promise<UserStats> {
  const url = `https://github.com/users/${encodeURIComponent(username)}/contributions`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'GeoStreak-Visualizer/1.0 (+https://github.com/geo-cherian-mathew-2k28/geostreak)',
      Accept: 'text/html',
    },
    next: { revalidate: 1800 },
  });

  if (res.status === 404) {
    throw new Error(`GitHub user "${username}" was not found.`);
  }

  if (!res.ok) {
    throw new Error(`GitHub returned status ${res.status} when fetching user profile.`);
  }

  const html = await res.text();
  const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-ix="[^"]*"[^>]*>(\d+)\s+contribution/gi;
  // Modern GitHub contributions HTML uses tooltips or data attributes
  // Let's parse both standard patterns:
  // 1) data-date="2025-01-01" ... id="contribution-day-component-..."
  // 2) td data-date="2025-01-01" data-level="..."
  const days: ContributionDay[] = [];

  // Match all td/tooltips with data-date
  const dateBlocks = html.match(/<tool-tip[^>]*for="contribution-day-component-[^"]*"[^>]*>([\s\S]*?)<\/tool-tip>/gi) || [];
  
  if (dateBlocks.length > 0) {
    for (const block of dateBlocks) {
      const dateMatch = block.match(/data-date="(\d{4}-\d{2}-\d{2})"/i) || block.match(/on\s+([A-Za-z]+ \d+, \d{4})/i);
      const countMatch = block.match(/(\d+)\s+contribution/i) || block.match(/No\s+contribution/i);
      
      const count = countMatch ? (countMatch[0].startsWith('No') ? 0 : parseInt(countMatch[1], 10)) : 0;
      // If we have date
      const dMatch = block.match(/on\s+([A-Za-z]+\s+\d+,\s+\d{4})/i);
      if (dMatch) {
        const parsedDate = new Date(dMatch[1]);
        if (!isNaN(parsedDate.getTime())) {
          const iso = parsedDate.toISOString().split('T')[0];
          days.push({
            date: iso,
            contributionCount: count,
            weekday: parsedDate.getDay(),
          });
        }
      }
    }
  }

  // Secondary fallback: regex for data-date attributes in calendar tables
  if (days.length === 0) {
    const rawMatches = html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"/g);
    for (const match of rawMatches) {
      const dateStr = match[1];
      const parsedDate = new Date(dateStr + 'T00:00:00Z');
      days.push({
        date: dateStr,
        contributionCount: 0,
        weekday: parsedDate.getUTCDay(),
      });
    }
  }

  // Deduplicate and sort
  const uniqueDaysMap = new Map<string, ContributionDay>();
  for (const d of days) {
    uniqueDaysMap.set(d.date, d);
  }
  const sorted = Array.from(uniqueDaysMap.values()).sort((a, b) => a.date.localeCompare(b.date));

  return calculateStreaks(sorted, username, {
    avatarUrl: `https://github.com/${username}.png`,
  });
}

/**
 * Fetches user contribution statistics via GitHub GraphQL API.
 * Uses request deduplication and falls back safely.
 */
export async function fetchGitHubUserStats(username: string): Promise<UserStats> {
  const normalizedUser = username.trim().toLowerCase();
  if (!normalizedUser || !/^[a-z0-9](?:[a-z0-9]|-(?=[a-z0-9])){0,38}$/i.test(normalizedUser)) {
    throw new Error(`Invalid GitHub username: "${username}". Usernames can only contain alphanumeric characters or hyphens.`);
  }

  // Check if there is already an in-flight request for this user
  if (pendingRequests.has(normalizedUser)) {
    return pendingRequests.get(normalizedUser)!;
  }

  const fetchPromise = (async () => {
    const token = getNextToken();

    // If no token is provided in server environment, use public fallback
    if (!token) {
      return fetchPublicContributionData(normalizedUser);
    }

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'GeoStreak-Visualizer/1.0',
        },
        body: JSON.stringify({
          query: GRAPHQL_QUERY,
          variables: { login: normalizedUser },
        }),
      });

      if (response.status === 401 || response.status === 403) {
        // Token issue or rate limit: fallback to public scraper
        console.warn('GitHub token unauthorized or rate limited, falling back to public page fetch');
        return await fetchPublicContributionData(normalizedUser);
      }

      if (!response.ok) {
        throw new Error(`GitHub API HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();

      if (json.errors && json.errors.length > 0) {
        const notFound = json.errors.some((e: { type?: string; message?: string }) =>
          e.type === 'NOT_FOUND' || e.message?.toLowerCase().includes('could not resolve to a user')
        );
        if (notFound) {
          throw new Error(`GitHub user "${username}" does not exist.`);
        }
        throw new Error(json.errors[0]?.message || 'GitHub GraphQL Error');
      }

      const userData = json.data?.user;
      if (!userData) {
        throw new Error(`User "${username}" not found.`);
      }

      const calendar: ContributionCalendar = userData.contributionsCollection?.contributionCalendar;
      if (!calendar) {
        return calculateStreaks([], userData.login, {
          name: userData.name,
          avatarUrl: userData.avatarUrl,
        });
      }

      const days: ContributionDay[] = [];
      const weeks: ContributionWeek[] = calendar.weeks || [];

      for (const week of weeks) {
        if (week.contributionDays) {
          for (const d of week.contributionDays) {
            days.push({
              date: d.date,
              contributionCount: d.contributionCount,
              weekday: d.weekday,
              color: d.color,
            });
          }
        }
      }

      return calculateStreaks(days, userData.login, {
        name: userData.name,
        avatarUrl: userData.avatarUrl,
        weeks,
      });
    } catch (err: unknown) {
      // If error occurred during GraphQL call, attempt fallback
      const errMsg = err instanceof Error ? err.message : String(err);
      if (errMsg.includes('does not exist') || errMsg.includes('not found')) {
        throw err;
      }
      try {
        return await fetchPublicContributionData(normalizedUser);
      } catch {
        throw err;
      }
    }
  })();

  pendingRequests.set(normalizedUser, fetchPromise);

  try {
    return await fetchPromise;
  } finally {
    pendingRequests.delete(normalizedUser);
  }
}
