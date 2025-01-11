export type HomeCategoryLabel = 'home' | 'training' | 'tv' | 'sea';

interface Props {
  onCategoryChange: (category: HomeCategoryLabel) => void;
  value: HomeCategoryLabel;
}

export const HomeCategoryBar = ({ onCategoryChange, value }: Props) => {
  const categories: { label: string; code: HomeCategoryLabel }[] = [
    { label: '홈', code: 'home' },
    { label: '해녀 Training', code: 'training' },
    { label: '숨비 TV', code: 'tv' },
    { label: '실시간 바다', code: 'sea' },
  ];

  return (
    <nav className="sticky top-0 z-10 w-full bg-white pt-5 shadow-sm">
      <ul className="flex justify-between">
        {categories.map((category) => {
          const isActive = category.code === value;
          const activeStyle = isActive
            ? 'border-[#010101] font-medium text-[#010101]'
            : 'border-transparent font-medium text-gray-500';

          return (
            <li key={category.code} className="flex-1">
              <button
                onClick={() => onCategoryChange(category.code)}
                className={`flex w-full flex-col items-center border-b-[0.188rem] py-2 transition-colors duration-200 focus:outline-none ${activeStyle} hover:border-[#010101] hover:text-[#010101]`}
                aria-pressed={isActive}
              >
                {category.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
