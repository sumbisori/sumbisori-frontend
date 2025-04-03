import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { animationY } from '@/util/animationY';
import { motion } from 'framer-motion';

export const RegisterTitle = () => {
  return (
    <div className="mb-8 mt-9 items-center gap-2 text-center">
      <div className="flex flex-col">
        <motion.h2 className="text-2xl font-bold" {...animationY(0)}>
          {JOURNAL_CREATE_INPUT_TITLE('register').title}
        </motion.h2>
        <motion.p className="text-gray-500" {...animationY(0.3)}>
          {JOURNAL_CREATE_INPUT_TITLE('register').subtitle}
        </motion.p>
      </div>
    </div>
  );
};
