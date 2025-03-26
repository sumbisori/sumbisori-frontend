export interface JournalsRequest {
  page: number;
  size: number;
  sort?: 'asc' | 'desc';
}

export interface Pagination<T> {
  content: T;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface JournalsResponse {
  experienceId: string;
  imageUrl: string;
  title: string;
  experienceDate: string;
  companion: string;
  weather: string;
}
