import { https } from '../instance';
import { Badge } from './types';

export const getMyPageBadge = async () => {
  const response = await https.get<Badge[]>('/badges');
  return response.data;
};
