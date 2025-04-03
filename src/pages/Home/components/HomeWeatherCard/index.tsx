import { SuitabilityStatus } from '@/api/home/types';
import { WeatherIcon } from '@/components/WeatherIcon';

interface Props {
  iconType: string;
  value: number | string;
  status: SuitabilityStatus;
  label: string;
  error?: boolean;
  isTemperature?: boolean;
}
export const HomeWeatherCard = ({
  iconType,
  value,
  status,
  label,
  error = false,
  isTemperature = false,
}: Props) => {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex aspect-[10/7] size-full w-full min-w-[5.625rem] items-center justify-center rounded-2xl border border-gray-card-border bg-gray-card">
          <div className="flex items-center gap-[0.313rem]">
            <WeatherIcon
              type={iconType}
              className={STATUS_VARIANTS[status].iconColor}
            />
            <div className="flex flex-col items-start">
              <p
                className={`text-[0.688rem] font-semibold leading-[13px] text-charcoal-gray`}
              >
                오류
              </p>
              <div className="w-fit text-center text-lg font-semibold leading-[22px]">
                --{isTemperature && '°'}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center whitespace-nowrap text-sm text-charcoal-gray">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className={`flex aspect-[10/7] size-full min-w-[4.375rem] items-center justify-center rounded-2xl border ${STATUS_VARIANTS[status].border} ${STATUS_VARIANTS[status].background} `}
      >
        <div className="flex items-center gap-[0.313rem]">
          <WeatherIcon
            type={iconType}
            className={STATUS_VARIANTS[status].iconColor}
          />
          <div className="flex w-7 flex-col items-start">
            <p
              className={`text-[0.688rem] font-semibold leading-[13px] ${STATUS_VARIANTS[status].textColor}`}
            >
              {STATUS_VARIANTS[status].text}
            </p>
            <div className="text-center text-lg font-semibold leading-[22px] max-xs:text-base max-mobile-small:text-sm">
              {value}
              {isTemperature && '°'}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center whitespace-nowrap text-sm text-charcoal-gray">
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
    iconColor: 'text-green-500',
  },
  CAUTION: {
    text: '주의',
    textColor: 'text-orange-500',
    background: 'bg-orange-50',
    border: 'border-orange-500',
    iconColor: 'text-orange-500',
  },
  DANGEROUS: {
    text: '위험',
    textColor: 'text-red-500',
    background: 'bg-red-50',
    border: 'border-red-500',
    iconColor: 'text-red-500',
  },
  DEFAULT: {
    text: '-',
    textColor: 'text-charcoal-gray',
    background: 'bg-gray-card',
    border: 'border-gray-card-border',
    iconColor: 'text-charcoal-gray',
  },
};
