import Skeleton from '@/components/Skeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getAlarmList, readAlarm, deleteAlarm } from '@/api/alarm';
import { queryKeys } from '@/query';
import { AlarmBox } from '../AlarmBox';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';
import { useMutation } from '@tanstack/react-query';
import { forwardRef, useImperativeHandle } from 'react';
import { Spinner } from '@/components/Spinner';

interface AlarmListProps {
  onDelete?: () => void;
}

export const AlarmList = forwardRef<
  { handleDeleteAll: () => void },
  AlarmListProps
>((props, ref) => {
  const {
    data: alarms,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchAlarms,
  } = useInfiniteQuery({
    queryKey: [queryKeys.alarms],
    queryFn: ({ pageParam }) =>
      getAlarmList({
        page: pageParam,
        size: 10,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    retry: false,
  });

  const { mutate: readAlarmMutation } = useMutation({
    mutationFn: (alarmId: number) => readAlarm(alarmId),
    onSuccess: () => {
      refetchAlarms();
    },
  });

  const { mutate: deleteAlarmMutation, isPending: isDeleting } = useMutation({
    mutationFn: (alarmId: number) => deleteAlarm(alarmId),
    onSuccess: () => {
      refetchAlarms();
    },
  });

  const handleAlarmClick = (alarmId: number, isRead: boolean) => {
    if (isRead) return;
    readAlarmMutation(alarmId);
  };

  const handleDeleteAll = () => {
    const flattenedAlarms = alarms?.pages.flatMap((page) => page.content) ?? [];
    flattenedAlarms.forEach((alarm) => {
      deleteAlarmMutation(alarm.alarmId);
    });
  };

  useImperativeHandle(ref, () => ({
    handleDeleteAll,
  }));

  const bottomRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  const flattenedAlarms = alarms?.pages.flatMap((page) => page.content) ?? [];

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

  if (flattenedAlarms.length === 0) {
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
      {flattenedAlarms.map((alarm) => (
        <AlarmBox
          key={alarm.alarmId}
          alarm={alarm}
          onClick={handleAlarmClick}
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
});
