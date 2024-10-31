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
      <section className="relative m-auto flex h-full w-[393px] flex-col bg-gray-000">
        <div>안녕하세요 로그인 페이지입니다</div>
        {/* {!isAuthenticated ? (
          <KakaoLogin href="https://kauth.kakao.com/oauth/authorize?client_id=your_client_id&redirect_uri=your_redirect_uri&response_type=code" />
        ) : (
          <div>로그인 성공! 환영합니다!</div>
        )} */}
      </section>
    </Background>
  );
};
