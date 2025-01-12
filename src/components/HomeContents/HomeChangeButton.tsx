import { WaveSpot } from '@/api/home';
import { useEffect, useState } from 'react';

interface HomeChangeButtonProps {
  spots: WaveSpot[];
  onSelectedSpot: (spot: WaveSpot) => void;
}

export const HomeChangeButton = ({
  spots,
  onSelectedSpot,
}: HomeChangeButtonProps) => {
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
        className="flex h-[1.375rem] items-center justify-center"
      >
        변경
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full z-10 mt-1 rounded border bg-white shadow">
          <ul>
            {spots.map((spot) => (
              <li
                key={spot.spot}
                className="w-16 cursor-pointer whitespace-nowrap p-2 text-center text-[0.875rem] hover:bg-gray-200"
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
