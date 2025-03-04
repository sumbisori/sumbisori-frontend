import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';

export const SelectSeafood = () => {
  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('seafood').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('seafood').subtitle}
      />

      <motion.div className="p-4" {...animationY(0.6)}>
        안녕하세요
      </motion.div>
    </>
  );
};
