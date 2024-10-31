import { secureInstance } from './instance';

export interface UserInfo {
  nickname: string;
  count: number;
}

export interface ReservationCount {
  pendingCount: number;
  endCount: number;
}

export interface MyPageReservationType {
  id: string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await secureInstance.get('/my-page/my-info');
  return response.data;
};

export const getReservationList = async (
  status: 'PENDING' | 'END',
): Promise<MyPageReservationType[]> => {
  const response = await secureInstance.get(`/reservation/my?status=${status}`);
  return response.data;
};

export const getReservationCount = async (): Promise<ReservationCount> => {
  const response = await secureInstance.get('/reservation/my/counts');
  return response.data;
};
