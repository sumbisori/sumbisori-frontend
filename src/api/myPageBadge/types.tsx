export interface Badge {
  badgeId: number;
  badgeLevel: BadgeLevel;
  badgeName: string;
  badgeType: BadgeType;
  isAcquired: boolean;
  isRepresentative: boolean;
}

export interface BadgeDetail {
  badgeId: number;
  badgeType: BadgeType;
  name: string;
  description: string;
  acquisition: string;
  badgeLevelDetails: BadgeLevelDetail[];
}

export interface BadgeLevelDetail {
  badgeLevelId: number;
  acquisitionDate: string;
  level: number;
  isAcquired: boolean;
  levelDescription: string;
}

export type BadgeType = 'BASIC' | 'RANKED' | 'SPECIAL';

export type BadgeLevel = 0 | 1 | 2 | 3;

export type BadgeColorType =
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'green'
  | 'purple'
  | 'default';
