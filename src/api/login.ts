import { instance } from './instance';

export const login = async (nickname: string, password: string) => {
  const response = await instance.post('/users/login', { nickname, password });
  return response.data;
};
