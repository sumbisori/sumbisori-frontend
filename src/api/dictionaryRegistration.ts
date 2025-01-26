import { https } from './instance';

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
  const response = await https.get('/seafoods/types');
  return response.data;
};

export const postSeafood = async (seafood: PostSeafood) => {
  const response = await https.post('/seafoods', seafood);
  return response.data;
};
