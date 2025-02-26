import { Calendar } from '@/components/Calendar';

import { Dayjs } from 'dayjs';

interface SelectCalendarProps {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
}

export const SelectCalendar = ({ value, onChange }: SelectCalendarProps) => {
  return (
    <div className="p-4">
      <Calendar value={value} onChange={onChange} />
    </div>
  );
};
