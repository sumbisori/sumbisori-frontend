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
      </section>
    </Background>
  );
};
