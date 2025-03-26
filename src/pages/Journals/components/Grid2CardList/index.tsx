import Skeleton from '@/components/Skeleton';
import { Grid2Card } from '../Grid2Card';
import { JournalsResponse } from '@/api/journals/types';
interface Props {
  journals: JournalsResponse[];
  onClick: (id: string) => void;
  isPending: boolean;
  pageSize: number;
}

export const Grid2CardList = ({ journals, isPending, pageSize }: Props) => {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {!isPending &&
        journals.map((journal) => <Grid2Card key={journal.experienceId} />)}
      {isPending &&
        Array.from({ length: pageSize }).map((_, index) => (
          <Skeleton
            key={index}
            width={'100%'}
            height={'10rem'}
            className="aspect-square"
          />
        ))}
    </ul>
  );
};
