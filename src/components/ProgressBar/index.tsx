interface Props {
  value: number;
  max: number;
  percentageText?: boolean;
  percentageAlign?: 'bottom' | 'right';
}

export const ProgressBar = ({
  value,
  max,
  percentageText = true,
  percentageAlign = 'bottom',
}: Props) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div
      className={clsx(
        'flex items-center gap-2',
        percentageAlign === 'right' ? '' : 'flex-col',
      )}
    >
      <div id="progress" className="h-1 w-full rounded-[1.25rem] bg-gray-100">
        <div
          className="h-1 rounded-[1.25rem] bg-blue-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {percentageText && (
        <p
          className={clsx(
            'text-sm font-medium',
            value === 0 ? 'text-gray-400' : 'text-blue-700',
          )}
        >
          {percentage}%
        </p>
      )}
    </div>
  );
};
