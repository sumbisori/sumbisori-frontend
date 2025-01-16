import { ContentWaveInfo, ContentWeatherInfo } from '@/api/home';
import { HomeContentsCard } from './HomeContentsCard';
import CloudIcon from '@/icons/cloud.svg?react';
import TemperatureIcon from '@/icons/temperature.svg?react';
import WavesIcon from '@/icons/waves.svg?react';
import { roundingNumber } from '@/util/roundingNumber';

interface Props {
  waveInfo: ContentWaveInfo;
  weather: ContentWeatherInfo;
}

export const HomeContentsWeather = ({ waveInfo, weather }: Props) => {
  // 소수점 자리수
  const DIGIT = 0;
  return (
    <div className="grid w-full grid-cols-3 gap-4 px-4">
      <HomeContentsCard
        label="날씨"
        sizeType="lg"
        view={
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-[0.313rem]">
              <CloudIcon />
              <div className="w-12 text-center text-[1.125rem] font-semibold">
                {roundingNumber(weather.temperature, DIGIT)}°
              </div>
            </div>
          </div>
        }
      />
      <HomeContentsCard
        label="수온"
        sizeType="lg"
        view={
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-[0.313rem]">
              <TemperatureIcon />
              <div className="w-12 text-center text-[1.125rem] font-semibold">
                {roundingNumber(waveInfo.waterTemperature, DIGIT)}°
              </div>
            </div>
          </div>
        }
      />
      <HomeContentsCard
        label="파고"
        sizeType="lg"
        view={
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-[0.313rem]">
              <WavesIcon />

              <div className="w-12 text-center text-[1.125rem] font-semibold">
                {waveInfo.waveHeight}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};
