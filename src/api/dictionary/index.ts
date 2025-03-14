import { https } from '../instance';
import { DictionarySeafood } from './types';

export const getSeafoodsCollectionsStatus = async (): Promise<
  DictionarySeafood[]
> => {
  const response = await https.get('/collections/status');
  return response.data;
};
