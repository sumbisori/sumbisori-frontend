import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';
import { LargeButton } from '@/components/LargeButton';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from '@/routes/src/routes';
import { toast } from '@/components/Toast';
import { JournalsGridCategory } from './components/JournalsGridCategory';
import { Grid1Card } from './components/Grid1Card';
import { Grid2Card } from './components/Grid2Card';
import { Grid3Card } from './components/Grid3Card';

export const Journals = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const viewMode = searchParams.get('view-mode') as 'grid2' | 'grid3' | 'grid1';

  useEffect(() => {
    if (!viewMode) {
      setSearchParams({ 'view-mode': 'grid2' }, { replace: true });
    }
  }, []);

  return (
    <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
      <NavigatorHeader
        title="체험 일지"
        leftIcon={<ThinLeftIcon />}
        rightIcon={<BellBlackIcon />}
        onLeftClick={() => navigate(routes.myPage)}
        onRightClick={() => toast.info('준비중입니다.')}
        className="bg-white shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]"
      />
      <div className="flex flex-1 flex-col bg-gray-050 pb-[4.5rem]">
        <div className="flex flex-1 flex-col gap-4 px-4 pt-6">
          <JournalsGridCategory
            viewMode={viewMode}
            onViewModeChange={(viewMode) =>
              setSearchParams({ 'view-mode': viewMode }, { replace: true })
            }
          />
          <div className={clsx(viewMode === 'grid1' && 'grid-rows-1')}>
            {viewMode === 'grid1' && (
              <>
                <Grid1Card
                  imageUrl="https://placehold.co/600x400"
                  title="체험 일지 제목"
                  date="2025-03-15"
                  companionType="FRIEND"
                  weather="CLEAR_SKY"
                />
                <Grid1Card
                  imageUrl="https://placehold.co/600x400"
                  title="체험 일지 제목"
                  date="2025-03-15"
                  companionType="ALONE"
                  weather="BROKEN_CLOUDS"
                />
                <Grid1Card
                  imageUrl="https://plac"
                  title="체험 일지 제목"
                  date="2025-03-15"
                  companionType="COLLEAGUE"
                  weather="THUNDERSTORM"
                />
              </>
            )}
            {viewMode === 'grid2' && <Grid2Card />}
            {viewMode === 'grid3' && <Grid3Card />}
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-nav-height z-10 m-auto flex w-full min-w-full-layout max-w-full-layout px-5 pb-5 pt-3">
          <LargeButton
            onClick={() => navigate(routes.journalCreate('calendar'))}
            type="button"
          >
            일지 작성 및 도감 등록
          </LargeButton>
        </div>
      </div>
    </div>
  );
};
