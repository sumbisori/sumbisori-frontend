import { AlarmType } from '@/api/alarm/types';
import MoreIcon from '@/icons/alarm/more.svg?react';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface Props {
  alarm: AlarmType;
  onClick: (alarm: AlarmType) => void;
  onDelete?: (alarmId: number) => void;
  isDropdownOpen: boolean;
  onDropdownToggle: (alarmId: number) => void;
}

export const AlarmBox = ({
  alarm,
  onClick,
  onDelete,
  isDropdownOpen,
  onDropdownToggle,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDropdownToggle(alarm.alarmId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onDropdownToggle(alarm.alarmId);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, alarm.alarmId, onDropdownToggle]);

  return (
    <div className="relative">
      <div
        className={clsx(
          'flex w-full cursor-pointer gap-3.5 px-6 py-5',
          alarm.isRead
            ? 'bg-white'
            : 'bg-[#f1f7ff] hover:bg-[#f8fbff] active:bg-[#f8fbff]',
        )}
        onClick={() => onClick(alarm)}
      >
        {/* 알람 상태 */}
        <div
          className={clsx(
            'mt-0.5 size-4 rounded-full border',
            ALARM_STATUS_BADGE[alarm.type],
          )}
        />
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex items-center justify-between text-sm text-[#1E1E1E]">
            <p className="font-medium">{ALARM_STATUS_TEXT[alarm.type]}</p>
            <div className="flex items-center gap-2">
              <p className="font-normal">{alarm.createdAt}</p>
              <button
                className="rounded-full p-1 hover:bg-gray-100"
                onClick={handleMoreClick}
              >
                <MoreIcon className="size-5" />
              </button>
            </div>
          </div>
          <p className="text-start text-base text-black">{alarm.content}</p>
        </div>
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-10 top-10 z-10 w-16 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          <button
            className="w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-050 active:bg-gray-050"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(alarm.alarmId);
              onDropdownToggle(alarm.alarmId);
            }}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

const ALARM_STATUS_BADGE = {
  BADGE_ACQUIRED: 'bg-yellow-50 border-yellow-400',
  EXPERIENCE_COMPLETED: 'bg-green-50 border-green-200',
};

const ALARM_STATUS_TEXT = {
  BADGE_ACQUIRED: '배지 획득',
  EXPERIENCE_COMPLETED: '일지 작성',
};
