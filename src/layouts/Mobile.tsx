import { motion } from 'framer-motion';

import { NavigationBar } from '../components/NavigationBar';
import { Header } from '../components/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Background } from './Background';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect } from 'react';

export default function Mobile() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   }
  // }, [isAuthenticated]);

  const getHeaderType = (
    pathname: string,
  ): {
    type: 'light' | 'dark';
    caption: string | undefined;
    absolute: boolean;
  } => {
    if (pathname === '/home')
      return {
        type: 'light',
        caption: undefined,
        absolute: true,
      };
    if (pathname === '/reservation')
      return {
        type: 'dark',
        caption: undefined,
        absolute: true,
      };
    if (pathname.includes('/reservation-create'))
      return {
        type: 'dark',
        caption: '예약',
        absolute: false,
      };
    if (pathname === '/dictionary')
      return {
        type: 'dark',
        caption: '물질도감',
        absolute: false,
      };

    if (pathname === '/my-page')
      return {
        type: 'dark',
        caption: '마이',
        absolute: false,
      };

    if (pathname === '/my-page/reservation')
      return {
        type: 'dark',
        caption: '예약정보 조회',
        absolute: false,
      };

    if (pathname === '/dictionary/registration')
      return {
        type: 'dark',
        caption: '도감 등록',
        absolute: false,
      };

    if (pathname.includes('/dictionary/confirm'))
      return {
        type: 'dark',
        caption: '도감 등록',
        absolute: false,
      };

    return {
      type: 'light',
      caption: undefined,
      absolute: false,
    };
  };

  const headerType = getHeaderType(location.pathname);

  return (
    <Background>
      <motion.section className="relative m-auto flex h-full w-[393px] flex-col bg-gray-000 pb-[60.99px]">
        <Header
          type={headerType.type}
          caption={headerType.caption}
          absolute={headerType.absolute}
        />
        <div className="hide-scroll flex-1 overflow-auto">
          <Outlet />
        </div>
        <NavigationBar />
      </motion.section>
    </Background>
  );
}
