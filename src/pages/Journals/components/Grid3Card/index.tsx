import { Image } from '@/components/Image';
import dayjs from '@/util/dayjs';
import { isImageNull } from '@/util/isImageNull';
interface Props {
  imageUrl: string;
  experienceDate: string;
  companionType: string;
  weather: string;
  onClick: () => void;
}

export const Grid3Card = ({
  imageUrl,
  experienceDate,
  companionType,
  weather,
  onClick,
}: Props) => {
  const formattedDate = dayjs(experienceDate).locale('ko').format('YY.MM.DD');
  return (
    <li
      className="group relative aspect-square size-full cursor-pointer overflow-hidden rounded-xl"
      onClick={onClick}
    >
      <Image
        className="size-full rounded-xl border border-gray-200 object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
        src={imageUrl}
        alt="journal-card-3"
        placeholderClassName="bg-white"
      />
      {!isImageNull(imageUrl) && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      )}
      <div
        className={clsx(
          'absolute bottom-0 left-0 flex flex-col gap-0.5 p-2.5',
          isImageNull(imageUrl) ? 'text-black' : 'text-white',
        )}
      >
        <div className="text-xxs font-medium">#{companionType}</div>
        <div className="text-base font-medium">{formattedDate}</div>
      </div>
    </li>
  );
};
