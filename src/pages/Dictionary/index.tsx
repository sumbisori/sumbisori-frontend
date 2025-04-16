import { useMemo, useState } from 'react';
import { SeafoodCard } from '@/pages/Dictionary/components/SeafoodCard';
import { getSeafoodsCollectionsStatus } from '@/api/dictionary';
import { DictionarySeafood } from '@/api/dictionary/types';
import { useModalController } from '@/contexts/src/ModalContext';
import { IMAGE_PATHS } from '@/constant';
import Skeleton from '@/components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { DictionaryTitle } from '@/pages/Dictionary/components/DictionaryTitle';
import { DictionarySubtitle } from '@/pages/Dictionary/components/DictionarySubtitle';
import { DictionaryDialog } from '@/pages/Dictionary/components/DictionaryDialog';
import { DictionaryAquarium } from './components/DictionaryAquarium';
import { LargeButton } from '@/components/LargeButton';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/src/routes';

export const Dictionary = () => {
  const { openModal } = useModalController();
  const navigate = useNavigate();
  const [selectedSeafood, setSelectedSeafood] =
    useState<DictionarySeafood | null>(null);

  const {
    data: seafoods,
    isPending,
    isError,
  } = useQuery<DictionarySeafood[]>({
    queryKey: [queryKeys.seafoodsCollectionsStatus],
    queryFn: getSeafoodsCollectionsStatus,
  });

  const handleSeafoodClick = (seafood: DictionarySeafood) => {
    setSelectedSeafood(seafood);
    openModal(`seafood-${seafood.koreanName}`);
  };

  const seafoodCount = useMemo(
    () => seafoods?.filter((seafood) => seafood.count > 0).length || 0,
    [seafoods],
  );

  const seafoodPercentage = useMemo(() => {
    return ((seafoodCount / 16) * 100).toFixed(2);
  }, [seafoodCount]);

  return (
    <div>
      <DictionaryAquarium favoriteSeafoodName="SeaUrchin" />
      <div className="flex flex-col p-4 pb-custom-72px-spacer">
        <DictionaryTitle seafoodPercentage={seafoodPercentage} />
        <DictionarySubtitle seafoodCount={seafoodCount} isLoading={isPending} />
        {!isError && (
          <div className="grid grid-cols-3 gap-3 p-3">
            {isPending &&
              Array.from({ length: 16 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="aspect-square"
                  width="100%"
                  height="100%"
                />
              ))}

            {!isPending &&
              seafoods &&
              seafoods.map((seafood) => (
                <SeafoodCard
                  key={seafood.seafoodId}
                  isNew={false}
                  seafoodName={seafood.englishName}
                  counts={seafood.count}
                  name={seafood.koreanName}
                  onClick={() => handleSeafoodClick(seafood)}
                />
              ))}
          </div>
        )}
        {isError && (
          <div className="flex flex-1 items-center justify-center">
            <ImageWithTextAlert
              src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
              alt="정보없음"
              text="관련 영상을 불러오는 중 문제가 발생했습니다."
            />
          </div>
        )}
      </div>

      {selectedSeafood && (
        <DictionaryDialog selectedSeafood={selectedSeafood} />
      )}

      <div className="fixed inset-x-0 bottom-nav-height z-10 m-auto flex w-full min-w-full-layout max-w-full-layout px-5 pb-5 pt-3">
        <LargeButton onClick={() => navigate(routes.journalCreate('calendar'))}>
          일지 작성 및 도감등록
        </LargeButton>
      </div>
    </div>
  );
};
