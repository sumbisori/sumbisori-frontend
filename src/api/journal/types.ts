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
  place: string | null;
  weather: string | null;
  photo: string | null;
  seafood: string | null;
}
