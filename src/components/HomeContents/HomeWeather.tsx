import { ContentWaveInfo } from '@/api/home';
import { HomeContentsCard } from './HomeContentsCard';
import CloudIcon from '@/icons/cloud.svg?react';
import TemperatureIcon from '@/icons/temperature.svg?react';
import WavesIcon from '@/icons/waves.svg?react';

interface Props {
  waveInfo: ContentWaveInfo;
}

export const HomeContentsWeather = ({ waveInfo }: Props) => {
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
                {waveInfo.waterTemperature}°
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
                {waveInfo.waterTemperature}°
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
            {/* <div className="flex w-full justify-center text-[0.5rem]">
              <span>{convertToTodayTime(waterHeight.time)}</span>
              <span className="text-gray-500"> 기준</span>
            </div> */}
          </div>
        }
      />
    </div>
  );
};
