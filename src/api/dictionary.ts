import { secureInstance } from './instance';

export interface DictionarySeafood {
  seafoodId: number;
  koreanName: string;
  englishName: string;
  description: string;
  insDt: string;
  count: number;
}

export const getSeafoods = async (): Promise<DictionarySeafood[]> => {
  const response = await secureInstance.get('/seafoods');
  return response.data;
};
