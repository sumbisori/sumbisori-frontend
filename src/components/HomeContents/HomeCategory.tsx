import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  const containerRef = useRef<HTMLUListElement>(null);
  const [underlineProps, setUnderlineProps] = useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0,
  });

  const updateUnderline = () => {
    if (containerRef.current) {
      const activeIndex = categories.findIndex((cat) => cat.code === value);
      const activeItem = containerRef.current.children[
        activeIndex
      ] as HTMLElement;

      if (activeItem) {
        const { offsetLeft, clientWidth } = activeItem;
        setUnderlineProps({
          left: offsetLeft,
          width: clientWidth,
        });
      }
    }
  };

  useEffect(() => {
    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => {
      window.removeEventListener('resize', updateUnderline);
    };
  }, [value, categories]);

  return (
    <nav className="sticky top-0 z-10 w-full bg-white pt-5 shadow-sm">
      <div className="relative">
        <ul ref={containerRef} className="relative flex justify-between">
          {categories.map((category) => {
            const isActive = category.code === value;
            const activeTextStyle = isActive
              ? 'text-[#010101]'
              : 'text-gray-500';

            return (
              <li key={category.code} className="flex-1">
                <button
                  onClick={() => onCategoryChange(category.code)}
                  className={`flex w-full flex-col items-center border-b-[0.188rem] border-transparent py-2 transition-colors duration-200 focus:outline-none ${activeTextStyle} hover:border-gray-500`}
                  aria-pressed={isActive}
                >
                  {category.label}
                </button>
              </li>
            );
          })}
          <motion.div
            className="absolute bottom-0 z-0 h-[0.188rem] bg-[#010101]"
            initial={false}
            animate={{ left: underlineProps.left, width: underlineProps.width }}
            transition={{ type: 'spring', stiffness: 500, damping: 50 }}
            style={{ position: 'absolute' }}
          />
        </ul>
      </div>
    </nav>
  );
};
