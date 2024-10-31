import { secureInstance } from './instance';

export interface DictionarySeafoodAll {
  value: string;
  name: string;
  englishName: string;
  description: string;
}

export const getSeafoodAll = async (): Promise<DictionarySeafoodAll[]> => {
  const response = await secureInstance.get('/seafoods');
  return response.data;
};
