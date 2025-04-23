import { BadgeColorType, BadgeType } from '@/api/myPageBadge/types';

export const parseBadgeType = (
  badgeType: BadgeType,
  badgeLevel: number,
): BadgeColorType => {
  switch (badgeType) {
    case 'BASIC':
      switch (badgeLevel) {
        case 1:
          return 'green';
        default:
          return 'default';
      }
    case 'RANKED':
      switch (badgeLevel) {
        case 1:
          return 'bronze';
        case 2:
          return 'silver';
        case 3:
          return 'gold';
        default:
          return 'default';
      }
    case 'SPECIAL':
      switch (badgeLevel) {
        case 1:
          return 'purple';
        default:
          return 'default';
      }
    default:
      return 'default';
  }
};
