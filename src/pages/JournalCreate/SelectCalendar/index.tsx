import { Calendar } from '@/components/Calendar';

import { Dayjs } from 'dayjs';
import { InputTitle } from '../InputTitle';
import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import dayjs from '@/util/dayjs';
import { useEffect } from 'react';

interface SelectCalendarProps {
  value: Dayjs | null;
  onChange: (date: Dayjs) => void;
}

export const SelectCalendar = ({ value, onChange }: SelectCalendarProps) => {
  useEffect(() => {
    if (!value) {
      onChange(dayjs());
    }
  }, []);

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('calendar').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('calendar').subtitle}
      />
      <motion.div className="p-4" {...animationY(0.6)}>
        <Calendar
          value={value}
          onChange={onChange}
          maxDate={dayjs()}
          minDate={dayjs().subtract(4, 'year')}
        />
      </motion.div>
    </>
  );
};
