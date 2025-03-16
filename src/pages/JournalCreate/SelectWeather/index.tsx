import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { SmallButton } from '@/components/SmallButton';
import { WeatherIcon } from '@/components/WeatherIcon';
import { parseCompanionType } from '@/util/parseCompanionType';

interface Props {
  selectedWeather: string | null;
  onWeatherChange: (weather: string) => void;
  selectedCompanion: string | null;
  onCompanionChange: (companion: string) => void;
}

export const SelectWeather = ({
  selectedWeather,
  onWeatherChange,
  selectedCompanion,
  onCompanionChange,
}: Props) => {
  const weathers = [
    'CLEAR_SKY',
    'FEW_CLOUDS',
    'SCATTERED_CLOUDS',
    'BROKEN_CLOUDS',
    'SHOWER_RAIN',
    'RAIN',
    'THUNDERSTORM',
    'SNOW',
    'MIST',
  ];

  const companions = [
    'ALONE',
    'FRIEND',
    'LOVER',
    'FAMILY',
    'COLLEAGUE',
    'RELATIVE',
  ];

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('weather').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('weather').subtitle}
      />

      <motion.div className="p-4" {...animationY(0.6)}>
        <div className="grid grid-cols-5 gap-2">
          {weathers.map((weather) => (
            <SmallButton
              key={weather}
              selected={selectedWeather === weather}
              className="aspect-square"
              onClick={() => onWeatherChange(weather)}
            >
              <WeatherIcon type={weather} className="size-9" />
            </SmallButton>
          ))}
        </div>
      </motion.div>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('companion').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('companion').subtitle}
      />
      <motion.div className="p-4" {...animationY(0.6)}>
        <div className="grid grid-cols-4 gap-2">
          {companions.map((companion) => (
            <SmallButton
              key={companion}
              selected={selectedCompanion === companion}
              onClick={() => onCompanionChange(companion)}
              className="w-full px-3 py-2"
            >
              {parseCompanionType(companion)}
            </SmallButton>
          ))}
        </div>
      </motion.div>
    </>
  );
};
