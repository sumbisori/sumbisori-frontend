import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import TrashIcon from '@/icons/alarm/trash.svg?react';
import { useNavigate } from 'react-router-dom';
import { AlarmList } from './components/AlarmList';
import { useState } from 'react';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getAlarmList, readAlarm, deleteAlarm } from '@/api/alarm';
import { queryKeys } from '@/query';
import { AlarmType } from '@/api/alarm/types';

export const Alarm = () => {
  const navigate = useNavigate();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

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
      setOpenDropdownId(null);
    },
  });

  const handleAlarmClick = (alarm: AlarmType) => {
    navigate(alarm.link);
    if (!alarm.isRead) {
      readAlarmMutation(alarm.alarmId);
    }
  };

  const handleDropdownToggle = (alarmId: number) => {
    setOpenDropdownId(openDropdownId === alarmId ? null : alarmId);
  };

  const flattenedAlarms = alarms?.pages.flatMap((page) => page.content) ?? [];

  return (
    <div className="flex flex-col gap-4">
      <NavigatorHeader
        title="알림"
        leftIcon={<ThinLeftIcon />}
        // rightIcon={<TrashIcon />}
        onLeftClick={() => navigate(-1)}
        // onRightClick={handleDelete}
        className="bg-white"
      />
      <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
        <div className="flex flex-1 flex-col pb-nav-height">
          <AlarmList
            alarms={flattenedAlarms}
            isPending={isPending}
            isError={isError}
            isDeleting={isDeleting}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onAlarmClick={handleAlarmClick}
            onDropdownToggle={handleDropdownToggle}
            onAlarmDelete={deleteAlarmMutation}
            openDropdownId={openDropdownId}
          />
        </div>
      </div>
    </div>
  );
};
