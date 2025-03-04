import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
export const SelectWeather = () => {
  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('weather').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('weather').subtitle}
      />

      <motion.div className="p-4" {...animationY(0.6)}>
        안녕하세요
      </motion.div>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('who').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('who').subtitle}
      />
      <motion.div className="p-4" {...animationY(0.6)}>
        안녕하세요
      </motion.div>
    </>
  );
};
