import { useEffect, useState } from 'react';
import {
  SeafoodCollected,
  YoutubeVideoType,
  getJejuWaterHeight,
  getJejuWaterTemperature,
  getYoutubeContents,
} from '../../api/home';
import { HomeContentsCard } from './HomeContentsCard';
import { HomeLocation } from './HomeLocation';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { HomeYoutubeList } from '../HomeYoutubeList';
import { motion } from 'framer-motion';
import { HomeYoutubeVideoIframe } from '../HomeYoutubeList/HomeYoutubeVideoIframe';

interface Props {
  seafoods: SeafoodCollected[];
}

export const HomeContents = ({ seafoods }: Props) => {
  const { handleError } = useErrorHandler();
  const [rotationCount, setRotationCount] = useState(0);
  const [youtubeVideos, setYoutubeVideos] = useState<YoutubeVideoType[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideoType | null>(
    null,
  );

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

  const handlePlay = (video: YoutubeVideoType) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

  const fetchYoutubeContents = async () => {
    try {
      const response = await getYoutubeContents();
      setYoutubeVideos(response);
      setSelectedVideo(null);
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
              <div className="text-[1.5rem] font-bold">
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
                <div className="flex items-center gap-[0.313rem]">
                  <img src="/icons/sea_scale.svg" />

                  <div className="text-[1.125rem] font-semibold">
                    {waterHeight.height}
                  </div>
                </div>
                <div className="flex w-full justify-center text-[0.5rem]">
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
                <div className="flex items-center gap-[0.313rem]">
                  <img src="/icons/weather.svg" />
                  <div className="text-[1.313rem] font-semibold">
                    {waterTemperature.temp}°
                  </div>
                </div>
                <div className="flex w-full justify-center text-[0.5rem]">
                  <span>{convertToTodayTime(waterTemperature.time)}</span>
                  <span className="text-gray-500"> 기준</span>
                </div>
              </div>
            }
          />
        </div>
      </div>
      <div className="h-[0.313rem] bg-gray-050"></div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center justify-between pb-3 text-[1.063rem] font-semibold">
              해녀 TV
              <motion.img
                src="/icons/refresh.svg"
                alt="More"
                className="size-5 cursor-pointer"
                animate={{ rotate: rotationCount * 360 }} // 누적된 회전 각도
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                onClick={() => {
                  setRotationCount((prev) => prev + 1); // 회전 각도 증가

                  fetchYoutubeContents();
                }}
              />
            </div>
            <HomeYoutubeList
              videos={youtubeVideos}
              selectedVideo={selectedVideo}
              onSelectToPlay={handlePlay}
              onSelectToClose={handleClose}
            />
          </div>
        </div>
      </div>

      <div className="h-[0.313rem] bg-gray-050"></div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center pb-3 text-[1.063rem] font-semibold">
              실시간 바다
            </div>
            <HomeYoutubeVideoIframe
              src={`https://www.youtube.com/embed/yoa08FUE768?autoplay=1&mute=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="h-[0.313rem] bg-gray-050"></div>
    </div>
  );
};
