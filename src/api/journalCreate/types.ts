import dayjs from 'dayjs';
import { SeafoodType } from '../types';

export type JournalStep =
  | 'calendar'
  | 'place'
  | 'weather'
  | 'photo'
  | 'seafood'
  | 'register';

export interface JournalForm {
  date: dayjs.Dayjs;
  placeId: number | null;
  weather: string;
  companion: string;
  experience: string;
  photos: JournalPhoto[];
  satisfaction: number;
  collectedSeafoods: JournalCollectedSeafood[];
}

export interface JournalPhoto {
  objectKey: string;
  file: File;
}

export interface JournalCollectedSeafood {
  objectKey: string;
  file: File;
  seafoods: {
    englishName: SeafoodType;
    koreanName: string;
    seafoodId: number;
    count: number;
  }[];
}

export interface SeafoodsListType {
  englishName: SeafoodType;
  koreanName: string;
  seafoodId: number;
  description: string;
}

export interface JournalCreatePlace {
  placeId: number;
  name: string;
  city: string;
  imageUrl: string;
}
