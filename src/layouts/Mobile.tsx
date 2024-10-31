import { motion } from 'framer-motion';

import { NavigationBar } from '../components/NavigationBar';
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';
import { Background } from './Background';

export default function Mobile() {
  return (
    <Background>
      {/* 왼쪽 하단에 로고이미지 추가 */}
      <motion.section className="relative m-auto flex h-full w-[393px] flex-col bg-gray-000 pb-[60.99px]">
        <Header />
        <div className="main-scroll flex-1 overflow-auto">
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
