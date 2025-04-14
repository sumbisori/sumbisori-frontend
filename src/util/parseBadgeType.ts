import { BadgeColorType } from '@/api/myPageBadge/types';

export const parseBadgeType = (badgeType: string): BadgeColorType => {
  switch (badgeType) {
    case 'FIRST_LOGIN':
    case 'FIRST_EXPERIENCE':
    case 'THIRD_EXPERIENCE':
    case 'FIRST_COLLECTION':
      return 'green';
    default:
      return 'default';
  }
};
