import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useHeaderVisibility } from '@/contexts/src/HeaderVisibilityContext';

export type HomeCategoryLabel = 'home' | 'training' | 'tv' | 'sea';

interface Props {
  onCategoryChange: (category: HomeCategoryLabel) => void;
  value: HomeCategoryLabel;
}

export const HomeCategoryBar = ({ onCategoryChange, value }: Props) => {
  const { showHeader } = useHeaderVisibility();
  const categories: { label: string; code: HomeCategoryLabel }[] = useMemo(
    () => [
      { label: '홈', code: 'home' },
      { label: '트레이닝', code: 'training' },
      { label: '숨비채널', code: 'tv' },
      { label: '실시간 바다', code: 'sea' },
    ],
    [],
  );

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
  }, [value]);

  return (
    <nav
      id="home-category-bar"
      className={clsx(
        'sticky z-20 w-full bg-white shadow-sm transition-all duration-300 ease-in-out',
        {
          'top-0': !showHeader,
          'top-header-height': showHeader,
        },
      )}
    >
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
                  className={`flex w-full flex-col items-center whitespace-nowrap border-b-[0.188rem] border-transparent py-2.5 leading-6 transition-colors duration-200 focus:outline-none ${activeTextStyle} hover:border-gray-500`}
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
