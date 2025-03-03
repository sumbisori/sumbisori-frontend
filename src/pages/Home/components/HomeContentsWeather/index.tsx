import { ContentWaveInfo, ContentWeatherInfo } from '@/api/home/types';
import { roundingNumber } from '@/util/roundingNumber';
import { HomeWeatherCard } from '../HomeWeatherCard';
import { HomeWeatherCardSkelton } from '../HomeWeatherCardSkelton';

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
          iconType={weather.weatherType}
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
            iconType="TEMPERATURE"
            value={roundingNumber(waveInfo.waterTemperature, DIGIT)}
            status={waveInfo.waterTemperatureSuitability}
            isTemperature={true}
            label="수온"
            error={waveInfoError}
          />
          <HomeWeatherCard
            iconType="WAVES"
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
