import { https } from '../instance';
import { MyPageReservationType, ReservationCount, UserInfo } from './types';

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await https.get('/users');
  return response.data;
};

export const getReservationList = async (
  status: 'PENDING' | 'END',
): Promise<MyPageReservationType[]> => {
  const response = await https.get(`/reservations?status=${status}`);
  return response.data;
};

export const getReservationCount = async (): Promise<ReservationCount> => {
  const response = await https.get('/reservations/count');
  return response.data;
};
