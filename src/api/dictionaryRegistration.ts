import { secureInstance } from './instance';

export interface SeafoodAll {
  seafoodId: number;
  koreanName: string;
  englishName?: string;
  description?: string;
}

export interface PostSeafood {
  seafoodId: number | null;
  count: number;
}

export const getSeafoodTypes = async (): Promise<SeafoodAll[]> => {
  const response = await secureInstance.get('/seafoods/types');
  return response.data;
};

export const postSeafood = async (seafood: PostSeafood) => {
  const response = await secureInstance.post('/seafoods', seafood);
  return response.data;
};
