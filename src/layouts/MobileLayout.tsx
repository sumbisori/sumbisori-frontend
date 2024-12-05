import { motion } from 'framer-motion';
import { FullPageLogo } from '../components/FullPageLogo';
import { Outlet } from 'react-router-dom';

export const MobileLayout = () => {
  return (
    <motion.main {...animationSettings} className="h-full">
      <FullPageLogo />
      <section className="m-auto flex min-h-full w-full min-w-80 max-w-[37.5rem] flex-col bg-gray-000 pb-[4.438rem]">
        <Outlet />
      </section>
    </motion.main>
  );
};

const animationSettings = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};
