import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FullPageLogo } from '../components/FullPageLogo';
import { NavigationBar } from '../components/NavigationBar';
import { Header } from '../components/Header';

interface Props {
  children: ReactNode;
}

export default function Mobile({ children }: Props) {
  return (
    <motion.main {...animationSettings} className="h-screen w-full bg-blue-400">
      {/* 왼쪽 하단에 로고이미지 추가 */}
      <FullPageLogo />
      <motion.section className="relative m-auto flex h-full w-[393px] flex-col bg-slate-50 pb-[60.99px]">
        <Header />
        <div className="main-scroll flex-1 overflow-auto">{children}</div>
        <NavigationBar />
      </motion.section>
    </motion.main>
  );
}

const animationSettings = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};
