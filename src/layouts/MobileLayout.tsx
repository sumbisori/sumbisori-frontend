import { motion } from 'framer-motion';
import { FullPageLogo } from '@/components/FullPageLogo';
import { Outlet } from 'react-router-dom';

export const MobileLayout = () => {
  return (
    <div className="h-full">
      <FullPageLogo />
      <section
        className={`m-auto flex min-h-full w-full min-w-full-layout max-w-full-layout flex-col bg-gray-000`}
      >
        <Outlet />
      </section>
    </div>
  );
};

const animationSettings = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};
