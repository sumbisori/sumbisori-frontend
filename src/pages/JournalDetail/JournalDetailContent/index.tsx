import dayjs from '@/util/dayjs';
import ArrowBottomIcon from '@/icons/arrow_bottom.svg?react';
import { SeafoodImage } from '@/components/SeafoodImage';
interface Props {
  impression: string;
  companion: string;
  weather: string;
  experienceDate: string;
}

export const JournalDetailContent = ({
  impression,
  companion,
  weather,
  experienceDate,
}: Props) => {
  const daysAgo = Math.abs(dayjs(experienceDate).diff(dayjs(), 'day'));

  return (
    <div className="bg-white px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-medium">오늘의 채취물 (number)</p>
            <button className="flex items-center gap-1 text-sm text-gray-700">
              분석보기
              <ArrowBottomIcon className="size-6" />
            </button>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-center justify-center">
              <SeafoodImage
                seafoodName="Clam"
                variant="img"
                className="size-14"
              />
              <p className="w-full min-w-[4.188rem] rounded border border-gray-300 bg-gray-050 px-2 py-1 text-center text-xs font-medium">
                <span className="text-gray-700">홍합</span> x 1
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-base font-medium text-blue-700">
              #{companion} #{weather}
            </div>
            <p className="text-base font-medium">{impression}</p>
          </div>
          <div className="text-base font-medium text-gray-600">
            {daysAgo}일 전
          </div>
        </div>
      </div>
    </div>
  );
};
