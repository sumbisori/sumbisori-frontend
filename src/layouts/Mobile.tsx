import { ReactNode } from 'react';
import { FullPageLogo } from '../components/FullPageLogo';

interface Props {
  children: ReactNode;
}

export default function Mobile({ children }: Props) {
  return (
    <main className="h-screen w-full bg-blue-500">
      {/* //왼쪽 하단에 로고이미지 추가 */}
      <FullPageLogo />
      <section className="m-auto flex h-screen w-full max-w-[393px] flex-col overflow-auto bg-slate-50">
        {children}
      </section>
    </main>
  );
}
