import { https } from '../instance';
import {
  ContentWaveInfo,
  ContentWeatherInfo,
  SeafoodCollected,
  SuitabilityStatus,
  WaveSpotCode,
  WeatherType,
  YoutubeVideoType,
} from './types';

export const getSeafoodCollected = async (): Promise<SeafoodCollected[]> => {
  const response = await https.get('/seafoods/collected');
  return response.data;
};

export const getYoutubeContents = async (
  count: number,
): Promise<YoutubeVideoType[]> => {
  const response = await https.get(`/contents/youtube?count=${count}`);
  return response.data;
};

export const getContentsWave = async (
  spot: WaveSpotCode,
): Promise<ContentWaveInfo> => {
  const response = await https.get(`/contents/wave?spot=${spot}`);
  return response.data;
};

export const getContentsWeather = async (
  spot: WaveSpotCode,
): Promise<ContentWeatherInfo> => {
  const response = await https.get(`/contents/weather?spot=${spot}`);
  return response.data;
};
