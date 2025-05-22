interface Props {
  count: number;
  total: number;
}

export const BadgeCount = ({ count, total }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3">
      <p className="text-base font-medium text-black">나의 배지</p>
      <p className="text-base font-semibold text-black">
        <span className="text-blue-700">{count}</span>
        <span className="text-gray-500">/{total}</span>
      </p>
    </div>
  );
};
