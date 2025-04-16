import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';
import { LargeButton } from '@/components/LargeButton';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { routes } from '@/routes/src/routes';
import { toast } from '@/components/Toast';
import { JournalsGridCategory } from './components/JournalsGridCategory';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getJournals } from '@/api/journals';
import { queryKeys } from '@/query';
import { Grid1CardList } from './components/Gird1CardList';
import { Grid2CardList } from './components/Grid2CardList';
import { Grid3CardList } from './components/Grid3CardList';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export const Journals = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const viewMode = searchParams.get('view-mode') as 'grid2' | 'grid3' | 'grid1';
  const GRID1_PAGE_SIZE = 7;
  const GRID2_PAGE_SIZE = 12;
  const GRID3_PAGE_SIZE = 18;

  const changeGridSize = (viewMode: 'grid2' | 'grid3' | 'grid1') => {
    switch (viewMode) {
      case 'grid1':
        return GRID1_PAGE_SIZE;
      case 'grid2':
        return GRID2_PAGE_SIZE;
      case 'grid3':
        return GRID3_PAGE_SIZE;
    }
  };

  const {
    data: journals,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKeys.journals, viewMode],
    queryFn: ({ pageParam }) =>
      getJournals({
        page: pageParam,
        size: changeGridSize(viewMode),
        sort: 'asc',
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
  });

  const bottomRef = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  const flattenedJournals =
    journals?.pages.flatMap((page) => page.content) ?? [];

  const handleCardClick = (id: string) => {
    navigate(routes.journalsDetail(id));
  };

  useEffect(() => {
    if (!viewMode) {
      setSearchParams({ 'view-mode': 'grid2' }, { replace: true });
    }
  }, []);

  return (
    <>
      <NavigatorHeader
        title="체험 일지"
        leftIcon={<ThinLeftIcon />}
        rightIcon={<BellBlackIcon />}
        onLeftClick={() => navigate(routes.myPage)}
        onRightClick={() => toast.info('준비중입니다.')}
        className="bg-white shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]"
      />
      <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
        <div className="flex flex-1 flex-col bg-gray-050 pb-custom-72px-spacer">
          <div className="flex flex-1 flex-col gap-4 px-4 pt-6">
            <JournalsGridCategory
              viewMode={viewMode}
              onViewModeChange={(viewMode) =>
                setSearchParams({ 'view-mode': viewMode }, { replace: true })
              }
              totalElements={journals?.pages[0]?.totalElements ?? 0}
            />
            {journals && (
              <>
                {viewMode === 'grid1' && (
                  <Grid1CardList
                    journals={flattenedJournals}
                    onClick={handleCardClick}
                    isPending={isPending}
                    pageSize={GRID1_PAGE_SIZE}
                  />
                )}
                {viewMode === 'grid2' && (
                  <Grid2CardList
                    journals={flattenedJournals}
                    onClick={handleCardClick}
                    isPending={isPending}
                    pageSize={GRID2_PAGE_SIZE}
                  />
                )}
                {viewMode === 'grid3' && (
                  <Grid3CardList
                    journals={flattenedJournals}
                    onClick={handleCardClick}
                    isPending={isPending}
                    pageSize={GRID3_PAGE_SIZE}
                  />
                )}
              </>
            )}
            {!isPending && flattenedJournals.length === 0 && (
              <div className="flex flex-1 items-center justify-center">
                <ImageWithTextAlert
                  src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
                  alt="정보없음"
                  text="체험 일지가 없습니다"
                />
              </div>
            )}
            <div ref={bottomRef} />
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
    </>
  );
};
