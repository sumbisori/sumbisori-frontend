import dayjs from '@/util/dayjs';
import { Image } from '@/components/Image';

interface Props {
  imageUrl: string;
  placeName: string;
  experienceDate: string;
  companionType: string;
  weather: string;
  onClick: () => void;
  last?: boolean;
}

export const Grid1Card = ({
  imageUrl,
  placeName,
  experienceDate,
  companionType,
  weather,
  onClick,
  last,
}: Props) => {
  const formattedDate = dayjs(experienceDate)
    .locale('ko')
    .format('YY년 MM월 DD일 (ddd)');
  return (
    <li
      className={clsx(
        'flex shrink-0 cursor-pointer items-start gap-4 border-b border-gray-200 py-4 hover:bg-gray-100 active:bg-gray-100',
        last && 'border-b-0',
      )}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt="journal-image"
        className={`aspect-square size-[6.875rem] rounded-xl border border-gray-200 object-cover`}
        placeholderClassName="bg-white"
      />

      <div className="flex flex-col gap-1.5">
        <div className="text-base font-medium">{formattedDate}</div>
        <div className="text-lg font-bold leading-normal">{placeName}</div>
        <div className="text-base font-medium text-blue-700">
          #{companionType} #{weather}
        </div>
      </div>
    </li>
  );
};
