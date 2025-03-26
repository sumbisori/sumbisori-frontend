import { parseCompanionType } from '@/util/parseCompanionType';
import { parseWeather } from '@/util/parseWeather';
import { Image } from '@/components/Image';

interface Props {
  imageUrl: string;
  title: string;
  date: string;
  companionType: string;
  weather: string;
  onClick: () => void;
  last?: boolean;
}

export const Grid1Card = ({
  imageUrl,
  title,
  date,
  companionType,
  weather,
  onClick,
  last,
}: Props) => {
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
        className={`aspect-square size-[6.875rem] rounded-xl border border-gray-200`}
        placeholderClassName="bg-white"
      />

      <div className="flex flex-col gap-1.5">
        <div className="text-base font-medium text-gray-500">{date}</div>
        <div className="whitespace-nowrap text-lg font-bold">
          {title || '제목 없음'}
        </div>
        <div className="text-sm text-blue-700">
          #{companionType} #{weather}
        </div>
      </div>
    </li>
  );
};
