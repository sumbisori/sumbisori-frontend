import { https } from '../instance';

export const getJournalCreatePlace = async () => {
  const response = await https.get('/places');
  return response.data;
};

export const getSeafoodCountByAi = async (seafood: string) => {
  const response = await https.post('/seafoods/count', { seafood });
  return response.data;
};
