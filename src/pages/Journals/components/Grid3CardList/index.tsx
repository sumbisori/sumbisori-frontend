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
  const groupedJournals = journals.reduce(
    (acc, journal) => {
      const year = new Date(journal.experienceDate).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(journal);
      return acc;
    },
    {} as Record<number, JournalsResponse[]>,
  );

  // 연도 내림차순 정렬
  const sortedYears = Object.keys(groupedJournals)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col gap-4">
      {!isPending &&
        sortedYears.map((year) => (
          <div key={year} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-700">{year}년</h2>
            <ul className="grid grid-cols-3 gap-4">
              {groupedJournals[year].map((journal) => (
                <Grid3Card
                  key={journal.experienceId}
                  imageUrl={journal.imageUrl}
                  experienceDate={journal.experienceDate}
                  companionType={journal.companion}
                  weather={journal.weather}
                  onClick={() => onClick(journal.experienceId)}
                />
              ))}
            </ul>
          </div>
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
    </div>
  );
};
