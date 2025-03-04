import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { SmallButton } from '@/pages/Home/components/SmallButton';
import { WeatherIcon } from '@/components/WeatherIcon';

interface Props {
  selectedWeather: string;
  onWeatherChange: (weather: string) => void;
  selectedCompanion: string;
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

  const companions = ['혼자', '친구', '연인', '가족', '직장동료', '친척'];

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('weather').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('weather').subtitle}
      />

      <motion.div className="p-4" {...animationY(0.6)}>
        <div className="flex flex-wrap gap-2">
          {weathers.map((weather) => (
            <SmallButton
              key={weather}
              selected={selectedWeather === weather}
              className="p-2.5"
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
        <div className="flex flex-wrap gap-2">
          {companions.map((companion) => (
            <SmallButton
              key={companion}
              selected={selectedCompanion === companion}
              onClick={() => onCompanionChange(companion)}
            >
              {companion}
            </SmallButton>
          ))}
        </div>
      </motion.div>
    </>
  );
};
