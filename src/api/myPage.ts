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

// {
//   "reservationDate": "2024년 11월 06일",
//   "reservationTime": "오전 09:00",
//   "status": "PENDING",
//   "personName": "김성용",
//   "imageUrl": "https://i.ibb.co/6JSh8HD/image.jpg",
//   "name": "제주 해녀체험",
//   "address": "제주 서귀포시 남원읍 하례망장포로 65-13",
//   "peopleCount": 3
// }

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
