import { ReactNode } from 'react';

interface Props {
  cardContent: ReactNode;
  label: string;
}

export const HomeContentsCard = ({ cardContent, label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-[72px] w-[110px] items-center justify-center">
        {cardContent}
      </div>
      <p className="flex w-[80px] justify-center bg-gray-100 text-[12px]">
        {label}
      </p>
    </div>
  );
};
