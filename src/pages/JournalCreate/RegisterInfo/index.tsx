import { ReactNode } from 'react';

interface Props {
  title: string;
  value: ReactNode;
}

export const RegisterInfo = ({ title, value }: Props) => {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="w-14 shrink-0 text-sm text-gray-500">{title}</div>
      <div className="">{value}</div>
    </div>
  );
};
