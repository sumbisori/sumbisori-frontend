import { KakaoLogin } from '@/components/KakaoLogin';
import SumbisoriLogoVerticalIcon from '@/assets/icons/sumbisori_logo_vertical.svg?react';
import CharacterDiveBeforeIcon from '@/assets/icons/character_dive_before.svg?react';

export const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <SumbisoriLogoVerticalIcon className="h-[13.313rem] w-[4.875rem]" />
      <CharacterDiveBeforeIcon className="size-[16.625rem]" />
      <KakaoLogin />
    </div>
  );
};
