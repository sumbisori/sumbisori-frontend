import { motion } from 'framer-motion';

import { NavigationBar } from '../components/NavigationBar';
import { Header } from '../components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Background } from './Background';

export default function Mobile() {
  const location = useLocation();

  const getHeaderType = (pathname: string) => {
    if (pathname === '/') return 'light';
    if (pathname === '/reservation') return 'dark';
    if (/^\/reservation-create(\/\d+)?$/.test(pathname)) return 'reservation';
    return 'light'; // default type if no match is found
  };

  const headerType = getHeaderType(location.pathname);

  return (
    <Background>
      <motion.section className="relative m-auto flex h-full w-[393px] flex-col bg-gray-000 pb-[60.99px]">
        <Header type={headerType} />
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
