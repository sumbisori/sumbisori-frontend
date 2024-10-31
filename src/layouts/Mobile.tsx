import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FullPageLogo } from '../components/FullPageLogo';

interface Props {
  children: ReactNode;
}

export default function Mobile({ children }: Props) {
  return (
    <motion.main {...animationSettings} className="h-screen w-full bg-blue-500">
      {/* 왼쪽 하단에 로고이미지 추가 */}
      <FullPageLogo />
      <motion.section className="m-auto flex size-full max-w-[393px] flex-col overflow-auto bg-slate-100">
        {children}
      </motion.section>
    </motion.main>
  );
}

const animationSettings = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};
