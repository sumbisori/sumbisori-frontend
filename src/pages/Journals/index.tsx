import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';
import { LargeButton } from '@/components/LargeButton';
import GridIcon1 from '@/icons/journal/grid1.svg?react';
import GridIcon2 from '@/icons/journal/grid2.svg?react';
import GridIcon3 from '@/icons/journal/grid3.svg?react';
import { useState } from 'react';

export const Journals = () => {
  const [viewMode, setViewMode] = useState<'grid2' | 'grid3' | 'grid1'>(
    'grid3',
  );

  const activeGridStyle = (mode: 'grid2' | 'grid3' | 'grid1') => {
    return clsx(
      viewMode === mode && 'text-blue-500',
      'cursor-pointer hover:text-blue-500',
    );
  };

  return (
    <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
      <NavigatorHeader
        title="체험 일지"
        leftIcon={<ThinLeftIcon />}
        rightIcon={<BellBlackIcon />}
        onLeftClick={() => console.log('back')}
        onRightClick={() => console.log('close')}
        className="bg-white shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]"
      />
      <div className="flex flex-1 flex-col bg-gray-050 pb-[4.5rem]">
        <div className="flex-1 px-4 pt-6">
          <div id="journal-title" className="flex items-center justify-between">
            <h3 className="text-xl font-bold">체험 일지(5건)</h3>
            <div className="flex items-center gap-0.5">
              <GridIcon2
                className={activeGridStyle('grid2')}
                onClick={() => setViewMode('grid2')}
              />
              <GridIcon3
                className={activeGridStyle('grid3')}
                onClick={() => setViewMode('grid3')}
              />
              <GridIcon1
                className={activeGridStyle('grid1')}
                onClick={() => setViewMode('grid1')}
              />
            </div>
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-nav-height z-10 m-auto flex w-full min-w-full-layout max-w-full-layout px-5 pb-5 pt-3">
          <LargeButton onClick={() => console.log('register')} type="button">
            일지 작성 및 도감 등록
          </LargeButton>
        </div>
      </div>
    </div>
  );
};
