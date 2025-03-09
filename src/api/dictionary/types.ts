import { SeafoodType } from '../types';

export interface DictionarySeafood {
  seafoodId: number;
  koreanName: string;
  englishName: SeafoodType;
  description: string;
  insDt: string;
  count: number;
}
