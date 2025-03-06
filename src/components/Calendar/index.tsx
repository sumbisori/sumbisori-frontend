import { useState } from 'react';
import dayjs from '@/util/dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { Dayjs } from 'dayjs';
import { BottomSheet } from 'react-spring-bottom-sheet';
import '@/styles/bottomSheet.css';
import ArrowDownFullIcon from '@/icons/arrow-down-full.svg?react';
import clsx from 'clsx';
import { DatePicker } from '../DatePicker';

dayjs.extend(weekOfYear);

interface CalendarProps {
  value?: Dayjs;
  onChange?: (date: Dayjs) => void;
  maxDate?: Dayjs;
  minDate?: Dayjs;
}

export const Calendar = ({
  value,
  onChange,
  maxDate,
  minDate,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(value || dayjs());
  const [pickerOpen, setPickerOpen] = useState(false);

  const years = Array.from(
    {
      length:
        (maxDate?.year() || dayjs().year() + 10) -
        (minDate?.year() || dayjs().year() - 10) +
        1,
    },
    (_, i) => (minDate?.year() || dayjs().year() - 10) + i,
  ).filter((year) => {
    if (maxDate && year > maxDate.year()) return false;
    if (minDate && year < minDate.year()) return false;
    return true;
  });

  const months = Array.from({ length: 12 }, (_, i) => i + 1).filter((month) => {
    const selectedYear = currentMonth.year();

    if (maxDate && selectedYear === maxDate.year()) {
      return month <= maxDate.month() + 1;
    }

    if (minDate && selectedYear === minDate.year()) {
      return month >= minDate.month() + 1;
    }

    return true;
  });

  const handleDatePickerClick = () => {
    setPickerOpen(true);
  };

  const handlePickerSelect = (year: number, month: number) => {
    setCurrentMonth(currentMonth.year(year).month(month - 1));
  };

  const generateCalendar = () => {
    const startWeek = currentMonth.startOf('month').week();
    const endWeek = currentMonth.endOf('month').week();

    const calendar = [];

    let currentWeek = startWeek;
    const currentYear = currentMonth.year();

    while (currentWeek !== endWeek + 1) {
      const days = Array(7)
        .fill(0)
        .map((_, i) => {
          const current = currentMonth
            .startOf('month')
            .week(currentWeek)
            .startOf('week')
            .add(i, 'day');

          if (current.year() !== currentYear) {
            if (currentWeek === startWeek) {
              current.add(1, 'week');
            } else if (currentWeek > 50) {
              current.subtract(1, 'week');
            }
          }

          return {
            date: current,
            isCurrentMonth: current.month() === currentMonth.month(),
            isToday: current.format('YYYYMMDD') === dayjs().format('YYYYMMDD'),
            isSelected:
              value && current.format('YYYYMMDD') === value.format('YYYYMMDD'),
          };
        });
      calendar.push(days);

      currentWeek++;
      if (currentWeek === 53) currentWeek = 1;
    }

    return calendar;
  };

  const handleDateClick = (date: Dayjs) => {
    if (maxDate && date.isAfter(maxDate)) {
      return;
    }
    if (minDate && date.isBefore(minDate)) {
      return;
    }
    if (date.month() !== currentMonth.month()) {
      setCurrentMonth(date);
    }
    onChange?.(date);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleDatePickerClick}
        className="flex items-center gap-1 text-xl"
        type="button"
      >
        <div className="flex items-center gap-2">
          <p>{currentMonth.format('YYYY년')}</p>
          <p>{currentMonth.format('M월')}</p>
        </div>
        <ArrowDownFullIcon />
      </button>

      <div
        className="flex flex-col gap-4 rounded-2xl border border-gray-400 bg-white px-4 py-8"
        id="calendar"
      >
        <div className="grid grid-cols-7 gap-3">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div
              key={day}
              className="flex w-11 items-center justify-center text-sm text-gray-800"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-3">
          {generateCalendar().map((week, weekIndex) =>
            week.map((day) => {
              const isDisabled =
                (maxDate && day.date.isAfter(maxDate)) ||
                (minDate && day.date.isBefore(minDate));

              return (
                <button
                  key={day.date.format('YYYYMMDD')}
                  onClick={() => handleDateClick(day.date)}
                  type="button"
                  disabled={isDisabled}
                  className={clsx(
                    'flex size-11 items-center justify-center rounded-full text-lg',
                    'transition-colors duration-200 ease-in-out',
                    !day.isCurrentMonth && 'text-gray-400',
                    day.isToday && 'text-xl font-semibold text-blue-700',
                    day.isSelected
                      ? 'border border-blue-700 bg-blue-100 text-xl font-semibold text-blue-700'
                      : 'hover:bg-gray-100 active:bg-gray-100',
                    isDisabled && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {day.date.format('D')}
                </button>
              );
            }),
          )}
        </div>
      </div>

      <BottomSheet
        open={pickerOpen}
        onDismiss={() => setPickerOpen(false)}
        header={
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="text-sm hover:text-gray-600 active:text-gray-600"
              type="button"
              onClick={() => setPickerOpen(false)}
            >
              취소
            </button>
            <button
              className="text-sm hover:text-gray-600 active:text-gray-600"
              type="button"
              onClick={() => {
                handlePickerSelect(
                  currentMonth.year(),
                  currentMonth.month() + 1,
                );
                setPickerOpen(false);
              }}
            >
              저장
            </button>
          </div>
        }
        scrollLocking={false}
      >
        <DatePicker
          currentMonth={currentMonth}
          onSelect={handlePickerSelect}
          isOpen={pickerOpen}
          years={years}
          months={months}
        />
      </BottomSheet>
    </div>
  );
};
