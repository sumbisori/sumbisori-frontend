import { useEffect, useState } from 'react';
import {
  SeafoodCollected,
  YoutubeVideoType,
  getJejuWaterHeight,
  getJejuWaterTemperature,
  getYoutubeContents,
} from '../../api/home';
import { HomeLocation } from './HomeLocation';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { HomeYoutubeList } from '../HomeYoutubeList';
import { motion } from 'framer-motion';
import { HomeYoutubeVideoIframe } from '../HomeYoutubeList/HomeYoutubeVideoIframe';
import { HomeContentsBox } from './HomeContentsBox';
import { HomeContentsWeather } from './HomeWeather';
import RefreshIcon from '@/assets/icons/refresh.svg?react';

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

  useEffect(() => {
    fetchWaterTemperature();
    fetchWaterHeight();
  }, [selectedLocation.code]);

  useEffect(() => {
    fetchYoutubeContents();
  }, []);

  return (
    <div className="flex flex-col gap-3 bg-gray-surface p-4">
      <HomeLocation
        location={selectedLocation}
        onSelectedLocation={(location) => setSelectedLocation(location)}
      />
      <HomeContentsBox
        title="오늘은 물질하기 딱 좋은 날씨네요!"
        content={
          <HomeContentsWeather
            seafoods={seafoods}
            waterHeight={waterHeight}
            waterTemperature={waterTemperature}
          />
        }
      />
      <HomeContentsBox
        title="숨비 TV"
        icon={
          <motion.img
            src="/src/assets/icons/refresh.svg"
            alt="More"
            className="size-5 cursor-pointer"
            animate={{ rotate: rotationCount * 360 }} // 누적된 회전 각도
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onClick={() => {
              setRotationCount((prev) => prev + 1); // 회전 각도 증가
              fetchYoutubeContents();
            }}
          />
        }
        content={
          <HomeYoutubeList
            videos={youtubeVideos}
            selectedVideo={selectedVideo}
            onSelectToPlay={handlePlay}
            onSelectToClose={handleClose}
          />
        }
      />

      <HomeContentsBox
        title="실시간 바다"
        content={
          <HomeYoutubeVideoIframe
            src={`https://www.youtube.com/embed/yoa08FUE768?autoplay=1&mute=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        }
      />
    </div>
  );
};
