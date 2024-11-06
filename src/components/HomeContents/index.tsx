import { SeafoodCollected } from '../../api/home';
import { GrayButton } from '../Button/GrayButton';
import { HomeContentsCard } from './HomeContentsCard';
import { HomeLocation } from './HomeLocation';

interface Props {
  seafoods: SeafoodCollected[];
}

export const HomeContents = ({ seafoods }: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-3 p-4">
        <HomeLocation />
        <div className="grid w-full grid-cols-3 gap-4">
          <HomeContentsCard
            label="물질도감"
            cardContent={
              <div className="text-[24px] font-bold">
                <span>
                  {seafoods.filter((seafood) => seafood.count > 0).length}
                </span>
                <span className="text-gray-500">/18</span>
              </div>
            }
          />
          <HomeContentsCard
            label="물때"
            cardContent={
              <div className="flex items-center gap-[5px]">
                <img src="/icons/sea_scale.svg" />
                <span className="text-[18px] font-semibold">밀물</span>
              </div>
            }
          />
          <HomeContentsCard
            label="날씨"
            cardContent={
              <div className="flex items-center gap-[5px]">
                <img src="/icons/weather.svg" />
                <span className="text-[21px] font-semibold">22°</span>
              </div>
            }
          />
        </div>
      </div>
      <div className="h-[5px] bg-gray-050"></div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-col gap-3">
          <div>
            <div className="pb-3 text-[17px] font-semibold">관련정보</div>
            <div className="flex flex-col gap-3">
              <GrayButton>해녀체험 안전가이드</GrayButton>
              <GrayButton>해녀의 역사 및 문화 소개</GrayButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
