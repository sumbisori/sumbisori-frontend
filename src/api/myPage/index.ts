import { https } from '../instance';
import { MyPageReservationType, ReservationCount, UserInfo } from './types';

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await https.get('/users');
  return response.data;
};
