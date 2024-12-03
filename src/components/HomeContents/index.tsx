import { useEffect, useState } from 'react';
import {
  SeafoodCollected,
  YoutubeVideoType,
  getJejuWaterHeight,
  getJejuWaterTemperature,
  getYoutubeContents,
} from '../../api/home';
import { GrayButton } from '../Button/GrayButton';
import { HomeContentsCard } from './HomeContentsCard';
import { HomeLocation } from './HomeLocation';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { HomeYoutubeList } from '../HomeYoutubeList';

interface Props {
  seafoods: SeafoodCollected[];
}

export const HomeContents = ({ seafoods }: Props) => {
  const { handleError } = useErrorHandler();

  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideoType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    code: string;
    name: string;
  }>({ code: 'DT_0004', name: '제주' });

  const [waterTemperature, setWaterTemperature] = useState<{
    temp: string;
    time: string;
  }>({
    temp: '0',
    time: '2024-11-07 00:00:00',
  });

  const [waterHeight, setWaterHeight] = useState<{
    height: string;
    time: string;
  }>({
    height: '로딩중',
    time: '2024-11-07 00:00:00',
  });

  const fetchYoutubeContents = async () => {
    try {
      const response = await getYoutubeContents();
      setYoutubeVideos(response);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchWaterTemperature = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const response = await getJejuWaterTemperature(
        today,
        selectedLocation.code,
      );
      setWaterTemperature(response);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchWaterHeight = async () => {
    try {
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const response = await getJejuWaterHeight(today, selectedLocation.code);
      setWaterHeight(response);
    } catch (error) {
      handleError(error);
    }
  };

  function convertToTodayTime(datetimeStr: string) {
    const date = new Date(datetimeStr);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}시 ${minutes}분`;
  }

  useEffect(() => {
    fetchWaterTemperature();
    fetchWaterHeight();
  }, [selectedLocation.code]);

  useEffect(() => {
    fetchYoutubeContents();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3 p-4">
        <HomeLocation
          location={selectedLocation}
          onSelectedLocation={(location) => setSelectedLocation(location)}
        />
        <div className="grid w-full grid-cols-3 gap-4">
          <HomeContentsCard
            label="물질도감"
            cardContent={
              <div className="text-[24px] font-bold">
                <span>
                  {seafoods.filter((seafood) => seafood.count > 0).length}
                </span>
                <span className="text-gray-500">/18</span>
              </div>
            }
          />
          <HomeContentsCard
            label="물때"
            cardContent={
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-[5px]">
                  <img src="/icons/sea_scale.svg" />

                  <div className="text-[18px] font-semibold">
                    {waterHeight.height}
                  </div>
                </div>
                <div className="flex w-full justify-center text-[8px]">
                  <span>{convertToTodayTime(waterHeight.time)}</span>
                  <span className="text-gray-500"> 기준</span>
                </div>
              </div>
            }
          />
          <HomeContentsCard
            label="수온"
            cardContent={
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-[5px]">
                  <img src="/icons/weather.svg" />
                  <div className="text-[21px] font-semibold">
                    {waterTemperature.temp}°
                  </div>
                </div>
                <div className="flex w-full justify-center text-[8px]">
                  <span>{convertToTodayTime(waterTemperature.time)}</span>
                  <span className="text-gray-500"> 기준</span>
                </div>
              </div>
            }
          />
        </div>
      </div>
      <div className="h-[5px] bg-gray-050"></div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-col gap-3">
          <div>
            <div className="pb-3 text-[17px] font-semibold">관련 영상</div>
            <HomeYoutubeList videos={youtubeVideos} />
          </div>
        </div>
      </div>
    </div>
  );
};
