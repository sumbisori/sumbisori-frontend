import { Image } from '@/components/Image';
import { parseCompanionType } from '@/util/parseCompanionType';
import { parseWeather } from '@/util/parseWeather';

interface Props {
  imageUrl: string;
  date: string;
  companionType: string;
  weather: string;
  onClick: () => void;
}

export const Grid3Card = ({
  imageUrl,
  date,
  companionType,
  weather,
  onClick,
}: Props) => {
  return (
    <li
      className="relative aspect-square size-full cursor-pointer hover:opacity-80"
      onClick={onClick}
    >
      <Image
        className="size-full rounded-xl border border-gray-200"
        src={imageUrl}
        alt="journal-card-3"
        placeholderClassName="bg-white"
      />
      <div className="absolute bottom-0 left-0 flex flex-col gap-0.5 p-2.5">
        <div className="text-xxs font-medium">
          #{parseCompanionType(companionType)}
        </div>
        <div className="text-base font-medium">{date}</div>
      </div>
    </li>
  );
};
