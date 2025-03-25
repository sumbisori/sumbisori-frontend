import { JournalsResponse } from '@/api/journals/types';
import { Grid1Card } from '../Grid1Card';
interface Props {
  journals: JournalsResponse[];
}

export const Grid1CardList = ({ journals }: Props) => {
  return (
    <ul className="grid grid-cols-1">
      {journals.map((journal) => (
        <Grid1Card
          key={journal.id}
          imageUrl={journal.imageUrl}
          title={journal.title}
          date={journal.date}
          companionType={journal.companionType}
          weather={journal.weather}
        />
      ))}
    </ul>
  );
};
