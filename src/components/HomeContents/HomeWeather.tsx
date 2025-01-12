import { HomeContentsCard } from './HomeContentsCard';
import CloudIcon from '@/icons/cloud.svg?react';
import TemperatureIcon from '@/icons/temperature.svg?react';
import WavesIcon from '@/icons/waves.svg?react';

interface Props {
  waterHeight: { height: string; time: string };
  waterTemperature: { temp: string; time: string };
}

export const HomeContentsWeather = ({
  waterHeight,
  waterTemperature,
}: Props) => {
  return (
    <div className="grid w-full grid-cols-3 gap-4 px-4">
      <HomeContentsCard
        label="날씨"
        sizeType="lg"
        view={
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-[0.313rem]">
              <CloudIcon />
              <div className="text-[1.313rem] font-semibold">
                {waterTemperature.temp}°
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
              <div className="text-[1.313rem] font-semibold">
                {waterTemperature.temp}°
              </div>
            </div>
          </div>
        }
      />
      <HomeContentsCard
        label="물때"
        sizeType="lg"
        view={
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-[0.313rem]">
              <WavesIcon />

              <div className="text-[1.125rem] font-semibold">
                {waterHeight.height}
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
