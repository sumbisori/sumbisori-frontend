import { JournalsResponse } from '@/api/journals/types';
import { Grid1Card } from '../Grid1Card';
import Skeleton from '@/components/Skeleton';
interface Props {
  journals: JournalsResponse[];
  onClick: (id: string) => void;
  isPending: boolean;
  pageSize: number;
}

export const Grid1CardList = ({
  journals,
  onClick,
  isPending,
  pageSize,
}: Props) => {
  console.log(isPending);
  return (
    <ul className="grid grid-cols-1">
      {!isPending &&
        journals.map((journal, index) => (
          <Grid1Card
            key={journal.experienceId}
            imageUrl={journal.imageUrl}
            title={journal.title}
            experienceDate={journal.experienceDate}
            companionType={journal.companion}
            weather={journal.weather}
            last={index === journals.length - 1}
            onClick={() => onClick(journal.experienceId)}
          />
        ))}
      {isPending &&
        Array.from({ length: pageSize }).map((_, index) => (
          <Skeleton
            key={index}
            className="mb-2"
            width={'100%'}
            height={'8.5rem'}
          />
        ))}
    </ul>
  );
};
