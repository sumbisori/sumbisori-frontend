import KakaoLoginButton from '@/icons/kakao-login.svg?react';

export const KakaoLogin = () => {
  return (
    <a
      href="https://api.sumbisori.site/api/oauth2/authorization/kakao"
      className="block h-[2.813rem] w-[18.75rem] bg-cover bg-center bg-no-repeat"
    >
      <KakaoLoginButton className="size-full" />
    </a>
  );
};
