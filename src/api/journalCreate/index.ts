import { https } from '../instance';
import { SeafoodsListType } from './types';

export const getJournalCreatePlace = async () => {
  const response = await https.get('/places');
  return response.data;
};

export const getSeafoodCountByAi = async (seafood: string) => {
  const response = await https.post('/seafoods/count', { seafood });
  return response.data;
};

export const getSeafoodsType = async (): Promise<SeafoodsListType[]> => {
  const response = await https.get('/seafoods/types');
  return response.data;
};
