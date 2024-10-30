import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Background = ({ children }: Props) => {
  return <main className="h-screen w-full bg-blue-500">{children}</main>;
};
