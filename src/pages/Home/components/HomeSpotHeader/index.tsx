import { HomeChangeDropdown } from '../HomeChangeDropdown';
import LocationIcon from '@/icons/home/location.svg?react';
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
    { spot: 'kimnyeong', label: '김녕' },
    { spot: 'hado', label: '하도' },
    { spot: 'udo', label: '우도' },
    { spot: 'shinsan', label: '신산' },
    { spot: 'wimi', label: '위미' },
    { spot: 'jungmoon', label: '중문' },
    { spot: 'gapado', label: '가파도' },
    { spot: 'yeongnak', label: '영락' },
    { spot: 'sinchang', label: '신창' },
    { spot: 'hyupjae', label: '협재' },
    { spot: 'gueom', label: '구엄' },
  ];

  return (
    <div className="flex items-center justify-between px-4 pt-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <LocationIcon />
          <p className="text-base font-medium">{spot.label}</p>
        </div>
        <p className="text-xs text-gray-700">
          {convertToTodayTime(observationTime)} 기준
        </p>
      </div>
      <HomeChangeDropdown
        spots={spots}
        onSelectedSpot={(spot) => onSelectedSpot(spot)}
      />
    </div>
  );
};
