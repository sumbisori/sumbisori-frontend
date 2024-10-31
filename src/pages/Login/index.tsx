import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // RootState는 Redux store 타입
import { KakaoLogin } from '../../components/KakaoLogin';
import { login, setUserInfo } from '../../store/modules/user';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  const handleLoginSuccess = (profileImage: string, nickname: string) => {
    dispatch(setUserInfo({ profileImage, nickname }));
    dispatch(login());
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is logged in!');
    }
  }, [isAuthenticated]);

  return (
    <main>
      <div>안녕하세요 로그인 페이지입니다</div>
      {!isAuthenticated ? (
        <KakaoLogin href="https://kauth.kakao.com/oauth/authorize?client_id=your_client_id&redirect_uri=your_redirect_uri&response_type=code" />
      ) : (
        <div>로그인 성공! 환영합니다!</div>
      )}
    </main>
  );
};
