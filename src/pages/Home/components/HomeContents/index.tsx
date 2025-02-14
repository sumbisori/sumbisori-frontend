import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  YoutubeVideoType,
  getContentsWave,
  getYoutubeContents,
  ContentWaveInfo,
  WaveSpot,
  ContentWeatherInfo,
  getContentsWeather,
} from '@/api/home';

import { HomeYoutubeList } from '../HomeYoutubeList';
import { motion } from 'framer-motion';
import { HomeYoutubeVideoIframe } from '../HomeYoutubeVideoIframe';

import RefreshIcon from '@/icons/refresh.svg?react';

import { queryKeys } from '@/query';
import { HomeContentsBox } from '../HomeContentsBox';
import { HomeSpotHeader } from '../HomeSpotHeader';
import { HomeCategoryBar, HomeCategoryLabel } from '../HomeCategory';
import { HomeSectionTitle } from '../HomeSectionTitle';
import { HomeContentsWeather } from '../HomeContentsWeather';
import { HomeContentsTraining } from '../HomeContentsTraining';

export const HomeContents = () => {
  const [rotationCount, setRotationCount] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<HomeCategoryLabel>('home');
  const homeRef = useRef<HTMLDivElement>(null);
  const trainingRef = useRef<HTMLDivElement>(null);
  const tvRef = useRef<HTMLDivElement>(null);
  const seaRef = useRef<HTMLDivElement>(null);

  const YOUTUBE_COUNT = 3;

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [selectedSpot, setSelectedSpot] = useState<WaveSpot>({
    spot: 'jeju-harbor',
    label: '제주항',
  });

  const {
    data: waveInfo,
    isError: waveInfoError,
    isFetching: waveInfoLoading,
  } = useQuery<ContentWaveInfo>({
    queryKey: [queryKeys.contentsWave, selectedSpot.spot],
    queryFn: () => getContentsWave(selectedSpot.spot),
    enabled: !!selectedSpot.spot,
    initialData: {
      waterTemperature: 0,
      waveHeight: 0,
      waterTemperatureSuitability: 'DEFAULT',
      waveHeightSuitability: 'DEFAULT',
      observationTime: '',
    },
    retry: false,
  });

  const {
    data: weather,
    isError: weatherError,
    isFetching: weatherLoading,
  } = useQuery<ContentWeatherInfo>({
    queryKey: [queryKeys.contentsWeather, selectedSpot.spot],
    queryFn: () => getContentsWeather(selectedSpot.spot),
    enabled: !!selectedSpot.spot,
    initialData: {
      temperature: 0,
      suitability: 'DEFAULT',
      weatherType: 'CLEAR_SKY',
    },
  });

  const {
    data: youtubeVideos,
    isFetching: youtubeLoading,
    isError: youtubeError,
    refetch: refetchYoutube,
  } = useQuery<YoutubeVideoType[]>({
    queryKey: [queryKeys.youtubeContents, YOUTUBE_COUNT],
    queryFn: () => {
      return getYoutubeContents(YOUTUBE_COUNT);
    },
    initialData: [],
  });

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

  return (
    <section className="flex flex-col bg-gray-surface" id="home-container">
      <HomeCategoryBar
        onCategoryChange={handleCategoryChange}
        value={selectedCategory}
      />
      <HomeSpotHeader
        spot={selectedSpot}
        onSelectedSpot={(spot) => setSelectedSpot(spot)}
        observationTime={waveInfo.observationTime}
      />
      <div id="home-content-container" className="flex flex-col gap-3 p-4">
        <HomeContentsBox
          id="home-section"
          boxTitle={
            <HomeSectionTitle
              weatherSuitability={weather.suitability}
              waterTemperatureSuitability={waveInfo.waterTemperatureSuitability}
              waveHeightSuitability={waveInfo.waveHeightSuitability}
              titleError={waveInfoError || weatherError}
              titleLoading={waveInfoLoading || weatherLoading}
            />
          }
          ref={homeRef}
          view={
            <HomeContentsWeather
              waveInfo={waveInfo}
              weather={weather}
              waveInfoError={waveInfoError}
              weatherError={weatherError}
              weatherLoading={weatherLoading}
              waveInfoLoading={waveInfoLoading}
            />
          }
        />
        <HomeContentsBox
          id="training-section"
          boxTitle="해녀 트레이닝"
          ref={trainingRef}
          view={<HomeContentsTraining />}
        />
        <HomeContentsBox
          id="tv-section"
          boxTitle="숨비채널"
          ref={tvRef}
          icon={
            <motion.button
              animate={{ rotate: rotationCount * 360 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onClick={() => {
                setRotationCount((prev) => prev + 1);
                refetchYoutube();
              }}
            >
              <RefreshIcon className="size-5 cursor-pointer" />
            </motion.button>
          }
          view={
            <HomeYoutubeList
              videos={youtubeVideos}
              youtubeLoading={youtubeLoading}
              youtubeError={youtubeError}
            />
          }
        />
        <HomeContentsBox
          id="sea-section"
          boxTitle="실시간 바다"
          ref={seaRef}
          view={
            <HomeYoutubeVideoIframe
              src="https://www.youtube.com/embed/yoa08FUE768?autoplay=1&mute=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          }
        />
      </div>
    </section>
  );
};
