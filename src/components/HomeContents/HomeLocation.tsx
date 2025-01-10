import { useState } from 'react';
import { HomeChangeButton } from './HomeChangeButton';
import LocationIcon from '@/assets/icons/location.svg?react';

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
  const [showDropdown, setShowDropdown] = useState(false);
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
    setShowDropdown(false);
    onSelectedLocation(loc);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        <LocationIcon />
        <p className="text-[1rem] font-medium">{selectedLocation.name}</p>
      </div>
      <div>
        <HomeChangeButton onClick={() => setShowDropdown(!showDropdown)} />
        {showDropdown && (
          <div className="absolute z-10 rounded border bg-white shadow">
            <ul>
              {locations.map((loc) => (
                <li
                  key={loc.code}
                  className="cursor-pointer p-2 text-[0.875rem] hover:bg-gray-200"
                  onClick={() => handleLocationChange(loc)}
                >
                  {loc.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
