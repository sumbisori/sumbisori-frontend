import TemperatureIcon from '@/icons/home/temperature.svg?react';
import WavesIcon from '@/icons/home/waves.svg?react';
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
  type: string;
  className: string;
}

export const WeatherIcon = ({ type, className }: Props) => {
  switch (type) {
    case 'CLEAR_SKY':
      return <ClearSkyIcon className={className} />;
    case 'FEW_CLOUDS':
      return <FewCloudsIcon className={className} />;
    case 'SCATTERED_CLOUDS':
      return <ScatteredCloudsIcon className={className} />;
    case 'BROKEN_CLOUDS':
      return <BrokenCloudsIcon className={className} />;
    case 'SHOWER_RAIN':
      return <ShowerRainIcon className={className} />;
    case 'RAIN':
      return <RainIcon className={className} />;
    case 'THUNDERSTORM':
      return <ThunderstormIcon className={className} />;
    case 'SNOW':
      return <SnowIcon className={className} />;
    case 'MIST':
      return <MistIcon className={className} />;

    // 기본 아이콘
    case 'TEMPERATURE':
      return <TemperatureIcon className={className} />;
    case 'WAVES':
      return <WavesIcon className={className} />;
    // 없어질 아이콘
    default:
      return <ScatteredCloudsIcon className={className} />;
  }
};
