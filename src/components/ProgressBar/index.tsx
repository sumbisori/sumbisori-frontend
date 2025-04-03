import { AnimatedNumber } from '@/components/AnimatedNumber';

interface Props {
  value: number;
  max: number;
  percentageText?: boolean;
  percentageAlign?: 'bottom' | 'right';
  className?: string;
}

export const ProgressBar = ({
  value,
  max,
  percentageText = true,
  percentageAlign = 'bottom',
  className,
}: Props) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div
      className={clsx(
        'flex w-full items-center gap-2',
        percentageAlign === 'right' ? '' : 'flex-col',
        className,
      )}
    >
      <div id="progress" className="h-1 w-full rounded-[1.25rem] bg-gray-100">
        <div
          className="h-1 rounded-[1.25rem] bg-blue-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {percentageText && (
        <div
          className={clsx(
            'flex text-center text-sm font-medium',
            value === 0 ? 'text-gray-400' : 'text-blue-700',
          )}
        >
          <div className="w-6">
            <AnimatedNumber value={percentage} />
          </div>
          <div>%</div>
        </div>
      )}
    </div>
  );
};
