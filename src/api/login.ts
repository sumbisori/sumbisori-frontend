import { instance } from './instance';

interface LoginResponse {
  userId: number;
}

export const login = async (
  nickname: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await instance.post('/users/login', { nickname, password });
  return response.data;
};
