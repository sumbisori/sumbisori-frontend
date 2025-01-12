import { useEffect, useState } from 'react';

interface HomeChangeButtonProps {
  items: { code: string; name: string }[];
  onSelectedLocation: (location: { code: string; name: string }) => void;
}

export const HomeChangeButton = ({
  items,
  onSelectedLocation,
}: HomeChangeButtonProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectedLocation = (location: { code: string; name: string }) => {
    onSelectedLocation(location);
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
            {items.map((loc) => (
              <li
                key={loc.code}
                className="w-16 cursor-pointer whitespace-nowrap p-2 text-center text-[0.875rem] hover:bg-gray-200"
                onClick={() => handleSelectedLocation(loc)}
              >
                {loc.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
