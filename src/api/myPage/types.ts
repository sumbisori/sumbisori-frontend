import { BadgeLevel, BadgeType } from '@/api/myPageBadge/types';

export interface UserInfo {
  nickname: string;
  profileImageUrl: string;
  badgeName: string;
  badgeType: BadgeType;
  badgeDescription: string;
  level: BadgeLevel;
  totalBadgeCount: number;
  acquiredBadgeCount: number;
}

export interface ReservationCount {
  pendingCount: number;
  endCount: number;
}

export interface MyPageReservationType {
  id: number;
  reservationDate: string;
  reservationTime: string;
  status: 'PENDING' | 'END';
  personName: string;
  imageUrl: string;
  name: string;
  address: string;
  peopleCount: number;
}
