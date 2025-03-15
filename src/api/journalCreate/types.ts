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
  place: {
    id: number;
    name: string;
  } | null;
  weather: string | null;
  companion: string | null;
  experience: string;
  photos: JournalPhoto[];
  satisfaction: number | null;
  collectedSeafoods: JournalCollectedSeafood[];
}

export interface JournalPhoto {
  imageIdentifier: string;
  file: File;
}

export interface JournalCollectedSeafood {
  imageIdentifier: string;
  file: File;
  seafoods: CollectedSeafood[];
  analysisStatus?: string;
}

export interface CollectedSeafood {
  englishName: SeafoodType;
  koreanName: string;
  seafoodId: number;
  count: number;
}

export interface SeafoodsTypeList {
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
