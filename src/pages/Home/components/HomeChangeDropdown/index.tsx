import { WaveSpot } from '@/api/home/types';
import { useEffect, useState } from 'react';

interface HomeChangeDropdownProps {
  spots: WaveSpot[];
  onSelectedSpot: (spot: WaveSpot) => void;
}

export const HomeChangeDropdown = ({
  spots,
  onSelectedSpot,
}: HomeChangeDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectedSpot = (spot: WaveSpot) => {
    onSelectedSpot(spot);
    setShowDropdown(false);
  };

  // 드롭다운 바깥을 클릭하면 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!e.target) return;

      const target = e.target as HTMLElement;
      if (!target.closest('.relative')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex h-[1.375rem] items-center justify-center text-gray-800 hover:text-gray-600 active:text-gray-600"
      >
        변경
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full z-10 mt-1 h-52 overflow-auto rounded border bg-white shadow">
          <ul>
            {spots.map((spot) => (
              <li
                key={spot.spot}
                className="w-32 cursor-pointer whitespace-nowrap p-2 text-center text-sm hover:bg-gray-200"
                onClick={() => handleSelectedSpot(spot)}
              >
                {spot.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
