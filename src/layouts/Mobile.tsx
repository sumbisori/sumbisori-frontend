import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Mobile({ children }: Props) {
  return (
    <section className="m-auto flex h-screen w-full max-w-[393px] flex-col justify-center bg-slate-50">
      {children}
    </section>
  );
}
