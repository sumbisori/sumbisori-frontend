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
  photos: string[];
  seafood: string | null;
  satisfaction: number;
}

export interface JournalCreatePlace {
  placeId: number;
  name: string;
  city: string;
  imageUrl: string;
}
