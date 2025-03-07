import { JournalCollectedSeafood } from '@/api/journalCreate/types';

interface Props {
  collectedSeafood: JournalCollectedSeafood;
}

export const CollectedSeafoodCard = ({ collectedSeafood }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-4">{collectedSeafood.file.name}</div>
  );
};
