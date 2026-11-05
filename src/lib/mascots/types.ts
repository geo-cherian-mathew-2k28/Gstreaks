export type MascotId = 'streaky' | 'gitty' | 'mochi' | 'byte' | 'spark' | 'blob';

export type MascotExpression =
  | 'idle'
  | 'happy'
  | 'excited'
  | 'sleeping'
  | 'surprised'
  | 'celebrating'
  | 'determined';

export type StreakTier =
  | 'dormant'    // 0 days (sleeping)
  | 'bronze'     // 1-3 days (happy)
  | 'silver'     // 4-7 days (excited)
  | 'gold'       // 8-30 days (celebrating)
  | 'diamond'    // 31-99 days (glowing aura)
  | 'legendary';  // 100+ days (legendary crown & aura)

export interface MascotInfo {
  id: MascotId;
  name: string;
  tagline: string;
  description: string;
  color: string;
  secondaryColor: string;
  accentColor: string;
}

export function getStreakTier(streakCount: number): StreakTier {
  if (streakCount <= 0) return 'dormant';
  if (streakCount <= 3) return 'bronze';
  if (streakCount <= 7) return 'silver';
  if (streakCount <= 30) return 'gold';
  if (streakCount <= 99) return 'diamond';
  return 'legendary';
}

export function getExpressionForStreak(streakCount: number, customExpression?: MascotExpression): MascotExpression {
  if (customExpression) return customExpression;
  if (streakCount <= 0) return 'sleeping';
  if (streakCount <= 3) return 'happy';
  if (streakCount <= 7) return 'excited';
  if (streakCount <= 30) return 'celebrating';
  return 'celebrating'; // high streaks show celebration/excitement
}
