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
    <div id="journal-detail-container" className="bg-white px-4 py-6">
      <div id="journal-content-wrapper" className="flex flex-col gap-6">
        <div id="seafood-section" className="flex flex-col gap-2">
          <div
            id="seafood-header"
            className="flex items-center justify-between"
          >
            <p id="seafood-title" className="font-medium">
              오늘의 채취물 (number)
            </p>
            <button
              id="analysis-button"
              className="flex items-center gap-1 text-sm text-gray-700"
            >
              분석보기
              <ArrowBottomIcon className="size-6" />
            </button>
          </div>
          <div id="seafood-list" className="flex gap-2">
            <div
              id="seafood-item"
              className="flex flex-col items-center justify-center"
            >
              <SeafoodImage
                seafoodName="Clam"
                variant="img"
                className="size-14"
              />
              <p
                id="seafood-count"
                className="w-full min-w-[4.188rem] rounded border border-gray-300 bg-gray-050 px-2 py-1 text-center text-xs font-medium"
              >
                <span className="text-gray-700">홍합</span> x 1
              </p>
            </div>
          </div>
        </div>
        <div id="journal-info" className="flex flex-col gap-4">
          <div id="journal-text" className="flex flex-col gap-2">
            <div
              id="journal-tags"
              className="text-base font-medium text-blue-700"
            >
              #{companion} #{weather}
            </div>
            <p id="journal-impression" className="text-base font-medium">
              {impression}
            </p>
          </div>
          <div
            id="journal-date"
            className="text-base font-medium text-gray-600"
          >
            {daysAgo}일 전
          </div>
        </div>
      </div>
    </div>
  );
};
