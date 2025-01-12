import { useState } from 'react';
import { HomeChangeButton } from './HomeChangeButton';
import LocationIcon from '@/icons/location.svg?react';

interface HomeLocationProps {
  location: {
    code: string;
    name: string;
  };
  onSelectedLocation: (location: { code: string; name: string }) => void;
}

export const HomeLocation = ({
  location,
  onSelectedLocation,
}: HomeLocationProps) => {
  const [selectedLocation, setSelectedLocation] = useState(location);

  const locations = [
    { code: 'DT_0004', name: '제주' },
    { code: 'DT_0023', name: '모슬포' },
    { code: 'DT_0010', name: '서귀포' },
    { code: 'DT_0022', name: '성산포' },
    { code: 'DT_0021', name: '추자도' },
  ];

  const handleLocationChange = (loc: { code: string; name: string }) => {
    setSelectedLocation(loc);
    onSelectedLocation(loc);
  };

  return (
    <div className="flex items-center justify-between px-4 pt-6">
      <div className="flex gap-1">
        <LocationIcon />
        <p className="text-[1rem] font-medium">{selectedLocation.name}</p>
      </div>
      <HomeChangeButton
        items={locations}
        onSelectedLocation={handleLocationChange}
      />
    </div>
  );
};
