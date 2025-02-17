import { SuitabilityStatus } from '@/api/home';
import TemperatureIcon from '@/icons/home/temperature.svg?react';
import WavesIcon from '@/icons/home/waves.svg?react';
import { isNightTime } from '@/util/isNightTime';
import { useMemo } from 'react';
// 날씨 import
import ClearSkyIcon from '@/icons/home/weather/clear-sky.svg?react';
import FewCloudsIcon from '@/icons/home/weather/few-clouds.svg?react';
import ScatteredCloudsIcon from '@/icons/home/weather/scattered-clouds.svg?react';
import BrokenCloudsIcon from '@/icons/home/weather/broken-clouds.svg?react';
import ShowerRainIcon from '@/icons/home/weather/shower-rain.svg?react';
import RainIcon from '@/icons/home/weather/rain.svg?react';
import ThunderstormIcon from '@/icons/home/weather/thunderstorm.svg?react';
import SnowIcon from '@/icons/home/weather/snow.svg?react';
import MistIcon from '@/icons/home/weather/mist.svg?react';

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
  const weatherIconColor = useMemo(() => {
    return isNightTime() ? 'text-gray-600' : STATUS_VARIANTS[status].iconColor;
  }, [status]);

  const CardIcon = (type: string) => {
    // 날씨 아이콘
    switch (type) {
      case 'CLEAR_SKY':
        return <ClearSkyIcon className={weatherIconColor} />;
      case 'FEW_CLOUDS':
        return <FewCloudsIcon className={weatherIconColor} />;
      case 'SCATTERED_CLOUDS':
        return <ScatteredCloudsIcon className={weatherIconColor} />;
      case 'BROKEN_CLOUDS':
        return <BrokenCloudsIcon className={weatherIconColor} />;
      case 'SHOWER_RAIN':
        return <ShowerRainIcon className={weatherIconColor} />;
      case 'RAIN':
        return <RainIcon className={weatherIconColor} />;
      case 'THUNDERSTORM':
        return <ThunderstormIcon className={weatherIconColor} />;
      case 'SNOW':
        return <SnowIcon className={weatherIconColor} />;
      case 'MIST':
        return <MistIcon className={weatherIconColor} />;

      // 기본 아이콘
      case 'TEMPERATURE':
        return (
          <TemperatureIcon className={STATUS_VARIANTS[status].iconColor} />
        );
      case 'WAVES':
        return <WavesIcon className={STATUS_VARIANTS[status].iconColor} />;
      // 없어질 아이콘
      default:
        return (
          <ScatteredCloudsIcon className={STATUS_VARIANTS[status].iconColor} />
        );
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex aspect-[10/7] size-full w-full min-w-[5.625rem] items-center justify-center rounded-2xl border border-gray-card-border bg-gray-card">
          <div className="flex items-center gap-[0.313rem]">
            {CardIcon(iconType)}
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
          {CardIcon(iconType)}
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
