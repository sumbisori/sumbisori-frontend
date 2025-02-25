import { useParams } from 'react-router-dom';
import { Calendar } from './Calendar';
import { useState } from 'react';
import dayjs from 'dayjs';

export const JournalCreate = () => {
  const { step } = useParams();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  console.log(selectedDate);

  return (
    <div>
      {step === 'calendar' && (
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      )}
    </div>
  );
};
