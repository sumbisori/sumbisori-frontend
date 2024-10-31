import { secureInstance } from './instance';

export interface SeafoodAll {
  value: string | number;
  name: string;
  englishName?: string;
  description?: string;
}

export interface PostSeafood {
  seafood: string;
  count: number;
}

export const getSeafoodAll = async (): Promise<SeafoodAll[]> => {
  const response = await secureInstance.get('/seafoods');
  return response.data;
};

export const postSeafood = async (seafood: PostSeafood) => {
  const response = await secureInstance.post('/seafoods', seafood);
  return response.data;
};
