import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // RootState는 Redux store 타입
import { KakaoLogin } from '../../components/KakaoLogin';
import { login, setUserInfo } from '../../store/modules/user';
import { Background } from '../../layouts/Background';
import { SeafoodCard } from '../../components/SeafoodCard';

export const Dictionary = () => {
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
      <div className="flex size-full flex-col">
        <div className="h-24 bg-gray-600"></div>
        <div className="size-full grid-cols-3 gap-[2px] border-orange-200 bg-orange-100">
          <SeafoodCard props={{ name: 'Oyster', has: false }} />
        </div>
      </div>
    </Background>
  );
};
