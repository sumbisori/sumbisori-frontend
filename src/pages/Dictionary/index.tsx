import { useMemo, useRef, useState } from 'react';
import { SeafoodCard } from '@/components/SeafoodCard';
import { Dialog } from '@/components/Dialog';
import { DictionarySeafood, getSeafoods } from '@/api/dictionary';
import { useModalController } from '@/contexts/src/ModalContext';
import { IMAGE_PATHS } from '@/constant';
import Skeleton from '@/components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';

import { useDictionaryAquarium } from '@/hooks/useDictionaryAquarium';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';

export const Dictionary = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDictionaryAquarium(containerRef, canvasRef, 'SeaUrchin');
  const { openModal } = useModalController();
  const [selectedSeafood, setSelectedSeafood] =
    useState<DictionarySeafood | null>(null);

  const {
    data: seafoods,
    isLoading,
    isError,
    error,
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

  return (
    <div>
      <div
        ref={containerRef}
        className="relative aspect-7/3 w-full rounded-b-2xl"
      >
        <canvas ref={canvasRef} className="size-full" />
      </div>
      <div className="flex flex-col p-4">
        <div
          id="dictionary-subtitle"
          className="flex w-full items-center justify-between border-b-2 border-gray-400 py-2.5"
        >
          <div className="flex items-center gap-2">
            <div className="h-[1.375rem] w-2 bg-gray-700" />
            <p className="text-sm font-medium leading-3 text-gray-800">
              도감 달성도
            </p>
          </div>
          {isLoading ? (
            <Skeleton variant="text" width={'30px'} />
          ) : (
            <div className="font-semibold">
              <span>{seafoodCount}/</span>
              <span className="text-gray-600">18</span>
            </div>
          )}
        </div>
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
        <Dialog id={`seafood-${selectedSeafood.koreanName}`}>
          <div className="flex h-full flex-col justify-between">
            <div
              className={`${selectedSeafood.count > 0 ? '' : 'grayscale'} relative size-[9.375rem] self-center bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage: `url(${IMAGE_PATHS.SEAFOOD}/${selectedSeafood.englishName}.svg)`,
              }}
            />
            <div
              className={`${selectedSeafood.count > 0 ? 'border-orange-200' : 'border-gray-200'} w-full rounded-lg border py-0.5 text-center text-lg font-bold`}
            >
              {selectedSeafood.koreanName}
            </div>
            <div className="min-h-20 border-b-2 py-3 text-center text-[0.938rem]">
              {selectedSeafood.count > 0 ? selectedSeafood.description : '???'}
            </div>
            <div className="text-center text-sm">
              채취시기 |{' '}
              {selectedSeafood.insDt
                ? selectedSeafood.insDt
                : '아직 잡지 못했어요'}
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
