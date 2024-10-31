import { secureInstance } from './instance';

export interface DictionarySeafood {
  englishName: number;
  name: string;
  description: string;
  insDt: string;
  count: number;
}

export const getSeafoodMy = async (): Promise<DictionarySeafood[]> => {
  const response = await secureInstance.get('/seafoods/my');
  return response.data;
};
