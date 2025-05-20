import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import TrashIcon from '@/icons/alarm/trash.svg?react';
import { useNavigate } from 'react-router-dom';
import { AlarmList } from './components/AlarmList';
import { useRef } from 'react';

export const Alarm = () => {
  const navigate = useNavigate();
  const alarmListRef = useRef<{ handleDeleteAll: () => void }>(null);

  const handleDelete = () => {
    alarmListRef.current?.handleDeleteAll();
  };

  return (
    <div className="flex flex-col gap-4">
      <NavigatorHeader
        title="알림"
        leftIcon={<ThinLeftIcon />}
        rightIcon={<TrashIcon />}
        onLeftClick={() => navigate(-1)}
        onRightClick={handleDelete}
        className="bg-white"
      />
      <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
        <div className="flex flex-1 flex-col pb-nav-height">
          <AlarmList ref={alarmListRef} />
        </div>
      </div>
    </div>
  );
};
