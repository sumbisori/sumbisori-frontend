import { useEffect, useRef, useState } from 'react';
import {
  YoutubeVideoType,
  getContentsWave,
  getYoutubeContents,
  ContentWaveInfo,
  WaveSpot,
  ContentWeatherInfo,
  getContentsWeather,
  SuitabilityStatus,
} from '@/api/home';
import { HomeSpotHeader } from './HomeSpotHeader';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { HomeYoutubeList } from '../HomeYoutubeList';
import { motion } from 'framer-motion';
import { HomeYoutubeVideoIframe } from '../HomeYoutubeList/HomeYoutubeVideoIframe';
import { HomeContentsBox } from './HomeContentsBox';
import { HomeContentsWeather } from './HomeWeather';
import RefreshIcon from '@/icons/refresh.svg?react';
import { HomeCategoryLabel, HomeCategoryBar } from './HomeCategory';
import { HomeContentsTraining } from './HomeContentsTraining';
import { homeTitleMessage } from '@/constant/src/homeTitleMessage';

export const HomeContents = () => {
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

  const [selectedSpot, setSelectedSpot] = useState<WaveSpot>({
    spot: 'jeju-harbor',
    label: '제주항',
  });

  const [waveInfo, setWaveInfo] = useState<ContentWaveInfo>({
    waveHeight: 0,
    waterTemperature: 0,
    observationTime: '',
    waveHeightSuitability: 'DEFAULT',
    waterTemperatureSuitability: 'DEFAULT',
  });

  const [waveInfoError, setWaveInfoError] = useState<boolean>(false);

  const [weather, setWeather] = useState<ContentWeatherInfo>({
    temperature: 0,
    weatherType: 'CLEAR_SKY',
    suitability: 'DEFAULT',
  });

  const [weatherError, setWeatherError] = useState<boolean>(false);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [waveInfoLoading, setWaveInfoLoading] = useState<boolean>(true);
  const [youtubeLoading, setYoutubeLoading] = useState<boolean>(true);

  const handlePlay = (video: YoutubeVideoType) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
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

  const fetchYoutubeContents = async () => {
    setYoutubeLoading(true);
    try {
      const response = await getYoutubeContents();
      setYoutubeVideos(response);
      setSelectedVideo(null);
    } catch (error) {
      handleError(error);
    } finally {
      setYoutubeLoading(false);
    }
  };

  const fetchContentsWave = async () => {
    setWaveInfoError(false);
    setWaveInfoLoading(true);
    try {
      const response = await getContentsWave(selectedSpot.spot);
      setWaveInfo(response);
    } catch (error) {
      handleError(error);
      setWaveInfoError(true);
      setWaveInfo({
        waveHeight: 0,
        waterTemperature: 0,
        observationTime: '',
        waveHeightSuitability: 'DEFAULT',
        waterTemperatureSuitability: 'DEFAULT',
      });
    } finally {
      setWaveInfoLoading(false);
    }
  };

  const fetchContentsWeather = async () => {
    setWeatherError(false);
    setWeatherLoading(true);
    try {
      const response = await getContentsWeather(selectedSpot.spot);
      setWeather(response);
    } catch (error) {
      handleError(error);
      setWeatherError(true);
      setWeather({
        temperature: 0,
        weatherType: 'CLEAR_SKY',
        suitability: 'DEFAULT',
      });
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    fetchContentsWave();
    fetchContentsWeather();
  }, [selectedSpot.spot]);

  useEffect(() => {
    fetchYoutubeContents();
  }, []);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: `-47px 0px -75px 0px`,
  //     threshold: 1.0,
  //   };
  //   const callback: IntersectionObserverCallback = (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const sectionId = entry.target.id;
  //         console.log(`Section in view: ${sectionId}`); // 디버깅용 로그
  //         switch (sectionId) {
  //           case 'home-section':
  //             setSelectedCategory('home');
  //             break;
  //           case 'training-section':
  //             setSelectedCategory('training');
  //             break;
  //           case 'tv-section':
  //             setSelectedCategory('tv');
  //             break;
  //           case 'sea-section':
  //             setSelectedCategory('sea');
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(callback, options);

  //   const sections = [
  //     homeRef.current,
  //     trainingRef.current,
  //     tvRef.current,
  //     seaRef.current,
  //   ];

  //   sections.forEach((section) => {
  //     if (section) {
  //       observer.observe(section);
  //     }
  //   });

  //   return () => {
  //     sections.forEach((section) => {
  //       if (section) {
  //         observer.unobserve(section);
  //       }
  //     });
  //   };
  // }, []);

  const getHomeTitle = (
    weatherSuitability: SuitabilityStatus,
    waterTemperatureSuitability: SuitabilityStatus,
    waveHeightSuitability: SuitabilityStatus,
    waveInfoError: boolean,
    weatherError: boolean,
  ) => {
    if (waveInfoError || weatherError) {
      return '정보를 불러오는 중 문제가 발생했어요';
    }

    if (
      weatherSuitability === 'DEFAULT' ||
      waterTemperatureSuitability === 'DEFAULT' ||
      waveHeightSuitability === 'DEFAULT'
    ) {
      return null;
    }

    return homeTitleMessage[weatherSuitability][waterTemperatureSuitability][
      waveHeightSuitability
    ];
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
          boxTitle={getHomeTitle(
            weather.suitability,
            waveInfo.waterTemperatureSuitability,
            waveInfo.waveHeightSuitability,
            waveInfoError,
            weatherError,
          )}
          boxTitleLoading={weatherLoading || waveInfoLoading}
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
              youtubeLoading={youtubeLoading}
            />
          }
        />
        <HomeContentsBox
          id="sea-section"
          boxTitle="실시간 바다"
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
    </section>
  );
};
