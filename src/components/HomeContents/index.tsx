import { useEffect, useRef, useState } from 'react';
import {
  YoutubeVideoType,
  getContentsWave,
  getYoutubeContents,
  WaveSpotCode,
  ContentWaveInfo,
  WaveSpot,
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

  const [selectedSpot, setSelectedSpot] = useState<WaveSpot>({
    spot: 'jeju-harbor',
    label: '제주항',
  });

  const [waveInfo, setWaveInfo] = useState<ContentWaveInfo>({
    waveHeight: 0,
    waterTemperature: 0,
    observationTime: '',
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

  const fetchContentsWave = async () => {
    try {
      const response = await getContentsWave(selectedSpot.spot);
      setWaveInfo(response);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchContentsWave();
  }, [selectedSpot.spot]);

  useEffect(() => {
    fetchYoutubeContents();
  }, []);

  return (
    <section className="flex flex-col bg-gray-surface">
      <HomeCategoryBar
        onCategoryChange={handleCategoryChange}
        value={selectedCategory}
      />
      <HomeSpotHeader
        spot={selectedSpot}
        onSelectedSpot={(spot) => setSelectedSpot(spot)}
      />
      <div className="flex flex-col gap-3 p-4">
        <HomeContentsBox
          title="오늘은 물질하기 딱 좋은 날씨네요!"
          ref={homeRef}
          view={<HomeContentsWeather waveInfo={waveInfo} />}
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
    </section>
  );
};
