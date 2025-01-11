import { useEffect, useRef, useState } from 'react';
import {
  SeafoodCollected,
  YoutubeVideoType,
  getJejuWaterHeight,
  getJejuWaterTemperature,
  getYoutubeContents,
} from '@/api/home';
import { HomeLocation } from './HomeLocation';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { HomeYoutubeList } from '../HomeYoutubeList';
import { motion } from 'framer-motion';
import { HomeYoutubeVideoIframe } from '../HomeYoutubeList/HomeYoutubeVideoIframe';
import { HomeContentsBox } from './HomeContentsBox';
import { HomeContentsWeather } from './HomeWeather';
import RefreshIcon from '@/icons/refresh.svg?react';
import { HomeCategoryLabel, HomeCategoryBar } from './HomeCategory';
import { HomeContentsTraining } from './HomeContentsTraining';

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
  const [selectedCategory, setSelectedCategory] =
    useState<HomeCategoryLabel>('home');

  const homeRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);
  const seaRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryChange = (category: HomeCategoryLabel) => {
    setSelectedCategory(category);
    switch (category) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'training':
        scrollToRef(trainingRef);
        break;
      case 'tv':
        scrollToRef(tvRef);
        break;
      case 'sea':
        scrollToRef(seaRef);
        break;
      default:
        break;
    }
  };

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
    <>
      <HomeCategoryBar
        onCategoryChange={handleCategoryChange}
        value={selectedCategory}
      />
      <div className="flex flex-col gap-3 bg-gray-surface p-4">
        <HomeLocation
          location={selectedLocation}
          onSelectedLocation={(location) => setSelectedLocation(location)}
        />
        <HomeContentsBox
          title="오늘은 물질하기 딱 좋은 날씨네요!"
          ref={homeRef}
          view={
            <HomeContentsWeather
              seafoods={seafoods}
              waterHeight={waterHeight}
              waterTemperature={waterTemperature}
            />
          }
        />
        <HomeContentsBox
          title="해녀 Training"
          ref={trainingRef}
          view={<HomeContentsTraining />}
        />
        <HomeContentsBox
          title="숨비 TV"
          ref={tvRef}
          icon={
            <motion.button
              animate={{ rotate: rotationCount * 360 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onClick={() => {
                setRotationCount((prev) => prev + 1);
                fetchYoutubeContents();
              }}
            >
              <RefreshIcon className="size-5 cursor-pointer" />
            </motion.button>
          }
          view={
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
          ref={seaRef}
          view={
            <HomeYoutubeVideoIframe
              src={`https://www.youtube.com/embed/yoa08FUE768?autoplay=1&mute=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          }
        />
      </div>
    </>
  );
};
