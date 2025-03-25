import { Grid3Card } from '../Grid3Card';
import { JournalsResponse } from '@/api/journals/types';
interface Props {
  journals: JournalsResponse[];
  onClick: (id: string) => void;
}

export const Grid3CardList = ({ journals, onClick }: Props) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {journals.map((journal) => (
        <Grid3Card
          key={journal.id}
          imageUrl={journal.imageUrl}
          date={journal.date}
          companionType={journal.companionType}
          weather={journal.weather}
          onClick={() => onClick(journal.id)}
        />
      ))}
    </ul>
  );
};
