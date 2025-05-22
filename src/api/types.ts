export interface ErrorResponse {
  name: string;
  message: string[];
  status: number;
}

export type SeafoodType =
  | 'Abalone'
  | 'Clam'
  | 'Conch'
  | 'Gastropods'
  | 'Murex'
  | 'Mussel'
  | 'Net'
  | 'Octopus'
  | 'Omphalius'
  | 'Oyster'
  | 'Rope'
  | 'SeaCucumber'
  | 'SeaMustard'
  | 'SeaSquirt'
  | 'SeaUrchin'
  | 'Squid'
  | 'Vinyl'
  | 'WaterBottle';

export interface Pagination<T> {
  content: T;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
