import { ReactNode } from 'react';

interface Props {
  cardContent?: ReactNode;
  label: string;
}

export const HomeContentsCard = ({ cardContent, label }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[72px] w-[110px] bg-slate-500"></div>
      <p>{label}</p>
    </div>
  );
};
