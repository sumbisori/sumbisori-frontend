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
  experienceDate: dayjs.Dayjs | null;
  place: {
    id: number;
    name: string;
  } | null;
  weather: string | null;
  companionType: string | null;
  impression: string;
  satisfaction: number | null;
  files: JournalPhoto[];
  collections: JournalCollectedSeafood[];
}

export interface JournalPhoto {
  imageIdentifier: string;
  file: File;
  sequence: number;
}

export interface JournalCollectedSeafood {
  imageIdentifier: string;
  file: File;
  collectionInfos: CollectedSeafood[];
  analysisStatus?: 'pending' | 'success' | 'failed';
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

// 체험일지 생성 요청 타입
export interface JournalRequest {
  experienceDate: string; // 2025-03-15
  placeId: number;
  weather: string;
  companionType: string;
  files: JournalRequestFile[];
  impression: string;
  satisfaction: number;
  collections: JournalRequestCollection[];
}

interface JournalRequestFile {
  imageIdentifier: string;
  sequence: number;
}

interface JournalRequestCollection {
  imageIdentifier: string;
  collectionInfos: JournalRequestCollectionInfo[];
}

interface JournalRequestCollectionInfo {
  seafoodId: number;
  quantity: number;
}
