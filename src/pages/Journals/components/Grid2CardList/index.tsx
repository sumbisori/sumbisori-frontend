import { Grid2Card } from '../Grid2Card';
import { JournalsResponse } from '@/api/journals/types';
interface Props {
  journals: JournalsResponse[];
  onClick: (id: string) => void;
}

export const Grid2CardList = ({ journals }: Props) => {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {journals.map((journal) => (
        <Grid2Card key={journal.id} />
      ))}
    </ul>
  );
};
