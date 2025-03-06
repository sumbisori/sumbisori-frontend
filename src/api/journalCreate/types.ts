import dayjs from 'dayjs';

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
  seafood: JournalSeafood[];
}

export interface JournalPhoto {
  objectKey: string;
  file: File;
}

export interface JournalSeafood {
  objectKey: string;
  file: File;
  seafoods: {
    name: string;
    count: number;
  }[];
}

export interface JournalCreatePlace {
  placeId: number;
  name: string;
  city: string;
  imageUrl: string;
}
