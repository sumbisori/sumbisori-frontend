import { https } from '../instance';
import { DictionarySeafood } from './types';

export const getSeafoods = async (): Promise<DictionarySeafood[]> => {
  const response = await https.get('/seafoods');
  return response.data;
};
