interface Props {
  status: 'PENDING' | 'END';
  onStatusChange: (status: 'PENDING' | 'END') => void;
  pendingCount: number;
  endCount: number;
}

export const SwitchReservationStatus = ({
  status,
  onStatusChange,
  pendingCount,
  endCount,
}: Props) => {
  const selectedStyle = 'bg-gray-000 border border-gray-900';
  const unselectedStyle = 'bg-gray-050 border border-gray-050';

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-fit items-center justify-center gap-2 self-center rounded-lg bg-gray-050 px-4 py-2">
        <div
          onClick={() => onStatusChange('PENDING')}
          className={`flex h-fit cursor-pointer items-center justify-center rounded-lg p-[4px] text-[14px] text-gray-900 ${
            status === 'PENDING' ? selectedStyle : unselectedStyle
          } hover:border-gray-500 hover:bg-gray-000`}
        >
          체험 대기({pendingCount})
        </div>
        <div
          onClick={() => onStatusChange('END')}
          className={`flex h-fit cursor-pointer items-center justify-center rounded-lg p-[4px] text-[14px] text-gray-900 ${
            status === 'END' ? selectedStyle : unselectedStyle
          } hover:border-gray-500 hover:bg-gray-000`}
        >
          체험 완료({endCount})
        </div>
      </div>
      <div className="w-full px-4 py-2 text-[20px] font-bold">
        {status === 'PENDING' ? (
          <span>다가올 예약</span>
        ) : (
          <span>지난 체험</span>
        )}
      </div>
    </div>
  );
};
