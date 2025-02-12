import { ReactNode } from 'react';
import { SquareGrayCard } from '../SquareGrayCard';

interface Props {
  view: ReactNode;
  label: string;
  onClick?: () => void;
}

export const HomeTrainingCard = ({ view, label, onClick }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <SquareGrayCard type={'button'} onClick={onClick}>
        {view}
      </SquareGrayCard>
      <label
        className="flex w-full justify-center whitespace-nowrap text-sm text-charcoal-gray"
        onClick={onClick}
      >
        {label}
      </label>
    </div>
  );
};
