import { HomeChangeButton } from './HomeChangeButton';
import LocationIcon from '@/icons/location.svg?react';
import { WaveSpot } from '@/api/home';
import { convertToTodayTime } from '@/util/convertToTodayTime';

interface Props {
  spot: WaveSpot;
  onSelectedSpot: (spot: WaveSpot) => void;
  observationTime: string;
}

export const HomeSpotHeader = ({
  spot,
  onSelectedSpot,
  observationTime,
}: Props) => {
  const spots: WaveSpot[] = [
    { spot: 'jeju-harbor', label: '제주항' },
    { spot: 'chujado', label: '추자도' },
    { spot: 'gapado', label: '가파도' },
    { spot: 'udo', label: '우도' },
    { spot: 'jungmoon', label: '중문' },
    { spot: 'yeongnak', label: '영락' },
    { spot: 'shinsan', label: '신산' },
    { spot: 'gueom', label: '구엄' },
    { spot: 'wimi', label: '위미' },
  ];

  return (
    <div className="flex items-center justify-between px-4 pt-6">
      <div className="flex items-end gap-2">
        <div className="flex items-center gap-1">
          <LocationIcon />
          <p className="text-[1rem] font-medium">{spot.label}</p>
        </div>
        <p className="text-[0.75rem] text-gray-700">
          {convertToTodayTime(observationTime)} 기준
        </p>
      </div>
      <HomeChangeButton
        spots={spots}
        onSelectedSpot={(spot) => onSelectedSpot(spot)}
      />
    </div>
  );
};
