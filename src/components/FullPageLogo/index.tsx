import LogoWhite from '@/icons/sumbisori_logo_width_white.svg?react';

export const FullPageLogo = () => {
  return (
    <aside className="fixed bottom-0 left-0 hidden flex-col p-3 lg:block">
      <LogoWhite className="h-[3.125rem] w-[15.813rem]" />
      <div className="mt-3 text-caption text-white">
        [숨비소리] : 해녀가 잠수했다가 물에 떠오를 때, 숨을 내뱉는 소리
      </div>
    </aside>
  );
};
