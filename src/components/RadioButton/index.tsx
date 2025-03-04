// 테두리는 gray-600 원
// 선택되면 blue-700 및 내부 원도 blue-700
// 선택되지 않으면 gray-600 원

interface Props {
  selected: boolean;
  onClick: () => void;
}

export const RadioButton = ({ selected, onClick }: Props) => {
  return (
    <div
      className="relative inline-flex size-5 cursor-pointer items-center justify-center"
      onClick={onClick}
    >
      {/* 외부 원 */}
      <div
        className={clsx(
          'absolute size-5 rounded-full border-2',
          selected ? 'border-blue-700' : 'border-gray-600',
        )}
      />
      {/* 내부 원 - 선택됐을 때만 보임 */}
      {selected && (
        <div className="absolute size-2.5 rounded-full bg-blue-700" />
      )}
    </div>
  );
};
