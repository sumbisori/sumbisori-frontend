import dayjs from '@/util/dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { BottomSheet } from 'react-spring-bottom-sheet';
import '@/styles/bottomSheet.css';
import ArrowDownFullIcon from '@/icons/arrow-down-full.svg?react';
import clsx from 'clsx';

dayjs.extend(weekOfYear);

interface CalendarProps {
  value?: Dayjs;
  onChange?: (date: Dayjs) => void;
}

export const Calendar = ({ value, onChange }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(value || dayjs());
  const [pickerOpen, setPickerOpen] = useState(false);

  // 연도 목록 생성 (현재 연도 ±10년)
  const years = Array.from({ length: 21 }, (_, i) => dayjs().year() - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleDatePickerClick = () => {
    setPickerOpen(true);
  };

  const handlePickerSelect = (year: number, month: number) => {
    setCurrentMonth(currentMonth.year(year).month(month - 1));
    setPickerOpen(false);
  };

  const generateCalendar = () => {
    const startWeek = currentMonth.startOf('month').week();
    const endWeek =
      currentMonth.endOf('month').week() === 1
        ? 53
        : currentMonth.endOf('month').week();

    const calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      const days = Array(7)
        .fill(0)
        .map((_, i) => {
          const current = currentMonth.week(week).startOf('week').add(i, 'day');
          return {
            date: current,
            isCurrentMonth: current.month() === currentMonth.month(),
            isToday: current.format('YYYYMMDD') === dayjs().format('YYYYMMDD'),
            isSelected:
              value && current.format('YYYYMMDD') === value.format('YYYYMMDD'),
          };
        });
      calendar.push(days);
    }

    return calendar;
  };

  const handleDateClick = (date: Dayjs) => {
    // 선택한 날짜의 월이 현재 보여지는 월과 다르면 해당 월로 이동
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
            week.map((day, dayIndex) => (
              <button
                key={day.date.format('YYYYMMDD')}
                onClick={() => handleDateClick(day.date)}
                className={clsx(
                  'flex size-11 items-center justify-center rounded-full text-lg',
                  'transition-colors duration-200 ease-in-out',
                  !day.isCurrentMonth && 'text-gray-400',
                  day.isToday && 'text-xl font-bold text-blue-700',
                  day.isSelected
                    ? 'border border-blue-700 bg-blue-100 text-xl font-bold text-blue-700'
                    : 'hover:bg-gray-100',
                )}
              >
                {day.date.format('D')}
              </button>
            )),
          )}
        </div>
      </div>

      <BottomSheet
        open={pickerOpen}
        onDismiss={() => setPickerOpen(false)}
        header={<h3 className="p-4 text-lg font-semibold">날짜 선택</h3>}
      >
        <div className="flex h-[300px]">
          <div className="flex-1 overflow-auto border-r">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setCurrentMonth(currentMonth.year(year))}
                className={`w-full p-4 text-center hover:bg-gray-100 ${currentMonth.year() === year ? 'bg-gray-100 font-bold' : ''}`}
              >
                {year}년
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-auto">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => handlePickerSelect(currentMonth.year(), month)}
                className={`w-full p-4 text-center hover:bg-gray-100 ${currentMonth.month() + 1 === month ? 'bg-gray-100 font-bold' : ''}`}
              >
                {month}월
              </button>
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};
