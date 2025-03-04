import { animationY } from '@/util/animationY';
import { motion } from 'framer-motion';
interface Props {
  title: string;
  subtitle: string;
}

export const InputTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="sticky top-header-height z-10 bg-white px-4 py-8 shadow-sm">
      <div className="flex flex-col">
        <motion.p className="text-2xl font-medium" {...animationY(0)}>
          {title}
        </motion.p>
        <motion.p {...animationY(0.4)} className="text-sm text-gray-600">
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};
