import { https } from './instance';

export interface SeafoodCollected {
  seafoodId: number;
  koreanName: string;
  englishName: string;
  count: number;
}

export interface YoutubeVideoType {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  publishTime: string;
  channelTitle: string;
  viewCount: number;
}

export const getSeafoodCollected = async (): Promise<SeafoodCollected[]> => {
  const response = await https.get('/seafoods/collected');
  return response.data;
};

export const getYoutubeContents = async (): Promise<YoutubeVideoType[]> => {
  const response = await https.get('/contents/youtube');
  return response.data;
};

export type SuitabilityStatus =
  | 'SUITABLE'
  | 'CAUTION'
  | 'DANGEROUS'
  | 'DEFAULT';
export interface ContentWaveInfo {
  waveHeight: number;
  waterTemperature: number;
  observationTime: string;
  waveHeightSuitability: SuitabilityStatus;
  waterTemperatureSuitability: SuitabilityStatus;
}

export type WaveSpotCode =
  | 'jeju-harbor'
  | 'kimnyeong'
  | 'hado'
  | 'udo'
  | 'shinsan'
  | 'wimi'
  | 'jungmoon'
  | 'gapado'
  | 'yeongnak'
  | 'sinchang'
  | 'hyupjae'
  | 'gueom';
export interface WaveSpot {
  spot: WaveSpotCode;
  label: string;
}

export const getContentsWave = async (
  spot: WaveSpotCode,
): Promise<ContentWaveInfo> => {
  const response = await https.get(`/contents/wave?spot=${spot}`);
  return response.data;
};

export interface ContentWeatherInfo {
  temperature: number;
  weatherType: WeatherType;
  suitability: SuitabilityStatus;
}

type WeatherType =
  | 'CLEAR_SKY'
  | 'FEW_CLOUDS'
  | 'SCATTERED_CLOUDS'
  | 'BROKEN_CLOUDS'
  | 'SHOWER_RAIN'
  | 'RAIN'
  | 'THUNDERSTORM'
  | 'SNOW'
  | 'MIST';

export const getContentsWeather = async (
  spot: WaveSpotCode,
): Promise<ContentWeatherInfo> => {
  const response = await https.get(`/contents/weather?spot=${spot}`);
  return response.data;
};
