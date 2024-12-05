import { KakaoLogin } from '../../components/KakaoLogin';

export const Login = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div
        className="h-[213px] w-[78px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/icons/sumbisori_logo_vertical.svg)',
        }}
      />
      <div
        className="size-[256px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/icons/character_dive_before.svg)',
        }}
      />
      <KakaoLogin />
    </section>
  );
};
