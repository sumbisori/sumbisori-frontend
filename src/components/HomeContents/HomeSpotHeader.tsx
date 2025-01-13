import { HomeChangeButton } from './HomeChangeButton';
import LocationIcon from '@/icons/location.svg?react';
import { WaveSpot } from '@/api/home';

interface Props {
  spot: WaveSpot;
  onSelectedSpot: (spot: WaveSpot) => void;
}

export const HomeSpotHeader = ({ spot, onSelectedSpot }: Props) => {
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
      <div className="flex gap-1">
        <LocationIcon />
        <p className="text-[1rem] font-medium">{spot.label}</p>
      </div>
      <HomeChangeButton
        spots={spots}
        onSelectedSpot={(spot) => onSelectedSpot(spot)}
      />
    </div>
  );
};
