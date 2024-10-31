import { HomeContentsCard } from './HomeContentsCard';

export const HomeContents = () => {
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="grid w-full grid-cols-3 gap-4">
        <HomeContentsCard label="물질도감" />
        <HomeContentsCard label="물때" />
        <HomeContentsCard label="날씨" />
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
