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

export interface ContentWeatherInfo {
  temperature: number;
  weatherType: WeatherType;
  suitability: SuitabilityStatus;
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

export type WeatherType =
  | 'CLEAR_SKY'
  | 'FEW_CLOUDS'
  | 'SCATTERED_CLOUDS'
  | 'BROKEN_CLOUDS'
  | 'SHOWER_RAIN'
  | 'RAIN'
  | 'THUNDERSTORM'
  | 'SNOW'
  | 'MIST';
