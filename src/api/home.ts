import { secureInstance } from './instance';

export interface SeafoodCollected {
  seafoodId: number;
  koreanName: string;
  englishName: string;
  count: number;
}

export const getSeafoodCollected = async (): Promise<SeafoodCollected[]> => {
  const response = await secureInstance.get('/seafoods/collected');
  return response.data;
};
