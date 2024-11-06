import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // RootState는 Redux store 타입
import { KakaoLogin } from '../../components/KakaoLogin';
import { Background } from '../../layouts/Background';
import { login } from '../../api/login';
import { setUserId } from '../../store/modules/user';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  const handleLogin = async () => {
    try {
      const response = await login('김구름', '1234');
      dispatch(setUserId({ userId: response.userId }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
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
        <KakaoLogin onClick={handleLogin} />
      </section>
    </Background>
  );
};
