import { animationY } from '@/util/animationY';
import { motion } from 'framer-motion';
interface Props {
  title: string;
  subtitle: string;
  titleAniDelay?: number;
  subtitleAniDelay?: number;
}

export const InputTitle = ({
  title,
  subtitle,
  titleAniDelay = 0,
  subtitleAniDelay = 0.3,
}: Props) => {
  return (
    <div className="sticky top-custom-72px-spacer z-10 bg-white px-4 py-8 shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col">
        <motion.h2
          className="text-2xl font-medium"
          {...animationY(titleAniDelay)}
        >
          {title}
        </motion.h2>
        <motion.p
          {...animationY(subtitleAniDelay)}
          className="text-sm text-gray-600"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};
