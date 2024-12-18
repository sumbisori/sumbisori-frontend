import axios from 'axios';
import { secureInstance } from './instance';

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
  const response = await secureInstance.get('/seafoods/collected');
  return response.data;
};

export const getYoutubeContents = async (): Promise<YoutubeVideoType[]> => {
  const response = await secureInstance.get('/contents/youtube');
  return response.data;
};

export const getJejuWaterTemperature = async (
  today: string,
  locationCode: string,
): Promise<{
  temp: string;
  time: string;
}> => {
  const response = await axios.get(
    `https://www.khoa.go.kr/api/oceangrid/tideObsTemp/search.do?ServiceKey=${import.meta.env.VITE_SEA_KEY}==&ObsCode=${locationCode}&Date=${today}&ResultType=json`,
  );
  return {
    temp: response.data.result.data[response.data.result.data.length - 1]
      .water_temp,
    time: response.data.result.data[response.data.result.data.length - 1]
      .record_time,
  };
};

export const getJejuWaterHeight = async (
  today: string,
  locationCode: string,
): Promise<{
  height: string;
  time: string;
}> => {
  const response = await axios.get(
    `https://www.khoa.go.kr/api/oceangrid/tideObsPreTab/search.do?ServiceKey=${import.meta.env.VITE_SEA_KEY}==&ObsCode=${locationCode}&Date=${today}&ResultType=json`,
  );

  const currentTime = new Date();
  const data = response.data.result.data;

  const closest = data.reduce((prev: any, curr: any) => {
    const prevTime = new Date(prev.tph_time);
    const currTime = new Date(curr.tph_time);
    return Math.abs(currTime.getTime() - currentTime.getTime()) <
      Math.abs(prevTime.getTime() - currentTime.getTime())
      ? curr
      : prev;
  });

  return {
    height: closest.hl_code,
    time: closest.tph_time,
  };
};
