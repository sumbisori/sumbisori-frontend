import { https } from './instance';

export interface UserInfo {
  nickname: string;
  count: number;
  profileImageUrl: string;
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
