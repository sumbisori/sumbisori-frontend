import Skeleton from '@/components/Skeleton';
import { Grid3Card } from '../Grid3Card';
import { JournalsResponse } from '@/api/journals/types';
interface Props {
  journals: JournalsResponse[];
  onClick: (id: string) => void;
  isPending: boolean;
  pageSize: number;
}

export const Grid3CardList = ({
  journals,
  onClick,
  isPending,
  pageSize,
}: Props) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {!isPending &&
        journals.map((journal) => (
          <Grid3Card
            key={journal.experienceId}
            imageUrl={journal.imageUrl}
            experienceDate={journal.experienceDate}
            companionType={journal.companion}
            weather={journal.weather}
            onClick={() => onClick(journal.experienceId)}
          />
        ))}
      {isPending &&
        Array.from({ length: pageSize }).map((_, index) => (
          <Skeleton
            key={index}
            className="aspect-square"
            width="100%"
            height="100%"
          />
        ))}
    </ul>
  );
};
