import { instance } from './instance';

export const login = async (nickname: string, password: string) => {
  const response = await instance.post('/login', { nickname, password });
  return response.data;
};
