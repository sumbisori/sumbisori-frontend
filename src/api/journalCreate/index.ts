import { https } from '../instance';
import { CollectedSeafood, SeafoodsTypeList } from './types';

export const getJournalCreatePlace = async () => {
  const response = await https.get('/places');
  return response.data;
};

export const getSeafoodCountByAi = async (seafood: string) => {
  const response = await https.post('/seafoods/count', { seafood });
  return response.data;
};

export const getSeafoods = async (): Promise<SeafoodsTypeList[]> => {
  const response = await https.get('/seafoods');
  return response.data;
};

export const analyzeSeafoodImage = async (
  imageIdentifier: string,
): Promise<CollectedSeafood[]> => {
  const response = await https.get(
    `/files/analyze?imageIdentifier=${imageIdentifier}`,
  );
  return response.data;
};
