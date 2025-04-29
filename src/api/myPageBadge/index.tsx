import { https } from '../instance';
import { Badge, BadgeDetail } from './types';

export const getMyPageBadge = async () => {
  const response = await https.get<Badge[]>('/badges');
  return response.data;
};

export const getBadgeDetail = async (badgeId: number) => {
  const response = await https.get<BadgeDetail>(`/badges/${badgeId}`);
  return response.data;
};

export const postRepresentativeBadge = async (badgeId: number) => {
  const response = await https.post(`/badges/${badgeId}/representative`);
  return response.data;
};
