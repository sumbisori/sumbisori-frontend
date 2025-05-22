import { SatisfactionStars } from '@/pages/JournalCreate/SatisfactionStars';
import dayjs from '@/util/dayjs';
import EditIcon from '@/icons/edit.svg?react';
import ShareIcon from '@/icons/share.svg?react';
import { toast } from '@/components/Toast';
interface Props {
  experienceDate: string;
  placeName: string;
  satisfaction: number;
}

export const JournalDetailTitle = ({
  experienceDate,
  placeName,
  satisfaction,
}: Props) => {
  const date = dayjs(experienceDate)
    .locale('ko')
    .format('YY년 MM월 DD일 (ddd)');

  return (
    <div className="flex flex-col gap-1 bg-white px-4 py-6">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">{date}</p>
        <div className="flex items-center gap-2">
          <button onClick={() => toast.info('준비중입니다.')}>
            <EditIcon className="text-gray-700 hover:text-gray-500 active:text-gray-500" />
          </button>
          <button onClick={() => toast.info('준비중입니다.')}>
            <ShareIcon className="text-gray-700 hover:text-gray-500 active:text-gray-500" />
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{placeName}</h3>
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium">체험 만족도</p>
          <SatisfactionStars
            satisfaction={satisfaction}
            readOnly
            starSize={16}
          />
        </div>
      </div>
    </div>
  );
};
