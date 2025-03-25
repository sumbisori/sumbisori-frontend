import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';
import { LargeButton } from '@/components/LargeButton';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from '@/routes/src/routes';
import { toast } from '@/components/Toast';
import { JournalsGridCategory } from './components/JournalsGridCategory';
import { useQuery } from '@tanstack/react-query';
import { getJournals } from '@/api/journals';
import { queryKeys } from '@/query';
import { Grid1CardList } from './components/Gird1CardList';
import { Grid2CardList } from './components/Grid2CardList';
import { Grid3CardList } from './components/Grid3CardList';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';

export const Journals = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const viewMode = searchParams.get('view-mode') as 'grid2' | 'grid3' | 'grid1';

  const { data: journals, isLoading } = useQuery({
    queryKey: [queryKeys.journals],
    queryFn: getJournals,
  });

  useEffect(() => {
    if (!viewMode) {
      setSearchParams({ 'view-mode': 'grid2' }, { replace: true });
    }
  }, []);

  const handleCardClick = (id: string) => {
    navigate(routes.journalsDetail(id));
  };

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
          {journals && (
            <>
              {viewMode === 'grid1' && (
                <Grid1CardList journals={journals} onClick={handleCardClick} />
              )}
              {viewMode === 'grid2' && (
                <Grid2CardList journals={journals} onClick={handleCardClick} />
              )}
              {viewMode === 'grid3' && (
                <Grid3CardList journals={journals} onClick={handleCardClick} />
              )}
            </>
          )}
          {!isLoading && journals?.length === 0 && (
            <div className="flex flex-1 items-center justify-center">
              <ImageWithTextAlert
                src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
                alt="정보없음"
                text="체험 일지가 없습니다"
              />
            </div>
          )}
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
