import { ContentWaveInfo, ContentWeatherInfo } from '@/api/home';
import { HomeTrainingCard } from './HomeTrainingCard';
import CloudIcon from '@/icons/cloud.svg?react';
import TemperatureIcon from '@/icons/temperature.svg?react';
import WavesIcon from '@/icons/waves.svg?react';
import { roundingNumber } from '@/util/roundingNumber';
import { HomeWeatherCard } from './HomeWeatherCard';
import Skeleton from '../Skeleton';
import { HomeWeatherCardSkelton } from './HomeWeatherCardSkelton';

interface Props {
  waveInfo: ContentWaveInfo;
  weather: ContentWeatherInfo;
  waveInfoError: boolean;
  weatherError: boolean;
  weatherLoading: boolean;
  waveInfoLoading: boolean;
}

export const HomeContentsWeather = ({
  waveInfo,
  weather,
  waveInfoError,
  weatherError,
  weatherLoading,
  waveInfoLoading,
}: Props) => {
  // 소수점 자리수
  const DIGIT = 0;
  return (
    <div className="grid w-full grid-cols-3 gap-4 px-4">
      {weatherLoading && <HomeWeatherCardSkelton />}
      {!weatherLoading && (
        <HomeWeatherCard
          icon={<CloudIcon />}
          value={roundingNumber(weather.temperature, DIGIT)}
          status={weather.suitability}
          isTemperature={true}
          label="날씨"
          error={weatherError}
        />
      )}
      {waveInfoLoading && (
        <>
          <HomeWeatherCardSkelton />
          <HomeWeatherCardSkelton />
        </>
      )}
      {!waveInfoLoading && (
        <>
          <HomeWeatherCard
            icon={<TemperatureIcon />}
            value={roundingNumber(waveInfo.waterTemperature, DIGIT)}
            status={waveInfo.waterTemperatureSuitability}
            isTemperature={true}
            label="수온"
            error={waveInfoError}
          />
          <HomeWeatherCard
            icon={<WavesIcon />}
            value={waveInfo.waveHeight}
            status={waveInfo.waveHeightSuitability}
            label="파고"
            error={waveInfoError}
          />
        </>
      )}
    </div>
  );
};
