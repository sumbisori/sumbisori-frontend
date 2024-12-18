import { ReactNode } from 'react';

interface Props {
  cardContent: ReactNode;
  label: string;
}

export const HomeContentsCard = ({ cardContent, label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-[4.5rem] w-[6.875rem] items-center justify-center">
        {cardContent}
      </div>
      <p className="flex w-20 justify-center bg-gray-100 text-[0.75rem]">
        {label}
      </p>
    </div>
  );
};
