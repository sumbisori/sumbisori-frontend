import { http } from './instance';

interface LoginResponse {
  userId: number;
}

export const login = async (
  nickname: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await http.post('/users/login', { nickname, password });
  return response.data;
};
