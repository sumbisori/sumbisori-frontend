import { SuitabilityStatus } from '@/api/home';
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  value: number | string;
  status: SuitabilityStatus;
  label: string;
  error?: boolean;
  isTemperature?: boolean;
}

export const HomeWeatherCard = ({
  icon,
  value,
  status,
  label,
  error = false,
  isTemperature = false,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {!error && (
        <div
          className={`flex aspect-[10/7] size-full w-full min-w-[5.625rem] items-center justify-center rounded-2xl border ${STATUS_VARIANTS[status].border} ${STATUS_VARIANTS[status].background} `}
        >
          <div className="flex items-center gap-[0.313rem]">
            {icon}
            <div className="flex w-7 flex-col items-start">
              <p
                className={`text-[0.688rem] font-semibold leading-[13px] ${STATUS_VARIANTS[status].textColor}`}
              >
                {STATUS_VARIANTS[status].text}
              </p>
              <div className="text-center text-[1.125rem] font-semibold leading-[22px]">
                {value}
                {isTemperature && '°'}
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="flex aspect-[10/7] size-full w-full min-w-[5.625rem] items-center justify-center rounded-2xl border border-gray-card-border bg-gray-card">
          <div className="flex items-center gap-[0.313rem]">
            {icon}
            <div className="flex flex-col items-start">
              <p
                className={`text-[0.688rem] font-semibold leading-[13px] text-charcoal-gray`}
              >
                오류
              </p>
              <div className="w-fit text-center text-[1.125rem] font-semibold leading-[22px]">
                --{isTemperature && '°'}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full justify-center whitespace-nowrap text-[0.875rem] text-charcoal-gray">
        {label}
      </div>
    </div>
  );
};

const STATUS_VARIANTS = {
  SUITABLE: {
    text: '적합',
    textColor: 'text-green-500',
    background: 'bg-green-50',
    border: 'border-green-500',
  },
  CAUTION: {
    text: '주의',
    textColor: 'text-orange-500',
    background: 'bg-orange-50',
    border: 'border-orange-500',
  },
  DANGEROUS: {
    text: '위험',
    textColor: 'text-red-500',
    background: 'bg-red-50',
    border: 'border-red-500',
  },
  DEFAULT: {
    text: '-',
    textColor: 'text-charcoal-gray',
    background: 'bg-gray-card',
    border: 'border-gray-card-border',
  },
};
