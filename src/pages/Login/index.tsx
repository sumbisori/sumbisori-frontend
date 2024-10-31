import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // RootState는 Redux store 타입
import { KakaoLogin } from '../../components/KakaoLogin';
import { login, setUserInfo } from '../../store/modules/user';
import { Background } from '../../layouts/Background';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is logged in!');
    }
  }, [isAuthenticated]);

  return (
    <Background>
      <section className="relative m-auto flex size-full w-[393px] flex-col items-center justify-center bg-gray-000">
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
        <KakaoLogin href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=0e2d82ca1274d3c102b162df9ef18a8f&scope=account_email%20profile_nickname%20profile_image&state=bFIJLRcNEfP2pLZzTjgolGhjoEW6Vz2mgjicjVJ5nd8%3D&redirect_uri=https://k1ec344612739a.user-app.krampoline.com/api/login/oauth2/code/kakao" />
      </section>
    </Background>
  );
};
