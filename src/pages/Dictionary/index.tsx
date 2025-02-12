import { useMemo, useRef, useState } from 'react';
import { SeafoodCard } from '@/components/SeafoodCard';
import { Dialog } from '@/components/Dialog';
import { DictionarySeafood, getSeafoods } from '@/api/dictionary';
import { useModalController } from '@/contexts/src/ModalContext';
import { IMAGE_PATHS } from '@/constant';
import Skeleton from '@/components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { DictionaryTitle } from '@/pages/Dictionary/components/DictionaryTitle';
import { DictionarySubtitle } from '@/pages/Dictionary/components/DictionarySubtitle';
import { DictionaryDialog } from '@/pages/Dictionary/components/DictionaryDialog';

export const Dictionary = () => {
  const { openModal } = useModalController();
  const [selectedSeafood, setSelectedSeafood] =
    useState<DictionarySeafood | null>(null);
  const {
    data: seafoods,
    isLoading,
    isError,
  } = useQuery<DictionarySeafood[]>({
    queryKey: [queryKeys.seafoods],
    queryFn: getSeafoods,
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
    return ((seafoodCount / 18) * 100).toFixed(2);
  }, [seafoodCount]);

  return (
    <div>
      <div className="flex flex-col p-4">
        <DictionaryTitle seafoodPercentage={seafoodPercentage} />
        <DictionarySubtitle seafoodCount={seafoodCount} isLoading={isLoading} />
        {!isError && (
          <div className="grid grid-cols-3 gap-3 p-3">
            {isLoading &&
              Array.from({ length: 18 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="aspect-square"
                  width="100%"
                  height="100%"
                />
              ))}

            {!isLoading &&
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
    </div>
  );
};
