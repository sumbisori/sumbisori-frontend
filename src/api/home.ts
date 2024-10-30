import { instance } from './instance';

const getTest = async (): Promise<boolean> => {
  return await instance.get(`/test`);
};

const getDb = async (): Promise<boolean> => {
  return await instance.get(`/db`);
};

const getConnect = async (): Promise<string> => {
  return await instance.get(`/connect`);
};

export { getTest, getDb, getConnect };
