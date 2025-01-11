import { SeafoodCollected } from '@/api/home';
import { convertToTodayTime } from '@/util/convertToTodayTime';
import { HomeContentsCard } from './HomeContentsCard';
import SeaScaleIcon from '@/icons/sea_scale.svg?react';
import WeatherIcon from '@/icons/weather.svg?react';

interface Props {
  seafoods: SeafoodCollected[];
  waterHeight: { height: string; time: string };
  waterTemperature: { temp: string; time: string };
}

export const HomeContentsWeather = ({
  seafoods,
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
              <WeatherIcon />
              <div className="text-[1.313rem] font-semibold">
                {waterTemperature.temp}°
              </div>
            </div>
          </div>
        }
      />
      <HomeContentsCard
        label="물질도감"
        sizeType="lg"
        view={
          <div className="text-[1.5rem] font-bold">
            <span>
              {seafoods.filter((seafood) => seafood.count > 0).length}
            </span>
            <span className="text-gray-500">/18</span>
          </div>
        }
      />
      <HomeContentsCard
        label="물때"
        sizeType="lg"
        view={
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-[0.313rem]">
              <SeaScaleIcon />

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
