import { JournalsResponse } from '@/api/journals/types';
import { Grid1Card } from '../Grid1Card';
interface Props {
  journals: JournalsResponse[];
  onClick: (id: string) => void;
}

export const Grid1CardList = ({ journals, onClick }: Props) => {
  return (
    <ul className="grid grid-cols-1">
      {journals.map((journal, index) => (
        <Grid1Card
          key={journal.id}
          imageUrl={journal.imageUrl}
          title={journal.title}
          date={journal.date}
          companionType={journal.companionType}
          weather={journal.weather}
          last={index === journals.length - 1}
          onClick={() => onClick(journal.id)}
        />
      ))}
    </ul>
  );
};
