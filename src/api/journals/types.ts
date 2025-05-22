export interface JournalsRequest {
  page: number;
  size: number;
  sort?: 'asc' | 'desc';
}

export interface JournalsResponse {
  experienceId: string;
  imageUrl: string;
  title: string;
  experienceDate: string;
  companion: string;
  weather: string;
  placeName: string;
}
