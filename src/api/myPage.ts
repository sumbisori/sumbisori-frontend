import { secureInstance } from './instance';

export interface UserInfo {
  nickname: string;
  count: number;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await secureInstance.get('/my-page/my-info');
  return response.data;
};
