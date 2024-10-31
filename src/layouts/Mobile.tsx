import { motion } from 'framer-motion';

import { NavigationBar } from '../components/NavigationBar';
import { Header } from '../components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Background } from './Background';

export default function Mobile() {
  const location = useLocation();

  const getHeaderType = (
    pathname: string,
  ): {
    type: 'light' | 'dark';
    caption: string | undefined;
    absolute: boolean;
  } => {
    if (pathname === '/')
      return {
        type: 'light',
        caption: undefined,
        absolute: true,
      };
    if (pathname === '/reservation')
      return {
        type: 'dark',
        caption: undefined,
        absolute: false,
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

const animationSettings = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};
