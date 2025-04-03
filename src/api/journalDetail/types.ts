import { SeafoodType } from '../types';

export interface JournalDetailType {
  experienceId: number;
  experienceDate: string;
  satisfaction: number;
  companion: string;
  weather: string;
  impression: string;
  placeName: string;
  createdAt: string;
  imageUrls: string[];
}

export interface JournalDetailCollectionsType {
  seafoodCollectionInfos: {
    seafoodId: number;
    koreanName: string;
    englishName: SeafoodType;
    count: number;
  }[];
  collectionResult: CollectionResultType[];
}

export interface CollectionResultType {
  imageUrl: string;
  seafoodCollectionInfos: {
    seafoodId: number;
    koreanName: string;
    englishName: SeafoodType;
    count: number;
  }[];
}
