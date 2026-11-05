import { UserStats } from '../github/types';
import { ThemePalette } from '../themes';
import { MascotId, MascotExpression } from '../mascots/types';

export type CardLayoutId =
  | 'classic'
  | 'minimal'
  | 'graph'
  | 'mascot'
  | 'terminal'
  | 'glass'
  | 'compact';

export interface CardRenderOptions {
  stats: UserStats;
  theme: ThemePalette;
  mascotId: MascotId;
  customExpression?: MascotExpression;
  animated: boolean;
  layout: CardLayoutId;
  hideBorder: boolean;
  hideTitle: boolean;
  hideCurrentStreak: boolean;
  hideLongestStreak: boolean;
  hideTotalContributions: boolean;
  showGraph: boolean;
  radius: number;
  customBg?: string;
  customBorder?: string;
  customText?: string;
  customPrimary?: string;
}

export interface CardDimensions {
  width: number;
  height: number;
}
