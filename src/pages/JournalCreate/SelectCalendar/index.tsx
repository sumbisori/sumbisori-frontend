import { Calendar } from '@/components/Calendar';

import { Dayjs } from 'dayjs';
import { InputTitle } from '../InputTitle';
import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
interface SelectCalendarProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

export const SelectCalendar = ({ value, onChange }: SelectCalendarProps) => {
  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('calendar').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('calendar').subtitle}
      />
      <motion.div className="p-4" {...animationY(0.8)}>
        <Calendar value={value} onChange={onChange} />
      </motion.div>
    </>
  );
};
