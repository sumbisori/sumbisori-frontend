import { motion } from 'framer-motion';
import { FullPageLogo } from '../components/FullPageLogo';

interface Props {
  children: React.ReactNode;
}

export const Background = ({ children }: Props) => {
  return (
    <motion.main {...animationSettings} className="h-screen w-full bg-blue-400">
      <FullPageLogo />
      {children}
    </motion.main>
  );
};

const animationSettings = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};
