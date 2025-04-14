export interface Badge {
  badgeType: string;
  badgeName: string;
  badgeDescription: string;
  isAcquired: boolean;
}

export type BadgeColorType =
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'green'
  | 'purple'
  | 'default';
