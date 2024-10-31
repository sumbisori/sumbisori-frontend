import { secureInstance } from './instance';

export interface DictionarySeafood {
  englishName: number;
  name: string;
  desc: string;
  insDt: string;
  count: number;
}

export const getDictionarySeafood = async (): Promise<DictionarySeafood[]> => {
  const response = await secureInstance.get('/dictionary/seafood');
  return response.data;
};
