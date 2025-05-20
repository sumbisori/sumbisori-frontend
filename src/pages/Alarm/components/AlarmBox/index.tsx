import { Alarm } from '@/api/alarm/types';

interface Props {
  alarm: Alarm;
  onClick: (alarmId: number, isRead: boolean) => void;
}

export const AlarmBox = ({ alarm, onClick }: Props) => {
  return (
    <button
      className={clsx(
        'flex w-full gap-3.5 px-6 py-5',
        alarm.isRead
          ? 'bg-white'
          : 'bg-[#f1f7ff] hover:bg-[#f8fbff] active:bg-[#f8fbff]',
      )}
      onClick={() => onClick(alarm.alarmId, alarm.isRead)}
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
          <p className="font-normal">{alarm.createdAt}</p>
        </div>
        <p className="text-start text-base text-black">{alarm.content}</p>
      </div>
    </button>
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
