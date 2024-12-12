import { KakaoLogin } from '../../components/KakaoLogin';

export const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div
        className="h-[13.313rem] w-[4.875rem] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/icons/sumbisori_logo_vertical.svg)',
        }}
      />
      <div
        className="size-[16.625rem] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/icons/character_dive_before.svg)',
        }}
      />
      <KakaoLogin />
    </div>
  );
};
