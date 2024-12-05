import { motion } from 'framer-motion';
import { FullPageLogo } from '../components/FullPageLogo';
import { Outlet } from 'react-router-dom';

export const Background = () => {
  return (
    <motion.main
      {...animationSettings}
      className="size-full overflow-auto bg-blue-400"
    >
      <FullPageLogo />
      <section className="m-auto flex min-h-full w-full min-w-[320px] max-w-[600px] flex-col bg-gray-000">
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
