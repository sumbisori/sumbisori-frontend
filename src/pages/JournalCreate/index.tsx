import { useParams } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import { SelectCalendar } from './SelectCalendar';
import { LargeButton } from '@/components/LargeButton';

export const JournalCreate = () => {
  const { step } = useParams();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div className="flex h-full min-h-screen flex-col bg-gray-050">
      <div className="flex-1">
        {step === 'calendar' && (
          <div>
            <SelectCalendar value={selectedDate} onChange={setSelectedDate} />
          </div>
        )}
      </div>
      <div className="p-4">
        <LargeButton>다음</LargeButton>
      </div>
    </div>
  );
};
