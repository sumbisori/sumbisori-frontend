import { useRef, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import clsx from 'clsx';

interface DatePickerProps {
  currentMonth: Dayjs;
  onSelect: (year: number, month: number) => void;
  isOpen: boolean;
  years: number[];
  months: number[];
}

export const DatePicker = ({
  currentMonth,
  onSelect,
  isOpen,
  years,
  months,
}: DatePickerProps) => {
  const selectedYearRef = useRef<HTMLButtonElement>(null);
  const selectedMonthRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        selectedYearRef.current?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
        selectedMonthRef.current?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentMonth]);

  return (
    <div className="flex h-[280px]">
      <div className="flex-1 overflow-auto border-r">
        {years.map((year) => (
          <button
            key={year}
            ref={currentMonth.year() === year ? selectedYearRef : null}
            onClick={() => onSelect(year, currentMonth.month() + 1)}
            className={clsx(
              'w-full p-4 text-center hover:bg-gray-100 active:bg-gray-100',
              currentMonth.year() === year ? 'bg-gray-100 font-semibold' : '',
            )}
            tabIndex={isOpen ? 0 : -1}
            type="button"
          >
            {year}년
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        {months.map((month) => (
          <button
            key={month}
            ref={currentMonth.month() + 1 === month ? selectedMonthRef : null}
            onClick={() => onSelect(currentMonth.year(), month)}
            className={clsx(
              'w-full p-4 text-center hover:bg-gray-100 active:bg-gray-100',
              currentMonth.month() + 1 === month
                ? 'bg-gray-100 font-semibold'
                : '',
            )}
            tabIndex={isOpen ? 0 : -1}
            type="button"
          >
            {month}월
          </button>
        ))}
      </div>
    </div>
  );
};
