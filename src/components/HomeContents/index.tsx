import { HomeContentsCard } from './HomeContentsCard';

export const HomeContents = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="grid w-full grid-cols-3 gap-4">
        <HomeContentsCard
          label="물질도감"
          cardContent={
            <div className="text-[24px] font-bold">
              <span>4</span>
              <span className="text-gray-500">/18</span>
            </div>
          }
        />
        <HomeContentsCard
          label="물때"
          cardContent={
            <div className="flex items-center">
              <img src="/icons/sea_scale.svg" />
              <span className="text-[18px] font-semibold">밀물</span>
            </div>
          }
        />
        <HomeContentsCard
          label="날씨"
          cardContent={
            <div className="flex items-center">
              <img src="/icons/sea_scale.svg" />
              <span className="text-[21px] font-semibold">22°</span>
            </div>
          }
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-[17px]">관련정보</div>
        <div className="flex flex-col gap-3">
          <div className="h-[44px] w-full bg-slate-500"></div>
          <div className="h-[90px] w-full bg-slate-500"></div>
        </div>
      </div>
    </div>
  );
};
