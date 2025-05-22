import { AlarmBox } from '../AlarmBox';
import Skeleton from '@/components/Skeleton';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';
import { Spinner } from '@/components/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { AlarmType } from '@/api/alarm/types';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface Props {
  alarms: AlarmType[];
  isPending: boolean;
  isError: boolean;
  isDeleting: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onAlarmClick: (alarm: AlarmType) => void;
  onDropdownToggle: (alarmId: number) => void;
  onAlarmDelete: (alarmId: number) => void;
  openDropdownId: number | null;
}

export const AlarmList = ({
  alarms,
  isPending,
  isError,
  isDeleting,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  onAlarmClick,
  onDropdownToggle,
  onAlarmDelete,
  openDropdownId,
}: Props) => {
  const bottomRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} width="100%" height="100px" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (alarms.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <ImageWithTextAlert
          src={`${IMAGE_PATHS.ROOT}/haenyeo.png`}
          alt="정보없음"
          text="알림이 없습니다"
        />
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col">
      {isDeleting && (
        <Spinner className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
      )}
      {alarms.map((alarm) => (
        <AlarmBox
          key={alarm.alarmId}
          alarm={alarm}
          onClick={onAlarmClick}
          onDelete={onAlarmDelete}
          isDropdownOpen={openDropdownId === alarm.alarmId}
          onDropdownToggle={onDropdownToggle}
        />
      ))}
      {isFetchingNextPage && (
        <div className="mt-4 flex flex-col gap-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} width="100%" height="100px" />
          ))}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};
